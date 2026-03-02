# HOMEPAGE DEVELOPMENT BRIEF — Alex Cinisi Photography

## Objective

Build the new homepage for alexcinisiphotography.com in Next.js (TypeScript + React). This page replaces the current WordPress/Elementor homepage AND the previous `alex-cinisi-landing.html` prototype we built. The attached `homepage-v2.html` is the **pixel-perfect design reference** — replicate it exactly.

---

## TECH STACK

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules or globals.css (design tokens already defined in `globals.css`)
- **Fonts:** Google Fonts — `Red Hat Display` (300, 400, 500, 700), `Bodoni Moda` (300, 400, italic), `Jost` (200, 300, 400)
- **Deployment:** Vercel (auto-deploy from GitHub)
- **No external UI libraries** — all custom CSS, no Tailwind, no component libraries

---

## DESIGN TOKENS (CSS Variables)

```css
:root {
  --black:     #111110;
  --ink:       #1E1D1B;
  --charcoal:  #3A3835;
  --mid:       #7A7672;
  --rule:      #DEDBD6;
  --grey-bg:   #F3F1EE;
  --off-white: #FAFAF8;
  --white:     #FFFFFF;
  --accent:    #B8A88A;
  --accent-dk: #8C7D65;
}
```

---

## PAGE STRUCTURE — Sections in Order

### 1. NAV (Fixed, transparent → white on scroll)
- **Logo left:** "Alex Cinisi Photography" (Red Hat Display, 400, .8rem, letter-spacing .32em, uppercase)
- **Right:** "Reserve Your Date" CTA button + Hamburger menu icon
- **CTA button** hides on mobile (<960px)
- **On scroll (>60px):** white bg with blur, border-bottom, reduced padding
- **Hamburger:** 3 lines → animates to X on click. Opens fullscreen overlay menu
- **IMPORTANT — Hamburger X fix:** Use flexbox layout (NOT absolute positioning) for the 3 spans. Use `translateY` to move lines to center + `rotate` to form X. This is the proven approach:
```css
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 26px;
  height: 18px;
}
.hamburger span {
  display: block;
  width: 100%;
  height: 1.5px;
  background: var(--ink);
  transition: all .35s cubic-bezier(.4,0,.2,1);
  transform-origin: center center;
}
/* Active X state */
.hamburger.active span:nth-child(1) { transform: translateY(8.25px) rotate(45deg); }
.hamburger.active span:nth-child(2) { opacity: 0; }
.hamburger.active span:nth-child(3) { transform: translateY(-8.25px) rotate(-45deg); }
```

### 2. FULLSCREEN MENU OVERLAY
- White background, centered content, z-index:201
- Menu links with stagger animation (each link slides up with increasing delay)
- Links: Portfolio, Approach, Investment, About, Locations, Stories, Contact
- Footer inside overlay: Instagram, Email, Privacy
- `body overflow: hidden` when menu is open
- Click any link → close menu + smooth scroll to section

### 3. HERO — Full-width immersive
- **Full viewport height, full-width background image** (NOT split layout)
- Background image with overlay gradient from bottom for text readability
- Content positioned bottom-left with padding
- **Eyebrow:** "Luxury Wedding Photographer · Sicily & Worldwide"
- **H1 (3 lines):**
  - Line 1: "Your Love Story," (Red Hat Display, 300)
  - Line 2: "Told Like a Film" (Bodoni Moda, italic, 300)
  - Line 3: "You'll Never Forget" (Red Hat Display, 300)
- **Subtitle:** "Timeless destination wedding photography in Sicily for couples who believe their day deserves to be captured with heart, artistry and soul — not just a camera."
- **CTAs:** "Reserve Your Date" (filled button, white bg on dark) + "Discover the Work" (text link)
- **NO "Scroll" text** at bottom
- Staggered fadeUp animations on load (eyebrow → h1 → subtitle → CTAs)

### 4. TRUST BAR
- Horizontal bar with 5 metrics separated by vertical dividers
- Data: `30+` International Weddings | `15+` Countries Served | `2` Photographers Included | `8h` Full Day Coverage | `Film` & Digital Artistry
- Horizontal scroll on mobile

