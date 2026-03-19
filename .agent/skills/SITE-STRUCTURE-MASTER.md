# ALEX CINISI PHOTOGRAPHY — Site Structure Master Document
## Guida completa all'architettura delle pagine, routing, navigazione e SEO

**Versione:** 1.0  
**Data:** Marzo 2026  
**Stato:** Approvato — Sostituisce la sezione routing di PROJECT-ARCHITECTURE.md  
**Audience:** Claude (strategia, copy, SEO) + Antigravity (implementazione)

---

## 1. FACT-CHECK LOG — Modifiche rispetto a PROJECT-ARCHITECTURE.md

Questo documento introduce cambiamenti deliberati rispetto all'architettura originale (PROJECT-ARCHITECTURE.md, Febbraio 2026). Ogni modifica è tracciata con la ragione.

| # | Elemento | Vecchio valore | Nuovo valore | Ragione |
|---|----------|---------------|--------------|---------|
| 1 | Nav links desktop | Portfolio, Investment, About | Journal, Locations, About | Portfolio e Investment sono sezioni homepage, non pagine standalone. Journal e Locations sono pagine reali con URL proprie. |
| 2 | Route blog/stories | `/stories/` + `/blog/` (separati) | `/journal/` (unificato) | Evita cannibalizzazione SEO. Un solo archivio editoriale come Greg Finck. Semplifica la navigazione utente. |
| 3 | Route stories singole | `/stories/[slug]` | `/journal/[slug]` | Conseguenza del punto 2. |
| 4 | Route blog singoli | `/blog/[slug]` | `/journal/[slug]` | Unificato. Il campo `category` in Sanity distingue Wedding / Editorial / Travel / Behind the scenes. |
| 5 | Locations index | Non esisteva (solo `/locations/[slug]`) | `/locations` (nuova pagina hub) | Struttura hub-and-spoke per SEO. I competitor (Marzullo, Nino Lombardo) hanno questa struttura. |
| 6 | WP redirect stories-2 | `/stories-2` → `/stories` | `/stories-2` → `/journal` | Aggiornato per riflettere la nuova route. |
| 7 | WP redirect story singola | `/villa-igiea-wedding-a-luxury-love-story` → `/stories/villa-igiea-wedding` | → `/journal/villa-igiea-wedding` | Aggiornato per nuova route. |
| 8 | HeroLocation breadcrumb | Home > Stories > [Location] | Home > Locations > [Location] | Corretto — le location pages vivono sotto `/locations/`, non sotto `/stories/`. |
| 9 | Sitemap priorities | homepage 1.0, locations 0.9, stories 0.8, blog 0.7 | homepage 1.0, locations 0.9, journal 0.8 | Unificato stories + blog sotto journal. |
| 10 | Sanity schema blogPost | Schema separato da story | Unificato in `journalPost` con campo `category` | Un unico content type con categorie filtranti. |
| 11 | constants.ts WP_REDIRECTS | destination: `/stories/villa-igiea-wedding` | destination: `/journal/villa-igiea-wedding` | Allineamento con nuova struttura. |

---

## 2. SITE MAP — Struttura completa

```
alexcinisiphotography.com/
│
├── /                          ← Homepage (pagina di atterraggio principale)
│
├── /journal                   ← Archivio editoriale (tutte le stories)
│   ├── /journal/[slug]        ← Singolo post (wedding, editorial, travel...)
│   ├── /journal/[slug]
│   └── /journal/[slug]
│
├── /locations                 ← Hub page location (mappa + griglia venue)
│   ├── /locations/villa-igiea-wedding-photographer
│   ├── /locations/wedding-photographer-taormina
│   ├── /locations/wedding-photographer-palermo
│   ├── /locations/tonnara-di-scopello-wedding
│   ├── /locations/wedding-photographer-noto
│   ├── /locations/wedding-photographer-cefalu
│   ├── /locations/agrigento-wedding-photographer
│   ├── /locations/elopement-photographer-sicily
│   └── /locations/castello-monaci-wedding-photographer  ← Puglia expansion
│
├── /about                     ← Chi è Alex, filosofia, credenziali
│
├── /contact                   ← Form completo per coppie
│
├── /ads/luxury-destination-wedding-sicily  ← Google Ads landing (noindex, standalone)
│
├── /api/contact               ← API endpoint form (non visibile)
├── /sitemap.xml               ← Auto-generata da Next.js
└── /robots.txt
```

