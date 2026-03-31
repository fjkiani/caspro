"use client";

import React, { useState, useCallback } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { getActiveEngines } from '@/data/engine-registry';
import { GlitchTypewriter } from '@/components/ui/GlitchTypewriter';
import { EvidenceMatrix, MATRIX_AXES } from '@/components/mockups/evidenceMatrix';

export default function EvidencePreview() {
  const { isDarkMode } = useTheme();
  
  const engine = getActiveEngines().find(e => e.slug === 'evidence-matrix');
  const headlines = (engine?.typewriterPhrases || []).map(phrase => ({ text: phrase }));

  const accent = isDarkMode ? 'text-amber-400' : 'text-amber-600';
  
  const [activeIdx, setActiveIdx] = useState(0);
  const handleLineChange = useCallback((idx: number) => setActiveIdx(idx), []);
  
  const [activeAxis, setActiveAxis] = useState(MATRIX_AXES[0]);

  return (
    <div className="flex-1 flex items-center justify-center w-full px-4">
      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
        
        {/* Left: Tagline */}
        <div className="flex flex-col justify-center gap-8 py-8">
          <div>
            <span className={`text-[9px] font-black uppercase tracking-[0.5em] ${isDarkMode ? 'text-amber-500/60' : 'text-amber-600/60'} block mb-4`}>
              Multi-Modal Audit Ledger
            </span>
            <GlitchTypewriter
              lines={headlines}
              accentColor={accent}
              isDarkMode={isDarkMode}
              onLineChange={handleLineChange}
            />
          </div>
        </div>

        {/* Right: Matrix */}
        <div className="relative flex items-center justify-center">
          <div className="w-full max-w-[700px]">
            <EvidenceMatrix isDarkMode={isDarkMode} activeAxis={activeAxis} onAxisSelect={setActiveAxis} />
          </div>
        </div>
      </div>
    </div>
  );
}
