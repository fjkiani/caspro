'use client';

/**
 * TumorBoardTabSurface — /tumor-board/[patientId]/
 *
 * Decision surface for oncology rehearsal fixtures:
 * Case → Options → Gaps & evidence.
 * Product story: /products/tumor-board/.
 */

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';

import { useTheme } from '@/context/ThemeContext';
import { usePatient } from '@/context/PatientContext';
import { usePersona } from '@/context/PersonaContext';
import StructureViewer from '@/components/target-lock/structure/StructureViewer';
import {
  GENE_CONTEXT_SENTINEL,
  STRUCTURE_PANE_LABELS,
  STRUCTURE_VIEWER_HEIGHT,
  akStructureForGene,
  hasMbd4PairPane,
  hasStructureFold,
  isAkCasePatient,
  resolveStructureRecordForGene,
  resolveViewerCaption,
  resolveViewerGene,
} from '@/data/ak-case-structure';
import {
  TB_DEFAULT_TAB_FOR_PERSONA,
  TB_EMBED_CLASS,
  TB_ROUTES,
  TB_TOP_TABS,
  tbStripCopy,
  tbTabTermsForPatient,
  type TbTopTab,
} from '@/data/tumor-board/tb-surface-config';
import { getL5TwinForPatient } from '@/data/tumor-board/l5-case-registry';

import AKMutationPanel from './ak/AKMutationPanel';
import SLPathwayGrid from './ak/SLPathwayGrid';
import SLMatrixTable from './ak/SLMatrixTable';
import PARPFalsificationArc from './ak/PARPFalsificationArc';
import EvidenceAnchorTable from './ak/EvidenceAnchorTable';
import RecommendedDrugsPanel from './ak/RecommendedDrugsPanel';
import MissingTestsPanel from './ak/MissingTestsPanel';
import ProvenanceStack from './ak/ProvenanceStack';
import AkSlNetworkFigure from './ak/AkSlNetworkFigure';
import AkMbd4PairPane from './ak/AkMbd4PairPane';
import CrcAnchorEvidencePanel from './anchor/CrcAnchorEvidencePanel';
import BrmTargetLockPanel from './anchor/BrmTargetLockPanel';
import PatientTranslator from './PatientTranslator';

function ProteinPane({
  gene,
  isDarkMode,
  caption,
}: {
  gene: string;
  isDarkMode: boolean;
  caption: string;
}) {
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const panel = isDarkMode ? 'bg-zinc-950/40 border-zinc-800' : 'bg-white border-slate-200';
  const caseFold = resolveStructureRecordForGene(gene);
  const folded = Boolean(caseFold) || hasStructureFold(gene);
  const ak = akStructureForGene(gene);
  const eyebrow = !folded
    ? STRUCTURE_PANE_LABELS.noFold
    : caseFold
      ? STRUCTURE_PANE_LABELS.akCaseAf2
      : ak
        ? STRUCTURE_PANE_LABELS.akAfdbWt
        : STRUCTURE_PANE_LABELS.cohortA;

  return (
    <aside className={`rounded border p-4 sticky top-24 ${panel}`}>
      <p className={`text-[9px] font-black uppercase tracking-[0.35em] mb-1 ${accent}`}>{eyebrow}</p>
      <p className={`text-lg font-black tracking-tight mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        {gene}
        {ak ? <span className={`ml-2 text-[11px] font-bold ${muted}`}>{ak.variant}</span> : null}
      </p>
      {ak ? (
        <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${muted}`}>
          {ak.pathway} · {ak.pathwayState} · {ak.type}
        </p>
      ) : null}
      <p className={`text-[11px] leading-relaxed mb-3 ${muted}`}>{caption}</p>
      {folded ? (
        caseFold ? (
          <StructureViewer record={caseFold} height={STRUCTURE_VIEWER_HEIGHT} />
        ) : (
          <StructureViewer gene={gene} height={STRUCTURE_VIEWER_HEIGHT} />
        )
      ) : (
        <div
          className={`rounded border p-6 text-[11px] leading-relaxed ${
            isDarkMode ? 'border-zinc-800 text-zinc-500' : 'border-slate-200 text-slate-500'
          }`}
        >
          No structure model loaded for {gene} on this fixture.
        </div>
      )}
    </aside>
  );
}

function StructureAside({
  gene,
  isDarkMode,
  caption,
}: {
  gene: string;
  isDarkMode: boolean;
  caption: string;
}) {
  if (hasMbd4PairPane(gene)) return <AkMbd4PairPane />;
  return <ProteinPane gene={gene} isDarkMode={isDarkMode} caption={caption} />;
}


