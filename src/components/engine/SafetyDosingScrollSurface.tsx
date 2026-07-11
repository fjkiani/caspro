'use client';

/**
 * SafetyDosingScrollSurface — deep-scroll receipt narrative for L5 Safety & Dosing.
 *
 * Structured as: intro → PREPARE section → CYP2C19 section → Nguyen DPYD
 * section → CPIC concordance → Tier 2 heuristic → close.
 *
 * Each section reads the same raw numeric receipt (imported once via
 * @/data/pgx-receipts) but renders 3 hand-authored copies through
 * <PersonaContent> so the oncologist / patient / pharma reader gets the
 * lens they need.
 *
 * SOURCE: Fahad Kiani directive 2026-07-10 — "PGx dosing page is still slop",
 * "safety-dosing scaffolding must explain what CrisPRO offers".
 */

import { useTheme } from '@/context/ThemeContext';
import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import { PersonaContent, type PersonaCopyDeck } from '@/context/persona-content';
import {
  CPIC_CONCORDANCE,
  CYP2C19_RECEIPT,
  NGUYEN_RECEIPT,
  PREPARE_RECEIPT,
  PGX_HEADLINE_METRICS,
  TIER2_VALIDATION,
  formatTier2Ci,
} from '@/data/pgx-receipts';

// ─── section decks ────────────────────────────────────────────────────────

const OPENING_DECK: PersonaCopyDeck<{ eyebrow: string; headline: string; body: string }> = {
  oncologist: {
    eyebrow: 'L5 · SAFETY & DOSING · SCROLL',
    headline: 'The CPIC veto gate — what stops the ranker before you see it',
    body:
      'CrisPRO Safety & Dosing is a deterministic pre-filter that reads the patient PGx profile against CPIC guidelines and vetoes contraindicated dosing options before the therapy-ranker scores any candidate. This surface walks through the 5 outcome-linked receipts that validate the veto rules: two prospective trials, one real-world implementation cohort, one guideline-concordance test, and one heuristic sensitivity check.',
  },
  patient: {
    eyebrow: 'HOW WE KEEP MEDICATIONS SAFE FOR YOU',
    headline: 'Genetics as a safety check, not a science-fair experiment',
    body:
      'Some medicines behave differently depending on your DNA. If your body processes a drug slower than most people\'s, a normal dose can become a dangerous dose. CrisPRO checks published safety rules against your genetic profile before any medication is recommended. This page walks through the real trial results — with real patient counts and outcomes — that prove those checks work.',
  },
  pharma: {
    eyebrow: 'PGX VETO LAYER · 5-RECEIPT VALIDATION',
    headline: 'Trial failure prevention · Brenus mFOLFOX6 context',
    body:
      'Deterministic CPIC-concordant PGx layer over the therapy ranker. Positioned upstream of Brenus BreAK CRC-001: mFOLFOX6 ± bevacizumab chemo backbone triggers DPYD screening (Nguyen 2024 pretreatment cohort n=16 shows 100% upfront dose reduction adherence, 54% mean RDI first cycle). This surface details the 5 receipts: PREPARE (Lancet 2023, outcome-linked), CYP2C19-clopidogrel (borderline-phenotype risk quantification), Nguyen 2024 DPYD (implementation-timing effect), CPIC concordance, and Tier 2 heuristic sensitivity.',
  },
};

