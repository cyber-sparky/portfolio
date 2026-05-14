import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('analytics_auth');
  const adminPassword = process.env.ADMIN_PASSWORD || 'secret';

  // Verify that the user is authenticated
  if (authCookie?.value !== adminPassword) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await sql`DELETE FROM page_views;`;
    return NextResponse.json({ message: 'Analytics data wiped successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
