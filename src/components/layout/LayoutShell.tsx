'use client'

import { usePathname } from 'next/navigation'
import Nav from './Nav'
import Footer from './Footer'
import StickyMobileCTA from './StickyMobileCTA'

const localBusinessSchema = {
    "@context": "https://schema.org",
    "@id": "https://alexcinisiphotography.com/#business",
    "@type": ["ProfessionalService", "Photographer"],
    name: "Alex Cinisi Photography",
    description:
        "Luxury editorial wedding photographer specialising in destination weddings across Sicily and Italy. Capturing timeless imagery for refined international couples.",
    url: "https://alexcinisiphotography.com",
    image: "https://alexcinisiphotography.com/wp-content/uploads/alex-cinisi-photographer.webp",
    telephone: "+393271249998",
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