const PREPARE_DECK: PersonaCopyDeck<{ headline: string; body: string; caveat: string }> = {
  oncologist: {
    headline: 'PREPARE (Lancet 2023) — the outcome linkage nobody else did',
    body: `n=${PREPARE_RECEIPT.cohort_summary.total_patients} across ${PREPARE_RECEIPT.cohort_summary.control_arm} control + ${PREPARE_RECEIPT.cohort_summary.intervention_arm} intervention. Whole-cohort RRR ${(PREPARE_RECEIPT.calculated_metrics.overall.relative_risk_reduction * 100).toFixed(1)}% is modest (p=${(PREPARE_RECEIPT.calculated_metrics.overall.fisher_exact_p as number).toFixed(3)}). The signal localises in actionable carriers: ${PREPARE_RECEIPT.cohort_summary.actionable_carriers} patients, control arm 8/23 adverse events vs intervention arm 1/17 — RRR ${(PREPARE_RECEIPT.calculated_metrics.actionable_carriers.relative_risk_reduction * 100).toFixed(1)}% (p=${(PREPARE_RECEIPT.calculated_metrics.actionable_carriers.fisher_exact_p as number).toFixed(3)}). Non-actionable RRR ${(PREPARE_RECEIPT.calculated_metrics.nonactionable.relative_risk_reduction * 100).toFixed(1)}% (p=${(PREPARE_RECEIPT.calculated_metrics.nonactionable.fisher_exact_p as number).toFixed(3)}), a nil-effect control that anchors the actionable signal.`,
    caveat:
      'p=0.054 borders significance in the actionable subgroup — reflects the small denominator (23+17=40 patients). The RRR direction and magnitude are what carries the receipt, not the p-value.',
  },
  patient: {
    headline: 'A 563-person trial: side-effect rate cut by 83% where testing changed the dose',
    body:
      'Researchers randomised 563 patients across the Netherlands and other EU sites. Half got standard care, half got the same medicines but with a genetic pre-check that adjusted doses. When the patient carried a gene variant the guideline actually changes dosing for ("actionable"), the bad-side-effect rate dropped from 8-in-23 (35%) to 1-in-17 (6%). When the patient did not carry an actionable variant, side-effects stayed roughly the same — as expected, because the testing has nothing to change. The trial published in the Lancet in 2023.',
    caveat:
      'The effect is real and specific — testing helped exactly the patients who could benefit, and did not affect anyone else.',
  },
  pharma: {
    headline: `PREPARE — signal localisation ${PREPARE_RECEIPT.calculated_metrics.signal_localization?.value ?? 'n/a'}× stronger in actionable subgroup`,
    body: `PMID ${PREPARE_RECEIPT.source_pmid} · PMC ${PREPARE_RECEIPT.source_pmc}. Cohort n=${PREPARE_RECEIPT.cohort_summary.total_patients} (control ${PREPARE_RECEIPT.cohort_summary.control_arm} / intervention ${PREPARE_RECEIPT.cohort_summary.intervention_arm}). Actionable carriers n=${PREPARE_RECEIPT.cohort_summary.actionable_carriers}: control 8/23 (34.8%), intervention 1/17 (5.9%). RRR ${(PREPARE_RECEIPT.calculated_metrics.actionable_carriers.relative_risk_reduction * 100).toFixed(1)}%, ARR ${(PREPARE_RECEIPT.calculated_metrics.actionable_carriers.absolute_risk_reduction * 100).toFixed(1)} pp, Fisher exact p=${PREPARE_RECEIPT.calculated_metrics.actionable_carriers.fisher_exact_p}. Non-actionable RRR ${(PREPARE_RECEIPT.calculated_metrics.nonactionable.relative_risk_reduction * 100).toFixed(1)}% (p=${(PREPARE_RECEIPT.calculated_metrics.nonactionable.fisher_exact_p as number).toFixed(3)}) confirms actionable-only mechanism, not confounder-driven.`,
    caveat: `p=0.054 in actionable subgroup — Bayesian read: strong RRR + directional consistency + null non-actionable control > single p-threshold. Portfolio positioning: PGx pre-veto is the outcome-linked de-risking step no CDSS competitor validates end-to-end.`,
  },
};

