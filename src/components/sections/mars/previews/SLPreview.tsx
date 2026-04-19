'use client';

import React, { useState, useCallback } from 'react';
import { Beaker, CheckCircle2 } from 'lucide-react';
import { GlitchTypewriter } from '@/components/ui/GlitchTypewriter';
import { DynamicEvidencePanel } from '@/components/ui/DynamicEvidencePanel';
import { HERO_HEADLINES } from '@/data/hero-headlines';
import {
  THERAPY_AXES,
  EVIDENCE_MODALITIES,
  type EvidenceStatus,
} from '@/data/sl-engine-data';

// ─── Compact status indicator ────────────────────────────────────────────────

function StatusDot({ status }: { status: EvidenceStatus }) {
  const c =
    status === 'POSITIVE' ? 'bg-emerald-500' :
    status === 'NEGATIVE' ? 'bg-rose-500' :
    status === 'MIXED' ? 'bg-amber-500' :
    status === 'CONFOUNDED' ? 'bg-purple-500' :
    'bg-zinc-700';
  return <div className={`w-3 h-3 rounded-[2px] ${c}`} />;
}

// ─── SL Preview (Hero Carousel) ───────────────────────────────────────────────

const SLPreview = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const accent = isDarkMode ? 'text-emerald-400' : 'text-emerald-600';
  const muted = isDarkMode ? 'text-zinc-300' : 'text-slate-600';
  const heading = isDarkMode ? 'text-white' : 'text-slate-900';
  const border = isDarkMode ? 'border-zinc-800' : 'border-slate-200';
  const cardBg = isDarkMode ? 'bg-zinc-950/60' : 'bg-white';

  const headlines = HERO_HEADLINES['synthetic-lethality'] || [];
  const [activeIdx, setActiveIdx] = useState(0);
  const handleLineChange = useCallback((i: number) => setActiveIdx(i), []);

  // Show only first 4 axes in the compact view
  const compactAxes = THERAPY_AXES.slice(0, 4);

  return (
    <div className="w-full min-h-0 flex-1 flex flex-col md:flex-row gap-3 md:gap-6 p-2 sm:p-6 overflow-hidden">
      {/* Left — Evidence Matrix compact */}
      <div className={`flex-1 border rounded-sm p-3 sm:p-5 min-w-0 ${cardBg} ${border}`}>
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
          <Beaker className={`w-4 h-4 sm:w-5 sm:h-5 ${accent}`} />
          <span className={`text-[11px] sm:text-sm font-black uppercase tracking-[0.16em] sm:tracking-[0.2em] ${heading}`}>Evidence Matrix</span>
        </div>

        {/* Compact heatmap */}
        <div className="space-y-2">
          {compactAxes.map((axis, index) => (
            <div key={axis.name} className={`flex flex-wrap items-center gap-2 sm:gap-3 ${index > 2 ? 'hidden sm:flex' : ''}`}>
              <span className={`text-[10px] sm:text-[11px] font-black uppercase w-full sm:w-32 sm:truncate ${heading}`}>{axis.name}</span>
              <div className="flex gap-1">
                {EVIDENCE_MODALITIES.map(mod => (
                  <StatusDot key={mod} status={axis.modalities[mod]?.status || 'MISSING'} />
                ))}
              </div>
              <span className={`text-[10px] font-black uppercase ml-auto ${accent}`}>{axis.tier}</span>
            </div>
          ))}
        </div>

        {/* Typewriter */}
        <div className="mt-4 sm:mt-6 hidden sm:block">
          <GlitchTypewriter
            lines={headlines}
            accentColor={accent}
            isDarkMode={isDarkMode}
            onLineChange={handleLineChange}
          />
        </div>
      </div>

      {/* Right — Dynamic Evidence Panel */}
      <div className="hidden md:flex w-full md:w-80 flex-col justify-end">
        <DynamicEvidencePanel
          headlines={headlines}
          activeIndex={activeIdx}
          isDarkMode={isDarkMode}
          accentColor={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}
        />
      </div>
    </div>
  );
};

export default SLPreview;
