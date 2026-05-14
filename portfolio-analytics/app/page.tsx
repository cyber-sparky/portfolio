import { sql } from '@vercel/postgres';
import { cookies } from 'next/headers';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('analytics_auth');
  
  // Basic Auth. Set ADMIN_PASSWORD in your Vercel Environment Variables.
  // If not set, it defaults to 'secret' for local testing.
  const adminPassword = process.env.ADMIN_PASSWORD || 'secret';
  
  if (authCookie?.value !== adminPassword) {
    return <Login />;
  }

  // Fetch data
  let views: any[] = [];
  try {
    const result = await sql`
      SELECT * FROM page_views ORDER BY created_at DESC LIMIT 1000
    `;
    views = result.rows;
  } catch (e) {
    console.error('Database query failed:', e);
  }

  return (
    <main className="min-h-screen p-4 sm:p-8 selection:bg-primary/30">
      <div className="max-w-7xl mx-auto">
        <DashboardClient data={views} />
      </div>
    </main>
  );
}

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 p-4">
      <form action="/api/auth" method="POST" className="bg-neutral-900 p-8 rounded-lg border border-neutral-800 shadow-2xl w-full max-w-sm">
        <h2 className="text-xl text-emerald-400 font-mono mb-6 flex items-center gap-2">
          <span className="text-neutral-500">~</span> Login
        </h2>
        <input 
          type="password" 
          name="password" 
          placeholder="Enter Admin Password"
          required
          className="w-full bg-neutral-950 border border-neutral-700 text-white p-3 mb-6 rounded focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none font-mono transition-all"
        />
        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded font-bold font-mono transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]">
          Access Data
        </button>
      </form>
    </div>
  );
}
