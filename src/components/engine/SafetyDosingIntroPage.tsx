'use client';

/**
 * SafetyDosingIntroPage — L5 Safety & Dosing engine intro.
 *
 * Single-viewport, mirrors SyntheticLethalityIntroPage grammar. Surfaces:
 *   - PREPARE outcome-linked validation (RRR 83.1% in actionable carriers)
 *   - CYP2C19-clopidogrel (RR 4.28, p=6.7×10⁻⁴)
 *   - Nguyen 2024 DPYD real-world (63.6% G3 tox reactive vs 30.4% wild-type)
 *   - CPIC concordance (10/10 exact match, 100%)
 *   - Tier 2 heuristic (100% sensitivity, 6/6 toxicity cases identified)
 *
 * SOURCE: Fahad Kiani directive 2026-07-10 — "PGx dosing page is still slop";
 * "safety-dosing scaffolding must explain what CrisPRO offers". Data from
 * crispro/publications/05-pgx-dosing-guidance/ receipts, mirrored under
 * src/data/pgx-receipts/.
 */

import Link from 'next/link';
import { ShieldCheck, AlertTriangle, Activity, CheckSquare, LineChart } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { PersonaContent, type PersonaCopyDeck } from '@/context/persona-content';
import { PGX_HEADLINE_METRICS } from '@/data/pgx-receipts';

// ─── persona intro decks ──────────────────────────────────────────────────

const INTRO_DECK: PersonaCopyDeck<{
  eyebrow: string;
  headline: string;
  body: string;
}> = {
  oncologist: {
    eyebrow: 'L5 · SAFETY & DOSING',
    headline: 'CPIC-concordant deterministic veto gate',
    body:
      'CrisPRO Safety & Dosing runs as a deterministic gate before any therapy recommendation surfaces. It reads the patient PGx profile, matches to CPIC guidelines (100% concordance on 10 test cases), and vetoes contraindicated dosing before the ranker sees the candidate. Receipts below are outcome-linked (not simulated): PREPARE (n=563, actionable-carrier RRR 83.1%), CYP2C19-clopidogrel (n=210, RR 4.28), Nguyen 2024 real-world DPYD (n=442 outcomes, reactive testing 63.6% G3 vs wild-type 30.4%).',
  },
  patient: {
    eyebrow: 'MEDICATION SAFETY',
    headline: 'Genetic checks that catch dangerous doses before they happen',
    body:
      'Some medications interact with your genes. If the wrong dose is given, side-effects can be severe — and sometimes prevented. CrisPRO checks published clinical safety rules (CPIC guidelines) against your genetic profile before any therapy is suggested. Below are the real trial results proving this catches dangerous doses: 83% fewer bad side-effects for patients where genetic guidance was actionable (PREPARE trial, n=563 patients).',
  },
  pharma: {
    eyebrow: 'CPIC VETO GATE // 5 RECEIPT SOURCES',
    headline: 'Trial failure prevention — deterministic PGx layer',
    body:
      'PREPARE (Lancet 2023, PMID 39641926) validates the outcome-linkage: actionable carriers RRR 83.1% (p=0.054), signal localisation 20× stronger than ITT. CYP2C19-clopidogrel (PMID 40944685) confirms PM/IM 4.28× event risk (p=6.7×10⁻⁴, multivariate HR 5.26, 95% CI 1.87-14.56). Nguyen 2024 (PMID 38935897, JCO Precis Oncol) shows real-world implementation: 442 outcome-evaluated GI-malignancy patients, DPYD reactive-only testing → 63.6% G3 tox vs pretreatment screening 31.3%. 100% CPIC exact-match concordance across 10 test cases (DPYD n=9, TPMT n=1). Tier 2 heuristic 100% sensitivity (6/6 known toxicities identified pre-treatment). Positions Brenus haptenated whole-cell + mFOLFOX6 chemo backbone under CrisPRO PGx veto: mitigates DPYD-related 5-FU toxicity in MSS CRC arm before enrollment.',
  },
};

const CARD_DECK: PersonaCopyDeck<{
  prepareHeadline: string;
  cypHeadline: string;
  nguyenHeadline: string;
  cpicHeadline: string;
  tier2Headline: string;
}> = {
  oncologist: {
    prepareHeadline: 'Actionable-carrier RRR — outcome linked',
    cypHeadline: 'Clopidogrel PM/IM risk — 210-pt subset',
    nguyenHeadline: 'Real-world DPYD — pretreatment vs reactive',
    cpicHeadline: 'CPIC concordance — 100% exact match',
    tier2Headline: 'Tier 2 heuristic — 100% sensitivity',
  },
  patient: {
    prepareHeadline: 'Trial evidence: 83% fewer bad reactions',
    cypHeadline: 'Blood-thinner example: 4× more strokes without testing',
    nguyenHeadline: 'Chemo example: worse outcomes when we test too late',
    cpicHeadline: 'Rules used: matched to clinical guidelines',
    tier2Headline: 'Backup screen: catches every known dangerous case',
  },
  pharma: {
    prepareHeadline: 'PREPARE outcome-linked · signal localisation 20×',
    cypHeadline: 'CYP2C19 · Fisher exact 6.7×10⁻⁴ · HR 5.26',
    nguyenHeadline: 'Nguyen 2024 · PMID 38935897 · JCO Precis Oncol',
    cpicHeadline: 'CPIC 10/10 · DPYD 9 · TPMT 1 · zero discordance',
    tier2Headline: 'Tier 2 heuristic · TP 6 / FN 0 · specificity 10%',
  },
};

