import type { Metadata } from 'next'
import Image from 'next/image'
import AdsHeader from '@/components/ads/AdsHeader'
import AdsHero from '@/components/ads/AdsHero'
import AdsTrustBar from '@/components/ads/AdsTrustBar'
import AdsForm from '@/components/ads/AdsForm'
import AdsClosing from '@/components/ads/AdsClosing'
import { client } from '@/lib/sanity/client'
import { adsProposalPageQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import {
  ADS_TRUST_BAR_PROPOSAL,
  ADS_INVESTMENT_PROPOSAL,
  ADS_PILLARS_PROPOSAL,
  ADS_LOCATIONS_PROPOSAL,
  ADS_HOW_IT_WORKS,
  ADS_TESTIMONIALS,
} from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Proposal & Elopement Photography Sicily | Alex Cinisi',
  description: 'Intimate proposal and elopement photography in Sicily. Valley of the Temples, Scopello, Taormina. Film & digital. Every moment captured naturally.',
  robots: { index: false, follow: false },
}

export default async function ProposalAdsPage() {
  const data = await client.fetch(adsProposalPageQuery).catch(() => null)

  return (
    <>
      <AdsHeader ctaText="Plan Your Proposal" />

      <AdsHero
        eyebrow="Proposal & Elopement Photography · Sicily"
        title="The Most Important Question<br />Deserves the Most<br />Beautiful Setting"
        subtitle="Intimate, cinematic proposal and elopement photography across Sicily's most iconic locations."
        ctaText="Plan Your Proposal"
        microText="Every session is tailored to your story."
        image={data?.heroImage}
      />

      <AdsTrustBar items={ADS_TRUST_BAR_PROPOSAL} />

      {/* Sicily Locations */}
      <section className="ads-section" style={{ textAlign: 'center' }}>
        <div className="ads-eyebrow"><span>Sicily Locations</span></div>
        <h2 className="ads-h2">Where Will You Ask <em>the Question?</em></h2>
        <div className="ads-location-cards">
          {ADS_LOCATIONS_PROPOSAL.map((loc, i) => (
            <div key={i} className="ads-location-card">
              <div className="ads-location-card-image" style={{ position: 'relative' }}>
                {data?.locationImages?.[i]?.asset ? (
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
          <h2 className="ads-h2">An Intimate, <em>Natural</em> Approach</h2>
          <p className="ads-section-subtitle">
            No scripts, no awkward posing. Just real emotion, captured with cinematic sensitivity.
          </p>
          <div className="ads-pillars">
            {ADS_PILLARS_PROPOSAL.map((p, i) => (
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
          {ADS_HOW_IT_WORKS.map((s, i) => (
            <div key={i} className="ads-step">
              <div className="ads-step-number">{s.step}</div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Investment — dual pricing */}
      <section className="ads-section-grey" style={{ textAlign: 'center' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="ads-eyebrow"><span>Your Investment</span></div>
          <h2 className="ads-h2">Transparent Pricing for <em>Your Moment</em></h2>
          <div className="ads-investment-dual" style={{ marginTop: 40 }}>
            <div className="ads-investment-dual-item">
              <h3>Proposals</h3>
              <p className="price">From {ADS_INVESTMENT_PROPOSAL.proposalPrice}</p>
            </div>
            <div className="ads-investment-dual-item">
              <h3>Elopements</h3>
              <p className="price">From {ADS_INVESTMENT_PROPOSAL.elopementPrice}</p>
            </div>
          </div>
          <div className="ads-investment-divider" />
          <ul className="ads-investment-list">
            {ADS_INVESTMENT_PROPOSAL.includes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p style={{ fontWeight: 300, fontSize: '.9rem', color: 'var(--mid)', marginTop: 24 }}>
            Optional: {ADS_INVESTMENT_PROPOSAL.optionals.join(' · ')}
          </p>
          <div style={{ marginTop: 32 }}>
            <a href="#book" className="ads-closing-cta">Plan Your Proposal</a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="ads-section">
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="ads-h2">Words From <em>Happy Couples</em></h2>
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

      {/* Form — customized for proposals */}
      <AdsForm
        source="google-ads-proposal"
        ctaText="Plan Your Proposal"
        dateLabel="Proposed Date"
        datePlaceholder="Month 2026 · or 'Flexible'"
        locationLabel="Preferred Location"
        locationPlaceholder="e.g. Valley of the Temples, or 'Help me choose'"
        visionLabel="Tell me about your vision"
        visionPlaceholder="Is it a surprise? What's the story?"
        headingText="Plan Your Perfect Moment"
        descriptionText="Every proposal and elopement I photograph is unique. Share your vision and I'll help you create an unforgettable experience."
        urgencyText="Summer & Autumn 2026 — limited dates available."
        reassuranceItems={[
          '✓ Personal response within 24 hours',
          '✓ No obligation',
          '✓ I help with location scouting',
        ]}
      />

      {/* Closing */}
      <AdsClosing
        quote="She Said Yes — And You'll Have the Photographs to Prove It."
        ctaText="Plan Your Proposal"
      />
    </>
  )
}
