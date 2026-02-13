// src/lib/sanity/types.ts
// TODO: Generate types from Sanity schema using sanity-typegen
export interface Story {
    _id: string;
    title: string;
    slug: { current: string };
    // ...
}
