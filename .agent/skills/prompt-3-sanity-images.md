# PROMPT 3 — Wire Sanity Images to Homepage Components

## Context

The homepage has 17 sections fully built with hardcoded content and placeholder gradient backgrounds where images should be. Sanity CMS is configured with schemas for `homePage` (singleton), `portfolioItem`, and `testimonial`. The Sanity client exists at `src/lib/sanity/client.ts` and the image URL builder at `src/lib/sanity/image.ts`. Environment variables are set in `.env.local`.

The task is to make every image on the homepage dynamic: fetched from Sanity when available, falling back to current placeholders when Sanity returns null.

---

## Task

Wire all homepage image components to Sanity CMS. This touches 8 files minimum. The site must work identically with an empty CMS (all placeholders render) AND with populated CMS data (real images render via next/image).

---

## Step 1 — GROQ Queries

Create or update `src/lib/sanity/queries.ts` with these queries:

```typescript
// Fetch homepage singleton images + site logo
export const homePageQuery = `*[_type == "homePage"][0] {
  heroImage,
  manifestoImage,
  aboutImage,
  filmSectionImage,
  photoBreakImage,
  siteLogo,
  proofLogos[] { name, logo, url }
}`

// Fetch featured portfolio items for homepage grid (max 7)
export const featuredPortfolioQuery = `*[_type == "portfolioItem" && featured == true] | order(order asc) [0...7] {
  coupleName, location, badge, image, slug
}`

// Fetch featured testimonials for homepage (max 5)  
export const featuredTestimonialsQuery = `*[_type == "testimonial" && featured == true] | order(_createdAt desc) [0...5] {
  coupleName, country, countryFlag, location, quote, rating
}`
```

---

## Step 2 — Homepage Data Fetching

Update `src/app/page.tsx` to fetch all Sanity data at the page level and pass it down as props. This is a Server Component, so fetch directly:

```typescript
import { sanityClient } from '@/lib/sanity/client'
import { homePageQuery, featuredPortfolioQuery, featuredTestimonialsQuery } from '@/lib/sanity/queries'

export default async function HomePage() {
  // Fetch all Sanity data — returns null if CMS is empty
  const [homePage, portfolio, testimonials] = await Promise.all([
    sanityClient.fetch(homePageQuery).catch(() => null),
    sanityClient.fetch(featuredPortfolioQuery).catch(() => null),
    sanityClient.fetch(featuredTestimonialsQuery).catch(() => null),
  ])

  return (
    <>
      <Hero image={homePage?.heroImage} />
      <TrustBar />
      <ProofBar logos={homePage?.proofLogos} />
      <Manifesto image={homePage?.manifestoImage} />
      <Pillars />
      <PortfolioGrid items={portfolio} />
      <Testimonials items={testimonials} />
      <FilmSection image={homePage?.filmSectionImage} />
      <Investment />
      <ProcessSteps />
      <AboutSection image={homePage?.aboutImage} />
      <Locations />
      <FAQ />
      <PhotoBreak image={homePage?.photoBreakImage} />
      <Availability />
      <ContactForm />
      <FinalCTA />
    </>
  )
}
```

**Important:** The `siteLogo` also needs to reach Nav and Footer, which live in the root layout. Since layout.tsx cannot easily receive page-level data, use one of these approaches:
- **Option A (recommended):** Create a separate Sanity query for the logo in `LayoutShell.tsx` (the client component that wraps Nav/Footer). Fetch it once, pass to Nav and Footer.
- **Option B:** Fetch the logo in layout.tsx as a Server Component, pass it through LayoutShell to Nav and Footer.

Also update the Sanity `homePage` schema to include:
- `siteLogo` (image, accepts SVG) — the site logo used in Nav and Footer
```

The key pattern: every section that has an image receives an optional `image` prop. If it's undefined/null, the component renders its existing placeholder. Keep the existing import of constants/defaultItems for all non-image data as fallback.

---

## Step 3 — Update Each Component

For EVERY component listed below, apply this pattern:

### Pattern for image components:

```typescript
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

interface Props {
  image?: any // Sanity image object, optional
}

