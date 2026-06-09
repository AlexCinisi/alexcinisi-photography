import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { client } from '@/lib/sanity/client'
import { proposalPageQuery } from '@/lib/sanity/queries'
import { urlFor, getHotspotPosition } from '@/lib/sanity/image'

// ⚠️ NON importare Nav/Footer: sono iniettati dal root layout via <LayoutShell>
// (verificato in src/app/layout.tsx + src/components/layout/LayoutShell.tsx).
// LayoutShell mostra Nav/Footer/StickyMobileCTA su ogni route che NON inizia con /ads.
// Questa pagina (/proposal-photography-sicily) li riceve automaticamente.
// Renderizzarli qui creerebbe Nav/Footer DOPPI.

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

  return {
    title: data.metaTitle || `${data.title} | Alex Cinisi Photography`,
    description: data.metaDescription,
    alternates: { canonical: CANONICAL },
    openGraph: {
      title: data.metaTitle || data.title,
      description: data.metaDescription,
      url: CANONICAL,
      type: 'website',
      images: ogUrl ? [{ url: ogUrl, width: 1200, height: 630 }] : [],
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

  // Singleton: se manca il documento, mostra fallback minimale (Nav/Footer arrivano da LayoutShell).
  // Alternativa: notFound() se preferisci nascondere la route finché Alex non popola Sanity.
  if (!data) {
    return (
      <main style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
        <p>Page coming soon.</p>
      </main>
    )
  }

  return (
    <>
      <main>
        {/* ─── HERO (65vh, solo se heroImage esiste — mai gradient placeholder) ─── */}
        {data.heroImage?.asset && (
          <section className={`service-hero ${data.heroTextDark ? 'text-dark' : ''}`}>
            <Image
              src={urlFor(data.heroImage).width(2000).quality(85).url()}
              alt={data.heroImage.alt || data.heroHeading || ''}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: getHotspotPosition(data.heroImage) }}
            />
            <div className="service-hero__content">
              {data.heroEyebrow && <p className="eyebrow">{data.heroEyebrow}</p>}
              {data.heroHeading && (
                <h1>{data.heroHeading.split('|').map((line: string, i: number) => (
                  <span key={i} style={{ display: 'block' }}>{line.trim()}</span>
                ))}</h1>
              )}
              {data.heroSubtitle && <p className="service-hero__subtitle">{data.heroSubtitle}</p>}
            </div>
          </section>
        )}

        {/* ─── INTRO (PortableText) ─── */}
        {data.introBody && (
          <section className="service-intro">
            {data.introHeading && <h2>{data.introHeading}</h2>}
            <div className="rich-text"><PortableText value={data.introBody} /></div>
          </section>
        )}

        {/* ─── GALLERY (riusa CSS gallery esistente; nessun aspect ratio forzato) ─── */}
        {data.galleryImages?.length > 0 && (
          <section className="service-gallery">
            {data.galleryImages.map((img: any, i: number) => (
              img?.asset && (
                <figure key={i}>
                  <Image
                    src={urlFor(img).width(1200).quality(85).url()}
                    alt={img.alt || ''}
                    width={img.asset.metadata?.dimensions?.width || 1200}
                    height={img.asset.metadata?.dimensions?.height || 1500}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    placeholder={img.asset.metadata?.lqip ? 'blur' : 'empty'}
                    blurDataURL={img.asset.metadata?.lqip}
                  />
                  {img.caption && <figcaption>{img.caption}</figcaption>}
                </figure>
              )
            ))}
          </section>
        )}

        {/* ─── APPROACH (3 pillar) ─── */}
        {data.approachPillars?.length > 0 && (
          <section className="service-approach">
            {data.approachHeading && <h2>{data.approachHeading}</h2>}
            <div className="pillars">
              {data.approachPillars.map((p: any, i: number) => (
                <div key={i} className="pillar">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── LOCATIONS (cards + link a location pages quando locationPageRef esiste) ─── */}
        {data.locationCards?.length > 0 && (
          <section className="service-locations">
            {data.locationsHeading && <h2>{data.locationsHeading}</h2>}
            {data.locationsIntro && <p className="section-intro">{data.locationsIntro}</p>}
            <div className="location-cards">
              {data.locationCards.map((loc: any, i: number) => {
                const card = (
                  <>
                    {loc.image?.asset && (
                      <Image
                        src={urlFor(loc.image).width(800).quality(85).url()}
                        alt={loc.image.alt || loc.name || ''}
                        width={800} height={1000}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectPosition: getHotspotPosition(loc.image) }}
                      />
                    )}
                    <h3>{loc.name}</h3>
                    {loc.city && <p className="city">{loc.city}</p>}
                    {loc.description && <p>{loc.description}</p>}
                  </>
                )
                return loc.locationPageRef?.slug ? (
                  <Link key={i} href={`/locations/${loc.locationPageRef.slug}`} className="location-card">{card}</Link>
                ) : (
                  <div key={i} className="location-card">{card}</div>
                )
              })}
            </div>
          </section>
        )}

        {/* ─── PROCESS ─── */}
        {data.processSteps?.length > 0 && (
          <section className="service-process">
            {data.processHeading && <h2>{data.processHeading}</h2>}
            <div className="process-steps">
              {data.processSteps.map((s: any, i: number) => (
                <div key={i} className="process-step">
                  {s.step && <span className="step-number">{s.step}</span>}
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── INVESTMENT ─── */}
        {data.investmentPackages?.length > 0 && (
          <section className="service-investment">
            {data.investmentHeading && <h2>{data.investmentHeading}</h2>}
            <div className="packages">
              {data.investmentPackages.map((pkg: any, i: number) => (
                <div key={i} className="package">
                  {pkg.name && <h3>{pkg.name}</h3>}
                  {pkg.price && <p className="price">{pkg.price}</p>}
                  {pkg.includes?.length > 0 && (
                    <ul>{pkg.includes.map((inc: string, j: number) => <li key={j}>{inc}</li>)}</ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── TESTIMONIALS (content type testimonial: coupleName/country/countryFlag/location/quote/rating) ─── */}
        {data.testimonials?.length > 0 && (
          <section className="service-testimonials">
            {data.testimonials.map((t: any, i: number) => (
              <blockquote key={i}>
                <p>{t.quote}</p>
                <cite>
                  {t.countryFlag} {t.coupleName}
                  {t.location ? ` · ${t.location}` : ''}
                </cite>
              </blockquote>
            ))}
          </section>
        )}

        {/* ─── SEO CONTENT (PortableText lungo con immagini inline) ─── */}
        {data.seoContent && (
          <section className="service-seo-content rich-text">
            <PortableText
              value={data.seoContent}
              components={{
                types: {
                  image: ({ value }: any) => value?.asset ? (
                    <figure>
                      <Image
                        src={urlFor(value).width(1200).quality(85).url()}
                        alt={value.alt || ''}
                        width={value.asset.metadata?.dimensions?.width || 1200}
                        height={value.asset.metadata?.dimensions?.height || 800}
                        sizes="(max-width: 768px) 100vw, 800px"
                        placeholder={value.asset.metadata?.lqip ? 'blur' : 'empty'}
                        blurDataURL={value.asset.metadata?.lqip}
                      />
                      {value.caption && <figcaption>{value.caption}</figcaption>}
                    </figure>
                  ) : null,
                },
              }}
            />
          </section>
        )}

        {/* ─── FAQ (accordion + FAQPage schema sotto) ─── */}
        {data.faqs?.length > 0 && (
          <section className="service-faq">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              {data.faqs.map((f: any, i: number) => (
                <details key={i} className="faq-item">
                  <summary>{f.question}</summary>
                  <p>{f.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ─── RELATED STORIES ─── */}
        {data.relatedJournalPosts?.length > 0 && (
          <section className="service-related">
            <h2>Real Stories</h2>
            <div className="related-grid">
              {data.relatedJournalPosts.map((post: any, i: number) => (
                post?.slug && (
                  <Link key={i} href={`/journal/${post.slug}`} className="related-card">
                    {post.heroImage?.asset && (
                      <Image
                        src={urlFor(post.heroImage).width(800).quality(85).url()}
                        alt={post.heroImage.alt || post.title || ''}
                        width={800} height={1000}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectPosition: getHotspotPosition(post.heroImage) }}
                      />
                    )}
                    <h3>{post.coupleName || post.title}</h3>
                    {post.location && <p>{post.location}</p>}
                  </Link>
                )
              ))}
            </div>
          </section>
        )}

        {/* ─── CTA FINALE ─── */}
        <section className="service-cta">
          <h2>Let's plan your moment in Sicily</h2>
          <Link href="/contact" className="cta-button">Start the conversation</Link>
        </section>
      </main>

      {/* ─── JSON-LD: ProfessionalService (script HTML nativo, MAI next/script) ─── */}
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

      {/* ─── JSON-LD: FAQPage ─── */}
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

    </>
  )
}
