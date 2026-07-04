import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Immunotherapy Matching — CrisPRO.ai Platform Capability';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background:
            'linear-gradient(135deg, #030014 0%, #06001f 40%, #0a0525 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background:
                'linear-gradient(135deg, #22d3ee 0%, #8b5cf6 60%, #ec4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              fontWeight: 700,
              color: '#050014',
            }}
          >
            C
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>
              CrisPRO.ai
            </div>
            <div style={{ fontSize: 15, color: '#94a3b8', marginTop: 2 }}>
              Platform Capability
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.02,
              maxWidth: 1000,
              background:
                'linear-gradient(90deg, #ffffff 0%, #a5b4fc 55%, #22d3ee 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Immunotherapy Matching
          </div>
          <div style={{ fontSize: 30, color: '#cbd5e1', maxWidth: 960, lineHeight: 1.2 }}>
            Eligibility & response prediction
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 20, color: '#22d3ee', fontWeight: 600 }}>
            Oracle · Forge · Scribe
          </div>
          <div style={{ fontSize: 20, color: '#94a3b8' }}>crispro.ai/platform/immunotherapy</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
