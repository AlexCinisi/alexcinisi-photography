import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { allLocationsQuery } from '@/lib/sanity/queries';
import Breadcrumb from '@/components/sections/Breadcrumb';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import FinalCTA from '@/components/sections/FinalCTA';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Wedding Venues in Sicily — Destination Wedding Photography',
  description: 'Discover Sicily\'s most stunning wedding venues — Villa Igiea, Taormina, Scopello, Noto. Editorial photography for refined destination weddings.',
  alternates: { canonical: '/locations' },
};

export default async function LocationsHubPage() {
  const locations = await client.fetch(allLocationsQuery);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://alexcinisiphotography.com" },
      { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://alexcinisiphotography.com/locations" }
    ]
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Locations' }
      ]} />

      <section className="s-white" style={{ paddingTop: 0 }}>
        <div className="max pad">
          <RevealOnScroll>
            <div className="f-label">Locations</div>
            <h1 className="h2-lg" style={{ marginBottom: 16 }}>
              Luxury Venues Across<br /><em>Sicily &amp; Italy</em>
            </h1>
            <p style={{ fontSize: '.88rem', color: 'var(--charcoal)', maxWidth: 520, lineHeight: 1.85 }}>
              Every venue tells a different story. Explore the locations where I photograph most frequently — each with its own light, history, and possibilities.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="s-white pad">
        <div className="max">
          {(!locations || locations.length === 0) ? (
            <p style={{ textAlign: 'center', color: 'var(--mid)', fontSize: '.88rem', padding: '80px 0' }}>
              Location pages coming soon.
            </p>
          ) : (
            <div className="locations-hub-grid">
              {locations.map((loc: any, i: number) => (
                <RevealOnScroll key={loc._id} className={i % 2 === 1 ? 'd1' : ''}>
                  <Link href={`/locations/${loc.slug.current}`} className="location-hub-card">
                    <div className="location-hub-img">
                      {loc.heroImage ? (
                        <Image
                          src={urlFor(loc.heroImage).width(800).height(1000).url()}
                          alt={loc.heroImage?.alt || `${loc.venueName} wedding venue`}
                          width={800}
                          height={1000}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(155deg, #E8E4DE, #D2CCC4)' }} />
                      )}
                    </div>
                    <div className="location-hub-info">
                      <h2>{loc.venueName}</h2>
                      <p>{loc.city}{loc.region ? `, ${loc.region}` : ''}</p>
                    </div>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