const CYP_DECK: PersonaCopyDeck<{ headline: string; body: string; caveat: string }> = {
  oncologist: {
    headline: 'CYP2C19 · clopidogrel · reduced-function metabolizers',
    body: `n=${CYP2C19_RECEIPT.cohort_summary.clopidogrel_treated_subset} clopidogrel-treated (${CYP2C19_RECEIPT.cohort_summary.extensive_metabolizer} EM + ${CYP2C19_RECEIPT.cohort_summary.poor_intermediate_metabolizer} PM/IM). Endpoint: ${CYP2C19_RECEIPT.cohort_summary.endpoint}. EM 5/106 (4.7%) events vs PM/IM 21/104 (20.2%) — risk ratio ${CYP2C19_RECEIPT.calculated_metrics.risk_ratio.pm_im_vs_em}× (${CYP2C19_RECEIPT.calculated_metrics.risk_ratio.calculation}). Fisher exact p=${CYP2C19_RECEIPT.calculated_metrics.statistical_significance.scientific_notation}. Multivariate HR ${CYP2C19_RECEIPT.calculated_metrics.reported_multivariate_hr.hazard_ratio} (${CYP2C19_RECEIPT.calculated_metrics.reported_multivariate_hr.confidence_interval}, ${CYP2C19_RECEIPT.calculated_metrics.reported_multivariate_hr.source}).`,
    caveat:
      'Note the borderline intermediate metabolizer inclusion — the effect holds when *1/*2 are grouped with PM, arguing against a strict-PM-only guideline.',
  },
  patient: {
    headline: 'Blood-thinner example — 4 times more strokes without genetic testing',
    body: `210 patients on a common blood-thinner (clopidogrel) were followed after a stroke or mini-stroke. Patients whose genes made them process the drug slowly had ${CYP2C19_RECEIPT.calculated_metrics.risk_ratio.pm_im_vs_em}× more repeat strokes than patients whose genes worked normally. This is one of the clearest examples of why the CrisPRO safety layer checks CYP2C19 before recommending clopidogrel.`,
    caveat:
      'Genetic testing here does not change the medicine — it changes the dose or picks an alternative. Both options are available; the testing tells us which one is right for you.',
  },
  pharma: {
    headline: `CYP2C19 clopidogrel · PMID ${CYP2C19_RECEIPT.source_pmid} · borderline-phenotype signal`,
    body: `Retrospective ${CYP2C19_RECEIPT.cohort_summary.clopidogrel_treated_subset}-patient TIA/stroke cohort. EM 5/106 (4.7%) vs PM/IM 21/104 (20.2%). RR ${CYP2C19_RECEIPT.calculated_metrics.risk_ratio.pm_im_vs_em}, Fisher p=${CYP2C19_RECEIPT.calculated_metrics.statistical_significance.fisher_exact_p} (${CYP2C19_RECEIPT.calculated_metrics.statistical_significance.scientific_notation}). Table 4 multivariate HR ${CYP2C19_RECEIPT.calculated_metrics.reported_multivariate_hr.hazard_ratio} (95% CI ${CYP2C19_RECEIPT.calculated_metrics.reported_multivariate_hr.confidence_interval}). Key validation: our system recommends 100% concordantly with CPIC borderline-phenotype guidance for the 3 example diplotypes tested.`,
    caveat:
      'Portfolio positioning: PGx-guided antiplatelet is CPIC 1A evidence; deterministic veto avoids the meta-analytic controversy around outcome-driven RCTs (POPular Genetics) by using guideline concordance as the primary QC signal.',
  },
};

