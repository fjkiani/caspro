import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { PATIENT_IDS, loadPatient } from '@/data/patients/registry';
import { PatientProvider } from '@/context/PatientContext';
import TumorBoardSurface from '@/components/tumor-board/TumorBoardSurface';
import BenchCoverageCard from '@/components/tumor-board/ak/BenchCoverageCard';
import DiscoveryOnlyBanner from '@/components/tumor-board/ak/DiscoveryOnlyBanner';
import CrcAnchorEvidencePanel from '@/components/tumor-board/anchor/CrcAnchorEvidencePanel';
import BrmTargetLockPanel from '@/components/tumor-board/anchor/BrmTargetLockPanel';

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

  const hasCrcAnchor = Boolean(bundle.anchorPanels?.crc);
  const hasBrmAnchor = Boolean(bundle.anchorPanels?.brm);

  return (
    <PatientProvider bundle={bundle}>
      {bundle.discoveryOnly ? <DiscoveryOnlyBanner /> : null}
      <BenchCoverageCard />
      {/* Anchor-repo evidence panels — render only if the patient bundle
          carries the corresponding anchor block. plainSummary and
          patientRelevance appear inside each component ABOVE any table,
          per the user amendment on jargon minimization. */}
      {hasCrcAnchor ? (
        <div className="mx-auto mt-6 max-w-5xl px-6">
          <CrcAnchorEvidencePanel />
        </div>
      ) : null}
      {hasBrmAnchor ? (
        <div className="mx-auto mt-6 max-w-5xl px-6">
          <BrmTargetLockPanel />
        </div>
      ) : null}
      <TumorBoardSurface />
    </PatientProvider>
  );
}
