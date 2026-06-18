'use client';

import React, { useState, useCallback } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import { GlitchTypewriter } from '@/components/ui/GlitchTypewriter';
import { HERO_HEADLINES } from '@/data/hero-headlines';
import { DynamicEvidencePanel } from '@/components/ui/DynamicEvidencePanel';

const IO_DATA = [
  { axis: 'TMB', responsive: 85, harmful: 20 },
  { axis: 'PD-L1', responsive: 90, harmful: 15 },
  { axis: 'MSI', responsive: 70, harmful: 10 },
  { axis: 'CD8+ TIL', responsive: 80, harmful: 25 },
  { axis: 'IFN-γ', responsive: 75, harmful: 30 },
  { axis: 'MDSC', responsive: 20, harmful: 85 },
  { axis: 'Treg', responsive: 25, harmful: 75 },
  { axis: 'irAE Risk', responsive: 30, harmful: 90 },
];

const IoGatePreview = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const accent = isDarkMode ? 'text-rose-400' : 'text-rose-600';
  const muted = isDarkMode ? 'text-zinc-300' : 'text-slate-600';
  const heading = isDarkMode ? 'text-white' : 'text-slate-900';
  const headlines = HERO_HEADLINES['io-risk-benefit'] || [];
  const [activeIdx, setActiveIdx] = useState(0);
  const handleLineChange = useCallback((idx: number) => setActiveIdx(idx), []);

  return (
    <div className="flex-1 flex items-center justify-center w-full px-4">
      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-center">

        {/* Left: Tagline + Legend */}
        <div className="flex flex-col justify-center gap-8 py-8">
          <div>
            <span className={`text-[9px] font-black uppercase tracking-[0.5em] ${accent} block mb-4`}>
              Harm Prevention
            </span>
            <GlitchTypewriter
              lines={headlines}
              accentColor={accent}
              isDarkMode={isDarkMode}
              onLineChange={handleLineChange}
              loop={false}
            />
          </div>

          {/* Dynamic Evidence Panel */}
          <DynamicEvidencePanel
            headlines={headlines}
            activeIndex={activeIdx}
            isDarkMode={isDarkMode}
            accentColor={accent}
          />
        </div>

        {/* Right: IO Radar Chart */}
        <div className="relative flex items-center justify-center">
          <div className="w-full max-w-[500px] aspect-square">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="72%" data={IO_DATA}>
                <PolarGrid stroke={isDarkMode ? '#27272a' : '#e2e8f0'} />
                <PolarAngleAxis
                  dataKey="axis"
                  tick={{ fill: isDarkMode ? '#a1a1aa' : '#475569', fontSize: 11, fontWeight: 'bold' }}
                />
                <Radar
                  name="Responsive"
                  dataKey="responsive"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="#10b981"
                  fillOpacity={0.12}
                />
                <Radar
                  name="Harmful"
                  dataKey="harmful"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fill="#f43f5e"
                  fillOpacity={0.08}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoGatePreview;
