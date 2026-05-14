'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#0066FF', '#00D4AA', '#8B5CF6', '#F59E0B', '#EC4899', '#14B8A6'];

interface SourceData {
  name: string;
  value: number;
}

interface TrafficSourcesProps {
  sources: SourceData[];
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name?: string; value?: number }> }) {
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
      {entry.name}: {entry.value?.toLocaleString()}
    </div>
  );
}

export function TrafficSources({ sources }: TrafficSourcesProps) {
  const total = sources.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="surface-card-static p-6 chart-enter" style={{ animationDelay: '160ms' }}>
      <h2
        className="text-[18px] font-semibold tracking-tight mb-6"
        style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}
      >
        Traffic Sources
      </h2>

      {sources.length > 0 ? (
        <>
          {/* Donut */}
          <div className="h-[200px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sources}
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                  animationBegin={0}
                  animationDuration={800}
                  animationEasing="ease-out"
                >
                  {sources.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="space-y-2.5">
            {sources.map((source, idx) => {
              const pct = total > 0 ? ((source.value / total) * 100).toFixed(1) : '0';
              return (
                <div key={source.name} className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ background: COLORS[idx % COLORS.length] }}
                    />
                    <span className="font-medium truncate max-w-[120px]" style={{ color: 'var(--color-text-primary)' }}>
                      {source.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span style={{ color: 'var(--color-text-secondary)' }}>{source.value}</span>
                    <span
                      className="text-[11px] font-medium px-1.5 py-0.5 rounded"
                      style={{ background: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
                    >
                      {pct}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="py-12 text-center">
          <p className="text-[14px]" style={{ color: 'var(--color-text-tertiary)' }}>No source data recorded yet.</p>
        </div>
      )}
    </div>
  );
}
