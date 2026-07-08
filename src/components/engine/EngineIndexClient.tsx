'use client';

// ==============================================================================
// ENGINE INDEX — Primary CrisPRO capability spine.
//
// Layout:
//   • Fixed-height h-screen split with sticky header
//   • Left rail (280px on md+) = 5 capability tabs + Comparators tab
//   • Right pane = 4 sub-tabs per capability: Overview / Powers / Governance / Proof
//     * Overview  = one-liner + full description + illustrative output + clinical value
//     * Powers    = axes (from PATIENT_VECTOR_AXES) + modalities (from EVIDENCE_MODALITIES_7)
//                   + headlineSubstrateSentence (from CAPABILITY_DEPTH_WIRING)
//     * Governance= guardrails (from GOVERNANCE_GUARDRAILS) + mandatory disclosures
//                   + prohibited claims (from PUBLIC_MANDATORY_DISCLOSURES / _PROHIBITED_CLAIMS)
//                   + headlineGovernanceSentence
//     * Proof     = tiers this cap emits (from EVIDENCE_TIERS_4) + link to /ledger/
//   • Zero page scroll on primary surface; only the right pane scrolls
//   • Each capability section has `id={cap.slug}` so /kb/#slug and /governance/ deep-link in
// ==============================================================================

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Target, Layers, Sparkles, TrendingUp, GitBranch, Scale, ShieldCheck, Beaker, BookOpen, Ban } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import {
  CAPABILITY_REGISTRY,
  COMPARATORS,
  UNIQUE_POSITION,
  type CapabilityEntry,
  type Comparator,
} from '@/data/capability-registry';
import {
  PATIENT_VECTOR_AXES,
  EVIDENCE_MODALITIES_7,
  EVIDENCE_TIERS_4,
  GOVERNANCE_GUARDRAILS,
  PUBLIC_MANDATORY_DISCLOSURES,
  PUBLIC_PROHIBITED_CLAIMS,
} from '@/data/depth-layer';
import { CAPABILITY_DEPTH_WIRING } from '@/data/capability-depth-wiring';

type TabKey =
  | 'gate-tier-scoring'
  | 'multi-asset-scoring'
  | 'biomarker-failure-prediction'
  | 'population-funnel'
  | 'mechanism-divergence'
  | 'comparators';

type SubTab = 'overview' | 'powers' | 'governance' | 'proof';

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

// -----------------------------------------------------------------------------
// Sub-tab: Overview
// -----------------------------------------------------------------------------
function OverviewTab({ cap, isDarkMode }: { cap: CapabilityEntry; isDarkMode: boolean }) {
  const label = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const value = isDarkMode ? 'text-zinc-200' : 'text-slate-800';
  const muted = isDarkMode ? 'text-zinc-400' : 'text-slate-500';
  const box = isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200';
  return (
    <div className="flex flex-col gap-4">
      <p className={`text-sm leading-relaxed ${muted}`}>{cap.oneLiner}</p>
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
    </div>
  );
}

