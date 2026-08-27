import { z } from 'zod';

export const subscribeSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).trim(),
  email: z.string().email('Invalid email address').max(254).trim(),
  weddingYear: z
    .enum(['', '2026', '2027', '2028', 'Not decided yet'])
    .optional()
    .default(''),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'You must accept the Privacy Policy',
  }),

  website: z.string().max(0).optional().default(''),
  turnstileToken: z.string().min(1, 'Bot verification failed'),

  pageUrl: z.string().max(500).optional().default(''),
  referrer: z.string().max(500).optional().default(''),
  userAgent: z.string().max(500).optional().default(''),
  browserLang: z.string().max(20).optional().default(''),
  timeOnPage: z.number().optional().default(0),
  eventId: z.string().max(100).optional().default(''),
});

export type SubscribeFormData = z.infer<typeof subscribeSchema>;
