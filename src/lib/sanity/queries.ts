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
  proofLogos[] { name, logo { asset-> { url } }, url }
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
