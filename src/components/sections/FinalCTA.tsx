import Link from 'next/link';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function FinalCTA() {
    return (
        <section className="s-ink pad">
            <RevealOnScroll className="final-cta-inner">
                <div className="f-label" style={{ justifyContent: 'center', marginBottom: '24px', color: 'rgba(250,250,248,.35)' }}>Your Story Awaits</div>
                <div className="h2-lg" style={{ color: 'var(--off-white)', marginBottom: '20px' }}>
                    Fifty Years From Now,<br />You&apos;ll Open This Album<br /><em>And Fall In Love Again</em>
                </div>
                <p>That&apos;s not a promise — it&apos;s the standard. Every image I create is designed to make you feel exactly what you felt in that moment, forever.</p>
                <Link href="#contact" className="btn-fill" style={{ background: 'var(--off-white)', color: 'var(--ink)' }}>Begin Your Story →</Link>
            </RevealOnScroll>
        </section>
    );
}
