import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { PATIENT_IDS, loadPatient } from '@/data/patients/registry';
import { PatientProvider } from '@/context/PatientContext';
import TumorBoardTabSurface from '@/components/tumor-board/TumorBoardTabSurface';
import DiscoveryOnlyBanner from '@/components/tumor-board/ak/DiscoveryOnlyBanner';

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
    description: `CrisPRO tumor-board workspace for ${p.meta.displayName ?? p.meta.patientId} — ${p.tumorContext.subtype ?? p.tumorContext.cancerType}.`,
  };
}

/** Canonical patient surface — tab panes only, no page scroll. */
export default async function PatientTumorBoardPage({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = await params;
  const bundle = loadPatient(patientId);
  if (!bundle) notFound();

  return (
    <PatientProvider bundle={bundle}>
      <div className="flex h-[calc(100dvh-3.5rem)] flex-col overflow-hidden">
        {bundle.discoveryOnly ? <DiscoveryOnlyBanner /> : null}
        <div className="min-h-0 flex-1 overflow-hidden">
          <TumorBoardTabSurface />
        </div>
      </div>
    </PatientProvider>
  );
}
