import type { Metadata } from "next";
import { Red_Hat_Display, Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import Script from "next/script";

const redHatDisplay = Red_Hat_Display({
    variable: "--font-red-hat",
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

export const metadata: Metadata = {
    title: "Wedding Photographer Sicily | Luxury Destination Weddings | Alex Cinisi Photography",
    description:
        "Award-winning luxury wedding photographer in Sicily. Timeless editorial photography for destination weddings in Palermo, Taormina, Noto & across Italy. 30+ international weddings. Investment from €2,500.",
    keywords:
        "wedding photographer Sicily, luxury wedding photographer Italy, destination wedding photographer Sicily, wedding photographer Palermo, wedding photographer Taormina, editorial wedding photography Italy, Sicily wedding photographer",
    openGraph: {
        title: "Alex Cinisi Photography — Luxury Wedding Photographer in Sicily",
        description:
            "Timeless editorial wedding photography for destination weddings in Sicily & Italy. For couples who believe their love story deserves artistry.",
        type: "website",
        url: "https://www.alexcinisiphotography.com/",
        images: [
            {
                url: "https://www.alexcinisiphotography.com/wp-content/uploads/og-homepage.webp",
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
        canonical: "https://www.alexcinisiphotography.com/",
    },
};

const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "Photographer"],
    name: "Alex Cinisi Photography",
    description:
        "Luxury editorial wedding photographer specialising in destination weddings across Sicily and Italy. Capturing timeless imagery for refined international couples.",
    url: "https://www.alexcinisiphotography.com",
    image: "https://www.alexcinisiphotography.com/wp-content/uploads/alex-cinisi-photographer.webp",
    telephone: "",
    email: "info@alexcinisiphotography.com",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Palermo",
        addressRegion: "Sicily",
        addressCountry: "IT",
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: 38.1157,
        longitude: 13.3615,
    },
    priceRange: "€€€",
    areaServed: [
        { "@type": "Place", name: "Sicily" },
        { "@type": "Place", name: "Palermo" },
        { "@type": "Place", name: "Taormina" },
        { "@type": "Place", name: "Noto" },
        { "@type": "Place", name: "Italy" },
    ],
    knowsAbout: [
        "Wedding Photography",
        "Destination Wedding",
        "Editorial Photography",
        "Luxury Wedding",
        "Film Photography",
    ],
    award: ["Featured in Vogue", "ANFM Certified Photographer", "Wezoree Top Photographer"],
    sameAs: [
        "https://www.instagram.com/alexcinisiphotography/",
        "https://wezoree.com/it/vendors/profile/19253-alex-cinisi/",
        "https://anfm.it/fotografo/3902-alex-cinisi/",
    ],
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Wedding Photography Services",
        itemListElement: [
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Full Wedding Day Photography",
                },
                priceSpecification: {
                    "@type": "PriceSpecification",
                    priceCurrency: "EUR",
                    minPrice: "2500",
                },
            },
        ],
    },
    aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "30",
        bestRating: "5",
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "How much does a luxury wedding photographer in Sicily cost?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Alex Cinisi Photography's wedding coverage starts from €2,500, which includes full-day coverage, drone aerial photography, edited images, and a private online gallery. Most couples invest between €2,500 and €5,000.",
            },
        },
        {
            "@type": "Question",
            name: "How far in advance should we book a wedding photographer in Sicily?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Most couples book 12-18 months ahead, especially for peak season (May–October). Sicily's most popular venues fill quickly, and having your photographer confirmed early helps with timeline planning.",
            },
        },
        {
            "@type": "Question",
            name: "Do you travel for destination weddings outside Sicily?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Absolutely. While Sicily is home base, Alex Cinisi Photography has covered weddings across 15+ countries. Travel costs for destination weddings outside Sicily are included in a bespoke proposal.",
            },
        },
        {
            "@type": "Question",
            name: "What is the best time of year to get married in Sicily?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Late spring (May-June) and early autumn (September-October) offer the most beautiful light and comfortable temperatures. These months are ideal for outdoor ceremonies and golden hour portraits at Sicily's iconic venues.",
            },
        },
        {
            "@type": "Question",
            name: "What wedding venues in Sicily does Alex Cinisi photograph at?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Alex Cinisi has extensive experience at Sicily's finest venues including Villa Igiea in Palermo, Tonnara di Scopello, Villa Valguarnera in Bagheria, venues throughout Taormina, Noto's baroque palazzi, and many more across the island.",
            },
        },
    ],
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.alexcinisiphotography.com/",
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${jost.variable} ${redHatDisplay.variable} ${bodoniModa.variable}`}
                style={{ fontFamily: "var(--font-jost), sans-serif" }}
            >
                <Script
                    id="schema-local-business"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
                />
                <Script
                    id="schema-faq"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
                <Script
                    id="schema-breadcrumb"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                />
                <Nav />
                {children}
                <Footer />
                <StickyMobileCTA />
            </body>
        </html>
    );
}
