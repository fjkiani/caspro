import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Learning Center",
  description: "Tutorials, primers, and explainers on precision oncology, CRISPR therapeutics, and the CrisPRO.ai platform.",
  alternates: { canonical: "/learn" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
