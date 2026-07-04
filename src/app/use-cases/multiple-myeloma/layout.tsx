import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Use Case — Multiple Myeloma",
  description: "CrisPRO.ai applied to multiple myeloma: variant interpretation, mechanism alignment, and resistance prediction.",
  alternates: { canonical: "/use-cases/multiple-myeloma" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
