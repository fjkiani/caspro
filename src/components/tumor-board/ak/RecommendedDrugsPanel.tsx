'use client';

import { AK_RECOMMENDED_DRUGS, AK_SUGGESTED_THERAPY } from '@/data/tumor-board/ak-l1-bundle';

/**
 * 5 SL-graded drugs. Ceralasertib is the anchor (matches suggested_therapy).
 * Rucaparib carries a FALSIFIED overlay because the manuscript falsifies PARP
 * for this bundle at p=0.605 (see PARPFalsificationArc).
 */
export default function RecommendedDrugsPanel() {
  const anchorName = AK_SUGGESTED_THERAPY.value;
  return (
    <section className="mx-auto w-full max-w-[1400px] px-8 py-10">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Recommended SL drugs</h2>
          <p className="mt-1 text-xs text-white/50">
            Anchor therapy: <span className="text-cyan-300">{anchorName}</span> · 5 ranked confidences from
            the SL engine. Rucaparib is intentionally listed so the falsification arc has visible substrate.
          </p>
        </div>
        <span className="font-mono text-[10px] text-white/30">recommended_drugs[]</span>
      </div>

      <div className="grid gap-3">
        {AK_RECOMMENDED_DRUGS.map((d) => {
          const pct = Math.round(d.confidence * 100);
          const anchor = d.drugName === anchorName;
          const falsified = d.falsified === true;
          return (
            <div
              key={d.drugName}
              className={`rounded-lg border p-4 ${
                anchor
                  ? 'border-cyan-400/40 bg-cyan-500/[0.05]'
                  : falsified
                    ? 'border-rose-400/30 bg-rose-500/[0.04]'
                    : 'border-white/10 bg-white/[0.02]'
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-lg font-semibold ${anchor ? 'text-cyan-200' : 'text-white'}`}>
                      {d.drugName}
                    </span>
                    <span className="rounded border border-white/10 bg-black/40 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-white/60">
                      {d.targetPathway}
                    </span>
                    {anchor && (
                      <span className="rounded border border-cyan-400/40 bg-cyan-500/10 px-1.5 py-0.5 text-[10px] uppercase tracking-widest text-cyan-200">
                        anchor
                      </span>
                    )}
                    {falsified && (
                      <span className="rounded border border-rose-400/40 bg-rose-500/10 px-1.5 py-0.5 text-[10px] uppercase tracking-widest text-rose-200">
                        falsified · demote
                      </span>
                    )}
                  </div>
                  <div className="mt-1 font-mono text-[10px] text-white/30">{d.path}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32">
                    <div className="h-1.5 rounded bg-white/10">
                      <div
                        className={`h-1.5 rounded ${anchor ? 'bg-cyan-400' : falsified ? 'bg-rose-400' : 'bg-emerald-400'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <div className="font-mono text-sm text-white/85">{d.confidence.toFixed(2)}</div>
                </div>
              </div>
              {falsified && d.falsifiedReason && (
                <div className="mt-3 rounded border border-rose-400/25 bg-rose-500/[0.06] p-3 text-[11px] leading-relaxed text-rose-100/80">
                  {d.falsifiedReason}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
