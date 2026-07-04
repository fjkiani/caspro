import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    absolute:
      'Glossary: Variant Interpretation & Precision Oncology | CrisPRO.ai',
  },
  description:
    'CrisPRO glossary for variant interpretation, mechanism alignment, and precision oncology — with linked evidence and cross-references to Oracle capabilities.',
  alternates: { canonical: '/glossary' },
  openGraph: {
    title:
      'Glossary: Variant Interpretation & Precision Oncology | CrisPRO.ai',
    description:
      'CrisPRO glossary for variant interpretation, mechanism alignment, and precision oncology.',
    url: 'https://crispro.ai/glossary',
    siteName: 'CrisPRO',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glossary: Variant Interpretation & Precision Oncology',
    description:
      'CrisPRO glossary for variant interpretation, mechanism alignment, and precision oncology.',
    creator: '@crispro_ai',
    site: '@crispro_ai',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
