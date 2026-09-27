'use client';

/**
 * MBD4 WT vs trunc pair — analysis-first.
 * WT viewer isolates glycosylase domain 426–580 (pLDDT 93.9).
 * Trunc viewer auto-rotates the product that lacks that domain.
 */

import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import StructureViewer from '@/components/target-lock/structure/StructureViewer';
import {
  AK_CASE_FOLDS,
  MBD4_TRUNCATION_IMPACT,
  MBD4_WT_DOMAIN_FOCUS,
  STRUCTURE_PANE_LABELS,
  STRUCTURE_VIEWER_HEIGHT_PAIR,
} from '@/data/ak-case-structure';

export default function AkMbd4PairPane() {
  const { isDarkMode } = useTheme();
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const body = isDarkMode ? 'text-zinc-300' : 'text-slate-600';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const panel = isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-white border-slate-200';
  const main = isDarkMode ? 'text-white' : 'text-slate-900';
  const callout = isDarkMode
    ? 'border-emerald-500/30 bg-emerald-500/[0.06]'
    : 'border-emerald-600/25 bg-emerald-50';
  const impact = MBD4_TRUNCATION_IMPACT;
  const domainFocus = MBD4_WT_DOMAIN_FOCUS;

  return (
    <aside className={`rounded border p-4 space-y-4 sticky top-24 ${panel}`}>
      <div>
        <p className={`text-[9px] font-black uppercase tracking-[0.35em] mb-1 ${accent}`}>
          {STRUCTURE_PANE_LABELS.akCaseAf2} · what to look at
        </p>
        <p className={`text-lg font-black tracking-tight ${main}`}>
          MBD4
          <span className={`ml-2 text-[11px] font-bold ${muted}`}>{impact.variant}</span>
        </p>
      </div>

      {/* Analysis first — domain story, not whole-chain spaghetti */}
      <div className={`rounded border px-3 py-3 space-y-2 ${callout}`}>
        <p className={`text-[10px] font-black uppercase tracking-widest ${accent}`}>
          Look here · residues {impact.lostDomainRange}
        </p>
        <p className={`text-[12px] font-semibold leading-snug ${main}`}>
          HhH-GPD DNA-glycosylase (catalytic) · domain pLDDT {impact.lostDomainPlddt}
        </p>
        <p className={`text-[11px] leading-relaxed ${body}`}>
          Whole-chain means look soft (WT {Number(impact.wtMeanPlddt).toFixed(1)} · trunc{' '}
          {Number(impact.truncMeanPlddt).toFixed(1)}) because disordered linkers drag the average.
          The catalytic domain itself folds at {impact.lostDomainPlddt} in WT — and is physically
          gone after {impact.variant} truncates past residue {impact.divergeAfter}.
        </p>
        <ul className={`text-[11px] leading-relaxed space-y-1 ${body}`}>
          <li>
            <span className={`font-semibold ${main}`}>WT ·</span> isolate {impact.lostDomainRange}{' '}
            ({impact.residuesLost} residues of catalytic domain at pLDDT {impact.lostDomainPlddt}).
          </li>
          <li>
            <span className={`font-semibold ${main}`}>Trunc ·</span> {impact.truncLength} aa product —
            catalytic domain absent. Retained N-term CA-RMSD {impact.retainedCaRmsd} Å over{' '}
            {impact.nSuperposed} folded shared residues.
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>
            WT · domain {impact.lostDomainRange} isolated
          </p>
          <StructureViewer
            record={AK_CASE_FOLDS.MBD4_WT}
            height={STRUCTURE_VIEWER_HEIGHT_PAIR}
            autoRotate
            focus={domainFocus}
            leadPlddt={domainFocus.leadPlddt}
            leadPlddtLabel={domainFocus.leadPlddtLabel}
            suppressLowConfidenceWarning
          />
        </div>
        <div>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>
            Trunc · catalytic domain absent
          </p>
          <StructureViewer
            record={AK_CASE_FOLDS.MBD4_trunc}
            height={STRUCTURE_VIEWER_HEIGHT_PAIR}
            autoRotate
            suppressLowConfidenceWarning
          />
          <p className={`mt-2 text-[10px] leading-relaxed ${muted}`}>
            No {impact.lostDomainRange} to focus — those residues never exist in this product.
            Spin shows the truncated chain that stops at {impact.truncLength} aa.
          </p>
        </div>
      </div>

      <div
        className={`relative w-full overflow-hidden rounded border ${
          isDarkMode ? 'border-zinc-800 bg-black/40' : 'border-slate-200 bg-slate-50'
        }`}
      >
        <Image
          src={impact.figurePng}
          alt={impact.figureAlt}
          width={1200}
          height={720}
          className="h-auto w-full"
        />
      </div>

      <p className={`text-[11px] leading-relaxed ${body}`}>{impact.interpretation}</p>
      <p className={`text-[10px] leading-relaxed ${muted}`}>{impact.caveat}</p>
    </aside>
  );
}
