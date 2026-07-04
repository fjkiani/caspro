import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Market Landscape",
  description: "The precision-oncology competitive landscape and where CrisPRO.ai fits.",
  alternates: { canonical: "/investors/market-landscape" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
