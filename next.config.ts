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
            // WordPress stories → journal
            { source: '/villa-igiea-wedding-a-luxury-love-story', destination: '/journal/villa-igiea-wedding', permanent: true },
            { source: '/sea-club-terrasini-wedding-a-timeless-pastel-sunset-celebration', destination: '/journal/sea-club-terrasini-wedding', permanent: true },
            { source: '/proposal-in-sicily-kevin-and-safia', destination: '/journal/proposal-sicily-kevin-safia', permanent: true },
            { source: '/engagement-session-at-villa-igiea', destination: '/journal/engagement-villa-igiea', permanent: true },
            { source: '/discover-the-wedding-at-villa-alliata-cardillo', destination: '/journal/villa-alliata-cardillo-wedding', permanent: true },
            { source: '/explore-the-enchanting-wedding-journey-of-gaetano-e-kim', destination: '/journal/gaetano-kim-wedding', permanent: true },
            { source: '/the-winter-wedding-of-annamaria-fabrizio', destination: '/journal/annamaria-fabrizio-winter-wedding', permanent: true },
            // WordPress pages → new structure
            { source: '/stories-2', destination: '/journal', permanent: true },
            { source: '/stories', destination: '/journal', permanent: true },
            { source: '/blog', destination: '/journal', permanent: true },
            // Catch-all: any /stories/slug or /blog/slug → /journal/slug
            { source: '/stories/:slug', destination: '/journal/:slug', permanent: true },
            { source: '/blog/:slug', destination: '/journal/:slug', permanent: true },
            // WordPress location pages → new routes (same slugs, different path)
            { source: '/villa-igiea-wedding-photographer', destination: '/locations/villa-igiea-wedding-photographer', permanent: true },
            { source: '/wedding-photographer-palermo', destination: '/locations/wedding-photographer-palermo', permanent: true },
            { source: '/wedding-photographer-taormina', destination: '/locations/wedding-photographer-taormina', permanent: true },
            { source: '/tonnara-di-scopello-wedding', destination: '/locations/tonnara-di-scopello-wedding', permanent: true },
            { source: '/wedding-photographer-noto', destination: '/locations/wedding-photographer-noto', permanent: true },
        ];
    },
};

export default nextConfig;
