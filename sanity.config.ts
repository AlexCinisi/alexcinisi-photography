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
})
