'use client';

// ==============================================================================
// /engine/mechanism-alignment/tabs — L2 tab strip.
//
// One tab per illustrative divergence case + a Governance tab covering PATH A
// signature status, RSS opt-in policy, and DL-07 quarantine rule. Fits in a
// single viewport (no page scroll — the linter marker <SurfaceTabs> wraps the
// tree; only tab body scrolls if it overflows).
// ==============================================================================

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import {
  DIVERGENCE_CASES,
  PATHWAYS_7D,
  PATH_A_FORMULA,
  PATH_A_APPROVAL,
  COMPOSITE_EXPRESSION,
  MECHANISM_FIT_ALPHA,
  MECHANISM_FIT_BETA,
  MIN_ELIGIBILITY_THRESHOLD,
  MIN_MECHANISM_FIT_THRESHOLD,
} from '@/data/mechanism-alignment-data';

// Marker required by caspro-lint/no-scroll linter.
export const SurfaceTabs = ({ children }: { children: React.ReactNode }) => <>{children}</>;

function l2Norm(v: number[]): number {
  return Math.sqrt(v.reduce((s, x) => s + x * x, 0));
}
function clip01(x: number): number {
  return Math.max(0, Math.min(1, x));
}
function projectionFit(pVec: number[], tVec: number[]): number {
  const n = l2Norm(tVec);
  if (n === 0) return 0;
  const dot = pVec.reduce((s, x, i) => s + x * tVec[i], 0);
  return clip01(dot / n);
}

type TabKey = string;

