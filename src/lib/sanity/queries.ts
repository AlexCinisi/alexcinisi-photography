// Fetch homepage singleton images + site logo
export const homePageQuery = `*[_type == "homePage"][0] {
  heroImage,
  manifestoImage,
  aboutImage,
  filmSectionImage,
  photoBreakImage,
  siteLogo,
  proofLogos[] { name, logo, url }
}`

// Fetch featured portfolio items for homepage grid (max 7)
export const featuredPortfolioQuery = `*[_type == "portfolioItem" && featured == true] | order(order asc) [0...7] {
  coupleName, location, badge, image, slug
}`

// Fetch featured testimonials for homepage (max 5)  
export const featuredTestimonialsQuery = `*[_type == "testimonial" && featured == true] | order(_createdAt desc) [0...5] {
  coupleName, country, countryFlag, location, quote, rating
}`

// Fetch site logo for layout
export const siteLogoQuery = `*[_type == "homePage"][0] {
  siteLogo
}`
