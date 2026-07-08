'use client';

// ==============================================================================
// ENGINE INDEX — Primary CrisPRO capability spine.
// No-scroll (h-screen overflow-hidden), tabbed 5-capability split-pane. Sourced
// from `capability-registry.ts`. Retired numerics and client-linked terminology
// are not present in this surface by construction.
//
// Layout:
//   • Fixed-height h-screen split with sticky header
//   • Left rail (280px on md+) = 5 capability tabs + Comparators tab
//   • Right pane = detail card for the selected tab
//   • Zero page scroll on primary surface; only the right pane scrolls if content overflows
// ==============================================================================

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Target, Layers, Sparkles, TrendingUp, GitBranch, Scale } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import {
  CAPABILITY_REGISTRY,
  COMPARATORS,
  UNIQUE_POSITION,
  type CapabilityEntry,
  type Comparator,
} from '@/data/capability-registry';

type TabKey =
  | 'gate-tier-scoring'
  | 'multi-asset-scoring'
  | 'biomarker-failure-prediction'
  | 'population-funnel'
  | 'mechanism-divergence'
  | 'comparators';

const TAB_KEYS: TabKey[] = [
  'gate-tier-scoring',
  'multi-asset-scoring',
  'biomarker-failure-prediction',
  'population-funnel',
  'mechanism-divergence',
  'comparators',
];

const CAPABILITY_ICON: Record<string, typeof Target> = {
  'gate-tier-scoring': Target,
  'multi-asset-scoring': Layers,
  'biomarker-failure-prediction': Sparkles,
  'population-funnel': TrendingUp,
  'mechanism-divergence': GitBranch,
};

const TAB_LABEL: Record<TabKey, string> = {
  'gate-tier-scoring': 'Gate Tier Scoring',
  'multi-asset-scoring': 'Multi-Asset Scoring',
  'biomarker-failure-prediction': 'Biomarker Prediction',
  'population-funnel': 'Population Funnel',
  'mechanism-divergence': 'Mechanism Divergence',
  comparators: 'How CrisPRO fits',
};

// Tabs marker required by no-scroll linter
export const SurfaceTabs = ({ children }: { children: React.ReactNode }) => <>{children}</>;

function TabButton({
  active,
  onClick,
  label,
  subtitle,
  Icon,
  isDarkMode,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  subtitle: string;
  Icon: typeof Target;
  isDarkMode: boolean;
}) {
  const activeStyle = isDarkMode
    ? 'border-cyan-500/60 bg-cyan-500/10 text-cyan-100 shadow-[0_0_18px_-6px_rgba(34,211,238,0.4)]'
    : 'border-indigo-400 bg-indigo-50 text-indigo-900 shadow-sm';
  const idleStyle = isDarkMode
    ? 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-lg border px-3 py-2.5 transition-all ${active ? activeStyle : idleStyle}`}
    >
      <div className="flex items-center gap-2.5">
        <Icon className="h-4 w-4 shrink-0" aria-hidden />
        <div className="min-w-0">
          <div className="text-[13px] font-semibold leading-tight truncate">{label}</div>
          <div className="text-[10px] font-medium uppercase tracking-wider opacity-70 truncate">{subtitle}</div>
        </div>
      </div>
    </button>
  );
}

function CapabilityDetail({ cap, isDarkMode }: { cap: CapabilityEntry; isDarkMode: boolean }) {
  const boxLight = 'bg-white border-slate-200';
  const boxDark = 'bg-zinc-950 border-zinc-800';
  const box = isDarkMode ? boxDark : boxLight;
  const label = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const value = isDarkMode ? 'text-zinc-200' : 'text-slate-800';
  const muted = isDarkMode ? 'text-zinc-400' : 'text-slate-500';

  return (
    <div className="flex flex-col gap-4 h-full">
      <header>
        <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${label}`}>{cap.id} · Capability</p>
        <h2 className="mt-1.5 text-2xl md:text-3xl font-black tracking-tight uppercase leading-tight">{cap.name}</h2>
        <p className={`mt-2.5 text-sm leading-relaxed ${muted}`}>{cap.oneLiner}</p>
      </header>

      <div className={`rounded-lg border p-4 ${box}`}>
        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5 ${label}`}>What it does</p>
        <p className={`text-sm leading-relaxed ${value}`}>{cap.description}</p>
      </div>

      <div className={`rounded-lg border p-4 ${box}`}>
        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5 ${label}`}>Illustrative output</p>
        <p className={`font-mono text-[13px] leading-relaxed ${value}`}>{cap.demoOutput}</p>
      </div>

      <div className={`rounded-lg border p-4 ${box}`}>
        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5 ${label}`}>Clinical value</p>
        <p className={`text-sm leading-relaxed ${value}`}>{cap.clinicalValue}</p>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-3">
        <Link
          href="/pipeline"
          className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
            isDarkMode
              ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20'
              : 'border-indigo-300 bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
          }`}
        >
          See offerings
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          href="/ledger"
          className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
            isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Proof case: {cap.proofCaseSlug.toUpperCase()}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

