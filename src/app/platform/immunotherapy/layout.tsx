import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Immunotherapy Co-Pilot: Response + IRAE Risk',
  description: 'Dual immunotherapy call — response likelihood using TMB, PD-L1, and TME context, plus an immune-related adverse event risk tier per patient.',
  alternates: { canonical: '/platform/immunotherapy' },
  openGraph: {
    title: 'Immunotherapy Co-Pilot: Response + IRAE Risk',
    description: 'Dual immunotherapy call — response likelihood using TMB, PD-L1, and TME context, plus an immune-related adverse event risk tier per patient.',
    url: 'https://crispro.ai/platform/immunotherapy',
    siteName: 'CrisPRO',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Immunotherapy Co-Pilot: Response + IRAE Risk',
    description: 'Dual immunotherapy call — response likelihood using TMB, PD-L1, and TME context, plus an immune-related adverse event risk tier per patient.',
    creator: '@crispro_ai',
    site: '@crispro_ai',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
