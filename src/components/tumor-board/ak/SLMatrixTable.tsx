'use client';

/**
 * 6-row SL matrix. Wide table with 5 columns: axis · prod tier · sim tier ·
 * manuscript_claim_type · match indicator. Match rules mirror the walkthrough:
 *   5 rows have identical prod/sim tiers (rendered ✓)
 *   1 row (atr_wee1) is an intended tier upgrade (rendered ↑)
 *
 * Theme-aware (dark: white/cyan/emerald/rose; light: zinc/indigo/emerald/rose)
 * Mobile-safe (px-4 md:px-8, table already overflow-x-auto).
 */
import { usePatient } from '@/context/PatientContext';
import { useTheme } from '@/context/ThemeContext';
import type { SLAxisRow } from '@/data/tumor-board/patient-bundle-types';

export default function SLMatrixTable() {
  const patient = usePatient();
  const { isDarkMode } = useTheme();

  const heading   = isDarkMode ? 'text-white' : 'text-zinc-900';
  const sub       = isDarkMode ? 'text-white/50' : 'text-zinc-600';
  const pathTag   = isDarkMode ? 'text-white/30' : 'text-zinc-400';
  const wrap      = isDarkMode
    ? 'border-white/10 bg-white/[0.02]'
    : 'border-zinc-200 bg-white';
  const thead     = isDarkMode ? 'text-white/40' : 'text-zinc-500';
  const legend    = isDarkMode ? 'text-white/40' : 'text-zinc-500';
  const okColor   = isDarkMode ? 'text-emerald-300' : 'text-emerald-700';
  const upColor   = isDarkMode ? 'text-cyan-300' : 'text-indigo-600';
  const noColor   = isDarkMode ? 'text-rose-300' : 'text-rose-600';

  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-8 md:py-10">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h2 className={`text-lg font-semibold ${heading}`}>
            SL evidence matrix · Prod vs PR#11
          </h2>
          <p className={`mt-1 text-xs ${sub}`}>
            Six axes graded against clinical + CRISPR + in-vivo evidence. Every row rendered
            from the same JSON path so the change is auditable.
          </p>
        </div>
        <span className={`font-mono text-[10px] ${pathTag}`}>
          synthetic_lethality.provenance.evidence_matrix.rows[]
        </span>
      </div>

      <div className={`overflow-x-auto rounded-lg border ${wrap}`}>
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className={`text-left text-[10px] uppercase tracking-widest ${thead}`}>
              <th className="px-4 py-3">Axis</th>
              <th className="px-4 py-3">Prod today</th>
              <th className="px-4 py-3">Sim (post-PR#11)</th>
              <th className="px-4 py-3">manuscript_claim_type</th>
              <th className="px-4 py-3">Δ</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {patient.slMatrix.map((row) => (
              <MatrixRow key={row.axis} row={row} isDarkMode={isDarkMode} />
            ))}
          </tbody>
        </table>
      </div>

      <div className={`mt-3 flex flex-wrap gap-4 text-[11px] ${legend}`}>
        <span>
          <span className={okColor}>✓</span> match — prod and sim ship the same tier
        </span>
        <span>
          <span className={upColor}>↑</span> intended upgrade — PR#11 tier fusion moves the row
          from fallback to strong-evidence branch
        </span>
        <span>
          <span className={noColor}>⊘</span> falsified — matrix row kept for auditability,
          bridge demotes from recommended_drugs
        </span>
      </div>
    </section>
  );
}

function MatrixRow({
  row,
  isDarkMode,
}: {
  row: SLAxisRow;
  isDarkMode: boolean;
}) {
  const isUpgrade = row.divergenceIntended;
  const isFalsified = row.manuscriptClaimType === 'falsified_mechanism';
  const marker = isUpgrade ? '↑' : isFalsified ? '⊘' : '✓';
  const markerColor = isUpgrade
    ? isDarkMode ? 'text-cyan-300' : 'text-indigo-600'
    : isFalsified
      ? isDarkMode ? 'text-rose-300' : 'text-rose-600'
      : isDarkMode ? 'text-emerald-300' : 'text-emerald-700';

  const rowBorder = isDarkMode ? 'border-white/5' : 'border-zinc-100';
  const axisMono  = isDarkMode ? 'text-cyan-300' : 'text-indigo-700';
  const cellText  = isDarkMode ? 'text-white/70' : 'text-zinc-700';
  const upgradeCell = isDarkMode ? 'text-cyan-200' : 'text-indigo-600';
  const claimTag  = isDarkMode ? 'text-white/50' : 'text-zinc-500';
  const divRow    = isDarkMode ? 'bg-black/40' : 'bg-zinc-50';
  const divText   = isDarkMode ? 'text-white/50' : 'text-zinc-600';

  return (
    <>
      <tr className={`border-t ${rowBorder}`}>
        <td className={`px-4 py-3 font-mono text-xs ${axisMono}`}>{row.axis}</td>
        <td className={`px-4 py-3 ${cellText}`}>{row.prodTier}</td>
        <td className={`px-4 py-3 ${isUpgrade ? upgradeCell : cellText}`}>{row.simTier}</td>
        <td className={`px-4 py-3 font-mono text-xs ${claimTag}`}>
          {row.manuscriptClaimType ?? <span className="opacity-40">—</span>}
        </td>
        <td className={`px-4 py-3 text-lg ${markerColor}`}>{marker}</td>
      </tr>
      {row.divergenceExplanation && (
        <tr className={divRow}>
          <td
            colSpan={5}
            className={`border-t ${rowBorder} px-4 py-2 text-[11px] leading-relaxed ${divText}`}
          >
            {row.divergenceExplanation}
          </td>
        </tr>
      )}
    </>
  );
}
