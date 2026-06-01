import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
    name: 'default',
    title: 'Alex Cinisi Photography',

    // Ensure these are defined in your .env.local
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yk3b8vqx',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

    basePath: '/studio',

    plugins: [structureTool()],

    schema: {
        types: schemaTypes,
    },

    document: {
        productionUrl: async (prev, context) => {
            const { document } = context
            const baseUrl = 'https://alexcinisiphotography.com'

            // Map document types to frontend URLs
            const urlMap: Record<string, string | ((doc: any) => string)> = {
                homePage: '/',
                aboutPage: '/about',
                contactPage: '/contact',
                adsLuxuryPage: '/ads/luxury-destination-wedding-sicily',
                adsProposalPage: '/ads/proposal-sicily',
                journalPost: (doc: any) => `/journal/${doc.slug?.current || ''}`,
                locationPage: (doc: any) => `/locations/${doc.slug?.current || ''}`,
            }

            const resolver = urlMap[document._type]
            if (!resolver) return prev

            const path = typeof resolver === 'function' ? resolver(document) : resolver
            return `${baseUrl}${path}`
        },
    },
})
