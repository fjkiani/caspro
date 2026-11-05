'use client';

/**
 * CASE / PRE-REQ content.
 * - mode="inputs"      → nested gene / tumor-context chips (CASE only)
 * - mode="explanation" → why SL still ranks at partial completeness (PRE-REQ)
 * - mode="all"         → both (legacy)
 *
 * Values from PatientBundle. MBD4 Evo2: do not label as scored — KB live SL
 * has evo2_called:false (left-pad AT→A normalization only).
 */
import { useMemo, useState, type ReactNode } from 'react';
import { usePatient } from '@/context/PatientContext';
import { useTheme } from '@/context/ThemeContext';
import type { Mutation } from '@/data/tumor-board/patient-bundle-types';

type InputTab =
  | { kind: 'mutation'; mutation: Mutation }
  | { kind: 'context' };

type SlExplainTab = {
  id: string;
  label: string;
  detail: string;
};

function shortConsequence(m: Mutation): string {
  if (m.gene === 'TP53' && /R175H/i.test(m.hgvs + m.consequence)) return 'R175H';
  if (/frameshift/i.test(m.consequence)) return 'frameshift';
  if (/missense/i.test(m.consequence)) return 'missense';
  return m.consequence.split(/[_\s]/)[0] ?? m.consequence;
}

/** MBD4 indel is normalized for VCF; live SL receipt is evo2_called:false. */
function evo2Label(m: Mutation): { scored: boolean; note: string } {
  if (m.gene === 'MBD4') {
    return {
      scored: false,
      note:
        m.normalizationNote ??
        'Left-padded indel (A→— → AT→A). Not an Evo2-scored driver call.',
    };
  }
  return {
    scored: m.scoredByEvo2,
    note: m.normalizationNote ?? (m.scoredByEvo2 ? 'Evo2 scored with receipt.' : 'Not sent / excluded.'),
  };
}

