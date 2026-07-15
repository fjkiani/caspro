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
import { PersonaContent, type PersonaCopyDeck } from '@/context/persona-content';

// ---- Persona-aware intro deck ---------------------------------------------
// Explains L5 · Synthetic-Lethality per audience. Numbers stay identical,
// voice changes. Anchored to mbd4-manuscript-data.ts.
// ---------------------------------------------------------------------------

type SLIntroCopy = { eyebrow: string; title: string; kicker: string };

const SL_INTRO_DECK: PersonaCopyDeck<SLIntroCopy> = {
  oncologist: {
    eyebrow: 'L5 · Engine · MBD4 synthetic-lethality',
    title: 'Synthetic-Lethality · MBD4',
    kicker: 'ATRi is the pivoted-to axis. PARPi is falsified at first premise.',
  },
  patient: {
    eyebrow: 'How this engine reads a tumor',
    title: 'Finding a targeted weakness in MBD4-broken tumors',
    kicker: 'Certain drugs (ATR inhibitors) hit MBD4-broken tumors hard. PARP inhibitors do not.',
  },
  pharma: {
    eyebrow: 'L5 · SL engine · BD portfolio',
    title: 'Rare-selective SL vulnerability · ATRi lead',
    kicker: 'Ceralasertib (AZD6738) lead; PARP hypothesis dead at n=19 LOF vs 1498 WT, p=0.605.',
  },
};

// ---- Body chrome deck ------------------------------------------------------
// Highlight-tile labels/titles, v3-engine sidebar section headers, footer prose
// and CTA labels. Numeric substrate (Chabot IC50 shifts, ATRi Δ LN_IC50, PARP1
// n counts, p-values, Cohen's d, effect sizes) held invariant.
// ---------------------------------------------------------------------------

type SLBodyCopy = {
  axisAxeLabel: string;
  axisAxeTitle: string;
  axisAxeBodyPrefix: string;
  axisCxeLabel: string;
  axisCxeTitle: string;
  parpiLabel: string;
  parpiTitle: string;
  parpiBodyPrefix: string;
  convergenceLabel: string;
  convergenceTitle: string;
  v3Eyebrow: string;
  v3PrimaryTestLabel: string;
  v3EffectSizeLabel: string;
  v3MultipleTestingLabel: string;
  v3PanEssentialLabel: string;
  v3PanEssentialCount: (n: number) => string;
  v3ApiLabel: string;
  footerLine: string;
  scrollCtaLabel: string;
  tabsCtaLabel: string;
  crossLinkCtaLabel: string;
};

