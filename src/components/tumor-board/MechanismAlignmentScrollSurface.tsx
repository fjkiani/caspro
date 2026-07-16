'use client';

// ==============================================================================
// /engine/mechanism-alignment/scroll — L2 long-scroll · PATIENT-DRIVEN.
//
// Sections (each gated on caps):
//   00. Hero — patient identity + PATH A formula + composite gate readout
//   01. Divergence cards — one per SL row where divergenceIntended === true
//       (or a single "no active divergence" info card if none)
//   02. Ranked drug ladder — patient.recommendedDrugs, falsified rows demoted
//   03. PARP arc (gated) — patient.parpFalsification three-card story
//   04. Governance footer — PATH A · composite gate · RSS opt-in · DL-07
//   05. Cross-engine links
// ==============================================================================

import Link from 'next/link';
import { Layers, ArrowRight, ShieldCheck, Check, AlertTriangle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useOptionalPatient } from '@/context/PatientContext';
import { AK01 } from '@/data/patients/AK01';
import type { PatientBundle } from '@/data/tumor-board/patient-bundle-types';
import { getCapabilities } from '@/lib/capabilities';
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

export default function MechanismAlignmentScrollSurface() {
  const { isDarkMode } = useTheme();
  const patientCtx = useOptionalPatient();
  const patient: PatientBundle = patientCtx ?? AK01;
  const caps = getCapabilities(patient);

  const accent = isDarkMode ? 'text-fuchsia-300' : 'text-fuchsia-600';
  const accentBg = isDarkMode ? 'bg-fuchsia-950/40 border-fuchsia-800/40' : 'bg-fuchsia-50 border-fuchsia-200';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';

  const divergenceRows = (patient.slMatrix ?? []).filter((r) => r.divergenceIntended === true);
  const drugs = [...(patient.recommendedDrugs ?? [])].sort((a, b) => {
    if (a.falsified !== b.falsified) return a.falsified ? 1 : -1;
    return (b.confidence ?? 0) - (a.confidence ?? 0);
  });

  return (
    <div className={`min-h-screen font-mono ${isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-white text-slate-900'}`}>
      {/* ============================================================
          00 · Hero — patient identity + governance math
      ============================================================ */}
      <section className={`relative border-b ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'} overflow-hidden`}>
        <div
          className={`absolute inset-0 pointer-events-none ${
            isDarkMode
              ? 'bg-[linear-gradient(to_right,#F0ABFC08_1px,transparent_1px),linear-gradient(to_bottom,#F0ABFC08_1px,transparent_1px)]'
              : 'bg-[linear-gradient(to_right,#a21caf08_1px,transparent_1px),linear-gradient(to_bottom,#a21caf08_1px,transparent_1px)]'
          } bg-[size:48px_48px]`}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded border flex items-center justify-center ${panel}`}>
              <Layers className={`w-5 h-5 ${accent}`} />
            </div>
            <div>
              <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${accent}`}>
                L2 · scroll · {productFor('mechanism_fit')}
              </p>
              <p className={`text-[10px] uppercase tracking-widest mt-0.5 ${textMuted}`}>
                {patient.meta.patientId} · {patient.tumorContext?.subtype ?? patient.tumorContext?.cancerType ?? patient.meta.displayName ?? '—'}
              </p>
            </div>
            <div className={`ml-auto hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase ${textMuted}`}>
              <ShieldCheck className="w-3 h-3" />
              <span>PATH A signed</span>
            </div>
          </div>

          <h1 className={`text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-4 max-w-4xl ${textMain}`}>
            Mechanism Alignment · {productFor('mechanism_fit')} explained
          </h1>
          <p className={`text-sm sm:text-base leading-relaxed max-w-3xl ${textMuted}`}>
            This surface answers one question: does the recommended therapy actually line up with
            the patient's active biology? Every card below is derived from{' '}
            <span className={textMain}>{patient.meta.patientId}</span>'s bundle — the intentional
            simulator upgrades, the ranked drug candidates, and (where applicable) why we did NOT
            pick certain classes.
          </p>

          {/* Governance math strip */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className={`rounded border p-3 ${panel}`}>
              <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${accent}`}>
                PATH A · production ranker
              </p>
              <code className={`text-sm sm:text-base font-black ${textMain}`}>{PATH_A_FORMULA}</code>
              <p className={`mt-2 text-[11px] leading-snug ${textMuted}`}>
                Projection of the patient vector onto the therapy axis, clipped to [0,1]. Naive
                cosine strips magnitude information; the clip preserves it.
              </p>
            </div>
            <div className={`rounded border p-3 ${panel}`}>
              <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${accent}`}>
                Composite gate
              </p>
              <code className={`text-sm sm:text-base font-black ${textMain}`}>{COMPOSITE_EXPRESSION}</code>
              <p className={`mt-2 text-[11px] leading-snug ${textMuted}`}>
                α = {MECHANISM_FIT_ALPHA}, β = {MECHANISM_FIT_BETA}. Eligibility ≥{' '}
                {MIN_ELIGIBILITY_THRESHOLD} and mechanism_fit ≥ {MIN_MECHANISM_FIT_THRESHOLD} — both
                must clear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          01 · Divergence cards — patient's intentional prod→sim upgrades
      ============================================================ */}
      <section className={`border-b ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <p className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 ${accent}`}>
            01 · {productFor('divergence_intended')}
          </p>
          <h2 className={`text-xl sm:text-2xl font-black tracking-tight leading-tight mb-3 max-w-4xl ${textMain}`}>
            {divergenceRows.length > 0
              ? `Where the Simulator upgrades what production would ship`
              : `Prod and Simulator agree for ${patient.meta.patientId}`}
          </h2>

          {divergenceRows.length === 0 ? (
            <div className={`rounded border p-5 ${panel}`}>
              <div className="flex items-center gap-2 mb-2">
                <Check className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <p className={`text-[10px] font-black uppercase tracking-widest ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-700'
                }`}>
                  No active divergence
                </p>
              </div>
              <p className={`text-sm leading-relaxed max-w-3xl ${textMain}`}>
                The Simulator identifies the same top {productFor('sl_axis').toLowerCase()} that
                the production ranker already picks for this patient. No axis is currently being
                promoted by a candidate fusion rule that hasn't already shipped to production.
              </p>
              <p className={`mt-3 text-[11px] italic max-w-3xl ${textMuted}`}>
                If a new manuscript claim or fusion rule ships that would upgrade a candidate axis
                for {patient.meta.patientId}, the card appears here automatically without any code
                change to this surface.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {divergenceRows.map((row, i) => (
                <DivergenceCard
                  key={row.axis}
                  index={i}
                  total={divergenceRows.length}
                  row={row}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
          02 · Ranked drug ladder
      ============================================================ */}
      {caps.hasRecommendedDrugs && (
        <section className={`border-b ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <p className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 ${accent}`}>
              02 · {productFor('recommended_drugs')}
            </p>
            <h2 className={`text-xl sm:text-2xl font-black tracking-tight leading-tight mb-3 max-w-4xl ${textMain}`}>
              What the ranker picks — and what it demotes
            </h2>
            <p className={`text-sm leading-relaxed max-w-3xl mb-5 ${textMuted}`}>
              Ordered by confidence. Falsified candidates are pushed below the fold, with the
              falsification reason attached so the demotion is auditable.
            </p>

            {patient.suggestedTherapy?.value && (
              <div className={`rounded border p-3 mb-4 ${accentBg}`}>
                <p className={`text-[10px] font-black uppercase tracking-widest ${accent}`}>
                  {productFor('suggested_therapy')}
                </p>
                <p className={`mt-1 text-sm font-black ${textMain}`}>
                  {patient.suggestedTherapy.value}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {drugs.map((d, i) => (
                <DrugCard key={`${d.drugName}-${i}`} rank={i + 1} drug={d} isDarkMode={isDarkMode} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          03 · PARP arc (gated on caps.hasParpFalsification)
      ============================================================ */}
      {caps.hasParpFalsification && patient.parpFalsification && (
        <section className={`border-b ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'} bg-[#020408] text-zinc-100`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 text-fuchsia-300">
              03 · {productFor('parp_falsification')}
            </p>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight mb-3 max-w-4xl text-zinc-100">
              The three-card arc — what prod does, what the data says, how the bridge is fixed
            </h2>
            <p className="text-sm leading-relaxed max-w-3xl mb-6 text-zinc-400">
              Production still ships PARP as a candidate for {patient.meta.patientId}. The
              manuscript already falsifies that mechanism. This section reproduces the arc
              end-to-end so the fix is legible without opening the bundle.
            </p>
            <ParpArcCards arc={patient.parpFalsification} />
          </div>
        </section>
      )}

      {/* ============================================================
          04 · Governance footer
      ============================================================ */}
      <section className={`border-b ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <p className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 ${accent}`}>
            04 · Governance
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className={`rounded border p-3 ${panel}`}>
              <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${accent}`}>
                Signed ranker
              </p>
              <code className={`text-sm font-black ${textMain}`}>{PATH_A_FORMULA}</code>
              <p className={`mt-2 text-[10px] italic ${textMuted}`}>{PATH_A_APPROVAL}</p>
            </div>
            <div className={`rounded border p-3 ${panel}`}>
              <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${accent}`}>
                RSS · opt-in axis
              </p>
              <p className={`text-[11px] leading-snug ${textMain}`}>
                The Replication-Stress Score (PMID 34552099) is an optional 8th axis. It ships only
                when the therapy modality demands it — the 7-axis canonical vector is the default
                everywhere else.
              </p>
            </div>
            <div className={`rounded border p-3 ${panel}`}>
              <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${accent}`}>
                DL-07 quarantine
              </p>
              <p className={`text-[11px] leading-snug ${textMain}`}>
                The DDR axis alignment number cited historically is quarantined until reproduced
                end-to-end. This surface never pairs the DDR label with that specific number.
              </p>
            </div>
            <div className={`rounded border p-3 ${panel}`}>
              <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${accent}`}>
                Composite gate
              </p>
              <code className={`text-sm font-black ${textMain}`}>{COMPOSITE_EXPRESSION}</code>
              <p className={`mt-2 text-[10px] ${textMuted}`}>
                α = {MECHANISM_FIT_ALPHA} · β = {MECHANISM_FIT_BETA} · elig ≥{' '}
                {MIN_ELIGIBILITY_THRESHOLD} · fit ≥ {MIN_MECHANISM_FIT_THRESHOLD}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          05 · Cross-engine links
      ============================================================ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>
          Cross-engine deep dives
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <CrossLink
            href={`/tumor-board/${patient.meta.patientId}`}
            title={`Case · ${patient.meta.patientId}`}
            note="Full L1 board for this patient — 9 panels, primary source."
            isDarkMode={isDarkMode}
          />
          <CrossLink
            href="/engine/synthetic-lethality/scroll"
            title="SL · scroll"
            note="Lethality substrate that MOA collides with."
            isDarkMode={isDarkMode}
          />
          <CrossLink
            href="/engine/mechanism-alignment/tabs"
            title="L2 tab strip"
            note="Same content, tab layout."
            isDarkMode={isDarkMode}
          />
        </div>
      </section>
    </div>
  );
}

// ------------------------------------------------------------------------------
// Divergence card — one intentional prod→sim upgrade
// ------------------------------------------------------------------------------

function DivergenceCard({
  index,
  total,
  row,
  isDarkMode,
}: {
  index: number;
  total: number;
  row: PatientBundle['slMatrix'][number];
  isDarkMode: boolean;
}) {
  const accent = isDarkMode ? 'text-fuchsia-300' : 'text-fuchsia-600';
  const accentBg = isDarkMode ? 'bg-fuchsia-950/40 border-fuchsia-800/40' : 'bg-fuchsia-50 border-fuchsia-200';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';

  return (
    <div className={`rounded border p-5 ${panel}`}>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className={`inline-flex items-center gap-2 rounded px-2 py-1 ${accentBg}`}>
          <span className={`text-[10px] font-black uppercase ${accent}`}>
            Δ-{String(index + 1).padStart(2, '0')} of {total}
          </span>
        </div>
        <span className={`text-[10px] font-black uppercase rounded px-2 py-1 ${
          isDarkMode ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
        }`}>
          {productFor('divergence_intended')}
        </span>
        {row.manuscriptClaimType && (
          <span className={`text-[10px] font-bold uppercase rounded px-2 py-1 ${panel} ${textMuted}`}>
            {row.manuscriptClaimType.replace(/_/g, ' ')}
          </span>
        )}
      </div>

      <h3 className={`text-lg sm:text-xl font-black tracking-tight ${textMain}`}>
        {prettyAxis(row.axis)}
      </h3>

      {/* Prod → Sim delta strip */}
      <div className={`mt-4 rounded border p-3 ${panel}`}>
        <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>
          {productFor('prod_tier')} → {productFor('sim_tier')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div>
            <p className={`text-[9px] uppercase font-bold ${textMuted}`}>{labelFor('prod_tier')}</p>
            <p className={`text-sm font-bold mt-1 ${textMain}`}>{row.prodTier}</p>
          </div>
          <ArrowRight className={`w-4 h-4 shrink-0 self-center ${accent} hidden sm:block`} />
          <div>
            <p className={`text-[9px] uppercase font-bold ${textMuted}`}>{labelFor('sim_tier')}</p>
            <p className={`text-sm font-bold mt-1 ${textMain}`}>{row.simTier}</p>
          </div>
        </div>
      </div>

      {row.divergenceExplanation && (
        <div className={`mt-3 rounded border p-3 ${panel}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>
            Why the Simulator upgrades this axis
          </p>
          <p className={`text-[12px] leading-relaxed ${textMain}`}>{row.divergenceExplanation}</p>
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------------------------
// Drug card
// ------------------------------------------------------------------------------

function DrugCard({
  rank,
  drug,
  isDarkMode,
}: {
  rank: number;
  drug: PatientBundle['recommendedDrugs'][number];
  isDarkMode: boolean;
}) {
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';
  const isFalsified = drug.falsified === true;
  const accent = isDarkMode ? 'text-fuchsia-300' : 'text-fuchsia-600';

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
    <div className={`rounded border p-4 ${borderTone}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className={`text-base font-black ${textMain}`}>
            {drug.drugName}
            <span className={`ml-2 text-[9px] font-bold uppercase ${textMuted}`}>#{rank}</span>
          </p>
          <p className={`text-[10px] font-bold uppercase mt-1 ${textMuted}`}>
            target · {drug.targetPathway}
          </p>
        </div>
        <span className={`shrink-0 rounded px-2 py-0.5 text-[9px] font-bold uppercase ${tagTone}`}>
          {isFalsified ? 'falsified' : `conf ${drug.confidence.toFixed(2)}`}
        </span>
      </div>
      {isFalsified && drug.falsifiedReason && (
        <div className={`mt-3 rounded border p-2 ${panel}`}>
          <div className="flex items-center gap-1 mb-1">
            <AlertTriangle className={`w-3 h-3 ${isDarkMode ? 'text-rose-300' : 'text-rose-600'}`} />
            <p className={`text-[9px] font-black uppercase ${accent}`}>Why demoted</p>
          </div>
          <p className={`text-[11px] leading-snug ${textMain}`}>{drug.falsifiedReason}</p>
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------------------------
// PARP arc — three cards (dark-only, matches AK component styling)
// ------------------------------------------------------------------------------

function ParpArcCards({
  arc,
}: {
  arc: NonNullable<PatientBundle['parpFalsification']>;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="flex flex-col rounded border border-rose-500/30 bg-rose-500/[0.05] p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-rose-300">
          1 · Prod ships today
        </p>
        <p className="mt-3 text-sm text-white/80">{arc.prodShipsToday.drugName}</p>
        <dl className="mt-4 space-y-2 text-xs">
          <ArcRow label="Matrix axis">{arc.prodShipsToday.matrixAxis}</ArcRow>
          <ArcRow label="Tier">{arc.prodShipsToday.tier}</ArcRow>
          <ArcRow label="Bridge policy">{arc.prodShipsToday.bridgePolicy}</ArcRow>
        </dl>
        <div className="mt-4 rounded border border-rose-400/30 bg-rose-500/[0.08] p-3 text-[11px] leading-relaxed text-rose-100/80">
          <span className="text-rose-300">Result:</span> {arc.prodShipsToday.behavior}
        </div>
      </div>

      <div className="flex flex-col rounded border border-amber-500/30 bg-amber-500/[0.05] p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-amber-300">
          2 · Manuscript says
        </p>
        <p className="mt-3 text-sm text-white/80">{arc.manuscriptSays.finding}</p>
        <div className="mt-3 rounded border border-amber-400/40 bg-black/30 p-3">
          <p className="font-mono text-xs text-amber-200">{arc.manuscriptSays.stat}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-white/70">
            {arc.manuscriptSays.conclusion}
          </p>
        </div>
        {arc.manuscriptSays.positiveControl && (
          <div className="mt-3 rounded border border-white/10 bg-black/20 p-3">
            <p className="text-[10px] uppercase tracking-widest text-white/40">
              {productFor('positive_control')}
            </p>
            <p className="mt-1 text-xs text-white/80">
              {arc.manuscriptSays.positiveControl.finding}
            </p>
            <p className="mt-1 font-mono text-xs text-white/60">
              {arc.manuscriptSays.positiveControl.stat}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-white/50">
              {arc.manuscriptSays.positiveControl.point}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col rounded border border-cyan-500/30 bg-cyan-500/[0.05] p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">
          3 · How the bridge is fixed
        </p>
        <dl className="mt-3 space-y-2 text-xs">
          <ArcRow label="Field">{arc.pr11Fix.field}</ArcRow>
          <ArcRow label="Value">{arc.pr11Fix.value}</ArcRow>
        </dl>
        <div className="mt-4 rounded border border-cyan-400/30 bg-cyan-500/[0.08] p-3 text-[11px] leading-relaxed text-cyan-100/80">
          <span className="text-cyan-300">Effect:</span> {arc.pr11Fix.effect}
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-white/60">
          <span className="font-bold uppercase mr-1 text-white/40">Row kept ·</span>
          {arc.pr11Fix.rowKept}
        </p>
      </div>
    </div>
  );
}

function ArcRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <dt className="text-[10px] uppercase tracking-widest text-white/40 w-28">{label}</dt>
      <dd className="text-xs text-white/80">{children}</dd>
    </div>
  );
}

// ------------------------------------------------------------------------------
// Cross-link footer card
// ------------------------------------------------------------------------------

function CrossLink({
  href,
  title,
  note,
  isDarkMode,
}: {
  href: string;
  title: string;
  note: string;
  isDarkMode: boolean;
}) {
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const accent = isDarkMode ? 'text-fuchsia-300' : 'text-fuchsia-600';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';
  return (
    <Link
      href={href}
      className={`group flex items-start gap-2 rounded border p-3 transition-colors ${panel} ${
        isDarkMode ? 'hover:border-fuchsia-500/40' : 'hover:border-fuchsia-300'
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className={`text-[10px] font-black uppercase tracking-[0.15em] ${accent}`}>{title}</p>
        <p className={`mt-1 text-[11px] leading-snug ${textMuted}`}>{note}</p>
      </div>
      <ArrowRight className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${accent}`} />
    </Link>
  );
}

// ------------------------------------------------------------------------------
// Helper — pretty axis names
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
