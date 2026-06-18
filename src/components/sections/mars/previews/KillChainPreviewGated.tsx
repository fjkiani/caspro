'use client';

/**
 * KillChainPreviewGated — identical to KillChainPreview but the "View De-Risking Map"
 * button opens the PasscodeModal instead of navigating directly.
 * Used by /resistance page.
 */

import React, { useState, useCallback } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { GlitchTypewriter } from '@/components/ui/GlitchTypewriter';
import { HERO_HEADLINES } from '@/data/hero-headlines';
import { GatedEvidencePanel } from '@/components/ui/GatedEvidencePanel';

const TRAJECTORY = [
  { day: 0, ctdna: 0.02 }, { day: 30, ctdna: 0.012 }, { day: 60, ctdna: 0.008 },
  { day: 90, ctdna: 0.015 }, { day: 120, ctdna: 0.065 }, { day: 150, ctdna: 0.22 },
  { day: 180, ctdna: 0.48 }, { day: 210, ctdna: 0.72 }, { day: 240, ctdna: 0.94 },
];
const INTERCEPT = [
  { day: 120, val: 0.065 }, { day: 150, val: 0.045 },
  { day: 180, val: 0.025 }, { day: 210, val: 0.012 }, { day: 240, val: 0.005 },
];

const KillChainPreviewGated = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const accent = isDarkMode ? 'text-amber-400' : 'text-amber-600';
  const headlines = HERO_HEADLINES['kill-chain'] || [];
  const [activeIdx, setActiveIdx] = useState(0);
  const handleLineChange = useCallback((idx: number) => setActiveIdx(idx), []);

  return (
    <div className="flex-1 flex items-center justify-center w-full min-h-0 px-3 sm:px-4 py-2 sm:py-4">
      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-8 items-center min-h-0">

        {/* Left: Tagline + Gated Evidence Panel */}
        <div className="flex flex-col justify-center gap-4 lg:gap-8 py-2 lg:py-8 min-w-0 order-2 lg:order-none">
          <div>
            <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-[0.35em] sm:tracking-[0.5em] ${accent} block mb-2 sm:mb-4`}>
              Resistance Intelligence
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
              targetLabel="CAPRI"
            />
          </div>
        </div>

        {/* Right: Trajectory + Intercept Chart */}
        <div className="flex items-center justify-center min-h-[190px] w-full min-w-0 order-1 lg:order-none">
          <div className="w-full max-w-[700px] aspect-[16/9] max-h-[min(48vw,250px)] sm:max-h-none mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={TRAJECTORY}>
                <defs>
                  <linearGradient id="heroCtdnaGated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isDarkMode ? '#06b6d4' : '#6366f1'} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={isDarkMode ? '#06b6d4' : '#6366f1'} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="heroInterceptGated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#1e293b' : '#e2e8f0'} opacity={0.3} vertical={false} />
                <XAxis dataKey="day" stroke={isDarkMode ? '#475569' : '#94a3b8'} fontSize={11} axisLine={false} tickLine={false} />
                <YAxis stroke={isDarkMode ? '#475569' : '#94a3b8'} fontSize={11} axisLine={false} tickLine={false} />
                <Area type="monotone" dataKey="ctdna" stroke={isDarkMode ? '#06b6d4' : '#6366f1'} strokeWidth={3} fill="url(#heroCtdnaGated)" />
                <Area data={INTERCEPT} type="monotone" dataKey="val" stroke="#10b981" strokeWidth={4} fill="url(#heroInterceptGated)" animationDuration={2000} />
                <ReferenceLine x={120} stroke="#f43f5e" strokeDasharray="8 8" label={{ value: 'INTERCEPT', position: 'top', fill: '#f43f5e', fontSize: 10, fontWeight: 'bold' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KillChainPreviewGated;
