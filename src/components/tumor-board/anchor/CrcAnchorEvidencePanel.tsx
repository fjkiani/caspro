'use client';

/**
 * CRC01 · Brenus anchor evidence panel.
 *
 * User-persona-first layout: plain-English "what CrisPRO does for this patient"
 * sits above the fold. The trial-decode table and admissibility claims live
 * below, collapsed by default. Every field carries its source path back into
 * the Brenus repository so a reader can open the committed file that produced
 * it.
 *
 * SNAPSHOT-ONLY: numbers come from a build-time extraction of committed
 * Brenus artifacts; no live agent calls at render time.
 */
import { useState } from 'react';

import { CRC01_BRENUS_PANEL } from '@/data/tumor-board/anchor/crc01_brenus';

// Loosen the type at the module boundary — anchor-panel-types.ts is the source
// of truth for shape, and the extraction script guarantees it.
type Panel = typeof CRC01_BRENUS_PANEL & {
  trials: Array<any>;
  claims: Array<any>;
  provenance: Array<any>;
};

const admissibilityStyle: Record<string, string> = {
  'T1-SCI': 'bg-emerald-50 text-emerald-800 border-emerald-200',
  'T1-CORP': 'bg-blue-50 text-blue-800 border-blue-200',
  T2: 'bg-amber-50 text-amber-800 border-amber-200',
  T3: 'bg-gray-50 text-gray-700 border-gray-200',
};

export default function CrcAnchorEvidencePanel() {
  const panel = CRC01_BRENUS_PANEL as Panel;
  const [showAudit, setShowAudit] = useState(false);

  return (
    <section
      aria-label="Brenus anchor evidence for CRC01"
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <header className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-blue-700">
            CrisPRO · Trial evidence from the Brenus engagement library
          </div>
          <h2 className="mt-1 text-xl font-semibold text-gray-900">
            What we&rsquo;ve pulled for this patient
          </h2>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          Snapshot · {panel.trials.length} trials · {panel.claims.length} evidence claims
        </span>
      </header>

      {/* Above-the-fold plain-English narrative — the user amendment */}
      <div className="mb-6 space-y-3">
        <p className="text-base leading-relaxed text-gray-800">{panel.plainSummary}</p>
        <p className="text-base leading-relaxed text-gray-800">
          <span className="font-medium text-gray-900">For CRC01 specifically: </span>
          {panel.patientRelevance}
        </p>
      </div>

      {/* Trial cards — always visible, but visually compact so the eye stays on the narrative */}
      <div className="grid gap-3 md:grid-cols-2">
        {panel.trials.map((t: any) => (
          <article
            key={t.nctId}
            className="rounded-lg border border-gray-200 bg-gray-50 p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm font-semibold text-gray-900">{t.trialName}</div>
              <a
                href={`https://clinicaltrials.gov/study/${t.nctId}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium text-blue-700 hover:underline"
              >
                {t.nctId}
              </a>
            </div>
            <div className="mt-1 text-xs uppercase tracking-wide text-gray-500">
              {t.phase} · {t.line} · {t.cancerType}
            </div>
            <div className="mt-3 text-sm text-gray-800">{t.primaryResult}</div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800">
                {t.status}
              </span>
              <span className="rounded-full border border-gray-300 bg-white px-2 py-0.5 text-xs text-gray-700">
                Verified by Brenus: {t.dataStatus}
              </span>
            </div>
            <div className="mt-3 text-xs italic text-gray-600">
              Why it&rsquo;s here: {t.whyAppendix}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
        <p className="text-sm leading-relaxed text-blue-900">
          <span className="font-medium">Adjacent engagement context: </span>
          {panel.adjacentEngagementNote}
        </p>
      </div>

      {/* Audit drawer — collapsed by default. Users who want to trace the numbers can expand it. */}
      <div className="mt-6 border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={() => setShowAudit((s) => !s)}
          className="text-xs font-medium text-gray-600 hover:text-gray-900"
          aria-expanded={showAudit}
        >
          {showAudit ? '▾' : '▸'} Audit drawer &mdash; {panel.claims.length} tagged claims, {panel.provenance.length} source files
        </button>
        {showAudit ? (
          <div className="mt-3 space-y-3">
            <ul className="space-y-2">
              {panel.claims.map((c: any, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded border border-gray-100 bg-gray-50 p-3"
                >
                  <span
                    className={`shrink-0 rounded border px-2 py-0.5 text-[10px] font-semibold uppercase ${
                      admissibilityStyle[c.admissibility] ?? admissibilityStyle.T3
                    }`}
                  >
                    {c.admissibility}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-gray-900">{c.claim}</div>
                    <div className="mt-1 text-xs text-gray-500">
                      Source: <code className="rounded bg-white px-1">{c.source.sourcePath}</code>
                      {c.verified ? ' · verified' : ' · unverified'}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
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
                    <code className="min-w-0 flex-1 truncate text-gray-700">{p.sourcePath}</code>
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
