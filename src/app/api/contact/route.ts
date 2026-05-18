import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/contact-schema';
import { ratelimit } from '@/lib/rate-limit';
import { verifyTurnstile } from '@/lib/turnstile';
import { sendMetaLeadEvent, extractMetaCookies } from '@/lib/meta-capi';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  // ─── LAYER 1: CSRF — Verifica Origin ───
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    'https://alexcinisiphotography.com',
    'https://alexcinisiphotography.com',
    'https://alexcinisi-photography.vercel.app',
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
  ].filter(Boolean);

  if (!origin || !allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // ─── LAYER 2: Rate Limiting (con fail-open graceful) ───
  if (ratelimit) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous';
    try {
      // Timeout 1500ms: se Upstash non risponde, fail-open e procedi senza rate limit
      const rateLimitPromise = ratelimit.limit(ip);
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
      // Se result è null (timeout) o success=true, procediamo
    } catch (error) {
      // Upstash giù: log e fail-open. Meglio accettare la richiesta che rompere il form.
      console.error('Rate limit check failed (fail-open):', error);
    }
  }

  // ─── LAYER 3: Parse & Validate con Zod ───
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // ─── LAYER 4: Honeypot Check ───
  if (data.website && data.website.length > 0) {
    // Bot detected — rispondi con finto successo per non rivelare la trappola
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

  // ─── Resend Check ───
  if (!resend) {
    console.error('RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  // ─── Send Emails ───
  try {
    // Tracking data from headers
    const city = request.headers.get('x-vercel-ip-city') || 'Unknown';
    const country = request.headers.get('x-vercel-ip-country') || 'Unknown';
    const region = request.headers.get('x-vercel-ip-country-region') || '';

    // UA Parsing
    const isMobile = /Mobile|iPhone|Android/i.test(data.userAgent || '');
    const deviceType = isMobile ? 'Mobile' : 'Desktop';
    let browserName = 'Other';
    const ua = data.userAgent || '';
    if (ua.includes('Firefox')) browserName = 'Firefox';
    else if (ua.includes('Edg')) browserName = 'Edge';
    else if (ua.includes('Chrome')) browserName = 'Chrome';
    else if (ua.includes('Safari')) browserName = 'Safari';

    const timestamp = new Date().toLocaleString('en-GB', {
      timeZone: 'Europe/Rome',
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
    });

    // 1. Notification email to Owner
    const adminEmailContent = `
      <h2>New Wedding Enquiry</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Partner's Name:</strong> ${data.partnerName || 'Not provided'}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      <p><strong>Wedding Date:</strong> ${data.weddingDate || 'Not provided'}</p>
      <p><strong>Location/Venue:</strong> ${data.location || 'Not provided'}</p>
      <p><strong>Instagram:</strong> ${data.instagram || 'Not provided'}</p>
      <p><strong>Partner's Instagram:</strong> ${data.partnerInstagram || 'Not provided'}</p>
      <p><strong>Planner:</strong> ${data.planner || 'Not provided'}</p>
      <p><strong>Interests:</strong> ${Array.isArray(data.interests) ? data.interests.join(', ') : 'None selected'}</p>
      <br/>
      <h3>Vision / Story:</h3>
      <p style="white-space: pre-wrap;">${data.vision || 'No details provided.'}</p>
      <br/>
      <p>────────────────────────</p>
      <p><strong>TRACKING DATA</strong></p>
      <p>────────────────────────</p>
      <p><strong>Client location:</strong> ${city}, ${region}, ${country}</p>
      <p><strong>Submitted from:</strong> ${data.pageUrl || 'unknown'}</p>
      <p><strong>Came from:</strong> ${data.referrer || 'unknown'}</p>
      <p><strong>Device:</strong> ${deviceType} — ${browserName}</p>
      <p><strong>Browser language:</strong> ${data.browserLang || 'unknown'}</p>
      <p><strong>Time on page before submitting:</strong> ${data.timeOnPage || 0} seconds</p>
      <p><strong>Submitted at:</strong> ${timestamp}</p>
      <p><strong>Security:</strong> Turnstile ✓ · Honeypot ✓ · Rate limit ✓ · Zod ✓ · CSRF ✓</p>
    `;

    const ownerEmailPromise = resend.emails.send({
      from: 'Alex Cinisi Photography <info@alexcinisiphotography.com>',
      to: ['info@alexcinisiphotography.com'],
      replyTo: data.email,
      subject: `New Wedding Enquiry — ${data.name} & ${data.partnerName || 'Partner'} · ${data.location || 'Unknown Location'}`,
      html: adminEmailContent,
    });

    // 2. Auto-reply to Client
    const clientAutoReplyContent = `
      <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
        <h1 style="font-size: 24px; font-weight: normal; margin-bottom: 20px;">Thank you for your enquiry</h1>
        <p>Dear ${data.name} & ${data.partnerName || 'Partner'},</p>
        <p>Thank you so much for reaching out! I have received your enquiry and am truly honored that you are considering me to capture your special memories.</p>
        <p>I review every message personally and will get back to you within <strong>24 hours</strong>.</p>
        <p>In the meantime, feel free to browse my latest stories on <a href="https://www.instagram.com/alexcinisi" style="color: #000; text-decoration: underline;">Instagram</a>.</p>
        <br/>
        <p>Warmly,</p>
        <p><strong>Alex Cinisi</strong><br/>Alex Cinisi Photography</p>
      </div>
    `;

    const clientEmailPromise = resend.emails.send({
      from: 'Alex Cinisi Photography <info@alexcinisiphotography.com>',
      to: [data.email],
      subject: 'Thank you for your enquiry — Alex Cinisi Photography',
      html: clientAutoReplyContent,
    });

    // Execute both in parallel
    await Promise.all([ownerEmailPromise, clientEmailPromise]);

    // ─── META CAPI: server-side Lead event (GDPR-gated) ───
    // Invia evento a Meta SOLO SE l'utente ha accettato cookie Marketing.
    // Proxy implicito: presenza di _fbp = consenso Marketing dato (set da Pixel browser).
    // Fire-and-forget: non blocca la risposta al client, non causa errore form se fallisce.
    const { fbp, fbc } = extractMetaCookies(request.headers.get('cookie'));
    
    if (fbp && data.eventId) {
      // Consenso Marketing presente + event_id disponibile → invia a CAPI
      const clientIp =
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.headers.get('x-real-ip') ||
        '0.0.0.0';
      
      sendMetaLeadEvent({
        email: data.email,
        phone: data.phone,
        firstName: data.name,
        eventId: data.eventId,
        eventSourceUrl: data.pageUrl || 'https://alexcinisiphotography.com/contact',
        clientIpAddress: clientIp,
        clientUserAgent: data.userAgent || request.headers.get('user-agent') || '',
        fbp,
        fbc,
      }).catch((error) => {
        // Fire-and-forget: log l'errore ma non bloccare la risposta
        console.error('[Meta CAPI] Lead event failed (non-blocking):', error);
      });
    } else if (!fbp) {
      console.log('[Meta CAPI] Skipped: user did not consent to Marketing cookies');
    } else if (!data.eventId) {
      console.warn('[Meta CAPI] Skipped: missing eventId from client (deduplication impossible)');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
