/**
 * Next.js 16 routing proxy (formerly `middleware.ts`).
 * Handles subdomain rewrites for resume.cybersparky.in / blog.cybersparky.in
 * and canonical-host redirects for /resume and /writeups paths.
 */
import { NextRequest, NextResponse } from 'next/server';

const ROOT_DOMAIN = 'cybersparky.in';
const ROOT_HOSTS = new Set([ROOT_DOMAIN, `www.${ROOT_DOMAIN}`]);

/**
 * Strict path-prefix check. Matches `/prefix` exactly OR `/prefix/...`.
 * Prevents open-redirect bugs where `pathname.startsWith('/prefix')` would
 * also match attacker-crafted paths like `/prefixevil.com`.
 */
function startsWithSegment(pathname: string, prefix: string): boolean {
  return (
    pathname === prefix ||
    pathname.startsWith(`${prefix}/`)
  );
}

/**
 * Extract the immediate subdomain by suffix-matching the root domain
 * exactly (so `evil.com` masquerading as `resume.cybersparky.in.evil.com`
 * cannot match). Returns '' for the root host.
 */
function getSubdomain(hostname: string): string {
  const lower = hostname.toLowerCase().split(':')[0]; // strip port if present
  if (lower === ROOT_DOMAIN) return '';
  if (lower.endsWith(`.${ROOT_DOMAIN}`)) {
    return lower.slice(0, lower.length - ROOT_DOMAIN.length - 1);
  }
  return ''; // unknown host — caller treats as root, no rewrites
}

export function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  // Skip middleware for static assets and API routes.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const isLocalhost =
    hostname.includes('localhost') || hostname.includes('127.0.0.1');
  if (isLocalhost) {
    return NextResponse.next();
  }

  const subdomain = getSubdomain(hostname);

  // resume.cybersparky.in → rewrite to /resume
  if (subdomain === 'resume') {
    const url = request.nextUrl.clone();
    url.pathname = pathname === '/' ? '/resume' : `/resume${pathname}`;
    return NextResponse.rewrite(url);
  }

  // blog.cybersparky.in → rewrite to /writeups
  if (subdomain === 'blog') {
    const url = request.nextUrl.clone();
    url.pathname = pathname === '/' ? '/writeups' : `/writeups${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Only redirect from the canonical root host (not from any unknown host).
  const lowerHost = hostname.toLowerCase().split(':')[0];
  if (!ROOT_HOSTS.has(lowerHost)) {
    return NextResponse.next();
  }

  // /resume → resume.cybersparky.in (strict segment match prevents open redirect)
  if (startsWithSegment(pathname, '/resume')) {
    const rest = pathname.slice('/resume'.length) || '/';
    return NextResponse.redirect(
      new URL(`https://resume.${ROOT_DOMAIN}${rest}`)
    );
  }

  // /writeups → blog.cybersparky.in
  if (startsWithSegment(pathname, '/writeups')) {
    const rest = pathname.slice('/writeups'.length) || '/';
    return NextResponse.redirect(
      new URL(`https://blog.${ROOT_DOMAIN}${rest}`)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
