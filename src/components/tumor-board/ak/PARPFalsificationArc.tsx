'use client';

import { AK_PARP_FALSIFICATION } from '@/data/tumor-board/ak-l1-bundle';

/**
 * The memorable centerpiece — three stacked cards that tell the PARP arc:
 *   1) what AK's UI ships today (bug)
 *   2) what the manuscript says (falsification)
 *   3) what PR#11 fixes
 */
export default function PARPFalsificationArc() {
  const { prodShipsToday, manuscriptSays, pr11Fix } = AK_PARP_FALSIFICATION;
  return (
    <section className="mx-auto w-full max-w-[1400px] px-8 py-12">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-rose-300">User-visible bug · PR#11</div>
          <h2 className="mt-1 text-2xl font-semibold text-white">The PARP falsification arc</h2>
          <p className="mt-2 max-w-3xl text-sm text-white/60">
            Prod ships PARP inhibitors to AK as a recommended drug class. The manuscript already falsifies the
            mechanism. This is the frontend-visible reason PR#11 introduces a <span className="font-mono">manuscript_claim_type</span> enum.
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Card 1 — prod today */}
        <div className="flex flex-col rounded-lg border border-rose-400/30 bg-rose-500/[0.05] p-5">
          <div className="text-[10px] uppercase tracking-[0.24em] text-rose-300">1 · Prod ships today</div>
          <div className="mt-3 text-sm text-white/80">{prodShipsToday.drugName}</div>
          <dl className="mt-4 space-y-2 text-xs">
            <Row label="Matrix axis">{prodShipsToday.matrixAxis}</Row>
            <Row label="Tier">{prodShipsToday.tier}</Row>
            <Row label="Bridge policy">{prodShipsToday.bridgePolicy}</Row>
          </dl>
          <div className="mt-4 rounded border border-rose-400/30 bg-rose-500/[0.08] p-3 text-[11px] leading-relaxed text-rose-100/80">
            <span className="text-rose-300">Result:</span> {prodShipsToday.behavior}
          </div>
        </div>

        {/* Card 2 — manuscript */}
        <div className="flex flex-col rounded-lg border border-amber-400/30 bg-amber-500/[0.05] p-5">
          <div className="text-[10px] uppercase tracking-[0.24em] text-amber-300">2 · Manuscript says</div>
          <div className="mt-3 text-sm text-white/80">{manuscriptSays.finding}</div>
          <div className="mt-3 rounded border border-amber-400/40 bg-black/30 p-3">
            <div className="font-mono text-xs text-amber-200">{manuscriptSays.stat}</div>
            <div className="mt-1 text-[11px] leading-relaxed text-white/70">{manuscriptSays.conclusion}</div>
          </div>
          <div className="mt-4 rounded border border-white/10 bg-black/20 p-3">
            <div className="text-[10px] uppercase tracking-widest text-white/40">Positive control</div>
            <div className="mt-1 text-xs text-white/80">{manuscriptSays.positiveControl.finding}</div>
            <div className="mt-1 font-mono text-xs text-white/60">{manuscriptSays.positiveControl.stat}</div>
            <div className="mt-1 text-[11px] leading-relaxed text-white/50">{manuscriptSays.positiveControl.point}</div>
          </div>
        </div>

        {/* Card 3 — PR#11 fix */}
        <div className="flex flex-col rounded-lg border border-cyan-400/40 bg-cyan-500/[0.05] p-5">
          <div className="text-[10px] uppercase tracking-[0.24em] text-cyan-300">3 · PR#11 fixes it</div>
          <div className="mt-3 text-sm text-white/80">
            Add field <span className="font-mono text-cyan-200">{pr11Fix.field}</span> = <span className="font-mono text-cyan-200">'{pr11Fix.value}'</span>
          </div>
          <div className="mt-4 rounded border border-cyan-400/30 bg-black/30 p-3 text-[11px] leading-relaxed text-white/75">
            {pr11Fix.effect}
          </div>
          <div className="mt-4 rounded border border-white/10 bg-black/20 p-3 text-[11px] leading-relaxed text-white/55">
            {pr11Fix.rowKept}
          </div>
          <div className="mt-4 text-[10px] uppercase tracking-widest text-cyan-300/70">Additive change · non-breaking</div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-[10px] uppercase tracking-widest text-white/40">{label}</dt>
      <dd className="text-right text-white/80">{children}</dd>
    </div>
  );
}
