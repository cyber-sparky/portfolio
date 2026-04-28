import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const config = [
  ...nextCoreWebVitals,
  {
    rules: {
      // SSR-safe hydration patterns (read localStorage/window on mount,
      // then set state) require this. The rule produces false positives for
      // legitimate ThemeProvider / ObfuscatedEmail patterns.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'public/**', 'dist/**'],
  },
];

export default config;
