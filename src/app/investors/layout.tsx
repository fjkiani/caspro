import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Investors",
  description: "CrisPRO.ai investor relations: thesis, market landscape, and platform proof points.",
  alternates: { canonical: "/investors" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