---

## 3. NAVIGAZIONE

### 3.1 Menu Desktop (Nav.tsx)

```
[LOGO: ALEX CINISI PHOTOGRAPHY]     Journal · Locations · About     [Reserve Your Date →]
```

- **Logo**: Red Hat Display, 400, .8rem, .32em spacing, uppercase — link a `/`
- **Journal**: link a `/journal`
- **Locations**: link a `/locations`
- **About**: link a `/about`
- **CTA**: "Reserve Your Date" — btn-fill, link a `/contact`
- **Contact NON è nel menu**: il CTA copre questa funzione. Link a `/contact` nel footer.

### 3.2 Menu Mobile (< 960px)

```
[LOGO]                                          [Reserve Your Date →]
```

- Solo logo + CTA visibili in header
- Hamburger menu (overlay fullscreen) con: Journal, Locations, About, Contact
- Menu hover effect con immagini background (queued per Gemini Pro — vedi progetto homepage)

### 3.3 Footer

```
ALEX CINISI PHOTOGRAPHY

Journal · Locations · About · Contact

Based in Sicily, Italy · Available Worldwide
Languages: Italian · English
Instagram: @alexcinisiphotography

Privacy Policy · © 2026

```

### 3.4 Breadcrumb (tutte le inner pages)

| Pagina | Breadcrumb |
|--------|-----------|
| Journal index | Home → Journal |
| Journal post | Home → Journal → [Couple Name] |
| Locations index | Home → Locations |
| Location page | Home → Locations → [Venue Name] |
| About | Home → About |
| Contact | Home → Contact |

Schema: BreadcrumbList JSON-LD su tutte le inner pages.

---

## 4. PAGINE — Specifiche dettagliate

### 4.1 Homepage `/`

**Già in lavorazione.** Vedi ANTIGRAVITY-BODY-REDESIGN.md e audit-body-redesign-v2.md per dettagli. La homepage è la macchina di conversione principale con struttura a due capitoli (dark/light).

**Connessioni con le altre pagine:**
- Sezione Stories (h-scroll) → link a singoli `/journal/[slug]`
- Sezione Portfolio (masonry) → ogni immagine linka a `/journal/[slug]`
- Sezione Locations (venue cards) → link a `/locations/[slug]`
- CTA "Reserve Your Date" → `/contact`
- CTA "Explore All Stories" → `/journal`
- Nav → Journal, Locations, About, Contact

**SEO:** Schema LocalBusiness + ProfessionalService. Meta title: "Alex Cinisi Photography | Luxury Wedding Photographer Sicily"

---

### 4.2 Journal `/journal`

**Cos'è:** Archivio editoriale unificato. Contiene TUTTI i contenuti pubblicati: wedding stories, editorial, engagement sessions, behind the scenes, travel. Ispirato al Journal di Greg Finck.

**Layout:**

```
┌──────────────────────────────────────────────────────┐
│  JOURNAL                                              │
│  Wedding stories, editorials & moments from Sicily    │
│                                                       │
│  [All] [Wedding] [Editorial] [Engagement] [Travel]   │  ← filtri categoria
│                                                       │
│  ┌────────────────┐  ┌────────────────┐              │
│  │                │  │                │              │
│  │   Hero image   │  │   Hero image   │              │
│  │                │  │                │              │
│  │ Marina & James │  │ Sophie & David │              │
│  │ Villa Valgu... │  │ Taormina       │              │
│  │ Wedding        │  │ Wedding        │              │
│  └────────────────┘  └────────────────┘              │
│                                                       │
│  ┌────────────────┐  ┌────────────────┐              │
│  │                │  │                │              │
│  │   Hero image   │  │   Hero image   │              │
│  │                │  │                │              │
│  │ Film Details   │  │ Lucia & Marco  │              │
│  │ Behind the... │  │ Scopello       │              │
│  │ Editorial      │  │ Wedding        │              │
│  └────────────────┘  └────────────────┘              │
│                                                       │
│                  [Load more]                          │
└──────────────────────────────────────────────────────┘
```

