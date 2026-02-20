export interface SanityImage {
    _type: 'image';
    asset: {
        _ref: string;
        _type: 'reference';
    };
    hotspot?: {
        x: number;
        y: number;
        height: number;
        width: number;
    };
    crop?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
}

export interface ProofLogo {
    _key: string;
    name?: string;
    logo?: SanityImage;
    url?: string;
}

export interface HomePage {
    _id: string;
    _type: 'homePage';
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    heroImage?: SanityImage;
    manifestoImage?: SanityImage;
    aboutImage?: SanityImage;
    filmSectionImage?: SanityImage;
    photoBreakImage?: SanityImage;
    proofLogos?: ProofLogo[];
}

export interface PortfolioItem {
    _id: string;
    _type: 'portfolioItem';
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    coupleName: string;
    location: string;
    badge?: string;
    image: SanityImage;
    slug?: {
        current: string;
    };
    order?: number;
    featured?: boolean;
}

export interface Testimonial {
    _id: string;
    _type: 'testimonial';
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    coupleName: string;
    country?: string;
    countryFlag?: string;
    location?: string;
    quote: string;
    rating?: number;
    featured?: boolean;
}

export interface Story {
    _id: string;
    title: string;
    slug: { current: string };
}
