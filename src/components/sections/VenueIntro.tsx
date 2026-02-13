import RevealOnScroll from '@/components/ui/RevealOnScroll';
import Link from 'next/link';

interface VenueIntroProps {
    label: string;
    title: React.ReactNode;
    description: React.ReactNode;
    galleryLinkText?: string;
}

export default function VenueIntro({ label, title, description, galleryLinkText = "See Weddings" }: VenueIntroProps) {
    return (
        <div className="venue-grid">
            <RevealOnScroll className="venue-copy">
                <div className="f-label" style={{ marginBottom: '22px' }}>{label}</div>
                <div className="h2-lg" style={{ marginBottom: '28px' }}>{title}</div>
                {description}
                <div style={{ marginTop: '36px' }}>
                    <Link href="#gallery" className="btn-text">{galleryLinkText}</Link>
                </div>
            </RevealOnScroll>
            <RevealOnScroll className="venue-media d2">
                <div className="vf vm1"><div className="iph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" width="28" height="28"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>Main Space</div></div>
                <div className="vf"><div className="iph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" width="24" height="24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>Detail View</div></div>
                <div className="vf"><div className="iph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" width="24" height="24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>Atmosphere</div></div>
            </RevealOnScroll>
        </div>
    );
}
