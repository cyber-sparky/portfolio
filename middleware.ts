import { NextRequest, NextResponse } from 'next/server';

const ROOT_DOMAIN = 'cybersparky.in';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  // Skip middleware for static assets and API routes
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

  const subdomain = hostname.replace(`.${ROOT_DOMAIN}`, '');

  // resume.cybersparky.in → rewrite to /resume
  if (subdomain === 'resume') {
    const url = request.nextUrl.clone();
    if (pathname === '/') {
      url.pathname = '/resume';
    } else {
      url.pathname = `/resume${pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  // blogs.cybersparky.in → rewrite to /writeups
  if (subdomain === 'blogs') {
    const url = request.nextUrl.clone();
    if (pathname === '/') {
      url.pathname = '/writeups';
    } else {
      url.pathname = `/writeups${pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  // On root domain, redirect /resume → resume.cybersparky.in
  if (
    (hostname === ROOT_DOMAIN || hostname === `www.${ROOT_DOMAIN}`) &&
    pathname.startsWith('/resume')
  ) {
    const rest = pathname.replace('/resume', '') || '/';
    return NextResponse.redirect(
      new URL(`https://resume.${ROOT_DOMAIN}${rest}`)
    );
  }

  // On root domain, redirect /writeups → blogs.cybersparky.in
  if (
    (hostname === ROOT_DOMAIN || hostname === `www.${ROOT_DOMAIN}`) &&
    pathname.startsWith('/writeups')
  ) {
    const rest = pathname.replace('/writeups', '') || '/';
    return NextResponse.redirect(
      new URL(`https://blogs.${ROOT_DOMAIN}${rest}`)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
