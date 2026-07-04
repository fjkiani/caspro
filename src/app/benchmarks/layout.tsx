import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    absolute:
      'Oracle Benchmarks: ClinVar, SpliceVarDB, BRCA1 | CrisPRO.ai',
  },
  description:
    'Public benchmark results for CrisPRO Oracle — ClinVar (95.7% AUROC, n=53,210), SpliceVarDB (82.5–82.6%, n=4,950), BRCA1 zero-shot (89.1%), plus SOTA subset numbers.',
  alternates: { canonical: '/benchmarks' },
  openGraph: {
    title:
      'Oracle Benchmarks: ClinVar, SpliceVarDB, BRCA1 | CrisPRO.ai',
    description:
      'Public benchmark results for CrisPRO Oracle — ClinVar, SpliceVarDB, BRCA1, plus SOTA subset numbers.',
    url: 'https://crispro.ai/benchmarks',
    siteName: 'CrisPRO',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Oracle Benchmarks: ClinVar, SpliceVarDB, BRCA1',
    description:
      'Public benchmark results for CrisPRO Oracle. ClinVar 95.7% AUROC (n=53,210).',
    creator: '@crispro_ai',
    site: '@crispro_ai',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
