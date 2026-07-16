'use client';

/**
 * BrmPipelineWorkspace — the audited /engine/target-lock/workspace/ surface.
 *
 * What this is:
 *   A stepper over the real 7-step evo2-e2e brain-metastasis pipeline output.
 *   Every value comes from `src/data/evo2/brm_pipeline_20260328T070235Z.json`
 *   via the typed accessors in `src/data/evo2/brm_pipeline.ts`.
 *
 * What replaced:
 *   The old workspace rendered a hand-authored 8-step AF3 teaching visual
 *   (`METASTATIC_CASCADE_STEPS`). That visual is still valid teaching material
 *   for AlphaFold-3 structural context, but it's not the target-lock evidence
 *   the rest of the surface (tabs, scroll, BM01 tumor-board panel) is anchored
 *   to. This workspace now shows the actual pipeline evidence.
 *
 * Layout:
 *   Header:  Overview link  ·  workspace label  ·  run stamps (seed/elapsed/model)
 *   Body  :  Step tab strip  ·  per-step { biology narrative + validation card + gene table }
 *   Overlay: BM01 patient-variant strip (toggleable)
 *   Footer:  Cross-links to /tabs, /scroll, /tumor-board/BM01, receipts
 */

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Target, Beaker, Check, X, Waves, Info } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { TARGET_LOCK_INTRO_PATH } from '@/lib/engine/paths';
import { BRM_STEPS } from '@/data/brain-met-cascade-data';
import {
  BRM_STEP_ORDER,
  BRM_STEP_LABEL,
  getRunInfo,
  getStepMetrics,
  getStepScoresSorted,
  getBm01VariantsForStep,
  BM01_PATIENT_VARIANTS,
} from '@/data/evo2/brm_pipeline';
import type { BrmStepSlug, BrmGeneScore, BrmPatientVariant } from '@/data/evo2/brm_pipeline';

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

function fmtScore(x: number): string {
  return x.toFixed(3);
}

function fmtElapsed(s: number): string {
  const m = Math.floor(s / 60);
  const rem = s - m * 60;
  return m > 0 ? `${m}m ${Math.round(rem)}s` : `${Math.round(s)}s`;
}

function fmtTimestamp(t: string): string {
  // '20260328T070235Z' -> '2026-03-28 07:02:35Z'
  if (t.length !== 16) return t;
  return `${t.slice(0, 4)}-${t.slice(4, 6)}-${t.slice(6, 8)} ${t.slice(9, 11)}:${t.slice(11, 13)}:${t.slice(13, 15)}Z`;
}

