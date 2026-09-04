#!/usr/bin/env node
/**
 * ds-bundle — costruisce il pacchetto per claude.ai/design da questo repo.
 *
 * Il design system di questo sito è CSS, non una libreria di componenti React:
 * il bundle spedisce `globals.css` così com'è, i token, i font vendorizzati e
 * un mazzo di schede HTML che usano SOLO classi realmente presenti nel foglio.
 *
 * Ogni scheda è verificata contro il CSS prima di essere scritta: se cita una
 * classe che non esiste, il build fallisce. È lo stesso principio di ds-check —
 * un artefatto che descrive il CSS deve essere smentibile dal CSS.
 *
 *   node scripts/ds-bundle.mjs            costruisce in ./ds-bundle
 *   node scripts/ds-bundle.mjs --check    verifica soltanto, non scrive
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, copyFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

const ROOT = process.cwd();
const CSS_PATH = join(ROOT, 'src/app/globals.css');
const OUT = join(ROOT, 'ds-bundle');
const CHECK_ONLY = process.argv.includes('--check');

const css = readFileSync(CSS_PATH, 'utf8');

// ---------------------------------------------------------------- verifica

/** Nomi di classe realmente definiti nel foglio. */
const defined = new Set(
  [...css.matchAll(/\.(-{0,2}[A-Za-z_][A-Za-z0-9_-]*)/g)].map((m) => m[1])
);

const used = new Set();
/** Marca le classi citate da una scheda, così il build può verificarle. */
function cls(...names) {
  for (const n of names.join(' ').split(/\s+/).filter(Boolean)) used.add(n);
  return names.join(' ');
}

// ------------------------------------------------------------------ token

