import { client as sanityClient } from '@/lib/sanity/client';
import { homePageQuery, featuredPortfolioQuery, featuredTestimonialsQuery } from '@/lib/sanity/queries';

import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import ProofBar from "@/components/sections/ProofBar";
import Manifesto from "@/components/sections/Manifesto";
import Pillars from "@/components/sections/Pillars";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import Testimonials from "@/components/sections/Testimonials";
import FilmSection from "@/components/sections/FilmSection";
import Investment from "@/components/sections/Investment";
import ProcessSteps from "@/components/sections/ProcessSteps";
import AboutSection from "@/components/sections/AboutSection";
import LocationsGrid from "@/components/sections/LocationsGrid";
import PhotoBreak from "@/components/sections/PhotoBreak";
import FAQ from "@/components/sections/FAQ";
import Availability from "@/components/sections/Availability";
import ContactForm from "@/components/sections/ContactForm";
import FinalCTA from "@/components/sections/FinalCTA";

export default async function Home() {
    const [homePage, portfolio, testimonials] = await Promise.all([
        sanityClient.fetch(homePageQuery).catch(() => null),
        sanityClient.fetch(featuredPortfolioQuery).catch(() => null),
        sanityClient.fetch(featuredTestimonialsQuery).catch(() => null),
    ]);

    return (
        <>
            <Hero image={homePage?.heroImage} />
            <TrustBar />
            <ProofBar logos={homePage?.proofLogos} />
            <Manifesto image={homePage?.manifestoImage} />
            <Pillars />
            <PortfolioGrid items={portfolio} />
            <Testimonials items={testimonials} />
            <FilmSection image={homePage?.filmSectionImage} />
            <Investment />
            <ProcessSteps />
            <AboutSection image={homePage?.aboutImage} />
            <LocationsGrid />
            <PhotoBreak image={homePage?.photoBreakImage} />
            <FAQ />
            <Availability />
            <ContactForm
                showGuestCount={false}
                showBudget={false}
                showSource={false}
                showPhone={false}
                showPlanner={false}
                ctaText="Tell Me About Your Wedding →"
                interests={["Wedding Photography", "Elopement", "Couple Session"]}
            />
            <FinalCTA />
        </>
    );
}
