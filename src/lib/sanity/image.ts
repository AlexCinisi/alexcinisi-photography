import imageUrlBuilder from '@sanity/image-url'
import { client as sanityClient } from './client'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper to get CSS object-position from hotspot data
export function getHotspotPosition(image: any): string {
  if (!image?.hotspot) return '50% 50%'
  const x = Math.round(image.hotspot.x * 100)
  const y = Math.round(image.hotspot.y * 100)
  return `${x}% ${y}%`
}
