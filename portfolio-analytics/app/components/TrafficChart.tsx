'use client';

import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';

interface ChartDataPoint {
  date: string;
  views: number;
  sessions: number;
}

interface TrafficChartProps {
  data: ChartDataPoint[];
}

type DateRange = '7d' | '30d' | '90d';

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name?: string; value?: number; color?: string }>; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      className="rounded-xl px-4 py-3 text-[13px]"
      style={{
        background: 'var(--color-text-primary)',
        color: 'var(--color-bg)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      }}
    >
      <p className="font-medium mb-1.5 opacity-70">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="font-semibold">{entry.value?.toLocaleString()}</span>
          <span className="opacity-60">{entry.name}</span>
        </div>
      ))}
    </div>
  );
}

export function TrafficChart({ data }: TrafficChartProps) {
  const { theme } = useTheme();
  const [range, setRange] = useState<DateRange>('30d');
  const isDark = theme === 'dark';

  const rangeMap: Record<DateRange, number> = { '7d': 7, '30d': 30, '90d': 90 };
  const slicedData = data.slice(-rangeMap[range]);

  return (
    <div className="surface-card-static p-6 chart-enter">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <h2
          className="text-[18px] font-semibold tracking-tight"
          style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}
        >
          Traffic Trends
        </h2>
        <div
          className="flex items-center p-0.5 rounded-lg"
          style={{ background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' }}
        >
          {(['7d', '30d', '90d'] as DateRange[]).map((d) => (
            <button
              key={d}
              onClick={() => setRange(d)}
              className="px-3 py-1 text-[12px] font-medium rounded-md transition-all"
              style={{
                background: range === d ? (isDark ? 'rgba(255,255,255,0.1)' : 'white') : 'transparent',
                color: range === d ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                boxShadow: range === d ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
              }}
              aria-label={`Show last ${d} of traffic data`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={slicedData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0066FF" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#0066FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="sessionsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00D4AA" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#00D4AA" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-text-tertiary)', fontSize: 12 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-text-tertiary)', fontSize: 12 }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="views"
              name="Views"
              stroke="#0066FF"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#viewsGrad)"
              activeDot={{ r: 5, fill: '#0066FF', stroke: 'white', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="sessions"
              name="Sessions"
              stroke="#00D4AA"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#sessionsGrad)"
              activeDot={{ r: 5, fill: '#00D4AA', stroke: 'white', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
