import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Target Validation",
  description: "Target Validation on the CrisPRO.ai platform — AI-powered metastasis prevention and oncology Co-Pilot.",
  alternates: { canonical: "/target-validation" },
  robots: { index: false, follow: false },
};


/** @deprecated Trial ledger hub — was a mistaken category URL. */
export default function TargetValidationRedirect() {
  redirect('/ledger/');
}
