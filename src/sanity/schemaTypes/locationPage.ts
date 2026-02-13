import { defineField, defineType } from 'sanity'

export const locationPage = defineType({
    name: 'locationPage',
    title: 'Location Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Location Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' }
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: { hotspot: true }
        }),
        defineField({
            name: 'heroHeading',
            title: 'Hero Heading',
            type: 'string'
        }),
        defineField({
            name: 'venueIntro',
            title: 'Venue Intro (Rich Text)',
            type: 'array',
            of: [{ type: 'block' }]
        }),
        defineField({
            name: 'photoLocations',
            title: 'Photo Locations',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'title', type: 'string' },
                    { name: 'description', type: 'text' },
                    { name: 'image', type: 'image' }
                ]
            }]
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [{ type: 'image' }]
        }),
        defineField({
            name: 'pillars',
            title: 'Pillars',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'title', type: 'string' },
                    { name: 'description', type: 'text' }
                ]
            }]
        }),
        defineField({
            name: 'faqs',
            title: 'FAQs',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'question', type: 'string' },
                    { name: 'answer', type: 'text' }
                ]
            }]
        }),
        defineField({
            name: 'testimonials',
            title: 'Testimonials',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'testimonial' }] }]
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
    ],
})
