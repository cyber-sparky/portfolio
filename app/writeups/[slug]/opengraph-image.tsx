import { ImageResponse } from 'next/og';
import { writeups } from '@/app/data/writeups';
import { isValidSlug } from '@/app/lib/domains';

export const alt = 'Blog post on cybersparky_';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const writeup = isValidSlug(slug)
    ? writeups.find((w) => w.slug === slug)
    : undefined;
  return [
    {
      contentType: 'image/png',
      size,
      id: 'main',
      alt: writeup ? `${writeup.title} — ${writeup.ctfName}` : alt,
    },
  ];
}

const categoryAccent: Record<string, string> = {
  web: '#00ff41',
  crypto: '#00b4d8',
  pwn: '#f87171',
  forensics: '#fbbf24',
  reverse: '#c084fc',
  android: '#34d399',
  misc: '#9ca3af',
};

export default async function PostOGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const writeup = isValidSlug(slug)
    ? writeups.find((w) => w.slug === slug)
    : undefined;

  if (!writeup) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            color: '#ffffff',
            fontSize: 48,
            fontFamily: 'monospace',
          }}
        >
          404 — post not found
        </div>
      ),
      { ...size }
    );
  }

  const accent = categoryAccent[writeup.category] || '#00ff41';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0a0a0a',
          backgroundImage: `radial-gradient(circle at 80% 10%, ${accent}15 0%, transparent 50%)`,
          padding: '70px 80px',
          fontFamily: 'monospace',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              display: 'flex',
              padding: '6px 14px',
              border: `1px solid ${accent}66`,
              borderRadius: 6,
              color: accent,
              fontSize: 20,
              background: `${accent}15`,
            }}
          >
            {writeup.category}
          </div>
          <div style={{ color: '#9ca3af', fontSize: 20 }}>
            {writeup.difficulty}
          </div>
          <div style={{ color: '#6b7280', fontSize: 20 }}>·</div>
          <div style={{ color: '#9ca3af', fontSize: 20 }}>{writeup.date}</div>
        </div>

        <div
          style={{
            display: 'flex',
            color: '#ffffff',
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: 16,
            maxWidth: '1040px',
          }}
        >
          {writeup.title}
        </div>

        <div
          style={{
            display: 'flex',
            color: accent,
            fontSize: 28,
            fontWeight: 600,
            marginBottom: 32,
          }}
        >
          {writeup.ctfName}
        </div>

        <div
          style={{
            display: 'flex',
            color: '#d1d5db',
            fontSize: 22,
            lineHeight: 1.45,
            maxWidth: '1040px',
          }}
        >
          {writeup.description.length > 200
            ? writeup.description.slice(0, 197) + '...'
            : writeup.description}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 50,
            left: 80,
            right: 80,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#6b7280',
            fontSize: 20,
            paddingTop: 20,
            borderTop: '1px solid #1a1a1a',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#00b4d8' }}>&gt;</span>
            <span style={{ color: '#00ff41', fontWeight: 600 }}>
              cybersparky_
            </span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {writeup.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  display: 'flex',
                  padding: '4px 10px',
                  border: '1px solid #1f2937',
                  borderRadius: 4,
                  color: '#9ca3af',
                  fontSize: 16,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
