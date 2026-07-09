'use client';

// ============================================================================
// TargetLockBrainMetScrollSurface.tsx
//
// Long-scroll surface for /engine/target-lock/scroll/. Mirrors the visual
// language of ScrollBoardSurface: DNAHero first, then one full-width section
// per BrM cascade step, then a live-variant table, then formulas and honest
// AUROC diagnostics.
//
// All numbers are imported from brain-met-cascade-data.ts and anchored to
// /mnt/results/audits/w7a_numeric_ground_truth.json.
// ============================================================================

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Target,
  ArrowRight,
  ArrowUp,
  ShieldCheck,
  Focus,
  Info,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';

import { useTheme } from '@/context/ThemeContext';
import DNAHero from './shared/DNAHero';

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
} from '@/data/brain-met-cascade-data';

// ── Themed atoms ─────────────────────────────────────────────────────────────

function TL({
  isDarkMode,
  darkClass,
  lightClass,
  children,
  as: As = 'span',
  className = '',
}: {
  isDarkMode: boolean;
  darkClass: string;
  lightClass: string;
  children: React.ReactNode;
  as?: any;
  className?: string;
}) {
  return (
    <As className={`${isDarkMode ? darkClass : lightClass} ${className}`}>
      {children}
    </As>
  );
}

// ── Step section ─────────────────────────────────────────────────────────────

