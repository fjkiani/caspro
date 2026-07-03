import { cookies } from 'next/headers';
import nextDynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { getTrialLedgerEntry } from '@/data/trial-ledger-registry';
import { isTrialGateAuthorized } from '@/lib/trial-gate-server';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { trialSlug: string };
}): Promise<Metadata> {
  const entry = getTrialLedgerEntry(params.trialSlug);
  const title = entry?.label ?? params.trialSlug.replace(/-/g, ' ');
  return {
    title: `${title} — Ledger Receipt`,
    description: `Immutable trial-receipt ledger entry for ${title} on the CrisPRO.ai platform.`,
    alternates: { canonical: `/ledger/${params.trialSlug}` },
    robots: { index: false, follow: true },
  };
}

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

export default async function LedgerTrialPage({ params }: Props) {
  const slug = params.trialSlug?.trim().toLowerCase();
  const entry = getTrialLedgerEntry(slug);
  if (!entry) notFound();

  const gateAuthorized = await isTrialGateAuthorized(cookies(), slug);

  return <TrialLedgerReceiptPage slug={slug} gateAuthorized={gateAuthorized} />;
}
