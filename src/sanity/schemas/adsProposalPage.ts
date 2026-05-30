import { defineType, defineField, defineArrayMember } from 'sanity'
import {
  ADS_INVESTMENT_PROPOSAL,
  ADS_PILLARS_PROPOSAL,
  ADS_LOCATIONS_PROPOSAL,
  ADS_HOW_IT_WORKS,
  ADS_TESTIMONIALS,
  ADS_TRUST_BAR_PROPOSAL
} from '../../lib/constants'

export default defineType({
  name: 'adsProposalPage',
  title: 'Ads — Proposal / Elopement',
  type: 'document',
  fieldsets: [
    { name: 'hero', title: '🟢 Hero Section', options: { collapsible: true, collapsed: false } },
    { name: 'trustBar', title: '🟡 Trust Bar', options: { collapsible: true, collapsed: true } },
    { name: 'sicilyLocations', title: '🟢 Sicily Locations', options: { collapsible: true, collapsed: true } },
    { name: 'experience', title: '🟡 The Experience', options: { collapsible: true, collapsed: true } },
    { name: 'howItWorks', title: '🟡 How It Works', options: { collapsible: true, collapsed: true } },
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
          validation: Rule => Rule.required().warning('Alt text mancante — penalizza SEO.'),
          description: 'Testo alternativo per SEO e accessibilità.',
        }),
      ],
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Eyebrow',
      type: 'string',
      fieldset: 'hero',
      initialValue: 'Proposal & Elopement Photography · Sicily',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Title (H1)',
      type: 'string',
      fieldset: 'hero',
      description: 'Usa il pipe | per forzare un a capo.',
      initialValue: "The Most Important Question|Deserves the Most|Beautiful Setting",
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Subtitle',
      type: 'text',
      fieldset: 'hero',
      rows: 2,
      initialValue: "Intimate, cinematic proposal and elopement photography across Sicily's most iconic locations.",
    }),
    defineField({
      name: 'heroCtaText',
      title: 'CTA Text',
      type: 'string',
      fieldset: 'hero',
      initialValue: 'Plan Your Proposal',
    }),
    defineField({
      name: 'heroMicroText',
      title: 'Micro Text',
      type: 'string',
      fieldset: 'hero',
      initialValue: 'Every session is tailored to your story.',
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
            defineField({ name: 'number', title: 'Number / Main Text', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'sublabel', title: 'Sublabel', type: 'string' }),
          ]
        })
      ],
      initialValue: ADS_TRUST_BAR_PROPOSAL as any,
    }),

    // SICILY LOCATIONS
    defineField({
      name: 'locationCards',
      title: 'Sicily Locations (3 cards)',
      type: 'array',
      fieldset: 'sicilyLocations',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
              defineField({
                name: 'alt',
                title: 'Alt Text',
                type: 'string',
                validation: Rule => Rule.required().warning('Alt text mancante — penalizza SEO. Es: Proposal a Taormina'),
              }),
            ]
          }),
          defineField({ name: 'name', title: 'Name', type: 'string' }),
          defineField({ name: 'city', title: 'City', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'string' }),
        ],
      }],
      validation: Rule => Rule.max(3),
    }),

    // EXPERIENCE
    defineField({
      name: 'experienceTitle',
      title: 'Section Title',
      type: 'string',
      fieldset: 'experience',
      initialValue: 'An Intimate, Natural Approach',
    }),
    defineField({
      name: 'experienceSubtitle',
      title: 'Section Subtitle',
      type: 'text',
      fieldset: 'experience',
      rows: 2,
      initialValue: 'No scripts, no awkward posing. Just real emotion, captured with cinematic sensitivity.',
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
      initialValue: ADS_PILLARS_PROPOSAL,
    }),

    // HOW IT WORKS
    defineField({
      name: 'howItWorks',
      title: 'How It Works',
      type: 'array',
      fieldset: 'howItWorks',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'step', title: 'Step Number', type: 'string', description: 'Es: 01' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ]
        })
      ],
      validation: Rule => Rule.max(3),
      initialValue: ADS_HOW_IT_WORKS,
    }),

    // INVESTMENT
    defineField({
      name: 'proposalPrice',
      title: 'Proposal Price',
      type: 'string',
      fieldset: 'investment',
      initialValue: ADS_INVESTMENT_PROPOSAL.proposalPrice,
    }),
    defineField({
      name: 'elopementPrice',
      title: 'Elopement Price',
      type: 'string',
      fieldset: 'investment',
      initialValue: ADS_INVESTMENT_PROPOSAL.elopementPrice,
    }),
    defineField({
      name: 'investmentIncludes',
      title: 'What is Included',
      type: 'array',
      fieldset: 'investment',
      of: [{ type: 'string' }],
      initialValue: ADS_INVESTMENT_PROPOSAL.includes,
    }),
    defineField({
      name: 'investmentOptionals',
      title: 'Optionals',
      type: 'array',
      fieldset: 'investment',
      of: [{ type: 'string' }],
      initialValue: ADS_INVESTMENT_PROPOSAL.optionals,
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
      initialValue: 'Plan Your Perfect Moment',
    }),
    defineField({
      name: 'formDescription',
      title: 'Form Description',
      type: 'text',
      fieldset: 'form',
      rows: 2,
      initialValue: "Every proposal and elopement I photograph is unique. Share your vision and I'll help you create an unforgettable experience.",
    }),
    defineField({
      name: 'formUrgency',
      title: 'Urgency Text',
      type: 'string',
      fieldset: 'form',
      initialValue: 'Summer & Autumn 2026 — limited dates available.',
    }),

    // CLOSING
    defineField({
      name: 'closingQuote',
      title: 'Closing Quote',
      type: 'string',
      fieldset: 'closing',
      initialValue: "She Said Yes — And You'll Have the Photographs to Prove It.",
    }),

    // SOCIAL PROOF
    defineField({
      name: 'socialProofBadges',
      title: 'Social Proof Badges',
      type: 'array',
      fieldset: 'socialProof',
      description: 'Aggiunti tra la Trust Bar e le Locations',
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
      initialValue: 'Proposal & Elopement Photography Sicily | Alex Cinisi',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      fieldset: 'seo',
      rows: 3,
      validation: Rule => Rule.max(160).warning('La descrizione dovrebbe essere lunga al massimo 160 caratteri.'),
      initialValue: 'Intimate proposal and elopement photography in Sicily. Valley of the Temples, Scopello, Taormina. Film & digital. Every moment captured naturally.',
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
        title: 'Ads — Proposal Landing',
        subtitle: 'Landing Google/Meta Ads — Proposal & Elopement',
      }
    },
  },
})
