import imageUrlBuilder from '@sanity/image-url'
import { client as sanityClient } from './client'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}
