'use client';

/**
 * BM01 · evo2-e2e Target-Lock anchor panel.
 *
 * User-persona-first layout: plain-English "what CrisPRO does for this patient"
 * sits above the fold. Patient-specific variant scores show next (with BM01's
 * mutation highlighted). Score tables and validation metrics live in an audit
 * drawer, collapsed by default.
 *
 * SNAPSHOT-ONLY: numbers come from a build-time extraction of a real GPU run
 * (pipeline_results_20260328T070235Z.json, produced by crispro-evo2-v9 on
 * Modal A100). No live Modal call at render time.
 *
 * Theme-aware. Original was light-mode-only; every color class is now
 * conditional on isDarkMode.
 */
import { useState } from 'react';

import { BM01_EVO2_PANEL } from '@/data/tumor-board/anchor/bm01_evo2';
import { useTheme } from '@/context/ThemeContext';

type Panel = typeof BM01_EVO2_PANEL & {
  patientVariants: Array<any>;
  topTargetLock: Array<any>;
  validation: Array<any>;
  modalDeployments: Array<any>;
  provenance: Array<any>;
};

const stepLabel: Record<string, string> = {
  primary_tumor_escape: 'Escaping the breast primary',
  intravasation: 'Entering the bloodstream',
  circulation_survival: 'Surviving in circulation',
  bbb_transit: 'Crossing the blood-brain barrier',
  cns_colonization: 'Establishing brain micrometastases',
  brain_niche_adaptation: 'Adapting to brain tissue',
  brm_angiogenesis: 'Building brain blood supply',
};

function formatScore(n: number): string {
  return n.toFixed(3);
}

function formatDelta(n: number): string {
  const s = n.toFixed(3);
  return n >= 0 ? `+${s}` : s;
}