function SubTabs<T extends string>({
  tabs,
  value,
  onChange,
  isDarkMode,
}: {
  tabs: readonly { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
  isDarkMode: boolean;
}) {
  return (
    <div className="flex shrink-0 flex-wrap gap-2">
      {tabs.map(({ id, label }) => {
        const on = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`rounded border px-3 py-1.5 text-[10px] font-black uppercase tracking-widest ${
              on
                ? isDarkMode
                  ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300'
                  : 'border-indigo-400 bg-indigo-50 text-indigo-800'
                : isDarkMode
                  ? 'border-zinc-800 text-zinc-500 hover:text-zinc-200'
                  : 'border-slate-200 text-slate-500 hover:text-slate-800'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default function TumorBoardTabSurface() {
  const { isDarkMode } = useTheme();
  const patient = usePatient();
  const { persona } = usePersona();

  const [topTab, setTopTab] = useState<TbTopTab>(TB_DEFAULT_TAB_FOR_PERSONA[persona] ?? 'case');
  const [caseSub, setCaseSub] = useState<'drivers' | 'broken' | 'deps'>('drivers');
  const [optionsSub, setOptionsSub] = useState<'ranked' | 'discuss' | 'skip'>('ranked');
  const [gapsSub, setGapsSub] = useState<'missing' | 'evidence' | 'more'>('missing');
  const [caseGene, setCaseGene] = useState(
    () => patient.mutations[0]?.gene ?? GENE_CONTEXT_SENTINEL,
  );

  const mutationGenes = useMemo(
    () => patient.mutations.map((m) => m.gene),
    [patient.mutations],
  );

  useEffect(() => {
    setTopTab(TB_DEFAULT_TAB_FOR_PERSONA[persona]);
  }, [persona]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [topTab]);

  useEffect(() => {
    if (caseGene !== GENE_CONTEXT_SENTINEL && !mutationGenes.includes(caseGene)) {
      setCaseGene(mutationGenes[0] ?? GENE_CONTEXT_SENTINEL);
    }
  }, [mutationGenes, caseGene]);

  const topMeta = TB_TOP_TABS.find((t) => t.key === topTab);
  const hasCrcAnchor = Boolean(patient.anchorPanels?.crc);
  const hasBrmAnchor = Boolean(patient.anchorPanels?.brm);
  const driverChips = useMemo(
    () => Array.from(new Set(mutationGenes)).slice(0, 3).join(' / ') || '—',
    [mutationGenes],
  );
  const compPct = Math.round(patient.completeness.completenessScore * 100);
  const capPct = Math.round(patient.completeness.confidenceCap * 100);
  const isAkCase = isAkCasePatient(patient.meta.patientId);
  const l5Twin = getL5TwinForPatient(patient.meta.patientId);

  const foldGene = resolveViewerGene({
    selectedGene: caseGene,
    patientId: patient.meta.patientId,
    mutationGenes,
  });
  const caseCaption = resolveViewerCaption({
    selectedGene: caseGene,
    resolvedGene: foldGene,
  });

  const stripCopy = tbStripCopy(topTab, {
    compPct,
    capPct,
    driverChips,
    suggested: patient.suggestedTherapy?.value,
  });
  const glossaryIds = tbTabTermsForPatient(patient.meta.patientId, topTab);

  return (
    <div
      className={`flex h-full min-h-0 flex-col overflow-hidden font-mono ${
        isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-slate-50 text-slate-600'
      }`}
    >
      <header
        className={`shrink-0 border-b backdrop-blur-sm z-40 ${
          isDarkMode ? 'border-white/5 bg-black/40' : 'border-slate-200 bg-white/80'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link href={TB_ROUTES.picker} className="flex items-center gap-3 group shrink-0">
              <div
                className={`w-9 h-9 rounded border flex items-center justify-center transition-colors ${
                  isDarkMode
                    ? 'border-zinc-800 bg-zinc-950 group-hover:border-cyan-500/50'
                    : 'border-slate-200 bg-white group-hover:border-indigo-400'
                }`}
              >
                <ShieldCheck className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
              </div>
              <span
                className={`text-[11px] font-black uppercase tracking-[0.3em] transition-colors ${
                  isDarkMode
                    ? 'text-white group-hover:text-cyan-400'
                    : 'text-slate-900 group-hover:text-indigo-600'
                }`}
              >
                CrisPRO
              </span>
            </Link>
            <span className={`h-6 w-px shrink-0 ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'}`} />
            <div className="min-w-0">
              <div
                className={`text-base sm:text-lg font-black tracking-[0.2em] uppercase truncate ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                Tumor Board · {patient.meta.patientId}
              </div>
              <div
                className={`text-[10px] font-black uppercase tracking-widest mt-0.5 truncate ${
                  isDarkMode ? 'text-zinc-500' : 'text-slate-500'
                }`}
              >
                {isAkCase ? 'Board walk' : 'Research fixture'} ·{' '}
                {patient.tumorContext.subtype ?? patient.tumorContext.cancerType} · {driverChips}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {l5Twin ? (
              <Link
                href={l5Twin.href}
                className={`text-[10px] font-black uppercase tracking-widest transition-colors hidden sm:inline-flex items-center gap-2 ${
                  isDarkMode ? 'text-zinc-500 hover:text-cyan-400' : 'text-slate-500 hover:text-indigo-600'
                }`}
                title="E2E receipts (HTML) — not this board walk"
              >
                Receipts
                <ArrowRight className="w-3 h-3" />
              </Link>
            ) : null}
            <Link
              href={TB_ROUTES.product}
              className={`text-[10px] font-black uppercase tracking-widest transition-colors hidden sm:inline-flex items-center gap-2 ${
                isDarkMode ? 'text-zinc-500 hover:text-cyan-400' : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              Product
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href={TB_ROUTES.picker}
              className={`px-3 py-2 rounded-sm border text-[10px] font-black uppercase tracking-widest transition-colors ${
                isDarkMode
                  ? 'border-zinc-800 bg-zinc-900 text-cyan-400 hover:bg-zinc-800'
                  : 'border-slate-300 bg-white text-indigo-700 hover:bg-slate-100'
              }`}
            >
              Picker
            </Link>
          </div>
        </div>
      </header>

      <div
        className={`shrink-0 border-b ${
          isDarkMode ? 'border-white/5 bg-black/20' : 'border-slate-200 bg-white/40'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 flex overflow-x-auto scrollbar-hide">
          {TB_TOP_TABS.map((t) => {
            const isActive = t.key === topTab;
            const TabIcon = t.icon;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTopTab(t.key)}
                className={`relative flex items-center gap-2.5 px-4 py-3.5 border-r transition-all whitespace-nowrap ${
                  isDarkMode ? 'border-white/5' : 'border-slate-200'
                } ${
                  isActive
                    ? isDarkMode
                      ? 'bg-cyan-500/5 text-cyan-400'
                      : 'bg-indigo-50 text-indigo-700'
                    : isDarkMode
                      ? 'text-zinc-500 hover:text-white hover:bg-white/5'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <TabIcon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-widest">{t.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="tb-live-tab"
                    className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                      isDarkMode ? 'bg-cyan-500' : 'bg-indigo-600'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={`shrink-0 border-b ${
          isDarkMode ? 'border-white/5 bg-zinc-950/40' : 'border-slate-200 bg-white/60'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-3">
          <div className={`text-[12px] leading-relaxed max-w-3xl ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
            <span
              className={`font-black uppercase tracking-widest mr-3 ${
                isDarkMode ? 'text-cyan-400' : 'text-indigo-700'
              }`}
            >
              {topMeta?.label}
            </span>
            {stripCopy}
          </div>
        </div>
      </div>

      <main className={`mx-auto flex w-full max-w-[1600px] min-h-0 flex-1 flex-col px-4 py-4 sm:px-8 ${TB_EMBED_CLASS}`}>
        {persona === 'patient' && topTab === 'options' && glossaryIds.length > 0 ? (
          <div className="mb-3 shrink-0">
            <PatientTranslator termIds={glossaryIds} />
          </div>
        ) : null}

        <div key={topTab} className="flex min-h-0 flex-1 flex-col">
            {topTab === 'case' ? (
              <div className="flex h-full min-h-0 flex-col gap-3">
                <SubTabs
                  isDarkMode={isDarkMode}
                  value={caseSub}
                  onChange={setCaseSub}
                  tabs={[
                    { id: 'drivers', label: 'Drivers' },
                    { id: 'broken', label: 'Broken' },
                    { id: 'deps', label: 'Dependencies' },
                  ]}
                />
                <div className="min-h-0 flex-1 overflow-hidden">
                  {caseSub === 'drivers' ? (
                    <div className={`grid h-full min-h-0 gap-4 ${isAkCase ? 'lg:grid-cols-2' : ''}`}>
                      <div className="min-h-0 overflow-y-auto pr-1">
                        <AKMutationPanel
                          mode="inputs"
                          selectedGene={caseGene}
                          onSelectGene={setCaseGene}
                        />
                      </div>
                      {isAkCase ? (
                        <div className="min-h-0 overflow-hidden">
                          <StructureAside gene={foldGene} isDarkMode={isDarkMode} caption={caseCaption} />
                        </div>
                      ) : null}
                    </div>
                  ) : caseSub === 'broken' ? (
                    <SLPathwayGrid mode="broken" />
                  ) : (
                    <SLPathwayGrid mode="essential" />
                  )}
                </div>
              </div>
            ) : topTab === 'options' ? (
              <div className="mx-auto flex h-full min-h-0 w-full max-w-4xl flex-col gap-3">
                <SubTabs
                  isDarkMode={isDarkMode}
                  value={optionsSub}
                  onChange={setOptionsSub}
                  tabs={[
                    { id: 'ranked', label: 'Ranked' },
                    { id: 'discuss', label: 'Discuss' },
                    { id: 'skip', label: 'Skip' },
                  ]}
                />
                <div className="min-h-0 flex-1 overflow-hidden">
                  {optionsSub === 'ranked' ? (
                    <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden">
                      {isAkCase ? (
                        <div className="max-h-[28%] min-h-0 shrink-0 overflow-hidden">
                          <AkSlNetworkFigure />
                        </div>
                      ) : null}
                      <div className="min-h-0 flex-1 overflow-hidden">
                        <RecommendedDrugsPanel />
                      </div>
                      {patient.parpFalsification ? (
                        <div className="max-h-[30%] min-h-0 shrink-0 overflow-y-auto">
                          <PARPFalsificationArc />
                        </div>
                      ) : null}
                    </div>
                  ) : optionsSub === 'discuss' ? (
                    <SLMatrixTable mode="support" />
                  ) : (
                    <SLMatrixTable mode="ruleOut" />
                  )}
                </div>
              </div>
            ) : (
              <div className="mx-auto flex h-full min-h-0 w-full max-w-4xl flex-col gap-3">
                <SubTabs
                  isDarkMode={isDarkMode}
                  value={gapsSub}
                  onChange={setGapsSub}
                  tabs={[
                    { id: 'missing', label: 'Gaps' },
                    { id: 'evidence', label: 'Evidence' },
                    { id: 'more', label: 'More' },
                  ]}
                />
                <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                  {l5Twin ? (
                    <div
                      className={`mb-3 flex flex-wrap items-center gap-3 rounded border border-dashed px-3 py-2 ${
                        isDarkMode ? 'border-zinc-700' : 'border-slate-300'
                      }`}
                    >
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest ${
                          isDarkMode ? 'text-zinc-500' : 'text-slate-500'
                        }`}
                      >
                        Open
                      </span>
                      <Link
                        href={l5Twin.boardHref ?? TB_ROUTES.akBoard}
                        className={`text-[10px] font-black uppercase tracking-widest ${
                          isDarkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-indigo-700 hover:text-indigo-900'
                        }`}
                      >
                        Board walk →
                      </Link>
                      <Link
                        href={l5Twin.href}
                        className={`text-[10px] font-black uppercase tracking-widest ${
                          isDarkMode ? 'text-zinc-400 hover:text-cyan-400' : 'text-slate-600 hover:text-indigo-700'
                        }`}
                      >
                        E2E receipts →
                      </Link>
                    </div>
                  ) : null}
                  {gapsSub === 'missing' ? (
                    <MissingTestsPanel />
                  ) : gapsSub === 'evidence' ? (
                    <div className="space-y-4">
                      <EvidenceAnchorTable />
                      {hasCrcAnchor ? <CrcAnchorEvidencePanel /> : null}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {hasBrmAnchor ? <BrmTargetLockPanel /> : null}
                      <ProvenanceStack />
                      <Link
                        href={TB_ROUTES.contact}
                        className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${
                          isDarkMode
                            ? 'text-cyan-400 hover:text-cyan-300'
                            : 'text-indigo-700 hover:text-indigo-900'
                        }`}
                      >
                        Talk to us about a real case
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
      </main>

      <footer
        className={`shrink-0 border-t ${
          isDarkMode ? 'border-white/5 bg-black/40' : 'border-slate-200 bg-white/80'
        }`}
      >
        <div
          className={`max-w-[1600px] mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-[9px] font-black uppercase tracking-widest ${
            isDarkMode ? 'text-zinc-600' : 'text-slate-500'
          }`}
        >
          <span>
            Fixture {patient.meta.patientId} · completeness {compPct}% · RUO · research discussion only
          </span>
          <div className="flex items-center gap-4">
            {l5Twin ? (
              <>
                <Link
                  href={l5Twin.href}
                  className={isDarkMode ? 'hover:text-cyan-400' : 'hover:text-indigo-600'}
                >
                  Receipts
                </Link>
                <span className={`h-3 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'}`} />
              </>
            ) : null}
            <Link
              href={TB_ROUTES.product}
              className={isDarkMode ? 'hover:text-cyan-400' : 'hover:text-indigo-600'}
            >
              Product
            </Link>
            <span className={`h-3 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'}`} />
            <Link
              href={TB_ROUTES.contact}
              className={isDarkMode ? 'hover:text-cyan-400' : 'hover:text-indigo-600'}
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
