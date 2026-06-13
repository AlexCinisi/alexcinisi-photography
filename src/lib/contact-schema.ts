import { z } from 'zod';

export const contactSchema = z.object({
  // Campi visibili
  name: z.string().min(1, 'Name is required').max(100).trim(),
  partnerName: z.string().min(1, 'Partner name is required').max(100).trim(),
  email: z.string().email('Invalid email address').max(254).trim(),
  phone: z.string().max(30).trim().optional().default(''),
  instagram: z.string().max(50).trim().optional().default(''),
  partnerInstagram: z.string().max(50).trim().optional().default(''),
  planner: z.string().max(100).trim().optional().default(''),
  weddingDate: z.string().min(1, 'Wedding date is required').max(50).trim(),
  location: z.string().max(200).trim().optional().default(''),
  serviceType: z.string().max(100).optional().default(''),
  guestCount: z.string().max(20).optional().default(''),
  howFound: z.string().max(200).optional().default(''),
  budget: z.string().max(50).optional().default(''),
  vision: z.string().min(1, 'Please tell us about your story').max(5000).trim(),
  interests: z.array(z.string().max(50)).max(10).optional().default([]),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'You must accept the Privacy Policy',
  }),

  // Honeypot — DEVE essere vuoto
  website: z.string().max(0).optional().default(''),

  // Turnstile token
  turnstileToken: z.string().min(1, 'Bot verification failed'),

  // Tracking (invisibili all'utente)
  pageUrl: z.string().max(500).optional().default(''),
  referrer: z.string().max(500).optional().default(''),
  userAgent: z.string().max(500).optional().default(''),
  browserLang: z.string().max(20).optional().default(''),
  timeOnPage: z.number().optional().default(0),
  
  // Meta CAPI — event_id per deduplicazione browser/server (generato lato client)
  eventId: z.string().max(100).optional().default(''),
});

export type ContactFormData = z.infer<typeof contactSchema>;
