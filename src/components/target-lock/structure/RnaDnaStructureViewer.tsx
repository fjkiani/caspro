'use client';

/**
 * RnaDnaStructureViewer
 * ---------------------
 * Cohort-B parallel to StructureViewer.tsx. Renders an AF3 3-chain
 * guide:target complex (RNA guide + 60-bp target dsDNA) using the same
 * headless MolstarCanvas.
 *
 * Data source: src/data/af3-guide-manifest.json (15 guides).
 * .cif assets: /artifacts/structural_validation/<guide_id>.cif
 *
 * Design vs. protein viewer:
 *   - Uses RNA-DNA doctrine (pLDDT ≥ 50, iPTM ≥ 0.30) via
 *     <RnaVsProteinDoctrineBadge cohort="rna-dna" /> — do NOT reuse the
 *     protein plddt-band coloring; that is a category error for this cohort.
 *   - Shows iPTM chip alongside pLDDT chip because iPTM is the informative
 *     score for an interface, not per-residue confidence.
 *   - Renders the 3×3 chain_pair_iptm matrix under the viewer to show the
 *     decomposition (dsDNA duplex ≈ 0.44, RNA-DNA R-loop ≈ 0.20–0.23).
 *
 * Note on chain coloring:
 *   The default MolstarCanvas 'auto' preset applies chain-id coloring
 *   (green/orange/blue by chain-id in the .cif). No custom color spec is
 *   passed through this wrapper — see the chain legend under the canvas
 *   for the phylo-palette mapping we adopt as convention.
 */

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import manifest from '@/data/af3-guide-manifest.json';
import RnaVsProteinDoctrineBadge from './RnaVsProteinDoctrineBadge';

const MolstarCanvas = dynamic(() => import('./MolstarCanvas'), {
  ssr: false,
  loading: () => (
    <div
      className="flex items-center justify-center rounded-md border border-neutral-800 bg-black text-[11px] uppercase tracking-widest text-neutral-500"
      style={{ height: 320 }}
    >
      Loading viewer…
    </div>
  ),
});

interface Props {
  guideId: string;
  height?: number;
}

interface GuideRecord {
  guide_id: string;
  step: string;
  gene: string;
  plddt: number;
  iptm: number;
  fraction_disordered: number;
  has_clash: number;
  ranking_score: number;
  structural_confidence: number;
  chain_iptm: number[];
  chain_pair_iptm: number[][];
  chain_ptm: number[];
  ptm: number;
  cif_path: string;
  rna_dna_verdict: string;
}

// ============================================================================
// pLDDT band — RNA-DNA doctrine floor is 50, not 70 (protein floor).
// ============================================================================

function rnaDnaPlddtBand(p: number): { label: string; className: string } {
  if (p >= 70) return { label: `pLDDT ${p.toFixed(1)} · high`,        className: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40' };
  if (p >= 50) return { label: `pLDDT ${p.toFixed(1)} · doctrine`,    className: 'bg-[#75A025]/15 text-[#75A025] border border-[#75A025]/40' };
  return         { label: `pLDDT ${p.toFixed(1)} · below floor`,      className: 'bg-red-500/15 text-red-300 border border-red-500/40' };
}

function rnaDnaIptmBand(i: number): { label: string; className: string } {
  if (i >= 0.50) return { label: `iPTM ${i.toFixed(2)} · high`,       className: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40' };
  if (i >= 0.30) return { label: `iPTM ${i.toFixed(2)} · doctrine`,   className: 'bg-[#75A025]/15 text-[#75A025] border border-[#75A025]/40' };
  return           { label: `iPTM ${i.toFixed(2)} · below floor`,     className: 'bg-red-500/15 text-red-300 border border-red-500/40' };
}

// ============================================================================
// Component
// ============================================================================

export default function RnaDnaStructureViewer({ guideId, height = 320 }: Props) {
  const record = useMemo<GuideRecord | null>(() => {
    const guides = (manifest as any).guides as Record<string, GuideRecord>;
    return guides?.[guideId] ?? null;
  }, [guideId]);

  if (!record) {
    return (
      <div className="rounded-md border border-neutral-800 bg-black/50 p-4 text-[11px] text-neutral-500">
        No AF3 guide record for <span className="font-mono">{guideId}</span>.
      </div>
    );
  }

  const plddtBand = rnaDnaPlddtBand(record.plddt);
  const iptmBand = rnaDnaIptmBand(record.iptm);

  return (
    <div className="flex flex-col gap-3">
      {/* Doctrine badge */}
      <RnaVsProteinDoctrineBadge cohort="rna-dna" />

      {/* Header chips */}
      <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-widest">
        <span className="rounded bg-neutral-800 px-2 py-1 font-mono text-neutral-100">{record.gene}</span>
        <span className="rounded border border-neutral-700 px-2 py-1 font-mono text-neutral-400">
          {record.step}
        </span>
        <span className={`rounded px-2 py-1 font-mono ${plddtBand.className}`}>{plddtBand.label}</span>
        <span className={`rounded px-2 py-1 font-mono ${iptmBand.className}`}>{iptmBand.label}</span>
        <span className="rounded border border-neutral-800 px-2 py-1 font-mono text-neutral-500 tabular-nums">
          composite {record.structural_confidence.toFixed(3)}
        </span>
        <span className="rounded border border-[#75A025]/40 bg-[#75A025]/10 text-[#75A025] px-2 py-1 font-mono">
          {record.rna_dna_verdict}
        </span>
      </div>

      {/* Canvas */}
      <MolstarCanvas modelPath={record.cif_path} format="mmcif" height={height} />

      {/* Chain legend */}
      <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-widest text-neutral-500 font-mono">
        <span className="opacity-70">chain legend</span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#75A025' }} />
          A · guide RNA · 96-nt
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#FF9400' }} />
          B · target DNA strand 1 · 60-bp
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#0279EE' }} />
          C · target DNA strand 2 · 60-bp
        </span>
      </div>

      {/* chain_pair_iptm heatmap */}
      <div className="grid gap-1.5">
        <div className="text-[10px] uppercase tracking-widest text-neutral-500">chain_pair_iptm</div>
        <div className="inline-block">
          <table className="text-xs tabular-nums">
            <thead>
              <tr>
                <th></th>
                <th className="px-3 py-1 text-right font-normal text-neutral-500 uppercase tracking-widest">A (RNA)</th>
                <th className="px-3 py-1 text-right font-normal text-neutral-500 uppercase tracking-widest">B (DNA1)</th>
                <th className="px-3 py-1 text-right font-normal text-neutral-500 uppercase tracking-widest">C (DNA2)</th>
              </tr>
            </thead>
            <tbody>
              {['A (RNA)', 'B (DNA1)', 'C (DNA2)'].map((label, i) => (
                <tr key={label}>
                  <td className="px-3 py-1 text-left uppercase tracking-widest text-neutral-500">{label}</td>
                  {record.chain_pair_iptm[i].map((v, j) => (
                    <td
                      key={j}
                      className={`px-3 py-1 text-right ${
                        v >= 0.4
                          ? 'text-[#75A025] font-bold'
                          : v >= 0.2
                            ? 'text-[#E9ED4C]'
                            : 'opacity-70'
                      }`}
                    >
                      {v.toFixed(2)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-[10px] text-neutral-500 max-w-2xl font-sans leading-relaxed">
          dsDNA duplex (B ↔ C) is well modeled at 0.44 (canonical B-form). RNA-DNA
          R-loop interfaces (A ↔ B, A ↔ C) sit at 0.20–0.23 because R-loops are
          transient in solution — expected biology, not model failure.
        </div>
      </div>
    </div>
  );
}
