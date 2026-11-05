'use client';

/**
 * Flagship /products/tumor-board/ — one viewport, ZERO nested scroll.
 * Ways-in demo slugs redirect into /tumor-board/ doors.
 */

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Crosshair,
  Layers,
  Package,
  Shield,
  Handshake,
  Focus,
  GitBranch,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { useTheme } from '@/context/ThemeContext';
import {
  TB_PRODUCT_HERO,
  TB_PRODUCT_CTAS,
  TB_PRODUCT_TABS,
  TB_PRODUCT_LANES,
  TB_PRODUCT_BASE,
  tbWaysInHref,
  tbLaneBySlug,
  type TbProductTab,
  type TbLaneSlug,
} from '@/data/pages/tumor-board-workspace-data';

const ICONS: Record<TbProductTab, LucideIcon> = {
  decision: Focus,
  lanes: GitBranch,
  package: Package,
  proof: Shield,
  engage: Handshake,
};

const tabClass = (
  on: boolean,
  isDarkMode: boolean,
  border: string,
) =>
  `relative flex items-center gap-2 whitespace-nowrap border-r px-3 py-2 transition-all sm:px-4 ${border} ${
    on
      ? isDarkMode
        ? 'bg-cyan-500/5 text-cyan-400'
        : 'bg-indigo-50 text-indigo-700'
      : isDarkMode
        ? 'text-zinc-500 hover:bg-white/5 hover:text-white'
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
  }`;

