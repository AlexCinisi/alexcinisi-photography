import { defineField, defineType } from 'sanity'

export const story = defineType({
    name: 'story',
    title: 'Story',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'coupleName',
            title: 'Couple Name',
            type: 'string',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
        }),
        defineField({
            name: 'country',
            title: 'Country',
            type: 'string',
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date',
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }]
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'portfolioImage',
            title: 'Portfolio Grid Image',
            type: 'image',
            options: { hotspot: true }
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [{ type: 'image' }]
        }),
        defineField({
            name: 'seoContent',
            title: 'SEO Content (Rich Text)',
            type: 'array',
            of: [{ type: 'block' }]
        }),
        defineField({
            name: 'metaTitle',
            title: 'Meta Title',
            type: 'string',
        }),
        defineField({
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'text'
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            initialValue: false
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number'
        })
    ],
})
