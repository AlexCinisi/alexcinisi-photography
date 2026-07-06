import Link from 'next/link'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHead from '@/components/ui/SectionHead'

interface SvcPackage { name?: string; price?: string; includes?: string[] }
interface SvcInvestmentProps { eyebrow?: string; heading?: string; packages?: SvcPackage[]; ctaText?: string; ctaHref?: string }

export default function SvcInvestment({ eyebrow = 'Investment', heading, packages, ctaText = 'Start the conversation →', ctaHref = '/contact' }: SvcInvestmentProps) {
  if (!packages?.length) return null
  return (
    <section className="svc-invest">
      <div className="svc-wrap">
        <SectionHead
          as="h2"
          label={eyebrow}
          title={heading || 'Simple and Transparent'}
          center
        />
        <RevealOnScroll className="svc-inv-grid">
          {packages.map((pkg, i) => (
            <div key={i} className="svc-inv-card">
              {pkg.name && <h3>{pkg.name}</h3>}
              {pkg.price && <span className="svc-inv-price">{pkg.price}</span>}
              {pkg.includes?.length ? (
                <ul>{pkg.includes.map((inc, j) => <li key={j}>{inc}</li>)}</ul>
              ) : null}
            </div>
          ))}
        </RevealOnScroll>
        <div className="svc-invest-cta">
          <Link href={ctaHref} className="svc-btn">{ctaText}</Link>
        </div>
      </div>
    </section>
  )
}
