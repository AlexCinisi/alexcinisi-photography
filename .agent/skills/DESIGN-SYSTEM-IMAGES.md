# DESIGN SYSTEM — Aspect Ratio & Immagini per Componente
## Alex Cinisi Photography · Regole Vincolanti
## v2.0 — Marzo 2026

> **Ogni componente ha un aspect ratio definito.**
> Le foto NON vengono MAI nascoste su mobile.

---

## 1. PRINCIPI FONDAMENTALI

### DNA visivo
- **Formato dominante: 3:4 portrait** — Lavoro analogico verticale
- **object-fit: cover** su TUTTE le immagini
- **Sanity hotspot/crop** per focal point
- **Lazy loading** su tutto tranne Hero

### Regola Placeholder (Fase Dev)
- **Su sfondo chiaro (pearl, white):** `linear-gradient(155deg, #e2ddd7, #d2cbc0)` (caldo)
- **Su sfondo scuro (warm-black, ink):** `#E8E5E0` solido (chiaro = contrasto visibile)
- **❌ MAI** gradient scuri su sfondo scuro

### Regola Mobile Assoluta
> **Le immagini NON vengono MAI nascoste su mobile.**
> Ogni sezione che ha foto su desktop le mostra anche su mobile.
> Verificato: D&S mostra TUTTE le foto su mobile.

---

## 2. MAPPA ASPECT RATIO PER COMPONENTE

---

### HERO

| | Desktop | Mobile |
|---|---|---|
| **Layout** | .hero-bg full-screen + .hero-content overlay | Identico |
| **Altezza** | 100vh | 100vh (100svh su iOS) |
| **Immagine** | Background image, full viewport | Background image, full viewport |
| **Ratio sorgente ideale** | 3:4 portrait | 3:4 portrait |
| **object-fit** | cover | cover |
| **object-position** | center 20% (viso in alto) | center 20% |

```css
.hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center 20%;
}
```

**Upload Sanity:** 1600×2133px (3:4)

**Placeholder dev:**
```css
/* Gradient caldo — sfondo chiaro che contrasta col testo scuro */
background: linear-gradient(160deg, #e6e2dc, #d4cdc4, #c8bfb3);
```

> ✅ GIÀ IMPLEMENTATO CORRETTAMENTE — hero visibile su desktop e mobile

---

### MANIFESTO

| | Desktop | Mobile |
|---|---|---|
| **Layout** | Grid 2 col: copy + media | Grid 1 col, media VISIBILE sotto |
| **Foto grande (mm1)** | 2:3 portrait, grid-row span 2 | Adattata, visibile |
| **Foto piccole** | 4:3 landscape, 2 celle | Adattate, visibili |

```css
.manifesto-media {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 4px;
}
/* MOBILE: NON usare display:none */
@media (max-width: 960px) {
  .manifesto-media {
    grid-template-columns: 1fr 1fr;
    /* Rimane visibile, si adatta */
  }
}
```

**Upload Sanity:**
- Grande: 1200×1800px (2:3)
- Piccole: 800×600px (4:3)

---

### PHOTO PAUSE (Sezioni immersive full-width)

| | Desktop | Mobile |
|---|---|---|
| **Altezza** | 45vh (min 320px, max 560px) | 35vh (min 240px) |
| **Ratio sorgente** | 21:9 ultra-wide | Stesso, croppato cover |

```css
.photo-pause {
  width: 100%;
  height: 45vh;
  min-height: 320px;
  max-height: 560px;
  overflow: hidden;
}
@media (max-width: 960px) {
  .photo-pause { height: 35vh; min-height: 240px; }
}
```

**Upload Sanity:** 2400×1028px (21:9)

---

### STORY CARDS (Featured Stories) ⭐ IL PIÙ IMPORTANTE

| | Desktop | Mobile |
|---|---|---|
| **Layout card** | Grid 55fr/45fr (img + testo) | Grid 1 colonna (img sopra, testo sotto) |
| **Altezza card** | min(82vh, 780px) | auto (img + testo) |
| **Altezza immagine** | Tutta la card | 60vh (min 400px) |
| **Larghezza immagine** | 55% card | 100% viewport |
| **Ratio sorgente** | 3:4 portrait | 3:4 portrait (croppato cover) |
| **Alternanza** | Card pari: img a destra | Nessuna alternanza (sempre img sopra) |

```css
/* Desktop */
.story-card {
  display: grid;
  grid-template-columns: 55fr 45fr;
  height: min(82vh, 780px);
  overflow: hidden;
}
.story-card:nth-child(even) {
  direction: rtl;
}
.story-card:nth-child(even) > * {
  direction: ltr;
}

.story-card-img {
  position: relative;
  overflow: hidden;
}
.story-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
}

/* Mobile */
@media (max-width: 960px) {
  .story-card {
    grid-template-columns: 1fr;
    height: auto;
  }
  .story-card:nth-child(even) {
    direction: ltr; /* Reset alternanza */
  }
  .story-card-img {
    height: 60vh;
    min-height: 400px;
  }
}
```

