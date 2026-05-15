import type { MetadataRoute } from 'next';
import { absoluteUrls, absoluteWriteupUrl } from '@/app/lib/domains';
import { writeups } from '@/app/data/writeups';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: 'https://cybersparky.in',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: 'https://cybersparky.in/about',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrls.writeups,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrls.resume,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://cybersparky.in/contact',
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];

  const writeupEntries: MetadataRoute.Sitemap = writeups.map((w) => ({
    url: absoluteWriteupUrl(w.slug),
    lastModified: new Date(w.date),
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  return [...staticEntries, ...writeupEntries];
}