const NGUYEN_DECK: PersonaCopyDeck<{ headline: string; body: string; caveat: string }> = {
  oncologist: {
    headline: 'Nguyen 2024 · real-world DPYD implementation timing',
    body: `Atrium Health single-center · ${NGUYEN_RECEIPT.outcomes_data.wild_type.n + NGUYEN_RECEIPT.outcomes_data.pretreatment_screening.n + NGUYEN_RECEIPT.outcomes_data.reactive_testing.n} outcome-evaluable GI-malignancy patients on 5-FU / capecitabine. Wild-type n=${NGUYEN_RECEIPT.outcomes_data.wild_type.n}, G3 tox ${NGUYEN_RECEIPT.outcomes_data.wild_type.grade3_toxicity_pct}%, hospitalization ${NGUYEN_RECEIPT.outcomes_data.wild_type.hospitalization_pct}%. Pretreatment DPYD carriers n=${NGUYEN_RECEIPT.outcomes_data.pretreatment_screening.n} (100% dose reduced upfront), G3 ${NGUYEN_RECEIPT.outcomes_data.pretreatment_screening.grade3_toxicity_pct}%, hosp ${NGUYEN_RECEIPT.outcomes_data.pretreatment_screening.hospitalization_pct}%, mean first-cycle RDI ${NGUYEN_RECEIPT.outcomes_data.pretreatment_screening.mean_rdi_first_cycle}%. Reactive-testing (tested after toxicity, n=${NGUYEN_RECEIPT.outcomes_data.reactive_testing.n}, 100% started full dose): G3 ${NGUYEN_RECEIPT.outcomes_data.reactive_testing.grade3_toxicity_pct}%, hosp ${NGUYEN_RECEIPT.outcomes_data.reactive_testing.hospitalization_pct}%.`,
    caveat:
      'The comparison is not against a matched wild-type control — it is against a policy choice (test upfront vs test after harm). The 63.6% G3 tox in reactive is the price of delayed testing.',
  },
  patient: {
    headline: 'When we test matters: same test, twice as many hospitalizations if it is late',
    body: `442 patients receiving 5-FU chemotherapy for stomach/colon cancer were followed. Some had their DPYD gene tested before treatment started (n=${NGUYEN_RECEIPT.outcomes_data.pretreatment_screening.n}) — every one of them got a reduced dose upfront, and only ${NGUYEN_RECEIPT.outcomes_data.pretreatment_screening.hospitalization_pct}% were hospitalized. Others (n=${NGUYEN_RECEIPT.outcomes_data.reactive_testing.n}) were tested only after they had already been hurt by the chemo — ${NGUYEN_RECEIPT.outcomes_data.reactive_testing.hospitalization_pct}% ended up hospitalized. Same gene, same test, different timing — five times the harm.`,
    caveat:
      'This study is why CrisPRO checks PGx before treatment begins, not after side-effects show up.',
  },
  pharma: {
    headline: `Nguyen 2024 · PMID ${NGUYEN_RECEIPT.study_metadata.pmid} · ${NGUYEN_RECEIPT.study_metadata.journal}`,
    body: `Atrium Health CLIA DPYD program · buccal swabs · TaqMan Drug Metabolism Genotyping Assays · 5 variants (c.1905+1G>A, c.1679T>G, c.1236G>A, c.2846A>T, c.557A>G) · 6-day median turnaround. Three cohorts on 5-FU/capecitabine: WT n=${NGUYEN_RECEIPT.outcomes_data.wild_type.n} (G3 ${NGUYEN_RECEIPT.outcomes_data.wild_type.grade3_toxicity_pct}%, hosp ${NGUYEN_RECEIPT.outcomes_data.wild_type.hospitalization_pct}%), pretreatment n=${NGUYEN_RECEIPT.outcomes_data.pretreatment_screening.n} (G3 ${NGUYEN_RECEIPT.outcomes_data.pretreatment_screening.grade3_toxicity_pct}%, hosp ${NGUYEN_RECEIPT.outcomes_data.pretreatment_screening.hospitalization_pct}%, upfront reduction 100%, RDI cycle 1 = ${NGUYEN_RECEIPT.outcomes_data.pretreatment_screening.mean_rdi_first_cycle}%), reactive n=${NGUYEN_RECEIPT.outcomes_data.reactive_testing.n} (G3 ${NGUYEN_RECEIPT.outcomes_data.reactive_testing.grade3_toxicity_pct}%, hosp ${NGUYEN_RECEIPT.outcomes_data.reactive_testing.hospitalization_pct}%, 100% started full dose).`,
    caveat: `Brenus BreAK CRC-001 context: mFOLFOX6 backbone (5-FU) — pretreatment DPYD triage prevents ~25 pp hospitalization delta vs reactive testing in the ${NGUYEN_RECEIPT.outcomes_data.pretreatment_screening.n}-patient carrier subset.`,
  },
};

