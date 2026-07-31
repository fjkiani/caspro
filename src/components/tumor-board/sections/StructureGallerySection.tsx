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
import RnaDnaStructureViewer from '@/components/target-lock/structure/RnaDnaStructureViewer';
import MoaMechanismPane from '@/components/target-lock/structure/MoaMechanismPane';
import manifest from '@/data/structure-manifest.json';
import guideManifest from '@/data/af3-guide-manifest.json';
import {
  MOA_HONESTY,
  MOA_MECHANISM_ENTRIES,
  type MoaMechanismEntry,
} from '@/data/moa-mechanism-manifest';

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

      {/* Mechanism — experimental PDB 3D (receipt-backed MOA reel) */}
      <MechanismGallery isDarkMode={isDarkMode} />

      {/* Cohort B — RNA-DNA guide-target gallery (AF3 3-chain) */}
      <GuideGallery isDarkMode={isDarkMode} />

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
          Cohort B RNA-DNA complexes come from AF3 local runs (mmCIF ships under{' '}
          <code className={`px-1 rounded ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
            /public/artifacts/structural_validation/
          </code>
          ).
        </span>
      </div>
    </section>
  );
}

// ============================================================================
// Mechanism — experimental PDB 3D (MOA reel)
// ============================================================================

function typeLabel(t: MoaMechanismEntry['type']): string {
  if (t === 'guided_reveal') return 'reveal';
  if (t === 'contact') return 'contact';
  return 'morph';
}

function MechanismGallery({ isDarkMode }: { isDarkMode: boolean }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const morphCount = MOA_MECHANISM_ENTRIES.filter((e) => e.type === 'morph').length;
  const revealCount = MOA_MECHANISM_ENTRIES.filter((e) => e.type === 'guided_reveal').length;

  return (
    <div className="mt-12">
      <div className="mb-6">
        <div
          className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${
            isDarkMode ? 'text-cyan-500' : 'text-indigo-600'
          }`}
        >
          Mechanism — experimental PDB
        </div>
        <h3
          className={`text-2xl md:text-3xl font-black leading-tight mb-3 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          Mutation → pocket → drug —
          <br />
          deposited crystals, not a spin.
        </h3>
        <p
          className={`max-w-3xl text-[13px] leading-relaxed ${
            isDarkMode ? 'text-zinc-400' : 'text-slate-600'
          }`}
        >
          {MOA_MECHANISM_ENTRIES.length} receipt-backed mechanisms from the manuscript MOA reel
          ({morphCount} apo→holo morphs, {revealCount} guided reveals, plus TP53 DNA contact).
          Click a row for the interactive 3D crystal (RCSB). Pre-rendered morph timelines stay
          optional under the viewer. {MOA_HONESTY}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <MetricTile
          isDarkMode={isDarkMode}
          label="Mechanisms"
          value={String(MOA_MECHANISM_ENTRIES.length)}
          sub="receipt-backed entries"
        />
        <MetricTile
          isDarkMode={isDarkMode}
          label="Apo→holo morphs"
          value={String(morphCount)}
          sub="KRAS · PIK3CA · PARP1"
        />
        <MetricTile
          isDarkMode={isDarkMode}
          label="Guided reveals"
          value={String(revealCount)}
          sub="EGFR · BACE1 (motion too small)"
        />
        <MetricTile
          isDarkMode={isDarkMode}
          label="Source"
          value="RCSB"
          sub="local /models/moa/ · no CDN"
        />
      </div>

      <div className="flex flex-col divide-y divide-neutral-800 rounded-lg border border-neutral-800 overflow-hidden">
        {MOA_MECHANISM_ENTRIES.map((e) => {
          const isOpen = openId === e.id;
          return (
            <div key={e.id} className={isDarkMode ? 'bg-black/40' : 'bg-white'}>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : e.id)}
                aria-expanded={isOpen}
                aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${e.gene} mechanism`}
                className={`w-full flex flex-wrap items-center gap-3 px-4 py-3 text-left transition-colors ${
                  isDarkMode ? 'hover:bg-white/[0.03]' : 'hover:bg-slate-50'
                }`}
              >
                <span
                  className={`font-mono text-sm font-black w-20 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {e.gene}
                </span>
                <span
                  className={`rounded border px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest ${
                    isDarkMode
                      ? 'text-cyan-300 border-cyan-500/40'
                      : 'text-indigo-700 border-indigo-200'
                  }`}
                >
                  {typeLabel(e.type)}
                </span>
                <span
                  className={`font-mono text-[11px] ${
                    isDarkMode ? 'text-zinc-400' : 'text-slate-500'
                  }`}
                >
                  PDB {e.primary.pdb}
                  {e.apo ? ` ← ${e.apo.pdb}` : ''}
                </span>
                <span
                  className={`hidden md:inline text-[11px] flex-1 truncate ${
                    isDarkMode ? 'text-zinc-500' : 'text-slate-500'
                  }`}
                >
                  {e.mutation ?? e.drug ?? e.biology}
                </span>
                <span
                  className={`ml-auto text-[10px] uppercase tracking-widest ${
                    isDarkMode ? 'text-zinc-500' : 'text-slate-400'
                  }`}
                >
                  {e.manuscript}
                </span>
                {e.integrityGuard && (
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" aria-hidden="true" />
                )}
                {isOpen ? (
                  <ChevronUp
                    className={`w-4 h-4 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}
                  />
                ) : (
                  <ChevronDown
                    className={`w-4 h-4 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}
                  />
                )}
              </button>

              {isOpen && (
                <div className="px-4 pb-4">
                  <MoaMechanismPane entry={e} height={380} isDarkMode={isDarkMode} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// Cohort B — RNA-DNA guide-target gallery
// ============================================================================

interface GuideRow {
  guide_id: string;
  gene: string;
  step: string;
  plddt: number;
  iptm: number;
  fraction_disordered: number;
  has_clash: number;
  ranking_score: number;
  structural_confidence: number;
  chain_pair_iptm: number[][];
  cif_path: string;
  rna_dna_verdict: string;
}

function guideBand(p: number): { className: string } {
  if (p >= 70) return { className: 'text-emerald-300 border-emerald-500/40' };
  if (p >= 50) return { className: 'text-[#75A025] border-[#75A025]/40' };
  return         { className: 'text-red-300 border-red-500/40' };
}

function GuideGallery({ isDarkMode }: { isDarkMode: boolean }) {
  const guides = useMemo<GuideRow[]>(() => {
    const g = (guideManifest as any).guides as Record<string, GuideRow>;
    // Sort desc by structural_confidence to match the ledger's canonical order
    return Object.values(g).sort((a, b) => b.structural_confidence - a.structural_confidence);
  }, []);

  const [openGuide, setOpenGuide] = useState<string | null>(null);
  const passCount = guides.filter((g) => g.rna_dna_verdict === 'PASS').length;

  return (
    <div className="mt-12">
      {/* Header */}
      <div className="mb-6">
        <div className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${
          isDarkMode ? 'text-[#75A025]' : 'text-[#75A025]'
        }`}>
          Cohort B — guide × target complexes
        </div>
        <h3 className={`text-2xl md:text-3xl font-black leading-tight mb-3 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}>
          15 AF3 guide-target folds —
          <br />
          RNA-DNA doctrine, not protein.
        </h3>
        <p className={`max-w-3xl text-[13px] leading-relaxed ${
          isDarkMode ? 'text-zinc-400' : 'text-slate-600'
        }`}>
          Each entry is a 3-chain AF3 prediction (guide RNA + 60-bp target dsDNA)
          scored against the RNA-DNA doctrine (pLDDT ≥ 50, iPTM ≥ 0.30). Applying
          the Cohort-A protein cut here rejects all 15 real guides — the split is
          not cosmetic. Click any row for the 3D model and its chain_pair_iptm
          decomposition.
        </p>
      </div>

      {/* Coverage strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <MetricTile isDarkMode={isDarkMode} label="Coverage" value={`${guides.length}/15`} sub="guides audited" />
        <MetricTile isDarkMode={isDarkMode} label="RNA-DNA PASS" value={`${passCount}/${guides.length}`} sub="under Abramson 2024 cut" />
        <MetricTile isDarkMode={isDarkMode} label="If protein cut applied" value="0/15" sub="all rejected as noise" warn />
        <MetricTile isDarkMode={isDarkMode} label="dsDNA duplex iPTM" value="~0.44" sub="canonical B-form (B↔C)" />
      </div>

      {/* Rows */}
      <div className="flex flex-col divide-y divide-neutral-800 rounded-lg border border-neutral-800 overflow-hidden">
        {guides.map((g) => {
          const isOpen = openGuide === g.guide_id;
          const band = guideBand(g.plddt);

          return (
            <div key={g.guide_id} className={isDarkMode ? 'bg-black/40' : 'bg-white'}>
              <button
                type="button"
                onClick={() => setOpenGuide(isOpen ? null : g.guide_id)}
                aria-expanded={isOpen}
                aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${g.guide_id} viewer`}
                className={`w-full flex flex-wrap items-center gap-3 px-4 py-3 text-left transition-colors ${
                  isDarkMode ? 'hover:bg-white/[0.03]' : 'hover:bg-slate-50'
                }`}
              >
                <span className={`font-mono text-sm font-black w-20 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {g.gene}
                </span>
                <span className={`font-mono text-[11px] w-24 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                  {g.step}
                </span>
                <span className={`rounded border px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest ${band.className}`}>
                  pLDDT {g.plddt.toFixed(1)}
                </span>
                <span className={`rounded border px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest ${
                  g.iptm >= 0.3 ? 'text-[#75A025] border-[#75A025]/40' : 'text-red-300 border-red-500/40'
                }`}>
                  iPTM {g.iptm.toFixed(2)}
                </span>
                <span className={`rounded border border-neutral-700 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest ${
                  isDarkMode ? 'text-zinc-400' : 'text-slate-500'
                }`}>
                  composite {g.structural_confidence.toFixed(3)}
                </span>
                <span className={`hidden md:inline text-[11px] flex-1 truncate font-mono ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                  {g.guide_id}
                </span>
                <span className={`ml-auto rounded px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest ${
                  g.rna_dna_verdict === 'PASS'
                    ? 'text-[#75A025] border border-[#75A025]/40 bg-[#75A025]/10'
                    : 'text-red-300 border border-red-500/40 bg-red-500/10'
                }`}>
                  {g.rna_dna_verdict}
                </span>
                {isOpen
                  ? <ChevronUp className={`w-4 h-4 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`} />
                  : <ChevronDown className={`w-4 h-4 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`} />}
              </button>

              {isOpen && (
                <div className="px-4 pb-4">
                  <RnaDnaStructureViewer guideId={g.guide_id} height={360} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
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
