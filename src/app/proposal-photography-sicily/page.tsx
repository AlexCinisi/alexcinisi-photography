import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { client } from '@/lib/sanity/client'
import { proposalPageQuery } from '@/lib/sanity/queries'
import { urlFor, getHotspotPosition } from '@/lib/sanity/image'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import PortfolioGrid from '@/components/sections/PortfolioGrid'

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
      {/* HERO — stile ads: 100vh, centrato, overlay scuro */}
      <section className="svc-hero">
        <div className="svc-hero-bg">
          {data.heroImage?.asset && (
            <Image
              src={urlFor(data.heroImage).fit('crop').crop('focalpoint').width(2400).auto('format').quality(90).url()}
              alt={data.heroImage.alt || heroLines.join(' ') || ''}
              fill priority quality={90} sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: getHotspotPosition(data.heroImage) }}
            />
          )}
        </div>
        <div className="svc-hero-content">
          <div className="svc-eyebrow">{data.heroEyebrow || 'Proposal Photography · Sicily'}</div>
          <h1>
            {(heroLines.length ? heroLines : ['Proposal Photography', 'in Sicily']).map((line: string, i: number) => (
              <span key={i} className={i > 0 ? 'svc-serif' : ''}>{line}</span>
            ))}
          </h1>
          {data.heroSubtitle && <p className="svc-hero-sub">{data.heroSubtitle}</p>}
          <div className="svc-hero-actions">
            <Link href="/contact" className="svc-btn">Plan Your Proposal</Link>
          </div>
        </div>
      </section>

      {/* ─── INTRO ─── */}
      {data.introBody && (
        <section className="svc-intro">
          <div className="svc-wrap">
            <RevealOnScroll>
              {data.introHeading && <div className="svc-h2">{data.introHeading}</div>}
              <div className="svc-body">
                <PortableText value={data.introBody} />
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}

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

      {/* ─── APPROACH (fondo ink) ─── */}
      {data.approachPillars?.length > 0 && (
        <section className="svc-approach">
          <div className="svc-wrap">
            <RevealOnScroll>
              <div className="svc-eyebrow">How I Work</div>
              <div className="svc-h2">{data.approachHeading || 'Three Things I Promise You'}</div>
            </RevealOnScroll>
            <RevealOnScroll className="svc-pillars">
              {data.approachPillars.map((p: any, i: number) => (
                <div key={i} className="svc-pillar">
                  <div className="svc-pillar-n">{['i.', 'ii.', 'iii.', 'iv.'][i] || `${i + 1}.`}</div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
              ))}
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ─── LOCATIONS ─── */}
      {data.locationCards?.length > 0 && (
        <section className="svc-locations">
          <div className="svc-wrap">
            <RevealOnScroll>
              <div className="svc-eyebrow" style={{ textAlign: 'center' }}>Sicily Locations</div>
              <div className="svc-h2" style={{ textAlign: 'center' }}>{data.locationsHeading || 'Where Will You Ask the Question?'}</div>
              {data.locationsIntro && <p className="svc-loc-intro">{data.locationsIntro}</p>}
            </RevealOnScroll>
            <RevealOnScroll className="svc-loc-grid">
              {data.locationCards.map((loc: any, i: number) => {
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
      )}

      {/* ─── PROCESS ─── */}
      {data.processSteps?.length > 0 && (
        <section className="svc-process">
          <div className="svc-wrap">
            <RevealOnScroll>
              <div className="svc-eyebrow">How It Works</div>
              <div className="svc-h2">{data.processHeading || 'From First Message to Final Gallery'}</div>
            </RevealOnScroll>
            <RevealOnScroll className="svc-proc-grid">
              {data.processSteps.map((s: any, i: number) => (
                <div key={i} className="svc-proc-step">
                  <div className="svc-proc-n">{s.step || String(i + 1).padStart(2, '0')}</div>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </div>
              ))}
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ─── INVESTMENT ─── */}
      {data.investmentPackages?.length > 0 && (
        <section className="svc-invest">
          <div className="svc-wrap">
            <RevealOnScroll>
              <div className="svc-eyebrow" style={{ textAlign: 'center' }}>Investment</div>
              <div className="svc-h2" style={{ textAlign: 'center' }}>{data.investmentHeading || 'Simple and Transparent'}</div>
            </RevealOnScroll>
            <RevealOnScroll className="svc-inv-grid">
              {data.investmentPackages.map((pkg: any, i: number) => (
                <div key={i} className="svc-inv-card">
                  {pkg.name && <h3>{pkg.name}</h3>}
                  {pkg.price && <span className="svc-inv-price">{pkg.price}</span>}
                  {pkg.includes?.length > 0 && (
                    <ul>{pkg.includes.map((inc: string, j: number) => <li key={j}>{inc}</li>)}</ul>
                  )}
                </div>
              ))}
            </RevealOnScroll>
            <div className="svc-invest-cta">
              <Link href="/contact" className="svc-btn">Start the conversation →</Link>
            </div>
          </div>
        </section>
      )}

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

      {/* FAQ — classi standard del sito */}
      {data.faqs?.length > 0 && (
        <section className="s-pearl pad">
          <div className="max">
            <div className="sec-head center">
              <div className="f-label">Questions</div>
              <div className="h2-lg">Before You <em>Ask</em></div>
            </div>
            <div className="faq-wrap d1">
              {data.faqs.map((f: any, i: number) => (
                <details key={i} className="faq-item">
                  <summary className="faq-q" style={{ listStyle: 'none' }}>
                    <span className="faq-q-t">{f.question}</span>
                    <span className="faq-ico">+</span>
                  </summary>
                  <div className="faq-a"><p>{f.answer}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED — slider orizzontale (scroll-snap) se > 2, altrimenti grid */}
      {data.relatedJournalPosts?.length > 0 && (
        <section className="svc-related">
          <div className="svc-wrap">
            <div className="svc-eyebrow">Real Stories</div>
            <div className="svc-h2">Proposals I&apos;ve <em>Witnessed</em></div>
            <div className={data.relatedJournalPosts.length > 2 ? 'svc-rel-slider' : 'svc-rel-grid'}>
              {data.relatedJournalPosts.map((post: any, i: number) => (
                post?.slug && (
                  <Link key={i} href={`/journal/${post.slug}`} className="svc-rel-card">
                    {post.heroImage?.asset && (
                      <div className="svc-rel-img">
                        <Image
                          src={urlFor(post.heroImage).width(1000).auto('format').quality(85).url()}
                          alt={post.heroImage.alt || post.title || ''}
                          fill sizes="(max-width: 860px) 80vw, 33vw"
                          style={{ objectFit: 'cover', objectPosition: getHotspotPosition(post.heroImage) }}
                        />
                      </div>
                    )}
                    <div className="svc-rel-title">{post.coupleName || post.title}</div>
                    {post.location && <div className="svc-rel-loc">{post.location}</div>}
                  </Link>
                )
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FINAL CTA ─── */}
      <section className="svc-cta">
        <RevealOnScroll>
          <div className="svc-eyebrow" style={{ color: 'var(--accent)', textAlign: 'center' }}>Your Moment Awaits</div>
          <div className="svc-h2">Let&apos;s Plan Your <em>Moment in Sicily</em></div>
          <p>Tell me the location you picture, or ask me to suggest one. I reply within 24 hours, and we start building the moment together.</p>
          <Link href="/contact" className="svc-cta-btn">Start the conversation</Link>
        </RevealOnScroll>
      </section>

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
