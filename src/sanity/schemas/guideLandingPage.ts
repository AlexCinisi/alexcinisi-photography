import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'guideLandingPage',
  title: 'Guide LP — Sicily Wedding Guide',
  type: 'document',

  fieldsets: [
    { name: 'hero', title: '🟢 Hero — Immagine + H1 + CTA', options: { collapsible: true, collapsed: false } },
    { name: 'press', title: '🟡 Press strip', options: { collapsible: true, collapsed: true } },
    { name: 'inside', title: "🟡 What's inside — 3 bullet", options: { collapsible: true, collapsed: true } },
    { name: 'portfolio', title: '🟡 Mini portfolio — 6 foto', options: { collapsible: true, collapsed: true } },
    { name: 'form', title: '🟢 Form — il perno della pagina', options: { collapsible: true, collapsed: true } },
    { name: 'about', title: '🟡 About Alex', options: { collapsible: true, collapsed: true } },
    { name: 'finalCta', title: '🟡 Final CTA', options: { collapsible: true, collapsed: true } },
    { name: 'thankYou', title: '🟢 Thank-you page /guide-confirmed', options: { collapsible: true, collapsed: true } },
    { name: 'seo', title: '🔵 SEO — Meta, OG', options: { collapsible: true, collapsed: true } },
  ],

  fields: [
    defineField({ name: 'title', title: 'Page Title (interno)', type: 'string', initialValue: 'Sicily Wedding Guide — Landing', validation: (Rule) => Rule.required() }),

    // ──── HERO ────
    defineField({
      name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true }, fieldset: 'hero',
      fields: [ defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (Rule) => Rule.required() }) ],
    }),
    defineField({ name: 'heroHeading', title: 'H1 Heading', type: 'string', fieldset: 'hero', initialValue: 'Planning a Wedding in Sicily? Start Here.' }),
    defineField({ name: 'heroSubtitle', title: 'Subheadline', type: 'text', rows: 3, fieldset: 'hero', initialValue: 'The free guide international couples use to choose their venue, their season, and their light — written by a Sicilian-born wedding photographer published in Vogue Italia.' }),
    defineField({ name: 'heroCtaLabel', title: 'CTA button', type: 'string', fieldset: 'hero', initialValue: 'Send Me the Guide', description: 'Ancora verso il form, non invia. Sostituisce "Get the Free Guide" del copypack: imperativo transazionale vietato da brand-voice §7.' }),
    defineField({ name: 'heroCtaMicrocopy', title: 'Microcopy sotto il button', type: 'string', fieldset: 'hero', initialValue: 'Instant download · No spam, just Sicily.' }),
    defineField({ name: 'heroTextDark', title: 'Hero Text Dark', type: 'boolean', fieldset: 'hero', initialValue: false }),

    // ──── PRESS STRIP ────
    defineField({ name: 'pressLabel', title: 'Etichetta', type: 'string', fieldset: 'press', initialValue: 'AS FEATURED IN' }),
    defineField({
      name: 'pressOutlets', title: 'Testate', type: 'array', of: [{ type: 'string' }], fieldset: 'press',
      initialValue: ['VOGUE ITALIA', 'MARIE CLAIRE', "L'OFFICIEL"],
    }),

    // ──── WHAT'S INSIDE ────
    defineField({ name: 'insideHeading', title: 'Section title', type: 'string', fieldset: 'inside', initialValue: "What's inside the guide" }),
    defineField({
      name: 'insideBullets', title: 'I 3 bullet', type: 'array', fieldset: 'inside',
      of: [{
        type: 'object', name: 'insideBullet',
        fields: [
          defineField({ name: 'label', title: 'Etichetta', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'text', title: 'Testo', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
        ],
        preview: { select: { title: 'label', subtitle: 'text' } },
      }],
      validation: (Rule) => Rule.max(3),
      initialValue: [
        { _type: 'insideBullet', label: 'The Venues', text: 'Twelve hand-picked venues across the island — including five I know so well I can tell you where the light falls at 6 PM.' },
        { _type: 'insideBullet', label: 'The Seasons', text: 'The four seasons of a Sicilian wedding, honestly told: when to come for the golden light, when for the empty piazzas, and what most couples get wrong about summer.' },
        { _type: 'insideBullet', label: 'The Approach', text: 'What luxury editorial coverage really means — and why the best portraits of your life will take twenty unhurried minutes, not two staged hours.' },
      ],
    }),

    // ──── MINI PORTFOLIO ────
    defineField({
      name: 'portfolioImages', title: 'Griglia 3×2 (6 foto)', type: 'array', fieldset: 'portfolio',
      description: 'Alt text uno per foto, tutti diversi fra loro. Formato di riferimento: "Luxury wedding photography [venue], Sicily — Alex Cinisi". Non copiare lo stesso alt su più immagini.',
      of: [{
        type: 'image', options: { hotspot: true },
        fields: [ defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (Rule) => Rule.required() }) ],
      }],
      validation: (Rule) => Rule.max(6),
    }),

    // ──── FORM ────
    defineField({ name: 'formHeading', title: 'Form title', type: 'string', fieldset: 'form', initialValue: 'Where should I send it?' }),
    defineField({ name: 'formCtaLabel', title: 'Submit button', type: 'string', fieldset: 'form', initialValue: 'Send Me the Guide' }),
    defineField({
      name: 'formGdprMicrocopy', title: 'Microcopy sotto il form', type: 'text', rows: 3, fieldset: 'form',
      description: 'NON è la checkbox di consenso. Quella è cablata nel componente con la formulazione di ContactForm.tsx e non è editabile qui: deve combaciare con la privacy policy.',
      initialValue: "I'll send you the guide plus a short series of notes on planning a wedding in Sicily. Unsubscribe anytime — no hard feelings. Privacy Policy.",
    }),

    // ──── ABOUT ────
    defineField({ name: 'aboutLabel', title: 'Etichetta', type: 'string', fieldset: 'about', initialValue: 'A note from Alex' }),
    defineField({ name: 'aboutBody', title: 'Testo (100 parole)', type: 'text', rows: 8, fieldset: 'about', initialValue: "I was born in Sicily, and I've spent my life learning how the light moves here. For years I've photographed weddings across the island — and in 15+ countries — for couples who want their day documented, not directed. My work sits somewhere between reportage and editorial: quiet, intuitive, human. It has been featured in Vogue Italia, Marie Claire and L'Officiel, but the recognition I care about most comes from couples who tell me they barely noticed the camera. That's the point." }),
    defineField({
      name: 'aboutPortrait', title: 'Ritratto B&W', type: 'image', options: { hotspot: true }, fieldset: 'about',
      fields: [ defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (Rule) => Rule.required() }) ],
    }),

    // ──── FINAL CTA ────
    defineField({ name: 'finalHeading', title: 'Headline', type: 'string', fieldset: 'finalCta', initialValue: 'Ready when you are' }),
    defineField({ name: 'finalBody', title: 'Copy', type: 'text', rows: 3, fieldset: 'finalCta', initialValue: 'Download the guide and take your time with it. Or, if Sicily is already decided, skip ahead —' }),
    defineField({ name: 'finalCtaLabel', title: 'Button primario', type: 'string', fieldset: 'finalCta', initialValue: 'Send Me the Guide', description: 'Ancora verso il form. Sostituisce "Get the Free Guide" del copypack.' }),
    defineField({ name: 'finalSecondaryLabel', title: 'Link secondario', type: 'string', fieldset: 'finalCta', initialValue: 'Check your date instead →', description: 'La destinazione è /call, cablata nel componente: è una route, non un contenuto.' }),

    // ──── THANK-YOU ────
    defineField({ name: 'tyHeading', title: 'H1', type: 'string', fieldset: 'thankYou', initialValue: "It's on its way ✦" }),
    defineField({ name: 'tyBody', title: 'Copy', type: 'text', rows: 4, fieldset: 'thankYou', initialValue: "Your Sicily Wedding Guide is heading to your inbox right now. If it doesn't appear within a few minutes, check your spam folder — and drag it to your inbox so we don't lose each other." }),
    defineField({ name: 'tyVideo', title: 'Video (opzionale)', type: 'file', fieldset: 'thankYou', description: 'Se vuoto la pagina non mostra nulla al suo posto. Previsto per un video muto con sottotitoli, non ancora girato.' }),
    defineField({ name: 'tySoftCtaLabel', title: 'Soft CTA', type: 'string', fieldset: 'thankYou', initialValue: "Can't wait? Check your date now →", description: 'Destinazione /call, cablata nel componente.' }),

    // ──── SEO ────
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string', fieldset: 'seo', validation: (Rule) => Rule.max(70), initialValue: 'The Sicily Wedding Guide — Free Download | Alex Cinisi' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2, fieldset: 'seo', validation: (Rule) => Rule.max(160), initialValue: 'Planning a wedding in Sicily? Get the free guide by a Sicilian-born photographer published in Vogue Italia — 12 venues, 4 seasons, one honest look.' }),
    defineField({ name: 'ogImage', title: 'OG Image (1200×630)', type: 'image', fieldset: 'seo', description: 'Cover della guida: pag. 1 del PDF esportata come JPG 1200×630, crop centrale.' }),
  ],

  preview: {
    select: { title: 'title', media: 'heroImage' },
    prepare: ({ title, media }) => ({ title: title || 'Sicily Wedding Guide — Landing', subtitle: 'Guide Landing Page', media }),
  },
})
