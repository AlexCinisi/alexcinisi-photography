#!/usr/bin/env node
/**
 * ds-check — controlli di coerenza fra globals.css e il sorgente TSX.
 *
 * Non descrive il design system: lo interroga. Ogni reperto è ricavato dai file
 * al momento dell'esecuzione, quindi non può invecchiare.
 *
 *   node scripts/ds-check.mjs              elenco reperti (exit 0)
 *   node scripts/ds-check.mjs --strict     exit 1 se ci sono reperti bloccanti
 *   node scripts/ds-check.mjs --json       output macchina
 *   node scripts/ds-check.mjs --self-test  prova di sensibilità su fixture
 *
 * Controlli:
 *   1. classi usate nel TSX e assenti dal CSS          (bloccante)
 *   2. classi definite nel CSS e mai usate             (informativo)
 *   3. selettori di elemento con font-family senza font-size  (trappola h3)
 *   4. controlli di form che non ereditano il font
 */

import { readFileSync, readdirSync, statSync, mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { tmpdir } from 'node:os';

// ---------------------------------------------------------------- utilità

/** Sostituisce i commenti con spazi, preservando i newline (i numeri di riga restano veri). */
function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
}

function lineAt(text, index) {
  let line = 1;
  for (let i = 0; i < index; i++) if (text[i] === '\n') line++;
  return line;
}

const AT_RULE_GROUPS = new Set(['media', 'supports', 'layer', 'container', 'scope']);

/**
 * Estrae le regole di stile da un foglio CSS, entrando nelle at-rule condizionali
 * e saltando il corpo di @keyframes / @font-face (dove i "selettori" non sono selettori).
 * @returns {{selector:string, body:string, line:number}[]}
 */
function parseRules(cssRaw) {
  const css = stripComments(cssRaw);
  const rules = [];

  function walk(start, end) {
    let i = start;
    let preludeStart = i;
    while (i < end) {
      const ch = css[i];
      if (ch === '"' || ch === "'") {
        const quote = ch;
        i++;
        while (i < end && css[i] !== quote) i += css[i] === '\\' ? 2 : 1;
        i++;
        continue;
      }
      if (ch === ';') {
        i++;
        preludeStart = i;
        continue;
      }
      if (ch === '{') {
        const prelude = css.slice(preludeStart, i).trim();
        const bodyStart = i + 1;
        const bodyEnd = matchBrace(css, i, end);
        if (prelude.startsWith('@')) {
          const name = prelude.slice(1).split(/[\s(]/, 1)[0].toLowerCase().replace(/^-\w+-/, '');
          if (AT_RULE_GROUPS.has(name)) walk(bodyStart, bodyEnd);
          // @keyframes, @font-face, @page…: il corpo non contiene selettori CSS
        } else if (prelude) {
          rules.push({
            selector: prelude.replace(/\s+/g, ' '),
            body: css.slice(bodyStart, bodyEnd),
            line: lineAt(css, preludeStart + (css.slice(preludeStart).match(/^\s*/)?.[0].length ?? 0)),
          });
        }
        i = bodyEnd + 1;
        preludeStart = i;
        continue;
      }
      if (ch === '}') {
        i++;
        preludeStart = i;
        continue;
      }
      i++;
    }
  }

  /** indice della `}` che chiude la `{` in `open`. */
  function matchBrace(text, open, end) {
    let depth = 0;
    for (let i = open; i < end; i++) {
      const ch = text[i];
      if (ch === '"' || ch === "'") {
        const quote = ch;
        i++;
        while (i < end && text[i] !== quote) i += text[i] === '\\' ? 2 : 1;
        continue;
      }
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) return i;
      }
    }
    return end;
  }

  walk(0, css.length);
  return rules;
}

/** Proprietà dichiarate in un corpo di regola, in minuscolo. */
function declaredProps(body) {
  const props = new Set();
  for (const decl of body.split(';')) {
    const colon = decl.indexOf(':');
    if (colon === -1) continue;
    const prop = decl.slice(0, colon).trim().toLowerCase();
    if (/^[-a-z]+$/.test(prop)) props.add(prop);
  }
  return props;
}

const CLASS_TOKEN = /^-{0,2}[A-Za-z_][A-Za-z0-9_-]*$/;

/** Nomi di classe definiti nel CSS → prima riga in cui compaiono. */
function cssClasses(rules) {
  const map = new Map();
  for (const rule of rules) {
    for (const m of rule.selector.matchAll(/\.(-{0,2}[A-Za-z_][A-Za-z0-9_-]*)/g)) {
      if (!map.has(m[1])) map.set(m[1], rule.line);
    }
  }
  return map;
}

