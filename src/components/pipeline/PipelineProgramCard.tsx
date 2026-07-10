'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { PipelineProgram } from '@/data/pipeline-master';
import { nctToLedgerSlug } from '@/data/pipeline-master';
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
  return (
    <article className="border border-white/10 rounded p-5 bg-white/[0.02]">
      <header>
        <div className="text-[10px] uppercase tracking-widest text-cyan-300">{p.program_id}</div>
        <h2 className="mt-1 text-xl font-semibold">{p.program_name}</h2>
        {p.headline && <p className="mt-2 text-sm text-white/70">{p.headline}</p>}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] uppercase tracking-widest text-white/50">
          {p.indication_focus && <span>focus · {p.indication_focus}</span>}
          {p.ip_value && <span>IP · {p.ip_value}</span>}
          <span>admissibility · {p.admissibility}</span>
        </div>
      </header>

      <div className="mt-5">
        {tab === 'overview' && (
          <div className="space-y-4 text-sm text-white/80">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Trials</div>
              <div className="text-2xl font-mono">{p.trials.length}</div>
            </div>
            {p.key_findings.slice(0, 3).map((f, i) => (
              <div key={f.finding_id || i} className="border-l-2 border-cyan-500/40 pl-3">
                <div className="text-[10px] uppercase tracking-widest text-white/40">{f.finding_id}</div>
                <div className="font-medium">{f.title}</div>
                <p className="text-white/70 mt-1">{f.description}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'trials' && (
          <div className="space-y-2">
            {p.trials.length === 0 && <p className="text-sm text-white/50">No trials in this program.</p>}
            {p.trials.map((t, i) => {
              const href = ledgerHrefForNct(t.nct);
              return (
                <div key={`${t.trial_id || t.nct}-${i}`} className="border border-white/10 rounded p-3 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-widest text-white/40">{t.nct || 'no NCT'} · {t.phase || 'n/a'}</div>
                      <div className="text-sm font-medium">{t.drug || t.trial_id || 'untitled'}</div>
                      <div className="text-xs text-white/60">{t.indication}</div>
                      {t.outcome && <div className="text-xs text-white/50 mt-1">outcome · {t.outcome}</div>}
                    </div>
                    {href ? (
                      <Link href={href} className="inline-flex items-center gap-1 rounded border border-cyan-400/40 bg-cyan-500/10 px-2 py-1 text-[10px] uppercase tracking-widest text-cyan-200 hover:bg-cyan-500/20">
                        Open ledger <ExternalLink className="h-3 w-3" />
                      </Link>
                    ) : (
                      <span className="text-[10px] uppercase tracking-widest text-white/30">no receipt</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === 'findings' && (
          <div className="space-y-3 text-sm text-white/80">
            {p.key_findings.map((f, i) => (
              <div key={f.finding_id || i} className="border border-white/10 rounded p-3 bg-white/[0.02]">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="text-[10px] uppercase tracking-widest text-cyan-300">{f.finding_id}</div>
                  {f.verified && (
                    <span className="text-[9px] uppercase tracking-widest text-emerald-400/80">verified</span>
                  )}
                </div>
                <div className="mt-1 font-medium">{f.title}</div>
                <p className="mt-1 text-white/70">{f.description}</p>
                {f.source && (
                  <div className="mt-2 text-[10px] uppercase tracking-widest text-white/40">source · {f.source}</div>
                )}
              </div>
            ))}
            {p.key_findings.length === 0 && <p className="text-white/40">No findings recorded.</p>}
          </div>
        )}

        {tab === 'lessons' && (
          <ul className="space-y-2 text-sm text-white/80 list-disc pl-5">
            {p.transfer_lessons.map((l, i) => <li key={i}>{l}</li>)}
            {p.transfer_lessons.length === 0 && <li className="list-none text-white/40">No transfer lessons recorded.</li>}
          </ul>
        )}

        {tab === 'value' && (
          <div className="text-sm text-white/80">
            <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">IP value</div>
            <div className="text-lg">{p.ip_value || 'n/a'}</div>
          </div>
        )}
      </div>
    </article>
  );
}
