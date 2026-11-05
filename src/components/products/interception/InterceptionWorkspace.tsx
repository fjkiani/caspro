'use client';

/**
 * InterceptionWorkspace — flagship /products/interception/
 *
 * Shell rhythm: BrmPipelineWorkspace (step rail + split body).
 * Structure pane: StructureViewer / RnaDnaStructureViewer (same stack as scroll gallery).
 * Numbers: brain-met-cascade-data + structure-manifest + af3-guide-manifest only.
 */

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, Target } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import StructureViewer from '@/components/target-lock/structure/StructureViewer';
import RnaDnaStructureViewer from '@/components/target-lock/structure/RnaDnaStructureViewer';
import type { BrmStep } from '@/data/brain-met-cascade-data';
import {
  BACE1,
  BRM_STEPS,
  FORMULAS,
  HANDOFF_CTAS,
  HANDOFF_LIMITS,
  INTERCEPTION_HERO,
  MISSION_STAGES,
  MSKMET_BRM,
  SIGNAL_CARDS,
  cascadeStepsForGene,
  defaultGeneForStep,
  getBestGuideForGene,
  getStructureRecord,
  liveVariantsForGene,
  type MissionStageId,
} from '@/data/pages/interception-workspace-data';
import { WEIGHTS as TL_WEIGHTS } from '@/data/brain-met-cascade-data';

