import createImageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const imageBuilder = createImageUrlBuilder(client)

export function urlForImage(source: any) {
  return imageBuilder.image(source)
}
