'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function DashboardClient({ data }: { data: any[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-neutral-900 border border-neutral-800 p-12 rounded-lg text-center">
        <p className="text-neutral-400 font-mono mb-4">No tracking data found yet.</p>
        <p className="text-sm text-neutral-500 mb-6">
          Make sure your portfolio has the Tracker integrated and the database is initialized.
          <br/>
          (You can initialize it by visiting `/api/init-db` in your browser once)
        </p>
      </div>
    );
  }

  // Basic Stats
  const totalViews = data.length;
  const uniqueVisitors = new Set(data.map(d => d.ip_hash)).size;

  // Generic counter function
  const countByField = (field: string) => {
    const counts = data.reduce((acc, curr) => {
      const val = curr[field] || 'Unknown';
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value: value as number }))
      .sort((a, b) => b.value - a.value);
  };

  const topPaths = countByField('path').slice(0, 5);
  const topCountries = countByField('country').slice(0, 5);
  const browsers = countByField('browser');
  const operatingSystems = countByField('os');
  const devices = countByField('device');

  const topCountryName = topCountries.length > 0 && topCountries[0].name !== 'Unknown' ? topCountries[0].name : 'N/A';

  // Views Over Time
  const groupedByDate: Record<string, number> = data.reduce((acc, curr) => {
    if (!curr.created_at) return acc;
    const dateStr = new Date(curr.created_at).toISOString().split('T')[0];
    acc[dateStr] = (acc[dateStr] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(groupedByDate).map(([date, views]) => ({
    date,
    views
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Helper to render simple stat lists
  const renderList = (items: {name: string, value: number}[]) => (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex justify-between items-center group">
          <span className="font-mono text-sm text-neutral-300 truncate pr-4 group-hover:text-emerald-400 transition-colors">
            {item.name === 'Unknown' ? 'Unknown/Bot' : item.name}
          </span>
          <span className="bg-neutral-950 border border-neutral-800 text-neutral-300 py-1 px-3 rounded text-xs font-mono">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Top Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
          <p className="text-neutral-400 text-xs font-mono mb-2 uppercase tracking-widest">Total Views</p>
          <p className="text-4xl font-bold text-white tracking-tight">{totalViews}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
          <p className="text-neutral-400 text-xs font-mono mb-2 uppercase tracking-widest">Unique IPs</p>
          <p className="text-4xl font-bold text-white tracking-tight">{uniqueVisitors}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
          <p className="text-neutral-400 text-xs font-mono mb-2 uppercase tracking-widest">Top Country</p>
          <p className="text-4xl font-bold text-emerald-400 tracking-tight">{topCountryName}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
          <p className="text-neutral-400 text-xs font-mono mb-2 uppercase tracking-widest">Top Device</p>
          <p className="text-4xl font-bold text-emerald-400 tracking-tight">{devices[0]?.name || 'Unknown'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 p-6 rounded-lg">
          <h2 className="text-sm font-mono mb-6 text-neutral-400 uppercase tracking-widest">Views over time</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="date" stroke="#525252" tick={{ fill: '#737373', fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(val) => val.slice(5)} />
                <YAxis stroke="#525252" tick={{ fill: '#737373', fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: '#262626'}}
                  contentStyle={{backgroundColor: '#171717', borderColor: '#404040', borderRadius: '8px', color: '#fff'}}
                  itemStyle={{color: '#10b981'}}
                />
                <Bar dataKey="views" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Paths */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg">
          <h2 className="text-sm font-mono mb-6 text-neutral-400 uppercase tracking-widest">Top Paths</h2>
          {renderList(topPaths)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg">
          <h2 className="text-sm font-mono mb-6 text-neutral-400 uppercase tracking-widest">Top Countries</h2>
          {renderList(topCountries)}
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg">
          <h2 className="text-sm font-mono mb-6 text-neutral-400 uppercase tracking-widest">Browsers</h2>
          {renderList(browsers)}
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg">
          <h2 className="text-sm font-mono mb-6 text-neutral-400 uppercase tracking-widest">Operating Systems</h2>
          {renderList(operatingSystems)}
        </div>
      </div>

      {/* Recent Log */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
           <h2 className="text-sm font-mono text-neutral-400 uppercase tracking-widest">Recent Logs</h2>
           <button 
             onClick={async () => {
               if (window.confirm("WARNING: Are you sure you want to permanently delete ALL tracking data? This will reset your stats to zero and cannot be undone.")) {
                 try {
                   const res = await fetch('/api/reset-db', { method: 'POST' });
                   if (res.ok) window.location.reload();
                   else alert("Failed to reset database. Make sure you are logged in.");
                 } catch (err) {
                   alert("Error resetting database.");
                 }
               }
             }}
             className="text-xs font-mono text-red-500 hover:text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded transition-colors border border-red-500/20"
           >
             [Reset Data]
           </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-950/50 text-neutral-500 font-mono text-xs">
              <tr>
                <th className="py-3 px-6 font-medium">Path</th>
                <th className="py-3 px-6 font-medium">Time</th>
                <th className="py-3 px-6 font-medium">Location</th>
                <th className="py-3 px-6 font-medium">Platform</th>
                <th className="py-3 px-6 font-medium">Referrer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50">
              {data.slice(0, 15).map(row => (
                <tr key={row.id} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="py-3 px-6 font-mono text-emerald-400/90">{row.path}</td>
                  <td className="py-3 px-6 text-neutral-400">{new Date(row.created_at).toLocaleString()}</td>
                  <td className="py-3 px-6 text-neutral-400">{row.city !== 'Unknown' ? `${row.city}, ${row.country}` : row.country || '-'}</td>
                  <td className="py-3 px-6 text-neutral-400">{row.os} • {row.browser}</td>
                  <td className="py-3 px-6 text-neutral-500 truncate max-w-[200px]">{row.referrer || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
