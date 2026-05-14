'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Module-level variable completely ignores React component lifecycles,
// guaranteeing it survives strict-mode unmounts and remounts.
let lastTrackedPath: string | null = null;

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Prevent duplicate tracking calls (happens in React 18+ concurrent mode)
    if (lastTrackedPath === pathname) return;
    lastTrackedPath = pathname;

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
