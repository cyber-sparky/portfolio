import { writeups } from '@/app/data/writeups';
import { absoluteUrls, absoluteWriteupUrl } from '@/app/lib/domains';

export const dynamic = 'force-static';

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

export async function GET() {
  const sortedPosts = [...writeups].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const buildDate = sortedPosts[0]
    ? new Date(sortedPosts[0].date).toUTCString()
    : new Date().toUTCString();

  const items = sortedPosts
    .map((w) => {
      const link = absoluteWriteupUrl(w.slug);
      const pubDate = new Date(w.date).toUTCString();
      const categories = w.tags
        .map((t) => `      <category>${escapeXml(t)}</category>`)
        .join('\n');

      return `    <item>
      <title>${escapeXml(w.title)} — ${escapeXml(w.ctfName)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(w.description)}</description>
      <category>${escapeXml(w.category)}</category>
${categories}
      <author>noreply@cybersparky.in (Pranaw M)</author>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>cybersparky_ — Security Blog</title>
    <link>${absoluteUrls.writeups}</link>
    <atom:link href="${absoluteUrls.writeups}/feed.xml" rel="self" type="application/rss+xml" />
    <description>CTF writeups, mobile security research, and technical deep-dives by Pranaw M (cybersparky_).</description>
    <language>en-us</language>
    <copyright>Copyright ${new Date().getFullYear()} Pranaw M</copyright>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <generator>Next.js</generator>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