// ─── shared numeric receipt (data is data, not per-persona) ──────────────

const M = PGX_HEADLINE_METRICS;

const RECEIPT_STATS = [
  {
    key: 'prepare',
    icon: LineChart,
    label: 'PREPARE',
    tone: 'text-emerald-400',
    stats: [
      `n=${M.prepare.total_patients}`,
      `actionable RRR ${(M.prepare.actionable_rrr * 100).toFixed(1)}%`,
      `p=${M.prepare.actionable_p.toFixed(3)}`,
    ],
  },
  {
    key: 'cyp2c19',
    icon: AlertTriangle,
    label: 'CYP2C19',
    tone: 'text-amber-400',
    stats: [
      `n=${M.cyp2c19.total}`,
      `RR ${M.cyp2c19.risk_ratio}`,
      `p=${M.cyp2c19.p_value.toExponential(1)}`,
    ],
  },
  {
    key: 'nguyen',
    icon: Activity,
    label: 'DPYD real-world',
    tone: 'text-rose-400',
    stats: [
      `WT ${M.nguyen.wt_g3.toFixed(1)}% G3`,
      `Pretreat ${M.nguyen.pre_g3.toFixed(1)}%`,
      `Reactive ${M.nguyen.react_g3.toFixed(1)}%`,
    ],
  },
  {
    key: 'cpic',
    icon: CheckSquare,
    label: 'CPIC concordance',
    tone: 'text-cyan-400',
    stats: [
      `${M.cpic.matched}/${M.cpic.matched}`,
      `${(M.cpic.concordance_rate * 100).toFixed(0)}%`,
      `exact matches ${M.cpic.exact_matches}`,
    ],
  },
  {
    key: 'tier2',
    icon: ShieldCheck,
    label: 'Tier 2 heuristic',
    tone: 'text-indigo-400',
    stats: [
      `TP ${M.tier2.tp}/${M.tier2.tp + M.tier2.fn}`,
      `sens ${(M.tier2.sensitivity * 100).toFixed(0)}%`,
      `spec ${(M.tier2.specificity * 100).toFixed(0)}%`,
    ],
  },
];

export default function SafetyDosingIntroPage() {
  const { isDarkMode } = useTheme();
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const panel = isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200';
  const textMain = isDarkMode ? 'text-zinc-100' : 'text-slate-900';
  const textMuted = isDarkMode ? 'text-zinc-400' : 'text-slate-600';

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
      <header className="relative z-10 shrink-0 px-4 sm:px-8 pt-4 sm:pt-5 flex items-start gap-3">
        <div className={`w-10 h-10 rounded border flex items-center justify-center ${panel} shrink-0`}>
          <ShieldCheck className={`w-5 h-5 ${accent}`} />
        </div>
        <PersonaContent
          deck={INTRO_DECK}
          render={(copy) => (
            <div className="min-w-0 flex-1">
              <p className={`text-[9px] font-black uppercase tracking-[0.45em] ${accent}`}>{copy.eyebrow}</p>
              <h1 className={`text-base sm:text-lg font-black uppercase tracking-tight ${textMain}`}>
                {copy.headline}
              </h1>
              <p className={`text-[11px] mt-1 leading-relaxed max-w-4xl ${textMuted}`}>{copy.body}</p>
            </div>
          )}
        />
      </header>

      {/* Receipt grid */}
      <main className="relative z-10 flex-1 min-h-0 px-4 sm:px-8 py-4 overflow-y-auto">
        <PersonaContent
          deck={CARD_DECK}
          render={(headlines) => (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {RECEIPT_STATS.map((s) => {
                const Icon = s.icon;
                const headlineKey = `${s.key}Headline` as keyof typeof headlines;
                return (
                  <article
                    key={s.key}
                    className={`rounded border p-3 flex flex-col gap-2 min-h-[160px] ${panel}`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${s.tone}`} />
                      <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${s.tone}`}>
                        {s.label}
                      </span>
                    </div>
                    <p className={`text-[13px] font-bold leading-tight ${textMain}`}>
                      {headlines[headlineKey]}
                    </p>
                    <ul className={`mt-auto text-[10px] space-y-0.5 ${textMuted}`}>
                      {s.stats.map((stat, i) => (
                        <li key={i} className="font-mono">
                          {stat}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          )}
        />
      </main>

      {/* Footer routes */}
      <footer
        className={`relative z-10 shrink-0 border-t px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 ${
          isDarkMode ? 'border-zinc-800' : 'border-slate-200'
        }`}
      >
        <p className={`text-[10px] ${textMuted}`}>
          Sources: PREPARE (PMID {M.prepare.source_pmid}, Lancet 2023) · CYP2C19-clopidogrel (PMID{' '}
          {M.cyp2c19.source_pmid}) · Nguyen 2024 DPYD (PMID {M.nguyen.source_pmid}, JCO Precis Oncol)
        </p>
        <div className="flex gap-2">
          <Link
            href="/engine/safety-dosing/scroll/"
            className={`rounded border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] transition-colors ${
              isDarkMode
                ? 'border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF10]'
                : 'border-indigo-600 text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            Scroll → full receipt narrative
          </Link>
          <Link
            href="/engine/safety-dosing/tabs/"
            className={`rounded border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] transition-colors ${
              isDarkMode
                ? 'border-violet-500 text-violet-300 hover:bg-violet-950/40'
                : 'border-violet-600 text-violet-700 hover:bg-violet-50'
            }`}
          >
            Tabs → single-viewport
          </Link>
        </div>
      </footer>
    </div>
  );
}