export default function MechanismAlignmentTabSurface() {
  const { isDarkMode } = useTheme();
  const [active, setActive] = useState<TabKey>(DIVERGENCE_CASES[0]?.slug ?? 'governance');

  const accent = isDarkMode ? 'text-fuchsia-300' : 'text-fuchsia-600';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';
  const chip = isDarkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-200' : 'bg-slate-50 border-slate-200 text-slate-800';

  const tabs = useMemo(
    () => [
      ...DIVERGENCE_CASES.map((c) => ({ key: c.slug, label: c.id, sub: c.conflict.label })),
      { key: 'governance', label: 'GOV', sub: 'PATH A · DL-07' },
    ],
    [],
  );

  const activeCase = DIVERGENCE_CASES.find((c) => c.slug === active);

  return (
    <SurfaceTabs>
      <div
        className={`relative h-[calc(100dvh-3.5rem)] overflow-hidden font-mono flex flex-col ${
          isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-white text-slate-900'
        }`}
      >
        <div
          className={`absolute inset-0 pointer-events-none ${
            isDarkMode
              ? 'bg-[linear-gradient(to_right,#F0ABFC08_1px,transparent_1px),linear-gradient(to_bottom,#F0ABFC08_1px,transparent_1px)]'
              : 'bg-[linear-gradient(to_right,#a21caf08_1px,transparent_1px),linear-gradient(to_bottom,#a21caf08_1px,transparent_1px)]'
          } bg-[size:48px_48px]`}
        />

        {/* Header */}
        <header className="relative z-10 shrink-0 px-4 sm:px-6 pt-3 sm:pt-4">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded border flex items-center justify-center ${panel}`}>
              <Layers className={`w-4 h-4 ${accent}`} />
            </div>
            <div className="min-w-0">
              <p className={`text-[9px] font-black uppercase tracking-[0.4em] ${accent}`}>
                L2 · tabs
              </p>
              <h1 className={`text-sm sm:text-base font-black uppercase tracking-tight truncate ${textMain}`}>
                Mechanism Alignment
              </h1>
            </div>
            <div className={`ml-auto hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase ${textMuted}`}>
              <ShieldCheck className="w-3 h-3" />
              <span>PATH A signed</span>
            </div>
          </div>

          {/* Always-visible formula bar (governance-required — PATH A is the
              production ranker on every L2 surface). */}
          <div className={`mt-2 rounded border px-2 py-1.5 text-center ${panel}`}>
            <code className={`text-[11px] font-black ${textMain}`}>{PATH_A_FORMULA}</code>
            <span className={`ml-2 text-[9px] uppercase font-bold ${textMuted}`}>· PATH A ranker</span>
          </div>

          {/* Tab strip */}
          <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
            {tabs.map((t) => {
              const isActive = t.key === active;
              const activeStyle = isDarkMode
                ? 'border-fuchsia-500/60 bg-fuchsia-500/10 text-fuchsia-100'
                : 'border-fuchsia-400 bg-fuchsia-50 text-fuchsia-900';
              const idleStyle = isDarkMode
                ? 'border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900';
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActive(t.key)}
                  className={`rounded border px-2.5 py-1.5 transition-colors ${isActive ? activeStyle : idleStyle}`}
                >
                  <p className="text-[10px] font-black uppercase tracking-wider">{t.label}</p>
                  <p className={`text-[9px] mt-0.5 ${isActive ? '' : textMuted}`}>{t.sub}</p>
                </button>
              );
            })}
          </div>
        </header>

        {/* Body */}
        <section className="relative z-10 flex-1 min-h-0 px-4 sm:px-6 pb-4 pt-3 overflow-hidden">
          {active === 'governance' ? (
            <GovernanceTab isDarkMode={isDarkMode} />
          ) : activeCase ? (
            <CaseTab caseData={activeCase} isDarkMode={isDarkMode} />
          ) : null}
        </section>
      </div>
    </SurfaceTabs>
  );
}

// ------------------------------------------------------------------------------
// Case tab
// ------------------------------------------------------------------------------

function CaseTab({ caseData, isDarkMode }: { caseData: typeof DIVERGENCE_CASES[number]; isDarkMode: boolean }) {
  const accent = isDarkMode ? 'text-fuchsia-300' : 'text-fuchsia-600';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';
  const barBase = isDarkMode ? 'bg-zinc-900' : 'bg-slate-100';

  const pVec = PATHWAYS_7D.map((p) => caseData.patientVector[p.key] ?? 0);
  const tVec = PATHWAYS_7D.map((p) => caseData.therapyVector[p.key] ?? 0);
  const fit = projectionFit(pVec, tVec);
  const composite = clip01(MECHANISM_FIT_ALPHA * caseData.outcome.eligibility + MECHANISM_FIT_BETA * fit);
  const verdictColor = caseData.outcome.verdict === 'PASS'
    ? isDarkMode ? 'text-emerald-400' : 'text-emerald-700'
    : isDarkMode ? 'text-rose-400' : 'text-rose-700';
  const verdictBg = caseData.outcome.verdict === 'PASS'
    ? isDarkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'
    : isDarkMode ? 'bg-rose-500/20' : 'bg-rose-100';

  return (
    <div className="h-full min-h-0 grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-3 overflow-hidden">
      {/* Left: title + narrative + gate */}
      <div className="min-h-0 flex flex-col gap-2.5 overflow-y-auto">
        <div className="flex items-start gap-2 flex-wrap">
          <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-black uppercase ${panel} ${accent}`}>
            {caseData.id}
          </span>
          <span className={`rounded px-2 py-0.5 text-[10px] font-black uppercase ${verdictBg} ${verdictColor}`}>
            {caseData.outcome.verdict}
          </span>
          <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${panel} ${textMuted}`}>
            {caseData.conflict.label}
          </span>
        </div>
        <h2 className={`text-lg sm:text-xl font-black tracking-tight leading-tight ${textMain}`}>
          {caseData.title}
        </h2>
        <p className={`text-[11px] sm:text-xs ${textMuted}`}>{caseData.audience}</p>

        <div className={`rounded border p-3 ${panel}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${accent}`}>Composite verdict</p>
          <div className="grid grid-cols-3 gap-2">
            <MiniCell label="mechanism_fit" value={fit.toFixed(3)} isDarkMode={isDarkMode} />
            <MiniCell label="eligibility" value={caseData.outcome.eligibility.toFixed(2)} isDarkMode={isDarkMode} />
            <MiniCell label="composite" value={composite.toFixed(3)} isDarkMode={isDarkMode} />
          </div>
          <p className={`mt-2 text-[11px] leading-snug ${textMain}`}>
            <span className={`font-black uppercase text-[9px] ${accent}`}>Reason · </span>
            {caseData.outcome.reason}
          </p>
        </div>

        <div className="space-y-2">
          {caseData.narrative.map((para, i) => (
            <p key={i} className={`text-[11px] sm:text-xs leading-relaxed ${textMuted}`}>{para}</p>
          ))}
        </div>

        <p className={`text-[10px] italic mt-auto ${textMuted}`}>
          <span className={`not-italic font-black uppercase mr-1 ${accent}`}>Note ·</span>
          {caseData.illustrativeNote}
        </p>
      </div>

      {/* Right: two mini vector-bar cards */}
      <div className="min-h-0 flex flex-col gap-2 overflow-hidden">
        <MiniBars title="Patient vector p" vec={pVec} isDarkMode={isDarkMode} color="fuchsia" />
        <MiniBars title="Therapy vector t" vec={tVec} isDarkMode={isDarkMode} color="cyan" />
      </div>
    </div>
  );
}

// ------------------------------------------------------------------------------
// Governance tab — PATH A + DL-07 statement
// ------------------------------------------------------------------------------

function GovernanceTab({ isDarkMode }: { isDarkMode: boolean }) {
  const accent = isDarkMode ? 'text-fuchsia-300' : 'text-fuchsia-600';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';
  return (
    <div className="h-full min-h-0 grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto">
      <div className={`rounded border p-3 ${panel}`}>
        <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>PATH A · ranker</p>
        <code className={`text-sm font-black ${textMain}`}>{PATH_A_FORMULA}</code>
        <p className={`mt-2 text-[11px] leading-snug ${textMuted}`}>
          Projection of the patient vector onto the therapy axis, normalized by ‖t‖₂ and clipped to [0,1]. PATH B is prohibited across every surface downstream.
        </p>
        <p className={`mt-2 text-[10px] italic ${textMuted}`}>{PATH_A_APPROVAL}</p>
      </div>
      <div className={`rounded border p-3 ${panel}`}>
        <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>Composite gate</p>
        <code className={`text-sm font-black ${textMain}`}>{COMPOSITE_EXPRESSION}</code>
        <p className={`mt-2 text-[11px] leading-snug ${textMuted}`}>
          α = {MECHANISM_FIT_ALPHA}, β = {MECHANISM_FIT_BETA}. Eligibility must reach {MIN_ELIGIBILITY_THRESHOLD}, mechanism_fit must reach {MIN_MECHANISM_FIT_THRESHOLD}. Both required.
        </p>
      </div>
      <div className={`rounded border p-3 ${panel}`}>
        <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>RSS · opt-in axis</p>
        <p className={`text-[11px] leading-snug ${textMain}`}>
          The Replication-Stress Score (PMID 34552099) is the optional 8th axis. It is enabled only when the therapy modality demands it — the 7-axis canonical vector remains the default surface everywhere else.
        </p>
      </div>
      <div className={`rounded border p-3 ${panel}`}>
        <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>DL-07 quarantine</p>
        <p className={`text-[11px] leading-snug ${textMain}`}>
          DDR axis alignment is described qualitatively across every L2 surface. The specific numeric figure cited historically is quarantined per the DL-07 governance rule until it is reproduced end-to-end. No output on this surface pairs the DDR label with that number.
        </p>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------------------
// Small shared cells
// ------------------------------------------------------------------------------

function MiniCell({ label, value, isDarkMode }: { label: string; value: string; isDarkMode: boolean }) {
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';
  return (
    <div className={`rounded border p-2 ${panel}`}>
      <p className={`text-[9px] font-black uppercase ${textMuted}`}>{label}</p>
      <p className={`text-sm font-black ${textMain}`}>{value}</p>
    </div>
  );
}

function MiniBars({ title, vec, isDarkMode, color }: { title: string; vec: number[]; isDarkMode: boolean; color: 'fuchsia' | 'cyan' }) {
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
    <div className={`rounded border flex-1 min-h-0 flex flex-col overflow-hidden ${panel}`}>
      <div className={`shrink-0 px-3 py-2 border-b ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
        <p className={`text-[10px] font-black uppercase tracking-widest ${accent}`}>{title}</p>
      </div>
      <div className="p-2.5 space-y-1">
        {PATHWAYS_7D.map((p, i) => (
          <div key={p.key} className="grid grid-cols-[2.5rem_1fr_2.5rem] items-center gap-2">
            <span className={`text-[9px] font-black uppercase ${textMuted}`}>{p.label}</span>
            <div className={`h-1.5 rounded-sm relative overflow-hidden ${barBase}`}>
              <div className={`h-full ${fill}`} style={{ width: `${Math.min(100, Math.max(0, vec[i] * 100))}%` }} />
            </div>
            <span className={`text-[9px] font-black text-right ${textMain}`}>{vec[i].toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
