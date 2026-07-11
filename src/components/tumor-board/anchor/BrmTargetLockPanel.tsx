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
 */
import { useState } from 'react';

import { BM01_EVO2_PANEL } from '@/data/tumor-board/anchor/bm01_evo2';

type Panel = typeof BM01_EVO2_PANEL & {
  patientVariants: Array<any>;
  topTargetLock: Array<any>;
  validation: Array<any>;
  modalDeployments: Array<any>;
  provenance: Array<any>;
};

// Plain-English step labels so the persona doesn't have to decode
// pipeline internals to skim the table.
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
  const patientMatched = panel.patientVariants.filter((v: any) => v.patientMatch);
  const patientContext = panel.patientVariants.filter((v: any) => !v.patientMatch);

  return (
    <section
      aria-label="evo2-e2e Target-Lock anchor evidence for BM01"
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <header className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-purple-700">
            CrisPRO · Brain-metastasis Target-Lock pipeline
          </div>
          <h2 className="mt-1 text-xl font-semibold text-gray-900">
            What Evo2 already scored for this patient
          </h2>
        </div>
        <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
          Snapshot · seed {panel.runInfo.seed} · {panel.runInfo.timestamp}
        </span>
      </header>

      {/* Above-the-fold plain-English narrative — the user amendment */}
      <div className="mb-6 space-y-3">
        <p className="text-base leading-relaxed text-gray-800">{panel.plainSummary}</p>
        <p className="text-base leading-relaxed text-gray-800">
          <span className="font-medium text-gray-900">For BM01 specifically: </span>
          {panel.patientRelevance}
        </p>
      </div>

      {/* Patient-specific variant highlight — this is the "money shot" */}
      {patientMatched.length > 0 ? (
        <div className="mb-4 rounded-lg border-2 border-purple-200 bg-purple-50 p-4">
          <div className="mb-3 text-sm font-semibold text-purple-900">
            BM01&rsquo;s own mutation scored by Evo2
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {patientMatched.map((v: any, i: number) => (
              <article key={i} className="rounded border border-purple-100 bg-white p-3">
                <div className="flex items-center justify-between">
                  <span className="text-base font-mono font-semibold text-gray-900">
                    {v.gene} {v.hgvsP}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      v.deltaLL < 0
                        ? 'bg-red-50 text-red-800'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    delta-LL {formatDelta(v.deltaLL)}
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  {v.interpretation || 'See evo2-e2e brm_clinical_variants.json'}
                </div>
                {v.relatedSteps.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {v.relatedSteps.map((s: string) => (
                      <span
                        key={s}
                        className="rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-medium text-purple-800"
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

      {/* Context variants — not on BM01's chart, but scored for the BrM population */}
      {patientContext.length > 0 ? (
        <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="mb-2 text-sm font-semibold text-gray-800">
            Contextual variants scored by the same pipeline
          </div>
          <ul className="grid gap-2 md:grid-cols-2">
            {patientContext.slice(0, 6).map((v: any, i: number) => (
              <li key={i} className="flex items-center justify-between rounded border border-gray-200 bg-white p-2 text-sm">
                <span className="font-mono text-gray-800">
                  {v.gene} {v.hgvsP}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    v.deltaLL < 0 ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {formatDelta(v.deltaLL)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Audit drawer — collapsed by default */}
      <div className="mt-6 border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={() => setShowAudit((s) => !s)}
          className="text-xs font-medium text-gray-600 hover:text-gray-900"
          aria-expanded={showAudit}
        >
          {showAudit ? '▾' : '▸'} Pipeline audit drawer &mdash; {panel.topTargetLock.length} target-lock rows, {panel.validation.length} step-level validation metrics
        </button>
        {showAudit ? (
          <div className="mt-3 space-y-4">
            {/* Top target-lock rows across 7 BrM steps */}
            <div className="overflow-x-auto rounded border border-gray-100">
              <table className="min-w-full divide-y divide-gray-100 text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold uppercase tracking-wide text-gray-600">Gene</th>
                    <th className="px-3 py-2 text-left font-semibold uppercase tracking-wide text-gray-600">BrM step</th>
                    <th className="px-3 py-2 text-right font-semibold uppercase tracking-wide text-gray-600">Target-Lock</th>
                    <th className="px-3 py-2 text-right font-semibold uppercase tracking-wide text-gray-600">Calibrated</th>
                    <th className="px-3 py-2 text-center font-semibold uppercase tracking-wide text-gray-600">Label</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {panel.topTargetLock.map((r: any, i: number) => (
                    <tr key={i} className={r.label ? '' : 'text-gray-400'}>
                      <td className="px-3 py-1.5 font-mono">{r.gene}</td>
                      <td className="px-3 py-1.5">{stepLabel[r.step] ?? r.step}</td>
                      <td className="px-3 py-1.5 text-right font-mono">{formatScore(r.targetLockScore)}</td>
                      <td className="px-3 py-1.5 text-right font-mono">{formatScore(r.calibratedScore)}</td>
                      <td className="px-3 py-1.5 text-center">
                        {r.label ? (
                          <span className="rounded bg-emerald-100 px-1.5 text-emerald-800">driver</span>
                        ) : (
                          <span className="rounded bg-gray-100 px-1.5 text-gray-600">hard-negative</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Validation metrics per BrM step */}
            <div className="overflow-x-auto rounded border border-gray-100">
              <table className="min-w-full divide-y divide-gray-100 text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold uppercase tracking-wide text-gray-600">BrM step</th>
                    <th className="px-3 py-2 text-right font-semibold uppercase tracking-wide text-gray-600">AUROC</th>
                    <th className="px-3 py-2 text-right font-semibold uppercase tracking-wide text-gray-600">AUPRC</th>
                    <th className="px-3 py-2 text-right font-semibold uppercase tracking-wide text-gray-600">P@3</th>
                    <th className="px-3 py-2 text-right font-semibold uppercase tracking-wide text-gray-600">n<sub>pos</sub> / n<sub>total</sub></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
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

            {/* Run info + Modal deployments footer */}
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded border border-gray-100 bg-white p-3 text-xs">
                <div className="font-semibold uppercase tracking-wide text-gray-600">Run info</div>
                <ul className="mt-2 space-y-1 text-gray-700">
                  <li>Disease: {panel.runInfo.disease}</li>
                  <li>Seed: {panel.runInfo.seed}</li>
                  <li>Timestamp: {panel.runInfo.timestamp}</li>
                  <li>
                    Genes: {panel.runInfo.nGenes} ({panel.runInfo.nPositives} positives / {panel.runInfo.nNegatives} hard-negatives)
                  </li>
                  <li>Elapsed: {panel.runInfo.elapsedSeconds.toFixed(1)} s</li>
                  <li>
                    Enformer: {panel.runInfo.useEnformer ? 'enabled' : 'disabled'} · Fast-mode: {panel.runInfo.fastMode ? 'yes' : 'no'}
                  </li>
                </ul>
              </div>
              <div className="rounded border border-gray-100 bg-white p-3 text-xs">
                <div className="font-semibold uppercase tracking-wide text-gray-600">Modal deployments</div>
                <ul className="mt-2 space-y-1 text-gray-700">
                  {panel.modalDeployments.map((m: any, i: number) => (
                    <li key={i}>
                      <span className="font-mono">{m.app}</span> · {m.service} · GPU {m.gpu} ·{' '}
                      <span className={m.status === 'LIVE' ? 'text-emerald-700' : 'text-gray-500'}>{m.status}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded border border-gray-100 bg-white p-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Panel provenance
              </div>
              <ul className="mt-2 space-y-1 text-xs text-gray-700">
                {panel.provenance.map((p: any, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="rounded bg-gray-100 px-1 py-0.5 text-[10px] font-medium text-gray-700">
                      {p.repo}
                    </span>
                    <code className="min-w-0 flex-1 truncate">{p.sourcePath}</code>
                    {p.fileRole ? (
                      <span className="text-gray-500">{p.fileRole}</span>
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
