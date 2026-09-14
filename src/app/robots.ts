import type { MetadataRoute } from 'next'

// Un bot che trova un gruppo col proprio nome ignora `*`: le aree private vanno ripetute in ogni gruppo.
const PRIVATE = ['/studio', '/api/']

const AI_SEARCH = ['OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot']
const AI_USER_FETCH = ['ChatGPT-User', 'Claude-User', 'Perplexity-User']
const AI_TRAINING_AND_GROUNDING = ['GPTBot', 'ClaudeBot', 'Google-Extended']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: AI_SEARCH, allow: '/', disallow: PRIVATE },
      { userAgent: AI_USER_FETCH, allow: '/', disallow: PRIVATE },
      { userAgent: AI_TRAINING_AND_GROUNDING, allow: '/', disallow: PRIVATE },
      { userAgent: '*', allow: '/', disallow: PRIVATE },
    ],
    sitemap: 'https://alexcinisiphotography.com/sitemap.xml',
  }
}
