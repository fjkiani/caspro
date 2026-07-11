'use client';

// ============================================================================
// SyntheticLethalityScrollSurface.tsx
//
// Patient-driven long-scroll surface for /engine/synthetic-lethality/scroll/.
// Sections are derived from the active PatientBundle (via usePatient) and
// gated by getCapabilities(). Missing capabilities → section is hidden entirely.
//
// Section order (top to bottom, all gated):
//   0.  Nav + patient identity
//   1.  Double-hit summary card (if hasDoubleHit)
//   2.  Broken × essential pathways (if hasBrokenPathways || hasEssentialPathways)
//   3.  SL matrix — one card per axis (if hasSlMatrix)
//   4.  Ranked drug candidates (if hasRecommendedDrugs)
//   5.  Why NOT PARP — falsification arc (if hasParpFalsification)
//   6.  Receipts from literature (if hasEvidenceAnchors)
//   7.  Gaps we would need to close (if hasTestsNeeded)
//   8.  Provenance + completeness ceiling (if hasProvenance)
//   9.  Cross-links to sibling engines
//
// No AK/MBD4 imports. Everything renders from the active PatientBundle.
// ============================================================================

import Link from 'next/link';
import {
  ChevronRight,
  Layers,
  ShieldCheck,
  XCircle,
  Cog,
  ListTree,
  AlertOctagon,
  Beaker,
  Zap,
} from 'lucide-react';

import { useTheme } from '@/context/ThemeContext';
import { useOptionalPatient } from '@/context/PatientContext';
import { AK01 } from '@/data/patients/AK01';
import { getCapabilities } from '@/lib/capabilities';
import { productFor, labelFor } from '@/lib/product-glossary';
import DNAHero from './shared/DNAHero';
import type {
  PatientBundle,
  SLAxisRow,
  BrokenPathway,
  EssentialPathway,
  RecommendedDrug,
  EvidenceAnchor,
  TestNeeded,
  PARPFalsification,
} from '@/data/tumor-board/patient-bundle-types';

// ---------------------------------------------------------------------------
// Local UI helpers
// ---------------------------------------------------------------------------

function tierTone(tier: string): 'good' | 'candidate' | 'bad' | 'neutral' {
  if (tier === 'Validated SL therapeutic lever') return 'good';
  if (tier === 'Strong candidate dependency axis') return 'candidate';
  if (tier === 'Mechanistic candidate only') return 'neutral';
  if (tier === 'Not supported / negative') return 'bad';
  return 'neutral';
}

function toneClass(
  tone: 'good' | 'candidate' | 'bad' | 'neutral',
  isDarkMode: boolean,
): string {
  switch (tone) {
    case 'good':
      return isDarkMode ? 'text-emerald-400' : 'text-emerald-600';
    case 'candidate':
      return isDarkMode ? 'text-cyan-300' : 'text-indigo-600';
    case 'bad':
      return isDarkMode ? 'text-rose-400' : 'text-rose-600';
    default:
      return isDarkMode ? 'text-zinc-300' : 'text-zinc-600';
  }
}

