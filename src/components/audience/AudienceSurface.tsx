'use client';

// ==============================================================================
// <AudienceSurface data=…/> — shared no-scroll audience card used by:
//   • /                          (home 3-audience router)
//   • /industry/*                (BD / pharma / biotech pages)
//   • /patients/                 (patient-facing hub)
//   • /products/oncology/        (indication-facing hub)
//
// Layout: 3-tab strip inside a single-viewport shell. Tabs:
//   • Outcome  — one-line "what changes when this audience works with CrisPRO"
//   • Journey  — the 3-step session
//   • Proof    — vague-safe proof points + 2 case studies + next-step CTA
//
// No scroll: h-full min-h-0 flex column, only the tab body scrolls if it overflows.
// ==============================================================================

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  KeyRound,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import type { AudienceEntry } from '@/data/audience-registry';

type TabKey = 'outcome' | 'journey' | 'proof';

const TABS: { key: TabKey; label: string; Icon: typeof Compass }[] = [
  { key: 'outcome', label: 'Outcome', Icon: KeyRound },
  { key: 'journey', label: 'Journey', Icon: Compass },
  { key: 'proof', label: 'Proof & next step', Icon: ClipboardCheck },
];

// Tabs marker (required by caspro-lint no-scroll linter)
export const SurfaceTabs = ({ children }: { children: React.ReactNode }) => <>{children}</>;

interface Props {
  data: AudienceEntry;
  compact?: boolean; // used when rendered inside the home router (already has an outer chrome)
}

export default function AudienceSurface({ data, compact = false }: Props) {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<TabKey>('outcome');

  const box = isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200';
  const label = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const value = isDarkMode ? 'text-zinc-200' : 'text-slate-800';
  const muted = isDarkMode ? 'text-zinc-400' : 'text-slate-500';

  const tabBody = useMemo(() => {
    switch (activeTab) {
      case 'outcome':
        return (
          <div className="flex flex-col gap-4 h-full">
            <header>
              <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${label}`}>{data.id} · Outcome</p>
              <h3 className="mt-1 text-xl md:text-2xl font-black tracking-tight uppercase leading-tight">
                {data.outcome.headline}
              </h3>
              <p className={`mt-2 text-sm md:text-base italic ${muted}`}>{data.question}</p>
            </header>

            <div className={`rounded-lg border p-4 ${box}`}>
              <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5 ${label}`}>What CrisPRO returns</p>
              <p className={`text-sm md:text-base leading-relaxed ${value}`}>{data.outcome.body}</p>
            </div>

            <div className="mt-auto flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('journey')}
                className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  isDarkMode ? 'text-cyan-300 hover:text-cyan-200' : 'text-indigo-700 hover:text-indigo-900'
                }`}
              >
                See the journey
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('proof')}
                className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Jump to proof
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        );
      case 'journey':
        return (
          <div className="flex flex-col gap-4 h-full">
            <header>
              <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${label}`}>{data.id} · Journey</p>
              <h3 className="mt-1 text-xl md:text-2xl font-black tracking-tight uppercase leading-tight">
                What a session looks like
              </h3>
            </header>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {data.journey.map((step, idx) => (
                <li key={idx} className={`rounded-lg border p-4 ${box}`}>
                  <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${label}`}>Step {idx + 1}</p>
                  <p className={`mt-2 text-sm leading-relaxed ${value}`}>{step}</p>
                </li>
              ))}
            </ol>
            <div className="mt-auto">
              <button
                type="button"
                onClick={() => setActiveTab('proof')}
                className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  isDarkMode ? 'text-cyan-300 hover:text-cyan-200' : 'text-indigo-700 hover:text-indigo-900'
                }`}
              >
                See the proof
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        );
      case 'proof':
        return (
          <div className="flex flex-col gap-4 h-full">
            <header>
              <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${label}`}>{data.id} · Proof</p>
              <h3 className="mt-1 text-xl md:text-2xl font-black tracking-tight uppercase leading-tight">
                What we can already show
              </h3>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {data.proofPoints.map((p) => (
                <div key={p.label} className={`rounded-lg border p-3.5 ${box}`}>
                  <p className={`text-[11px] font-black uppercase tracking-[0.15em] ${label}`}>{p.label}</p>
                  <p className={`mt-1.5 text-xs leading-relaxed ${value}`}>{p.detail}</p>
                  <p className={`mt-2 text-[10px] italic ${muted}`}>Source · {p.sourceHint}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.caseStudies.map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/ledger/${cs.slug}/`}
                  className={`rounded-lg border p-4 transition-colors ${box} ${
                    isDarkMode ? 'hover:border-cyan-500/40' : 'hover:border-indigo-300'
                  }`}
                >
                  <p className={`text-[11px] font-black uppercase tracking-[0.15em] ${label}`}>Case study</p>
                  <h4 className={`mt-1.5 text-sm font-bold leading-snug ${value}`}>{cs.title}</h4>
                  <p className={`mt-1.5 text-xs leading-relaxed ${muted}`}>{cs.summary}</p>
                  <p className={`mt-2 text-[11px] font-mono ${value}`}>{cs.keyMetric}</p>
                  <p
                    className={`mt-2.5 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${label}`}
                  >
                    Open the ledger receipt
                    <ArrowRight className="h-3 w-3" />
                  </p>
                </Link>
              ))}
            </div>

            <div className={`mt-auto rounded-lg border p-4 ${box}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className={`text-[11px] font-black uppercase tracking-[0.15em] ${label}`}>Next step</p>
                  <p className={`mt-1 text-sm font-bold ${value}`}>{data.nextStep.cta}</p>
                  <p className={`mt-1 text-xs ${muted}`}>{data.nextStep.helper}</p>
                </div>
                <Link
                  href={`/pipeline/?offer=${data.nextStep.offeringSlug}`}
                  className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    isDarkMode
                      ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/20'
                      : 'border-indigo-300 bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  See offering
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        );
    }
  }, [activeTab, data, isDarkMode, box, label, value, muted]);

  return (
    <SurfaceTabs>
      <div className={`flex flex-col h-full min-h-0 gap-4 ${compact ? '' : 'p-4 md:p-6'}`}>
        {/* Tab strip */}
        <nav className="flex flex-wrap gap-1.5 shrink-0">
          {TABS.map(({ key, label: tabLabel, Icon }) => {
            const active = activeTab === key;
            const activeStyle = isDarkMode
              ? 'border-cyan-500/60 bg-cyan-500/10 text-cyan-100'
              : 'border-indigo-400 bg-indigo-50 text-indigo-900';
            const idleStyle = isDarkMode
              ? 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900';
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
                  active ? activeStyle : idleStyle
                }`}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {tabLabel}
                {active && <CheckCircle2 className="h-3 w-3 opacity-70" />}
              </button>
            );
          })}
        </nav>

        {/* Tab body */}
        <div className="flex-1 min-h-0 overflow-y-auto">{tabBody}</div>
      </div>
    </SurfaceTabs>
  );
}
