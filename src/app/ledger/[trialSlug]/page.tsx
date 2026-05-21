import { notFound } from 'next/navigation';
import TrialLedgerReceiptPage from '@/components/ledger/TrialLedgerReceiptPage';
import { getTrialLedgerEntry, TRIAL_LEDGER_SLUGS } from '@/data/trial-ledger-registry';

type Props = { params: { trialSlug: string } };

export function generateStaticParams() {
  return TRIAL_LEDGER_SLUGS.map((trialSlug) => ({ trialSlug }));
}

export default function LedgerTrialPage({ params }: Props) {
  const slug = params.trialSlug?.trim().toLowerCase();
  const entry = getTrialLedgerEntry(slug);
  if (!entry) notFound();

  return <TrialLedgerReceiptPage entry={entry} />;
}
