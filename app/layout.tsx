import type { Metadata } from 'next';
import { JetBrains_Mono, Outfit } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import ThemeProvider from '@/app/components/ThemeProvider';
import ScrollProgress from '@/app/components/ScrollProgress';
import CommandPalette from '@/app/components/CommandPalette';
import { absoluteUrls } from '@/app/lib/domains';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrls.home),
  title: {
    default: 'cybersparky_ | Security Engineer',
    template: '%s | cybersparky_',
  },
  description:
    'Portfolio of Pranaw M — security engineer specializing in application security, DevSecOps, and building secure CI/CD pipelines.',
  keywords: [
    'security engineer',
    'application security',
    'DevSecOps',
    'SAST',
    'SCA',
    'container security',
    'cybersparky',
    'Pranaw M',
    'AppSec',
  ],
  authors: [{ name: 'Pranaw M', url: absoluteUrls.home }],
  creator: 'Pranaw M',
  publisher: 'Pranaw M',
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [
        { url: `${absoluteUrls.writeups}/feed.xml`, title: 'cybersparky_ blog' },
      ],
    },
  },
  openGraph: {
    title: 'cybersparky_ | Security Engineer',
    description:
      'Securing code. Shipping safe. Security engineer portfolio showcasing AppSec expertise and tooling.',
    url: absoluteUrls.home,
    siteName: 'cybersparky_',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'cybersparky_ | Security Engineer',
    description: 'Securing code. Shipping safe.',
    creator: '@cybersparky',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  category: 'technology',
};

const themeScript = `
(function(){
  var t = localStorage.getItem('theme');
  if (t === 'light') { document.documentElement.classList.remove('dark'); }
  else { document.documentElement.classList.add('dark'); }
})();
`;

import Tracker from '@/app/components/Tracker';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${jetbrainsMono.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans transition-colors duration-300">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-neon-green focus:text-bg focus:font-mono focus:text-sm focus:rounded-md"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <Tracker />
          <ScrollProgress />
          <CommandPalette />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
