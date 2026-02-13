import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import Manifesto from '@/components/sections/Manifesto';
import PortfolioGrid from '@/components/sections/PortfolioGrid';
import FilmSection from '@/components/sections/FilmSection';
import Pillars from '@/components/sections/Pillars';
import Investment from '@/components/sections/Investment';
import ProcessSteps from '@/components/sections/ProcessSteps';
import AboutSection from '@/components/sections/AboutSection';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Availability from '@/components/sections/Availability';
import ContactForm from '@/components/sections/ContactForm';
import FinalCTA from '@/components/sections/FinalCTA';

export default function Home() {
    return (
        <main>
            <Hero />
            <TrustBar />
            <Manifesto />
            <PortfolioGrid />
            <FilmSection />
            <Pillars />
            <Investment />
            <ProcessSteps />
            <AboutSection />
            <Testimonials />
            <FAQ />
            <Availability />
            <ContactForm />
            <FinalCTA />
        </main>
    );
}
