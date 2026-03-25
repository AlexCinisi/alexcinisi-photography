import type { Metadata } from 'next';
import Image from 'next/image';
import { client } from '@/lib/sanity/client';
import { contactPageQuery } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import Breadcrumb from '@/components/sections/Breadcrumb';
import ContactForm from '@/components/sections/ContactForm';
import FinalCTA from '@/components/sections/FinalCTA';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export const revalidate = 60;

/* ── Default values ── */
const DEFAULTS = {
  title: "Let's Start The Conversation.",
  subtitle: 'Every love story begins with a hello. Tell me about your wedding — I read every message personally and respond within 24 hours.',
  email: 'info@alexcinisiphotography.com',
  responseTime: 'Within 24 hours — personally',
  studio: 'Palermo, Sicily',
  languages: 'Italian · English',
  instagram: '@alexcinisi',
  testimonial: {
    quote: "We couldn't have imagined a more perfect experience. Alex captured our day so naturally — we relive it every time we look at the photos.",
    author: 'Anna & Mark',
    location: 'Palermo',
    country: 'United Kingdom',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(contactPageQuery).catch(() => null);
  const title = data?.metaTitle || 'Contact — Begin Your Wedding Story';
  const description = data?.metaDescription || 
    "Get in touch about your Sicily destination wedding. Personal response within 24 hours. Luxury editorial wedding photographer based in Palermo.";

  return {
    title,
    description,
    alternates: {
      canonical: 'https://www.alexcinisiphotography.com/contact',
    },
    openGraph: {
      title: title + ' | Alex Cinisi Photography',
      description,
      url: 'https://www.alexcinisiphotography.com/contact',
      type: 'website',
    },
  };
}

export default async function ContactPage() {
  const data = await client.fetch(contactPageQuery).catch(() => null);

  const title = data?.title || DEFAULTS.title;
  const subtitle = data?.subtitle || DEFAULTS.subtitle;
  const testimonial = data?.sidebarTestimonial?.quote 
    ? data.sidebarTestimonial 
    : DEFAULTS.testimonial;
  const heroTextDark = data?.heroTextDark || false;

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Alex Cinisi Photography',
    description: 'Get in touch for luxury destination wedding photography in Sicily and worldwide.',
    url: 'https://www.alexcinisiphotography.com/contact',
    mainEntity: {
      '@type': 'ProfessionalService',
      name: 'Alex Cinisi Photography',
      email: DEFAULTS.email,
      telephone: '',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Palermo',
        addressRegion: 'Sicily',
        addressCountry: 'IT',
      },
      areaServed: 'Worldwide',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.alexcinisiphotography.com' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://www.alexcinisiphotography.com/contact' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([contactSchema, breadcrumbSchema]) }} />

      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

      {/* ═══ HERO — conditonal: only renders when heroImage is set in Sanity ═══ */}
      {data?.heroImage && (
        <section className={`hero hero--contact ${heroTextDark ? 'hero--dark-text' : ''}`}>
          <div className="hero-bg">
            <Image
              src={urlFor(data.heroImage).fit('crop').crop('focalpoint').width(2400).quality(85).auto('format').url()}
              alt={data.heroImage.alt || 'Contact Alex Cinisi Photography'}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div className="hero-content" style={{ maxWidth: 600 }}>
            <RevealOnScroll>
              <p className="f-label">Inquiries</p>
            </RevealOnScroll>
            <RevealOnScroll delay="d1">
              <h1>
                <span className="l1">{title.split(' ').slice(0, 2).join(' ')}</span>
                <span className="l2"><em>{title.split(' ').slice(2).join(' ')}</em></span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay="d2">
              <p className="hero-sub">{subtitle}</p>
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ═══ FORM SECTION ═══ */}
      <section className="s-white contact-page-section pad">
        <div className="max">
          <div className="contact-grid">
            {/* Sidebar */}
            <div className="contact-sidebar">
              <RevealOnScroll>
                <div className="contact-info-block">
                  <p className="f-label">Response</p>
                  <p className="contact-info-value">{DEFAULTS.responseTime}</p>
                </div>
                <div className="contact-info-block">
                  <p className="f-label">Email</p>
                  <p className="contact-info-value">{DEFAULTS.email}</p>
                </div>
                <div className="contact-info-block">
                  <p className="f-label">Studio</p>
                  <p className="contact-info-value">{DEFAULTS.studio}</p>
                </div>
                <div className="contact-info-block">
                  <p className="f-label">Languages</p>
                  <p className="contact-info-value">{DEFAULTS.languages}</p>
                </div>
                <div className="contact-info-block">
                  <p className="f-label">Social</p>
                  <p className="contact-info-value">{DEFAULTS.instagram}</p>
                </div>
              </RevealOnScroll>

              {/* Testimonial */}
              {testimonial.quote && (
                <RevealOnScroll delay="d1">
                  <blockquote className="contact-testimonial">
                    <p>&ldquo;{testimonial.quote}&rdquo;</p>
                    <cite>{testimonial.author} · {testimonial.country} · {testimonial.location}</cite>
                  </blockquote>
                </RevealOnScroll>
              )}
            </div>

            {/* Form — full props per form completo */}
            <div className="contact-form-wrap">
              <ContactForm
                standalone={true}
                showGuestCount={true}
                showBudget={true}
                showSource={true}
                showPhone={true}
                showPlanner={true}
                showDualInstagram={true}
                showInterestCheckboxes={true}
                ctaText="Request Your Bespoke Proposal →"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <FinalCTA />
    </>
  );
}
