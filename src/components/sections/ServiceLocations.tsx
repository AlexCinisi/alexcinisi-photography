import Image from 'next/image';
import Link from 'next/link';
import { urlFor, getHotspotPosition } from '@/lib/sanity/image';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface LocationCard {
  image?: { alt?: string };
  name: string;
  city?: string;
  description?: string;
  locationPageRef?: { slug?: string } | null;
}

interface ServiceLocationsProps {
  label?: string;
  heading?: React.ReactNode;
  intro?: string;
  cards: LocationCard[];
  background?: 'pearl' | 'white';
}

/**
 * Sezione location modulare. Card con immagine in fill, link automatico
 * alla location page quando locationPageRef è presente. Testi via props.
 */
export default function ServiceLocations({
  label = 'Sicily Locations',
  heading,
  intro,
  cards,
  background = 'white',
}: ServiceLocationsProps) {
  if (!cards?.length) return null;

  return (
    <section className={`s-${background} pad`}>
      <div className="max">
        <RevealOnScroll className="sec-head">
          {label && <div className="f-label">{label}</div>}
          {heading && <div className="h2-lg">{heading}</div>}
          {intro && <p className="sec-intro-text">{intro}</p>}
        </RevealOnScroll>
        <RevealOnScroll className="service-location-grid">
          {cards.map((loc, i) => {
            const inner = (
              <>
                {loc.image && (
                  <div className="service-location-img">
                    <Image
                      src={urlFor(loc.image).width(1200).quality(85).auto('format').url()}
                      alt={loc.image.alt || loc.name || ''}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover', objectPosition: getHotspotPosition(loc.image) }}
                    />
                  </div>
                )}
                <h3>{loc.name}</h3>
                {loc.city && <span className="service-location-city">{loc.city}</span>}
                {loc.description && <p>{loc.description}</p>}
              </>
            );
            return loc.locationPageRef?.slug ? (
              <Link key={i} href={`/locations/${loc.locationPageRef.slug}`} className="service-location-card">
                {inner}
              </Link>
            ) : (
              <div key={i} className="service-location-card">{inner}</div>
            );
          })}
        </RevealOnScroll>
      </div>
    </section>
  );
}
