'use client';

// ==============================================================================
// /engine/mechanism-alignment/tabs — L2 tab strip · PATIENT-DRIVEN.
//
// Every tab is derived from what the patient's bundle actually carries.
//   • One tab per SL matrix row where divergenceIntended === true (real,
//     product-vs-simulator upgrade the manuscript found).
//   • "Why we did NOT pick PARP" tab (gated on caps.hasParpFalsification).
//   • Ranked drugs tab (always — every patient has recommendedDrugs).
//   • Governance tab — PATH A ranker + composite gate + DL-07 quarantine.
//     This one is engine-wide, not patient-scoped.
//
// If the patient has NO intentional divergences, the drug ladder is still
// shown and a single "prod and simulator agree" info card is rendered instead
// of empty case tabs.
// ==============================================================================

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Layers, ShieldCheck, ArrowRight, XCircle, Check } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useOptionalPatient } from '@/context/PatientContext';
import { AK01 } from '@/data/patients/AK01';
import type { PatientBundle } from '@/data/tumor-board/patient-bundle-types';
import { getCapabilities, type SurfaceCapabilities } from '@/lib/capabilities';
import { labelFor, productFor } from '@/lib/product-glossary';
import {
  PATH_A_FORMULA,
  PATH_A_APPROVAL,
  COMPOSITE_EXPRESSION,
  MECHANISM_FIT_ALPHA,
  MECHANISM_FIT_BETA,
  MIN_ELIGIBILITY_THRESHOLD,
  MIN_MECHANISM_FIT_THRESHOLD,
} from '@/data/mechanism-alignment-data';

// Marker required by caspro-lint/no-scroll linter.
export const SurfaceTabs = ({ children }: { children: React.ReactNode }) => <>{children}</>;

type TabKey = string;

// ------------------------------------------------------------------------------
// Root
// ------------------------------------------------------------------------------

