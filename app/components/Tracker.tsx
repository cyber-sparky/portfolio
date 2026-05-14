'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function Tracker() {
  const pathname = usePathname();
  const trackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Prevent duplicate tracking calls (happens in React 18+ concurrent mode)
    if (trackedPath.current === pathname) return;
    trackedPath.current = pathname;

    const analyticsUrl = process.env.NEXT_PUBLIC_ANALYTICS_URL || 'http://localhost:3001';

    const trackVisit = async () => {
      try {
        await fetch(`${analyticsUrl}/api/track`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: pathname,
            referrer: document.referrer || '',
          }),
        });
      } catch (error) {
        console.warn('Analytics tracking skipped or failed.');
      }
    };

    trackVisit();
  }, [pathname]);

  return null;
}
