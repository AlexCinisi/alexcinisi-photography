import RevealOnScroll from '@/components/ui/RevealOnScroll'

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
        <RevealOnScroll>
          <div className="svc-eyebrow">{eyebrow}</div>
          <div className="svc-h2">{heading || 'Three Things I Promise You'}</div>
        </RevealOnScroll>
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
