'use client';

/**
 * Gated de-risk preview — sealed receipt on hero / ledger (no public vector manifold).
 */

import React, { useState, useCallback } from 'react';
import { GlitchTypewriter } from '@/components/ui/GlitchTypewriter';
import { GatedEvidencePanel } from '@/components/ui/GatedEvidencePanel';
import { getTrialCaseHeadlines } from '@/data/trial-case-headlines';
import LockedDeRiskReceiptVisual from './LockedDeRiskReceiptVisual';

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
  const headlines = getTrialCaseHeadlines(trialId);
  const [activeIdx, setActiveIdx] = useState(0);
  const handleLineChange = useCallback((idx: number) => setActiveIdx(idx), []);

  return (
    <div className="flex-1 flex items-start sm:items-center justify-center w-full min-h-0 px-2 sm:px-4 py-1 sm:py-4">
      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-3 sm:gap-6 lg:gap-8 items-start sm:items-stretch min-h-0">
        <div className="flex flex-col justify-start sm:justify-center gap-2 sm:gap-4 lg:gap-6 py-1 sm:py-2 lg:py-6 min-w-0 order-2 lg:order-none">
          <div>
            <span
              className={`text-[8px] sm:text-[9px] font-black uppercase tracking-[0.35em] sm:tracking-[0.5em] block mb-2 sm:mb-4 ${accent}`}
            >
              De-Risking Receipt // LOCKED
            </span>
            {headlines.length > 0 ? (
              <GlitchTypewriter
                lines={headlines}
                accentColor={accent}
                isDarkMode={isDarkMode}
                onLineChange={handleLineChange}
              />
            ) : (
              <p className={`text-sm font-black uppercase tracking-tight ${accent}`}>
                Analysis sealed pending passcode
              </p>
            )}
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
        <div className="relative flex h-[min(28vh,200px)] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[360px] w-full min-w-0 order-1 lg:order-none min-h-[160px]">
          <LockedDeRiskReceiptVisual trialId={trialId} isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
}
