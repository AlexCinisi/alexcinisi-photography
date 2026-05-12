import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'adsLuxuryPage',
  title: 'Ads — Luxury Wedding',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Full-viewport hero background. Landscape, minimum 1920px wide.',
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
      ],
    }),
    defineField({
      name: 'selectedWork',
      title: 'Selected Work (3 images)',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt', title: 'Alt Text', type: 'string' },
          { name: 'caption', title: 'Caption', type: 'string', description: 'e.g. "Marina & James · Villa Valguarnera"' },
        ],
      }],
      validation: Rule => Rule.max(3),
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'filmImages',
      title: 'Film Photography (3 images)',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          { name: 'alt', title: 'Alt Text', type: 'string' },
        ],
      }],
      validation: Rule => Rule.max(3),
      options: { layout: 'grid' },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Ads — Luxury Wedding Landing' }
    },
  },
})
