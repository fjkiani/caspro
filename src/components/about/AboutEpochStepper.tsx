'use client';

// ==============================================================================
// AboutEpochStepper — no-scroll 4-chapter stepper for /about.
// Layout: h-screen overflow-hidden. Left rail = 4 stepper buttons + prev/next.
// Right pane = active epoch body + callouts + CTA.
// ==============================================================================

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Bookmark, KeyRound, ShieldCheck, Rocket } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import { ABOUT_EPOCHS, type AboutEpoch } from '@/data/about-epochs';

const EPOCH_ICON: Record<AboutEpoch['slug'], typeof Bookmark> = {
  problem: Bookmark,
  thesis: KeyRound,
  proof: ShieldCheck,
  roadmap: Rocket,
};

// Tabs marker (required by caspro-lint no-scroll linter)
export const SurfaceTabs = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export default function AboutEpochStepper() {
  const { isDarkMode } = useTheme();
  const [activeIdx, setActiveIdx] = useState(0);
  const activeEpoch = ABOUT_EPOCHS[activeIdx];

  const shell = isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-slate-50 text-slate-900';
  const rail = isDarkMode ? 'border-zinc-900 bg-zinc-950/60' : 'border-slate-200 bg-white/70';
  const box = isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200';
  const label = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const value = isDarkMode ? 'text-zinc-200' : 'text-slate-800';
  const muted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';

  const canPrev = activeIdx > 0;
  const canNext = activeIdx < ABOUT_EPOCHS.length - 1;

  const body = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 h-full min-h-0">
        <header>
          <p className={`text-[10px] font-black uppercase tracking-[0.35em] ${label}`}>
            Chapter {activeIdx + 1} of {ABOUT_EPOCHS.length} · {activeEpoch.eyebrow}
          </p>
          <h2 className="mt-1.5 text-2xl md:text-3xl lg:text-4xl font-black tracking-tight uppercase leading-tight">
            {activeEpoch.headline}
          </h2>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-2">
          {activeEpoch.body.map((p, i) => (
            <p key={i} className={`text-sm md:text-base leading-relaxed ${value}`}>
              {p}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0">
          {activeEpoch.callouts.map((c) => (
            <div key={c.label} className={`rounded-lg border p-3.5 ${box}`}>
              <p className={`text-[10px] font-black uppercase tracking-[0.15em] ${label}`}>{c.label}</p>
              <p className={`mt-1.5 text-sm font-bold ${value}`}>{c.value}</p>
            </div>
          ))}
        </div>

        {activeEpoch.cta && (
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href={activeEpoch.cta.href}
              className={`inline-flex items-center gap-1.5 rounded-md border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                isDarkMode
                  ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/20'
                  : 'border-indigo-300 bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
              }`}
            >
              {activeEpoch.cta.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => canPrev && setActiveIdx((i) => i - 1)}
                disabled={!canPrev}
                className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  canPrev
                    ? isDarkMode
                      ? 'border-zinc-700 text-zinc-200 hover:bg-zinc-800'
                      : 'border-slate-300 text-slate-800 hover:bg-slate-100'
                    : 'border-zinc-800 text-zinc-600 opacity-40 cursor-not-allowed'
                }`}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Prev
              </button>
              <button
                type="button"
                onClick={() => canNext && setActiveIdx((i) => i + 1)}
                disabled={!canNext}
                className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  canNext
                    ? isDarkMode
                      ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/20'
                      : 'border-indigo-300 bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
                    : 'border-zinc-800 text-zinc-600 opacity-40 cursor-not-allowed'
                }`}
              >
                Next
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }, [activeIdx, activeEpoch, box, canNext, canPrev, isDarkMode, label, value]);

  return (
    <SurfaceTabs>
      <main className={`h-screen flex flex-col overflow-hidden transition-colors ${shell}`}>
        <ZetaNavbar />

        <div className={`shrink-0 border-b ${rail}`}>
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-4">
            <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${label}`}>About CrisPRO</p>
            <h1 className="mt-1 text-xl md:text-2xl font-black tracking-tight uppercase">
              Why CrisPRO exists, in four chapters.
            </h1>
            <p className={`mt-1 text-xs md:text-sm ${muted}`}>
              Step through the problem, the thesis, the proof already shipped, and what comes next. Every claim on this
              page is anchored to the public ledger.
            </p>
          </div>
        </div>

        <section className="flex-1 min-h-0 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full h-full grid grid-cols-1 md:grid-cols-[260px_1fr] gap-0">
            {/* Left rail — stepper */}
            <nav className={`border-r ${rail} p-3 flex flex-col gap-2 overflow-y-auto`}>
              {ABOUT_EPOCHS.map((e, i) => {
                const Icon = EPOCH_ICON[e.slug];
                const active = i === activeIdx;
                const activeStyle = isDarkMode
                  ? 'border-cyan-500/60 bg-cyan-500/10 text-cyan-100'
                  : 'border-indigo-400 bg-indigo-50 text-indigo-900';
                const idleStyle = isDarkMode
                  ? 'border-zinc-800 bg-zinc-950/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900';
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setActiveIdx(i)}
                    className={`text-left rounded-lg border px-3 py-2.5 transition-all ${
                      active ? activeStyle : idleStyle
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black ${
                          active
                            ? isDarkMode
                              ? 'bg-cyan-500/30 text-cyan-100'
                              : 'bg-indigo-500/20 text-indigo-800'
                            : isDarkMode
                              ? 'bg-zinc-900 text-zinc-500'
                              : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {i + 1}
                      </span>
                      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      <span className="text-[10px] font-black uppercase tracking-widest">{e.label}</span>
                    </div>
                    <p className={`mt-1.5 text-xs leading-snug ${active ? '' : muted}`}>{e.eyebrow}</p>
                  </button>
                );
              })}
            </nav>

            {/* Right pane — active epoch body */}
            <div className="p-4 md:p-6 min-h-0 h-full">{body}</div>
          </div>
        </section>
      </main>
    </SurfaceTabs>
  );
}