export default function InterceptionWorkspace() {
  const { isDarkMode } = useTheme();
  const [missionId, setMissionId] = useState<MissionStageId>(1);
  const [stepSlug, setStepSlug] = useState<BrmStep['slug']>('cns_colonization');
  const step = useMemo(
    () => BRM_STEPS.find((s) => s.slug === stepSlug) ?? BRM_STEPS[4],
    [stepSlug],
  );
  const [selectedGene, setSelectedGene] = useState<string>(() => defaultGeneForStep(BRM_STEPS[4]));

  // When cascade step changes, snap gene to a primary for that step.
  useEffect(() => {
    setSelectedGene(defaultGeneForStep(step));
  }, [step]);

  const mission = MISSION_STAGES.find((m) => m.id === missionId) ?? MISSION_STAGES[0];
  const guide = useMemo(() => getBestGuideForGene(selectedGene), [selectedGene]);
  const structure = useMemo(() => getStructureRecord(selectedGene), [selectedGene]);
  const liveVars = useMemo(() => liveVariantsForGene(selectedGene), [selectedGene]);
  const geneSteps = useMemo(() => cascadeStepsForGene(selectedGene), [selectedGene]);

  const useGuidePane = (missionId === 5 || missionId === 6) && !!guide;

  const bg = isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-white text-slate-600';
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textBody = isDarkMode ? 'text-zinc-300' : 'text-slate-700';
  const textMuted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const border = isDarkMode ? 'border-zinc-800' : 'border-slate-200';

  return (
    <div className={`min-h-screen font-mono ${bg}`}>
      <ZetaNavbar />
      <div className="h-14" aria-hidden />

      <div className="relative min-h-[calc(100dvh-3.5rem)] flex flex-col">
        <div
          className={`absolute inset-0 pointer-events-none ${
            isDarkMode
              ? 'bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)]'
              : 'bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)]'
          } bg-[size:48px_48px]`}
          aria-hidden
        />

        {/* Header */}
        <header className={`relative z-10 shrink-0 border-b px-4 sm:px-6 py-3 ${border}`}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded border ${panel}`}>
                <Target className={`h-4 w-4 ${accent}`} aria-hidden />
              </div>
              <div className="min-w-0">
                <p className={`text-[9px] font-black uppercase tracking-[0.4em] ${accent}`}>
                  {INTERCEPTION_HERO.brand}
                </p>
                <h1 className={`text-sm sm:text-base font-black tracking-tight ${textMain}`}>
                  {INTERCEPTION_HERO.title}
                </h1>
                <p className={`mt-1 text-[11px] leading-relaxed ${textMuted}`}>
                  {INTERCEPTION_HERO.subtitle}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={HANDOFF_CTAS.primary.href}
                className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-[10px] font-black uppercase tracking-widest ${
                  isDarkMode
                    ? 'bg-cyan-500 text-zinc-950 hover:bg-cyan-400'
                    : 'bg-cyan-700 text-white hover:bg-cyan-800'
                }`}
              >
                {HANDOFF_CTAS.primary.label}
                <ArrowRight className="h-3 w-3" aria-hidden />
              </Link>
              <Link
                href={HANDOFF_CTAS.workspace.href}
                className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${textMuted} hover:opacity-80`}
              >
                <ChevronLeft className="h-3 w-3 rotate-180" aria-hidden />
                {HANDOFF_CTAS.workspace.label}
              </Link>
            </div>
          </div>
        </header>

        {/* Mission rail */}
        <nav
          className={`relative z-10 shrink-0 flex gap-1 overflow-x-auto border-b px-3 sm:px-6 py-2 ${border}`}
          aria-label="Interception mission stages"
        >
          {MISSION_STAGES.map((m) => {
            const on = m.id === missionId;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMissionId(m.id)}
                className={`shrink-0 rounded-sm border px-2.5 py-1.5 text-left transition-colors ${
                  on
                    ? isDarkMode
                      ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-100'
                      : 'border-indigo-400 bg-indigo-50 text-indigo-950'
                    : isDarkMode
                      ? 'border-zinc-800 text-zinc-500 hover:text-zinc-300'
                      : 'border-slate-200 text-slate-500 hover:text-slate-800'
                }`}
              >
                <span className="block text-[9px] font-black tracking-widest opacity-70">
                  {String(m.id).padStart(2, '0')}
                </span>
                <span className="block text-[10px] font-black uppercase tracking-wider max-w-[9rem] leading-tight">
                  {m.name}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Body */}
        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-0">
          {/* LEFT — explain */}
          <section className={`border-b lg:border-b-0 lg:border-r overflow-y-auto ${border}`}>
            <div className="px-4 sm:px-6 py-5 space-y-5">
              <div>
                <p className={`text-[10px] font-black uppercase tracking-[0.35em] ${accent}`}>
                  {String(mission.id).padStart(2, '0')} · {mission.name}
                </p>
                <p className={`mt-2 text-sm leading-relaxed ${textBody}`}>{mission.plain}</p>
              </div>

              {missionId === 1 && <BlindSpotFacts isDarkMode={isDarkMode} />}
              {(missionId === 2 || missionId === 3 || missionId === 4) && (
                <CascadeStepStrip
                  stepSlug={stepSlug}
                  onSelect={setStepSlug}
                  isDarkMode={isDarkMode}
                />
              )}
              {missionId === 2 && <StepBiology step={step} isDarkMode={isDarkMode} />}
              {missionId === 3 && <SignalsPanel isDarkMode={isDarkMode} />}
              {(missionId === 2 || missionId === 4 || missionId === 5) && (
                <GeneTable
                  step={step}
                  selectedGene={selectedGene}
                  onSelect={setSelectedGene}
                  isDarkMode={isDarkMode}
                />
              )}
              {missionId === 5 && (
                <GuideNote gene={selectedGene} guideId={guide?.guide_id ?? null} isDarkMode={isDarkMode} />
              )}
              {missionId === 6 && (
                <DoctrineNote hasGuide={!!guide} isDarkMode={isDarkMode} />
              )}
              {missionId === 7 && <HandoffPanel isDarkMode={isDarkMode} />}
            </div>
          </section>

          {/* RIGHT — structure */}
          <section className="overflow-y-auto">
            <div className="px-4 sm:px-6 py-5 space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className={`text-[10px] font-black uppercase tracking-[0.35em] ${accent}`}>
                    {useGuidePane ? 'Cohort B · guide:DNA' : 'Cohort A · protein fold'}
                  </p>
                  <h2 className={`mt-1 text-lg font-black tracking-tight ${textMain}`}>
                    {selectedGene}
                    {structure ? (
                      <span className={`ml-2 text-[11px] font-bold ${textMuted}`}>
                        {structure.uniprot} · {structure.aa}aa
                      </span>
                    ) : null}
                  </h2>
                </div>
                {useGuidePane && guide ? (
                  <span
                    className={`rounded border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${
                      guide.rna_dna_verdict === 'PASS'
                        ? 'border-[#75A025]/40 text-[#75A025]'
                        : 'border-red-500/40 text-red-300'
                    }`}
                  >
                    {guide.rna_dna_verdict}
                  </span>
                ) : null}
              </div>

              <p className={`text-[11px] leading-relaxed ${textMuted}`}>
                {explainGene(selectedGene, geneSteps, liveVars, structure?.source ?? null, useGuidePane)}
              </p>

              {useGuidePane && guide ? (
                <RnaDnaStructureViewer guideId={guide.guide_id} height={380} />
              ) : structure ? (
                <StructureViewer gene={selectedGene} height={380} />
              ) : (
                <div className={`rounded border px-3 py-6 text-[11px] ${panel} ${textMuted}`}>
                  No structure record for {selectedGene}.
                </div>
              )}

              {!useGuidePane && (missionId === 5 || missionId === 6) && !guide && (
                <p className={`text-[11px] ${textMuted}`}>
                  No AF3 guide:DNA fold in the 15-guide cohort for {selectedGene}. Showing protein
                  monomer. Guide genes with folds: BCL2, BRAF, CXCR4, ICAM1, MET, MMP2, TWIST1, VEGFA.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// ── Explain line (computed from receipts) ───────────────────────────────────

function explainGene(
  gene: string,
  steps: BrmStep[],
  liveVars: ReturnType<typeof liveVariantsForGene>,
  source: string | null,
  guideMode: boolean,
): string {
  const stepLabels = steps.map((s) => s.label).join(' · ') || 'not a primary on any BrM step';
  const parts: string[] = [];
  parts.push(`Cascade primary on: ${stepLabels}.`);
  if (gene === 'BACE1') {
    parts.push(
      `CRISPRa LFC ${BACE1.canonicalLfc} (${BACE1.citation}). ~${BACE1.brainVsLungFold}× brain vs lung enrichment. Absent from the ${MSKMET_BRM.nGenesWithScoredSnvs} mutated genes scored in ${MSKMET_BRM.nBrmSamples} MSK-MET BrM samples.`,
    );
  }
  if (liveVars.length) {
    const v = liveVars[0];
    parts.push(`Live Δll ${v.hgvs} = ${v.deltaLl} (${v.cohortSource}). ${v.note ?? ''}`.trim());
  }
  if (source) parts.push(`Structure source: ${source}.`);
  if (guideMode) parts.push('Right pane: AF3 RNA–DNA complex (guide + 60-bp duplex), not the protein monomer.');
  return parts.join(' ');
}

// ── Stage fragments ─────────────────────────────────────────────────────────

function BlindSpotFacts({ isDarkMode }: { isDarkMode: boolean }) {
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-slate-50 border-slate-200';
  const main = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {[
        { label: 'MSK-MET BrM samples', value: String(MSKMET_BRM.nBrmSamples), sub: 'DMETS_DX_CNS_BRAIN=Yes' },
        { label: 'Genes with scored SNVs', value: String(MSKMET_BRM.nGenesWithScoredSnvs), sub: 'BACE1 absent' },
        { label: 'BACE1 CRISPRa LFC', value: String(BACE1.canonicalLfc), sub: `~${BACE1.brainVsLungFold}× brain enrichment` },
      ].map((t) => (
        <div key={t.label} className={`rounded border px-3 py-2 ${panel}`}>
          <p className={`text-[9px] font-black uppercase tracking-widest ${muted}`}>{t.label}</p>
          <p className={`mt-1 text-xl font-black tabular-nums ${main}`}>{t.value}</p>
          <p className={`text-[10px] ${muted}`}>{t.sub}</p>
        </div>
      ))}
    </div>
  );
}

function CascadeStepStrip({
  stepSlug,
  onSelect,
  isDarkMode,
}: {
  stepSlug: BrmStep['slug'];
  onSelect: (s: BrmStep['slug']) => void;
  isDarkMode: boolean;
}) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-1" role="tablist" aria-label="BrM cascade steps">
      {BRM_STEPS.map((s) => {
        const on = s.slug === stepSlug;
        return (
          <button
            key={s.slug}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onSelect(s.slug)}
            className={`shrink-0 rounded-sm border px-2 py-1.5 text-left ${
              on
                ? isDarkMode
                  ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-100'
                  : 'border-indigo-400 bg-indigo-50 text-indigo-950'
                : isDarkMode
                  ? 'border-zinc-800 text-zinc-500'
                  : 'border-slate-200 text-slate-500'
            }`}
          >
            <span className="block text-[9px] font-black tracking-widest opacity-70">
              {String(s.n).padStart(2, '0')}
            </span>
            <span className="block text-[10px] font-black uppercase tracking-wider max-w-[7rem] leading-tight">
              {s.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function StepBiology({ step, isDarkMode }: { step: BrmStep; isDarkMode: boolean }) {
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const body = isDarkMode ? 'text-zinc-300' : 'text-slate-700';
  return (
    <div>
      <p className={`text-[9px] font-black uppercase tracking-widest ${muted}`}>Step biology</p>
      <p className={`mt-1 text-sm leading-relaxed ${body}`}>{step.narrative}</p>
      {step.bbbNote ? <p className={`mt-2 text-[11px] ${muted}`}>{step.bbbNote}</p> : null}
      <p className={`mt-2 text-[10px] ${muted}`}>
        Hard negatives: {step.negativeControls.join(', ')}
      </p>
    </div>
  );
}

function SignalsPanel({ isDarkMode }: { isDarkMode: boolean }) {
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-slate-50 border-slate-200';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const main = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const body = isDarkMode ? 'text-zinc-300' : 'text-slate-700';
  return (
    <div className="space-y-2">
      <p className={`text-[10px] font-mono ${muted}`}>
        TSG: {FORMULAS.compositeTsg}
        <br />
        ONC: {FORMULAS.compositeOnc}
        <br />
        Target-Lock BRAIN_MET weights: F={TL_WEIGHTS.BRAIN_MET.functionality} E=
        {TL_WEIGHTS.BRAIN_MET.essentiality} R={TL_WEIGHTS.BRAIN_MET.regulatory} C=
        {TL_WEIGHTS.BRAIN_MET.chromatin}
      </p>
      <div className="grid grid-cols-1 gap-2">
        {SIGNAL_CARDS.map((c) => (
          <div key={c.id} className={`rounded border px-3 py-2 ${panel}`}>
            <p className={`text-[10px] font-black uppercase tracking-widest ${main}`}>{c.label}</p>
            <p className={`mt-0.5 text-[10px] ${muted}`}>{c.formula}</p>
            <p className={`mt-1 text-[11px] leading-relaxed ${body}`}>{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GeneTable({
  step,
  selectedGene,
  onSelect,
  isDarkMode,
}: {
  step: BrmStep;
  selectedGene: string;
  onSelect: (g: string) => void;
  isDarkMode: boolean;
}) {
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const border = isDarkMode ? 'border-zinc-800' : 'border-slate-200';
  return (
    <div>
      <p className={`text-[9px] font-black uppercase tracking-widest mb-2 ${muted}`}>
        Primary genes · step {String(step.n).padStart(2, '0')}
      </p>
      <div className={`rounded border overflow-hidden divide-y ${border}`}>
        {step.primaryGenes.map((g) => {
          const on = g === selectedGene;
          const rec = getStructureRecord(g);
          const gGuide = getBestGuideForGene(g);
          return (
            <button
              key={g}
              type="button"
              onClick={() => onSelect(g)}
              className={`w-full flex flex-wrap items-center gap-2 px-3 py-2 text-left text-[11px] ${
                on
                  ? isDarkMode
                    ? 'bg-cyan-500/10 text-cyan-100'
                    : 'bg-indigo-50 text-indigo-950'
                  : isDarkMode
                    ? 'hover:bg-white/[0.03] text-zinc-300'
                    : 'hover:bg-slate-50 text-slate-800'
              }`}
            >
              <span className="font-black w-16">{g}</span>
              <span className={muted}>{rec ? `${rec.plddt != null ? `pLDDT ${rec.plddt.toFixed(1)}` : 'crystal'} · ${rec.source}` : 'no fold'}</span>
              {gGuide ? (
                <span className={`ml-auto text-[9px] font-black uppercase tracking-widest ${muted}`}>
                  AF3 {gGuide.rna_dna_verdict}
                </span>
              ) : (
                <span className={`ml-auto text-[9px] ${muted}`}>protein only</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GuideNote({
  gene,
  guideId,
  isDarkMode,
}: {
  gene: string;
  guideId: string | null;
  isDarkMode: boolean;
}) {
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const body = isDarkMode ? 'text-zinc-300' : 'text-slate-700';
  return (
    <div className={`text-[11px] leading-relaxed ${body}`}>
      <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${muted}`}>Assassin spine</p>
      <p className="font-mono text-[10px]">{FORMULAS.assassin}</p>
      <p className={`mt-2 ${muted}`}>
        {guideId
          ? `${gene} → guide ${guideId} (Cohort B mmCIF under /public/artifacts/structural_validation/).`
          : `${gene} has no guide in the 15-guide AF3 cohort. Protein fold remains available.`}
      </p>
    </div>
  );
}

