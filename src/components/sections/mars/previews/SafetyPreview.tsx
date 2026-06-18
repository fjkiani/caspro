'use client';

import React, { useState, useCallback } from 'react';
import { FlaskConical, CheckCircle2, AlertTriangle } from 'lucide-react';
import { GlitchTypewriter } from '@/components/ui/GlitchTypewriter';
import { DynamicEvidencePanel } from '@/components/ui/DynamicEvidencePanel';
import { HERO_HEADLINES } from '@/data/hero-headlines';
import { PGX_GENES, CPIC_CONCORDANCE, PREPARE_DATA } from '@/data/safety-engine-data';

// ─── Safety Preview (Hero Carousel) ──────────────────────────────────────────

const SafetyPreview = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const muted = isDarkMode ? 'text-zinc-300' : 'text-slate-600';
  const heading = isDarkMode ? 'text-white' : 'text-slate-900';
  const border = isDarkMode ? 'border-zinc-800' : 'border-slate-200';
  const cardBg = isDarkMode ? 'bg-zinc-950/60' : 'bg-white';

  const headlines = HERO_HEADLINES['safety-dosing'] || [];
  const [activeIdx, setActiveIdx] = useState(0);
  const handleLineChange = useCallback((i: number) => setActiveIdx(i), []);

  // Compact PGx listing (first 4)
  const compactGenes = PGX_GENES.slice(0, 4);

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-6 p-6">
      {/* Left — PGx compact + stats */}
      <div className={`flex-1 border rounded-sm p-5 ${cardBg} ${border}`}>
        <div className="flex items-center gap-3 mb-5">
          <FlaskConical className={`w-5 h-5 ${accent}`} />
          <span className={`text-sm font-black uppercase tracking-[0.2em] ${heading}`}>PGx Safety Gate</span>
          <span className={`ml-auto text-[10px] font-black uppercase text-emerald-500`}>
            {CPIC_CONCORDANCE.concordanceRate} CPIC
          </span>
        </div>

        {/* Compact dosing rows */}
        <div className="space-y-2">
          {compactGenes.map((g, i) => (
            <div key={i} className={`flex items-center justify-between p-3 border rounded-sm ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${g.adjustment.includes('REDUCE') || g.adjustment.includes('AVOID') ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                <span className={`text-[12px] font-black ${heading}`}>{g.gene}</span>
                <span className={`text-[10px] font-mono ${muted}`}>{g.variant}</span>
              </div>
              <span className={`text-[11px] font-black ${g.adjustment.includes('REDUCE') || g.adjustment.includes('AVOID') ? 'text-rose-500' : accent}`}>
                {g.adjustment}
              </span>
            </div>
          ))}
        </div>

        {/* Key stats */}
        <div className={`mt-5 flex gap-6 pt-4 border-t ${border}`}>
          <div>
            <span className={`text-[9px] font-black uppercase block ${muted}`}>PREPARE RRR</span>
            <span className={`text-xl font-black ${accent}`}>{PREPARE_DATA.rrrActionable}</span>
          </div>
          <div>
            <span className={`text-[9px] font-black uppercase block ${muted}`}>Tox Prevention</span>
            <span className="text-xl font-black text-emerald-500">{PREPARE_DATA.toxicityPreventionRate}</span>
          </div>
        </div>

        {/* Typewriter */}
        <div className="mt-5">
          <GlitchTypewriter
            lines={headlines}
            accentColor={accent}
            isDarkMode={isDarkMode}
            onLineChange={handleLineChange}
          />
        </div>
      </div>

      {/* Right — Dynamic Evidence Panel */}
      <div className="w-full md:w-80 flex flex-col justify-end">
        <DynamicEvidencePanel
          headlines={headlines}
          activeIndex={activeIdx}
          isDarkMode={isDarkMode}
          accentColor={isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}
        />
      </div>
    </div>
  );
};

export default SafetyPreview;