**Placeholder dev (su sfondo warm-black):**
```css
.story-card-img-ph {
  width: 100%;
  height: 100%;
  background: #E8E5E0;  /* ✅ CHIARO su scuro = visibile */
}
```

**Upload Sanity:** 1200×1600px (3:4)

> **Confronto D&S mobile:** D&S usa layout side-by-side anche su mobile (img 200px + testo).
> Noi usiamo stacked (img full-width sopra). Con foto reali portrait 3:4, il nostro
> approccio è più impattante perché la foto occupa tutto lo schermo.

---

### PORTFOLIO GRID

| Slot | Ratio | Orientamento | Desktop Height | Mobile |
|---|---|---|---|---|
| Item 1 (hero) | 3:4 | Portrait | 560px | 280px, span 12 |
| Item 2 | 16:9 | Landscape | 272px | 280px, span 12 |
| Item 3 | 4:5 | Portrait | 272px | 280px, span 12 |
| Item 4 | 1:1 | Quadrato | 272px | 280px, span 12 |
| Item 5 | 3:2 | Landscape | 300px | 280px, span 12 |
| Item 6 | 16:9 | Landscape | 300px | 280px, span 12 |

```css
.port-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 4px;
}
@media (max-width: 960px) {
  .port-item { grid-column: span 12 !important; height: 280px !important; }
}
```

---

### FILM SECTION

| | Desktop | Mobile |
|---|---|---|
| **Layout** | Grid 2 col: media + copy | 1 col, media VISIBILE |
| **Frame ratio** | 2:3 portrait (pellicola medium format) | Adattato |
| **Frame count** | 4 frames, 2×2 grid | Stesso grid, ridimensionato |

```css
.film-media {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
}
/* MOBILE: NON usare display:none */
```

**Upload Sanity:** 1000×1500px (2:3)

---

### ABOUT SECTION

| | Desktop | Mobile |
|---|---|---|
| **Layout** | Grid 2 col: img + copy | 1 col, img VISIBILE |
| **Ratio** | 3:4 portrait | 3:4, adattato |
| **Min height** | 680px | Auto |

```css
.about-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 25%;
}
/* MOBILE: NON usare display:none */
```

**Upload Sanity:** 1200×1600px (3:4)

---

## 3. TABELLA RIEPILOGATIVA

| Componente | Ratio | Desktop Height | Mobile Height | Visibile Mobile |
|---|---|---|---|---|
| Hero | 3:4 | 100vh | 100vh | ✅ |
| Manifesto (grande) | 2:3 | auto | auto | ✅ |
| Photo Pause | 21:9 | 45vh | 35vh | ✅ |
| Story Card img | 3:4 | min(82vh, 780px) | 60vh | ✅ |
| Portfolio Items | Misti | 272-560px | 280px | ✅ |
| Film Frames | 2:3 | auto | auto | ✅ |
| About | 3:4 | 680px | auto | ✅ |

---

## 4. NEXT.JS IMAGE PATTERN

```tsx
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity.image'

<div className="story-card-img">
  <Image
    src={urlForImage(story.coverImage)
      .width(1200)
      .height(1600)
      .fit('crop')
      .crop('focalpoint')
      .url()}
    alt={`${story.couple} wedding`}
    fill
    sizes="(max-width: 960px) 100vw, 55vw"
    style={{ objectFit: 'cover' }}
    placeholder="blur"
    blurDataURL={story.coverImage.lqip}
    priority={index === 0}
  />
</div>
```

### Sizes per contesto

| Contesto | width | height | sizes prop |
|---|---|---|---|
| Hero bg | 1600 | 2133 | 100vw |
| Story card | 1200 | 1600 | (max-width: 960px) 100vw, 55vw |
| Portfolio | 1200 | auto | (max-width: 960px) 100vw, 58vw |
| Photo pause | 2400 | 1028 | 100vw |
| Manifesto grande | 1200 | 1800 | (max-width: 960px) 50vw, 25vw |
| Film frame | 1000 | 1500 | (max-width: 960px) 50vw, 25vw |

---

## 5. ⚠️ CSS LEGACY DA VERIFICARE

Il `globals.css` attuale contiene queste regole nel blocco `@media (max-width: 960px)`:
```css
.manifesto-media, .about-img, .film-media, .venue-media, .vc-media { display: none; }
```

Queste regole **NASCONDONO le foto su mobile** e contraddicono il Design System v2.0.

**AZIONE RICHIESTA:** Rimuovere o commentare queste regole. Le immagini DEVONO essere visibili su mobile. Se il layout necessita di adattamento, usare grid/flex responsive, NON display:none.

---

## 6. REGOLE PER ANTIGRAVITY

1. **Specificare SEMPRE** ratio e dimensioni dal punto 2
2. **SEMPRE object-fit: cover**
3. **Placeholder corretto:** chiaro su scuro, caldo su chiaro
4. **Mai display:none** su immagini per mobile
5. **Specificare sizes prop** per Next.js Image
6. **Mai hardcodare pixel** per immagini — usare %, vh, vw
