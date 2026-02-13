import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function Availability() {
    return (
        <section className="s-grey pad">
            <div className="max">
                <RevealOnScroll className="avail-inner">
                    <div>
                        <div className="f-label">Availability Update</div>
                        <div className="h2">2026 Season<br />Calendar Status</div>
                        <p>I accept a limited number of weddings per year (25 max) to ensure I can give every couple my full creative energy and attention. Late Summer/Autumn dates are booking rapidly.</p>
                    </div>
                    <div className="avail-cards">
                        <div className="avail-card">
                            <div className="avail-yr">2025</div>
                            <div className="avail-st">Fully Booked<span>Waitlist Only</span></div>
                            <div style={{ marginLeft: 'auto' }}><div className="avail-dot open"></div></div>
                        </div>
                        <div className="avail-card">
                            <div className="avail-yr">2026</div>
                            <div className="avail-st">Booking Now<span>Apr, May, Jun, Sep, Oct</span></div>
                            <div style={{ marginLeft: 'auto' }}><div className="avail-dot soon"></div></div>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}