function ComparatorsDetail({ comparators, isDarkMode }: { comparators: Comparator[]; isDarkMode: boolean }) {
  const label = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const muted = isDarkMode ? 'text-zinc-400' : 'text-slate-500';
  const box = isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200';
  const rowBorder = isDarkMode ? 'border-zinc-800' : 'border-slate-200';

  return (
    <div className="flex flex-col gap-4 h-full">
      <header>
        <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${label}`}>Positioning · How CrisPRO fits</p>
        <h2 className="mt-1.5 text-2xl md:text-3xl font-black tracking-tight uppercase leading-tight">
          The mechanism-alignment layer
        </h2>
        <p className={`mt-2.5 text-sm leading-relaxed ${muted}`}>{UNIQUE_POSITION}</p>
      </header>

      <div className={`rounded-lg border overflow-hidden ${box}`}>
        <div className={`grid grid-cols-1 md:grid-cols-3 divide-x ${rowBorder} md:divide-y-0 divide-y`}>
          {comparators.map((c) => (
            <article key={c.slug} className="p-4">
              <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${label}`}>{c.exampleOfClass}</p>
              <h3 className="mt-1 text-sm font-bold leading-tight">{c.name}</h3>
              <p className={`mt-2 text-xs leading-relaxed ${muted}`}>
                <span className="font-semibold">Does:</span> {c.whatTheyDo}
              </p>
              <p className={`mt-1.5 text-xs leading-relaxed ${muted}`}>
                <span className="font-semibold">Doesn&apos;t do:</span> {c.whatTheyCannotDo}
              </p>
              <p className={`mt-2.5 text-xs leading-relaxed font-medium ${isDarkMode ? 'text-cyan-200' : 'text-indigo-800'}`}>
                {c.relationship}
              </p>
            </article>
          ))}
        </div>
      </div>

      <p className={`text-xs italic ${muted}`}>
        CrisPRO is complementary to — not competing with — these platforms. Each answers a different question in the
        trial-design stack.
      </p>
    </div>
  );
}

export default function EngineIndexClient() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<TabKey>('gate-tier-scoring');

  const activeCapability = useMemo(
    () => CAPABILITY_REGISTRY.find((c) => c.slug === activeTab),
    [activeTab]
  );

  const shell = isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-slate-50 text-slate-900';
  const railBg = isDarkMode ? 'bg-zinc-950/50 border-zinc-900' : 'bg-white/60 border-slate-200';
  const paneBg = isDarkMode ? 'bg-[#020408]' : 'bg-slate-50';
  const label = isDarkMode ? 'text-cyan-500' : 'text-indigo-600';

  return (
    <SurfaceTabs>
      <main className={`h-screen flex flex-col overflow-hidden transition-colors ${shell}`}>
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6 pb-3 shrink-0">
          <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${label}`}>CrisPRO · Capability spine</p>
          <h1 className="mt-1 text-2xl md:text-3xl font-black tracking-tight uppercase">Engine</h1>
          <p className={`mt-1.5 text-xs md:text-sm ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
            Five capabilities that operate at the mechanism-alignment layer. Pick a tab.
          </p>
        </div>

        <div className="max-w-7xl mx-auto w-full flex-1 px-4 sm:px-6 pb-6 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4 overflow-hidden">
          {/* Left rail */}
          <aside className={`rounded-xl border p-3 flex flex-col gap-2 overflow-y-auto ${railBg}`}>
            {TAB_KEYS.map((key) => {
              const cap = CAPABILITY_REGISTRY.find((c) => c.slug === key);
              const Icon = key === 'comparators' ? Scale : CAPABILITY_ICON[key] ?? Target;
              const subtitle = key === 'comparators' ? 'Where CrisPRO sits' : cap?.id ?? '';
              return (
                <TabButton
                  key={key}
                  active={activeTab === key}
                  onClick={() => setActiveTab(key)}
                  label={TAB_LABEL[key]}
                  subtitle={subtitle}
                  Icon={Icon}
                  isDarkMode={isDarkMode}
                />
              );
            })}
          </aside>

          {/* Right pane */}
          <section className={`rounded-xl border p-5 md:p-6 overflow-y-auto ${paneBg} ${isDarkMode ? 'border-zinc-900' : 'border-slate-200'}`}>
            {activeTab === 'comparators' ? (
              <ComparatorsDetail comparators={COMPARATORS} isDarkMode={isDarkMode} />
            ) : activeCapability ? (
              <CapabilityDetail cap={activeCapability} isDarkMode={isDarkMode} />
            ) : null}
          </section>
        </div>
      </main>
    </SurfaceTabs>
  );
}
