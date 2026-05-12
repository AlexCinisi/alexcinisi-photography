import type { Metadata } from 'next'
import Image from 'next/image'
import AdsHeader from '@/components/ads/AdsHeader'
import AdsHero from '@/components/ads/AdsHero'
import AdsTrustBar from '@/components/ads/AdsTrustBar'
import AdsForm from '@/components/ads/AdsForm'
import AdsClosing from '@/components/ads/AdsClosing'
import { client } from '@/lib/sanity/client'
import { adsLuxuryPageQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import {
  ADS_TRUST_BAR_WEDDING,
  ADS_TESTIMONIALS,
  ADS_INVESTMENT_WEDDING,
  ADS_PILLARS_WEDDING,
} from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Luxury Destination Wedding Photography Sicily | Alex Cinisi',
  description: 'Editorial wedding photography for refined couples. Film & digital. Only 15 weddings per year. Based in Sicily, available worldwide.',
  robots: { index: false, follow: false },
}

export default async function LuxuryWeddingAdsPage() {
  const data = await client.fetch(adsLuxuryPageQuery).catch(() => null)

  return (
    <>
      <AdsHeader ctaText="Request Your Bespoke Proposal" />

      <AdsHero
        eyebrow="Luxury Destination Wedding Photography · Sicily"
        title="Your Sicily Wedding,<br />Told Like a Film<br />You'll Never Forget"
        subtitle="An editorial and timeless approach for refined couples planning an extraordinary destination wedding."
        ctaText="Request Your Bespoke Proposal"
        microText="I accept only 15 destination weddings per year."
        image={data?.heroImage}
      />

      <AdsTrustBar items={ADS_TRUST_BAR_WEDDING} />

      {/* Selected Work */}
      <section className="ads-section" style={{ textAlign: 'center' }}>
        <div className="ads-eyebrow"><span>Selected Work</span></div>
        <h2 className="ads-h2">A Curated Selection of <em>Destination Weddings</em></h2>
        <div className="ads-images-row">
          {(data?.selectedWork && data.selectedWork.length > 0)
            ? data.selectedWork.map((img: any, i: number) => (
                <div key={i}>
                  <div className="ads-image-placeholder" style={{ position: 'relative' }}>
                    <Image
                      src={urlFor(img).width(600).height(800).auto('format').quality(80).url()}
                      alt={img.alt || `Wedding photo ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{
                        objectFit: 'cover',
                        objectPosition: img.hotspot
                          ? `${img.hotspot.x * 100}% ${img.hotspot.y * 100}%`
                          : '50% 50%',
                      }}
                    />
                  </div>
                  {img.caption && <p className="ads-image-caption">{img.caption}</p>}
                </div>
              ))
            : <>
                <div>
                  <div className="ads-image-placeholder">Photo 1</div>
                  <p className="ads-image-caption">Marina &amp; James · Villa Valguarnera, Bagheria</p>
                </div>
                <div>
                  <div className="ads-image-placeholder">Photo 2</div>
                  <p className="ads-image-caption">Sophie &amp; David · Taormina, Full Day</p>
                </div>
                <div>
                  <div className="ads-image-placeholder">Photo 3</div>
                  <p className="ads-image-caption">Lucia &amp; Marco · Tonnara di Scopello</p>
                </div>
              </>
          }
        </div>
      </section>

      {/* The Experience — dark section with 3 pillars */}
      <section className="ads-section-dark">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 className="ads-h2">A Calm, Refined &amp; <em>Intentional</em> Approach</h2>
          <p className="ads-section-subtitle">
            I believe the most meaningful images are created when couples feel comfortable, present and truly themselves.
          </p>
          <div className="ads-pillars">
            {ADS_PILLARS_WEDDING.map((p, i) => (
              <div key={i} className="ads-pillar">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Film Photography */}
      <section className="ads-section-offwhite" style={{ textAlign: 'center' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="ads-eyebrow"><span>Film Photography</span></div>
          <h2 className="ads-h2">A Tangible Layer of <em>Storytelling</em></h2>
          <p className="ads-section-subtitle">
            Organic grain, timeless tones, and cinematic texture. Film frames that breathe heritage into your wedding&apos;s visual narrative.
          </p>
          <div className="ads-images-row">
            {(data?.filmImages && data.filmImages.length > 0)
              ? data.filmImages.map((img: any, i: number) => (
                  <div key={i} className="ads-image-placeholder film-tone" style={{ position: 'relative' }}>
                    <Image
                      src={urlFor(img).width(600).height(750).auto('format').quality(80).url()}
                      alt={img.alt || `Film photo ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{
                        objectFit: 'cover',
                        objectPosition: img.hotspot
                          ? `${img.hotspot.x * 100}% ${img.hotspot.y * 100}%`
                          : '50% 50%',
                      }}
                    />
                  </div>
                ))
              : <>
                  <div className="ads-image-placeholder film-tone">Film 1</div>
                  <div className="ads-image-placeholder film-tone">Film 2</div>
                  <div className="ads-image-placeholder film-tone">Film 3</div>
                </>
            }
          </div>
          <p style={{ fontWeight: 300, fontSize: '.8rem', color: 'var(--mid)', marginTop: 20 }}>
            Film frames can be included within your bespoke proposal.
          </p>
        </div>
      </section>

      {/* Investment */}
      <section className="ads-section" style={{ textAlign: 'center' }}>
        <div className="ads-eyebrow"><span>Your Investment</span></div>
        <h2 className="ads-h2">Transparent Pricing for <em>Refined Couples</em></h2>
        <p className="ads-investment-price">From {ADS_INVESTMENT_WEDDING.startingPrice}</p>
        <p className="ads-investment-range">{ADS_INVESTMENT_WEDDING.range}</p>
        <div className="ads-investment-divider" />
        <ul className="ads-investment-list">
          {ADS_INVESTMENT_WEDDING.includes.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <a href="#book" className="ads-closing-cta">Request Your Bespoke Proposal</a>
      </section>

      {/* Testimonials */}
      <section className="ads-section-grey">
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="ads-h2">Words From <em>International Couples</em></h2>
          <div className="ads-testimonials-grid" style={{ marginTop: 48 }}>
            {ADS_TESTIMONIALS.map((t, i) => (
              <div key={i} className="ads-testimonial-card">
                <div className="ads-testimonial-stars">★★★★★</div>
                <p className="ads-testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                <p className="ads-testimonial-author">{t.flag} {t.author}</p>
                <p className="ads-testimonial-location">{t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <AdsForm
        source="google-ads-luxury"
        ctaText="Request Your Bespoke Proposal"
      />

      {/* Closing */}
      <AdsClosing
        quote="Every 'Yes' Deserves To Be Remembered."
        ctaText="Request Your Bespoke Proposal"
      />
    </>
  )
}
