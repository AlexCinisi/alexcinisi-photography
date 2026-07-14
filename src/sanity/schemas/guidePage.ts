import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'guidePage',
  title: 'Guide — Getting Married in Sicily',
  type: 'document',

  fieldsets: [
    { name: 'hero', title: '🟢 Hero — Immagine + H1', options: { collapsible: true, collapsed: false } },
    { name: 'intro', title: '🟡 Intro — Apertura', options: { collapsible: true, collapsed: true } },
    { name: 'decision', title: '🟡 First Decision — 2 path cards', options: { collapsible: true, collapsed: true } },
    { name: 'legal', title: '🟡 Legal — Paperwork by nationality', options: { collapsible: true, collapsed: true } },
    { name: 'light', title: '🟡 The Light — Capitolo firma', options: { collapsible: true, collapsed: true } },
    { name: 'regions', title: '🟡 Regions — Aree + link location pages', options: { collapsible: true, collapsed: true } },
    { name: 'timeline', title: '🟡 Timeline — Working backwards', options: { collapsible: true, collapsed: true } },
    { name: 'faq', title: '🟡 FAQ (Schema FAQPage)', options: { collapsible: true, collapsed: true } },
    { name: 'content', title: '🟡 SEO Content — Testo lungo opzionale', options: { collapsible: true, collapsed: true } },
    { name: 'relatedStories', title: '🟢 Related Stories', options: { collapsible: true, collapsed: true } },
    { name: 'seo', title: '🔵 SEO — Meta, OG', options: { collapsible: true, collapsed: true } },
  ],

  fields: [
    defineField({ name: 'title', title: 'Page Title (interno)', type: 'string', initialValue: 'Getting Married in Sicily', validation: (Rule) => Rule.required() }),

    // ──── HERO ────
    defineField({
      name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true }, fieldset: 'hero',
      fields: [ defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (Rule) => Rule.required() }) ],
    }),
    defineField({ name: 'heroEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'hero', description: 'Es: "A Photographer\'s Practical Guide"' }),
    defineField({ name: 'heroHeading', title: 'H1 Heading', type: 'string', fieldset: 'hero', description: 'Usa | per andare a capo. Es: "Getting Married in Sicily|The Practical Guide"' }),
    defineField({ name: 'heroSubtitle', title: 'Subtitle', type: 'text', rows: 2, fieldset: 'hero' }),
    defineField({ name: 'heroTextDark', title: 'Hero Text Dark', type: 'boolean', fieldset: 'hero', initialValue: false }),

    // ──── INTRO ────
    defineField({ name: 'lastReviewed', title: 'Last Reviewed (es: "June 2026")', type: 'string', fieldset: 'intro', description: 'Mostrato come eyebrow sopra l\'intro. Aggiornare a ogni revisione legale.' }),
    defineField({ name: 'introBody', title: 'Testo apertura', type: 'array', of: [{ type: 'block' }], fieldset: 'intro' }),

    // ──── FIRST DECISION ────
    defineField({ name: 'decisionHeading', title: 'Heading', type: 'string', fieldset: 'decision' }),
    defineField({ name: 'decisionIntro', title: 'Sottotitolo', type: 'string', fieldset: 'decision' }),
    defineField({
      name: 'decisionPaths', title: 'I 2 percorsi (A / B)', type: 'array', fieldset: 'decision',
      of: [{
        type: 'object', name: 'decisionPath',
        fields: [
          defineField({ name: 'label', title: 'Lettera (A/B)', type: 'string' }),
          defineField({ name: 'title', title: 'Titolo', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'description', title: 'Descrizione', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
        ],
        preview: { select: { title: 'title', subtitle: 'label' } },
      }],
      validation: (Rule) => Rule.max(2),
    }),

    // ──── LEGAL — paperwork by nationality (COMPONENTE NUOVO) ────
    defineField({ name: 'legalHeading', title: 'Heading', type: 'string', fieldset: 'legal' }),
    defineField({
      name: 'legalRows', title: 'Righe per nazionalità', type: 'array', fieldset: 'legal',
      of: [{
        type: 'object', name: 'legalRow',
        fields: [
          defineField({ name: 'nationality', title: 'Nazionalità (es: USA, UK, AUS)', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'requirements', title: 'Requisiti (testo)', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
        ],
        preview: { select: { title: 'nationality', subtitle: 'requirements' } },
      }],
    }),
    defineField({ name: 'legalDisclaimer', title: 'Disclaimer (sotto la griglia)', type: 'text', rows: 3, fieldset: 'legal', description: 'Es: "Requirements change — confirm with your Comune and consulate before booking."' }),

    // ──── THE LIGHT — capitolo firma ────
    defineField({ name: 'lightEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'light' }),
    defineField({ name: 'lightHeading', title: 'Heading', type: 'string', fieldset: 'light' }),
    defineField({
      name: 'lightImage', title: 'Foto (golden hour)', type: 'image', options: { hotspot: true }, fieldset: 'light',
      fields: [ defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (Rule) => Rule.required() }) ],
    }),
    defineField({ name: 'lightBody', title: 'Testo principale', type: 'text', rows: 5, fieldset: 'light' }),
    defineField({ name: 'lightPullquote', title: 'Pull-quote (bordo sinistro)', type: 'text', rows: 3, fieldset: 'light', description: 'La frase east coast vs west coast.' }),

    // ──── REGIONS — cards con link a location pages ────
    defineField({ name: 'regionsHeading', title: 'Heading', type: 'string', fieldset: 'regions' }),
    defineField({ name: 'regionsIntro', title: 'Intro', type: 'text', rows: 2, fieldset: 'regions' }),
    defineField({
      name: 'regionCards', title: 'Aree', type: 'array', fieldset: 'regions',
      of: [{
        type: 'object', name: 'regionCard',
        fields: [
          defineField({ name: 'name', title: 'Nome area (es: Palermo & the northwest)', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'description', title: 'Descrizione', type: 'text', rows: 3 }),
          defineField({ name: 'airport', title: 'Aeroporto (es: PMO · 45–75 min)', type: 'string' }),
          defineField({ name: 'locationPageRef', title: 'Link a location page (opzionale)', type: 'reference', to: [{ type: 'locationPage' }] }),
        ],
        preview: { select: { title: 'name', subtitle: 'airport' } },
      }],
    }),

    // ──── TIMELINE — working backwards (COMPONENTE NUOVO) ────
    defineField({ name: 'timelineHeading', title: 'Heading', type: 'string', fieldset: 'timeline' }),
    defineField({
      name: 'timelineSteps', title: 'Step timeline', type: 'array', fieldset: 'timeline',
      of: [{
        type: 'object', name: 'timelineStep',
        fields: [
          defineField({ name: 'when', title: 'Quando (es: "12–18 months")', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'what', title: 'Cosa fare', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
        ],
        preview: { select: { title: 'when', subtitle: 'what' } },
      }],
    }),

    // ──── FAQ ────
    defineField({
      name: 'faqs', title: 'FAQ (genera FAQPage schema)', type: 'array', fieldset: 'faq',
      description: 'Minimo 5. Diventano FAQPage schema.',
      of: [{
        type: 'object', name: 'faqItem',
        fields: [
          defineField({ name: 'question', title: 'Domanda', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'answer', title: 'Risposta', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
        ],
        preview: { select: { title: 'question' } },
      }],
      validation: (Rule) => Rule.min(5),
    }),

    // ──── SEO CONTENT (opzionale) ────
    defineField({
      name: 'seoContent', title: 'Contenuto lungo SEO (opzionale)', type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true }, fields: [
          defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
          defineField({ name: 'caption', title: 'Caption', type: 'string' }),
        ] },
      ],
      fieldset: 'content',
    }),

    // ──── RELATED STORIES ────
    defineField({
      name: 'relatedJournalPosts', title: 'Journal posts correlati', type: 'array', fieldset: 'relatedStories',
      of: [{ type: 'reference', to: [{ type: 'journalPost' }] }],
    }),

    // ──── SEO ────
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string', fieldset: 'seo', validation: (Rule) => Rule.max(70) }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2, fieldset: 'seo', validation: (Rule) => Rule.max(160) }),
    defineField({ name: 'ogImage', title: 'OG Image (1200×630)', type: 'image', fieldset: 'seo', description: 'Se vuota, usa hero image.' }),
  ],

  preview: {
    select: { title: 'title', media: 'heroImage' },
    prepare: ({ title, media }) => ({ title: title || 'Getting Married in Sicily', subtitle: 'Guide Page', media }),
  },
})
