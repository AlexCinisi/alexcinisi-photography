import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AdsHeader from '@/components/ads/AdsHeader'
import AdsHero from '@/components/ads/AdsHero'
import GuideForm from '@/components/guide/GuideForm'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { client } from '@/lib/sanity/client'
import { guideLandingPageQuery, siteLogoQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { copyrightLine } from '@/lib/copyright'

// ⚠️ Guscio spoglio: LayoutShell non monta Nav, Footer, StickyMobileCTA né i
// due JSON-LD su questa route (isBareShell). Ogni link è un'uscita da una
// pagina il cui unico scopo è raccogliere un'email — per questo la chiusura
// si porta dietro copyright e link legali: non c'è footer sotto di lei.
//
// Un solo form in tutta la pagina (brief §7.3): le tre CTA — header, hero,
// chiusura — sono tre inviti alla stessa ancora, #guide-form.
//
// Il PDF non va MAI linkato da qui (brief §7.4): si ottiene solo via email
// dopo l'invio, è il meccanismo di cattura del contatto.

export const revalidate = 3600

const CANONICAL = 'https://alexcinisiphotography.com/sicily-wedding-guide'

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(guideLandingPageQuery).catch(() => null)

  const title = data?.metaTitle || 'The Sicily Wedding Guide — Free Download | Alex Cinisi'
  const description = data?.metaDescription || 'Planning a wedding in Sicily? Get the free guide by a Sicilian-born photographer published in Vogue Italia — 12 venues, 4 seasons, one honest look.'

  return {
    title: { absolute: title },
    description,
    // Canonical esplicito su se stessa: senza, il root layout la fa puntare
    // alla homepage (regola 4 del CLAUDE.md del repo).
    alternates: { canonical: CANONICAL },
    // 🔴 GATE PRIMA DEL LIVE — togliere questa riga, e solo questa, quando in
    // Sanity non è rimasto nessun segnaposto [ALEX]. La pagina oggi renderebbe
    // in produzione titoli e paragrafi che Alex non ha ancora scritto. Stessa
    // procedura della pillar page: noindex fino al copy vero.
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: CANONICAL,
      siteName: 'Alex Cinisi Photography',
      locale: 'en_US',
      type: 'website',
      images: data?.ogImage?.asset
        ? [{ url: urlFor(data.ogImage).width(1200).height(630).auto('format').url() }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: data?.ogImage?.asset
        ? [urlFor(data.ogImage).width(1200).height(630).auto('format').url()]
        : undefined,
    },
  }
}

