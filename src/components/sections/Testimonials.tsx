import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function Testimonials() {
    const star = (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );

    return (
        <section className="s-white pad">
            <div className="max">
                <div className="sec-head center">
                    <div className="f-label">Kind Words</div>
                    <div className="h2">Couples in Love</div>
                </div>
                <RevealOnScroll className="test-grid">
                    <div className="tcard">
                        <span className="tcard-flag">🇺🇸</span>
                        <div className="tcard-stars"><span>{star}{star}{star}{star}{star}</span></div>
                        <p className="tcard-quote">"We were nervous about booking a photographer from abroad, but Alex made it so easy. The photos... they are just masterpieces."</p>
                        <div className="tcard-auth"><strong>Sarah &amp; Mike</strong><span>Married in Taormina</span></div>
                    </div>
                    <div className="tcard">
                        <span className="tcard-flag">🇬🇧</span>
                        <div className="tcard-stars"><span>{star}{star}{star}{star}{star}</span></div>
                        <p className="tcard-quote">"He felt like a friend. He calmed us down when the rain started, and took the most incredible rainy photos I've ever seen."</p>
                        <div className="tcard-auth"><strong>Emma &amp; Liam</strong><span>Married in Cefalù</span></div>
                    </div>
                    <div className="tcard">
                        <span className="tcard-flag">🇦🇺</span>
                        <div className="tcard-stars"><span>{star}{star}{star}{star}{star}</span></div>
                        <p className="tcard-quote">"The film photos are everything. They have this timeless quality that we just love. Worth every single penny."</p>
                        <div className="tcard-auth"><strong>Olivia &amp; Noah</strong><span>Married in Noto</span></div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}
