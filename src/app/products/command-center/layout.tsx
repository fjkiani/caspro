import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Command Center Product — CrisPRO.ai",
  description: "The operator console for the CrisPRO.ai stack: orchestrate engines, Co-Pilots, and evidence flows in one place.",
  alternates: { canonical: "/products/command-center" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
