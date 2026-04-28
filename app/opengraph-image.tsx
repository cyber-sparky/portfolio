import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'cybersparky_ — Security Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
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
            'radial-gradient(circle at 25% 25%, rgba(0, 255, 65, 0.08) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(0, 180, 216, 0.06) 0%, transparent 50%)',
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
          whoami
        </div>

        <div
          style={{
            display: 'flex',
            color: '#ffffff',
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: 16,
          }}
        >
          cybersparky_
        </div>

        <div
          style={{
            display: 'flex',
            color: '#00ff41',
            fontSize: 44,
            fontWeight: 600,
            marginBottom: 32,
          }}
        >
          Security Engineer
        </div>

        <div
          style={{
            display: 'flex',
            color: '#9ca3af',
            fontSize: 28,
            maxWidth: '900px',
            lineHeight: 1.4,
          }}
        >
          Application Security · DevSecOps · SAST/SCA · CI/CD Hardening
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            bottom: 60,
            left: 80,
            color: '#6b7280',
            fontSize: 24,
          }}
        >
          <span style={{ color: '#00b4d8', marginRight: 8 }}>&gt;</span>
          cybersparky.in
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 80,
            display: 'flex',
            gap: 12,
          }}
        >
          {['AppSec', 'DevSecOps', 'CTF'].map((tag) => (
            <div
              key={tag}
              style={{
                display: 'flex',
                padding: '8px 16px',
                border: '1px solid rgba(0, 255, 65, 0.3)',
                borderRadius: 8,
                color: '#00ff41',
                fontSize: 20,
                background: 'rgba(0, 255, 65, 0.05)',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
