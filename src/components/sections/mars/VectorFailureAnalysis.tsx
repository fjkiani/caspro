'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import {
  ResponsiveContainer,
} from 'recharts';
import {
  buildDualGeometryRadarData,
  DualGeometryRadar,
  DualGeometryLegend,
} from '@/components/sections/mars/DualGeometryRadar';
import {
  Target,
  Binary,
  Info,
  Database,
  Cpu,
  Scale,
  Crosshair,
  ArrowRight,
} from 'lucide-react';
import {
  TrialCaseFile,
  TRIAL_CASE_FILES,
  HAND_AUTHORED_TRIAL_IDS,
} from '@/data/trial-case-files';
import { marsReadable } from '@/components/sections/mars/readable-text';
import { MoaGlyphStrip } from '@/components/sections/mars/MoaGlyphStrip';
import { isCosineGated, toneClasses } from '@/components/sections/mars/gated-values';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function buildRadarData(trial: TrialCaseFile) {
  return buildDualGeometryRadarData(trial);
}

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────

interface VectorFailureAnalysisProps {
  /** Which trial to render on mount — defaults to 'latify' */
  initialTrialId?: string;
  /** When true, hide trial switcher (used on /ledger/[slug] receipt pages) */
  singleTrialMode?: boolean;
  /** Hero/ledger preview — radar chart only; math + verdict live in GatedEvidencePanel */
  chartOnly?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export const VectorFailureAnalysis: React.FC<VectorFailureAnalysisProps> = ({
  initialTrialId = 'latify',
  singleTrialMode = false,
  chartOnly = false,
}) => {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [activeTrialId, setActiveTrialId] = useState(initialTrialId);
  const trial = TRIAL_CASE_FILES[activeTrialId] ?? TRIAL_CASE_FILES['latify'];
  const radarData = useMemo(() => buildRadarData(trial), [trial]);

  const panelClass = isDarkMode
    ? 'bg-zinc-950/40 border-zinc-900'
    : 'bg-white border-slate-300';
  const softPanelClass = isDarkMode
    ? 'bg-zinc-950 border-zinc-800'
    : 'bg-slate-50 border-slate-300';
  const headingClass = isDarkMode ? 'text-white' : 'text-slate-900';
  const { body: bodyClass, secondary: mutedClass, caption: subtleClass } = marsReadable(isDarkMode);
  const dividerClass = isDarkMode ? 'border-zinc-900' : 'border-slate-200';
  const responderStroke = isDarkMode ? '#10b981' : '#059669';
  const nonResponderStroke = isDarkMode ? '#f43f5e' : '#e11d48';
  const accentStroke = isDarkMode ? '#22d3ee' : '#0284c7';

  return (
    <div className="flex-1 flex flex-col font-mono p-1 relative overflow-hidden h-full">

      {/* Background Reticle */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${isDarkMode ? 'opacity-[0.03] text-cyan-400' : 'opacity-[0.04] text-slate-400'}`}>
        <div className="w-[70vw] h-[70vw] border border-current rounded-full" />
        <div className="absolute w-px h-full bg-current" />
        <div className="absolute h-px w-full bg-current" />
      </div>

      {/* Header */}
      {!chartOnly && (
      <header className="z-10 mb-6 flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start">
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded border flex items-center justify-center shadow-lg ${softPanelClass}`}>
            <Target className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? 'text-cyan-400' : 'text-sky-600'}`} />
          </div>
          <div className="min-w-0">
            <h2 className={`text-[11px] sm:text-[12px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] ${headingClass}`}>
              {trial.trialId} Failure: Mechanism alignment Analysis
            </h2>
            <p className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-widest mt-1 ${mutedClass}`}>
              Retrospective Failure Mapping // {trial.trialId}
            </p>
          </div>
        </div>

        {/* Trial Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto lg:justify-end">
          {!singleTrialMode &&
            HAND_AUTHORED_TRIAL_IDS.map((id) => {
              const t = TRIAL_CASE_FILES[id];
              const isActive = id === activeTrialId;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTrialId(id)}
                  className={`px-3 sm:px-5 py-2 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all border shrink-0 ${
                    isActive
                      ? (isDarkMode ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' : 'bg-sky-500/10 border-sky-500/40 text-sky-700')
                      : (isDarkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:text-zinc-100' : 'bg-white border-slate-300 text-slate-600 hover:text-slate-900')
                  }`}
                >
                  {t.id.toUpperCase()}
                </button>
              );
            })}
          <button
            type="button"
            onClick={() => router.push(`/ledger/${activeTrialId}/`)}
            className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded border text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all shadow-lg w-full sm:w-auto lg:ml-2 ${
              isDarkMode
                ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-black hover:shadow-cyan-500/20'
                : 'border-sky-500/40 bg-sky-500/10 text-sky-700 hover:bg-sky-600 hover:text-white hover:shadow-sky-500/20'
            }`}
          >
            OPEN FULL CASE FILE
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>
      )}

      {/* Main Grid */}
      <AnimatePresence mode="wait">
        <motion.main
          key={activeTrialId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`z-10 flex-1 grid grid-cols-1 min-h-0 ${chartOnly ? '' : 'lg:grid-cols-12 gap-6 lg:gap-8'}`}
        >

