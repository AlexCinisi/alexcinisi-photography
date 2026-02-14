import Link from 'next/link';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function Manifesto() {
    return (
        <div className="manifesto-grid">
            <div className="manifesto-media">
                <div className="iph" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" width={36} height={36}>
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                    </svg>
                    Emotional Moment
                </div>
            </div>
            <RevealOnScroll className="manifesto-copy">
                <div className="f-label" style={{ marginBottom: '22px' }}>Our Philosophy</div>
                <div className="h2-lg" style={{ marginBottom: '28px' }}>
                    This Is Not Just<br />Photography.<br /><em>This Is Your Legacy.</em>
                </div>
                <p>I don&apos;t believe in perfect poses or forced smiles. I believe in <strong>real moments that take your breath away 50 years from now</strong>.</p>
                <p>Your wedding in Sicily isn&apos;t a photoshoot — it&apos;s the beginning of your family&apos;s story. The nervous laughter before the ceremony. The father who can barely hold it together. The way <em>you two look at each other when nobody&apos;s watching</em>.</p>
                <p>That&apos;s what I live to capture. As a <strong>luxury wedding photographer in Sicily</strong>, my approach blends photojournalistic instinct with editorial elegance — quiet, intuitive, and deeply human.</p>
                <Link href="#about" className="btn-text" style={{ marginTop: '22px' }}>More About My Approach</Link>
            </RevealOnScroll>
        </div>
    );
}