// ------------------------------------------------- estrazione classi dal TSX

function listFiles(dir, exts) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...listFiles(full, exts));
    else if (exts.includes(extname(entry))) out.push(full);
  }
  return out;
}

/** Legge l'espressione fra graffe bilanciate a partire da `{` in `open`. */
function readBraced(src, open) {
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    const ch = src[i];
    if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch;
      i++;
      while (i < src.length && src[i] !== quote) {
        if (src[i] === '\\') i++;
        else if (quote === '`' && src[i] === '$' && src[i + 1] === '{') i = readBraced(src, i + 1).end;
        i++;
      }
      continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return { text: src.slice(open + 1, i), end: i };
    }
  }
  return { text: src.slice(open + 1), end: src.length };
}

/**
 * Da un letterale (stringa o template) ai token di classe.
 * I frammenti adiacenti a un `${…}` sono *parziali*: non sono nomi di classe
 * completi, e vengono raccolti a parte come prefissi dinamici.
 */
function tokensFromLiteral(raw, isTemplate, sink) {
  if (!isTemplate) {
    for (const t of raw.split(/\s+/)) if (CLASS_TOKEN.test(t)) sink.full.add(t);
    return;
  }
  const parts = [];
  let buf = '';
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === '\\') { buf += raw[i + 1] ?? ''; i++; continue; }
    if (raw[i] === '$' && raw[i + 1] === '{') {
      parts.push(buf);
      buf = '';
      i = readBraced(raw, i + 1).end;
      continue;
    }
    buf += raw[i];
  }
  parts.push(buf);

  parts.forEach((fragment, idx) => {
    const startsGlued = idx > 0 && !/^\s/.test(fragment);
    const endsGlued = idx < parts.length - 1 && !/\s$/.test(fragment);
    const toks = fragment.split(/\s+/).filter(Boolean);
    toks.forEach((t, k) => {
      const partial = (startsGlued && k === 0) || (endsGlued && k === toks.length - 1);
      if (!CLASS_TOKEN.test(t)) {
        if (partial && t) sink.dynamic.add(t);
        return;
      }
      if (partial) sink.dynamic.add(t);
      else sink.full.add(t);
    });
  });
}

/** Funzioni che compongono stringhe di classi: i loro argomenti sono classi. */
const CLASS_FNS = new Set(['cn', 'clsx', 'classNames', 'twMerge', 'cx']);

/**
 * Neutralizza i letterali che *non* sono nomi di classe:
 *  - argomenti di chiamate che non compongono classi   → `Jost({ variable: '--font-jost' })`
 *  - operandi di confronto                             → `background === 'pearl' ? …`
 * Sostituisce con spazi per non spostare gli indici.
 */