          {/* Left: 8D Radar Manifold */}
          <div className={`col-span-1 ${chartOnly ? '' : 'lg:col-span-8'} flex flex-col rounded p-4 sm:p-6 ${chartOnly ? 'p-2 sm:p-3' : 'lg:p-8'} shadow-2xl relative overflow-hidden border min-h-0 min-w-0 ${panelClass}`}>
            {/* Legend */}
            {!chartOnly && (
            <div className={`flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-6 border-b pb-4 ${dividerClass}`}>
              <span className={`text-[11px] sm:text-[12px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] ${headingClass}`}>
                Computational Vector Space
              </span>
              <DualGeometryLegend
                isDarkMode={isDarkMode}
                responderStroke={responderStroke}
                nonResponderStroke={nonResponderStroke}
              />
            </div>
            )}

            {/* Radar Chart */}
            <div className={`flex-1 relative w-full min-w-0 ${chartOnly ? 'min-h-[220px] sm:min-h-[300px]' : 'min-h-[280px] sm:min-h-[350px]'}`}>
              <ResponsiveContainer width="100%" height="100%">
                <DualGeometryRadar
                  data={radarData}
                  isDarkMode={isDarkMode}
                  responderStroke={responderStroke}
                  nonResponderStroke={nonResponderStroke}
                />
              </ResponsiveContainer>

