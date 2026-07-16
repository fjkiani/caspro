'use client';

// ==============================================================================
// /engine/mechanism-alignment/ — L2 intro (single viewport, no scroll).
//
// Purpose: single-page pharma-BD-legible answer to "what is L2 Mechanism
// Alignment and why should Sanofi care?" — the PATH A math kill-shot.
//
// Layout matches TargetLockIntroPage: header + 2-column grid.
//   left column  → PATH A formula card + explainer bullets + composite gate
//   right column → 7-axis chip grid + illustrative divergence teasers +
//                  deep-dive links (scroll + tabs)
// ==============================================================================

import Link from 'next/link';
import { Layers, ChevronRight, ShieldCheck, ArrowRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import {
  PATH_A_FORMULA,
  PATH_A_APPROVAL,
  COMPOSITE_EXPRESSION,
  MECHANISM_FIT_ALPHA,
  MECHANISM_FIT_BETA,
  MIN_ELIGIBILITY_THRESHOLD,
  MIN_MECHANISM_FIT_THRESHOLD,
  PATHWAYS_7D,
  AXES_8D,
  DIVERGENCE_CASES,
  MECHANISM_ALIGNMENT_EXPLAINER,
} from '@/data/mechanism-alignment-data';
import { PersonaContent, type PersonaCopyDeck } from '@/context/persona-content';

// ---- Persona-aware intro deck ---------------------------------------------
// L2 · Mechanism-Alignment per audience. PATH A signed 2026-04-28 badge
// stays visible for all personas — it's governance canon, not framing.
// ---------------------------------------------------------------------------

type BrMIntroCopy = { eyebrow: string; title: string; kicker: string };

const BRM_INTRO_DECK: PersonaCopyDeck<BrMIntroCopy> = {
  oncologist: {
    eyebrow: 'L2 · Engine · PATH A composite gate',
    title: 'Mechanism Alignment',
    kicker: 'PATH A ranker · 7 canonical axes + 1 opt-in RSS · composite 0.7·elig + 0.3·fit.',
  },
  patient: {
    eyebrow: 'How the tool matches treatments to your tumor',
    title: 'Aligning drug mechanism with tumor biology',
    kicker: 'The system compares drug fingerprints against tumor fingerprints across 7 biological pathways.',
  },
  pharma: {
    eyebrow: 'L2 · Ranker · PATH A locked',
    title: 'Mechanism Alignment · projection ranker',
    kicker: 'fit = clip((p·t) / ‖t‖₂, 0, 1). Composite = 0.7·elig + 0.3·fit. Dual floors 0.60/0.30.',
  },
};

// ---- Body chrome deck ------------------------------------------------------
// Section eyebrows, side-labels, composite-gate quads, note text, deep-dive
// tile bodies. Substrate (PATH_A_FORMULA, thresholds, axis keys, case IDs,
// verdict badges) held invariant across all personas.
// ---------------------------------------------------------------------------

type BrMBodyCopy = {
  formulaEyebrow: string;
  formulaFooter: string;
  explainerEyebrow: string;
  compositeEyebrow: string;
  compositeExprLegend: string;
  compositeAlphaLabel: string;
  compositeBetaLabel: string;
  compositeMinEligLabel: string;
  compositeMinFitLabel: string;
  compositeGateNote: string;
  axesEyebrow: string;
  axesCountLabel: string;
  rssChipLabel: string;
  rssChipCopy: string;
  divergenceEyebrow: string;
  divergenceCountLabel: (n: number) => string;
  deepDivesEyebrow: string;
  scrollTileEyebrow: string;
  scrollTileBody: string;
  tabsTileEyebrow: string;
  tabsTileBody: string;
};

const BRM_BODY_DECK: PersonaCopyDeck<BrMBodyCopy> = {
  oncologist: {
    formulaEyebrow: 'PATH A ranker · production formula',
    formulaFooter: 'p = patient mechanism vector · t = therapy mechanism vector · projection clipped to [0,1]. PATH B fallback is prohibited in every downstream surface.',
    explainerEyebrow: 'How Mechanism Alignment works',
    compositeEyebrow: 'Composite gate',
    compositeExprLegend: 'α · elig + β · fit',
    compositeAlphaLabel: 'α (eligibility)',
    compositeBetaLabel: 'β (fit)',
    compositeMinEligLabel: 'min eligibility',
    compositeMinFitLabel: 'min mechanism_fit',
    compositeGateNote: 'Both thresholds must clear. Neither can pass alone. Naive cosine can’t reproduce this — the gate is what turns strong axis alignment into a defensible go/no-go.',
    axesEyebrow: 'Canonical mechanism axes',
    axesCountLabel: '7 core + 1 opt-in',
    rssChipLabel: 'RSS · opt-in 8th axis',
    rssChipCopy: 'Replication-Stress Score — enabled only when the therapy modality demands it. Reference: PMID 34552099.',
    divergenceEyebrow: 'Illustrative divergence cases',
    divergenceCountLabel: (n) => `${n} case files`,
    deepDivesEyebrow: 'Engine deep dives',
    scrollTileEyebrow: 'Scroll surface',
    scrollTileBody: 'Case-by-case scroll through 3 illustrative divergence scenarios — patient vector, therapy vector, projection, composite verdict.',
    tabsTileEyebrow: 'Tab strip',
    tabsTileBody: 'One tab per case + a governance tab covering PATH A signature, RSS opt-in policy, and DL-07 quarantine rule.',
  },
  patient: {
    formulaEyebrow: 'The formula (plain-English)',
    formulaFooter: 'The tool builds two fingerprints — one for your tumor’s biology, one for how the drug works — and measures how well the drug lines up with the tumor. Higher line-up = better mechanistic match. The team locked in this method on 28 Apr 2026.',
    explainerEyebrow: 'How the matching works',
    compositeEyebrow: 'The go / no-go check',
    compositeExprLegend: 'Weighted score of two checks',
    compositeAlphaLabel: 'Weight on eligibility',
    compositeBetaLabel: 'Weight on mechanism match',
    compositeMinEligLabel: 'Minimum eligibility score',
    compositeMinFitLabel: 'Minimum mechanism match',
    compositeGateNote: 'A drug has to clear both minimums to be recommended for you — being strong on one alone is not enough. That’s how the tool avoids false-positive matches.',
    axesEyebrow: 'The biology dimensions checked',
    axesCountLabel: '7 always-on + 1 extra',
    rssChipLabel: 'Extra check — only when relevant',
    rssChipCopy: 'For drugs that stress a tumor’s DNA copying, the tool adds a Replication-Stress check. It’s turned off for drugs that don’t work through that path.',
    divergenceEyebrow: 'Example cases where the tool disagrees',
    divergenceCountLabel: (n) => `${n} example cases`,
    deepDivesEyebrow: 'See the full walk-through',
    scrollTileEyebrow: 'Scroll walk-through',
    scrollTileBody: 'Walks through 3 real examples: the patient tumor pattern, the drug pattern, the match score, and the go / no-go verdict.',
    tabsTileEyebrow: 'Tabbed view',
    tabsTileBody: 'The same three examples in tabs, plus a background tab explaining why the method was chosen and how it’s locked down.',
  },
  pharma: {
    formulaEyebrow: 'L2 ranker · locked production formula',
    formulaFooter: 'p = patient mechanism substrate vector · t = therapy mechanism substrate vector. Projection clipped to [0,1]. PATH A is signed audit-canon; PATH B is prohibited across every downstream surface, receipt, and BD deck.',
    explainerEyebrow: 'Mechanism Alignment · methodology',
    compositeEyebrow: 'Composite go/no-go gate',
    compositeExprLegend: 'α · elig + β · fit (dual-floor)',
    compositeAlphaLabel: 'α — eligibility weight',
    compositeBetaLabel: 'β — mechanism-fit weight',
    compositeMinEligLabel: 'Floor · eligibility',
    compositeMinFitLabel: 'Floor · mechanism_fit',
    compositeGateNote: 'Dual-floor gating: both eligibility and mechanism_fit must exceed their thresholds. Naive cosine cannot reproduce this — the gate is what converts strong axis alignment into an audit-defensible go/no-go for portfolio review.',
    axesEyebrow: 'Canonical mechanism substrate — 7-axis basis',
    axesCountLabel: '7 canonical + 1 modality-conditional',
    rssChipLabel: 'RSS — conditional 8th axis',
    rssChipCopy: 'Replication-Stress Score — engaged only when modality (e.g. ATRi, WEE1i) has published RS-dependent MoA. Reference substrate: PMID 34552099.',
    divergenceEyebrow: 'Franchise-fit divergence case files',
    divergenceCountLabel: (n) => `${n} case files · audited`,
    deepDivesEyebrow: 'BD-legible deep dives',
    scrollTileEyebrow: 'Scroll surface · narrative',
    scrollTileBody: 'Case-by-case narrative through 3 franchise-fit divergence scenarios — patient vector, therapy vector, projection math, composite verdict with governance trail.',
    tabsTileEyebrow: 'Tab strip · discrete',
    tabsTileBody: 'One tab per case + a governance tab surfacing PATH A signature, RSS opt-in policy, and DL-07 quarantine rule — designed for procurement / diligence review.',
  },
};

export default function MechanismAlignmentIntroPage() {
  const { isDarkMode } = useTheme();
  const accent = isDarkMode ? 'text-fuchsia-300' : 'text-fuchsia-600';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';
  const chip = isDarkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-200' : 'bg-slate-50 border-slate-200 text-slate-800';
  const chipRss = isDarkMode ? 'bg-fuchsia-950/40 border-fuchsia-800 text-fuchsia-200' : 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-800';

  return (
    <div
      className={`relative h-[calc(100dvh-3.5rem)] overflow-hidden font-mono flex flex-col ${
        isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-white text-slate-900'
      }`}
    >
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDarkMode
            ? 'bg-[linear-gradient(to_right,#F0ABFC08_1px,transparent_1px),linear-gradient(to_bottom,#F0ABFC08_1px,transparent_1px)]'
            : 'bg-[linear-gradient(to_right,#a21caf08_1px,transparent_1px),linear-gradient(to_bottom,#a21caf08_1px,transparent_1px)]'
        } bg-[size:48px_48px]`}
      />

      {/* Header — persona-aware eyebrow + title. PATH A badge is governance canon → stays outside deck. */}
      <header className="relative z-10 shrink-0 px-4 sm:px-8 pt-4 sm:pt-5 flex items-start gap-3">
        <div className={`w-10 h-10 rounded border flex items-center justify-center shrink-0 ${panel}`}>
          <Layers className={`w-5 h-5 ${accent}`} />
        </div>
        <PersonaContent
          deck={BRM_INTRO_DECK}
          render={(copy) => (
            <div className="min-w-0 flex-1">
              <p className={`text-[9px] font-black uppercase tracking-[0.45em] ${accent}`}>{copy.eyebrow}</p>
              <h1 className={`text-base sm:text-lg font-black uppercase tracking-tight truncate ${textMain}`}>
                {copy.title}
              </h1>
              <p className={`text-[10px] leading-snug mt-0.5 line-clamp-2 ${textMuted}`}>{copy.kicker}</p>
            </div>
          )}
        />
        <div className="ml-auto hidden sm:flex items-center gap-2 shrink-0">
          <span className={`text-[10px] font-bold uppercase ${textMuted}`}>PATH A</span>
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase ${accent}`}>
            <ShieldCheck className="w-3 h-3" />
            signed 2026-04-28
          </span>
        </div>
      </header>

      {/* Body — 2-col grid */}
      <PersonaContent
        deck={BRM_BODY_DECK}
        render={(body) => (
          <div className="relative z-10 flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-3 sm:gap-5 px-4 sm:px-8 py-2 sm:py-3">
            {/* Left column */}
            <div className="min-h-0 flex flex-col gap-2 sm:gap-3 overflow-hidden">

              {/* Formula card */}
              <section className={`rounded-sm border p-3 sm:p-4 shrink-0 ${panel}`}>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>
                  {body.formulaEyebrow}
                </p>
                <div className={`rounded border px-3 py-2 text-center ${isDarkMode ? 'border-zinc-700 bg-zinc-900/60' : 'border-slate-200 bg-slate-50'}`}>
                  <code className={`text-sm sm:text-base font-black ${textMain}`}>{PATH_A_FORMULA}</code>
                </div>
                <p className={`mt-2 text-[10px] leading-snug ${textMuted}`}>
                  {body.formulaFooter}
                </p>
              </section>

              {/* Explainer bullets */}
              <section className={`rounded-sm border p-3 sm:p-4 shrink-0 ${panel}`}>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>
                  {body.explainerEyebrow}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {MECHANISM_ALIGNMENT_EXPLAINER.map((item) => (
                    <div key={item.label} className="min-w-0">
                      <span className={`text-[9px] font-black uppercase block ${textMuted}`}>{item.label}</span>
                      <p className={`text-[11px] sm:text-xs leading-snug mt-0.5 ${textMain}`}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Composite gate */}
              <section className={`rounded-sm border flex-1 min-h-0 flex flex-col overflow-hidden ${panel}`}>
                <div className={`shrink-0 flex items-center justify-between px-3 py-2 border-b ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${textMain}`}>
                    {body.compositeEyebrow}
                  </span>
                  <span className={`text-[9px] font-bold uppercase ${textMuted}`}>{body.compositeExprLegend}</span>
                </div>
                <div className="flex-1 min-h-0 px-3 py-2 sm:py-3 space-y-2">
                  <div className={`rounded border px-3 py-2 text-center ${isDarkMode ? 'border-zinc-700 bg-zinc-900/40' : 'border-slate-200 bg-slate-50'}`}>
                    <code className={`text-xs sm:text-sm font-black ${textMain}`}>{COMPOSITE_EXPRESSION}</code>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className={`rounded border p-2 ${panel}`}>
                      <p className={`text-[9px] font-black uppercase ${textMuted}`}>{body.compositeAlphaLabel}</p>
                      <p className={`text-sm font-black ${textMain}`}>{MECHANISM_FIT_ALPHA}</p>
                    </div>
                    <div className={`rounded border p-2 ${panel}`}>
                      <p className={`text-[9px] font-black uppercase ${textMuted}`}>{body.compositeBetaLabel}</p>
                      <p className={`text-sm font-black ${textMain}`}>{MECHANISM_FIT_BETA}</p>
                    </div>
                    <div className={`rounded border p-2 ${panel}`}>
                      <p className={`text-[9px] font-black uppercase ${textMuted}`}>{body.compositeMinEligLabel}</p>
                      <p className={`text-sm font-black ${textMain}`}>{MIN_ELIGIBILITY_THRESHOLD.toFixed(2)}</p>
                    </div>
                    <div className={`rounded border p-2 ${panel}`}>
                      <p className={`text-[9px] font-black uppercase ${textMuted}`}>{body.compositeMinFitLabel}</p>
                      <p className={`text-sm font-black ${textMain}`}>{MIN_MECHANISM_FIT_THRESHOLD.toFixed(2)}</p>
                    </div>
                  </div>
                  <p className={`text-[10px] leading-snug ${textMuted}`}>
                    {body.compositeGateNote}
                  </p>
                </div>
              </section>
            </div>

            {/* Right column */}
            <div className="min-h-0 flex flex-col gap-2 sm:gap-3 overflow-hidden">

              {/* Axis chips */}
              <section className={`rounded-sm border p-3 sm:p-4 shrink-0 ${panel}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${accent}`}>
                    {body.axesEyebrow}
                  </span>
                  <span className={`text-[9px] font-bold uppercase ${textMuted}`}>{body.axesCountLabel}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {PATHWAYS_7D.map((p) => (
                    <div key={p.key} className={`rounded border px-2 py-1.5 ${chip}`}>
                      <p className="text-[9px] font-black uppercase leading-none">{p.label}</p>
                      <p className={`text-[9px] leading-snug mt-0.5 ${textMuted}`}>{p.name}</p>
                    </div>
                  ))}
                  <div className={`rounded border px-2 py-1.5 col-span-2 sm:col-span-4 ${chipRss}`}>
                    <p className="text-[9px] font-black uppercase leading-none">{body.rssChipLabel}</p>
                    <p className="text-[9px] leading-snug mt-0.5 opacity-80">{body.rssChipCopy}</p>
                  </div>
                </div>
              </section>

              {/* Divergence teasers */}
              <section className={`rounded-sm border flex-1 min-h-0 flex flex-col overflow-hidden ${panel}`}>
                <div className={`shrink-0 flex items-center justify-between px-3 py-2 border-b ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${textMain}`}>{body.divergenceEyebrow}</span>
                  <span className={`text-[9px] font-bold uppercase ${textMuted}`}>{body.divergenceCountLabel(DIVERGENCE_CASES.length)}</span>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-transparent">
                  {DIVERGENCE_CASES.map((c) => (
                    <div
                      key={c.id}
                      className={`px-3 py-2 sm:py-2.5 border-b last:border-b-0 ${
                        isDarkMode ? 'border-zinc-800/70' : 'border-slate-100'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className={`text-[10px] font-black uppercase mt-0.5 ${accent}`}>
                          {c.id}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className={`text-[12px] font-bold leading-snug ${textMain}`}>{c.title}</p>
                          <p className={`text-[10px] leading-snug mt-0.5 ${textMuted}`}>{c.audience}</p>
                        </div>
                        <span className={`shrink-0 text-[9px] font-black uppercase rounded px-1.5 py-0.5 ${c.outcome.verdict === 'FAIL' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                          {c.outcome.verdict}
                        </span>
                      </div>
                      <p className={`mt-1 text-[10px] leading-snug ${textMuted}`}>
                        <span className={`font-bold ${textMain}`}>{c.conflict.label}:</span> {c.conflict.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Deep dives */}
              <section className={`rounded-sm border p-3 sm:p-4 shrink-0 ${panel}`}>
                <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${accent}`}>
                  {body.deepDivesEyebrow}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Link
                    href="/engine/mechanism-alignment/scroll"
                    className={`group flex items-start gap-2 rounded-sm border p-2.5 transition-colors ${panel} ${
                      isDarkMode ? 'hover:border-fuchsia-500/40' : 'hover:border-fuchsia-300'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className={`text-[10px] font-black uppercase tracking-[0.15em] ${accent}`}>{body.scrollTileEyebrow}</p>
                      <p className={`mt-1 text-[11px] leading-snug ${textMain}`}>
                        {body.scrollTileBody}
                      </p>
                    </div>
                    <ArrowRight className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${accent}`} />
                  </Link>
                  <Link
                    href="/engine/mechanism-alignment/tabs"
                    className={`group flex items-start gap-2 rounded-sm border p-2.5 transition-colors ${panel} ${
                      isDarkMode ? 'hover:border-fuchsia-500/40' : 'hover:border-fuchsia-300'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className={`text-[10px] font-black uppercase tracking-[0.15em] ${accent}`}>{body.tabsTileEyebrow}</p>
                      <p className={`mt-1 text-[11px] leading-snug ${textMain}`}>
                        {body.tabsTileBody}
                      </p>
                    </div>
                    <ArrowRight className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${accent}`} />
                  </Link>
                </div>
                <p className={`mt-2 text-[9px] italic leading-snug ${textMuted}`}>
                  {PATH_A_APPROVAL}
                </p>
              </section>
            </div>
          </div>
        )}
      />
    </div>
  );
}
