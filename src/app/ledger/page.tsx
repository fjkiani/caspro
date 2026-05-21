import Link from 'next/link';
import { Metadata } from 'next';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import { TRIAL_LEDGER_ENTRIES } from '@/data/trial-ledger-registry';

export const metadata: Metadata = {
  title: 'Trial Ledger | CrisPRO.ai',
  description: 'Decoded clinical trials with receipt-locked 8D mechanism vectors and de-risking context.',
};

export default function LedgerIndexPage() {
  return (
    <div className="min-h-screen bg-[#020408] text-zinc-100 font-mono">
      <ZetaNavbar />
      <main className="max-w-5xl mx-auto px-4 pt-24 pb-16">
        <h1 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Trial ledger</h1>
        <p className="text-sm text-zinc-400 mb-10 max-w-2xl">
          Clinical trials we have decoded — each entry links to a receipt view and the full 8D vector de-risking map.
          Content is sourced locally today and will sync from Hygraph <code className="text-cyan-400">TrialLedger</code>.
        </p>
        <ul className="space-y-3">
          {TRIAL_LEDGER_ENTRIES.map((entry) => (
            <li key={entry.slug}>
              <Link
                href={entry.route}
                className="block rounded-lg border border-zinc-800 bg-zinc-950/80 px-5 py-4 hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-sm font-black uppercase tracking-wide text-white">
                    {entry.label} // {entry.sublabel}
                  </span>
                  <span className="text-[10px] text-zinc-500">{entry.trialId}</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{entry.drugLine}</p>
                {entry.legacyRoutes.length > 0 && (
                  <p className="text-[10px] text-zinc-600 mt-2">
                    Legacy: {entry.legacyRoutes.join(', ')}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
