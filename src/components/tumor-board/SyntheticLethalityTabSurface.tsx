'use client';

// ============================================================================
// SyntheticLethalityTabSurface.tsx
//
// Tab-strip surface for /engine/synthetic-lethality/tabs/. Mirrors
// TumorBoardSurface / TargetLockBrainMetTabSurface pattern:
//   Tab strip:
//     Axis A · Axis B · Axis C · PARPi FALSIFIED · Convergence
//     v3 engine · Ovarian hits · Disclosure gaps
//   Each tab renders panel content sourced from mbd4-manuscript-data.ts.
//
// Every string / number is frozen against the audit ground truth.
// ============================================================================

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Beaker,
  Microscope,
  Layers,
  XCircle,
  GitMerge,
  Cog,
  ListTree,
  ShieldCheck,
  AlertOctagon,
  ChevronRight,
} from 'lucide-react';

import { useTheme } from '@/context/ThemeContext';
import { PersonaContent, type PersonaCopyDeck } from '@/context/persona-content';

import {
  MANUSCRIPT,
  AXIS_A_CYTIDINE,
  AXIS_B_IO,
  AXIS_C_ATR,
  PARPI_FALSIFIED,
  CONVERGENCE,
  V3_ENGINE,
  OVARIAN_HITS,
  RECONCILIATION,
  SL_GAPS,
} from '@/data/mbd4-manuscript-data';

// ---- Persona-aware header deck --------------------------------------------
// Same MBD4 story, per-audience voice. Consumed once above the tab strip so
// the deck framing persists across all 8 tab views.
// Anchored to mbd4-manuscript-data.ts (same numbers as SL scroll surface).
// ---------------------------------------------------------------------------

type SLHeaderCopy = {
  eyebrow: string;
  headline: string;
  body: string;
  bullets: { label: string; value: string }[];
  caveat?: string;
};

const SL_HEADER_DECK: PersonaCopyDeck<SLHeaderCopy> = {
  oncologist: {
    eyebrow: 'Tab-strip navigation · MBD4-LOF synthetic-lethality',
    headline: 'Pick an axis. Each tab shows the receipt, not the summary.',
    body:
      'The tabs mirror the four therapeutic axes tested against MBD4-LOF plus convergence, engine, ovarian hits, and disclosure. Axes A + C validated. Axis B emerging (case-level). PARPi is falsified at its first premise (PARP1 not up, alternate bridge dead) — read the falsification tab before positioning any PARP bet.',
    bullets: [
      { label: 'Primary axis (validated)', value: 'ATRi ceralasertib · ΔLN_IC50=-0.73 · n=14 LOF vs 914 WT' },
      { label: 'Falsified', value: 'PARP1 MWU p=0.605 · n=19 LOF vs 1498 WT' },
      { label: 'Convergence', value: '4 stress tests hold: TP53-adj, MSI-adj, lineage, WEE1i' },
    ],
    caveat:
      'GDSC2 cell-line data; small LOF cohort. Hypothesis-generating with strong receipts, not a phase-3 confirmatory readout.',
  },
  patient: {
    eyebrow: 'Reading this page',
    headline: 'Eight tabs. Each explains a possible treatment route for MBD4-broken tumors.',
    body:
      'The tab strip above lets you jump between the four drug routes tested (Cytidine, Immunotherapy, ATRi, PARP) plus the summary tabs. Green badges mean the evidence supports the route. Red X means the route was tested and did not hold up.',
    bullets: [
      { label: 'Green', value: 'Cytidine analogs · ATR inhibitors (ceralasertib)' },
      { label: 'Emerging', value: 'Immunotherapy — supported by individual patient cases' },
      { label: 'Red X', value: 'PARP inhibitors — evidence does not support' },
    ],
    caveat:
      'These are laboratory findings. Ask your care team whether a clinical trial exists for your tumor’s MBD4 status.',
  },
  pharma: {
    eyebrow: 'BD tab-strip · SL manuscript navigation',
    headline: 'Eight tabs. Only two axes clear the bar. Falsification tab is the load-bearing one.',
    body:
      'Portfolio position: ATRi (AZD6738/ceralasertib) is the pivoted-to axis with 4 stress tests holding. PARP1 hypothesis is dead at the first premise; alternate RNF144A bridge is dead too. Ovarian precomputed hits + v3 engine tabs explain how the platform surfaces additional lineage-selective vulnerabilities beyond MBD4. Reconciliation + gaps tab is where the honest limitations live — read before committing spend.',
    bullets: [
      { label: 'Manuscript target', value: 'bioRxiv · RUO' },
      { label: 'Load-bearing evidence', value: 'Axis C ATRi · 4 stress tests · GDSC2 n=14 LOF' },
      { label: 'Falsified with receipts', value: 'PARPi · PARP1 p=0.605 · RNF144A also dead' },
    ],
    caveat:
      'AK patient (MBD4 frameshift MSS-CRC, PARP recommended by prod) is the field validation. Reconciliation + gaps tab is not optional reading for BD.',
  },
};

