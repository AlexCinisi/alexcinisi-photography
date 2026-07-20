import type { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'

export const revalidate = 3600 // rigenera ogni ora

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alexcinisiphotography.com'

  // Pagine statiche
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/proposal-photography-sicily`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/getting-married-in-sicily`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Journal posts da Sanity
  let journalPages: MetadataRoute.Sitemap = []
  try {
    const posts = await client.fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "journalPost" && defined(slug.current)] | order(date desc) {
        "slug": slug.current,
        _updatedAt
      }`
    )
    journalPages = posts.map((post) => ({
      url: `${baseUrl}/journal/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  } catch (e) {
    console.error('Sitemap: failed to fetch journal posts', e)
  }

  // Location pages da Sanity
  let locationPages: MetadataRoute.Sitemap = []
  try {
    const locations = await client.fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "locationPage" && defined(slug.current)] | order(priority asc) {
        "slug": slug.current,
        _updatedAt
      }`
    )
    locationPages = locations.map((loc) => ({
      url: `${baseUrl}/locations/${loc.slug}`,
      lastModified: new Date(loc._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }))
  } catch (e) {
    console.error('Sitemap: failed to fetch location pages', e)
  }

  return [...staticPages, ...journalPages, ...locationPages]
}