### 5. AS FEATURED IN — Logos
- Centered bar with "As Featured In" label
- **Use real logo images** (not text badges): Vogue, Wezoree, ANFM, Tuscan Wedding Network
- Logos in grayscale, 50% opacity → hover: higher opacity
- Links to external profiles where applicable

### 6. MANIFESTO (Philosophy)
- **Split grid:** Left = photo, Right = text (on mobile, photo hides)
- Eyebrow: "Our Philosophy"
- Heading: "This Is Not Just Photography. *This Is Your Legacy.*"
- Body copy (3 paragraphs with bold/italic keywords):
  - "I don't believe in perfect poses or forced smiles. I believe in **real moments that take your breath away 50 years from now**."
  - "Your wedding in Sicily isn't a photoshoot — it's the beginning of your family's story. The nervous laughter before the ceremony. The father who can barely hold it together. The way *you two look at each other when nobody's watching*."
  - "That's what I live to capture. As a **luxury wedding photographer in Sicily**, my approach blends photojournalistic instinct with editorial elegance — quiet, intuitive, and deeply human."
- Link: "More About My Approach"

### 7. THREE PILLARS
- Grey background section
- Heading: "Three Pillars of *Unforgettable Imagery*"
- 3-column grid (1 col on mobile), separated by 1px borders
- Each pillar: large italic number (01/02/03) + title + description + testimonial quote
- Pillar data:

| # | Title | Description | Quote | Author |
|---|-------|-------------|-------|--------|
| 01 | Invisible Presence | My approach is quiet, intuitive, human. You live your day — I capture it unfolding naturally. No intrusion, no interruption, just authentic moments preserved forever. | "Alex made us forget there was a camera. We were just… us." | Sofia & Michael, USA |
| 02 | Editorial Sensibility | When gentle guidance is needed — portraits, golden hour, family formals — it's subtle, elegant and natural. No stiff poses. No awkward "say cheese." | "Every image feels natural, timeless and deeply emotional." | Chiara & Luca, Italy |
| 03 | Bespoke Attention | Every couple, every celebration is different. You're not a number — you're a story I'm honoured to tell, with my full creative focus from first inquiry to final gallery. | "Everything was so far above expectations. No words." | Francesca, Italy |

### 8. PORTFOLIO GRID
- Heading: "Love Stories From *Sicily & Beyond*"
- Asymmetric grid using `grid-template-columns: repeat(12, 1fr)`
- 7 items across 3 rows:
  - Row 1: span-7 (460px) + span-5 (460px)
  - Row 2: span-4 (380px) × 3
  - Row 3: span-5 (420px) + span-7 (420px)
- Each item: gradient placeholder bg, hover reveals overlay with couple name + venue + badge
- CTA below: "Explore All Stories" → links to /stories/
- Portfolio items:

| Couple | Location | Badge |
|--------|----------|-------|
| Marina & James | Villa Valguarnera · Bagheria | Film + Digital |
| Sophie & David | Taormina · Full Day | Destination |
| Lucia & Marco | Tonnara di Scopello | Editorial |
| Anna & Mark | Taormina · UK Couple | Film |
| Julia & Thomas | Noto · USA Couple | Intimate |
| Chiara & Luca | Scopello · Weekend | Full Weekend |
| Elena & Robert | Villa Igiea · Palermo | Luxury |

### 9. TESTIMONIALS
- Grey background
- Heading: "Straight From *Their Hearts*"
- Row 1: 3-column grid (3 testimonials)
- Row 2: 2-column grid (2 testimonials)
- Each card: flag emoji + 5 stars + italic quote + author name + venue
- Testimonial data:

| Flag | Quote | Name | Location |
|------|-------|------|----------|
| 🇺🇸 | "Alex has an extraordinary ability to disappear into the background while capturing the most intimate, beautiful moments. We couldn't imagine our Sicilian wedding without him." | Sofia & Michael | Villa Valguarnera · Bagheria |
| 🇬🇧 | "From our very first call, Alex understood exactly the feeling we wanted. The photos are not just beautiful — they're the truest version of our day. We're forever grateful." | Sophie & David | Taormina · Destination Wedding |
| 🇮🇹 | "Every image feels natural, timeless and deeply emotional. Alex captured moments we didn't even know were happening. His work is pure artistry." | Chiara & Luca | Tonnara di Scopello |
| 🇩🇪 | "We flew from Berlin for our Sicily dream wedding and Alex was the best decision we made. He guided us beautifully through every moment while keeping everything completely natural." | Anna & Thomas | Noto · Baroque Palazzo |
| 🇮🇹 | "Everything was so far above expectations. No words. The album is the most precious thing we own. Alex, you are family to us now." | Francesca & Marco | Palermo · Intimate Ceremony |

