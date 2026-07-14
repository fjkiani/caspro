'use client';

/**
 * BrenusDecodeWallPage — /ledger/decode-wall
 *
 * Full 42-trial view of the Brenus registry v2 8D vector decode, grouped by
 * program. Honest counts up top: 17 decoded · 25 pending · 3 numeric delta ·
 * 1 QUARANTINED (LATIFY CT-03).
 *
 * SOURCE: Fahad Kiani directive 2026-07-10 — "decode all these trials".
 */

import { useMemo, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import { PersonaContent, usePersonaContent, type PersonaCopyDeck } from '@/context/persona-content';
import {
  BRENUS_DECODE_WALL,
  BRENUS_REGISTRY_META,
  BRENUS_TRIALS,
  BRENUS_TRIALS_BY_PROGRAM,
  hasNumericDelta,
  isDecoded,
  isQuarantined,
  type BrenusProgram,
  type BrenusTrial,
  type BrenusTrialDecoded,
} from '@/data/brenus/trial-decode-registry';

// -------- Persona-scoped stats-bar labels + column headers --------
const STATS_DECK: PersonaCopyDeck<{
  total: string;
  decoded: string;
  pending: string;
  numericDelta: string;
  quarantined: string;
}> = {
  oncologist: {
    total: 'Total',
    decoded: 'Decoded',
    pending: 'Pending',
    numericDelta: 'Numeric delta',
    quarantined: 'Quarantined',
  },
  patient: {
    total: 'Trials in this list',
    decoded: 'We have read',
    pending: 'Not read yet',
    numericDelta: 'With hard numbers',
    quarantined: 'Set aside · needs work',
  },
  pharma: {
    total: 'Corpus',
    decoded: 'Full 8D domain',
    pending: 'Pending decode',
    numericDelta: 'Numeric Δ (DOCUMENTED)',
    quarantined: 'Quarantined (vector conflict)',
  },
};

const HEADER_DECK: PersonaCopyDeck<{
  eyebrow: string;
  headline: string;
  body: string;
}> = {
  oncologist: {
    eyebrow: 'DECODE WALL // BRENUS REGISTRY v2',
    headline: 'CrisPRO 8D vector across 42 trials',
    body:
      'The Brenus registry classifies each clinical trial by which of the 8 CrisPRO domains (D1 Biology through D8 Systemic) dominated its outcome. Numeric delta is the PATH A ranker score gap between the responder subpopulation vector and the ITT vector. Direction match FALSE means CrisPRO surfaces a subpopulation the ITT design diluted.',
  },
  patient: {
    eyebrow: 'HOW WE READ CLINICAL TRIALS',
    headline: 'Every trial gets 8 lenses. Here is which lens explained each one.',
    body:
      'CrisPRO reads every trial through 8 lenses — biology, patient selection, trial design, delivery, governance, IP, regulatory, and whole-body effects. This page shows which lens dominated each outcome, and honestly marks the 25 trials we have not read yet.',
  },
  pharma: {
    eyebrow: 'PORTFOLIO DECODE // 17 / 42',
    headline: 'MSS CRC comparator + benchmark decode: state of play',
    body:
      'Registry v2: 42 trials · 17 with full 8D domain · 3 numeric delta (Berzosertib 0.138 · Adavosertib 0.307 · CAPRI 0.108, all DOCUMENTED_NOT_REPRODUCED) · 1 QUARANTINED (LATIFY, CT-03 vector conflict). Domain distribution D2:10 · D1:5 · D8:1 · D3:1 · pending:25. Vector version: no trial is LOCKED yet — 3 APPROXIMATE · 1 CONFLICTED · 1 UNDEFINED · 37 pending. GLB set = 6 NCTs.',
  },
};

const PROGRAM_LABEL: Record<BrenusProgram, string> = {
  ATR_DDR: 'ATR / DDR',
  CEACAM5: 'CEACAM5',
  IO_CORE: 'IO Core (MSS CRC)',
  IO_APPENDIX: 'IO Appendix (context)',
  HISTORICAL_BENCHMARK: 'Historical benchmark',
  BREAK_CRC_001: 'BreAK CRC-001',
  GBM_ESCAPEMAP: 'GBM Escape-Map',
};

const DOMAIN_ACCENT: Record<string, { fg: string; bg: string }> = {
  D1: { fg: 'text-emerald-400', bg: 'bg-emerald-900/20' },
  D2: { fg: 'text-cyan-400', bg: 'bg-cyan-900/20' },
  D3: { fg: 'text-indigo-400', bg: 'bg-indigo-900/20' },
  D8: { fg: 'text-sky-400', bg: 'bg-sky-900/20' },
};

function formatDelta(t: BrenusTrialDecoded): string {
  if (isQuarantined(t)) return 'QUARANTINED';
  if (hasNumericDelta(t)) return t.delta_approx.toFixed(3);
  if (typeof t.delta_approx === 'string') return t.delta_approx;
  return '—';
}

function TrialRow({ trial, isDarkMode }: { trial: BrenusTrial; isDarkMode: boolean }) {
  const decoded = isDecoded(trial);
  const quarantined = decoded && isQuarantined(trial);
  const domain = decoded ? trial['8d_primary_domain'] : null;
  const label = decoded ? trial['8d_primary_label'] : null;
  const accent = domain ? DOMAIN_ACCENT[domain] : null;

  return (
    <tr
      className={`border-b ${
        isDarkMode ? 'border-zinc-900' : 'border-slate-100'
      } ${quarantined ? '!bg-red-950/20' : ''} ${!decoded ? 'opacity-70' : ''}`}
    >
      <td className="py-2 pr-3 align-top">
        <span
          className={`inline-block rounded px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.25em] border ${
            decoded
              ? `${accent?.bg} ${accent?.fg} border-current`
              : isDarkMode
                ? 'bg-zinc-900 text-zinc-500 border-zinc-800'
                : 'bg-slate-100 text-slate-500 border-slate-300'
          }`}
        >
          {decoded ? `${domain} · ${label}` : 'PENDING'}
        </span>
      </td>
      <td className={`py-2 pr-3 align-top ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'} text-[10px]`}>
        {trial.nct_id}
      </td>
      <td className="py-2 pr-3 align-top text-[11px] font-bold leading-tight">
        {trial.trial_name}
      </td>
      <td className={`py-2 pr-3 align-top text-[10px] ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
        {trial.cancer_type || '—'}
      </td>
      <td className={`py-2 pr-3 align-top text-[10px] ${quarantined ? 'text-red-300' : ''}`}>
        {decoded ? formatDelta(trial) : '—'}
      </td>
      <td className={`py-2 pr-3 align-top text-[10px] ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
        {decoded ? trial.delta_direction_match || '—' : '—'}
      </td>
      <td className={`py-2 pr-3 align-top text-[10px] truncate max-w-[220px] ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`} title={decoded ? trial.vector_version : ''}>
        {decoded ? trial.vector_version : '—'}
      </td>
    </tr>
  );
}

export default function BrenusDecodeWallPage() {
  const { isDarkMode } = useTheme();
  const stats = usePersonaContent(STATS_DECK);
  const [filter, setFilter] = useState<'all' | 'decoded' | 'pending' | 'quarantined'>('all');
  const [programFilter, setProgramFilter] = useState<BrenusProgram | 'all'>('all');

  const filtered = useMemo(() => {
    let rows: BrenusTrial[] = BRENUS_TRIALS;
    if (programFilter !== 'all') rows = BRENUS_TRIALS_BY_PROGRAM[programFilter] ?? [];
    if (filter === 'decoded') rows = rows.filter(isDecoded);
    else if (filter === 'pending') rows = rows.filter((t) => !isDecoded(t));
    else if (filter === 'quarantined') rows = rows.filter(isQuarantined);
    return rows;
  }, [filter, programFilter]);

  return (
    <div
      className={`min-h-screen font-mono transition-colors ${
        isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-white text-slate-900'
      }`}
    >
      <ZetaNavbar />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-24 pb-16">
        <PersonaContent
          deck={HEADER_DECK}
          render={(copy) => (
            <header className="mb-6">
              <span
                className={`text-[9px] font-black uppercase tracking-[0.5em] ${
                  isDarkMode ? 'text-violet-400' : 'text-violet-600'
                }`}
              >
                {copy.eyebrow}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-1">
                {copy.headline}
              </h1>
              <p className={`mt-2 text-[13px] max-w-4xl leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                {copy.body}
              </p>
              <p className={`mt-2 text-[10px] ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                Registry {BRENUS_REGISTRY_META.version} · {BRENUS_REGISTRY_META.date} · source: {BRENUS_REGISTRY_META.source_files.length} upstream file(s)
              </p>
            </header>
          )}
        />

        {/* stats bar */}
        <section
          className={`mb-6 grid grid-cols-2 sm:grid-cols-5 gap-2 rounded border p-3 ${
            isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          {[
            { label: stats.total, v: BRENUS_DECODE_WALL.total, tone: '' },
            { label: stats.decoded, v: BRENUS_DECODE_WALL.decoded, tone: 'text-cyan-400' },
            { label: stats.pending, v: BRENUS_DECODE_WALL.not_decoded, tone: 'text-amber-400' },
            { label: stats.numericDelta, v: BRENUS_DECODE_WALL.numeric_delta, tone: 'text-emerald-400' },
            { label: stats.quarantined, v: BRENUS_DECODE_WALL.quarantined, tone: 'text-red-400' },
          ].map((s) => (
            <div key={s.label} className="min-w-0">
              <p className={`text-[9px] uppercase tracking-[0.25em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>{s.label}</p>
              <p className={`text-xl font-black ${s.tone}`}>{s.v}</p>
            </div>
          ))}
        </section>

        {/* filters */}
        <div className="mb-3 flex flex-wrap gap-2">
          {(['all', 'decoded', 'pending', 'quarantined'] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setFilter(k)}
              className={`rounded border px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] transition-colors ${
                filter === k
                  ? isDarkMode
                    ? 'border-[#00E5FF] text-[#00E5FF] bg-[#00E5FF10]'
                    : 'border-indigo-600 text-indigo-600 bg-indigo-50'
                  : isDarkMode
                    ? 'border-zinc-800 text-zinc-500 hover:text-zinc-300'
                    : 'border-slate-300 text-slate-500 hover:text-slate-700'
              }`}
            >
              {k}
            </button>
          ))}
          <span className="ml-2 self-center text-[9px] uppercase tracking-[0.25em] opacity-60">·</span>
          {(['all', ...(Object.keys(PROGRAM_LABEL) as BrenusProgram[])] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setProgramFilter(k as BrenusProgram | 'all')}
              className={`rounded border px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] transition-colors ${
                programFilter === k
                  ? isDarkMode
                    ? 'border-violet-500 text-violet-300 bg-violet-950/40'
                    : 'border-violet-600 text-violet-700 bg-violet-50'
                  : isDarkMode
                    ? 'border-zinc-800 text-zinc-500 hover:text-zinc-300'
                    : 'border-slate-300 text-slate-500 hover:text-slate-700'
              }`}
            >
              {k === 'all' ? 'ALL PROGRAMS' : PROGRAM_LABEL[k as BrenusProgram]}
            </button>
          ))}
        </div>

        {/* table */}
        <div
          className={`rounded border overflow-x-auto ${
            isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'
          }`}
        >
          <table className="w-full text-[11px]">
            <thead
              className={`text-[9px] font-black uppercase tracking-[0.25em] border-b ${
                isDarkMode ? 'text-zinc-500 border-zinc-800' : 'text-slate-500 border-slate-200'
              }`}
            >
              <tr>
                <th className="py-2 pr-3 text-left">Domain</th>
                <th className="py-2 pr-3 text-left">NCT</th>
                <th className="py-2 pr-3 text-left">Trial</th>
                <th className="py-2 pr-3 text-left">Cancer</th>
                <th className="py-2 pr-3 text-left">Delta</th>
                <th className="py-2 pr-3 text-left">Dir. match</th>
                <th className="py-2 pr-3 text-left">Vector version</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <TrialRow key={t.nct_id} trial={t} isDarkMode={isDarkMode} />
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className={`p-4 text-[11px] italic ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
              No trials match this filter combination.
            </p>
          )}
        </div>

        <p className={`mt-4 text-[10px] ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
          Delta values: PATH A formula fit = clip((p·t)/‖t‖₂, 0, 1) per PATH A lock, signed Fahad Kiani 2026-04-28. PATH B prohibited. LATIFY (NCT05450692) delta remains QUARANTINED under CT-03 vector conflict; publication of delta value blocked until vector version reconciles. See governance for full 8D remediation trail.
        </p>
      </main>
    </div>
  );
}
