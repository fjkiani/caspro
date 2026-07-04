import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Toxicity Risk: PGx + Comorbidity Scoring',
  description: 'Pharmacogenomic + comorbidity + prior-adverse-event risk scoring per regimen — a hard-filter input that rewrites the ranking before it reaches the clinician.',
  alternates: { canonical: '/platform/toxicity-risk' },
  openGraph: {
    title: 'Toxicity Risk: PGx + Comorbidity Scoring',
    description: 'Pharmacogenomic + comorbidity + prior-adverse-event risk scoring per regimen — a hard-filter input that rewrites the ranking before it reaches the clinician.',
    url: 'https://crispro.ai/platform/toxicity-risk',
    siteName: 'CrisPRO',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toxicity Risk: PGx + Comorbidity Scoring',
    description: 'Pharmacogenomic + comorbidity + prior-adverse-event risk scoring per regimen — a hard-filter input that rewrites the ranking before it reaches the clinician.',
    creator: '@crispro_ai',
    site: '@crispro_ai',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
