'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface ActivityRow {
  id: number;
  path: string;
  created_at: string;
  country: string;
  city: string;
  browser: string;
  os: string;
  device: string;
  referrer: string;
  ip_hash: string;
}

interface ActivityFeedProps {
  rows: ActivityRow[];
}

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

export function ActivityFeed({ rows }: ActivityFeedProps) {
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = async () => {
    if (!window.confirm('Are you sure you want to permanently delete ALL analytics data? This cannot be undone.')) return;

    setIsResetting(true);
    try {
      const res = await fetch('/api/reset-db', { method: 'POST' });
      if (res.ok) window.location.reload();
      else alert('Failed to reset. Ensure you are logged in.');
    } catch {
      alert('Network error resetting database.');
    }
    setIsResetting(false);
  };

  return (
    <div className="surface-card-static chart-enter" style={{ animationDelay: '400ms' }}>
      {/* Header */}
      <div className="p-6 flex items-center justify-between" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div className="flex items-center gap-3">
          <h2
            className="text-[18px] font-semibold tracking-tight"
            style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}
          >
            Live Activity
          </h2>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 live-pulse" />
            <span className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>Refreshes every 60s</span>
          </div>
        </div>
        <button
          onClick={handleReset}
          disabled={isResetting}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all"
          style={{
            color: '#EF4444',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            background: 'rgba(239, 68, 68, 0.04)',
            opacity: isResetting ? 0.5 : 1,
          }}
          aria-label="Reset all analytics data"
        >
          <Trash2 size={13} />
          {isResetting ? 'Resetting...' : 'Reset Data'}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left" aria-label="Recent activity feed">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
              <th className="py-3 px-6 text-[11px] font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-tertiary)' }}>Event</th>
              <th className="py-3 px-6 text-[11px] font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-tertiary)' }}>Location</th>
              <th className="py-3 px-6 text-[11px] font-medium uppercase tracking-wide hidden lg:table-cell" style={{ color: 'var(--color-text-tertiary)' }}>Platform</th>
              <th className="py-3 px-6 text-[11px] font-medium uppercase tracking-wide text-right" style={{ color: 'var(--color-text-tertiary)' }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 12).map((row) => (
              <tr
                key={row.id}
                className="transition-colors"
                style={{ borderBottom: '1px solid var(--color-border)' }}
              >
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: '#0066FF' }} />
                    <span
                      className="text-[12px] font-semibold px-2 py-0.5 rounded-md"
                      style={{ background: 'rgba(0, 102, 255, 0.08)', color: '#0066FF' }}
                    >
                      Page View
                    </span>
                    <span className="text-[13px] font-mono" style={{ color: 'var(--color-text-primary)' }}>
                      {row.path}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-6">
                  <span className="text-[13px]" style={{ color: 'var(--color-text-secondary)' }}>
                    {row.city && row.city !== 'Unknown' ? `${row.city}, ${row.country}` : row.country || '—'}
                  </span>
                </td>
                <td className="py-3.5 px-6 hidden lg:table-cell">
                  <span className="text-[13px]" style={{ color: 'var(--color-text-secondary)' }}>
                    {row.browser} · {row.os}
                  </span>
                </td>
                <td className="py-3.5 px-6 text-right">
                  <span
                    className="text-[12px] tabular-nums cursor-default"
                    style={{ color: 'var(--color-text-tertiary)' }}
                    title={new Date(row.created_at).toLocaleString()}
                  >
                    {relativeTime(row.created_at)}
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="py-12 text-center">
                  <p className="text-[14px] mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                    No activity yet
                  </p>
                  <p className="text-[12px]" style={{ color: 'var(--color-text-tertiary)' }}>
                    Your first visitor will appear here.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