export default function BrmTargetLockPanel() {
  const panel = BM01_EVO2_PANEL as Panel;
  const [showAudit, setShowAudit] = useState(false);
  const { isDarkMode } = useTheme();

  const patientMatched = panel.patientVariants.filter((v: any) => v.patientMatch);
  const patientContext = panel.patientVariants.filter((v: any) => !v.patientMatch);

  const shell = isDarkMode
    ? 'border-white/10 bg-white/[0.02] text-white'
    : 'border-gray-200 bg-white text-gray-900';
  const eyebrow = isDarkMode ? 'text-purple-300' : 'text-purple-700';
  const heading = isDarkMode ? 'text-white' : 'text-gray-900';
  const snapshotChip = isDarkMode
    ? 'bg-purple-500/10 text-purple-200'
    : 'bg-purple-50 text-purple-700';
  const bodyText = isDarkMode ? 'text-white/85' : 'text-gray-800';
  const emph     = isDarkMode ? 'text-white' : 'text-gray-900';

  const matchedBox = isDarkMode
    ? 'border-purple-400/40 bg-purple-500/[0.08]'
    : 'border-purple-200 bg-purple-50';
  const matchedHead = isDarkMode ? 'text-purple-200' : 'text-purple-900';
  const matchedCard = isDarkMode
    ? 'border-purple-400/30 bg-black/30'
    : 'border-purple-100 bg-white';
  const matchedText = isDarkMode ? 'text-white' : 'text-gray-900';
  const matchedNote = isDarkMode ? 'text-white/70' : 'text-gray-600';
  const stepChip    = isDarkMode
    ? 'bg-purple-500/20 text-purple-200'
    : 'bg-purple-100 text-purple-800';

  const contextBox  = isDarkMode
    ? 'border-white/10 bg-white/[0.02]'
    : 'border-gray-200 bg-gray-50';
  const contextHead = isDarkMode ? 'text-white/80' : 'text-gray-800';
  const contextRow  = isDarkMode
    ? 'border-white/10 bg-black/30 text-white/85'
    : 'border-gray-200 bg-white text-gray-900';

  const auditBorder = isDarkMode ? 'border-white/10' : 'border-gray-100';
  const auditBtn = isDarkMode
    ? 'text-white/60 hover:text-white'
    : 'text-gray-600 hover:text-gray-900';

  const tableBorder = isDarkMode ? 'border-white/10' : 'border-gray-100';
  const tableHead   = isDarkMode
    ? 'bg-black/40 text-white/60'
    : 'bg-gray-50 text-gray-600';
  const tableBody   = isDarkMode
    ? 'divide-white/10 bg-transparent text-white/85'
    : 'divide-gray-100 bg-white text-gray-900';
  const dimRow      = isDarkMode ? 'text-white/40' : 'text-gray-400';
  const driverBadge = isDarkMode
    ? 'bg-emerald-500/20 text-emerald-200'
    : 'bg-emerald-100 text-emerald-800';
  const hnBadge     = isDarkMode
    ? 'bg-white/10 text-white/60'
    : 'bg-gray-100 text-gray-600';

  const infoCard    = isDarkMode
    ? 'border-white/10 bg-black/30 text-white/85'
    : 'border-gray-100 bg-white text-gray-700';
  const infoHead    = isDarkMode ? 'text-white/60' : 'text-gray-600';

  const provenanceCard = isDarkMode
    ? 'border-white/10 bg-black/30'
    : 'border-gray-100 bg-white';
  const provenanceHead = isDarkMode ? 'text-white/50' : 'text-gray-500';
  const provenanceRepo = isDarkMode
    ? 'bg-white/10 text-white/70'
    : 'bg-gray-100 text-gray-700';
  const provenanceText = isDarkMode ? 'text-white/70' : 'text-gray-700';
  const provenanceRole = isDarkMode ? 'text-white/50' : 'text-gray-500';

  const deltaChipPositive = isDarkMode
    ? 'bg-white/10 text-white/70'
    : 'bg-gray-100 text-gray-700';
  const deltaChipNegative = isDarkMode
    ? 'bg-rose-500/20 text-rose-200'
    : 'bg-red-50 text-red-800';

  return (
    <section
      aria-label="evo2-e2e Target-Lock anchor evidence for BM01"
      className={`rounded-2xl border p-4 shadow-sm md:p-6 ${shell}`}
    >
      <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className={`text-xs font-medium uppercase tracking-wide ${eyebrow}`}>
            CrisPRO · Brain-metastasis Target-Lock pipeline
          </div>
          <h2 className={`mt-1 text-xl font-semibold ${heading}`}>
            What Evo2 already scored for this patient
          </h2>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${snapshotChip}`}>
          Snapshot · seed {panel.runInfo.seed} · {panel.runInfo.timestamp}
        </span>
      </header>

      <div className="mb-6 space-y-3">
        <p className={`text-base leading-relaxed ${bodyText}`}>{panel.plainSummary}</p>
        <p className={`text-base leading-relaxed ${bodyText}`}>
          <span className={`font-medium ${emph}`}>For BM01 specifically: </span>
          {panel.patientRelevance}
        </p>
      </div>

      {patientMatched.length > 0 ? (
        <div className={`mb-4 rounded-lg border-2 p-4 ${matchedBox}`}>
          <div className={`mb-3 text-sm font-semibold ${matchedHead}`}>
            BM01&rsquo;s own mutation scored by Evo2
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {patientMatched.map((v: any, i: number) => (
              <article key={i} className={`rounded border p-3 ${matchedCard}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`text-base font-mono font-semibold ${matchedText}`}>
                    {v.gene} {v.hgvsP}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      v.deltaLL < 0 ? deltaChipNegative : deltaChipPositive
                    }`}
                  >
                    delta-LL {formatDelta(v.deltaLL)}
                  </span>
                </div>
                <div className={`mt-2 text-xs ${matchedNote}`}>
                  {v.interpretation || 'See evo2-e2e brm_clinical_variants.json'}
                </div>
                {v.relatedSteps.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {v.relatedSteps.map((s: string) => (
                      <span
                        key={s}
                        className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${stepChip}`}
                      >
                        {stepLabel[s] ?? s}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {patientContext.length > 0 ? (
        <div className={`mb-4 rounded-lg border p-4 ${contextBox}`}>
          <div className={`mb-2 text-sm font-semibold ${contextHead}`}>
            Contextual variants scored by the same pipeline
          </div>
          <ul className="grid gap-2 md:grid-cols-2">
            {patientContext.slice(0, 6).map((v: any, i: number) => (
              <li
                key={i}
                className={`flex items-center justify-between rounded border p-2 text-sm ${contextRow}`}
              >
                <span className="font-mono">
                  {v.gene} {v.hgvsP}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    v.deltaLL < 0 ? deltaChipNegative : deltaChipPositive
                  }`}
                >
                  {formatDelta(v.deltaLL)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className={`mt-6 border-t pt-4 ${auditBorder}`}>
        <button
          type="button"
          onClick={() => setShowAudit((s) => !s)}
          className={`text-xs font-medium ${auditBtn}`}
          aria-expanded={showAudit}
        >
          {showAudit ? '▾' : '▸'} Pipeline audit drawer &mdash; {panel.topTargetLock.length} target-lock rows, {panel.validation.length} step-level validation metrics
        </button>
        {showAudit ? (
          <div className="mt-3 space-y-4">
            <div className={`overflow-x-auto rounded border ${tableBorder}`}>
              <table className="min-w-full divide-y divide-inherit text-xs">
                <thead className={tableHead}>
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold uppercase tracking-wide">Gene</th>
                    <th className="px-3 py-2 text-left font-semibold uppercase tracking-wide">BrM step</th>
                    <th className="px-3 py-2 text-right font-semibold uppercase tracking-wide">Target-Lock</th>
                    <th className="px-3 py-2 text-right font-semibold uppercase tracking-wide">Calibrated</th>
                    <th className="px-3 py-2 text-center font-semibold uppercase tracking-wide">Label</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${tableBody}`}>
                  {panel.topTargetLock.map((r: any, i: number) => (
                    <tr key={i} className={r.label ? '' : dimRow}>
                      <td className="px-3 py-1.5 font-mono">{r.gene}</td>
                      <td className="px-3 py-1.5">{stepLabel[r.step] ?? r.step}</td>
                      <td className="px-3 py-1.5 text-right font-mono">{formatScore(r.targetLockScore)}</td>
                      <td className="px-3 py-1.5 text-right font-mono">{formatScore(r.calibratedScore)}</td>
                      <td className="px-3 py-1.5 text-center">
                        {r.label ? (
                          <span className={`rounded px-1.5 ${driverBadge}`}>driver</span>
                        ) : (
                          <span className={`rounded px-1.5 ${hnBadge}`}>hard-negative</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`overflow-x-auto rounded border ${tableBorder}`}>
              <table className="min-w-full divide-y divide-inherit text-xs">
                <thead className={tableHead}>
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold uppercase tracking-wide">BrM step</th>
                    <th className="px-3 py-2 text-right font-semibold uppercase tracking-wide">AUROC</th>
                    <th className="px-3 py-2 text-right font-semibold uppercase tracking-wide">AUPRC</th>
                    <th className="px-3 py-2 text-right font-semibold uppercase tracking-wide">P@3</th>
                    <th className="px-3 py-2 text-right font-semibold uppercase tracking-wide">
                      n<sub>pos</sub> / n<sub>total</sub>
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${tableBody}`}>
                  {panel.validation.map((v: any) => (
                    <tr key={v.step}>
                      <td className="px-3 py-1.5">{stepLabel[v.step] ?? v.step}</td>
                      <td className="px-3 py-1.5 text-right font-mono">{v.auroc.toFixed(3)}</td>
                      <td className="px-3 py-1.5 text-right font-mono">{v.auprc.toFixed(3)}</td>
                      <td className="px-3 py-1.5 text-right font-mono">{v.precisionAt3.toFixed(2)}</td>
                      <td className="px-3 py-1.5 text-right font-mono">
                        {v.nPos} / {v.nTotal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className={`rounded border p-3 text-xs ${infoCard}`}>
                <div className={`font-semibold uppercase tracking-wide ${infoHead}`}>Run info</div>
                <ul className="mt-2 space-y-1">
                  <li>Disease: {panel.runInfo.disease}</li>
                  <li>Seed: {panel.runInfo.seed}</li>
                  <li>Timestamp: {panel.runInfo.timestamp}</li>
                  <li>
                    Genes: {panel.runInfo.nGenes} ({panel.runInfo.nPositives} positives /{' '}
                    {panel.runInfo.nNegatives} hard-negatives)
                  </li>
                  <li>Elapsed: {panel.runInfo.elapsedSeconds.toFixed(1)} s</li>
                  <li>
                    Enformer: {panel.runInfo.useEnformer ? 'enabled' : 'disabled'} · Fast-mode:{' '}
                    {panel.runInfo.fastMode ? 'yes' : 'no'}
                  </li>
                </ul>
              </div>
              <div className={`rounded border p-3 text-xs ${infoCard}`}>
                <div className={`font-semibold uppercase tracking-wide ${infoHead}`}>
                  Modal deployments
                </div>
                <ul className="mt-2 space-y-1">
                  {panel.modalDeployments.map((m: any, i: number) => (
                    <li key={i}>
                      <span className="font-mono">{m.app}</span> · {m.service} · GPU {m.gpu} ·{' '}
                      <span
                        className={
                          m.status === 'LIVE'
                            ? isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
                            : isDarkMode ? 'text-white/40' : 'text-gray-500'
                        }
                      >
                        {m.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={`rounded border p-3 ${provenanceCard}`}>
              <div className={`text-xs font-semibold uppercase tracking-wide ${provenanceHead}`}>
                Panel provenance
              </div>
              <ul className={`mt-2 space-y-1 text-xs ${provenanceText}`}>
                {panel.provenance.map((p: any, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      className={`rounded px-1 py-0.5 text-[10px] font-medium ${provenanceRepo}`}
                    >
                      {p.repo}
                    </span>
                    <code className="min-w-0 flex-1 truncate">{p.sourcePath}</code>
                    {p.fileRole ? (
                      <span className={provenanceRole}>{p.fileRole}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
