import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await sql`DROP TABLE IF EXISTS page_views;`;

    await sql`
      CREATE TABLE page_views (
        id SERIAL PRIMARY KEY,
        path VARCHAR(255) NOT NULL,
        user_agent TEXT,
        referrer TEXT,
        ip_hash VARCHAR(255),
        country VARCHAR(2),
        city VARCHAR(255),
        browser VARCHAR(255),
        os VARCHAR(255),
        device VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    return NextResponse.json({ message: 'Table created successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
