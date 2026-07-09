'use client';

// ==============================================================================
// /engine/mechanism-alignment/scroll — L2 scroll surface, case-by-case walk.
//
// Layout: sticky top-of-viewport eyebrow + long-scroll spine. Each of the 3
// illustrative divergence cases owns one section:
//   1. header (case title + audience hook + PASS/FAIL badge)
//   2. side-by-side vector bars (patient p vs. therapy t) across 7 axes
//   3. projection breakdown (dot product per axis) with running total
//   4. composite gate readout (α · eligibility + β · fit → verdict + reason)
//   5. narrative paragraphs
//   6. illustrative-only disclaimer strip
// ==============================================================================

import { Fragment } from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, ShieldCheck } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import {
  DIVERGENCE_CASES,
  PATHWAYS_7D,
  PATH_A_FORMULA,
  COMPOSITE_EXPRESSION,
  MECHANISM_FIT_ALPHA,
  MECHANISM_FIT_BETA,
  MIN_ELIGIBILITY_THRESHOLD,
  MIN_MECHANISM_FIT_THRESHOLD,
} from '@/data/mechanism-alignment-data';

// ------------------------------------------------------------------------------
// Local helpers — deterministic client-side math for the display.
// ------------------------------------------------------------------------------

function l2Norm(v: number[]): number {
  return Math.sqrt(v.reduce((s, x) => s + x * x, 0));
}

function dot(a: number[], b: number[]): number {
  return a.reduce((s, x, i) => s + x * b[i], 0);
}

function clip01(x: number): number {
  return Math.max(0, Math.min(1, x));
}

// Returns the per-axis contribution of the projection (p_i · t_i / ‖t‖₂).
// The sum of these is the numerator projected onto the therapy axis.
function perAxisContribution(pVec: number[], tVec: number[]): number[] {
  const n = l2Norm(tVec);
  if (n === 0) return pVec.map(() => 0);
  return pVec.map((p_i, i) => (p_i * tVec[i]) / n);
}

