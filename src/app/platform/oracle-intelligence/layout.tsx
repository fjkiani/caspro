import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Oracle Intelligence",
  description: "Variant interpretation and clinical-intent inference: how Oracle resolves VUS noise at scale.",
  alternates: { canonical: "/platform/oracle-intelligence" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
