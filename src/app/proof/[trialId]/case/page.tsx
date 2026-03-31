import { notFound } from 'next/navigation';
import TrialDeRiskMap from '@/components/mockups/latify';
import { TRIAL_CASE_FILES, TRIAL_IDS } from '@/data/trial-case-files';

type Props = {
  params: { trialId: string };
};

export function generateStaticParams() {
  return TRIAL_IDS.map((trialId) => ({ trialId }));
}

export default function ProofFullCasePage({ params }: Props) {
  const { trialId } = params;
  if (!TRIAL_CASE_FILES[trialId]) {
    notFound();
  }

  return <TrialDeRiskMap initialTrialId={trialId} />;
}
