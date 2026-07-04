import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Performance Metrics",
  description: "Benchmarks for CrisPRO.ai across BRCA, SNV, VUS, and generative AI evaluations.",
  alternates: { canonical: "/metrics" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
