"use client";

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface StoryItem {
    couple: string;
    location: string;
    badge: string;
    slug?: string;
    imageGradient: string;
}

const FALLBACK_STORIES: StoryItem[] = [
    {
        couple: 'Marina & James',
        location: 'Villa Valguarnera · Bagheria',
        badge: 'Film + Digital',
        slug: 'marina-james',
        imageGradient: 'linear-gradient(160deg, #2a2825, #1e1c1a, #151412)'
    },
    {
        couple: 'Sophie & David',
        location: 'Taormina · Full Day',
        badge: 'Destination',
        slug: 'sophie-david',
        imageGradient: 'linear-gradient(155deg, #282522, #1c1a18, #131210)'
    },
    {
        couple: 'Lucia & Marco',
        location: 'Tonnara di Scopello',
        badge: 'Editorial',
        slug: 'lucia-marco',
        imageGradient: 'linear-gradient(170deg, #252320, #1a1816, #121110)'
    }
];

export default function FeaturedStories() {
    const introSectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = introSectionRef.current;
        if (!section) return;

        // Color endpoints for background
        const BG_FROM = { r: 245, g: 243, b: 239 }; // pearl
        const BG_TO = { r: 10, g: 10, b: 9 }; // warm-black

        // Color endpoints for text
        const TEXT_FROM = { r: 30, g: 29, b: 27 };     // ink (dark text)
        const TEXT_TO = { r: 230, g: 228, b: 224 };   // off-white (light text)

        // Color endpoints for label/subtitle text
        const LABEL_FROM = { r: 122, g: 118, b: 114 };  // mid
        const LABEL_TO = { r: 180, g: 178, b: 174 };  // lighter mid

        let ticking = false;

        function lerp(from: number, to: number, t: number) {
            return Math.round(from + (to - from) * t);
        }

        function easeInOutCubic(t: number) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function updateColors() {
            const rect = section!.getBoundingClientRect();
            const vh = window.innerHeight;

            // Transition starts when the section is 60% into the viewport from the bottom
            // and completes when the section top reaches 20% from the top
            const scrolledInto = vh - rect.top;
            const startThreshold = vh * 0.4;    // start when 40% of viewport has passed
            const endThreshold = vh * 0.8 + rect.height * 0.3;  // complete well before section leaves

            const rawProgress = (scrolledInto - startThreshold) / (endThreshold - startThreshold);
            const clampedProgress = Math.max(0, Math.min(1, rawProgress));
            const progress = easeInOutCubic(clampedProgress);

            // Background
            const r = lerp(BG_FROM.r, BG_TO.r, progress);
            const g = lerp(BG_FROM.g, BG_TO.g, progress);
            const b = lerp(BG_FROM.b, BG_TO.b, progress);
            section!.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

            // Text colors (h2, p, em)
            const tr = lerp(TEXT_FROM.r, TEXT_TO.r, progress);
            const tg = lerp(TEXT_FROM.g, TEXT_TO.g, progress);
            const tb = lerp(TEXT_FROM.b, TEXT_TO.b, progress);
            section!.style.color = `rgb(${tr}, ${tg}, ${tb})`;

            // Label color (.f-label)
            const label = section!.querySelector('.f-label');
            if (label) {
                const lr = lerp(LABEL_FROM.r, LABEL_TO.r, progress);
                const lg = lerp(LABEL_FROM.g, LABEL_TO.g, progress);
                const lb = lerp(LABEL_FROM.b, LABEL_TO.b, progress);
                (label as HTMLElement).style.color = `rgb(${lr}, ${lg}, ${lb})`;
            }

            // Button/CTA link
            const btn = section!.querySelector('.btn-text');
            if (btn) {
                (btn as HTMLElement).style.color = `rgb(${tr}, ${tg}, ${tb})`;
                (btn as HTMLElement).style.borderBottomColor = `rgba(${tr}, ${tg}, ${tb}, 0.3)`;
            }

            ticking = false;
        }

        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(updateColors);
                ticking = true;
            }
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        updateColors(); // initial state

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <section ref={introSectionRef} className="stories-intro-section s-pearl pad-lg">
                <div className="stories-intro">
                    <RevealOnScroll>
                        <div className="f-label">Real Weddings</div>
                        <h2 className="h2-lg">Every Wedding Story Is<br /><em>Unique</em></h2>
                        <p>Woven with intent, captured with editorial precision. A glimpse into celebrations across Sicily and beyond.</p>
                        <Link href="/portfolio" className="btn-text">See All Stories</Link>
                    </RevealOnScroll>
                </div>
            </section>
            <section className="stories-cards-section s-warm">
                <div className="stories-list">
                    {FALLBACK_STORIES.map((story, i) => {
                        const delays = ["", "d1", "d2"];
                        return (
                            <RevealOnScroll key={i} className="story-card" delay={delays[i] || ""}>
                                <div className="story-card-img">
                                    <div className="story-card-img-ph" style={{ background: story.imageGradient }} />
                                </div>
                                <div className="story-card-copy">
                                    <span className="story-card-badge">{story.badge}</span>
                                    <h3 className="story-card-couple">{story.couple}</h3>
                                    <div className="story-card-venue">{story.location}</div>
                                    <Link href={`/stories/${story.slug || ''}`} className="story-card-cta">
                                        Explore This Story &rarr;
                                    </Link>
                                </div>
                            </RevealOnScroll>
                        );
                    })}
                </div>
            </section>
        </>
    );
}
