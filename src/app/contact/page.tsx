import type { Metadata } from 'next';
import ContactForm from '@/components/sections/ContactForm';
import Breadcrumb from '@/components/sections/Breadcrumb';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Contact — Begin Your Wedding Story | Alex Cinisi Photography',
  description: 'Get in touch about your Sicily destination wedding. Personal response within 24 hours. Luxury editorial wedding photographer based in Palermo.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.alexcinisiphotography.com" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.alexcinisiphotography.com/contact" }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Contact' }
      ]} />

      <section className="s-white contact-page-section">
        <div className="max">
          <div className="contact-grid">

            {/* COLONNA SINISTRA — Intro + Details + Testimonianza */}
            <RevealOnScroll className="contact-left">
              <div className="f-label">Inquiries</div>
              <div className="h2" style={{ marginBottom: 20 }}>
                Let&apos;s Start<br />The Conversation.
              </div>
              <p style={{
                fontSize: '.87rem',
                lineHeight: 1.85,
                color: 'var(--charcoal)',
                marginBottom: 14,
                maxWidth: 340
              }}>
                Every love story begins with a hello. Tell me about your wedding — I read every message personally and respond within 24 hours.
              </p>

              <div className="contact-details">
                <div className="cd">
                  <span className="cd-lbl">Response</span>
                  <span className="cd-val">Within 24 hours — personally</span>
                </div>
                <div className="cd">
                  <span className="cd-lbl">Email</span>
                  <span className="cd-val">
                    <a href="mailto:info@alexcinisiphotography.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                      info@alexcinisiphotography.com
                    </a>
                  </span>
                </div>
                <div className="cd">
                  <span className="cd-lbl">Studio</span>
                  <span className="cd-val">Palermo, Sicily</span>
                </div>
                <div className="cd">
                  <span className="cd-lbl">Languages</span>
                  <span className="cd-val">Italian &middot; English</span>
                </div>
                <div className="cd">
                  <span className="cd-lbl">Social</span>
                  <span className="cd-val">
                    <a href="https://www.instagram.com/alexcinisi" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                      @alexcinisi
                    </a>
                  </span>
                </div>
              </div>

              {/* Foto editoriale — è il sito di un fotografo */}
              <div className="contact-photo" style={{
                marginTop: 36,
                position: 'relative',
                aspectRatio: '3 / 4',
                overflow: 'hidden',
                background: 'var(--grey-bg)',
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(155deg, #E8E4DE, #DDD8D1, #D2CCC4)',
                }} />
              </div>

              {/* Testimonianza — posizionata nella colonna sinistra, visibile mentre si compila il form */}
              <blockquote style={{
                marginTop: 40,
                paddingTop: 28,
                borderTop: '1px solid var(--rule)'
              }}>
                <p style={{
                  fontFamily: 'var(--font-bodoni), "Bodoni Moda", serif',
                  fontStyle: 'italic',
                  fontSize: '.95rem',
                  lineHeight: 1.75,
                  color: 'var(--charcoal)',
                  marginBottom: 12,
                  fontWeight: 300
                }}>
                  &ldquo;We couldn&apos;t have imagined a more perfect experience. Alex captured our day so naturally — we relive it every time we look at the photos.&rdquo;
                </p>
                <cite style={{
                  fontStyle: 'normal',
                  fontSize: '.6rem',
                  letterSpacing: '.18em',
                  textTransform: 'uppercase',
                  color: 'var(--mid)'
                }}>
                  Anna &amp; Mark &middot; United Kingdom &middot; Palermo
                </cite>
              </blockquote>
            </RevealOnScroll>

            {/* COLONNA DESTRA — Form standalone */}
            <RevealOnScroll className="contact-right d2">
              <ContactForm
                standalone={true}
                showGuestCount={true}
                showBudget={true}
                showSource={true}
                showPhone={true}
                showPlanner={true}
                showInterestCheckboxes={true}
                ctaText="Request Your Proposal →"
                dateType="text"
                datePlaceholder="June 14, 2026 · or 'Flexible'"
              />

              {/* Trust bullets sotto le form */}
              <div style={{
                display: 'flex',
                gap: 20,
                marginTop: 16,
                flexWrap: 'wrap'
              }}>
                <span style={{ fontSize: '.65rem', letterSpacing: '.06em', color: 'var(--mid)' }}>
                  ✓ Personal response within 24h
                </span>
                <span style={{ fontSize: '.65rem', letterSpacing: '.06em', color: 'var(--mid)' }}>
                  ✓ No obligation
                </span>
                <span style={{ fontSize: '.65rem', letterSpacing: '.06em', color: 'var(--mid)' }}>
                  ✓ Bilingual IT/EN
                </span>
              </div>
            </RevealOnScroll>

          </div>
        </div>
      </section>
    </main>
  );
}