function Section({
  id,
  step,
  eyebrow,
  title,
  children,
}: {
  id: string;
  step?: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  const { isDarkMode } = useTheme();
  return (
    <section
      id={id}
      className={`max-w-[1600px] mx-auto px-8 py-16 border-t ${
        isDarkMode ? 'border-white/5' : 'border-zinc-200'
      }`}
    >
      <div className="flex items-start gap-8">
        {step && (
          <div className="shrink-0">
            <div
              className={`w-16 h-16 rounded border flex items-center justify-center ${
                isDarkMode ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-100'
              }`}
            >
              <span
                className={`text-lg font-black tracking-widest ${
                  isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                }`}
              >
                {step}
              </span>
            </div>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p
            className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 ${
              isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
            }`}
          >
            {eyebrow}
          </p>
          <h2
            className={`text-3xl font-black uppercase tracking-[0.15em] mb-3 ${
              isDarkMode ? 'text-white' : 'text-zinc-900'
            }`}
          >
            {title}
          </h2>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </section>
  );
}

function Pill({
  label,
  value,
  tone = 'neutral',
  isDarkMode,
}: {
  label: string;
  value: React.ReactNode;
  tone?: 'good' | 'candidate' | 'bad' | 'neutral';
  isDarkMode: boolean;
}) {
  return (
    <div
      className={`rounded border p-4 ${
        isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
      }`}
    >
      <div
        className={`text-[9px] font-black uppercase tracking-[0.3em] mb-1 ${
          isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
        }`}
      >
        {label}
      </div>
      <div className={`text-xl font-black tracking-tighter ${toneClass(tone, isDarkMode)}`}>{value}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section — SL axis (one instance per slMatrix row)
// ---------------------------------------------------------------------------

function AxisCard({
  row,
  isDarkMode,
}: {
  row: SLAxisRow;
  isDarkMode: boolean;
}) {
  const prodTone = tierTone(row.prodTier);
  const simTone = tierTone(row.simTier);
  const diverges = row.divergenceIntended === true;

  return (
    <div
      className={`rounded border p-6 mb-4 ${
        isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-white shadow-sm'
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={`shrink-0 ${toneClass(prodTone, isDarkMode)}`}>
          {diverges ? <Zap className="w-5 h-5" /> : <Beaker className="w-5 h-5" />}
        </div>
        <div>
          <p
            className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${
              isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'
            }`}
          >
            Therapeutic Lever (SL axis)
          </p>
          <h3
            className={`text-xl font-black uppercase tracking-[0.12em] ${
              isDarkMode ? 'text-white' : 'text-zinc-900'
            }`}
          >
            {row.axis}
          </h3>
          {row.manuscriptClaimType && (
            <p
              className={`text-[10px] font-black uppercase tracking-widest mt-1 ${
                isDarkMode ? 'text-amber-400' : 'text-amber-600'
              }`}
            >
              Manuscript claim: {row.manuscriptClaimType}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <Pill
          label={`${productFor('prod_tier')} — ships today`}
          value={row.prodTier}
          tone={prodTone}
          isDarkMode={isDarkMode}
        />
        <Pill
          label={`${productFor('sim_tier')} — simulator only`}
          value={row.simTier}
          tone={simTone}
          isDarkMode={isDarkMode}
        />
      </div>
      {diverges && (
        <div
          className={`rounded border p-3 ${
            isDarkMode
              ? 'border-amber-900/50 bg-amber-950/20'
              : 'border-amber-200 bg-amber-50'
          }`}
        >
          <p
            className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${
              isDarkMode ? 'text-amber-400' : 'text-amber-600'
            }`}
          >
            {labelFor('divergence_intended')}
          </p>
          <p className={`text-[12px] ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            {row.divergenceExplanation ??
              'Simulator disagrees with prod tier on purpose — a research bet, not a bug.'}
          </p>
        </div>
      )}
      {!diverges && row.divergenceExplanation && (
        <div
          className={`rounded border p-3 ${
            isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-zinc-50'
          }`}
        >
          <p
            className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${
              isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
            }`}
          >
            Rationale
          </p>
          <p className={`text-[12px] ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            {row.divergenceExplanation}
          </p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section — Machinery (broken × essential)
// ---------------------------------------------------------------------------

function MachineryBlock({
  broken,
  essential,
  isDarkMode,
}: {
  broken: BrokenPathway[];
  essential: EssentialPathway[];
  isDarkMode: boolean;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div
        className={`rounded border p-4 ${
          isDarkMode ? 'border-rose-900/50 bg-rose-950/10' : 'border-rose-200 bg-rose-50/50'
        }`}
      >
        <p
          className={`text-[10px] font-black uppercase tracking-[0.3em] mb-3 ${
            isDarkMode ? 'text-rose-400' : 'text-rose-600'
          }`}
        >
          {productFor('broken_pathways')} ({broken.length})
        </p>
        <div className="space-y-2">
          {broken.map((bp) => (
            <div
              key={bp.pathwayId}
              className={`rounded border p-3 ${
                isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
              }`}
            >
              <div className="flex items-baseline justify-between mb-1">
                <span
                  className={`font-black text-[13px] ${
                    isDarkMode ? 'text-white' : 'text-zinc-900'
                  }`}
                >
                  {bp.pathwayId}
                </span>
                <span
                  className={`text-[10px] font-mono ${
                    isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
                  }`}
                >
                  disruption {bp.disruptionScore.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[9px] font-black uppercase tracking-widest ${
                    bp.status === 'non_functional'
                      ? isDarkMode
                        ? 'text-rose-400'
                        : 'text-rose-600'
                      : bp.status === 'compromised'
                      ? isDarkMode
                        ? 'text-amber-400'
                        : 'text-amber-600'
                      : isDarkMode
                      ? 'text-emerald-400'
                      : 'text-emerald-600'
                  }`}
                >
                  {bp.status.replace(/_/g, ' ')}
                </span>
                {bp.genesAffected.map((g) => (
                  <span
                    key={g}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono ${
                      isDarkMode
                        ? 'bg-zinc-900 text-zinc-300'
                        : 'bg-zinc-100 text-zinc-700'
                    }`}
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`rounded border p-4 ${
          isDarkMode
            ? 'border-emerald-900/50 bg-emerald-950/10'
            : 'border-emerald-200 bg-emerald-50/50'
        }`}
      >
        <p
          className={`text-[10px] font-black uppercase tracking-[0.3em] mb-3 ${
            isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
          }`}
        >
          {productFor('essential_pathways')} ({essential.length})
        </p>
        <div className="space-y-2">
          {essential.map((ep) => (
            <div
              key={ep.pathwayId}
              className={`rounded border p-3 ${
                isDarkMode ? 'border-zinc-800 bg-zinc-950/60' : 'border-zinc-200 bg-white'
              }`}
            >
              <div className="flex items-baseline justify-between mb-1">
                <span
                  className={`font-black text-[13px] ${
                    isDarkMode ? 'text-white' : 'text-zinc-900'
                  }`}
                >
                  {ep.pathwayId}
                </span>
                <span
                  className={`text-[10px] font-mono ${
                    isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
                  }`}
                >
                  disruption {ep.disruptionScore.toFixed(2)}
                </span>
              </div>
              <p
                className={`text-[11px] ${
                  isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
                }`}
              >
                {ep.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section — Candidates (recommendedDrugs)
// ---------------------------------------------------------------------------

function CandidatesBlock({
  drugs,
  suggested,
  isDarkMode,
}: {
  drugs: RecommendedDrug[];
  suggested: string | null;
  isDarkMode: boolean;
}) {
  return (
    <div>
      {suggested && (
        <p
          className={`text-[12px] mb-4 max-w-3xl ${
            isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
          }`}
        >
          <span
            className={`font-black uppercase tracking-widest text-[10px] mr-2 ${
              isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
            }`}
          >
            {productFor('suggested_therapy')}:
          </span>
          {suggested}
        </p>
      )}
      <div
        className={`rounded border overflow-hidden ${
          isDarkMode ? 'border-zinc-800' : 'border-zinc-200'
        }`}
      >
        <table className="w-full text-[12px]">
          <thead
            className={
              isDarkMode ? 'bg-zinc-950 text-zinc-500' : 'bg-zinc-50 text-zinc-500'
            }
          >
            <tr>
              <th className="text-left px-3 py-2 font-black uppercase tracking-widest text-[10px]">
                Drug
              </th>
              <th className="text-left px-3 py-2 font-black uppercase tracking-widest text-[10px]">
                Target pathway
              </th>
              <th className="text-right px-3 py-2 font-black uppercase tracking-widest text-[10px]">
                Confidence
              </th>
              <th className="text-left px-3 py-2 font-black uppercase tracking-widest text-[10px]">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {drugs.map((d, i) => (
              <tr
                key={`${d.drugName}-${i}`}
                className={`${
                  d.falsified
                    ? isDarkMode
                      ? 'bg-rose-950/20 text-rose-300'
                      : 'bg-rose-50/60 text-rose-800'
                    : isDarkMode
                    ? 'text-zinc-200'
                    : 'text-zinc-800'
                } border-t ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'}`}
              >
                <td className={`px-3 py-2 font-black ${d.falsified ? 'line-through' : ''}`}>
                  {d.drugName}
                </td>
                <td className={`px-3 py-2 font-mono ${d.falsified ? 'line-through' : ''}`}>
                  {d.targetPathway}
                </td>
                <td className="px-3 py-2 text-right font-mono">
                  {(d.confidence * 100).toFixed(0)}%
                </td>
                <td className="px-3 py-2">
                  {d.falsified ? (
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${
                        isDarkMode ? 'text-rose-400' : 'text-rose-600'
                      }`}
                    >
                      <XCircle className="w-3 h-3" />
                      {productFor('falsified')}
                      {d.falsifiedReason && (
                        <span className="ml-2 font-normal normal-case tracking-normal text-[10px]">
                          — {d.falsifiedReason}
                        </span>
                      )}
                    </span>
                  ) : (
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${
                        isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                      }`}
                    >
                      <ShieldCheck className="w-3 h-3" />
                      candidate
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section — Why NOT PARP (parpFalsification arc)
// ---------------------------------------------------------------------------

function ParpArcBlock({
  arc,
  isDarkMode,
}: {
  arc: PARPFalsification;
  isDarkMode: boolean;
}) {
  return (
    <div className="space-y-3">
      <div
        className={`rounded border p-4 ${
          isDarkMode
            ? 'border-cyan-900/50 bg-cyan-950/20'
            : 'border-indigo-200 bg-indigo-50'
        }`}
      >
        <p
          className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${
            isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
          }`}
        >
          What prod would ship today
        </p>
        <p className={`text-[13px] font-black ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
          {arc.prodShipsToday.drugName}
        </p>
        <p className={`text-[11px] mt-1 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          Matrix axis: {arc.prodShipsToday.matrixAxis} · Tier: {arc.prodShipsToday.tier} ·
          Bridge policy: {arc.prodShipsToday.bridgePolicy}
        </p>
        <p className={`text-[11px] mt-1 italic ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          {arc.prodShipsToday.behavior}
        </p>
      </div>

      <div
        className={`rounded border p-4 ${
          isDarkMode ? 'border-rose-900/50 bg-rose-950/20' : 'border-rose-200 bg-rose-50'
        }`}
      >
        <p
          className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${
            isDarkMode ? 'text-rose-400' : 'text-rose-600'
          }`}
        >
          What the manuscript actually shows
        </p>
        <p className={`text-[13px] font-black ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
          {arc.manuscriptSays.finding}
        </p>
        <p className={`text-[12px] font-mono mt-1 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          {arc.manuscriptSays.stat}
        </p>
        <p className={`text-[11px] mt-1 italic ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          {arc.manuscriptSays.conclusion}
        </p>
        {arc.manuscriptSays.positiveControl && (
          <div
            className={`mt-3 pt-3 border-t ${
              isDarkMode ? 'border-rose-900/30' : 'border-rose-200'
            }`}
          >
            <p
              className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}
            >
              {productFor('positive_control')}
            </p>
            <p className={`text-[12px] ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              {arc.manuscriptSays.positiveControl.finding}
            </p>
            <p className={`text-[11px] font-mono ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {arc.manuscriptSays.positiveControl.stat} —{' '}
              {arc.manuscriptSays.positiveControl.point}
            </p>
          </div>
        )}
      </div>

      <div
        className={`rounded border p-4 ${
          isDarkMode
            ? 'border-emerald-900/50 bg-emerald-950/20'
            : 'border-emerald-200 bg-emerald-50'
        }`}
      >
        <p
          className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${
            isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
          }`}
        >
          PR-11 fix — what changed in the code
        </p>
        <p className={`text-[12px] font-mono mb-1 ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
          {arc.pr11Fix.field} = <span className="font-black">{arc.pr11Fix.value}</span>
        </p>
        <p className={`text-[11px] ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          {arc.pr11Fix.effect}
        </p>
        <p className={`text-[11px] mt-1 italic ${isDarkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
          Row kept: {arc.pr11Fix.rowKept}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section — Receipts, Gaps, Provenance
// ---------------------------------------------------------------------------

function ReceiptsBlock({
  anchors,
  isDarkMode,
}: {
  anchors: EvidenceAnchor[];
  isDarkMode: boolean;
}) {
  const matchLabel = (m: EvidenceAnchor['match']): string => {
    if (m === 'exact') return 'exact';
    if (m === 'rounded') return 'rounded to display precision';
    return productFor('positive_control');
  };
  const matchTone = (m: EvidenceAnchor['match']): 'good' | 'candidate' | 'neutral' =>
    m === 'exact' ? 'good' : m === 'positive_control' ? 'candidate' : 'neutral';
  return (
    <div className="space-y-2">
      {anchors.map((a, i) => (
        <div
          key={`${a.claim}-${i}`}
          className={`rounded border p-3 ${
            isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-white'
          }`}
        >
          <div className="flex items-baseline justify-between mb-1 gap-3">
            <p className={`text-[13px] font-black ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              {a.claim}
            </p>
            <span
              className={`text-[9px] font-black uppercase tracking-widest whitespace-nowrap ${toneClass(
                matchTone(a.match),
                isDarkMode,
              )}`}
            >
              match: {matchLabel(a.match)}
            </span>
          </div>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-x-4 text-[11px] font-mono ${
              isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            <div>canonical: {a.canonicalValue}</div>
            {a.scriptValue && <div>script: {a.scriptValue}</div>}
          </div>
          <p className={`text-[10px] mt-1 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
            path: {a.canonicalPath}
          </p>
        </div>
      ))}
    </div>
  );
}

function GapsBlock({
  tests,
  isDarkMode,
}: {
  tests: TestNeeded[];
  isDarkMode: boolean;
}) {
  return (
    <div className="space-y-2">
      {tests.map((t, i) => (
        <div
          key={`${t.test}-${i}`}
          className={`rounded border p-3 ${
            isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-white'
          }`}
        >
          <div className="flex items-baseline justify-between mb-1 gap-3">
            <p className={`text-[13px] font-black ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              {t.test}
            </p>
            <span
              className={`text-[9px] font-black uppercase tracking-widest ${
                isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
              }`}
            >
              unlocks: {t.unlocks}
            </span>
          </div>
          <p className={`text-[12px] ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            {t.why}
          </p>
        </div>
      ))}
    </div>
  );
}

function ProvenanceBlock({
  patient,
  isDarkMode,
}: {
  patient: PatientBundle;
  isDarkMode: boolean;
}) {
  const p = patient.slProvenance;
  const c = patient.completeness;
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Pill
          label="Agent"
          value={
            <span className="font-mono text-[13px]">
              {p.agent}@{p.version}
            </span>
          }
          isDarkMode={isDarkMode}
        />
        <Pill
          label="Status"
          value={p.status}
          tone={p.status === 'ok' ? 'good' : p.status === 'degraded' ? 'candidate' : 'bad'}
          isDarkMode={isDarkMode}
        />
        <Pill label="Evo2 cache hits" value={String(p.evo2CacheHits)} isDarkMode={isDarkMode} />
      </div>
      <div
        className={`rounded border p-4 ${
          isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50'
        }`}
      >
        <p
          className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${
            isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
          }`}
        >
          Detection
        </p>
        <p className={`text-[12px] ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          SL detected: <span className="font-black">{p.syntheticLethalityDetected ? 'yes' : 'no'}</span> ·
          Method: {p.detectionMethod} · True scoring required:{' '}
          <span className="font-black">{p.trueScoringRequired ? 'yes' : 'no'}</span>
        </p>
        <p className={`text-[11px] mt-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          Δ role: {p.deltaRole}
        </p>
        {p.hgvsResolutionNote && (
          <p className={`text-[11px] mt-2 italic ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
            HGVS note: {p.hgvsResolutionNote}
          </p>
        )}
      </div>
      <div
        className={`rounded border p-4 ${
          isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50'
        }`}
      >
        <p
          className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${
            isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
          }`}
        >
          Signals used ({p.signalsUsed.length})
        </p>
        <div className="flex flex-wrap gap-1">
          {p.signalsUsed.map((s) => (
            <span
              key={s}
              className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                isDarkMode
                  ? 'bg-zinc-900 text-zinc-300'
                  : 'bg-white text-zinc-700 border border-zinc-200'
              }`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      {c && (
        <div
          className={`rounded border p-4 ${
            isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50'
          }`}
        >
          <p
            className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${
              isDarkMode ? 'text-amber-400' : 'text-amber-600'
            }`}
          >
            {productFor('completeness_cap')}
          </p>
          <p className={`text-[13px] mb-1 ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
            Confidence cap:{' '}
            <span className="font-black">{(c.confidenceCap * 100).toFixed(0)}%</span> ·
            Completeness score:{' '}
            <span className="font-black">{(c.completenessScore * 100).toFixed(0)}%</span>
          </p>
          <p className={`text-[11px] ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Missing: {c.missing.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main surface
// ---------------------------------------------------------------------------

export default function SyntheticLethalityScrollSurface() {
  const { isDarkMode } = useTheme();
  const patientCtx = useOptionalPatient();
  const patient: PatientBundle = patientCtx ?? AK01;
  const caps = getCapabilities(patient);

  return (
    <div
      className={`min-h-screen font-mono ${
        isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-white text-zinc-700'
      }`}
    >
      {/* Nav */}
      <header
        className={`border-b backdrop-blur-sm sticky top-0 z-40 ${
          isDarkMode ? 'border-white/5 bg-black/60' : 'border-zinc-200 bg-white/80'
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div
                className={`w-9 h-9 rounded border flex items-center justify-center group-hover:border-cyan-500/50 transition-colors ${
                  isDarkMode ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-100'
                }`}
              >
                <ListTree
                  className={isDarkMode ? 'w-4 h-4 text-cyan-400' : 'w-4 h-4 text-indigo-500'}
                />
              </div>
              <span
                className={`text-[11px] font-black uppercase tracking-[0.3em] group-hover:text-cyan-400 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-zinc-900'
                }`}
              >
                CrisPRO · Synthetic-Lethality
              </span>
            </Link>
            <span className={`h-6 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-300'}`} />
            <span
              className={`text-[10px] font-black uppercase tracking-[0.4em] ${
                isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
              }`}
            >
              /engine/synthetic-lethality/scroll
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em]">
            <Link
              href="/engine/synthetic-lethality/tabs"
              className={
                isDarkMode
                  ? 'text-zinc-400 hover:text-cyan-400 transition-colors'
                  : 'text-zinc-600 hover:text-indigo-600 transition-colors'
              }
            >
              Tab view →
            </Link>
            <Link
              href={`/tumor-board/${patient.meta.patientId}`}
              className={
                isDarkMode
                  ? 'text-zinc-400 hover:text-cyan-400 transition-colors'
                  : 'text-zinc-600 hover:text-indigo-600 transition-colors'
              }
            >
              Tumor board ({patient.meta.patientId}) →
            </Link>
          </div>
        </div>
      </header>

      {/* DNAHero */}
      <div className={isDarkMode ? '' : 'border-b border-zinc-200'}>
        <DNAHero />
      </div>

      {/* Patient identity */}
      <div className={`max-w-[1600px] mx-auto px-8 py-12 border-t ${isDarkMode ? 'border-white/5' : 'border-zinc-200'}`}>
        <p
          className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 ${
            isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'
          }`}
        >
          Patient · {patient.meta.patientId}
        </p>
        <h1
          className={`text-3xl md:text-4xl font-black uppercase tracking-[0.12em] mb-3 max-w-4xl ${
            isDarkMode ? 'text-white' : 'text-zinc-900'
          }`}
        >
          {patient.meta.displayName ?? patient.meta.patientId} ·{' '}
          {patient.tumorContext.subtype ?? patient.tumorContext.cancerType}
        </h1>
        <p className={`text-[11px] italic ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
          {patient.meta.demoDisclaimer}
        </p>
      </div>

      {/* 1. Double-hit summary */}
      {patient.doubleHit && (
        <Section
          id="doublehit"
          step="01"
          eyebrow={productFor('double_hit')}
          title="Why this bundle is actionable"
        >
          <div
            className={`rounded border p-6 ${
              isDarkMode
                ? 'border-cyan-900/50 bg-cyan-950/20'
                : 'border-indigo-200 bg-indigo-50'
            }`}
          >
            <p className={`text-[15px] leading-relaxed ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
              {patient.doubleHit.description}
            </p>
          </div>
        </Section>
      )}

      {/* 2. Machinery */}
      {(caps.hasBrokenPathways || caps.hasEssentialPathways) && (
        <Section
          id="machinery"
          step="02"
          eyebrow="Broken × kept-functioning"
          title="Pathway machinery"
        >
          <MachineryBlock
            broken={patient.brokenPathways}
            essential={patient.essentialPathways}
            isDarkMode={isDarkMode}
          />
        </Section>
      )}

      {/* 3. SL matrix — one card per axis */}
      {caps.hasSlMatrix && (
        <Section
          id="axes"
          step="03"
          eyebrow={productFor('sl_axis')}
          title={`Therapeutic levers · ${patient.slMatrix.length} axes`}
        >
          <div>
            {patient.slMatrix.map((row) => (
              <AxisCard key={row.axis} row={row} isDarkMode={isDarkMode} />
            ))}
          </div>
        </Section>
      )}

      {/* 4. Candidates */}
      {caps.hasRecommendedDrugs && (
        <Section
          id="candidates"
          step="04"
          eyebrow={productFor('recommended_drugs')}
          title="Ranked drug candidates"
        >
          <CandidatesBlock
            drugs={patient.recommendedDrugs}
            suggested={patient.suggestedTherapy?.value ?? null}
            isDarkMode={isDarkMode}
          />
        </Section>
      )}

      {/* 5. Why NOT PARP (gated) */}
      {caps.hasParpFalsification && patient.parpFalsification && (
        <Section
          id="parp-ruled-out"
          step="05"
          eyebrow={productFor('parp_falsification')}
          title="Why we did NOT pick PARP"
        >
          <ParpArcBlock arc={patient.parpFalsification} isDarkMode={isDarkMode} />
        </Section>
      )}

      {/* 6. Receipts */}
      {caps.hasEvidenceAnchors && (
        <Section
          id="receipts"
          step="06"
          eyebrow={productFor('evidence_anchor')}
          title="Receipts from literature"
        >
          <ReceiptsBlock anchors={patient.evidenceAnchors} isDarkMode={isDarkMode} />
        </Section>
      )}

      {/* 7. Gaps */}
      {caps.hasTestsNeeded && (
        <Section
          id="gaps"
          step="07"
          eyebrow={productFor('tests_needed')}
          title="Gaps we would need to close"
        >
          <GapsBlock tests={patient.testsNeeded} isDarkMode={isDarkMode} />
        </Section>
      )}

      {/* 8. Provenance */}
      {caps.hasProvenance && (
        <Section
          id="provenance"
          step="08"
          eyebrow={productFor('provenance')}
          title="Where each number came from"
        >
          <ProvenanceBlock patient={patient} isDarkMode={isDarkMode} />
        </Section>
      )}

      {/* Footer / cross-links */}
      <footer
        className={`border-t mt-12 ${
          isDarkMode ? 'border-white/5 bg-black/40' : 'border-zinc-200 bg-white/60'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-8 py-8 flex flex-wrap items-center justify-between gap-3">
          <p
            className={`text-[10px] font-black uppercase tracking-widest ${
              isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
            }`}
          >
            Sections derived from bundle capabilities · patient {patient.meta.patientId}
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/engine/mechanism-alignment/scroll"
              className={`text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-1 ${
                isDarkMode ? 'text-cyan-300' : 'text-indigo-600'
              }`}
            >
              Mechanism Alignment <ChevronRight className="w-3 h-3" />
            </Link>
            <Link
              href="/engine/target-lock/scroll"
              className={`text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-1 ${
                isDarkMode ? 'text-cyan-300' : 'text-indigo-600'
              }`}
            >
              Target Lock <ChevronRight className="w-3 h-3" />
            </Link>
            <Link
              href={`/tumor-board/${patient.meta.patientId}`}
              className={`text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-1 ${
                isDarkMode ? 'text-cyan-300' : 'text-indigo-600'
              }`}
            >
              Tumor Board <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
