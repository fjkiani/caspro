'use client';

/**
 * DemoWalker — top-level shell for a single demo route.
 *
 * Layout mirrors SyntheticLethalityTabSurface + TargetLockWorkspace:
 *   Sticky top header (brand · route · right-side sibling links)
 *   Tab strip (DemoStageRail — horizontal wrapped buttons)
 *   Manuscript-style title strip (title + subtitle from spec)
 *   Panel body (DemoStageBody — active stage with framer-motion transition)
 *   Prev / Next nav row
 *   DemoRoadmapSection (closing)
 *   Footer cross-links (to the other two demos + /insilico/)
 */

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ListTree } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { usePersona, type Persona } from '@/context/PersonaContext';
import DemoStageRail from './DemoStageRail';
import DemoStageBody from './DemoStageBody';
import DemoRoadmapSection from './DemoRoadmapSection';
import { UI_LABELS } from './labels';
import type { DemoSpec } from '@/data/demos/types';

interface DemoWalkerProps {
  demo: DemoSpec;
  /** Which caspro persona to auto-set on route mount. Route-implied. */
  autoSetPersona: Persona;
  /** Route label shown under the brand ("/demo/patient" etc.). */
  routeLabel: string;
  /** Cross-link targets shown in header + footer. */
  siblingLinks: { href: string; label: string }[];
}

export default function DemoWalker({
  demo,
  autoSetPersona,
  routeLabel,
  siblingLinks,
}: DemoWalkerProps) {
  const { isDarkMode } = useTheme();
  const { setPersona } = usePersona();

  const stages = demo.stages;
  const [activeStageId, setActiveStageId] = useState<number>(stages[0]?.stage_id ?? 1);

  const activeStage = useMemo(
    () => stages.find((s) => s.stage_id === activeStageId) ?? stages[0],
    [stages, activeStageId],
  );
  const activeIndex = stages.findIndex((s) => s.stage_id === activeStageId);
  const prevStage = activeIndex > 0 ? stages[activeIndex - 1] : null;
  const nextStage = activeIndex >= 0 && activeIndex < stages.length - 1 ? stages[activeIndex + 1] : null;

  // Route-implied persona — auto-set once on mount, non-destructively.
  useEffect(() => {
    setPersona(autoSetPersona);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to top when stage changes.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeStageId]);

  return (
    <div
      className={`min-h-screen font-mono ${
        isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-white text-zinc-700'
      }`}
    >
      {/* Sticky top header */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-sm ${
          isDarkMode ? 'border-white/5 bg-black/60' : 'border-zinc-200 bg-white/80'
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/demo" className="group flex items-center gap-2">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded border transition-colors group-hover:border-cyan-500/50 ${
                  isDarkMode ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-100'
                }`}
              >
                <ListTree
                  className={isDarkMode ? 'h-4 w-4 text-cyan-400' : 'h-4 w-4 text-indigo-500'}
                />
              </div>
              <span
                className={`text-[11px] font-black uppercase tracking-[0.3em] transition-colors group-hover:text-cyan-400 ${
                  isDarkMode ? 'text-white' : 'text-zinc-900'
                }`}
              >
                {UI_LABELS.brand_chip}
              </span>
            </Link>
            <span
              className={`h-6 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-300'}`}
              aria-hidden
            />
            <span
              className={`text-[10px] font-black uppercase tracking-[0.4em] ${
                isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
              }`}
            >
              {routeLabel}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em]">
            {siblingLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  isDarkMode
                    ? 'text-zinc-400 transition-colors hover:text-cyan-400'
                    : 'text-zinc-600 transition-colors hover:text-indigo-600'
                }
              >
                {l.label} →
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Stage rail (horizontal tab strip) */}
      <DemoStageRail
        stages={stages}
        activeStageId={activeStageId}
        onSelect={setActiveStageId}
      />

      {/* Manuscript-style title strip */}
      <div
        className={`mx-auto max-w-[1600px] border-b px-6 py-6 ${
          isDarkMode ? 'border-white/5' : 'border-zinc-200'
        }`}
      >
        <p
          className={`mb-1 text-[10px] font-black uppercase tracking-[0.4em] ${
            isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
          }`}
        >
          {demo.title}
        </p>
        <p
          className={`max-w-4xl text-[13px] ${
            isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
          }`}
        >
          {demo.subtitle}
        </p>
      </div>

      {/* Active stage body */}
      {activeStage && <DemoStageBody stage={activeStage} />}

      {/* Prev / next nav row */}
      <div className="mx-auto max-w-[1600px] px-6 pb-10">
        <div
          className={`flex flex-wrap items-center justify-between gap-3 rounded border p-4 ${
            isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50'
          }`}
        >
          <button
            type="button"
            disabled={!prevStage}
            onClick={() => prevStage && setActiveStageId(prevStage.stage_id)}
            className={`inline-flex items-center gap-2 rounded border px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-colors ${
              prevStage
                ? isDarkMode
                  ? 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-cyan-500/40 hover:text-cyan-300'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:border-indigo-400 hover:text-indigo-600'
                : 'cursor-not-allowed border-zinc-800 bg-zinc-950 text-zinc-600 opacity-40'
            }`}
            aria-label={UI_LABELS.previous_stage}
          >
            <ChevronLeft className="h-3 w-3" aria-hidden />
            {UI_LABELS.previous_stage}
            {prevStage && <span className="opacity-60"> · {prevStage.name}</span>}
          </button>
          <span
            className={`text-[10px] font-black uppercase tracking-[0.3em] ${
              isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
            }`}
          >
            {UI_LABELS.demo_walker_stage_of} {activeStage?.stage_id ?? '—'} {UI_LABELS.demo_walker_of} {stages.length}
          </span>
          <button
            type="button"
            disabled={!nextStage}
            onClick={() => nextStage && setActiveStageId(nextStage.stage_id)}
            className={`inline-flex items-center gap-2 rounded border px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-colors ${
              nextStage
                ? isDarkMode
                  ? 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300 hover:border-cyan-500/60'
                  : 'border-indigo-500/40 bg-indigo-50 text-indigo-700 hover:border-indigo-500/60'
                : 'cursor-not-allowed border-zinc-800 bg-zinc-950 text-zinc-600 opacity-40'
            }`}
            aria-label={UI_LABELS.next_stage}
          >
            {nextStage && <span className="opacity-60">{nextStage.name} · </span>}
            {UI_LABELS.next_stage}
            <ChevronRight className="h-3 w-3" aria-hidden />
          </button>
        </div>
      </div>

      {/* Roadmap section (closing) */}
      <DemoRoadmapSection items={demo.roadmap_items} labels={demo.governance_labels} />

      {/* Footer cross-links */}
      <footer className={`border-t ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}>
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-4 px-6 py-8 md:grid-cols-3">
          {siblingLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`group rounded border p-4 transition-colors ${
                isDarkMode
                  ? 'border-zinc-800 bg-zinc-950/40 hover:border-cyan-500/50'
                  : 'border-zinc-200 bg-zinc-50 hover:border-indigo-500/50'
              }`}
            >
              <p
                className={`mb-1 text-[10px] font-black uppercase tracking-[0.3em] ${
                  isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                }`}
              >
                {l.label}
              </p>
              <ChevronRight
                className={`mt-3 h-4 w-4 ${
                  isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                }`}
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
