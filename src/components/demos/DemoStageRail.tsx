'use client';

/**
 * DemoStageRail — horizontal tab strip (SL-page idiom).
 *
 * Mirrors the tab strip from SyntheticLethalityTabSurface.tsx:
 *   flex flex-wrap gap-2, buttons w/ icon + numeric badge + label
 *   active: border-cyan-500/50 bg-cyan-950/30 text-cyan-300 (dark) / indigo (light)
 *   inactive: border-zinc-800 bg-zinc-950 hover:cyan (dark) / border-zinc-200 hover:indigo (light)
 *
 * Icons cycle through a fixed lucide set keyed by stage index. Each row
 * carries a numeric badge ("1", "2", ...) so the walker feels sequential.
 */

import type { LucideIcon } from 'lucide-react';
import {
  FileText,
  Layers,
  Search,
  Target,
  Shield,
  ClipboardList,
  Beaker,
  BarChart3,
  Compass,
  Lightbulb,
  Activity,
  Radar,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import GovernanceStatusPill from './GovernanceStatusPill';
import type { DemoStage } from '@/data/demos/types';
import { UI_LABELS } from './labels';

// 12 icons — more than any spec has stages (max 7). Cycled by stage index.
const STAGE_ICONS: LucideIcon[] = [
  FileText,
  Layers,
  Search,
  Target,
  Shield,
  Activity,
  ClipboardList,
  Beaker,
  BarChart3,
  Compass,
  Lightbulb,
  Radar,
];

export default function DemoStageRail({
  stages,
  activeStageId,
  onSelect,
}: {
  stages: DemoStage[];
  activeStageId: number;
  onSelect: (stageId: number) => void;
}) {
  const { isDarkMode } = useTheme();

  return (
    <nav
      aria-label={UI_LABELS.demo_walker_stage_rail_aria}
      className={`border-b ${isDarkMode ? 'border-white/5 bg-black/40' : 'border-zinc-200 bg-white/60'}`}
    >
      <div className="mx-auto flex max-w-[1600px] flex-wrap gap-2 px-6 py-3">
        {stages.map((s, i) => {
          const active = s.stage_id === activeStageId;
          const Icon = STAGE_ICONS[i % STAGE_ICONS.length];
          return (
            <button
              key={s.stage_id}
              type="button"
              onClick={() => onSelect(s.stage_id)}
              className={`flex items-center gap-2 rounded border px-3 py-2 text-[10px] font-black uppercase tracking-[0.25em] transition-colors ${
                active
                  ? isDarkMode
                    ? 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300'
                    : 'border-indigo-500/50 bg-indigo-50 text-indigo-700'
                  : isDarkMode
                  ? 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-cyan-500/30 hover:text-cyan-300'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:border-indigo-400 hover:text-indigo-600'
              }`}
              aria-pressed={active}
              aria-label={`${UI_LABELS.demo_walker_stage_of} ${s.stage_id} ${UI_LABELS.demo_walker_of} ${stages.length} — ${s.name}`}
            >
              <Icon className="h-3 w-3" aria-hidden />
              <span
                className={`font-mono text-[9px] ${
                  active
                    ? isDarkMode
                      ? 'text-cyan-400'
                      : 'text-indigo-500'
                    : isDarkMode
                    ? 'text-zinc-600'
                    : 'text-zinc-400'
                }`}
              >
                {String(s.stage_id).padStart(2, '0')}
              </span>
              <span>{s.name}</span>
              <GovernanceStatusPill status={s.status} size="xs" />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
