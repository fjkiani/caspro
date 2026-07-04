import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Id — Detail",
  description: "Id on the CrisPRO.ai platform — AI-powered metastasis prevention and oncology Co-Pilot.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
