import { cookies } from 'next/headers';
import nextDynamic from 'next/dynamic';
import { notFound, redirect } from 'next/navigation';
import { TRIAL_CASE_FILES, TRIAL_IDS } from '@/data/trial-case-files';
import { isGatedLedgerTrial } from '@/data/trial-gate';
import { isTrialGateAuthorized } from '@/lib/trial-gate-server';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { trialId: string };
}): Promise<Metadata> {
  const trialFile = TRIAL_CASE_FILES[params.trialId as keyof typeof TRIAL_CASE_FILES];
  const title = trialFile?.title ?? params.trialId.replace(/-/g, ' ').toUpperCase();
  return {
    title: `${title} — Proof`,
    description: `${title}: trial-receipt and proof package on the CrisPRO.ai platform.`,
    alternates: { canonical: `/proof/${params.trialId}` },
    robots: { index: false, follow: true },
  };
}

/** Recharts must not SSR on this route (avoids missing vendor-chunks/recharts.js). */
const VectorFailureAnalysis = nextDynamic(
  () =>
    import('@/components/sections/mars/VectorFailureAnalysis').then((m) => ({
      default: m.VectorFailureAnalysis,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[50vh] flex items-center justify-center font-mono text-xs uppercase tracking-widest text-zinc-500">
        Loading vector analysis…
      </div>
    ),
  },
);

type Props = {
  params: { trialId: string };
};

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return TRIAL_IDS.map((trialId) => ({ trialId }));
}

export default async function ProofTrialPage({ params }: Props) {
  const trialId = params.trialId?.trim().toLowerCase();
  if (!TRIAL_CASE_FILES[trialId]) {
    notFound();
  }

  if (isGatedLedgerTrial(trialId) && !(await isTrialGateAuthorized(cookies(), trialId))) {
    redirect(`/ledger/${trialId}/?locked=1&next=/proof/${trialId}/`);
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F] px-3 sm:px-6 pb-8 sm:pb-10 overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto">
        <VectorFailureAnalysis initialTrialId={trialId} />
      </div>
    </main>
  );
}
