import PatientComparisonClient from './PatientComparisonClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Patient Comparison View",
  description: "Side-by-side patient comparison view in the CrisPRO.ai oncology Co-Pilot.",
  alternates: { canonical: "/comparisons/patient" },
};


export default function PatientComparisonPage() {
  return <PatientComparisonClient />;
}
