import type { Metadata } from 'next';
import Link from 'next/link';
import { listPatientCards } from '@/data/patients/registry';

export const metadata: Metadata = {
  title: 'Tumor board · CrisPRO',
  description:
    'Patient picker for the CrisPRO tumor-board demo. Pick a patient bundle (AK / OV / BR / CRC / BM) to render the six-tab clinical surface with per-tumor bench coverage.',
};

/**
 * Landing page for /tumor-board — patient picker grid. Clicking a card takes
 * you to /tumor-board/<patientId>/ which renders the full surface against
 * that patient's bundle via PatientProvider.
 */
export default function TumorBoardPage() {
  const cards = listPatientCards();
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-8 py-16">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.24em] text-white/40">Tumor board · patient picker</p>
          <h1 className="mt-2 text-3xl font-semibold">Pick a demo patient</h1>
          <p className="mt-3 max-w-3xl text-sm text-white/60">
            Five hand-authored demo bundles across ovarian, breast, colon, and brain-met.
            Each one renders the six-tab tumor-board surface against its own mutations,
            SL axes, and evidence anchors. Coverage badge shows how many archetypes of
            that tumor type the CrisPRO backend has actually been benched on — read it
            as calibration, not marketing.
          </p>
          <p className="mt-2 text-xs text-white/40">
            Every bundle is rehearsal substrate, not a real clinical case. Numbers are
            grounded either in the pan-cancer sweep JSON or in published sources cited
            per-bundle.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => {
            const discovery = c.discoveryOnly;
            const badgeCls = discovery
              ? 'border-amber-500/40 bg-amber-500/10 text-amber-200'
              : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200';
            return (
              <Link
                key={c.patientId}
                href={`/tumor-board/${c.patientId}`}
                className="group flex flex-col justify-between rounded-lg border border-white/10 bg-white/[0.02] p-5 transition hover:border-cyan-500/40 hover:bg-white/[0.04]"
              >
                <div>
                  <div className="mb-3 flex items-baseline justify-between gap-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-white/50">
                      {c.patientId}
                    </span>
                    <span className={`rounded border px-2 py-0.5 text-[10px] uppercase tracking-widest ${badgeCls}`}>
                      {discovery ? 'discovery only' : `${c.nArchetypes} archetypes`}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-white group-hover:text-cyan-300">
                    {c.displayName}
                  </h2>
                  <p className="mt-1 text-sm text-white/60">{c.tumorSubtype}</p>
                  <p className="mt-3 text-xs text-white/50">
                    <span className="uppercase tracking-widest text-white/30">Drivers:</span>{' '}
                    {c.drivers.join(' · ')}
                  </p>
                  <p className="mt-1 text-xs text-white/50">
                    <span className="uppercase tracking-widest text-white/30">Primary SL:</span>{' '}
                    {c.primarySL}
                  </p>
                </div>
                {discovery ? (
                  <p className="mt-4 text-[11px] text-amber-300/90">
                    ⚠ Zero archetypes benched for this tumor type. Recommendations are
                    hypothesis, not benchmark.
                  </p>
                ) : (
                  <p className="mt-4 text-[11px] text-white/40">
                    Pan-cancer bench: top-1 {(c.top1 * 100).toFixed(1)}% · recall@3{' '}
                    {(c.recallAt3 * 100).toFixed(1)}%
                  </p>
                )}
              </Link>
            );
          })}
        </div>

        <p className="mt-10 font-mono text-[10px] text-white/25">
          Substrate: src/data/patients/{'{'}AK01,OV01,BR01,CRC01,BM01{'}'}.ts · registry:
          src/data/patients/registry.ts · bench: /mnt/results/spe_audit/w4_pancancer_grid.json
        </p>
      </div>
    </main>
  );
}


