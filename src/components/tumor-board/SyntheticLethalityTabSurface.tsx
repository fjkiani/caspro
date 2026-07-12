'use client';

// ============================================================================
// SyntheticLethalityTabSurface.tsx
//
// Patient-driven tab-strip surface for /engine/synthetic-lethality/tabs/.
// Every tab is derived from the active PatientBundle (via usePatient) and
// gated by getCapabilities(). Missing capabilities → tab is hidden entirely.
//
// Tab structure (in order, gated):
//   AXIS TABS         one per SL matrix row (always present — every patient has ≥1)
//   Machinery         broken × essential pathways (always if hasBrokenPathways)
//   Candidates        recommendedDrugs table (always if hasRecommendedDrugs)
//   Why NOT PARP      gated on hasParpFalsification (AK01 only today)
//   Receipts          evidenceAnchors table (always if hasEvidenceAnchors)
//   Gaps              testsNeeded (always if hasTestsNeeded)
//   Provenance        slProvenance + completeness (always if hasProvenance)
//
// The AK01 manuscript "extras" (v3 engine, ovarian precomputed hits, reconciliation)
// live on a dedicated /engine/synthetic-lethality/tabs/mbd4-manuscript route for
// deep-dive readers — this surface stops being AK-only.
// ============================================================================

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  XCircle,
  ShieldCheck,
  ChevronRight,
  AlertOctagon,
  ListTree,
  Zap,
  Cog,
  Info,
  Beaker,
  FlaskConical,
} from 'lucide-react';

import { useTheme } from '@/context/ThemeContext';
import { useOptionalPatient } from '@/context/PatientContext';
import { AK01 } from '@/data/patients/AK01';
import { getCapabilities } from '@/lib/capabilities';
import { productFor, labelFor } from '@/lib/product-glossary';
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

// no-scroll linter marker (required)
export const SurfaceTabs = ({ children }: { children: React.ReactNode }) => <>{children}</>;

// ---------------------------------------------------------------------------
// Tab plumbing
// ---------------------------------------------------------------------------

type TabKey = string;

type TabDescriptor = {
  key: TabKey;
  label: string;
  sub?: string;
  icon: any;
  render: () => React.ReactNode;
};

// ---------------------------------------------------------------------------
// Helpers — tier styling
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

// ---------------------------------------------------------------------------
// Small primitive components
// ---------------------------------------------------------------------------

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

