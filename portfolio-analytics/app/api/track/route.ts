import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { UAParser } from 'ua-parser-js';

// Reusable CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function POST(request: Request) {
  try {
    const { path, referrer } = await request.json();
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown IP';
    
    // Vercel Geolocation headers
    const country = request.headers.get('x-vercel-ip-country') || 'Unknown';
    const city = request.headers.get('x-vercel-ip-city') || 'Unknown';

    // Parse User Agent
    const parser = new UAParser(userAgent);
    const browser = parser.getBrowser().name || 'Unknown';
    const os = parser.getOS().name || 'Unknown';
    const device = parser.getDevice().type || 'Desktop'; // ua-parser-js returns undefined for Desktop usually

    // Hash IP for privacy (simple tracking without PII)
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex');

    await sql`
      INSERT INTO page_views (path, user_agent, referrer, ip_hash, country, city, browser, os, device)
      VALUES (${path}, ${userAgent}, ${referrer}, ${ipHash}, ${country}, ${city}, ${browser}, ${os}, ${device});
    `;

    return NextResponse.json({ success: true }, { headers: corsHeaders, status: 200 });
  } catch (error) {
    console.error('Tracking Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to track' }, { headers: corsHeaders, status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
