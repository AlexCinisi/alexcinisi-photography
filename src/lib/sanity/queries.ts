export const storiesQuery = `*[_type == "story"]`
export const singleStoryQuery = `*[_type == "story" && slug.current == $slug][0]`
export const locationPageQuery = `*[_type == "locationPage" && slug.current == $slug][0]`
export const allLocationSlugsQuery = `*[_type == "locationPage"]{ "slug": slug.current }`
export const testimonialsQuery = `*[_type == "testimonial" && featured == true] | order(_createdAt desc)`
export const siteSettingsQuery = `*[_type == "siteSettings"][0]`