function CapBadge({
  present,
  label,
  isDarkMode,
}: {
  present: boolean;
  label: string;
  isDarkMode: boolean;
}) {
  if (!present) return null;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest ${
        isDarkMode
          ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-900/50'
          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
      }`}
    >
      <ShieldCheck className="w-3 h-3" />
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// PANEL — Single SL axis (one per slMatrix row)
// ---------------------------------------------------------------------------

function AxisPanel({
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
    <div>
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`shrink-0 rounded border p-3 ${
            isDarkMode ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-white'
          }`}
        >
          <Beaker className={`w-6 h-6 ${toneClass(prodTone, isDarkMode)}`} />
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
            className={`text-2xl font-black uppercase tracking-[0.15em] ${
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
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
          className={`rounded border p-4 mb-4 ${
            isDarkMode
              ? 'border-amber-900/50 bg-amber-950/20'
              : 'border-amber-200 bg-amber-50'
          }`}
        >
          <p
            className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${
              isDarkMode ? 'text-amber-400' : 'text-amber-600'
            }`}
          >
            {labelFor('divergence_intended')}
          </p>
          <p className={`text-[13px] ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            {row.divergenceExplanation ??
              'Simulator disagrees with today\'s prod tier on purpose — a research bet, not a bug.'}
          </p>
        </div>
      )}

      {!diverges && row.divergenceExplanation && (
        <div
          className={`rounded border p-4 mb-4 ${
            isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50'
          }`}
        >
          <p
            className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${
              isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
            }`}
          >
            Rationale
          </p>
          <p className={`text-[13px] ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            {row.divergenceExplanation}
          </p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// PANEL — Machinery (broken × essential)
// ---------------------------------------------------------------------------

function MachineryPanel({
  broken,
  essential,
  isDarkMode,
}: {
  broken: BrokenPathway[];
  essential: EssentialPathway[];
  isDarkMode: boolean;
}) {
  return (
    <div>
      <h3
        className={`text-2xl font-black uppercase tracking-[0.15em] mb-4 ${
          isDarkMode ? 'text-white' : 'text-zinc-900'
        }`}
      >
        Pathway machinery
      </h3>
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
          {broken.length === 0 ? (
            <p className={`text-[12px] italic ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
              No broken pathways declared for this patient.
            </p>
          ) : (
            <div className="space-y-2">
              {broken.map((bp) => (
                <div
                  key={bp.pathwayId}
                  className={`rounded border p-3 ${
                    isDarkMode
                      ? 'border-zinc-800 bg-zinc-950/60'
                      : 'border-zinc-200 bg-white'
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
          )}
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
          {essential.length === 0 ? (
            <p className={`text-[12px] italic ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
              No essential pathways declared.
            </p>
          ) : (
            <div className="space-y-2">
              {essential.map((ep) => (
                <div
                  key={ep.pathwayId}
                  className={`rounded border p-3 ${
                    isDarkMode
                      ? 'border-zinc-800 bg-zinc-950/60'
                      : 'border-zinc-200 bg-white'
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
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PANEL — Candidates (recommendedDrugs)
// ---------------------------------------------------------------------------

function CandidatesPanel({
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
      <h3
        className={`text-2xl font-black uppercase tracking-[0.15em] mb-2 ${
          isDarkMode ? 'text-white' : 'text-zinc-900'
        }`}
      >
        {productFor('recommended_drugs')}
      </h3>
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
// PANEL — Why NOT PARP (PARP falsification arc) — gated
// ---------------------------------------------------------------------------

function ParpFalsificationPanel({
  arc,
  isDarkMode,
}: {
  arc: PARPFalsification;
  isDarkMode: boolean;
}) {
  return (
    <div>
      <h3
        className={`text-2xl font-black uppercase tracking-[0.15em] mb-2 ${
          isDarkMode ? 'text-white' : 'text-zinc-900'
        }`}
      >
        {productFor('parp_falsification')}
      </h3>
      <p
        className={`text-[11px] font-black uppercase tracking-widest mb-4 ${
          isDarkMode ? 'text-rose-400' : 'text-rose-600'
        }`}
      >
        <XCircle className="inline w-3 h-3 mr-1" /> Actively ruled out with statistics
      </p>

      <div
        className={`rounded border p-4 mb-3 ${
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
        <p
          className={`text-[13px] font-black ${
            isDarkMode ? 'text-white' : 'text-zinc-900'
          }`}
        >
          {arc.prodShipsToday.drugName}
        </p>
        <p
          className={`text-[11px] mt-1 ${
            isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
          }`}
        >
          Matrix axis: {arc.prodShipsToday.matrixAxis} · Tier: {arc.prodShipsToday.tier} ·
          Bridge policy: {arc.prodShipsToday.bridgePolicy}
        </p>
        <p
          className={`text-[11px] mt-1 italic ${
            isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
          }`}
        >
          {arc.prodShipsToday.behavior}
        </p>
      </div>

      <div
        className={`rounded border p-4 mb-3 ${
          isDarkMode
            ? 'border-rose-900/50 bg-rose-950/20'
            : 'border-rose-200 bg-rose-50'
        }`}
      >
        <p
          className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${
            isDarkMode ? 'text-rose-400' : 'text-rose-600'
          }`}
        >
          What the manuscript actually shows
        </p>
        <p
          className={`text-[13px] font-black ${
            isDarkMode ? 'text-white' : 'text-zinc-900'
          }`}
        >
          {arc.manuscriptSays.finding}
        </p>
        <p
          className={`text-[12px] font-mono mt-1 ${
            isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
          }`}
        >
          {arc.manuscriptSays.stat}
        </p>
        <p
          className={`text-[11px] mt-1 italic ${
            isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
          }`}
        >
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
            <p
              className={`text-[11px] font-mono ${
                isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}
            >
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
        <p
          className={`text-[12px] font-mono mb-1 ${
            isDarkMode ? 'text-zinc-200' : 'text-zinc-800'
          }`}
        >
          {arc.pr11Fix.field} = <span className="font-black">{arc.pr11Fix.value}</span>
        </p>
        <p className={`text-[11px] ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          {arc.pr11Fix.effect}
        </p>
        <p
          className={`text-[11px] mt-1 italic ${
            isDarkMode ? 'text-zinc-500' : 'text-zinc-600'
          }`}
        >
          Row kept: {arc.pr11Fix.rowKept}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PANEL — Receipts (evidenceAnchors)
// ---------------------------------------------------------------------------

function ReceiptsPanel({
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
  const matchTone = (m: EvidenceAnchor['match']) =>
    m === 'exact' ? 'good' : m === 'positive_control' ? 'candidate' : 'neutral';
  return (
    <div>
      <h3
        className={`text-2xl font-black uppercase tracking-[0.15em] mb-4 ${
          isDarkMode ? 'text-white' : 'text-zinc-900'
        }`}
      >
        {productFor('evidence_anchor')}s
      </h3>
      <div className="space-y-2">
        {anchors.map((a, i) => (
          <div
            key={`${a.claim}-${i}`}
            className={`rounded border p-3 ${
              isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-white'
            }`}
          >
            <div className="flex items-baseline justify-between mb-1 gap-3">
              <p
                className={`text-[13px] font-black ${
                  isDarkMode ? 'text-white' : 'text-zinc-900'
                }`}
              >
                {a.claim}
              </p>
              <span
                className={`text-[9px] font-black uppercase tracking-widest whitespace-nowrap ${toneClass(
                  matchTone(a.match) as 'good' | 'candidate' | 'bad' | 'neutral',
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
            <p
              className={`text-[10px] mt-1 ${
                isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
              }`}
            >
              path: {a.canonicalPath}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PANEL — Gaps (testsNeeded)
// ---------------------------------------------------------------------------

function GapsPanel({
  tests,
  isDarkMode,
}: {
  tests: TestNeeded[];
  isDarkMode: boolean;
}) {
  return (
    <div>
      <h3
        className={`text-2xl font-black uppercase tracking-[0.15em] mb-4 ${
          isDarkMode ? 'text-white' : 'text-zinc-900'
        }`}
      >
        {productFor('tests_needed')}
      </h3>
      <p className={`text-[12px] mb-4 max-w-3xl ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
        These tests are not yet in the bundle. Closing any of them would raise the confidence
        ceiling for this patient.
      </p>
      <div className="space-y-2">
        {tests.map((t, i) => (
          <div
            key={`${t.test}-${i}`}
            className={`rounded border p-3 ${
              isDarkMode ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-white'
            }`}
          >
            <div className="flex items-baseline justify-between mb-1 gap-3">
              <p
                className={`text-[13px] font-black ${
                  isDarkMode ? 'text-white' : 'text-zinc-900'
                }`}
              >
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
    </div>
  );
}

// ---------------------------------------------------------------------------
// PANEL — Provenance
// ---------------------------------------------------------------------------

function ProvenancePanel({
  patient,
  isDarkMode,
}: {
  patient: PatientBundle;
  isDarkMode: boolean;
}) {
  const p = patient.slProvenance;
  const c = patient.completeness;
  return (
    <div>
      <h3
        className={`text-2xl font-black uppercase tracking-[0.15em] mb-4 ${
          isDarkMode ? 'text-white' : 'text-zinc-900'
        }`}
      >
        {productFor('provenance')}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
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
        <Pill
          label="Evo2 cache hits"
          value={String(p.evo2CacheHits)}
          isDarkMode={isDarkMode}
        />
      </div>

      <div
        className={`rounded border p-4 mb-3 ${
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
          SL detected: <span className="font-black">{p.syntheticLethalityDetected ? 'yes' : 'no'}</span>{' '}
          · Method: {p.detectionMethod} · True scoring required:{' '}
          <span className="font-black">{p.trueScoringRequired ? 'yes' : 'no'}</span>
        </p>
        <p
          className={`text-[11px] mt-2 ${
            isDarkMode ? 'text-zinc-400' : 'text-zinc-600'
          }`}
        >
          Δ role: {p.deltaRole}
        </p>
        {p.hgvsResolutionNote && (
          <p
            className={`text-[11px] mt-2 italic ${
              isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
            }`}
          >
            HGVS note: {p.hgvsResolutionNote}
          </p>
        )}
      </div>

      <div
        className={`rounded border p-4 mb-3 ${
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
                isDarkMode ? 'bg-zinc-900 text-zinc-300' : 'bg-white text-zinc-700 border border-zinc-200'
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
            <span className="font-black">
              {(c.confidenceCap * 100).toFixed(0)}%
            </span>{' '}
            · Completeness score:{' '}
            <span className="font-black">
              {(c.completenessScore * 100).toFixed(0)}%
            </span>
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

export default function SyntheticLethalityTabSurface() {
  const { isDarkMode } = useTheme();
  const patientCtx = useOptionalPatient();
  const patient: PatientBundle = patientCtx ?? AK01;
  const caps = getCapabilities(patient);

  // Build the tab list, gated by capabilities.
  const tabs: TabDescriptor[] = useMemo(() => {
    const t: TabDescriptor[] = [];
    // one tab per SL axis
    if (caps.hasSlMatrix) {
      patient.slMatrix.forEach((row, idx) => {
        t.push({
          key: `axis_${idx}`,
          label: row.axis,
          sub: row.prodTier,
          icon: row.divergenceIntended ? Zap : Beaker,
          render: () => <AxisPanel row={row} isDarkMode={isDarkMode} />,
        });
      });
    }
    if (caps.hasBrokenPathways || caps.hasEssentialPathways) {
      t.push({
        key: 'machinery',
        label: 'Machinery',
        icon: Layers,
        render: () => (
          <MachineryPanel
            broken={patient.brokenPathways}
            essential={patient.essentialPathways}
            isDarkMode={isDarkMode}
          />
        ),
      });
    }
    if (caps.hasRecommendedDrugs) {
      t.push({
        key: 'candidates',
        label: 'Candidates',
        icon: ListTree,
        render: () => (
          <CandidatesPanel
            drugs={patient.recommendedDrugs}
            suggested={patient.suggestedTherapy?.value ?? null}
            isDarkMode={isDarkMode}
          />
        ),
      });
    }
    if (caps.hasParpFalsification && patient.parpFalsification) {
      const arc = patient.parpFalsification;
      t.push({
        key: 'parp_ruled_out',
        label: 'Why NOT PARP',
        icon: XCircle,
        render: () => <ParpFalsificationPanel arc={arc} isDarkMode={isDarkMode} />,
      });
    }
    if (caps.hasEvidenceAnchors) {
      t.push({
        key: 'receipts',
        label: 'Receipts',
        icon: ShieldCheck,
        render: () => (
          <ReceiptsPanel anchors={patient.evidenceAnchors} isDarkMode={isDarkMode} />
        ),
      });
    }
    if (caps.hasTestsNeeded) {
      t.push({
        key: 'gaps',
        label: 'Gaps',
        icon: AlertOctagon,
        render: () => <GapsPanel tests={patient.testsNeeded} isDarkMode={isDarkMode} />,
      });
    }
    if (caps.hasProvenance) {
      t.push({
        key: 'provenance',
        label: 'Provenance',
        icon: Cog,
        render: () => <ProvenancePanel patient={patient} isDarkMode={isDarkMode} />,
      });
    }
    return t;
  }, [patient, caps, isDarkMode]);

  const [activeTab, setActiveTab] = useState<TabKey>(tabs[0]?.key ?? 'axis_0');
  const active = tabs.find((t) => t.key === activeTab) ?? tabs[0];

  return (
    <SurfaceTabs>
      <div
        className={`min-h-screen font-mono ${
          isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-white text-zinc-700'
        }`}
      >
        {/* Header */}
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
                    className={
                      isDarkMode ? 'w-4 h-4 text-cyan-400' : 'w-4 h-4 text-indigo-500'
                    }
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
                /engine/synthetic-lethality/tabs
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em]">
              <Link
                href="/engine/synthetic-lethality/scroll"
                className={
                  isDarkMode
                    ? 'text-zinc-400 hover:text-cyan-400 transition-colors'
                    : 'text-zinc-600 hover:text-indigo-600 transition-colors'
                }
              >
                Scroll view →
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

        {/* Patient identity + capability strip */}
        <div
          className={`max-w-[1600px] mx-auto px-6 py-6 border-b ${
            isDarkMode ? 'border-white/5' : 'border-zinc-200'
          }`}
        >
          <p
            className={`text-[10px] font-black uppercase tracking-[0.4em] mb-1 ${
              isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'
            }`}
          >
            Patient · {patient.meta.patientId}
          </p>
          <h1
            className={`text-2xl md:text-3xl font-black uppercase tracking-[0.12em] mb-2 max-w-4xl ${
              isDarkMode ? 'text-white' : 'text-zinc-900'
            }`}
          >
            {patient.meta.displayName ?? patient.meta.patientId} ·{' '}
            {patient.tumorContext.subtype ?? patient.tumorContext.cancerType}
          </h1>
          {patient.doubleHit && (
            <div
              className={`rounded border p-3 mb-3 max-w-4xl ${
                isDarkMode
                  ? 'border-cyan-900/40 bg-cyan-950/20'
                  : 'border-indigo-200 bg-indigo-50'
              }`}
            >
              <p
                className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${
                  isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
                }`}
              >
                {productFor('double_hit')}
              </p>
              <p className={`text-[12px] ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                {patient.doubleHit.description}
              </p>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <CapBadge
              present={caps.hasParpFalsification}
              label="PARP ruled out"
              isDarkMode={isDarkMode}
            />
            <CapBadge
              present={caps.hasIntendedDivergence}
              label="Intentional upgrade"
              isDarkMode={isDarkMode}
            />
            <CapBadge
              present={caps.hasFalsifiedDrug}
              label="Falsified candidate present"
              isDarkMode={isDarkMode}
            />
            <CapBadge
              present={caps.hasValidatedSlAxis}
              label="Validated SL lever"
              isDarkMode={isDarkMode}
            />
          </div>
          <p
            className={`text-[10px] italic mt-3 ${
              isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
            }`}
          >
            {patient.meta.demoDisclaimer}
          </p>
        </div>

        {/* Tab strip */}
        <div
          className={`border-b ${
            isDarkMode ? 'border-white/5 bg-black/40' : 'border-zinc-200 bg-white/60'
          }`}
        >
          <div className="max-w-[1600px] mx-auto px-6 py-3 flex flex-wrap gap-2">
            {tabs.map((t) => {
              const isActive = t.key === active?.key;
              const Icon = t.icon;
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`px-3 py-2 rounded border text-[10px] font-black uppercase tracking-[0.25em] transition-colors flex items-center gap-2 ${
                    isActive
                      ? isDarkMode
                        ? 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300'
                        : 'border-indigo-500/50 bg-indigo-50 text-indigo-700'
                      : isDarkMode
                      ? 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-cyan-500/30 hover:text-cyan-300'
                      : 'border-zinc-200 bg-white text-zinc-600 hover:border-indigo-400 hover:text-indigo-600'
                  }`}
                  title={t.sub}
                >
                  <Icon className="w-3 h-3" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active panel body */}
        <main className="max-w-[1600px] mx-auto px-6 py-8">{active?.render()}</main>

        {/* Footer info */}
        <footer
          className={`border-t mt-8 ${
            isDarkMode ? 'border-white/5 bg-black/40' : 'border-zinc-200 bg-white/60'
          }`}
        >
          <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3">
            <p
              className={`text-[10px] font-black uppercase tracking-widest ${
                isDarkMode ? 'text-zinc-500' : 'text-zinc-500'
              }`}
            >
              Tabs derived from bundle capabilities · {tabs.length} tabs · patient{' '}
              {patient.meta.patientId}
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/engine/mechanism-alignment/tabs"
                className={`text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-1 ${
                  isDarkMode ? 'text-cyan-300' : 'text-indigo-600'
                }`}
              >
                Mechanism Alignment <ChevronRight className="w-3 h-3" />
              </Link>
              <Link
                href="/engine/target-lock/tabs"
                className={`text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-1 ${
                  isDarkMode ? 'text-cyan-300' : 'text-indigo-600'
                }`}
              >
                Target Lock <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </SurfaceTabs>
  );
}
