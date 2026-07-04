import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'AgenticEMR: Structured Intelligence On Top Of Any Chart',
  description: 'Turn unstructured clinical notes, pathology reports, and genomic PDFs into a queryable, longitudinal patient record that your entire care team can act on.',
  alternates: { canonical: '/platform/agentic-emr' },
  openGraph: {
    title: 'AgenticEMR: Structured Intelligence On Top Of Any Chart',
    description: 'Turn unstructured clinical notes, pathology reports, and genomic PDFs into a queryable, longitudinal patient record that your entire care team can act on.',
    url: 'https://crispro.ai/platform/agentic-emr',
    siteName: 'CrisPRO',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgenticEMR: Structured Intelligence On Top Of Any Chart',
    description: 'Turn unstructured clinical notes, pathology reports, and genomic PDFs into a queryable, longitudinal patient record that your entire care team can act on.',
    creator: '@crispro_ai',
    site: '@crispro_ai',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
