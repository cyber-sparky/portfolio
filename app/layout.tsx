import type { Metadata } from 'next';
import { JetBrains_Mono, Outfit } from 'next/font/google';
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
  title: 'cybersparky_ | Security Engineer & Bug Bounty Hunter',
  description:
    'Portfolio of cybersparky — security engineer and bug bounty hunter specializing in web application security, recon automation, and vulnerability research.',
  keywords: [
    'security engineer',
    'bug bounty hunter',
    'penetration testing',
    'web security',
    'vulnerability research',
    'recon automation',
    'cybersparky',
  ],
  authors: [{ name: 'cybersparky' }],
  openGraph: {
    title: 'cybersparky_ | Security Engineer & Bug Bounty Hunter',
    description:
      'Breaking things. Responsibly. Security engineer portfolio showcasing bug bounty findings, tools, and expertise.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'cybersparky_ | Security Engineer & Bug Bounty Hunter',
    description: 'Breaking things. Responsibly.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
