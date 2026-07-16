'use client';

/**
 * PipelineProgramCard — dark/light + persona + mobile-safe.
 *
 * Persona is EMPHASIS + COPY only (no visibility gates on the pipeline):
 *   • tab labels swap per persona via PROGRAM_CARD_COPY
 *   • empty-state strings swap per persona
 *   • the initial tab is set from `tab` prop by the parent surface
 *
 * Light-mode: every dark class has an isDarkMode fallback. See
 * /mnt/shared-workspace/shared/d6-briefing-w-products.md for the exact
 * color map used across this file (uniform with tumor-board / ledger).
 *
 * Mobile: trials + findings rows use flex-wrap with min-w-0 on the inner
 * text column so long NCT ids don't push the ledger button off-screen.
 */

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { usePersona } from '@/context/PersonaContext';
import { PROGRAM_CARD_COPY } from '@/data/pipeline/persona-copy';
import type { PipelineProgram } from '@/data/pipeline-master';
import { nctToLedgerSlug } from '@/data/pipeline-master';
import { getPipelinePersonaHeader } from '@/data/pipeline-master-persona-copy';
import { TRIAL_LEDGER_SLUGS } from '@/data/trial-ledger-registry';

interface Props {
  program: PipelineProgram;
  tab: 'overview' | 'trials' | 'findings' | 'lessons' | 'value';
}

// NCT → hand-authored slug mapping (mirrors auto-stubs.ts)
const NCT_TO_HAND_SLUG: Record<string, string> = {
  NCT05450692: 'latify',
  NCT04154956: 'ceacam5',
  NCT02595892: 'berzosertib',
  NCT03579316: 'adavosertib',
  NCT02264678: 'capri',
};

function ledgerHrefForNct(nct: string): string | null {
  if (!nct) return null;
  const hand = NCT_TO_HAND_SLUG[nct];
  if (hand && TRIAL_LEDGER_SLUGS.includes(hand)) return `/ledger/${hand}/`;
  const stub = nctToLedgerSlug(nct);
  if (TRIAL_LEDGER_SLUGS.includes(stub as any)) return `/ledger/${stub}/`;
  return null;
}

