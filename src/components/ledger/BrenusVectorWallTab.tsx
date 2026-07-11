'use client';

/**
 * BrenusVectorWallTab — the 5th tab in the ledger program browser.
 *
 * Surfaces the CrisPRO 8D vector decode for every trial NCT'd inside the
 * currently-active program. Honest state:
 *   - DECODED: shows domain (D1..D8), label (Biology/Selection/...),
 *     delta_approx (numeric OR sentinel), delta_direction_match, vector_version,
 *     external_safe flag, blocker text
 *   - QUARANTINED (LATIFY, CT-03): red banner, "QUARANTINED" replaces delta
 *   - NOT_DECODED: honest fallback, "8D vector: not yet decoded" — no fake 0s
 *
 * SOURCE: Fahad Kiani directive 2026-07-10 — "decode all these trials". Data
 * loaded from /workspace/Brenus/engagements/brenus/trial_intelligence/
 * trial_decode_registry_v2.json (mirrored under src/data/brenus/).
 */

import {
  BRENUS_TRIALS_BY_NCT,
  hasNumericDelta,
  isDecoded,
  isQuarantined,
  type BrenusTrial,
  type BrenusTrialDecoded,
} from '@/data/brenus/trial-decode-registry';
import type { LedgerProgram } from '@/data/ledger-programs';
import { PersonaContent, type PersonaCopyDeck } from '@/context/persona-content';

// ─── persona decks for the tab intro ──────────────────────────────────────

const INTRO_DECK: PersonaCopyDeck<{ eyebrow: string; body: string }> = {
  oncologist: {
    eyebrow: '8D VECTOR DECODE',
    body: 'The Brenus registry classifies each trial by which of the 8 CrisPRO domains (D1 Biology through D8 Systemic) dominated its outcome. Numeric delta = ranker score gap between responder subpopulation and ITT vector, per PATH A formula fit = clip((p·t)/‖t‖₂, 0, 1). Direction match FALSE = decode surfaced a subpopulation the ITT design diluted.',
  },
  patient: {
    eyebrow: 'HOW THE ENGINE READ THIS TRIAL',
    body: 'CrisPRO reads every trial through 8 lenses (biology, patient selection, trial design, delivery, governance, IP, regulatory, whole-body). This tab shows which lens explained the result — and honestly flags trials we have not read yet.',
  },
  pharma: {
    eyebrow: 'REGISTRY // 42 TRIALS · 17 DECODED · 25 PENDING',
    body: 'Brenus v2 registry: 42 trials, 17 with full 8D domain, 3 with numeric delta_approx (Berzosertib 0.138 · Adavosertib 0.307 · CAPRI 0.108), 1 QUARANTINED (LATIFY CT-03 vector conflict). Domain distribution D2:10 · D1:5 · D8:1 · D3:1 · NOT_DECODED:25. Vector version LOCKED not yet claimed for any decoded trial (APPROXIMATE:3 · CONFLICTED:1 · UNDEFINED:1). GLB set = 6 NCTs.',
  },
};

// ─── domain colour + label ────────────────────────────────────────────────

const DOMAIN_ACCENT: Record<string, { fg: string; bg: string; label: string }> = {
  D1: { fg: 'text-emerald-400', bg: 'bg-emerald-900/20', label: 'Biology' },
  D2: { fg: 'text-cyan-400', bg: 'bg-cyan-900/20', label: 'Selection' },
  D3: { fg: 'text-indigo-400', bg: 'bg-indigo-900/20', label: 'Architecture' },
  D4: { fg: 'text-fuchsia-400', bg: 'bg-fuchsia-900/20', label: 'Trafficking' },
  D5: { fg: 'text-violet-400', bg: 'bg-violet-900/20', label: 'Governance' },
  D6: { fg: 'text-rose-400', bg: 'bg-rose-900/20', label: 'IP' },
  D7: { fg: 'text-amber-400', bg: 'bg-amber-900/20', label: 'Regulatory' },
  D8: { fg: 'text-sky-400', bg: 'bg-sky-900/20', label: 'Systemic' },
};

function formatDelta(t: BrenusTrialDecoded): string {
  if (isQuarantined(t)) return 'QUARANTINED (CT-03 vector conflict, publication-blocking)';
  if (hasNumericDelta(t)) return t.delta_approx.toFixed(3);
  if (typeof t.delta_approx === 'string') return t.delta_approx;
  return '—';
}

