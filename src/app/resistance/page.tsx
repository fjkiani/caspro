'use client';

import { Cpu } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import KillChainPreviewGated from '@/components/sections/mars/previews/KillChainPreviewGated';

export default function ResistancePage() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`relative min-h-screen flex flex-col overflow-hidden font-mono transition-colors duration-500 ${
      isDarkMode ? 'bg-[#020408]' : 'bg-white'
    }`}>
      <ZetaNavbar />

      {/* Grid overlay */}
      <div className={`absolute inset-0 pointer-events-none ${
        isDarkMode
          ? 'bg-[linear-gradient(to_right,#00E5FF05_1px,transparent_1px),linear-gradient(to_bottom,#00E5FF05_1px,transparent_1px)]'
          : 'bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)]'
      } bg-[size:48px_48px]`} />

      {/* Trial Identity */}
      <div className="relative z-10 pt-16 sm:pt-20 px-4 sm:px-8 lg:px-12 flex items-center gap-3 sm:gap-5">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded border flex items-center justify-center ${
          isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200 shadow-md'
        }`}>
          <Cpu className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? 'text-[#00E5FF]' : 'text-indigo-500'}`} />
        </div>
        <div className="min-w-0">
          <span className={`hidden sm:block text-[9px] font-black uppercase tracking-[0.5em] ${isDarkMode ? 'text-[#00E5FF]' : 'text-indigo-500'}`}>
            RECEIPT_ID: CAPRI // ZETA_SIG_LOCKED
          </span>
          <h1 className={`text-sm sm:text-xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            CAPRI // KILL-CHAIN
          </h1>
        </div>
      </div>

      {/* Full slide content */}
      <div className="relative z-10 flex-1 flex items-start sm:items-center justify-center px-3 sm:px-8 lg:px-12 py-1 sm:py-4 min-h-0 overflow-hidden">
        <KillChainPreviewGated isDarkMode={isDarkMode} />
      </div>

      {/* Footer bar */}
      <div className="relative z-10 px-3 sm:px-8 lg:px-12 pb-10 sm:pb-12">
        <p className={`hidden sm:block text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>
          DE-RISKING RECEIPT: 2026_03_24_V2 // LOCKED FOR AUDIT
        </p>
      </div>
    </div>
  );
}
