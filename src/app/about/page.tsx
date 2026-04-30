import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { client as sanityClient } from '@/lib/sanity/client';
import { aboutPageQuery } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import Breadcrumb from '@/components/sections/Breadcrumb';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'About Alex Cinisi — Wedding Photographer in Sicily | Film & Digital',
  description:
    "Meet Alex Cinisi, a Sicilian wedding photographer blending editorial photography and analog film. Published in Vogue Italia, Le Point, Marie Claire, L'Officiel, and La Cucina Italiana. Available for destination weddings worldwide.",
  alternates: {
    canonical: 'https://alexcinisiphotography.com/about',
  },
  openGraph: {
    title: 'About Alex Cinisi — Wedding Photographer in Sicily',
    description:
      "Sicilian wedding photographer with editorial credits in Vogue Italia, Le Point, Marie Claire, L'Officiel. Film & digital, 15 weddings per year.",
    url: 'https://alexcinisiphotography.com/about',
    type: 'profile',
  },
};

/* ── Fallback data (used when Sanity is empty) ── */

const FALLBACK_TESTIMONIALS = [
  {
    flag: '🇮🇹',
    quote:
      "Ci siamo dimenticati che c'era un fotografo. Ogni immagine sembra naturale, esattamente come l'abbiamo vissuta.",
    author: 'Giulia & Marco',
    location: 'Palermo, Sicily',
  },
  {
    flag: '🇬🇧',
    quote:
      'From our first video call, Alex understood exactly what we wanted — even before we could fully explain it. The photos are beyond anything we imagined.',
    author: 'Sarah & Thomas',
    location: 'Villa Igiea, Sicily',
  },
  {
    flag: '🇺🇸',
    quote:
      "Every time we open the album, it's like being back in Sicily. The light, the emotion, everything is there.",
    author: 'Elena & David',
    location: 'Tonnara di Scopello',
  },
];

const FALLBACK_FAQ = [
  {
    q: 'Do you travel for destination weddings outside Sicily?',
    a: "Yes. While I'm based in Sicily and know this island intimately, I photograph weddings across Italy and internationally — from Lake Como to the Amalfi Coast, from Puglia to destinations worldwide. My approach and attention remain the same wherever your wedding takes place.",
  },
  {
    q: 'What does a typical wedding day look like with you?',
    a: "I arrive early — usually during the getting-ready moments — and stay through the last dance. I work discreetly alongside your day, never interrupting the flow. You'll receive both digital and film photographs, each individually edited. A sneak peek arrives within 48–72 hours, the full gallery within 6–8 weeks.",
  },
  {
    q: 'Can I see a full wedding gallery before booking?',
    a: "Of course. During our first conversation, I'll share complete galleries from weddings similar to yours — same venue style, similar light, comparable scale. I want you to see exactly what to expect, not just the highlights.",
  },
];

/* ── Schema JSON-LD ── */

function buildSchemas(faqItems: { q: string; a: string }[]) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Alex Cinisi',
      jobTitle: 'Wedding Photographer',
      description:
        "Sicilian wedding photographer specializing in editorial and analog film photography. Published in Vogue Italia, Le Point, Marie Claire, L'Officiel.",
      url: 'https://alexcinisiphotography.com/about',
      sameAs: [
        'https://www.instagram.com/alexcinisi/',
        'https://www.facebook.com/alexcinisiphotography/',
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Alex Cinisi Photography',
        url: 'https://alexcinisiphotography.com',
      },
      knowsAbout: [
        'Wedding Photography',
        'Film Photography',
        'Editorial Photography',
        'Destination Weddings',
        'Sicily Weddings',
      ],
      memberOf: {
        '@type': 'Organization',
        name: 'ANFM — Associazione Nazionale Fotografi Matrimonialisti',
      },
      areaServed: [
        { '@type': 'Place', name: 'Sicily, Italy' },
        { '@type': 'Place', name: 'Worldwide' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://alexcinisiphotography.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About',
          item: 'https://alexcinisiphotography.com/about',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    },
  ];
}

/* ── Page Component ── */

