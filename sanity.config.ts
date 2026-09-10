import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemas'

// Tipi di cui esiste UN documento solo: sono pagine, non collezioni. Il sito
// li legge con `*[_type == "..."][0]`, quindi un secondo documento non e' una
// copia — e' un ballottaggio che il codice risolve a caso.
const SINGLETON_TYPES = [
    'homePage',
    'aboutPage',
    'contactPage',
    'adsLuxuryPage',
    'adsProposalPage',
    'proposalPage',
    'guidePage',
    'guideLandingPage',
    'siteSettings',
]

export default defineConfig({
    name: 'default',
    title: 'Alex Cinisi Photography',

    // Ensure these are defined in your .env.local
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'th9rzv5a',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

    basePath: '/studio',

    plugins: [structureTool()],

    schema: {
        types: schemaTypes,
    },

    document: {
        // Via "Duplicate" dai tipi a documento unico: e' la strada piu' corta
        // per ritrovarsi due pagine dove il sito ne legge una. Restano tutte le
        // altre azioni, cancellazione compresa.
        actions: (prev, { schemaType }) =>
            SINGLETON_TYPES.includes(schemaType)
                ? prev.filter((action) => action.action !== 'duplicate')
                : prev,

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
                proposalPage: '/proposal-photography-sicily',
                guidePage: '/getting-married-in-sicily',
                guideLandingPage: '/sicily-wedding-guide',
            }

            const resolver = urlMap[document._type]
            if (!resolver) return prev

            const path = typeof resolver === 'function' ? resolver(document) : resolver
            return `${baseUrl}${path}`
        },
    },
})
