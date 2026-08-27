const allowedOrigins = [
  'https://alexcinisiphotography.com',
  'https://www.alexcinisiphotography.com',
  'https://alexcinisi-photography.vercel.app',
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
].filter(Boolean);

export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  return allowedOrigins.includes(origin);
}
