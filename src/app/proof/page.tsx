import Link from 'next/link';
import { TRIAL_CASE_FILES, TRIAL_IDS } from '@/data/trial-case-files';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Proof Ledger",
  description: "Immutable trial-receipt ledger for CrisPRO.ai predictions and trial outcomes.",
  alternates: { canonical: "/proof" },
};


export default function ProofIndexPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black tracking-tight mb-3">Trial Receipts</h1>
        <p className="text-zinc-400 mb-10">
          Open any proof case to inspect vector-space failure analysis.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TRIAL_IDS.map((trialId) => {
            const trial = TRIAL_CASE_FILES[trialId];
            if (!trial) return null;

            return (
              <Link
                key={trialId}
                href={`/proof/${trialId}/case/`}
                className="rounded border border-zinc-800 bg-zinc-950/40 p-5 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-colors"
              >
                <div className="text-[11px] uppercase tracking-[0.2em] text-cyan-400/80 mb-1">
                  {trial.trialId}
                </div>
                <div className="text-lg font-black mb-2">{trial.id.toUpperCase()}</div>
                <div className="text-sm text-zinc-400">{trial.drug}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
