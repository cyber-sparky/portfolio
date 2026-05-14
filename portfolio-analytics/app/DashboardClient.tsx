'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardClient({ data }: { data: any[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-neutral-900 border border-neutral-800 p-12 rounded-lg text-center">
        <p className="text-neutral-400 font-mono mb-4">No tracking data found yet.</p>
        <p className="text-sm text-neutral-500">
          Make sure your portfolio has the Tracker integrated and the database is initialized.
          <br/>
          (You can initialize it by visiting `/api/init-db` in your browser once)
        </p>
      </div>
    );
  }

  // Process data for chart
  const groupedByDate: Record<string, number> = data.reduce((acc, curr) => {
    // Check if created_at exists and is valid
    if (!curr.created_at) return acc;
    const dateStr = new Date(curr.created_at).toISOString().split('T')[0];
    acc[dateStr] = (acc[dateStr] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(groupedByDate).map(([date, views]) => ({
    date,
    views
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const totalViews = data.length;
  const uniqueVisitors = new Set(data.map(d => d.ip_hash)).size;
  
  // Top Paths
  const pathsCount: Record<string, number> = data.reduce((acc, curr) => {
    acc[curr.path] = (acc[curr.path] || 0) + 1;
    return acc;
  }, {});
  
  const topPaths = Object.entries(pathsCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-neutral-400 text-sm font-mono mb-2">Total Page Views</p>
          <p className="text-4xl sm:text-5xl font-bold text-white tracking-tight">{totalViews}</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
           <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-neutral-400 text-sm font-mono mb-2">Unique IPs</p>
          <p className="text-4xl sm:text-5xl font-bold text-white tracking-tight">{uniqueVisitors}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
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
          <div className="space-y-4">
            {topPaths.map(([path, count]) => (
              <div key={path} className="flex justify-between items-center group">
                <span className="font-mono text-sm text-neutral-300 truncate pr-4 group-hover:text-emerald-400 transition-colors">{path}</span>
                <span className="bg-neutral-950 border border-neutral-800 text-neutral-300 py-1 px-3 rounded text-xs font-mono">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Log */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-neutral-800">
           <h2 className="text-sm font-mono text-neutral-400 uppercase tracking-widest">Recent Logs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-950/50 text-neutral-500 font-mono text-xs">
              <tr>
                <th className="py-3 px-6 font-medium">Path</th>
                <th className="py-3 px-6 font-medium">Time</th>
                <th className="py-3 px-6 font-medium">Referrer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50">
              {data.slice(0, 15).map(row => (
                <tr key={row.id} className="hover:bg-neutral-800/30 transition-colors">
                  <td className="py-3 px-6 font-mono text-emerald-400/90">{row.path}</td>
                  <td className="py-3 px-6 text-neutral-400">{new Date(row.created_at).toLocaleString()}</td>
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
