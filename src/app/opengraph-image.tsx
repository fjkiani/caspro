import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'CrisPRO.ai — AI-Powered Metastasis Prevention & Oncology Co-Pilot';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Default OG image for the site root. Renders CrisPRO.ai branding.
// Per-route pages may define their own opengraph-image.tsx to override.
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
        {/* Top row: logo mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 20,
              background:
                'linear-gradient(135deg, #22d3ee 0%, #8b5cf6 60%, #ec4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              fontWeight: 700,
              color: '#050014',
            }}
          >
            C
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>
              CrisPRO.ai
            </div>
            <div
              style={{
                fontSize: 18,
                color: '#94a3b8',
                marginTop: 4,
              }}
            >
              Oracle · Forge · Scribe
            </div>
          </div>
        </div>

        {/* Center block: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 960,
              background:
                'linear-gradient(90deg, #ffffff 0%, #a5b4fc 55%, #22d3ee 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            AI‑Powered Oncology Co‑Pilot
          </div>
          <div
            style={{
              fontSize: 30,
              color: '#cbd5e1',
              maxWidth: 900,
              lineHeight: 1.25,
            }}
          >
            Variant interpretation, in‑silico therapeutic design, and auditable
            clinical narratives.
          </div>
        </div>

        {/* Bottom row: proof + domain */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              fontSize: 22,
              color: '#22d3ee',
              fontWeight: 600,
            }}
          >
            ClinVar 95.7% AUROC · n=53,210
          </div>
          <div style={{ fontSize: 22, color: '#94a3b8' }}>crispro.ai</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