function DecodedCard({ trial, isDarkMode }: { trial: BrenusTrialDecoded; isDarkMode: boolean }) {
  const domain = trial['8d_primary_domain'];
  const accent = DOMAIN_ACCENT[domain] ?? {
    fg: 'text-zinc-400',
    bg: 'bg-zinc-900/20',
    label: trial['8d_primary_label'],
  };
  const quarantined = isQuarantined(trial);

  return (
    <li
      className={`rounded border p-3 ${
        isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'
      } ${quarantined ? '!border-red-700/60' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-bold text-sm leading-tight">{trial.trial_name}</p>
          <p className={`text-[10px] mt-0.5 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
            {[trial.nct_id, trial.phase, trial.status].filter(Boolean).join(' · ')}
          </p>
        </div>
        <span
          className={`shrink-0 rounded px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.3em] border ${accent.bg} ${accent.fg} border-current`}
        >
          {domain} · {accent.label}
        </span>
      </div>

      {quarantined && (
        <p className="mt-2 rounded border border-red-800/60 bg-red-950/40 px-2 py-1 text-[10px] text-red-300">
          QUARANTINED under governance lock. LATIFY delta not published — patent
          delta +0.366 vs receipt delta +0.2641; vector version blocked pending
          CT-03 reconciliation. PATH A locked; PATH B prohibited.
        </p>
      )}

      <dl
        className={`mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] ${
          isDarkMode ? 'text-zinc-400' : 'text-slate-600'
        }`}
      >
        <div>
          <dt className={`text-[9px] uppercase tracking-[0.25em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Delta</dt>
          <dd className={quarantined ? 'text-red-300' : ''}>{formatDelta(trial)}</dd>
        </div>
        <div>
          <dt className={`text-[9px] uppercase tracking-[0.25em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Direction match</dt>
          <dd>{trial.delta_direction_match || '—'}</dd>
        </div>
        <div>
          <dt className={`text-[9px] uppercase tracking-[0.25em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Vector version</dt>
          <dd className="truncate" title={trial.vector_version}>{trial.vector_version}</dd>
        </div>
        <div>
          <dt className={`text-[9px] uppercase tracking-[0.25em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>External safe</dt>
          <dd>{trial.external_safe ? 'yes' : 'no'}</dd>
        </div>
      </dl>

      {trial.key_biomarker && (
        <p className={`mt-2 text-[10px] leading-relaxed ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
          <span className="uppercase tracking-[0.2em] mr-1">Biomarker:</span>
          {trial.key_biomarker}
        </p>
      )}
      {trial.failure_mode && (
        <p className={`mt-1 text-[10px] leading-relaxed ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
          <span className="uppercase tracking-[0.2em] mr-1">Failure mode:</span>
          {trial.failure_mode}
        </p>
      )}
      {trial.blocker && (
        <p className={`mt-1 text-[10px] leading-relaxed ${isDarkMode ? 'text-amber-500' : 'text-amber-700'}`}>
          <span className="uppercase tracking-[0.2em] mr-1">Blocker:</span>
          {trial.blocker}
        </p>
      )}
      {trial.notes && (
        <p className={`mt-2 text-[10px] italic leading-relaxed ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
          {trial.notes}
        </p>
      )}
    </li>
  );
}

function PendingCard({ trial, isDarkMode }: { trial: BrenusTrial; isDarkMode: boolean }) {
  return (
    <li
      className={`rounded border border-dashed p-3 ${
        isDarkMode ? 'bg-zinc-950/40 border-zinc-800 text-zinc-400' : 'bg-slate-50 border-slate-300 text-slate-500'
      }`}
    >
      <p className="font-bold text-sm leading-tight">{trial.trial_name}</p>
      <p className="text-[10px] mt-0.5">
        {[trial.nct_id, trial.phase, trial.status].filter(Boolean).join(' · ')}
      </p>
      <p className="mt-2 text-[10px] italic">
        8D vector: not yet decoded — see published readout in the Trials tab.
      </p>
      {'why_appendix' in trial && trial.why_appendix && (
        <p className="mt-1 text-[10px]">
          Why appendix: {trial.why_appendix}
        </p>
      )}
    </li>
  );
}

export default function BrenusVectorWallTab({
  program,
  isDarkMode,
}: {
  program: LedgerProgram;
  isDarkMode: boolean;
}) {
  // Pull every trial in this program by NCT match into the Brenus registry
  const trialsInProgram: BrenusTrial[] = program.trials
    .map((t) => (t.nctId ? BRENUS_TRIALS_BY_NCT[t.nctId] : undefined))
    .filter((t): t is BrenusTrial => !!t);

  const decoded = trialsInProgram.filter(isDecoded);
  const pending = trialsInProgram.filter((t) => !isDecoded(t));

  return (
    <div className="space-y-3">
      <PersonaContent
        deck={INTRO_DECK}
        render={(copy) => (
          <header
            className={`rounded border p-3 ${
              isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'
            }`}
          >
            <p
              className={`text-[9px] font-black uppercase tracking-[0.35em] ${
                isDarkMode ? 'text-violet-400' : 'text-violet-600'
              }`}
            >
              {copy.eyebrow}
            </p>
            <p className={`mt-1 text-[11px] leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
              {copy.body}
            </p>
          </header>
        )}
      />

      {trialsInProgram.length === 0 && (
        <p className={`text-xs italic ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
          No trials in this program have NCTs mapped into the Brenus registry yet.
        </p>
      )}

      {decoded.length > 0 && (
        <section>
          <p className={`text-[9px] font-black uppercase tracking-[0.35em] mb-2 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
            Decoded · {decoded.length}
          </p>
          <ul className="space-y-2">
            {decoded.map((t) => (
              <DecodedCard key={t.nct_id} trial={t} isDarkMode={isDarkMode} />
            ))}
          </ul>
        </section>
      )}

      {pending.length > 0 && (
        <section>
          <p className={`text-[9px] font-black uppercase tracking-[0.35em] mb-2 ${isDarkMode ? 'text-amber-500' : 'text-amber-600'}`}>
            Pending decode · {pending.length}
          </p>
          <ul className="space-y-2">
            {pending.map((t) => (
              <PendingCard key={t.nct_id} trial={t} isDarkMode={isDarkMode} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
