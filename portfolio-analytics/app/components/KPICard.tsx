'use client';

import { useEffect, useState, useRef } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { type LucideIcon } from 'lucide-react';

interface SparklinePoint {
  v: number;
}

interface KPICardProps {
  title: string;
  value: number | string;
  delta: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  sparklineData: SparklinePoint[];
  sparklineColor: string;
  animationDelay?: string;
}

function useCountUp(target: number, duration: number = 800): number {
  const [current, setCurrent] = useState(0);
  const ref = useRef<number>(0);

  useEffect(() => {
    if (target === 0) { setCurrent(0); return; }
    const start = performance.now();
    const from = ref.current;

    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const val = Math.round(from + (target - from) * eased);
      setCurrent(val);
      if (progress < 1) requestAnimationFrame(step);
      else ref.current = target;
    }

    requestAnimationFrame(step);
  }, [target, duration]);

  return current;
}

export function KPICard({
  title,
  value,
  delta,
  trend,
  icon: Icon,
  iconColor,
  iconBg,
  sparklineData,
  sparklineColor,
  animationDelay = '',
}: KPICardProps) {
  const isNumeric = typeof value === 'number';
  const animatedValue = useCountUp(isNumeric ? value : 0);

  return (
    <div className={`surface-card p-6 fade-in-up ${animationDelay}`}>
      {/* Top row: icon + delta badge */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-9 h-9 rounded-[10px] flex items-center justify-center"
          style={{ background: iconBg }}
        >
          <Icon size={18} style={{ color: iconColor }} />
        </div>
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-md text-[12px] font-semibold"
          style={{
            background: trend === 'up' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            color: trend === 'up' ? '#10B981' : '#EF4444',
          }}
        >
          {trend === 'up' ? '▲' : '▼'} {delta}
        </span>
      </div>

      {/* Label */}
      <p
        className="text-[13px] font-medium tracking-wide uppercase mb-1"
        style={{ color: 'var(--color-text-secondary)', letterSpacing: '0.01em' }}
      >
        {title}
      </p>

      {/* Big number + sparkline row */}
      <div className="flex items-end justify-between">
        <span
          className="text-[40px] font-bold tracking-[-0.03em] leading-none"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {isNumeric ? animatedValue.toLocaleString() : value}
        </span>

        {/* Sparkline */}
        <div className="w-[72px] h-[32px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <defs>
                <linearGradient id={`spark-${title.replace(/\s/g, '')}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={sparklineColor} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={sparklineColor} stopOpacity={1} />
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="v"
                stroke={`url(#spark-${title.replace(/\s/g, '')})`}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
