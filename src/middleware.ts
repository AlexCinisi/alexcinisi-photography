import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Anti-spam: link esterni spazzatura puntano a URL con firma ?l=...&channel=...&from=...
// Redirect 308 all'URL pulito. I parametri legittimi (utm_*, gclid, fbclid) non vengono toccati.
export function middleware(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const hasSpamSignature =
    params.has('l') && (params.has('channel') || params.has('from'));

  if (hasSpamSignature) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete('l');
    cleanUrl.searchParams.delete('channel');
    cleanUrl.searchParams.delete('from');
    return NextResponse.redirect(cleanUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|studio|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
