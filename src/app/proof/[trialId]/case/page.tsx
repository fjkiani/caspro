import { cookies } from 'next/headers';
import nextDynamic from 'next/dynamic';
import { notFound, redirect } from 'next/navigation';
import { TRIAL_CASE_FILES, TRIAL_IDS } from '@/data/trial-case-files';
import { isGatedLedgerTrial } from '@/data/trial-gate';
import { isTrialGateAuthorized } from '@/lib/trial-gate-server';

/** Recharts must not SSR on this route (avoids missing vendor-chunks/recharts.js). */
const TrialDeRiskMap = nextDynamic(() => import('@/components/mockups/latify'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#020408] text-zinc-400 flex items-center justify-center font-mono text-xs uppercase tracking-widest">
      Loading case file…
    </div>
  ),
});

type Props = {
  params: { trialId: string };
};

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return TRIAL_IDS.map((trialId) => ({ trialId }));
}

export default async function ProofFullCasePage({ params }: Props) {
  const trialId = params.trialId?.trim().toLowerCase();
  if (!TRIAL_CASE_FILES[trialId]) {
    notFound();
  }

  if (isGatedLedgerTrial(trialId) && !(await isTrialGateAuthorized(cookies(), trialId))) {
    redirect(`/ledger/${trialId}/?locked=1&next=/proof/${trialId}/case/`);
  }

  return <TrialDeRiskMap initialTrialId={trialId} />;
}
