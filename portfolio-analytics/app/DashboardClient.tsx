'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Activity, Users, MousePointerClick, Clock } from 'lucide-react';
import { Header } from './components/Header';
import { KPICard } from './components/KPICard';
import { TrafficChart } from './components/TrafficChart';
import { TopPages } from './components/TopPages';
import { TrafficSources } from './components/TrafficSources';
import { AIInsights } from './components/AIInsights';
import { PerformanceGrid } from './components/PerformanceGrid';
import { ActivityFeed } from './components/ActivityFeed';
import { Footer } from './components/Footer';

interface PageView {
  id: number;
  path: string;
  user_agent: string;
  referrer: string;
  ip_hash: string;
  country: string;
  city: string;
  browser: string;
  os: string;
  device: string;
  created_at: string;
}

interface DashboardClientProps {
  data: PageView[];
}

/* ── Helpers ── */
function countByField(data: PageView[], field: keyof PageView): { name: string; value: number }[] {
  const counts: Record<string, number> = {};
  for (const row of data) {
    const raw = row[field];
    const val = (typeof raw === 'string' && raw && raw !== 'Unknown') ? raw : 'Other';
    counts[val] = (counts[val] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

function cleanReferrers(data: PageView[]): { name: string; value: number }[] {
  const raw = countByField(data, 'referrer');
  const merged: Record<string, number> = {};
  for (const r of raw) {
    let label: string;
    if (!r.name || r.name === 'Other' || r.name === '-' || r.name === '') {
      label = 'Direct';
    } else {
      try {
        const url = r.name.startsWith('http') ? r.name : `https://${r.name}`;
        label = new URL(url).hostname.replace('www.', '');
      } catch {
        label = r.name;
      }
    }
    merged[label] = (merged[label] || 0) + r.value;
  }
  return Object.entries(merged)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

function buildTimeSeries(data: PageView[], days: number): { date: string; views: number; sessions: number }[] {
  const result: { date: string; views: number; sessions: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    result.push({ date: key.slice(5), views: 0, sessions: 0 });
  }

  const uniqueSessionsPerDay: Record<string, Set<string>> = {};

  for (const row of data) {
    if (!row.created_at) continue;
    const key = new Date(row.created_at).toISOString().split('T')[0];
    const shortKey = key.slice(5);
    const point = result.find(p => p.date === shortKey);
    if (point) {
      point.views++;
      if (!uniqueSessionsPerDay[shortKey]) uniqueSessionsPerDay[shortKey] = new Set();
      uniqueSessionsPerDay[shortKey].add(row.ip_hash);
    }
  }

  for (const point of result) {
    point.sessions = uniqueSessionsPerDay[point.date]?.size ?? 0;
  }

  return result;
}

function buildSparkline(data: PageView[], days: number): { v: number }[] {
  const counts: Record<string, number> = {};
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    counts[d.toISOString().split('T')[0]] = 0;
  }
  for (const row of data) {
    if (!row.created_at) continue;
    const key = new Date(row.created_at).toISOString().split('T')[0];
    if (counts[key] !== undefined) counts[key]++;
  }
  return Object.values(counts).map(v => ({ v }));
}

function computeDelta(data: PageView[], field: 'views' | 'visitors'): { value: string; trend: 'up' | 'down' } {
  const now = new Date();
  const mid = new Date(now);
  mid.setDate(mid.getDate() - 15);
  const start = new Date(now);
  start.setDate(start.getDate() - 30);

  let recentCount = 0;
  let olderCount = 0;

  if (field === 'views') {
    for (const row of data) {
      const d = new Date(row.created_at);
      if (d >= mid) recentCount++;
      else if (d >= start) olderCount++;
    }
  } else {
    const recentIPs = new Set<string>();
    const olderIPs = new Set<string>();
    for (const row of data) {
      const d = new Date(row.created_at);
      if (d >= mid) recentIPs.add(row.ip_hash);
      else if (d >= start) olderIPs.add(row.ip_hash);
    }
    recentCount = recentIPs.size;
    olderCount = olderIPs.size;
  }

  if (olderCount === 0 && recentCount === 0) return { value: '0%', trend: 'up' };
  if (olderCount === 0) return { value: '+100%', trend: 'up' };
  const pct = ((recentCount - olderCount) / olderCount) * 100;
  const sign = pct >= 0 ? '+' : '';
  return { value: `${sign}${pct.toFixed(1)}%`, trend: pct >= 0 ? 'up' : 'down' };
}

function generateInsights(data: PageView[]): string[] {
  if (data.length === 0) return ['Awaiting your first visitors to generate insights.'];

  const insights: string[] = [];
  const countries = countByField(data, 'country');
  const devices = countByField(data, 'device');
  const referrers = cleanReferrers(data);
  const browsers = countByField(data, 'browser');

  if (countries.length > 0 && countries[0].name !== 'Other') {
    const pct = ((countries[0].value / data.length) * 100).toFixed(0);
    insights.push(`${pct}% of your traffic originates from ${countries[0].name}. Consider tailoring content for this audience.`);
  }

  if (devices.length > 0) {
    insights.push(`${devices[0].name} users dominate your traffic. Ensure your portfolio is optimized for this platform.`);
  }

  if (referrers.length > 0 && referrers[0].name !== 'Direct') {
    insights.push(`${referrers[0].name} is your strongest referral source — keep investing in that channel.`);
  }

  if (browsers.length > 0 && browsers[0].name !== 'Other') {
    insights.push(`Most visitors use ${browsers[0].name}. Test your portfolio thoroughly on this browser.`);
  }

  if (insights.length === 0) insights.push('Traffic patterns are steady. Continue creating great work!');
  return insights;
}

/* ── Main Component ── */
export default function DashboardClient({ data }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [refreshKey, setRefreshKey] = useState(0);

  // Auto-refresh every 60s
  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshKey(k => k + 1);
      window.location.reload();
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const safeData = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  // ── Derived metrics ──
  const totalViews = safeData.length;
  const uniqueVisitors = useMemo(() => new Set(safeData.map(d => d.ip_hash)).size, [safeData]);

  const viewsDelta = useMemo(() => computeDelta(safeData, 'views'), [safeData]);
  const visitorsDelta = useMemo(() => computeDelta(safeData, 'visitors'), [safeData]);

  const chartData = useMemo(() => buildTimeSeries(safeData, 90), [safeData]);
  const sparkViews = useMemo(() => buildSparkline(safeData, 14), [safeData]);
  const sparkVisitors = useMemo(() => {
    // unique IPs per day for the sparkline
    const days = 14;
    const buckets: Record<string, Set<string>> = {};
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      buckets[d.toISOString().split('T')[0]] = new Set();
    }
    for (const row of safeData) {
      if (!row.created_at) continue;
      const key = new Date(row.created_at).toISOString().split('T')[0];
      if (buckets[key]) buckets[key].add(row.ip_hash);
    }
    return Object.values(buckets).map(s => ({ v: s.size }));
  }, [safeData]);

  const topPaths = useMemo(() => {
    const groups = countByField(safeData, 'path');
    return groups.slice(0, 8).map(g => ({
      path: g.name,
      views: g.value,
      avgTime: '—',
      bounceRate: 0,
    }));
  }, [safeData]);

  const sources = useMemo(() => cleanReferrers(safeData).slice(0, 6), [safeData]);
  const countries = useMemo(() => countByField(safeData, 'country'), [safeData]);
  const devices = useMemo(() => countByField(safeData, 'device'), [safeData]);
  const referrers = useMemo(() => cleanReferrers(safeData), [safeData]);
  const insights = useMemo(() => generateInsights(safeData), [safeData]);

  return (
    <div className="bg-page">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content offset for fixed header */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-8">

          {/* ── KPI Strip ── */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" aria-label="Key metrics">
            <KPICard
              title="Total Views"
              value={totalViews}
              delta={viewsDelta.value}
              trend={viewsDelta.trend}
              icon={Activity}
              iconColor="#0066FF"
              iconBg="rgba(0, 102, 255, 0.08)"
              sparklineData={sparkViews}
              sparklineColor="#0066FF"
              animationDelay="fade-in-up-delay-1"
            />
            <KPICard
              title="Unique Visitors"
              value={uniqueVisitors}
              delta={visitorsDelta.value}
              trend={visitorsDelta.trend}
              icon={Users}
              iconColor="#00D4AA"
              iconBg="rgba(0, 212, 170, 0.08)"
              sparklineData={sparkVisitors}
              sparklineColor="#00D4AA"
              animationDelay="fade-in-up-delay-2"
            />
            <KPICard
              title="Bounce Rate"
              value="—"
              delta="—"
              trend="up"
              icon={MousePointerClick}
              iconColor="#8B5CF6"
              iconBg="rgba(139, 92, 246, 0.08)"
              sparklineData={[{v:0}]}
              sparklineColor="#8B5CF6"
              animationDelay="fade-in-up-delay-3"
            />
            <KPICard
              title="Avg. Session"
              value="—"
              delta="—"
              trend="up"
              icon={Clock}
              iconColor="#F59E0B"
              iconBg="rgba(245, 158, 11, 0.08)"
              sparklineData={[{v:0}]}
              sparklineColor="#F59E0B"
              animationDelay="fade-in-up-delay-4"
            />
          </section>

          {/* ── Main Content: Chart + AI ── */}
          <section className="grid grid-cols-1 lg:grid-cols-5 gap-3" aria-label="Traffic analysis">
            <div className="lg:col-span-3 space-y-3">
              <TrafficChart data={chartData} />
              <TopPages pages={topPaths} />
            </div>
            <div className="lg:col-span-2 space-y-3">
              <TrafficSources sources={sources} />
              <AIInsights insights={insights} />
            </div>
          </section>

          {/* ── Performance Grid ── */}
          <section aria-label="Performance breakdown">
            <PerformanceGrid countries={countries} devices={devices} referrers={referrers} />
          </section>

          {/* ── Activity Feed ── */}
          <section aria-label="Recent activity">
            <ActivityFeed rows={safeData as unknown as Parameters<typeof ActivityFeed>[0]['rows']} />
          </section>

          {/* ── Footer ── */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