              {!chartOnly && (
              <>
              <div className="absolute top-[15%] right-[15%] pointer-events-none">
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: responderStroke }}>RESPONDER</span>
              </div>
              {(() => {
                const rt = trial.publishedReadout ? toneClasses(trial.publishedReadout.tone) : toneClasses('gated');
                return (
                  <div className="absolute bottom-[35%] left-[10%] pointer-events-none text-center">
                    <p className={`text-[12px] font-black uppercase tracking-widest drop-shadow-lg ${headingClass}`}>{trial.publishedReadout?.headlineLabel ?? 'THE GAP:'}</p>
                    <p className={`text-[14px] font-black uppercase tracking-widest mt-1 ${rt.text}`}>{trial.publishedReadout?.headlineValue ?? `Δ ${trial.deltaImpact}`}</p>
                    <div className="w-full h-0.5 mt-2 opacity-50" style={{ backgroundColor: nonResponderStroke }} />
                  </div>
                );
              })()}
              {!isCosineGated(trial.cosineResponder) && (
                <div className={`absolute bottom-[20%] right-[20%] pointer-events-none border px-4 py-2 rounded-sm backdrop-blur-md ${
                  isDarkMode ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-emerald-50 border-emerald-300/80'
                }`}>
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: responderStroke }}>ALIGNMENT ZONE</span>
                  <p className={`text-[11px] font-black mt-1 uppercase ${headingClass}`}>Fit {trial.cosineResponder.toFixed(4)}</p>
                </div>
              )}
              </>
              )}
            </div>
          </div>

          {/* Right: Math + Verdict */}
          {!chartOnly && (
          <div className="col-span-1 lg:col-span-4 flex flex-col gap-6 min-w-0">

            {/* Mechanism fit summary — numeric surface only when cosines are not gated */}
            <div className={`p-6 border rounded shadow-2xl ${softPanelClass}`}>
              <div className={`flex items-center gap-3 mb-6 border-b pb-4 ${dividerClass}`}>
                <Binary className={`w-5 h-5 ${isDarkMode ? 'text-cyan-500' : 'text-sky-600'}`} />
                <span className={`text-[11px] font-black uppercase tracking-widest ${headingClass}`}>Mechanism Fit Summary</span>
              </div>

              {!isCosineGated(trial.cosineResponder) ? (
                <div className="space-y-6">
                  <p className={`text-[11px] leading-relaxed tracking-tight ${bodyClass}`}>
                    Engine alignment between the trial&apos;s mechanism profile and enrolled vs. responder signatures — scores are
                    retrospective outputs from the 8D manifold, not hand-tuned thresholds.
                  </p>

                  <div className={`space-y-4 pt-4 border-t ${dividerClass}`}>
                    <div className="flex justify-between items-center">
                      <span className={`text-[10px] font-bold uppercase ${subtleClass}`}>Responder signature</span>
                      <span className={`text-xl font-light ${headingClass}`}>{trial.cosineResponder.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-[10px] font-bold uppercase ${subtleClass}`}>ITT diluted</span>
                      <span className="text-xl font-light" style={{ color: nonResponderStroke }}>{trial.cosineITT.toFixed(4)}</span>
                    </div>
                    {(() => {
                      const rt = trial.publishedReadout ? toneClasses(trial.publishedReadout.tone) : toneClasses('negative');
                      return (
                        <div className={`flex justify-between items-center py-3 px-4 rounded border ${rt.chipBg}`}>
                          <span className={`text-[10px] font-black uppercase ${rt.chipText}`}>{trial.publishedReadout?.endpointLabel ?? 'Delta impact'}</span>
                          <span className={`text-xl font-black ${rt.chipText}`}>{trial.publishedReadout?.endpointValue ?? trial.deltaImpact}</span>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className={`text-[11px] leading-relaxed tracking-tight ${bodyClass}`}>
                    Numeric fit gated for this trial. Ranked directional mechanism deltas below (responder-lean vs. non-responder-lean).
                    Magnitudes shown as ordinal bands, not point estimates.
                  </p>
                  {trial.moaGlyphs && trial.moaGlyphs.length > 0 ? (
                    <MoaGlyphStrip rows={trial.moaGlyphs} isDarkMode={isDarkMode} />
                  ) : (
                    <p className={`text-[11px] font-black uppercase tracking-widest ${mutedClass}`}>Mechanism glyphs gated.</p>
                  )}
                  {trial.publishedReadout && (() => {
                    const rt = toneClasses(trial.publishedReadout.tone);
                    return (
                      <div className={`flex justify-between items-center py-3 px-4 rounded border ${rt.chipBg}`}>
                        <span className={`text-[10px] font-black uppercase ${rt.chipText}`}>{trial.publishedReadout.endpointLabel}</span>
                        <span className={`text-xl font-black ${rt.chipText}`}>{trial.publishedReadout.endpointValue}</span>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Failure Interpretation */}
            <div className={`flex-1 border rounded p-6 shadow-2xl ${panelClass}`}>
              <div className="flex items-center gap-3 mb-4">
                <Info className={`w-4 h-4 ${isDarkMode ? 'text-cyan-800' : 'text-slate-500'}`} />
                <span className={`text-[11px] font-black uppercase tracking-widest ${headingClass}`}>Failure Interpretation</span>
              </div>
              <p className={`text-[12px] leading-relaxed font-medium tracking-tight ${bodyClass}`}>
                {trial.rootCause.summary}
              </p>

              <div className="mt-6 space-y-3">
                <div className={`flex justify-between text-[10px] font-black border-b pb-2 ${dividerClass}`}>
                  <span className={`uppercase ${mutedClass}`}>Trials Scored</span>
                  <span className={`uppercase ${headingClass}`}>{trial.engineRun.trialsScored}</span>
                </div>
                <div className={`flex justify-between text-[10px] font-black border-b pb-2 ${dividerClass}`}>
                  <span className={`uppercase ${mutedClass}`}>Gates</span>
                  <span className="uppercase" style={{ color: responderStroke }}>{trial.gatesSummary}</span>
                </div>
                {(() => {
                  const vt = trial.verdict ? toneClasses(trial.verdict.tone) : toneClasses('negative');
                  return (
                    <div className={`flex justify-between text-[10px] font-black border-b pb-2 ${dividerClass}`}>
                      <span className={`uppercase ${mutedClass}`}>Verdict</span>
                      <span className={`uppercase font-black tracking-[0.2em] ${vt.text}`}>{trial.verdict?.label ?? 'ANALYSIS_PENDING'}</span>
                    </div>
                  );
                })()}
                <div className={`flex justify-between text-[10px] font-black border-b pb-2 ${dividerClass}`}>
                  <span className={`uppercase ${mutedClass}`}>Validation Tier</span>
                  <span className="uppercase" style={{ color: accentStroke }}>{trial.validationTier}</span>
                </div>
              </div>
            </div>
          </div>
          )}
        </motion.main>
      </AnimatePresence>

      {/* CTA Bar */}
      {!chartOnly && (
      <div className={`z-10 mt-6 flex items-center justify-between border-t pt-6 ${dividerClass}`}>
        <div className="flex items-center gap-8">
          <span className={`text-[10px] font-black uppercase tracking-widest ${mutedClass}`}>In Silico Failure Analyzer v1.4.2</span>
          <span className="text-lg font-light tracking-tighter leading-none" style={{ color: accentStroke }}>8D VECTOR ENGINE</span>
        </div>
        <button
          type="button"
          onClick={() => router.push(`/ledger/${activeTrialId}/`)}
          className={`flex items-center gap-3 px-8 py-3.5 rounded border-2 text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-lg group ${
            isDarkMode
              ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-black hover:shadow-cyan-500/30'
              : 'border-sky-600 bg-sky-600/10 text-sky-700 hover:bg-sky-600 hover:text-white hover:shadow-sky-500/30'
          }`}
        >
          View {trial.title}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      )}
    </div>
  );
};
