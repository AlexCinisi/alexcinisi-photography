import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { client } from '@/lib/sanity/client'
import { proposalPageQuery } from '@/lib/sanity/queries'
import { urlFor, getHotspotPosition } from '@/lib/sanity/image'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import PortfolioGrid from '@/components/sections/PortfolioGrid'
import SvcHero from '@/components/sections/SvcHero'
import SvcIntro from '@/components/sections/SvcIntro'
import SvcApproach from '@/components/sections/SvcApproach'
import SvcLocations from '@/components/sections/SvcLocations'
import SvcProcess from '@/components/sections/SvcProcess'
import SvcInvestment from '@/components/sections/SvcInvestment'
import SvcRelated from '@/components/sections/SvcRelated'
import SvcCTA from '@/components/sections/SvcCTA'
import SvcFaq from '@/components/sections/SvcFaq'

// ⚠️ Nav/Footer iniettati dal root layout via <LayoutShell>.
// Design autonomo namespace .svc-* (vedi blocco CSS in globals.css): fedele al mockup,
// indipendente dalle classi del sito per evitare sovrascritture.

export const revalidate = 3600

const CANONICAL = 'https://alexcinisiphotography.com/proposal-photography-sicily'

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(proposalPageQuery).catch(() => null)
  if (!data) {
    return { alternates: { canonical: CANONICAL }, robots: { index: false, follow: true } }
  }
  const ogUrl = data.ogImage?.asset?.url || data.heroImage?.asset?.url
  const ogAlt = data.ogImage?.alt || data.heroImage?.alt || data.heroHeading || data.title
  return {
    title: data.metaTitle || data.title,
    description: data.metaDescription,
    alternates: { canonical: CANONICAL },
    openGraph: {
      title: data.metaTitle || data.title,
      description: data.metaDescription,
      url: CANONICAL,
      type: 'website',
      images: ogUrl ? [{ url: ogUrl, width: 1200, height: 630, alt: ogAlt }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.metaTitle || data.title,
      description: data.metaDescription,
      images: ogUrl ? [ogUrl] : [],
    },
  }
}

export default async function ProposalPhotographySicily() {
  const data = await client.fetch(proposalPageQuery).catch(() => null)
  if (!data) {
    return (
      <main style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
        <p>Page coming soon.</p>
      </main>
    )
  }

  const heroLines = (data.heroHeading || '').split('|').map((l: string) => l.trim()).filter(Boolean)

  return (
    <main className="svc-page">
      <SvcHero
        image={data.heroImage}
        eyebrow={data.heroEyebrow}
        headingLines={heroLines}
        subtitle={data.heroSubtitle}
        ctaText="Plan Your Proposal"
        ctaHref="/contact"
        fallbackEyebrow="Proposal Photography · Sicily"
        fallbackHeading={['Proposal Photography', 'in Sicily']}
      />

      <SvcIntro heading={data.introHeading} body={data.introBody} />

      {/* GALLERY — masonry vero riusando PortfolioGrid (coerenza col sito) */}
      {data.galleryImages?.length > 0 && (
        <PortfolioGrid
          intro={{ label: 'Portfolio', title: <>Moments, <em>As They Happened</em></> }}
          items={data.galleryImages.map((img: any) => ({
            image: img,
            coupleName: img.caption || '',
            location: '',
          }))}
          ctaText=""
          ctaLink="/contact"
        />
      )}

      <SvcApproach eyebrow="How I Work" heading={data.approachHeading} pillars={data.approachPillars} />

      <SvcLocations eyebrow="Sicily Locations" heading={data.locationsHeading} intro={data.locationsIntro} cards={data.locationCards} />

      <SvcProcess eyebrow="How It Works" heading={data.processHeading} steps={data.processSteps} />

      <SvcInvestment eyebrow="Investment" heading={data.investmentHeading} packages={data.investmentPackages} ctaText="Start the conversation →" ctaHref="/contact" />

      {/* ─── TESTIMONIALS ─── */}
      {data.testimonials?.length > 0 && (
        <section className="svc-testi">
          <div className="svc-wrap">
            {data.testimonials.map((t: any, i: number) => (
              <RevealOnScroll key={i}>
                <blockquote>
                  <q>{t.quote}</q>
                  <cite>{t.countryFlag} {t.coupleName}{t.location ? ` · ${t.location}` : ''}</cite>
                </blockquote>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      )}

      {/* ─── SEO CONTENT ─── */}
      {data.seoContent && (
        <section className="svc-seo">
          <div className="svc-wrap--narrow">
            <RevealOnScroll className="svc-body">
              <PortableText
                value={data.seoContent}
                components={{
                  types: {
                    image: ({ value }: any) => value?.asset ? (
                      <figure className="svc-seo-figure">
                        <Image
                          src={urlFor(value).width(1600).auto('format').quality(85).url()}
                          alt={value.alt || ''}
                          fill sizes="(max-width: 860px) 100vw, 740px"
                          placeholder={value.asset.metadata?.lqip ? 'blur' : 'empty'}
                          blurDataURL={value.asset.metadata?.lqip}
                          style={{ objectFit: 'cover' }}
                        />
                        {value.caption && <figcaption className="svc-seo-caption">{value.caption}</figcaption>}
                      </figure>
                    ) : null,
                  },
                }}
              />
            </RevealOnScroll>
          </div>
        </section>
      )}

      {data.faqs?.length > 0 && (
        <SvcFaq label="Questions" heading={<>Before You <em>Ask</em></>} items={data.faqs} />
      )}

      <SvcRelated eyebrow="Real Stories" heading={<>Proposals I&apos;ve <em>Witnessed</em></>} posts={data.relatedJournalPosts} />

      <SvcCTA
        eyebrow="Your Moment Awaits"
        heading={<>Let&apos;s Plan Your <em>Moment in Sicily</em></>}
        body="Tell me the location you picture, or ask me to suggest one. I reply within 24 hours, and we start building the moment together."
        ctaText="Start the conversation"
        ctaHref="/contact"
      />

      {/* ─── JSON-LD ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: `Alex Cinisi — ${data.title}`,
          url: CANONICAL,
          image: data.heroImage?.asset?.url,
          description: data.metaDescription,
          areaServed: { '@type': 'Place', name: 'Sicily, Italy' },
          provider: { '@type': 'Person', name: 'Alex Cinisi', url: 'https://alexcinisiphotography.com/about' },
        }) }}
      />
      {data.faqs?.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: data.faqs.map((f: any) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }) }}
        />
      )}
    </main>
  )
}
