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
 *
 * Theme-aware. This panel was originally light-mode-only (bg-white, text-gray)
 * and would render as white-on-black in dark contexts; every color class is
 * now conditional on isDarkMode.
 */
import { useState } from 'react';

import { CRC01_BRENUS_PANEL } from '@/data/tumor-board/anchor/crc01_brenus';
import { useTheme } from '@/context/ThemeContext';

type Panel = typeof CRC01_BRENUS_PANEL & {
  trials: Array<any>;
  claims: Array<any>;
  provenance: Array<any>;
};

const admissibilityStyleLight: Record<string, string> = {
  'T1-SCI': 'bg-emerald-50 text-emerald-800 border-emerald-200',
  'T1-CORP': 'bg-blue-50 text-blue-800 border-blue-200',
  T2: 'bg-amber-50 text-amber-800 border-amber-200',
  T3: 'bg-gray-50 text-gray-700 border-gray-200',
};

const admissibilityStyleDark: Record<string, string> = {
  'T1-SCI': 'bg-emerald-500/10 text-emerald-200 border-emerald-400/40',
  'T1-CORP': 'bg-blue-500/10 text-blue-200 border-blue-400/40',
  T2: 'bg-amber-500/10 text-amber-200 border-amber-400/40',
  T3: 'bg-white/[0.04] text-white/70 border-white/10',
};

export default function CrcAnchorEvidencePanel() {
  const panel = CRC01_BRENUS_PANEL as Panel;
  const [showAudit, setShowAudit] = useState(false);
  const { isDarkMode } = useTheme();

  const shell = isDarkMode
    ? 'border-white/10 bg-white/[0.02] text-white'
    : 'border-gray-200 bg-white text-gray-900';
  const eyebrow = isDarkMode ? 'text-cyan-300' : 'text-blue-700';
  const heading = isDarkMode ? 'text-white' : 'text-gray-900';
  const snapshotChip = isDarkMode
    ? 'bg-cyan-500/10 text-cyan-200'
    : 'bg-blue-50 text-blue-700';
  const bodyText = isDarkMode ? 'text-white/85' : 'text-gray-800';
  const emphText = isDarkMode ? 'text-white' : 'text-gray-900';
  const trialCard = isDarkMode
    ? 'border-white/10 bg-black/30'
    : 'border-gray-200 bg-gray-50';
  const trialCap = isDarkMode ? 'text-white/50' : 'text-gray-500';
  const trialBody = isDarkMode ? 'text-white/80' : 'text-gray-800';
  const trialWhy = isDarkMode ? 'text-white/60' : 'text-gray-600';
  const trialLink = isDarkMode ? 'text-cyan-300 hover:underline' : 'text-blue-700 hover:underline';
  const statusChip = isDarkMode
    ? 'bg-emerald-500/10 text-emerald-200'
    : 'bg-emerald-50 text-emerald-800';
  const verifiedChip = isDarkMode
    ? 'border-white/10 bg-black/30 text-white/70'
    : 'border-gray-300 bg-white text-gray-700';
  const adjacentBox = isDarkMode
    ? 'border-cyan-500/25 bg-cyan-500/[0.06] text-cyan-100'
    : 'border-blue-100 bg-blue-50 text-blue-900';
  const auditBorder = isDarkMode ? 'border-white/10' : 'border-gray-100';
  const auditBtn = isDarkMode
    ? 'text-white/60 hover:text-white'
    : 'text-gray-600 hover:text-gray-900';
  const claimRow = isDarkMode
    ? 'border-white/10 bg-black/30 text-white/80'
    : 'border-gray-100 bg-gray-50 text-gray-900';
  const claimSourceCode = isDarkMode ? 'bg-white/10' : 'bg-white';
  const claimSourceCap = isDarkMode ? 'text-white/50' : 'text-gray-500';
  const provenanceCard = isDarkMode
    ? 'border-white/10 bg-black/30'
    : 'border-gray-100 bg-white';
  const provenanceHead = isDarkMode ? 'text-white/50' : 'text-gray-500';
  const provenanceRepo = isDarkMode
    ? 'bg-white/10 text-white/70'
    : 'bg-gray-100 text-gray-700';
  const provenanceText = isDarkMode ? 'text-white/70' : 'text-gray-700';
  const provenanceRole = isDarkMode ? 'text-white/50' : 'text-gray-500';
  const admissibility = isDarkMode ? admissibilityStyleDark : admissibilityStyleLight;

  return (
    <section
      aria-label="Brenus anchor evidence for CRC01"
      className={`rounded-2xl border p-4 shadow-sm md:p-6 ${shell}`}
    >
      <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className={`text-xs font-medium uppercase tracking-wide ${eyebrow}`}>
            CrisPRO · Trial evidence from the Brenus engagement library
          </div>
          <h2 className={`mt-1 text-xl font-semibold ${heading}`}>
            What we&rsquo;ve pulled for this patient
          </h2>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${snapshotChip}`}>
          Snapshot · {panel.trials.length} trials · {panel.claims.length} evidence claims
        </span>
      </header>

      <div className="mb-6 space-y-3">
        <p className={`text-base leading-relaxed ${bodyText}`}>{panel.plainSummary}</p>
        <p className={`text-base leading-relaxed ${bodyText}`}>
          <span className={`font-medium ${emphText}`}>For CRC01 specifically: </span>
          {panel.patientRelevance}
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {panel.trials.map((t: any) => (
          <article
            key={t.nctId}
            className={`rounded-lg border p-4 ${trialCard}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className={`text-sm font-semibold ${heading}`}>{t.trialName}</div>
              <a
                href={`https://clinicaltrials.gov/study/${t.nctId}`}
                target="_blank"
                rel="noreferrer"
                className={`text-xs font-medium ${trialLink}`}
              >
                {t.nctId}
              </a>
            </div>
            <div className={`mt-1 text-xs uppercase tracking-wide ${trialCap}`}>
              {t.phase} · {t.line} · {t.cancerType}
            </div>
            <div className={`mt-3 text-sm ${trialBody}`}>{t.primaryResult}</div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusChip}`}>
                {t.status}
              </span>
              <span className={`rounded-full border px-2 py-0.5 text-xs ${verifiedChip}`}>
                Verified by Brenus: {t.dataStatus}
              </span>
            </div>
            <div className={`mt-3 text-xs italic ${trialWhy}`}>
              Why it&rsquo;s here: {t.whyAppendix}
            </div>
          </article>
        ))}
      </div>

      <div className={`mt-6 rounded-lg border p-4 ${adjacentBox}`}>
        <p className="text-sm leading-relaxed">
          <span className="font-medium">Adjacent engagement context: </span>
          {panel.adjacentEngagementNote}
        </p>
      </div>

      <div className={`mt-6 border-t pt-4 ${auditBorder}`}>
        <button
          type="button"
          onClick={() => setShowAudit((s) => !s)}
          className={`text-xs font-medium ${auditBtn}`}
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
                  className={`flex items-start gap-3 rounded border p-3 ${claimRow}`}
                >
                  <span
                    className={`shrink-0 rounded border px-2 py-0.5 text-[10px] font-semibold uppercase ${
                      admissibility[c.admissibility] ?? admissibility.T3
                    }`}
                  >
                    {c.admissibility}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm">{c.claim}</div>
                    <div className={`mt-1 text-xs ${claimSourceCap}`}>
                      Source:{' '}
                      <code className={`rounded px-1 ${claimSourceCode}`}>
                        {c.source.sourcePath}
                      </code>
                      {c.verified ? ' · verified' : ' · unverified'}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
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
