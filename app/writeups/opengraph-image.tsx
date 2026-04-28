import { ImageResponse } from 'next/og';
import { writeups } from '@/app/data/writeups';

export const runtime = 'edge';
export const alt = 'Blog — Security Writeups & Research by cybersparky_';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function BlogOGImage() {
  const recent = writeups.slice(0, 4);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage:
            'radial-gradient(circle at 80% 20%, rgba(0, 255, 65, 0.08) 0%, transparent 50%)',
          padding: '80px',
          fontFamily: 'monospace',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#00ff41',
            fontSize: 28,
            marginBottom: 24,
          }}
        >
          <span style={{ color: '#00b4d8', marginRight: 12 }}>$</span>
          ls ~/blog/
        </div>

        <div
          style={{
            display: 'flex',
            color: '#ffffff',
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: 12,
          }}
        >
          Security Blog
        </div>

        <div
          style={{
            display: 'flex',
            color: '#9ca3af',
            fontSize: 26,
            marginBottom: 40,
          }}
        >
          CTF writeups · mobile security · web exploitation · research
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            width: '100%',
          }}
        >
          {recent.map((w, i) => (
            <div
              key={w.slug}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                color: '#d1d5db',
                fontSize: 22,
              }}
            >
              <span style={{ color: 'rgba(0, 255, 65, 0.4)', width: 40 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                style={{
                  display: 'flex',
                  padding: '4px 12px',
                  border: '1px solid rgba(0, 255, 65, 0.3)',
                  borderRadius: 6,
                  color: '#00ff41',
                  fontSize: 16,
                  background: 'rgba(0, 255, 65, 0.05)',
                }}
              >
                {w.category}
              </span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>
                {w.title}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            bottom: 60,
            left: 80,
            color: '#6b7280',
            fontSize: 22,
          }}
        >
          <span style={{ color: '#00b4d8', marginRight: 8 }}>&gt;</span>
          blog.cybersparky.in
        </div>
      </div>
    ),
    { ...size }
  );
}
