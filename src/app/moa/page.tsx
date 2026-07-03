import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Moa",
  description: "Moa on the CrisPRO.ai platform — AI-powered metastasis prevention and oncology Co-Pilot.",
  alternates: { canonical: "/moa" },
  robots: { index: false, follow: false },
};


/** @deprecated Trial ledger hub — was a mistaken category URL. */
export default function MoaRedirect() {
  redirect('/ledger/');
}
