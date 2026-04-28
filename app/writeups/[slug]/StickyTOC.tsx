'use client';

import { useEffect, useState } from 'react';

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export default function StickyTOC({ headings }: { headings: string[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;

    const ids = headings.map(slugify);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    // Track all visible headings; pick the topmost one.
    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        });

        if (visible.size > 0) {
          // Among visible headings, pick the one closest to the top of the viewport.
          const topId = Array.from(visible.keys()).reduce((acc, id) => {
            if (!acc) return id;
            const a = document.getElementById(acc)?.getBoundingClientRect().top ?? Infinity;
            const b = document.getElementById(id)?.getBoundingClientRect().top ?? Infinity;
            return b < a ? id : acc;
          }, '' as string);
          if (topId) setActiveId(topId);
        }
      },
      {
        // Trigger when heading enters the upper portion of the viewport.
        rootMargin: '-80px 0px -70% 0px',
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav
      className="mb-10 lg:mb-0 lg:sticky lg:top-24 p-5 bg-card-bg border border-card-border rounded-lg lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto"
      aria-label="Table of contents"
    >
      <div className="text-xs font-mono text-dimmed uppercase tracking-widest mb-3">
        Table of Contents
      </div>
      <ol className="space-y-1.5">
        {headings.map((h, i) => {
          const id = slugify(h);
          const isActive = activeId === id;
          return (
            <li key={i} className="flex gap-2 text-sm font-mono">
              <span
                className={`shrink-0 transition-colors ${
                  isActive ? 'text-neon-green' : 'text-neon-green/50'
                }`}
              >
                {String(i + 1).padStart(2, '0')}.
              </span>
              <a
                href={`#${id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`transition-colors ${
                  isActive
                    ? 'text-neon-green text-glow'
                    : 'text-muted hover:text-neon-green'
                }`}
              >
                {h}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
