# Image Aspect Ratios in Photography Website Design

**Technical Guide for Senior Developers**

Analisi completa dei rapporti d'aspetto per immagini orizzontali e verticali.
Con riferimenti al mondo luxury, fashion e destination wedding photography.

*Prepared for Alex Cinisi Photography — www.alexcinisiphotography.com*
*Febbraio 2026 — v1.0*

---

## Indice dei Contenuti

1. [Fondamenti degli Aspect Ratio](#01--fondamenti-degli-aspect-ratio)
2. [Catalogo Completo dei Rapporti](#02--catalogo-completo-dei-rapporti)
3. [Tabella Comparativa Orizzontale vs Verticale](#03--tabella-comparativa)
4. [Implementazione CSS per Developer](#04--implementazione-css)
5. [Caso Studio: Sito Web Fotografico](#05--caso-studio-sito-web-fotografico)
6. [Referenze Luxury & Fashion](#06--referenze-luxury--fashion)
7. [Raccomandazioni Operative](#07--raccomandazioni-operative)

---

## 01 — Fondamenti degli Aspect Ratio

L'aspect ratio (rapporto d'aspetto) definisce la relazione proporzionale tra larghezza e altezza di un'immagine. Espresso nella forma `W:H`, rappresenta il fondamento di ogni decisione visiva nel web design fotografico. Per uno sviluppatore senior, comprendere questa metrica significa controllare il layout, le performance e la percezione estetica di un sito.

### Che cos'è l'Aspect Ratio

L'aspect ratio non indica una dimensione assoluta in pixel, ma una proporzione. Un'immagine 3:2 può essere 1200×800px o 3000×2000px: la forma rimane identica, cambia solo la risoluzione. Questo principio è alla base del responsive design.

**Formula base:** `Aspect Ratio = Larghezza / Altezza`

```
// Esempio: un'immagine 1800×1200px
// Ratio = 1800 / 1200 = 1.5 = 3:2
// La stessa forma di una 3000×2000px
```

### Origini Fotografiche

Il rapporto **3:2** deriva dal formato pellicola 35mm (36×24mm), standard della fotografia analogica e digitale full-frame. Il **4:3** proviene dal formato televisivo classico e dalle fotocamere Micro Four Thirds. Il **16:9** nasce con l'HD televisivo e domina oggi schermi desktop e laptop. Il **21:9** (ultrawide) emerge dal cinema anamorphic.

### Perché è Critico nel Web Design

- **Coerenza visiva:** ratio misti in una griglia generano disordine percettivo.
- **Performance:** il browser riserva lo spazio corretto evitando il Cumulative Layout Shift (CLS).
- **Responsive design:** il ratio determina come un'immagine si adatta a breakpoint diversi.
- **Storytelling visivo:** ratio orizzontali comunicano panoramicità, verticali comunicano intimità.
- **Conversione:** nel luxury, la scelta del ratio influenza direttamente la percezione del brand.

> ⚠️ Nel web design di lusso, l'incoerenza dei rapporti d'aspetto è il segnale visivo più immediato di scarsa qualità progettuale.

### Landscape vs Portrait: Due Linguaggi Visivi

Ogni aspect ratio ha una versione orizzontale (landscape) e una verticale (portrait). Non sono intercambiabili: comunicano emozioni, gerarchie e ritmi visivi radicalmente diversi.

- **Landscape (orizzontale):** narrativa, contesto ambientale, epicità. Perfetto per hero images, slider, venue shots, paesaggi.
- **Portrait (verticale):** intimità, focus sul soggetto, verticalità. Perfetto per ritratti, abiti da sposa, dettagli, mobile-first.

> 💡 **DEVELOPER TIP:** Implementa sempre la proprietà CSS `aspect-ratio` insieme a `object-fit: cover` per mantenere il crop centrato e prevenire distorsioni.

---

## 02 — Catalogo Completo dei Rapporti

Di seguito l'analisi dettagliata di ogni aspect ratio, sia nella versione orizzontale che verticale, con le risoluzioni raccomandate, i casi d'uso nel web design e le note specifiche per siti fotografici di lusso.

---

### 3:2 (Landscape) — 2:3 (Portrait)

*IL DNA DELLA FOTOGRAFIA*

Il 3:2 è il rapporto nativo delle fotocamere full-frame e APS-C. È il formato che ogni fotografo conosce dalla pellicola 35mm. La sua proporzione bilanciata lo rende il più versatile nel web design fotografico.

**3:2 Landscape — Narrativo, equilibrato, editoriale**

- Risoluzioni web: `1200×800`, `1800×1200`, `2400×1600`
- Uso: gallery principali, blog hero, slideshow portfolio
- Contesto luxury: è il formato editoriale per eccellenza, usato da The Lane, Junebug Weddings, Style Me Pretty
- Sensazione: spazio narrativo senza eccessi panoramici, il soggetto respira nel contesto

**2:3 Portrait — Intimo, elegante, magazine-cover**

- Risoluzioni web: `800×1200`, `1200×1800`, `1600×2400`
- Uso: ritratti, dettagli abito, gallery verticali, mobile hero
- Contesto luxury: formato magazine cover, usato da Vogue, Harper's Bazaar per i ritratti bridal
- Sensazione: intimità, eleganza verticale, focus sul soggetto

> 💡 **BEST PRACTICE:** Il 3:2 / 2:3 è il rapporto primario consigliato per qualsiasi sito fotografico. Mantiene la coerenza con il file nativo della fotocamera, minimizzando il crop.

---

### 4:3 (Landscape) — 3:4 (Portrait)

*LO STANDARD CLASSICO*

Il 4:3 nasce con lo schermo televisivo tradizionale e con i sensori Micro Four Thirds. Più compatto del 3:2, lascia meno respiro ai lati ma è estremamente stabile e simmetrico.

**4:3 Landscape — Compatto, stabile, grid-friendly**

- Risoluzioni web: `1200×900`, `1600×1200`, `2048×1536`
- Uso: thumbnail grid, gallery cards, product images
- Contesto luxury: ideale per griglie uniformi, mood board digitali, portfolio overview
- Sensazione: ordine, simmetria, classicità

**3:4 Portrait — Verticale moderato, balanced**

- Risoluzioni web: `900×1200`, `1200×1600`, `1536×2048`
- Uso: ritratti ambientati, gallery mobile-first, Pinterest-style layouts
- Contesto luxury: formato frequente nei lookbook di moda, Dior e Chanel lo usano nelle gallery online
- Sensazione: verticalità controllata, non estrema

---

### 16:9 (Landscape) — 9:16 (Portrait)

*IL FORMATO WIDESCREEN*

Il 16:9 è lo standard universale dello schermo moderno: HD, Full HD, 4K. Nel web design è il formato dominante per hero images, video background e banner.

**16:9 Landscape — Cinematografico, panoramico, immersivo**

- Risoluzioni web: `1280×720` (HD), `1920×1080` (FHD), `2560×1440` (QHD)
- Uso: hero section, video background, fullscreen slider, cinematic storytelling
- Contesto luxury: formato usato per hero images su siti come Jose Villa, KT Merry, Greg Finck
- Sensazione: epicità cinematografica, il soggetto immerso nel contesto

**9:16 Portrait — Full-screen mobile, social-native**

- Risoluzioni web: `1080×1920`
- Uso: mobile fullscreen, Instagram Stories, TikTok, vertical video
- Contesto luxury: formato delle Stories sponsorizzate dei brand di moda
- Sensazione: immersione verticale totale, mobile-first

> ⚠️ **Attenzione:** il 16:9 applicato a una fotografia 3:2 taglia circa il 16% dell'altezza dell'immagine. Per hero images, chiedere sempre al fotografo un crop dedicato.

---

### 21:9 (Ultrawide) — 9:21 (Ultra-Portrait)

*IL FORMATO CINEMATIC*

Il 21:9 (2.33:1) deriva dal cinema anamorphic. Nei siti web crea un effetto "letterbox" estremamente drammatico. Utilizzato raramente ma con grande impatto emotivo.

**21:9 Landscape — Ultra-cinematico, banner immersivo**

- Risoluzioni web: `2560×1080`, `3440×1440`
- Uso: hero banner panoramico, sezione testimonial, ambiente/venue showcase
- Contesto luxury: usato da brand come Bottega Veneta per hero images ultra-panoramiche
- Sensazione: grandiosità, respiro, il soggetto piccolo nel paesaggio

**9:21 Ultra-Portrait — Estremamente verticale, sperimentale**

- Risoluzioni web: `1080×2520`
- Uso: layout sperimentali, scroll-driven stories, parallax verticale
- Contesto luxury: molto raro, usato in editorial digitali d'avanguardia
- Sensazione: tensione verticale estrema, unconventional

---

### 1:1 (Quadrato)

*L'EQUILIBRIO PERFETTO*

Il formato quadrato è intrinsecamente bilanciato: non suggerisce né orizzontalità né verticalità. Eredita la tradizione del medio formato Hasselblad 6×6 e dell'era Instagram.

- Risoluzioni web: `1080×1080`, `1200×1200`, `2048×2048`
- Uso: grid Instagram-style, avatar, thumbnail, product cards
- Contesto luxury: formato signature di Instagram, usato nelle gallery social-integrated
- Sensazione: equilibrio, modernità, neutralità direzionale

> ⚠️ Il 1:1 richiede un crop significativo sia da file 3:2 che 4:3. Assicurarsi che il soggetto sia centrato o utilizzare `object-position` per controllare il punto focale.

---

### 4:5 (Portrait) — 5:4 (Landscape)

*IL FORMATO SOCIAL-OPTIMIZED*

Il 4:5 è il rapporto verticale massimo consentito da Instagram nel feed. È un leggero allungamento verticale del quadrato, perfetto per il mobile-first design.

**4:5 Portrait — Mobile-optimized, social-ready**

- Risoluzioni web: `1080×1350`
- Uso: feed Instagram, card verticali, grid mobile-first
- Contesto luxury: formato preferito dai brand di moda per massimizzare lo spazio nel feed Instagram
- Sensazione: verticalità contenuta, mobile-native

**5:4 Landscape — Quasi quadrato, compatto**

- Risoluzioni web: `1350×1080`, `1250×1000`
- Uso: card orizzontali, thumbnail, header compatti
- Contesto luxury: meno comune, usato per gallery card molto compatte
- Sensazione: stabilità, compattezza, quasi-quadrato

---

### 2:1 e 3:1 (Super-panoramic)

*I FORMATI BANNER*

Rapporti molto allungati orizzontalmente, usati esclusivamente per banner e header. Non sono formati fotografici nativi ma derivano da esigenze di layout web.

- **2:1:** `1920×960`, `2560×1280` — banner hero, divider sections
- **3:1:** `1920×640`, `2560×853` — thin banner, navigation bar background
- Contesto luxury: frequenti come sezione divisoria con testo sovrapposto

> 💡 **DEVELOPER TIP:** Per i formati super-panoramici, utilizzare sempre `object-position` per controllare il crop verticale. Il default `center` può tagliare volti o elementi cruciali.

---

## 03 — Tabella Comparativa

Matrice completa dei rapporti d'aspetto con risoluzioni raccomandate per il web, peso stimato del file e area di utilizzo primaria.

### Formati Orizzontali (Landscape)

| Ratio | Risoluzione | Decimal | Peso ≈ | Use Case Primario |
|-------|-------------|---------|--------|-------------------|
| **3:2** | `1800×1200` | 1.50 | 180–350 KB | Gallery principale, portfolio, editorial |
| **4:3** | `1600×1200` | 1.33 | 150–300 KB | Grid, thumbnail, card layout |
| **16:9** | `1920×1080` | 1.78 | 160–320 KB | Hero image, video bg, fullscreen |
| **21:9** | `2560×1080` | 2.33 | 200–400 KB | Banner cinematic, panoramic hero |
| **5:4** | `1250×1000` | 1.25 | 120–250 KB | Card compatte, quasi-quadrato |
| **2:1** | `1920×960` | 2.00 | 140–280 KB | Banner, divider section |
| **3:1** | `1920×640` | 3.00 | 100–200 KB | Thin banner, navigation bg |
| **1:1** | `1200×1200` | 1.00 | 120–250 KB | Social grid, avatar, thumbnail |

### Formati Verticali (Portrait)

| Ratio | Risoluzione | Decimal | Peso ≈ | Use Case Primario |
|-------|-------------|---------|--------|-------------------|
| **2:3** | `1200×1800` | 0.67 | 180–350 KB | Ritratto, abito, magazine cover |
| **3:4** | `1200×1600` | 0.75 | 150–300 KB | Lookbook, mobile gallery, Pinterest |
| **9:16** | `1080×1920` | 0.56 | 160–320 KB | Mobile fullscreen, Stories, Reels |
| **9:21** | `1080×2520` | 0.43 | 200–400 KB | Scroll story, parallax vertical |
| **4:5** | `1080×1350` | 0.80 | 130–260 KB | Instagram feed, mobile card |
| **1:2** | `960×1920` | 0.50 | 140–280 KB | Vertical banner, sidebar |
| **1:1** | `1200×1200` | 1.00 | 120–250 KB | Social grid, avatar, thumbnail |

> ⚠️ I pesi stimati si riferiscono a JPEG quality 80–85 con compressione standard. WebP riduce di circa il 25–30%. AVIF riduce di circa il 40–50%.

---

## 04 — Implementazione CSS

Guida tecnica alle proprietà CSS fondamentali per la gestione dei rapporti d'aspetto nelle immagini. Supporto browser completo dalla fine 2021 (Chrome 88+, Firefox 89+, Safari 15+).

### La proprietà `aspect-ratio`

La proprietà CSS `aspect-ratio` definisce il rapporto larghezza/altezza preferito di un elemento. Funziona sia su elementi replaced (`img`, `video`) che non-replaced (`div`, `section`).

```css
/* Sintassi base */
.hero-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

/* Gallery portrait */
.gallery-item {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  object-position: center 20%;  /* Volto in alto */
}
```

### `object-fit`: La Chiave del Crop

La proprietà `object-fit` controlla come il contenuto di un elemento replaced (`img`, `video`) si adatta al suo contenitore. È il complemento essenziale di `aspect-ratio`.

| Valore | Comportamento | Uso nel Photography Design |
|--------|---------------|---------------------------|
| `cover` | Riempie il container, croppando se necessario | Default per ogni gallery fotografica. Mantiene la copertura totale del container. |
| `contain` | Mostra tutta l'immagine, aggiungendo spazio vuoto | Usato per lightbox e visualizzazione dettaglio. Non croppa mai. |
| `fill` | Stretcha l'immagine per riempire il container | **Mai usare per fotografie.** Distorce il soggetto. |
| `none` | Dimensioni originali, overflow possibile | Raro. Solo per effetti scroll o parallax custom. |
| `scale-down` | Come contain, ma non ingrandisce mai | Utile per thumbnail dove non si vuole upscaling. |

### `object-position`: Controllare il Punto Focale

Quando `object-fit: cover` croppa un'immagine, `object-position` determina quale area rimane visibile. Fondamentale per ritratti e scene con soggetti decentrati.

```css
/* Ritratto: mantenere il volto visibile */
.portrait-crop {
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: center 25%;  /* Sposta il crop verso l'alto */
}

/* Paesaggio: mantenere l'orizzonte */
.landscape-crop {
  aspect-ratio: 21 / 9;
  object-fit: cover;
  object-position: center 60%;  /* Sposta verso il basso */
}
```

### Pattern Responsive Completo

Il pattern più robusto per una gallery fotografica responsive che passa da layout landscape a portrait su mobile:

```css
/* Gallery card responsive */
.gallery-card img {
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 2;          /* Default landscape */
  object-fit: cover;
  object-position: center;
  transition: opacity 0.3s ease;
}

@media (max-width: 768px) {
  .gallery-card img {
    aspect-ratio: 4 / 5;         /* Switch to portrait on mobile */
  }
}
```

### Prevenire il Layout Shift (CLS)

Il Cumulative Layout Shift è una metrica Core Web Vitals. Specificare `aspect-ratio` sulle immagini permette al browser di riservare lo spazio corretto prima del caricamento.

```html
<!-- HTML con width/height nativi -->
<img src="photo.webp" width="1800" height="1200"
     loading="lazy" decoding="async"
     alt="Wedding ceremony in Taormina" />
```

```css
/* Il CSS aspect-ratio agisce come override */
img {
  aspect-ratio: attr(width) / attr(height);  /* Fallback */
  width: 100%;
  height: auto;
}
```

> 💡 **CRITICAL:** Specificare SEMPRE `width` e `height` nell'HTML delle immagini, anche se il CSS le sovrascrive. Questo permette al browser di calcolare il ratio prima del download del CSS.

---

## 05 — Caso Studio: Sito Web Fotografico

Simulazione dell'analisi e progettazione dei rapporti d'aspetto per un sito web di luxury destination wedding photography. Il caso è modellato sulle esigenze di un fotografo che opera tra Sicilia e destinazioni internazionali, con un portfolio editoriale e un target high-end.

### Analisi della Struttura del Sito

Un sito fotografico di lusso si compone tipicamente di queste sezioni, ciascuna con esigenze di aspect ratio specifiche:

---

#### Homepage — Above the Fold

**Componente:** Hero image / Video background fullscreen
**Ratio raccomandato:** `16:9` (desktop) → `9:16` o `4:5` (mobile)
**Risoluzione:** `2560×1440` (desktop), `1080×1920` (mobile)

La hero image è il primo contatto visivo con il brand. Deve comunicare immediatamente lusso, stile e destinazione. I siti di riferimento come Jose Villa e KT Merry utilizzano hero fullscreen 16:9 con testo overlay minimale.

```html
<!-- Hero responsive con art direction -->
<picture>
  <source media="(max-width: 768px)"
          srcset="hero-mobile.webp" />
  <source media="(min-width: 769px)"
          srcset="hero-desktop.webp" />
  <img src="hero-desktop.jpg" alt="..."
       width="2560" height="1440" />
</picture>
```

---

#### Portfolio Gallery — La Griglia

**Componente:** Grid di thumbnail che linkano alle singole gallery
**Ratio raccomandato:** `3:2` (landscape) o `2:3` (portrait) uniformi
**Risoluzione:** `900×600` (landscape) o `600×900` (portrait)

La coerenza del ratio nella griglia è fondamentale. I siti di fotografi luxury adottano due approcci: griglia uniforme (tutti i thumbnail con lo stesso ratio) o griglia masonry con ratio misti ma allineamento giustificato.

| Approccio | Pro | Contro |
|-----------|-----|--------|
| Griglia uniforme 3:2 | Ordine, pulizia, luxury feel | Richiede crop su alcune foto |
| Griglia uniforme 1:1 | Compattezza, social-ready | Crop significativo, perde contesto |
| Masonry / Justified | Rispetta il ratio nativo | Più complesso, meno "clean" |
| Alternato 3:2 + 2:3 | Dinamico, editoriale | Richiede curatela attenta |

---

#### Gallery Singola — Lo Storytelling

**Componente:** Sequenza di immagini fullwidth che racconta un matrimonio
**Ratio raccomandato:** Misto nativo `3:2` + `2:3` con fullwidth
**Risoluzione:** `2400×1600` (landscape), `1600×2400` (portrait)

All'interno di una gallery singola, la libertà di mixare ratio è massima. Il ritmo narrativo beneficia dall'alternanza tra panoramiche ambientali (16:9 o 3:2), ritratti verticali (2:3) e dettagli quadrati (1:1). I migliori siti fotografici come Danilo & Sharon e Greg Finck usano questo approccio "editorial flow".

---

#### About / Info Page

**Ratio raccomandato:** `2:3` per il ritratto del fotografo, `3:2` per behind-the-scenes

La pagina About richiede un ritratto verticale prominente (2:3) che comunica personalità e professionalità, affiancato da immagini secondarie in 3:2.

---

#### Blog / Journal

**Ratio raccomandato:** `3:2` per featured image, misto nativo nel corpo
**Risoluzione featured:** `1800×1200`

Il blog di un sito fotografico luxury serve come strumento SEO e di storytelling. La featured image deve essere uniforme (3:2) per coerenza nella lista articoli. Nel corpo dell'articolo, il ratio segue il file nativo.

> 💡 **CASO REALE:** I siti di The Lane e Once Wed utilizzano una struttura editoriale con hero 16:9, gallery grid in 3:2 uniforme, e gallery singole in ratio misto. Questo pattern è lo standard de facto nel luxury wedding photography.

---

### Mappa Aspect Ratio per Sezione del Sito

Tabella operativa che mappa ogni sezione del sito al ratio, alla risoluzione e alla strategia di crop raccomandata.

| Sezione | Ratio | Risoluzione | object-fit | object-position |
|---------|-------|-------------|------------|-----------------|
| Hero Desktop | `16:9` | `2560×1440` | `cover` | `center center` |
| Hero Mobile | `4:5` | `1080×1350` | `cover` | `center 30%` (volto alto) |
| Portfolio Grid | `3:2` | `900×600` | `cover` | `center center` |
| Gallery Full | nativo | `2400×auto` | `none` | n/a |
| About Portrait | `2:3` | `800×1200` | `cover` | `center 20%` |
| Blog Featured | `3:2` | `1800×1200` | `cover` | `center center` |
| Blog Inline | nativo | `1600×auto` | `none` | n/a |
| Testimonial Bg | `21:9` | `2560×1080` | `cover` | `center 40%` |
| Instagram Feed | `1:1` | `600×600` | `cover` | `center center` |
| Contact Hero | `16:9` | `1920×1080` | `cover` | `center center` |
| Favicon | `1:1` | `32×32` | n/a | n/a |
| OG Image | `1.91:1` | `1200×630` | `cover` | `center center` |

### Strategia di Breakpoint

Il cambio di aspect ratio tra desktop e mobile è una decisione di design fondamentale. Non si tratta solo di ridimensionare, ma di ripensare la composizione con l'art direction.

| Sezione | Desktop (≥1024px) | Tablet (768–1023px) | Mobile (<768px) |
|---------|-------------------|---------------------|-----------------|
| Hero | `16:9` | `16:9` | `4:5` o `9:16` |
| Gallery Grid | `3:2` (3 col) | `3:2` (2 col) | `4:5` (1 col) |
| Gallery Single | Nativo full | Nativo full | Nativo full |
| Blog Featured | `3:2` | `3:2` | `3:2` |
| About Portrait | `2:3` sidebar | `2:3` centered | `2:3` full-width |
| Testimonial | `21:9` | `16:9` | `3:2` |

> ⚠️ L'art direction tramite `<picture>` e `<source>` permette di servire immagini con crop diversi per device diversi, non solo risoluzioni diverse. Questa è la differenza tra **responsive images** e **responsive design**.

---

## 06 — Referenze Luxury & Fashion

Analisi dei pattern visivi adottati dai principali brand di lusso e dai siti di fotografi di riferimento nel settore wedding e moda. Ogni referenza è analizzata per aspect ratio dominante, tipografia, uso dello spazio bianco e lezioni applicabili.

### Brand di Alta Moda

---

#### Dior (dior.com)

**Pattern dominante:** Hero fullscreen 16:9 → Grid 3:4 verticale

Dior utilizza un approccio fortemente verticale nelle gallery prodotto e nelle campagne editoriali. Le hero images sono in 16:9 con video autoplay, mentre la griglia prodotti adotta un 3:4 coerente che comunica eleganza verticale. La tipografia Nicolas Cochin Regular su sfondo bianco crea contrasto con le immagini ricche di colore.

- **Lezione per developer:** il 3:4 è il formato preferito per card di prodotto luxury. Offre verticalità sufficiente per mostrare l'intera figura senza il taglio estremo del 2:3.

---

#### Chanel (chanel.com)

**Pattern dominante:** Minimalismo assoluto con alternanza 16:9 / 1:1

Chanel è l'esempio massimo di restraint visivo. Lo spazio bianco domina. Le immagini utilizzano principalmente due formati: 16:9 per le campaign hero e 1:1 per i prodotti e le card. Il font Couture sans-serif rafforza la sensazione di modernità essenziale.

- **Lezione per developer:** limitare la palette di ratio a soli 2 formati crea un'identità visiva più forte. Meno variazioni = più lusso percepito.

---

#### Gucci (gucci.com)

**Pattern dominante:** Grid massivo con ratio misti e asymmetry

Gucci rompe deliberatamente la simmetria: le grid mescolano 3:2, 2:3, 1:1 e persino formati non standard. Questo approccio eclettico riflette l'identità del brand. Il font Granjon Roman serif aggiunge un layer di heritage visivo.

- **Lezione per developer:** l'asymmetry funziona solo con un sistema di grid sottostante molto rigoroso (CSS Grid con auto-placement). Senza struttura, il caos non è luxury, è disordine.

---

#### Bottega Veneta (bottegaveneta.com)

**Pattern dominante:** Ultra-panoramico 21:9 e 2:1 con immagini ambientali

Bottega Veneta è il brand che più utilizza formati ultra-panoramici nel web. Le hero images in 21:9 creano un senso di calma e grandeur. Le gallery prodotto sono in 3:4 con enormi margini bianchi.

- **Lezione per developer:** il 21:9 funziona brillantemente come separatore visivo tra sezioni. Usarlo con parsimonia crea un ritmo lento e lussuoso.

---

### Fotografi di Riferimento

#### Siti Destination Wedding Luxury

I siti dei fotografi di destination wedding più quotati seguono pattern sorprendentemente coerenti:

- **Jose Villa (josevilla.com):** Hero 16:9 soft, gallery in 3:2, approccio film-inspired con bassa saturazione. Il sito respira grazie a enormi spazi bianchi.
- **KT Merry (ktmerry.com):** Hero fullscreen 16:9, portfolio grid in 2:3 verticale, gallerie con ratio misto. Font serif che rimanda al mondo editoriale.
- **Greg Finck (gregfinck.com):** Approccio magazine con hero 3:2, gallery grid alternato landscape/portrait. Stile fine-art con palette desaturata.
- **Lara Jade (larajade.com):** Grid minimale con immagini full-bleed in 3:2. Sfondo bianco puro, tipografia Baskerville che richiama Vogue.
- **John & Joseph Photography:** Niente hero image, solo una citazione Harper's Bazaar. Gallery monocromatiche, grid in 4:3 con cornici cream.

---

### Pattern Comuni nel Luxury

Dall'analisi emerge un codice visivo condiviso:

- Massimo **2–3 aspect ratio distinti** per sito (tipicamente 16:9 + 3:2 + 2:3)
- **Spazio bianco generoso:** i margini tra le immagini sono ampi quanto le immagini stesse
- **Tipografia serif** per headings (Georgia, Baskerville, Playfair Display)
- **Palette cromatica desaturata** o monocromatica
- Nessun effetto hover aggressivo: **transizioni di opacità soft** (0.3s ease)
- Gallery fullwidth senza sidebar
- Loading lazy con placeholder che rispetta l'aspect ratio (nessun layout shift)
- Nessun watermark visibile nelle gallery web (protezione via disabilitazione right-click o overlay)

> 💡 **INSIGHT:** Il sito fotografico più luxury è quello che usa meno formati diversi. La coerenza del ratio comunica cura, intenzionalità e gusto — esattamente ciò che un cliente high-end cerca.

---

## 07 — Raccomandazioni Operative

Checklist finale e best practice per lo sviluppatore senior che implementa un sito fotografico luxury.

### Checklist Pre-Sviluppo

1. Definire la **palette di aspect ratio** con il fotografo/designer (max 3 formati primari)
2. Stabilire le **risoluzioni di export** per ogni formato (1x, 2x per retina)
3. Concordare la **strategia di crop:** center-center default, varianti custom per hero e ritratti
4. Definire i **breakpoint** e i cambi di ratio per mobile (art direction vs scaling)
5. Verificare il **formato file:** WebP con fallback JPEG, AVIF se il target lo supporta
6. Implementare `width` e `height` HTML su ogni `<img>` per prevenire CLS
7. Testare il **loading progressivo:** skeleton con aspect-ratio corretto prima del load

### CSS Starter Kit — Variabili di Progetto

Un set di custom properties CSS da definire all'inizio di ogni progetto fotografico:

```css
:root {
  /* Aspect Ratios */
  --ratio-hero: 16 / 9;
  --ratio-hero-mobile: 4 / 5;
  --ratio-gallery: 3 / 2;
  --ratio-portrait: 2 / 3;
  --ratio-square: 1 / 1;
  --ratio-banner: 21 / 9;

  /* Risoluzioni max (per srcset) */
  --img-hero-w: 2560px;
  --img-gallery-w: 1800px;
  --img-thumb-w: 900px;
  --img-mobile-w: 1080px;

  /* Spacing (luxury = generous) */
  --gallery-gap: clamp(16px, 3vw, 48px);
  --section-padding: clamp(64px, 10vh, 160px);
}
```

### Pattern `<picture>` per Art Direction

```html
<picture>
  <!-- Mobile: vertical crop -->
  <source media="(max-width: 768px)"
          srcset="photo-mobile.webp"
          type="image/webp" />
  <source media="(max-width: 768px)"
          srcset="photo-mobile.jpg"
          type="image/jpeg" />

  <!-- Desktop: landscape crop -->
  <source srcset="photo-desktop.webp"
          type="image/webp" />
  <source srcset="photo-desktop.jpg"
          type="image/jpeg" />

  <!-- Fallback -->
  <img src="photo-desktop.jpg"
       width="2560" height="1440"
       loading="lazy" decoding="async"
       alt="Destination wedding in Sicily" />
</picture>
```

### Performance Budget

Per un sito fotografico luxury, il bilanciamento tra qualità visiva e performance è critico. Ecco i target:

| Metrica | Target | Note |
|---------|--------|------|
| LCP (Largest Contentful Paint) | **< 2.5s** | Hero image ottimizzata |
| CLS (Cumulative Layout Shift) | **< 0.1** | `aspect-ratio` su ogni img |
| Peso pagina totale | **< 3MB** | Con 15–20 immagini gallery |
| Peso singola immagine hero | **< 250KB** | WebP quality 80–85 |
| Peso thumbnail gallery | **< 80KB** | WebP quality 75–80 |
| Tempo first interaction | **< 3s (3G)** | Lazy loading obbligatorio |

---

*Documento preparato per Alex Cinisi Photography*
*www.alexcinisiphotography.com*
*Febbraio 2026 — v1.0*
