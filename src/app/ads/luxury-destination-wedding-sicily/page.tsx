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

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(adsLuxuryPageQuery).catch(() => null)

  const title = data?.metaTitle || 'Luxury Destination Wedding Photography Sicily | Alex Cinisi'
  const description = data?.metaDescription || 'Editorial wedding photography for refined couples. Film & digital. Only 15 weddings per year. Based in Sicily, available worldwide.'
  
  return {
    title: {
      absolute: title,
    },
    description: description,
    robots: { index: false, follow: false },
    alternates: {
      canonical: null,
    },
    openGraph: {
      title: title,
      description: description,
      url: 'https://alexcinisiphotography.com/ads/luxury-destination-wedding-sicily',
      siteName: 'Alex Cinisi Photography',
      locale: 'en_US',
      type: 'website',
      images: data?.ogImage?.asset
        ? [{ url: urlFor(data.ogImage).width(1200).height(630).auto('format').url() }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: data?.ogImage?.asset
        ? [urlFor(data.ogImage).width(1200).height(630).auto('format').url()]
        : undefined,
    },
  }
}

export default async function LuxuryWeddingAdsPage() {
  const data = await client.fetch(adsLuxuryPageQuery).catch(() => null)

  const heroTitle = (data?.heroTitle || "Your Sicily Wedding,<br />Told Like a Film<br />You'll Never Forget").replace(/\|/g, '<br />')

  return (
    <>
      <AdsHeader ctaText={data?.heroCtaText || "Request Your Bespoke Proposal"} />

      <AdsHero
        eyebrow={data?.heroEyebrow || "Luxury Destination Wedding Photography · Sicily"}
        title={heroTitle}
        subtitle={data?.heroSubtitle || "An editorial and timeless approach for refined couples planning an extraordinary destination wedding."}
        ctaText={data?.heroCtaText || "Request Your Bespoke Proposal"}
        microText={data?.heroMicroText || "I accept only 15 destination weddings per year."}
        image={data?.heroImage}
      />

      <AdsTrustBar items={data?.trustBarItems || ADS_TRUST_BAR_WEDDING} />

      {data?.socialProofBadges && data.socialProofBadges.length > 0 && (
        <section className="ads-section-offwhite" style={{ padding: '24px 0', textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', opacity: 0.7 }}>
            {data.socialProofBadges.map((badge: any, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {badge.image?.asset && (
                   <Image src={urlFor(badge.image).height(40).auto('format').url()} alt={badge.name} width={120} height={40} style={{ objectFit: 'contain' }} />
                )}
                {!badge.image?.asset && <span style={{ fontSize: '0.9rem', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase' }}>{badge.name}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

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
          <h2 className="ads-h2" dangerouslySetInnerHTML={{ __html: (data?.experienceTitle || "A Calm, Refined &amp; <em>Intentional</em> Approach").replace(/\|/g, '<br />') }} />
          <p className="ads-section-subtitle">
            {data?.experienceSubtitle || "I believe the most meaningful images are created when couples feel comfortable, present and truly themselves."}
          </p>
          <div className="ads-pillars">
            {(data?.experiencePillars || ADS_PILLARS_WEDDING).map((p: any, i: number) => (
              <div key={i} className="ads-pillar">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {data?.galleryImages && data.galleryImages.length > 0 && (
        <section className="ads-gallery" style={{ textAlign: 'center' }}>
          <div className="ads-eyebrow"><span>Portfolio</span></div>
          <h2 className="ads-h2">
            {data.galleryTitle
              ? data.galleryTitle.split('_').map((part: string, i: number) =>
                  i % 2 === 1 ? <em key={i}>{part}</em> : part
                )
              : <>Moments That <em>Speak</em> for Themselves</>
            }
          </h2>
          <div className="ads-gallery-grid">
            {data.galleryImages.map((img: any, i: number) => (
              <div key={i} className="ads-gallery-item">
                <Image
                  src={urlFor(img).width(800).height(1067).fit('crop').crop('focalpoint').auto('format').quality(80).url()}
                  alt={img.alt || `Wedding photo ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  style={{
                    objectFit: 'cover',
                    objectPosition: img.hotspot
                      ? `${img.hotspot.x * 100}% ${img.hotspot.y * 100}%`
                      : 'center 30%',
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

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
        <p className="ads-investment-price">From {data?.investmentStartingPrice || ADS_INVESTMENT_WEDDING.startingPrice}</p>
        <p className="ads-investment-range">{data?.investmentRange || ADS_INVESTMENT_WEDDING.range}</p>
        <div className="ads-investment-divider" />
        <ul className="ads-investment-list">
          {(data?.investmentIncludes || ADS_INVESTMENT_WEDDING.includes).map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <a href="#book" className="ads-closing-cta">{data?.heroCtaText || "Request Your Bespoke Proposal"}</a>
      </section>

      {/* Testimonials */}
      <section className="ads-section-grey">
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="ads-h2">Words From <em>International Couples</em></h2>
          <div className="ads-testimonials-grid" style={{ marginTop: 48 }}>
            {(data?.testimonials || ADS_TESTIMONIALS).map((t: any, i: number) => (
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
        ctaText={data?.heroCtaText || "Request Your Bespoke Proposal"}
        headingText={data?.formHeading || "Begin Your Story"}
        descriptionText={data?.formDescription || "I accept a limited number of destination weddings each year to ensure every couple receives my full creative focus."}
        urgencyText={data?.formUrgency || "Only 4 dates remaining for Autumn 2026."}
      />

      {/* Closing */}
      <AdsClosing
        quote={data?.closingQuote || "Every 'Yes' Deserves To Be Remembered."}
        ctaText={data?.heroCtaText || "Request Your Bespoke Proposal"}
      />
    </>
  )
}
