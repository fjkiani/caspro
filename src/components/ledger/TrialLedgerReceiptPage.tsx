'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Lock } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import { PasscodeModal } from '@/components/ui/PasscodeModal';
import { getTrialLedgerEntry, type TrialLedgerEntry } from '@/data/trial-ledger-registry';
import { getTrialLedgerIcon } from '@/components/ledger/trial-ledger-icons';
import { isGatedLedgerTrial } from '@/data/trial-gate';
import ProteinPreviewGated from '@/components/sections/mars/previews/ProteinPreviewGated';
import MoaRadarPreviewGated from '@/components/sections/mars/previews/MoaRadarPreviewGated';
import KillChainPreviewGated from '@/components/sections/mars/previews/KillChainPreviewGated';
import VectorMapPreviewGated from '@/components/sections/mars/previews/VectorMapPreviewGated';
import { VectorFailureAnalysis } from '@/components/sections/mars/VectorFailureAnalysis';

type TrialLedgerReceiptPageProps = {
  slug: string;
  /** Server-verified httpOnly cookie (source of truth for unlock). */
  gateAuthorized?: boolean;
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
        <div className="w-full h-full min-h-[420px] max-h-[70vh] overflow-hidden">
          <VectorFailureAnalysis initialTrialId={entry.slug} singleTrialMode chartOnly />
        </div>
      );
    default:
      return null;
  }
}

export default function TrialLedgerReceiptPage({ slug, gateAuthorized = false }: TrialLedgerReceiptPageProps) {
  const searchParams = useSearchParams();
  const { isDarkMode } = useTheme();
  const entry = getTrialLedgerEntry(slug);
  const gated = entry ? isGatedLedgerTrial(entry.slug) : false;
  const [unlocked, setUnlocked] = useState(() => !gated || gateAuthorized);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!gated) {
      setUnlocked(true);
      return;
    }

    if (gateAuthorized) {
      setUnlocked(true);
      return;
    }

    let cancelled = false;
    fetch(`/api/trial-gate/status/?slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data: { unlocked?: boolean }) => {
        if (cancelled) return;
        if (data.unlocked) setUnlocked(true);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [gated, slug, gateAuthorized]);

  useEffect(() => {
    if (gated && !unlocked && searchParams.get('locked') === '1') {
      setModalOpen(true);
    }
  }, [gated, unlocked, searchParams]);

  if (!entry) return null;

  const Icon = getTrialLedgerIcon(entry.preview);
  const showGate = gated && !unlocked;

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
            RECEIPT_ID: {entry.receiptId} // {showGate ? 'PASSCODE REQUIRED' : 'ZETA_SIG_LOCKED'}
          </span>
          <h1
            className={`text-sm sm:text-xl font-black uppercase tracking-tight flex items-center gap-2 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            {entry.label} // {entry.sublabel}
            {showGate && <Lock className={`w-4 h-4 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />}
          </h1>
          <p className={`text-[10px] mt-1 truncate ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
            {entry.trialId} · {entry.phase} · {entry.cancer}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-start sm:items-center justify-center px-3 sm:px-8 lg:px-12 py-1 sm:py-4 min-h-0 overflow-hidden">
        {showGate ? (
          <div className="w-full h-full flex flex-col gap-4">
            <VectorMapPreviewGated trialId={entry.slug} targetLabel={entry.label} isDarkMode={isDarkMode} />
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className={`mx-auto shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-sm border text-[10px] font-black uppercase tracking-[0.3em] ${
                isDarkMode
                  ? 'border-violet-500/50 bg-violet-500/10 text-violet-300 hover:bg-violet-500 hover:text-black'
                  : 'border-violet-600 bg-violet-600 text-white text-on-primary hover:bg-violet-700'
              }`}
            >
              <Lock className="w-4 h-4" />
              Unlock receipt
            </button>
          </div>
        ) : (
          <TrialVisual entry={entry} isDarkMode={isDarkMode} />
        )}
      </div>

      {!showGate && (() => {
        // w8c: engine deep-dive links must be present on every unlocked trial
        // ledger receipt. Primary link is preview-appropriate; the other two
        // engines are always available as cross-links so the receipt page is a
        // real gateway into the L2 engine surfaces.
        const ENGINES = {
          moa:  { href: '/engine/mechanism-alignment/', label: 'Mechanism alignment' },
          sl:   { href: '/engine/synthetic-lethality/scroll', label: 'Synthetic lethality' },
          tl:   { href: '/engine/target-lock/scroll',         label: 'Target lock' },
        } as const;
        // preview → primary engine mapping (see PREVIEW_BY_SLUG in trial-ledger-registry)
        const primaryKey =
          entry.preview === 'moa-align'    ? 'moa' :
          entry.preview === 'kill-chain'   ? 'sl'  :
          entry.preview === 'target-lock'  ? 'tl'  :
          /* vector-map (berzosertib/adavosertib) */ 'moa';
        const primary = ENGINES[primaryKey];
        const secondaries = (Object.keys(ENGINES) as Array<keyof typeof ENGINES>)
          .filter(k => k !== primaryKey)
          .map(k => ENGINES[k]);
        return (
          <div className="relative z-10 px-3 sm:px-8 lg:px-12 pb-10 sm:pb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p
              className={`hidden sm:block text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] ${
                isDarkMode ? 'text-zinc-600' : 'text-slate-400'
              }`}
            >
              DE-RISKING RECEIPT: {entry.receiptId} // LOCKED FOR AUDIT
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <a
                href={primary.href}
                data-engine-link="primary"
                className={`text-[10px] font-black uppercase tracking-widest ${
                  isDarkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-indigo-600 hover:text-indigo-800'
                }`}
              >
                Deep-dive: {primary.label} engine →
              </a>
              {secondaries.map((eng) => (
                <a
                  key={eng.href}
                  href={eng.href}
                  data-engine-link="secondary"
                  className={`text-[10px] font-black uppercase tracking-widest ${
                    isDarkMode ? 'text-zinc-400 hover:text-cyan-300' : 'text-slate-500 hover:text-indigo-800'
                  }`}
                >
                  {eng.label} →
                </a>
              ))}
              <a
                href={entry.proofRoute}
                data-engine-link="proof"
                className={`text-[10px] font-black uppercase tracking-widest ${
                  isDarkMode ? 'text-zinc-400 hover:text-cyan-300' : 'text-slate-500 hover:text-indigo-800'
                }`}
              >
                Full 8D de-risking map →
              </a>
            </div>
          </div>
        );
      })()}

      <PasscodeModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          fetch(`/api/trial-gate/status/?slug=${encodeURIComponent(slug)}`)
            .then((res) => res.json())
            .then((data: { unlocked?: boolean }) => {
              if (data.unlocked) setUnlocked(true);
            })
            .catch(() => {});
        }}
        proofUrl={entry.route}
        targetLabel={entry.label}
      />
    </div>
  );
}
