import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = formData.get('password');
  const action = formData.get('action');

  if (action === 'logout') {
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete('analytics_auth');
    return response;
  }

  const adminPassword = process.env.ADMIN_PASSWORD || 'secret';

  if (password === adminPassword) {
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.set('analytics_auth', password as string, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
    return response;
  }

  return NextResponse.redirect(new URL('/?error=invalid', request.url));
}
