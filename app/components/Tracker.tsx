'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Determine the analytics URL based on environment or use a hardcoded production URL
    // For local testing of the analytics server, we can point to localhost:3001
    // In production, you would set NEXT_PUBLIC_ANALYTICS_URL to your deployed Vercel URL
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
        // Silently fail in case of tracking errors (adblockers, etc) to not break the UI
        console.warn('Analytics tracking skipped or failed.');
      }
    };

    trackVisit();
  }, [pathname]);

  return null;
}
