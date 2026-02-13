import RevealOnScroll from '@/components/ui/RevealOnScroll';
import Link from 'next/link';

export default function Manifesto() {
    return (
        <div className="manifesto-grid">
            <RevealOnScroll className="manifesto-copy">
                <div className="f-label" style={{ marginBottom: '22px' }}>Our Philosophy</div>
                <div className="h2-lg" style={{ marginBottom: '28px' }}>This Is Not Just<br />Photography.<br /><em>This Is Your Legacy.</em></div>
                <p>I don&apos;t believe in perfect poses or forced smiles. I believe in <strong>real moments that take your breath away 50 years from now</strong>.</p>
                <p>Your wedding in Sicily isn&apos;t a photoshoot — it&apos;s the beginning of your family&apos;s story. And my job is to make sure every glance, every tear, every burst of laughter is preserved with the kind of artistry <strong>your grandchildren will treasure</strong>.</p>
                <p>Because when the flowers fade and the music stops, what remains is the story told through your photographs. <em>Let&apos;s make it extraordinary.</em></p>
                <div style={{ marginTop: '36px' }}><Link href="#portfolio" className="btn-text">View Selected Work</Link></div>
            </RevealOnScroll>
            <RevealOnScroll className="manifesto-media d2">
                <div className="mf mm1"><div className="iph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" width="28" height="28"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>Your Photo</div></div>
                <div className="mf"><div className="iph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" width="24" height="24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>Your Photo</div></div>
                <div className="mf"><div className="iph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" width="24" height="24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>Your Photo</div></div>
            </RevealOnScroll>
        </div>
    );
}
