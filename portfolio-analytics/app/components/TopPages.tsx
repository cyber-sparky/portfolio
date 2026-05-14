'use client';

interface PageRow {
  path: string;
  views: number;
  avgTime: string;
  bounceRate: number;
}

interface TopPagesProps {
  pages: PageRow[];
}

export function TopPages({ pages }: TopPagesProps) {
  const maxViews = pages.length > 0 ? pages[0].views : 1;

  return (
    <div className="surface-card-static p-6 chart-enter" style={{ animationDelay: '80ms' }}>
      <h2
        className="text-[18px] font-semibold tracking-tight mb-6"
        style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}
      >
        Top Pages
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left" aria-label="Top visited pages">
          <thead>
            <tr>
              <th className="pb-3 text-[12px] font-medium uppercase tracking-wide" style={{ color: 'var(--color-text-tertiary)' }}>Page</th>
              <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-right" style={{ color: 'var(--color-text-tertiary)' }}>Views</th>
              <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-right hidden sm:table-cell" style={{ color: 'var(--color-text-tertiary)' }}>Avg Time</th>
              <th className="pb-3 text-[12px] font-medium uppercase tracking-wide text-right hidden sm:table-cell" style={{ color: 'var(--color-text-tertiary)' }}>Bounce</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page, idx) => (
              <tr
                key={page.path}
                className="group"
                style={{ background: idx % 2 === 1 ? 'rgba(0,0,0,0.02)' : 'transparent' }}
              >
                <td className="py-3 pr-4">
                  <div className="space-y-1.5">
                    <span className="text-[13px] font-mono font-medium" style={{ color: 'var(--color-text-primary)' }}>
                      {page.path}
                    </span>
                    {/* Progress bar under path */}
                    <div
                      className="h-[3px] rounded-full"
                      style={{ background: 'var(--color-border)' }}
                    >
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.max(4, (page.views / maxViews) * 100)}%`,
                          background: 'linear-gradient(90deg, #0066FF, #00D4AA)',
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-3 text-right">
                  <span className="text-[14px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {page.views.toLocaleString()}
                  </span>
                </td>
                <td className="py-3 text-right hidden sm:table-cell">
                  <span className="text-[13px]" style={{ color: 'var(--color-text-secondary)' }}>
                    {page.avgTime}
                  </span>
                </td>
                <td className="py-3 text-right hidden sm:table-cell">
                  <span className="text-[13px]" style={{ color: 'var(--color-text-secondary)' }}>
                    {page.bounceRate}%
                  </span>
                </td>
              </tr>
            ))}
            {pages.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-[14px]" style={{ color: 'var(--color-text-tertiary)' }}>
                  No page data recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