export default async function AboutPage() {
  const data = await sanityClient.fetch(aboutPageQuery).catch(() => null);

  const testimonials =
    data?.testimonials && data.testimonials.length > 0
      ? data.testimonials
      : FALLBACK_TESTIMONIALS;

  const faqItems =
    data?.faqItems && data.faqItems.length > 0
      ? data.faqItems.map((f: { question: string; answer: string }) => ({
          q: f.question,
          a: f.answer,
        }))
      : FALLBACK_FAQ;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildSchemas(faqItems)),
        }}
      />

      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

      {/* ═══ HERO ABOUT ═══ */}
      {data?.heroFullImage && (
        <section className={`hero hero--about ${data?.heroTextDark ? 'hero--dark-text' : ''}`}>
          <div className="hero-bg">
            <Image
              src={urlFor(data.heroFullImage)
                .fit('crop')
                .crop('focalpoint')
                .width(2400)
                .quality(85)
                .auto('format')
                .url()}
              alt={data.heroFullImage.alt || 'Alex Cinisi — Wedding Photographer in Sicily'}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div className="hero-content" style={{ maxWidth: 600 }}>
            <RevealOnScroll>
              <p className="f-label">About</p>
            </RevealOnScroll>
            <RevealOnScroll delay="d1">
              <h1>
                <span className="l1">The Person Behind</span>
                <span className="l2"><em>Your Photographs</em></span>
              </h1>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          SEZIONE 1 — Hero Intro (pearl)
          ═══════════════════════════════════════════ */}
      <section className="about-hero">
        <div className="about-hero-img">
          <RevealOnScroll>
            <div className="floating-frame-container --light">
              <div className="floating-frame">
                {data?.heroImage ? (
                  <Image
                    src={urlFor(data.heroImage)
                      .fit('crop')
                      .crop('focalpoint')
                      .width(1040)
                      .quality(90)
                      .auto('format')
                      .url()}
                    alt={data.heroImage.alt || 'Alex Cinisi, wedding photographer in Sicily'}
                    width={520}
                    height={693}
                    priority
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '3/4',
                      background:
                        'linear-gradient(152deg, #e0dbd2, #d2cbc1, #c6bdb0)',
                    }}
                  />
                )}
              </div>
            </div>
          </RevealOnScroll>
        </div>
        <div className="about-hero-copy">
          <RevealOnScroll>
            <p className="f-label">
              Based in Sicily &middot; Available Worldwide &middot; Film &amp;
              Digital
            </p>
          </RevealOnScroll>
          {!data?.heroFullImage && (
            <RevealOnScroll delay="d1">
              <h1 className="h1-about">
                The Person Behind
                <br />
                <em>Your Photographs</em>
              </h1>
            </RevealOnScroll>
          )}
          <RevealOnScroll delay="d2">
            <p>
              I&rsquo;m Alex Cinisi. I&rsquo;m Sicilian — born and raised in
              the kind of light that makes everything look like a memory before
              it even becomes one.
            </p>
            <p>
              I photograph 15 weddings a year. Not because I can&rsquo;t do more
              — but because your wedding deserves someone who has already studied
              your timeline, scouted your venue&rsquo;s light, and thought about
              your story before the day even begins.
            </p>
            <p>
              Every couple gets my complete creative attention, from the first
              call to the final album page.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SEZIONE 2 — Origine + Filosofia (white)
          ═══════════════════════════════════════════ */}
      <section className="about-philosophy s-white">
        <div className="about-philosophy-copy">
          <RevealOnScroll>
            <p className="f-label">Why I Do This</p>
          </RevealOnScroll>
          <RevealOnScroll delay="d1">
            <h2 className="h2">
              I&rsquo;ve Been Telling Stories
              <br />
              <em>Since Before I Had a Camera</em>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay="d2">
            <p>
              As a child, I drew on canvases and glass bottles — anything I could
              find. Oneiric worlds, somewhere between Dalí and the light that
              came through the windows of the house where I grew up. I still have
              those albums, stacked in a wooden chest in that same house.
              They&rsquo;re the earliest proof that I&rsquo;ve always needed to
              capture what I see — not just look at it.
            </p>
            <p>
              When I picked up a camera for the first time, everything clicked.
              The visual language I&rsquo;d been searching for since childhood
              finally had its medium. But it wasn&rsquo;t until I witnessed a
              moment at one of my first weddings — the way a room goes silent
              when someone sees the person they love — that I understood what I
              wanted to photograph. Not venues. Not decorations. People, in the
              most honest moments of their lives.
            </p>
            <p>
              That&rsquo;s still what drives me. I don&rsquo;t direct — I
              observe. I don&rsquo;t rush — I wait. Because the moments that
              matter most are the ones you weren&rsquo;t performing for anyone.
              And those are the ones I want to give back to you.
            </p>
          </RevealOnScroll>
        </div>
        <div className="about-philosophy-img">
          <RevealOnScroll>
            <div className="floating-frame-container --light">
              <div className="floating-frame">
                {data?.philosophyImage ? (
                  <Image
                    src={urlFor(data.philosophyImage)
                      .fit('crop')
                      .crop('focalpoint')
                      .width(960)
                      .quality(85)
                      .auto('format')
                      .url()}
                    alt={
                      data.philosophyImage.alt ||
                      'An emotional moment during a wedding in Sicily'
                    }
                    width={480}
                    height={640}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '3/4',
                      background:
                        'linear-gradient(152deg, #d8d3ca, #cbc4b9, #bfb6a8)',
                    }}
                  />
                )}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SEZIONE 3 — Film Photography (ink)
          ═══════════════════════════════════════════ */}
      <section className="about-film">
        <div className="about-film-copy">
          <RevealOnScroll>
            <p className="f-label">Film &amp; Digital</p>
          </RevealOnScroll>
          <RevealOnScroll delay="d1">
            <h2 className="h2">
              Some Moments Deserve
              <br />
              <em>the Slowness of Film</em>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay="d2">
            <p>
              Alongside my digital cameras, I bring a Canon AE-1 Program to
              every wedding. It&rsquo;s a 35mm film camera from the early 1980s,
              loaded with Kodak Portra 400 — a film stock loved for the way it
              renders skin tones in warm, natural light.
            </p>
            <p>
              There are moments during your day — a quiet glance before the
              ceremony, the way the late afternoon catches your dress — where I
              set down the digital and pick up the Canon. These frames won&rsquo;t
              be instant. They&rsquo;ll arrive weeks later, developed in a lab,
              with a warmth and grain that digital can&rsquo;t replicate.
            </p>
            <p>
              You&rsquo;ll know which ones they are the moment you see them.
              They&rsquo;re the photographs that feel less like a photo and more
              like holding a piece of that day in your hands. The kind your
              grandmother would frame on her wall.
            </p>
            <p>
              This isn&rsquo;t nostalgia. It&rsquo;s a deliberate choice — for
              couples who want their album to feel like an heirloom from the day
              it&rsquo;s printed.
            </p>
          </RevealOnScroll>
        </div>
        <div className="about-film-img">
          <RevealOnScroll>
            <div className="floating-frame-container --dark">
              <div className="floating-frame">
                {data?.filmImage ? (
                  <Image
                    src={urlFor(data.filmImage)
                      .fit('crop')
                      .crop('focalpoint')
                      .width(960)
                      .quality(85)
                      .auto('format')
                      .url()}
                    alt={
                      data.filmImage.alt ||
                      'Wedding photograph shot on Kodak Portra 400 film'
                    }
                    width={480}
                    height={640}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '3/4',
                      background:
                        'linear-gradient(152deg, #3a3835, #2a2826, #1e1d1b)',
                    }}
                  />
                )}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SEZIONE 4 — Testimonial (grey-bg)
          ═══════════════════════════════════════════ */}
      <section className="s-grey pad">
        <div className="max" style={{ textAlign: 'center', marginBottom: 52 }}>
          <RevealOnScroll>
            <p className="f-label" style={{ justifyContent: 'center' }}>
              In Their Words
            </p>
          </RevealOnScroll>
        </div>
        <Testimonials items={testimonials} />
      </section>

      {/* ═══════════════════════════════════════════
          SEZIONE 5 — Credenziali + Sicilia (white)
          ═══════════════════════════════════════════ */}
      <section className="about-credentials s-white">
        <div className="about-credentials-copy">
          <RevealOnScroll>
            <p className="f-label">Background</p>
          </RevealOnScroll>
          <RevealOnScroll delay="d1">
            <h2 className="h2">
              An Editorial Eye,
              <br />
              <em>Rooted in Sicily</em>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay="d2">
            <p>
              My work extends beyond weddings. As an editorial photographer, my
              images have appeared in Vogue Italia, Le Point, Marie Claire,
              L&rsquo;Officiel, and La Cucina Italiana. This background shapes how I see
              your wedding day — not as a checklist of moments to capture, but as
              a story with light, composition, and emotion at its center.
            </p>
            <p>
              I&rsquo;m a member of ANFM (Associazione Nazionale Fotografi
              Matrimonialisti) and my work has been featured on Wezoree&rsquo;s
              curated guide to Sicily&rsquo;s finest wedding venues.
            </p>
            <p>
              But the credential I value most is this: I know Sicily. Not from a
              brochure — from a lifetime of watching its light change. I know
              which streets in Palermo catch the last light, and which courtyards
              in Noto hold it longest.
            </p>
            <p>
              From intimate elopements in Scopello to grand celebrations at
              Villa Igiea, from Baroque Noto to the clifftop terraces of
              Taormina — every Sicilian venue has its own character, its own
              light, its own story. And I&rsquo;ve photographed in most of them.
            </p>
            <p>
              When you hire me, you&rsquo;re not getting a photographer who
              flies in the day before. You&rsquo;re getting someone who already
              knows where the light will be on your wedding day.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay="d3">
            <div className="press-line">
              <span>Vogue Italia</span>
              <span>Le Point</span>
              <span>Marie Claire</span>
              <span>L&rsquo;Officiel</span>
              <span>La Cucina Italiana</span>
              <span>Wezoree</span>
              <span>ANFM</span>
            </div>
          </RevealOnScroll>
        </div>
        <div className="about-credentials-img">
          <RevealOnScroll>
            <div className="floating-frame-container --light">
              <div className="floating-frame">
                {data?.sicilyImage ? (
                  <Image
                    src={urlFor(data.sicilyImage)
                      .fit('crop')
                      .crop('focalpoint')
                      .width(960)
                      .quality(85)
                      .auto('format')
                      .url()}
                    alt={
                      data.sicilyImage.alt ||
                      'Golden hour light in Sicily'
                    }
                    width={480}
                    height={640}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '3/4',
                      background:
                        'linear-gradient(152deg, #ddd6c8, #cec5b4, #bfb4a0)',
                    }}
                  />
                )}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SEZIONE 6 — FAQ (pearl)
          ═══════════════════════════════════════════ */}
      <section className="s-grey pad">
        <FAQ label="Common Questions" items={faqItems} />
      </section>

      {/* ═══════════════════════════════════════════
          SEZIONE 7 — CTA Bridge (white)
          ═══════════════════════════════════════════ */}
      <section className="about-cta-bridge">
        <RevealOnScroll>
          <h2 className="h2">
            Tell Me About <em>Your Day</em>
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay="d1">
          <p>
            Every wedding I photograph begins with a conversation — not a sales
            pitch. Tell me your date, your venue, your vision. I&rsquo;ll tell
            you honestly if I&rsquo;m the right photographer for your story.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay="d2">
          <Link href="/contact" className="btn-fill">
            Get in Touch &rarr;
          </Link>
          <p className="response-time">I respond within 24 hours</p>
        </RevealOnScroll>
      </section>

      {/* ═══════════════════════════════════════════
          SEZIONE 8 — Final CTA (ink)
          ═══════════════════════════════════════════ */}
      <FinalCTA />
    </>
  );
}