const SL_BODY_DECK: PersonaCopyDeck<SLBodyCopy> = {
  oncologist: {
    axisAxeLabel: 'Axis A · gold-standard',
    axisAxeTitle: 'Cytidine analogs',
    axisAxeBodyPrefix: 'Chabot 2022',
    axisCxeLabel: 'Axis C · novel primary',
    axisCxeTitle: 'ATRi (ceralasertib)',
    parpiLabel: 'PARPi · falsified',
    parpiTitle: 'Hypothesis rejected',
    parpiBodyPrefix: 'PARP1 expression',
    convergenceLabel: 'Convergence',
    convergenceTitle: 'Cytidine + ATRi',
    v3Eyebrow: 'v3 SL engine · architecture',
    v3PrimaryTestLabel: 'Primary test',
    v3EffectSizeLabel: 'Effect size · Δ dependency',
    v3MultipleTestingLabel: 'Multiple testing',
    v3PanEssentialLabel: 'Pan-essential filter',
    v3PanEssentialCount: (n) => `${n}-gene hardcoded blacklist`,
    v3ApiLabel: 'Public API',
    footerLine: 'MBD4-LOF · dual therapeutic vulnerability · PARPi falsified',
    scrollCtaLabel: 'MBD4 · Scroll',
    tabsCtaLabel: 'MBD4 · Tabs',
    crossLinkCtaLabel: 'Cross-link · Target Lock',
  },
  patient: {
    axisAxeLabel: 'Path 1 · known drug family',
    axisAxeTitle: 'Cytidine chemo (gemcitabine family)',
    axisAxeBodyPrefix: 'Chabot 2022 lab data',
    axisCxeLabel: 'Path 2 · newer drug family',
    axisCxeTitle: 'ATR inhibitors (ceralasertib)',
    parpiLabel: 'PARP inhibitors — ruled out',
    parpiTitle: 'Not the right match',
    parpiBodyPrefix: 'Tumors with MBD4 broken',
    convergenceLabel: 'Two paths that agree',
    convergenceTitle: 'Chemo + ATR inhibitor',
    v3Eyebrow: 'How the tool decides',
    v3PrimaryTestLabel: 'The main statistical test',
    v3EffectSizeLabel: 'How big the effect is',
    v3MultipleTestingLabel: 'How we avoid false positives',
    v3PanEssentialLabel: 'What genes are excluded',
    v3PanEssentialCount: (n) => `${n} genes always excluded (needed by all cells)`,
    v3ApiLabel: 'Data access for researchers',
    footerLine: 'Broken MBD4 tumors have two treatment paths that work — the tool ruled out one that doesn’t.',
    scrollCtaLabel: 'Walk through MBD4 story',
    tabsCtaLabel: 'MBD4 tabs',
    crossLinkCtaLabel: 'See target-lock engine',
  },
  pharma: {
    axisAxeLabel: 'Axis A · gold-standard vector',
    axisAxeTitle: 'Cytidine analog franchise',
    axisAxeBodyPrefix: 'Chabot 2022 substrate',
    axisCxeLabel: 'Axis C · novel primary vector',
    axisCxeTitle: 'ATRi · ceralasertib (AZD6738) lead',
    parpiLabel: 'PARPi vector · falsified',
    parpiTitle: 'PARP hypothesis rejected',
    parpiBodyPrefix: 'PARP1 expression substrate',
    convergenceLabel: 'Dual-vector convergence',
    convergenceTitle: 'Cytidine + ATRi franchise-fit',
    v3Eyebrow: 'v3 SL engine · production architecture',
    v3PrimaryTestLabel: 'Primary statistical test',
    v3EffectSizeLabel: 'Effect size · Δ dependency',
    v3MultipleTestingLabel: 'Multiple-testing correction',
    v3PanEssentialLabel: 'Pan-essential exclusion filter',
    v3PanEssentialCount: (n) => `${n}-gene hardcoded exclusion list · substrate-locked`,
    v3ApiLabel: 'Public API · pharma access',
    footerLine: 'MBD4-LOF · dual-modality vulnerability · PARPi vector falsified · rare-selective franchise opportunity',
    scrollCtaLabel: 'MBD4 case · scroll narrative',
    tabsCtaLabel: 'MBD4 case · tabs',
    crossLinkCtaLabel: 'Cross-link · Target-Lock',
  },
};

// Substrate-derived numeric strings — held invariant across personas.
function buildHighlightSubstrate() {
  return {
    axisA: `gemcitabine IC50 ${AXIS_A_CYTIDINE.ic50Lof} (LOF) vs ${AXIS_A_CYTIDINE.ic50Wt} (WT) · ${AXIS_A_CYTIDINE.fold} shift · p=${AXIS_A_CYTIDINE.pValue}`,
    axisC: `n=${AXIS_C_ATR.primaryLnIc50.nLof}/${AXIS_C_ATR.primaryLnIc50.nWt} · Δ LN_IC50 ${AXIS_C_ATR.primaryLnIc50.delta} · p=${AXIS_C_ATR.primaryLnIc50.pValue} · d=${AXIS_C_ATR.primaryLnIc50.cohensD}. Signal strengthens under 4 stress tests.`,
    parpi: `n=${PARPI_FALSIFIED.parp1Expression.nLof} LOF vs ${PARPI_FALSIFIED.parp1Expression.nWtExpressionPool} pool · MWU p=${PARPI_FALSIFIED.parp1Expression.pValue}. PARPi is not the MBD4-selective vulnerability.`,
    convergence: CONVERGENCE.translational,
  };
}

