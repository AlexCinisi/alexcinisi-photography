import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Crea il rate limiter solo se le variabili sono configurate
// In development senza Upstash, il rate limiting viene saltato
let ratelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, '1 h'), // 3 richieste per IP per ora
    analytics: true,
    prefix: 'ratelimit:contact',
  });
}

export { ratelimit };
