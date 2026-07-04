import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Genome Editing",
  description: "Genome editing intelligence: CRISPR guide design, off-target analysis, and editing outcome prediction with CrisPRO.ai.",
  alternates: { canonical: "/genome-editing" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
