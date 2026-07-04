import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Boltz Product — CrisPRO.ai",
  description: "Binding-affinity and structure prediction from CrisPRO.ai. Production-grade Boltz-2 inference for therapeutic design.",
  alternates: { canonical: "/products/boltz" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
