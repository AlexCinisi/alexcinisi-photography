'use client';

import RevealOnScroll from '@/components/ui/RevealOnScroll';
import Link from 'next/link';

export default function FinalCTA() {
    return (
        <section className="s-ink pad">
            <div className="final-cta-inner">
                <RevealOnScroll>
                    <div className="h2-lg">Your Legacy Begins<br />In Sicily.</div>
                    <p>The wine will be drunk, the cake will be eaten, and the flowers will wilt. But these photographs will last forever.</p>
                    <Link href="#contact" className="btn-fill" style={{ background: '#FAFAF8', color: '#111110' }}>Start The Journey</Link>
                </RevealOnScroll>
            </div>
        </section>
    );
}
