import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'journalPost',
  title: 'Journal Post',
  type: 'document',
  fieldsets: [
    { name: 'couple', title: 'Couple Info', options: { collapsible: true, collapsed: false } },
    { name: 'media', title: 'Images', options: { collapsible: true, collapsed: false } },
    { name: 'content', title: 'Story Content', options: { collapsible: true, collapsed: false } },
    { name: 'seo', title: 'SEO & Metadata', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // === COUPLE INFO ===
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      fieldset: 'couple',
      description: 'e.g. "Marina & James — Villa Valguarnera"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      fieldset: 'couple',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'coupleName',
      title: 'Couple Name',
      type: 'string',
      fieldset: 'couple',
      description: 'e.g. "Marina & James" — shown as heading on the post',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      fieldset: 'couple',
      description: 'e.g. "A Midsummer Celebration at Villa Valguarnera"',
    }),
    defineField({
      name: 'location',
      title: 'Location / Venue',
      type: 'string',
      fieldset: 'couple',
      description: 'e.g. "Villa Valguarnera, Bagheria"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'locationRef',
      title: 'Related Location Page',
      type: 'reference',
      to: [{ type: 'locationPage' }],
      fieldset: 'couple',
      description: 'Link to the location landing page (enables cross-linking). Leave empty if no location page exists yet.',
    }),
    defineField({
      name: 'country',
      title: 'Couple Country',
      type: 'string',
      fieldset: 'couple',
      description: 'e.g. "USA", "Italy", "United Kingdom"',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      fieldset: 'couple',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      fieldset: 'couple',
      options: {
        list: [
          { title: 'Wedding', value: 'wedding' },
          { title: 'Editorial', value: 'editorial' },
          { title: 'Engagement', value: 'engagement' },
          { title: 'Travel', value: 'travel' },
          { title: 'Behind the Scenes', value: 'bts' },
        ],
        layout: 'radio',
      },
      initialValue: 'wedding',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      fieldset: 'couple',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'e.g. "Film + Digital", "Destination", "Editorial", "Intimate"',
    }),

    // === IMAGES ===
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      fieldset: 'media',
      options: { hotspot: true },
      description: 'Main image shown at the top of the post (landscape 3:2 recommended).',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text (SEO)',
          type: 'string',
          description: '⚠️ Required for SEO. Describe the image for search engines and screen readers.',
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'portfolioImage',
      title: 'Portfolio Grid Image',
      type: 'image',
      fieldset: 'media',
      options: { hotspot: true },
      description: 'Image shown in the homepage portfolio masonry (portrait 3:4 recommended). If empty, heroImage will be used.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text (SEO)',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      fieldset: 'media',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          defineField({ name: 'alt', title: 'Alt Text', type: 'string', description: '⚠️ Alt text is critical for SEO.' }),
          defineField({ name: 'caption', title: 'Caption', type: 'string' }),
        ],
      }],
      description: 'All photos for this story. Upload in the order you want them displayed.',
    }),

    // === STORY CONTENT ===
    defineField({
      name: 'seoContent',
      title: 'Story Text',
      type: 'array',
      fieldset: 'content',
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
      description: 'The narrative of the wedding. Min 200 words, target 500. Write in bride-first tone. This is the SEO-critical content — search engines need text to rank the page.',
    }),
    defineField({
      name: 'vendorCredits',
      title: 'Vendor Credits',
      type: 'array',
      fieldset: 'content',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'role', title: 'Role', type: 'string', description: 'e.g. "Planner", "Flowers", "Venue", "Dress"' }),
          defineField({ name: 'name', title: 'Name', type: 'string' }),
          defineField({ name: 'url', title: 'Website URL', type: 'url' }),
        ],
        preview: {
          select: { title: 'name', subtitle: 'role' },
        },
      }],
      description: 'Credits to vendors with links — great for SEO and planner relationships.',
    }),

    // === SEO & METADATA ===
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      fieldset: 'seo',
      description: 'Override the auto-generated title tag. Leave empty for default: "[Couple] — [Venue] | Alex Cinisi Photography"',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      fieldset: 'seo',
      rows: 3,
      description: 'Max 155 characters. Appears in Google search results.',
      validation: Rule => Rule.max(160).warning('Keep under 155 characters for best display in search results.'),
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      fieldset: 'seo',
      initialValue: false,
      description: 'Show this story in the homepage Featured Stories section.',
    }),
    defineField({
      name: 'order',
      title: 'Portfolio Order',
      type: 'number',
      fieldset: 'seo',
      description: 'Lower number = higher position in the portfolio grid.',
    }),
  ],
  orderings: [
    { title: 'Date (newest first)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
    { title: 'Portfolio Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'coupleName',
      subtitle: 'location',
      date: 'date',
      category: 'category',
      media: 'heroImage',
    },
    prepare({ title, subtitle, date, category, media }) {
      return {
        title: title || 'Untitled',
        subtitle: `${category ? category.toUpperCase() + ' · ' : ''}${subtitle || ''} ${date ? '· ' + date : ''}`,
        media,
      }
    },
  },
})