**Desktop:** griglia 2 colonne, cards con immagine hero (aspect 3:4), couple name (Bodoni italic), venue, categoria badge.
**Mobile:** singola colonna.

**Filtri:** tabs orizzontali (All, Wedding, Editorial, Engagement, Travel) — filtro client-side su category field da Sanity. No pagine separate per categoria (evita thin content).

**Fonte dati Sanity:** query `*[_type == "journalPost"] | order(date desc)` con paginazione (12 post per load).

**SEO:**
- Title: "Journal — Wedding Stories & Editorials | Alex Cinisi Photography"
- Description: "Explore destination wedding stories from Sicily — Villa Igiea, Taormina, Scopello, Noto. Editorial and film photography by Alex Cinisi."
- Schema: CollectionPage
- Canonical: `https://www.alexcinisiphotography.com/journal`

---

### 4.3 Journal Post `/journal/[slug]`

**Cos'è:** Singolo post editoriale. Il cuore del content marketing e della SEO.

**Struttura ispirata a Greg Finck:**

```
┌──────────────────────────────────────────────────────┐
│  Home → Journal → Marina & James                     │  ← breadcrumb
│                                                       │
│  Villa Valguarnera · Bagheria, Sicily                │  ← location eyebrow
│                                                       │
│  ┌──────────────────────────────────────────────┐    │
│  │                                              │    │
│  │              HERO IMAGE (full-width)          │    │
│  │              aspect-ratio: 3:2                │    │
│  │                                              │    │
│  └──────────────────────────────────────────────┘    │
│                                                       │
│  June 14, 2026 · Wedding · Film + Digital            │  ← data + categoria + badge
│                                                       │
│  Marina & James                                       │  ← h1 (Bodoni italic)
│  A Midsummer Celebration at Villa Valguarnera         │  ← subtitle (Red Hat Display)
│                                                       │
│  [200-500 parole di narrativa bride-first]           │  ← SEO content (min 200, target 500)
│  La scelta della venue, l'atmosfera, i momenti       │
│  chiave, i vendor coinvolti...                       │
│                                                       │
│  Vendors: Planner — [Nome] · Flowers — [Nome]       │  ← credits con link (link equity)
│  Venue — Villa Valguarnera · Dress — [Designer]      │
│                                                       │
│  ┌──────┐ ┌──────┐ ┌──────┐                         │
│  │      │ │      │ │      │                         │  ← gallery masonry
│  │ 3:4  │ │ 3:2  │ │ 3:4  │                         │     (stessa logica portfolio HP)
│  │      │ │      │ │      │                         │
│  └──────┘ └──────┘ └──────┘                         │
│  ┌──────┐ ┌──────────────┐                           │
│  │ 3:2  │ │     3:4      │                           │
│  └──────┘ └──────────────┘                           │
│                                                       │
│  ─────────────────────────────────────                │
│                                                       │
│  EXPLORE MORE STORIES                                │  ← 3 related stories (stessa location
│  ┌────┐ ┌────┐ ┌────┐                               │     o stesso tag)
│  └────┘ └────┘ └────┘                               │
│                                                       │
│  ─────────────────────────────────────                │
│                                                       │
│  BEGIN YOUR STORY                                    │  ← CTA + form semplificato
│  [Reserve Your Date →]                               │     (5 campi, link a /contact per full)
│                                                       │
└──────────────────────────────────────────────────────┘
```

**Cross-linking obbligatorio:**
- Link alla location page corrispondente (se esiste): "Explore more weddings at Villa Valguarnera →"
- Link a stories correlate (stessa location o stesso tag)
- Link a `/contact` nel CTA finale

