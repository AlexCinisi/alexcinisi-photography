import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHead from '@/components/ui/SectionHead'

interface SvcPillar { title: string; description: string }
interface SvcApproachProps {
  eyebrow?: string
  heading?: string
  pillars?: SvcPillar[]
}

export default function SvcApproach({ eyebrow = 'How I Work', heading, pillars }: SvcApproachProps) {
  if (!pillars?.length) return null
  return (
    <section className="svc-approach">
      <div className="svc-wrap">
        <SectionHead
          as="h2"
          label={eyebrow}
          title={heading || 'Three Things I Promise You'}
        />
        <RevealOnScroll className="svc-pillars">
          {pillars.map((p, i) => (
            <div key={i} className="svc-pillar">
              <div className="svc-pillar-n">{['i.', 'ii.', 'iii.', 'iv.'][i] || `${i + 1}.`}</div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
