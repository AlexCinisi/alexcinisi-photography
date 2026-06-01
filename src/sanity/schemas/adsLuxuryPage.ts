import { defineType, defineField, defineArrayMember } from 'sanity'
import {
  ADS_INVESTMENT_WEDDING,
  ADS_PILLARS_WEDDING,
  ADS_TESTIMONIALS,
  ADS_TRUST_BAR_WEDDING
} from '../../lib/constants'

export default defineType({
  name: 'adsLuxuryPage',
  title: 'Ads — Luxury Wedding',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: '🟢 Hero Section', options: { collapsible: true, collapsed: false } },
    { name: 'trustBar', title: '🟡 Trust Bar', options: { collapsible: true, collapsed: true } },
    { name: 'selectedWork', title: '🟢 Selected Work', options: { collapsible: true, collapsed: true } },
    { name: 'experience', title: '🟡 The Experience', options: { collapsible: true, collapsed: true } },
    {
      name: 'gallery',
      title: '🟢 Gallery — Portfolio 6-9 immagini',
      options: { collapsible: true, collapsed: true },
    },
    { name: 'film', title: '🟢 Film Photography', options: { collapsible: true, collapsed: true } },
    { name: 'investment', title: '🟡 Investment', options: { collapsible: true, collapsed: true } },
    { name: 'testimonials', title: '🟡 Testimonials', options: { collapsible: true, collapsed: true } },
    { name: 'form', title: '🟡 Form', options: { collapsible: true, collapsed: true } },
    { name: 'closing', title: '🟡 Closing', options: { collapsible: true, collapsed: true } },
    { name: 'socialProof', title: '🟢 Social Proof', options: { collapsible: true, collapsed: true } },
    { name: 'seo', title: '🔵 SEO & Metadata', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // HERO
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      fieldset: 'hero',
      options: { hotspot: true },
      description: 'Immagine di sfondo full-screen.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: Rule => Rule.required().warning('Alt text mancante — penalizza SEO. Es: Sposi a Villa Valguarnera'),
          description: 'Testo alternativo per SEO e accessibilità.',
        }),
      ],
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Eyebrow',
      type: 'string',
      fieldset: 'hero',
      initialValue: 'Luxury Destination Wedding Photography · Sicily',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Title (H1)',
      type: 'string',
      fieldset: 'hero',
      description: 'Usa il pipe | per forzare un a capo.',
      initialValue: "Your Sicily Wedding,|Told Like a Film|You'll Never Forget",
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Subtitle',
      type: 'text',
      fieldset: 'hero',
      rows: 2,
      initialValue: 'An editorial and timeless approach for refined couples planning an extraordinary destination wedding.',
    }),
    defineField({
      name: 'heroCtaText',
      title: 'CTA Text',
      type: 'string',
      fieldset: 'hero',
      initialValue: 'Request Your Bespoke Proposal',
    }),
    defineField({
      name: 'heroMicroText',
      title: 'Micro Text',
      type: 'string',
      fieldset: 'hero',
      initialValue: 'I accept only 15 destination weddings per year.',
    }),

    // TRUST BAR
    defineField({
      name: 'trustBarItems',
      title: 'Trust Bar Items',
      type: 'array',
      fieldset: 'trustBar',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Number / Main Text', type: 'string', description: 'Es: 30+, 5★, o IT · EN' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'sublabel', title: 'Sublabel', type: 'string', description: 'Opzionale (es. Artistry)' }),
          ]
        })
      ],
      initialValue: ADS_TRUST_BAR_WEDDING as any,
    }),

    // SELECTED WORK
    defineField({
      name: 'selectedWork',
      title: 'Selected Work (3 images)',
      type: 'array',
      fieldset: 'selectedWork',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          defineField({
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
            validation: Rule => Rule.required().warning('Alt text mancante — penalizza SEO. Es: Sposi a Taormina'),
            description: 'Testo alternativo per SEO e accessibilità.',
          }),
          defineField({ name: 'caption', title: 'Caption', type: 'string', description: 'Es: "Marina & James · Villa Valguarnera"' }),
        ],
      }],
      validation: Rule => Rule.max(3),
      options: { layout: 'grid' },
    }),

    // EXPERIENCE
    defineField({
      name: 'experienceTitle',
      title: 'Section Title',
      type: 'string',
      fieldset: 'experience',
      initialValue: 'A Calm, Refined & Intentional Approach',
    }),
    defineField({
      name: 'experienceSubtitle',
      title: 'Section Subtitle',
      type: 'text',
      fieldset: 'experience',
      rows: 2,
      initialValue: 'I believe the most meaningful images are created when couples feel comfortable, present and truly themselves.',
    }),
    defineField({
      name: 'experiencePillars',
      title: 'Pillars',
      type: 'array',
      fieldset: 'experience',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          ]
        })
      ],
      validation: Rule => Rule.max(3),
      initialValue: ADS_PILLARS_WEDDING,
    }),

    defineField({
      name: 'galleryTitle',
      title: 'Titolo sezione Gallery',
      type: 'string',
      fieldset: 'gallery',
      initialValue: 'Moments That Speak for Themselves',
      description: 'Usa _ per corsivo Bodoni. Es: "Moments That _Speak_ for Themselves"',
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery — 6-9 foto',
      type: 'array',
      fieldset: 'gallery',
      description: 'Formato consigliato: 3:4 portrait (1200×1600px). Usa hotspot per il focal point. Ordine = ordine visualizzazione. TUTTE le foto appaiono anche su mobile.',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          defineField({
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
            description: '⚠️ SEO: Descrivi scena, coppia, venue. 120-150 char.',
            validation: (Rule) => Rule.required().warning('Alt text mancante — penalizza SEO.'),
          }),
        ],
      }],
      validation: (Rule) => Rule.min(6).max(12),
      options: { layout: 'grid' },
    }),

    // FILM PHOTOGRAPHY
    defineField({
      name: 'filmImages',
      title: 'Film Photography (3 images)',
      type: 'array',
      fieldset: 'film',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          defineField({
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
            validation: Rule => Rule.required().warning('Alt text mancante — penalizza SEO. Es: Dettaglio film fotografia'),
            description: 'Testo alternativo per SEO e accessibilità.',
          }),
        ],
      }],
      validation: Rule => Rule.max(3),
      options: { layout: 'grid' },
    }),

    // INVESTMENT
    defineField({
      name: 'investmentStartingPrice',
      title: 'Starting Price',
      type: 'string',
      fieldset: 'investment',
      initialValue: ADS_INVESTMENT_WEDDING.startingPrice,
    }),
    defineField({
      name: 'investmentRange',
      title: 'Price Range Text',
      type: 'string',
      fieldset: 'investment',
      initialValue: ADS_INVESTMENT_WEDDING.range,
    }),
    defineField({
      name: 'investmentIncludes',
      title: 'What is Included',
      type: 'array',
      fieldset: 'investment',
      of: [{ type: 'string' }],
      initialValue: ADS_INVESTMENT_WEDDING.includes,
    }),

    // TESTIMONIALS
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      fieldset: 'testimonials',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3 }),
            defineField({ name: 'author', title: 'Author', type: 'string' }),
            defineField({ name: 'flag', title: 'Flag Emoji', type: 'string' }),
            defineField({ name: 'location', title: 'Location', type: 'string' }),
          ]
        })
      ],
      validation: Rule => Rule.max(3),
      initialValue: ADS_TESTIMONIALS,
    }),

    // FORM
    defineField({
      name: 'formHeading',
      title: 'Form Heading',
      type: 'string',
      fieldset: 'form',
      initialValue: 'Begin Your Story',
    }),
    defineField({
      name: 'formDescription',
      title: 'Form Description',
      type: 'text',
      fieldset: 'form',
      rows: 2,
      initialValue: 'I accept a limited number of destination weddings each year to ensure every couple receives my full creative focus.',
    }),
    defineField({
      name: 'formUrgency',
      title: 'Urgency Text',
      type: 'string',
      fieldset: 'form',
      initialValue: 'Only 4 dates remaining for Autumn 2026.',
    }),

    // CLOSING
    defineField({
      name: 'closingQuote',
      title: 'Closing Quote',
      type: 'string',
      fieldset: 'closing',
      initialValue: "Every 'Yes' Deserves To Be Remembered.",
    }),

    // SOCIAL PROOF
    defineField({
      name: 'socialProofBadges',
      title: 'Social Proof Badges',
      type: 'array',
      fieldset: 'socialProof',
      description: 'Aggiunti tra la Trust Bar e i Selected Work',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', description: 'Es: Featured in Vogue' }),
            defineField({ name: 'image', title: 'Logo Image', type: 'image' }),
          ]
        })
      ],
    }),

    // SEO
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      fieldset: 'seo',
      validation: Rule => Rule.max(70).warning('Il titolo dovrebbe essere lungo al massimo 70 caratteri.'),
      initialValue: 'Luxury Destination Wedding Photography Sicily | Alex Cinisi',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      fieldset: 'seo',
      rows: 3,
      validation: Rule => Rule.max(160).warning('La descrizione dovrebbe essere lunga al massimo 160 caratteri.'),
      initialValue: 'Editorial wedding photography for refined couples. Film & digital. Only 15 weddings per year. Based in Sicily, available worldwide.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      fieldset: 'seo',
      description: 'Immagine condivisa sui social (1200x630px raccomandato)',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Ads — Luxury Wedding Landing',
        subtitle: 'Landing Google/Meta Ads — Matrimoni luxury',
      }
    },
  },
})
