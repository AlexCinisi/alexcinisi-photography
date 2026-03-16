import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',

  // ── Preview leggibile nel documento list ──
  preview: {
    select: {
      media: 'heroImage',
    },
    prepare() {
      return {
        title: 'Homepage',
        subtitle: 'Immagini e contenuti della homepage',
      };
    },
  },

  // ── Fieldsets: raggruppano i campi visivamente ──
  fieldsets: [
    {
      name: 'hero',
      title: '🖼️ Hero Section',
      description: "L'immagine principale in alto alla homepage. Primo impatto visivo.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'sections',
      title: '📸 Sezioni con Immagine',
      description: 'Immagini per le sezioni Manifesto, About e Film.',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'photoBreaks',
      title: '🌅 Photo Pause / Break (Immersive)',
      description: 'Le TRE fasce fotografiche full-width che separano le sezioni. Formato panoramico 21:9.',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'branding',
      title: '✦ Loghi e Branding',
      description: 'Logo principale, monogramma footer, e loghi "As Featured In".',
      options: { collapsible: true, collapsed: true },
    },
  ],

  fields: [
    // ═══════════════════════════════════════════
    // HERO SECTION
    // ═══════════════════════════════════════════
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      fieldset: 'hero',
      description: "L'immagine hero full-screen. Formato ideale: 3:4 portrait, min. 1600×2133px. Verrà croppata con object-fit: cover.",
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text (SEO)',
          type: 'string',
          description: 'Descrivi brevemente cosa si vede nella foto. Es: "Bride holding bouquet at Villa Valguarnera, Sicily"',
          validation: (Rule: any) => Rule.required().warning('Alt text è fondamentale per SEO e accessibilità'),
        },
        {
          name: 'caption',
          title: 'Didascalia (opzionale)',
          type: 'string',
          description: "Nome interno per riconoscere l'immagine. Non visibile sul sito. Es: \"Hero - Sposa Villa Valguarnera 2024\"",
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // SEZIONI CON IMMAGINE
    // ═══════════════════════════════════════════
    defineField({
      name: 'manifestoImage',
      title: 'Manifesto / Philosophy Image',
      type: 'image',
      fieldset: 'sections',
      description: 'Foto per la sezione "A Promise". Formato ideale: 3:4 portrait, min. 1200×1600px.',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text (SEO)',
          type: 'string',
          description: 'Es: "Intimate wedding moment captured by Alex Cinisi in Sicily"',
          validation: (Rule: any) => Rule.required().warning('Alt text è fondamentale per SEO'),
        },
        {
          name: 'caption',
          title: 'Didascalia (opzionale)',
          type: 'string',
          description: "Nome interno per riconoscere l'immagine. Non visibile sul sito.",
        },
      ],
    }),

    defineField({
      name: 'aboutImage',
      title: 'About Alex Image',
      type: 'image',
      fieldset: 'sections',
      description: 'Il tuo ritratto professionale. Formato ideale: 3:4 portrait, min. 1200×1600px.',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text (SEO)',
          type: 'string',
          description: 'Es: "Alex Cinisi, luxury wedding photographer based in Sicily"',
          validation: (Rule: any) => Rule.required().warning('Alt text è fondamentale per SEO'),
        },
        {
          name: 'caption',
          title: 'Didascalia (opzionale)',
          type: 'string',
          description: "Nome interno per riconoscere l'immagine. Non visibile sul sito.",
        },
      ],
    }),

    defineField({
      name: 'filmSectionImage',
      title: 'Film Section Image',
      type: 'image',
      fieldset: 'sections',
      description: 'Foto che rappresenta il tuo lavoro in pellicola. Formato ideale: 2:3 portrait (medium format), min. 1000×1500px.',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text (SEO)',
          type: 'string',
          description: 'Es: "Film photography wedding detail shot on Kodak Portra"',
          validation: (Rule: any) => Rule.required().warning('Alt text è fondamentale per SEO'),
        },
        {
          name: 'caption',
          title: 'Didascalia (opzionale)',
          type: 'string',
          description: "Nome interno per riconoscere l'immagine. Non visibile sul sito.",
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // PHOTO BREAKS (TRE fasce immersive full-width)
    // ═══════════════════════════════════════════
    defineField({
      name: 'photoBreakImage1',
      title: 'Photo Pause #1 — dopo Trust Bar, prima di Manifesto',
      type: 'image',
      fieldset: 'photoBreaks',
      description: 'Prima fascia immersiva full-width. Posizione: tra la barra dei loghi e la sezione filosofia. Formato ideale: 21:9 panoramico, min. 2400×1028px. Verrà croppata a 65vh di altezza. Classe CSS: .photo-pause',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text (SEO)',
          type: 'string',
          description: 'Es: "Panoramic view of a luxury wedding ceremony in Taormina, Sicily"',
          validation: (Rule: any) => Rule.required().warning('Alt text è fondamentale per SEO'),
        },
        {
          name: 'caption',
          title: 'Didascalia (opzionale)',
          type: 'string',
          description: "Nome interno per riconoscere l'immagine. Non visibile sul sito.",
        },
      ],
    }),

    defineField({
      name: 'photoBreakImage2',
      title: 'Photo Pause #2 — dopo Investment, prima di Process',
      type: 'image',
      fieldset: 'photoBreaks',
      description: 'Seconda fascia immersiva full-width. Posizione: tra la sezione prezzi e il processo. Formato ideale: 21:9 panoramico, min. 2400×1028px. Classe CSS: .photo-pause',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text (SEO)',
          type: 'string',
          description: 'Es: "Golden hour wedding reception at a Sicilian villa"',
          validation: (Rule: any) => Rule.required().warning('Alt text è fondamentale per SEO'),
        },
        {
          name: 'caption',
          title: 'Didascalia (opzionale)',
          type: 'string',
          description: "Nome interno per riconoscere l'immagine. Non visibile sul sito.",
        },
      ],
    }),

    defineField({
      name: 'photoBreakImage3',
      title: 'Photo Pause #3 — tra Venues e FAQ',
      type: 'image',
      fieldset: 'photoBreaks',
      description: 'Terza fascia immersiva full-width. Posizione: dopo la sezione venues, prima delle FAQ. Formato ideale: 21:9 panoramico, min. 2400×1028px. Classe CSS: .photo-pause',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text (SEO)',
          type: 'string',
          description: 'Es: "Wedding couple walking through olive groves in Sicily at sunset"',
          validation: (Rule: any) => Rule.required().warning('Alt text è fondamentale per SEO'),
        },
        {
          name: 'caption',
          title: 'Didascalia (opzionale)',
          type: 'string',
          description: "Nome interno per riconoscere l'immagine. Non visibile sul sito.",
        },
      ],
    }),

    // ═══════════════════════════════════════════
    // BRANDING
    // ═══════════════════════════════════════════
    defineField({
      name: 'siteLogo',
      title: 'Site Logo (Nav)',
      type: 'file',
      fieldset: 'branding',
      description: 'Logo SVG per la navigazione. Accetta SVG.',
      options: { accept: '.svg' },
    }),

    defineField({
      name: 'siteLogoFooter',
      title: 'Footer Logo (Monogram)',
      type: 'file',
      fieldset: 'branding',
      description: 'Monogramma SVG per il footer.',
      options: { accept: '.svg' },
    }),

    defineField({
      name: 'proofLogos',
      title: 'As Featured In — Logos',
      type: 'array',
      fieldset: 'branding',
      description: 'Loghi delle pubblicazioni (Vogue, Wezoree, ANFM, ecc.)',
      of: [
        {
          type: 'object',
          name: 'logoItem',
          fields: [
            { name: 'name', title: 'Nome pubblicazione', type: 'string' },
            {
              name: 'logo',
              title: 'Logo',
              type: 'file',
              options: { accept: '.svg,.png,.webp' },
            },
            { name: 'url', title: 'URL (opzionale)', type: 'url' },
          ],
          preview: {
            select: { title: 'name' },
          },
        },
      ],
    }),
  ],
});