### 10. FILM & DIGITAL
- Split grid: Left = photo, Right = dark background (var(--ink)) text
- Eyebrow: "Film & Digital"
- Heading: "The Best of *Both Worlds*"
- Copy: "Every wedding receives the richness of digital mastery — vibrant colours, flawless detail, fast turnaround. For those who want something even more special, medium-format film adds an unmistakable warmth, grain, and timelessness that digital cannot replicate."
- Second paragraph: "Film photography is available as a bespoke enhancement to any package. The two mediums complement each other beautifully — giving you a gallery that feels both contemporary and eternal."
- CTA: "See Investment Details" (white bg button)

### 11. INVESTMENT
- Off-white background
- Heading: "Complete Transparency, *No Surprises*"
- **2-column layout:**
  - **Left column:**
    - "Starting Investment" label
    - **€ 2,500** (large display)
    - "Most couples invest between €2,500 – €5,000"
    - Includes list (diamond bullet markers):
      - Full wedding day coverage — 8 hours
      - Two professional photographers
      - 300 – 500 beautifully edited images
      - Private online gallery via PicTime
      - Premium 30×20cm wedding album included
      - High-resolution files with full print rights
      - Drone aerial photography included
      - Pre-wedding consultation & location scouting
      - Sneak peek delivery within 48–72 hours
    - CTA: "Request Your Bespoke Proposal"
  - **Right column:**
    - "Bespoke Enhancements" box (grey bg):
      - Film photography rolls (medium format)
      - Extended coverage (10–12 hours)
      - Engagement session in Sicily
      - Cinematic video highlight reel
      - Second-day / rehearsal dinner coverage
      - Additional premium albums (family sets)
    - Signature quote: *"No packages. No templates. Just your story, your way."* — Alex Cinisi

### 12. PROCESS (How It Works)
- White background
- Heading: "A Seamless Journey From Hello to *"I Do"*"
- 4-column grid, each with: large italic number + title + description
- Uses PROCESS_STEPS data from constants

### 13. ABOUT
- Split grid: Left = portrait photo, Right = text
- Eyebrow: "About Alex"
- Heading: "Why I Do *This Work*"
- Copy (4 paragraphs with italic/bold):
  - "Hi, I'm Alex. I fell in love with wedding photography not because of cameras or compositions — but because of *people*."
  - "There's something sacred about being invited into someone's most important day. The nervousness before the ceremony. The father's eyes when he sees his daughter. The way **you two look at each other when no one's watching**."
  - "That's what makes me feel alive."
  - "I grew up in Sicily, surrounded by extraordinary light and endless stories. My approach is quiet, intuitive, human. You live your day — I capture it unfolding naturally."
- **2×3 TRAITS GRID** (bordered cells, centered text):

| Value | Label |
|-------|-------|
| Sicilian | Born & Raised |
| IT · EN | Bilingual |
| Film | & Digital |
| Editorial | Style |
| 30+ | Weddings |
| 15+ | Countries |

CSS: `grid-template-columns: repeat(3, 1fr)`, 1px gap with border. Each cell has value (Red Hat Display 400, .92rem) + label (.52rem uppercase). On mobile <480px: 2 columns.

### 14. LOCATIONS (Internal links for SEO)
- Grey background
- Heading: "Luxury Venues Across *Sicily & Italy*"
- Subtitle: "From Palermo's Art Nouveau palazzi to Taormina's cliffside terraces and Noto's baroque splendour — I know every corner of this island intimately."
- 3-column grid of location cards:

