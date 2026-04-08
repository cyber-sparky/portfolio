import type { Metadata } from 'next';
import { JetBrains_Mono, Outfit } from 'next/font/google';
import ThemeProvider from '@/app/components/ThemeProvider';
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
  title: 'cybersparky_ | Security Engineer',
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
  ],
  authors: [{ name: 'Pranaw M' }],
  openGraph: {
    title: 'cybersparky_ | Security Engineer',
    description:
      'Securing code. Shipping safe. Security engineer portfolio showcasing AppSec expertise and tooling.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'cybersparky_ | Security Engineer',
    description: 'Securing code. Shipping safe.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

const themeScript = `
(function(){
  var t = localStorage.getItem('theme');
  if (t === 'light') { document.documentElement.classList.remove('dark'); }
  else { document.documentElement.classList.add('dark'); }
})();
`;

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
      <body className="font-sans antialiased transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
