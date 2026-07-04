import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Cancer Kill Chain",
  description: "The CrisPRO.ai metastatic cancer kill chain framework: detect, lock, intercept, and verify.",
  alternates: { canonical: "/kill-chain" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
