import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'proposalPage',
  title: 'Service — Proposal Photography',
  type: 'document',

  fieldsets: [
    { name: 'hero', title: '🟢 Hero — Immagine + H1', options: { collapsible: true, collapsed: false } },
    { name: 'intro', title: '🟡 Intro — Presentazione servizio', options: { collapsible: true, collapsed: true } },
    { name: 'gallery', title: '🟢 Gallery — Portfolio proposal', options: { collapsible: true, collapsed: true } },
    { name: 'approach', title: '🟡 Approach — 3 pillar', options: { collapsible: true, collapsed: true } },
    { name: 'locations', title: '🟡 Locations — Dove proporsi', options: { collapsible: true, collapsed: true } },
    { name: 'process', title: '🟡 Process — Come funziona', options: { collapsible: true, collapsed: true } },
    { name: 'investment', title: '🟡 Investment — Pricing', options: { collapsible: true, collapsed: true } },
    { name: 'testimonials', title: '🟡 Testimonials', options: { collapsible: true, collapsed: true } },
    { name: 'faq', title: '🟡 FAQ (Schema FAQPage)', options: { collapsible: true, collapsed: true } },
    { name: 'content', title: '🟡 SEO Content — Testo lungo (min 800 parole)', options: { collapsible: true, collapsed: true } },
    { name: 'relatedStories', title: '🟢 Related Stories', options: { collapsible: true, collapsed: true } },
    { name: 'seo', title: '🔵 SEO — Meta, OG', options: { collapsible: true, collapsed: true } },
  ],

  fields: [
    // ──── CORE ────
    defineField({
      name: 'title',
      title: 'Page Title (interno)',
      type: 'string',
      initialValue: 'Proposal Photography Sicily',
      validation: (Rule) => Rule.required(),
    }),

    // ──── HERO ────
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'hero',
      description: 'Landscape, min 1920px. La migliore foto proposal (es. Kevin & Safia, Valley of the Temples).',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: '⚠️ SEO 100-130 char. Es: "Surprise marriage proposal at the Valley of the Temples, Agrigento, Sicily, captured at golden hour"',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({ name: 'heroEyebrow', title: 'Eyebrow', type: 'string', fieldset: 'hero', description: 'Es: "Proposal Photography · Sicily"' }),
    defineField({
      name: 'heroHeading',
      title: 'H1 Heading',
      type: 'string',
      fieldset: 'hero',
      description: 'Es: "Proposal Photography in Sicily". Usa | per andare a capo.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'heroSubtitle', title: 'Subtitle', type: 'text', rows: 2, fieldset: 'hero' }),
    defineField({
      name: 'heroTextDark',
      title: 'Hero Text Dark',
      type: 'boolean',
      fieldset: 'hero',
      initialValue: false,
      description: 'Attiva se la hero image è chiara e serve testo scuro per leggibilità.',
    }),

    // ──── INTRO ────
    defineField({ name: 'introHeading', title: 'Heading sezione intro', type: 'string', fieldset: 'intro' }),
    defineField({
      name: 'introBody',
      title: 'Testo introduttivo',
      type: 'array',
      of: [{ type: 'block' }],
      fieldset: 'intro',
      description: '2-3 paragrafi. Tono editoriale, bride-first, specifico. VIETATE: beautiful, stunning, gorgeous, lovely, perfect, breathtaking, amazing.',
    }),

    // ──── GALLERY ────
    defineField({
      name: 'galleryImages',
      title: 'Portfolio Gallery',
      type: 'array',
      fieldset: 'gallery',
      description: 'Le migliori 6-12 foto proposal/couple. Mix verticali e orizzontali. NESSUN aspect ratio forzato: dimensioni reali Sanity.',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'caption', title: 'Caption', type: 'string', description: 'Es: "Kevin & Safia · Valley of the Temples, Agrigento"' }),
        ],
      }],
      validation: (Rule) => Rule.min(6).max(12),
      options: { layout: 'grid' },
    }),

    // ──── APPROACH ────
    defineField({ name: 'approachHeading', title: 'Heading', type: 'string', fieldset: 'approach' }),
    defineField({
      name: 'approachPillars',
      title: 'I 3 Pillar',
      type: 'array',
      fieldset: 'approach',
      of: [{
        type: 'object',
        name: 'pillar',
        fields: [
          defineField({ name: 'title', title: 'Titolo', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'description', title: 'Descrizione', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
        ],
        preview: { select: { title: 'title' } },
      }],
      validation: (Rule) => Rule.max(3),
    }),

    // ──── LOCATIONS ────
    defineField({ name: 'locationsHeading', title: 'Heading', type: 'string', fieldset: 'locations', description: 'Es: "Where Will You Ask the Question?"' }),
    defineField({ name: 'locationsIntro', title: 'Intro testo', type: 'text', rows: 3, fieldset: 'locations' }),
    defineField({
      name: 'locationCards',
      title: 'Location consigliate',
      type: 'array',
      fieldset: 'locations',
      of: [{
        type: 'object',
        name: 'serviceLocationCard',
        fields: [
          defineField({
            name: 'image',
            title: 'Foto location',
            type: 'image',
            options: { hotspot: true },
            fields: [ defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (Rule) => Rule.required() }) ],
          }),
          defineField({ name: 'name', title: 'Nome location', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'city', title: 'Città', type: 'string' }),
          defineField({ name: 'description', title: 'Descrizione (2 righe)', type: 'text', rows: 2 }),
          defineField({ name: 'locationPageRef', title: 'Link a location page (se esiste)', type: 'reference', to: [{ type: 'locationPage' }] }),
        ],
        preview: { select: { title: 'name', subtitle: 'city', media: 'image' } },
      }],
      validation: (Rule) => Rule.max(6),
    }),

    // ──── PROCESS ────
    defineField({ name: 'processHeading', title: 'Heading', type: 'string', fieldset: 'process' }),
    defineField({
      name: 'processSteps',
      title: 'Step del processo',
      type: 'array',
      fieldset: 'process',
      of: [{
        type: 'object',
        name: 'processStep',
        fields: [
          defineField({ name: 'step', title: 'Numero', type: 'string' }),
          defineField({ name: 'title', title: 'Titolo', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'description', title: 'Descrizione', type: 'text', rows: 2, validation: (Rule) => Rule.required() }),
        ],
        preview: { select: { title: 'title', subtitle: 'step' } },
      }],
      validation: (Rule) => Rule.max(5),
    }),

    // ──── INVESTMENT ────
    defineField({ name: 'investmentHeading', title: 'Heading', type: 'string', fieldset: 'investment' }),
    defineField({
      name: 'investmentPackages',
      title: 'Pacchetti / Prezzi',
      type: 'array',
      fieldset: 'investment',
      of: [{
        type: 'object',
        name: 'package',
        fields: [
          defineField({ name: 'name', title: 'Nome pacchetto', type: 'string' }),
          defineField({ name: 'price', title: 'Prezzo', type: 'string', description: 'Es: "From €350"' }),
          defineField({ name: 'includes', title: 'Inclusi', type: 'array', of: [{ type: 'string' }] }),
        ],
        preview: { select: { title: 'name', subtitle: 'price' } },
      }],
    }),

    // ──── TESTIMONIALS ──── (reference al content type esistente)
    defineField({
      name: 'testimonials',
      title: 'Testimonial',
      type: 'array',
      fieldset: 'testimonials',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      description: 'Seleziona 2-3 testimonial pertinenti dal content type Testimonial.',
    }),

    // ──── FAQ ────
    defineField({
      name: 'faqs',
      title: 'FAQ (genera FAQPage schema)',
      type: 'array',
      fieldset: 'faq',
      description: 'Minimo 5. Diventano FAQPage schema. Keyword primaria nella prima FAQ.',
      of: [{
        type: 'object',
        name: 'faqItem',
        fields: [
          defineField({ name: 'question', title: 'Domanda', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'answer', title: 'Risposta', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
        ],
        preview: { select: { title: 'question' } },
      }],
      validation: (Rule) => Rule.min(5),
    }),

    // ──── SEO CONTENT ────
    defineField({
      name: 'seoContent',
      title: 'Contenuto lungo SEO',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
      fieldset: 'content',
      description: 'Min 800 parole, target 1200+. H2/H3, immagini inline. Keyword primaria nel primo paragrafo e in 2-3 H2.',
    }),

    // ──── RELATED STORIES ────
    defineField({
      name: 'relatedJournalPosts',
      title: 'Journal posts correlati',
      type: 'array',
      fieldset: 'relatedStories',
      of: [{ type: 'reference', to: [{ type: 'journalPost' }] }],
      description: 'Seleziona 2-3 journal post (es. Kevin & Safia per la proposal).',
    }),

    // ──── SEO ────
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string', fieldset: 'seo', validation: (Rule) => Rule.max(70) }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2, fieldset: 'seo', validation: (Rule) => Rule.max(160) }),
    defineField({ name: 'ogImage', title: 'OG Image (1200×630)', type: 'image', fieldset: 'seo', description: 'Se vuota, usa hero image.' }),
  ],

  preview: {
    select: { title: 'title', media: 'heroImage' },
    prepare: ({ title, media }) => ({ title: title || 'Proposal Photography', subtitle: 'Service Page', media }),
  },
})
