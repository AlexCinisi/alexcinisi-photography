import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'portfolioItem',
    title: 'Portfolio Item',
    type: 'document',
    fields: [
        defineField({
            name: 'coupleName',
            title: 'Couple Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'badge',
            title: 'Badge',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'coupleName',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
        }),
    ],
});