function StepSection({
  step,
  isDarkMode,
}: {
  step: typeof BRM_STEPS[number];
  isDarkMode: boolean;
}) {
  const stepBACE1 = BACE1.cascadeSteps.includes(step.slug as (typeof BACE1.cascadeSteps)[number]);
  return (
    <section
      id={step.slug}
      className={`max-w-[1600px] mx-auto px-8 py-16 border-t ${
        isDarkMode ? 'border-white/5' : 'border-slate-200'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="flex items-start gap-6 mb-6"
      >
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
          <div
            className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${
              isDarkMode ? 'text-cyan-500' : 'text-indigo-600'
            }`}
          >
            BrM step {step.n}
          </div>
          <h2
            className={`text-3xl font-black uppercase tracking-[0.15em] mb-3 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            {step.label}
          </h2>
          <p
            className={`text-[14px] leading-relaxed mb-6 max-w-3xl ${
              isDarkMode ? 'text-zinc-300' : 'text-slate-600'
            }`}
          >
            {step.narrative}
          </p>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
            <div
              className={`p-5 rounded border ${
                isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div
                className={`text-[9px] font-black uppercase tracking-[0.3em] mb-3 ${
                  isDarkMode ? 'text-zinc-500' : 'text-slate-400'
                }`}
              >
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
              <div
                className={`text-[9px] font-black uppercase tracking-[0.3em] mb-3 ${
                  isDarkMode ? 'text-zinc-500' : 'text-slate-400'
                }`}
              >
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

          {stepBACE1 && (
            <div
              className={`mt-4 p-4 rounded border max-w-4xl ${
                isDarkMode
                  ? 'bg-amber-500/5 border-amber-500/40'
                  : 'bg-amber-50 border-amber-300'
              }`}
            >
              <div
                className={`text-[9px] font-black uppercase tracking-[0.3em] mb-2 ${
                  isDarkMode ? 'text-amber-300' : 'text-amber-700'
                }`}
              >
                BACE1 · centerpiece target · at this step
              </div>
              <p
                className={`text-[11px] leading-relaxed ${
                  isDarkMode ? 'text-amber-100/90' : 'text-amber-900'
                }`}
              >
                BACE1 is present at 3 of the 7 steps ({BACE1.cascadeSteps.join(', ')}). This
                multi-step footprint is what drives its rank despite the near-neutral Evo2
                delta_ll of +0.0017 on p.D289N. CRISPRa LFC = +{BACE1.canonicalLfc} (HONEST_AUDIT),
                brain-vs-lung ~{BACE1.brainVsLungFold}× enrichment (Chafe et al. 2025 STM).
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

// ── Variant table section ────────────────────────────────────────────────────

function VariantTableSection({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <section
      id="variants"
      className={`max-w-[1600px] mx-auto px-8 py-16 border-t ${
        isDarkMode ? 'border-white/5' : 'border-slate-200'
      }`}
    >
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
      <p
        className={`text-[13px] leading-relaxed max-w-3xl mb-6 ${
          isDarkMode ? 'text-zinc-300' : 'text-slate-600'
        }`}
      >
        <code
          className={`px-1 py-0.5 rounded text-[11px] ${
            isDarkMode ? 'bg-zinc-800 text-cyan-300' : 'bg-slate-100 text-indigo-700'
          }`}
        >
          evo2_1b_base
        </code>{' '}
        via the <code>conditional_ll</code> endpoint. 8192bp context, variant at index 4095,
        forward-strand GRCh38 Ensembl. Timestamp{' '}
        <code className="text-[11px]">2026-03-28T04:05:01Z</code>. These are the raw signals fed
        to the Functionality feature <code>F(delta_ll) = 1 / (1 + exp(delta_ll / 0.5))</code>.
      </p>
      <div
        className={`rounded border overflow-x-auto ${
          isDarkMode ? 'border-zinc-800' : 'border-slate-200'
        }`}
      >
        <table className="w-full text-[11px] font-mono">
          <thead
            className={`${
              isDarkMode ? 'bg-zinc-950 text-zinc-400' : 'bg-slate-100 text-slate-500'
            }`}
          >
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
                  className={`border-t ${
                    isDarkMode ? 'border-zinc-900' : 'border-slate-100'
                  } ${
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
                  <td className={`px-4 py-2.5 ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>
                    {v.hgvs}
                  </td>
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
                  <td className={`px-4 py-2.5 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                    {v.cohortSource}
                  </td>
                  <td className={`px-4 py-2.5 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                    {v.note}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ── Formula + AUROC section ─────────────────────────────────────────────────

function FormulaAurocSection({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <section
      id="scoring"
      className={`max-w-[1600px] mx-auto px-8 py-16 border-t ${
        isDarkMode ? 'border-white/5' : 'border-slate-200'
      }`}
    >
      <div
        className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${
          isDarkMode ? 'text-cyan-500' : 'text-indigo-600'
        }`}
      >
        Scoring
      </div>
      <h2
        className={`text-3xl font-black uppercase tracking-[0.15em] mb-3 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}
      >
        Target Lock · brain-met weight set
      </h2>
      <p
        className={`text-[13px] leading-relaxed max-w-3xl mb-8 ${
          isDarkMode ? 'text-zinc-300' : 'text-slate-600'
        }`}
      >
        Brain-met weights boost regulatory from 0.20 → 0.24 (BBB transit involves splice
        isoforms). Chromatin held at 0.10 (ablation cost −0.013 AUROC). Enformer excluded from
        the composite because the endpoint returned near-constant values regardless of sequence
        (AUROC 0.4111 alone).
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
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
            Weight sets
          </div>
          <table className="w-full text-[11px] font-mono">
            <thead>
              <tr>
                <th className={`text-left pb-2 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                  Weight
                </th>
                <th className={`text-right pb-2 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                  Default
                </th>
                <th className={`text-right pb-2 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`}>
                  Brain-met
                </th>
              </tr>
            </thead>
            <tbody className={isDarkMode ? 'text-zinc-300' : 'text-slate-700'}>
              <tr>
                <td className="py-1">Functionality</td>
                <td className="text-right py-1">{WEIGHTS.DEFAULT.functionality}</td>
                <td className="text-right py-1 font-black">{WEIGHTS.BRAIN_MET.functionality}</td>
              </tr>
              <tr>
                <td className="py-1">Essentiality</td>
                <td className="text-right py-1">{WEIGHTS.DEFAULT.essentiality}</td>
                <td className="text-right py-1 font-black">{WEIGHTS.BRAIN_MET.essentiality}</td>
              </tr>
              <tr>
                <td className="py-1">Regulatory</td>
                <td className="text-right py-1">{WEIGHTS.DEFAULT.regulatory}</td>
                <td
                  className={`text-right py-1 font-black ${
                    isDarkMode ? 'text-amber-300' : 'text-amber-700'
                  }`}
                >
                  {WEIGHTS.BRAIN_MET.regulatory}
                </td>
              </tr>
              <tr>
                <td className="py-1">Chromatin</td>
                <td className="text-right py-1">{WEIGHTS.DEFAULT.chromatin}</td>
                <td className="text-right py-1 font-black">{WEIGHTS.BRAIN_MET.chromatin}</td>
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
          <div className="space-y-3 text-[10px] font-mono leading-relaxed">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <div
              className={`text-3xl font-black ${
                isDarkMode ? 'text-cyan-300' : 'text-indigo-700'
              }`}
            >
              {AUROC.primary}
            </div>
            <div
              className={`text-[9px] font-black uppercase tracking-widest mt-1 ${
                isDarkMode ? 'text-zinc-500' : 'text-slate-500'
              }`}
            >
              Primary composite
            </div>
            <div className={`text-[10px] mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
              {AUROC.primaryLabel}
            </div>
          </div>
          <div>
            <div
              className={`text-3xl font-black ${
                isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
              }`}
            >
              {AUROC.observedOnly}
            </div>
            <div
              className={`text-[9px] font-black uppercase tracking-widest mt-1 ${
                isDarkMode ? 'text-zinc-500' : 'text-slate-500'
              }`}
            >
              Observed-only upper bound
            </div>
            <div className={`text-[10px] mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
              {AUROC.observedOnlyLabel}
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
              TSG-only AUROC
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
              ONC-only AUROC
            </div>
          </div>
        </div>
        <div
          className={`text-[11px] font-mono grid md:grid-cols-2 gap-x-8 gap-y-1 ${
            isDarkMode ? 'text-zinc-400' : 'text-slate-600'
          }`}
        >
          <div>AUPRC · {AUROC.auprc}</div>
          <div>Precision@3 · {AUROC.precisionAt3}</div>
          <div>Precision@5 · {AUROC.precisionAt5}</div>
          <div>Precision@10 · {AUROC.precisionAt10}</div>
          <div>Evo2 baseline alone · {AUROC.evo2BaselineAlone}</div>
          <div>CRISPR alone · {AUROC.crisprAlone}</div>
        </div>
      </div>
    </section>
  );
}

// ── Retracted / disclosure section ──────────────────────────────────────────

function DisclosureSection({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <section
      id="disclosure"
      className={`max-w-[1600px] mx-auto px-8 py-16 border-t ${
        isDarkMode ? 'border-white/5' : 'border-slate-200'
      }`}
    >
      <div
        className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${
          isDarkMode ? 'text-amber-500' : 'text-amber-700'
        }`}
      >
        Transparency · retracted numbers
      </div>
      <h2
        className={`text-3xl font-black uppercase tracking-[0.15em] mb-3 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}
      >
        What we no longer cite, and why
      </h2>
      <p
        className={`text-[13px] leading-relaxed max-w-3xl mb-8 ${
          isDarkMode ? 'text-zinc-300' : 'text-slate-600'
        }`}
      >
        The framework retracted three headline numbers after the honest audit. They stay here
        so the trajectory is visible and no one can accidentally re-cite them from an older
        deck.
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {Object.entries(RETRACTED).map(([k, v]) => (
          <div
            key={k}
            className={`p-5 rounded border ${
              isDarkMode
                ? 'bg-red-500/5 border-red-500/20'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle
                className={`w-4 h-4 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}
              />
              <span
                className={`text-[9px] font-black uppercase tracking-[0.3em] ${
                  isDarkMode ? 'text-red-300' : 'text-red-700'
                }`}
              >
                {k}
              </span>
            </div>
            <div
              className={`text-3xl font-black line-through mb-3 ${
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

      <div className={`text-[10px] font-black uppercase tracking-[0.3em] mb-3 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
        Gap disclosures
      </div>
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
              <div className={`text-[12px] font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} mb-1`}>
                {g.label}
              </div>
              <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
                {g.detail}
              </p>
              <p
                className={`text-[10px] mt-2 italic ${
                  isDarkMode ? 'text-zinc-500' : 'text-slate-500'
                }`}
              >
                Fix path · {g.fix}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Datasets closer ─────────────────────────────────────────────────────────

function DatasetSection({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <section
      id="datasets"
      className={`max-w-[1600px] mx-auto px-8 py-16 border-t ${
        isDarkMode ? 'border-white/5' : 'border-slate-200'
      }`}
    >
      <div
        className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${
          isDarkMode ? 'text-cyan-500' : 'text-indigo-600'
        }`}
      >
        Data provenance
      </div>
      <h2
        className={`text-3xl font-black uppercase tracking-[0.15em] mb-6 ${
          isDarkMode ? 'text-white' : 'text-slate-900'
        }`}
      >
        Four datasets · four evidence streams
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {DATASETS.map((d) => (
          <div
            key={d.accession}
            className={`p-5 rounded border ${
              isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div
              className={`text-[9px] font-black uppercase tracking-[0.3em] mb-2 ${
                isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
              }`}
            >
              {d.accession}
            </div>
            <div
              className={`text-[12px] font-black mb-2 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              {d.role}
            </div>
            <p className={`text-[11px] leading-relaxed mb-3 ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
              {d.detail}
            </p>
            <div
              className={`text-[10px] italic ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}
            >
              {d.reference}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Surface ──────────────────────────────────────────────────────────────────

export default function TargetLockBrainMetScrollSurface() {
  const { isDarkMode } = useTheme();

  return (
    <div
      id="top"
      className={`${
        isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-slate-50 text-slate-600'
      } font-mono`}
    >
      {/* fixed nav bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md ${
          isDarkMode ? 'border-white/5 bg-black/60' : 'border-slate-200 bg-white/80'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className={`w-8 h-8 rounded border flex items-center justify-center transition-colors ${
                isDarkMode
                  ? 'border-zinc-800 bg-zinc-950 group-hover:border-cyan-500/50'
                  : 'border-slate-200 bg-white group-hover:border-indigo-400'
              }`}
            >
              <ShieldCheck
                className={`w-3.5 h-3.5 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}
              />
            </div>
            <span
              className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${
                isDarkMode ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-indigo-600'
              }`}
            >
              CrisPRO · target lock · brain-met
            </span>
          </Link>
          <div className="flex items-center gap-6">
            {BRM_STEPS.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                title={s.label}
                className={`text-[9px] font-black uppercase tracking-widest transition-colors ${
                  isDarkMode ? 'text-zinc-500 hover:text-cyan-400' : 'text-slate-500 hover:text-indigo-600'
                }`}
              >
                {String(s.n).padStart(2, '0')}
              </a>
            ))}
            <span
              className={`h-4 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'}`}
            />
            <Link
              href="/engine/target-lock/tabs/"
              className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors ${
                isDarkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-indigo-600 hover:text-indigo-700'
              }`}
            >
              Tab view
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>

      {/* DNA hero */}
      <div className="pt-16">
        <DNAHero />
      </div>

      {/* hero blurb */}
      <section
        className={`max-w-[1600px] mx-auto px-8 py-16 border-t ${
          isDarkMode ? 'border-white/5' : 'border-slate-200'
        }`}
      >
        <div className="flex items-center gap-3 mb-3">
          <Target className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
          <span
            className={`text-[10px] font-black uppercase tracking-[0.3em] ${
              isDarkMode ? 'text-cyan-500' : 'text-indigo-600'
            }`}
          >
            L1 Target Lock · brain-met cascade
          </span>
        </div>
        <h1
          className={`text-4xl font-black uppercase tracking-[0.15em] mb-4 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          Seven steps to a brain metastasis.
          <br />
          One score per candidate.
        </h1>
        <p
          className={`text-[14px] leading-relaxed max-w-3xl mb-6 ${
            isDarkMode ? 'text-zinc-300' : 'text-slate-600'
          }`}
        >
          The framework maps every candidate against the 7-step BrM cascade, scores per-variant
          Evo2 log-likelihood on Modal A100, combines with GSE237446 CRISPRa and GSE205033 ATAC
          in a class-aware TSG/ONC composite, and gates on MSK-MET burden and GTEx safety.
          Honest headline: AUROC = <strong>{AUROC.primary}</strong> primary,{' '}
          <strong>{AUROC.observedOnly}</strong> upper bound. Enformer excluded because its
          endpoint returned near-constant values regardless of sequence.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#primary_tumor_escape"
            className={`px-5 py-2.5 rounded-sm border text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 transition-colors ${
              isDarkMode
                ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20'
                : 'border-indigo-300 bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            Start at step 01
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="#variants"
            className={`px-5 py-2.5 rounded-sm border text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 transition-colors ${
              isDarkMode
                ? 'border-zinc-800 bg-zinc-900 text-cyan-400 hover:bg-zinc-800'
                : 'border-slate-300 bg-white text-indigo-700 hover:bg-slate-100'
            }`}
          >
            See 12 live variants
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="#scoring"
            className={`px-5 py-2.5 rounded-sm border text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 transition-colors ${
              isDarkMode
                ? 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            Formulas + AUROC
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* the 7 steps */}
      {BRM_STEPS.map((s) => (
        <StepSection key={s.slug} step={s} isDarkMode={isDarkMode} />
      ))}

      <VariantTableSection isDarkMode={isDarkMode} />
      <FormulaAurocSection isDarkMode={isDarkMode} />
      <DisclosureSection isDarkMode={isDarkMode} />
      <DatasetSection isDarkMode={isDarkMode} />

      {/* closer */}
      <section
        className={`max-w-[1600px] mx-auto px-8 py-24 border-t text-center ${
          isDarkMode ? 'border-white/5' : 'border-slate-200'
        }`}
      >
        <div
          className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 ${
            isDarkMode ? 'text-cyan-500' : 'text-indigo-600'
          }`}
        >
          Cascade complete
        </div>
        <h2
          className={`text-3xl font-black uppercase tracking-[0.15em] mb-4 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          Seven steps. Three signals. One honest headline.
        </h2>
        <p
          className={`text-[13px] leading-relaxed max-w-2xl mx-auto mb-8 ${
            isDarkMode ? 'text-zinc-400' : 'text-slate-500'
          }`}
        >
          Change the cascade step — the primary genes and negative controls change with it.
          Change the variant — the delta_ll flows through F, E, R, C and back into TL. Change
          the composite — the AUROC number moves. Every arrow is traceable to a receipt.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/engine/target-lock/tabs/"
            className={`px-6 py-3 rounded-sm border text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 transition-colors ${
              isDarkMode
                ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20'
                : 'border-indigo-300 bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            Tab view
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/engine/synthetic-lethality/scroll/"
            className={`px-6 py-3 rounded-sm border text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 transition-colors ${
              isDarkMode
                ? 'border-zinc-800 bg-zinc-900 text-cyan-400 hover:bg-zinc-800'
                : 'border-slate-300 bg-white text-indigo-700 hover:bg-slate-100'
            }`}
          >
            Synthetic Lethality · MBD4
            <ExternalLink className="w-3 h-3" />
          </Link>
          <Link
            href="/governance/"
            className={`px-6 py-3 rounded-sm border text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 transition-colors ${
              isDarkMode
                ? 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Governance
          </Link>
        </div>
        <a
          href="#top"
          className={`mt-12 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest transition-colors ${
            isDarkMode ? 'text-zinc-600 hover:text-cyan-400' : 'text-slate-400 hover:text-indigo-600'
          }`}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <ArrowUp className="w-3 h-3" />
          Back to top
        </a>
      </section>
    </div>
  );
}
