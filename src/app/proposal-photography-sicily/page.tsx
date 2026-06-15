import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { client } from '@/lib/sanity/client'
import { proposalPageQuery } from '@/lib/sanity/queries'
import { urlFor, getHotspotPosition } from '@/lib/sanity/image'

// Componenti di sezione REALI del sito (stessi usati da location/home pages).
import HeroLocation from '@/components/sections/HeroLocation'
import Pillars from '@/components/sections/Pillars'
import FAQ from '@/components/sections/FAQ'
import Testimonials from '@/components/sections/Testimonials'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

// ⚠️ NON importare Nav/Footer: iniettati dal root layout via <LayoutShell> per ogni route non-/ads.

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

  // ── Hero: split del titolo su '|' in 3 righe per HeroLocation ──
  const heroLines = (data.heroHeading || '').split('|').map((l: string) => l.trim())

  // ── Pillars: mappa i pillar schema (title/description) sul formato del componente
  //    (number/title/description/quote/quoteAuthor). number generato, quote vuota → il
  //    componente regge campi vuoti. ──
  const pillarItems = (data.approachPillars || []).map((p: any, i: number) => ({
    number: String(i + 1).padStart(2, '0'),
    title: p.title,
    description: p.description,
    quote: '',
    quoteAuthor: '',
  }))

  // ── FAQ: question/answer → q/a ──
  const faqItems = (data.faqs || []).map((f: any) => ({ q: f.question, a: f.answer }))

  // ── Testimonials: i campi del content type combaciano già (coupleName/countryFlag/location/quote) ──
  const testimonialItems = data.testimonials || []

  return (
    <main>
      {/* ─────────── HERO ─────────── */}
      <HeroLocation
        image={data.heroImage}
        eyebrow={data.heroEyebrow || 'Proposal Photography · Sicily'}
        titleL1={heroLines[0] || 'Proposal Photography'}
        titleL2={heroLines[1] || 'in Sicily'}
        titleL3={heroLines[2] || ''}
        subtitle={data.heroSubtitle || ''}
        darkText={data.heroTextDark || false}
      />

      {/* ─────────── INTRO (rich text, stile s-white pad) ─────────── */}
      {data.introBody && (
        <section className="s-white pad">
          <div className="max">
            <RevealOnScroll className="sec-head">
              {data.introHeading && <div className="h2-lg">{data.introHeading}</div>}
            </RevealOnScroll>
            <RevealOnScroll className="journal-body" style={{ maxWidth: '720px', margin: '0 auto' }}>
              <PortableText value={data.introBody} />
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ─────────── GALLERY (stile journal-gallery, ritmo a righe) ─────────── */}
      {data.galleryImages?.length > 0 && (
        <section className="s-pearl pad">
          <div className="max">
            <RevealOnScroll className="sec-head">
              <div className="f-label">Portfolio</div>
              <div className="h2-lg">Moments, <em>As They Happened</em></div>
            </RevealOnScroll>
            <RevealOnScroll className="service-gallery-grid">
              {data.galleryImages.map((img: any, i: number) => (
                img?.asset && (
                  <figure key={i} className="service-gallery-item">
                    <Image
                      src={urlFor(img).width(1000).quality(85).auto('format').url()}
                      alt={img.alt || ''}
                      width={img.asset.metadata?.dimensions?.width || 1000}
                      height={img.asset.metadata?.dimensions?.height || 1250}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      placeholder={img.asset.metadata?.lqip ? 'blur' : 'empty'}
                      blurDataURL={img.asset.metadata?.lqip}
                      style={{ objectPosition: getHotspotPosition(img) }}
                    />
                    {img.caption && <figcaption>{img.caption}</figcaption>}
                  </figure>
                )
              ))}
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ─────────── APPROACH (componente Pillars reale) ─────────── */}
      {pillarItems.length > 0 && (
        <Pillars
          intro={{ label: 'How I Work', title: data.approachHeading || 'Three Things I Promise You' }}
          items={pillarItems}
        />
      )}

      {/* ─────────── LOCATIONS (card stile sito, link a location page) ─────────── */}
      {data.locationCards?.length > 0 && (
        <section className="s-white pad">
          <div className="max">
            <RevealOnScroll className="sec-head">
              <div className="f-label">Sicily Locations</div>
              <div className="h2-lg">{data.locationsHeading || 'Where Will You Ask the Question?'}</div>
              {data.locationsIntro && <p className="sec-intro-text">{data.locationsIntro}</p>}
            </RevealOnScroll>
            <RevealOnScroll className="service-location-grid">
              {data.locationCards.map((loc: any, i: number) => {
                const inner = (
                  <>
                    {loc.image?.asset && (
                      <div className="service-location-img">
                        <Image
                          src={urlFor(loc.image).width(800).quality(85).auto('format').url()}
                          alt={loc.image.alt || loc.name || ''}
                          width={800}
                          height={1000}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ objectPosition: getHotspotPosition(loc.image) }}
                        />
                      </div>
                    )}
                    <h3>{loc.name}</h3>
                    {loc.city && <span className="service-location-city">{loc.city}</span>}
                    {loc.description && <p>{loc.description}</p>}
                  </>
                )
                return loc.locationPageRef?.slug ? (
                  <Link key={i} href={`/locations/${loc.locationPageRef.slug}`} className="service-location-card">
                    {inner}
                  </Link>
                ) : (
                  <div key={i} className="service-location-card">{inner}</div>
                )
              })}
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ─────────── PROCESS (replica markup ProcessSteps, dati da Sanity) ─────────── */}
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

      {/* ─────────── INVESTMENT (2 colonne, stile sito coerente) ─────────── */}
      {data.investmentPackages?.length > 0 && (
        <section className="s-white pad">
          <div className="max">
            <RevealOnScroll className="sec-head">
              <div className="f-label">Investment</div>
              <div className="h2-lg">{data.investmentHeading || 'Simple and Transparent'}</div>
            </RevealOnScroll>
            <RevealOnScroll className="service-invest-grid">
              {data.investmentPackages.map((pkg: any, i: number) => (
                <div key={i} className="service-invest-card">
                  {pkg.name && <h3>{pkg.name}</h3>}
                  {pkg.price && <span className="service-invest-price">{pkg.price}</span>}
                  {pkg.includes?.length > 0 && (
                    <ul>
                      {pkg.includes.map((inc: string, j: number) => <li key={j}>{inc}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </RevealOnScroll>
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link href="/contact" className="btn-fill">Start the conversation →</Link>
            </div>
          </div>
        </section>
      )}

      {/* ─────────── TESTIMONIALS (componente reale) ─────────── */}
      {testimonialItems.length > 0 && <Testimonials items={testimonialItems} />}

      {/* ─────────── SEO CONTENT (rich text lungo, stile editoriale) ─────────── */}
      {data.seoContent && (
        <section className="s-white pad">
          <div className="max">
            <RevealOnScroll className="journal-body service-seo-content" style={{ maxWidth: '720px', margin: '0 auto' }}>
              <PortableText
                value={data.seoContent}
                components={{
                  types: {
                    image: ({ value }: any) => value?.asset ? (
                      <figure style={{ margin: '40px 0' }}>
                        <Image
                          src={urlFor(value).width(1200).quality(85).auto('format').url()}
                          alt={value.alt || ''}
                          width={value.asset.metadata?.dimensions?.width || 1200}
                          height={value.asset.metadata?.dimensions?.height || 800}
                          sizes="(max-width: 768px) 100vw, 720px"
                          placeholder={value.asset.metadata?.lqip ? 'blur' : 'empty'}
                          blurDataURL={value.asset.metadata?.lqip}
                        />
                        {value.caption && <figcaption>{value.caption}</figcaption>}
                      </figure>
                    ) : null,
                  },
                }}
              />
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ─────────── FAQ (componente reale, schema FAQPage generato sotto) ─────────── */}
      {faqItems.length > 0 && <FAQ label="Questions" items={faqItems} />}

      {/* ─────────── RELATED STORIES (stile journal-related, come location page) ─────────── */}
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
                          src={urlFor(post.heroImage).width(800).quality(85).auto('format').url()}
                          alt={post.heroImage.alt || post.title || ''}
                          width={800}
                          height={600}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ objectPosition: getHotspotPosition(post.heroImage) }}
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

      {/* ─────────── FINAL CTA (replica final-cta-inner, testi proposal) ─────────── */}
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

      {/* ─────────── JSON-LD: ProfessionalService (script nativo) ─────────── */}
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
          provider: {
            '@type': 'Person',
            name: 'Alex Cinisi',
            url: 'https://alexcinisiphotography.com/about',
          },
        }) }}
      />

      {/* ─────────── JSON-LD: FAQPage ─────────── */}
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