| City | Venues | Link |
|------|--------|------|
| Palermo | Villa Igiea · Villa Niscemi · Villa Valguarnera · Palazzo Chiaramonte · Palazzo Butera | /wedding-photographer-palermo/ |
| Taormina | Belmond Grand Hotel Timeo · San Domenico Palace · Villa Comunale · Teatro Antico | /wedding-photographer-taormina/ |
| Scopello | Tonnara di Scopello · Borgo di Scopello · Zingaro Nature Reserve | /tonnara-di-scopello-wedding/ |
| Noto | Palazzo Nicolaci · Cattedrale di Noto · Villa Anna · Baroque Palazzi | /wedding-photographer-noto/ |
| Villa Igiea | Rocco Forte's iconic Art Nouveau palazzo on the Gulf of Palermo. A world-class setting. | /villa-igiea-wedding-photographer/ |
| Worldwide (dark bg card) | Italy · Europe · Destination weddings across 15+ countries | /stories/ |

Each card: city name (Red Hat Display 400) + venues list + "Explore X Weddings →" link with arrow animation on hover.

### 15. FAQ
- White background
- Heading: "Everything You *Need to Know*"
- Accordion (one open at a time), + icon → rotates to × when open
- 7 questions:

| Question | Answer |
|----------|--------|
| How much does a luxury wedding photographer in Sicily cost? | My starting investment is €2,500 for full-day coverage including two photographers, drone aerial photography, 300–500 edited images, a premium album, and private gallery. Most couples invest between €2,500 and €5,000 depending on coverage hours and enhancements. |
| How far in advance should we book? | Most couples book 12–18 months ahead, especially for peak season (May–October). Sicily's most popular venues fill quickly. I occasionally have last-minute availability — reach out and let's see what's possible. |
| Do you travel for destination weddings outside Sicily? | Absolutely. While Sicily is home, I've covered weddings across 15+ countries. Travel costs for destinations outside Sicily are included in your personalised proposal — no hidden fees. |
| What is the best time of year to get married in Sicily? | Late spring (May–June) and early autumn (September–October) offer the most beautiful light and comfortable temperatures. These months are ideal for outdoor ceremonies and golden hour portraits at Sicily's iconic venues. |
| What wedding venues in Sicily do you photograph at? | I have extensive experience at Villa Igiea, Tonnara di Scopello, Villa Valguarnera, venues throughout Taormina, Noto's baroque palazzi, and many more. I'm happy to recommend venues based on your vision and guest count. |
| When will we receive our photos? | You receive a sneak peek of 30–50 images within 48–72 hours. Your complete gallery is delivered within 8–10 weeks, carefully edited to ensure every image meets the highest artistic standard. |
| Do you speak Italian and English? | Yes, I'm fluent in both Italian and English. I work regularly with international couples and local families alike, and communication is always smooth and personal. |

### 16. PHOTO BREAK
- **Single full-width image**, NO grid
- Height: `clamp(360px, 45vw, 580px)`
- Placeholder gradient until real photo is added
- `object-fit: cover` for the image

### 17. AVAILABILITY
- Off-white background
- Heading: "Limited Dates *Remaining*"
- Copy: "I accept a limited number of weddings each year to ensure every couple receives my full creative attention and bespoke service. Peak season dates fill 12–18 months in advance."
- CTA: "Check Your Date"
- 2 availability cards with status dots:
  - 2026: green dot, "Select dates still available", "Spring & Autumn openings remaining"
  - 2027: amber dot, "Now accepting enquiries", "Secure your date early"

### 18. CONTACT FORM
- White background
- 2-column layout: left info + right form
- **Left column:**
  - Heading: "Tell Me About *Your Wedding*"
  - Copy + italic subtext
  - **Contact details (all clickable where applicable):**
    - EMAIL → `mailto:info@alexcinisiphotography.com` (clickable)
    - INSTAGRAM → `https://www.instagram.com/alexcinisiphotography/` (clickable, opens new tab)
    - RESPONSE → Within 24 hours
    - BASED IN → Sicily, Italy · Available worldwide
    - LANGUAGE → Italian · English
- **Right column — Form fields:**
  - Your Name (text)
  - Partner's Name (text)
  - Email (email)
  - Wedding Date (text, "Exact or approximate")
  - Location/Venue (select: Palermo, Taormina, Cefalù, Noto, Ragusa/Ibla, Trapani/Scopello, Agrigento, Messina area, Not sure yet, Outside Sicily)
  - Guest Count (select: Elopement, Intimate <50, Medium 50-100, Grand 100+)
  - Budget Range (select: €2,500–€3,500, €3,500–€5,000, €5,000+, Flexible)
  - How Did You Find Me? (select: Google, Instagram, Wedding Planner, Friend/Referral, Blog or Magazine, Other)
  - Your Story (textarea)
  - Checkboxes: Film Photography, Video Coverage, Engagement Session, Multi-day Coverage
  - Privacy checkbox (GDPR)
  - Submit: "Tell Me About Your Wedding →"

