import type { Metadata } from 'next';
import { absoluteUrls } from '@/app/lib/domains';

export const metadata: Metadata = {
  title: 'Blog — Security Writeups & Research',
  description:
    'CTF writeups, mobile security research, and technical deep-dives by Pranaw M (cybersparky_) — covering web exploitation, Active Directory, Android internals, cryptography, and more.',
  keywords: [
    'CTF writeups',
    'security research',
    'web exploitation',
    'Active Directory',
    'Android security',
    'HackTheBox writeups',
    'PwnTillDawn writeups',
    'cybersparky blog',
  ],
  alternates: {
    canonical: absoluteUrls.writeups,
  },
  openGraph: {
    title: 'Blog — Security Writeups & Research | cybersparky_',
    description:
      'CTF writeups, mobile security research, and technical deep-dives covering web exploitation, Active Directory, Android internals, and more.',
    url: absoluteUrls.writeups,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Security Writeups & Research',
    description: 'CTF writeups and security research by cybersparky_.',
  },
};

export default function WriteupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