export default async function SicilyWeddingGuidePage() {
  const [data, siteData] = await Promise.all([
    client.fetch(guideLandingPageQuery).catch(() => null),
    client.fetch(siteLogoQuery).catch(() => null),
  ])

  const logoUrl = siteData?.siteLogo?.asset?.url || ''

  // Ripieghi cablati identici agli initialValue dello schema: è la destinazione
  // di un redirect (/guide) e un documento Sanity vuoto non deve romperla.
  // I ripieghi che iniziano con [ALEX] sono copy non ancora scritto, non testo
  // definitivo: sono visibili apposta.
  const heroCtaLabel = data?.heroCtaLabel || 'Send Me the Guide'
  const insideBullets = data?.insideBullets?.length ? data.insideBullets : [
    { label: 'The Venues', text: 'Twelve hand-picked venues across the island — including five I know so well I can tell you where the light falls at 6 PM.' },
    { label: 'The Seasons', text: 'The four seasons of a Sicilian wedding, honestly told: when to come for the golden light, when for the empty piazzas, and what most couples get wrong about summer.' },
    { label: 'The Approach', text: 'What luxury editorial coverage really means — and why the best portraits of your life will take twenty unhurried minutes, not two staged hours.' },
  ]
  const pressOutlets: string[] = data?.pressOutlets?.length ? data.pressOutlets : ['VOGUE ITALIA', 'MARIE CLAIRE', "L'OFFICIEL"]
  const reassurance: string[] = data?.formReassurance?.length ? data.formReassurance : ['[ALEX] rassicurazione 1', '[ALEX] rassicurazione 2', '[ALEX] rassicurazione 3']
  const gallery = data?.portfolioImages?.length ? data.portfolioImages : []
  const portrait = data?.aboutPortrait?.asset ? data.aboutPortrait : null

  return (
    <>
      <AdsHeader ctaText={heroCtaLabel} logoUrl={logoUrl} anchorId="guide-form" dark />

      {/* heroHeading accetta <em> per la parola in Bodoni corsivo: AdsHero rende
          il titolo come HTML. Il valore in Sanity oggi è testo puro. */}
      <AdsHero
        anchorId="guide-form"
        className={`guide-hero${data?.heroTextDark ? ' ads-hero--text-dark' : ''}`}
        eyebrow={data?.heroEyebrow || '[ALEX] occhiello hero'}
        title={data?.heroHeading || 'Planning a Wedding in Sicily? Start Here.'}
        subtitle={data?.heroSubtitle || 'The free guide international couples use to choose their venue, their season, and their light — written by a Sicilian-born wedding photographer published in Vogue Italia.'}
        ctaText={heroCtaLabel}
        microText={data?.heroCtaMicrocopy || 'Instant download · No spam, just Sicily.'}
        image={data?.heroImage}
      />

      {/* Press strip — tipografica: i loghi delle testate non esistono nel repo */}
      <section className="guide-press">
        <p className="guide-press-label">{data?.pressLabel || 'AS FEATURED IN'}</p>
        <ul className="guide-press-list">
          {pressOutlets.map((outlet, i) => <li key={i}>{outlet}</li>)}
        </ul>
      </section>

      {/* What's inside + mini portfolio: un solo blocco bianco, come nel design */}
      <section className="ads-section" style={{ textAlign: 'center' }}>
        <RevealOnScroll>
          {data?.insideEyebrow !== '' && (
            <div className="ads-eyebrow"><span>{data?.insideEyebrow || '[ALEX] occhiello sezione inside'}</span></div>
          )}
          <h2 className="ads-h2">{data?.insideHeading || "What's inside the guide"}</h2>

          <div className="ads-pillars" style={{ marginTop: 'clamp(40px, 6vw, 64px)', textAlign: 'left' }}>
            {insideBullets.map((b: { label: string; text: string }, i: number) => (
              <div key={i} className="ads-pillar">
                <h3>{b.label}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>

          {/* La griglia 3×2 compare solo quando le foto esistono davvero in
              Sanity: sei riquadri vuoti sono peggio di nessuna griglia. */}
          {gallery.length > 0 && (
            <div className="ads-gallery-grid" style={{ marginTop: 'clamp(48px, 7vw, 80px)' }}>
              {gallery.map((img: any, i: number) => (
                <div key={i} className="ads-gallery-item">
                  <Image
                    src={urlFor(img).width(600).height(800).auto('format').quality(80).url()}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    style={{
                      objectFit: 'cover',
                      objectPosition: img.hotspot ? `${img.hotspot.x * 100}% ${img.hotspot.y * 100}%` : '50% 50%',
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </RevealOnScroll>
      </section>

      {/* Il perno. Nessun RevealOnScroll: un form non si nasconde in attesa
          dello scroll. L'h2 di questa colonna non è decorativo — GuideForm
          apre con un <h3> e senza di lui la gerarchia salta da h1 a h3. */}
      <section id="guide-form" className="ads-form-section">
        <div className="ads-form-grid">
          <div className="ads-form-text">
            {data?.formSectionEyebrow !== '' && (
              <div className="ads-eyebrow ads-eyebrow--left"><span>{data?.formSectionEyebrow || '[ALEX] occhiello sezione form'}</span></div>
            )}
            <h2>{data?.formSectionHeading || '[ALEX] titolo della sezione form'}</h2>
            {data?.formSectionBody !== '' && (
              <p>{data?.formSectionBody || '[ALEX] paragrafo sezione form'}</p>
            )}
            {reassurance.length > 0 && (
              <ul className="ads-form-reassurance ads-form-reassurance--dash">
                {reassurance.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            )}
          </div>

          {/* Un solo figlio della griglia: GuideForm rende la card e, sotto, la
              microcopy di valore — due elementi che qui devono restare in colonna. */}
          <div>
            <GuideForm
              heading={data?.formHeading || 'Where should I send it?'}
              ctaLabel={data?.formCtaLabel || 'Send Me the Guide'}
              gdprMicrocopy={data?.formGdprMicrocopy || "I'll send you the guide plus a short series of notes on planning a wedding in Sicily. Unsubscribe anytime — no hard feelings. Privacy Policy."}
            />
          </div>
        </div>
      </section>

      <section className="ads-section-offwhite">
        <RevealOnScroll className="guide-about">
          {portrait && (
            <figure className="guide-about-portrait">
              <Image
                src={urlFor(portrait).width(800).height(1000).auto('format').quality(80).url()}
                alt={portrait.alt}
                width={800}
                height={1000}
                sizes="(max-width: 768px) 100vw, 40vw"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </figure>
          )}
          <div className="guide-about-copy">
            <div className="ads-eyebrow ads-eyebrow--left"><span>{data?.aboutLabel || 'A note from Alex'}</span></div>
            <p>{data?.aboutBody || "I was born in Sicily, and I've spent my life learning how the light moves here. For years I've photographed weddings across the island — and in 15+ countries — for couples who want their day documented, not directed. My work sits somewhere between reportage and editorial: quiet, intuitive, human. It has been featured in Vogue Italia, Marie Claire and L'Officiel, but the recognition I care about most comes from couples who tell me they barely noticed the camera. That's the point."}</p>
          </div>
        </RevealOnScroll>
      </section>

      {/* Chiusura: è anche il footer che questa pagina non ha */}
      <section className="ads-closing ads-closing--dark">
        <RevealOnScroll>
          <h2 className="ads-closing-quote">{data?.finalHeading || 'Ready when you are'}</h2>
          <p className="ads-section-subtitle">{data?.finalBody || 'Download the guide and take your time with it. Or, if Sicily is already decided, skip ahead —'}</p>
          <a href="#guide-form" className="ads-closing-cta">{data?.finalCtaLabel || 'Send Me the Guide'}</a>
          <p style={{ marginTop: '28px' }}>
            {/* L'unico link che esce dalla pagina */}
            <Link href="/call" className="btn-text">{data?.finalSecondaryLabel || 'Check your date instead →'}</Link>
          </p>
        </RevealOnScroll>

        <div className="guide-legal-row">
          <span>{copyrightLine()}</span>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/cookie-policy">Cookie Policy</Link>
        </div>
      </section>
    </>
  )
}