**Fonte dati Sanity:** `journalPost` con fields: title, slug, coupleName, location, locationRef (reference a locationPage), country, date, category, tags[], heroImage, gallery[], seoContent (rich text), vendorCredits[], metaTitle, metaDescription, featured, order.

**SEO:**
- Title: "[Couple] — [Venue], Sicily | Alex Cinisi Photography"
- Schema: ImageGallery + Article + BreadcrumbList
- Canonical: `https://www.alexcinisiphotography.com/journal/[slug]`
- Open Graph image: heroImage
- Min 200 parole di seoContent per indexing (target 500)

---

### 4.4 Locations Hub `/locations`

**Cos'è:** Pagina index di tutte le venue/location dove Alex fotografa. Struttura hub-and-spoke per SEO.

**Perché serve (non bastano le cards in homepage):**
1. Google premia le pagine hub che linkano a contenuti correlati (topic cluster)
2. L'intento di ricerca "wedding photographer Sicily" o "wedding venues Sicily" è esplorativo — l'utente vuole vedere le opzioni
3. I competitor diretti (Marzullo Studio, Nino Lombardo, Nucleika) hanno questa struttura
4. Concentra il link equity: ogni location page linka qui, questa pagina linka a ognuna

**Layout:**

```
┌──────────────────────────────────────────────────────┐
│  Home → Locations                                    │
│                                                       │
│  SICILY & BEYOND                                     │  ← eyebrow
│  Where Your Story                                    │
│  Comes to Life                                       │  ← h1
│                                                       │
│  A curated selection of Sicily's most extraordinary  │
│  wedding venues — each one photographed with the     │
│  editorial intention your day deserves.              │
│                                                       │
│  ┌──────────────────────────────────────────────┐    │
│  │         [Mappa stilizzata Sicilia]           │    │  ← opzionale: SVG map
│  │         con pin sulle venue                  │    │     interattiva
│  └──────────────────────────────────────────────┘    │
│                                                       │
│  ┌────────────────┐  ┌────────────────┐              │
│  │   Villa Igiea  │  │   Taormina     │              │
│  │   [hero foto]  │  │   [hero foto]  │              │  ← griglia venue
│  │   Palermo      │  │   East Sicily  │              │     2 colonne desktop
│  │   [Explore →]  │  │   [Explore →]  │              │     1 colonna mobile
│  └────────────────┘  └────────────────┘              │
│                                                       │
│  ┌────────────────┐  ┌────────────────┐              │
│  │   Tonnara di   │  │   Noto         │              │
│  │   Scopello     │  │   [hero foto]  │              │
│  │   [hero foto]  │  │   Baroque SE   │              │
│  │   [Explore →]  │  │   [Explore →]  │              │
│  └────────────────┘  └────────────────┘              │
│                                                       │
│  NOT SURE ABOUT YOUR VENUE?                          │  ← sezione "venue agnostic"
│  I photograph destination weddings across Sicily     │
│  and beyond. Tell me about your vision.              │
│  [Tell Me About Your Wedding →]  → /contact          │
│                                                       │
└──────────────────────────────────────────────────────┘
```

**Fonte dati Sanity:** query `*[_type == "locationPage"] | order(priority asc)` — ogni locationPage ha i fields per popolare la card (venueName, city, heroImage, slug).

**SEO:**
- Title: "Wedding Venues in Sicily — Destination Wedding Photography | Alex Cinisi"
- Description: "Discover Sicily's most stunning wedding venues — Villa Igiea, Taormina, Scopello, Noto. Editorial photography for refined destination weddings."
- Schema: CollectionPage + BreadcrumbList
- Canonical: `https://www.alexcinisiphotography.com/locations`
- Priority sitemap: 0.9

---

### 4.5 Location Page `/locations/[slug]`

**Già progettata.** Template completo: villa-igiea-wedding-photographer.html. Vedi PROJECT-ARCHITECTURE.md sezione 3.3 per lo schema Sanity `locationPage`.

**Struttura confermata:** Hero → TrustBar → VenueIntro → VenueDetails (photo spots) → Gallery → Pillars (why me) → VenueCallout → Investment → Process → Testimonials → FAQ → Availability + Form → FinalCTA.

