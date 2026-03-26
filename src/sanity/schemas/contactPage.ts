import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',

  fieldsets: [
    {
      name: 'hero',
      title: '🟢 Hero',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'testimonial',
      title: '🟡 Testimonial (sidebar)',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'seo',
      title: '🔵 SEO',
      options: { collapsible: true, collapsed: true },
    },
  ],

  fields: [
    // ── HERO ──
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'hero',
      description: 'Immagine hero per la contact page. Consigliato: landscape o 16:9, wedding emotivo.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required().warning('Alt text mancante — penalizza SEO.'),
        }),
      ],
    }),
    defineField({
      name: 'heroTextDark',
      title: 'Hero Text Dark Mode',
      type: 'boolean',
      fieldset: 'hero',
      description: "Attiva se l'immagine hero è chiara/luminosa. Il testo diventerà scuro.",
      initialValue: false,
    }),
    defineField({
      name: 'title',
      title: 'Titolo Pagina',
      type: 'string',
      fieldset: 'hero',
      description: 'Default: "Let\'s Start The Conversation."',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'text',
      rows: 2,
      fieldset: 'hero',
      description: 'Default: "Every love story begins with a hello..."',
    }),

    // ── TESTIMONIAL SIDEBAR ──
    defineField({
      name: 'sidebarTestimonial',
      title: 'Testimonial (mostrata nel sidebar)',
      type: 'object',
      fieldset: 'testimonial',
      fields: [
        defineField({ name: 'quote', title: 'Citazione', type: 'text', rows: 3 }),
        defineField({ name: 'author', title: 'Nome Coppia', type: 'string' }),
        defineField({ name: 'location', title: 'Location', type: 'string' }),
        defineField({ name: 'country', title: 'Country', type: 'string' }),
      ],
    }),

    // ── SEO ──
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      fieldset: 'seo',
      description: 'Default: "Contact — Begin Your Wedding Story | Alex Cinisi Photography"',
      validation: (Rule) => Rule.max(70).warning('Idealmente sotto i 60 caratteri.'),
    }),
    defineField({
      name: 'sidebarImage',
      title: 'Sidebar Image',
      type: 'image',
      options: { hotspot: true },
      fieldset: 'hero',
      description:
        'Immagine editoriale mostrata nel sidebar, tra le info contatto e la testimonial. Crea equilibrio visivo. Verticale 3:4.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required().warning('Alt text mancante.'),
        }),
      ],
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      fieldset: 'seo',
      validation: (Rule) => Rule.max(160).warning('Idealmente sotto i 155 caratteri.'),
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Contact Page', subtitle: 'Pagina contatto — hero, info, testimonial' };
    },
  },
});
