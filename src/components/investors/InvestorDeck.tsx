'use client';

// ==============================================================================
// InvestorDeck — no-scroll deck-in-page for /investors.
// Layout: h-screen overflow-hidden. Top strip = eyebrow + slide title strip.
// Left rail = 5 slide buttons + prev/next controls (bottom).
// Right pane = active slide body (subtitle + bullets + metrics + CTA).
// ==============================================================================

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Coins,
  Layers,
  ShieldCheck,
  Target,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import { INVESTOR_SLIDES, type InvestorSlide } from '@/data/investor-slides';

const SLIDE_ICON: Record<InvestorSlide['slug'], typeof Target> = {
  problem: AlertTriangle,
  wedge: Target,
  proof: ShieldCheck,
  model: Layers,
  ask: Coins,
};

// Tabs marker (required by caspro-lint no-scroll linter)
export const SurfaceTabs = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export default function InvestorDeck() {
  const { isDarkMode } = useTheme();
  const [activeIdx, setActiveIdx] = useState(0);
  const activeSlide = INVESTOR_SLIDES[activeIdx];

  const shell = isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-slate-50 text-slate-900';
  const rail = isDarkMode ? 'border-zinc-900 bg-zinc-950/60' : 'border-slate-200 bg-white/70';
  const box = isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200';
  const label = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const value = isDarkMode ? 'text-zinc-200' : 'text-slate-800';
  const muted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';

  const canPrev = activeIdx > 0;
  const canNext = activeIdx < INVESTOR_SLIDES.length - 1;

  const body = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 h-full min-h-0">
        <header className="shrink-0">
          <p className={`text-[10px] font-black uppercase tracking-[0.35em] ${label}`}>{activeSlide.eyebrow}</p>
          <h2 className="mt-1.5 text-2xl md:text-3xl lg:text-4xl font-black tracking-tight uppercase leading-tight">
            {activeSlide.title}
          </h2>
          <p className={`mt-2 text-sm md:text-base leading-relaxed max-w-4xl ${muted}`}>{activeSlide.subtitle}</p>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto pr-2">
          <ul className="space-y-2.5">
            {activeSlide.bullets.map((b, i) => (
              <li key={i} className={`flex items-start gap-2 text-sm md:text-base leading-relaxed ${value}`}>
                <CheckCircle2
                  className={`h-4 w-4 mt-1 shrink-0 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}
                  aria-hidden
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0">
          {activeSlide.metrics.map((m) => (
            <div key={m.label} className={`rounded-lg border p-3.5 ${box}`}>
              <p className={`text-[10px] font-black uppercase tracking-[0.15em] ${label}`}>{m.label}</p>
              <p className={`mt-1.5 text-sm font-bold ${value}`}>{m.value}</p>
              {m.footnote && <p className={`mt-1 text-[10px] italic ${muted}`}>{m.footnote}</p>}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {activeSlide.cta && (
            <Link
              href={activeSlide.cta.href}
              className={`inline-flex items-center gap-1.5 rounded-md border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                isDarkMode
                  ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/20'
                  : 'border-indigo-300 bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
              }`}
            >
              {activeSlide.cta.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
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
      </div>
    );
  }, [activeSlide, box, canNext, canPrev, isDarkMode, label, muted, value]);

  return (
    <SurfaceTabs>
      <main className={`h-screen flex flex-col overflow-hidden transition-colors ${shell}`}>
        <ZetaNavbar />

        <div className={`shrink-0 border-b ${rail}`}>
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-4">
            <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${label}`}>Investors</p>
            <h1 className="mt-1 text-xl md:text-2xl font-black tracking-tight uppercase">
              The CrisPRO thesis, in five slides.
            </h1>
            <p className={`mt-1 text-xs md:text-sm ${muted}`}>
              This deck is the same one used in partner conversations. No fabricated numbers, no black-box scores. Every
              claim traces to the public ledger.
            </p>
          </div>
        </div>

        <section className="flex-1 min-h-0 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full h-full grid grid-cols-1 md:grid-cols-[260px_1fr] gap-0">
            <nav className={`border-r ${rail} p-3 flex flex-col gap-2 overflow-y-auto`}>
              {INVESTOR_SLIDES.map((s, i) => {
                const Icon = SLIDE_ICON[s.slug];
                const active = i === activeIdx;
                const activeStyle = isDarkMode
                  ? 'border-cyan-500/60 bg-cyan-500/10 text-cyan-100'
                  : 'border-indigo-400 bg-indigo-50 text-indigo-900';
                const idleStyle = isDarkMode
                  ? 'border-zinc-800 bg-zinc-950/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900';
                return (
                  <button
                    key={s.id}
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
                      <span className="text-[10px] font-black uppercase tracking-widest">{s.eyebrow.split('·')[1]?.trim() || s.slug}</span>
                    </div>
                    <p className={`mt-1.5 text-xs leading-snug ${active ? '' : muted}`}>{s.title}</p>
                  </button>
                );
              })}
            </nav>

            <div className="p-4 md:p-6 min-h-0 h-full">{body}</div>
          </div>
        </section>
      </main>
    </SurfaceTabs>
  );
}
