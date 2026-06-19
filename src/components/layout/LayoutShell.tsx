'use client'

import { usePathname } from 'next/navigation'
import Nav from './Nav'
import Footer from './Footer'
import StickyMobileCTA from './StickyMobileCTA'

const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "Photographer"],
    name: "Alex Cinisi Photography",
    description:
        "Luxury editorial wedding photographer specialising in destination weddings across Sicily and Italy. Capturing timeless imagery for refined international couples.",
    url: "https://alexcinisiphotography.com",
    image: "https://alexcinisiphotography.com/wp-content/uploads/alex-cinisi-photographer.webp",
    telephone: "+39 327 12 49 998",
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
        "https://www.instagram.com/alexcinisi",
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
            item: "https://alexcinisiphotography.com/",
        },
    ],
};

interface LayoutShellProps {
  children: React.ReactNode;
  logo?: any;
  logoFooter?: any;
}

export default function LayoutShell({ children, logo, logoFooter }: LayoutShellProps) {
  const pathname = usePathname()
  const isAds = pathname?.startsWith('/ads')
  const isServicePage = pathname === '/proposal-photography-sicily'

  return (
    <>
      {!isAds && (
        <>
          <script
              id="schema-local-business"
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
          />
          <script
              id="schema-faq"
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
          <script
              id="schema-breadcrumb"
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
          <Nav logo={logo} />
        </>
      )}
      {children}
      {!isAds && (
        <>
          <Footer logo={logo} logoFooter={logoFooter} />
          {!isServicePage && <StickyMobileCTA />}
        </>
      )}
    </>
  )
}
