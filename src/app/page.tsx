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

export default function Home() {
    return (
        <>
            {/* 1 */}  <Hero />
            {/* 2 */}  <TrustBar />
            {/* 3 */}  <ProofBar />
            {/* 4 */}  <Manifesto />
            {/* 5 */}  <Pillars />
            {/* 6 */}  <PortfolioGrid />
            {/* 7 */}  <Testimonials />
            {/* 8 */}  <FilmSection />
            {/* 9 */}  <Investment />
            {/* 10 */}  <ProcessSteps />
            {/* 11 */}  <AboutSection />
            {/* 12 */}  <LocationsGrid />
            {/* 13 */}  <PhotoBreak />
            {/* 14 */}  <FAQ />
            {/* 15 */}  <Availability />
            {/* 16 */}  <ContactForm
                showGuestCount={false}
                showBudget={false}
                showSource={false}
                showPhone={false}
                showPlanner={false}
                ctaText="Tell Me About Your Wedding →"
                interests={["Wedding Photography", "Elopement", "Couple Session"]}
            />
            {/* 17 */}  <FinalCTA />
        </>
    );
}
