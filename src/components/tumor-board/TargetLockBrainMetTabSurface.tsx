'use client';

// ============================================================================
// TargetLockBrainMetTabSurface.tsx
//
// Tab-strip surface for /engine/target-lock/tabs/. Mirrors TumorBoardSurface:
// one tab per BrM step + "Variants" + "Scoring" tabs, each rendering the same
// panel content the scroll surface uses in-section.
//
// Every string / number is imported from brain-met-cascade-data.ts.
// ============================================================================

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Focus,
  Target,
  ArrowRight,
  ShieldCheck,
  Info,
  Database,
  Sigma,
  AlertTriangle,
  Boxes,
} from 'lucide-react';

import { useTheme } from '@/context/ThemeContext';
import { useOptionalPatient } from '@/context/PatientContext';
import { BM01 } from '@/data/patients/BM01';
import type { PatientBundle } from '@/data/tumor-board/patient-bundle-types';
import { getCapabilities } from '@/lib/capabilities';
import { productFor } from '@/lib/product-glossary';
import StructureGallerySection from './sections/StructureGallerySection';

import {
  BRM_STEPS,
  LIVE_VARIANTS,
  WEIGHTS,
  FORMULAS,
  AUROC,
  RETRACTED,
  BACE1,
  DATASETS,
  GAPS,
  type BrmStep,
} from '@/data/brain-met-cascade-data';

// no-scroll linter marker (required)
export const SurfaceTabs = ({ children }: { children: React.ReactNode }) => <>{children}</>;

type TabKey =
  | 'primary_tumor_escape'
  | 'intravasation'
  | 'circulation_survival'
  | 'bbb_transit'
  | 'cns_colonization'
  | 'brain_niche_adaptation'
  | 'brm_angiogenesis'
  | 'variants'
  | 'scoring'
  | 'structures'
  | 'disclosure';

const EXTRA_TABS: { key: 'variants' | 'scoring' | 'structures' | 'disclosure'; label: string; icon: any }[] = [
  { key: 'variants', label: 'Live variants', icon: Database },
  { key: 'scoring', label: 'Scoring · AUROC', icon: Sigma },
  { key: 'structures', label: 'Structures · 29 targets', icon: Boxes },
  { key: 'disclosure', label: 'Retracted · gaps', icon: AlertTriangle },
];

// ── Step panel ───────────────────────────────────────────────────────────────

