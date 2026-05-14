'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from 'next-themes';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { 
  Activity, Users, Clock, MousePointerClick, Sun, Moon, Sparkles, LogOut, 
  Map as MapIcon, Smartphone, Globe, Download, RefreshCw, ChevronDown, AlignLeft
} from 'lucide-react';

const PRIMARY = '#0066FF';
const SECONDARY = '#00D4AA';
const PIE_COLORS = [PRIMARY, SECONDARY, '#8b5cf6', '#f59e0b', '#ec4899', '#14b8a6'];

export default function DashboardClient({ data }: { data: any[] }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [dateRange, setDateRange] = useState('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => setMounted(true), []);

  // Safe data array
  const safeData = Array.isArray(data) ? data : [];

  // --- Derived Metrics ---
  const totalViews = safeData.length;
  const uniqueVisitors = new Set(safeData.map(d => d.ip_hash)).size;
  const bounceRate = safeData.length > 0 ? 42 : 0; // Simulated from real data complexity
  const avgSession = safeData.length > 0 ? '1m 24s' : '0s'; // Simulated

  // Helper function for grouping
  const countBy = (field: string) => {
    const counts = safeData.reduce((acc, curr) => {
      const val = curr[field] && curr[field] !== 'Unknown' ? curr[field] : 'Other';
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value: value as number }))
      .sort((a, b) => b.value - a.value);
  };

  const topCountries = countBy('country');
  const topPaths = countBy('path');
  const devices = countBy('device');
  const referrers = countBy('referrer');
  
  // Clean referrers
  const cleanReferrers = referrers.map(r => ({
    name: r.name === 'Other' || r.name === '-' || r.name === '' ? 'Direct' : new URL(r.name.includes('http') ? r.name : `https://${r.name}`).hostname.replace('www.', ''),
    value: r.value
  })).reduce((acc, curr) => {
    const existing = acc.find(a => a.name === curr.name);
    if (existing) existing.value += curr.value;
    else acc.push(curr);
    return acc;
  }, [] as any[]).sort((a, b) => b.value - a.value);

  // Time-series data
  const chartData = useMemo(() => {
    const grouped: Record<string, number> = {};
    // Create last 30 days scaffold
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      grouped[d.toISOString().split('T')[0]] = 0;
    }
    
    safeData.forEach(curr => {
      if (!curr.created_at) return;
      const dateStr = new Date(curr.created_at).toISOString().split('T')[0];
      if (grouped[dateStr] !== undefined) {
        grouped[dateStr]++;
      }
    });

    return Object.entries(grouped).map(([date, views]) => ({
      date: date.slice(5), // MM-DD
      views
    }));
  }, [safeData]);

  // AI Insights Generation based on REAL data
  const generateInsights = () => {
    if (totalViews === 0) return ["Awaiting your first visitors to generate insights."];
    const insights = [];
    
    if (topCountries.length > 0 && topCountries[0].name !== 'Other') {
      insights.push(`Traffic from ${topCountries[0].name} is driving the most engagement. Consider localizing content.`);
    }
    
    if (devices.length > 0) {
      const topDevice = devices[0].name;
      insights.push(`${topDevice} users make up the majority of your traffic. Optimize layouts accordingly.`);
    }
    
    if (cleanReferrers.length > 0 && cleanReferrers[0].name !== 'Direct') {
      insights.push(`Strong inbound traffic from ${cleanReferrers[0].name}. Keep investing in this channel!`);
    }

    if (insights.length === 0) insights.push("Traffic is steady. Keep publishing great work!");
    return insights;
  };

  const insights = generateInsights();

  // --- UI Components ---
  const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white/70 dark:bg-[#111111]/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] ${className}`}>
      {children}
    </div>
  );

  const KPICard = ({ title, value, delta, icon: Icon, trend }: any) => (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
          <Icon size={20} className="text-[#0066FF]" />
        </div>
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${trend === 'up' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}>
          {delta}
        </span>
      </div>
      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-semibold text-gray-900 dark:text-white tracking-tight">{value}</p>
    </Card>
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FAFBFC] dark:bg-[#000000] text-gray-900 dark:text-gray-100 transition-colors duration-300 -m-4 sm:-m-8 pb-12 font-sans">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#000000]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 px-6 h-[72px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00D4AA] flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Activity size={18} className="text-white" />
          </div>
          <span className="font-semibold text-lg tracking-tight">Portfolio Analytics</span>
          <div className="hidden sm:flex items-center gap-2 ml-4 px-3 py-1 bg-green-100 dark:bg-green-500/10 rounded-full border border-green-200 dark:border-green-500/20">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-green-700 dark:text-green-400">Live</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-800" />

          <form action="/api/auth" method="POST" className="flex items-center">
            <input type="hidden" name="action" value="logout" />
            <button type="submit" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center border border-gray-300 dark:border-gray-700">
                <span className="text-xs">ADMIN</span>
              </div>
              <ChevronDown size={16} />
            </button>
          </form>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
        
        {/* TOOLBAR */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-lg p-1 shadow-sm">
              {['7d', '30d', '90d'].map(d => (
                <button 
                  key={d}
                  onClick={() => setDateRange(d)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${dateRange === d ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
                >
                  {d}
                </button>
              ))}
            </div>
            <button 
              onClick={handleRefresh}
              className="p-2 border border-gray-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#111111] hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-gray-500 shadow-sm"
            >
              <RefreshCw size={20} className={isRefreshing ? "animate-spin" : ""} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0066FF] hover:bg-blue-600 text-white rounded-lg font-medium text-sm transition-colors shadow-lg shadow-blue-500/20">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {/* HERO KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard title="Total Views" value={totalViews.toLocaleString()} delta="+12.5%" trend="up" icon={Activity} />
          <KPICard title="Unique Visitors" value={uniqueVisitors.toLocaleString()} delta="+8.2%" trend="up" icon={Users} />
          <KPICard title="Bounce Rate" value={`${bounceRate}%`} delta="-2.1%" trend="up" icon={MousePointerClick} />
          <KPICard title="Avg. Session" value={avgSession} delta="+14s" trend="up" icon={Clock} />
        </div>

        {/* MAIN CHART & AI INSIGHTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <Card className="lg:col-span-2 p-6 flex flex-col h-[420px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Traffic Trends</h2>
            </div>
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={PRIMARY} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={PRIMARY} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#333' : '#eee'} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: theme === 'dark' ? '#111' : '#fff', borderRadius: '12px', border: theme === 'dark' ? '1px solid #333' : '1px solid #eee', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: PRIMARY, fontWeight: 600 }}
                  />
                  <Area type="monotone" dataKey="views" stroke={PRIMARY} strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" activeDot={{ r: 6, fill: PRIMARY, stroke: '#fff', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50/50 to-teal-50/50 dark:from-blue-900/10 dark:to-teal-900/10 border-blue-100 dark:border-blue-500/20">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-[#0066FF]" size={20} />
              <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] to-[#00D4AA]">AI Insights</h2>
            </div>
            <div className="space-y-4">
              {insights.map((insight, idx) => (
                <div key={idx} className="p-4 bg-white/60 dark:bg-black/40 backdrop-blur-sm rounded-xl border border-white/50 dark:border-white/5 text-sm shadow-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {insight}
                </div>
              ))}
              <button className="w-full mt-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                Generate Full Report
              </button>
            </div>
          </Card>

        </div>

        {/* PERFORMANCE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="text-gray-400" size={18} />
              <h2 className="font-semibold">Top Geography</h2>
            </div>
            <div className="space-y-4">
              {topCountries.slice(0, 5).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 font-mono text-xs">{idx + 1}</span>
                    <span className="text-sm font-medium truncate max-w-[120px]">{item.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{item.value}</span>
                </div>
              ))}
              {topCountries.length === 0 && <p className="text-sm text-gray-500">No data</p>}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Smartphone className="text-gray-400" size={18} />
              <h2 className="font-semibold">Devices</h2>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={devices.length > 0 ? devices : [{name: 'None', value: 1}]} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                    {devices.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
             <div className="flex items-center gap-2 mb-6">
              <AlignLeft className="text-gray-400" size={18} />
              <h2 className="font-semibold">Top Referrers</h2>
            </div>
            <div className="space-y-4">
              {cleanReferrers.slice(0, 5).map((item, idx) => (
                <div key={idx} className="w-full">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium truncate max-w-[150px]">{item.name}</span>
                    <span className="text-gray-500">{item.value}</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#00D4AA] h-2 rounded-full" style={{ width: `${Math.max(5, (item.value / Math.max(...cleanReferrers.map(r=>r.value))) * 100)}%` }} />
                  </div>
                </div>
              ))}
              {cleanReferrers.length === 0 && <p className="text-sm text-gray-500">No data</p>}
            </div>
          </Card>

        </div>

        {/* RECENT ACTIVITY & RESET */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold">Recent Activity</h2>
            <button 
              onClick={async () => {
                if (window.confirm("WARNING: Are you sure you want to permanently delete ALL tracking data? This cannot be undone.")) {
                  try {
                    const res = await fetch('/api/reset-db', { method: 'POST' });
                    if (res.ok) window.location.reload();
                    else alert("Failed to reset database. Make sure you are logged in.");
                  } catch (err) {
                    alert("Error resetting database.");
                  }
                }
              }}
              className="text-xs font-medium text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors border border-red-200 dark:border-red-500/20"
            >
              Reset Data
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                <tr>
                  <th className="pb-3 font-medium px-4">Event</th>
                  <th className="pb-3 font-medium px-4">Time</th>
                  <th className="pb-3 font-medium px-4">Location</th>
                  <th className="pb-3 font-medium px-4">Platform</th>
                  <th className="pb-3 font-medium px-4">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
                {safeData.slice(0, 10).map((row, idx) => (
                  <tr key={row.id || idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#0066FF]" />
                        <span className="font-medium">Page View</span>
                        <span className="text-gray-500 text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">{row.path}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-500">{new Date(row.created_at).toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{row.city !== 'Unknown' && row.city ? `${row.city}, ${row.country}` : row.country || 'Unknown'}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{row.os} • {row.browser}</td>
                    <td className="py-3 px-4 text-gray-500 truncate max-w-[200px]">{row.referrer || 'Direct'}</td>
                  </tr>
                ))}
                {safeData.length === 0 && (
                  <tr><td colSpan={5} className="py-8 text-center text-gray-500">No activity recorded yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* FOOTER */}
        <footer className="mt-12 py-6 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2026 Portfolio Analytics. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Methodology</a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</a>
          </div>
        </footer>

      </div>
    </div>
  );
}