export default function PipelineProgramCard({ program: p, tab }: Props) {
  const { isDarkMode } = useTheme();
  const { persona } = usePersona();
  const copy = PROGRAM_CARD_COPY[persona];
  const header = getPipelinePersonaHeader(p, persona);

  // ---- token colors, defined once ----
  const cardBorder = isDarkMode ? 'border-white/10' : 'border-zinc-200';
  const cardBg     = isDarkMode ? 'bg-white/[0.02]' : 'bg-zinc-50';
  const cardBgHov  = isDarkMode ? 'hover:bg-white/[0.05]' : 'hover:bg-zinc-100';
  const eyebrow    = isDarkMode ? 'text-cyan-300' : 'text-indigo-600';
  const heading    = isDarkMode ? 'text-white' : 'text-zinc-900';
  const bodyStrong = isDarkMode ? 'text-white/80' : 'text-zinc-800';
  const body       = isDarkMode ? 'text-white/70' : 'text-zinc-700';
  const bodyDim    = isDarkMode ? 'text-white/60' : 'text-zinc-600';
  const meta       = isDarkMode ? 'text-white/40' : 'text-zinc-500';
  const metaDim    = isDarkMode ? 'text-white/30' : 'text-zinc-400';
  const finding    = isDarkMode ? 'text-cyan-300' : 'text-indigo-600';
  const verified   = isDarkMode ? 'text-emerald-400/80' : 'text-emerald-600';

  const ledgerBtn = isDarkMode
    ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/20'
    : 'border-indigo-500/40 bg-indigo-50 text-indigo-700 hover:bg-indigo-100';

  return (
    <article className={`rounded border p-5 ${cardBorder} ${cardBg}`}>
      <header>
        <div className={`text-[10px] uppercase tracking-widest ${eyebrow}`}>{p.program_id}</div>
        <h2 className={`mt-1 text-xl font-semibold ${heading}`}>{header.program_name}</h2>
        {header.headline && <p className={`mt-2 text-sm ${body}`}>{header.headline}</p>}
        <div className={`mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] uppercase tracking-widest ${meta}`}>
          {header.indication_focus && <span>focus · {header.indication_focus}</span>}
          {header.ip_value && <span>IP · {header.ip_value}</span>}
          <span>admissibility · {header.admissibility}</span>
        </div>
      </header>

      <div className="mt-5">
        {tab === 'overview' && (
          <div className={`space-y-4 text-sm ${bodyStrong}`}>
            <div>
              <div className={`text-[10px] uppercase tracking-widest ${meta} mb-1`}>
                {copy.tabLabels.trials}
              </div>
              <div className={`text-2xl font-mono ${heading}`}>{p.trials.length}</div>
            </div>
            {p.key_findings.slice(0, 3).map((f, i) => (
              <div
                key={f.finding_id || i}
                className={`border-l-2 pl-3 ${isDarkMode ? 'border-cyan-500/40' : 'border-indigo-500/40'}`}
              >
                <div className={`text-[10px] uppercase tracking-widest ${meta}`}>{f.finding_id}</div>
                <div className={`font-medium ${heading}`}>{f.title}</div>
                <p className={`mt-1 ${body}`}>{f.description}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'trials' && (
          <div className="space-y-2">
            {p.trials.length === 0 && (
              <p className={`text-sm ${meta}`}>{copy.emptyTrials}</p>
            )}
            {p.trials.map((t, i) => {
              const href = ledgerHrefForNct(t.nct);
              return (
                <div
                  key={`${t.trial_id || t.nct}-${i}`}
                  className={`rounded border p-3 transition-colors ${cardBorder} ${cardBg} ${cardBgHov}`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className={`text-[10px] uppercase tracking-widest ${meta}`}>
                        {t.nct || 'no NCT'} · {t.phase || 'n/a'}
                      </div>
                      <div className={`text-sm font-medium ${heading}`}>{t.drug || t.trial_id || 'untitled'}</div>
                      <div className={`text-xs ${bodyDim}`}>{t.indication}</div>
                      {t.outcome && <div className={`mt-1 text-xs ${meta}`}>outcome · {t.outcome}</div>}
                    </div>
                    {href ? (
                      <Link
                        href={href}
                        className={`inline-flex items-center gap-1 rounded border px-2 py-1 text-[10px] uppercase tracking-widest ${ledgerBtn}`}
                      >
                        Open ledger <ExternalLink className="h-3 w-3" />
                      </Link>
                    ) : (
                      <span className={`text-[10px] uppercase tracking-widest ${metaDim}`}>no receipt</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === 'findings' && (
          <div className={`space-y-3 text-sm ${bodyStrong}`}>
            {p.key_findings.map((f, i) => (
              <div
                key={f.finding_id || i}
                className={`rounded border p-3 ${cardBorder} ${cardBg}`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className={`text-[10px] uppercase tracking-widest ${finding}`}>{f.finding_id}</div>
                  {f.verified && (
                    <span className={`text-[9px] uppercase tracking-widest ${verified}`}>verified</span>
                  )}
                </div>
                <div className={`mt-1 font-medium ${heading}`}>{f.title}</div>
                <p className={`mt-1 ${body}`}>{f.description}</p>
                {f.source && (
                  <div className={`mt-2 text-[10px] uppercase tracking-widest ${meta}`}>source · {f.source}</div>
                )}
              </div>
            ))}
            {p.key_findings.length === 0 && (
              <p className={meta}>{copy.emptyFindings}</p>
            )}
          </div>
        )}

        {tab === 'lessons' && (
          <ul className={`list-disc space-y-2 pl-5 text-sm ${bodyStrong}`}>
            {p.transfer_lessons.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
            {p.transfer_lessons.length === 0 && (
              <li className={`list-none ${meta}`}>{copy.emptyLessons}</li>
            )}
          </ul>
        )}

        {tab === 'value' && (
          <div className={`text-sm ${bodyStrong}`}>
            <div className={`mb-1 text-[10px] uppercase tracking-widest ${meta}`}>
              {copy.ipValueTitle}
            </div>
            <div className={`text-lg ${heading}`}>{p.ip_value || 'n/a'}</div>
          </div>
        )}
      </div>
    </article>
  );
}
