import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { PATIENT_IDS, loadPatient } from '@/data/patients/registry';
import { PatientProvider } from '@/context/PatientContext';
import TumorBoardSurface from '@/components/tumor-board/TumorBoardSurface';
import BenchCoverageCard from '@/components/tumor-board/ak/BenchCoverageCard';
import DiscoveryOnlyBanner from '@/components/tumor-board/ak/DiscoveryOnlyBanner';

// Static params so /tumor-board/[patientId] pre-renders one page per known
// patient at build time. Unknown ids fall through to notFound().
export function generateStaticParams() {
  return PATIENT_IDS.map((patientId) => ({ patientId }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ patientId: string }>;
}): Promise<Metadata> {
  const { patientId } = await params;
  const p = loadPatient(patientId);
  if (!p) return { title: 'Patient not found · Tumor Board' };
  return {
    title: `${p.meta.displayName ?? p.meta.patientId} · Tumor Board`,
    description: `CrisPRO tumor-board demo bundle for ${p.meta.displayName ?? p.meta.patientId} — ${p.tumorContext.subtype ?? p.tumorContext.cancerType}.`,
  };
}

export default async function PatientTumorBoardPage({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = await params;
  const bundle = loadPatient(patientId);
  if (!bundle) notFound();

  // Anchor panels (CRC01 Brenus / BM01 evo2-e2e) are rendered INSIDE
  // TumorBoardSurface's tab flow — under CONFIDENCE for Brenus and
  // SL AXES for evo2-e2e — not as separate above-the-fold cards.
  return (
    <PatientProvider bundle={bundle}>
      {bundle.discoveryOnly ? <DiscoveryOnlyBanner /> : null}
      <BenchCoverageCard />
      <TumorBoardSurface />
    </PatientProvider>
  );
}