// Inside the component, where the placeholder gradient div currently is:
{image ? (
  <Image
    src={urlFor(image).width(WIDTH).auto('format').quality(QUALITY).url()}
    alt="DESCRIPTIVE ALT TEXT"
    fill
    sizes="SIZES"
    style={{ objectFit: 'cover' }}
    // add priority={true} ONLY for Hero
  />
) : (
  // Keep the existing placeholder gradient div exactly as is
  <div className="iph">...</div>
)}
```

### Components to update with specific settings:

**A) Hero.tsx**
- Prop: `image?: any`
- Image settings: `width(1920).auto('format').quality(85)`
- next/image: `fill, sizes="100vw", priority={true}`
- Alt: "Luxury destination wedding photography in Sicily by Alex Cinisi"
- The image replaces the `.hero-bg` gradient background
- Keep the overlay gradient (::after) on top of the image for text readability

**B) Manifesto.tsx**
- Prop: `image?: any`
- Image settings: `width(1200).auto('format').quality(80)`
- next/image: `fill, sizes="(max-width:960px) 0px, 50vw"`
- Alt: "Emotional wedding moment captured by Alex Cinisi Photography"
- The image replaces the `.manifesto-media` gradient div
- On mobile this section is hidden (display:none), so sizes starts with 0px

**C) AboutSection.tsx**
- Prop: `image?: any`
- Image settings: `width(1200).auto('format').quality(80)`
- next/image: `fill, sizes="(max-width:960px) 0px, 50vw"`
- Alt: "Alex Cinisi, wedding photographer in Sicily"
- Replaces the `.about-img` gradient div

**D) FilmSection.tsx**
- Prop: `image?: any`
- Image settings: `width(1200).auto('format').quality(80)`
- next/image: `fill, sizes="(max-width:960px) 0px, 50vw"`
- Alt: "Film and digital wedding photography comparison"
- Replaces the `.film-media` gradient div

**E) PhotoBreak.tsx** (the full-width image section before Availability)
- Prop: `image?: any`
- Image settings: `width(2400).auto('format').quality(85)`
- next/image: `fill, sizes="100vw"`
- Alt: "Wedding photography in Sicily - golden hour at a luxury venue"
- Replaces the `.photo-break` gradient background
- This is a full-bleed image, similar to Hero

**F) PortfolioGrid.tsx**
- Prop: `items?: Array<{ coupleName: string, location: string, badge: string, image: any, slug: any }>`
- If `items` exists and has length > 0, use Sanity data. Otherwise fall back to the existing hardcoded PORTFOLIO_HOME from constants.ts
- For each portfolio item image: `urlFor(item.image).width(800).auto('format').quality(80)`
- next/image: `fill, sizes="(max-width:960px) 100vw, 50vw"`
- Alt: `${item.coupleName} wedding at ${item.location}`
- Each `.port-item` currently has a gradient background — replace with the Sanity image when available

**G) Testimonials.tsx**
- Prop: `items?: Array<{ coupleName: string, country: string, countryFlag: string, location: string, quote: string, rating: number }>`
- If `items` exists and has length > 0, use Sanity data. Otherwise fall back to HOME_TESTIMONIALS from constants.ts
- No images needed here, just text data replacement

**H) ProofBar / As Featured In section**
- Prop: `logos?: Array<{ name: string, logo: any, url: string }>`
- If `logos` exists, render each logo using: `urlFor(logo.logo).height(28).auto('format').url()`
- next/image: `width={auto} height={28}`
- If `logos` is null, keep the current text-based placeholder logos (Vogue, WEZOREE, ANFM, etc.)

**I) Nav.tsx — Logo**
- Prop: `logo?: any` (Sanity image object from homePage query)
- Currently the nav logo is a text link: "Alex Cinisi Photography" (`<a className="nav-logo">`)
- Replace the text with an SVG logo image when available from Sanity
- If `logo` exists: render `<Image src={urlFor(logo).height(40).auto('format').url()} alt="Alex Cinisi Photography" width={180} height={40} priority={true} />` inside the existing `<a>` tag
- If `logo` is null: keep the current text "Alex Cinisi Photography" as fallback
- The logo must remain a link to "/" and keep the same `nav-logo` class for styling
- Add CSS: `.nav-logo img { height: 28px; width: auto; }` — adjust height to match the visual weight of the current text
- On the scrolled state (`.nav.scrolled`), the logo should remain the same

**J) Footer.tsx — Logo**
- Same pattern as Nav: replace the text "Alex Cinisi Photography" in `.footer-logo` with the SVG logo image
- If `logo` exists: render `<Image src={urlFor(logo).height(32).auto('format').url()} alt="Alex Cinisi Photography" width={160} height={32} />` inside the existing `<a>` tag
- If `logo` is null: keep the current text as fallback
- The footer logo should be slightly smaller than the nav logo
- Add CSS: `.footer-logo img { height: 22px; width: auto; opacity: .85; }` — slightly muted to match the footer aesthetic

---

## Step 4 — Image Container Styling

Each component that gets a Sanity image needs its image container to have `position: relative` for next/image `fill` to work. Check that:

- `.hero-bg` has `position: relative` (it should already)
- `.manifesto-media` has `position: relative`
- `.about-img` has `position: relative`
- `.film-media` has `position: relative`
- `.photo-break` has `position: relative`
- Each `.port-item` has `position: relative` (should already have `overflow: hidden`)

If any are missing `position: relative`, add it.

---

## Step 5 — Sanity Image Pipeline Configuration

Make sure the `urlFor` helper in `src/lib/sanity/image.ts` is correctly configured:

```typescript
import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './client'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}
```

The `.auto('format')` in each component call tells Sanity to serve WebP to browsers that support it, JPEG to others. The `.width()` sets the max width for responsive serving. This is the Sanity Image Pipeline — no manual optimization needed.

---

## Step 6 — Verify next.config.ts

Confirm that `next.config.ts` has cdn.sanity.io in the image remote patterns:

```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'cdn.sanity.io' },
  ],
},
```

---

## Step 7 — Build Verification

After all changes:

1. Run `npm run build` — must pass with zero errors
2. Run `npm run dev` and check homepage at localhost:3000
3. Verify all sections render correctly with placeholder gradients (empty CMS)
4. Open Sanity Studio at localhost:3000/studio, create a "Home Page" document, upload one test image to heroImage, publish
5. Refresh homepage — the Hero should now show the real image, all other sections should still show placeholders
6. Check mobile viewport (375px) — images should not appear in sections that hide their media on mobile (Manifesto, About, Film)

---

## Critical Rules

- NEVER remove existing placeholder rendering — always keep it as the else branch
- NEVER make Sanity a hard dependency — the site must work with an empty CMS
- Use `Promise.all` with `.catch(() => null)` for all Sanity fetches so a CMS error doesn't crash the page
- All images must use next/image (not <img>) for automatic optimization
- The `priority` attribute should ONLY be on the Hero image (above the fold)
- Do not change any CSS class names, layout structure, or visual design — only add the image rendering logic
