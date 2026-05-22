import nextDynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { getTrialLedgerEntry } from '@/data/trial-ledger-registry';

/** Recharts + heavy charts must not load on the server for this route (avoids missing vendor-chunks/recharts.js). */
const TrialLedgerReceiptPage = nextDynamic(
  () => import('@/components/ledger/TrialLedgerReceiptPage'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-[#020408] text-zinc-500 flex items-center justify-center font-mono text-xs uppercase tracking-widest">
        Loading receipt…
      </div>
    ),
  },
);

type Props = { params: { trialSlug: string } };

export const dynamic = 'force-dynamic';

export default function LedgerTrialPage({ params }: Props) {
  const slug = params.trialSlug?.trim().toLowerCase();
  const entry = getTrialLedgerEntry(slug);
  if (!entry) notFound();

  return <TrialLedgerReceiptPage slug={slug} />;
}
