#!/usr/bin/env node
// mappa-sito — legge il sito LIVE e scrive nel vault Obsidian una mappa di chi linka chi.
//
// Uso:   npm run mappa:sito
//        node scripts/mappa-sito.mjs [--base https://alexcinisiphotography.com] [--out ../vault/01-Projects/strumenti-sito/mappa]
//
// Cosa fa:
//   1. legge /sitemap.xml del sito;
//   2. scarica ogni pagina e prende i link interni SOLO dentro <main> (nav e footer sono uguali
//      ovunque e renderebbero il grafo un groviglio: qui contano i link del contenuto, compresi
//      gli href raw scritti nei testi Sanity);
//   3. controlla anche le destinazioni fuori sitemap (redirect, 404, pagine dimenticate);
//   4. scrive nel vault: una nota per pagina (wikilink → grafo di Obsidian), un .canvas
//      ordinato per sezione, e _rapporto.md con orfane, link rotti, redirect e noindex.
//
// Layout: posizioni e dimensioni sistemate a mano nel canvas si conservano tra un lancio e l'altro.
// Sicurezza: cancella SOLO le note in <out>/pagine che portano `generato: mappa-sito`.
// Non tocca il codice del sito né Sanity. Nessuna dipendenza: Node 18+ (fetch nativo).

import { mkdir, readdir, readFile, rm, writeFile, stat } from 'node:fs/promises'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), []),
)
const BASE = (args.base || 'https://alexcinisiphotography.com').replace(/\/$/, '')
const OUT = resolve(args.out || join(here, '../../vault/01-Projects/strumenti-sito/mappa'))
const HOST = new URL(BASE).host.replace(/^www\./, '')
const MARKER = 'generato: mappa-sito'
const TODAY = new Date().toISOString().slice(0, 10)

// Ordine delle colonne nel canvas; le sezioni non elencate vanno in fondo.
const SECTION_ORDER = ['home', 'locations', 'journal', 'getting-married-in-sicily', 'proposal-photography-sicily', 'sicily-wedding-guide', 'about', 'contact', 'ads']

// ---------- fetch ----------
async function get(url) {
  try {
    const res = await fetch(url, {
      redirect: 'manual',
      headers: { 'user-agent': 'mappa-sito-script' },
      signal: AbortSignal.timeout(15000),
    })
    const location = res.headers.get('location')
    const body = res.status === 200 ? await res.text() : ''
    return { status: res.status, location: location ? normalize(location, url) ?? location : null, body }
  } catch (e) {
    return { status: 0, location: null, body: '', error: e.message }
  }
}

async function pool(items, n, fn) {
  const out = new Array(items.length)
  let i = 0
  await Promise.all(Array.from({ length: n }, async () => {
    while (i < items.length) { const k = i++; out[k] = await fn(items[k]) }
  }))
  return out
}

