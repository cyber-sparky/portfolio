import { sql } from '@vercel/postgres';
import { cookies } from 'next/headers';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('analytics_auth');

  const adminPassword = process.env.ADMIN_PASSWORD || 'secret';

  if (authCookie?.value !== adminPassword) {
    return <Login />;
  }

  // Fetch real data from Postgres
  let views: Record<string, unknown>[] = [];
  try {
    const result = await sql`
      SELECT * FROM page_views ORDER BY created_at DESC LIMIT 1000
    `;
    views = result.rows;
  } catch (e) {
    console.error('Database query failed:', e);
  }

  return <DashboardClient data={views as unknown as Parameters<typeof DashboardClient>[0]['data']} />;
}

function Login() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #0A0A0F 0%, #111118 100%)' }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #0066FF 0%, #00D4AA 100%)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <span className="text-white text-xl font-semibold tracking-tight">Portfolio Analytics</span>
        </div>

        {/* Card */}
        <form
          action="/api/auth"
          method="POST"
          className="p-8 rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          }}
        >
          <h2 className="text-white text-lg font-semibold mb-1.5">Welcome back</h2>
          <p className="text-sm mb-8" style={{ color: '#6B7280' }}>Enter your admin password to continue.</p>

          <label htmlFor="password" className="block text-xs font-medium uppercase tracking-wide mb-2" style={{ color: '#6B7280' }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="••••••••"
            required
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-gray-600 outline-none transition-all mb-6"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)',
              boxShadow: '0 2px 12px rgba(0, 102, 255, 0.4)',
            }}
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-6 text-xs" style={{ color: '#4B5563' }}>
          Protected analytics dashboard
        </p>
      </div>
    </div>
  );
}
