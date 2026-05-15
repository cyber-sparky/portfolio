import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Pranaw M — Offensive Security Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#0A0A0F',
          backgroundImage:
            'linear-gradient(135deg, #0A0A0F 0%, #111118 100%)',
          fontFamily: 'monospace',
        }}
      >
        {/* Blue accent bar */}
        <div
          style={{
            width: 8,
            height: '100%',
            backgroundColor: '#0066FF',
            flexShrink: 0,
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px 80px',
            flex: 1,
          }}
        >
          {/* Name */}
          <div
            style={{
              display: 'flex',
              color: '#ffffff',
              fontSize: 48,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: 8,
            }}
          >
            Pranaw M
          </div>

          {/* Handle */}
          <div
            style={{
              display: 'flex',
              color: '#00D4AA',
              fontSize: 24,
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            CyberSparky
          </div>

          {/* Role */}
          <div
            style={{
              display: 'flex',
              color: '#6B7280',
              fontSize: 18,
              marginBottom: 40,
            }}
          >
            Offensive Security Engineer · Bug Bounty Hunter
          </div>

          {/* Bottom info row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 32,
              color: '#6B7280',
              fontSize: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#00D4AA' }}>📍</span>
              <span>Chennai, IN</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#00D4AA' }}>🛡️</span>
              <span>HackerOne: @cybersparky</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
