import Image from 'next/image'
import Link from 'next/link'
import { urlFor, getHotspotPosition } from '@/lib/sanity/image'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

interface SvcLocationCard { image?: any; name?: string; city?: string; description?: string; locationPageRef?: { slug?: string } }
interface SvcLocationsProps { eyebrow?: string; heading?: string; intro?: string; cards?: SvcLocationCard[] }

export default function SvcLocations({ eyebrow = 'Sicily Locations', heading, intro, cards }: SvcLocationsProps) {
  if (!cards?.length) return null
  return (
    <section className="svc-locations">
      <div className="svc-wrap">
        <RevealOnScroll>
          <div className="svc-eyebrow" style={{ textAlign: 'center' }}>{eyebrow}</div>
          <div className="svc-h2" style={{ textAlign: 'center' }}>{heading || 'Where Will You Ask the Question?'}</div>
          {intro && <p className="svc-loc-intro">{intro}</p>}
        </RevealOnScroll>
        <RevealOnScroll className="svc-loc-grid">
          {cards.map((loc, i) => {
            const inner = (
              <>
                {loc.image?.asset && (
                  <div className="svc-loc-img">
                    <Image
                      src={urlFor(loc.image).width(1000).auto('format').quality(85).url()}
                      alt={loc.image.alt || loc.name || ''}
                      fill sizes="(max-width: 860px) 100vw, 33vw"
                      style={{ objectFit: 'cover', objectPosition: getHotspotPosition(loc.image) }}
                    />
                  </div>
                )}
                <div className="svc-loc-body">
                  <h3>{loc.name}</h3>
                  {loc.city && <span className="svc-loc-city">{loc.city}</span>}
                  {loc.description && <p>{loc.description}</p>}
                </div>
              </>
            )
            return loc.locationPageRef?.slug ? (
              <Link key={i} href={`/locations/${loc.locationPageRef.slug}`} className="svc-loc-card">{inner}</Link>
            ) : (
              <div key={i} className="svc-loc-card">{inner}</div>
            )
          })}
        </RevealOnScroll>
      </div>
    </section>
  )
}