function bm01VariantsByGene(): Map<string, BrmPatientVariant> {
  const m = new Map<string, BrmPatientVariant>();
  for (const v of BM01_PATIENT_VARIANTS) m.set(v.gene, v);
  return m;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function BrmPipelineWorkspace() {
  const { isDarkMode } = useTheme();
  const [activeStep, setActiveStep] = useState<BrmStepSlug>('cns_colonization');
  const [bm01Overlay, setBm01Overlay] = useState(true);

  const runInfo = useMemo(() => getRunInfo(), []);
  const stepMetrics = useMemo(() => getStepMetrics(activeStep), [activeStep]);
  const stepScores = useMemo(() => getStepScoresSorted(activeStep), [activeStep]);
  const stepBiology = useMemo(
    () => BRM_STEPS.find((s) => s.slug === activeStep) ?? null,
    [activeStep],
  );
  const bm01ForStep = useMemo(() => getBm01VariantsForStep(activeStep), [activeStep]);
  const bm01GeneMap = useMemo(() => bm01VariantsByGene(), []);

  // Theme tokens
  const bg = isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-white text-slate-600';
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const panelSubtle = isDarkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-slate-50 border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textBody = isDarkMode ? 'text-zinc-300' : 'text-slate-700';
  const textMuted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const borderColor = isDarkMode ? 'border-zinc-800' : 'border-slate-200';

  return (
    <div className={`relative min-h-[calc(100dvh-3.5rem)] font-mono flex flex-col ${bg}`}>
      {/* Grid overlay */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDarkMode
            ? 'bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)]'
            : 'bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)]'
        } bg-[size:48px_48px]`}
      />

      {/* Header */}
      <header
        className={`relative z-10 shrink-0 flex flex-col gap-2 px-4 sm:px-6 py-3 border-b ${borderColor}`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href={TARGET_LOCK_INTRO_PATH}
              className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest shrink-0 ${textMuted} ${
                isDarkMode ? 'hover:text-cyan-400' : 'hover:text-indigo-600'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" aria-hidden />
              Overview
            </Link>
            <div className={`w-9 h-9 rounded border flex items-center justify-center shrink-0 ${panel}`}>
              <Target className={`w-4 h-4 ${accent}`} />
            </div>
            <div className="min-w-0">
              <p className={`text-[9px] font-black uppercase tracking-[0.4em] ${accent}`}>
                Workspace · Evo2 pipeline (audited)
              </p>
              <h1 className={`text-sm sm:text-base font-black uppercase tracking-tight ${textMain}`}>
                Brain-Met Cascade · 7 steps · 29 genes
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setBm01Overlay((v) => !v)}
            className={`hidden sm:inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm border transition-colors shrink-0 ${
              bm01Overlay
                ? isDarkMode
                  ? 'border-cyan-700 bg-cyan-900/20 text-cyan-300'
                  : 'border-indigo-300 bg-indigo-50 text-indigo-700'
                : isDarkMode
                ? 'border-zinc-800 text-zinc-500 hover:border-zinc-700'
                : 'border-slate-200 text-slate-500 hover:border-slate-300'
            }`}
          >
            <Waves className="w-3 h-3" aria-hidden />
            BM01 overlay: {bm01Overlay ? 'on' : 'off'}
          </button>
        </div>

        {/* Run stamps */}
        <div className={`flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono ${textMuted}`}>
          <span>
            timestamp <span className={textBody}>{fmtTimestamp(runInfo.timestamp)}</span>
          </span>
          <span>
            seed <span className={textBody}>{runInfo.seed}</span>
          </span>
          <span>
            elapsed <span className={textBody}>{fmtElapsed(runInfo.elapsedS)}</span>
          </span>
          <span>
            enformer{' '}
            <span className={textBody}>{runInfo.useEnformer ? 'enabled' : 'disabled'}</span>
          </span>
          <span>
            fast_mode <span className={textBody}>{String(runInfo.fastMode)}</span>
          </span>
          <span>
            positives <span className={textBody}>{runInfo.nPositives}</span> · negatives{' '}
            <span className={textBody}>{runInfo.nNegatives}</span>
          </span>
        </div>
      </header>

      {/* Step tab strip */}
      <nav
        className={`relative z-10 shrink-0 flex items-stretch overflow-x-auto border-b ${borderColor}`}
        aria-label="Cascade steps"
      >
        {BRM_STEP_ORDER.map((slug, i) => {
          const active = slug === activeStep;
          const m = getStepMetrics(slug);
          return (
            <button
              key={slug}
              type="button"
              onClick={() => setActiveStep(slug)}
              className={`shrink-0 px-3 sm:px-4 py-2 text-left border-r ${borderColor} transition-colors ${
                active
                  ? isDarkMode
                    ? 'bg-cyan-900/20'
                    : 'bg-indigo-50'
                  : isDarkMode
                  ? 'hover:bg-zinc-900/60'
                  : 'hover:bg-slate-50'
              }`}
            >
              <p
                className={`text-[9px] font-black uppercase tracking-widest ${
                  active ? accent : textMuted
                }`}
              >
                Step {i + 1}
              </p>
              <p
                className={`text-[11px] sm:text-xs font-black uppercase tracking-tight ${
                  active ? textMain : textBody
                }`}
              >
                {BRM_STEP_LABEL[slug]}
              </p>
              {m ? (
                <p className={`text-[9px] font-mono ${textMuted}`}>
                  AUROC {fmtScore(m.auroc)} · npos {m.nPos}/{m.nTotal}
                </p>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Body */}
      <main className="relative z-10 flex-1 min-h-0 px-4 sm:px-6 py-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: biology narrative */}
        <section className={`lg:col-span-4 rounded border p-3 ${panel}`}>
          <p className={`text-[9px] font-black uppercase tracking-widest ${accent}`}>
            Step biology
          </p>
          <h2 className={`mt-1 text-sm font-black uppercase tracking-tight ${textMain}`}>
            {stepBiology?.label ?? BRM_STEP_LABEL[activeStep]}
          </h2>
          {stepBiology?.narrative ? (
            <p className={`mt-2 text-[12px] leading-relaxed ${textBody}`}>{stepBiology.narrative}</p>
          ) : null}

          {stepBiology ? (
            <>
              <div className="mt-3">
                <p className={`text-[9px] font-black uppercase tracking-widest ${textMuted}`}>
                  Ground-truth positives ({stepBiology.primaryGenes.length})
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {stepBiology.primaryGenes.map((g) => (
                    <span
                      key={g}
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded-sm border ${
                        isDarkMode
                          ? 'border-cyan-800 bg-cyan-950/40 text-cyan-300'
                          : 'border-indigo-200 bg-indigo-50 text-indigo-700'
                      }`}
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-3">
                <p className={`text-[9px] font-black uppercase tracking-widest ${textMuted}`}>
                  Hard negatives ({stepBiology.negativeControls.length})
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {stepBiology.negativeControls.map((g) => (
                    <span
                      key={g}
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded-sm border ${
                        isDarkMode
                          ? 'border-zinc-800 bg-zinc-900/40 text-zinc-500'
                          : 'border-slate-200 bg-slate-50 text-slate-500'
                      }`}
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
              {stepBiology.bbbNote ? (
                <div
                  className={`mt-3 rounded border-l-2 px-2 py-1.5 text-[11px] ${
                    isDarkMode
                      ? 'border-cyan-700 bg-cyan-950/20 text-cyan-200'
                      : 'border-indigo-400 bg-indigo-50/60 text-indigo-800'
                  }`}
                >
                  <Info className="inline-block w-3 h-3 mr-1" aria-hidden />
                  {stepBiology.bbbNote}
                </div>
              ) : null}
            </>
          ) : null}

          {/* Legend */}
          <div className={`mt-4 rounded border p-2 ${panelSubtle}`}>
            <p className={`text-[9px] font-black uppercase tracking-widest ${textMuted}`}>
              Column legend
            </p>
            <dl className={`mt-1 space-y-1 text-[10px] font-mono ${textBody}`}>
              <div className="flex gap-2">
                <dt className={`w-20 shrink-0 ${textMuted}`}>target_lock</dt>
                <dd>Rank score after mission-fit weighting. Higher = better lock candidate.</dd>
              </div>
              <div className="flex gap-2">
                <dt className={`w-20 shrink-0 ${textMuted}`}>calibrated</dt>
                <dd>Raw pipeline probability before mission-fit discount.</dd>
              </div>
              <div className="flex gap-2">
                <dt className={`w-20 shrink-0 ${textMuted}`}>label</dt>
                <dd>Ground-truth: 1 = known driver, 0 = hard negative.</dd>
              </div>
              <div className="flex gap-2">
                <dt className={`w-20 shrink-0 ${textMuted}`}>bbb</dt>
                <dd>Blood-brain-barrier relevant flag from the anchor list.</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Middle: validation metrics + table */}
        <section className="lg:col-span-8 flex flex-col gap-3 min-w-0">
          {/* Metrics strip */}
          {stepMetrics ? (
            <div className={`rounded border p-3 ${panel}`}>
              <p className={`text-[9px] font-black uppercase tracking-widest ${accent}`}>
                Validation metrics · this step
              </p>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-5 gap-2">
                <MetricTile
                  label="AUROC"
                  value={fmtScore(stepMetrics.auroc)}
                  isDark={isDarkMode}
                />
                <MetricTile
                  label="AUPRC"
                  value={fmtScore(stepMetrics.auprc)}
                  isDark={isDarkMode}
                />
                <MetricTile
                  label="P@3"
                  value={fmtScore(stepMetrics.precisionAt3)}
                  isDark={isDarkMode}
                />
                <MetricTile
                  label="Positives"
                  value={`${stepMetrics.nPos}`}
                  isDark={isDarkMode}
                />
                <MetricTile
                  label="Total genes"
                  value={`${stepMetrics.nTotal}`}
                  isDark={isDarkMode}
                />
              </div>
            </div>
          ) : null}

          {/* Gene table */}
          <div className={`rounded border ${panel} flex flex-col min-h-0`}>
            <div
              className={`shrink-0 flex items-center justify-between gap-2 px-3 py-2 border-b ${borderColor}`}
            >
              <div>
                <p className={`text-[9px] font-black uppercase tracking-widest ${accent}`}>
                  Target-lock ranking · {stepScores.length} genes
                </p>
                <p className={`text-[10px] ${textMuted}`}>
                  Sorted by target_lock_score DESC. Rows with a BM01 patient variant are highlighted{' '}
                  {bm01Overlay ? '(overlay on)' : '(overlay off)'}.
                </p>
              </div>
              <Beaker className={`w-4 h-4 shrink-0 ${textMuted}`} aria-hidden />
            </div>

            <div className="overflow-auto max-h-[60vh]">
              <table className="w-full text-[11px] font-mono">
                <thead className={`sticky top-0 ${panelSubtle}`}>
                  <tr className={textMuted}>
                    <th className="text-left px-3 py-1.5 font-black uppercase tracking-widest">#</th>
                    <th className="text-left px-3 py-1.5 font-black uppercase tracking-widest">
                      Gene
                    </th>
                    <th className="text-right px-3 py-1.5 font-black uppercase tracking-widest">
                      target_lock
                    </th>
                    <th className="text-right px-3 py-1.5 font-black uppercase tracking-widest">
                      calibrated
                    </th>
                    <th className="text-center px-3 py-1.5 font-black uppercase tracking-widest">
                      label
                    </th>
                    <th className="text-center px-3 py-1.5 font-black uppercase tracking-widest">
                      bbb
                    </th>
                    <th className="text-left px-3 py-1.5 font-black uppercase tracking-widest">
                      flags
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stepScores.map((row, i) => (
                    <GeneRow
                      key={`${row.gene}-${row.step}`}
                      row={row}
                      rank={i + 1}
                      isDark={isDarkMode}
                      bm01Overlay={bm01Overlay}
                      bm01Variant={bm01GeneMap.get(row.gene)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* BM01 patient-variant strip (only when overlay ON and any variant relates to this step) */}
          {bm01Overlay && bm01ForStep.length > 0 ? (
            <div className={`rounded border p-3 ${panel}`}>
              <p className={`text-[9px] font-black uppercase tracking-widest ${accent}`}>
                BM01 · variants scored on Modal (delta-LL)
              </p>
              <p className={`text-[10px] ${textMuted}`}>
                {bm01ForStep.length} of BM01's 4 canonical variants list this step as related.
              </p>
              <ul className="mt-2 space-y-1.5">
                {bm01ForStep.map((v) => (
                  <li
                    key={`${v.gene}-${v.hgvsP}`}
                    className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[11px] ${textBody}`}
                  >
                    <span className={`font-black ${textMain}`}>{v.gene}</span>
                    <span className="font-mono">{v.hgvsP}</span>
                    <span className={`font-mono ${textMuted}`}>ΔLL {v.deltaLL.toFixed(3)}</span>
                    <span className={textMuted}>·</span>
                    <span>{v.interpretation}</span>
                    {v.patientMatch ? (
                      <span
                        className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-sm ${
                          isDarkMode
                            ? 'bg-cyan-900/40 text-cyan-300'
                            : 'bg-indigo-100 text-indigo-700'
                        }`}
                      >
                        BM01 hit
                      </span>
                    ) : (
                      <span
                        className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-sm ${
                          isDarkMode
                            ? 'bg-zinc-800 text-zinc-400'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        control
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      </main>

      {/* Footer: cross-links */}
      <footer
        className={`relative z-10 shrink-0 flex flex-wrap items-center gap-x-3 gap-y-1 px-4 sm:px-6 py-2 border-t ${borderColor}`}
      >
        <span className={`text-[9px] font-black uppercase tracking-widest shrink-0 ${textMuted}`}>
          Cross-links
        </span>
        <FooterLink
          href="/engine/target-lock/tabs"
          label="Tabbed audited view"
          isDark={isDarkMode}
        />
        <FooterLink
          href="/engine/target-lock/scroll"
          label="Scroll audited view"
          isDark={isDarkMode}
        />
        <FooterLink
          href="/tumor-board/BM01"
          label="BM01 tumor board"
          isDark={isDarkMode}
        />
        <FooterLink href="/anchor-audit" label="Anchor audit map" isDark={isDarkMode} />
        <FooterLink
          href="/engine/target-lock/workspace-af3"
          label="AF3 teaching visual"
          isDark={isDarkMode}
        />
        <span className={`text-[9px] ${textMuted} ml-auto`}>
          Source · brm_pipeline_{runInfo.timestamp}.json
        </span>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function MetricTile({
  label,
  value,
  isDark,
}: {
  label: string;
  value: string;
  isDark: boolean;
}) {
  const panelSubtle = isDark ? 'bg-zinc-900/40 border-zinc-800' : 'bg-slate-50 border-slate-200';
  const textMuted = isDark ? 'text-zinc-500' : 'text-slate-500';
  const textMain = isDark ? 'text-zinc-100' : 'text-slate-900';
  return (
    <div className={`rounded border px-2 py-1.5 ${panelSubtle}`}>
      <p className={`text-[9px] font-black uppercase tracking-widest ${textMuted}`}>{label}</p>
      <p className={`text-sm font-black font-mono ${textMain}`}>{value}</p>
    </div>
  );
}

function GeneRow({
  row,
  rank,
  isDark,
  bm01Overlay,
  bm01Variant,
}: {
  row: BrmGeneScore;
  rank: number;
  isDark: boolean;
  bm01Overlay: boolean;
  bm01Variant: BrmPatientVariant | undefined;
}) {
  const highlighted = bm01Overlay && Boolean(bm01Variant);
  const rowBase = isDark ? 'border-zinc-800' : 'border-slate-200';
  const rowHi = highlighted
    ? isDark
      ? 'bg-cyan-900/15'
      : 'bg-indigo-50/70'
    : '';
  const textBody = isDark ? 'text-zinc-300' : 'text-slate-700';
  const textMuted = isDark ? 'text-zinc-500' : 'text-slate-500';

  return (
    <tr className={`border-t ${rowBase} ${rowHi}`}>
      <td className={`px-3 py-1.5 ${textMuted} tabular-nums`}>{rank}</td>
      <td className={`px-3 py-1.5 font-black ${isDark ? 'text-zinc-100' : 'text-slate-900'}`}>
        {row.gene}
        {highlighted ? (
          <span
            className={`ml-2 text-[9px] font-black uppercase tracking-widest px-1 py-0.5 rounded-sm ${
              isDark ? 'bg-cyan-900/50 text-cyan-300' : 'bg-indigo-100 text-indigo-700'
            }`}
            title={`BM01 variant: ${bm01Variant?.hgvsP} · ΔLL ${bm01Variant?.deltaLL.toFixed(3)}`}
          >
            BM01
          </span>
        ) : null}
      </td>
      <td className={`px-3 py-1.5 text-right tabular-nums ${textBody}`}>
        {fmtScore(row.targetLockScore)}
      </td>
      <td className={`px-3 py-1.5 text-right tabular-nums ${textMuted}`}>
        {fmtScore(row.calibratedScore)}
      </td>
      <td className="px-3 py-1.5 text-center">
        {row.label ? (
          <Check
            className={`inline-block w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}
            aria-hidden
          />
        ) : (
          <X
            className={`inline-block w-3.5 h-3.5 ${isDark ? 'text-zinc-600' : 'text-slate-400'}`}
            aria-hidden
          />
        )}
      </td>
      <td className="px-3 py-1.5 text-center">
        {row.bbbRelevant ? (
          <span
            className={`text-[9px] font-black uppercase tracking-widest px-1 py-0.5 rounded-sm ${
              isDark ? 'bg-cyan-950/60 text-cyan-300' : 'bg-indigo-100 text-indigo-700'
            }`}
          >
            BBB
          </span>
        ) : (
          <span className={textMuted}>—</span>
        )}
      </td>
      <td className={`px-3 py-1.5 text-[10px] ${textMuted}`}>
        {row.flags.length === 0 ? '—' : row.flags.join(' · ')}
      </td>
    </tr>
  );
}

function FooterLink({
  href,
  label,
  isDark,
}: {
  href: string;
  label: string;
  isDark: boolean;
}) {
  return (
    <Link
      href={href}
      className={`text-[10px] font-mono px-2 py-1 rounded-sm border whitespace-nowrap shrink-0 transition-colors ${
        isDark
          ? 'border-zinc-800 text-cyan-600 hover:border-cyan-800'
          : 'border-slate-200 text-indigo-600 hover:border-indigo-300'
      }`}
    >
      {label}
    </Link>
  );
}
