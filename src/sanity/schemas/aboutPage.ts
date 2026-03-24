import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',

  fieldsets: [
    {
      name: 'hero',
      title: '🟢 Hero — Ritratto Alex',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'philosophy',
      title: '🟢 Filosofia — Immagine wedding emotiva',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'film',
      title: '🟢 Film Photography — Scatto analogico',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'credentials',
      title: '🟢 Credenziali — Immagine Sicilia',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'testimonials',
      title: '🟡 Testimonial',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'faq',
      title: '🟡 FAQ',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'seo',
      title: '🔵 SEO',
      options: { collapsible: true, collapsed: true },
    },
  ],

  fields: [
    // ──── HERO ────
    defineField({
      name: 'heroImage',
      title: 'Ritratto Alex',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'hero',
      description:
        'Ritratto editoriale. Formato verticale 3:4. Luce naturale, professionale ma approachable.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description:
            '⚠️ SEO: Descrivi la foto per Google e screen reader. Es: "Alex Cinisi, wedding photographer in Sicily"',
          validation: (Rule) =>
            Rule.required().warning('Alt text mancante — penalizza SEO immagini.'),
        }),
      ],
    }),

    // ──── PHILOSOPHY ────
    defineField({
      name: 'philosophyImage',
      title: 'Momento Wedding Emotivo',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'philosophy',
      description:
        'Un momento "quiet" — primo sguardo, padre commosso, dettaglio mani. Non la foto del bacio. Verticale 3:4 o 2:3.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description:
            '⚠️ SEO: Descrivi il momento. Es: "Father seeing his daughter in her wedding dress at Villa Igiea, Sicily"',
          validation: (Rule) =>
            Rule.required().warning('Alt text mancante — penalizza SEO immagini.'),
        }),
      ],
    }),

    // ──── FILM ────
    defineField({
      name: 'filmImage',
      title: 'Scatto su Pellicola (Portra 400)',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'film',
      description:
        'DEVE essere un vero scatto analogico dalla Canon AE-1 Program con Kodak Portra 400. Grana e tonalità calde riconoscibili.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description:
            '⚠️ SEO: Menziona "film" e "Kodak Portra 400". Es: "Wedding portrait shot on Kodak Portra 400 film in Sicily"',
          validation: (Rule) =>
            Rule.required().warning('Alt text mancante — penalizza SEO immagini.'),
        }),
      ],
    }),

    // ──── CREDENTIALS / SICILIA ────
    defineField({
      name: 'sicilyImage',
      title: 'Paesaggio Siciliano / Venue',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'credentials',
      description:
        'Golden hour, Palermo o venue iconica. Vende la Sicilia come destinazione. Verticale 3:4.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description:
            '⚠️ SEO: Includi location. Es: "Golden hour light at Tonnara di Scopello, Sicily"',
          validation: (Rule) =>
            Rule.required().warning('Alt text mancante — penalizza SEO immagini.'),
        }),
      ],
    }),

    // ──── TESTIMONIALS ────
    defineField({
      name: 'testimonials',
      title: 'Testimonial',
      type: 'array',
      fieldset: 'testimonials',
      description:
        'Seleziona 3 testimonial che rispondano a 3 paure: "sarà invadente?", "ci capiremo?", "varrà l\'investimento?"',
      of: [
        {
          type: 'object',
          name: 'aboutTestimonial',
          title: 'Testimonial',
          fields: [
            defineField({
              name: 'flag',
              title: 'Flag Emoji',
              type: 'string',
              description: 'Es: 🇮🇹 🇬🇧 🇺🇸',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'quote',
              title: 'Citazione',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'author',
              title: 'Nome Coppia',
              type: 'string',
            }),
            defineField({
              name: 'location',
              title: 'Location Matrimonio',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'author',
              subtitle: 'location',
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(5),
    }),

    // ──── FAQ ────
    defineField({
      name: 'faqItems',
      title: 'FAQ',
      type: 'array',
      fieldset: 'faq',
      description:
        'Domande frequenti per la pagina About. Generano anche schema FAQPage per Google.',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'Domanda',
          fields: [
            defineField({
              name: 'question',
              title: 'Domanda',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Risposta',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
      validation: (Rule) => Rule.max(6),
    }),

    // ──── SEO ────
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      fieldset: 'seo',
      description: 'Default: "About Alex Cinisi — Wedding Photographer in Sicily | Film & Digital"',
      validation: (Rule) => Rule.max(70).warning('Idealmente sotto i 60 caratteri.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      fieldset: 'seo',
      description:
        'Default: "Meet Alex Cinisi, a Sicilian wedding photographer blending editorial photography and analog film..."',
      validation: (Rule) => Rule.max(160).warning('Idealmente sotto i 155 caratteri.'),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'About Page',
        subtitle: 'Pagina About — immagini, testimonial, FAQ',
      };
    },
  },
});
