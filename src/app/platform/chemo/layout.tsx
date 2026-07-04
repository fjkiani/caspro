import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Chemo Co-Pilot: Mechanism-Aligned Regimen Ranking',
  description: 'Rank chemotherapy regimens by mechanism alignment against the tumour, not just by NCCN keyword match — every candidate carries a Supported / Consider / Insufficient tier.',
  alternates: { canonical: '/platform/chemo' },
  openGraph: {
    title: 'Chemo Co-Pilot: Mechanism-Aligned Regimen Ranking',
    description: 'Rank chemotherapy regimens by mechanism alignment against the tumour, not just by NCCN keyword match — every candidate carries a Supported / Consider / Insufficient tier.',
    url: 'https://crispro.ai/platform/chemo',
    siteName: 'CrisPRO',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chemo Co-Pilot: Mechanism-Aligned Regimen Ranking',
    description: 'Rank chemotherapy regimens by mechanism alignment against the tumour, not just by NCCN keyword match — every candidate carries a Supported / Consider / Insufficient tier.',
    creator: '@crispro_ai',
    site: '@crispro_ai',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
