import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        defineField({
            name: 'coupleName',
            title: 'Couple Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'country',
            title: 'Country',
            type: 'string',
        }),
        defineField({
            name: 'countryFlag',
            title: 'Country Flag',
            type: 'string',
            description: 'Emoji for the country flag (e.g., 🇺🇸)',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
        }),
        defineField({
            name: 'quote',
            title: 'Quote',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'number',
            validation: (Rule) => Rule.min(1).max(5),
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
        }),
    ],
});
