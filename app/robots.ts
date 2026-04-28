import type { MetadataRoute } from 'next';
import { absoluteUrls } from '@/app/lib/domains';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: `${absoluteUrls.home}/sitemap.xml`,
    host: absoluteUrls.home,
  };
}
