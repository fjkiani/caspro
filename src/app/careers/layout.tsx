import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles at CrisPRO.ai. Join the team building the world's first AI-powered metastasis prevention platform.",
  alternates: { canonical: "/careers" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
