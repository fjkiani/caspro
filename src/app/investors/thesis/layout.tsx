import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Investment Thesis",
  description: "The CrisPRO.ai investment thesis: why metastasis prevention is the largest unsolved problem in oncology and how we capture it.",
  alternates: { canonical: "/investors/thesis" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
