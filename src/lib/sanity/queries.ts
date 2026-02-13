// src/lib/sanity/queries.ts
import { groq } from 'next-sanity';

export const storiesQuery = groq`*[_type == "story"]`;
export const singleStoryQuery = groq`*[_type == "story" && slug.current == $slug][0]`;
