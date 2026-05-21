'use client';

/**
 * Gated 8D vector-map preview — used for ADAVOSERTIB / BERZOSERTIB on hero and ledger.
 */

import React, { useState, useCallback } from 'react';
import { GlitchTypewriter } from '@/components/ui/GlitchTypewriter';
import { GatedEvidencePanel } from '@/components/ui/GatedEvidencePanel';
import { HERO_HEADLINES } from '@/data/hero-headlines';
import { VectorFailureAnalysis } from '@/components/sections/mars/VectorFailureAnalysis';

type VectorMapPreviewGatedProps = {
  trialId: string;
  targetLabel: string;
  isDarkMode: boolean;
};

export default function VectorMapPreviewGated({
  trialId,
  targetLabel,
  isDarkMode,
}: VectorMapPreviewGatedProps) {
  const accent = isDarkMode ? 'text-violet-400' : 'text-violet-600';
  const headlines = HERO_HEADLINES[trialId] ?? [];
  const [activeIdx, setActiveIdx] = useState(0);
  const handleLineChange = useCallback((idx: number) => setActiveIdx(idx), []);

  if (headlines.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center w-full min-h-[220px] px-4">
        <VectorFailureAnalysis initialTrialId={trialId} singleTrialMode />
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center w-full min-h-0 px-3 sm:px-4 py-2 sm:py-4">
      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6 lg:gap-8 items-stretch min-h-0">
        <div className="flex flex-col justify-center gap-4 lg:gap-6 py-2 lg:py-6 min-w-0 order-2 lg:order-none">
          <div>
            <span
              className={`text-[8px] sm:text-[9px] font-black uppercase tracking-[0.35em] sm:tracking-[0.5em] block mb-2 sm:mb-4 opacity-60 ${accent}`}
            >
              8D De-Risking Map // LOCKED
            </span>
            <GlitchTypewriter
              lines={headlines}
              accentColor={accent}
              isDarkMode={isDarkMode}
              onLineChange={handleLineChange}
            />
          </div>
          {headlines.length > 0 && (
            <GatedEvidencePanel
              headlines={headlines}
              activeIndex={activeIdx}
              isDarkMode={isDarkMode}
              accentColor={accent}
              targetLabel={targetLabel}
            />
          )}
        </div>
        <div className="relative flex min-h-[220px] sm:min-h-[320px] w-full min-w-0 order-1 lg:order-none overflow-hidden rounded-lg border border-inherit opacity-90">
          <VectorFailureAnalysis initialTrialId={trialId} singleTrialMode />
        </div>
      </div>
    </div>
  );
}
