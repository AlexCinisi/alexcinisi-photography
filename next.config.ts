import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
            },
        ],
    },
    experimental: {
        optimizePackageImports: ['@sanity/client', '@sanity/image-url', 'next-sanity', 'resend'],
    },
};

export default nextConfig;
