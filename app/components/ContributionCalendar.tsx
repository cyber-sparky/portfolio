'use client';

import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from './ThemeProvider';

const calendarTheme = {
  // Light theme: subtle grays → neon-green ramp
  light: ['#e5e7eb', '#86efac', '#4ade80', '#16a34a', '#15803d'],
  // Dark theme: tuned for the site's near-black background and neon-green accent
  dark: ['#1a1a1a', '#003820', '#006b32', '#22c55e', '#39d353'],
};

export default function ContributionCalendar({
  username,
}: {
  username: string;
}) {
  const { theme } = useTheme();

  return (
    <div className="overflow-x-auto -mx-2 px-2 py-2">
      <GitHubCalendar
        username={username}
        colorScheme={theme}
        theme={calendarTheme}
        blockSize={11}
        blockMargin={3}
        fontSize={11}
        labels={{
          totalCount: '{{count}} contributions in {{year}}',
        }}
        errorMessage="Could not load GitHub activity right now."
      />
    </div>
  );
}
