import crypto from 'node:crypto';

interface CapiLeadEventParams {
  email: string;
  phone?: string;
  firstName?: string;
  eventId: string;
  eventSourceUrl: string;
  clientIpAddress: string;
  clientUserAgent: string;
  fbp?: string;
  fbc?: string;
}

interface CapiResponse {
  events_received?: number;
  messages?: string[];
  fbtrace_id?: string;
  error?: { message: string; type: string; code: number };
}

/**
 * Hash a string with SHA-256 (lowercase, no whitespace) per Meta spec.
 * Required for email, phone, names sent to CAPI.
 */
function hashSha256(value: string): string {
  return crypto
    .createHash('sha256')
    .update(value.toLowerCase().trim())
    .digest('hex');
}

/**
 * Normalize a phone number for CAPI: only digits, no leading +, no spaces.
 */
function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

/**
 * Send a Lead event to Meta Conversions API.
 * Returns CapiResponse with diagnostics from Meta.
 * Throws on network/auth errors — caller should catch.
 */
export async function sendMetaLeadEvent(
  params: CapiLeadEventParams
): Promise<CapiResponse> {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    throw new Error('Meta CAPI not configured: missing META_PIXEL_ID or META_CAPI_ACCESS_TOKEN');
  }

  const eventTime = Math.floor(Date.now() / 1000);

  // User data — all PII hashed, fbp/fbc raw (no hashing per Meta spec)
  const userData: Record<string, unknown> = {
    em: [hashSha256(params.email)],
    client_ip_address: params.clientIpAddress,
    client_user_agent: params.clientUserAgent,
  };

  if (params.phone && params.phone.length > 0) {
    userData.ph = [hashSha256(normalizePhone(params.phone))];
  }

  if (params.firstName && params.firstName.length > 0) {
    userData.fn = [hashSha256(params.firstName)];
  }

  if (params.fbp) {
    userData.fbp = params.fbp;
  }

  if (params.fbc) {
    userData.fbc = params.fbc;
  }

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: 'Lead',
        event_time: eventTime,
        event_id: params.eventId,
        event_source_url: params.eventSourceUrl,
        action_source: 'website',
        user_data: userData,
        custom_data: {
          content_name: 'Wedding Inquiry Form',
          content_category: 'Contact',
          currency: 'EUR',
          value: 1.0,
        },
      },
    ],
  };

  // Test event code (only in development/staging — set via env var when needed)
  const testEventCode = process.env.META_TEST_EVENT_CODE;
  if (testEventCode && testEventCode.length > 0) {
    payload.test_event_code = testEventCode;
  }

  const url = `https://graph.facebook.com/v25.0/${pixelId}/events?access_token=${accessToken}`;

  // Timeout 3000ms — CAPI è "fire and forget", non vogliamo bloccare la risposta utente
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const result: CapiResponse = await response.json();

    if (!response.ok) {
      console.error('[Meta CAPI] Request failed:', {
        status: response.status,
        error: result.error,
        fbtrace_id: result.fbtrace_id,
      });
    } else {
      console.log('[Meta CAPI] Event sent successfully:', {
        events_received: result.events_received,
        fbtrace_id: result.fbtrace_id,
      });
    }

    return result;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('[Meta CAPI] Request timeout after 3000ms');
    } else {
      console.error('[Meta CAPI] Network error:', error);
    }
    throw error;
  }
}

/**
 * Extract fbp and fbc cookies from request cookie header.
 * Returns object with fbp/fbc (or undefined if missing).
 * Presence of _fbp implies user accepted Marketing consent (cookie banner gated).
 */
export function extractMetaCookies(cookieHeader: string | null): {
  fbp?: string;
  fbc?: string;
} {
  if (!cookieHeader) return {};

  const cookies = cookieHeader.split(';').reduce<Record<string, string>>(
    (acc, cookie) => {
      const [name, ...rest] = cookie.trim().split('=');
      if (name && rest.length > 0) {
        acc[name] = rest.join('=');
      }
      return acc;
    },
    {}
  );

  return {
    fbp: cookies._fbp,
    fbc: cookies._fbc,
  };
}
