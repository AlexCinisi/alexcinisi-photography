import type { Metadata } from "next";
import { Red_Hat_Display, Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";
import { GoogleTagManager } from '@next/third-parties/google'
import CookieConsent from '@/components/CookieConsent'
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';


const redhat = Red_Hat_Display({
    variable: "--font-redhat",
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    style: ["normal", "italic"],
    display: "swap",
});

const bodoniModa = Bodoni_Moda({
    variable: "--font-bodoni",
    subsets: ["latin"],
    weight: ["400"],
    style: ["normal", "italic"],
    display: "swap",
});

const jost = Jost({
    variable: "--font-jost",
    subsets: ["latin"],
    weight: ["200", "300", "400"],
    display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
    const data = await sanityClient.fetch(siteLogoQuery).catch(() => null);

    return {
        metadataBase: new URL('https://alexcinisiphotography.com'),
        title: {
            default: 'Alex Cinisi Photography | Luxury Wedding Photographer in Sicily',
            template: '%s | Alex Cinisi Photography',
        },
        description:
            "Luxury destination wedding photographer based in Sicily. Editorial film & digital photography for refined couples worldwide.",
        keywords:
            "wedding photographer Sicily, luxury wedding photographer Italy, destination wedding photographer Sicily, wedding photographer Palermo, wedding photographer Taormina, editorial wedding photography Italy, Sicily wedding photographer",
        icons: {
            icon: data?.favicon?.asset?.url
                ? [
                    { url: data.favicon.asset.url, sizes: '32x32', type: 'image/png' },
                    { url: data.favicon.asset.url, sizes: '16x16', type: 'image/png' },
                ]
                : '/favicon.ico',
            apple: data?.appleTouchIcon?.asset?.url || data?.favicon?.asset?.url || '/apple-icon.png',
        },
        openGraph: {
            title: "Alex Cinisi Photography — Luxury Wedding Photographer in Sicily",
            description:
                "Timeless editorial wedding photography for destination weddings in Sicily & Italy. For couples who believe their love story deserves artistry.",
            type: "website",
            url: "https://alexcinisiphotography.com/",
            images: [
                {
                    url: "https://alexcinisiphotography.com/wp-content/uploads/og-homepage.webp",
                },
            ],
            locale: "en_US",
            siteName: "Alex Cinisi Photography",
        },
        twitter: {
            card: "summary_large_image",
            title: "Alex Cinisi Photography — Luxury Wedding Photographer Sicily",
            description:
                "Editorial destination wedding photography in Sicily. 30+ international weddings captured with timeless artistry.",
        },
        alternates: {
            canonical: "https://alexcinisiphotography.com/",
        },
    };
}



import { client as sanityClient } from "@/lib/sanity/client";
import { siteLogoQuery } from "@/lib/sanity/queries";

// ISR: rigenera la pagina ogni ora per riflettere i contenuti Sanity (per il logo)
export const revalidate = 3600;

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const layoutData = await sanityClient.fetch(siteLogoQuery).catch(() => null);
    const siteLogo = layoutData?.siteLogo;
    const siteLogoFooter = layoutData?.siteLogoFooter;

    return (
        <html lang="en">
            <body
                className={`${jost.variable} ${redhat.variable} ${bodoniModa.variable}`}
                style={{ fontFamily: "var(--font-jost), sans-serif" }}
            >

                <LayoutShell logo={siteLogo} logoFooter={siteLogoFooter}>
                    {children}
                </LayoutShell>
                <CookieConsent />
                <Analytics />
                <SpeedInsights />
            </body>
            {process.env.NEXT_PUBLIC_GTM_ID && process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' && (
                <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
            )}
        </html>
    );
}