function blankNonClassLiterals(expr) {
  let out = expr.replace(/(===|!==|==|!=)(\s*)(['"`])(?:\\.|(?!\3)[\s\S])*\3/g,
    (m, op, sp) => op + sp + ' '.repeat(m.length - op.length - sp.length));

  const call = /\b([A-Za-z_$][A-Za-z0-9_$.]*)\s*\(/g;
  let m;
  while ((m = call.exec(out))) {
    const callee = m[1].split('.').pop();
    if (CLASS_FNS.has(callee)) continue;
    const open = m.index + m[0].length - 1;
    const { end } = readBraced(out.replace(/\(/g, '{').replace(/\)/g, '}'), open);
    out = out.slice(0, open + 1) + ' '.repeat(Math.max(0, end - open - 1)) + out.slice(end);
    call.lastIndex = end;
  }
  return out;
}

/** Tutti i letterali (stringa/template) contenuti in un'espressione JS. */
function literalsIn(rawExpr, sink) {
  const expr = blankNonClassLiterals(rawExpr);
  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (ch !== '"' && ch !== "'" && ch !== '`') continue;
    const quote = ch;
    const start = ++i;
    while (i < expr.length && expr[i] !== quote) {
      if (expr[i] === '\\') i++;
      else if (quote === '`' && expr[i] === '$' && expr[i + 1] === '{') i = readBraced(expr, i + 1).end;
      i++;
    }
    tokensFromLiteral(expr.slice(start, i), quote === '`', sink);
  }
}

const IDENT = /\b([A-Za-z_$][A-Za-z0-9_$]*)\b/g;
const JS_NOISE = new Set([
  'true', 'false', 'null', 'undefined', 'className', 'cn', 'clsx', 'classNames',
  'props', 'this', 'length', 'map', 'join', 'filter', 'includes', 'trim',
]);

/**
 * Fine di una dichiarazione a partire dalla parola chiave.
 * Non si ferma alla prima parentesi chiusa: `const f = (x) => x ? 'a' : 'b'`
 * ha il corpo *dopo* i parametri, ed è la forma di `fieldClass` in GuideForm.
 */
function declarationEnd(src, start, cap = 4000) {
  const limit = Math.min(src.length, start + cap);
  let depth = 0;
  for (let k = start; k < limit; k++) {
    const ch = src[k];
    if (ch === '"' || ch === "'" || ch === '`') {
      const q = ch;
      k++;
      while (k < limit && src[k] !== q) k += src[k] === '\\' ? 2 : 1;
      continue;
    }
    if ('{(['.includes(ch)) depth++;
    else if ('})]'.includes(ch)) {
      if (depth === 0) return k; // usciti dal blocco che ci conteneva
      depth--;
    } else if (ch === ';' && depth === 0) return k;
    else if (ch === '\n' && depth === 0) {
      // nuova istruzione di pari livello: la dichiarazione è finita
      const next = src.slice(k + 1).match(/^\s*(\S+)/)?.[1] ?? '';
      if (/^(const|let|var|function|return|export|import|if|\/\/|\/\*)/.test(next)) return k;
    }
  }
  return limit;
}

/**
 * Risolve un identificatore usato in className cercando `const <id> = …`
 * nello stesso file e raccogliendo i letterali di quella dichiarazione.
 * Copre i casi reali del repo: `styles`, `variants`, `wrapperClass`, `fieldClass`.
 */
function resolveIdentifier(src, id, sink, seen = new Set(), depth = 0) {
  if (depth > 3 || seen.has(id)) return false;
  seen.add(id);
  const decl = new RegExp(`\\b(?:const|let|var|function)\\s+${id}\\b`, 'g');
  let found = false;
  let m;
  while ((m = decl.exec(src))) {
    found = true;
    const initializer = src.slice(m.index, declarationEnd(src, m.index));
    literalsIn(initializer, sink);
    // una variabile di classi può rimandarne un'altra: `const styles = cn(baseStyles, variants[v])`
    for (const idm of blankNonClassLiterals(initializer).matchAll(IDENT)) {
      if (JS_NOISE.has(idm[1]) || idm[1] === id) continue;
      resolveIdentifier(src, idm[1], sink, seen, depth + 1);
    }
  }
  return found;
}

/** @returns {{full:Set<string>, dynamic:Set<string>, unresolved:string[]}} */
function tsxClasses(files) {
  const sink = { full: new Set(), dynamic: new Set(), unresolved: [] };
  const where = new Map(); // classe → [file:riga]

  for (const file of files) {
    const src = readFileSync(file, 'utf8');
    const re = /className\s*=\s*/g;
    let m;
    while ((m = re.exec(src))) {
      const at = m.index + m[0].length;
      const ch = src[at];
      const local = { full: new Set(), dynamic: new Set() };

      if (ch === '"' || ch === "'") {
        const end = src.indexOf(ch, at + 1);
        tokensFromLiteral(src.slice(at + 1, end === -1 ? src.length : end), false, local);
      } else if (ch === '{') {
        const { text } = readBraced(src, at);
        literalsIn(text, local);
        // identificatori usati come sorgente di classi: risolvi nello stesso file
        for (const idm of text.matchAll(IDENT)) {
          const id = idm[1];
          if (JS_NOISE.has(id)) continue;
          resolveIdentifier(src, id, local);
        }
        // "non risolto" solo se non ne è uscito *nulla*: né classi intere né prefissi
        if (local.full.size === 0 && local.dynamic.size === 0) {
          sink.unresolved.push(`${file}:${lineAt(src, m.index)} → className={${text.replace(/\s+/g, ' ').slice(0, 48)}}`);
        }
      }

      for (const t of local.full) {
        sink.full.add(t);
        if (!where.has(t)) where.set(t, `${file}:${lineAt(src, m.index)}`);
      }
      for (const t of local.dynamic) sink.dynamic.add(t);
    }
  }
  sink.where = where;
  return sink;
}

// ----------------------------------------------------------------- controlli

const TYPE_SELECTOR = /^[a-z][a-z0-9]*$/;
const FORM_CONTROLS = ['input', 'select', 'textarea', 'button'];
// euristica: sintassi Tailwind in un progetto che non ha Tailwind
const TAILWINDISH = /^(flex|grid|block|inline-flex|inline-block|hidden|absolute|relative|fixed|sticky|uppercase|lowercase|capitalize|truncate|container|antialiased|border|rounded|shadow|italic|underline)$|^(items|justify|self|gap|space|p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|w|h|min|max|text|bg|border|font|tracking|leading|rounded|shadow|opacity|z|transition|duration|ease|grid|col|row|order|overflow|object|aspect|inset|top|right|bottom|left|scale|rotate|translate|cursor|select|ring|divide|placeholder|from|via|to)-|[[\]:]/;

function runChecks({ cssText, cssPath, files, srcRoot }) {
  const rules = parseRules(cssText);
  const defined = cssClasses(rules);
  const used = tsxClasses(files);

  // — 1. usate nel TSX, assenti dal CSS
  const missing = [...used.full]
    .filter((c) => !defined.has(c))
    .sort();

  // — 2. definite nel CSS, mai citate nel sorgente
  //    conservativo: basta che il nome compaia in un file di src (anche fuori da className)
  const haystack = files.map((f) => readFileSync(f, 'utf8')).join('\n');
  const dynPrefixes = [...used.dynamic];
  const unused = [...defined.keys()]
    .filter((c) => !used.full.has(c))
    .filter((c) => !new RegExp(`[\\s"'\`.{(=/-]${c.replace(/[-]/g, '\\-')}(?=[\\s"'\`.,)}\\]:;]|$)`, 'm').test(haystack))
    .filter((c) => !dynPrefixes.some((p) => c.startsWith(p) || p.startsWith(c)))
    .sort();

  // — 3. selettori di elemento con font-family ma senza font-size (trappola h3)
  const elem = new Map(); // elemento → {family:[], size:[]}
  for (const rule of rules) {
    const props = declaredProps(rule.body);
    const hasFamily = props.has('font-family') || props.has('font');
    const hasSize = props.has('font-size') || props.has('font');
    if (!hasFamily && !hasSize) continue;
    for (const part of rule.selector.split(',')) {
      const sel = part.trim();
      if (!TYPE_SELECTOR.test(sel)) continue;
      if (!elem.has(sel)) elem.set(sel, { family: [], size: [] });
      if (hasFamily) elem.get(sel).family.push(rule.line);
      if (hasSize) elem.get(sel).size.push(rule.line);
    }
  }
  const fontTraps = [...elem.entries()]
    .filter(([, v]) => v.family.length && !v.size.length)
    .map(([el, v]) => ({ element: el, familyLines: v.family }))
    .sort((a, b) => a.element.localeCompare(b.element));

  // — 4. controlli di form senza font ereditato
  const formGaps = [];
  for (const ctrl of FORM_CONTROLS) {
    const bare = elem.get(ctrl);
    const qualified = rules.filter((r) =>
      r.selector.split(',').some((p) => new RegExp(`(^|[\\s>+~])${ctrl}[\\[:.]`).test(p.trim())) &&
      (declaredProps(r.body).has('font-family') || declaredProps(r.body).has('font'))
    );
    if (!bare?.family.length) {
      formGaps.push({
        control: ctrl,
        family: false,
        size: Boolean(bare?.size.length),
        partial: qualified.map((r) => r.line),
      });
    } else if (!bare.size.length) {
      formGaps.push({ control: ctrl, family: true, size: false, partial: [] });
    }
  }

  return { rules, defined, used, missing, unused, fontTraps, formGaps, cssPath, srcRoot };
}

// ------------------------------------------------------------------- report

const bold = (s) => (process.stdout.isTTY ? `\x1b[1m${s}\x1b[0m` : s);
const dim = (s) => (process.stdout.isTTY ? `\x1b[2m${s}\x1b[0m` : s);

function report(r) {
  const rel = (p) => relative(process.cwd(), p);
  const lines = [];
  lines.push('');
  lines.push(bold('ds-check') + dim(`  ${rel(r.cssPath)} · ${r.defined.size} classi definite · ${r.used.full.size} usate`));
  lines.push('');

  lines.push(bold(`1. Usate nel TSX, assenti dal CSS — ${r.missing.length}`));
  if (r.missing.length === 0) lines.push('   nessuna');
  for (const c of r.missing) {
    const tag = TAILWINDISH.test(c) ? dim('  [sintassi Tailwind — non installato]') : '';
    lines.push(`   ${c.padEnd(28)} ${dim(rel(r.used.where.get(c) ?? ''))}${tag}`);
  }
  lines.push('');

  lines.push(bold(`2. Definite nel CSS, mai citate in src/ — ${r.unused.length}`));
  if (r.unused.length === 0) lines.push('   nessuna');
  else lines.push('   ' + r.unused.map((c) => `.${c}:${r.defined.get(c)}`).join('  '));
  lines.push('');

  lines.push(bold(`3. Elementi con font-family ma senza font-size — ${r.fontTraps.length}`));
  if (r.fontTraps.length === 0) lines.push('   nessuno');
  for (const t of r.fontTraps) {
    lines.push(`   ${t.element.padEnd(10)} font-family alle righe ${t.familyLines.join(', ')} — nessun font-size sull'elemento nudo`);
  }
  lines.push('');

  lines.push(bold(`4. Controlli di form senza font proprio — ${r.formGaps.length}`));
  if (r.formGaps.length === 0) lines.push('   nessuno');
  for (const g of r.formGaps) {
    const what = !g.family ? 'nessun font-family sul selettore nudo' : 'font-family sì, font-size no';
    const extra = g.partial.length ? dim(`  (solo selettori qualificati: righe ${g.partial.join(', ')})`) : '';
    lines.push(`   ${g.control.padEnd(10)} ${what}${extra}`);
  }
  lines.push('');

  if (r.used.unresolved.length) {
    lines.push(dim(`className non risolti staticamente — ${r.used.unresolved.length} (perimetro dichiarato, non un reperto)`));
    for (const u of r.used.unresolved.slice(0, 12)) lines.push(dim(`   ${rel(u)}`));
    if (r.used.unresolved.length > 12) lines.push(dim(`   … e altri ${r.used.unresolved.length - 12}`));
    lines.push('');
  }

  return lines.join('\n');
}

// -------------------------------------------------------- prova di sensibilità

const FIXTURE_CLEAN_CSS = `
:root { --ink: #111; }
h1, h2 { font-family: serif; }
h1 { font-size: 3rem; }
h2 { font-size: 2rem; }
input, select, textarea, button { font: inherit; }
.alfa { color: red; }
.beta { color: blue; }
@media (min-width: 700px) { .beta { color: green; } }
`;

const FIXTURE_CLEAN_TSX = `
export default function P() {
  const styles = "beta";
  return (<div className="alfa"><span className={styles} /></div>);
}
`;

const FIXTURE_DIRTY_CSS = `
h1, h2, h3 { font-family: serif; }
h1 { font-size: 3rem; }
h2 { font-size: 2rem; }
input, textarea { font: inherit; }
select { border: 1px solid #000; }
.alfa { color: red; }
.orfana { color: grey; }
.hero--dark-text { color: #fff; }
`;

const FIXTURE_DIRTY_TSX = `
import { Jost } from 'next/font/google';
const jost = Jost({ subsets: ['latin'], display: 'swap', variable: '--font-fantasma' });
const base = "catena-morta";
export default function P({ dark, sfondo }) {
  const styles = "uppercase tracking-wide";
  const combo = cn(base, "alfa");
  const fieldClass = (f) => (f ? 'alfa' : 'alfa');
  return (<>
    <div className="alfa fantasma" />
    <button className={styles} />
    <div className={\`hero--\${dark ? 'dark' : 'light'}-text\`} />
    <i className={jost.variable} />
    <b className={fieldClass('nomecampo')} />
    <u className={sfondo === 'perla' ? 'alfa' : 'alfa'} />
    <em className={combo} />
    <span className={mistero(dark)} />
  </>);
}
`;

function fixture(name, css, tsx) {
  const dir = mkdtempSync(join(tmpdir(), `ds-check-${name}-`));
  mkdirSync(join(dir, 'src'), { recursive: true });
  writeFileSync(join(dir, 'globals.css'), css);
  writeFileSync(join(dir, 'src', 'Page.tsx'), tsx);
  return {
    cssText: css,
    cssPath: join(dir, 'globals.css'),
    files: [join(dir, 'src', 'Page.tsx')],
    srcRoot: join(dir, 'src'),
  };
}

function selfTest() {
  const clean = runChecks(fixture('clean', FIXTURE_CLEAN_CSS, FIXTURE_CLEAN_TSX));
  const dirty = runChecks(fixture('dirty', FIXTURE_DIRTY_CSS, FIXTURE_DIRTY_TSX));

  const cases = [
    ['fixture pulita → controllo 1 muto', clean.missing.length === 0, `trovate: ${clean.missing.join(', ')}`],
    ['fixture pulita → controllo 2 muto', clean.unused.length === 0, `trovate: ${clean.unused.join(', ')}`],
    ['fixture pulita → controllo 3 muto', clean.fontTraps.length === 0, `trovati: ${clean.fontTraps.map((t) => t.element).join(', ')}`],
    ['fixture pulita → controllo 4 muto', clean.formGaps.length === 0, `trovati: ${clean.formGaps.map((g) => g.control).join(', ')}`],
    ['C1 vede la classe inventata (.fantasma)', dirty.missing.includes('fantasma'), `missing = ${dirty.missing.join(', ')}`],
    ['C1 vede la classe da variabile (uppercase)', dirty.missing.includes('uppercase'), `missing = ${dirty.missing.join(', ')}`],
    ['C1 NON accusa una classe che esiste (.alfa)', !dirty.missing.includes('alfa'), 'falso positivo'],
    ['C2 vede la classe orfana (.orfana)', dirty.unused.includes('orfana'), `unused = ${dirty.unused.join(', ')}`],
    ['C2 NON accusa una classe costruita in template', !dirty.unused.includes('hero--dark-text'), 'falso positivo su classe dinamica'],
    ['C3 vede h3 (font-family senza font-size)', dirty.fontTraps.some((t) => t.element === 'h3'), `traps = ${dirty.fontTraps.map((t) => t.element).join(', ')}`],
    ['C3 NON accusa h1/h2', !dirty.fontTraps.some((t) => ['h1', 'h2'].includes(t.element)), 'falso positivo'],
    ['C4 vede select senza font', dirty.formGaps.some((g) => g.control === 'select'), `gaps = ${dirty.formGaps.map((g) => g.control).join(', ')}`],
    ['C4 NON accusa input/textarea', !dirty.formGaps.some((g) => ['input', 'textarea'].includes(g.control)), 'falso positivo'],
    ['className non risolvibile è dichiarato, non ignorato',
      dirty.used.unresolved.length === 2 &&
      dirty.used.unresolved.some((u) => u.includes('mistero')) &&
      dirty.used.unresolved.some((u) => u.includes('jost.variable')),
      `non risolti = ${dirty.used.unresolved.length}: ${dirty.used.unresolved.join(' | ')}`],
    // precisione: letterali che non sono nomi di classe
    ['C1 ignora la config di next/font (--font-fantasma, swap, latin)',
      !['--font-fantasma', 'swap', 'latin'].some((c) => dirty.missing.includes(c)), `missing = ${dirty.missing.join(', ')}`],
    ['C1 ignora l\'argomento di funzione (nomecampo)', !dirty.missing.includes('nomecampo'), `missing = ${dirty.missing.join(', ')}`],
    ['C1 ignora l\'operando di confronto (perla)', !dirty.missing.includes('perla'), `missing = ${dirty.missing.join(', ')}`],
    ['C1 segue la catena cn(base) → base (catena-morta)', dirty.missing.includes('catena-morta'), `missing = ${dirty.missing.join(', ')}`],
  ];

  console.log('\n' + bold('prova di sensibilità') + dim('  — difetti piantati in fixture, i controlli devono vederli'));
  console.log('');
  let failed = 0;
  for (const [name, ok, detail] of cases) {
    if (!ok) failed++;
    console.log(`  ${ok ? '✓' : '✗'} ${name}${ok ? '' : dim(`   → ${detail}`)}`);
  }
  console.log('');
  console.log(`  ${cases.length - failed}/${cases.length} superati`);
  console.log('');
  return failed === 0 ? 0 : 1;
}

// -------------------------------------------------------------------- main

const argv = process.argv.slice(2);
if (argv.includes('--self-test')) process.exit(selfTest());

const root = process.cwd();
const cssPath = join(root, 'src/app/globals.css');
const srcRoot = join(root, 'src');
const files = listFiles(srcRoot, ['.tsx', '.ts']);
const result = runChecks({ cssText: readFileSync(cssPath, 'utf8'), cssPath, files, srcRoot });

if (argv.includes('--json')) {
  console.log(JSON.stringify({
    missing: result.missing,
    unused: result.unused,
    fontTraps: result.fontTraps,
    formGaps: result.formGaps,
    unresolved: result.used.unresolved,
  }, null, 2));
} else {
  console.log(report(result));
}

if (argv.includes('--strict') && result.missing.length > 0) process.exit(1);
