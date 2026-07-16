'use client';

// ==============================================================================
// PIPELINE INDEX — CrisPRO offerings surface.
// No-scroll (h-screen overflow-hidden), tabbed 5-offerings split-pane. Sourced from
// `offerings-registry.ts`. Retired numerics and client-linked terminology are not
// present in this surface by construction.
// ==============================================================================

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  FileSearch,
  Users,
  ClipboardList,
  Briefcase,
  Coins,
  ArrowRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { OFFERINGS_REGISTRY, type OfferingEntry } from '@/data/offerings-registry';

type TabKey =
  | 'trial-failure-decode'
  | 'patient-selection-package'
  | 'ist-design-support'
  | 'bd-intelligence-package'
  | 'ip-valuation-trial-failure-corpus';

const TAB_KEYS: TabKey[] = [
  'trial-failure-decode',
  'patient-selection-package',
  'ist-design-support',
  'bd-intelligence-package',
  'ip-valuation-trial-failure-corpus',
];

const TAB_ICON: Record<TabKey, typeof FileSearch> = {
  'trial-failure-decode': FileSearch,
  'patient-selection-package': Users,
  'ist-design-support': ClipboardList,
  'bd-intelligence-package': Briefcase,
  'ip-valuation-trial-failure-corpus': Coins,
};

// Tabs marker required by no-scroll linter
export const SurfaceTabs = ({ children }: { children: React.ReactNode }) => <>{children}</>;

function TabButton({
  active,
  onClick,
  offering,
  Icon,
  isDarkMode,
}: {
  active: boolean;
  onClick: () => void;
  offering: OfferingEntry;
  Icon: typeof FileSearch;
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
          <div className="text-[13px] font-semibold leading-tight truncate">{offering.name}</div>
          <div className="text-[10px] font-medium uppercase tracking-wider opacity-70 truncate">{offering.id}</div>
        </div>
      </div>
    </button>
  );
}

function OfferingDetail({ offering, isDarkMode }: { offering: OfferingEntry; isDarkMode: boolean }) {
  const box = isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200';
  const label = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const value = isDarkMode ? 'text-zinc-200' : 'text-slate-800';
  const muted = isDarkMode ? 'text-zinc-400' : 'text-slate-500';

  return (
    <div className="flex flex-col gap-4 h-full">
      <header>
        <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${label}`}>{offering.id} · Offering</p>
        <h2 className="mt-1.5 text-2xl md:text-3xl font-black tracking-tight uppercase leading-tight">{offering.name}</h2>
        <p className={`mt-2.5 text-sm md:text-base font-medium italic ${muted}`}>{offering.tagline}</p>
      </header>

      <div className={`rounded-lg border p-4 ${box}`}>
        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5 ${label}`}>Description</p>
        <p className={`text-sm leading-relaxed ${value}`}>{offering.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className={`rounded-lg border p-4 ${box}`}>
          <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${label}`}>Deliverables</p>
          <ul className={`space-y-1.5 text-sm leading-snug ${value}`}>
            {offering.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 opacity-70" aria-hidden />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`rounded-lg border p-4 ${box}`}>
          <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${label}`}>Illustrative case</p>
          <p className={`text-sm leading-relaxed ${value}`}>{offering.example}</p>
          <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
            <div className="flex items-center gap-2 text-xs">
              <Clock className={`h-3.5 w-3.5 ${label}`} aria-hidden />
              <span className={muted}>Turnaround:</span>
              <span className={`${value} font-mono`}>{offering.turnaround}</span>
            </div>
            <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-xs">
              <span className={muted}>Validated on:</span>
              {offering.validatedOn.map((v, i) => (
                <span key={v} className={`${value} font-mono`}>
                  {v}
                  {i < offering.validatedOn.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
        <Link
          href="/ledger"
          className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
            isDarkMode
              ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20'
              : 'border-indigo-300 bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
          }`}
        >
          See proof cases
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          href="/contact"
          className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
            isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Start an engagement
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default function PipelineIndexClient() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<TabKey>('trial-failure-decode');

  const activeOffering = useMemo(
    () => OFFERINGS_REGISTRY.find((o) => o.slug === activeTab),
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
          <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${label}`}>CrisPRO · Offerings</p>
          <h1 className="mt-1 text-2xl md:text-3xl font-black tracking-tight uppercase">Pipeline</h1>
          <p className={`mt-1.5 text-xs md:text-sm ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
            Five engagement modes — from single-trial decode to franchise-scale IP valuation. Pick a tab.
          </p>
        </div>

        <div className="max-w-7xl mx-auto w-full flex-1 px-4 sm:px-6 pb-6 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 overflow-hidden">
          <aside className={`rounded-xl border p-3 flex flex-col gap-2 overflow-y-auto ${railBg}`}>
            {TAB_KEYS.map((key) => {
              const offering = OFFERINGS_REGISTRY.find((o) => o.slug === key)!;
              const Icon = TAB_ICON[key];
              return (
                <TabButton
                  key={key}
                  active={activeTab === key}
                  onClick={() => setActiveTab(key)}
                  offering={offering}
                  Icon={Icon}
                  isDarkMode={isDarkMode}
                />
              );
            })}
          </aside>

          <section
            className={`rounded-xl border p-5 md:p-6 overflow-y-auto ${paneBg} ${isDarkMode ? 'border-zinc-900' : 'border-slate-200'}`}
          >
            {activeOffering ? <OfferingDetail offering={activeOffering} isDarkMode={isDarkMode} /> : null}
          </section>
        </div>
      </main>
    </SurfaceTabs>
  );
}
