'use client';

/**
 * TargetLockBrainMetTabSurface — /engine/target-lock/ (canonical)
 *
 * Nested tabs (Interception pattern):
 *   Top rail: Score this step · Assassin · Mission Fit · Live variants ·
 *             Scoring · AUROC · Structures · Next Steps
 *   Nested (under Score this step): 01–07 BrM cascade steps
 *
 * Every number from brain-met-cascade-data.ts. Next Steps anchored to
 * pubs 01 (metastasis-interception) + 12 (brm-crispro-interception).
 * Legacy /tabs/ permanently redirects here.
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Focus,
  ArrowRight,
  ShieldCheck,
  Info,
  Database,
  Sigma,
  AlertTriangle,
  Boxes,
  Crosshair,
  Radar,
  ListChecks,
} from 'lucide-react';

import { useTheme } from '@/context/ThemeContext';
import { useOptionalPatient } from '@/context/PatientContext';
import { BM01 } from '@/data/patients/BM01';
import type { PatientBundle } from '@/data/tumor-board/patient-bundle-types';
import { getCapabilities } from '@/lib/capabilities';
import { productFor } from '@/lib/product-glossary';
import StructureGallerySection from './sections/StructureGallerySection';
import StructureViewer from '@/components/target-lock/structure/StructureViewer';
import RnaDnaStructureViewer from '@/components/target-lock/structure/RnaDnaStructureViewer';
import guideManifest from '@/data/af3-guide-manifest.json';

import {
  BRM_STEPS,
  LIVE_VARIANTS,
  WEIGHTS,
  FORMULAS,
  AUROC,
  RETRACTED,
  BACE1,
  GAPS,
  type BrmStep,
} from '@/data/brain-met-cascade-data';

export const SurfaceTabs = ({ children }: { children: React.ReactNode }) => <>{children}</>;

type TopTab =
  | 'score'
  | 'assassin'
  | 'mission'
  | 'variants'
  | 'scoring'
  | 'structures'
  | 'next';

const TOP_TABS: { key: TopTab; label: string; icon: typeof Focus }[] = [
  { key: 'score', label: 'Score this step', icon: Focus },
  { key: 'assassin', label: 'Assassin Score', icon: Crosshair },
  { key: 'mission', label: 'Mission Fit', icon: Radar },
  { key: 'variants', label: 'Live variants', icon: Database },
  { key: 'scoring', label: 'Scoring · AUROC', icon: Sigma },
  { key: 'structures', label: 'Structures · 29 targets', icon: Boxes },
  { key: 'next', label: 'Next Steps', icon: ListChecks },
];

/** Genes with AF3 guide:DNA folds in af3-guide-manifest (Cohort B). */
const GUIDE_GENES = (() => {
  const g = (guideManifest as { guides: Record<string, { gene: string; guide_id: string; structural_confidence: number }> }).guides;
  const best = new Map<string, { guide_id: string; structural_confidence: number }>();
  for (const rec of Object.values(g)) {
    const prev = best.get(rec.gene);
    if (!prev || rec.structural_confidence > prev.structural_confidence) {
      best.set(rec.gene, { guide_id: rec.guide_id, structural_confidence: rec.structural_confidence });
    }
  }
  return best;
})();