export default function SyntheticLethalityIntroPage() {
  const { isDarkMode } = useTheme();
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';

  const substrate = buildHighlightSubstrate();

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

      {/* Header — persona-aware eyebrow + title */}
      <PersonaContent
        deck={SL_INTRO_DECK}
        render={(copy) => (
          <header className="relative z-10 shrink-0 px-4 sm:px-8 pt-4 sm:pt-5 flex items-start gap-3">
            <div className={`w-10 h-10 rounded border flex items-center justify-center shrink-0 ${panel}`}>
              <Beaker className={`w-5 h-5 ${accent}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className={`text-[9px] font-black uppercase tracking-[0.45em] ${accent}`}>{copy.eyebrow}</p>
              <h1 className={`text-base sm:text-lg font-black uppercase tracking-tight truncate ${textMain}`}>
                {copy.title}
              </h1>
              <p className={`text-[10px] leading-snug mt-0.5 line-clamp-2 ${textMuted}`}>{copy.kicker}</p>
            </div>
          </header>
        )}
      />

      {/* Body */}
      <PersonaContent
        deck={SL_BODY_DECK}
        render={(body) => {
          const highlights = [
            { icon: ShieldCheck, label: body.axisAxeLabel, title: body.axisAxeTitle, body: `${body.axisAxeBodyPrefix} · ${substrate.axisA}` },
            { icon: Layers, label: body.axisCxeLabel, title: body.axisCxeTitle, body: substrate.axisC },
            { icon: XCircle, label: body.parpiLabel, title: body.parpiTitle, body: `${body.parpiBodyPrefix} ${substrate.parpi}` },
            { icon: GitMerge, label: body.convergenceLabel, title: body.convergenceTitle, body: substrate.convergence },
          ];
          return (
            <>
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
                      {body.v3Eyebrow}
                    </span>
                    <span className={`text-[9px] font-bold uppercase ${textMuted}`}>{V3_ENGINE.codeSource}</span>
                  </div>
                  <div className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-4 py-2 sm:py-3 space-y-2">
                    <div>
                      <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${accent}`}>{body.v3PrimaryTestLabel}</p>
                      <p className={`text-[11px] ${textMain}`}>{V3_ENGINE.primaryTest}</p>
                    </div>
                    <div>
                      <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${accent}`}>{body.v3EffectSizeLabel}</p>
                      <p className={`text-[11px] ${textMain}`}>{V3_ENGINE.effectSize} · {V3_ENGINE.deltaDep}</p>
                    </div>
                    <div>
                      <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${accent}`}>{body.v3MultipleTestingLabel}</p>
                      <p className={`text-[11px] ${textMain}`}>{V3_ENGINE.multipleTesting}</p>
                    </div>
                    <div>
                      <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${accent}`}>{body.v3PanEssentialLabel}</p>
                      <p className={`text-[11px] ${textMain}`}>{V3_ENGINE.panEssentialRule}</p>
                      <p className={`text-[10px] mt-1 ${textMuted}`}>{body.v3PanEssentialCount(V3_ENGINE.panEssentialBlacklist.length)}</p>
                    </div>
                    <div>
                      <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${accent}`}>{body.v3ApiLabel}</p>
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
                  {body.footerLine}
                </p>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <Link
                    href="/engine/synthetic-lethality/scroll"
                    className={`inline-flex items-center gap-1.5 rounded-sm px-4 py-2.5 text-[10px] font-black uppercase tracking-widest border transition-colors ${
                      isDarkMode ? 'border-zinc-700 text-zinc-300 hover:border-cyan-500/50' : 'border-slate-300 text-slate-700 hover:border-indigo-400'
                    }`}
                  >
                    {body.scrollCtaLabel}
                  </Link>
                  <Link
                    href="/engine/synthetic-lethality/tabs"
                    className={`inline-flex items-center gap-1.5 rounded-sm px-4 py-2.5 text-[10px] font-black uppercase tracking-widest border transition-colors ${
                      isDarkMode ? 'border-zinc-700 text-zinc-300 hover:border-cyan-500/50' : 'border-slate-300 text-slate-700 hover:border-indigo-400'
                    }`}
                  >
                    {body.tabsCtaLabel}
                  </Link>
                  <Link
                    href="/engine/target-lock"
                    className={`inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-[11px] font-black uppercase tracking-widest transition-colors ${
                      isDarkMode ? 'bg-cyan-500 text-black hover:bg-cyan-400' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {body.crossLinkCtaLabel}
                    <ChevronRight className="w-4 h-4" aria-hidden />
                  </Link>
                </div>
              </footer>
            </>
          );
        }}
      />
    </div>
  );
}
