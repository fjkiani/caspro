import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Forge Product — CrisPRO.ai",
  description: "In silico therapeutic design from CrisPRO.ai: generate, score, and align candidate molecules against mechanism.",
  alternates: { canonical: "/products/forge" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