function ProteinPane({
  gene,
  mode,
  isDarkMode,
  caption,
}: {
  gene: string;
  mode: 'protein' | 'guide';
  isDarkMode: boolean;
  caption: string;
}) {
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const panel = isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-white border-slate-200';
  const guide = GUIDE_GENES.get(gene);
  const useGuide = mode === 'guide' && !!guide;

  return (
    <aside className={`rounded border p-4 sticky top-24 ${panel}`}>
      <p className={`text-[9px] font-black uppercase tracking-[0.35em] mb-1 ${accent}`}>
        {useGuide ? 'Cohort B · guide:DNA' : 'Cohort A · protein fold'}
      </p>
      <p className={`text-lg font-black tracking-tight mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        {gene}
      </p>
      <p className={`text-[11px] leading-relaxed mb-3 ${muted}`}>{caption}</p>
      {useGuide && guide ? (
        <RnaDnaStructureViewer guideId={guide.guide_id} height={360} />
      ) : (
        <StructureViewer gene={gene} height={360} />
      )}
    </aside>
  );
}

// ── Score-this-step: problem + nested cascade + protein pane ─────────────────

function ScoreThisStepPanel({
  step,
  onStepChange,
  selectedGene,
  onSelectGene,
  isDarkMode,
}: {
  step: BrmStep;
  onStepChange: (slug: BrmStep['slug']) => void;
  selectedGene: string;
  onSelectGene: (g: string) => void;
  isDarkMode: boolean;
}) {
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const body = isDarkMode ? 'text-zinc-300' : 'text-slate-600';
  const panel = isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-white border-slate-200';
  const main = isDarkMode ? 'text-white' : 'text-slate-900';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <div className="space-y-5 min-w-0">
        <div className={`rounded border p-5 ${panel}`}>
          <p className={`text-[9px] font-black uppercase tracking-[0.35em] mb-2 ${accent}`}>
            What Target Lock does
          </p>
          <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${main}`}>
            Rank genes for one metastatic step — not “cancer” in the abstract.
          </h2>
          <p className={`mt-3 text-[13px] leading-relaxed ${body}`}>
            The problem: a flat gene list mixes real BrM drivers with genes that look cancerous but
            belong to the wrong step (or the wrong tissue). Target Lock scopes the question to a
            cascade step, then scores each gene with WEIGHTS_BRAIN_MET (
            F={WEIGHTS.BRAIN_MET.functionality} · E={WEIGHTS.BRAIN_MET.essentiality} · R=
            {WEIGHTS.BRAIN_MET.regulatory} · C={WEIGHTS.BRAIN_MET.chromatin}). Ground-truth
            positives must outrank hard negatives for that step.
          </p>
          <p className={`mt-2 text-[12px] leading-relaxed ${muted}`}>
            Formula: <code className="font-mono text-[11px]">{FORMULAS.targetLock}</code>
          </p>
        </div>

        <div>
          <p className={`text-[9px] font-black uppercase tracking-[0.35em] mb-2 ${muted}`}>
            Nested · BrM cascade ({BRM_STEPS.length} steps)
          </p>
          <div className="flex gap-1.5 overflow-x-auto pb-1" role="tablist" aria-label="BrM cascade steps">
            {BRM_STEPS.map((s) => {
              const on = s.slug === step.slug;
              return (
                <button
                  key={s.slug}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => onStepChange(s.slug)}
                  className={`shrink-0 rounded-sm border px-2.5 py-1.5 text-left transition-colors ${
                    on
                      ? isDarkMode
                        ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-100'
                        : 'border-indigo-400 bg-indigo-50 text-indigo-950'
                      : isDarkMode
                        ? 'border-zinc-800 text-zinc-500 hover:text-zinc-300'
                        : 'border-slate-200 text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span className="block text-[9px] font-black tracking-widest opacity-70">
                    {String(s.n).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] font-black uppercase tracking-wider max-w-[7.5rem] leading-tight">
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <StepPanel
          step={step}
          selectedGene={selectedGene}
          onSelectGene={onSelectGene}
          isDarkMode={isDarkMode}
        />
      </div>

      <ProteinPane
        gene={selectedGene}
        mode="protein"
        isDarkMode={isDarkMode}
        caption={`Local AFDB/PDB fold for the selected primary gene on step ${step.n} (${step.label}). Click a positive chip to swap.`}
      />
    </div>
  );
}

function StepPanel({
  step,
  selectedGene,
  onSelectGene,
  isDarkMode,
}: {
  step: BrmStep;
  selectedGene: string;
  onSelectGene: (g: string) => void;
  isDarkMode: boolean;
}) {
  const stepHasBACE1 = BACE1.cascadeSteps.includes(step.slug as (typeof BACE1.cascadeSteps)[number]);
  return (
    <div>
      <div className="flex items-start gap-4 mb-5">
        <div className="flex-shrink-0">
          <div
            className={`w-12 h-12 rounded border flex items-center justify-center ${
              isDarkMode ? 'border-zinc-800 bg-zinc-950' : 'border-slate-200 bg-white shadow-sm'
            }`}
          >
            <Focus className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
          </div>
          <div
            className={`mt-1 text-center text-[10px] font-black tracking-widest ${
              isDarkMode ? 'text-zinc-600' : 'text-slate-400'
            }`}
          >
            {String(step.n).padStart(2, '0')} / {String(BRM_STEPS.length).padStart(2, '0')}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div
            className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${
              isDarkMode ? 'text-cyan-500' : 'text-indigo-600'
            }`}
          >
            BrM step {step.n}
          </div>
          <h2
            className={`text-2xl font-black uppercase tracking-[0.12em] mb-2 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            {step.label}
          </h2>
          <p className={`text-[13px] leading-relaxed mb-4 ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
            {step.narrative}
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            <div
              className={`p-4 rounded border ${
                isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div
                className={`text-[9px] font-black uppercase tracking-[0.3em] mb-1 ${
                  isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                }`}
              >
                Primary genes (positives)
              </div>
              <p
                className={`text-[11px] leading-relaxed mb-3 ${
                  isDarkMode ? 'text-zinc-500' : 'text-slate-500'
                }`}
              >
                Ground-truth drivers for this step. Click to load the fold.
              </p>
              <div className="flex flex-wrap gap-2">
                {step.primaryGenes.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => onSelectGene(g)}
                    className={`px-2.5 py-1 text-[10px] font-black tracking-tight rounded-sm border ${
                      g === selectedGene
                        ? isDarkMode
                          ? 'bg-cyan-500/20 text-cyan-100 border-cyan-400'
                          : 'bg-indigo-100 text-indigo-900 border-indigo-500'
                        : g === 'BACE1'
                          ? isDarkMode
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/40'
                            : 'bg-amber-50 text-amber-700 border-amber-300'
                          : isDarkMode
                            ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                            : 'bg-indigo-50 text-indigo-700 border-indigo-300'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div
              className={`p-4 rounded border ${
                isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div
                className={`text-[9px] font-black uppercase tracking-[0.3em] mb-1 ${
                  isDarkMode ? 'text-zinc-400' : 'text-slate-500'
                }`}
              >
                Negative controls
              </div>
              <p
                className={`text-[11px] leading-relaxed mb-3 ${
                  isDarkMode ? 'text-zinc-500' : 'text-slate-500'
                }`}
              >
                Hard negatives — must not look like BrM drivers on this step.
              </p>
              <div className="flex flex-wrap gap-2">
                {step.negativeControls.map((g) => (
                  <span
                    key={g}
                    className={`px-2.5 py-1 text-[10px] font-black tracking-tight rounded-sm border ${
                      isDarkMode
                        ? 'bg-zinc-900 text-zinc-400 border-zinc-800'
                        : 'bg-white text-slate-500 border-slate-200'
                    }`}
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {step.bbbNote && (
            <div
              className={`mt-3 p-3 rounded border-l-2 flex items-start gap-3 ${
                isDarkMode
                  ? 'bg-cyan-500/5 border-cyan-500/50 text-cyan-100'
                  : 'bg-indigo-50 border-indigo-400 text-indigo-800'
              }`}
            >
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <strong className="uppercase tracking-widest text-[9px] block mb-1">
                  Ground-truth note
                </strong>
                {step.bbbNote}
              </div>
            </div>
          )}

          {stepHasBACE1 && (
            <div
              className={`mt-3 p-4 rounded border ${
                isDarkMode ? 'bg-amber-500/5 border-amber-500/40' : 'bg-amber-50 border-amber-300'
              }`}
            >
              <div
                className={`text-[9px] font-black uppercase tracking-[0.3em] mb-2 ${
                  isDarkMode ? 'text-amber-300' : 'text-amber-700'
                }`}
              >
                BACE1 · centerpiece target · present at this step
              </div>
              <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-amber-100/90' : 'text-amber-900'}`}>
                BACE1 hits {BACE1.cascadeSteps.length} of 7 steps ({BACE1.cascadeSteps.join(', ')}).
                CRISPRa LFC = +{BACE1.canonicalLfc}; ~{BACE1.brainVsLungFold}× brain-vs-lung (
                {BACE1.citation}). Evo2 Δll on p.D289N = +0.0017 — near-neutral. Rank from CRISPR +
                niche enrichment, not evolutionary damage on that variant.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Assassin Score ───────────────────────────────────────────────────────────

const ASSASSIN_DEMO_GENES = ['CXCR4', 'VEGFA', 'MMP2', 'MET', 'BRAF', 'TWIST1', 'ICAM1', 'BCL2'] as const;

function AssassinPanel({ isDarkMode }: { isDarkMode: boolean }) {
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const body = isDarkMode ? 'text-zinc-300' : 'text-slate-600';
  const panel = isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-white border-slate-200';
  const main = isDarkMode ? 'text-white' : 'text-slate-900';
  const [gene, setGene] = useState<string>('CXCR4');

  const terms = [
    {
      w: '0.37',
      name: 'Efficacy',
      detail:
        'Guide / spacer efficacy proxy from Target-Lock v2 signal (TL_v2) — how well the perturbation is expected to land on-target. Pub 01: not yet benchmarked to Doench/CRISPOR cleavage.',
    },
    {
      w: '0.30',
      name: 'Safety',
      detail: 'Off-target / tissue safety term (GTEx_inv) — penalizes guides that look risky outside the mission tissue.',
    },
    {
      w: '0.30',
      name: 'Mission',
      detail: 'Mission Fit — is this gene a primary for the chosen metastatic step? Same question as the nested cascade positives.',
    },
    {
      w: '0.03',
      name: 'Structure',
      detail:
        'Bounded lift when AF3 guide:DNA passes RNA–DNA gates (pLDDT ≥50, iPTM ≥0.30) — pre-synthesis triage, not wet-lab cleavage (pub 01).',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <div className="min-w-0 space-y-5">
        <div>
          <div className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${accent}`}>
            Assassin Score
          </div>
          <h2 className={`text-2xl sm:text-3xl font-black uppercase tracking-[0.12em] mb-3 ${main}`}>
            Rank the CRISPR candidate after Target Lock
          </h2>
          <p className={`text-[13px] leading-relaxed mb-2 ${body}`}>
            Assassin is the guide-ranking composite used once a gene is chosen for a step. It is not
            the Target-Lock gene rank itself — it scores the perturbation package (efficacy · safety ·
            mission · structure).
          </p>
          <p className={`font-mono text-[11px] mb-4 ${muted}`}>{FORMULAS.assassin}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {ASSASSIN_DEMO_GENES.filter((g) => GUIDE_GENES.has(g)).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGene(g)}
              className={`px-2.5 py-1 text-[10px] font-black tracking-tight rounded-sm border ${
                g === gene
                  ? isDarkMode
                    ? 'bg-cyan-500/20 text-cyan-100 border-cyan-400'
                    : 'bg-indigo-100 text-indigo-900 border-indigo-500'
                  : isDarkMode
                    ? 'border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    : 'border-slate-200 text-slate-500 hover:text-slate-800'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {terms.map((t) => (
            <div key={t.name} className={`rounded border p-4 ${panel}`}>
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <span className={`text-[11px] font-black uppercase tracking-widest ${main}`}>{t.name}</span>
                <span className={`font-mono text-lg font-black ${accent}`}>{t.w}</span>
              </div>
              <p className={`text-[11px] leading-relaxed ${body}`}>{t.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <ProteinPane
        gene={gene}
        mode="guide"
        isDarkMode={isDarkMode}
        caption="Cohort B AF3 guide:DNA for the selected Assassin gene (pub 01 structural gate). Structural lift is triage before synthesis — not cleavage proof."
      />
    </div>
  );
}

// ── Mission Fit ──────────────────────────────────────────────────────────────

function MissionFitPanel({ isDarkMode }: { isDarkMode: boolean }) {
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const body = isDarkMode ? 'text-zinc-300' : 'text-slate-600';
  const panel = isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-white border-slate-200';
  const main = isDarkMode ? 'text-white' : 'text-slate-900';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <div className="min-w-0 space-y-5">
        <div>
          <div className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${accent}`}>
            Mission Fit
          </div>
          <h2 className={`text-2xl sm:text-3xl font-black uppercase tracking-[0.12em] mb-3 ${main}`}>
            Is this gene a driver for the step you picked?
          </h2>
          <p className={`text-[13px] leading-relaxed mb-4 ${body}`}>
            Mission Fit is the step-scoped term inside Assassin (weight 0.30) and the reason Target
            Lock nests under cascade steps. A gene that is primary for BBB transit is a miss for
            angiogenesis if you asked the wrong mission. Positives and negatives on each step are the
            ground-truth labels that train that question.
          </p>
        </div>

        <div className={`rounded border p-5 ${panel}`}>
          <p className={`text-[9px] font-black uppercase tracking-[0.3em] mb-3 ${muted}`}>
            How to read Score this step
          </p>
          <ul className={`space-y-2 text-[12px] leading-relaxed ${body}`}>
            <li>
              <span className={`font-black ${accent}`}>Primary genes (positives)</span> — known
              drivers for that metastatic step. Target Lock should put these ahead of negatives.
            </li>
            <li>
              <span className={`font-black ${muted}`}>Negative controls</span> — hard negatives for
              that step (wrong biology / lineage). High rank here is a false lock.
            </li>
            <li>
              Multi-step genes (e.g. BACE1 on steps 3, 5, 6) earn Mission Fit across more than one
              mission — that is intentional footprint, not double-counting noise.
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {BRM_STEPS.map((s) => (
            <div key={s.slug} className={`rounded border px-3 py-3 ${panel}`}>
              <p className={`text-[9px] font-black tracking-widest ${accent}`}>
                {String(s.n).padStart(2, '0')}
              </p>
              <p className={`text-[11px] font-black uppercase tracking-wider mt-0.5 ${main}`}>
                {s.label}
              </p>
              <p className={`text-[10px] mt-2 ${muted}`}>
                {s.primaryGenes.length} positives · {s.negativeControls.length} negatives
              </p>
            </div>
          ))}
        </div>
      </div>

      <ProteinPane
        gene="BACE1"
        mode="protein"
        isDarkMode={isDarkMode}
        caption={`BACE1 · multi-step Mission Fit exemplar (steps ${BACE1.cascadeSteps.join(', ')}). CRISPRa LFC +${BACE1.canonicalLfc}; ~${BACE1.brainVsLungFold}× brain-vs-lung (${BACE1.citation}). Zero MSK-MET mutations — expression driver, not a panel hit (pub 12).`}
      />
    </div>
  );
}

// ── Variants / Scoring / Disclosure (unchanged substance) ────────────────────

function VariantsPanel({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div>
      <div
        className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${
          isDarkMode ? 'text-cyan-500' : 'text-indigo-600'
        }`}
      >
        Evidence · Evo2 live inference
      </div>
      <h2
        className={`text-3xl font-black uppercase tracking-[0.15em] mb-3 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}
      >
        Twelve variants scored on Modal A100
      </h2>
      <p className={`text-[13px] leading-relaxed max-w-3xl mb-6 ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
        <code
          className={`px-1 py-0.5 rounded text-[11px] ${
            isDarkMode ? 'bg-zinc-800 text-cyan-300' : 'bg-slate-100 text-indigo-700'
          }`}
        >
          evo2_1b_base · conditional_ll · 8192bp · var_idx=4095 · forward · GRCh38
        </code>
      </p>
      <div className={`rounded border overflow-x-auto ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
        <table className="w-full text-[11px] font-mono">
          <thead className={isDarkMode ? 'bg-zinc-950 text-zinc-400' : 'bg-slate-100 text-slate-500'}>
            <tr>
              <th className="text-left px-4 py-3 font-black uppercase tracking-widest text-[9px]">Gene</th>
              <th className="text-left px-4 py-3 font-black uppercase tracking-widest text-[9px]">HGVS</th>
              <th className="text-right px-4 py-3 font-black uppercase tracking-widest text-[9px]">delta_ll</th>
              <th className="text-left px-4 py-3 font-black uppercase tracking-widest text-[9px]">Source</th>
              <th className="text-left px-4 py-3 font-black uppercase tracking-widest text-[9px]">Note</th>
            </tr>
          </thead>
          <tbody>
            {LIVE_VARIANTS.map((v, i) => {
              const isBACE1 = v.gene === 'BACE1';
              const damage = v.deltaLl < -0.2;
              return (
                <tr
                  key={`${v.gene}-${v.hgvs}`}
                  className={`border-t ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'} ${
                    isBACE1
                      ? isDarkMode
                        ? 'bg-amber-500/5'
                        : 'bg-amber-50'
                      : i % 2 === 0
                        ? ''
                        : isDarkMode
                          ? 'bg-zinc-950/40'
                          : 'bg-slate-50'
                  }`}
                >
                  <td
                    className={`px-4 py-2.5 font-black ${
                      isBACE1
                        ? isDarkMode
                          ? 'text-amber-300'
                          : 'text-amber-700'
                        : isDarkMode
                          ? 'text-white'
                          : 'text-slate-900'
                    }`}
                  >
                    {v.gene}
                  </td>
                  <td className={`px-4 py-2.5 ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>{v.hgvs}</td>
                  <td
                    className={`px-4 py-2.5 text-right font-black ${
                      damage
                        ? isDarkMode
                          ? 'text-red-300'
                          : 'text-red-600'
                        : v.deltaLl > 0.1
                          ? isDarkMode
                            ? 'text-emerald-300'
                            : 'text-emerald-600'
                          : isDarkMode
                            ? 'text-zinc-200'
                            : 'text-slate-700'
                    }`}
                  >
                    {v.deltaLl > 0 ? '+' : ''}
                    {v.deltaLl.toFixed(4)}
                  </td>
                  <td className={`px-4 py-2.5 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>{v.cohortSource}</td>
                  <td className={`px-4 py-2.5 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>{v.note}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ScoringPanel({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div>
      <div
        className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${
          isDarkMode ? 'text-cyan-500' : 'text-indigo-600'
        }`}
      >
        Scoring · brain-met composite
      </div>
      <h2
        className={`text-3xl font-black uppercase tracking-[0.15em] mb-6 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}
      >
        Weights · formulas · AUROC
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div
          className={`p-6 rounded border ${
            isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div
            className={`text-[9px] font-black uppercase tracking-[0.3em] mb-4 ${
              isDarkMode ? 'text-zinc-500' : 'text-slate-400'
            }`}
          >
            Weights
          </div>
          <table className="w-full text-[11px] font-mono">
            <thead>
              <tr>
                <th className={`text-left pb-2 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Weight</th>
                <th className={`text-right pb-2 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Default</th>
                <th className={`text-right pb-2 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`}>Brain-met</th>
              </tr>
            </thead>
            <tbody className={isDarkMode ? 'text-zinc-300' : 'text-slate-700'}>
              <tr>
                <td className="py-1">Functionality</td>
                <td className="text-right">{WEIGHTS.DEFAULT.functionality}</td>
                <td className="text-right font-black">{WEIGHTS.BRAIN_MET.functionality}</td>
              </tr>
              <tr>
                <td className="py-1">Essentiality</td>
                <td className="text-right">{WEIGHTS.DEFAULT.essentiality}</td>
                <td className="text-right font-black">{WEIGHTS.BRAIN_MET.essentiality}</td>
              </tr>
              <tr>
                <td className="py-1">Regulatory</td>
                <td className="text-right">{WEIGHTS.DEFAULT.regulatory}</td>
                <td
                  className={`text-right font-black ${
                    isDarkMode ? 'text-amber-300' : 'text-amber-700'
                  }`}
                >
                  {WEIGHTS.BRAIN_MET.regulatory}
                </td>
              </tr>
              <tr>
                <td className="py-1">Chromatin</td>
                <td className="text-right">{WEIGHTS.DEFAULT.chromatin}</td>
                <td className="text-right font-black">{WEIGHTS.BRAIN_MET.chromatin}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          className={`p-6 rounded border ${
            isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div
            className={`text-[9px] font-black uppercase tracking-[0.3em] mb-4 ${
              isDarkMode ? 'text-zinc-500' : 'text-slate-400'
            }`}
          >
            Formulas
          </div>
          <div className="space-y-2.5 text-[10px] font-mono leading-relaxed">
            {Object.entries(FORMULAS).map(([k, v]) => (
              <div key={k}>
                <div
                  className={`text-[9px] font-black uppercase tracking-widest mb-0.5 ${
                    isDarkMode ? 'text-cyan-500' : 'text-indigo-600'
                  }`}
                >
                  {k}
                </div>
                <code className={isDarkMode ? 'text-zinc-200' : 'text-slate-700'}>{v}</code>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`p-6 rounded border ${
          isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div
          className={`text-[9px] font-black uppercase tracking-[0.3em] mb-4 ${
            isDarkMode ? 'text-zinc-500' : 'text-slate-400'
          }`}
        >
          Honest AUROC · 29-gene panel
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <div className={`text-3xl font-black ${isDarkMode ? 'text-cyan-300' : 'text-indigo-700'}`}>
              {AUROC.primary}
            </div>
            <div
              className={`text-[9px] font-black uppercase tracking-widest mt-1 ${
                isDarkMode ? 'text-zinc-500' : 'text-slate-500'
              }`}
            >
              Primary composite
            </div>
          </div>
          <div>
            <div className={`text-3xl font-black ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
              {AUROC.observedOnly}
            </div>
            <div
              className={`text-[9px] font-black uppercase tracking-widest mt-1 ${
                isDarkMode ? 'text-zinc-500' : 'text-slate-500'
              }`}
            >
              Observed-only
            </div>
          </div>
          <div>
            <div className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {AUROC.tsgOnly}
            </div>
            <div
              className={`text-[9px] font-black uppercase tracking-widest mt-1 ${
                isDarkMode ? 'text-zinc-500' : 'text-slate-500'
              }`}
            >
              TSG only
            </div>
          </div>
          <div>
            <div className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {AUROC.oncOnly}
            </div>
            <div
              className={`text-[9px] font-black uppercase tracking-widest mt-1 ${
                isDarkMode ? 'text-zinc-500' : 'text-slate-500'
              }`}
            >
              ONC only
            </div>
          </div>
        </div>
        <div
          className={`text-[11px] font-mono grid md:grid-cols-3 gap-x-8 gap-y-1 ${
            isDarkMode ? 'text-zinc-400' : 'text-slate-600'
          }`}
        >
          <div>AUPRC · {AUROC.auprc}</div>
          <div>P@3 · {AUROC.precisionAt3}</div>
          <div>P@5 · {AUROC.precisionAt5}</div>
          <div>P@10 · {AUROC.precisionAt10}</div>
          <div>Evo2 alone · {AUROC.evo2BaselineAlone}</div>
          <div>CRISPR alone · {AUROC.crisprAlone}</div>
        </div>
      </div>

      <div className="mt-6">
        <p
          className={`text-[9px] font-black uppercase tracking-[0.3em] mb-3 ${
            isDarkMode ? 'text-zinc-500' : 'text-slate-400'
          }`}
        >
          Retracted · do not cite externally
        </p>
        <div className="grid md:grid-cols-3 gap-3">
          {Object.entries(RETRACTED).map(([k, v]) => (
            <div
              key={k}
              className={`p-4 rounded border ${
                isDarkMode ? 'bg-red-500/5 border-red-500/20' : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className={`w-3.5 h-3.5 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                <span
                  className={`text-[9px] font-black uppercase tracking-[0.3em] ${
                    isDarkMode ? 'text-red-300' : 'text-red-700'
                  }`}
                >
                  {k}
                </span>
              </div>
              <div
                className={`text-2xl font-black line-through mb-2 ${
                  isDarkMode ? 'text-red-300' : 'text-red-700'
                }`}
              >
                {(v as { value: number }).value}
              </div>
              <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
                {(v as { reason: string }).reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NextStepsPanel({ isDarkMode }: { isDarkMode: boolean }) {
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const body = isDarkMode ? 'text-zinc-300' : 'text-slate-600';
  const panel = isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-white border-slate-200';
  const main = isDarkMode ? 'text-white' : 'text-slate-900';

  const blocks = [
    {
      kicker: 'Clinical validation · pub 12',
      title: 'What turns this into a clinically usable ranker',
      points: [
        `Expand beyond n=29 genes — composite AUROC ${AUROC.primary} has a wide CI because the validated BrM target universe is small, not because the method is secretly larger.`,
        'Prospective GOF/LOF benchmarking of Evo2 Δll against ClinVar / OncoKB mechanism labels and saturation editing (pub 12 Discussion).',
        'Re-run hard negatives that are solid-tumor vs solid-tumor (GAP-1: FLT3 / IDH / TERT are too easy by tissue-of-origin).',
        'Validate evo2_1b_base findings on larger Evo2 variants (7B / 40B) before locking Δll thresholds.',
      ],
    },
    {
      kicker: 'Wet lab · in-silico efficiency · pub 01',
      title: 'Generate → structural gate → synthesize',
      points: [
        'Assassin + AF3 guide:DNA is a pre-synthesis triage (pLDDT ≥50, iPTM ≥0.30 on the 15/15 cohort) — not cleavage validation. RUO until wet-lab correlates.',
        'Impact for wet labs: discard gross misfolds before oligo spend; compress design–test from months of sequence-only discard cycles toward days of gated candidates.',
        'Still required: Doench / CRISPOR-style efficacy benchmarks and random-spacer stress tests at the declared iPTM gate.',
        'Structure weight in Assassin stays small (+0.03) on purpose — fold confidence is a lift, not a substitute for nuclease assays.',
      ],
    },
    {
      kicker: 'Partnerships · translation · pub 12',
      title: 'Where partners plug in',
      points: [
        'BACE1 inhibitor repurposing is a manuscript hypothesis: Phase II/III AD safety data exist, but only if partners accept an expression/epigenetic driver invisible to MSK-IMPACT-class panels (0/1,879 MSK-MET mutations).',
        'Expression + ATAC partners (GSE205033 lineage) — mutation panels alone miss the apex functional drivers.',
      ],
      cta: { label: 'Contact us', href: '/contact/' },
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${accent}`}>
          Next Steps
        </div>
        <h2 className={`text-2xl sm:text-3xl font-black uppercase tracking-[0.12em] mb-3 ${main}`}>
          Clinical validation · wet-lab path · partnerships
        </h2>
        <p className={`text-[13px] leading-relaxed max-w-4xl ${body}`}>
          Anchored to manuscripts only —{' '}
          <span className="font-black">01 metastasis-interception</span> (Assassin + AF3 structural
          gate) and <span className="font-black">12 brm-crispro-interception</span> (BrM ranking +
          BACE1 blind spot). No invented timelines or partner names.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {blocks.map((b) => (
          <div key={b.kicker} className={`rounded border p-5 ${panel}`}>
            <p className={`text-[9px] font-black uppercase tracking-[0.3em] mb-2 ${accent}`}>{b.kicker}</p>
            <h3 className={`text-[14px] font-black tracking-tight mb-3 ${main}`}>{b.title}</h3>
            <ul className={`space-y-2.5 text-[11px] leading-relaxed ${body}`}>
              {b.points.map((p) => (
                <li key={p.slice(0, 48)} className="flex gap-2">
                  <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${isDarkMode ? 'bg-cyan-400' : 'bg-indigo-500'}`} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            {'cta' in b && b.cta ? (
              <Link
                href={b.cta.href}
                className={`mt-4 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${
                  isDarkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-indigo-700 hover:text-indigo-900'
                }`}
              >
                {b.cta.label}
                <ArrowRight className="w-3 h-3" />
              </Link>
            ) : null}
          </div>
        ))}
      </div>

      <div>
        <p className={`text-[9px] font-black uppercase tracking-[0.3em] mb-3 ${muted}`}>
          Validation debts still on the ledger
        </p>
        <div className="space-y-3">
          {GAPS.map((g) => (
            <div
              key={g.id}
              className={`p-4 rounded border flex items-start gap-4 ${
                isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <span
                className={`px-2 py-0.5 rounded-sm text-[9px] font-black uppercase tracking-widest ${
                  g.severity === 'high'
                    ? isDarkMode
                      ? 'bg-red-500/10 text-red-300 border border-red-500/30'
                      : 'bg-red-100 text-red-700 border border-red-300'
                    : isDarkMode
                      ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                      : 'bg-amber-100 text-amber-700 border border-amber-300'
                }`}
              >
                {g.id} · {g.severity}
              </span>
              <div className="flex-1">
                <div className={`text-[12px] font-black ${main} mb-1`}>{g.label}</div>
                <p className={`text-[11px] leading-relaxed ${body}`}>{g.detail}</p>
                <p className={`text-[10px] mt-2 italic ${muted}`}>Next · {g.fix}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Surface ──────────────────────────────────────────────────────────────────

export default function TargetLockBrainMetTabSurface() {
  const { isDarkMode } = useTheme();
  const patientCtx = useOptionalPatient();
  const patient: PatientBundle = patientCtx ?? BM01;
  const caps = getCapabilities(patient);
  const [topTab, setTopTab] = useState<TopTab>('score');
  const [stepSlug, setStepSlug] = useState<BrmStep['slug']>('cns_colonization');
  const [scoreGene, setScoreGene] = useState('BACE1');

  const step = BRM_STEPS.find((s) => s.slug === stepSlug) ?? BRM_STEPS[4];
  const topMeta = TOP_TABS.find((t) => t.key === topTab);

  useEffect(() => {
    if (!step.primaryGenes.includes(scoreGene)) {
      setScoreGene(step.primaryGenes.includes('BACE1') ? 'BACE1' : step.primaryGenes[0]);
    }
  }, [stepSlug, step.primaryGenes, scoreGene]);

  if (!caps.hasBrmAnchor) {
    return <NotBrainMetGate patient={patient} isDarkMode={isDarkMode} variant="tabs" />;
  }

  const stripCopy =
    topTab === 'score'
      ? `Step ${step.n} · ${step.label} — ${step.narrative}`
      : topTab === 'assassin'
        ? 'Assassin ranks CRISPR candidates after Target Lock: efficacy · safety · mission · structure. Guide:DNA on the right.'
        : topTab === 'mission'
          ? 'Mission Fit asks whether the gene is a driver for the cascade step you selected. BACE1 fold on the right.'
          : topTab === 'variants'
            ? '12 variants scored on Modal A100. delta_ll from evo2_1b_base conditional_ll endpoint.'
            : topTab === 'scoring'
              ? 'WEIGHTS_BRAIN_MET boosts regulatory to 0.24. Enformer excluded from production composite.'
              : topTab === 'structures'
                ? '28 AlphaFold DB predictions + 1 PDB fallback (KMT2C SET domain via 7W6L). Click any row to inspect.'
                : 'Clinical validation, wet-lab path, and partnerships — manuscripts 01 + 12 only.';

  return (
    <div
      className={`min-h-screen font-mono ${
        isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-slate-50 text-slate-600'
      }`}
    >
      <header
        className={`border-b backdrop-blur-sm sticky top-0 z-40 ${
          isDarkMode ? 'border-white/5 bg-black/40' : 'border-slate-200 bg-white/80'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div
                className={`w-9 h-9 rounded border flex items-center justify-center transition-colors ${
                  isDarkMode
                    ? 'border-zinc-800 bg-zinc-950 group-hover:border-cyan-500/50'
                    : 'border-slate-200 bg-white group-hover:border-indigo-400'
                }`}
              >
                <ShieldCheck className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
              </div>
              <span
                className={`text-[11px] font-black uppercase tracking-[0.3em] transition-colors ${
                  isDarkMode
                    ? 'text-white group-hover:text-cyan-400'
                    : 'text-slate-900 group-hover:text-indigo-600'
                }`}
              >
                CrisPRO
              </span>
            </Link>
            <span className={`h-6 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'}`} />
            <div>
              <div
                className={`text-lg font-black tracking-[0.3em] uppercase ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                Target Lock · Brain-Met
              </div>
              <div
                className={`text-[10px] font-black uppercase tracking-widest mt-0.5 ${
                  isDarkMode ? 'text-zinc-500' : 'text-slate-500'
                }`}
              >
                7-step BrM cascade · WEIGHTS_BRAIN_MET · AUROC {AUROC.primary}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/governance/"
              className={`text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 ${
                isDarkMode ? 'text-zinc-500 hover:text-cyan-400' : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              Governance
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/engine/target-lock/scroll/"
              className={`px-4 py-2 rounded-sm border text-[10px] font-black uppercase tracking-widest transition-colors ${
                isDarkMode
                  ? 'border-zinc-800 bg-zinc-900 text-cyan-400 hover:bg-zinc-800'
                  : 'border-slate-300 bg-white text-indigo-700 hover:bg-slate-100'
              }`}
            >
              Scroll view
            </Link>
          </div>
        </div>
      </header>

      {/* Top rail — consolidated (no flat 01–07 here) */}
      <SurfaceTabs>
        <div
          className={`border-b ${
            isDarkMode ? 'border-white/5 bg-black/20' : 'border-slate-200 bg-white/40'
          }`}
        >
          <div className="max-w-[1600px] mx-auto px-8 flex overflow-x-auto scrollbar-hide">
            {TOP_TABS.map((t) => {
              const isActive = t.key === topTab;
              const Icon = t.icon;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTopTab(t.key)}
                  className={`relative flex items-center gap-3 px-5 py-4 border-r transition-all whitespace-nowrap ${
                    isDarkMode ? 'border-white/5' : 'border-slate-200'
                  } ${
                    isActive
                      ? isDarkMode
                        ? 'bg-cyan-500/5 text-cyan-400'
                        : 'bg-indigo-50 text-indigo-700'
                      : isDarkMode
                        ? 'text-zinc-500 hover:text-white hover:bg-white/5'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{t.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="tl-tab-underline"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                        isDarkMode
                          ? 'bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.6)]'
                          : 'bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.4)]'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </SurfaceTabs>

      <div
        className={`border-b ${
          isDarkMode ? 'border-white/5 bg-zinc-950/40' : 'border-slate-200 bg-white/60'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-8 py-4 flex items-center justify-between gap-6">
          <div className={`text-[12px] leading-relaxed max-w-3xl ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
            <span
              className={`font-black uppercase tracking-widest mr-3 ${
                isDarkMode ? 'text-cyan-400' : 'text-indigo-700'
              }`}
            >
              {topMeta?.label}
            </span>
            {stripCopy}
          </div>
          <Link
            href="/products/interception/"
            className={`text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 flex-shrink-0 ${
              isDarkMode ? 'text-zinc-500 hover:text-cyan-400' : 'text-slate-500 hover:text-indigo-600'
            }`}
          >
            Interception product
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${topTab}-${topTab === 'score' ? stepSlug : ''}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {topTab === 'score' ? (
              <ScoreThisStepPanel
                step={step}
                onStepChange={setStepSlug}
                selectedGene={scoreGene}
                onSelectGene={setScoreGene}
                isDarkMode={isDarkMode}
              />
            ) : topTab === 'assassin' ? (
              <AssassinPanel isDarkMode={isDarkMode} />
            ) : topTab === 'mission' ? (
              <MissionFitPanel isDarkMode={isDarkMode} />
            ) : topTab === 'variants' ? (
              <VariantsPanel isDarkMode={isDarkMode} />
            ) : topTab === 'scoring' ? (
              <ScoringPanel isDarkMode={isDarkMode} />
            ) : topTab === 'structures' ? (
              <StructureGallerySection isDarkMode={isDarkMode} />
            ) : (
              <NextStepsPanel isDarkMode={isDarkMode} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer
        className={`border-t ${
          isDarkMode ? 'border-white/5 bg-black/40' : 'border-slate-200 bg-white/80'
        } mt-8`}
      >
        <div
          className={`max-w-[1600px] mx-auto px-8 py-6 flex items-center justify-between text-[9px] font-black uppercase tracking-widest ${
            isDarkMode ? 'text-zinc-600' : 'text-slate-500'
          }`}
        >
          <span>
            L1 Target Lock · brain-met · {BRM_STEPS.length} steps · {LIVE_VARIANTS.length} variants ·
            AUROC {AUROC.primary}
          </span>
          <div className="flex items-center gap-4">
            <Link href="/ledger/" className={isDarkMode ? 'hover:text-cyan-400' : 'hover:text-indigo-600'}>
              Ledger
            </Link>
            <span className={`h-3 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'}`} />
            <Link
              href="/engine/target-lock/workspace/"
              className={isDarkMode ? 'hover:text-cyan-400' : 'hover:text-indigo-600'}
            >
              Workspace
            </Link>
            <span className={`h-3 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'}`} />
            <Link
              href="/products/interception/"
              className={isDarkMode ? 'hover:text-cyan-400' : 'hover:text-indigo-600'}
            >
              Interception
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NotBrainMetGate({
  patient,
  isDarkMode,
  variant,
}: {
  patient: PatientBundle;
  isDarkMode: boolean;
  variant: 'tabs' | 'scroll';
}) {
  const accent = isDarkMode ? 'text-cyan-300' : 'text-indigo-600';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';

  return (
    <div
      className={`min-h-screen font-mono flex items-center justify-center px-6 ${
        isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-slate-50 text-slate-600'
      }`}
    >
      <div className={`max-w-2xl w-full rounded border p-8 ${panel}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-9 h-9 rounded border flex items-center justify-center ${panel}`}>
            <AlertTriangle className={`w-4 h-4 ${accent}`} />
          </div>
          <div>
            <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${accent}`}>
              Not applicable for this patient
            </p>
            <p className={`text-[10px] uppercase tracking-widest mt-0.5 ${textMuted}`}>
              L2 · target-lock · brain-met · {variant}
            </p>
          </div>
        </div>
        <h1 className={`text-xl sm:text-2xl font-black tracking-tight ${textMain}`}>
          The Brain-Met {productFor('cascade')} is scoped to brain-metastasis patients
        </h1>
        <p className={`mt-3 text-sm leading-relaxed ${textMuted}`}>
          {patient.meta.patientId} (
          {patient.tumorContext?.subtype ??
            patient.tumorContext?.cancerType ??
            patient.meta.displayName ??
            'unknown case'}
          ) does not carry a Brain-Met {productFor('brm_step').toLowerCase()} anchor. This L2 engine
          renders the 7-step BrM invasion cascade and its live variant scoring — it only makes sense
          for a brain-metastasis case.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href={`/tumor-board/${patient.meta.patientId}`}
            className={`inline-flex items-center gap-1.5 rounded border px-3 py-2 text-[11px] uppercase tracking-widest transition-colors ${
              isDarkMode
                ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/20'
                : 'border-indigo-400 bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            ← Back to {patient.meta.patientId} board
            <ArrowRight className="w-3 h-3" />
          </Link>
          <Link
            href="/tumor-board/BM01"
            className={`inline-flex items-center gap-1.5 rounded border px-3 py-2 text-[11px] uppercase tracking-widest transition-colors ${panel} ${textMuted} ${
              isDarkMode
                ? 'hover:text-cyan-200 hover:border-cyan-500/40'
                : 'hover:text-indigo-700 hover:border-indigo-300'
            }`}
          >
            View BM01 (the anchor case)
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
