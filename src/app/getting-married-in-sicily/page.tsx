import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { client } from '@/lib/sanity/client'
import { guidePageQuery } from '@/lib/sanity/queries'
import { urlFor, getHotspotPosition } from '@/lib/sanity/image'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SvcHero from '@/components/sections/SvcHero'
import SvcFaq from '@/components/sections/SvcFaq'
import SvcRelated from '@/components/sections/SvcRelated'
import SvcCTA from '@/components/sections/SvcCTA'
import GuideIntro from '@/components/sections/GuideIntro'
import GuideDecision from '@/components/sections/GuideDecision'
import GuideLegal from '@/components/sections/GuideLegal'
import GuideLight from '@/components/sections/GuideLight'
import GuideRegions from '@/components/sections/GuideRegions'
import GuideTimeline from '@/components/sections/GuideTimeline'

// ⚠️ Nav/Footer iniettati dal root layout via <LayoutShell>.
// Riusa namespace .svc-* + componenti Guide* (vedi blocco CSS in globals.css).

export const revalidate = 3600

const CANONICAL = 'https://alexcinisiphotography.com/getting-married-in-sicily'

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(guidePageQuery).catch(() => null)
  if (!data) {
    return { alternates: { canonical: CANONICAL }, robots: { index: false, follow: true } }
  }
  const ogUrl = data.ogImage?.asset?.url || data.heroImage?.asset?.url
  const ogAlt = data.heroImage?.alt || data.heroHeading || data.title
  return {
    title: data.metaTitle || data.title,
    description: data.metaDescription,
    alternates: { canonical: CANONICAL },
    openGraph: {
      title: data.metaTitle || data.title,
      description: data.metaDescription,
      url: CANONICAL,
      type: 'article',
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

export default async function GettingMarriedInSicily() {
  const data = await client.fetch(guidePageQuery).catch(() => null)
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
        ctaText="Talk to Me About Your Date"
        ctaHref="/contact"
        fallbackEyebrow="A Photographer's Practical Guide"
        fallbackHeading={['Getting Married in Sicily', 'The Practical Guide']}
      />

      {data.introBody && (
        <GuideIntro
          eyebrow={data.lastReviewed ? `Last reviewed: ${data.lastReviewed}` : undefined}
          body={data.introBody}
        />
      )}

      {data.decisionPaths?.length > 0 && (
        <GuideDecision heading={data.decisionHeading} intro={data.decisionIntro} paths={data.decisionPaths} />
      )}

      {data.legalRows?.length > 0 && (
        <GuideLegal heading={data.legalHeading} rows={data.legalRows} disclaimer={data.legalDisclaimer} />
      )}

      {data.lightHeading && (
        <GuideLight
          eyebrow={data.lightEyebrow}
          heading={data.lightHeading}
          image={data.lightImage}
          body={data.lightBody}
          pullquote={data.lightPullquote}
        />
      )}

      {data.regionCards?.length > 0 && (
        <GuideRegions heading={data.regionsHeading} intro={data.regionsIntro} cards={data.regionCards} />
      )}

      {data.timelineSteps?.length > 0 && (
        <GuideTimeline heading={data.timelineHeading} steps={data.timelineSteps} />
      )}

      {data.faqs?.length > 0 && (
        <SvcFaq label="Questions" heading={<>Questions Couples <em>Actually Ask</em></>} items={data.faqs} />
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

      {data.relatedJournalPosts?.length > 0 && (
        <SvcRelated eyebrow="Real Stories" heading={<>Weddings I&apos;ve <em>Photographed Here</em></>} posts={data.relatedJournalPosts} />
      )}

      <SvcCTA
        eyebrow="Your Sicily Wedding"
        heading={<>Let&apos;s Talk About <em>Your Date</em></>}
        body="Tell me your venue and month, or ask me to suggest one. I reply personally within 24 hours."
        ctaText="Write to me"
        ctaHref="/contact"
      />

      {/* ─── JSON-LD ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.metaTitle || data.title,
          description: data.metaDescription,
          image: data.heroImage?.asset?.url,
          author: { '@type': 'Person', name: 'Alex Cinisi', url: 'https://alexcinisiphotography.com/about' },
          publisher: { '@type': 'Organization', name: 'Alex Cinisi Photography' },
          mainEntityOfPage: CANONICAL,
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
