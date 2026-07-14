import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHead from '@/components/ui/SectionHead'

interface LegalRow { nationality?: string; requirements?: string }
interface GuideLegalProps { heading?: string; rows?: LegalRow[]; disclaimer?: string }

export default function GuideLegal({ heading, rows, disclaimer }: GuideLegalProps) {
  if (!rows?.length) return null
  return (
    <section className="s-white pad">
      <div className="max">
        <SectionHead as="h2" label="Paperwork" title={heading || 'What You Need, by Nationality'} center />
        <RevealOnScroll className="legal-table">
          {rows.map((row, i) => (
            <div key={i} className="legal-row">
              <div className="legal-nat">{row.nationality}</div>
              <div className="legal-req">{row.requirements}</div>
            </div>
          ))}
        </RevealOnScroll>
        {disclaimer && (
          <RevealOnScroll>
            <p className="legal-disclaimer">{disclaimer}</p>
          </RevealOnScroll>
        )}
      </div>
    </section>
  )
}
