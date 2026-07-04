import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Universal Demo",
  description: "Universal Demo on the CrisPRO.ai platform — AI-powered metastasis prevention and oncology Co-Pilot.",
  alternates: { canonical: "/learn/universal-demo" },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
