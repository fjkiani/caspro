'use client';

/**
 * GovernanceSurface — 5-tab governance ledger, sourced from
 * crispro_master_pipeline.json.governance.
 * Replaces the previous "obsolete text dump" surface.
 */

import { useState } from 'react';
import { ShieldCheck, Lock, TrendingDown, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import { GOVERNANCE_MASTER } from '@/data/governance-master';

const TABS = ['formula', 'quarantine', 'downgrade', 'conflicts', 'remediation'] as const;
type Tab = (typeof TABS)[number];
const TAB_LABEL: Record<Tab, string> = {
  formula: 'Formula',
  quarantine: 'Quarantine',
  downgrade: 'Downgrade',
  conflicts: 'Active conflicts',
  remediation: 'Remediation',
};
const TAB_ICON: Record<Tab, typeof ShieldCheck> = {
  formula: ShieldCheck,
  quarantine: Lock,
  downgrade: TrendingDown,
  conflicts: AlertTriangle,
  remediation: CheckCircle2,
};

export default function GovernanceSurface() {
  const { isDarkMode } = useTheme();
  const [tab, setTab] = useState<Tab>('formula');
  const g = GOVERNANCE_MASTER;

  return (
    <div className={isDarkMode ? 'min-h-screen bg-black text-white' : 'min-h-screen bg-white text-zinc-900'}>
      <ZetaNavbar />
      <div className="pt-16 px-6 max-w-[1400px] mx-auto">
        <header className="border-b border-white/10 pb-4">
          <div className="text-[10px] uppercase tracking-[0.24em] text-cyan-300">Governance ledger</div>
          <h1 className="mt-1 text-3xl font-semibold">Formula, quarantine, and active conflicts</h1>
          <p className="mt-2 max-w-3xl text-sm text-white/60">
            Every substrate change, every quarantine, every downgrade — receipt-locked. No prose dump.
          </p>
        </header>

        <div className="mt-6 grid grid-cols-[220px_1fr] gap-6">
          <nav aria-label="Governance sections" className="space-y-1">
            {TABS.map((t) => {
              const Icon = TAB_ICON[t];
              const active = t === tab;
              const count =
                t === 'quarantine' ? g.quarantine_log.length :
                t === 'downgrade' ? g.downgrade_log.length :
                t === 'conflicts' ? g.active_conflicts.length : 0;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={
                    'w-full text-left px-3 py-2 rounded border flex items-center gap-2 transition-colors ' +
                    (active
                      ? 'border-cyan-400/60 bg-cyan-500/10 text-cyan-100'
                      : 'border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.05]')
                  }
                >
                  <Icon className={`h-4 w-4 ${active ? 'text-cyan-300' : 'text-white/40'}`} aria-hidden />
                  <span className="flex-1 text-sm">{TAB_LABEL[t]}</span>
                  {count > 0 && <span className="text-[10px] font-mono opacity-70">{count}</span>}
                </button>
              );
            })}
          </nav>

          <section className="border border-white/10 rounded p-5 bg-white/[0.02]">
            {tab === 'formula' && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">Formula</h2>
                <div className="text-[10px] uppercase tracking-widest text-cyan-300">
                  {g.formula?.name ?? 'not set'} · {g.formula?.status ?? 'unknown'}
                </div>
                <p className="font-mono text-sm bg-black/40 border border-white/10 rounded px-3 py-2">
                  {g.formula?.formula ?? 'not set'}
                </p>
                <div className="text-[10px] uppercase tracking-widest text-white/50">
                  signed · {g.formula?.signed ?? 'unsigned'} · by · {g.formula?.signer ?? 'n/a'}
                </div>
                {/* PATH B is prohibited under PATH A lock 2026-04-28; render the ledger value verbatim below. */}
                <div className="text-[10px] uppercase tracking-widest text-red-300">
                  PATH B (prohibited under PATH A lock) · {g.formula?.PATH_B ?? 'n/a'}
                </div>
                {(g.formula_status || g.formula_signed) && (
                  <div className="text-[10px] uppercase tracking-widest text-white/40">
                    legacy status · {g.formula_status || 'unknown'} · signed · {g.formula_signed || 'unsigned'}
                  </div>
                )}
              </div>
            )}
            {tab === 'quarantine' && (
              <div className="space-y-3">
                {g.quarantine_log.map((q: any, i: number) => (
                  <div key={i} className="border-l-2 border-amber-500/60 pl-3">
                    <div className="text-[10px] uppercase tracking-widest text-amber-300">{q.id} · {q.status}</div>
                    <div className="text-sm mt-0.5">{q.description}</div>
                    {q.rationale && <div className="text-xs text-white/60 mt-1">{q.rationale}</div>}
                  </div>
                ))}
                {g.quarantine_log.length === 0 && <p className="text-sm text-white/50">Nothing in quarantine.</p>}
              </div>
            )}
            {tab === 'downgrade' && (
              <div className="space-y-3">
                {g.downgrade_log.map((d: any, i: number) => (
                  <div key={i} className="border-l-2 border-red-500/60 pl-3">
                    <div className="text-[10px] uppercase tracking-widest text-red-300">{d.id} · {d.status}</div>
                    <div className="text-sm mt-0.5">{d.description}</div>
                  </div>
                ))}
                {g.downgrade_log.length === 0 && <p className="text-sm text-white/50">Nothing downgraded.</p>}
              </div>
            )}
            {tab === 'conflicts' && (
              <div className="space-y-3">
                {g.active_conflicts.map((c: any, i: number) => (
                  <div key={i} className="border-l-2 border-fuchsia-500/60 pl-3">
                    <div className="text-[10px] uppercase tracking-widest text-fuchsia-300">{c.id} · {c.status}</div>
                    <div className="text-sm mt-0.5">{c.description}</div>
                  </div>
                ))}
                {g.active_conflicts.length === 0 && <p className="text-sm text-white/50">No active conflicts.</p>}
              </div>
            )}
            {tab === 'remediation' && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">Remediation</h2>
                {g.remediation ? (
                  <dl className="text-sm text-white/80 space-y-2">
                    <div>
                      <dt className="text-[10px] uppercase tracking-widest text-white/40">status</dt>
                      <dd className="mt-0.5">{g.remediation.status}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-widest text-white/40">immediate downgrades applied</dt>
                      <dd className="mt-0.5">{g.remediation.immediate_downgrades_applied ? 'yes' : 'no'}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-widest text-white/40">formula-dependent items</dt>
                      <dd className="mt-0.5">{g.remediation.formula_dependent_items}</dd>
                    </div>
                    {/* PATH A is the locked ranker formula; PATH B is prohibited. Rendered value is the ledger decision string. */}
                    <div>
                      <dt className="text-[10px] uppercase tracking-widest text-white/40">
                        PATH A locked · PATH B prohibited
                      </dt>
                      <dd className="mt-0.5">{g.remediation.path_a_vs_path_b_decision}</dd>
                    </div>
                  </dl>
                ) : (
                  <p className="text-sm text-white/80">no remediation recorded</p>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
