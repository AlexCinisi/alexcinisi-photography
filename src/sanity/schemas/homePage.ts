import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'homePage',
    title: 'Home Page',
    type: 'document',
    fields: [
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'manifestoImage',
            title: 'Manifesto Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'aboutImage',
            title: 'About Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'filmSectionImage',
            title: 'Film Section Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'photoBreakImage',
            title: 'Photo Break Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'proofLogos',
            title: 'Proof Logos',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'logoItem',
                    fields: [
                        { name: 'name', title: 'Name', type: 'string' },
                        { name: 'logo', title: 'Logo', type: 'image' },
                        { name: 'url', title: 'URL', type: 'url' },
                    ],
                },
            ],
        }),
    ],
});