// no-scroll linter marker (required)
export const SurfaceTabs = ({ children }: { children: React.ReactNode }) => <>{children}</>;

type TabKey =
  | 'axis_a'
  | 'axis_b'
  | 'axis_c'
  | 'parpi_falsified'
  | 'convergence'
  | 'v3_engine'
  | 'ovarian_hits'
  | 'disclosure';

const TABS: { key: TabKey; label: string; icon: any }[] = [
  { key: 'axis_a',           label: 'Axis A · Cytidine',    icon: Beaker },
  { key: 'axis_b',           label: 'Axis B · Immuno',      icon: Microscope },
  { key: 'axis_c',           label: 'Axis C · ATRi',        icon: Layers },
  { key: 'parpi_falsified',  label: 'PARPi (falsified)',    icon: XCircle },
  { key: 'convergence',      label: 'Convergence',          icon: GitMerge },
  { key: 'v3_engine',        label: 'v3 engine',            icon: Cog },
  { key: 'ovarian_hits',     label: 'Ovarian hits',         icon: ListTree },
  { key: 'disclosure',       label: 'Reconciliation · gaps', icon: AlertOctagon },
];

// ── small helpers ──────────────────────────────────────────────────────────

function Pill({ label, value, tone = 'default', isDarkMode }: { label: string; value: string; tone?: 'default' | 'good' | 'bad' | 'neutral'; isDarkMode: boolean }) {
  const tint =
    tone === 'good' ? (isDarkMode ? 'text-emerald-400' : 'text-emerald-600')
    : tone === 'bad' ? (isDarkMode ? 'text-rose-400' : 'text-rose-600')
    : tone === 'neutral' ? (isDarkMode ? 'text-zinc-300' : 'text-zinc-600')
    : isDarkMode ? 'text-cyan-300' : 'text-indigo-600';
  return (
    <div className={`rounded border p-4 ${isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'}`}>
      <div className={`text-[9px] font-black uppercase tracking-[0.3em] mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>{label}</div>
      <div className={`text-xl font-black tracking-tighter ${tint}`}>{value}</div>
    </div>
  );
}

// ── panels ─────────────────────────────────────────────────────────────────

function AxisAPanel({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div>
      <h3 className={`text-2xl font-black uppercase tracking-[0.15em] mb-1 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        Cytidine analogs · Chabot 2022
      </h3>
      <p className={`text-[11px] font-black uppercase tracking-widest mb-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
        <ShieldCheck className="inline w-3 h-3 mr-1" /> {AXIS_A_CYTIDINE.statusLabel}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
        <Pill label="IC50 · LOF" value={AXIS_A_CYTIDINE.ic50Lof} tone="good" isDarkMode={isDarkMode} />
        <Pill label="IC50 · WT" value={AXIS_A_CYTIDINE.ic50Wt} isDarkMode={isDarkMode} />
        <Pill label="Fold shift" value={AXIS_A_CYTIDINE.fold} tone="good" isDarkMode={isDarkMode} />
        <Pill label="p-value" value={AXIS_A_CYTIDINE.pValue} tone="good" isDarkMode={isDarkMode} />
      </div>
      <div className={`rounded border p-4 mb-3 ${isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50'}`}>
        <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>Evidence stack</p>
        <ul className="space-y-1">
          {AXIS_A_CYTIDINE.evidence.map((e) => (
            <li key={e} className={`text-[12px] flex items-start gap-2 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              <span className={isDarkMode ? 'text-cyan-500 mt-0.5' : 'text-indigo-500 mt-0.5'}>▸</span>{e}
            </li>
          ))}
        </ul>
      </div>
      <p className={`text-[12px] italic ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
        Model: {AXIS_A_CYTIDINE.model} · Drug: {AXIS_A_CYTIDINE.drug} · Companion: {AXIS_A_CYTIDINE.companion}
      </p>
    </div>
  );
}

function AxisBPanel({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div>
      <h3 className={`text-2xl font-black uppercase tracking-[0.15em] mb-1 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        Immunotherapy · case-level
      </h3>
      <p className={`text-[11px] font-black uppercase tracking-widest mb-4 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>
        <Microscope className="inline w-3 h-3 mr-1" /> Emerging · case-level
      </p>
      <p className={`text-[13px] mb-5 max-w-4xl ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
        <span className="font-black">Mechanism:</span> {AXIS_B_IO.mechanism}.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        {AXIS_B_IO.cases.map((c) => (
          <div key={c.ref} className={`rounded border p-4 ${isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50'}`}>
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>{c.ref}</p>
            <p className={`text-[12px] ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{c.finding}</p>
          </div>
        ))}
      </div>
      <p className={`text-[12px] ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
        <span className="font-black">Role:</span> {AXIS_B_IO.role}
      </p>
    </div>
  );
}

function AxisCPanel({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div>
      <h3 className={`text-2xl font-black uppercase tracking-[0.15em] mb-1 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        ATR inhibition · {AXIS_C_ATR.compound}
      </h3>
      <p className={`text-[11px] font-black uppercase tracking-widest mb-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
        <ShieldCheck className="inline w-3 h-3 mr-1" /> {AXIS_C_ATR.statusLabel}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <Pill label="n · LOF vs WT" value={`${AXIS_C_ATR.primaryLnIc50.nLof} / ${AXIS_C_ATR.primaryLnIc50.nWt}`} isDarkMode={isDarkMode} />
        <Pill label="Δ LN_IC50" value={String(AXIS_C_ATR.primaryLnIc50.delta)} tone="good" isDarkMode={isDarkMode} />
        <Pill label="p (MWU · one-sided)" value={String(AXIS_C_ATR.primaryLnIc50.pValue)} tone="good" isDarkMode={isDarkMode} />
        <Pill label="Cohen's d" value={String(AXIS_C_ATR.primaryLnIc50.cohensD)} tone="good" isDarkMode={isDarkMode} />
      </div>
      <p className={`text-[11px] mb-4 max-w-3xl ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
        Database: {AXIS_C_ATR.database} · WT rule: {AXIS_C_ATR.wtRule} · Test: {AXIS_C_ATR.primaryLnIc50.test}
      </p>

      <h4 className={`text-[13px] font-black uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        Four confounder stress tests
      </h4>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
        {AXIS_C_ATR.stressTests.map((st) => (
          <div key={st.id} className={`rounded border p-3 ${isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'}`}>
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
              Stress test {st.id} — {st.name}
            </p>
            <p className={`text-[11px] mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{st.definition}</p>
            <div className={`grid grid-cols-2 gap-1 text-[10px] mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              {'delta' in st && (
                <>
                  <div>Δ: <span className="font-black">{st.delta}</span></div>
                  <div>p: <span className="font-black">{st.pValue}</span></div>
                  <div>d: <span className="font-black">{st.cohensD}</span></div>
                  <div>n: <span className="font-black">{st.nLof} / {st.nWt}</span></div>
                </>
              )}
              {'maxP' in st && (
                <>
                  <div>max p: <span className="font-black">{st.maxP}</span></div>
                  <div>min p: <span className="font-black">{st.minP}</span></div>
                </>
              )}
            </div>
            <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
              ✓ {st.verdict}
            </p>
          </div>
        ))}
      </div>

      <h4 className={`text-[13px] font-black uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        Companion — WEE1i (adavosertib)
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Pill label="n · LOF vs WT" value={`${AXIS_C_ATR.companion.nLof} / ${AXIS_C_ATR.companion.nWt}`} isDarkMode={isDarkMode} />
        <Pill label="Δ LN_IC50" value={String(AXIS_C_ATR.companion.delta)} tone="neutral" isDarkMode={isDarkMode} />
        <Pill label="p" value={String(AXIS_C_ATR.companion.pValue)} tone="neutral" isDarkMode={isDarkMode} />
        <Pill label="Cohen's d" value={String(AXIS_C_ATR.companion.cohensD)} tone="neutral" isDarkMode={isDarkMode} />
      </div>
      <p className={`text-[11px] italic mt-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
        {AXIS_C_ATR.companion.verdict}
      </p>
    </div>
  );
}

function ParpiFalsifiedPanel({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div>
      <h3 className={`text-2xl font-black uppercase tracking-[0.15em] mb-1 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        PARP inhibitor axis · falsified
      </h3>
      <p className={`text-[11px] font-black uppercase tracking-widest mb-4 ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>
        <XCircle className="inline w-3 h-3 mr-1" /> Hypothesis tested and rejected
      </p>
      <div className={`rounded border p-4 mb-4 ${isDarkMode ? 'border-rose-900/50 bg-rose-950/20' : 'border-rose-200 bg-rose-50'}`}>
        <p className={`text-[13px] ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{PARPI_FALSIFIED.hypothesis}</p>
      </div>
      <h4 className={`text-[13px] font-black uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        PARP1 expression MWU
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <Pill label="n · LOF vs pool" value={`${PARPI_FALSIFIED.parp1Expression.nLof} / ${PARPI_FALSIFIED.parp1Expression.nWtExpressionPool}`} isDarkMode={isDarkMode} />
        <Pill label="Δ median" value={String(PARPI_FALSIFIED.parp1Expression.delta)} tone="bad" isDarkMode={isDarkMode} />
        <Pill label="p" value={String(PARPI_FALSIFIED.parp1Expression.pValue)} tone="bad" isDarkMode={isDarkMode} />
        <Pill label="Verdict" value="NOT SIG" tone="bad" isDarkMode={isDarkMode} />
      </div>

      <h4 className={`text-[13px] font-black uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        Alternate bridge — RNF144A (dead)
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <Pill label="Δ median" value={String(PARPI_FALSIFIED.rnf144aAlternate.delta)} tone="bad" isDarkMode={isDarkMode} />
        <Pill label="p" value={String(PARPI_FALSIFIED.rnf144aAlternate.pValue)} tone="bad" isDarkMode={isDarkMode} />
        <Pill label="Verdict" value="DEAD" tone="bad" isDarkMode={isDarkMode} />
      </div>

      <h4 className={`text-[13px] font-black uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        Context — PARP1↔PARPi Spearman (pan-cancer, not MBD4-selective)
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <Pill label="n" value={String(PARPI_FALSIFIED.parp1ParpiSpearman.n)} isDarkMode={isDarkMode} />
        <Pill label="Spearman ρ" value={String(PARPI_FALSIFIED.parp1ParpiSpearman.rho)} isDarkMode={isDarkMode} />
        <Pill label="p" value={PARPI_FALSIFIED.parp1ParpiSpearman.pValue} isDarkMode={isDarkMode} />
      </div>
      <p className={`text-[11px] italic ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
        {PARPI_FALSIFIED.parp1ParpiSpearman.verdict}
      </p>
    </div>
  );
}

function ConvergencePanel({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div>
      <h3 className={`text-2xl font-black uppercase tracking-[0.15em] mb-1 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        Convergence model
      </h3>
      <p className={`text-[11px] font-black uppercase tracking-widest mb-4 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
        <GitMerge className="inline w-3 h-3 mr-1" /> Replication-fork failure axis
      </p>
      <div className={`rounded border p-6 mb-4 ${isDarkMode ? 'border-cyan-900/50 bg-cyan-950/20' : 'border-indigo-200 bg-indigo-50'}`}>
        <p className={`text-[13px] leading-relaxed mb-3 ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>{CONVERGENCE.body}</p>
        <p className={`text-[12px] font-black uppercase tracking-widest ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
          {CONVERGENCE.translational}
        </p>
      </div>
    </div>
  );
}

function V3EnginePanel({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div>
      <h3 className={`text-2xl font-black uppercase tracking-[0.15em] mb-1 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        v3 SL engine · architecture
      </h3>
      <p className={`text-[11px] font-black uppercase tracking-widest mb-4 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
        <Cog className="inline w-3 h-3 mr-1" /> Code source: {V3_ENGINE.codeSource}
      </p>
      <ul className="space-y-2 mb-4">
        <li className={`text-[13px] ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}><span className="font-black">Primary test:</span> {V3_ENGINE.primaryTest}</li>
        <li className={`text-[13px] ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}><span className="font-black">Effect size:</span> {V3_ENGINE.effectSize}</li>
        <li className={`text-[13px] ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}><span className="font-black">Δ dependency:</span> {V3_ENGINE.deltaDep}</li>
        <li className={`text-[13px] ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}><span className="font-black">Multiple testing:</span> {V3_ENGINE.multipleTesting}</li>
        <li className={`text-[13px] ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}><span className="font-black">Pan-essential filter:</span> {V3_ENGINE.panEssentialRule}</li>
        <li className={`text-[13px] ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}><span className="font-black">Min group size:</span> {V3_ENGINE.minGroup} — fallback: {V3_ENGINE.fallbackRule}</li>
      </ul>
      <div className={`rounded border p-4 mb-4 ${isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50'}`}>
        <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>Pan-essential blacklist (24 hardcoded)</p>
        <p className={`text-[11px] ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{V3_ENGINE.panEssentialBlacklist.join(' · ')}</p>
      </div>
      <div className={`rounded border p-4 ${isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50'}`}>
        <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>Public API — {V3_ENGINE.api.prefix}</p>
        <p className={`text-[11px] mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Auth: {V3_ENGINE.api.auth}</p>
        <ul className="space-y-0.5">
          {V3_ENGINE.api.endpoints.map((e) => (
            <li key={e} className={`text-[11px] font-mono ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>▸ {e}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function OvarianHitsPanel({ isDarkMode }: { isDarkMode: boolean }) {
  const tables = [
    { title: 'Lineage-selective (top 7)', rows: OVARIAN_HITS.lineageSelective },
    { title: 'BRCA1/2-mutant (top 8)',   rows: OVARIAN_HITS.brca12Mutant },
    { title: 'TP53-mutant (top 4)',      rows: OVARIAN_HITS.tp53Mutant },
    { title: 'CCNE1-amplified (top 4)',  rows: OVARIAN_HITS.ccne1Amp },
  ];
  return (
    <div>
      <h3 className={`text-2xl font-black uppercase tracking-[0.15em] mb-4 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        Ovarian precomputed hits · v3 outputs
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {tables.map((tbl) => (
          <div key={tbl.title} className={`rounded border p-4 ${isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50'}`}>
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-3 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>{tbl.title}</p>
            <div className="space-y-1">
              {tbl.rows.map((r) => (
                <div key={r.gene} className={`flex items-center justify-between text-[11px] font-mono py-1 border-b last:border-0 ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                  <span className={`font-black ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{r.gene}</span>
                  <span className={isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}>d {r.d} · {'padj' in r ? `padj ${r.padj}` : `p ${r.p}`}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DisclosurePanel({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div>
      <h3 className={`text-2xl font-black uppercase tracking-[0.15em] mb-1 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        Manuscript reconciliation + disclosure
      </h3>
      <p className={`text-[11px] font-black uppercase tracking-widest mb-4 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>
        <AlertOctagon className="inline w-3 h-3 mr-1" /> Transparency — every rounded number and every gap
      </p>
      <div className={`rounded border p-4 mb-4 ${isDarkMode ? 'border-emerald-900/50 bg-emerald-950/20' : 'border-emerald-200 bg-emerald-50'}`}>
        <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>RECONCILIATION_TABLE.md</p>
        <p className={`text-[13px] mb-1 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{RECONCILIATION.summary}</p>
        <p className={`text-[11px] ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>{RECONCILIATION.denominators}</p>
      </div>
      <div className="space-y-3">
        {SL_GAPS.map((g) => (
          <div key={g.id} className={`rounded border p-4 ${isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50'}`}>
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${
              g.severity === 'high' ? (isDarkMode ? 'text-rose-400' : 'text-rose-600')
              : g.severity === 'medium' ? (isDarkMode ? 'text-amber-400' : 'text-amber-600')
              : (isDarkMode ? 'text-cyan-400' : 'text-indigo-600')
            }`}>
              {g.id} · {g.severity}
            </p>
            <p className={`text-[12px] font-black mb-1 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{g.title}</p>
            <p className={`text-[12px] ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{g.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main surface ───────────────────────────────────────────────────────────

export default function SyntheticLethalityTabSurface() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<TabKey>('axis_c');

  const panels: Record<TabKey, React.ReactNode> = {
    axis_a: <AxisAPanel isDarkMode={isDarkMode} />,
    axis_b: <AxisBPanel isDarkMode={isDarkMode} />,
    axis_c: <AxisCPanel isDarkMode={isDarkMode} />,
    parpi_falsified: <ParpiFalsifiedPanel isDarkMode={isDarkMode} />,
    convergence: <ConvergencePanel isDarkMode={isDarkMode} />,
    v3_engine: <V3EnginePanel isDarkMode={isDarkMode} />,
    ovarian_hits: <OvarianHitsPanel isDarkMode={isDarkMode} />,
    disclosure: <DisclosurePanel isDarkMode={isDarkMode} />,
  };

  return (
    <SurfaceTabs>
      <div className={`min-h-screen font-mono ${isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-white text-zinc-700'}`}>
        {/* Header */}
        <header className={`border-b backdrop-blur-sm sticky top-0 z-40 ${isDarkMode ? 'border-white/5 bg-black/60' : 'border-zinc-200 bg-white/80'}`}>
          <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 group">
                <div className={`w-9 h-9 rounded border flex items-center justify-center group-hover:border-cyan-500/50 transition-colors ${isDarkMode ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-100'}`}>
                  <ListTree className={isDarkMode ? 'w-4 h-4 text-cyan-400' : 'w-4 h-4 text-indigo-500'} />
                </div>
                <span className={`text-[11px] font-black uppercase tracking-[0.3em] group-hover:text-cyan-400 transition-colors ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                  CrisPRO · Synthetic-Lethality
                </span>
              </Link>
              <span className={`h-6 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-300'}`} />
              <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>/engine/synthetic-lethality/tabs</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em]">
              <Link href="/engine/synthetic-lethality/scroll" className={isDarkMode ? 'text-zinc-400 hover:text-cyan-400 transition-colors' : 'text-zinc-600 hover:text-indigo-600 transition-colors'}>Scroll view →</Link>
              <Link href="/engine/target-lock/tabs" className={isDarkMode ? 'text-zinc-400 hover:text-cyan-400 transition-colors' : 'text-zinc-600 hover:text-indigo-600 transition-colors'}>Target-lock (BrM) →</Link>
            </div>
          </div>
        </header>

        {/* Tab strip */}
        <div className={`border-b ${isDarkMode ? 'border-white/5 bg-black/40' : 'border-zinc-200 bg-white/60'}`}>
          <div className="max-w-[1600px] mx-auto px-6 py-3 flex flex-wrap gap-2">
            {TABS.map((t) => {
              const active = t.key === activeTab;
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`px-3 py-2 rounded border text-[10px] font-black uppercase tracking-[0.25em] transition-colors flex items-center gap-2 ${
                    active
                      ? isDarkMode
                        ? 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300'
                        : 'border-indigo-500/50 bg-indigo-50 text-indigo-700'
                      : isDarkMode
                      ? 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-cyan-500/30 hover:text-cyan-300'
                      : 'border-zinc-200 bg-white text-zinc-600 hover:border-indigo-400 hover:text-indigo-600'
                  }`}
                >
                  <t.icon className="w-3 h-3" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Manuscript title */}
        <div className={`max-w-[1600px] mx-auto px-6 py-6 border-b ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}>
          <p className={`text-[10px] font-black uppercase tracking-[0.4em] mb-1 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
            {MANUSCRIPT.short}
          </p>
          <p className={`text-[13px] max-w-4xl ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{MANUSCRIPT.title}</p>
          <p className={`text-[10px] mt-2 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
            Target journal: <span className="font-black">{MANUSCRIPT.target}</span> · RUO · Author {MANUSCRIPT.author}
          </p>
        </div>

        {/* Persona-aware header deck — same story, per-audience voice */}
        <PersonaContent
          deck={SL_HEADER_DECK}
          render={(copy) => (
            <div className={`max-w-[1600px] mx-auto px-6 py-6 border-b ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}>
              <p className={`text-[10px] font-black uppercase tracking-[0.4em] mb-1 ${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'}`}>
                {copy.eyebrow}
              </p>
              <h2 className={`text-lg md:text-xl font-black uppercase tracking-[0.12em] mb-3 max-w-4xl ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                {copy.headline}
              </h2>
              <p className={`text-[13px] leading-relaxed max-w-4xl mb-4 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                {copy.body}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                {copy.bullets.map((b) => (
                  <div key={b.label} className={`rounded border p-3 ${isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'}`}>
                    <p className={`text-[9px] font-black uppercase tracking-[0.3em] mb-1 ${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'}`}>
                      {b.label}
                    </p>
                    <p className={`text-[12px] leading-snug ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
                      {b.value}
                    </p>
                  </div>
                ))}
              </div>
              {copy.caveat && (
                <p className={`text-[11px] italic leading-relaxed max-w-4xl ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                  <span className="not-italic font-black uppercase tracking-widest mr-1">Caveat ·</span>
                  {copy.caveat}
                </p>
              )}
            </div>
          )}
        />

        {/* Panel body */}
        <main className="max-w-[1600px] mx-auto px-6 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              {panels[activeTab]}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer cross-links */}
        <footer className={`border-t ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}>
          <div className="max-w-[1600px] mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/engine/target-lock/scroll" className={`rounded border p-4 group transition-colors ${isDarkMode ? 'border-zinc-800 bg-zinc-950/40 hover:border-cyan-500/50' : 'border-zinc-200 bg-zinc-50 hover:border-indigo-500/50'}`}>
              <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>Target-lock (BrM)</p>
              <p className={`text-[13px] ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>7-step cascade → AUROC 0.6889</p>
              <ChevronRight className={`w-4 h-4 mt-3 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
            </Link>
            <Link href="/programs/pilot-programs" className={`rounded border p-4 group transition-colors ${isDarkMode ? 'border-zinc-800 bg-zinc-950/40 hover:border-cyan-500/50' : 'border-zinc-200 bg-zinc-50 hover:border-indigo-500/50'}`}>
              <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>Programs · MBD4-directed</p>
              <p className={`text-[13px] ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Cytidine + ATRi combination cohorts</p>
              <ChevronRight className={`w-4 h-4 mt-3 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
            </Link>
            <Link href="/trials" className={`rounded border p-4 group transition-colors ${isDarkMode ? 'border-zinc-800 bg-zinc-950/40 hover:border-cyan-500/50' : 'border-zinc-200 bg-zinc-50 hover:border-indigo-500/50'}`}>
              <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>Trials · retrospective mock</p>
              <p className={`text-[13px] ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Case files where SL priors would have flagged responders</p>
              <ChevronRight className={`w-4 h-4 mt-3 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
            </Link>
          </div>
        </footer>
      </div>
    </SurfaceTabs>
  );
}
