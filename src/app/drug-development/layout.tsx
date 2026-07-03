import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Drug Development",
  description: "How CrisPRO.ai accelerates drug development with in silico therapeutic design, mechanism alignment, and trial conquest.",
  alternates: { canonical: "/drug-development" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
