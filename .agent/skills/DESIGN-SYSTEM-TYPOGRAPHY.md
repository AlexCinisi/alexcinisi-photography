# DESIGN SYSTEM — Tipografia, Colori, Spaziature
## Alex Cinisi Photography · Regole Vincolanti
## v2.0 — Marzo 2026

> **Questo documento è LA LEGGE del sito.**
> Ogni pagina, sezione e componente DEVE rispettare queste regole.
> Nessun prompt Antigravity può sovrascriverle senza approvazione esplicita.

---

## 1. PALETTE COLORI

### Variabili CSS (definite in :root di globals.css)

| Token | Hex | RGB | Uso |
|---|---|---|---|
| `--black` | `#111110` | 17,17,16 | Nero assoluto (usare raramente) |
| `--ink` | `#1E1D1B` | 30,29,27 | Testo primario, bg scuri, CTA filled |
| `--warm-black` | `#0A0A09` | 10,10,9 | Sezioni immersive scure (stories cards, final CTA) |
| `--charcoal` | `#3A3835` | 58,56,53 | Body text, testo secondario |
| `--mid` | `#7A7672` | 122,118,114 | Label, eyebrow, testo muted |
| `--rule` | `#DEDBD6` | 222,219,214 | Bordi, divisori, linee sottili |
| `--pearl` | `#F5F3EF` | 245,243,239 | Sfondo sezioni calde (ex grey-bg) |
| `--off-white` | `#FAFAF8` | 250,250,248 | Sfondo chiaro alternativo |
| `--white` | `#FFFFFF` | 255,255,255 | Sfondo puro |
| `--accent` | `#B8A88A` | 184,168,138 | Accento gold (linea label, dettagli) |
| `--accent-dk` | `#8C7D65` | 140,125,101 | Gold scuro (hover accent) |

### Helper Classes per Background

```css
.s-white   { background: var(--white); }
.s-pearl   { background: var(--pearl); }
.s-off-wh  { background: var(--off-white); }
.s-ink     { background: var(--ink); color: var(--off-white); }
.s-warm    { background: var(--warm-black); color: var(--off-white); }
```

### Regole Colore Vincolanti

