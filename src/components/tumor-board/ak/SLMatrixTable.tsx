'use client';

import { AK_SL_MATRIX } from '@/data/tumor-board/ak-l1-bundle';

/**
 * 6-row SL matrix. Wide table with 5 columns: axis · prod tier · sim tier ·
 * manuscript_claim_type · match indicator. Match rules mirror the walkthrough:
 *   5 rows have identical prod/sim tiers (rendered ✓)
 *   1 row (atr_wee1) is an intended tier upgrade (rendered ↑)
 */
export default function SLMatrixTable() {
  return (
    <section className="mx-auto w-full max-w-[1400px] px-8 py-10">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">SL evidence matrix · Prod vs PR#11</h2>
          <p className="mt-1 text-xs text-white/50">
            Six axes graded against clinical + CRISPR + in-vivo evidence. Every row rendered from the same JSON path so
            the change is auditable.
          </p>
        </div>
        <span className="font-mono text-[10px] text-white/30">
          synthetic_lethality.provenance.evidence_matrix.rows[]
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-white/10 bg-white/[0.02]">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-widest text-white/40">
              <th className="px-4 py-3">Axis</th>
              <th className="px-4 py-3">Prod today</th>
              <th className="px-4 py-3">Sim (post-PR#11)</th>
              <th className="px-4 py-3">manuscript_claim_type</th>
              <th className="px-4 py-3">Δ</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {AK_SL_MATRIX.map((row) => (
              <MatrixRow key={row.axis} row={row} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-white/40">
        <span>
          <span className="text-emerald-300">✓</span> match — prod and sim ship the same tier
        </span>
        <span>
          <span className="text-cyan-300">↑</span> intended upgrade — PR#11 tier fusion moves the row from fallback to
          strong-evidence branch
        </span>
        <span>
          <span className="text-rose-300">⊘</span> falsified — matrix row kept for auditability, bridge demotes from
          recommended_drugs
        </span>
      </div>
    </section>
  );
}

function MatrixRow({ row }: { row: (typeof AK_SL_MATRIX)[number] }) {
  const isUpgrade = row.divergenceIntended;
  const isFalsified = row.manuscriptClaimType === 'falsified_mechanism';
  const marker = isUpgrade ? '↑' : isFalsified ? '⊘' : '✓';
  const markerColor = isUpgrade
    ? 'text-cyan-300'
    : isFalsified
      ? 'text-rose-300'
      : 'text-emerald-300';
  return (
    <>
      <tr className="border-t border-white/5">
        <td className="px-4 py-3 font-mono text-xs text-cyan-300">{row.axis}</td>
        <td className="px-4 py-3 text-white/70">{row.prodTier}</td>
        <td className={`px-4 py-3 ${isUpgrade ? 'text-cyan-200' : 'text-white/70'}`}>{row.simTier}</td>
        <td className="px-4 py-3 font-mono text-xs text-white/50">
          {row.manuscriptClaimType ?? <span className="opacity-40">—</span>}
        </td>
        <td className={`px-4 py-3 text-lg ${markerColor}`}>{marker}</td>
      </tr>
      {row.divergenceExplanation && (
        <tr className="bg-black/40">
          <td colSpan={5} className="border-t border-white/5 px-4 py-2 text-[11px] leading-relaxed text-white/50">
            {row.divergenceExplanation}
          </td>
        </tr>
      )}
    </>
  );
}
