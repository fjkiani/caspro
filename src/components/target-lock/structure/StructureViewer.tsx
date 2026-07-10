'use client';

/**
 * StructureViewer
 * ---------------
 * Wrapper around <MolstarCanvas> that:
 *   - Reads structure metadata from src/data/structure-manifest.json
 *   - Renders the AF DB model (default) or PDB crystal fallback (KMT2C)
 *   - Displays a header chip with gene + UniProt + pLDDT + source
 *   - Warns when pLDDT < 70 (AF DB) or when using a PDB crystal fragment
 *   - Dynamically imports the heavy molstar canvas so it never enters
 *     the initial JS bundle
 *
 * Usage:
 *   <StructureViewer gene="TP53" />
 *   <StructureViewer gene="KMT2C" />   // PDB 7W6L fallback path
 */

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import manifest from '@/data/structure-manifest.json';

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
  gene: string;
  height?: number;
}

interface StructureRecord {
  gene: string;
  uniprot: string;
  aa: number | string;
  plddt: number | null;
  source: string;
  entryId: string;
  modelPath: string;
  paeImageUrl?: string;
  name: string;
  note?: string;
  chainsOfInterest?: string[];
  residueRange?: string;
}

const LOW_CONFIDENCE_THRESHOLD = 70;

function plddtBand(p: number | null): { label: string; className: string } {
  if (p == null) return { label: '—', className: 'bg-neutral-800 text-neutral-400' };
  if (p >= 90) return { label: `pLDDT ${p.toFixed(1)} · very high`, className: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40' };
  if (p >= 70) return { label: `pLDDT ${p.toFixed(1)} · confident`,  className: 'bg-sky-500/15 text-sky-300 border border-sky-500/40' };
  if (p >= 50) return { label: `pLDDT ${p.toFixed(1)} · low`,        className: 'bg-amber-500/15 text-amber-300 border border-amber-500/40' };
  return { label: `pLDDT ${p.toFixed(1)} · very low`,                className: 'bg-red-500/15 text-red-300 border border-red-500/40' };
}

export default function StructureViewer({ gene, height = 320 }: Props) {
  const record = useMemo<StructureRecord | null>(() => {
    const structures = (manifest as any).structures as Record<string, StructureRecord>;
    return structures?.[gene] ?? null;
  }, [gene]);

  if (!record) {
    return (
      <div className="rounded-md border border-neutral-800 bg-black/50 p-4 text-[11px] text-neutral-500">
        No structure record for <span className="font-mono">{gene}</span>.
      </div>
    );
  }

  const isCrystalFallback = record.source.startsWith('PDB');
  const isLowConfidence = record.plddt != null && record.plddt < LOW_CONFIDENCE_THRESHOLD;
  const band = plddtBand(record.plddt);
  const format = record.modelPath.endsWith('.cif') ? 'mmcif' : 'pdb';

  return (
    <div className="flex flex-col gap-2">
      {/* Header chip */}
      <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-widest">
        <span className="rounded bg-neutral-800 px-2 py-1 font-mono text-neutral-100">
          {record.gene}
        </span>
        <span className="rounded border border-neutral-700 px-2 py-1 font-mono text-neutral-400">
          {record.uniprot} · {record.aa}aa
        </span>
        <span className={`rounded px-2 py-1 font-mono ${band.className}`}>{band.label}</span>
        <span className="rounded border border-neutral-800 px-2 py-1 font-mono text-neutral-500">
          {record.source}
        </span>
      </div>

      {/* Canvas */}
      <MolstarCanvas
        modelPath={record.modelPath}
        format={format as 'pdb' | 'mmcif'}
        height={height}
      />

      {/* Warnings / notes */}
      {isCrystalFallback && record.note && (
        <div className="rounded border border-amber-500/40 bg-amber-500/[0.06] px-3 py-2 text-[11px] leading-relaxed text-amber-200">
          <span className="font-semibold uppercase tracking-widest">PDB fallback · </span>
          {record.note}
        </div>
      )}
      {isLowConfidence && !isCrystalFallback && (
        <div className="rounded border border-amber-500/40 bg-amber-500/[0.06] px-3 py-2 text-[11px] leading-relaxed text-amber-200">
          <span className="font-semibold uppercase tracking-widest">Low pLDDT · </span>
          Whole-structure prediction confidence is below 70. Treat backbone geometry as approximate,
          especially in disordered / signal-peptide regions. Individual well-folded domains inside a
          low-mean model can still be locally reliable — see per-residue coloring.
        </div>
      )}
    </div>
  );
}