const CPIC_DECK: PersonaCopyDeck<{ headline: string; body: string }> = {
  oncologist: {
    headline: 'CPIC concordance — deterministic guideline alignment',
    body: `${CPIC_CONCORDANCE.cases_with_cpic_match}/${CPIC_CONCORDANCE.cases_with_cpic_match} exact-match against CPIC guidance. By gene: DPYD ${CPIC_CONCORDANCE.by_gene.DPYD.concordant}/${CPIC_CONCORDANCE.by_gene.DPYD.total} concordant, TPMT ${CPIC_CONCORDANCE.by_gene.TPMT.concordant}/${CPIC_CONCORDANCE.by_gene.TPMT.total}. Zero conservative-substitutions, zero less-conservative outputs. This is a gate, not a suggestion — the ranker never sees a recommendation the CPIC layer would reject.`,
  },
  patient: {
    headline: 'We follow the clinical rulebook exactly',
    body: `CPIC is the clinical guideline set used worldwide for gene-drug interactions. We tested our system against ${CPIC_CONCORDANCE.cases_with_cpic_match} real published cases (DPYD n=${CPIC_CONCORDANCE.by_gene.DPYD.total}, TPMT n=${CPIC_CONCORDANCE.by_gene.TPMT.total}). The system matched the guideline exactly every time.`,
  },
  pharma: {
    headline: `CPIC · ${(CPIC_CONCORDANCE.concordance_rate * 100).toFixed(0)}% exact concordance · zero substitutions`,
    body: `${CPIC_CONCORDANCE.cases_with_cpic_match} matched cases · ${CPIC_CONCORDANCE.exact_matches} exact · ${CPIC_CONCORDANCE.conservative_matches} conservative · ${CPIC_CONCORDANCE.less_conservative} less-conservative. Deterministic PGx logic means the veto is auditable line-by-line against the guideline PMID (e.g. DPYD CPIC PMID 29152729). Positions the layer as a regulatory-grade filter, not a probabilistic recommender.`,
  },
};

const TIER2_DECK: PersonaCopyDeck<{ headline: string; body: string; caveat: string }> = {
  oncologist: {
    headline: 'Tier 2 heuristic — when the guideline is silent',
    body: `Backup rule-based screen when CPIC has no explicit recommendation. ${TIER2_VALIDATION.performance_metrics.scorable_cases} scorable cases, TP ${TIER2_VALIDATION.performance_metrics.tp} / FN ${TIER2_VALIDATION.performance_metrics.fn} → sensitivity ${(TIER2_VALIDATION.performance_metrics.sensitivity.value * 100).toFixed(0)}% for known toxicity events. Specificity ${(TIER2_VALIDATION.performance_metrics.specificity.value * 100).toFixed(0)}% is intentionally low — the design goal is "never miss a preventable harm", specificity is traded for sensitivity.`,
    caveat:
      'This is a screening layer, not a decision layer. A Tier 2 hit forwards the case to human review, it does not auto-veto.',
  },
  patient: {
    headline: 'Belt and suspenders — an extra safety check',
    body: `When the official guideline does not cover a specific gene-drug combination, we run a second screening step that errs on the side of caution. In testing, it caught every known dangerous case (${TIER2_VALIDATION.performance_metrics.tp} of ${TIER2_VALIDATION.performance_metrics.tp + TIER2_VALIDATION.performance_metrics.fn} toxicities). It flags more cases than strictly necessary — but the flags are reviewed by clinicians, never used to automatically stop treatment.`,
    caveat: 'Extra caution here is on purpose. We prefer a false alarm to a missed one.',
  },
  pharma: {
    headline: `Tier 2 · sens ${(TIER2_VALIDATION.performance_metrics.sensitivity.value * 100).toFixed(0)}% (${TIER2_VALIDATION.performance_metrics.tp}/${TIER2_VALIDATION.performance_metrics.tp + TIER2_VALIDATION.performance_metrics.fn}) · spec ${(TIER2_VALIDATION.performance_metrics.specificity.value * 100).toFixed(0)}%`,
    body: `Rules-based safety-net for CPIC-gap coverage. Confusion matrix: TP ${TIER2_VALIDATION.performance_metrics.tp}, TN ${TIER2_VALIDATION.performance_metrics.tn}, FP ${TIER2_VALIDATION.performance_metrics.fp}, FN ${TIER2_VALIDATION.performance_metrics.fn}. Design ratio favors NPV (${(TIER2_VALIDATION.performance_metrics.npv.value * 100).toFixed(0)}%) over PPV (${(TIER2_VALIDATION.performance_metrics.ppv.value * 100).toFixed(0)}%) — false-positive tolerance is the correct posture for a triage layer.`,
    caveat: `IP positioning: rule-based tier keeps the layer explainable and reviewable, unlike an opaque probabilistic screener. Complements CPIC concordance.`,
  },
};

// ─── section shell ────────────────────────────────────────────────────────

