import type { Metadata } from 'next';
import Breadcrumb from '@/components/sections/Breadcrumb';
import HeroLocation from '@/components/sections/HeroLocation';
import TrustBar from '@/components/sections/TrustBar';
import VenueIntro from '@/components/sections/VenueIntro';
import VenueDetails from '@/components/sections/VenueDetails';
import PortfolioGrid from '@/components/sections/PortfolioGrid';
import Pillars from '@/components/sections/Pillars';
import VenueCallout from '@/components/sections/VenueCallout';
import Investment from '@/components/sections/Investment';
import ProcessSteps from '@/components/sections/ProcessSteps';
import AboutSection from '@/components/sections/AboutSection';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Availability from '@/components/sections/Availability';
import ContactForm from '@/components/sections/ContactForm';
import FinalCTA from '@/components/sections/FinalCTA';

// Metadata
export const metadata: Metadata = {
    title: "Villa Igiea Wedding Photographer | Alex Cinisi – Palermo, Sicily",
    description: "Editorial wedding photographer at Villa Igiea, Palermo. Timeless, refined imagery for discerning couples at Sicily's most iconic Art Nouveau venue. Investment from €2,500.",
    alternates: {
        canonical: '/locations/villa-igiea-wedding-photographer',
    },
};

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Schema Markup
    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Alex Cinisi Photography — Villa Igiea Weddings",
        "description": "Editorial wedding photographer specialising in luxury weddings at Villa Igiea, Palermo, Sicily.",
        "url": "https://www.alexcinisiphotography.com/villa-igiea-wedding-photographer/",
        "image": "https://www.alexcinisiphotography.com/wp-content/uploads/villa-igiea-wedding.webp",
        "telephone": "",
        "email": "info@alexcinisiphotography.com",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Palermo",
            "addressRegion": "Sicily",
            "addressCountry": "IT"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 38.1457,
            "longitude": 13.3418
        },
        "priceRange": "€€",
        "areaServed": ["Palermo", "Sicily", "Italy"],
        "knowsAbout": ["Wedding Photography", "Villa Igiea", "Destination Wedding", "Editorial Photography"],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Wedding Photography Packages",
            "itemListElement": {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Villa Igiea Wedding Photography"
                },
                "priceSpecification": {
                    "@type": "PriceSpecification",
                    "priceCurrency": "EUR",
                    "minPrice": "2500"
                }
            }
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How much does a wedding photographer at Villa Igiea cost?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Alex Cinisi Photography offers Villa Igiea wedding coverage starting from €2,500. Most couples invest between €2,500 and €3,500, which includes full-day coverage, edited high-resolution images, and a premium 30×20cm wedding album."
                }
            },
            {
                "@type": "Question",
                "name": "What are the best photo spots at Villa Igiea?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Villa Igiea offers exceptional photo locations including the Art Nouveau Sala Basile with its Liberty-style frescoes, the Terrazza Mare overlooking the Gulf of Palermo, the Belle Époque Ballroom, the tiered English gardens, and the picturesque temple nestled in the grounds."
                }
            },
            {
                "@type": "Question",
                "name": "How far in advance should we book a photographer for Villa Igiea?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For Villa Igiea weddings, booking 8-12 months in advance is recommended, especially for peak season (May-October). This ensures availability and allows time for pre-wedding planning, venue scouting, and timeline coordination."
                }
            }
        ]
    };

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Stories', href: '/stories' },
                    { label: 'Villa Igiea Wedding Photographer' }
                ]}
            />

            <HeroLocation
                eyebrow="Villa Igiea · Palermo, Sicily"
                titleL1="Your Villa Igiea"
                titleL2="Wedding, Captured"
                titleL3="With Timeless Artistry"
                subtitle="Editorial wedding photographer at Palermo's most iconic Art Nouveau palazzo. Where Florio dynasty grandeur meets your love story — preserved with the elegance it deserves."
                scrollText="Scroll to discover"
                locationTag="Villa Igiea · Palermo"
            />

            <TrustBar items={[
                { number: "5★", label: <>Rocco Forte<br />Venue</> },
                { number: "1900", label: <>Art Nouveau<br />Heritage</> },
                { number: "72", label: <>Guest Rooms<br />& Suites</> },
                { number: "Gulf", label: <>of Palermo<br />Views</> },
                { number: "Film", label: <>Film & Digital<br />Artistry</> }
            ]} />

            <VenueIntro
                label="The Venue"
                title={<>Where History<br />Meets <em>Your Love Story</em></>}
                description={
                    <>
                        <p>Villa Igiea is not merely a venue. It is a <strong>living masterpiece</strong> — a turn-of-the-century palazzo where the Florio dynasty once hosted royalty, where Ernesto Basile's Art Nouveau vision still breathes in every fresco, and where the Gulf of Palermo stretches endlessly beyond the terraces.</p>
                        <p>As your photographer, I know every corner of this extraordinary place. The way <strong>golden hour light floods the Sala Basile</strong>, painting its Liberty-style frescoes in warm amber. The quiet intimacy of the English Garden at dusk. The sweeping drama of the Terrazza Mare as the Tyrrhenian Sea turns to silk beneath a Sicilian sunset.</p>
                        <p>This isn't a location I photograph at. <em>It's a place I understand — deeply, personally, artistically.</em></p>
                    </>
                }
                galleryLinkText="See Villa Igiea Weddings"
            />

            <VenueDetails
                label="Best Photo Locations"
                title={<>Every Corner Tells<br />a <em>Different Story</em></>}
                items={[
                    { icon: "✦", title: "Sala Basile", description: "The jewel of Villa Igiea. Liberty-style frescoes by Ettore De Maria Bergler create a setting that feels like stepping inside a painting. Perfect for intimate portraits with extraordinary depth." },
                    { icon: "◯", title: "Terrazza Mare", description: "Overlooking the entire Gulf of Palermo, this sun-drenched terrace offers breathtaking backdrops from golden hour to blue hour. Where sea, sky and your story become one." },
                    { icon: "◇", title: "Belle Époque Ballroom", description: "The grandeur of a bygone era. High ceilings, crystal chandeliers, marble floors — a magnificent setting for your reception that photographs with timeless sophistication." },
                    { icon: "▽", title: "Tiered Gardens & Temple", description: "The hidden gem. Lush Mediterranean greenery cascading toward the sea, with a picturesque stone temple tucked within the grounds. Magical for ceremony and couple portraits." }
                ]}
            />

            <PortfolioGrid
                intro={{
                    label: "Villa Igiea Gallery",
                    title: <>Love Stories at<br /><em>Villa Igiea</em></>,
                    note: "Every frame captures the Art Nouveau grandeur and Mediterranean light that make this venue extraordinary."
                }}
                legacyItems={[
                    { title: "Amber & Art", subtitle: "Sala Basile · Luxury Wedding", badge: "Featured" },
                    { title: "Terrazza Mare Sunset", subtitle: "Golden Hour · Gulf of Palermo", badge: "Editorial" },
                    { title: "Garden Ceremony", subtitle: "Temple · English Garden", badge: "Ceremony" },
                    { title: "Bridal Details", subtitle: "Liberty Suite · Getting Ready", badge: "Details" },
                    { title: "Couple Portraits", subtitle: "Tiered Gardens · Blue Hour", badge: "Portraits" },
                    { title: "Belle Époque Reception", subtitle: "Ballroom · Full Day", badge: "Reception" }
                ]}
                ctaText="View Full Villa Igiea Story"
                ctaLink="https://www.alexcinisiphotography.com/villa-igiea-wedding-a-luxury-love-story/"
            />

            <Pillars
                intro={{
                    label: "Why Choose Me for Villa Igiea",
                    title: <>A Photographer Who<br /><em>Knows This Place</em></>
                }}
                items={[
                    { number: "01", title: "I Understand the Light", description: "Villa Igiea's light changes dramatically throughout the day. I know exactly when the Sala Basile glows with soft warmth, when the terrace catches the perfect golden hour, and where to find the most flattering natural light in every season.", quote: "Alex captured light in ways I didn't think were possible. Every photo feels like a painting.", quoteAuthor: "Amber & Art, USA" },
                    { number: "02", title: "Discreet & Elegant Presence", description: "You won't feel watched. My approach is quiet, intuitive, respectful. You live your day — I capture it unfolding naturally. No intrusive directions. No awkward poses. Just real moments, elevated with editorial sensibility.", quote: "We forgot there was a photographer. Every image feels effortlessly natural.", quoteAuthor: "Carola & Giovanni, Italy" },
                    { number: "03", title: "Meticulous Organisation", description: "From timeline planning to venue coordination, I work seamlessly with Villa Igiea's events team and your wedding planner. You receive a detailed shooting plan before the day — so everything flows with calm precision.", quote: "Everything was planned to perfection. Zero stress. Zero surprises. Just beautiful moments.", quoteAuthor: "Giorgio & Alessia, Italy" }
                ]}
            />

            <VenueCallout
                label="Villa Igiea & Palermo"
                title={<>More Than a Venue.<br /><em>A Destination.</em></>}
                content={
                    <>
                        <p>Your Villa Igiea wedding isn't just about the ceremony and reception. Palermo offers an extraordinary backdrop for pre-wedding shoots, rehearsal dinners, and morning-after brunches.</p>
                        <p>From the Baroque splendour of Piazza Pretoria to the vibrant chaos of Vucciria Market, from hidden courtyards to dramatic coastlines — I can guide you to locations that transform your wedding weekend into a complete visual narrative.</p>
                        <p style={{ color: 'rgba(250,250,248,.75)' }}><strong style={{ color: 'var(--off-white)' }}>Based in Sicily, I know Palermo the way only a local can.</strong> Not as a tourist with a camera — but as someone who has walked these streets for years, discovering light and beauty in every corner.</p>
                    </>
                }
                imageAlt="Palermo Cityscape"
            />

            <Investment
                price="€ 2,500"
                priceRange="Most couples invest between €2,500 – €3,500"
                includes={[
                    "Full wedding day coverage — 8 hours",
                    "Professional photographer dedicated to your day",
                    "300 – 500 beautifully edited high-resolution images",
                    "Private online gallery with sharing & download",
                    "Premium 30×20cm wedding album included",
                    "High-resolution files with full print rights",
                    "Pre-wedding consultation & Villa Igiea scouting",
                    "Sneak peek delivery within 48–72 hours"
                ]}
                ctaText="Request Your Villa Igiea Proposal"
                signatureQuote={<>"Your Villa Igiea wedding<br />deserves nothing less than<br />extraordinary photographs."</>}
            />

            <ProcessSteps />

            <AboutSection />

            <Testimonials
                items={[
                    { flag: "🇺🇸", quote: "The light, the atmosphere, the emotions — everything felt real. Alex made us comfortable instantly, and the photos are beyond anything we dreamed. If you want art, not just pictures, he's your person.", author: "Amber & Art", location: "USA · Villa Igiea, Palermo" },
                    { flag: "🇬🇧", quote: "We couldn't have imagined a more perfect experience. Alex planned every detail and captured our day so naturally — we relive it every time we look at the photos. Truly extraordinary.", author: "Anna & Mark", location: "United Kingdom · Palermo" },
                    { flag: "🇮🇹", quote: "Alex captured our wedding with elegance and sensitivity. Every image feels natural, timeless, deeply emotional. His knowledge of Villa Igiea made all the difference.", author: "Carola & Giovanni", location: "Italy · Villa Igiea, Palermo" },
                    { flag: "🇩🇪", quote: "We flew from Berlin for our Sicilian wedding and Alex exceeded every expectation. Professional, creative, respectful — and the album is a work of art we'll treasure forever.", author: "Katharina & Felix", location: "Germany · Palermo, Sicily" },
                    { flag: "🇮🇹", quote: "Professionalità e discrezione assoluta. Alex ha immortalato ogni istante con una sensibilità rara. Le nostre foto sono esattamente come volevamo — eleganti, naturali, emozionanti.", author: "Giorgio & Alessia", location: "Italy · Villa Alliata Cardillo" }
                ]}
            />

            <FAQ
                label="Questions About Villa Igiea"
                items={[
                    { q: "How much does a wedding photographer at Villa Igiea cost?", a: "My Villa Igiea wedding photography starts from €2,500. Most couples invest between €2,500 and €3,500, which includes full-day coverage, 300–500 edited images, and a premium 30×20cm album. Every proposal is tailored to your specific needs." },
                    { q: "What are the best photo spots at Villa Igiea?", a: "The Sala Basile (Art Nouveau frescoes), Terrazza Mare (Gulf of Palermo views), Belle Époque Ballroom, tiered English gardens, and the stone temple are all extraordinary. I'll recommend the perfect spots based on your timeline and the light on your date." },
                    { q: "How far in advance should we book?", a: "For Villa Igiea weddings, I recommend booking 8–12 months in advance, especially for peak season (May–October). I accept a limited number of weddings per month to ensure every couple receives my complete creative attention." },
                    { q: "Do you coordinate with Villa Igiea's events team?", a: "Absolutely. I have an established relationship with Villa Igiea's coordination team and work seamlessly with their schedules, access protocols, and venue guidelines. This ensures a smooth, stress-free experience on your day." },
                    { q: "Can we do a pre-wedding shoot at Villa Igiea?", a: "Yes — and I highly recommend it. An engagement session at Villa Igiea or around Palermo helps you get comfortable in front of the camera, explore locations, and create beautiful images before the wedding day." },
                    { q: "When will we receive our photos?", a: "Sneak peeks arrive within 48–72 hours. Your complete, beautifully edited gallery is delivered within 6–8 weeks. Your 30×20cm album follows after a collaborative design process to ensure every page is perfect." },
                    { q: "What if it rains on our wedding day?", a: "Villa Igiea has stunning indoor spaces that photograph beautifully in any weather. The Sala Basile and Belle Époque Ballroom are extraordinary rain backups. Some of my most cinematic images have been captured in unexpected weather — moody, atmospheric, unforgettable." },
                    { q: "Do you speak English?", a: "Fluently. I work with international couples regularly and communicate seamlessly in both Italian and English throughout the planning process and on your wedding day." }
                ]}
            />

            <Availability
                items={[
                    { year: "2026", status: "Select dates still available", substatus: "Spring & Autumn openings remaining", dotClass: "open" },
                    { year: "2027", status: "Now accepting enquiries", substatus: "Secure your date early", dotClass: "soon" }
                ]}
                text="To ensure every couple at Villa Igiea receives my complete creative attention, I accept a carefully curated number of weddings each year. Peak season (May–October) books 8–12 months in advance."
            />

            <ContactForm
                showGuestCount={true}
                showBudget={true}
                showSource={true}
                messageLabel="Tell me about your Villa Igiea vision *"
                venueHidden={true}
                venueValue="Villa Igiea"
                dateType="text"
                datePlaceholder="June 14, 2026 · or 'TBD'"
                showInterestCheckboxes={true}
            />
            {/* 
         Correction on ContactForm:
         The HTML form has:
         - First Name, Last Name, Email, Phone
         - Wedding Date (text)
         - Guest Count (select) -> showGuestCount=true
         - How did you find us? (select) -> showSource=true
         - Estimated Investment (select) -> showBudget=true
         - Tell me about... (textarea) -> messageLabel="..."
         - Checkboxes -> showInterestCheckboxes=true

         My refactored ContactForm has 'venueLabel' mapped to "Date" in my usage above? No.
         Standard form: Venue/Location input.
         Villa Igiea form: DOES NOT HAVE Venue input! It has "Wedding Date" and then "Guest Count". 
         It assumes Venue is Villa Igiea.
         
         I need to adjust the ContactForm usage to hide venue if not needed, or just pass context.
         Actually, the HTML form has "Wedding Date" as a full width field.
         And NO "Venue" field (implied).

         My refactored ContactForm has a specific order. 
         I should probably just accept that I might have slightly different fields or allow hiding venue.
         I'll hide venuePlaceholder by passing a prop or just let it be "Venue / Location" but fill it with "Villa Igiea" automatically?
         
         Let's update ContactForm one more time to be more flexible if needed, or just use it as is.
         
         The HTML form:
         <div class="fg full"><label>Wedding Date *</label><input type="text" placeholder="June 14, 2026 · or 'TBD'"></div>
         <div class="fg"><label>Guest Count *</label>...</div>
         <div class="fg"><label>How did you find us?</label>...</div>
         <div class="fg full"><label>Estimated Photography Investment *</label>...</div>

         My current ContactForm:
         Date input (type date).
         Venue input (type text).
         
         I should update ContactForm to allow Date as text, and hide Venue input if `venueHidden` prop is true.
      */}

            <FinalCTA />
        </main>
    );
}
