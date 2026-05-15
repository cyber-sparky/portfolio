import type { Metadata } from 'next';
import { JetBrains_Mono, Outfit } from 'next/font/google';
import ThemeProvider from '@/app/components/ThemeProvider';
import ScrollProgress from '@/app/components/ScrollProgress';
import CommandPalette from '@/app/components/CommandPalette';
import JsonLd from '@/app/components/JsonLd';
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

// TODO: add Google Search Console verification token here
// verification: { google: 'YOUR_VERIFICATION_TOKEN' },

export const metadata: Metadata = {
  metadataBase: new URL('https://cybersparky.in'),
  title: {
    template: '%s | CyberSparky',
    default: 'Pranaw M (CyberSparky) — Offensive Security Engineer',
  },
  description:
    'Web application penetration tester and bug bounty hunter. Specializing in XSS, IDOR, CSRF, and API security. Open to offensive security engineering roles.',
  keywords: [
    'web application pentester',
    'bug bounty hunter',
    'offensive security engineer',
    'cybersparky',
    'HackerOne',
    'XSS',
    'IDOR',
    'Chennai',
    'India',
    'penetration testing',
  ],
  authors: [{ name: 'Pranaw M', url: 'https://cybersparky.in' }],
  creator: 'Pranaw M',
  publisher: 'Pranaw M',
  alternates: {
    canonical: 'https://cybersparky.in',
    types: {
      'application/rss+xml': [
        { url: `${absoluteUrls.writeups}/feed.xml`, title: 'cybersparky_ blog' },
      ],
    },
  },
  openGraph: {
    title: 'Pranaw M (CyberSparky) — Offensive Security Engineer',
    description:
      'Web application penetration tester and bug bounty hunter. Specializing in XSS, IDOR, CSRF, and API security.',
    url: 'https://cybersparky.in',
    siteName: 'CyberSparky',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pranaw M — Offensive Security Engineer',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pranaw M (CyberSparky) — Offensive Security Engineer',
    description:
      'Web application penetration tester and bug bounty hunter. Specializing in XSS, IDOR, CSRF, and API security.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  category: 'technology',
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Pranaw M',
  alternateName: 'CyberSparky',
  url: 'https://cybersparky.in',
  jobTitle: 'Offensive Security Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance / Bug Bounty',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chennai',
    addressCountry: 'IN',
  },
  knowsAbout: [
    'Web Application Penetration Testing',
    'Bug Bounty Hunting',
    'XSS',
    'IDOR',
    'CSRF',
    'API Security',
    'Offensive Security',
  ],
  sameAs: [
    'https://github.com/cyber-sparky',
    'https://www.linkedin.com/in/cybersparky/',
    'https://hackerone.com/cybersparky',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'CyberSparky',
  url: 'https://cybersparky.in',
  description:
    'Portfolio and write-ups by Pranaw M, offensive security engineer and bug bounty hunter',
  author: {
    '@type': 'Person',
    name: 'Pranaw M',
  },
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
        <JsonLd schema={personSchema} />
        <JsonLd schema={websiteSchema} />
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
      </body>
    </html>
  );
}
