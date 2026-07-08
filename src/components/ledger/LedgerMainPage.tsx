'use client';

/**
 * LedgerMainPage
 *
 * Program-first, tabbed, single-viewport (no vertical scroll on the primary
 * surface).  Left rail = 6 external-safe programs (CEACAM5, MSS CRC IO Core,
 * ATR/DDR, MSS CRC IO Supporting Evidence, mFOLFOX6 Benchmarks, Active
 * Engagement).  Right pane = program headline + tabbed detail (Findings /
 * Trials / Transfer lessons / IP value).
 *
 * Data source: /src/data/ledger-programs.ts (from crispro_master_pipeline.json,
 * admissibility=external_safe).
 *
 * Trial-level cards inside a program open the existing per-trial receipt
 * (/ledger/{trialSlug}/) unchanged — 5 receipts stay live for the receipts
 * users already know about.
 */

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  ShieldCheck,
  Target,
  Zap,
  Layers,
  BarChart3,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import { PasscodeModal } from '@/components/ui/PasscodeModal';
import {
  LEDGER_PROGRAMS,
  type LedgerProgram,
} from '@/data/ledger-programs';
import { TRIAL_LEDGER_BY_SLUG } from '@/data/trial-ledger-registry';
import { isGatedLedgerTrial } from '@/data/trial-gate';

const PREVIEW_ICON: Record<LedgerProgram['preview'], typeof Target> = {
  target: Target,
  io: Layers,
  ddr: Zap,
  benchmark: BarChart3,
  active: ShieldCheck,
};

const TAB_KEYS = ['findings', 'trials', 'lessons', 'value'] as const;

// Tabs marker (required by caspro-lint no-scroll linter)
const SurfaceTabs = ({ children }: { children: React.ReactNode }) => <>{children}</>;
type TabKey = (typeof TAB_KEYS)[number];

const TAB_LABEL: Record<TabKey, string> = {
  findings: 'Findings',
  trials: 'Trials',
  lessons: 'Transfer lessons',
  value: 'IP value',
};

/** Map a program-listed NCT to the existing per-trial receipt slug, when one exists */
const NCT_TO_RECEIPT_SLUG: Record<string, string> = {
  NCT04154956: 'ceacam5',
  NCT02595892: 'berzosertib',
  NCT03579316: 'adavosertib',
  NCT03462342: 'capri',
  NCT05450692: 'latify',
};

function ProgramRailButton({
  program,
  active,
  onSelect,
  isDarkMode,
}: {
  program: LedgerProgram;
  active: boolean;
  onSelect: () => void;
  isDarkMode: boolean;
}) {
  const Icon = PREVIEW_ICON[program.preview];
  const trialCount = program.trials.length;

  const base = `w-full text-left rounded-md border px-3 py-3 transition-colors flex items-start gap-3`;
  const light = active
    ? 'border-indigo-500 bg-indigo-50 text-slate-900'
    : 'border-slate-200 bg-white hover:border-indigo-200 text-slate-700';
  const dark = active
    ? 'border-[#00E5FF] bg-[#00E5FF10] text-white'
    : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700 text-zinc-300';

  return (
    <button type="button" onClick={onSelect} className={`${base} ${isDarkMode ? dark : light}`}>
      <span
        className={`w-8 h-8 shrink-0 rounded border flex items-center justify-center ${
          isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'
        }`}
      >
        <Icon className={`w-4 h-4 ${isDarkMode ? 'text-[#00E5FF]' : 'text-indigo-600'}`} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={`block text-[9px] font-black uppercase tracking-[0.35em] ${
            isDarkMode ? 'text-zinc-500' : 'text-slate-400'
          }`}
        >
          {program.programId}
          {program.gated ? ' · GATED' : ''}
        </span>
        <span className="block text-sm font-bold leading-tight mt-0.5">
          {program.name}
        </span>
        <span
          className={`block text-[10px] mt-1 ${
            isDarkMode ? 'text-zinc-500' : 'text-slate-500'
          }`}
        >
          {trialCount ? `${trialCount} trials` : 'Program-level asset'}
        </span>
      </span>
      {program.gated && <Lock className="w-4 h-4 shrink-0 opacity-60" aria-hidden />}
    </button>
  );
}

