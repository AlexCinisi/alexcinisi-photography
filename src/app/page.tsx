import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { homePageQuery, featuredPortfolioQuery, featuredTestimonialsQuery, featuredJournalPostsQuery } from '@/lib/sanity/queries';

// ISR: rigenera la pagina ogni 60 secondi per riflettere i contenuti Sanity
export const revalidate = 60;

import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import PressBar from "@/components/sections/PressBar";
import Manifesto from "@/components/sections/Manifesto";
import Pillars from "@/components/sections/Pillars";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import Testimonials from "@/components/sections/Testimonials";
import FilmSection from "@/components/sections/FilmSection";
import Investment from "@/components/sections/Investment";
import ProcessSteps from "@/components/sections/ProcessSteps";
import AboutSection from "@/components/sections/AboutSection";
import LocationsGrid from "@/components/sections/LocationsGrid";
import PhotoPause from '@/components/sections/PhotoPause'
import FeaturedStories from '@/components/sections/FeaturedStories'
import FAQ from "@/components/sections/FAQ";
import Availability from "@/components/sections/Availability";
import ContactForm from "@/components/sections/ContactForm";
import FinalCTA from "@/components/sections/FinalCTA";

// Default values (usati quando Sanity è vuoto)
const DEFAULT_TITLE = 'Alex Cinisi Photography | Luxury Wedding Photographer in Sicily';
const DEFAULT_DESCRIPTION =
  "Luxury destination wedding photographer based in Sicily. Editorial film & digital photography for refined couples. Published in Vogue Italia, Marie Claire, L'Officiel. Available worldwide — 15 weddings per year.";
const DEFAULT_OG_IMAGE = 'https://www.alexcinisiphotography.com/og-image.jpg';
const SITE_URL = 'https://www.alexcinisiphotography.com';

