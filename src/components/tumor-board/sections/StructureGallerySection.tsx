'use client';

/**
 * StructureGallerySection
 * -----------------------
 * Full-width section for the Target-Lock scroll + tabs surfaces.
 * Lists the 29 canonical BrM-cascade proteins with:
 *   - Gene / UniProt / length chip
 *   - pLDDT band (very high / confident / low / very low)
 *   - Source (AF DB or PDB 7W6L for KMT2C)
 *   - Click-to-expand molstar viewer (lazy-mount — one at a time)
 *
 * Anchor: src/data/structure-manifest.json (28 AF DB + 1 PDB fallback).
 * Design rule: we NEVER auto-mount more than one canvas simultaneously,
 * because each canvas consumes a WebGL context (browsers cap ~16). The
 * gallery lists 29 rows; only the row the user opens gets a viewer.
 */

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { AlertTriangle, ChevronDown, ChevronUp, Info, ExternalLink } from 'lucide-react';
import StructureViewer from '@/components/target-lock/structure/StructureViewer';
import manifest from '@/data/structure-manifest.json';

interface StructureRow {
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
}

function bandFor(p: number | null): { label: string; className: string } {
  if (p == null) return { label: 'crystal · X-ray', className: 'text-neutral-400 border-neutral-700' };
  if (p >= 90) return { label: 'very high', className: 'text-emerald-300 border-emerald-500/40' };
  if (p >= 70) return { label: 'confident',  className: 'text-sky-300 border-sky-500/40' };
  if (p >= 50) return { label: 'low',        className: 'text-amber-300 border-amber-500/40' };
  return { label: 'very low',                className: 'text-red-300 border-red-500/40' };
}