export default function AKMutationPanel({
  mode = 'all',
  selectedGene,
  onSelectGene,
}: {
  mode?: 'inputs' | 'explanation' | 'all';
  /** When set by parent (CASE nested rail), syncs the active mutation chip. */
  selectedGene?: string;
  onSelectGene?: (gene: string) => void;
}) {
  const patient = usePatient();
  const { isDarkMode } = useTheme();

  const inputTabs: InputTab[] = useMemo(
    () => [
      ...patient.mutations.map((mutation) => ({ kind: 'mutation' as const, mutation })),
      { kind: 'context' },
    ],
    [patient.mutations],
  );

  const [localIdx, setLocalIdx] = useState(0);
  const activeIdx = useMemo(() => {
    if (!selectedGene) return localIdx;
    const i = patient.mutations.findIndex((m) => m.gene === selectedGene);
    if (i >= 0) return i;
    if (selectedGene === 'context') return patient.mutations.length;
    return localIdx;
  }, [selectedGene, patient.mutations, localIdx]);

  const setActiveIdx = (i: number) => {
    setLocalIdx(i);
    const tab = inputTabs[i];
    if (!onSelectGene || !tab) return;
    if (tab.kind === 'mutation') onSelectGene(tab.mutation.gene);
    else onSelectGene('context');
  };

  const compPct = Math.round(patient.completeness.completenessScore * 100);
  const capPct = Math.round(patient.completeness.confidenceCap * 100);
  const matrix = patient.slMatrix ?? [];
  const primaryGene = patient.mutations[0]?.gene ?? 'primary gene';

  const slTabs: SlExplainTab[] = [
    {
      id: 'gates',
      label: 'Two questions',
      detail: `${compPct}%`,
    },
    {
      id: 'fired',
      label: 'What opened it',
      detail: primaryGene,
    },
    {
      id: 'fallback',
      label: 'How it ranked',
      detail: 'matrix',
    },
    {
      id: 'matrix',
      label: 'Evidence axes',
      detail: `${matrix.length || 6} axes`,
    },
    {
      id: 'missing',
      label: 'What is still missing',
      detail: 'cells',
    },
  ];
  const [slIdx, setSlIdx] = useState(0);

  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const body = isDarkMode ? 'text-zinc-300' : 'text-slate-600';
  const main = isDarkMode ? 'text-white' : 'text-slate-900';
  const panel = isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-white border-slate-200';
  const chipOn = isDarkMode
    ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-100'
    : 'border-indigo-400 bg-indigo-50 text-indigo-950';
  const chipOff = isDarkMode
    ? 'border-zinc-800 text-zinc-500 hover:text-zinc-300'
    : 'border-slate-200 text-slate-500 hover:text-slate-800';

  const active = inputTabs[activeIdx] ?? inputTabs[0];

  return (
    <div className="space-y-8">
      {mode !== 'explanation' ? (
        <div>
          <p className={`text-[9px] font-black uppercase tracking-[0.35em] mb-2 ${accent}`}>
            Inputs CrisPRO used
          </p>
          <div className="flex gap-1.5 overflow-x-auto pb-2" role="tablist" aria-label="Case inputs">
            {inputTabs.map((tab, i) => {
              const on = i === activeIdx;
              const label =
                tab.kind === 'mutation'
                  ? `${String(i + 1).padStart(2, '0')} · ${tab.mutation.gene}`
                  : `${String(i + 1).padStart(2, '0')} · Tumor context`;
              const sub =
                tab.kind === 'mutation'
                  ? shortConsequence(tab.mutation)
                  : 'MSI · PD-L1 · ER';
              return (
                <button
                  key={label}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActiveIdx(i)}
                  className={`shrink-0 rounded-sm border px-2.5 py-1.5 text-left transition-colors ${
                    on ? chipOn : chipOff
                  }`}
                >
                  <span className="block text-[10px] font-black uppercase tracking-wider">{label}</span>
                  <span className="block text-[9px] opacity-70 mt-0.5">{sub}</span>
                </button>
              );
            })}
          </div>

          <div className={`mt-3 rounded border p-4 ${panel}`}>
            {active?.kind === 'mutation' ? (
              <MutationDetail mutation={active.mutation} isDarkMode={isDarkMode} />
            ) : (
              <ContextDetail isDarkMode={isDarkMode} />
            )}
          </div>
        </div>
      ) : null}

      {mode !== 'inputs' ? (
        <div>
          <p className={`text-[9px] font-black uppercase tracking-[0.35em] mb-1 ${accent}`}>
            Why SL still ranks at {compPct}% completeness
          </p>
          <p className={`text-[12px] leading-relaxed mb-3 max-w-3xl ${body}`}>
            Completeness is a therapy-fit / efficacy confidence gate, not an SL matrix gate.
            Missing tests leave modality cells empty or block adjacent modules — they do not erase
            a precomputed evidence matrix once gene identity resolves.
          </p>
          <div className="flex gap-1.5 overflow-x-auto pb-2" role="tablist" aria-label="SL gate explain">
            {slTabs.map((t, i) => {
              const on = i === slIdx;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setSlIdx(i)}
                  className={`shrink-0 rounded-sm border px-2.5 py-1.5 text-left transition-colors ${
                    on ? chipOn : chipOff
                  }`}
                >
                  <span className="block text-[9px] font-black tracking-widest opacity-70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] font-black uppercase tracking-wider">{t.label}</span>
                  <span className={`block text-[9px] mt-0.5 ${muted}`}>{t.detail}</span>
                </button>
              );
            })}
          </div>
          <div className={`mt-3 rounded border p-4 text-[12px] leading-relaxed ${panel} ${body}`}>
            <SlExplainDetail
              id={slTabs[slIdx]?.id ?? 'gates'}
              patientId={patient.meta.patientId}
              primaryGene={primaryGene}
              compPct={compPct}
              capPct={capPct}
              missing={patient.completeness.missing}
              matrixAxes={matrix.map((r) => r.axis)}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MutationDetail({
  mutation,
  isDarkMode,
}: {
  mutation: Mutation;
  isDarkMode: boolean;
}) {
  const evo = evo2Label(mutation);
  const main = isDarkMode ? 'text-white' : 'text-slate-900';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const body = isDarkMode ? 'text-zinc-300' : 'text-slate-600';
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';

  const role =
    mutation.gene === 'MBD4'
      ? 'Primary SL gene — frameshift / LOF opens the BER axis and the evidence matrix.'
      : mutation.gene === 'TP53'
        ? 'Checkpoint context — R175H supports ATR/WEE1 stratification; does not replace the primary SL gene.'
        : mutation.gene === 'PDGFRA'
          ? 'Secondary missense on file — VUS context only; not the matrix key.'
          : 'On-file mutation used as case input.';

  return (
    <div className="space-y-3">
      <div>
        <p className={`text-[9px] font-black uppercase tracking-[0.3em] ${accent}`}>{mutation.gene}</p>
        <p className={`text-lg font-black tracking-tight ${main}`}>{mutation.hgvs}</p>
      </div>
      <dl className={`grid sm:grid-cols-2 gap-3 text-[11px] ${body}`}>
        <Field label="Consequence" value={mutation.consequence} muted={muted} />
        <Field
          label="Coords"
          value={
            mutation.chrom
              ? `chr${mutation.chrom}:${mutation.pos} ${mutation.ref}>${mutation.alt}`
              : '—'
          }
          muted={muted}
        />
        <Field
          label="Evo2"
          value={evo.scored ? 'SCORED' : 'NOT SCORED'}
          muted={muted}
        />
        <Field label="Note" value={evo.note} muted={muted} />
      </dl>
      <p className={`text-[12px] leading-relaxed ${body}`}>{role}</p>
    </div>
  );
}

function ContextDetail({ isDarkMode }: { isDarkMode: boolean }) {
  const patient = usePatient();
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const body = isDarkMode ? 'text-zinc-300' : 'text-slate-600';
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const main = isDarkMode ? 'text-white' : 'text-slate-900';
  const tc = patient.tumorContext;

  return (
    <div className="space-y-3">
      <p className={`text-[9px] font-black uppercase tracking-[0.3em] ${accent}`}>Tumor context</p>
      <p className={`text-lg font-black tracking-tight ${main}`}>
        {tc.subtype ?? tc.cancerType}
      </p>
      <dl className={`grid sm:grid-cols-2 gap-3 text-[11px] ${body}`}>
        <Field label="MSI" value={tc.msiStatus ?? '—'} muted={muted} />
        <Field
          label="PD-L1"
          value={
            tc.pdL1Status
              ? `${tc.pdL1Status}${tc.pdL1Cps != null ? ` · CPS ${tc.pdL1Cps}` : ''}`
              : '—'
          }
          muted={muted}
        />
        <Field
          label="ER"
          value={
            tc.erStatus
              ? `${tc.erStatus}${tc.erPercent != null ? ` · ${tc.erPercent}%` : ''}`
              : '—'
          }
          muted={muted}
        />
        <Field
          label="Completeness"
          value={`${Math.round(patient.completeness.completenessScore * 100)}% on file`}
          muted={muted}
        />
      </dl>
      <p className={`text-[12px] leading-relaxed ${body}`}>
        Biomarkers on file for this case. Missing HRD / TMB / RNA / CA-125 drive the completeness
        gap — they do not remove mutation identity used for SL ranking.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted: string;
}) {
  return (
    <div>
      <dt className={`text-[9px] font-black uppercase tracking-widest ${muted}`}>{label}</dt>
      <dd className="mt-0.5 font-mono text-[11px]">{value}</dd>
    </div>
  );
}

function SlExplainDetail({
  id,
  patientId,
  primaryGene,
  compPct,
  capPct,
  missing,
  matrixAxes,
  isDarkMode,
}: {
  id: string;
  patientId: string;
  primaryGene: string;
  compPct: number;
  capPct: number;
  missing: readonly string[];
  matrixAxes: string[];
  isDarkMode: boolean;
}): ReactNode {
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const main = isDarkMode ? 'text-white' : 'text-slate-900';

  if (id === 'gates') {
    return (
      <div className="space-y-2">
        <p className={`font-black ${main}`}>
          {compPct}% complete ≠ SL off
        </p>
        <p>
          Two separate questions: (1) therapy-fit confidence is capped at {capPct}% while tests are
          missing; (2) SL ranking asks whether a gene identity + evidence matrix exist. Case{' '}
          {patientId} answers (2) even when (1) is incomplete.
        </p>
      </div>
    );
  }
  if (id === 'fired') {
    return (
      <div className="space-y-2">
        <p className={`font-black ${main}`}>{primaryGene} identity opens the gate</p>
        <p>
          Gene identity resolves to LOF / frameshift flags for the primary SL gene. That is enough
          to enter the SL path — Evo2 scoring on every allele is not required for the matrix to
          fire.
        </p>
      </div>
    );
  }
  if (id === 'fallback') {
    return (
      <div className="space-y-2">
        <p className={`font-black ${main}`}>Empty core → multimodal matrix</p>
        <p>
          When the live partner table has no gene–drug pairs, the bridge falls back to a
          precomputed evidence matrix (manuscript + GDSC + literature) and assigns tiers. Ranking
          comes from that matrix, not from completeness %.
        </p>
      </div>
    );
  }
  if (id === 'matrix') {
    return (
      <div className="space-y-2">
        <p className={`font-black ${main}`}>Axes on the live matrix</p>
        <p className={accent}>
          {matrixAxes.length > 0 ? matrixAxes.join(' · ') : 'cytidine · atr_wee1 · parp · IO · …'}
        </p>
        <p>
          Matrix dictatorship assigns tiers and maps drugs. For AK, cytidine stays validated;
          ATR/WEE1 is the mechanistic candidate (ceralaserib LN_IC50 p=0.021, TP53-mut p=0.003).
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <p className={`font-black ${main}`}>Missing tests = empty cells, not a wipe</p>
      <p>
        Not yet on file: {missing.join(' · ') || '—'}. Those leave modality cells MISSING or block
        adjacent modules (IO completeness, longitudinal CA-125). They do not erase the SL matrix.
      </p>
    </div>
  );
}
