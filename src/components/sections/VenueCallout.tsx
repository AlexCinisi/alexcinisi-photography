import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface VenueCalloutProps {
    label: string;
    title: React.ReactNode;
    content: React.ReactNode;
    imageAlt?: string;
}

export default function VenueCallout({ label, title, content, imageAlt = "Venue Context" }: VenueCalloutProps) {
    return (
        <div className="venue-callout">
            <RevealOnScroll className="vc-copy">
                <div className="f-label" style={{ marginBottom: '22px' }}>{label}</div>
                <div className="h2" style={{ marginBottom: '22px' }}>{title}</div>
                {content}
            </RevealOnScroll>
            <div className="vc-media">
                <div className="iph">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" width="32" height="32"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
                    {imageAlt}
                </div>
            </div>
        </div>
    );
}
