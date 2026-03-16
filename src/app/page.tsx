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
import PhotoPause from '@/components/sections/PhotoPause'
import FeaturedStories from '@/components/sections/FeaturedStories'
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
            <Hero image={homePage?.heroImage} alt={homePage?.heroImage?.alt} />
            <TrustBar />
            <ProofBar logos={homePage?.proofLogos} />
            <PhotoPause
                image={homePage?.photoBreakImage1}
                alt={homePage?.photoBreakImage1?.alt || 'Wedding photography by Alex Cinisi'}
                fallbackGradient="linear-gradient(160deg, #c4baa8 0%, #a89e8c 40%, #8c836e 100%)"
            />
            <Manifesto image={homePage?.manifestoImage} alt={homePage?.manifestoImage?.alt} />
            <Pillars />
            <FeaturedStories />
            <PortfolioGrid items={portfolio} />
            <AboutSection image={homePage?.aboutImage} alt={homePage?.aboutImage?.alt} />
            <FilmSection image={homePage?.filmSectionImage} alt={homePage?.filmSectionImage?.alt} />
            <Testimonials items={testimonials} />
            <Investment />
            <PhotoPause
                image={homePage?.photoBreakImage2}
                alt={homePage?.photoBreakImage2?.alt || 'Luxury destination wedding in Sicily'}
                fallbackGradient="linear-gradient(155deg, #b8ac98 0%, #9e9280 40%, #8a7e6a 100%)"
            />
            <ProcessSteps />
            <LocationsGrid />
            <PhotoPause
                image={homePage?.photoBreakImage3}
                alt={homePage?.photoBreakImage3?.alt || 'Destination wedding photography in Sicily'}
                fallbackGradient="linear-gradient(150deg, #c0b4a0 0%, #a49888 40%, #887c6c 100%)"
            />
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
