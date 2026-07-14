import RevealOnScroll from '@/components/ui/RevealOnScroll'
import SectionHead from '@/components/ui/SectionHead'

interface DecisionPath { label?: string; title?: string; description?: string }
interface GuideDecisionProps { heading?: string; intro?: string; paths?: DecisionPath[] }

export default function GuideDecision({ heading, intro, paths }: GuideDecisionProps) {
  if (!paths?.length) return null
  return (
    <section className="s-pearl pad">
      <div className="max">
        <SectionHead as="h2" label="The First Decision" title={heading || 'Two Ways to Marry in Sicily'} center />
        {intro && (
          <RevealOnScroll>
            <p className="guide-decision-intro">{intro}</p>
          </RevealOnScroll>
        )}
        <RevealOnScroll className="decision-grid">
          {paths.map((path, i) => (
            <div key={i} className="decision-card">
              {path.label && <span className="decision-letter">{path.label}</span>}
              <h3>{path.title}</h3>
              <p>{path.description}</p>
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  )
}
