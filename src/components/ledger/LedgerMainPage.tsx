'use client';

import Link from 'next/link';
import { Target, Fingerprint, Cpu, ArrowRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import {
  LEGACY_CATEGORY_HUBS,
  TRIAL_LEDGER_ENTRIES,
  ledgerSlugPath,
  type LegacyCategoryHub,
} from '@/data/trial-ledger-registry';
import GatedLedgerTrialLink from '@/components/ledger/GatedLedgerTrialLink';

const HUB_ICONS: Record<string, typeof Target> = {
  'target-validation': Target,
  resistance: Cpu,
  moa: Fingerprint,
};

function LegacyHubCard({ hub, isDarkMode }: { hub: LegacyCategoryHub; isDarkMode: boolean }) {
  const entry = TRIAL_LEDGER_ENTRIES.find((e) => e.slug === hub.trialSlug);
  const Icon = HUB_ICONS[hub.id] ?? Target;
  const href = ledgerSlugPath(hub.trialSlug);

  return (
    <Link
      href={href}
      className={`group flex flex-col rounded-xl border p-6 transition-all ${
        isDarkMode
          ? 'bg-zinc-950/80 border-zinc-800 hover:border-cyan-500/50'
          : 'bg-white border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`w-12 h-12 rounded border flex items-center justify-center shrink-0 ${
            isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <Icon className={`w-6 h-6 ${isDarkMode ? 'text-[#00E5FF]' : 'text-indigo-600'}`} />
        </div>
        <div className="min-w-0 flex-1">
          <span
            className={`block text-[9px] font-black uppercase tracking-[0.4em] mb-1 ${
              isDarkMode ? 'text-[#00E5FF]' : 'text-indigo-600'
            }`}
          >
            {hub.navLabel}
          </span>
          <h2
            className={`text-lg font-black uppercase tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            {entry?.label ?? hub.trialSlug.toUpperCase()} // {hub.pageSubtitle}
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
            Was <code className="text-[10px]">{hub.legacyPath}</code> → now{' '}
            <code className={`text-[10px] ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>{href}</code>
          </p>
        </div>
        <ArrowRight
          className={`w-5 h-5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity ${
            isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
          }`}
        />
      </div>
      {entry && (
        <p className={`text-sm leading-relaxed flex-grow ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
          {entry.drugLine}
        </p>
      )}
      <p
        className={`mt-4 text-[10px] font-bold uppercase tracking-widest ${
          isDarkMode ? 'text-zinc-600' : 'text-slate-400'
        }`}
      >
        RECEIPT_ID: {entry?.receiptId ?? hub.trialSlug.toUpperCase()} // ZETA_SIG_LOCKED
      </p>
    </Link>
  );
}

export default function LedgerMainPage() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`relative min-h-screen flex flex-col font-mono transition-colors ${
        isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-white text-slate-900'
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

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 pt-20 sm:pt-24 pb-16 w-full">
        <header className="mb-10 sm:mb-14">
          <span
            className={`text-[9px] font-black uppercase tracking-[0.5em] ${
              isDarkMode ? 'text-[#00E5FF]' : 'text-indigo-600'
            }`}
          >
            TRIAL LEDGER // ZETA_SIG_LOCKED
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-2">
            Decoded clinical trials
          </h1>
          <p className={`text-sm mt-3 max-w-2xl ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
            Former site sections (Target Validation, Resistance, MoA) were single trials — each now has a
            canonical slug under <strong>/ledger/</strong>. Pick a receipt below or open the full 8D map from any
            trial page.
          </p>
        </header>

        <section className="mb-12 sm:mb-16">
          <h2
            className={`text-[11px] font-black uppercase tracking-[0.35em] mb-4 ${
              isDarkMode ? 'text-zinc-500' : 'text-slate-500'
            }`}
          >
            Former main pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {LEGACY_CATEGORY_HUBS.map((hub) => (
              <LegacyHubCard key={hub.id} hub={hub} isDarkMode={isDarkMode} />
            ))}
          </div>
        </section>

        <section>
          <h2
            className={`text-[11px] font-black uppercase tracking-[0.35em] mb-4 ${
              isDarkMode ? 'text-zinc-500' : 'text-slate-500'
            }`}
          >
            All trials (slug index)
          </h2>
          <ul className="space-y-2">
            {TRIAL_LEDGER_ENTRIES.map((entry) => (
              <li key={entry.slug}>
                <GatedLedgerTrialLink entry={entry} isDarkMode={isDarkMode} />
              </li>
            ))}
          </ul>
        </section>

        <p
          className={`hidden sm:block mt-12 text-[9px] font-bold uppercase tracking-[0.3em] ${
            isDarkMode ? 'text-zinc-600' : 'text-slate-400'
          }`}
        >
          DE-RISKING RECEIPT: 2026_03_24_V2 // LOCKED FOR AUDIT
        </p>
      </main>
    </div>
  );
}
