import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { subscribeSchema } from '@/lib/subscribe-schema';
import { subscribeRatelimit } from '@/lib/rate-limit';
import { verifyTurnstile } from '@/lib/turnstile';
import { isAllowedOrigin } from '@/lib/origin-guard';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const MAILERLITE_ENDPOINT = 'https://connect.mailerlite.com/api/subscribers';
const MAILERLITE_TIMEOUT_MS = 5000;

async function sendLeadRecoveryEmail(name: string, email: string, reason: string) {
  if (!resend) {
    console.error('[subscribe] Recovery email skipped: RESEND_API_KEY is not set');
    return;
  }
  try {
    await resend.emails.send({
      from: 'Alex Cinisi Photography <info@alexcinisiphotography.com>',
      to: ['info@alexcinisiphotography.com'],
      subject: 'ACTION REQUIRED — guide signup not saved to MailerLite',
      html: `
        <h2>A guide signup could not be saved to MailerLite</h2>
        <p>Add this subscriber manually and send them the guide.</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Reason:</strong> ${reason}</p>
      `,
    });
  } catch (error) {
    console.error('[subscribe] Recovery email failed:', error);
  }
}

export async function POST(request: Request) {
  // ─── LAYER 1: CSRF — Verifica Origin ───
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // ─── LAYER 2: Rate Limiting (con fail-open graceful) ───
  if (subscribeRatelimit) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous';
    try {
      const rateLimitPromise = subscribeRatelimit.limit(ip);
      const timeoutPromise = new Promise<null>((resolve) =>
        setTimeout(() => resolve(null), 1500)
      );
      const result = await Promise.race([rateLimitPromise, timeoutPromise]);

      if (result && !result.success) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again in one hour.' },
          {
            status: 429,
            headers: {
              'X-RateLimit-Limit': String(result.limit),
              'X-RateLimit-Remaining': String(result.remaining),
            },
          }
        );
      }
    } catch (error) {
      console.error('[subscribe] Rate limit check failed (fail-open):', error);
    }
  }

  // ─── LAYER 3: Parse & Validate con Zod ───
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // ─── LAYER 4: Honeypot Check ───
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ success: true });
  }

  // ─── LAYER 5: Turnstile Verification ───
  const isTurnstileValid = await verifyTurnstile(data.turnstileToken);
  if (!isTurnstileValid) {
    return NextResponse.json(
      { error: 'Bot verification failed. Please try again.' },
      { status: 403 }
    );
  }

  // ─── Config Check ───
  const apiToken = process.env.MAILERLITE_API_TOKEN;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiToken || !groupId) {
    console.error('[subscribe] MAILERLITE_API_TOKEN or MAILERLITE_GROUP_ID is not set');
    await sendLeadRecoveryEmail(data.name, data.email, 'MailerLite credentials missing');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  // ─── MailerLite: create or update subscriber ───
  // groupId MUST remain a string. The ID exceeds Number.MAX_SAFE_INTEGER;
  // any numeric conversion silently corrupts its last digits.
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), MAILERLITE_TIMEOUT_MS);

  try {
    const response = await fetch(MAILERLITE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        email: data.email,
        fields: {
          name: data.name,
          // MailerLite custom field key is `wedding_month`; it stores a year.
          // Omitted entirely when unset, so we never write an empty string.
          ...(data.weddingYear ? { wedding_month: data.weddingYear } : {}),
        },
        groups: [groupId],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      console.error(`[subscribe] MailerLite returned ${response.status}:`, detail.slice(0, 500));
      await sendLeadRecoveryEmail(data.name, data.email, `MailerLite HTTP ${response.status}`);
      return NextResponse.json(
        { error: 'We could not complete your signup right now. Please try again in a moment.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const reason =
      error instanceof Error && error.name === 'AbortError'
        ? `MailerLite timeout after ${MAILERLITE_TIMEOUT_MS}ms`
        : 'MailerLite request failed';
    console.error(`[subscribe] ${reason}:`, error);
    await sendLeadRecoveryEmail(data.name, data.email, reason);
    return NextResponse.json(
      { error: 'We could not complete your signup right now. Please try again in a moment.' },
      { status: 502 }
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