export default function StructureGallerySection({ isDarkMode }: { isDarkMode: boolean }) {
  const rows = useMemo<StructureRow[]>(() => {
    const structures = (manifest as any).structures as Record<string, StructureRow>;
    // Stable canonical order: alphabetical by gene
    return Object.values(structures).sort((a, b) => a.gene.localeCompare(b.gene));
  }, []);

  // Only one open at a time (WebGL context conservation)
  const [openGene, setOpenGene] = useState<string | null>(null);

  const lowCount = rows.filter((r) => r.plddt != null && r.plddt < 70).length;
  const afdbCount = rows.filter((r) => r.source === 'AF DB').length;
  const pdbCount = rows.filter((r) => r.source.startsWith('PDB')).length;

  return (
    <section
      className={`max-w-[1600px] mx-auto px-8 py-24 border-t ${
        isDarkMode ? 'border-white/5' : 'border-slate-200'
      }`}
    >
      {/* Header */}
      <div className="mb-8">
        <div
          className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${
            isDarkMode ? 'text-cyan-500' : 'text-indigo-600'
          }`}
        >
          Structures
        </div>
        <h2
          className={`text-3xl md:text-4xl font-black leading-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          } mb-3`}
        >
          Canonical 29-gene BrM cascade —
          <br />
          folded shapes we rank against.
        </h2>
        <p
          className={`max-w-3xl text-[13px] leading-relaxed ${
            isDarkMode ? 'text-zinc-400' : 'text-slate-600'
          }`}
        >
          {afdbCount} AlphaFold DB v6 predictions + {pdbCount} PDB crystal
          fallback (KMT2C SET-domain fragment, PDB 7W6L). Click any row to
          load its 3D model in-page. Structures are shipped locally under{' '}
          <code className={`px-1 rounded ${isDarkMode ? 'bg-white/5 text-cyan-300' : 'bg-slate-100 text-indigo-700'}`}>
            /public/models/
          </code>{' '}
          — no external CDN calls at render time.
        </p>
      </div>

      {/* Coverage strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <MetricTile isDarkMode={isDarkMode} label="Coverage" value={`${rows.length}/29`} sub="genes with a structure" />
        <MetricTile isDarkMode={isDarkMode} label="AF DB v6" value={String(afdbCount)} sub="full-length predictions" />
        <MetricTile isDarkMode={isDarkMode} label="PDB fallback" value={String(pdbCount)} sub="KMT2C SET domain (7W6L)" />
        <MetricTile
          isDarkMode={isDarkMode}
          label="Low pLDDT (<70)"
          value={String(lowCount)}
          sub="approximate backbones only"
          warn={lowCount > 0}
        />
      </div>

      {/* Legend for pLDDT bands */}
      <div className={`mb-4 rounded-md border px-3 py-2 text-[11px] leading-relaxed ${
        isDarkMode ? 'border-white/10 bg-white/[0.02] text-zinc-400' : 'border-slate-200 bg-slate-50 text-slate-600'
      }`}>
        <span className="font-semibold uppercase tracking-widest mr-2">pLDDT bands (chip only):</span>
        <span className="text-emerald-400">≥90 very high</span> ·{' '}
        <span className="text-sky-400">70–90 confident</span> ·{' '}
        <span className="text-amber-400">50–70 low</span> ·{' '}
        <span className="text-red-400">&lt;50 very low</span>. The chip reports the whole-structure
        mean; the AF DB PDB itself carries per-residue pLDDT in the B-factor column. The viewer
        currently applies chain-id coloring (molstar &quot;auto&quot; preset). Well-folded domains
        inside a low-mean model can still be locally reliable — follow the linked PAE map for
        residue-level confidence.
      </div>

      {/* Rows */}
      <div className="flex flex-col divide-y divide-neutral-800 rounded-lg border border-neutral-800 overflow-hidden">
        {rows.map((r) => {
          const isOpen = openGene === r.gene;
          const band = bandFor(r.plddt);
          const isCrystal = r.source.startsWith('PDB');
          const isLow = r.plddt != null && r.plddt < 70;

          return (
            <div key={r.gene} className={isDarkMode ? 'bg-black/40' : 'bg-white'}>
              <button
                type="button"
                onClick={() => setOpenGene(isOpen ? null : r.gene)}
                aria-expanded={isOpen}
                aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${r.gene} structure viewer`}
                className={`w-full flex flex-wrap items-center gap-3 px-4 py-3 text-left transition-colors ${
                  isDarkMode ? 'hover:bg-white/[0.03]' : 'hover:bg-slate-50'
                }`}
              >
                <span className={`font-mono text-sm font-black w-20 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {r.gene}
                </span>
                <span className={`font-mono text-[11px] w-24 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                  {r.uniprot}
                </span>
                <span className={`font-mono text-[11px] w-14 text-right ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                  {r.aa}aa
                </span>
                <span className={`rounded border px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest ${band.className}`}>
                  {r.plddt != null ? `pLDDT ${r.plddt.toFixed(1)}` : 'crystal'}
                </span>
                <span className={`text-[10px] uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                  {band.label}
                </span>
                <span className={`hidden md:inline text-[11px] flex-1 truncate ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                  {r.name}
                </span>
                <span className={`ml-auto text-[10px] uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                  {r.source}
                </span>
                {isLow && !isCrystal && (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                )}
                {isOpen
                  ? <ChevronUp className={`w-4 h-4 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`} />
                  : <ChevronDown className={`w-4 h-4 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`} />}
              </button>

              {isOpen && (
                <div className="px-4 pb-4">
                  <StructureViewer gene={r.gene} height={360} />
                  {r.paeImageUrl && (
                    <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-widest">
                      <ExternalLink className={`w-3 h-3 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`} />
                      <Link
                        href={r.paeImageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hover:underline ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}
                      >
                        Predicted Aligned Error (PAE) map — {r.entryId}
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Provenance footnote */}
      <div className={`mt-6 flex items-start gap-2 text-[11px] leading-relaxed ${
        isDarkMode ? 'text-zinc-500' : 'text-slate-500'
      }`}>
        <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
        <span>
          AlphaFold DB v6 predictions cached from{' '}
          <code className={`px-1 rounded ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
            alphafold.ebi.ac.uk/api/prediction/&#123;acc&#125;
          </code>
          . KMT2C (Q8NEZ4, 4911 aa) has no full-length AF prediction; we use PDB 7W6L
          (2.25 Å X-ray, MLL3–RBBP5–ASH2L complex with H3K4me0 peptide, chains C+E residues 4754–4911).
          Coloring: AF DB structures use per-residue pLDDT (B-factor column); PDB crystals use chain coloring.
        </span>
      </div>
    </section>
  );
}

function MetricTile({
  isDarkMode,
  label,
  value,
  sub,
  warn = false,
}: {
  isDarkMode: boolean;
  label: string;
  value: string;
  sub: string;
  warn?: boolean;
}) {
  return (
    <div
      className={`rounded-md border px-4 py-3 ${
        warn
          ? isDarkMode ? 'border-amber-500/40 bg-amber-500/[0.04]' : 'border-amber-300 bg-amber-50'
          : isDarkMode ? 'border-white/10 bg-white/[0.02]' : 'border-slate-200 bg-slate-50'
      }`}
    >
      <div className={`text-[9px] font-black uppercase tracking-[0.3em] mb-1 ${
        warn
          ? 'text-amber-400'
          : isDarkMode ? 'text-zinc-500' : 'text-slate-400'
      }`}>{label}</div>
      <div className={`text-2xl font-black ${
        warn
          ? isDarkMode ? 'text-amber-200' : 'text-amber-700'
          : isDarkMode ? 'text-white' : 'text-slate-900'
      }`}>{value}</div>
      <div className={`text-[10px] mt-0.5 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>{sub}</div>
    </div>
  );
}
