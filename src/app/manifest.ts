import type { MetadataRoute } from 'next';
import { client as sanityClient } from '@/lib/sanity/client';
import { siteLogoQuery } from '@/lib/sanity/queries';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const data = await sanityClient.fetch(siteLogoQuery).catch(() => null);
  const iconUrl = data?.webManifestIcon?.asset?.url || data?.favicon?.asset?.url;

  return {
    name: 'Alex Cinisi Photography',
    short_name: 'Alex Cinisi',
    description: 'Luxury Wedding Photographer in Sicily',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAF8',
    theme_color: '#1E1D1B',
    icons: iconUrl
      ? [
          { src: iconUrl, sizes: '192x192', type: 'image/png' },
          { src: iconUrl, sizes: '512x512', type: 'image/png' },
        ]
      : [],
  };
}