**Cross-linking obbligatorio:**
- Link a journal posts ambientati in questa venue (query: `*[_type == "journalPost" && locationRef._ref == $locationId]`)
- Link alla locations hub (`/locations`)
- Link ad altre location pages ("Explore other venues")
- Breadcrumb: Home → Locations → [Venue Name]

**SEO:** Schema ProfessionalService + FAQPage + BreadcrumbList. Ogni page ha keyword specifiche (vedi LOCATION_PAGES in constants.ts).

**Lista location pages (priorità):**

| Priorità | Slug | Venue | Regione | Stato |
|----------|------|-------|---------|-------|
| 1 | villa-igiea-wedding-photographer | Villa Igiea | Palermo | Template pronto |
| 2 | wedding-photographer-taormina | Taormina | East Sicily | Da creare |
| 3 | wedding-photographer-palermo | Palermo | Palermo | Da creare |
| 4 | tonnara-di-scopello-wedding | Tonnara di Scopello | Trapani | Da creare |
| 5 | wedding-photographer-noto | Noto | Southeast Sicily | Da creare |
| 6 | elopement-photographer-sicily | Elopement Sicily | All Sicily | Da creare |
| 7 | wedding-photographer-cefalu | Cefalù | North Sicily | Da creare |
| 8 | agrigento-wedding-photographer | Agrigento | South Sicily | Da creare |
| 9 | castello-monaci-wedding-photographer | Castello Monaci | Puglia | Expansion — strategia in sviluppo |

---

### 4.6 About `/about`

**Cos'è:** Pagina dedicata ad Alex — chi è, come lavora, la sua filosofia. Estende la sezione About della homepage con profondità.

**Struttura:**

```
┌──────────────────────────────────────────────────────┐
│  Home → About                                        │
│                                                       │
│  ┌──────────────┐                                    │
│  │ Foto Alex    │  ABOUT                             │
│  │ (ritratto    │  The Photographer Behind           │
│  │ editoriale)  │  the Lens                          │  ← bride-first: come lavoro per TE
│  │              │                                    │
│  └──────────────┘  Based in Sicily · Available       │
│                    Worldwide · Film & Digital         │
│                                                       │
│  SEZIONE 1 — BRIDE-FIRST (come lavoro per te)       │
│  "I don't direct — I observe. I don't rush —        │
│  I wait for the moment that matters."                │
│  [3-4 paragrafi sulla filosofia e l'approccio]       │
│                                                       │
│  SEZIONE 2 — FILM PHOTOGRAPHY                        │
│  Perché la pellicola, cosa significa per il          │
│  risultato finale, Contax 645, Fuji 400H            │
│  [2-3 paragrafi + immagini film]                     │
│                                                       │
│  SEZIONE 3 — CREDENZIALI (sottile, non vantoso)     │
│  Pubblicazioni, riconoscimenti, venue dove ha        │
│  lavorato, planner con cui collabora                 │
│                                                       │
│  SEZIONE 4 — PERSONAL                               │
│  Nato in Sicilia, il rapporto con la luce            │
│  mediterranea, cosa fa quando non fotografa          │
│                                                       │
│  [Begin Your Story →]  → /contact                    │
│                                                       │
└──────────────────────────────────────────────────────┘
```

**Tono:** "Silenzioso" — mostra la competenza attraverso dettagli specifici, non attraverso affermazioni di lusso. Esempio: non "I am a world-class photographer" ma "I shoot Fuji 400H overexposed by one stop because the way it renders skin tones in Sicilian light is irreplaceable."

**SEO:**
- Title: "About Alex Cinisi — Luxury Wedding Photographer, Sicily | Film & Digital"
- Schema: Person + BreadcrumbList
- Canonical: `https://www.alexcinisiphotography.com/about`

---

### 4.7 Contact `/contact`

**Cos'è:** Pagina dedicata al form di contatto completo. Il punto di conversione finale del sito.

**Layout:**

