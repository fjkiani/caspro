'use client';

/**
 * PipelineMasterSurface — left rail (7 programs) + right pane (tabs).
 * SOURCE: pipeline-master.ts (auto-generated from crispro_master_pipeline.json).
 * UX pattern lifted from /tumor-board TumorBoardSurface, now with:
 *   • uniform mobile wrapper (max-w-[1400px] px-4 py-6 md:px-8 md:py-10)
 *   • sidebar STACKS on mobile (flex-col), 220-col grid ≥ md
 *   • light-mode across every element (isDarkMode branches)
 *   • persona-aware tab labels (via PROGRAM_CARD_COPY)
 *   • persona-aware initial tab (patient → overview, pharma → value)
 */

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShieldCheck, Target, Zap, Layers, BarChart3, Lock } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { usePersona } from '@/context/PersonaContext';
import { PROGRAM_CARD_COPY } from '@/data/pipeline/persona-copy';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import {
  PIPELINE_EXTERNAL_PROGRAMS,
  PIPELINE_INTERNAL_PROGRAMS,
  PIPELINE_META,
  PIPELINE_PLATFORM,
} from '@/data/pipeline-master';
import { getPipelinePersonaHeader } from '@/data/pipeline-master-persona-copy';
import PipelineProgramCard from './PipelineProgramCard';

const TABS = ['overview', 'trials', 'findings', 'lessons', 'value'] as const;
type TabKey = (typeof TABS)[number];

const PREVIEW_ICON: Record<string, typeof Target> = {
  ATR_DDR: Zap,
  CEACAM5: Target,
  IO_CORE: Layers,
  IO_APPENDIX: Layers,
  HISTORICAL_BENCHMARKS: BarChart3,
  BREAK_CRC_001: ShieldCheck,
  GBM_ESCAPEMAP: Lock,
};

// Emphasis map — which tab the pipeline opens on mount for each persona.
const DEFAULT_TAB_FOR_PERSONA: Record<'oncologist' | 'patient' | 'pharma', TabKey> = {
  oncologist: 'overview',
  patient:    'overview',
  pharma:     'value',
};

