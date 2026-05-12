import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'adsProposalPage',
  title: 'Ads — Proposal / Elopement',
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
      name: 'locationImages',
      title: 'Sicily Location Cards (3 images)',
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
      return { title: 'Ads — Proposal Landing' }
    },
  },
})