```
┌──────────────────────────────────────────────────────┐
│  Home → Contact                                      │
│                                                       │
│  BEGIN YOUR STORY                                    │
│                                                       │
│  ┌─────────────────┐  ┌──────────────────────────┐  │
│  │                  │  │                          │  │
│  │ Testo + dettagli │  │   FORM COMPLETO          │  │
│  │                  │  │                          │  │
│  │ Fill out the     │  │   Your First Name *      │  │
│  │ form and I'll    │  │   Partner's Name *       │  │
│  │ be in touch      │  │   Email *                │  │
│  │ within 24 hours. │  │   Phone                  │  │
│  │                  │  │   Wedding Date *         │  │
│  │ Response: 24h    │  │   Location [select] *    │  │
│  │ Instagram:       │  │   Guest Count [select]   │  │
│  │ @alexcinisi...   │  │   How Found [select]     │  │
│  │ Based in Sicily  │  │   Budget [select] *      │  │
│  │ Languages: IT/EN │  │   Vision [textarea] *    │  │
│  │                  │  │                          │  │
│  │                  │  │   ☐ Film Photography     │  │
│  │                  │  │   ☐ Video Coverage       │  │
│  │                  │  │   ☐ Engagement Session   │  │
│  │                  │  │   ☐ Multi-day Coverage   │  │
│  │                  │  │                          │  │
│  │                  │  │   ☐ Privacy (GDPR) *     │  │
│  │                  │  │                          │  │
│  │                  │  │   [Request Your Bespoke  │  │
│  │                  │  │    Proposal →]           │  │
│  │                  │  │                          │  │
│  └─────────────────┘  └──────────────────────────┘  │
│                                                       │
└──────────────────────────────────────────────────────┘
```

**Campi hidden (tracking automatico, invisibili, GDPR-compliant):**
- `source`: pagina di provenienza (homepage, location, journal, direct)
- `city` + `country`: da IP geolocation
- `referrer`: HTTP referrer
- `device`: mobile/desktop
- `timeOnSite`: secondi prima del submit

**Form semplificato (usato in homepage, location pages, journal posts):**
Solo 5 campi: Name, Email, Wedding Date, Location, Vision + Privacy. Al submit, stessi hidden fields + `source` che identifica la pagina. Tutti puntano allo stesso `/api/contact` endpoint.

**SEO:**
- Title: "Contact — Begin Your Wedding Story | Alex Cinisi Photography"
- Schema: ContactPage + BreadcrumbList
- Canonical: `https://www.alexcinisiphotography.com/contact`

---

### 4.8 Ads Landing Page `/ads/luxury-destination-wedding-sicily`

**Già progettata.** Vedi PROMPT-ADS-LANDING-PAGE.md e report-strategico-alexcinisi-v2.md sezione 2.4-2.5.

**Regole chiave:** noindex, no menu, no footer links, no external links, form semplificato con `source: "google-ads"`, URL mantenuta identica alla versione WordPress per preservare Quality Score.

---

## 5. SANITY CMS — Schema aggiornato

### 5.1 Schema `journalPost` (unifica `story` + `blogPost`)

```typescript
// sanity/schemas/journalPost.ts
export default {
  name: 'journalPost',
  title: 'Journal Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'coupleName', title: 'Couple Name', type: 'string' },
    { name: 'subtitle', title: 'Subtitle', type: 'string' },
    // example: "A Midsummer Celebration at Villa Valguarnera"
    { name: 'location', title: 'Location/Venue', type: 'string' },
    {
      name: 'locationRef',
      title: 'Related Location Page',
      type: 'reference',
      to: [{ type: 'locationPage' }],
      description: 'Link to the location landing page (if exists)'
    },
    { name: 'country', title: 'Couple Country', type: 'string' },
    { name: 'date', title: 'Date', type: 'date' },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Wedding', value: 'wedding' },
          { title: 'Editorial', value: 'editorial' },
          { title: 'Engagement', value: 'engagement' },
          { title: 'Travel', value: 'travel' },
          { title: 'Behind the Scenes', value: 'bts' },
        ]
      }
    },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
    { name: 'portfolioImage', title: 'Portfolio Grid Image', type: 'image', options: { hotspot: true } },
    {
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt', title: 'Alt Text', type: 'string' },
          { name: 'caption', title: 'Caption', type: 'string' }
        ]
      }]
    },
    {
      name: 'seoContent',
      title: 'Story Text (SEO)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Min 200 words, target 500. Bride-first narrative.'
    },
    {
      name: 'vendorCredits',
      title: 'Vendor Credits',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'role', title: 'Role', type: 'string' },
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'url', title: 'Website URL', type: 'url' }
        ]
      }]
    },
    { name: 'metaTitle', title: 'Meta Title', type: 'string' },
    { name: 'metaDescription', title: 'Meta Description', type: 'string' },
    { name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false },
    { name: 'order', title: 'Portfolio Order', type: 'number' }
  ],
  orderings: [
    { title: 'Date Desc', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
    { title: 'Portfolio Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }
  ]
}
```

