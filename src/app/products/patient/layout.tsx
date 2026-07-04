import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Patient Co-Pilot",
  description: "Patient Co-Pilot on CrisPRO.ai — patient-specific mechanism reasoning with full audit trails from raw VCF to chart-ready clinical narrative.",
  alternates: { canonical: "/products/patient" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
