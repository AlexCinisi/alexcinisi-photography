import Link from 'next/link';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface Package {
  name?: string;
  price?: string;
  includes?: string[];
}

interface ServiceInvestmentProps {
  label?: string;
  heading?: React.ReactNode;
  packages: Package[];
  ctaText?: string;
  ctaHref?: string;
  background?: 'pearl' | 'white';
}

/**
 * Investment modulare. La griglia si adatta al numero di pacchetti
 * (1, 2 o 3 colonne). Prezzo in Bodoni corsivo. Testi e CTA via props.
 */
export default function ServiceInvestment({
  label = 'Investment',
  heading,
  packages,
  ctaText,
  ctaHref,
  background = 'white',
}: ServiceInvestmentProps) {
  if (!packages?.length) return null;

  // colonne = numero pacchetti (max 3), gestito via data-attribute per il CSS
  const cols = Math.min(packages.length, 3);

  return (
    <section className={`s-${background} pad`}>
      <div className="max">
        <RevealOnScroll className="sec-head">
          {label && <div className="f-label">{label}</div>}
          {heading && <div className="h2-lg">{heading}</div>}
        </RevealOnScroll>
        <RevealOnScroll className="service-invest-grid" data-cols={cols}>
          {packages.map((pkg, i) => (
            <div key={i} className="service-invest-card">
              {pkg.name && <h3>{pkg.name}</h3>}
              {pkg.price && <span className="service-invest-price">{pkg.price}</span>}
              {pkg.includes?.length ? (
                <ul>
                  {pkg.includes.map((inc, j) => <li key={j}>{inc}</li>)}
                </ul>
              ) : null}
            </div>
          ))}
        </RevealOnScroll>
        {ctaText && ctaHref && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href={ctaHref} className="btn-fill">{ctaText}</Link>
          </div>
        )}
      </div>
    </section>
  );
}
