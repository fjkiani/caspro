'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { getActiveEngines, type EngineEntry } from '@/data/engine-registry';
import { getEngineIcon } from './engine-icons';
import EngineMiniPreview from './EngineMiniPreview';

function statusStyles(status: EngineEntry['status'], isDarkMode: boolean): string {
  switch (status) {
    case 'OPTIMIZED':
      return isDarkMode
        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
        : 'bg-emerald-50 text-emerald-800 border-emerald-200';
    case 'ACTIVE':
      return isDarkMode
        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
        : 'bg-sky-50 text-sky-800 border-sky-200';
    case 'STANDBY':
      return isDarkMode
        ? 'bg-zinc-800 text-zinc-400 border-zinc-700'
        : 'bg-slate-100 text-slate-600 border-slate-200';
    default:
      return isDarkMode
        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
        : 'bg-amber-50 text-amber-800 border-amber-200';
  }
}

function EngineCard({ engine, isDarkMode }: { engine: EngineEntry; isDarkMode: boolean }) {
  const Icon = getEngineIcon(engine.slug);
  const card = isDarkMode
    ? 'border-zinc-800 bg-zinc-950 hover:border-cyan-500/40 hover:shadow-[0_0_24px_-8px_rgba(34,211,238,0.25)]'
    : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-lg';
  const title = isDarkMode ? 'text-zinc-50' : 'text-slate-900';
  const desc = isDarkMode ? 'text-zinc-400' : 'text-slate-600';
  const layer = isDarkMode ? 'text-cyan-500/80' : 'text-indigo-600';

  return (
    <Link
      href={engine.route}
      className={`group flex flex-col overflow-hidden rounded-xl border transition-all ${card}`}
    >
      <div className="h-44 shrink-0 overflow-hidden">
        <EngineMiniPreview slug={engine.slug} isDarkMode={isDarkMode} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                isDarkMode ? 'border-zinc-700 bg-zinc-900' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <Icon className={`h-4 w-4 ${layer}`} aria-hidden />
            </div>
            <div className="min-w-0">
              <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${layer}`}>
                {engine.layer} · {engine.id}
              </p>
              <h2 className={`text-lg font-bold leading-tight truncate ${title}`}>{engine.label}</h2>
            </div>
          </div>
          <span className={`shrink-0 rounded border px-2 py-0.5 text-[9px] font-bold uppercase ${statusStyles(engine.status, isDarkMode)}`}>
            {engine.status}
          </span>
        </div>
        <p className={`text-sm leading-relaxed line-clamp-2 flex-1 ${desc}`}>{engine.desc}</p>
        <div className="mt-4 flex items-center justify-between gap-2 pt-3 border-t border-inherit">
          <span className={`text-xs font-mono font-semibold ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
            {engine.keyMetric}
          </span>
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${
              isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
            }`}
          >
            Open
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function EngineIndexClient() {
  const { isDarkMode } = useTheme();
  const engines = getActiveEngines();
  const navEngines = engines.filter((e) => e.showInEnginesNav !== false);

  return (
    <main
      className={`min-h-[calc(100vh-3.5rem)] pb-16 transition-colors ${
        isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        <header className="mb-10 md:mb-12 max-w-3xl">
          <p className={`text-[10px] font-black uppercase tracking-[0.4em] mb-3 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`}>
            CrisPRO · Intelligence stack
          </p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase">Engines</h1>
          <p className={`mt-4 text-base leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
            Seven layers from target lock through safety receipts — each engine is a live analytical surface. Pick a
            card to open the full workspace.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {navEngines.map((engine) => (
            <EngineCard key={engine.id} engine={engine} isDarkMode={isDarkMode} />
          ))}
        </div>

        {engines.some((e) => e.showInEnginesNav === false) && (
          <section className="mt-12">
            <h3 className={`text-xs font-black uppercase tracking-[0.3em] mb-4 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
              Internal / audit surfaces
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {engines
                .filter((e) => e.showInEnginesNav === false)
                .map((engine) => (
                  <EngineCard key={engine.id} engine={engine} isDarkMode={isDarkMode} />
                ))}
            </div>
          </section>
        )}

        <p className={`mt-12 text-center text-xs ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>
          Layer order: L1 Target-Lock → L2 MoA → L5 SL → L6 PGx → L7 Evidence ledger
        </p>
      </div>
    </main>
  );
}