function DoctrineNote({ hasGuide, isDarkMode }: { hasGuide: boolean; isDarkMode: boolean }) {
  const panel = isDarkMode ? 'border-amber-500/30 bg-amber-500/5 text-amber-100/90' : 'border-amber-300 bg-amber-50 text-amber-950';
  return (
    <div className={`rounded border px-3 py-2 text-[11px] leading-relaxed ${panel}`}>
      RNA–DNA doctrine: pLDDT ≥ 50, iPTM ≥ 0.30. Protein monomer cut (iPTM ≥ 0.50) applied to this
      cohort → 0/15 PASS. {hasGuide ? 'Showing selected gene guide:DNA fold.' : 'Select a guide gene (e.g. CXCR4, VEGFA) to load Cohort B.'}
    </div>
  );
}

function HandoffPanel({ isDarkMode }: { isDarkMode: boolean }) {
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const body = isDarkMode ? 'text-zinc-300' : 'text-slate-700';
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Link
          href={HANDOFF_CTAS.primary.href}
          className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-[10px] font-black uppercase tracking-widest ${
            isDarkMode ? 'bg-cyan-500 text-zinc-950' : 'bg-cyan-700 text-white'
          }`}
        >
          {HANDOFF_CTAS.primary.label}
          <ArrowRight className="h-3 w-3" />
        </Link>
        <Link
          href={HANDOFF_CTAS.workspace.href}
          className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${muted}`}
        >
          {HANDOFF_CTAS.workspace.label}
        </Link>
        <Link
          href={HANDOFF_CTAS.contact.href}
          className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${muted}`}
        >
          {HANDOFF_CTAS.contact.label}
        </Link>
      </div>
      <div>
        <p className={`text-[9px] font-black uppercase tracking-widest mb-2 ${muted}`}>Limits</p>
        <ul className={`space-y-1.5 text-[11px] leading-relaxed ${body}`}>
          {HANDOFF_LIMITS.map((l) => (
            <li key={l.slice(0, 40)} className="flex gap-2">
              <span className={muted}>·</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