1. **Mai usare nero puro (#000000)** — Usare `--ink` o `--warm-black`
2. **Testo su sfondo scuro** = `var(--off-white)` mai `var(--white)` (troppo freddo)
3. **Label/eyebrow** = sempre `var(--mid)` con linea `var(--accent)`
4. **Link/CTA su scuro** = `var(--off-white)` con opacity per hover
5. **Sequenza sezioni homepage:** alternare pearl ↔ white, con warm-black per le stories e ink per about/film/final-cta. MAI due sezioni consecutive dello stesso colore.

---

## 2. FONT STACK

| Ruolo | Font | Weight | Caricamento |
|---|---|---|---|
| **Heading** | Red Hat Display | 300 (Light) | next/font/google |
| **Italic accent** | Bodoni Moda | 400 (Regular Italic) | next/font/google |
| **Body** | Jost | 300 (Light) | next/font/google |

### Regole Fondamentali
- Red Hat Display per tutti gli heading (h1, h2, h3)
- Bodoni Moda **SOLO** per `<em>` dentro heading — mai per body text
- Jost per tutto il body text
- `body { font-weight: 300; }` — il sito è LEGGERO, mai bold su body
- `-webkit-font-smoothing: antialiased` sempre attivo

---

## 3. SCALA TIPOGRAFICA — DESKTOP (≥ 961px)

### Benchmark: D&S desktop usa h2 98px, body 18.2px, label 14px
### Noi non arriviamo a 98px (testo più lungo) ma portiamo a proporzioni luxury.

| Elemento | CSS | Rendered @1440px | Note |
|---|---|---|---|
| **h1 Hero L1/L3** | `clamp(2.8rem, 5.2vw, 4.8rem)` | ~75px | Red Hat Display 300 |
| **h1 Hero L2 (em)** | `clamp(3rem, 5.6vw, 5.2rem)` | ~81px | Bodoni Moda italic |
| **h2 (.h2)** | `clamp(2.6rem, 4.2vw, 4rem)` ⬆️ | ~60px | Da 56px. Red Hat 300 |
| **h2-lg (.h2-lg)** | `clamp(3rem, 5vw, 4.8rem)` ⬆️ | ~72px | Da 67px. Per stories intro, final CTA |
| **h2/h2-lg em** | eredita size | — | Bodoni Moda italic |
| **h3 Story Couple** | `clamp(1.8rem, 2.8vw, 2.6rem)` ⬆️ | ~40px | Da 35px. Bodoni Moda italic |
| **h3 Pillar/Step** | `1.15rem` | ~18px | Red Hat Display 400 |
| **Body (p)** | `0.95rem` ⬆️ | ~15px | Da 14.4px. Jost 300 |
| **Eyebrow (.f-label)** | `0.72rem` ⬆️ | ~11.5px | Da 9.9px. Jost 400 UPPERCASE |
| **CTA (.btn-fill)** | `0.72rem` ⬆️ | ~11.5px | Da 10.9px. Jost 400 UPPERCASE |
| **CTA (.btn-text)** | `0.78rem` ⬆️ | ~12.5px | Da 10.9px. Jost 400 UPPERCASE |
| **Story Badge** | `0.68rem` ⬆️ | ~11px | Da 8.8px |
| **Story Venue** | `0.72rem` ⬆️ | ~11.5px | Da 11.2px |
| **Nav Logo** | `0.8rem` | ~13px | Invariato |
| **Testimonial Quote** | `1.05rem` | ~17px | Jost italic 300 |

> ⬆️ = incrementato rispetto alla v1

---

## 4. SCALA TIPOGRAFICA — MOBILE (≤ 960px)

### Benchmark: D&S mobile usa h1 hero 53px, stories h2 45px, card title 25px
### Mai scendere sotto questi minimi per mantenere impatto luxury.

| Elemento | CSS Mobile | Rendered @500px | Min assoluto |
|---|---|---|---|
| **h1 Hero** | `clamp(2.2rem, 8vw, 3rem)` | ~40px | 35px |
| **h2 (.h2)** | `clamp(2rem, 6vw, 2.8rem)` ⬆️ | ~30px | 28px |
| **h2-lg (.h2-lg)** | `clamp(2.4rem, 7.5vw, 3.2rem)` ⬆️ | ~37px | 35px |
| **h3 Story Couple** | `clamp(1.6rem, 5vw, 2.2rem)` | ~25px | 24px |
| **Body (p)** | `0.9rem` | ~14px | 14px |
| **Eyebrow (.f-label)** | `0.65rem` ⬆️ | ~10px | 10px |
| **CTA (.btn-fill/text)** | `0.68rem` | ~11px | 10px |
| **Story Badge** | `0.62rem` ⬆️ | ~10px | 9px |

> 🔴 Stato attuale: stories h2 mobile = 27.2px (D&S = 44.8px). Deve salire a ~37px.

---

## 5. SPAZIATURE SEZIONI

### Desktop (≥ 961px)

| Classe | Padding | Uso |
|---|---|---|
| `.pad` | `120px 64px` ⬆️ | Sezioni standard |
| `.pad-lg` | `160px 64px` 🆕 | Sezioni statement (stories intro, final CTA) |
| `.pad-sm` | `72px 64px` | Sezioni compatte (trust bar, availability) |

### Mobile (≤ 960px)

| Classe | Padding |
|---|---|
| `.pad` | `80px 24px` |
| `.pad-lg` | `100px 24px` |
| `.pad-sm` | `52px 24px` |

### Spaziature Interne

| Contesto | Desktop | Mobile |
|---|---|---|
| .f-label → h2 | 16px | 14px |
| h2 → body text | 24px | 20px |
| body → CTA | 36px | 28px |
| sec-head → contenuto | 72px | 48px |

---

## 6. STORIES SECTION — SPECIFICHE DESKTOP

### Intro (stories-intro-section)
```
Padding: .pad-lg (160px 64px)
Background: var(--pearl) → transizione JS a var(--warm-black)
Label: .f-label 0.72rem — "Real Weddings"
Heading: .h2-lg clamp(3rem, 5vw, 4.8rem)
Body: max-width 520px, 0.95rem
CTA: .btn-text 0.78rem — "See All Stories"
```

### Story Cards (stories-cards-section)
```
Background: var(--warm-black) fisso
Card height: min(82vh, 780px)
Grid: 55fr / 45fr (immagine / testo)
Card pari: direction rtl (alternanza sx/dx)

Placeholder: #E8E5E0 (chiaro su scuro = contrasto)
Badge: 0.68rem
Couple: clamp(1.8rem, 2.8vw, 2.6rem) Bodoni italic
Venue: 0.72rem
CTA: 0.72rem
Copy padding: 64px
```

---

## 7. STORIES SECTION — SPECIFICHE MOBILE

### Intro Mobile
```
Padding: .pad-lg (100px 24px)
Heading: .h2-lg clamp(2.4rem, 7.5vw, 3.2rem) → ~37px a 500px
```

### Story Cards Mobile
```
Grid: 1 colonna
Immagine: sopra, height 60vh (min 400px)
Testo: sotto, padding 40px 24px
Badge: 0.62rem
Couple: clamp(1.6rem, 5vw, 2.2rem) → ~25px
```

> D&S usa layout side-by-side anche su mobile (200px img + testo).
> Noi usiamo stacked (immagine full-width sopra) = foto più grande e impattante.
> Entrambi gli approcci sono validi — il nostro dà più spazio alla foto.

---

## 8. HERO — SPECIFICHE (GIÀ IMPLEMENTATO)

### Desktop
```
Layout: full-screen con .hero-bg (background image) + .hero-content overlay
Height: 100vh
h1 L1/L3: clamp(2.8rem, 5.2vw, 4.8rem) — Red Hat Display 300
h1 L2 (italic): clamp(3rem, 5.6vw, 5.2rem) — Bodoni Moda
Subtitle: 0.9rem, max-width 440px
```

### Mobile
```
Layout: STESSO — .hero-bg full-screen + .hero-content overlay
Height: 100vh (100svh preferibile per iOS)
h1: ~35px — la foto è VISIBILE come sfondo
Foto: NON nascondere MAI la foto hero su mobile
```

> ✅ La hero attuale è già corretta — mostra la foto su entrambi i dispositivi.
> 🔴 Il vecchio CSS (.hero-right display:none) non è più attivo grazie al redesign v3.

---

## 9. SEZIONI MEDIA SU MOBILE

### Stato attuale verificato (tutte VISIBILI su mobile ✅)
| Sezione | Media su mobile | Note |
|---|---|---|
| Hero | ✅ .hero-bg visibile | Background image full-screen |
| Manifesto | ✅ .manifesto-media visibile | Griglia foto |
| About | ✅ .about-img visibile | Ritratto Alex |
| Film | ✅ .film-media visibile | Frame analogici |
| Stories | ✅ .story-card-img visibile | Stacked, 60vh |

> 🔴 Il vecchio globals.css contiene regole `display: none` per mobile
> che POTREBBERO non essere più attive (overridden da componenti v3).
> Verificare che queste regole non interferiscano:
> `.manifesto-media, .about-img, .film-media { display: none; }` in @media ≤960px

---

## 10. REGOLE DI GERARCHIA VISIVA

### Scala di Dominanza
1. **Immagini** — sempre l'elemento più grande
2. **Heading** — grande, leggero (weight 300)
3. **Whitespace** — generoso
4. **Body text** — discreto
5. **Label/CTA** — piccoli, funzionali

### Anti-Pattern da Evitare
- ❌ Heading sotto 2.6rem desktop / 2rem mobile
- ❌ Bold su body text
- ❌ Label sopra 0.78rem
- ❌ Padding sezione sotto 120px desktop
- ❌ Body text oltre 70 caratteri per riga
- ❌ Gradient scuri come placeholder su sfondo scuro
- ❌ Nascondere foto su mobile

---

## 11. REGOLE PER ANTIGRAVITY

### Ogni prompt DEVE:
1. Citare questo documento per tipografia e colori
2. Usare classi CSS definite (.h2, .h2-lg, .f-label, .btn-text)
3. Usare token colore (var(--ink), var(--charcoal)) — mai hex raw
4. Usare classi padding (.pad, .pad-lg, .pad-sm)
5. Specificare comportamento mobile esplicito

### Checklist Pre-Deploy
- [ ] Font size heading ≥ 2.6rem desktop, ≥ 2rem mobile?
- [ ] Body text ≤ 1rem?
- [ ] Label 0.65-0.78rem?
- [ ] Padding sezione ≥ 120px desktop, ≥ 80px mobile?
- [ ] Max-width body text ≤ 520px?
- [ ] Nessun colore hardcoded?
- [ ] Foto visibili su mobile?
- [ ] Placeholder chiari su sfondo scuro?