### 5.2 Schema `locationPage` — Invariato

Resta come definito in PROJECT-ARCHITECTURE.md sezione 3.3. Aggiungere solo:

```typescript
{ name: 'priority', title: 'Display Order', type: 'number', description: 'Order on /locations hub page' }
```

---

## 6. FILE STRUCTURE — Aggiornata

```
src/app/
├── layout.tsx              # Root layout (Nav + Footer + fonts)
├── page.tsx                # Homepage
├── globals.css
├── about/
│   └── page.tsx            # About Alex
├── journal/
│   ├── page.tsx            # Journal index (archivio con filtri)
│   └── [slug]/
│       └── page.tsx        # Singolo journal post (dynamic)
├── locations/
│   ├── page.tsx            # Locations hub (NUOVA)
│   └── [slug]/
│       └── page.tsx        # Singola location page (dynamic)
├── contact/
│   └── page.tsx            # Contact con form completo
├── ads/
│   └── luxury-destination-wedding-sicily/
│       └── page.tsx        # Ads landing (noindex, standalone)
└── api/
    └── contact/
        └── route.ts        # Contact form API endpoint
```

---

## 7. WORDPRESS REDIRECTS — Aggiornati

```typescript
// next.config.ts
async redirects() {
  return [
    // Old WordPress stories → new journal
    { source: '/villa-igiea-wedding-a-luxury-love-story', destination: '/journal/villa-igiea-wedding', permanent: true },
    { source: '/stories-2', destination: '/journal', permanent: true },
    // Old WordPress pages
    { source: '/stories', destination: '/journal', permanent: true },
    { source: '/blog', destination: '/journal', permanent: true },
    // Catch-all for any /stories/[slug] → /journal/[slug]
    { source: '/stories/:slug', destination: '/journal/:slug', permanent: true },
    { source: '/blog/:slug', destination: '/journal/:slug', permanent: true },
    // Add all other WordPress slugs as they are mapped
  ]
}
```

---

## 8. SEO — Schema Markup per tipo di pagina

| Pagina | Schema JSON-LD | Priority sitemap |
|--------|---------------|-----------------|
| Homepage `/` | LocalBusiness + ProfessionalService | 1.0 |
| Journal index `/journal` | CollectionPage + BreadcrumbList | 0.8 |
| Journal post `/journal/[slug]` | Article + ImageGallery + BreadcrumbList | 0.8 |
| Locations hub `/locations` | CollectionPage + BreadcrumbList | 0.9 |
| Location page `/locations/[slug]` | ProfessionalService + FAQPage + BreadcrumbList | 0.9 |
| About `/about` | Person + BreadcrumbList | 0.6 |
| Contact `/contact` | ContactPage + BreadcrumbList | 0.5 |
| Ads landing | noindex, nofollow | Non in sitemap |

---

## 9. INTERNAL LINKING STRATEGY

### 9.1 Cross-link obbligatori