### 19. FINAL CTA
- Dark background (var(--ink))
- Heading: "Fifty Years From Now, You'll Open This Album *And Fall In Love Again*"
- Copy: "That's not a promise — it's the standard. Every image I create is designed to make you feel exactly what you felt in that moment, forever."
- CTA: "Begin Your Story →"

### 20. FOOTER
- Dark background
- Logo + copyright + links (Portfolio, Instagram, Contact, Privacy)

### 21. STICKY MOBILE CTA
- Fixed bottom bar, visible only on mobile (<960px)
- "Reserve Your Date →" button

---

## SEO — HEAD METADATA

```html
<title>Wedding Photographer Sicily | Luxury Destination Weddings | Alex Cinisi Photography</title>
<meta name="description" content="Award-winning luxury wedding photographer in Sicily. Timeless editorial photography for destination weddings in Palermo, Taormina, Noto & across Italy. 30+ international weddings. Investment from €2,500.">
<meta name="keywords" content="wedding photographer Sicily, luxury wedding photographer Italy, destination wedding photographer Sicily, wedding photographer Palermo, wedding photographer Taormina, editorial wedding photography Italy, Sicily wedding photographer">
<link rel="canonical" href="https://www.alexcinisiphotography.com/">
```

### Open Graph
```html
<meta property="og:title" content="Alex Cinisi Photography — Luxury Wedding Photographer in Sicily">
<meta property="og:description" content="Timeless editorial wedding photography for destination weddings in Sicily & Italy. For couples who believe their love story deserves artistry.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.alexcinisiphotography.com/">
<meta property="og:image" content="https://www.alexcinisiphotography.com/wp-content/uploads/og-homepage.webp">
<meta property="og:locale" content="en_US">
<meta property="og:site_name" content="Alex Cinisi Photography">
```

### Twitter Card
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Alex Cinisi Photography — Luxury Wedding Photographer Sicily">
<meta name="twitter:description" content="Editorial destination wedding photography in Sicily. 30+ international weddings captured with timeless artistry.">
```

---

## SCHEMA MARKUP (JSON-LD)

### 1. ProfessionalService + Photographer
```json
{
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "Photographer"],
  "name": "Alex Cinisi Photography",
  "description": "Luxury editorial wedding photographer specialising in destination weddings across Sicily and Italy.",
  "url": "https://www.alexcinisiphotography.com",
  "email": "info@alexcinisiphotography.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Palermo",
    "addressRegion": "Sicily",
    "addressCountry": "IT"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 38.1157, "longitude": 13.3615 },
  "priceRange": "€€€",
  "areaServed": ["Sicily", "Palermo", "Taormina", "Noto", "Italy"],
  "knowsAbout": ["Wedding Photography", "Destination Wedding", "Editorial Photography", "Luxury Wedding", "Film Photography"],
  "award": ["Featured in Vogue", "ANFM Certified Photographer", "Wezoree Top Photographer"],
  "sameAs": [
    "https://www.instagram.com/alexcinisiphotography/",
    "https://wezoree.com/it/vendors/profile/19253-alex-cinisi/",
    "https://anfm.it/fotografo/3902-alex-cinisi/"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Wedding Photography Services",
    "itemListElement": [{
      "@type": "Offer",
      "itemOffered": { "@type": "Service", "name": "Full Wedding Day Photography" },
      "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "EUR", "minPrice": "2500" }
    }]
  },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "reviewCount": "30", "bestRating": "5" }
}
```

### 2. FAQPage (all 7 questions from FAQ section)

### 3. BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.alexcinisiphotography.com/" }]
}
```

---

## UPDATED constants.ts VALUES

These values in `constants.ts` need to be updated:

