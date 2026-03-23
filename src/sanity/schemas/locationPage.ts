import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'locationPage',
  title: 'Location Page',
  type: 'document',
  fieldsets: [
    { name: 'info', title: 'Location Info', options: { collapsible: true, collapsed: false } },
    { name: 'hero', title: 'Hero Section', options: { collapsible: true, collapsed: false } },
    { name: 'trust', title: 'Trust Bar', options: { collapsible: true, collapsed: true } },
    { name: 'venue', title: 'Venue Description', options: { collapsible: true, collapsed: true } },
    { name: 'photoSpots', title: 'Best Photo Locations', options: { collapsible: true, collapsed: true } },
    { name: 'gallery', title: 'Gallery', options: { collapsible: true, collapsed: true } },
    { name: 'pillars', title: 'Why Choose Me', options: { collapsible: true, collapsed: true } },
    { name: 'callout', title: 'Venue Callout (Dark Section)', options: { collapsible: true, collapsed: true } },
    { name: 'investment', title: 'Investment', options: { collapsible: true, collapsed: true } },
    { name: 'faq', title: 'FAQ', options: { collapsible: true, collapsed: true } },
    { name: 'availability', title: 'Availability', options: { collapsible: true, collapsed: true } },
    { name: 'seo', title: 'SEO & Metadata', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // === LOCATION INFO ===
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      fieldset: 'info',
      description: 'e.g. "Villa Igiea Wedding Photographer"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      fieldset: 'info',
      options: { source: 'title', maxLength: 96 },
      description: 'e.g. "villa-igiea-wedding-photographer"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'venueName',
      title: 'Venue / Location Name',
      type: 'string',
      fieldset: 'info',
      description: 'e.g. "Villa Igiea"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      fieldset: 'info',
      description: 'e.g. "Palermo"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      fieldset: 'info',
      initialValue: 'Sicily',
    }),
    defineField({
      name: 'priority',
      title: 'Display Order',
      type: 'number',
      fieldset: 'info',
      description: 'Order on the /locations hub page. Lower number = higher position.',
    }),

    // === HERO ===
    defineField({ name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string', fieldset: 'hero', description: 'e.g. "Villa Igiea · Palermo, Sicily"' }),
    defineField({ name: 'heroLine1', title: 'Hero Line 1', type: 'string', fieldset: 'hero', description: 'e.g. "Your Villa Igiea"' }),
    defineField({ name: 'heroLine2Italic', title: 'Hero Line 2 (Italic)', type: 'string', fieldset: 'hero', description: 'e.g. "Wedding, Captured"' }),
    defineField({ name: 'heroLine3', title: 'Hero Line 3', type: 'string', fieldset: 'hero', description: 'e.g. "With Timeless Artistry"' }),
    defineField({ name: 'heroDescription', title: 'Hero Description', type: 'text', fieldset: 'hero', rows: 3 }),
    defineField({ name: 'heroCTAText', title: 'Hero CTA Text', type: 'string', fieldset: 'hero', initialValue: 'Tell Me About Your Wedding' }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      fieldset: 'hero',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text (SEO)', type: 'string', description: '⚠️ Required for SEO.' }),
      ],
    }),
    defineField({
      name: 'heroTextDark',
      title: 'Hero Text Dark Mode',
      description: 'Attiva se l\'immagine hero è chiara/luminosa. Il testo e il gradiente diventeranno scuri per garantire leggibilità.',
      type: 'boolean',
      initialValue: false,
      fieldset: 'hero',
    }),

    // === TRUST BAR ===
    defineField({
      name: 'trustBarItems',
      title: 'Trust Bar Items',
      type: 'array',
      fieldset: 'trust',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'number', title: 'Number/Text', type: 'string', description: 'e.g. "5★", "1900", "Film"' }),
          defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. "Rocco Forte Venue", "Art Nouveau Heritage"' }),
        ],
        preview: {
          select: { title: 'number', subtitle: 'label' },
        },
      }],
      validation: Rule => Rule.max(5),
    }),

    // === VENUE DESCRIPTION ===
    defineField({ name: 'venueIntroLabel', title: 'Venue Intro Label', type: 'string', fieldset: 'venue', initialValue: 'The Venue' }),
    defineField({ name: 'venueIntroTitle', title: 'Venue Intro Title', type: 'string', fieldset: 'venue', description: 'Use <em> for italic. e.g. "Where History Meets <em>Your Love Story</em>"' }),
    defineField({
      name: 'venueIntroText',
      title: 'Venue Intro Paragraphs',
      type: 'array',
      fieldset: 'venue',
      of: [{ type: 'block' }],
      description: 'Rich text describing the venue. SEO-critical — be specific about the location.',
    }),
    defineField({ name: 'venueGalleryLinkText', title: 'Gallery Link Text', type: 'string', fieldset: 'venue', description: 'e.g. "See Villa Igiea Weddings"' }),

    // === BEST PHOTO LOCATIONS ===
    defineField({ name: 'photoSpotsLabel', title: 'Section Label', type: 'string', fieldset: 'photoSpots', initialValue: 'Best Photo Locations' }),
    defineField({ name: 'photoSpotsTitle', title: 'Section Title', type: 'string', fieldset: 'photoSpots', description: 'Use <em> for italic.' }),
    defineField({
      name: 'photoLocations',
      title: 'Photo Spots',
      type: 'array',
      fieldset: 'photoSpots',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'icon', title: 'Icon Character', type: 'string', description: 'e.g. "✦", "◯", "◇", "▽"' }),
          defineField({ name: 'title', title: 'Spot Name', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        ],
        preview: {
          select: { title: 'title', subtitle: 'description' },
        },
      }],
      validation: Rule => Rule.max(4),
    }),

    // === GALLERY ===
    defineField({
      name: 'galleryIntroLabel',
      title: 'Gallery Label',
      type: 'string',
      fieldset: 'gallery',
      description: 'e.g. "Villa Igiea Gallery"',
    }),
    defineField({
      name: 'galleryIntroTitle',
      title: 'Gallery Title',
      type: 'string',
      fieldset: 'gallery',
      description: 'Use <em> for italic.',
    }),
    defineField({
      name: 'galleryIntroNote',
      title: 'Gallery Note',
      type: 'string',
      fieldset: 'gallery',
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      fieldset: 'gallery',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'title', title: 'Caption Title', type: 'string' }),
          defineField({ name: 'subtitle', title: 'Caption Subtitle', type: 'string' }),
          defineField({ name: 'badge', title: 'Badge', type: 'string' }),
        ],
        preview: {
          select: { title: 'title', subtitle: 'subtitle', media: 'image' },
        },
      }],
    }),
    defineField({ name: 'galleryCTAText', title: 'Gallery CTA Text', type: 'string', fieldset: 'gallery' }),
    defineField({ name: 'galleryCTALink', title: 'Gallery CTA Link', type: 'string', fieldset: 'gallery' }),

    // === WHY CHOOSE ME (PILLARS) ===
    defineField({ name: 'pillarsLabel', title: 'Section Label', type: 'string', fieldset: 'pillars', initialValue: 'Why Choose Me' }),
    defineField({ name: 'pillarsTitle', title: 'Section Title', type: 'string', fieldset: 'pillars', description: 'Use <em> for italic.' }),
    defineField({
      name: 'pillars',
      title: 'Pillars (3)',
      type: 'array',
      fieldset: 'pillars',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'number', title: 'Number', type: 'string', description: '"01", "02", "03"' }),
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
          defineField({ name: 'quote', title: 'Client Quote', type: 'string' }),
          defineField({ name: 'quoteAuthor', title: 'Quote Author', type: 'string' }),
        ],
        preview: {
          select: { title: 'title', subtitle: 'quoteAuthor' },
        },
      }],
      validation: Rule => Rule.max(3),
    }),

    // === VENUE CALLOUT (DARK SECTION) ===
    defineField({ name: 'calloutLabel', title: 'Callout Label', type: 'string', fieldset: 'callout' }),
    defineField({ name: 'calloutTitle', title: 'Callout Title', type: 'string', fieldset: 'callout', description: 'Use <em> for italic.' }),
    defineField({
      name: 'calloutText',
      title: 'Callout Text',
      type: 'array',
      fieldset: 'callout',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'calloutImage',
      title: 'Callout Image',
      type: 'image',
      fieldset: 'callout',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),

    // === INVESTMENT ===
    defineField({ name: 'investmentPrice', title: 'Starting Price', type: 'string', fieldset: 'investment', description: 'e.g. "€ 2,500"' }),
    defineField({ name: 'investmentRange', title: 'Price Range Text', type: 'string', fieldset: 'investment', description: 'e.g. "Most couples invest between €2,500 – €3,500"' }),
    defineField({
      name: 'investmentIncludes',
      title: 'What\'s Included',
      type: 'array',
      fieldset: 'investment',
      of: [{ type: 'string' }],
      description: 'Each item appears as a bullet point.',
    }),
    defineField({ name: 'investmentCTAText', title: 'CTA Text', type: 'string', fieldset: 'investment', description: 'e.g. "Request Your Villa Igiea Proposal"' }),

    // === FAQ ===
    defineField({ name: 'faqLabel', title: 'FAQ Section Label', type: 'string', fieldset: 'faq', description: 'e.g. "Questions About Villa Igiea"' }),
    defineField({
      name: 'faqs',
      title: 'FAQ Items',
      type: 'array',
      fieldset: 'faq',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string' }),
          defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4 }),
        ],
        preview: {
          select: { title: 'question' },
        },
      }],
    }),

    // === AVAILABILITY ===
    defineField({
      name: 'availabilityItems',
      title: 'Availability Items',
      type: 'array',
      fieldset: 'availability',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'year', title: 'Year', type: 'string' }),
          defineField({ name: 'status', title: 'Status', type: 'string' }),
          defineField({ name: 'substatus', title: 'Sub-status', type: 'string' }),
          defineField({ name: 'dotClass', title: 'Dot Color', type: 'string', options: { list: ['open', 'soon', 'closed'] } }),
        ],
      }],
    }),
    defineField({ name: 'availabilityText', title: 'Availability Description', type: 'text', fieldset: 'availability', rows: 3 }),

    // === TESTIMONIALS (references to testimonial documents) ===
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'testimonial' }],
      }],
      description: 'Select testimonials relevant to this venue. Max 5.',
      validation: Rule => Rule.max(5),
    }),

    // === SEO & METADATA ===
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      fieldset: 'seo',
      description: 'Override default: "[Venue] Wedding Photographer | Alex Cinisi — [City], Sicily"',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      fieldset: 'seo',
      rows: 3,
      validation: Rule => Rule.max(160).warning('Keep under 155 characters.'),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'string',
      fieldset: 'seo',
      description: 'Comma-separated. e.g. "Villa Igiea wedding photographer, wedding Palermo, luxury wedding Sicily"',
    }),
    defineField({
      name: 'schemaGeoLat',
      title: 'Latitude',
      type: 'number',
      fieldset: 'seo',
      description: 'For ProfessionalService schema markup.',
    }),
    defineField({
      name: 'schemaGeoLng',
      title: 'Longitude',
      type: 'number',
      fieldset: 'seo',
      description: 'For ProfessionalService schema markup.',
    }),
  ],
  orderings: [
    { title: 'Priority', name: 'priority', by: [{ field: 'priority', direction: 'asc' }] },
    { title: 'Name A-Z', name: 'nameAsc', by: [{ field: 'venueName', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'venueName',
      subtitle: 'city',
      media: 'heroImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Location',
        subtitle: subtitle || '',
        media,
      }
    },
  },
})
