import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Scribe Intelligence",
  description: "Scribe turns evidence into clinical narratives — auditable, citable, and ready for the chart.",
  alternates: { canonical: "/platform/scribe-intelligence" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