export default function TumorBoardProductWorkspace({
  routedTab,
  laneSlug = null,
}: {
  /** When set (Ways-in demo), tab comes from the URL — no useState for that tab. */
  routedTab?: 'lanes';
  laneSlug?: TbLaneSlug | null;
}) {
  const { isDarkMode } = useTheme();
  const [localTab, setLocalTab] = useState<TbProductTab>('decision');
  const onWaysInRoute = routedTab === 'lanes';
  const tab: TbProductTab = onWaysInRoute ? 'lanes' : localTab;
  const meta = TB_PRODUCT_TABS.find((t) => t.key === tab) ?? TB_PRODUCT_TABS[0];
  const Icon = ICONS[tab];
  const focusedLane = laneSlug ? tbLaneBySlug(laneSlug) : null;
  const lanesToShow = focusedLane ? [focusedLane] : [...TB_PRODUCT_LANES];

  const bg = isDarkMode ? 'bg-[#020408] text-zinc-400' : 'bg-slate-50 text-slate-600';
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const main = isDarkMode ? 'text-white' : 'text-slate-900';
  const body = isDarkMode ? 'text-zinc-300' : 'text-slate-700';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const border = isDarkMode ? 'border-white/5' : 'border-slate-200';
  const rail = isDarkMode ? 'bg-zinc-950/50 border-zinc-800' : 'bg-white border-slate-200';
  const laneA = isDarkMode
    ? 'border-cyan-500/40 bg-cyan-500/5'
    : 'border-indigo-200 bg-indigo-50/60';
  const laneB = isDarkMode
    ? 'border-emerald-500/40 bg-emerald-500/5'
    : 'border-emerald-200 bg-emerald-50/60';
  const dash = isDarkMode ? 'border-white/10' : 'border-black/10';

  return (
    <div
      className={`flex h-[calc(100dvh-3.5rem)] flex-col overflow-hidden font-mono ${bg}`}
    >
      <header
        className={`shrink-0 border-b ${
          isDarkMode ? 'border-white/5 bg-black/40' : 'border-slate-200 bg-white/80'
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-2.5 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border ${
                isDarkMode ? 'border-zinc-800 bg-zinc-950' : 'border-slate-200 bg-white'
              }`}
            >
              <Crosshair className={`h-3.5 w-3.5 ${accent}`} />
            </div>
            <span className={`text-[11px] font-black uppercase tracking-[0.3em] ${main}`}>
              {TB_PRODUCT_HERO.brand}
            </span>
            <span
              className={`hidden h-5 w-px sm:block ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'}`}
            />
            <div className="min-w-0">
              <h1
                className={`truncate text-sm font-black uppercase tracking-[0.15em] sm:text-base ${main}`}
              >
                {TB_PRODUCT_HERO.title}
              </h1>
              <p className={`truncate text-[10px] font-black uppercase tracking-widest ${muted}`}>
                {TB_PRODUCT_HERO.subtitle}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href={TB_PRODUCT_CTAS.secondary.href}
              className={`hidden items-center gap-1.5 text-[10px] font-black uppercase tracking-widest sm:inline-flex ${muted} hover:opacity-80`}
            >
              Live workspace
              <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              href={TB_PRODUCT_CTAS.primary.href}
              className={`rounded-sm border px-3 py-1.5 text-[10px] font-black uppercase tracking-widest transition-colors ${
                isDarkMode
                  ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20'
                  : 'border-indigo-300 bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
              }`}
            >
              {TB_PRODUCT_CTAS.primary.label}
            </Link>
          </div>
        </div>
      </header>

      <div
        className={`shrink-0 border-b ${
          isDarkMode ? 'border-white/5 bg-black/20' : 'border-slate-200 bg-white/40'
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] overflow-x-auto px-4 scrollbar-hide sm:px-8">
          {TB_PRODUCT_TABS.map((t) => {
            const on = t.key === tab;
            const TabIcon = ICONS[t.key];
            const cls = tabClass(on, isDarkMode, border);
            const label = (
              <>
                <TabIcon className="h-3.5 w-3.5 shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  <span className="opacity-60">{t.n} · </span>
                  {t.label}
                </span>
                {on ? (
                  <motion.div
                    layoutId="tb-product-tab"
                    className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                      isDarkMode ? 'bg-cyan-500' : 'bg-indigo-600'
                    }`}
                  />
                ) : null}
              </>
            );

            // Only Ways in is URL-routed in this demo slice
            if (t.key === 'lanes') {
              return (
                <Link key={t.key} href={tbWaysInHref()} className={cls}>
                  {label}
                </Link>
              );
            }

            if (onWaysInRoute) {
              return (
                <Link key={t.key} href={`${TB_PRODUCT_BASE}/`} className={cls}>
                  {label}
                </Link>
              );
            }

            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setLocalTab(t.key)}
                className={cls}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <main className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 flex-col overflow-hidden px-4 py-3 sm:px-8">
        <div
          key={`${tab}-${laneSlug ?? 'all'}`}
          className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-5"
        >
          <section className="flex min-h-0 min-w-0 flex-col overflow-hidden">
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <Icon className={`h-4 w-4 ${accent}`} />
              <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${accent}`}>
                {meta.n} · {meta.label}
              </p>
              {onWaysInRoute ? (
                <span className={`font-mono text-[9px] uppercase tracking-widest ${muted}`}>
                  door {focusedLane ? focusedLane.id : 'A|B'}
                </span>
              ) : null}
            </div>
            <h2 className={`mt-1 shrink-0 text-lg font-black tracking-tight sm:text-xl ${main}`}>
              {focusedLane ? `${focusedLane.id} · ${focusedLane.name}` : meta.headline}
            </h2>
            <p className={`mt-1.5 shrink-0 text-[13px] font-semibold leading-snug ${accent}`}>
              {focusedLane ? focusedLane.capability : meta.value}
            </p>
            {focusedLane ? (
              <p className={`mt-1 shrink-0 text-[12px] leading-snug ${body}`}>{focusedLane.approach}</p>
            ) : null}

            {tab === 'lanes' ? (
              <div
                className={`mt-3 grid min-h-0 flex-1 gap-3 overflow-hidden ${
                  focusedLane ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
                }`}
              >
                {lanesToShow.map((lane) => {
                  const tone = lane.slug === 'a' ? laneA : laneB;
                  const stack = (
                    <div className="mt-3 flex min-h-0 flex-1 flex-col justify-center gap-1.5">
                      <p className={`text-[9px] font-black uppercase tracking-[0.25em] ${muted}`}>
                        CrisPRO stack
                      </p>
                      <div className="flex flex-wrap items-stretch gap-1.5">
                        {lane.stack.map((step, i) => (
                          <div key={step.layer} className="flex min-w-0 items-center gap-1.5">
                            <div
                              className={`min-w-0 rounded border px-2 py-1.5 ${
                                isDarkMode ? 'border-white/10 bg-black/30' : 'border-black/10 bg-white/70'
                              }`}
                            >
                              <p className={`text-[9px] font-black uppercase tracking-widest ${accent}`}>
                                {step.layer}
                              </p>
                              <p className={`truncate text-[11px] font-semibold ${main}`}>{step.label}</p>
                              <p className={`truncate font-mono text-[9px] ${muted}`}>{step.state}</p>
                            </div>
                            {i < lane.stack.length - 1 ? (
                              <span className={`shrink-0 text-[10px] ${muted}`}>→</span>
                            ) : null}
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <Link
                          href={lane.tryHref}
                          className={`inline-flex w-fit items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${accent}`}
                        >
                          Open case receipts
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                        {lane.boardHref ? (
                          <Link
                            href={lane.boardHref}
                            className={`inline-flex w-fit items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${muted}`}
                          >
                            Twin: board walk
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  );

                  const card = (
                    <>
                      <div className="flex items-baseline justify-between gap-2">
                        <p
                          className={`shrink-0 text-[10px] font-black uppercase tracking-widest ${accent}`}
                        >
                          {lane.id} · {lane.name}
                        </p>
                        <span className={`font-mono text-[9px] uppercase tracking-widest ${muted}`}>
                          door {lane.id}
                        </span>
                      </div>
                      <p className={`mt-1 shrink-0 text-[12px] font-semibold ${main}`}>{lane.when}</p>
                      {!focusedLane ? (
                        <p className={`mt-2 text-[12px] leading-snug ${body}`}>{lane.capability}</p>
                      ) : null}
                      {focusedLane ? stack : null}
                      <p
                        className={`mt-auto border-t border-dashed pt-2 text-[11px] leading-snug ${muted} ${dash}`}
                      >
                        {lane.honesty}
                      </p>
                      {!focusedLane ? (
                        <p
                          className={`pt-2 text-[10px] font-black uppercase tracking-widest ${accent}`}
                        >
                          Open door {lane.id} →
                        </p>
                      ) : null}
                    </>
                  );

                  if (focusedLane) {
                    return (
                      <div
                        key={lane.slug}
                        className={`flex min-h-0 flex-col overflow-hidden rounded border p-3 ${tone}`}
                      >
                        {card}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={lane.slug}
                      href={tbWaysInHref(lane.slug)}
                      className={`flex min-h-0 flex-col overflow-hidden rounded border p-3 transition-opacity hover:opacity-95 ${tone}`}
                    >
                      {card}
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="mt-3 flex min-h-0 flex-1 flex-col justify-center overflow-hidden">
                {meta.body.map((p) => (
                  <p key={p.slice(0, 48)} className={`text-[13px] leading-snug ${body}`}>
                    {p}
                  </p>
                ))}
                {meta.bullets ? (
                  <ul className={`mt-3 space-y-1.5 text-[12px] leading-snug ${body}`}>
                    {meta.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className={accent}>·</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {tab === 'decision' ? (
                  <div className="mt-4 grid shrink-0 gap-2 sm:grid-cols-2">
                    {TB_PRODUCT_LANES.map((lane) => (
                      <Link
                        key={lane.slug}
                        href={tbWaysInHref(lane.slug)}
                        className={`rounded border p-2.5 text-left transition-opacity hover:opacity-90 ${
                          lane.slug === 'a' ? laneA : laneB
                        }`}
                      >
                        <p className={`text-[9px] font-black uppercase tracking-widest ${accent}`}>
                          {lane.id} · open door
                        </p>
                        <p className={`mt-0.5 text-[12px] font-semibold ${main}`}>{lane.name}</p>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </section>

          <aside
            className={`flex shrink-0 flex-col justify-center gap-2 rounded border p-3 lg:self-stretch ${rail}`}
          >
            {tab === 'engage' ? (
              <>
                <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${accent}`}>
                  Do this next
                </p>
                <p className={`text-[12px] leading-snug ${body}`}>
                  One real profile in. Ranked package out.
                </p>
                <Link
                  href={TB_PRODUCT_CTAS.primary.href}
                  className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${accent}`}
                >
                  {TB_PRODUCT_CTAS.primary.label}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </>
            ) : tab === 'proof' ? (
              <>
                <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${accent}`}>
                  Check the ledger
                </p>
                <Link
                  href={TB_PRODUCT_CTAS.ledger.href}
                  className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${accent}`}
                >
                  {TB_PRODUCT_CTAS.ledger.label}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </>
            ) : tab === 'package' ? (
              <>
                <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${accent}`}>
                  On the screen
                </p>
                <ol className={`space-y-1 text-[11px] ${body}`}>
                  {['Drivers', 'Dependencies', 'Ranked options', 'Trials', 'Evidence + gaps'].map(
                    (s, i) => (
                      <li key={s} className="flex gap-2">
                        <span className={`font-black ${accent}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span>{s}</span>
                      </li>
                    ),
                  )}
                </ol>
              </>
            ) : tab === 'lanes' ? (
              <>
                <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${accent}`}>
                  Same walk
                </p>
                <p className={`text-[12px] leading-snug ${body}`}>
                  Case · Options · Gaps — either door.
                </p>
                <div className={`flex items-center gap-2 text-[11px] ${muted}`}>
                  <Layers className="h-3.5 w-3.5" />
                  One board
                </div>
                {focusedLane ? (
                  <Link
                    href={tbWaysInHref()}
                    className={`mt-1 text-[10px] font-black uppercase tracking-widest ${accent}`}
                  >
                    Both doors →
                  </Link>
                ) : null}
              </>
            ) : (
              <>
                <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${accent}`}>
                  Try it
                </p>
                <p className={`text-[12px] leading-snug ${body}`}>
                  Open a live case. Feel the shortlist.
                </p>
                <Link
                  href={TB_PRODUCT_CTAS.secondary.href}
                  className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${accent}`}
                >
                  {TB_PRODUCT_CTAS.secondary.label}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </>
            )}
          </aside>
        </div>
      </main>

      <footer
        className={`shrink-0 border-t ${border} ${isDarkMode ? 'bg-black/40' : 'bg-white/80'}`}
      >
        <div
          className={`mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest sm:px-8 ${muted}`}
        >
          <span>
            {onWaysInRoute
              ? `door ${focusedLane ? focusedLane.id : 'A|B'} · live case`
              : 'Tumor Board · RUO · no nested scroll'}
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="/tumor-board/"
              className={isDarkMode ? 'hover:text-cyan-400' : 'hover:text-indigo-600'}
            >
              Live workspace
            </Link>
            <span className={`h-3 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'}`} />
            <Link
              href="/contact/"
              className={isDarkMode ? 'hover:text-cyan-400' : 'hover:text-indigo-600'}
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