// -----------------------------------------------------------------------------
// Sub-tab: Powers — what substrate backs this capability
// -----------------------------------------------------------------------------
function PowersTab({ cap, isDarkMode }: { cap: CapabilityEntry; isDarkMode: boolean }) {
  const wire = CAPABILITY_DEPTH_WIRING.find((w) => w.capabilitySlug === cap.slug);
  const label = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const value = isDarkMode ? 'text-zinc-200' : 'text-slate-800';
  const muted = isDarkMode ? 'text-zinc-400' : 'text-slate-500';
  const box = isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200';
  const chip = isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-slate-100 border-slate-200 text-slate-700';

  if (!wire) {
    return <p className={`text-sm ${muted}`}>No substrate wiring for this capability.</p>;
  }

  const axes = wire.substrateAxes.map((slug) => PATIENT_VECTOR_AXES.find((a) => a.axis === slug)).filter(Boolean);
  const modalities = wire.substrateModalities.map((slug) => EVIDENCE_MODALITIES_7.find((m) => m.modality === slug)).filter(Boolean);

  return (
    <div className="flex flex-col gap-4">
      <div className={`rounded-lg border p-4 ${box}`}>
        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5 ${label}`}>Headline</p>
        <p className={`text-sm leading-relaxed ${value}`}>{wire.headlineSubstrateSentence}</p>
      </div>

      <div className={`rounded-lg border p-4 ${box}`}>
        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${label}`}>
          Patient-biology axes scored ({axes.length})
        </p>
        <ul className="space-y-2">
          {axes.map((a) => (
            <li key={a!.axis}>
              <div className="flex items-baseline gap-2">
                <span className={`text-[10px] uppercase tracking-widest rounded border px-1.5 py-0.5 ${chip}`}>{a!.axis}</span>
                <span className={`text-sm font-semibold ${value}`}>{a!.name}</span>
              </div>
              <p className={`mt-1 text-xs leading-relaxed ${muted}`}>{a!.oneLiner}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={`rounded-lg border p-4 ${box}`}>
        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${label}`}>
          Evidence modalities admitted ({modalities.length} of 7)
        </p>
        <ul className="space-y-2">
          {modalities.map((m) => (
            <li key={m!.modality}>
              <div className="flex items-baseline gap-2">
                <Beaker className={`h-3.5 w-3.5 ${label}`} />
                <span className={`text-sm font-semibold ${value}`}>{m!.name}</span>
              </div>
              <p className={`mt-1 text-xs leading-relaxed ${muted}`}>{m!.whatItMeasures}</p>
              <p className={`mt-1 text-[11px] italic ${muted}`}>Positive threshold: {m!.positiveThreshold}</p>
              <p className={`mt-0.5 text-[11px] ${muted}`}>Source: {m!.dataSource}</p>
            </li>
          ))}
        </ul>
      </div>

      <p className={`text-xs italic ${muted}`}>
        Substrate detail:{' '}
        <Link href="/research/chapters/patient-biology-axes/" className="underline">axes</Link>{' · '}
        <Link href="/research/chapters/seven-evidence-modalities/" className="underline">modalities</Link>{' · '}
        <Link href="/research/chapters/evidence-hierarchy/" className="underline">tiers</Link>.
      </p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Sub-tab: Governance — how this capability is gated
// -----------------------------------------------------------------------------
function GovernanceTab({ cap, isDarkMode }: { cap: CapabilityEntry; isDarkMode: boolean }) {
  const wire = CAPABILITY_DEPTH_WIRING.find((w) => w.capabilitySlug === cap.slug);
  const label = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const value = isDarkMode ? 'text-zinc-200' : 'text-slate-800';
  const muted = isDarkMode ? 'text-zinc-400' : 'text-slate-500';
  const box = isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200';
  const chip = isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-slate-100 border-slate-200 text-slate-700';
  const warn = isDarkMode ? 'text-amber-400' : 'text-amber-700';
  const ban = isDarkMode ? 'text-rose-400' : 'text-rose-700';

  if (!wire) {
    return <p className={`text-sm ${muted}`}>No governance wiring for this capability.</p>;
  }
  const guardrails = wire.governanceGuardrails.map((slug) => GOVERNANCE_GUARDRAILS.find((g) => g.slug === slug)).filter(Boolean);

  return (
    <div className="flex flex-col gap-4">
      <div className={`rounded-lg border p-4 ${box}`}>
        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5 ${label}`}>Headline</p>
        <p className={`text-sm leading-relaxed ${value}`}>{wire.headlineGovernanceSentence}</p>
      </div>

      <div className={`rounded-lg border p-4 ${box}`}>
        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${label}`}>
          Guardrails that gate this capability ({guardrails.length})
        </p>
        <ul className="space-y-3">
          {guardrails.map((g) => (
            <li key={g!.slug}>
              <div className="flex items-baseline gap-2">
                <ShieldCheck className={`h-3.5 w-3.5 ${label}`} />
                <span className={`text-sm font-semibold ${value}`}>{g!.name}</span>
                <Link href={`/governance/#${g!.slug}`} className={`text-[10px] uppercase tracking-widest ${muted} underline`}>
                  details →
                </Link>
              </div>
              <p className={`mt-1 text-xs leading-relaxed ${muted}`}>{g!.whatItLocks}</p>
              <p className={`mt-1 text-[11px] italic ${muted}`}>Public disclosure: {g!.publicDisclosure}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={`rounded-lg border p-4 ${box}`}>
        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${warn}`}>
          Mandatory disclosures ({PUBLIC_MANDATORY_DISCLOSURES.length})
        </p>
        <ul className="space-y-2">
          {PUBLIC_MANDATORY_DISCLOSURES.map((d) => (
            <li key={d} className={`text-xs leading-relaxed ${value}`}>
              <span className={`inline-block mr-2 text-[10px] uppercase tracking-widest rounded border px-1.5 py-0.5 ${chip}`}>Disclosure</span>
              {d}
            </li>
          ))}
        </ul>
      </div>

      <div className={`rounded-lg border p-4 ${box}`}>
        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${ban}`}>
          Prohibited claims — CrisPRO never asserts these ({PUBLIC_PROHIBITED_CLAIMS.length})
        </p>
        <ul className="space-y-2">
          {PUBLIC_PROHIBITED_CLAIMS.map((p) => (
            <li key={p} className="flex items-start gap-2">
              <Ban className={`h-3.5 w-3.5 mt-0.5 flex-none ${ban}`} />
              <span className={`text-xs leading-relaxed ${value}`}>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Sub-tab: Proof — the evidence tiers this capability can emit, plus /ledger/ link
// -----------------------------------------------------------------------------
function ProofTab({ cap, isDarkMode }: { cap: CapabilityEntry; isDarkMode: boolean }) {
  const wire = CAPABILITY_DEPTH_WIRING.find((w) => w.capabilitySlug === cap.slug);
  const label = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const value = isDarkMode ? 'text-zinc-200' : 'text-slate-800';
  const muted = isDarkMode ? 'text-zinc-400' : 'text-slate-500';
  const box = isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200';

  if (!wire) {
    return <p className={`text-sm ${muted}`}>No evidence-tier wiring for this capability.</p>;
  }

  const tiers = wire.substrateTiers.map((slug) => EVIDENCE_TIERS_4.find((t) => t.tier === slug)).filter(Boolean);

  return (
    <div className="flex flex-col gap-4">
      <div className={`rounded-lg border p-4 ${box}`}>
        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${label}`}>
          Evidence tiers this capability may emit ({tiers.length} of 4)
        </p>
        <ul className="space-y-3">
          {tiers.map((t) => (
            <li key={t!.tier}>
              <div className="flex items-baseline gap-2">
                <BookOpen className={`h-3.5 w-3.5 ${label}`} />
                <span className={`text-sm font-semibold uppercase tracking-wider ${value}`}>{t!.name}</span>
              </div>
              <p className={`mt-1 text-xs leading-relaxed ${muted}`}>{t!.entryCriteria}</p>
              <p className={`mt-1 text-[11px] italic ${muted}`}>Clinical actionability: {t!.clinicalActionability}</p>
              {t!.canonicalPublicExample && (
                <p className={`mt-1 text-[11px] ${muted}`}>
                  <span className="font-semibold">Canonical anchor:</span> {t!.canonicalPublicExample}
                </p>
              )}
              {t!.invariant && (
                <p className={`mt-1 text-[11px] font-medium ${label}`}>
                  Invariant: {t!.invariant}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className={`rounded-lg border p-4 ${box}`}>
        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5 ${label}`}>Cross-checks</p>
        <ul className="space-y-1.5 text-xs">
          <li>
            <Link href="/ledger/" className={`underline ${value}`}>Public receipts ledger →</Link>
            <span className={`ml-2 ${muted}`}>every score CrisPRO releases has a corresponding entry.</span>
          </li>
          <li>
            <Link href="/research/chapters/evidence-hierarchy/" className={`underline ${value}`}>Evidence hierarchy chapter →</Link>
            <span className={`ml-2 ${muted}`}>full tier definitions with canonical anchors.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// CapabilityDetail — 4 sub-tabs
// -----------------------------------------------------------------------------
function CapabilityDetail({ cap, isDarkMode }: { cap: CapabilityEntry; isDarkMode: boolean }) {
  const [sub, setSub] = useState<SubTab>('overview');
  const label = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const muted = isDarkMode ? 'text-zinc-400' : 'text-slate-500';
  const idleBtn = isDarkMode
    ? 'text-zinc-500 hover:text-zinc-300 border-transparent'
    : 'text-slate-500 hover:text-slate-800 border-transparent';
  const activeBtn = isDarkMode
    ? 'text-cyan-100 border-cyan-500/60'
    : 'text-indigo-900 border-indigo-400';

  const SUBS: { key: SubTab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'powers', label: 'What powers this' },
    { key: 'governance', label: 'Governance' },
    { key: 'proof', label: 'Proof' },
  ];

  return (
    <div id={cap.slug} className="flex flex-col gap-4 h-full">
      <header>
        <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${label}`}>{cap.id} · Capability</p>
        <h2 className="mt-1.5 text-2xl md:text-3xl font-black tracking-tight uppercase leading-tight">{cap.name}</h2>
      </header>

      <nav className={`flex items-end gap-4 border-b ${isDarkMode ? 'border-zinc-900' : 'border-slate-200'}`}>
        {SUBS.map(({ key, label: subLabel }) => (
          <button
            key={key}
            type="button"
            onClick={() => setSub(key)}
            className={`pb-2 border-b-2 text-xs uppercase tracking-widest transition ${sub === key ? activeBtn : idleBtn}`}
          >
            {subLabel}
          </button>
        ))}
      </nav>

      <div className="flex-1 min-h-0">
        {sub === 'overview' && <OverviewTab cap={cap} isDarkMode={isDarkMode} />}
        {sub === 'powers' && <PowersTab cap={cap} isDarkMode={isDarkMode} />}
        {sub === 'governance' && <GovernanceTab cap={cap} isDarkMode={isDarkMode} />}
        {sub === 'proof' && <ProofTab cap={cap} isDarkMode={isDarkMode} />}
      </div>

      <div className={`mt-auto pt-3 border-t ${isDarkMode ? 'border-zinc-900' : 'border-slate-200'} flex flex-wrap items-center gap-3`}>
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
          className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${muted}`}
        >
          Proof case: {cap.proofCaseSlug.toUpperCase()}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// ComparatorsDetail (unchanged)
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// Root
// -----------------------------------------------------------------------------
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
            Five capabilities that operate at the mechanism-alignment layer. Every capability has an Overview, the substrate that powers it, the governance that gates it, and the proof behind it.
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
