'use client';

// ============================================================================
// SyntheticLethalityIntroPage.tsx — L5 SL engine intro. Single-viewport (matches
// TargetLockIntroPage grammar). Promotes the MBD4 manuscript scroll + tab
// deep-dive routes and the pharma /sl-bridge public API.
// ============================================================================

import Link from 'next/link';
import { ChevronRight, Beaker, Layers, XCircle, ShieldCheck, GitMerge } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { AXIS_A_CYTIDINE, AXIS_C_ATR, PARPI_FALSIFIED, CONVERGENCE, V3_ENGINE } from '@/data/mbd4-manuscript-data';

export default function SyntheticLethalityIntroPage() {
  const { isDarkMode } = useTheme();
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';

  const highlights = [
    {
      icon: ShieldCheck,
      label: 'Axis A · gold-standard',
      title: 'Cytidine analogs',
      body: `Chabot 2022 · gemcitabine IC50 ${AXIS_A_CYTIDINE.ic50Lof} (LOF) vs ${AXIS_A_CYTIDINE.ic50Wt} (WT) · ${AXIS_A_CYTIDINE.fold} shift · p=${AXIS_A_CYTIDINE.pValue}`,
    },
    {
      icon: Layers,
      label: 'Axis C · novel primary',
      title: 'ATRi (ceralasertib)',
      body: `n=${AXIS_C_ATR.primaryLnIc50.nLof}/${AXIS_C_ATR.primaryLnIc50.nWt} · Δ LN_IC50 ${AXIS_C_ATR.primaryLnIc50.delta} · p=${AXIS_C_ATR.primaryLnIc50.pValue} · d=${AXIS_C_ATR.primaryLnIc50.cohensD}. Signal strengthens under 4 stress tests.`,
    },
    {
      icon: XCircle,
      label: 'PARPi · falsified',
      title: 'Hypothesis rejected',
      body: `PARP1 expression n=${PARPI_FALSIFIED.parp1Expression.nLof} LOF vs ${PARPI_FALSIFIED.parp1Expression.nWtExpressionPool} pool · MWU p=${PARPI_FALSIFIED.parp1Expression.pValue}. PARPi is not the MBD4-selective vulnerability.`,
    },
    {
      icon: GitMerge,
      label: 'Convergence',
      title: 'Cytidine + ATRi',
      body: CONVERGENCE.translational,
    },
  ];

  return (
    <div
      className={`relative h-[calc(100dvh-3.5rem)] overflow-hidden font-mono flex flex-col ${
        isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-white text-slate-900'
      }`}
    >
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDarkMode
            ? 'bg-[linear-gradient(to_right,#00E5FF05_1px,transparent_1px),linear-gradient(to_bottom,#00E5FF05_1px,transparent_1px)]'
            : 'bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)]'
        } bg-[size:48px_48px]`}
      />

      {/* Header */}
      <header className="relative z-10 shrink-0 px-4 sm:px-8 pt-4 sm:pt-5 flex items-center gap-3">
        <div className={`w-10 h-10 rounded border flex items-center justify-center ${panel}`}>
          <Beaker className={`w-5 h-5 ${accent}`} />
        </div>
        <div className="min-w-0">
          <p className={`text-[9px] font-black uppercase tracking-[0.45em] ${accent}`}>L5 · ENGINE</p>
          <h1 className={`text-base sm:text-lg font-black uppercase tracking-tight truncate ${textMain}`}>
            Synthetic-Lethality · MBD4
          </h1>
        </div>
      </header>

      {/* Body */}
      <div className="relative z-10 flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-3 sm:gap-5 px-4 sm:px-8 py-2 sm:py-3">
        {/* Left column — 4 highlight tiles */}
        <div className="min-h-0 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {highlights.map((h) => (
            <section key={h.label} className={`rounded-sm border p-3 sm:p-4 ${panel}`}>
              <div className={`flex items-center gap-2 mb-2 ${accent}`}>
                <h.icon className="w-3.5 h-3.5" />
                <span className={`text-[9px] font-black uppercase tracking-widest`}>{h.label}</span>
              </div>
              <p className={`text-[13px] font-black mb-1 ${textMain}`}>{h.title}</p>
              <p className={`text-[11px] leading-snug ${textMuted}`}>{h.body}</p>
            </section>
          ))}
        </div>

        {/* Right column — v3 engine + API */}
        <div className={`min-h-0 flex flex-col overflow-hidden rounded-sm border ${panel}`}>
          <div className={`shrink-0 flex items-center justify-between px-3 py-2 border-b ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
            <span className={`text-[10px] font-black uppercase tracking-widest ${textMain}`}>
              v3 SL engine · architecture
            </span>
            <span className={`text-[9px] font-bold uppercase ${textMuted}`}>{V3_ENGINE.codeSource}</span>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-4 py-2 sm:py-3 space-y-2">
            <div>
              <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${accent}`}>Primary test</p>
              <p className={`text-[11px] ${textMain}`}>{V3_ENGINE.primaryTest}</p>
            </div>
            <div>
              <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${accent}`}>Effect size · Δ dependency</p>
              <p className={`text-[11px] ${textMain}`}>{V3_ENGINE.effectSize} · {V3_ENGINE.deltaDep}</p>
            </div>
            <div>
              <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${accent}`}>Multiple testing</p>
              <p className={`text-[11px] ${textMain}`}>{V3_ENGINE.multipleTesting}</p>
            </div>
            <div>
              <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${accent}`}>Pan-essential filter</p>
              <p className={`text-[11px] ${textMain}`}>{V3_ENGINE.panEssentialRule}</p>
              <p className={`text-[10px] mt-1 ${textMuted}`}>{V3_ENGINE.panEssentialBlacklist.length}-gene hardcoded blacklist</p>
            </div>
            <div>
              <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${accent}`}>Public API</p>
              <p className={`text-[11px] ${textMain}`}>{V3_ENGINE.api.prefix} · {V3_ENGINE.api.auth}</p>
              <ul className={`text-[10px] mt-1 space-y-0.5 ${textMuted}`}>
                {V3_ENGINE.api.endpoints.map((e) => (
                  <li key={e} className="font-mono">▸ {e}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer nav */}
      <footer className={`relative z-10 shrink-0 px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between gap-3 border-t ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
        <p className={`hidden sm:block text-[9px] font-bold uppercase tracking-[0.25em] ${textMuted}`}>
          MBD4-LOF · dual therapeutic vulnerability · PARPi falsified
        </p>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Link
            href="/engine/synthetic-lethality/scroll"
            className={`inline-flex items-center gap-1.5 rounded-sm px-4 py-2.5 text-[10px] font-black uppercase tracking-widest border transition-colors ${
              isDarkMode ? 'border-zinc-700 text-zinc-300 hover:border-cyan-500/50' : 'border-slate-300 text-slate-700 hover:border-indigo-400'
            }`}
          >
            MBD4 · Scroll
          </Link>
          <Link
            href="/engine/synthetic-lethality/tabs"
            className={`inline-flex items-center gap-1.5 rounded-sm px-4 py-2.5 text-[10px] font-black uppercase tracking-widest border transition-colors ${
              isDarkMode ? 'border-zinc-700 text-zinc-300 hover:border-cyan-500/50' : 'border-slate-300 text-slate-700 hover:border-indigo-400'
            }`}
          >
            MBD4 · Tabs
          </Link>
          <Link
            href="/engine/target-lock"
            className={`inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-[11px] font-black uppercase tracking-widest transition-colors ${
              isDarkMode ? 'bg-cyan-500 text-black hover:bg-cyan-400' : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            Cross-link · Target Lock
            <ChevronRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
      </footer>
    </div>
  );
}
