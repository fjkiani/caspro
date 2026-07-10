'use client';

import { AK_TESTS_NEEDED, AK_COMPLETENESS } from '@/data/tumor-board/ak-l1-bundle';

/**
 * Why AK's completeness ceiling is 0.55 — 4 discrete tests are missing,
 * confidence is capped at 0.60. Numeric relationship is spelled out so the
 * reviewer sees the same rule the engine uses.
 */
export default function MissingTestsPanel() {
  const compPct = Math.round(AK_COMPLETENESS.completenessScore * 100);
  const capPct = Math.round(AK_COMPLETENESS.confidenceCap * 100);
  return (
    <section className="mx-auto w-full max-w-[1400px] px-8 py-10">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Missing tests · confidence cap</h2>
          <p className="mt-1 text-xs text-white/50">
            Four tests unrecorded → completeness {compPct}% → confidence cap {capPct}%. Anchor SL still ships; cap is a
            trust ceiling, not a filter.
          </p>
        </div>
        <span className="font-mono text-[10px] text-white/30">completeness.missing_tests[] · completeness.confidence_cap</span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-amber-400/25 bg-amber-500/[0.05] p-4 md:col-span-2">
          <div className="text-[10px] uppercase tracking-widest text-amber-300">Requested next</div>
          <ul className="mt-3 space-y-2">
            {AK_TESTS_NEEDED.map((t, i) => (
              <li key={i} className="rounded border border-white/10 bg-black/25 p-3">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-sm text-white">{t.test}</span>
                  <span className="rounded border border-amber-400/40 bg-amber-500/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-amber-200">
                    unlocks
                  </span>
                </div>
                <div className="mt-1 text-xs text-white/70">{t.unlocks}</div>
                <div className="mt-1 text-[11px] text-white/50">{t.why}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
          <div className="text-[10px] uppercase tracking-widest text-white/40">Confidence ledger</div>
          <div className="mt-3">
            <div className="text-[10px] uppercase tracking-widest text-white/40">Completeness</div>
            <div className="mt-1 h-1.5 rounded bg-white/10">
              <div className="h-1.5 rounded bg-amber-400" style={{ width: `${compPct}%` }} />
            </div>
            <div className="mt-1 font-mono text-xs text-white/70">{compPct}%</div>
          </div>
          <div className="mt-4">
            <div className="text-[10px] uppercase tracking-widest text-white/40">Confidence cap</div>
            <div className="mt-1 h-1.5 rounded bg-white/10">
              <div className="h-1.5 rounded bg-cyan-400" style={{ width: `${capPct}%` }} />
            </div>
            <div className="mt-1 font-mono text-xs text-white/70">{capPct}%</div>
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-white/55">
            Rule: any drug scoring above the cap is truncated in UI to the cap. Ceralasertib at 0.85 shows as{' '}
            <span className="text-cyan-300">0.60</span> until HRD + TMB + RNA-seq land.
          </p>
        </div>
      </div>
    </section>
  );
}