```typescript
// Investment — UPDATED pricing
export const HOME_INVESTMENT = {
  startingPrice: 2500,
  priceRange: 'Most couples invest between €2,500 – €5,000',
  includes: [
    'Full wedding day coverage — 8 hours',
    'Two professional photographers',
    '300 – 500 beautifully edited images',
    'Private online gallery via PicTime',
    'Premium 30×20cm wedding album included',
    'High-resolution files with full print rights',
    'Drone aerial photography included',
    'Pre-wedding consultation & location scouting',
    'Sneak peek delivery within 48–72 hours',
  ],
  enhancements: [
    'Film photography rolls (medium format)',
    'Extended coverage (10–12 hours)',
    'Engagement session in Sicily',
    'Cinematic video highlight reel',
    'Second-day / rehearsal dinner coverage',
    'Additional premium albums (family sets)',
  ],
}

// Budget options — UPDATED
export const BUDGET_OPTIONS_HOME = [
  '€2,500 – €3,500',
  '€3,500 – €5,000',
  '€5,000+',
  "Flexible / Let's discuss",
]

// FAQ — UPDATED (expanded SEO-rich questions)
export const HOME_FAQ = [
  {
    question: 'How much does a luxury wedding photographer in Sicily cost?',
    answer: 'My starting investment is €2,500 for full-day coverage including two photographers, drone aerial photography, 300–500 edited images, a premium album, and private gallery. Most couples invest between €2,500 and €5,000 depending on coverage hours and enhancements.',
  },
  {
    question: 'How far in advance should we book?',
    answer: "Most couples book 12–18 months ahead, especially for peak season (May–October). Sicily's most popular venues fill quickly. I occasionally have last-minute availability — reach out and let's see what's possible.",
  },
  {
    question: 'Do you travel for destination weddings outside Sicily?',
    answer: "Absolutely. While Sicily is home, I've covered weddings across 15+ countries. Travel costs for destinations outside Sicily are included in your personalised proposal — no hidden fees.",
  },
  {
    question: 'What is the best time of year to get married in Sicily?',
    answer: "Late spring (May–June) and early autumn (September–October) offer the most beautiful light and comfortable temperatures. These months are ideal for outdoor ceremonies and golden hour portraits at Sicily's iconic venues.",
  },
  {
    question: 'What wedding venues in Sicily do you photograph at?',
    answer: "I have extensive experience at Villa Igiea, Tonnara di Scopello, Villa Valguarnera, venues throughout Taormina, Noto's baroque palazzi, and many more. I'm happy to recommend venues based on your vision and guest count.",
  },
  {
    question: 'When will we receive our photos?',
    answer: 'You receive a sneak peek of 30–50 images within 48–72 hours. Your complete gallery is delivered within 8–10 weeks, carefully edited to ensure every image meets the highest artistic standard.',
  },
  {
    question: 'Do you speak Italian and English?',
    answer: "Yes, I'm fluent in both Italian and English. I work regularly with international couples and local families alike, and communication is always smooth and personal.",
  },
]

// Testimonials — UPDATED (homepage-specific with venue details)
export const HOME_TESTIMONIALS = [
  {
    flag: '🇺🇸',
    stars: 5,
    quote: "Alex has an extraordinary ability to disappear into the background while capturing the most intimate, beautiful moments. We couldn't imagine our Sicilian wedding without him.",
    name: 'Sofia & Michael',
    location: 'Villa Valguarnera · Bagheria',
  },
  {
    flag: '🇬🇧',
    stars: 5,
    quote: "From our very first call, Alex understood exactly the feeling we wanted. The photos are not just beautiful — they're the truest version of our day. We're forever grateful.",
    name: 'Sophie & David',
    location: 'Taormina · Destination Wedding',
  },
  {
    flag: '🇮🇹',
    stars: 5,
    quote: "Every image feels natural, timeless and deeply emotional. Alex captured moments we didn't even know were happening. His work is pure artistry.",
    name: 'Chiara & Luca',
    location: 'Tonnara di Scopello',
  },
  {
    flag: '🇩🇪',
    stars: 5,
    quote: "We flew from Berlin for our Sicily dream wedding and Alex was the best decision we made. He guided us beautifully through every moment while keeping everything completely natural.",
    name: 'Anna & Thomas',
    location: 'Noto · Baroque Palazzo',
  },
  {
    flag: '🇮🇹',
    stars: 5,
    quote: "Everything was so far above expectations. No words. The album is the most precious thing we own. Alex, you are family to us now.",
    name: 'Francesca & Marco',
    location: 'Palermo · Intimate Ceremony',
  },
]

// Portfolio — ADD Elena & Robert
export const PORTFOLIO_HOME = [
  { couple: 'Marina & James', location: 'Villa Valguarnera · Bagheria', badge: 'Film + Digital' },
  { couple: 'Sophie & David', location: 'Taormina · Full Day', badge: 'Destination' },
  { couple: 'Lucia & Marco', location: 'Tonnara di Scopello', badge: 'Editorial' },
  { couple: 'Anna & Mark', location: 'Taormina · UK Couple', badge: 'Film' },
  { couple: 'Julia & Thomas', location: 'Noto · USA Couple', badge: 'Intimate' },
  { couple: 'Chiara & Luca', location: 'Scopello · Weekend', badge: 'Full Weekend' },
  { couple: 'Elena & Robert', location: 'Villa Igiea · Palermo', badge: 'Luxury' },
]

// NEW — Location cards for homepage
export const HOME_LOCATIONS = [
  {
    city: 'Palermo',
    venues: 'Villa Igiea · Villa Niscemi · Villa Valguarnera · Palazzo Chiaramonte · Palazzo Butera',
    slug: '/wedding-photographer-palermo/',
    linkText: 'Explore Palermo Weddings',
  },
  {
    city: 'Taormina',
    venues: 'Belmond Grand Hotel Timeo · San Domenico Palace · Villa Comunale · Teatro Antico',
    slug: '/wedding-photographer-taormina/',
    linkText: 'Explore Taormina Weddings',
  },
  {
    city: 'Scopello',
    venues: 'Tonnara di Scopello · Borgo di Scopello · Zingaro Nature Reserve',
    slug: '/tonnara-di-scopello-wedding/',
    linkText: 'Explore Scopello Weddings',
  },
  {
    city: 'Noto',
    venues: 'Palazzo Nicolaci · Cattedrale di Noto · Villa Anna · Baroque Palazzi',
    slug: '/wedding-photographer-noto/',
    linkText: 'Explore Noto Weddings',
  },
  {
    city: 'Villa Igiea',
    venues: "Rocco Forte's iconic Art Nouveau palazzo on the Gulf of Palermo. A world-class setting.",
    slug: '/villa-igiea-wedding-photographer/',
    linkText: 'Explore Villa Igiea Weddings',
  },
]

// NEW — About traits grid
export const ABOUT_TRAITS = [
  { value: 'Sicilian', label: 'Born & Raised' },
  { value: 'IT · EN', label: 'Bilingual' },
  { value: 'Film', label: '& Digital' },
  { value: 'Editorial', label: 'Style' },
  { value: '30+', label: 'Weddings' },
  { value: '15+', label: 'Countries' },
]
```

