import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Therapy Fit: Cross-Class Regimen Ranking',
  description: 'Rank chemotherapy, targeted therapy, immunotherapy, and open trials side-by-side — one ranked list with per-option evidence tier and mechanism alignment score.',
  alternates: { canonical: '/platform/therapy-fit' },
  openGraph: {
    title: 'Therapy Fit: Cross-Class Regimen Ranking',
    description: 'Rank chemotherapy, targeted therapy, immunotherapy, and open trials side-by-side — one ranked list with per-option evidence tier and mechanism alignment score.',
    url: 'https://crispro.ai/platform/therapy-fit',
    siteName: 'CrisPRO',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Therapy Fit: Cross-Class Regimen Ranking',
    description: 'Rank chemotherapy, targeted therapy, immunotherapy, and open trials side-by-side — one ranked list with per-option evidence tier and mechanism alignment score.',
    creator: '@crispro_ai',
    site: '@crispro_ai',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
