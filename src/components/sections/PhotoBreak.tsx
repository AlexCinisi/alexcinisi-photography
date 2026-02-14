import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function PhotoBreak() {
    return (
        <RevealOnScroll>
            <section className="photo-break">
                <div className="iph">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" width={42} height={42}>
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                    </svg>
                    Full-Width Wedding Photo
                </div>
            </section>
        </RevealOnScroll>
    );
}
