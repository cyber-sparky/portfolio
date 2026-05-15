import type { Metadata } from 'next';
import { absoluteUrls } from '@/app/lib/domains';

export const metadata: Metadata = {
  title: 'Bug Bounty Write-ups',
  description:
    'Detailed vulnerability write-ups and bug bounty reports by Pranaw M covering XSS, IDOR, CSRF, and API security findings.',
  keywords: [
    'CTF writeups',
    'bug bounty writeups',
    'security research',
    'web exploitation',
    'XSS',
    'IDOR',
    'CSRF',
    'API security',
    'HackTheBox writeups',
    'cybersparky blog',
  ],
  alternates: {
    canonical: absoluteUrls.writeups,
  },
  openGraph: {
    title: 'Bug Bounty Write-ups | CyberSparky',
    description:
      'Detailed vulnerability write-ups and bug bounty reports by Pranaw M covering XSS, IDOR, CSRF, and API security findings.',
    url: absoluteUrls.writeups,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bug Bounty Write-ups | CyberSparky',
    description:
      'Detailed vulnerability write-ups and bug bounty reports by Pranaw M covering XSS, IDOR, CSRF, and API security findings.',
  },
};

export default function WriteupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