export default function MechanismAlignmentTabSurface() {
  const { isDarkMode } = useTheme();
  const patientCtx = useOptionalPatient();
  const patient: PatientBundle = patientCtx ?? AK01;
  const caps = getCapabilities(patient);

  const accent = isDarkMode ? 'text-fuchsia-300' : 'text-fuchsia-600';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';
  const chip = isDarkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-200' : 'bg-slate-50 border-slate-200 text-slate-800';

  // ---- Divergence rows (patient-derived) ----
  const divergenceRows = useMemo(
    () => (patient.slMatrix ?? []).filter((r) => r.divergenceIntended === true),
    [patient],
  );

  // ---- Dynamic tab set ----
  const tabs = useMemo(() => {
    const t: { key: TabKey; label: string; sub: string }[] = [];

    // Divergence axes (one tab per intentional prod→sim upgrade).
    divergenceRows.forEach((row, i) => {
      t.push({
        key: `divergence-${row.axis}`,
        label: `Δ-${String(i + 1).padStart(2, '0')}`,
        sub: prettyAxis(row.axis),
      });
    });

    // If no divergences, add an alignment info card as first tab.
    if (divergenceRows.length === 0) {
      t.push({
        key: 'alignment',
        label: 'ALIGNED',
        sub: 'prod ↔ simulator agree',
      });
    }

    // Drug ladder — every patient.
    if (caps.hasRecommendedDrugs) {
      t.push({
        key: 'drugs',
        label: 'DRUGS',
        sub: `Ranked candidates · ${patient.recommendedDrugs.length}`,
      });
    }

    // PARP arc — gated.
    if (caps.hasParpFalsification) {
      t.push({
        key: 'parp-falsification',
        label: 'PARP?',
        sub: 'Why we did NOT pick PARP',
      });
    }

    // Governance — always present.
    t.push({ key: 'governance', label: 'GOV', sub: 'PATH A · DL-07' });

    return t;
  }, [divergenceRows, caps.hasRecommendedDrugs, caps.hasParpFalsification, patient.recommendedDrugs]);

  const [active, setActive] = useState<TabKey>(tabs[0]?.key ?? 'governance');

  // Guard against stale active tab if patient changes and old tab disappears.
  const safeActive = tabs.some((t) => t.key === active) ? active : (tabs[0]?.key ?? 'governance');

  const activeDivergence = divergenceRows.find((row) => `divergence-${row.axis}` === safeActive);

  const gatesPresent: string[] = [];
  if (caps.hasIntendedDivergence) gatesPresent.push('Intentional upgrade present');
  if (caps.hasFalsifiedDrug) gatesPresent.push('Falsified candidate present');
  if (caps.hasParpFalsification) gatesPresent.push('PARP ruled out');
  if (caps.hasValidatedSlAxis) gatesPresent.push('Validated therapeutic lever');

  return (
    <SurfaceTabs>
      <div
        className={`relative h-[calc(100dvh-3.5rem)] overflow-hidden font-mono flex flex-col ${
          isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-white text-slate-900'
        }`}
      >
        <div
          className={`absolute inset-0 pointer-events-none ${
            isDarkMode
              ? 'bg-[linear-gradient(to_right,#F0ABFC08_1px,transparent_1px),linear-gradient(to_bottom,#F0ABFC08_1px,transparent_1px)]'
              : 'bg-[linear-gradient(to_right,#a21caf08_1px,transparent_1px),linear-gradient(to_bottom,#a21caf08_1px,transparent_1px)]'
          } bg-[size:48px_48px]`}
        />

        {/* Header */}
        <header className="relative z-10 shrink-0 px-4 sm:px-6 pt-3 sm:pt-4">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded border flex items-center justify-center ${panel}`}>
              <Layers className={`w-4 h-4 ${accent}`} />
            </div>
            <div className="min-w-0">
              <p className={`text-[9px] font-black uppercase tracking-[0.4em] ${accent}`}>
                L2 · tabs · {productFor('mechanism_fit')}
              </p>
              <h1 className={`text-sm sm:text-base font-black uppercase tracking-tight truncate ${textMain}`}>
                Mechanism Alignment · {patient.meta.patientId}
              </h1>
              <p className={`text-[10px] mt-0.5 ${textMuted}`}>
                {patient.tumorContext?.subtype ?? patient.tumorContext?.cancerType ?? patient.meta.displayName ?? '—'}
              </p>
            </div>
            <div className={`ml-auto hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase ${textMuted}`}>
              <ShieldCheck className="w-3 h-3" />
              <span>PATH A signed</span>
            </div>
          </div>

          {/* Capability chips */}
          {gatesPresent.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {gatesPresent.map((g) => (
                <span
                  key={g}
                  className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${chip}`}
                >
                  <Check className="w-2.5 h-2.5" />
                  {g}
                </span>
              ))}
            </div>
          )}

          {/* Always-visible formula bar */}
          <div className={`mt-2 rounded border px-2 py-1.5 text-center ${panel}`}>
            <code className={`text-[11px] font-black ${textMain}`}>{PATH_A_FORMULA}</code>
            <span className={`ml-2 text-[9px] uppercase font-bold ${textMuted}`}>
              · {productFor('mechanism_fit')} ranker
            </span>
          </div>

          {/* Tab strip */}
          <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
            {tabs.map((t) => {
              const isActive = t.key === safeActive;
              const activeStyle = isDarkMode
                ? 'border-fuchsia-500/60 bg-fuchsia-500/10 text-fuchsia-100'
                : 'border-fuchsia-400 bg-fuchsia-50 text-fuchsia-900';
              const idleStyle = isDarkMode
                ? 'border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900';
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActive(t.key)}
                  className={`rounded border px-2.5 py-1.5 transition-colors ${isActive ? activeStyle : idleStyle}`}
                >
                  <p className="text-[10px] font-black uppercase tracking-wider">{t.label}</p>
                  <p className={`text-[9px] mt-0.5 ${isActive ? '' : textMuted}`}>{t.sub}</p>
                </button>
              );
            })}
          </div>
        </header>

        {/* Body */}
        <section className="relative z-10 flex-1 min-h-0 px-4 sm:px-6 pb-4 pt-3 overflow-hidden">
          {safeActive === 'governance' ? (
            <GovernanceTab isDarkMode={isDarkMode} />
          ) : safeActive === 'parp-falsification' && patient.parpFalsification ? (
            <ParpFalsificationPanel patient={patient} isDarkMode={isDarkMode} />
          ) : safeActive === 'drugs' ? (
            <DrugLadderPanel patient={patient} isDarkMode={isDarkMode} />
          ) : safeActive === 'alignment' ? (
            <AlignmentPanel patient={patient} isDarkMode={isDarkMode} />
          ) : activeDivergence ? (
            <DivergencePanel row={activeDivergence} isDarkMode={isDarkMode} />
          ) : null}
        </section>
      </div>
    </SurfaceTabs>
  );
}

