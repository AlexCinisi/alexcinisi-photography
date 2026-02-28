import React from 'react';
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
    return (
        <>
            <section className="stories-intro-section s-pearl pad">
                <div className="stories-intro">
                    <RevealOnScroll>
                        <div className="f-label">Real Weddings</div>
                        <h2>Every Wedding Story Is<br /><em>Unique</em></h2>
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