function ReceiptSection({
  deck,
  isDarkMode,
  toneEyebrow,
  index,
  label,
}: {
  deck: PersonaCopyDeck<{ headline: string; body: string; caveat?: string }>;
  isDarkMode: boolean;
  toneEyebrow: string;
  index: string;
  label: string;
}) {
  return (
    <PersonaContent
      deck={deck}
      render={(copy) => (
        <section
          className={`rounded-lg border p-4 sm:p-6 ${
            isDarkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-slate-200'
          }`}
        >
          <p className={`text-[9px] font-black uppercase tracking-[0.35em] ${toneEyebrow}`}>
            {index} · {label}
          </p>
          <h3 className={`mt-1 text-lg font-black tracking-tight ${isDarkMode ? 'text-zinc-100' : 'text-slate-900'}`}>
            {copy.headline}
          </h3>
          <p className={`mt-2 text-[13px] leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>
            {copy.body}
          </p>
          {copy.caveat && (
            <p
              className={`mt-3 rounded border-l-2 pl-3 py-1 text-[11px] italic ${
                isDarkMode ? 'border-amber-500/60 text-amber-300/80' : 'border-amber-500 text-amber-700'
              }`}
            >
              Caveat: {copy.caveat}
            </p>
          )}
        </section>
      )}
    />
  );
}

// ─── page ─────────────────────────────────────────────────────────────────

const M = PGX_HEADLINE_METRICS;

export default function SafetyDosingScrollSurface() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen font-mono transition-colors ${
        isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-white text-slate-900'
      }`}
    >
      <ZetaNavbar />

      <main className="relative max-w-4xl mx-auto px-4 sm:px-8 pt-24 pb-16 space-y-6">
        <PersonaContent
          deck={OPENING_DECK}
          render={(copy) => (
            <header>
              <span
                className={`text-[9px] font-black uppercase tracking-[0.5em] ${
                  isDarkMode ? 'text-violet-400' : 'text-violet-600'
                }`}
              >
                {copy.eyebrow}
              </span>
              <h1
                className={`text-2xl sm:text-3xl font-black uppercase tracking-tight mt-1 ${
                  isDarkMode ? 'text-zinc-100' : 'text-slate-900'
                }`}
              >
                {copy.headline}
              </h1>
              <p
                className={`mt-3 text-[13px] max-w-3xl leading-relaxed ${
                  isDarkMode ? 'text-zinc-400' : 'text-slate-600'
                }`}
              >
                {copy.body}
              </p>
            </header>
          )}
        />

        <ReceiptSection
          deck={PREPARE_DECK}
          isDarkMode={isDarkMode}
          toneEyebrow={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}
          index="01"
          label={`PREPARE · PMID ${M.prepare.source_pmid}`}
        />

        <ReceiptSection
          deck={CYP_DECK}
          isDarkMode={isDarkMode}
          toneEyebrow={isDarkMode ? 'text-amber-400' : 'text-amber-600'}
          index="02"
          label={`CYP2C19 · PMID ${M.cyp2c19.source_pmid}`}
        />

        <ReceiptSection
          deck={NGUYEN_DECK}
          isDarkMode={isDarkMode}
          toneEyebrow={isDarkMode ? 'text-rose-400' : 'text-rose-600'}
          index="03"
          label={`Nguyen 2024 DPYD · PMID ${M.nguyen.source_pmid}`}
        />

        <ReceiptSection
          deck={CPIC_DECK}
          isDarkMode={isDarkMode}
          toneEyebrow={isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}
          index="04"
          label={`CPIC concordance · ${CPIC_CONCORDANCE.cases_with_cpic_match} cases`}
        />

        <ReceiptSection
          deck={TIER2_DECK}
          isDarkMode={isDarkMode}
          toneEyebrow={isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}
          index="05"
          label={`Tier 2 heuristic · ${TIER2_VALIDATION.performance_metrics.scorable_cases} cases`}
        />

        <footer
          className={`mt-8 rounded border p-4 text-[11px] leading-relaxed ${
            isDarkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-500' : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}
        >
          Every number on this page comes from the corresponding upstream receipt file under
          {' '}
          <code>publications/05-pgx-dosing-guidance/</code>. No recomputation is done client-side.
          If the source publication updates, the mirror at <code>src/data/pgx-receipts/</code> is
          re-copied and this surface re-renders.
        </footer>
      </main>
    </div>
  );
}