export default function MechanismAlignmentScrollSurface() {
  const { isDarkMode } = useTheme();
  const accent = isDarkMode ? 'text-fuchsia-300' : 'text-fuchsia-600';
  const accentBg = isDarkMode ? 'bg-fuchsia-500/20' : 'bg-fuchsia-100';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const barBase = isDarkMode ? 'bg-zinc-900' : 'bg-slate-100';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';

  return (
    <div className={`relative min-h-screen font-mono ${isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-white text-slate-900'}`}>
      {/* Sticky eyebrow */}
      <div className={`sticky top-0 z-20 backdrop-blur border-b ${
        isDarkMode ? 'bg-[#020408]/80 border-zinc-800' : 'bg-white/80 border-slate-200'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-3">
          <div className={`w-8 h-8 rounded border flex items-center justify-center ${panel}`}>
            <Layers className={`w-4 h-4 ${accent}`} />
          </div>
          <div className="min-w-0">
            <p className={`text-[9px] font-black uppercase tracking-[0.4em] ${accent}`}>L2 · scroll surface</p>
            <p className={`text-xs sm:text-sm font-black uppercase tracking-tight truncate ${textMain}`}>
              Mechanism Alignment — 3 illustrative divergence cases
            </p>
          </div>
          <div className={`ml-auto hidden md:flex items-center gap-2 text-[10px] font-bold uppercase ${textMuted}`}>
            <ShieldCheck className="w-3 h-3" />
            <span>PATH A · signed 2026-04-28</span>
          </div>
        </div>
      </div>

      {/* Formula strip */}
      <section className={`border-b ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className={`rounded border p-4 ${panel}`}>
            <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${accent}`}>Ranker formula</p>
            <code className={`text-sm sm:text-base font-black ${textMain}`}>{PATH_A_FORMULA}</code>
            <p className={`mt-2 text-[11px] leading-snug ${textMuted}`}>
              Projection of the patient vector onto the therapy axis, unit-normalized by ‖t‖₂ and clipped to [0,1]. Naive cosine would strip that projection information.
            </p>
          </div>
          <div className={`rounded border p-4 ${panel}`}>
            <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${accent}`}>Composite gate</p>
            <code className={`text-sm sm:text-base font-black ${textMain}`}>{COMPOSITE_EXPRESSION}</code>
            <p className={`mt-2 text-[11px] leading-snug ${textMuted}`}>
              α = {MECHANISM_FIT_ALPHA}, β = {MECHANISM_FIT_BETA}. Eligibility ≥ {MIN_ELIGIBILITY_THRESHOLD} and mechanism_fit ≥ {MIN_MECHANISM_FIT_THRESHOLD} — both must clear.
            </p>
          </div>
        </div>
      </section>

      {/* Cases */}
      {DIVERGENCE_CASES.map((c, idx) => {
        const pVec = PATHWAYS_7D.map((p) => c.patientVector[p.key] ?? 0);
        const tVec = PATHWAYS_7D.map((p) => c.therapyVector[p.key] ?? 0);
        const contributions = perAxisContribution(pVec, tVec);
        const rawFit = contributions.reduce((s, x) => s + x, 0);
        const clippedFit = clip01(rawFit);
        const composite = clip01(MECHANISM_FIT_ALPHA * c.outcome.eligibility + MECHANISM_FIT_BETA * clippedFit);
        const verdictColor = c.outcome.verdict === 'PASS'
          ? isDarkMode ? 'text-emerald-400' : 'text-emerald-700'
          : isDarkMode ? 'text-rose-400' : 'text-rose-700';
        const verdictBg = c.outcome.verdict === 'PASS'
          ? isDarkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'
          : isDarkMode ? 'bg-rose-500/20' : 'bg-rose-100';
        const eligibilityCleared = c.outcome.eligibility >= MIN_ELIGIBILITY_THRESHOLD;
        const fitCleared = clippedFit >= MIN_MECHANISM_FIT_THRESHOLD;

        return (
          <section
            key={c.id}
            className={`border-b ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

              {/* Case header */}
              <div className="flex flex-wrap items-start gap-3 mb-6">
                <div className={`inline-flex items-center gap-2 rounded px-2 py-1 ${accentBg}`}>
                  <span className={`text-[10px] font-black uppercase ${accent}`}>{c.id}</span>
                  <span className={`text-[10px] font-black uppercase ${accent}`}>Case {idx + 1} of {DIVERGENCE_CASES.length}</span>
                </div>
                <span className={`text-[10px] font-black uppercase rounded px-2 py-1 ${verdictBg} ${verdictColor}`}>
                  {c.outcome.verdict}
                </span>
                <span className={`text-[10px] font-bold uppercase rounded px-2 py-1 ${panel} ${textMuted}`}>
                  {c.conflict.label}
                </span>
              </div>

              <h2 className={`text-2xl sm:text-3xl font-black tracking-tight leading-tight ${textMain}`}>
                {c.title}
              </h2>
              <p className={`mt-2 text-sm sm:text-base ${textMuted}`}>{c.audience}</p>

              {/* Vector bars */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <VectorBars
                  title="Patient vector p"
                  subtitle="Where the patient loads in mechanism space"
                  vec={pVec}
                  isDarkMode={isDarkMode}
                  color="fuchsia"
                />
                <VectorBars
                  title="Therapy vector t"
                  subtitle="Where the therapy expects to work"
                  vec={tVec}
                  isDarkMode={isDarkMode}
                  color="cyan"
                />
              </div>

              {/* Projection breakdown */}
              <div className={`mt-6 rounded border ${panel}`}>
                <div className={`px-4 py-2 border-b ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${accent}`}>PATH A projection · per-axis contribution</p>
                </div>
                <div className="p-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {PATHWAYS_7D.map((p, i) => (
                    <div key={p.key} className={`rounded border p-2 ${panel}`}>
                      <p className={`text-[9px] font-black uppercase ${textMuted}`}>{p.label}</p>
                      <p className={`text-sm font-black ${textMain}`}>{contributions[i].toFixed(3)}</p>
                    </div>
                  ))}
                </div>
                <div className={`px-4 py-2 border-t grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
                  <FormulaCell label="raw projection" value={rawFit.toFixed(3)} isDarkMode={isDarkMode} />
                  <FormulaCell label="clip [0,1] → mechanism_fit" value={clippedFit.toFixed(3)} isDarkMode={isDarkMode} />
                  <FormulaCell label="eligibility" value={c.outcome.eligibility.toFixed(2)} isDarkMode={isDarkMode} />
                </div>
              </div>

              {/* Composite verdict */}
              <div className={`mt-4 rounded border ${panel}`}>
                <div className={`px-4 py-2 border-b flex items-center justify-between ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${accent}`}>Composite gate</p>
                  <span className={`text-[10px] font-black uppercase rounded px-2 py-0.5 ${verdictBg} ${verdictColor}`}>
                    {c.outcome.verdict}
                  </span>
                </div>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <GateCell
                    label={`α = ${MECHANISM_FIT_ALPHA}`}
                    sub="eligibility"
                    value={c.outcome.eligibility.toFixed(2)}
                    cleared={eligibilityCleared}
                    threshold={MIN_ELIGIBILITY_THRESHOLD}
                    isDarkMode={isDarkMode}
                  />
                  <GateCell
                    label={`β = ${MECHANISM_FIT_BETA}`}
                    sub="mechanism_fit"
                    value={clippedFit.toFixed(3)}
                    cleared={fitCleared}
                    threshold={MIN_MECHANISM_FIT_THRESHOLD}
                    isDarkMode={isDarkMode}
                  />
                  <GateCell
                    label="composite"
                    sub="α · elig + β · fit"
                    value={composite.toFixed(3)}
                    cleared={eligibilityCleared && fitCleared}
                    threshold={MECHANISM_FIT_ALPHA * MIN_ELIGIBILITY_THRESHOLD + MECHANISM_FIT_BETA * MIN_MECHANISM_FIT_THRESHOLD}
                    isDarkMode={isDarkMode}
                  />
                  <div className={`rounded border p-2 ${panel}`}>
                    <p className={`text-[9px] font-black uppercase ${textMuted}`}>Named reason</p>
                    <p className={`text-[11px] leading-snug mt-1 ${textMain}`}>{c.outcome.reason}</p>
                  </div>
                </div>
              </div>

              {/* Narrative */}
              <div className="mt-6 space-y-3">
                {c.narrative.map((para, i) => (
                  <p key={i} className={`text-sm leading-relaxed ${textMuted}`}>{para}</p>
                ))}
              </div>

              {/* Illustrative disclaimer */}
              <div className={`mt-6 rounded border p-3 ${panel}`}>
                <p className={`text-[10px] italic leading-snug ${textMuted}`}>
                  <span className={`not-italic font-black uppercase mr-1 ${accent}`}>Note ·</span>
                  {c.illustrativeNote}
                </p>
              </div>
            </div>
          </section>
        );
      })}

      {/* Cross-links footer */}
      <section className={`max-w-6xl mx-auto px-4 sm:px-6 py-8`}>
        <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>
          Cross-engine deep dives
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <CrossLink href="/engine/target-lock/scroll" title="Target-Lock · brain-met" note="7-step BrM cascade — the L1 counterpart to L2 mechanism alignment." isDarkMode={isDarkMode} />
          <CrossLink href="/engine/synthetic-lethality/scroll" title="SL · MBD4 manuscript" note="4-axis SL substrate — where mechanism alignment collides with lethality." isDarkMode={isDarkMode} />
          <CrossLink href="/engine/mechanism-alignment/tabs" title="L2 tab strip" note="Per-case tab view + governance / PATH A signature tab." isDarkMode={isDarkMode} />
        </div>
      </section>
    </div>
  );
}

// ------------------------------------------------------------------------------
// Sub-components
// ------------------------------------------------------------------------------

interface VectorBarsProps {
  title: string;
  subtitle: string;
  vec: number[];
  isDarkMode: boolean;
  color: 'fuchsia' | 'cyan';
}

function VectorBars({ title, subtitle, vec, isDarkMode, color }: VectorBarsProps) {
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';
  const barBase = isDarkMode ? 'bg-zinc-900' : 'bg-slate-100';
  const fill =
    color === 'fuchsia'
      ? isDarkMode ? 'bg-fuchsia-500' : 'bg-fuchsia-400'
      : isDarkMode ? 'bg-cyan-500' : 'bg-cyan-400';
  const accent =
    color === 'fuchsia'
      ? isDarkMode ? 'text-fuchsia-300' : 'text-fuchsia-600'
      : isDarkMode ? 'text-cyan-300' : 'text-cyan-600';

  return (
    <div className={`rounded border ${panel}`}>
      <div className={`px-3 py-2 border-b ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
        <p className={`text-[10px] font-black uppercase tracking-widest ${accent}`}>{title}</p>
        <p className={`text-[10px] mt-0.5 ${textMuted}`}>{subtitle}</p>
      </div>
      <div className="p-3 space-y-1.5">
        {PATHWAYS_7D.map((p, i) => (
          <div key={p.key} className="grid grid-cols-[3rem_1fr_3rem] items-center gap-2">
            <span className={`text-[10px] font-black uppercase ${textMuted}`}>{p.label}</span>
            <div className={`h-2 rounded-sm relative overflow-hidden ${barBase}`}>
              <div
                className={`h-full ${fill}`}
                style={{ width: `${Math.min(100, Math.max(0, vec[i] * 100))}%` }}
              />
            </div>
            <span className={`text-[10px] font-black text-right ${textMain}`}>{vec[i].toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormulaCell({ label, value, isDarkMode }: { label: string; value: string; isDarkMode: boolean }) {
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';
  return (
    <div>
      <p className={`text-[9px] font-black uppercase ${textMuted}`}>{label}</p>
      <p className={`text-sm font-black ${textMain}`}>{value}</p>
    </div>
  );
}

function GateCell({ label, sub, value, cleared, threshold, isDarkMode }: {
  label: string; sub: string; value: string; cleared: boolean; threshold: number; isDarkMode: boolean;
}) {
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';
  const passBg = isDarkMode ? 'bg-emerald-500/15 border-emerald-500/40' : 'bg-emerald-50 border-emerald-200';
  const failBg = isDarkMode ? 'bg-rose-500/15 border-rose-500/40' : 'bg-rose-50 border-rose-200';
  return (
    <div className={`rounded border p-2 ${cleared ? passBg : failBg}`}>
      <p className={`text-[9px] font-black uppercase ${textMuted}`}>{label}</p>
      <p className={`text-[9px] uppercase ${textMuted}`}>{sub}</p>
      <p className={`mt-1 text-sm font-black ${textMain}`}>{value}</p>
      <p className={`text-[9px] mt-0.5 ${cleared ? 'text-emerald-500' : 'text-rose-500'}`}>
        threshold {threshold.toFixed(2)} · {cleared ? 'cleared' : 'below'}
      </p>
    </div>
  );
}

function CrossLink({ href, title, note, isDarkMode }: { href: string; title: string; note: string; isDarkMode: boolean }) {
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const accent = isDarkMode ? 'text-fuchsia-300' : 'text-fuchsia-600';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';
  return (
    <Link href={href} className={`group flex items-start gap-2 rounded border p-3 transition-colors ${panel} ${
      isDarkMode ? 'hover:border-fuchsia-500/40' : 'hover:border-fuchsia-300'
    }`}>
      <div className="min-w-0 flex-1">
        <p className={`text-[10px] font-black uppercase tracking-[0.15em] ${accent}`}>{title}</p>
        <p className={`mt-1 text-[11px] leading-snug ${textMuted}`}>{note}</p>
      </div>
      <ArrowRight className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${accent}`} />
    </Link>
  );
}
