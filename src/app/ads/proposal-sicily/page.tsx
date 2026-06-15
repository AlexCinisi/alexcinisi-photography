import type { Metadata } from 'next'
import Image from 'next/image'
import AdsHeader from '@/components/ads/AdsHeader'
import AdsHero from '@/components/ads/AdsHero'
import AdsTrustBar from '@/components/ads/AdsTrustBar'
import AdsForm from '@/components/ads/AdsForm'
import AdsClosing from '@/components/ads/AdsClosing'
import AdsWhatsApp from '@/components/ads/AdsWhatsApp'
import { client } from '@/lib/sanity/client'
import { adsProposalPageQuery, siteLogoQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import {
  ADS_TRUST_BAR_PROPOSAL,
  ADS_INVESTMENT_PROPOSAL,
  ADS_PILLARS_PROPOSAL,
  ADS_LOCATIONS_PROPOSAL,
  ADS_HOW_IT_WORKS,
  ADS_TESTIMONIALS,
} from '@/lib/constants'

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(adsProposalPageQuery).catch(() => null)

  const title = data?.metaTitle || 'Proposal & Elopement Photography Sicily | Alex Cinisi'
  const description = data?.metaDescription || 'Intimate proposal and elopement photography in Sicily. Valley of the Temples, Scopello, Taormina. Film & digital. Every moment captured naturally.'
  
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
      url: 'https://alexcinisiphotography.com/ads/proposal-sicily',
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

export default async function ProposalAdsPage() {
  const [data, siteData] = await Promise.all([
    client.fetch(adsProposalPageQuery).catch(() => null),
    client.fetch(siteLogoQuery).catch(() => null),
  ])

  const logoUrl = siteData?.siteLogo?.asset?.url || ''

  const heroTitle = (data?.heroTitle || "The Most Important Question<br />Deserves the Most<br />Beautiful Setting").replace(/\|/g, '<br />')

  return (
    <>
      <AdsHeader ctaText={data?.heroCtaText || "Plan Your Proposal"} logoUrl={logoUrl} />

      <AdsHero
        eyebrow={data?.heroEyebrow || "Proposal & Elopement Photography · Sicily"}
        title={heroTitle}
        subtitle={data?.heroSubtitle || "Intimate, cinematic proposal and elopement photography across Sicily's most iconic locations."}
        ctaText={data?.heroCtaText || "Plan Your Proposal"}
        microText={data?.heroMicroText || "Every session is tailored to your story."}
        image={data?.heroImage}
        secondaryCta={<AdsWhatsApp label="WhatsApp Me" />}
      />

      <AdsTrustBar items={data?.trustBarItems || ADS_TRUST_BAR_PROPOSAL} />

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

      {/* Sicily Locations */}
      <section className="ads-section" style={{ textAlign: 'center' }}>
        <div className="ads-eyebrow"><span>Sicily Locations</span></div>
        <h2 className="ads-h2">Where Will You Ask <em>the Question?</em></h2>
        <div className="ads-location-cards">
          {(data?.locationCards || ADS_LOCATIONS_PROPOSAL).map((loc: any, i: number) => (
            <div key={i} className="ads-location-card">
              <div className="ads-location-card-image" style={{ position: 'relative' }}>
                {loc?.image?.asset ? (
                  <Image
                    src={urlFor(loc.image).width(600).height(750).auto('format').quality(80).url()}
                    alt={loc.image.alt || `${loc.name}, ${loc.city}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                ) : data?.locationImages?.[i]?.asset ? (
                  <Image
                    src={urlFor(data.locationImages[i]).width(600).height(750).auto('format').quality(80).url()}
                    alt={data.locationImages[i].alt || `${loc.name}, ${loc.city}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  loc.name
                )}
              </div>
              <h3>{loc.name}, {loc.city}</h3>
              <p>{loc.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Experience — dark section with 3 pillars */}
      <section className="ads-section-dark">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 className="ads-h2" dangerouslySetInnerHTML={{ __html: (data?.experienceTitle || "An Intimate, <em>Natural</em> Approach").replace(/\|/g, '<br />') }} />
          <p className="ads-section-subtitle">
            {data?.experienceSubtitle || "No scripts, no awkward posing. Just real emotion, captured with cinematic sensitivity."}
          </p>
          <div className="ads-pillars">
            {(data?.experiencePillars || ADS_PILLARS_PROPOSAL).map((p: any, i: number) => (
              <div key={i} className="ads-pillar">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — 3 steps */}
      <section className="ads-section" style={{ textAlign: 'center' }}>
        <div className="ads-eyebrow"><span>How It Works</span></div>
        <h2 className="ads-h2">Three Simple <em>Steps</em></h2>
        <div className="ads-steps" style={{ marginTop: 48 }}>
          {(data?.howItWorks || ADS_HOW_IT_WORKS).map((s: any, i: number) => (
            <div key={i} className="ads-step">
              <div className="ads-step-number">{s.step}</div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
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
              : <>Every Proposal Tells a <em>Story</em></>
            }
          </h2>
          <div className="ads-gallery-grid">
            {data.galleryImages.map((img: any, i: number) => (
              <div key={i} className="ads-gallery-item">
                <Image
                  src={urlFor(img).width(800).height(1067).fit('crop').crop('focalpoint').auto('format').quality(80).url()}
                  alt={img.alt || `Proposal photo ${i + 1}`}
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

      {/* Investment */}
      <section className="ads-section-grey" style={{ textAlign: 'center' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="ads-eyebrow"><span>Your Investment</span></div>
          <h2 className="ads-h2">Transparent Pricing for <em>Your Moment</em></h2>
          <div className="ads-packages">
            {(data?.investmentPackages || ADS_INVESTMENT_PROPOSAL.packages).map((pkg: any, i: number) => (
              <div key={i} className={`ads-package-card ${pkg.featured ? 'featured' : ''}`}>
                {pkg.featured && <div className="ads-package-badge">Most Popular</div>}
                <h3 className="ads-package-name">{pkg.name}</h3>
                {pkg.tagline && <p className="ads-package-tagline">{pkg.tagline}</p>}
                <p className="ads-package-price">{pkg.price}</p>
                <ul className="ads-package-list">
                  {pkg.includes?.map((item: string, j: number) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <a href="#book" className="ads-closing-cta">Plan Your Proposal</a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="ads-section">
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="ads-h2">Words From <em>Happy Couples</em></h2>
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

      {/* Form — customized for proposals */}
      <AdsForm
        source="proposal-sicily"
        ctaText="Plan Your Moment"
        serviceOptions={['Proposal', 'Elopement', 'Couple Session']}
        showWhatsApp={true}
        headingText="Let's Plan Your Moment in Sicily"
        descriptionText="Whether it's a surprise proposal, an intimate elopement, or a couple session, every shoot is shaped around your story and the place you choose."
        urgencyText={data?.formUrgency || "Summer & Autumn 2026 — limited dates available."}
        dateLabel="Preferred Date"
        datePlaceholder="Month 2026 · or 'Flexible'"
        locationLabel="Where in Sicily?"
        locationPlaceholder="e.g. Valley of the Temples, or 'Help me choose'"
        visionLabel="Tell me about your moment"
        visionPlaceholder="Is it a surprise? How did you meet? What are you imagining?"
        reassuranceItems={[
          '✓ Personal reply within 24 hours',
          '✓ I help you choose the perfect location',
          '✓ Sneak peek within 48 hours',
        ]}
      />

      {/* Closing */}
      <AdsClosing
        quote={data?.closingQuote || "They Said Yes — And You'll Have the Photographs to Prove It."}
        ctaText={data?.heroCtaText || "Plan Your Proposal"}
      />
    </>
  )
}
