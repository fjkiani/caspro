'use client';

import Link from 'next/link';
import { Target, ChevronRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { TARGET_LOCK_EXPLAINER } from '@/data/target-lock-data';
import { TWO_LAYER_MATRIX, FDA_STATS } from '@/data/fda-prediction-data';
import { TARGET_LOCK_ARCHIVE_PATH, TARGET_LOCK_WORKSPACE_PATH } from '@/lib/engine/paths';
import ProteinPreviewGated from '@/components/sections/mars/previews/ProteinPreviewGated';
import { PersonaContent, type PersonaCopyDeck } from '@/context/persona-content';

// ---- Persona-aware intro deck ---------------------------------------------
// Explains L1 · Target-Lock per audience. Numbers stay identical
// (FDA_STATS.retroConcordance = 9/9); voice changes. Anchored to
// target-lock-data.ts + fda-prediction-data.ts.
// ---------------------------------------------------------------------------

type TLIntroCopy = { eyebrow: string; title: string; kicker: string };

const TL_INTRO_DECK: PersonaCopyDeck<TLIntroCopy> = {
  oncologist: {
    eyebrow: 'L1 · Engine · Two-layer FDA-outcome ranker',
    title: 'Target Lock',
    kicker: 'Retro concordance 9/9 across 2023–24 FDA calls. L1 × L2 → PASS/FAIL matrix below.',
  },
  patient: {
    eyebrow: 'What this engine does',
    title: 'Deciding which drug targets are worth pursuing',
    kicker: 'The system checks whether a target has held up historically before recommending it for a new drug.',
  },
  pharma: {
    eyebrow: 'L1 · Target ranker · BD portfolio',
    title: 'Two-layer target ranker · 9/9 retro concordance',
    kicker: 'Deterministic L1 × L2 gate. Retro-lock 9/9 (2023–24). Repurposing arsenal below with chain-of-custody.',
  },
};

// ---- Body chrome deck ------------------------------------------------------
// Section eyebrows, matrix headers, "$300M Row" callout, footer counts, CTA
// labels. Substrate (TWO_LAYER_MATRIX rows, FDA_STATS numbers, verdicts, dollar
// costs, thesis statement) held invariant across personas.
// ---------------------------------------------------------------------------

type TLBodyCopy = {
  explainerEyebrow: string;
  frameworkEyebrow: string;
  frameworkLegend: string;
  costRowLabel: string;
  footerCountLabel: (retro: string, prospective: string) => string;
  scrollCtaLabel: string;
  tabsCtaLabel: string;
  archiveCtaLabel: string;
  workspaceCtaLabel: string;
};

const TL_BODY_DECK: PersonaCopyDeck<TLBodyCopy> = {
  oncologist: {
    explainerEyebrow: 'How Target Lock Works',
    frameworkEyebrow: 'Two-Layer Prediction Framework',
    frameworkLegend: 'L1 × L2 → Outcome',
    costRowLabel: 'The $300M Row',
    footerCountLabel: (retro, prospective) => `${retro} retroactive · ${prospective} prospective locks`,
    scrollCtaLabel: 'Brain-Met · Scroll',
    tabsCtaLabel: 'Brain-Met · Tabs',
    archiveCtaLabel: 'FDA archive',
    workspaceCtaLabel: 'Cascade workspace',
  },
  patient: {
    explainerEyebrow: 'How this check works',
    frameworkEyebrow: 'The two-check framework',
    frameworkLegend: 'Check 1 × Check 2 → decision',
    costRowLabel: 'Why this matters',
    footerCountLabel: (retro, prospective) => `${retro} past FDA decisions checked · ${prospective} live predictions locked`,
    scrollCtaLabel: 'Brain-met walk-through',
    tabsCtaLabel: 'Brain-met (tabs)',
    archiveCtaLabel: 'Past FDA calls',
    workspaceCtaLabel: 'See the full engine',
  },
  pharma: {
    explainerEyebrow: 'Target-Lock · methodology',
    frameworkEyebrow: 'L1 × L2 prediction matrix · deterministic',
    frameworkLegend: 'Gate outputs · GO/CAUTION/FAIL',
    costRowLabel: 'The $300M row · portfolio loss avoidance',
    footerCountLabel: (retro, prospective) => `Retro-lock ${retro} · prospective ledger ${prospective}`,
    scrollCtaLabel: 'Case · Brain-met scroll',
    tabsCtaLabel: 'Case · Brain-met tabs',
    archiveCtaLabel: 'FDA archive · audit',
    workspaceCtaLabel: 'Cascade workspace',
  },
};

/**
 * Single-viewport intro (ledger-style). Full simulator lives at workspace path.
 */
export default function TargetLockIntroPage() {
  const { isDarkMode } = useTheme();
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';

  return (
    <div
      className={`relative h-[calc(100dvh-3.5rem)] overflow-hidden font-mono flex flex-col ${
        isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-white text-slate-900'
      }`}
    >
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDarkMode
            ? 'bg-[linear-gradient(to_right,#00E5FF05_1px,transparent_1px),linear-gradient(to_bottom,#00E5FF05_1px,transparent_1px)]'
            : 'bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)]'
        } bg-[size:48px_48px]`}
      />

      <PersonaContent
        deck={TL_INTRO_DECK}
        render={(copy) => (
          <header className="relative z-10 shrink-0 px-4 sm:px-8 pt-4 sm:pt-5 flex items-start gap-3">
            <div className={`w-10 h-10 rounded border flex items-center justify-center shrink-0 ${panel}`}>
              <Target className={`w-5 h-5 ${accent}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className={`text-[9px] font-black uppercase tracking-[0.45em] ${accent}`}>{copy.eyebrow}</p>
              <h1 className={`text-base sm:text-lg font-black uppercase tracking-tight truncate ${textMain}`}>
                {copy.title}
              </h1>
              <p className={`text-[10px] leading-snug mt-0.5 line-clamp-2 ${textMuted}`}>{copy.kicker}</p>
            </div>
          </header>
        )}
      />

      <PersonaContent
        deck={TL_BODY_DECK}
        render={(body) => (
          <>
            <div className="relative z-10 flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-3 sm:gap-5 px-4 sm:px-8 py-2 sm:py-3">
              <div className="min-h-0 flex flex-col gap-2 sm:gap-3 overflow-hidden">
                <section className={`rounded-sm border p-3 sm:p-4 shrink-0 ${panel}`}>
                  <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>
                    {body.explainerEyebrow}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {TARGET_LOCK_EXPLAINER.map((item) => (
                      <div key={item.label} className="min-w-0">
                        <span className={`text-[9px] font-black uppercase block ${textMuted}`}>
                          {item.label}
                        </span>
                        <p className={`text-[11px] sm:text-xs leading-snug mt-0.5 ${textMain}`}>{item.text}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className={`rounded-sm border flex-1 min-h-0 flex flex-col overflow-hidden ${panel}`}>
                  <div
                    className={`shrink-0 flex items-center justify-between px-3 py-2 border-b ${
                      isDarkMode ? 'border-zinc-800' : 'border-slate-100'
                    }`}
                  >
                    <span className={`text-[10px] font-black uppercase tracking-widest ${textMain}`}>
                      {body.frameworkEyebrow}
                    </span>
                    <span className={`text-[9px] font-bold uppercase ${textMuted}`}>{body.frameworkLegend}</span>
                  </div>
                  <div className="flex-1 min-h-0 overflow-hidden">
                    {TWO_LAYER_MATRIX.map((row, i) => (
                      <div
                        key={i}
                        className={`grid grid-cols-[3.5rem_3.5rem_1fr_auto] sm:grid-cols-[4rem_4rem_1fr_auto] gap-x-2 items-center px-3 py-1.5 sm:py-2 text-[10px] sm:text-[11px] border-b last:border-b-0 ${
                          row.isCritical
                            ? isDarkMode
                              ? 'bg-rose-500/10 border-rose-500/20'
                              : 'bg-rose-50 border-rose-100'
                            : isDarkMode
                              ? 'border-zinc-800/80'
                              : 'border-slate-50'
                        }`}
                      >
                        <span className={`font-black ${row.l1 === 'HIGH' ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {row.l1}
                        </span>
                        <span className={`font-black ${row.l2 === 'HIGH' ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {row.l2}
                        </span>
                        <span className={`font-bold truncate ${textMuted}`}>{row.prediction}</span>
                        {row.cost ? (
                          <span className="font-black text-rose-500 shrink-0">{row.cost}</span>
                        ) : (
                          <span />
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                <section
                  className={`shrink-0 rounded-sm border px-3 py-2.5 sm:px-4 sm:py-3 ${
                    isDarkMode ? 'bg-rose-500/10 border-rose-500/25' : 'bg-rose-50 border-rose-200'
                  }`}
                >
                  <span className="text-[9px] font-black text-rose-500 uppercase tracking-[0.3em] block mb-1">
                    {body.costRowLabel}
                  </span>
                  <p className={`text-[11px] sm:text-xs font-bold leading-snug ${textMain}`}>
                    {FDA_STATS.thesisStatement}
                  </p>
                </section>
              </div>

              <div className="hidden lg:block min-h-0 overflow-hidden rounded-sm border border-inherit opacity-95">
                <ProteinPreviewGated isDarkMode={isDarkMode} />
              </div>
            </div>

            <footer
              className={`relative z-10 shrink-0 px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between gap-3 border-t ${
                isDarkMode ? 'border-zinc-800' : 'border-slate-200'
              }`}
            >
              <p className={`hidden sm:block text-[9px] font-bold uppercase tracking-[0.25em] ${textMuted}`}>
                {body.footerCountLabel(String(FDA_STATS.retroConcordance), String(FDA_STATS.prospectiveTotal))}
              </p>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <Link
                  href="/engine/target-lock/scroll"
                  className={`inline-flex items-center gap-1.5 rounded-sm px-4 py-2.5 text-[10px] font-black uppercase tracking-widest border transition-colors ${
                    isDarkMode
                      ? 'border-zinc-700 text-zinc-300 hover:border-cyan-500/50'
                      : 'border-slate-300 text-slate-700 hover:border-indigo-400'
                  }`}
                >
                  {body.scrollCtaLabel}
                </Link>
                <Link
                  href="/engine/target-lock/tabs"
                  className={`inline-flex items-center gap-1.5 rounded-sm px-4 py-2.5 text-[10px] font-black uppercase tracking-widest border transition-colors ${
                    isDarkMode
                      ? 'border-zinc-700 text-zinc-300 hover:border-cyan-500/50'
                      : 'border-slate-300 text-slate-700 hover:border-indigo-400'
                  }`}
                >
                  {body.tabsCtaLabel}
                </Link>
                <Link
                  href={TARGET_LOCK_ARCHIVE_PATH}
                  className={`inline-flex items-center gap-1.5 rounded-sm px-4 py-2.5 text-[10px] font-black uppercase tracking-widest border transition-colors ${
                    isDarkMode
                      ? 'border-zinc-700 text-zinc-300 hover:border-cyan-500/50'
                      : 'border-slate-300 text-slate-700 hover:border-indigo-400'
                  }`}
                >
                  {body.archiveCtaLabel}
                </Link>
                <Link
                  href={TARGET_LOCK_WORKSPACE_PATH}
                  className={`inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-[11px] font-black uppercase tracking-widest transition-colors ${
                    isDarkMode
                      ? 'bg-cyan-500 text-black hover:bg-cyan-400'
                      : 'bg-indigo-600 text-white text-on-primary hover:bg-indigo-700'
                  }`}
                >
                  {body.workspaceCtaLabel}
                  <ChevronRight className="w-4 h-4" aria-hidden />
                </Link>
              </div>
            </footer>
          </>
        )}
      />
    </div>
  );
}
