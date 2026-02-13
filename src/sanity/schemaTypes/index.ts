import { type SchemaTypeDefinition } from 'sanity'
import { siteSettings } from './siteSettings'
import { story } from './story'
import { locationPage } from './locationPage'
import { testimonial } from './testimonial'
import { blogPost } from './blogPost'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [siteSettings, story, locationPage, testimonial, blogPost],
}
