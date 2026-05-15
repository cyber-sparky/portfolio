import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      { userAgent: 'Amazonbot', disallow: '/' },
      { userAgent: 'Applebot-Extended', disallow: '/' },
      { userAgent: 'Bytespider', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'meta-externalagent', disallow: '/' },
      { userAgent: 'CloudflareBrowserRenderingCrawler', disallow: '/' },
    ],
    sitemap: 'https://cybersparky.in/sitemap.xml',
    host: 'https://cybersparky.in',
  };
}
