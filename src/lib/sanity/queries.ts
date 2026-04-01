// Fetch homepage singleton images + site logo
export const homePageQuery = `*[_type == "homePage"][0] {
  // Hero
  heroImage {
    ...,
    alt,
    asset-> { _id, url, metadata { dimensions, lqip } }
  },

  // Sezioni
  manifestoImage {
    ...,
    alt,
    asset-> { _id, url, metadata { dimensions, lqip } }
  },
  aboutImage {
    ...,
    alt,
    asset-> { _id, url, metadata { dimensions, lqip } }
  },
  filmSectionImage {
    ...,
    alt,
    asset-> { _id, url, metadata { dimensions, lqip } }
  },

  // Photo Breaks (3 separati)
  photoBreakImage1 {
    ...,
    alt,
    asset-> { _id, url, metadata { dimensions, lqip } }
  },
  photoBreakImage2 {
    ...,
    alt,
    asset-> { _id, url, metadata { dimensions, lqip } }
  },
  photoBreakImage3 {
    ...,
    alt,
    asset-> { _id, url, metadata { dimensions, lqip } }
  },

  // Branding
  siteLogo { asset-> { url } },
  siteLogoFooter { asset-> { url } },
  pressLogos[] {
    name,
    logo,
    url
  },

  // SEO & Hero Toggle
  heroTextDark,
  ogImage {
    ...,
    "alt": alt
  },
  metaTitle,
  metaDescription
}`

// Fetch featured portfolio items for homepage grid (max 12)
export const featuredPortfolioQuery = `*[_type == "portfolioItem" && featured == true] | order(order asc) [0...12] {
  coupleName,
  location,
  badge,
  slug,
  "image": image {
    asset-> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height,
          aspectRatio
        },
        lqip
      }
    },
    hotspot,
    crop,
    alt
  }
}`

// Fetch featured testimonials for homepage (max 5)  
export const featuredTestimonialsQuery = `*[_type == "testimonial" && featured == true] | order(_createdAt desc) [0...5] {
  coupleName, country, countryFlag, location, quote, rating
}`

// Fetch site logo for layout
export const siteLogoQuery = `*[_type == "homePage"][0] {
  siteLogo { asset-> { url } },
  siteLogoFooter { asset-> { url } }
}`

// ============================
// JOURNAL QUERIES
// ============================

// All journal posts for /journal index page (paginated)
export const allJournalPostsQuery = `*[_type == "journalPost"] | order(date desc) [$start...$end] {
  _id,
  title,
  slug,
  coupleName,
  subtitle,
  location,
  country,
  date,
  category,
  tags,
  heroImage {
    ...,
    "alt": alt
  }
}`

// Total count for pagination
export const journalPostsCountQuery = `count(*[_type == "journalPost"])`

// Journal posts filtered by category
export const journalPostsByCategoryQuery = `*[_type == "journalPost" && category == $category] | order(date desc) [$start...$end] {
  _id,
  title,
  slug,
  coupleName,
  subtitle,
  location,
  country,
  date,
  category,
  tags,
  heroImage {
    ...,
    "alt": alt
  }
}`

// Single journal post by slug
export const journalPostBySlugQuery = `*[_type == "journalPost" && slug.current == $slug][0] {
  ...,
  heroImage { ..., "alt": alt, asset-> { _id, url, metadata { dimensions { width, height, aspectRatio }, lqip } } },
  portfolioImage { ..., "alt": alt },
  gallery[] {
    ...,
    "alt": alt,
    "caption": caption,
    "fullWidth": fullWidth,
    asset-> {
      _id, url,
      metadata {
        dimensions { width, height, aspectRatio },
        lqip
      }
    }
  },
  locationRef-> {
    title,
    slug,
    venueName,
    city
  },
  "relatedStories": *[_type == "journalPost" && slug.current != $slug && (
    locationRef._ref == ^.locationRef._ref ||
    category == ^.category
  )] | order(date desc) [0...3] {
    _id,
    title,
    slug,
    coupleName,
    location,
    heroImage {
      ...,
      "alt": alt
    }
  }
}`

// All journal slugs (for generateStaticParams)
export const allJournalSlugsQuery = `*[_type == "journalPost"] { "slug": slug.current }`

// Featured journal posts for homepage stories section
export const featuredJournalPostsQuery = `*[_type == "journalPost" && featured == true] | order(order asc) [0...6] {
  _id,
  title,
  slug,
  coupleName,
  location,
  tags,
  heroImage {
    ...,
    "alt": alt
  },
  portfolioImage {
    ...,
    "alt": alt
  }
}`


// ============================
// LOCATION QUERIES
// ============================

// All locations for /locations hub page
export const allLocationsQuery = `*[_type == "locationPage"] | order(priority asc) {
  _id,
  title,
  slug,
  venueName,
  city,
  region,
  priority,
  heroImage {
    ...,
    "alt": alt
  }
}`

// Single location page by slug (full data)
export const locationPageBySlugQuery = `*[_type == "locationPage" && slug.current == $slug][0] {
  ...,
  venueIntroImage {
    ...,
    "alt": alt
  },
  heroImage {
    ...,
    "alt": alt
  },
  calloutImage {
    ...,
    "alt": alt
  },
  galleryImages[] {
    image {
      ...,
    },
    title,
    subtitle,
    badge
  },
  testimonials[]-> {
    _id,
    coupleName,
    country,
    countryFlag,
    location,
    quote,
    rating
  },
  "relatedStories": *[_type == "journalPost" && locationRef._ref == ^._id] | order(date desc) [0...3] {
    _id,
    title,
    slug,
    coupleName,
    location,
    heroImage {
      ...,
      "alt": alt
    }
  }
}`

// All location slugs (for generateStaticParams)
export const allLocationSlugsQuery = `*[_type == "locationPage"] { "slug": slug.current }`

// ============================
// ABOUT QUERIES
// ============================

// About page
export const aboutPageQuery = `*[_type == "aboutPage"][0] {
  heroFullImage {
    ...,
    "alt": alt
  },
  heroTextDark,
  heroImage {
    ...,
    "alt": alt
  },
  philosophyImage {
    ...,
    "alt": alt
  },
  filmImage {
    ...,
    "alt": alt
  },
  sicilyImage {
    ...,
    "alt": alt
  },
  testimonials[] {
    flag,
    quote,
    author,
    location
  },
  faqItems[] {
    question,
    answer
  },
  metaTitle,
  metaDescription
}`;

// ============================
// CONTACT QUERIES
// ============================

export const contactPageQuery = `*[_type == "contactPage"][0] {
  heroImage { ..., "alt": alt },
  heroTextDark,
  title,
  subtitle,
  sidebarTestimonial {
    quote,
    author,
    location,
    country
  },
  sidebarImage {
    ...,
    "alt": alt
  },
  metaTitle,
  metaDescription
}`;