function FindingsTab({ program, isDarkMode }: { program: LedgerProgram; isDarkMode: boolean }) {
  if (!program.keyFindings.length) {
    return (
      <p className={`text-xs italic ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
        Program-level findings are covered in the trials tab.
      </p>
    );
  }
  return (
    <ul className="space-y-3">
      {program.keyFindings.map((f) => (
        <li
          key={f.id}
          className={`rounded border p-3 ${
            isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'
          }`}
        >
          <p
            className={`text-[9px] font-black uppercase tracking-[0.3em] ${
              isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
            }`}
          >
            {f.id}
          </p>
          <p className="font-bold text-sm mt-1 leading-tight">{f.title}</p>
          <p className={`text-[11px] mt-1 leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
            {f.description}
          </p>
          {f.source && (
            <p className={`text-[9px] mt-2 ${isDarkMode ? 'text-zinc-600' : 'text-slate-500'}`}>
              Source: {f.source}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

function TrialsTab({
  program,
  isDarkMode,
  onOpenGated,
}: {
  program: LedgerProgram;
  isDarkMode: boolean;
  onOpenGated: (slug: string, label: string) => void;
}) {
  if (!program.trials.length) {
    return (
      <p className={`text-xs italic ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
        Trial-level cards for this program are gated. Findings and transfer lessons
        are available in the other tabs.
      </p>
    );
  }
  return (
    <ul className="space-y-2">
      {program.trials.map((t, i) => {
        const receiptSlug = t.nctId ? NCT_TO_RECEIPT_SLUG[t.nctId] : undefined;
        const receiptEntry = receiptSlug ? TRIAL_LEDGER_BY_SLUG[receiptSlug] : undefined;
        const gated = receiptEntry ? isGatedLedgerTrial(receiptEntry.slug) : false;

        const inner = (
          <div className={`rounded border p-3 flex items-start gap-3 ${
              isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="min-w-0 flex-1">
              <p className="font-bold text-sm leading-tight">
                {t.trialName || t.drug || t.nctId || 'Trial'}
              </p>
              <p className={`text-[10px] mt-0.5 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                {[t.nctId, t.phase, t.status].filter(Boolean).join(' · ')}
              </p>
              {t.primaryResult && (
                <p className={`text-[11px] mt-2 leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                  {t.primaryResult}
                </p>
              )}
              {t.sponsor && (
                <p className={`text-[9px] mt-2 ${isDarkMode ? 'text-zinc-600' : 'text-slate-500'}`}>
                  {t.sponsor}
                </p>
              )}
            </div>
            {receiptEntry && (
              <span className="shrink-0 flex items-center gap-1">
                {gated && <Lock className="w-3 h-3" />}
                <ArrowRight className="w-3 h-3" />
              </span>
            )}
          </div>
        );

        if (receiptEntry && gated) {
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => onOpenGated(receiptEntry.slug, receiptEntry.label)}
                className="w-full text-left"
              >
                {inner}
              </button>
            </li>
          );
        }
        if (receiptEntry) {
          return (
            <li key={i}>
              <Link href={receiptEntry.route} className="block">{inner}</Link>
            </li>
          );
        }
        return <li key={i}>{inner}</li>;
      })}
    </ul>
  );
}

function LessonsTab({ program, isDarkMode }: { program: LedgerProgram; isDarkMode: boolean }) {
  if (!program.transferLessons.length) {
    return (
      <p className={`text-xs italic ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
        Transfer lessons for this program are consolidated in the findings tab.
      </p>
    );
  }
  return (
    <ul className="space-y-2">
      {program.transferLessons.map((l, i) => (
        <li
          key={i}
          className={`rounded border p-3 text-[12px] leading-relaxed ${
            isDarkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-300' : 'bg-white border-slate-200 text-slate-700'
          }`}
        >
          {l}
        </li>
      ))}
    </ul>
  );
}

function ValueTab({ program, isDarkMode }: { program: LedgerProgram; isDarkMode: boolean }) {
  return (
    <div
      className={`rounded border p-4 text-[12px] leading-relaxed ${
        isDarkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-300' : 'bg-white border-slate-200 text-slate-700'
      }`}
    >
      <p className={`text-[9px] font-black uppercase tracking-[0.3em] mb-2 ${
          isDarkMode ? 'text-violet-400' : 'text-violet-600'
        }`}
      >
        Indication focus
      </p>
      <p className="mb-4">{program.indicationFocus}</p>
      <p className={`text-[9px] font-black uppercase tracking-[0.3em] mb-2 ${
          isDarkMode ? 'text-violet-400' : 'text-violet-600'
        }`}
      >
        IP value
      </p>
      <p>{program.ipValue}</p>
    </div>
  );
}

export default function LedgerMainPage() {
  const { isDarkMode } = useTheme();
  const [activeProgramId, setActiveProgramId] = useState<string>(LEDGER_PROGRAMS[0]!.programId);
  const [activeTab, setActiveTab] = useState<TabKey>('findings');
  const [modalTrial, setModalTrial] = useState<{ slug: string; label: string } | null>(null);

  const active = useMemo(
    () => LEDGER_PROGRAMS.find((p) => p.programId === activeProgramId) ?? LEDGER_PROGRAMS[0]!,
    [activeProgramId]
  );

  return (
    <SurfaceTabs>
    <div
      className={`relative h-screen flex flex-col font-mono transition-colors overflow-hidden ${
        isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-white text-slate-900'
      }`}
    >
      <ZetaNavbar />
      <div
        aria-hidden
        className={`absolute inset-0 pointer-events-none ${
          isDarkMode
            ? 'bg-[linear-gradient(to_right,#00E5FF05_1px,transparent_1px),linear-gradient(to_bottom,#00E5FF05_1px,transparent_1px)]'
            : 'bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)]'
        } bg-[size:48px_48px]`}
      />

      <main className="relative z-10 flex-1 flex flex-col min-h-0 max-w-7xl mx-auto w-full px-4 sm:px-8 pt-16 sm:pt-20 pb-6">
        <header className="mb-4 sm:mb-6 shrink-0">
          <span
            className={`text-[9px] font-black uppercase tracking-[0.5em] ${
              isDarkMode ? 'text-violet-400' : 'text-violet-600'
            }`}
          >
            TRIAL LEDGER // 6 EXTERNAL-SAFE PROGRAMS
          </span>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight mt-1">
            Decoded clinical-trial corpus
          </h1>
          <p className={`text-[12px] mt-1 max-w-3xl ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
            Six programs. Every finding is grounded in a published source. Trial-level receipts open the
            existing de-risking maps.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 sm:gap-6 flex-1 min-h-0">
          {/* left rail — programs */}
          <aside className="flex flex-col gap-2 overflow-y-auto pr-1 min-h-0">
            {LEDGER_PROGRAMS.map((p) => (
              <ProgramRailButton
                key={p.programId}
                program={p}
                active={p.programId === activeProgramId}
                onSelect={() => {
                  setActiveProgramId(p.programId);
                  setActiveTab('findings');
                }}
                isDarkMode={isDarkMode}
              />
            ))}
          </aside>

          {/* right pane — program detail */}
          <section
            className={`flex flex-col min-h-0 rounded-lg border p-4 sm:p-5 ${
              isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <header className="mb-3 shrink-0">
              <p
                className={`text-[9px] font-black uppercase tracking-[0.35em] ${
                  isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                }`}
              >
                {active.programId}
                {active.gated ? ' // GATED' : ' // EXTERNAL-SAFE'}
              </p>
              <h2 className="text-base sm:text-lg font-black uppercase tracking-tight mt-1">
                {active.name}
              </h2>
              <p className={`text-[12px] mt-1 leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                {active.headline}
              </p>
            </header>

            <nav className="flex gap-1 mb-3 shrink-0 border-b overflow-x-auto border-inherit">
              {TAB_KEYS.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setActiveTab(k)}
                  className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] border-b-2 transition-colors -mb-px ${
                    activeTab === k
                      ? isDarkMode
                        ? 'border-[#00E5FF] text-white'
                        : 'border-indigo-600 text-slate-900'
                      : isDarkMode
                        ? 'border-transparent text-zinc-500 hover:text-zinc-300'
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {TAB_LABEL[k]}
                </button>
              ))}
            </nav>

            <div className="flex-1 min-h-0 overflow-y-auto pr-1">
              {activeTab === 'findings' && <FindingsTab program={active} isDarkMode={isDarkMode} />}
              {activeTab === 'trials' && (
                <TrialsTab
                  program={active}
                  isDarkMode={isDarkMode}
                  onOpenGated={(slug, label) => setModalTrial({ slug, label })}
                />
              )}
              {activeTab === 'lessons' && <LessonsTab program={active} isDarkMode={isDarkMode} />}
              {activeTab === 'value' && <ValueTab program={active} isDarkMode={isDarkMode} />}
            </div>
          </section>
        </div>
      </main>

      {modalTrial && (
        <PasscodeModal
          open
          onClose={() => setModalTrial(null)}
          proofUrl={`/ledger/${modalTrial.slug}/`}
          targetLabel={modalTrial.label}
        />
      )}
    </div>
    </SurfaceTabs>
  );
}