export default function PipelineMasterSurface() {
  const { isDarkMode } = useTheme();
  const { persona } = usePersona();
  const params = useSearchParams();
  const showInternal = params?.get('internal') === 'true';

  const programs = useMemo(() => {
    return showInternal
      ? [...PIPELINE_EXTERNAL_PROGRAMS, ...PIPELINE_INTERNAL_PROGRAMS]
      : PIPELINE_EXTERNAL_PROGRAMS;
  }, [showInternal]);

  const copy = PROGRAM_CARD_COPY[persona];
  const initialTab = DEFAULT_TAB_FOR_PERSONA[persona] ?? 'overview';

  const [activeId, setActiveId] = useState<string>(programs[0]?.program_id ?? '');
  const [tab, setTab] = useState<TabKey>(initialTab);
  const active = programs.find((p) => p.program_id === activeId) ?? programs[0];

  // ---- token colors ----
  const rootBg      = isDarkMode ? 'bg-black text-white' : 'bg-white text-zinc-900';
  const eyebrow     = isDarkMode ? 'text-cyan-300' : 'text-indigo-600';
  const heading     = isDarkMode ? 'text-white' : 'text-zinc-900';
  const body        = isDarkMode ? 'text-white/60' : 'text-zinc-600';
  const meta        = isDarkMode ? 'text-white/50' : 'text-zinc-500';
  const metaDim     = isDarkMode ? 'text-white/40' : 'text-zinc-500';
  const border      = isDarkMode ? 'border-white/10' : 'border-zinc-200';
  const railBorder  = isDarkMode ? 'border-white/10' : 'border-zinc-200';
  const railBg      = isDarkMode ? 'bg-white/[0.02]' : 'bg-white';
  const railBgHover = isDarkMode ? 'hover:bg-white/[0.05]' : 'hover:bg-zinc-50';
  const railText    = isDarkMode ? 'text-white/70' : 'text-zinc-700';
  const activeBrd   = isDarkMode ? 'border-cyan-400/60' : 'border-indigo-500/60';
  const activeBg    = isDarkMode ? 'bg-cyan-500/10' : 'bg-indigo-50';
  const activeText  = isDarkMode ? 'text-white' : 'text-indigo-900';
  const activeIcon  = isDarkMode ? 'text-cyan-300' : 'text-indigo-600';
  const inactiveIcon = isDarkMode ? 'text-white/40' : 'text-zinc-400';
  const tabBorder    = isDarkMode ? 'border-white/10' : 'border-zinc-200';
  const tabActive    = isDarkMode ? 'border-cyan-400 text-cyan-200' : 'border-indigo-500 text-indigo-700';
  const tabInactive  = isDarkMode ? 'border-transparent text-white/50 hover:text-white' : 'border-transparent text-zinc-500 hover:text-zinc-900';
  const internalBadge = isDarkMode
    ? 'border-amber-400/40 bg-amber-500/10 text-amber-200'
    : 'border-amber-500/40 bg-amber-50 text-amber-700';

  return (
    <div className={`min-h-screen ${rootBg}`}>
      <ZetaNavbar />
      <div className="mx-auto w-full max-w-[1400px] px-4 pt-16 md:px-8">
        <header className={`border-b pb-4 ${border}`}>
          <div className={`text-[10px] uppercase tracking-[0.24em] ${eyebrow}`}>
            Pipeline · {PIPELINE_META.generated_date}
          </div>
          <h1 className={`mt-1 text-2xl font-semibold md:text-3xl ${heading}`}>
            {PIPELINE_PLATFORM.name} — {PIPELINE_PLATFORM.tagline}
          </h1>
          <p className={`mt-2 max-w-3xl text-sm ${body}`}>{PIPELINE_PLATFORM.mission}</p>
          <div className={`mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] uppercase tracking-widest ${meta}`}>
            <span>{PIPELINE_META.total_programs} programs</span>
            <span>· {PIPELINE_META.total_trials_decoded} trials decoded</span>
            <span>· formula: {PIPELINE_META.governance_status?.formula}</span>
            <span>· signed {PIPELINE_META.governance_status?.formula_signed}</span>
          </div>
        </header>

        <div className="mt-6 flex flex-col gap-4 pb-10 md:grid md:grid-cols-[220px_1fr] md:gap-6">
          {/* Left rail — stacks on mobile, sticky sidebar on desktop */}
          <nav aria-label="Programs" className="w-full space-y-1 md:sticky md:top-24 md:self-start">
            {programs.map((p) => {
              const Icon = PREVIEW_ICON[p.program_id] ?? Target;
              const isActive = p.program_id === active.program_id;
              return (
                <button
                  key={p.program_id}
                  type="button"
                  onClick={() => setActiveId(p.program_id)}
                  className={
                    'flex w-full items-start gap-2 rounded border px-3 py-2.5 text-left transition-colors ' +
                    (isActive
                      ? `${activeBrd} ${activeBg} ${activeText}`
                      : `${railBorder} ${railBg} ${railText} ${railBgHover}`)
                  }
                >
                  <Icon
                    className={`mt-0.5 h-4 w-4 ${isActive ? activeIcon : inactiveIcon}`}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <div className={`text-[10px] uppercase tracking-widest ${metaDim}`}>
                      #{p.program_number} · {p.trial_count} trials
                    </div>
                    <div className={`truncate text-sm font-medium ${isActive ? activeText : heading}`}>
                      {getPipelinePersonaHeader(p, persona).program_name}
                    </div>
                    {p.admissibility !== 'external_safe' && (
                      <div
                        className={`mt-1 inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[9px] uppercase tracking-widest ${internalBadge}`}
                      >
                        <Lock className="h-2.5 w-2.5" /> internal only
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Right pane */}
          <section className="min-w-0">
            <div className={`mb-3 flex flex-wrap items-center gap-1 border-b ${tabBorder}`}>
              {TABS.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setTab(k)}
                  className={
                    'border-b-2 px-3 py-2 text-[11px] uppercase tracking-widest transition-colors ' +
                    (tab === k ? tabActive : tabInactive)
                  }
                >
                  {copy.tabLabels[k]}
                </button>
              ))}
            </div>
            <PipelineProgramCard program={active} tab={tab} />
          </section>
        </div>
      </div>
    </div>
  );
}