---

## ANIMATIONS

1. **Reveal on scroll:** IntersectionObserver, elements with `.reveal` class get `.visible` on enter (opacity 0→1, translateY 22px→0, transition .8s)
2. **Stagger delays:** `.d1` (.1s), `.d2` (.2s), `.d3` (.3s)
3. **Hero fadeUp:** Keyframe animation, staggered start times (.3s → .5s → .7s → .9s)
4. **Menu overlay:** Links slide up with increasing delay (.06s increment per item)
5. **Hamburger → X:** CSS transform transition

---

## RESPONSIVE BREAKPOINTS

- **Desktop:** > 960px (full layout)
- **Mobile:** ≤ 960px
  - All grids → single column
  - Nav CTA button hides
  - Hero full-width (no split)
  - Photo sections hide on split layouts
  - Trust bar horizontal scroll
  - Sticky bottom CTA appears
  - Traits grid: 3 columns (2 on <480px)

---

## REFERENCE FILE

The complete HTML/CSS reference is in **`homepage-v2.html`** — use it as the pixel-perfect design source. All CSS, all content, all structure is in that file. The globals.css in the project already contains shared styles for reuse across pages.

---

## WHAT TO DELETE

Remove/replace the previous `alex-cinisi-landing.html` — this homepage-v2 is the new homepage design. The landing page prototype served its purpose during design iteration.