// ------------------------------------------------------------------------------
// Divergence panel — one intentional prod→simulator upgrade row
// ------------------------------------------------------------------------------

function DivergencePanel({
  row,
  isDarkMode,
}: {
  row: PatientBundle['slMatrix'][number];
  isDarkMode: boolean;
}) {
  const accent = isDarkMode ? 'text-fuchsia-300' : 'text-fuchsia-600';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';

  return (
    <div className="h-full min-h-0 grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-3 overflow-hidden">
      {/* Left column — narrative */}
      <div className="min-h-0 flex flex-col gap-2.5 overflow-y-auto">
        <div className="flex items-start gap-2 flex-wrap">
          <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-black uppercase ${panel} ${accent}`}>
            {prettyAxis(row.axis)}
          </span>
          <span
            className={`rounded px-2 py-0.5 text-[10px] font-black uppercase ${
              isDarkMode ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
            }`}
          >
            {productFor('divergence_intended')}
          </span>
          {row.manuscriptClaimType && (
            <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${panel} ${textMuted}`}>
              {row.manuscriptClaimType.replace(/_/g, ' ')}
            </span>
          )}
        </div>
        <h2 className={`text-lg sm:text-xl font-black tracking-tight leading-tight ${textMain}`}>
          {prettyAxis(row.axis)}
        </h2>

        {/* Prod → Sim delta */}
        <div className={`rounded border p-3 ${panel}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>
            {productFor('prod_tier')} → {productFor('sim_tier')}
          </p>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className={`text-[9px] uppercase font-bold ${textMuted}`}>
                {labelFor('prod_tier')}
              </p>
              <p className={`text-xs font-bold ${textMain}`}>{row.prodTier}</p>
            </div>
            <ArrowRight className={`w-4 h-4 shrink-0 ${accent}`} />
            <div className="flex-1">
              <p className={`text-[9px] uppercase font-bold ${textMuted}`}>
                {labelFor('sim_tier')}
              </p>
              <p className={`text-xs font-bold ${textMain}`}>{row.simTier}</p>
            </div>
          </div>
        </div>

        {row.divergenceExplanation && (
          <div className={`rounded border p-3 ${panel}`}>
            <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>
              Why the simulator upgrades this axis
            </p>
            <p className={`text-[11px] leading-relaxed ${textMain}`}>
              {row.divergenceExplanation}
            </p>
          </div>
        )}
      </div>

      {/* Right column — supporting context */}
      <div className="min-h-0 flex flex-col gap-2 overflow-y-auto">
        <div className={`rounded border p-3 ${panel}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>
            {labelFor('mechanism_fit')}
          </p>
          <p className={`text-[11px] leading-relaxed ${textMain}`}>
            An intentional divergence means the manuscript already carries evidence that a
            candidate axis performs better than the current production tier. The simulator
            promotes it; production waits until the fusion rule ships.
          </p>
        </div>
        <div className={`rounded border p-3 ${panel}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>
            Governance
          </p>
          <p className={`text-[10px] font-mono ${textMain}`}>
            {COMPOSITE_EXPRESSION}
          </p>
          <p className={`text-[10px] mt-1 ${textMuted}`}>
            α = {MECHANISM_FIT_ALPHA} · β = {MECHANISM_FIT_BETA} · eligibility ≥{' '}
            {MIN_ELIGIBILITY_THRESHOLD} · mechanism_fit ≥ {MIN_MECHANISM_FIT_THRESHOLD}
          </p>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------------------
// Alignment panel — shown when no divergence is present
// ------------------------------------------------------------------------------

function AlignmentPanel({
  patient,
  isDarkMode,
}: {
  patient: PatientBundle;
  isDarkMode: boolean;
}) {
  const accent = isDarkMode ? 'text-emerald-300' : 'text-emerald-600';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';

  return (
    <div className="h-full min-h-0 overflow-y-auto flex items-center justify-center">
      <div className={`max-w-2xl w-full rounded border p-6 ${panel}`}>
        <div className="flex items-center gap-2 mb-3">
          <Check className={`w-4 h-4 ${accent}`} />
          <p className={`text-[10px] font-black uppercase tracking-widest ${accent}`}>
            No active divergence
          </p>
        </div>
        <h2 className={`text-lg font-black tracking-tight ${textMain}`}>
          Prod and simulator agree for {patient.meta.patientId}
        </h2>
        <p className={`mt-3 text-xs leading-relaxed ${textMuted}`}>
          The Simulator has no active upgrades to propose over what the production ranker already
          picks for this patient. The {productFor('mechanism_fit')} identifies the same top axis
          in both branches; the {productFor('recommended_drugs').toLowerCase()} tab below shows
          what the ranker chose.
        </p>
        <p className={`mt-3 text-[10px] italic ${textMuted}`}>
          If a new fusion rule ships that would promote a candidate axis for this patient, a new
          divergence card appears here automatically.
        </p>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------------------
// Drug ladder — ranked recommended drugs (patient-driven)
// ------------------------------------------------------------------------------

function DrugLadderPanel({
  patient,
  isDarkMode,
}: {
  patient: PatientBundle;
  isDarkMode: boolean;
}) {
  const accent = isDarkMode ? 'text-fuchsia-300' : 'text-fuchsia-600';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';

  // Sort non-falsified first (by descending confidence), falsified last.
  const drugs = [...(patient.recommendedDrugs ?? [])].sort((a, b) => {
    if (a.falsified !== b.falsified) return a.falsified ? 1 : -1;
    return (b.confidence ?? 0) - (a.confidence ?? 0);
  });

  return (
    <div className="h-full min-h-0 overflow-y-auto">
      <div className={`rounded border p-4 mb-3 ${panel}`}>
        <p className={`text-[10px] font-black uppercase tracking-widest ${accent}`}>
          {labelFor('recommended_drugs')}
        </p>
        <p className={`text-[10px] mt-1 ${textMuted}`}>
          Ordered by confidence; falsified rows are demoted below the fold with their reason.
        </p>
        {patient.suggestedTherapy?.value && (
          <p className={`text-[11px] mt-2 ${textMain}`}>
            <span className={`font-bold uppercase text-[9px] mr-2 ${accent}`}>
              {productFor('suggested_therapy')} ·
            </span>
            {patient.suggestedTherapy.value}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {drugs.map((d, i) => {
          const isFalsified = d.falsified === true;
          const borderTone = isFalsified
            ? isDarkMode
              ? 'border-rose-500/40 bg-rose-950/20'
              : 'border-rose-200 bg-rose-50/60'
            : isDarkMode
              ? 'border-emerald-500/30 bg-emerald-950/10'
              : 'border-emerald-200 bg-emerald-50/40';
          const tagTone = isFalsified
            ? isDarkMode
              ? 'bg-rose-500/20 text-rose-300'
              : 'bg-rose-100 text-rose-700'
            : isDarkMode
              ? 'bg-emerald-500/20 text-emerald-300'
              : 'bg-emerald-100 text-emerald-700';
          return (
            <div key={`${d.drugName}-${i}`} className={`rounded border p-3 ${borderTone}`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className={`text-sm font-black ${textMain}`}>
                    {d.drugName}
                    <span className={`ml-2 text-[9px] font-bold uppercase ${textMuted}`}>
                      #{i + 1}
                    </span>
                  </p>
                  <p className={`text-[10px] font-bold uppercase mt-0.5 ${textMuted}`}>
                    target · {d.targetPathway}
                  </p>
                </div>
                <span className={`shrink-0 rounded px-2 py-0.5 text-[9px] font-bold uppercase ${tagTone}`}>
                  {isFalsified ? 'falsified' : `conf ${d.confidence.toFixed(2)}`}
                </span>
              </div>
              {isFalsified && d.falsifiedReason && (
                <div className={`mt-2 rounded border p-2 ${panel}`}>
                  <p className={`text-[9px] font-black uppercase mb-1 ${accent}`}>
                    Why this was demoted
                  </p>
                  <p className={`text-[10px] leading-snug ${textMain}`}>{d.falsifiedReason}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------------------
// PARP falsification panel — patient-driven parpFalsification bundle
// ------------------------------------------------------------------------------

function ParpFalsificationPanel({
  patient,
  isDarkMode,
}: {
  patient: PatientBundle;
  isDarkMode: boolean;
}) {
  const arc = patient.parpFalsification!; // gated upstream on caps.hasParpFalsification
  const accent = isDarkMode ? 'text-fuchsia-300' : 'text-fuchsia-600';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';

  return (
    <div className="h-full min-h-0 overflow-y-auto">
      <div className="mb-3">
        <p className={`text-[10px] font-black uppercase tracking-widest ${accent}`}>
          {labelFor('parp_falsification')}
        </p>
        <p className={`text-[11px] mt-1 ${textMuted}`}>
          The production ranker still ships PARP as a candidate for this patient. The manuscript
          already falsifies that mechanism. Here is the three-card arc — what prod does, what the
          data actually says, and how the bridge is fixed.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {/* Card 1 — prod today */}
        <div
          className={`flex flex-col rounded border p-4 ${
            isDarkMode ? 'border-rose-500/30 bg-rose-500/[0.05]' : 'border-rose-200 bg-rose-50/60'
          }`}
        >
          <p className={`text-[10px] font-black uppercase tracking-widest ${
            isDarkMode ? 'text-rose-300' : 'text-rose-700'
          }`}>
            1 · Prod ships today
          </p>
          <p className={`mt-2 text-sm font-bold ${textMain}`}>{arc.prodShipsToday.drugName}</p>
          <dl className="mt-3 space-y-1 text-[10px]">
            <RowKV label="Matrix axis" isDarkMode={isDarkMode}>{arc.prodShipsToday.matrixAxis}</RowKV>
            <RowKV label="Tier" isDarkMode={isDarkMode}>{arc.prodShipsToday.tier}</RowKV>
            <RowKV label="Bridge policy" isDarkMode={isDarkMode}>{arc.prodShipsToday.bridgePolicy}</RowKV>
          </dl>
          <p className={`mt-3 text-[10px] leading-relaxed ${textMain}`}>
            <span className={`font-black uppercase mr-1 ${
              isDarkMode ? 'text-rose-300' : 'text-rose-700'
            }`}>Result ·</span>
            {arc.prodShipsToday.behavior}
          </p>
        </div>

        {/* Card 2 — manuscript */}
        <div
          className={`flex flex-col rounded border p-4 ${
            isDarkMode ? 'border-amber-500/30 bg-amber-500/[0.05]' : 'border-amber-200 bg-amber-50/60'
          }`}
        >
          <p className={`text-[10px] font-black uppercase tracking-widest ${
            isDarkMode ? 'text-amber-300' : 'text-amber-700'
          }`}>
            2 · Manuscript says
          </p>
          <p className={`mt-2 text-sm font-bold ${textMain}`}>{arc.manuscriptSays.finding}</p>
          <div className={`mt-3 rounded border p-2 ${panel}`}>
            <p className={`font-mono text-[11px] ${textMain}`}>{arc.manuscriptSays.stat}</p>
            <p className={`mt-1 text-[10px] leading-relaxed ${textMuted}`}>
              {arc.manuscriptSays.conclusion}
            </p>
          </div>
          {arc.manuscriptSays.positiveControl && (
            <div className={`mt-2 rounded border p-2 ${panel}`}>
              <p className={`text-[9px] font-black uppercase ${textMuted}`}>
                {productFor('positive_control')}
              </p>
              <p className={`mt-1 text-[11px] ${textMain}`}>
                {arc.manuscriptSays.positiveControl.finding}
              </p>
              <p className={`mt-1 font-mono text-[10px] ${textMuted}`}>
                {arc.manuscriptSays.positiveControl.stat}
              </p>
              <p className={`mt-1 text-[10px] leading-relaxed ${textMuted}`}>
                {arc.manuscriptSays.positiveControl.point}
              </p>
            </div>
          )}
        </div>

        {/* Card 3 — fix */}
        <div
          className={`flex flex-col rounded border p-4 ${
            isDarkMode ? 'border-cyan-500/30 bg-cyan-500/[0.05]' : 'border-cyan-200 bg-cyan-50/60'
          }`}
        >
          <p className={`text-[10px] font-black uppercase tracking-widest ${
            isDarkMode ? 'text-cyan-300' : 'text-cyan-700'
          }`}>
            3 · How the bridge is fixed
          </p>
          <dl className="mt-3 space-y-1 text-[10px]">
            <RowKV label="Field" isDarkMode={isDarkMode}>{arc.pr11Fix.field}</RowKV>
            <RowKV label="Value" isDarkMode={isDarkMode}>{arc.pr11Fix.value}</RowKV>
          </dl>
          <p className={`mt-3 text-[10px] leading-relaxed ${textMain}`}>
            <span className={`font-black uppercase mr-1 ${
              isDarkMode ? 'text-cyan-300' : 'text-cyan-700'
            }`}>Effect ·</span>
            {arc.pr11Fix.effect}
          </p>
          <p className={`mt-2 text-[10px] leading-relaxed ${textMuted}`}>
            <span className="font-bold uppercase mr-1">Row kept ·</span>
            {arc.pr11Fix.rowKept}
          </p>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------------------
// Governance tab — engine-wide, not patient-scoped
// ------------------------------------------------------------------------------

function GovernanceTab({ isDarkMode }: { isDarkMode: boolean }) {
  const accent = isDarkMode ? 'text-fuchsia-300' : 'text-fuchsia-600';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';
  return (
    <div className="h-full min-h-0 grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto">
      <div className={`rounded border p-3 ${panel}`}>
        <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>
          PATH A · {productFor('mechanism_fit')} ranker
        </p>
        <code className={`text-sm font-black ${textMain}`}>{PATH_A_FORMULA}</code>
        <p className={`mt-2 text-[11px] leading-snug ${textMuted}`}>
          Projection of the patient vector onto the therapy axis, normalized by ‖t‖₂ and clipped to
          [0,1]. PATH B is prohibited across every surface downstream.
        </p>
        <p className={`mt-2 text-[10px] italic ${textMuted}`}>{PATH_A_APPROVAL}</p>
      </div>
      <div className={`rounded border p-3 ${panel}`}>
        <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>
          Composite gate
        </p>
        <code className={`text-sm font-black ${textMain}`}>{COMPOSITE_EXPRESSION}</code>
        <p className={`mt-2 text-[11px] leading-snug ${textMuted}`}>
          α = {MECHANISM_FIT_ALPHA}, β = {MECHANISM_FIT_BETA}. Eligibility must reach{' '}
          {MIN_ELIGIBILITY_THRESHOLD}, mechanism_fit must reach {MIN_MECHANISM_FIT_THRESHOLD}. Both
          required.
        </p>
      </div>
      <div className={`rounded border p-3 ${panel}`}>
        <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>
          RSS · opt-in axis
        </p>
        <p className={`text-[11px] leading-snug ${textMain}`}>
          The Replication-Stress Score (PMID 34552099) is the optional 8th axis. It is enabled only
          when the therapy modality demands it — the 7-axis canonical vector remains the default
          surface everywhere else.
        </p>
      </div>
      <div className={`rounded border p-3 ${panel}`}>
        <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>
          DL-07 quarantine
        </p>
        <p className={`text-[11px] leading-snug ${textMain}`}>
          DDR axis alignment is described qualitatively across every L2 surface. The specific
          numeric figure cited historically is quarantined per the DL-07 governance rule until it
          is reproduced end-to-end. No output on this surface pairs the DDR label with that number.
        </p>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------------------
// Small shared cells
// ------------------------------------------------------------------------------

function RowKV({
  label,
  children,
  isDarkMode,
}: {
  label: string;
  children: React.ReactNode;
  isDarkMode: boolean;
}) {
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';
  return (
    <div className="flex items-center gap-2">
      <dt className={`text-[9px] font-bold uppercase w-24 ${textMuted}`}>{label}</dt>
      <dd className={`text-[10px] ${textMain}`}>{children}</dd>
    </div>
  );
}

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

function prettyAxis(axisKey: string): string {
  const map: Record<string, string> = {
    cytidine_analogs: 'Cytidine analogs',
    atr_wee1: 'ATR / WEE1',
    parp_inhibitors: 'PARP inhibitors',
    immunotherapy: 'Immunotherapy',
    pkmyt1: 'PKMYT1',
    wrn: 'WRN',
    her2_targeting: 'HER2 targeting',
    her2_adc: 'HER2 ADC',
    pi3k_axis: 'PI3K axis',
  };
  return map[axisKey] ?? axisKey.replace(/_/g, ' ');
}
