import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  label?: string;
  heading?: React.ReactNode;
  items: FAQItem[];
  /** Se true, inietta lo schema FAQPage JSON-LD. Default true. */
  withSchema?: boolean;
}

/**
 * FAQ modulare con accordion <details> nativo (accessibile, no JS lato client).
 * Heading e items via props. Genera opzionalmente lo schema FAQPage.
 */
export default function ServiceFAQ({
  label = 'Questions',
  heading,
  items,
  withSchema = true,
}: ServiceFAQProps) {
  if (!items?.length) return null;

  return (
    <section className="s-pearl pad">
      <div className="max">
        <RevealOnScroll className="sec-head center">
          <div className="f-label">{label}</div>
          {heading && <div className="h2-lg">{heading}</div>}
        </RevealOnScroll>
        <RevealOnScroll className="faq-wrap d1 service-faq-wrap">
          {items.map((f, i) => (
            <details key={i} className="service-faq-item">
              <summary className="service-faq-q">
                <span>{f.question}</span>
                <span className="service-faq-ico">+</span>
              </summary>
              <div className="service-faq-a"><p>{f.answer}</p></div>
            </details>
          ))}
        </RevealOnScroll>
      </div>

      {withSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: items.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }) }}
        />
      )}
    </section>
  );
}
