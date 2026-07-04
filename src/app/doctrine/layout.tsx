import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Doctrine",
  description: "The four pillars of CrisPRO.ai: VUS Annihilation, Metastasis Prevention, DeSci & IP-NFTs, and Trial Conquest.",
  alternates: { canonical: "/doctrine" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
