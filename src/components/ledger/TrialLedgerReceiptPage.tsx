'use client';

import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import { getTrialLedgerEntry, type TrialLedgerEntry } from '@/data/trial-ledger-registry';
import { getTrialLedgerIcon } from '@/components/ledger/trial-ledger-icons';
import ProteinPreviewGated from '@/components/sections/mars/previews/ProteinPreviewGated';
import MoaRadarPreviewGated from '@/components/sections/mars/previews/MoaRadarPreviewGated';
import KillChainPreviewGated from '@/components/sections/mars/previews/KillChainPreviewGated';
import { VectorFailureAnalysis } from '@/components/sections/mars/VectorFailureAnalysis';
type TrialLedgerReceiptPageProps = {
  slug: string;
};

function TrialVisual({ entry, isDarkMode }: { entry: TrialLedgerEntry; isDarkMode: boolean }) {
  switch (entry.preview) {
    case 'target-lock':
      return <ProteinPreviewGated isDarkMode={isDarkMode} />;
    case 'moa-align':
      return <MoaRadarPreviewGated isDarkMode={isDarkMode} />;
    case 'kill-chain':
      return <KillChainPreviewGated isDarkMode={isDarkMode} />;
    case 'vector-map':
      return (
        <div className="w-full h-full min-h-[420px] max-h-[70vh] overflow-auto">
          <VectorFailureAnalysis initialTrialId={entry.slug} singleTrialMode />
        </div>
      );
    default:
      return null;
  }
}

export default function TrialLedgerReceiptPage({ slug }: TrialLedgerReceiptPageProps) {
  const { isDarkMode } = useTheme();
  const entry = getTrialLedgerEntry(slug);
  if (!entry) return null;

  const Icon = getTrialLedgerIcon(entry.preview);

  return (
    <div
      className={`relative min-h-screen flex flex-col overflow-hidden font-mono transition-colors duration-500 ${
        isDarkMode ? 'bg-[#020408]' : 'bg-white'
      }`}
    >
      <ZetaNavbar />

      <div
        className={`absolute inset-0 pointer-events-none ${
          isDarkMode
            ? 'bg-[linear-gradient(to_right,#00E5FF05_1px,transparent_1px),linear-gradient(to_bottom,#00E5FF05_1px,transparent_1px)]'
            : 'bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)]'
        } bg-[size:48px_48px]`}
      />

      <div className="relative z-10 pt-16 sm:pt-20 px-4 sm:px-8 lg:px-12 flex items-center gap-3 sm:gap-5">
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
            RECEIPT_ID: {entry.receiptId} // ZETA_SIG_LOCKED
          </span>
          <h1
            className={`text-sm sm:text-xl font-black uppercase tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            {entry.label} // {entry.sublabel}
          </h1>
          <p className={`text-[10px] mt-1 truncate ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
            {entry.trialId} · {entry.phase} · {entry.cancer}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-start sm:items-center justify-center px-3 sm:px-8 lg:px-12 py-1 sm:py-4 min-h-0 overflow-hidden">
        <TrialVisual entry={entry} isDarkMode={isDarkMode} />
      </div>

      <div className="relative z-10 px-3 sm:px-8 lg:px-12 pb-10 sm:pb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p
          className={`hidden sm:block text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] ${
            isDarkMode ? 'text-zinc-600' : 'text-slate-400'
          }`}
        >
          DE-RISKING RECEIPT: 2026_03_24_V2 // LOCKED FOR AUDIT
        </p>
        <a
          href={entry.proofRoute}
          className={`text-[10px] font-black uppercase tracking-widest ${
            isDarkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-indigo-600 hover:text-indigo-800'
          }`}
        >
          View 8D vector map →
        </a>
      </div>
    </div>
  );
}
