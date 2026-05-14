import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('auth');

  // Verify that the user is authenticated (admin)
  if (authCookie?.value !== 'true') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await sql`DELETE FROM page_views;`;
    return NextResponse.json({ message: 'Analytics data wiped successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
