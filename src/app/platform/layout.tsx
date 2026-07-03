import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Platform",
  description: "The CrisPRO.ai platform: Oracle, Forge, and Scribe intelligence working together as your oncology Co-Pilot.",
  alternates: { canonical: "/platform" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