| Da | A | Tipo di link |
|----|---|-------------|
| Journal post (wedding at Villa Igiea) | `/locations/villa-igiea-wedding-photographer` | "Explore more weddings at Villa Igiea →" nel body |
| Location page (Villa Igiea) | Journal posts ambientati lì | "Recent stories from Villa Igiea" — sezione con 2-3 cards |
| Location page | `/locations` hub | Breadcrumb + "Explore other venues" link |
| Locations hub | Ogni location page | Griglia venue cards |
| Journal index | Ogni journal post | Cards archivio |
| Homepage stories section | `/journal/[slug]` | "Explore This Story →" su ogni card |
| Homepage portfolio masonry | `/journal/[slug]` | Click su ogni immagine |
| Homepage location cards | `/locations/[slug]` | "Discover [Venue] →" |
| Ogni pagina (CTA) | `/contact` | "Reserve Your Date" / "Begin Your Story" |

### 9.2 Related content logic

Per i journal posts, mostrare 3 "related stories" in fondo. Logica di selezione (in ordine di priorità):
1. Stessa `locationRef` (stesso venue)
2. Stesso `category`
3. Stessi `tags`
4. Più recenti come fallback

---

## 10. REFERENCE — Siti analizzati

| Sito | Struttura nav | Journal/Blog | Note chiave |
|------|--------------|-------------|-------------|
| gregfinck.com | Weddings, Fashion, Journal, Education, About, Contact | "Journal" con filtri categoria (Wedding, Engagement, Editorial, Travel, Portrait). Post con narrativa lunga prima delle foto. | Benchmark principale per struttura Journal. Sito costruito da Ludlow Kingsley. |
| roman-ivanov.com | Portfolio, Reviews, Booking, Education, Presets | "Portfolio" mostra gallery complete, non blog posts narrativi. Booking esterno (portal). | Approccio più minimale, meno content marketing. Forte su awards/press. Built su Tilda. |
| daniloandsharon.com | Stories, Film, About, Contact | "Stories" come archivio. Scroll-jacking, h-scroll cards, transizioni dark↔light. | Benchmark per scroll mechanics e transizioni. Design reference principale per homepage. |
| davidbastianoni.com | Portfolio, About, Contact | Portfolio-centric, meno contenuto testuale. | Riferimento secondario per aesthetic. |

---

## 11. CONSTANTS.TS — Aggiornamenti necessari

```typescript
// Aggiornare WP_REDIRECTS
export const WP_REDIRECTS = [
  { source: '/villa-igiea-wedding-a-luxury-love-story', destination: '/journal/villa-igiea-wedding', permanent: true },
  { source: '/stories-2', destination: '/journal', permanent: true },
  { source: '/stories', destination: '/journal', permanent: true },
  { source: '/blog', destination: '/journal', permanent: true },
]

// Aggiungere categorie Journal
export const JOURNAL_CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Wedding', value: 'wedding' },
  { label: 'Editorial', value: 'editorial' },
  { label: 'Engagement', value: 'engagement' },
  { label: 'Travel', value: 'travel' },
  { label: 'Behind the Scenes', value: 'bts' },
]

// LOCATION_PAGES resta invariato ma aggiungere:
// { slug: 'castello-monaci-wedding-photographer', venueName: 'Castello Monaci', city: 'Mesagne', region: 'Puglia', ... }
```

---

## 12. REGOLA DEI 3 CLICK

Ogni pagina del sito è raggiungibile in massimo 3 click dalla homepage:

| Pagina | Percorso | Click |
|--------|---------|-------|
| Journal index | HP → Nav "Journal" | 1 |
| Journal post | HP → Nav "Journal" → Card click | 2 |
| Journal post (da HP) | HP → Stories card "Explore" | 1 |
| Locations hub | HP → Nav "Locations" | 1 |
| Location page | HP → Nav "Locations" → Venue card | 2 |
| Location page (da HP) | HP → Location card "Discover" | 1 |
| About | HP → Nav "About" | 1 |
| Contact | HP → CTA "Reserve Your Date" | 1 |

---

*Questo documento è il riferimento definitivo per la struttura del sito. Ogni decisione di routing, navigazione, o creazione di nuove pagine deve essere validata contro questo documento. Aggiornare la versione in caso di modifiche approvate.*
