import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Knowledge Graph",
  description: "The CrisPRO.ai biomedical knowledge graph that links variants, mechanisms, drugs, and clinical outcomes.",
  alternates: { canonical: "/knowledge-graph" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