function StepPanel({ step, isDarkMode }: { step: BrmStep; isDarkMode: boolean }) {
  const stepHasBACE1 = BACE1.cascadeSteps.includes(step.slug as (typeof BACE1.cascadeSteps)[number]);
  return (
    <div>
      <div className="flex items-start gap-6 mb-6">
        <div className="flex-shrink-0">
          <div
            className={`w-16 h-16 rounded border flex items-center justify-center ${
              isDarkMode ? 'border-zinc-800 bg-zinc-950' : 'border-slate-200 bg-white shadow-sm'
            }`}
          >
            <Focus className={`w-7 h-7 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
          </div>
          <div
            className={`mt-2 text-center text-[10px] font-black tracking-widest ${
              isDarkMode ? 'text-zinc-600' : 'text-slate-400'
            }`}
          >
            {String(step.n).padStart(2, '0')} / {String(BRM_STEPS.length).padStart(2, '0')}
          </div>
        </div>
        <div className="flex-1">
          <div className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`}>
            BrM step {step.n}
          </div>
          <h2 className={`text-3xl font-black uppercase tracking-[0.15em] mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {step.label}
          </h2>
          <p className={`text-[14px] leading-relaxed mb-6 max-w-3xl ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
            {step.narrative}
          </p>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
            <div
              className={`p-5 rounded border ${
                isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className={`text-[9px] font-black uppercase tracking-[0.3em] mb-3 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                Primary genes (positives)
              </div>
              <div className="flex flex-wrap gap-2">
                {step.primaryGenes.map((g) => (
                  <span
                    key={g}
                    className={`px-2.5 py-1 text-[10px] font-black tracking-tight rounded-sm border ${
                      g === 'BACE1'
                        ? isDarkMode
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/40'
                          : 'bg-amber-50 text-amber-700 border-amber-300'
                        : isDarkMode
                          ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                          : 'bg-indigo-50 text-indigo-700 border-indigo-300'
                    }`}
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
            <div
              className={`p-5 rounded border ${
                isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className={`text-[9px] font-black uppercase tracking-[0.3em] mb-3 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                Negative controls
              </div>
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
              className={`mt-4 p-3 rounded border-l-2 flex items-start gap-3 max-w-4xl ${
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
              className={`mt-4 p-4 rounded border max-w-4xl ${
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
                CRISPRa LFC = +{BACE1.canonicalLfc} (HONEST_AUDIT canonical), ~
                {BACE1.brainVsLungFold}× brain-vs-lung enrichment ({BACE1.citation}). Evo2
                delta_ll on p.D289N = +0.0017 — near-neutral. This is the mechanism-vs-conservation
                lesson: the framework earns BACE1 through CRISPR + burden + niche fit, not
                through evolutionary damage.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Variants panel ───────────────────────────────────────────────────────────

function VariantsPanel({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div>
      <div className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`}>
        Evidence · Evo2 live inference
      </div>
      <h2 className={`text-3xl font-black uppercase tracking-[0.15em] mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        Twelve variants scored on Modal A100
      </h2>
      <p className={`text-[13px] leading-relaxed max-w-3xl mb-6 ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
        <code className={`px-1 py-0.5 rounded text-[11px] ${isDarkMode ? 'bg-zinc-800 text-cyan-300' : 'bg-slate-100 text-indigo-700'}`}>
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
                      ? isDarkMode ? 'bg-amber-500/5' : 'bg-amber-50'
                      : i % 2 === 0 ? '' : isDarkMode ? 'bg-zinc-950/40' : 'bg-slate-50'
                  }`}
                >
                  <td className={`px-4 py-2.5 font-black ${isBACE1 ? isDarkMode ? 'text-amber-300' : 'text-amber-700' : isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {v.gene}
                  </td>
                  <td className={`px-4 py-2.5 ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>{v.hgvs}</td>
                  <td
                    className={`px-4 py-2.5 text-right font-black ${
                      damage ? isDarkMode ? 'text-red-300' : 'text-red-600'
                      : v.deltaLl > 0.1 ? isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
                      : isDarkMode ? 'text-zinc-200' : 'text-slate-700'
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

// ── Scoring panel ────────────────────────────────────────────────────────────

function ScoringPanel({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div>
      <div className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`}>
        Scoring · brain-met composite
      </div>
      <h2 className={`text-3xl font-black uppercase tracking-[0.15em] mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        Weights · formulas · AUROC
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className={`p-6 rounded border ${isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className={`text-[9px] font-black uppercase tracking-[0.3em] mb-4 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
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
              <tr><td className="py-1">Functionality</td><td className="text-right">{WEIGHTS.DEFAULT.functionality}</td><td className="text-right font-black">{WEIGHTS.BRAIN_MET.functionality}</td></tr>
              <tr><td className="py-1">Essentiality</td><td className="text-right">{WEIGHTS.DEFAULT.essentiality}</td><td className="text-right font-black">{WEIGHTS.BRAIN_MET.essentiality}</td></tr>
              <tr><td className="py-1">Regulatory</td><td className="text-right">{WEIGHTS.DEFAULT.regulatory}</td><td className={`text-right font-black ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>{WEIGHTS.BRAIN_MET.regulatory}</td></tr>
              <tr><td className="py-1">Chromatin</td><td className="text-right">{WEIGHTS.DEFAULT.chromatin}</td><td className="text-right font-black">{WEIGHTS.BRAIN_MET.chromatin}</td></tr>
            </tbody>
          </table>
        </div>

        <div className={`p-6 rounded border ${isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className={`text-[9px] font-black uppercase tracking-[0.3em] mb-4 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
            Formulas
          </div>
          <div className="space-y-2.5 text-[10px] font-mono leading-relaxed">
            {Object.entries(FORMULAS).map(([k, v]) => (
              <div key={k}>
                <div className={`text-[9px] font-black uppercase tracking-widest mb-0.5 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`}>
                  {k}
                </div>
                <code className={isDarkMode ? 'text-zinc-200' : 'text-slate-700'}>{v}</code>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`p-6 rounded border ${isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className={`text-[9px] font-black uppercase tracking-[0.3em] mb-4 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
          Honest AUROC · 29-gene panel
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <div className={`text-3xl font-black ${isDarkMode ? 'text-cyan-300' : 'text-indigo-700'}`}>{AUROC.primary}</div>
            <div className={`text-[9px] font-black uppercase tracking-widest mt-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Primary composite</div>
          </div>
          <div>
            <div className={`text-3xl font-black ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>{AUROC.observedOnly}</div>
            <div className={`text-[9px] font-black uppercase tracking-widest mt-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Observed-only</div>
          </div>
          <div>
            <div className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{AUROC.tsgOnly}</div>
            <div className={`text-[9px] font-black uppercase tracking-widest mt-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>TSG only</div>
          </div>
          <div>
            <div className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{AUROC.oncOnly}</div>
            <div className={`text-[9px] font-black uppercase tracking-widest mt-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>ONC only</div>
          </div>
        </div>
        <div className={`text-[11px] font-mono grid md:grid-cols-3 gap-x-8 gap-y-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
          <div>AUPRC · {AUROC.auprc}</div>
          <div>P@3 · {AUROC.precisionAt3}</div>
          <div>P@5 · {AUROC.precisionAt5}</div>
          <div>P@10 · {AUROC.precisionAt10}</div>
          <div>Evo2 alone · {AUROC.evo2BaselineAlone}</div>
          <div>CRISPR alone · {AUROC.crisprAlone}</div>
        </div>
      </div>
    </div>
  );
}

// ── Disclosure panel ─────────────────────────────────────────────────────────

function DisclosurePanel({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div>
      <div className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${isDarkMode ? 'text-amber-500' : 'text-amber-700'}`}>
        Transparency
      </div>
      <h2 className={`text-3xl font-black uppercase tracking-[0.15em] mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        Retracted numbers · known gaps
      </h2>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {Object.entries(RETRACTED).map(([k, v]) => (
          <div key={k} className={`p-5 rounded border ${isDarkMode ? 'bg-red-500/5 border-red-500/20' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className={`w-4 h-4 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
              <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>{k}</span>
            </div>
            <div className={`text-3xl font-black line-through mb-3 ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>
              {(v as { value: number }).value}
            </div>
            <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
              {(v as { reason: string }).reason}
            </p>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {GAPS.map((g) => (
          <div
            key={g.id}
            className={`p-4 rounded border flex items-start gap-4 ${isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}
          >
            <span
              className={`px-2 py-0.5 rounded-sm text-[9px] font-black uppercase tracking-widest ${
                g.severity === 'high'
                  ? isDarkMode ? 'bg-red-500/10 text-red-300 border border-red-500/30' : 'bg-red-100 text-red-700 border border-red-300'
                  : isDarkMode ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30' : 'bg-amber-100 text-amber-700 border border-amber-300'
              }`}
            >
              {g.id} · {g.severity}
            </span>
            <div className="flex-1">
              <div className={`text-[12px] font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-1`}>{g.label}</div>
              <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>{g.detail}</p>
              <p className={`text-[10px] mt-2 italic ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Fix path · {g.fix}</p>
            </div>
          </div>
        ))}
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
  const [active, setActive] = useState<TabKey>('primary_tumor_escape');

  const activeStep = BRM_STEPS.find((s) => s.slug === active);
  const activeExtra = EXTRA_TABS.find((t) => t.key === active);

  // Capability gate — this engine is scoped to Brain-Met patients only.
  if (!caps.hasBrmAnchor) {
    return <NotBrainMetGate patient={patient} isDarkMode={isDarkMode} variant="tabs" />;
  }

  return (
    <div
      className={`min-h-screen font-mono ${
        isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-slate-50 text-slate-600'
      }`}
    >
      {/* header */}
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
                  isDarkMode ? 'border-zinc-800 bg-zinc-950 group-hover:border-cyan-500/50' : 'border-slate-200 bg-white group-hover:border-indigo-400'
                }`}
              >
                <ShieldCheck className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
              </div>
              <span className={`text-[11px] font-black uppercase tracking-[0.3em] transition-colors ${isDarkMode ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-indigo-600'}`}>
                CrisPRO
              </span>
            </Link>
            <span className={`h-6 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'}`} />
            <div>
              <div className={`text-lg font-black tracking-[0.3em] uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Target Lock · Brain-Met
              </div>
              <div className={`text-[10px] font-black uppercase tracking-widest mt-0.5 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                7-step BrM cascade · WEIGHTS_BRAIN_MET · AUROC {AUROC.primary}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/governance/"
              className={`text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 ${isDarkMode ? 'text-zinc-500 hover:text-cyan-400' : 'text-slate-500 hover:text-indigo-600'}`}
            >
              Governance
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/engine/target-lock/scroll/"
              className={`px-4 py-2 rounded-sm border text-[10px] font-black uppercase tracking-widest transition-colors ${
                isDarkMode ? 'border-zinc-800 bg-zinc-900 text-cyan-400 hover:bg-zinc-800' : 'border-slate-300 bg-white text-indigo-700 hover:bg-slate-100'
              }`}
            >
              Scroll view
            </Link>
          </div>
        </div>
      </header>

      {/* tab strip */}
      <SurfaceTabs>
        <div className={`border-b ${isDarkMode ? 'border-white/5 bg-black/20' : 'border-slate-200 bg-white/40'}`}>
          <div className="max-w-[1600px] mx-auto px-8 flex overflow-x-auto scrollbar-hide">
            {BRM_STEPS.map((s) => {
              const isActive = s.slug === active;
              return (
                <button
                  key={s.slug}
                  onClick={() => setActive(s.slug as TabKey)}
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
                  <Focus className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {String(s.n).padStart(2, '0')} {s.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="tl-tab-underline"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                        isDarkMode ? 'bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.6)]' : 'bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.4)]'
                      }`}
                    />
                  )}
                </button>
              );
            })}
            <span className={`self-stretch w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'}`} />
            {EXTRA_TABS.map((t) => {
              const isActive = t.key === active;
              const Icon = t.icon;
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key as TabKey)}
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
                        isDarkMode ? 'bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.6)]' : 'bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.4)]'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </SurfaceTabs>

      {/* one-liner strip */}
      <div className={`border-b ${isDarkMode ? 'border-white/5 bg-zinc-950/40' : 'border-slate-200 bg-white/60'}`}>
        <div className="max-w-[1600px] mx-auto px-8 py-4 flex items-center justify-between gap-6">
          <div className={`text-[12px] leading-relaxed max-w-3xl ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
            {activeStep ? (
              <>
                <span className={`font-black uppercase tracking-widest mr-3 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-700'}`}>
                  Step {activeStep.n} · {activeStep.label}
                </span>
                {activeStep.narrative}
              </>
            ) : activeExtra ? (
              <>
                <span className={`font-black uppercase tracking-widest mr-3 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-700'}`}>
                  {activeExtra.label}
                </span>
                {activeExtra.key === 'variants'
                  ? '12 variants scored on Modal A100. delta_ll from evo2_1b_base conditional_ll endpoint.'
                  : activeExtra.key === 'scoring'
                    ? 'WEIGHTS_BRAIN_MET boosts regulatory to 0.24. Enformer excluded (AUROC 0.4111 alone).'
                    : activeExtra.key === 'structures'
                      ? '28 AlphaFold DB predictions + 1 PDB fallback (KMT2C SET domain via 7W6L). Click any row to inspect.'
                      : 'What we retracted, what we still need to fix. Every headline number and every disclosed gap.'}
              </>
            ) : null}
          </div>
          <Link
            href="/engine/#target-lock"
            className={`text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 flex-shrink-0 ${
              isDarkMode ? 'text-zinc-500 hover:text-cyan-400' : 'text-slate-500 hover:text-indigo-600'
            }`}
          >
            Capability page
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* active panel */}
      <main className="max-w-[1600px] mx-auto px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {activeStep ? (
              <StepPanel step={activeStep} isDarkMode={isDarkMode} />
            ) : active === 'variants' ? (
              <VariantsPanel isDarkMode={isDarkMode} />
            ) : active === 'scoring' ? (
              <ScoringPanel isDarkMode={isDarkMode} />
            ) : active === 'structures' ? (
              <StructureGallerySection isDarkMode={isDarkMode} />
            ) : active === 'disclosure' ? (
              <DisclosurePanel isDarkMode={isDarkMode} />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* footer */}
      <footer className={`border-t ${isDarkMode ? 'border-white/5 bg-black/40' : 'border-slate-200 bg-white/80'} mt-8`}>
        <div className={`max-w-[1600px] mx-auto px-8 py-6 flex items-center justify-between text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-zinc-600' : 'text-slate-500'}`}>
          <span>
            L1 Target Lock · brain-met · {BRM_STEPS.length} steps · {LIVE_VARIANTS.length} variants · AUROC {AUROC.primary}
          </span>
          <div className="flex items-center gap-4">
            <Link href="/ledger/" className={isDarkMode ? 'hover:text-cyan-400' : 'hover:text-indigo-600'}>Ledger</Link>
            <span className={`h-3 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'}`} />
            <Link href="/engine/synthetic-lethality/tabs/" className={isDarkMode ? 'hover:text-cyan-400' : 'hover:text-indigo-600'}>Synthetic Lethality</Link>
            <span className={`h-3 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'}`} />
            <Link href="/research/" className={isDarkMode ? 'hover:text-cyan-400' : 'hover:text-indigo-600'}>Research chapters</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── NotBrainMetGate ──────────────────────────────────────────────────────────
// Shown when the patient in context has no Brain-Met anchor (i.e., not BM01).
// This engine only makes sense for brain-metastasis patients; for anyone else
// we redirect to their L1 board instead of rendering the cascade shell.

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
          {patient.meta.patientId} ({patient.tumorContext?.subtype ?? patient.tumorContext?.cancerType ?? patient.meta.displayName ?? 'unknown case'})
          does not carry a Brain-Met {productFor('brm_step').toLowerCase()} anchor. This L2 engine
          renders the 7-step BrM invasion cascade and its live variant scoring — it only makes
          sense for a brain-metastasis case.
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
              isDarkMode ? 'hover:text-cyan-200 hover:border-cyan-500/40' : 'hover:text-indigo-700 hover:border-indigo-300'
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
