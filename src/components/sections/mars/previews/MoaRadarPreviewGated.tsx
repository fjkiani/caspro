'use client';

/**
 * MoaRadarPreviewGated — identical to MoaRadarPreview but the "View De-Risking Map"
 * button opens the PasscodeModal instead of navigating directly.
 * Used by /moa page.
 */

import React, { useState, useCallback } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { TRIAL_CASE_FILES, VECTOR_AXIS_META } from '@/data/trial-case-files';
import { GlitchTypewriter } from '@/components/ui/GlitchTypewriter';
import { HERO_HEADLINES } from '@/data/hero-headlines';
import { GatedEvidencePanel } from '@/components/ui/GatedEvidencePanel';

const MoaRadarPreviewGated = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const trial = TRIAL_CASE_FILES['latify'];
  const radarData = VECTOR_AXIS_META.map(m => ({
    axis: m.label,
    trial: trial.trialVector[m.key],
    responder: trial.responderVector[m.key],
    non_responder: trial.nonResponderVector[m.key],
  }));

  const accent = isDarkMode ? 'text-red-400' : 'text-red-500';
  const headlines = HERO_HEADLINES['mechanism-alignment'] || [];
  const [activeIdx, setActiveIdx] = useState(0);
  const handleLineChange = useCallback((idx: number) => setActiveIdx(idx), []);

  return (
    <div className="flex-1 flex items-center justify-center w-full min-h-0 px-3 sm:px-4 py-2 sm:py-4">
      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-8 items-center min-h-0">

        {/* Left: Tagline + Gated Evidence Panel */}
        <div className="flex flex-col justify-center gap-4 lg:gap-8 py-2 lg:py-8 min-w-0 order-2 lg:order-none">
          <div>
            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.35em] sm:tracking-[0.5em] text-red-400/60 block mb-2 sm:mb-4">
              Root Cause Analysis
            </span>
            <GlitchTypewriter
              lines={headlines}
              accentColor={accent}
              isDarkMode={isDarkMode}
              onLineChange={handleLineChange}
            />
          </div>

          <div className="block w-full min-w-0">
            <GatedEvidencePanel
              headlines={headlines}
              activeIndex={activeIdx}
              isDarkMode={isDarkMode}
              accentColor={accent}
              targetLabel="LATIFY"
            />
          </div>
        </div>

        {/* Right: Radar Chart */}
        <div className="relative flex items-center justify-center min-h-[190px] sm:min-h-[280px] w-full min-w-0 order-1 lg:order-none">
          <div className="w-full max-w-[520px] aspect-square max-h-[min(72vw,320px)] sm:max-h-none mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="78%" data={radarData}>
                <PolarGrid stroke={isDarkMode ? '#27272a' : '#e2e8f0'} />
                <PolarAngleAxis
                  dataKey="axis"
                  tick={{ fill: isDarkMode ? '#a1a1aa' : '#475569', fontSize: 9, fontWeight: 'bold' }}
                />
                <PolarRadiusAxis angle={90} domain={[0, 1]} tick={false} axisLine={false} />
                <Radar
                  name="Non-Responder"
                  dataKey="non_responder"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fill="#f43f5e"
                  fillOpacity={0.08}
                />
                <Radar
                  name="Responder"
                  dataKey="responder"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="#10b981"
                  fillOpacity={0.05}
                />
                <Radar
                  name="Trial"
                  dataKey="trial"
                  stroke={isDarkMode ? '#22d3ee' : '#6366f1'}
                  strokeWidth={4}
                  fill={isDarkMode ? '#22d3ee' : '#6366f1'}
                  fillOpacity={0.12}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoaRadarPreviewGated;
