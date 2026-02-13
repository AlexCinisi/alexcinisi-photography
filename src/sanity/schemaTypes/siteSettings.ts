import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'siteName',
            title: 'Site Name',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Contact Email',
            type: 'string',
        }),
        defineField({
            name: 'instagram',
            title: 'Instagram URL',
            type: 'url',
        }),
        defineField({
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
        }),
        defineField({
            name: 'availability',
            title: 'Availability',
            type: 'array',
            of: [{ type: 'string' }]
        }),
        defineField({
            name: 'trustBar',
            title: 'Trust Bar Logos',
            type: 'array',
            of: [{ type: 'image' }]
        })
    ],
})
