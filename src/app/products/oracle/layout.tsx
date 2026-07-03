import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Oracle",
  description: "Variant interpretation and clinical-intent inference from CrisPRO.ai. Resolve VUS noise and surface clinically actionable evidence.",
  alternates: { canonical: "/products/oracle" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
