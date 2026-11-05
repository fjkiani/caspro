'use client';

/**
 * NSCLC LUNA16 React twin — Case → Options → Gaps.
 * Receipts JSON only. RUO once. No Ready / Pipeline-run chrome.
 */
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileWarning, ListOrdered, ShieldCheck, User } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { TB_ROUTES, type TbTopTab } from '@/data/tumor-board/tb-surface-config';
import {
  nsclcBoard,
  NSCLC_RECEIPTS_ROUTE,
} from '@/data/tumor-board/nsclc-luna16-board';

const TABS: { key: TbTopTab; label: string; icon: typeof User }[] = [
  { key: 'case', label: 'Case', icon: User },
  { key: 'options', label: 'Options', icon: ListOrdered },
  { key: 'gaps', label: 'Gaps & evidence', icon: FileWarning },
];

function chipClass(tone: 'loaded' | 'proxy' | 'neutral', dark: boolean) {
  if (tone === 'loaded') {
    return dark
      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
      : 'border-emerald-400 bg-emerald-50 text-emerald-800';
  }
  if (tone === 'proxy') {
    return dark
      ? 'border-amber-500/40 bg-amber-500/10 text-amber-200'
      : 'border-amber-300 bg-amber-50 text-amber-900';
  }
  return dark
    ? 'border-zinc-700 bg-zinc-900 text-zinc-300'
    : 'border-slate-300 bg-slate-100 text-slate-700';
}

