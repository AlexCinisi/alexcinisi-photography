import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { client } from '@/lib/sanity/client'
import { proposalPageQuery } from '@/lib/sanity/queries'
import { urlFor, getHotspotPosition } from '@/lib/sanity/image'

// Componenti di sezione MODULARI (riutilizzabili su tutte le service page).
import ServiceHero from '@/components/sections/ServiceHero'
import ServiceGallery from '@/components/sections/ServiceGallery'
import ServiceLocations from '@/components/sections/ServiceLocations'
import ServiceInvestment from '@/components/sections/ServiceInvestment'
import ServiceFAQ from '@/components/sections/ServiceFAQ'
// Componenti esistenti del sito con contenuto via props (già modulari).
import Pillars from '@/components/sections/Pillars'
import Testimonials from '@/components/sections/Testimonials'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

// ⚠️ Nav/Footer iniettati dal root layout via <LayoutShell> (route non-/ads).

export const revalidate = 3600

const CANONICAL = 'https://alexcinisiphotography.com/proposal-photography-sicily'

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(proposalPageQuery).catch(() => null)
  if (!data) {
    return {
      alternates: { canonical: CANONICAL },
      robots: { index: false, follow: true },
    }
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

  const pillarItems = (data.approachPillars || []).map((p: any, i: number) => ({
    number: String(i + 1).padStart(2, '0'),
    title: p.title,
    description: p.description,
    quote: '',
    quoteAuthor: '',
  }))

  return (
    <main>
      {/* HERO */}
      <ServiceHero
        image={data.heroImage}
        eyebrow={data.heroEyebrow || 'Proposal Photography · Sicily'}
        titleLines={heroLines.length ? heroLines : ['Proposal Photography', 'in Sicily']}
        subtitle={data.heroSubtitle}
        ctaText="Plan Your Proposal"
        ctaHref="/contact"
        darkText={data.heroTextDark || false}
      />

      {/* INTRO (rich text) */}
      {data.introBody && (
        <section className="s-white pad">
          <div className="max">
            <RevealOnScroll className="sec-head">
              {data.introHeading && <div className="h2">{data.introHeading}</div>}
            </RevealOnScroll>
            <RevealOnScroll className="journal-body" style={{ maxWidth: '720px', margin: '0 auto' }}>
              <PortableText value={data.introBody} />
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* GALLERY */}
      <ServiceGallery
        label="Portfolio"
        heading={<>Moments, <em>As They Happened</em></>}
        images={data.galleryImages || []}
        background="pearl"
      />

      {/* APPROACH (componente Pillars esistente, già modulare) */}
      {pillarItems.length > 0 && (
        <Pillars
          intro={{ label: 'How I Work', title: data.approachHeading || 'Three Things I Promise You' }}
          items={pillarItems}
        />
      )}

      {/* LOCATIONS */}
      <ServiceLocations
        label="Sicily Locations"
        heading={data.locationsHeading || 'Where Will You Ask the Question?'}
        intro={data.locationsIntro}
        cards={data.locationCards || []}
        background="white"
      />

      {/* PROCESS (inline: replica process-grid del sito, dati da Sanity) */}
      {data.processSteps?.length > 0 && (
        <section className="s-pearl pad">
          <div className="max">
            <RevealOnScroll className="sec-head">
              <div className="f-label">How It Works</div>
              <div className="h2-lg">{data.processHeading || 'From First Message to Final Gallery'}</div>
            </RevealOnScroll>
            <RevealOnScroll className="process-grid d1">
              {data.processSteps.map((s: any, i: number) => (
                <div key={i} className="step">
                  <span className="step-n">{s.step || String(i + 1).padStart(2, '0')}</span>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </div>
              ))}
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* INVESTMENT */}
      <ServiceInvestment
        label="Investment"
        heading={data.investmentHeading || 'Simple and Transparent'}
        packages={data.investmentPackages || []}
        ctaText="Start the conversation →"
        ctaHref="/contact"
        background="white"
      />

      {/* TESTIMONIALS (componente esistente) */}
      {data.testimonials?.length > 0 && <Testimonials items={data.testimonials} />}

      {/* SEO CONTENT (rich text lungo) */}
      {data.seoContent && (
        <section className="s-white pad">
          <div className="max">
            <RevealOnScroll className="journal-body service-seo-content" style={{ maxWidth: '720px', margin: '0 auto' }}>
              <PortableText
                value={data.seoContent}
                components={{
                  types: {
                    image: ({ value }: any) => value?.asset ? (
                      <figure className="service-seo-figure">
                        <Image
                          src={urlFor(value).width(1600).quality(85).auto('format').url()}
                          alt={value.alt || ''}
                          fill
                          sizes="(max-width: 768px) 100vw, 720px"
                          placeholder={value.asset.metadata?.lqip ? 'blur' : 'empty'}
                          blurDataURL={value.asset.metadata?.lqip}
                          style={{ objectFit: 'cover' }}
                        />
                        {value.caption && <figcaption className="service-seo-caption">{value.caption}</figcaption>}
                      </figure>
                    ) : null,
                  },
                }}
              />
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* FAQ */}
      <ServiceFAQ
        label="Questions"
        heading={<>Before You <em>Ask</em></>}
        items={data.faqs || []}
      />

      {/* RELATED STORIES */}
      {data.relatedJournalPosts?.length > 0 && (
        <section className="s-pearl pad">
          <div className="max">
            <RevealOnScroll className="sec-head">
              <div className="f-label">Real Stories</div>
              <div className="h2-lg">Proposals I&apos;ve <em>Witnessed</em></div>
            </RevealOnScroll>
            <div className="journal-related">
              {data.relatedJournalPosts.map((post: any, i: number) => (
                post?.slug && (
                  <Link key={i} href={`/journal/${post.slug}`} className="journal-related-card">
                    {post.heroImage?.asset && (
                      <div className="journal-related-img">
                        <Image
                          src={urlFor(post.heroImage).width(1200).quality(85).auto('format').url()}
                          alt={post.heroImage.alt || post.title || ''}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ objectFit: 'cover', objectPosition: getHotspotPosition(post.heroImage) }}
                        />
                      </div>
                    )}
                    <div className="journal-related-title">{post.coupleName || post.title}</div>
                    {post.location && <div className="journal-related-location">{post.location}</div>}
                  </Link>
                )
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="s-ink pad">
        <RevealOnScroll className="final-cta-inner">
          <div className="f-label" style={{ justifyContent: 'center', marginBottom: '24px', color: 'rgba(250,250,248,.35)' }}>
            Your Moment Awaits
          </div>
          <div className="h2-lg" style={{ color: 'var(--off-white)', marginBottom: '20px' }}>
            Let&apos;s Plan Your<br /><em>Moment in Sicily</em>
          </div>
          <p>Tell me the location you picture, or ask me to suggest one. I reply within 24 hours, and we start building the moment together.</p>
          <Link href="/contact" className="btn-fill" style={{ background: 'var(--off-white)', color: 'var(--ink)' }}>
            Start the conversation →
          </Link>
        </RevealOnScroll>
      </section>

      {/* JSON-LD: ProfessionalService (il FAQPage è generato dentro ServiceFAQ) */}
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
    </main>
  )
}
