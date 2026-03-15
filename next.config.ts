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
};

export default nextConfig;