export async function generateMetadata(): Promise<Metadata> {
  // Fetch SEO fields from Sanity (solo i campi SEO, non tutto il documento)
  const data = await client
    .fetch(`*[_type == "homePage"][0] { metaTitle, metaDescription, ogImage { ..., "alt": alt } }`)
    .catch(() => null);

  const title = data?.metaTitle || DEFAULT_TITLE;
  const description = data?.metaDescription || DEFAULT_DESCRIPTION;
  const ogImageUrl = data?.ogImage
    ? urlFor(data.ogImage).width(1200).height(630).quality(90).auto('format').url()
    : DEFAULT_OG_IMAGE;
  const ogAlt =
    data?.ogImage?.alt ||
    'Alex Cinisi Photography — Luxury Wedding Photographer in Sicily';

  return {
    title,
    description,
    keywords:
      'wedding photographer sicily, destination wedding photographer italy, luxury wedding photography palermo, film wedding photographer sicily, editorial wedding photographer, wedding photographer taormina, matrimonio sicilia fotografo',
    alternates: {
      canonical: SITE_URL,
    },
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: 'Alex Cinisi Photography',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function Home() {
    const [homePage, portfolio, testimonials, featuredStories] = await Promise.all([
        client.fetch(homePageQuery).catch(() => null),
        client.fetch(featuredPortfolioQuery).catch(() => null),
        client.fetch(featuredTestimonialsQuery).catch(() => null),
        client.fetch(featuredJournalPostsQuery).catch(() => null),
    ]);

    return (
        <>
            {/* Schema JSON-LD — Homepage */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify([
                  {
                    '@context': 'https://schema.org',
                    '@type': 'LocalBusiness',
                    '@id': 'https://www.alexcinisiphotography.com/#business',
                    name: 'Alex Cinisi Photography',
                    description:
                      'Luxury destination wedding photographer based in Sicily, Italy. Editorial film and digital photography for refined couples worldwide.',
                    url: 'https://www.alexcinisiphotography.com',
                    telephone: '+39 XXX XXX XXXX',
                    email: 'info@alexcinisiphotography.com',
                    image: 'https://www.alexcinisiphotography.com/og-image.jpg',
                    logo: 'https://www.alexcinisiphotography.com/logo.svg',
                    address: {
                      '@type': 'PostalAddress',
                      addressLocality: 'Palermo',
                      addressRegion: 'Sicily',
                      addressCountry: 'IT',
                    },
                    geo: {
                      '@type': 'GeoCoordinates',
                      latitude: 38.1157,
                      longitude: 13.3615,
                    },
                    areaServed: [
                      { '@type': 'Place', name: 'Sicily, Italy' },
                      { '@type': 'Place', name: 'Italy' },
                      { '@type': 'Country', name: 'Worldwide' },
                    ],
                    priceRange: '€€€',
                    openingHoursSpecification: {
                      '@type': 'OpeningHoursSpecification',
                      dayOfWeek: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday',
                      ],
                      opens: '09:00',
                      closes: '20:00',
                    },
                    sameAs: [
                      'https://www.instagram.com/alexcinisi/',
                      'https://www.facebook.com/alexcinisiphotography/',
                    ],
                    knowsLanguage: ['Italian', 'English'],
                  },
                  {
                    '@context': 'https://schema.org',
                    '@type': 'ProfessionalService',
                    '@id': 'https://www.alexcinisiphotography.com/#service',
                    name: 'Alex Cinisi Wedding Photography',
                    description:
                      "Editorial wedding photography blending analog film (Canon AE-1 Program, Kodak Portra 400) with digital. Published in Vogue Italia, L'Officiel, Marie Claire. Available for luxury destination weddings in Sicily, Italy, and worldwide.",
                    provider: {
                      '@type': 'Person',
                      name: 'Alex Cinisi',
                      jobTitle: 'Wedding Photographer',
                      image: 'https://www.alexcinisiphotography.com/og-image.jpg',
                    },
                    serviceType: [
                      'Wedding Photography',
                      'Destination Wedding Photography',
                      'Film Photography',
                      'Editorial Photography',
                      'Elopement Photography',
                    ],
                    areaServed: [
                      {
                        '@type': 'Place',
                        name: 'Sicily',
                        address: {
                          '@type': 'PostalAddress',
                          addressRegion: 'Sicily',
                          addressCountry: 'IT',
                        },
                      },
                      { '@type': 'Place', name: 'Palermo' },
                      { '@type': 'Place', name: 'Taormina' },
                      { '@type': 'Place', name: 'Noto' },
                      { '@type': 'Place', name: 'Scopello' },
                      { '@type': 'Place', name: 'Lake Como' },
                      { '@type': 'Place', name: 'Amalfi Coast' },
                      { '@type': 'Place', name: 'Puglia' },
                      { '@type': 'Country', name: 'Italy' },
                    ],
                    url: 'https://www.alexcinisiphotography.com',
                    telephone: '+39 XXX XXX XXXX',
                    priceRange: '€€€',
                    hasOfferCatalog: {
                      '@type': 'OfferCatalog',
                      name: 'Wedding Photography Collections',
                      itemListElement: [
                        {
                          '@type': 'Offer',
                          itemOffered: {
                            '@type': 'Service',
                            name: 'Full Wedding Day Coverage',
                            description:
                              'Complete wedding photography including getting ready, ceremony, reception, and last dance. Film & digital. 300-500 individually edited images.',
                          },
                        },
                      ],
                    },
                  },
                  {
                    '@context': 'https://schema.org',
                    '@type': 'WebSite',
                    '@id': 'https://www.alexcinisiphotography.com/#website',
                    name: 'Alex Cinisi Photography',
                    url: 'https://www.alexcinisiphotography.com',
                    description:
                      'Luxury destination wedding photographer in Sicily. Editorial film & digital photography.',
                    publisher: {
                      '@type': 'Organization',
                      name: 'Alex Cinisi Photography',
                      logo: {
                        '@type': 'ImageObject',
                        url: 'https://www.alexcinisiphotography.com/logo.svg',
                      },
                    },
                    inLanguage: ['en', 'it'],
                  },
                ]),
              }}
            />
            <Hero image={homePage?.heroImage} alt={homePage?.heroImage?.alt} darkText={homePage?.heroTextDark} />
            <TrustBar />
            <PressBar logos={homePage?.pressLogos} />
            <PhotoPause
                image={homePage?.photoBreakImage1}
                alt={homePage?.photoBreakImage1?.alt || 'Wedding photography by Alex Cinisi'}
                fallbackGradient="linear-gradient(160deg, #c4baa8 0%, #a89e8c 40%, #8c836e 100%)"
            />
            <Manifesto image={homePage?.manifestoImage} alt={homePage?.manifestoImage?.alt} />
            <Pillars />
            <FeaturedStories stories={featuredStories} />
            <PortfolioGrid items={portfolio} />
            <AboutSection image={homePage?.aboutImage} alt={homePage?.aboutImage?.alt} />
            <FilmSection image={homePage?.filmSectionImage} alt={homePage?.filmSectionImage?.alt} />
            <Testimonials items={testimonials} />
            <Investment />
            <PhotoPause
                image={homePage?.photoBreakImage2}
                alt={homePage?.photoBreakImage2?.alt || 'Luxury destination wedding in Sicily'}
                fallbackGradient="linear-gradient(155deg, #b8ac98 0%, #9e9280 40%, #8a7e6a 100%)"
            />
            <ProcessSteps />
            <LocationsGrid />
            <PhotoPause
                image={homePage?.photoBreakImage3}
                alt={homePage?.photoBreakImage3?.alt || 'Destination wedding photography in Sicily'}
                fallbackGradient="linear-gradient(150deg, #c0b4a0 0%, #a49888 40%, #887c6c 100%)"
            />
            <FAQ />
            <Availability />
            <ContactForm ctaText="Tell Me About Your Wedding →" />
            <FinalCTA />
        </>
    );
}
