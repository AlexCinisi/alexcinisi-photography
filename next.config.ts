import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
            },
        ],
        qualities: [75, 85, 90],
    },
    experimental: {
        optimizePackageImports: ['@sanity/client', '@sanity/image-url', 'next-sanity', 'resend'],
    },
    async redirects() {
        return [
            // Ads redirects — preserve old WordPress URLs
            {
              source: '/luxury-destination-wedding-photography-in-sicily',
              destination: '/ads/luxury-destination-wedding-sicily',
              permanent: true,
            },
            {
              source: '/proposal-in-sicily',
              destination: '/ads/proposal-sicily',
              permanent: true,
            },
            // WordPress stories → journal
            { source: '/villa-igiea-wedding-a-luxury-love-story', destination: '/journal/villa-igiea-wedding', permanent: true },
            { source: '/sea-club-terrasini-wedding-a-timeless-pastel-sunset-celebration', destination: '/journal/sea-club-terrasini-wedding', permanent: true },
            { source: '/proposal-in-sicily-kevin-and-safia', destination: '/journal/proposal-sicily-kevin-safia', permanent: true },
            { source: '/engagement-session-at-villa-igiea', destination: '/journal/engagement-villa-igiea', permanent: true },
            { source: '/discover-the-wedding-at-villa-alliata-cardillo', destination: '/journal/villa-alliata-cardillo-wedding', permanent: true },
            { source: '/explore-the-enchanting-wedding-journey-of-gaetano-e-kim', destination: '/journal/gaetano-kim-wedding', permanent: true },
            { source: '/the-winter-wedding-of-annamaria-fabrizio', destination: '/journal/annamaria-fabrizio-winter-wedding', permanent: true },
            {
              source: '/marta-e-roberto',
              destination: '/journal/marta-roberto-wedding',
              permanent: true
            },
            // WordPress locale prefixes → homepage
            { source: '/it', destination: '/', permanent: true },
            { source: '/it/:path*', destination: '/:path*', permanent: true },
            { source: '/en', destination: '/', permanent: true },
            { source: '/en/:path*', destination: '/:path*', permanent: true },
            // WordPress category pages → journal
            { source: '/category/:slug*', destination: '/journal', permanent: true },
            // WordPress privacy & legal pages
            { source: '/privacypolicyfull', destination: '/privacy', permanent: true },
            { source: '/privacy-policy', destination: '/privacy', permanent: true },
            // WordPress FAQ → contact
            { source: '/faq', destination: '/contact', permanent: true },
            // WordPress pages → new structure
            { source: '/stories-2', destination: '/journal', permanent: true },
            { source: '/stories', destination: '/journal', permanent: true },
            { source: '/blog', destination: '/journal', permanent: true },
            // Catch-all: any /stories/slug or /blog/slug → /journal/slug
            { source: '/stories/:slug', destination: '/journal/:slug', permanent: true },
            { source: '/blog/:slug', destination: '/journal/:slug', permanent: true },
            // WordPress location pages → new routes (same slugs, different path)
            { source: '/villa-igiea-wedding-photographer', destination: '/locations/villa-igiea-wedding-photographer', permanent: true },
            { source: '/wedding-photographer-palermo', destination: '/locations', permanent: true }, // TEMP: retarget a hub finché la location page non esiste in Sanity
            { source: '/wedding-photographer-taormina', destination: '/locations', permanent: true }, // TEMP: retarget a hub finché la location page non esiste in Sanity
            { source: '/tonnara-di-scopello-wedding', destination: '/locations/tonnara-di-scopello-wedding', permanent: true },
            { source: '/wedding-photographer-noto', destination: '/locations', permanent: true }, // TEMP: retarget a hub finché la location page non esiste in Sanity

            // Vanity URL campagna guida — temporanei di proposito (permanent: false)
            { source: '/guide', destination: '/sicily-wedding-guide', permanent: false },
            { source: '/guide-pdf', destination: '/downloads/The-Sicily-Wedding-Guide-Alex-Cinisi.pdf', permanent: false },
            { source: '/call', destination: 'https://cal.com/alexcinisi/wedding-consultation', permanent: false },
        ];
    },
};

export default nextConfig;
