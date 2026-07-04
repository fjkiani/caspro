import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Pathway Alignment: The Mechanism Substrate',
  description: 'The curated pathway graph that lets Oracle project a variant onto the residual dependency it participates in — the substrate under every downstream Co-Pilot.',
  alternates: { canonical: '/platform/pathway' },
  openGraph: {
    title: 'Pathway Alignment: The Mechanism Substrate',
    description: 'The curated pathway graph that lets Oracle project a variant onto the residual dependency it participates in — the substrate under every downstream Co-Pilot.',
    url: 'https://crispro.ai/platform/pathway',
    siteName: 'CrisPRO',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pathway Alignment: The Mechanism Substrate',
    description: 'The curated pathway graph that lets Oracle project a variant onto the residual dependency it participates in — the substrate under every downstream Co-Pilot.',
    creator: '@crispro_ai',
    site: '@crispro_ai',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
