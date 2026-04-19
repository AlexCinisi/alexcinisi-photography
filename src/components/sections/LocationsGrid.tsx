import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface LocationItem {
  _id: string;
  venueName: string;
  city: string;
  slug: { current: string };
  homepageDescription?: string;
  heroImage?: any;
}

interface LocationsGridProps {
  locations?: LocationItem[] | null;
}

// Fallback hardcoded (usato se Sanity non ha dati con showOnHomepage)
const FALLBACK_LOCATIONS = [
  {
    city: 'Palermo',
    venues: 'Villa Igiea · Villa Niscemi · Villa Valguarnera · Palazzo Chiaramonte · Palazzo Butera',
    href: '/locations/wedding-photographer-palermo',
    linkText: 'Explore Palermo Weddings',
  },
  {
    city: 'Taormina',
    venues: 'Belmond Grand Hotel Timeo · San Domenico Palace · Villa Comunale · Teatro Antico',
    href: '/locations/wedding-photographer-taormina',
    linkText: 'Explore Taormina Weddings',
  },
  {
    city: 'Scopello',
    venues: 'Tonnara di Scopello · Borgo di Scopello · Zingaro Nature Reserve',
    href: '/locations/tonnara-di-scopello-wedding',
    linkText: 'Explore Scopello Weddings',
  },
  {
    city: 'Noto',
    venues: 'Palazzo Nicolaci · Cattedrale di Noto · Villa Anna · Baroque Palazzi',
    href: '/locations/wedding-photographer-noto',
    linkText: 'Explore Noto Weddings',
  },
  {
    city: 'Villa Igiea',
    venues: "Rocco Forte's iconic Art Nouveau palazzo on the Gulf of Palermo. A world-class setting.",
    href: '/locations/villa-igiea-wedding-photographer',
    linkText: 'Explore Villa Igiea Weddings',
  },
];

export default function LocationsGrid({ locations }: LocationsGridProps) {
  const hasSanityData = locations && locations.length > 0;

  return (
    <section className="s-white pad" id="locations">
      <div className="max">
        <RevealOnScroll className="sec-head center">
          <div className="f-label">Wedding Venues</div>
          <div className="h2-lg">Luxury Venues Across<br /><em>Sicily &amp; Italy</em></div>
          <p style={{ fontSize: '.88rem', color: 'var(--charcoal)', lineHeight: 1.85, maxWidth: 560, margin: '8px auto 0' }}>
            From Palermo&apos;s Art Nouveau palazzi to Taormina&apos;s cliffside terraces and Noto&apos;s baroque splendour — I know every corner of this island intimately.
          </p>
        </RevealOnScroll>
      </div>

      <RevealOnScroll className="loc-grid d1">
        {hasSanityData ? (
          <>
            {/* Card dinamiche da Sanity */}
            {locations.map((loc) => (
              <Link
                key={loc._id}
                href={`/locations/${loc.slug.current}`}
                className="loc-card"
              >
                {/* Immagine di sfondo se presente */}
                {loc.heroImage && (
                  <div className="loc-card-bg">
                    <Image
                      src={urlFor(loc.heroImage)
                        .fit('crop')
                        .crop('focalpoint')
                        .width(800)
                        .height(600)
                        .quality(80)
                        .auto('format')
                        .url()}
                      alt={loc.heroImage.alt || `${loc.venueName} wedding venue`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="loc-card-overlay" />
                  </div>
                )}
                <div className="loc-card-city">{loc.venueName}</div>
                <div className="loc-card-venues">
                  {loc.homepageDescription || `${loc.city}, Sicily`}
                </div>
                <div className="loc-card-link">
                  Explore {loc.venueName} Weddings
                </div>

              </Link>
            ))}

            {/* Card "Worldwide" fissa — sempre l'ultima */}
            <Link href="/journal" className="loc-card" style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              alignItems: 'center', textAlign: 'center', background: 'var(--ink)'
            }}>
              <div className="loc-card-city" style={{ color: 'var(--off-white)' }}>Worldwide</div>
              <div className="loc-card-venues" style={{ color: 'rgba(250,250,248,.45)' }}>
                Italy · Europe · Destination weddings across 15+ countries
              </div>
              <div className="loc-card-link" style={{ color: 'var(--accent)', justifyContent: 'center' }}>
                View All Stories
              </div>
            </Link>
          </>
        ) : (
          <>
            {/* Fallback hardcoded — usato quando nessuna location ha showOnHomepage=true */}
            {FALLBACK_LOCATIONS.map((loc) => (
              <Link key={loc.city} href={loc.href} className="loc-card">
                <div className="loc-card-city">{loc.city}</div>
                <div className="loc-card-venues">{loc.venues}</div>
                <div className="loc-card-link">{loc.linkText}</div>
              </Link>
            ))}
            <Link href="/journal" className="loc-card" style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              alignItems: 'center', textAlign: 'center', background: 'var(--ink)'
            }}>
              <div className="loc-card-city" style={{ color: 'var(--off-white)' }}>Worldwide</div>
              <div className="loc-card-venues" style={{ color: 'rgba(250,250,248,.45)' }}>
                Italy · Europe · Destination weddings across 15+ countries
              </div>
              <div className="loc-card-link" style={{ color: 'var(--accent)', justifyContent: 'center' }}>
                View All Stories
              </div>
            </Link>
          </>
        )}
      </RevealOnScroll>
    </section>
  );
}
