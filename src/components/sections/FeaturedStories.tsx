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
        imageGradient: 'linear-gradient(155deg, #EDE9E3, #E2DDD6, #D8D2C9)'
    },
    {
        couple: 'Sophie & David',
        location: 'Taormina · Full Day',
        badge: 'Destination',
        slug: 'sophie-david',
        imageGradient: 'linear-gradient(148deg, #E8E4DE, #DDD8D1, #D2CCC4)'
    },
    {
        couple: 'Lucia & Marco',
        location: 'Tonnara di Scopello',
        badge: 'Editorial',
        slug: 'lucia-marco',
        imageGradient: 'linear-gradient(162deg, #F0ECE6, #E5E0D9, #DAD4CC)'
    }
];

export default function FeaturedStories() {
    const introSectionRef = useRef<HTMLElement>(null);
    const hScrollSectionRef = useRef<HTMLDivElement>(null);
    const hScrollStickyRef = useRef<HTMLDivElement>(null);
    const hScrollFrameRef = useRef<HTMLDivElement>(null);

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
            // Transition starts when section top passes viewport top (rect.top ≤ 0)
            // Completes when 70% of the section has scrolled past the viewport top
            const scrolledPast = Math.max(0, -rect.top);
            const transitionDistance = rect.height * 0.7;
            const rawProgress = scrolledPast / transitionDistance;
            const clampedProgress = Math.max(0, Math.min(1, rawProgress));
            const progress = easeInOutCubic(clampedProgress);

            // Background
            const r = lerp(BG_FROM.r, BG_TO.r, progress);
            const g = lerp(BG_FROM.g, BG_TO.g, progress);
            const b = lerp(BG_FROM.b, BG_TO.b, progress);
            section!.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

            // Sync the sticky container background with the intro transition
            const sticky = hScrollStickyRef.current;
            if (sticky) {
                sticky.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            }

            // CTA changes color to stay visible
            const cta = section!.querySelector('.stories-intro-cta-link');
            if (cta) {
                const tr = lerp(TEXT_FROM.r, TEXT_TO.r, progress);
                const tg = lerp(TEXT_FROM.g, TEXT_TO.g, progress);
                const tb = lerp(TEXT_FROM.b, TEXT_TO.b, progress);
                (cta as HTMLElement).style.color = `rgb(${tr}, ${tg}, ${tb})`;
                (cta as HTMLElement).style.borderBottomColor = `rgba(${tr}, ${tg}, ${tb}, 0.4)`;
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

    // Horizontal scroll mechanism
    useEffect(() => {
        // Only enable h-scroll on desktop
        if (window.innerWidth <= 960) return;

        const section = hScrollSectionRef.current;
        const sticky = hScrollStickyRef.current;
        const frame = hScrollFrameRef.current;
        if (!section || !sticky || !frame) return;

        let ticking = false;

        function updateScroll() {
            const sectionRect = section!.getBoundingClientRect();
            const sectionTop = section!.offsetTop;
            const sectionHeight = section!.offsetHeight;
            const viewportHeight = window.innerHeight;
            const scrollDistance = sectionHeight - viewportHeight;

            if (scrollDistance <= 0) {
                ticking = false;
                return;
            }

            // Calculate how far we've scrolled through the section
            const scrolled = window.scrollY - sectionTop;
            const rawProgress = scrolled / scrollDistance;
            const progress = Math.max(0, Math.min(1, rawProgress));

            // Apply horizontal translation
            const totalWidth = frame!.scrollWidth;
            const translateX = progress * (totalWidth - window.innerWidth);
            frame!.style.transform = `translate3d(-${translateX}px, 0, 0)`;

            ticking = false;
        }

        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        updateScroll(); // initial position

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <section ref={introSectionRef} className="stories-intro-section s-pearl pad-lg">
                <div className="stories-intro">
                    <RevealOnScroll>
                        <div className="f-label">Real Weddings</div>
                        <h2 className="h2-lg">
                            Every Wedding Story Is<br />
                            <em>Unique</em>
                        </h2>
                        <div className="stories-intro-bottom">
                            <div className="stories-intro-description">
                                <p>The way he looked at you<br />before anyone else noticed.</p>
                                <p>A detail you chose with care.<br />A moment you almost missed.</p>
                                <p>Preserved with the intention<br />it deserves.</p>
                            </div>
                        </div>
                        <Link href="/stories" className="stories-intro-cta-link">See All Stories</Link>
                    </RevealOnScroll>
                </div>
            </section>
            <div
                className="stories-hscroll-section"
                ref={hScrollSectionRef}
                style={{ height: `${FALLBACK_STORIES.length * 100}vh` }}
            >
                <div className="stories-hscroll-sticky" ref={hScrollStickyRef}>
                    <div
                        className="stories-hscroll-frame"
                        ref={hScrollFrameRef}
                        style={{ width: `${FALLBACK_STORIES.length * 100}vw` }}
                    >
                        {FALLBACK_STORIES.map((story, i) => (
                            <div key={i} className="story-card-h">
                                <div className="story-card-h-img">
                                    <div
                                        className="story-card-img-ph"
                                        style={{
                                            background: [
                                                'linear-gradient(155deg, #EDE9E3, #E2DDD6, #D8D2C9)',
                                                'linear-gradient(148deg, #E8E4DE, #DDD8D1, #D2CCC4)',
                                                'linear-gradient(162deg, #F0ECE6, #E5E0D9, #DAD4CC)',
                                            ][i] || '#E8E5E0'
                                        }}
                                    />
                                </div>
                                <div className="story-card-h-copy">
                                    <span className="story-card-badge">{story.badge}</span>
                                    <h3 className="story-card-couple">{story.couple}</h3>
                                    <span className="story-card-venue">{story.location}</span>
                                    <Link href={`/stories/${story.slug || story.couple.toLowerCase().replace(/\s&\s/g, '-').replace(/\s/g, '-')}`} className="story-card-cta">
                                        Explore This Story &rarr;
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