// ---------- url ----------
const SKIP = /^\/(_next|studio|api)(\/|$)|\.[a-z0-9]{2,5}$/i
function normalize(href, from) {
  if (!href || /^(mailto:|tel:|javascript:|#)/i.test(href)) return null
  let u
  try { u = new URL(href, from) } catch { return null }
  if (u.host.replace(/^www\./, '') !== HOST) return null
  let p = decodeURI(u.pathname).replace(/\/+$/, '') || '/'
  if (SKIP.test(p)) return null
  return p
}
const section = (p) => (p === '/' ? 'home' : p.split('/')[1])
const noteName = (p) => (p === '/' ? 'home' : p.slice(1).replace(/\//g, '--').replace(/[^\w.-]+/g, '_').replace(/^_+|_+$/g, '') || 'pagina')
const code = (s) => (String(s).includes('`') ? '`` ' + s + ' ``' : '`' + s + '`')

// ---------- html ----------
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').trim()
function parse(html, url) {
  const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '')
  const robots = (html.match(/<meta[^>]+name=["']robots["'][^>]*>/i) || [''])[0]
  const noindex = /noindex/i.test(robots)
  const canonical = (html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)/i) || [])[1] || null
  let main = (html.match(/<main[\s>][\s\S]*<\/main>/i) || [])[0]
  const hasMain = Boolean(main)
  if (!main) main = html.replace(/<nav[\s>][\s\S]*?<\/nav>|<footer[\s>][\s\S]*?<\/footer>|<header[\s>][\s\S]*?<\/header>/gi, '')
  main = main.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, '')
  const links = []
  for (const m of main.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)) {
    const p = normalize(decode(m[1]), url)
    if (p) links.push(p)
  }
  return { title, noindex, canonical, hasMain, links }
}

// ---------- crawl ----------
console.log(`mappa-sito · ${BASE}`)
const sm = await get(`${BASE}/sitemap.xml`)
if (sm.status !== 200) { console.error(`sitemap.xml non leggibile (HTTP ${sm.status})`); process.exit(1) }
const sitemapPaths = [...new Set([...sm.body.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => normalize(m[1], BASE)).filter(Boolean))]
console.log(`sitemap: ${sitemapPaths.length} URL`)

const pages = new Map() // path -> info
const crawled = await pool(sitemapPaths, 4, async (p) => [p, await get(BASE + (p === '/' ? '/' : p))])
for (const [p, r] of crawled) {
  const info = { path: p, inSitemap: true, status: r.status, location: r.location, title: '', noindex: false, canonical: null, hasMain: false, out: [] }
  if (r.status === 200) { const x = parse(r.body, BASE + p); Object.assign(info, { title: x.title, noindex: x.noindex, canonical: x.canonical, hasMain: x.hasMain, out: x.links }) }
  pages.set(p, info)
}

// destinazioni fuori sitemap: solo stato HTTP, non si seguono i loro link
const extra = [...new Set([...pages.values()].flatMap((i) => i.out))].filter((p) => !pages.has(p))
const extraRes = await pool(extra, 4, async (p) => [p, await get(BASE + p)])
for (const [p, r] of extraRes) {
  const info = { path: p, inSitemap: false, status: r.status, location: r.location, title: '', noindex: false, canonical: null, hasMain: false, out: [] }
  if (r.status === 200) { const x = parse(r.body, BASE + p); Object.assign(info, { title: x.title, noindex: x.noindex, canonical: x.canonical }) }
  pages.set(p, info)
}

// archi e conteggi
const edges = new Map() // "from|to" -> n
for (const i of pages.values()) for (const t of i.out) if (t !== i.path) edges.set(`${i.path}|${t}`, (edges.get(`${i.path}|${t}`) || 0) + 1)
const inbound = new Map([...pages.keys()].map((p) => [p, []]))
for (const k of edges.keys()) { const [f, t] = k.split('|'); inbound.get(t).push(f) }
const outbound = (p) => [...edges.keys()].filter((k) => k.startsWith(p + '|')).map((k) => k.split('|')[1])

const label = (p) => { const i = pages.get(p); return (i.title || p).replace(/\s*[|–—-]\s*Alex Cinisi.*$/i, '').replace(/\s*\|\s*/g, ' · ').replace(/[\[\]#^]/g, '') || p }
const link = (p) => `[[${noteName(p)}|${label(p)}]]`
const broken = (p) => { const s = pages.get(p).status; return s === 0 || s >= 400 }
const redirect = (p) => { const s = pages.get(p).status; return s >= 300 && s < 400 }

// ---------- scrittura ----------
const pagesDir = join(OUT, 'pagine')
await mkdir(pagesDir, { recursive: true })
for (const f of await readdir(pagesDir)) {
  if (!f.endsWith('.md')) continue
  const txt = await readFile(join(pagesDir, f), 'utf8')
  if (txt.includes(`\n${MARKER}\n`)) await rm(join(pagesDir, f))
}

for (const i of pages.values()) {
  const p = i.path, ins = inbound.get(p), outs = outbound(p)
  const warn = []
  if (broken(p)) warn.push(`> [!danger] HTTP ${i.status || 'errore di rete'}\n> Pagina rotta: chi la linka manda a un errore.`)
  if (redirect(p)) warn.push(`> [!warning] Redirect ${i.status} → \`${i.location}\`\n> Chi la linka dovrebbe puntare direttamente alla destinazione.`)
  if (i.noindex) warn.push(`> [!warning] noindex\n> ${i.inSitemap ? 'È in sitemap ma chiede di non essere indicizzata: contraddizione.' : 'Non indicizzata.'}`)
  if (!i.inSitemap && i.status === 200) warn.push('> [!warning] Fuori sitemap\n> Raggiungibile e linkata, ma non dichiarata in sitemap.xml.')
  if (i.inSitemap && p !== '/' && ins.length === 0) warn.push('> [!warning] Orfana\n> Nessuna pagina la linka dal contenuto (solo menu/footer, se c\'è).')
  const md = `---
tipo: risorsa
stato: attivo
creato: ${TODAY}
tag: [mappa-sito, sezione/${section(p)}]
${MARKER}
url: ${BASE}${p === '/' ? '/' : p}
sezione: ${section(p)}
http: ${i.status}
noindex: ${i.noindex}
in_sitemap: ${i.inSitemap}
link_in_entrata: ${ins.length}
link_in_uscita: ${outs.length}
---
# ${label(p)}

${code(p)} · [apri sul sito](${BASE}${p === '/' ? '/' : encodeURI(p)})${i.canonical && normalize(i.canonical, BASE) !== p ? ` · canonical → ${code(i.canonical)}` : ''}

${warn.join('\n\n')}

## Linka verso (${outs.length})
${outs.length ? outs.map((t) => `- ${link(t)}${edges.get(`${p}|${t}`) > 1 ? ` ×${edges.get(`${p}|${t}`)}` : ''}${broken(t) ? ' — ⛔ rotto' : redirect(t) ? ' — ↪ redirect' : ''}`).join('\n') : i.inSitemap ? '- nessun link interno nel contenuto' : '- non analizzata (fuori sitemap)'}

## Linkata da (${ins.length})
${ins.length ? ins.map((f) => `- ${link(f)}`).join('\n') : '- nessuna pagina'}

---
Generata da \`npm run mappa:sito\` il ${TODAY}. Non modificare a mano: viene riscritta.
`
  await writeFile(join(pagesDir, noteName(p) + '.md'), md.replace(/\n{3,}/g, '\n\n'))
}

// canvas: una colonna per sezione
let vaultRoot = OUT
while (vaultRoot !== dirname(vaultRoot)) {
  try { await stat(join(vaultRoot, '.obsidian')); break } catch { vaultRoot = dirname(vaultRoot) }
}
const relPages = relative(vaultRoot, pagesDir)
const bySection = new Map()
for (const p of pages.keys()) { const s = section(p); if (!bySection.has(s)) bySection.set(s, []); bySection.get(s).push(p) }
const sections = [...bySection.keys()].sort((a, b) => (SECTION_ORDER.indexOf(a) + 1 || 99) - (SECTION_ORDER.indexOf(b) + 1 || 99) || a.localeCompare(b))
// Il layout fatto a mano in Obsidian si conserva: se il canvas esiste, ogni scheda già presente
// mantiene posizione e dimensioni; si ricalcolano solo colori, collegamenti e le schede nuove.
const canvasPath = join(OUT, 'mappa-sito.canvas')
const prev = new Map()
try { for (const n of JSON.parse(await readFile(canvasPath, 'utf8')).nodes || []) prev.set(n.id, n) } catch {}
const geo = (id) => { const o = prev.get(id); return { x: o.x, y: o.y, width: o.width, height: o.height } }
// TALL: le sezioni di una sola pagina hanno la scheda alta, così la nota si legge per intero.
const nodes = [], cEdges = [], W = 320, H = 70, TALL = 1640, GAP = 30, COL = 440
const nodeId = (p) => 'n-' + noteName(p)
sections.forEach((s, c) => {
  const list = bySection.get(s).sort((a, b) => a.length - b.length || a.localeCompare(b))
  const known = list.filter((p) => prev.has(nodeId(p))).map((p) => geo(nodeId(p)))
  const colX = known.length ? known[0].x : c * COL
  let cursor = known.length ? Math.max(...known.map((g) => g.y + g.height)) + GAP : 0
  const h = list.length === 1 && s !== 'home' ? TALL : H
  const gIndex = nodes.push(null) - 1 // il gruppo va prima dei figli (sta sotto nel canvas)
  const members = []
  for (const p of list) {
    const i = pages.get(p)
    const g = prev.has(nodeId(p)) ? geo(nodeId(p)) : { x: colX, y: cursor, width: W, height: h }
    if (!prev.has(nodeId(p))) cursor = g.y + g.height + GAP
    members.push(g)
    const color = broken(p) ? '1' : redirect(p) || i.noindex ? '2' : !i.inSitemap ? '3' : i.inSitemap && p !== '/' && inbound.get(p).length === 0 ? '5' : undefined
    nodes.push({ id: nodeId(p), type: 'file', file: `${relPages}/${noteName(p)}.md`, ...g, ...(color ? { color } : {}) })
  }
  const minX = Math.min(...members.map((g) => g.x)), minY = Math.min(...members.map((g) => g.y))
  const maxX = Math.max(...members.map((g) => g.x + g.width)), maxY = Math.max(...members.map((g) => g.y + g.height))
  const fit = { x: minX - 20, y: minY - 60, width: maxX - minX + 40, height: maxY - minY + 80 }
  const pg = prev.get('g-' + s)
  const encloses = pg && pg.x <= fit.x && pg.y <= fit.y && pg.x + pg.width >= fit.x + fit.width && pg.y + pg.height >= fit.y + fit.height
  nodes[gIndex] = { id: 'g-' + s, type: 'group', label: s, ...(encloses ? geo('g-' + s) : fit) }
})
for (const k of edges.keys()) {
  const [f, t] = k.split('|')
  cEdges.push({ id: 'e-' + noteName(f) + '__' + noteName(t), fromNode: nodeId(f), fromSide: 'right', toNode: nodeId(t), toSide: 'left', ...(broken(t) ? { color: '1' } : {}) })
}
nodes.push({ id: 'legenda', type: 'text', ...(prev.has('legenda') ? geo('legenda') : { x: -20, y: -300, width: 560, height: 200 }), text: `**Mappa del sito** · ${TODAY}\nFrecce = link nel contenuto (\`<main>\`), menu e footer esclusi.\n🔴 rotta · 🟠 redirect o noindex · 🟡 fuori sitemap · 🔵 orfana\nRigenera: \`npm run mappa:sito\` · dettagli in [[_rapporto]]` })
await writeFile(canvasPath, JSON.stringify({ nodes, edges: cEdges }, null, '\t'))

// rapporto
const all = [...pages.values()]
const inMap = all.filter((i) => i.inSitemap)
const orphans = inMap.filter((i) => i.path !== '/' && inbound.get(i.path).length === 0)
const brokenLinks = [...edges.keys()].map((k) => k.split('|')).filter(([, t]) => broken(t))
const redirLinks = [...edges.keys()].map((k) => k.split('|')).filter(([, t]) => redirect(t))
const noindexInMap = inMap.filter((i) => i.noindex)
const linkedNoindex = all.filter((i) => i.noindex && inbound.get(i.path).length)
const offMap = all.filter((i) => !i.inSitemap && i.status === 200)
const noMain = inMap.filter((i) => i.status === 200 && !i.hasMain)
const row = (arr, fn, empty = '- nessuna ✅') => (arr.length ? arr.map(fn).join('\n') : empty)
const report = `---
tipo: risorsa
stato: attivo
creato: ${TODAY}
tag: [mappa-sito]
${MARKER}
---
# Rapporto mappa del sito — ${TODAY}

${inMap.length} pagine in sitemap · ${offMap.length} raggiungibili fuori sitemap · ${edges.size} collegamenti nel contenuto. Sorgente: ${BASE}/sitemap.xml.

> [!tip] Come leggerla
> - **Canvas**: apri [[mappa-sito.canvas]] — una colonna per sezione, frecce = link.
> - **Grafo**: vista Grafo di Obsidian con filtro \`path:"${relative(vaultRoot, OUT)}"\` → vedi chi è collegato con chi; gruppi per \`tag:#sezione/journal\` ecc.
> - Si conta solo il contenuto (\`<main>\`): i link di menu e footer sono uguali ovunque e vengono esclusi.

## Pagine orfane (nessun link dal contenuto)
${row(orphans, (i) => `- ${link(i.path)}`)}

## Link rotti
${row(brokenLinks, ([f, t]) => `- ${link(f)} → ${code(t)} (HTTP ${pages.get(t).status || 'errore'})${t.includes('`') ? ' — l\'href contiene apici inversi: in Sanity va riscritto senza' : ''}`)}

## Link che passano da un redirect
${row(redirLinks, ([f, t]) => `- ${link(f)} → ${code(t)} ↪ ${code(pages.get(t).location)}`)}

## In sitemap ma noindex
${row(noindexInMap, (i) => `- ${link(i.path)}`)}

## Pagine noindex che ricevono link
${row(linkedNoindex, (i) => `- ${link(i.path)} ← ${inbound.get(i.path).map(link).join(', ')}`)}

## Raggiungibili ma fuori sitemap
${row(offMap, (i) => `- ${link(i.path)}${i.noindex ? ' (noindex, ok se voluto)' : ''}`)}

${noMain.length ? `## Pagine senza <main> (analisi meno precisa: menu e footer tolti a regex)\n${row(noMain, (i) => `- ${link(i.path)}`)}\n` : ''}
## Tutte le pagine
| Pagina | Sezione | In | Out | HTTP |
|---|---|---|---|---|
${[...inMap, ...offMap].sort((a, b) => inbound.get(a.path).length - inbound.get(b.path).length).map((i) => `| ${link(i.path).replace('|', '\\|')} | ${section(i.path)} | ${inbound.get(i.path).length} | ${outbound(i.path).length} | ${i.status}${i.noindex ? ' · noindex' : ''} |`).join('\n')}
`
await writeFile(join(OUT, '_rapporto.md'), report)

console.log(`scritto in ${OUT}`)
console.log(`  ${pages.size} note · ${edges.size} collegamenti · orfane ${orphans.length} · link rotti ${brokenLinks.length} · redirect ${redirLinks.length} · noindex in sitemap ${noindexInMap.length} · fuori sitemap ${offMap.length}`)
