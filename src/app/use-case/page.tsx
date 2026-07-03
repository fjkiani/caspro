import { permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Use Case",
  description: "Use Case on the CrisPRO.ai platform — AI-powered metastasis prevention and oncology Co-Pilot.",
  alternates: { canonical: "/use-case" },
  robots: { index: false, follow: false },
};


/** @deprecated Use `/manuscripts/` */
export default function UseCaseListRedirect() {
  permanentRedirect('/manuscripts/');
}
