import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { locationPageBySlugQuery, allLocationSlugsQuery, homePageQuery } from '@/lib/sanity/queries';
import { PortableText } from '@portabletext/react';
import Breadcrumb from '@/components/sections/Breadcrumb';
import HeroLocation from '@/components/sections/HeroLocation';
import TrustBar from '@/components/sections/TrustBar';
import VenueIntro from '@/components/sections/VenueIntro';
import VenueDetails from '@/components/sections/VenueDetails';
import PortfolioGrid from '@/components/sections/PortfolioGrid';
import Pillars from '@/components/sections/Pillars';
import VenueCallout from '@/components/sections/VenueCallout';
import Investment from '@/components/sections/Investment';
import ProcessSteps from '@/components/sections/ProcessSteps';
import AboutSection from '@/components/sections/AboutSection';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Availability from '@/components/sections/Availability';
import ContactForm from '@/components/sections/ContactForm';
import FinalCTA from '@/components/sections/FinalCTA';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export const revalidate = 3600;

// SSG: generate all location slugs at build time
export async function generateStaticParams() {
  const slugs = await client.fetch(allLocationSlugsQuery);
  return (slugs || []).map((s: { slug: string }) => ({ slug: s.slug }));
}

// Dynamic SEO metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await client.fetch(locationPageBySlugQuery, { slug });
  if (!data) return { title: 'Location Not Found' };

  const title = data.metaTitle || `${data.venueName} Wedding Photographer | Alex Cinisi — ${data.city}, Sicily`;
  const description = data.metaDescription || `Editorial wedding photographer at ${data.venueName}, ${data.city}. Timeless, refined imagery for discerning couples at Sicily's most iconic venues.`;

  return {
    title,
    description,
    alternates: { canonical: `/locations/${slug}` },
    ...(data.keywords && { keywords: data.keywords }),
    openGraph: {
      title,
      description,
      type: 'website',
      ...(data.heroImage && {
        images: [{ url: urlFor(data.heroImage).width(1200).height(630).url() }],
      }),
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await client.fetch(locationPageBySlugQuery, { slug });

  if (!data) notFound();

  // Fetch homepage data for shared components (About image)
  const homeData = await client.fetch(homePageQuery);

  // === SCHEMA MARKUP — ProfessionalService ===
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `Alex Cinisi Photography — ${data.venueName} Weddings`,
    "description": data.metaDescription || `Editorial wedding photographer specialising in luxury weddings at ${data.venueName}, ${data.city}, Sicily.`,
    "url": `https://alexcinisiphotography.com/locations/${slug}`,
    ...(data.heroImage && { "image": urlFor(data.heroImage).width(1200).height(800).url() }),
    "telephone": "",
    "email": "info@alexcinisiphotography.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.city || "Palermo",
      "addressRegion": data.region || "Sicily",
      "addressCountry": "IT"
    },
    ...(data.schemaGeoLat && data.schemaGeoLng && {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": data.schemaGeoLat,
        "longitude": data.schemaGeoLng
      }
    }),
    "priceRange": "€€€",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": data.testimonials?.length || 5
    },
    ...(data.investmentPrice && {
      "offers": {
        "@type": "Offer",
        "priceCurrency": "EUR",
        "minPrice": data.investmentPrice.replace(/[^0-9]/g, '')
      }
    })
  };

  // === SCHEMA MARKUP — FAQPage ===
  const faqSchema = data.faqs?.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // === SCHEMA MARKUP — BreadcrumbList ===
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://alexcinisiphotography.com" },
      { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://alexcinisiphotography.com/locations" },
      { "@type": "ListItem", "position": 3, "name": data.venueName, "item": `https://alexcinisiphotography.com/locations/${slug}` }
    ]
  };

  return (
    <main>
      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Locations', href: '/locations' },
        { label: data.title || data.venueName }
      ]} />

      {/* Hero */}
      <HeroLocation
        image={data.heroImage}
        darkText={data.heroTextDark || false}
        eyebrow={data.heroEyebrow || `${data.venueName} · ${data.city}, ${data.region || 'Sicily'}`}
        titleL1={data.heroLine1 || `Your ${data.venueName}`}
        titleL2={data.heroLine2Italic || 'Wedding, Captured'}
        titleL3={data.heroLine3 || 'With Timeless Artistry'}
        subtitle={data.heroDescription || ''}
        scrollText={data.heroCTAText || 'Scroll to discover'}
        locationTag={`${data.venueName} · ${data.city}`}
      />

      {/* Trust Bar */}
      {data.trustBarItems?.length > 0 && (
        <TrustBar items={data.trustBarItems.map((item: any) => ({
          number: item.number,
          label: <>{item.label}</>
        }))} />
      )}

      {/* Venue Intro */}
      {data.venueIntroTitle && (
        <VenueIntro
          label={data.venueIntroLabel || 'The Venue'}
          title={<span dangerouslySetInnerHTML={{ __html: data.venueIntroTitle }} />}
          description={data.venueIntroText ? <PortableText value={data.venueIntroText} /> : null}
          galleryLinkText={data.venueGalleryLinkText || 'See Weddings'}
          image={data.venueIntroImage}
        />
      )}

      {/* Photo Locations / Venue Details */}
      {data.photoLocations?.length > 0 && (
        <VenueDetails
          label={data.photoSpotsLabel || 'Best Photo Locations'}
          title={data.photoSpotsTitle ? <span dangerouslySetInnerHTML={{ __html: data.photoSpotsTitle }} /> : undefined}
          items={data.photoLocations}
        />
      )}

      {/* Gallery */}
      {data.galleryImages?.length > 0 && (
        <PortfolioGrid
          intro={{
            label: data.galleryIntroLabel || `${data.venueName} Gallery`,
            title: data.galleryIntroTitle ? <span dangerouslySetInnerHTML={{ __html: data.galleryIntroTitle }} /> : <>Gallery</>,
            note: data.galleryIntroNote || ''
          }}
          items={data.galleryImages.map((item: any) => ({
            coupleName: item.title || '',
            location: item.subtitle || '',
            badge: item.badge || '',
            image: item.image
          }))}
          ctaText={data.galleryCTAText || ''}
          ctaLink={data.galleryCTALink || ''}
        />
      )}

      {/* Pillars — Why Choose Me */}
      {data.pillars?.length > 0 && (
        <Pillars
          intro={{
            label: data.pillarsLabel || 'Why Choose Me',
            title: data.pillarsTitle ? <span dangerouslySetInnerHTML={{ __html: data.pillarsTitle }} /> : <>Why Choose Me</>
          }}
          items={data.pillars}
        />
      )}

      {/* Venue Callout (dark section) */}
      {data.calloutTitle && (
        <VenueCallout
          label={data.calloutLabel}
          title={<span dangerouslySetInnerHTML={{ __html: data.calloutTitle }} />}
          content={data.calloutText ? <PortableText value={data.calloutText} /> : null}
          imageAlt={data.calloutImage?.alt}
          image={data.calloutImage}
        />
      )}

      {/* Investment */}
      {data.investmentPrice && (
        <Investment
          price={data.investmentPrice}
          priceRange={data.investmentRange || ''}
          includes={data.investmentIncludes || []}
          ctaText={data.investmentCTAText || `Request Your ${data.venueName} Proposal`}
        />
      )}

      {/* Process + About — these use no location-specific data */}
      <ProcessSteps />
      <AboutSection
        image={homeData?.aboutImage}
        alt="Alex Cinisi, luxury wedding photographer based in Sicily"
      />

      {/* Testimonials */}
      {data.testimonials?.length > 0 && (
        <Testimonials
          items={data.testimonials.map((t: any) => ({
            flag: t.countryFlag || '',
            quote: t.quote,
            coupleName: t.coupleName,
            location: t.location
          }))}
        />
      )}

      {/* FAQ */}
      {data.faqs?.length > 0 && (
        <FAQ
          label={data.faqLabel || `Questions About ${data.venueName}`}
          items={data.faqs.map((faq: any) => ({
            q: faq.question,
            a: faq.answer
          }))}
        />
      )}

      {/* Availability */}
      {data.availabilityItems?.length > 0 && (
        <Availability
          items={data.availabilityItems}
          text={data.availabilityText || ''}
        />
      )}

      {/* Related Stories from this venue (task 4.4 — cross-linking) */}
      {data.relatedStories?.length > 0 && (
        <section className="s-white pad">
          <div className="max">
            <RevealOnScroll className="sec-head" style={{ marginBottom: 48 }}>
              <div className="f-label">Stories from {data.venueName}</div>
              <div className="h2">Real Weddings<br /><em>At This Venue</em></div>
            </RevealOnScroll>
            <div className="journal-related">
              {data.relatedStories.slice(0, 2).map((story: any) => (
                <RevealOnScroll key={story._id}>
                  <Link href={`/journal/${story.slug.current}`} className="journal-related-card">
                    <div className="journal-related-img">
                      {story.heroImage ? (
                        <Image
                          src={urlFor(story.heroImage).width(900).height(600).url()}
                          alt={story.heroImage?.alt || `${story.coupleName} wedding`}
                          width={900}
                          height={600}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(155deg, #E8E4DE, #D2CCC4)' }} />
                      )}
                    </div>
                    <h3 className="journal-related-title">{story.coupleName}</h3>
                    <p className="journal-related-location">{story.location}</p>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Form — venue-specific, full form */}
      <ContactForm
        variant="full"
        venueHidden={true}
        venueValue={data?.venueName || ''}
      />

      <FinalCTA />
    </main>
  );
}
