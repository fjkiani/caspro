'use client';

import React, { useState } from 'react';
import type { ElementType } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import { PasscodeModal } from '@/components/ui/PasscodeModal';

export interface TrialGatePageProps {
  /** Short all-caps identifier, e.g. 'CEACAM5' */
  trialId: string;
  /** Display label for the trial, e.g. 'CEACAM5' */
  label: string;
  /** Sub-label shown next to the label, e.g. 'TARGET-LOCK' */
  sublabel: string;
  /** Lucide icon component */
  icon: ElementType;
  /** Destination after correct passcode */
  proofUrl: string;
  /** The preview visual component (ProteinPreview, KillChainPreview, MoaRadarPreview) */
  PreviewComponent: React.ComponentType<{ isDarkMode: boolean }>;
  /** Page-level description shown below the identity header */
  description: string;
  /** Accent color: 'cyan' (dark) or 'indigo' (light) — auto-selected by theme */
}

export function TrialGatePage({
  trialId,
  label,
  sublabel,
  icon: Icon,
  proofUrl,
  PreviewComponent,
  description,
}: TrialGatePageProps) {
  const { isDarkMode } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      className={`relative min-h-screen flex flex-col overflow-hidden font-mono transition-colors duration-500 ${
        isDarkMode ? 'bg-[#020408]' : 'bg-white'
      }`}
    >
      <ZetaNavbar />

      {/* Grid overlay — matches HeroSlider aesthetic */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDarkMode
            ? 'bg-[linear-gradient(to_right,#00E5FF05_1px,transparent_1px),linear-gradient(to_bottom,#00E5FF05_1px,transparent_1px)]'
            : 'bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)]'
        } bg-[size:48px_48px]`}
      />

      {/* Trial Identity — same structure as HeroSlider */}
      <div className="relative z-10 pt-24 sm:pt-28 px-4 sm:px-8 lg:px-12 flex items-center gap-3 sm:gap-5">
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded border flex items-center justify-center ${
            isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200 shadow-md'
          }`}
        >
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? 'text-[#00E5FF]' : 'text-indigo-500'}`} />
        </div>
        <div className="min-w-0">
          <span
            className={`hidden sm:block text-[9px] font-black uppercase tracking-[0.5em] ${
              isDarkMode ? 'text-[#00E5FF]' : 'text-indigo-500'
            }`}
          >
            RECEIPT_ID: {trialId.toUpperCase()} // ZETA_SIG_LOCKED
          </span>
          <h1
            className={`text-sm sm:text-xl font-black uppercase tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            {label} // {sublabel}
          </h1>
        </div>
      </div>

      {/* Description */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-12 mt-4">
        <p
          className={`max-w-xl text-[11px] sm:text-xs leading-relaxed ${
            isDarkMode ? 'text-zinc-400' : 'text-slate-600'
          }`}
        >
          {description}
        </p>
      </div>

      {/* Key Visual — same layout as HeroSlider trial slides */}
      <div className="relative z-10 flex-1 flex items-start sm:items-center justify-center px-3 sm:px-8 lg:px-12 py-4 sm:py-6 min-h-0 overflow-hidden">
        <PreviewComponent isDarkMode={isDarkMode} />
      </div>

      {/* CTA Bar */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-12 pb-16 sm:pb-20 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p
          className={`hidden sm:block text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] ${
            isDarkMode ? 'text-zinc-600' : 'text-slate-400'
          }`}
        >
          DE-RISKING RECEIPT: 2026_03_24_V2 // LOCKED FOR AUDIT
        </p>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className={`group flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-2.5 sm:py-3 rounded border text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] sm:tracking-[0.3em] transition-all shadow-lg w-full sm:w-auto shrink-0 ${
            isDarkMode
              ? 'border-[#00E5FF]/40 bg-[#00E5FF]/10 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black hover:shadow-[#00E5FF]/20'
              : 'border-indigo-500/40 bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500 hover:text-white hover:shadow-indigo-500/20'
          }`}
        >
          View De-risking Map
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Passcode gate modal */}
      <PasscodeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        proofUrl={proofUrl}
        targetLabel={label}
      />
    </div>
  );
}
