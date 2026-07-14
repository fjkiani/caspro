import { cookies } from 'next/headers';
import nextDynamic from 'next/dynamic';
import { notFound, redirect } from 'next/navigation';
import { getTrialLedgerEntry } from '@/data/trial-ledger-registry';
import { isTrialGateAuthorized } from '@/lib/trial-gate-server';

/**
 * Trial unlock route — replaces the PasscodeModal for ledger surfaces.
 * Server-checks the cookie; if already authorized, redirects straight to the
 * receipt. Otherwise renders the client-side form.
 */
const TrialUnlockForm = nextDynamic(
  () => import('@/components/ledger/TrialUnlockForm'),
  { ssr: false },
);

type Props = {
  params: { trialSlug: string };
  searchParams?: { next?: string };
};

export const dynamic = 'force-dynamic';

export default async function LedgerTrialUnlockPage({ params, searchParams }: Props) {
  const slug = params.trialSlug?.trim().toLowerCase();
  const entry = getTrialLedgerEntry(slug);
  if (!entry) notFound();

  const nextHref = searchParams?.next ?? entry.route;

  const gateAuthorized = await isTrialGateAuthorized(cookies(), slug);
  if (gateAuthorized) redirect(nextHref);

  return (
    <TrialUnlockForm
      slug={slug}
      label={entry.label}
      nextHref={nextHref}
    />
  );
}
