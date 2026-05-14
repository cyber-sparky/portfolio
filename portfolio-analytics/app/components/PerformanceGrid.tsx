'use client';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { Globe, Smartphone, ArrowUpRight } from 'lucide-react';

interface RankedItem {
  name: string;
  value: number;
}

interface PerformanceGridProps {
  countries: RankedItem[];
  devices: RankedItem[];
  referrers: RankedItem[];
}

function RankedList({ items, icon: Icon, title, barColor }: { items: RankedItem[]; icon: typeof Globe; title: string; barColor: string }) {
  const max = items.length > 0 ? items[0].value : 1;

  return (
    <div className="surface-card-static p-6">
      <div className="flex items-center gap-2 mb-5">
        <Icon size={16} style={{ color: 'var(--color-text-tertiary)' }} />
        <h3
          className="text-[16px] font-semibold tracking-tight"
          style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}
        >
          {title}
        </h3>
      </div>

      <div className="space-y-3">
        {items.slice(0, 6).map((item, idx) => (
          <div key={item.name}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2.5">
                <span
                  className="text-[11px] font-semibold w-5 text-center"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  {idx + 1}
                </span>
                <span className="text-[13px] font-medium truncate max-w-[140px]" style={{ color: 'var(--color-text-primary)' }}>
                  {item.name}
                </span>
              </div>
              <span className="text-[13px] font-semibold tabular-nums" style={{ color: 'var(--color-text-secondary)' }}>
                {item.value.toLocaleString()}
              </span>
            </div>
            <div className="ml-[30px] h-[3px] rounded-full" style={{ background: 'var(--color-border)' }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${Math.max(4, (item.value / max) * 100)}%`, background: barColor, opacity: 0.6 }}
              />
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-[13px] py-4 text-center" style={{ color: 'var(--color-text-tertiary)' }}>
            No data yet.
          </p>
        )}
      </div>
    </div>
  );
}

function DeviceBarTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload?: RankedItem; value?: number }> }) {
  if (!active || !payload || payload.length === 0) return null;
  const entry = payload[0];
  return (
    <div
      className="rounded-lg px-3 py-2 text-[12px] font-medium"
      style={{
        background: 'var(--color-text-primary)',
        color: 'var(--color-bg)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      }}
    >
      {entry.payload?.name}: {entry.value?.toLocaleString()}
    </div>
  );
}

function DevicesChart({ devices }: { devices: RankedItem[] }) {
  const COLORS = ['#0066FF', '#00D4AA', '#8B5CF6', '#F59E0B', '#EC4899'];

  return (
    <div className="surface-card-static p-6">
      <div className="flex items-center gap-2 mb-5">
        <Smartphone size={16} style={{ color: 'var(--color-text-tertiary)' }} />
        <h3
          className="text-[16px] font-semibold tracking-tight"
          style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}
        >
          Devices
        </h3>
      </div>

      {devices.length > 0 ? (
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={devices} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
                width={80}
              />
              <Tooltip content={<DeviceBarTooltip />} cursor={false} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
                {devices.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-[13px]" style={{ color: 'var(--color-text-tertiary)' }}>No device data yet.</p>
        </div>
      )}
    </div>
  );
}

export function PerformanceGrid({ countries, devices, referrers }: PerformanceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 chart-enter" style={{ animationDelay: '320ms' }}>
      <RankedList items={countries} icon={Globe} title="Top Geography" barColor="#0066FF" />
      <DevicesChart devices={devices} />
      <RankedList items={referrers} icon={ArrowUpRight} title="Top Referrers" barColor="#00D4AA" />
    </div>
  );
}
