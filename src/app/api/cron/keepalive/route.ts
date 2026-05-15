import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Verifica che la richiesta venga davvero da Vercel Cron
  // Vercel passa automaticamente il CRON_SECRET come Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Skip se Upstash non configurato (in caso di staging/preview senza env)
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return NextResponse.json({
      ok: false,
      reason: 'Upstash not configured in this environment',
    });
  }

  try {
    const redis = Redis.fromEnv();
    const timestamp = Date.now();
    // SET con TTL 24h: la chiave si auto-elimina dopo un giorno,
    // ma il fatto stesso di averla scritta resetta il timer "inattività" di Upstash
    await redis.set('keepalive:lastping', timestamp.toString(), { ex: 86400 });

    return NextResponse.json({
      ok: true,
      timestamp,
      iso: new Date(timestamp).toISOString(),
      message: 'Upstash kept alive — inactivity timer reset',
    });
  } catch (error) {
    console.error('[Keepalive] Failed to ping Upstash:', error);
    return NextResponse.json(
      { ok: false, error: String(error) },
      { status: 500 }
    );
  }
}
