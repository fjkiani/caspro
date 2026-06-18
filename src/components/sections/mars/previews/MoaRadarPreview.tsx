'use client';

import React, { useState, useCallback } from 'react';
import { ResponsiveContainer } from 'recharts';
import { TRIAL_CASE_FILES } from '@/data/trial-case-files';
import {
  buildDualGeometryRadarData,
  DualGeometryRadar,
} from '@/components/sections/mars/DualGeometryRadar';
import { GlitchTypewriter } from '@/components/ui/GlitchTypewriter';
import { HERO_HEADLINES } from '@/data/hero-headlines';
import { DynamicEvidencePanel } from '@/components/ui/DynamicEvidencePanel';

const MoaRadarPreview = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const trial = TRIAL_CASE_FILES['latify'];
  const radarData = buildDualGeometryRadarData(trial);

  const accent = isDarkMode ? 'text-red-400' : 'text-red-500';
  const muted = isDarkMode ? 'text-zinc-300' : 'text-slate-600';
  const heading = isDarkMode ? 'text-white' : 'text-slate-900';
  const headlines = HERO_HEADLINES['mechanism-alignment'] || [];
  const [activeIdx, setActiveIdx] = useState(0);
  const handleLineChange = useCallback((idx: number) => setActiveIdx(idx), []);

  return (
    <div className="flex-1 flex items-center justify-center w-full min-h-0 px-3 sm:px-4 py-2 sm:py-4">
      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-8 items-center min-h-0">

        {/* Left: Tagline + Legend */}
        <div className="flex flex-col justify-center gap-4 lg:gap-8 py-2 lg:py-8 min-w-0 order-2 lg:order-none">
          {/* Typewriter Tagline */}
          <div>
            <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-[0.35em] sm:tracking-[0.5em] text-red-400/60 block mb-2 sm:mb-4`}>
              Root Cause Analysis
            </span>
            <GlitchTypewriter
              lines={headlines}
              accentColor={accent}
              isDarkMode={isDarkMode}
              onLineChange={handleLineChange}
            />
          </div>

          {/* Dynamic Evidence Panel */}
          <div className="hidden sm:block">
            <DynamicEvidencePanel
            headlines={headlines}
            activeIndex={activeIdx}
            isDarkMode={isDarkMode}
            accentColor={accent}
            />
          </div>
        </div>

        {/* Right: Radar Chart */}
        <div className="relative flex items-center justify-center min-h-[190px] sm:min-h-[280px] w-full min-w-0 order-1 lg:order-none">
          <div className="w-full max-w-[520px] aspect-square max-h-[min(72vw,320px)] sm:max-h-none mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <DualGeometryRadar data={radarData} isDarkMode={isDarkMode} outerRadius="78%" />
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoaRadarPreview;