const rootBlock = css.slice(css.indexOf(':root'), css.indexOf('}', css.indexOf(':root')));
const tokens = [...rootBlock.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)].map(([, k, v]) => [k, v.trim()]);
const colorTokens = tokens.filter(([, v]) => /^#|^rgb/.test(v));
const typeTokens = tokens.filter(([k]) => k.startsWith('--type-') || k === '--lh-display');

/**
 * `globals.css` chiama i font via `var(--font-redhat)` ecc.: nel sito quelle
 * variabili le inietta `next/font` sull'elemento html, fuori da Next non
 * esistono. Una `font-family` che le usa diventa invalida al calcolo e il
 * testo collassa sul serif di sistema — silenziosamente, in ogni design.
 * Il bundle le deve quindi dichiarare esso stesso.
 */
const FONT_VARS = {
  '--font-jost': "'Jost'",
  '--font-redhat': "'Red Hat Display'",
  '--font-bodoni': "'Bodoni Moda'",
};
const fontVarsUsed = new Set([...css.matchAll(/var\((--font-[a-z0-9-]+)\)/g)].map((m) => m[1]));
const unmapped = [...fontVarsUsed].filter((v) => !(v in FONT_VARS));
if (unmapped.length) {
  throw new Error(`globals.css usa variabili font non mappate dal bundle: ${unmapped.join(', ')}. Renderebbero nel font sbagliato.`);
}

if (colorTokens.length !== 11) {
  throw new Error(`Attesi 11 token colore, trovati ${colorTokens.length}. La palette è cambiata: aggiorna il bundle e la nota di design system.`);
}

// ----------------------------------------------------------------- schede

const shell = (title, body) => `<!DOCTYPE html>
<html lang="it"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<link rel="stylesheet" href="../../../styles.css">
<style>
  /* Solo impaginazione della scheda. Nessuno stile che imiti il design system:
     tutto ciò che si vede sotto viene da globals.css. */
  body { padding: 48px; background: var(--white); font-family: var(--font-jost), 'Jost', sans-serif; font-weight: 300; }
  .card-note { font-family: var(--font-redhat), 'Red Hat Display', sans-serif; font-size: .62rem; letter-spacing: .22em; text-transform: uppercase; color: var(--mid); margin-bottom: 28px; }
  .card-row { display: flex; flex-wrap: wrap; gap: 32px; align-items: flex-end; margin-bottom: 44px; }
  .card-stack > * + * { margin-top: 28px; }
</style>
</head><body>
${body}
</body></html>`;

const card = (group, name, subtitle, width, height, title, body) => ({
  group, name, subtitle, width, height,
  html: `<!-- @dsCard group="${group}" -->\n` + shell(title, body),
});

const swatch = ([k, v]) => `  <div style="flex:0 0 148px">
    <div style="height:96px;background:var(${k});border:1px solid var(--rule)"></div>
    <div style="font-family:var(--font-redhat),'Red Hat Display',sans-serif;font-size:.62rem;letter-spacing:.16em;text-transform:uppercase;margin-top:10px;color:var(--ink)">${k.replace('--', '')}</div>
    <div style="font-size:.7rem;color:var(--mid);margin-top:3px">${v}</div>
  </div>`;

const CARDS = [
  card('Foundations', 'Colors', 'Palette chiusa a 11 token', 1000, 460, 'Colori',
    `<div class="card-note">Palette chiusa — non aggiungere colori</div>
<div style="display:flex;flex-wrap:wrap;gap:20px">
${colorTokens.map(swatch).join('\n')}
</div>
<p style="margin-top:36px;max-width:620px;line-height:1.7;color:var(--mid)">Nessun bianco freddo, nessun grigio neutro: la scala è tutta leggermente calda. <code>--accent</code> non decora, segna: oggi è solo il trattino davanti a un occhiello.</p>`),

  card('Foundations', 'Typography', 'Jost testo · Red Hat display · Bodoni corsivo', 1000, 700, 'Tipografia',
    `<div class="card-note">Tre caratteri, tre ruoli</div>
<div class="card-stack">
  <div>
    <div class="${cls('f-label')}">Section label</div>
  </div>
  <div><span class="${cls('h2-lg')}">Display grande <em>in corsivo</em></span>
    <div style="font-size:.7rem;color:var(--mid);margin-top:8px">.h2-lg — clamp(3rem, 5vw, 4.8rem)</div></div>
  <div><span class="${cls('h2')}">Titolo di sezione <em>con enfasi</em></span>
    <div style="font-size:.7rem;color:var(--mid);margin-top:8px">.h2 (e h2 nudo) — clamp(2.6rem, 4.2vw, 4rem)</div></div>
  <div><span class="${cls('sec-title--h3')}">Sottotitolo</span>
    <div style="font-size:.7rem;color:var(--mid);margin-top:8px">.sec-title--h3 — var(--type-h3)</div></div>
  <p style="max-width:560px;line-height:1.7;color:var(--charcoal)">Testo corrente in Jost 300. È il font del <code>body</code>: ogni paragrafo del sito è questo, non Red Hat. Il corsivo Bodoni serve una o due parole dentro un titolo, mai un paragrafo intero.</p>
</div>`),

  card('Foundations', 'Layout', 'Contenitore, respiro, fondi di sezione', 1000, 560, 'Impaginazione',
    `<div class="card-note">Contenitore 1200px · respiro 120/160px · breakpoint unico a 960px</div>
<div style="border:1px solid var(--rule)">
  <div class="${cls('s-white')}" style="padding:40px 24px"><span class="${cls('f-label')}">s-white</span></div>
  <div class="${cls('s-pearl')}" style="padding:40px 24px"><span class="f-label">s-pearl — il colore di stacco del sito</span></div>
  <div class="${cls('s-offwh')}" style="padding:40px 24px"><span class="f-label">s-offwh</span></div>
  <div class="${cls('s-ink')}" style="padding:40px 24px"><span class="f-label">s-ink — testo off-white</span></div>
  <div class="${cls('s-warm')}" style="padding:40px 24px"><span class="f-label">s-warm</span></div>
</div>
<p style="margin-top:32px;max-width:620px;line-height:1.7;color:var(--mid)"><code>.max</code> centra a 1200px. <code>.pad</code> dà 120px/64px, <code>.pad-lg</code> 160px/64px; sotto i 960px diventano 80/24 e 100/24. Non esiste una griglia a colonne dichiarata: i blocchi sono contenitori centrati con larghezze massime esplicite.</p>`),

  card('Components', 'SectionLabel', 'Occhiello con trattino oro', 900, 220, 'Occhiello',
    `<div class="card-note">.f-label — introduce un blocco</div>
<div class="${cls('f-label')}">Real Weddings</div>
<p style="margin-top:28px;max-width:560px;line-height:1.7;color:var(--mid)">Il trattino di 26px in <code>--accent</code> è generato da <code>::before</code>: non va disegnato a mano.</p>`),

  card('Components', 'Buttons', 'Pieno e testuale', 900, 260, 'Bottoni',
    `<div class="card-note">Due sole varianti</div>
<div class="card-row">
  <a href="#" class="${cls('btn-fill')}">Enquire</a>
  <a href="#" class="${cls('btn-text')}">Check your date now &rarr;</a>
</div>
<p style="max-width:560px;line-height:1.7;color:var(--mid)">Il testuale è un link sottolineato da un bordo di 1px, non un bottone travestito. È quello usato per le CTA morbide.</p>`),

  card('Components', 'FormField', 'Campo, e il suo stato di errore', 900, 420, 'Campo di form',
    `<div class="card-note">.fg — e l'errore segnalato dal peso del bordo</div>
<div class="${cls('ads-form-card')}" style="max-width:420px">
  <div class="${cls('fg')}">
    <label for="a">First name</label>
    <input id="a" type="text" value="Alessandro">
  </div>
  <div class="${cls('fg', 'fg--error')}" style="margin-top:24px">
    <label for="b">Email</label>
    <input id="b" type="email" value="non-valida">
    <p class="${cls('fg-error')}">Enter a valid email</p>
  </div>
</div>
<p style="margin-top:28px;max-width:560px;line-height:1.7;color:var(--mid)"><strong>Il segnale non è mai il colore.</strong> L'errore è il bordo inferiore che passa a 2px in <code>--ink</code>, e il messaggio riusa il registro tipografico delle label. Non esiste un rosso in questa palette, e non va introdotto.</p>`),

  card('Motion', 'Reveal', 'Comparsa allo scroll', 900, 240, 'Movimento',
    `<div class="card-note">.reveal → .reveal.visible</div>
<p style="max-width:600px;line-height:1.7;color:var(--charcoal)">Da <code>opacity: 0</code> e <code>translateY(22px)</code> alla posizione naturale, transizione <code>.8s ease</code>. Le classi <code>.d1</code> e <code>.d2</code> scaglionano il ritardo fra blocchi vicini.</p>
<p style="margin-top:20px;max-width:600px;line-height:1.7;color:var(--mid)">È l'unico movimento del sito, insieme agli hover in opacity 0.25–0.3s. Nessun parallasse, nessuna entrata elaborata.</p>`),
];

// ------------------------------------------------------------------ README
// Questo testo finisce nel prompt di sistema dell'agente di design: nomina
// vocabolario che deve esistere, o l'agente scriverà classi che non risolvono
// e produrrà pagine senza stile senza accorgersene. Passa dallo stesso
// cancello di verifica delle schede: ogni classe citata qui sotto con cls().

const README = `# Alex Cinisi Photography — design system

Fotografia di matrimoni destination, pubblico USA/UK/AU. Il registro è **silent luxury**: specificità, non aggettivi.

## Come si costruisce con questo sistema

**Non è una libreria di componenti React.** Non ci sono componenti da importare: si costruisce con HTML semantico e le classi di \`ds.css\`, esattamente come fa il sito.

Un design riceve solo la chiusura degli \`@import\` di \`styles.css\`, che tira dentro i font, i token e il foglio reale. Non serve altro setup — nessun provider, nessun wrapper obbligatorio.

⚠️ **Tailwind non è installato.** Non esiste \`flex\`, \`gap-4\`, \`text-4xl\`, \`uppercase\`. Se scrivi utility di quel genere non renderizzano niente. Per la tua impaginazione usa CSS esplicito (\`display:flex\` in uno \`<style>\`), per il vestito usa le classi qui sotto.

## Il vocabolario reale

**Fondi di sezione** — \`${cls('s-white')}\` · \`${cls('s-pearl')}\` (il colore di stacco del sito) · \`${cls('s-offwh')}\` · \`${cls('s-ink')}\` (testo off-white) · \`${cls('s-warm')}\`

**Respiro e contenitore** — \`${cls('pad')}\` (120/64px, 80/24 sotto i 960px) · \`${cls('pad-lg')}\` (160/64px, 100/24) · \`${cls('pad-sm')}\` · \`${cls('max')}\` (centra a 1200px)

**Titoli** — \`${cls('h2-lg')}\` il display grande · \`${cls('h2')}\` il titolo di sezione (uguale a un \`<h2>\` nudo) · \`${cls('sec-title--h1')}\` \`${cls('sec-title--h2')}\` \`${cls('sec-title--h3')}\` la scala guidata dai token

**Occhiello** — \`${cls('f-label')}\`: maiuscolo, spaziato, con un trattino oro generato da \`::before\`. È il modo canonico di introdurre un blocco.

**Azioni** — \`${cls('btn-fill')}\` (pieno, fondo \`--ink\`) · \`${cls('btn-text')}\` (link sottolineato da 1px). Sono le uniche due.

**Form** — \`${cls('fg')}\` il campo · \`${cls('fg--error')}\` sul campo in errore · \`${cls('fg-error')}\` il messaggio · \`${cls('ads-form-card')}\` la card che contiene il form.

**Movimento** — \`${cls('reveal')}\` più \`.visible\` quando entra nel viewport; \`${cls('d1')}\` e \`${cls('d2')}\` scaglionano.

## Regole che non si negoziano

1. **La palette è chiusa a undici colori.** Sono in \`tokens/tokens.css\`. Aggiungerne uno è un emendamento al sistema, non una scelta di pagina.
2. **Il segnale non è mai il colore.** Un errore è il bordo inferiore che passa a 2px in \`--ink\`; una conferma non è verde e non ha spunte. In questa palette non esiste un rosso, e non va introdotto.
3. **Non esiste una classe \`.h1\`.** L'\`<h1>\` si veste con \`.h2-lg\`. Livello semantico e taglia visiva sono decisi separatamente.
4. **Un \`<h3>\` nudo non ha una dimensione** — riceve solo famiglia e peso. Se ti serve, dagli una classe.
5. **Tre font, tre ruoli.** Jost è il testo corrente (è il font del \`body\`). Red Hat Display è display, occhielli, bottoni. Bodoni Moda corsivo serve **una o due parole dentro un titolo**, mai un paragrafo. Il gesto tipografico del sito è un titolo Red Hat 300 con due parole in corsivo Bodoni: una volta per pagina, non due.
6. **Niente hero fotografica inventata.** Il sito vieta una hero senza un'immagine reale. Se una pagina ha bisogno di respiro visivo, lo ottiene con spazio, tipografia e fondi.
7. **Copy.** Bandite: *beautiful, stunning, gorgeous, lovely, perfect, breathtaking, amazing*.

## Dove sta la verità

\`ds.css\` è il foglio di produzione del sito, copiato senza modifiche — 5.114 righe. Leggilo prima di inventare: se una classe ti serve, cercala lì. \`tokens/tokens.css\` ha i token; \`fonts/fonts.css\` i tre caratteri.

## Esempio idiomatico

\`\`\`html
<section class="pad-lg s-pearl">
  <div class="max" style="max-width:520px;text-align:center">
    <div class="f-label">Sicily Wedding Guide</div>
    <h1 class="h2-lg">It's on its <em>way</em></h1>
    <p style="margin-top:24px;line-height:1.7;color:var(--mid)">…</p>
    <p style="margin-top:36px"><a href="/call" class="btn-text">Check your date now &rarr;</a></p>
  </div>
</section>
\`\`\`

Le classi vestono; lo \`style\` inline fa solo la geometria di questo blocco. È la divisione che usa il sito.
`;

// verifica: ogni classe citata dalle schede deve esistere nel foglio
const ghosts = [...used].filter((c) => !defined.has(c)).sort();
if (ghosts.length) {
  console.error(`\n✗ Le schede citano ${ghosts.length} classi che in globals.css non esistono:\n  ${ghosts.join(', ')}\n`);
  process.exit(1);
}
console.log(`✓ ${used.size} classi citate dalle schede, tutte presenti in globals.css`);
console.log(`✓ ${colorTokens.length} token colore, ${typeTokens.length} token tipografici`);

if (CHECK_ONLY) process.exit(0);

// ------------------------------------------------------------------ emit

for (const d of ['components', '_preview', 'tokens']) rmSync(join(OUT, d), { recursive: true, force: true });
mkdirSync(join(OUT, 'tokens'), { recursive: true });
mkdirSync(join(OUT, '_preview'), { recursive: true });

// il CSS vero, non una sua descrizione
copyFileSync(CSS_PATH, join(OUT, 'ds.css'));

writeFileSync(join(OUT, 'tokens/tokens.css'),
  `/* Token del design system — estratti da src/app/globals.css, non riscritti.\n` +
  `   La palette è chiusa: aggiungere un colore è un emendamento, non una scelta di pagina. */\n:root {\n` +
  tokens.map(([k, v]) => `  ${k}: ${v};`).join('\n') +
  `\n\n  /* Nel sito queste le inietta next/font sull'elemento html. Fuori da Next\n` +
  `     vanno dichiarate qui, o ogni font-family che le usa diventa invalida\n` +
  `     al calcolo e il testo esce nel serif di sistema. */\n` +
  Object.entries(FONT_VARS).map(([k, v]) => `  ${k}: ${v};`).join('\n') +
  '\n}\n');

// styles.css è l'unica cosa che i design ricevono: tutto passa dai suoi @import
writeFileSync(join(OUT, 'styles.css'),
  `/* Alex Cinisi Photography — foglio unico del design system.\n * I design ricevono solo la chiusura di questi @import.\n */\n@import "./fonts/fonts.css";\n@import "./tokens/tokens.css";\n@import "./ds.css";\n`);

const manifest = [];
for (const c of CARDS) {
  const dir = join(OUT, 'components', c.group, c.name);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${c.name}.html`), c.html);
  writeFileSync(join(OUT, '_preview', `${c.name}.html`), c.html);
  manifest.push({ name: c.name, group: c.group, subtitle: c.subtitle, path: `components/${c.group}/${c.name}/${c.name}.html`, viewport: { width: c.width, height: c.height } });
}
writeFileSync(join(OUT, '_ds_cards.json'), JSON.stringify(manifest, null, 2) + '\n');
writeFileSync(join(OUT, 'README.md'), README);

console.log(`✓ ${CARDS.length} schede in ${OUT}`);
console.log(`✓ ds.css ${(css.length / 1024).toFixed(0)} KB — il foglio reale, copiato`);
