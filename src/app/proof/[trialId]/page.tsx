import { notFound } from 'next/navigation';
import { VectorFailureAnalysis } from '@/components/sections/mars/VectorFailureAnalysis';
import { TRIAL_CASE_FILES, TRIAL_IDS } from '@/data/trial-case-files';

type Props = {
  params: { trialId: string };
};

export function generateStaticParams() {
  return TRIAL_IDS.map((trialId) => ({ trialId }));
}

export default function ProofTrialPage({ params }: Props) {
  const { trialId } = params;
  if (!TRIAL_CASE_FILES[trialId]) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F] px-3 sm:px-6 pb-8 sm:pb-10 overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto">
        <VectorFailureAnalysis initialTrialId={trialId} />
      </div>
    </main>
  );
}
