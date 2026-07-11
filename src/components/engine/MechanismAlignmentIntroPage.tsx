'use client';

// ==============================================================================
// /engine/mechanism-alignment/ — L2 intro (single viewport, no scroll).
//
// Purpose: single-page pharma-BD-legible answer to "what is L2 Mechanism
// Alignment and why should Sanofi care?" — the PATH A math kill-shot.
//
// Layout matches TargetLockIntroPage: header + 2-column grid.
//   left column  → PATH A formula card + explainer bullets + composite gate
//   right column → 7-axis chip grid + illustrative divergence teasers +
//                  deep-dive links (scroll + tabs)
// ==============================================================================

import Link from 'next/link';
import { Layers, ChevronRight, ShieldCheck, ArrowRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import {
  PATH_A_FORMULA,
  PATH_A_APPROVAL,
  COMPOSITE_EXPRESSION,
  MECHANISM_FIT_ALPHA,
  MECHANISM_FIT_BETA,
  MIN_ELIGIBILITY_THRESHOLD,
  MIN_MECHANISM_FIT_THRESHOLD,
  PATHWAYS_7D,
  AXES_8D,
  DIVERGENCE_CASES,
  MECHANISM_ALIGNMENT_EXPLAINER,
} from '@/data/mechanism-alignment-data';
import { PersonaContent, type PersonaCopyDeck } from '@/context/persona-content';

// ---- Persona-aware intro deck ---------------------------------------------
// L2 · Mechanism-Alignment per audience. PATH A signed 2026-04-28 badge
// stays visible for all personas — it's governance canon, not framing.
// ---------------------------------------------------------------------------

type BrMIntroCopy = { eyebrow: string; title: string; kicker: string };

const BRM_INTRO_DECK: PersonaCopyDeck<BrMIntroCopy> = {
  oncologist: {
    eyebrow: 'L2 · Engine · PATH A composite gate',
    title: 'Mechanism Alignment',
    kicker: 'PATH A ranker · 7 canonical axes + 1 opt-in RSS · composite 0.7·elig + 0.3·fit.',
  },
  patient: {
    eyebrow: 'How the tool matches treatments to your tumor',
    title: 'Aligning drug mechanism with tumor biology',
    kicker: 'The system compares drug fingerprints against tumor fingerprints across 7 biological pathways.',
  },
  pharma: {
    eyebrow: 'L2 · Ranker · PATH A locked',
    title: 'Mechanism Alignment · projection ranker',
    kicker: 'fit = clip((p·t) / ‖t‖₂, 0, 1). Composite = 0.7·elig + 0.3·fit. Dual floors 0.60/0.30.',
  },
};

export default function MechanismAlignmentIntroPage() {
  const { isDarkMode } = useTheme();
  const accent = isDarkMode ? 'text-fuchsia-300' : 'text-fuchsia-600';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';
  const chip = isDarkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-200' : 'bg-slate-50 border-slate-200 text-slate-800';
  const chipRss = isDarkMode ? 'bg-fuchsia-950/40 border-fuchsia-800 text-fuchsia-200' : 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-800';

  return (
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

      {/* Header — persona-aware eyebrow + title. PATH A badge is governance canon → stays outside deck. */}
      <header className="relative z-10 shrink-0 px-4 sm:px-8 pt-4 sm:pt-5 flex items-start gap-3">
        <div className={`w-10 h-10 rounded border flex items-center justify-center shrink-0 ${panel}`}>
          <Layers className={`w-5 h-5 ${accent}`} />
        </div>
        <PersonaContent
          deck={BRM_INTRO_DECK}
          render={(copy) => (
            <div className="min-w-0 flex-1">
              <p className={`text-[9px] font-black uppercase tracking-[0.45em] ${accent}`}>{copy.eyebrow}</p>
              <h1 className={`text-base sm:text-lg font-black uppercase tracking-tight truncate ${textMain}`}>
                {copy.title}
              </h1>
              <p className={`text-[10px] leading-snug mt-0.5 line-clamp-2 ${textMuted}`}>{copy.kicker}</p>
            </div>
          )}
        />
        <div className="ml-auto hidden sm:flex items-center gap-2 shrink-0">
          <span className={`text-[10px] font-bold uppercase ${textMuted}`}>PATH A</span>
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase ${accent}`}>
            <ShieldCheck className="w-3 h-3" />
            signed 2026-04-28
          </span>
        </div>
      </header>

      {/* Body — 2-col grid */}
      <div className="relative z-10 flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-3 sm:gap-5 px-4 sm:px-8 py-2 sm:py-3">
        {/* Left column */}
        <div className="min-h-0 flex flex-col gap-2 sm:gap-3 overflow-hidden">

          {/* Formula card */}
          <section className={`rounded-sm border p-3 sm:p-4 shrink-0 ${panel}`}>
            <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>
              PATH A ranker · production formula
            </p>
            <div className={`rounded border px-3 py-2 text-center ${isDarkMode ? 'border-zinc-700 bg-zinc-900/60' : 'border-slate-200 bg-slate-50'}`}>
              <code className={`text-sm sm:text-base font-black ${textMain}`}>{PATH_A_FORMULA}</code>
            </div>
            <p className={`mt-2 text-[10px] leading-snug ${textMuted}`}>
              p = patient mechanism vector · t = therapy mechanism vector · projection clipped to [0,1]. PATH B fallback is prohibited in every downstream surface.
            </p>
          </section>

          {/* Explainer bullets */}
          <section className={`rounded-sm border p-3 sm:p-4 shrink-0 ${panel}`}>
            <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>
              How Mechanism Alignment works
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {MECHANISM_ALIGNMENT_EXPLAINER.map((item) => (
                <div key={item.label} className="min-w-0">
                  <span className={`text-[9px] font-black uppercase block ${textMuted}`}>{item.label}</span>
                  <p className={`text-[11px] sm:text-xs leading-snug mt-0.5 ${textMain}`}>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Composite gate */}
          <section className={`rounded-sm border flex-1 min-h-0 flex flex-col overflow-hidden ${panel}`}>
            <div className={`shrink-0 flex items-center justify-between px-3 py-2 border-b ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
              <span className={`text-[10px] font-black uppercase tracking-widest ${textMain}`}>
                Composite gate
              </span>
              <span className={`text-[9px] font-bold uppercase ${textMuted}`}>α · elig + β · fit</span>
            </div>
            <div className="flex-1 min-h-0 px-3 py-2 sm:py-3 space-y-2">
              <div className={`rounded border px-3 py-2 text-center ${isDarkMode ? 'border-zinc-700 bg-zinc-900/40' : 'border-slate-200 bg-slate-50'}`}>
                <code className={`text-xs sm:text-sm font-black ${textMain}`}>{COMPOSITE_EXPRESSION}</code>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className={`rounded border p-2 ${panel}`}>
                  <p className={`text-[9px] font-black uppercase ${textMuted}`}>α (eligibility)</p>
                  <p className={`text-sm font-black ${textMain}`}>{MECHANISM_FIT_ALPHA}</p>
                </div>
                <div className={`rounded border p-2 ${panel}`}>
                  <p className={`text-[9px] font-black uppercase ${textMuted}`}>β (fit)</p>
                  <p className={`text-sm font-black ${textMain}`}>{MECHANISM_FIT_BETA}</p>
                </div>
                <div className={`rounded border p-2 ${panel}`}>
                  <p className={`text-[9px] font-black uppercase ${textMuted}`}>min eligibility</p>
                  <p className={`text-sm font-black ${textMain}`}>{MIN_ELIGIBILITY_THRESHOLD.toFixed(2)}</p>
                </div>
                <div className={`rounded border p-2 ${panel}`}>
                  <p className={`text-[9px] font-black uppercase ${textMuted}`}>min mechanism_fit</p>
                  <p className={`text-sm font-black ${textMain}`}>{MIN_MECHANISM_FIT_THRESHOLD.toFixed(2)}</p>
                </div>
              </div>
              <p className={`text-[10px] leading-snug ${textMuted}`}>
                Both thresholds must clear. Neither can pass alone. Naive cosine can’t reproduce this — the gate is what turns strong axis alignment into a defensible go/no-go.
              </p>
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="min-h-0 flex flex-col gap-2 sm:gap-3 overflow-hidden">

          {/* Axis chips */}
          <section className={`rounded-sm border p-3 sm:p-4 shrink-0 ${panel}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-black uppercase tracking-widest ${accent}`}>
                Canonical mechanism axes
              </span>
              <span className={`text-[9px] font-bold uppercase ${textMuted}`}>7 core + 1 opt-in</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {PATHWAYS_7D.map((p) => (
                <div key={p.key} className={`rounded border px-2 py-1.5 ${chip}`}>
                  <p className="text-[9px] font-black uppercase leading-none">{p.label}</p>
                  <p className={`text-[9px] leading-snug mt-0.5 ${textMuted}`}>{p.name}</p>
                </div>
              ))}
              <div className={`rounded border px-2 py-1.5 col-span-2 sm:col-span-4 ${chipRss}`}>
                <p className="text-[9px] font-black uppercase leading-none">RSS · opt-in 8th axis</p>
                <p className="text-[9px] leading-snug mt-0.5 opacity-80">Replication-Stress Score — enabled only when the therapy modality demands it. Reference: PMID 34552099.</p>
              </div>
            </div>
          </section>

          {/* Divergence teasers */}
          <section className={`rounded-sm border flex-1 min-h-0 flex flex-col overflow-hidden ${panel}`}>
            <div className={`shrink-0 flex items-center justify-between px-3 py-2 border-b ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
              <span className={`text-[10px] font-black uppercase tracking-widest ${textMain}`}>Illustrative divergence cases</span>
              <span className={`text-[9px] font-bold uppercase ${textMuted}`}>{DIVERGENCE_CASES.length} case files</span>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-transparent">
              {DIVERGENCE_CASES.map((c, i) => (
                <div
                  key={c.id}
                  className={`px-3 py-2 sm:py-2.5 border-b last:border-b-0 ${
                    isDarkMode ? 'border-zinc-800/70' : 'border-slate-100'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className={`text-[10px] font-black uppercase mt-0.5 ${accent}`}>
                      {c.id}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`text-[12px] font-bold leading-snug ${textMain}`}>{c.title}</p>
                      <p className={`text-[10px] leading-snug mt-0.5 ${textMuted}`}>{c.audience}</p>
                    </div>
                    <span className={`shrink-0 text-[9px] font-black uppercase rounded px-1.5 py-0.5 ${c.outcome.verdict === 'FAIL' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      {c.outcome.verdict}
                    </span>
                  </div>
                  <p className={`mt-1 text-[10px] leading-snug ${textMuted}`}>
                    <span className={`font-bold ${textMain}`}>{c.conflict.label}:</span> {c.conflict.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Deep dives */}
          <section className={`rounded-sm border p-3 sm:p-4 shrink-0 ${panel}`}>
            <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>
              Engine deep dives
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Link
                href="/engine/mechanism-alignment/scroll"
                className={`group flex items-start gap-2 rounded-sm border p-2.5 transition-colors ${panel} ${
                  isDarkMode ? 'hover:border-fuchsia-500/40' : 'hover:border-fuchsia-300'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className={`text-[10px] font-black uppercase tracking-[0.15em] ${accent}`}>Scroll surface</p>
                  <p className={`mt-1 text-[11px] leading-snug ${textMain}`}>
                    Case-by-case scroll through 3 illustrative divergence scenarios — patient vector, therapy vector, projection, composite verdict.
                  </p>
                </div>
                <ArrowRight className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${accent}`} />
              </Link>
              <Link
                href="/engine/mechanism-alignment/tabs"
                className={`group flex items-start gap-2 rounded-sm border p-2.5 transition-colors ${panel} ${
                  isDarkMode ? 'hover:border-fuchsia-500/40' : 'hover:border-fuchsia-300'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className={`text-[10px] font-black uppercase tracking-[0.15em] ${accent}`}>Tab strip</p>
                  <p className={`mt-1 text-[11px] leading-snug ${textMain}`}>
                    One tab per case + a governance tab covering PATH A signature, RSS opt-in policy, and DL-07 quarantine rule.
                  </p>
                </div>
                <ArrowRight className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${accent}`} />
              </Link>
            </div>
            <p className={`mt-2 text-[9px] italic leading-snug ${textMuted}`}>
              {PATH_A_APPROVAL}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