export default function NsclcBoardSurface() {
  const { isDarkMode } = useTheme();
  const [topTab, setTopTab] = useState<TbTopTab>('case');
  const b = nsclcBoard;

  const shell = isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-slate-50 text-slate-600';
  const main = isDarkMode ? 'text-white' : 'text-slate-900';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const body = isDarkMode ? 'text-zinc-300' : 'text-slate-600';
  const panel = isDarkMode
    ? 'border-zinc-800 bg-zinc-950/50'
    : 'border-slate-200 bg-white';
  const border = isDarkMode ? 'border-white/5' : 'border-slate-200';

  return (
    <div className={`flex h-[calc(100dvh-3.5rem)] flex-col overflow-hidden font-mono ${shell}`}>
      <div
        className={`shrink-0 border-b px-4 py-1.5 text-[9px] font-black uppercase tracking-widest sm:px-8 ${
          isDarkMode
            ? 'border-amber-500/30 bg-amber-500/10 text-amber-200'
            : 'border-amber-200 bg-amber-50 text-amber-900'
        }`}
      >
        Research use only · not a diagnosis · not a prescription
      </div>

      <header className={`shrink-0 border-b ${border} ${isDarkMode ? 'bg-black/40' : 'bg-white/80'}`}>
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/" className="flex shrink-0 items-center gap-2 group">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded border ${
                  isDarkMode
                    ? 'border-zinc-800 bg-zinc-950 group-hover:border-cyan-500/50'
                    : 'border-slate-200 bg-white group-hover:border-indigo-400'
                }`}
              >
                <ShieldCheck className={`h-3.5 w-3.5 ${accent}`} />
              </div>
              <span
                className={`text-[11px] font-black uppercase tracking-[0.3em] ${
                  isDarkMode
                    ? 'text-white group-hover:text-cyan-400'
                    : 'text-slate-900 group-hover:text-indigo-600'
                }`}
              >
                CrisPRO
              </span>
            </Link>
            <span className={`hidden h-5 w-px sm:block ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'}`} />
            <div className="min-w-0">
              <div className={`truncate text-sm font-black uppercase tracking-[0.15em] sm:text-base ${main}`}>
                Tumor Board · {b.headline}
              </div>
              <div className={`truncate text-[10px] font-black uppercase tracking-widest ${muted}`}>
                Board walk · {b.caseId} · {b.layers[1].chip}
              </div>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href={NSCLC_RECEIPTS_ROUTE}
              className={`hidden items-center gap-1.5 text-[10px] font-black uppercase tracking-widest sm:inline-flex ${
                isDarkMode ? 'text-zinc-500 hover:text-cyan-400' : 'text-slate-500 hover:text-indigo-600'
              }`}
              title="E2E pipeline receipts — HTML mockup until renamed"
            >
              Receipts
              <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              href={TB_ROUTES.picker}
              className={`rounded-sm border px-3 py-2 text-[10px] font-black uppercase tracking-widest ${
                isDarkMode
                  ? 'border-zinc-800 bg-zinc-900 text-cyan-400 hover:bg-zinc-800'
                  : 'border-slate-300 bg-white text-indigo-700 hover:bg-slate-100'
              }`}
            >
              Picker
            </Link>
          </div>
        </div>
      </header>

      <div className={`shrink-0 border-b ${border} ${isDarkMode ? 'bg-black/20' : 'bg-white/40'}`}>
        <div className="mx-auto flex max-w-[1600px] overflow-x-auto px-4 sm:px-8">
          {TABS.map((t) => {
            const active = t.key === topTab;
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setTopTab(t.key)}
                className={`relative flex items-center gap-2.5 whitespace-nowrap border-r px-4 py-3.5 transition-all ${
                  isDarkMode ? 'border-white/5' : 'border-slate-200'
                } ${
                  active
                    ? isDarkMode
                      ? 'bg-cyan-500/5 text-cyan-400'
                      : 'bg-indigo-50 text-indigo-700'
                    : isDarkMode
                      ? 'text-zinc-500 hover:bg-white/5 hover:text-white'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-widest">{t.label}</span>
                {active ? (
                  <motion.div
                    layoutId="nsclc-tb-tab"
                    className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                      isDarkMode ? 'bg-cyan-500' : 'bg-indigo-600'
                    }`}
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className={`shrink-0 border-b px-4 py-2 sm:px-8 ${border}`}>
        <p className={`mx-auto max-w-[1600px] text-[12px] leading-snug ${body}`}>{b.oneLiner}</p>
      </div>

      <main className="mx-auto min-h-0 w-full max-w-[1600px] flex-1 overflow-y-auto px-4 py-4 sm:px-8">
        {topTab === 'case' ? (
          <div className="grid gap-3 lg:grid-cols-2">
            <section className={`rounded border p-4 ${panel}`}>
              <p className={`text-[10px] font-black uppercase tracking-widest ${muted}`}>What went in</p>
              <h2 className={`mt-1 text-base font-black ${main}`}>{b.caseId}</h2>
              <p className={`mt-1 text-[12px] ${body}`}>{b.caseType}</p>
              <p className={`mt-2 text-[11px] ${muted}`}>{b.caseRole}</p>
              <div className={`mt-4 rounded border border-dashed p-3 ${border}`}>
                <p className={`text-[10px] font-black uppercase tracking-widest ${accent}`}>
                  Detection · L2
                </p>
                <p className={`mt-1 text-2xl font-black tabular-nums ${main}`}>
                  {b.detection.score.toFixed(3)}
                  <span className={`ml-2 text-[11px] font-black uppercase tracking-widest ${muted}`}>
                    top_score
                  </span>
                </p>
                <p className={`mt-2 text-[12px] ${body}`}>
                  Ø {b.detection.diameterMm.toFixed(1)} mm · center (
                  {b.detection.centerMm.map((n) => n.toFixed(1)).join(', ')}) mm · in_lung=
                  {String(b.detection.inLung)} · in_distribution=
                  <span className={b.detection.inDistribution ? '' : accent}>
                    {String(b.detection.inDistribution)}
                  </span>
                </p>
                <p className={`mt-2 text-[11px] leading-snug ${muted}`}>{b.detection.note}</p>
              </div>
            </section>

            <section className={`rounded border p-4 ${panel}`}>
              <p className={`text-[10px] font-black uppercase tracking-widest ${muted}`}>
                Pipeline layers
              </p>
              <ul className="mt-3 space-y-2">
                {b.layers.map((layer) => (
                  <li
                    key={layer.id}
                    className={`flex flex-wrap items-start justify-between gap-2 rounded border px-3 py-2 ${border}`}
                  >
                    <div className="min-w-0">
                      <p className={`text-[11px] font-black uppercase tracking-widest ${main}`}>
                        {layer.id} · {layer.label}
                      </p>
                      <p className={`mt-0.5 text-[11px] leading-snug ${body}`}>{layer.detail}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded border px-2 py-0.5 text-[9px] font-black uppercase tracking-widest ${chipClass(
                        layer.chipTone,
                        isDarkMode,
                      )}`}
                    >
                      {layer.chip}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ) : null}

        {topTab === 'options' ? (
          <div className="grid gap-3 lg:grid-cols-2">
            <section className={`rounded border p-4 ${panel}`}>
              <p className={`text-[10px] font-black uppercase tracking-widest ${muted}`}>
                Elo enriched · discuss first
              </p>
              <ol className="mt-3 space-y-2">
                {b.elo.enriched.map((row) => {
                  const skip = row.drug_id.includes('notrec') || row.regimen.toLowerCase().includes('surveillance');
                  return (
                    <li
                      key={row.drug_id}
                      className={`rounded border px-3 py-2 ${border} ${
                        skip ? (isDarkMode ? 'opacity-50' : 'opacity-60') : ''
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className={`text-[10px] font-black tabular-nums ${accent}`}>
                          #{row.rank}
                        </span>
                        <span className={`text-[10px] tabular-nums ${muted}`}>
                          Elo {row.rating.toFixed(1)} · conf {row.confidence}
                        </span>
                      </div>
                      <p className={`mt-1 text-[12px] font-semibold leading-snug ${main}`}>
                        {row.regimen}
                      </p>
                      <p className={`mt-1 text-[10px] uppercase tracking-widest ${muted}`}>
                        {row.honesty_markers.proxy ? 'proxy' : 'loaded'}
                        {skip ? ' · skip / not recommended' : ''}
                      </p>
                    </li>
                  );
                })}
              </ol>
              <p className={`mt-3 text-[10px] leading-snug ${muted}`}>
                Baseline order was biopsy → MDT → PET/CT → surveillance. Enriched promoted PET/CT
                (+0.10) ahead of MDT — modifiers from receipt, not vibes.
              </p>
            </section>

            <section className={`rounded border p-4 ${panel}`}>
              <p className={`text-[10px] font-black uppercase tracking-widest ${muted}`}>
                NCCN-lite rules · recommended
              </p>
              <ul className="mt-3 space-y-2">
                {b.recommended.map((opt) => (
                  <li key={opt.name} className={`rounded border px-3 py-2 ${border}`}>
                    <p className={`text-[12px] font-semibold ${main}`}>{opt.name}</p>
                    <p className={`mt-0.5 text-[10px] uppercase tracking-widest ${accent}`}>
                      {opt.nccn_section}
                    </p>
                    <p className={`mt-1 text-[11px] leading-snug ${body}`}>{opt.rationale}</p>
                  </li>
                ))}
              </ul>
              <p className={`mt-4 text-[10px] font-black uppercase tracking-widest ${muted}`}>
                Not recommended
              </p>
              <ul className="mt-2 space-y-2">
                {b.notRecommended.map((opt) => (
                  <li key={opt.name} className={`rounded border px-3 py-2 ${border}`}>
                    <p className={`text-[12px] font-semibold ${main}`}>{opt.name}</p>
                    <p className={`mt-0.5 text-[10px] uppercase tracking-widest ${muted}`}>
                      {opt.nccn_section}
                    </p>
                    <p className={`mt-1 text-[11px] leading-snug ${body}`}>{opt.rationale}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ) : null}

        {topTab === 'gaps' ? (
          <div className="grid gap-3 lg:grid-cols-2">
            <section className={`rounded border p-4 ${panel}`}>
              <p className={`text-[10px] font-black uppercase tracking-widest ${muted}`}>
                Named gaps · still missing
              </p>
              <ul className="mt-3 space-y-2">
                {b.gaps.map((g) => (
                  <li key={g.id} className={`rounded border px-3 py-2 ${border}`}>
                    <p className={`text-[12px] font-black ${main}`}>{g.label}</p>
                    <p className={`mt-1 text-[11px] leading-snug ${body}`}>{g.why}</p>
                  </li>
                ))}
              </ul>
            </section>
            <section className={`rounded border p-4 ${panel}`}>
              <p className={`text-[10px] font-black uppercase tracking-widest ${muted}`}>
                Receipt calls · all 2xx
              </p>
              <ul className="mt-3 space-y-2">
                {b.summaryCalls.map((c) => (
                  <li key={c.step} className={`rounded border px-3 py-2 ${border}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className={`text-[11px] font-black uppercase tracking-widest ${main}`}>
                        {c.step}
                      </span>
                      <span
                        className={`rounded border px-2 py-0.5 text-[9px] font-black uppercase tracking-widest ${chipClass(
                          c.model_state.startsWith('loaded_') ? 'loaded' : 'proxy',
                          isDarkMode,
                        )}`}
                      >
                        {c.model_state}
                      </span>
                    </div>
                    <p className={`mt-1 font-mono text-[10px] ${muted}`}>
                      {c.method} {c.path} · {c.status} · {c.latency_s.toFixed(3)}s
                    </p>
                  </li>
                ))}
              </ul>
              <p className={`mt-3 text-[11px] leading-snug ${muted}`}>{b.warnings[0]?.slice(0, 280)}…</p>
              <Link
                href={NSCLC_RECEIPTS_ROUTE}
                className={`mt-3 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${accent}`}
              >
                Open full receipts
                <ArrowRight className="h-3 w-3" />
              </Link>
            </section>
          </div>
        ) : null}
      </main>
    </div>
  );
}
