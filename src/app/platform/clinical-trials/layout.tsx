import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Clinical Trials: Match Patients To Trials By Biology',
  description: 'Match patients to clinical trials by mechanism and residual dependency, not by keyword — a shortlist of 5–12 real candidates instead of 50+ keyword hits.',
  alternates: { canonical: '/platform/clinical-trials' },
  openGraph: {
    title: 'Clinical Trials: Match Patients To Trials By Biology',
    description: 'Match patients to clinical trials by mechanism and residual dependency, not by keyword — a shortlist of 5–12 real candidates instead of 50+ keyword hits.',
    url: 'https://crispro.ai/platform/clinical-trials',
    siteName: 'CrisPRO',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clinical Trials: Match Patients To Trials By Biology',
    description: 'Match patients to clinical trials by mechanism and residual dependency, not by keyword — a shortlist of 5–12 real candidates instead of 50+ keyword hits.',
    creator: '@crispro_ai',
    site: '@crispro_ai',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
