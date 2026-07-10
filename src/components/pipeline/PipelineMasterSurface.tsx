'use client';

/**
 * PipelineMasterSurface — left rail (7 programs) + right pane (tabs).
 * SOURCE: pipeline-master.ts (auto-generated from crispro_master_pipeline.json).
 * UX pattern lifted from /tumor-board TumorBoardSurface.
 */

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShieldCheck, Target, FlaskConical, Zap, Layers, BarChart3, Lock } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import {
  PIPELINE_EXTERNAL_PROGRAMS,
  PIPELINE_INTERNAL_PROGRAMS,
  PIPELINE_META,
  PIPELINE_PLATFORM,
  type PipelineProgram,
} from '@/data/pipeline-master';
import PipelineProgramCard from './PipelineProgramCard';

const TABS = ['overview', 'trials', 'findings', 'lessons', 'value'] as const;
type TabKey = (typeof TABS)[number];
const TAB_LABEL: Record<TabKey, string> = {
  overview: 'Overview',
  trials: 'Trials',
  findings: 'Key findings',
  lessons: 'Transfer lessons',
  value: 'IP value',
};

const PREVIEW_ICON: Record<string, typeof Target> = {
  ATR_DDR: Zap,
  CEACAM5: Target,
  IO_CORE: Layers,
  IO_APPENDIX: Layers,
  HISTORICAL_BENCHMARKS: BarChart3,
  BREAK_CRC_001: ShieldCheck,
  GBM_ESCAPEMAP: Lock,
};

export default function PipelineMasterSurface() {
  const { isDarkMode } = useTheme();
  const params = useSearchParams();
  const showInternal = params?.get('internal') === 'true';

  const programs = useMemo(() => {
    return showInternal
      ? [...PIPELINE_EXTERNAL_PROGRAMS, ...PIPELINE_INTERNAL_PROGRAMS]
      : PIPELINE_EXTERNAL_PROGRAMS;
  }, [showInternal]);

  const [activeId, setActiveId] = useState<string>(programs[0]?.program_id ?? '');
  const [tab, setTab] = useState<TabKey>('overview');
  const active = programs.find((p) => p.program_id === activeId) ?? programs[0];

  return (
    <div className={isDarkMode ? 'min-h-screen bg-black text-white' : 'min-h-screen bg-white text-zinc-900'}>
      <ZetaNavbar />
      <div className="pt-16 px-6 max-w-[1600px] mx-auto">
        <header className="border-b border-white/10 pb-4">
          <div className="text-[10px] uppercase tracking-[0.24em] text-cyan-300">Pipeline · {PIPELINE_META.generated_date}</div>
          <h1 className="mt-1 text-3xl font-semibold">{PIPELINE_PLATFORM.name} — {PIPELINE_PLATFORM.tagline}</h1>
          <p className="mt-2 max-w-3xl text-sm text-white/60">
            {PIPELINE_PLATFORM.mission}
          </p>
          <div className="mt-2 flex flex-wrap gap-3 text-[10px] uppercase tracking-widest text-white/50">
            <span>{PIPELINE_META.total_programs} programs</span>
            <span>· {PIPELINE_META.total_trials_decoded} trials decoded</span>
            <span>· formula: {PIPELINE_META.governance_status?.formula}</span>
            <span>· signed {PIPELINE_META.governance_status?.formula_signed}</span>
          </div>
        </header>

        <div className="mt-6 grid grid-cols-[280px_1fr] gap-6">
          {/* Left rail */}
          <nav aria-label="Programs" className="space-y-1">
            {programs.map((p) => {
              const Icon = PREVIEW_ICON[p.program_id] ?? Target;
              const isActive = p.program_id === active.program_id;
              return (
                <button
                  key={p.program_id}
                  type="button"
                  onClick={() => setActiveId(p.program_id)}
                  className={
                    'w-full text-left px-3 py-2.5 border rounded flex items-start gap-2 transition-colors ' +
                    (isActive
                      ? 'border-cyan-400/60 bg-cyan-500/10 text-white'
                      : 'border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.05]')
                  }
                >
                  <Icon className={`h-4 w-4 mt-0.5 ${isActive ? 'text-cyan-300' : 'text-white/40'}`} aria-hidden />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-white/40">#{p.program_number} · {p.trial_count} trials</div>
                    <div className="text-sm font-medium truncate">{p.program_name}</div>
                    {p.admissibility !== 'external_safe' && (
                      <div className="mt-1 inline-flex items-center gap-1 rounded border border-amber-400/40 bg-amber-500/10 px-1.5 py-0.5 text-[9px] uppercase tracking-widest text-amber-200">
                        <Lock className="h-2.5 w-2.5" /> internal only
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Right pane */}
          <section>
            <div className="flex items-center gap-1 border-b border-white/10 mb-3">
              {TABS.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setTab(k)}
                  className={
                    'px-3 py-2 text-[11px] uppercase tracking-widest transition-colors border-b-2 ' +
                    (tab === k ? 'border-cyan-400 text-cyan-200' : 'border-transparent text-white/50 hover:text-white')
                  }
                >
                  {TAB_LABEL[k]}
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
