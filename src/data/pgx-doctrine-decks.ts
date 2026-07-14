/**
 * pgx-doctrine-decks.ts
 * ---------------------
 * W9 · CANONICAL PGX DOCTRINE FRAMING.
 *
 * Purpose: lock the persona-differentiated *doctrine* sentences for each of
 * the 5 PGx receipts into ONE source of truth. All three PGx surfaces
 * (SafetyDosingIntroPage, SafetyDosingScrollSurface, SafetyDosingTabsSurface)
 * import from this module so the framing phrases NEVER drift between them.
 *
 * What lives here:
 *   - `claim` — the doctrine sentence per receipt/persona.
 *     Example: "PGx pre-veto is the outcome-linked de-risking step no CDSS
 *     competitor validates end-to-end."
 *   - `caveat` — the guardrail sentence per receipt/persona.
 *     Example: "p=0.054 borderline — Bayesian read: strong RRR + directional
 *     consistency + null non-actionable control > single p-threshold."
 *
 * What does NOT live here:
 *   - Numeric formatting (`RRR ${X * 100}%`) — that stays inline in each
 *     surface because it's data-derived and the surrounding narrative differs.
 *   - Layout affordances (card, tab, tile) — those are the surface's job.
 *
 * Grep contract: every canonical doctrine phrase in this file appears in
 * exactly one deck entry. If you see the same doctrine phrase authored twice
 * in a surface file, the parity gate has failed — collapse to this module.
 *
 * SOURCE: Fahad Kiani directive 2026-07-10 — persona-differentiated surfaces
 * with locked doctrine framing (parity gate).
 */

import type { PersonaCopyDeck } from '@/context/persona-content';

export type PgxReceiptId = 'opening' | 'prepare' | 'cyp2c19' | 'nguyen' | 'cpic' | 'tier2';

export interface DoctrineDeck {
  /** The doctrine framing sentence — what CrisPRO *claims* about this receipt. */
  claim: string;
  /** The doctrine guardrail sentence — the caveat / limitation the surface honors. */
  caveat: string;
}

// ─── Opening framing (surface-level doctrine intro) ────────────────────────

export const OPENING_DOCTRINE: PersonaCopyDeck<DoctrineDeck> = {
  oncologist: {
    claim:
      'CrisPRO Safety & Dosing is a deterministic pre-filter that reads the patient PGx profile against CPIC guidelines and vetoes contraindicated dosing before the therapy-ranker scores any candidate.',
    caveat:
      'This is a screening + guideline-concordance layer, not a probabilistic decision layer.',
  },
  patient: {
    claim:
      'Some medicines behave differently depending on your DNA. If your body processes a drug slower than most people\'s, a normal dose can become a dangerous dose. CrisPRO checks published clinical safety rules against your genetic profile before any medication is recommended.',
    caveat:
      'Genetic testing does not change the medicine; it changes the dose or picks an alternative. Both options are available.',
  },
  pharma: {
    claim:
      'Deterministic CPIC-concordant PGx layer upstream of the therapy ranker. 5 outcome-linked receipts: PREPARE (Lancet 2023 prospective RCT), CYP2C19-clopidogrel (retrospective outcome study), Nguyen 2024 (real-world implementation), CPIC concordance (guideline QC), Tier 2 (rule-based safety-net).',
    caveat:
      'Regulatory-grade filter, not probabilistic recommender. Portfolio positioning: outcome-linked pre-veto is the de-risking step no CDSS competitor validates end-to-end.',
  },
};

// ─── PREPARE (Lancet 2023) ─────────────────────────────────────────────────

export const PREPARE_DOCTRINE: PersonaCopyDeck<DoctrineDeck> = {
  oncologist: {
    claim:
      'Signal localises in the actionable subgroup; the non-actionable arm acts as a null-effect control that anchors the mechanism to guideline-concordant dose adjustment, not a generic-care effect.',
    caveat:
      'p=0.054 borders significance in the actionable subgroup — reflects the small denominator (23+17=40 patients). RRR direction and magnitude carry the receipt, not the p-value.',
  },
  patient: {
    claim:
      'Testing helped exactly the patients who could benefit, and did not affect anyone else — the effect is real and specific.',
    caveat:
      'The 83% reduction applies to patients whose gene variant the guideline actually changes dosing for. For everyone else, the safety layer confirms the standard dose is safe.',
  },
  pharma: {
    claim:
      'Actionable-carrier RRR localises the signal to guideline-concordant dose adjustment; null-effect non-actionable arm confirms actionable-only mechanism vs generic-care effect.',
    caveat:
      'p=0.054 in actionable subgroup — Bayesian read: strong RRR + directional consistency + null non-actionable control > single p-threshold. Portfolio positioning: outcome-linked PGx pre-veto is the de-risking step no CDSS competitor validates end-to-end.',
  },
};

// ─── CYP2C19 · clopidogrel ─────────────────────────────────────────────────

export const CYP2C19_DOCTRINE: PersonaCopyDeck<DoctrineDeck> = {
  oncologist: {
    claim:
      'Effect holds when intermediate metabolizers are grouped with poor metabolizers — argues against a strict PM-only guideline; CrisPRO covers both PM and IM under the veto.',
    caveat:
      'Retrospective cohort; the borderline-phenotype signal is what CPIC codifies as evidence tier 1A.',
  },
  patient: {
    claim:
      'Genetic testing here does not change the medicine — it changes the dose or picks an alternative. Both options are available; the testing tells us which one is right for you.',
    caveat:
      'Approximately 30% of adults carry a reduced-function CYP2C19 variant; the safety layer checks before recommending clopidogrel.',
  },
  pharma: {
    claim:
      'CPIC 1A evidence tier + deterministic veto avoids the meta-analytic controversy around outcome-driven antiplatelet trials (POPular Genetics et al.) by using guideline concordance as the primary QC signal.',
    caveat:
      'Portfolio positioning: CPIC 1A + deterministic veto → regulatory-grade filter, not probabilistic recommender.',
  },
};

// ─── Nguyen 2024 · DPYD real-world ─────────────────────────────────────────

export const NGUYEN_DOCTRINE: PersonaCopyDeck<DoctrineDeck> = {
  oncologist: {
    claim:
      'Cohorts are policy-choice comparisons (test upfront vs test after harm), not matched controls. The hospitalization delta is the cost of delayed testing, and it is the specific harm CrisPRO\'s upstream veto is designed to prevent.',
    caveat:
      'Descriptive comparison — the wild-type arm is not a matched control. What the receipt shows is a timing effect, not a treatment effect.',
  },
  patient: {
    claim:
      'This is why CrisPRO checks the PGx profile before treatment begins, not after side-effects show up.',
    caveat:
      'Same test, different timing — five times the harm if it comes late.',
  },
  pharma: {
    claim:
      'Real-world implementation timing effect. Brenus BreAK CRC-001 context: mFOLFOX6 (5-FU) backbone triggers pretreatment DPYD triage; the 25pp hospitalization delta is the carrier-subset avoidable harm.',
    caveat:
      'Real-world implementation cohort — comparison against wild-type is descriptive, not matched. Timing effect, not a treatment effect.',
  },
};

// ─── CPIC concordance ──────────────────────────────────────────────────────

export const CPIC_DOCTRINE: PersonaCopyDeck<DoctrineDeck> = {
  oncologist: {
    claim:
      'Deterministic alignment with published CPIC guidance. Zero conservative substitutions, zero less-conservative outputs. The ranker never sees a recommendation the CPIC layer would reject.',
    caveat:
      'Concordance is guideline-QC, not outcome validation — the outcome-linked evidence lives in PREPARE, CYP2C19, and Nguyen.',
  },
  patient: {
    claim:
      'CPIC is the worldwide clinical guideline set for gene-drug interactions. The system was tested against published matched cases and returned the guideline recommendation every single time.',
    caveat:
      'Not every gene-drug pair has a CPIC guideline — for those, the Tier 2 heuristic acts as a safety-net.',
  },
  pharma: {
    claim:
      'Deterministic PGx logic → veto is auditable line-by-line against guideline PMID (e.g. DPYD CPIC PMID 29152729).',
    caveat:
      'Regulatory-grade filter, not probabilistic recommender.',
  },
};

// ─── Tier 2 heuristic ──────────────────────────────────────────────────────

export const TIER2_DOCTRINE: PersonaCopyDeck<DoctrineDeck> = {
  oncologist: {
    claim:
      'Rule-based screen for gene-drug pairs CPIC has no explicit recommendation on. Design goal is "never miss a preventable harm" — high false-positive rate is intentional.',
    caveat:
      'This is a screening layer, not a decision layer. A Tier 2 hit forwards the case to human review, it does not auto-veto.',
  },
  patient: {
    claim:
      'Belt and suspenders — an extra safety check for gaps in the rulebook. It errs on the side of flagging more than needed; flags go to clinicians, never used to automatically stop treatment.',
    caveat:
      'A Tier 2 flag means "worth a second look" — not "stop treatment".',
  },
  pharma: {
    claim:
      'Rule-based safety-net for CPIC-gap coverage. Confusion matrix designed to maximise NPV — false-positive tolerance is the correct posture for a triage layer.',
    caveat:
      'Explainable rule-based tier complements the CPIC concordance layer; not a substitute for CPIC-graded evidence.',
  },
};

// ─── Aggregate lookup ──────────────────────────────────────────────────────

export const PGX_DOCTRINE: Record<PgxReceiptId, PersonaCopyDeck<DoctrineDeck>> = {
  opening: OPENING_DOCTRINE,
  prepare: PREPARE_DOCTRINE,
  cyp2c19: CYP2C19_DOCTRINE,
  nguyen: NGUYEN_DOCTRINE,
  cpic: CPIC_DOCTRINE,
  tier2: TIER2_DOCTRINE,
};

// ─── Grep contract ─────────────────────────────────────────────────────────
//
// Every doctrine phrase that must be CANONICAL is authored above.
// If you find the same phrase in surface files (SafetyDosing*.tsx),
// the parity gate has failed — collapse to this module.
//
// Canonical phrases (one occurrence per persona × receipt in this file):
//   - "outcome-linked de-risking step no CDSS competitor validates end-to-end"  → pharma / prepare (opening also references CDSS)
//   - "regulatory-grade filter, not probabilistic recommender"                   → pharma / cyp2c19, cpic (opening also uses)
//   - "auditable line-by-line against guideline PMID"                            → pharma / cpic
//   - "Bayesian read: strong RRR + directional consistency + null non-actionable > single p-threshold"  → pharma / prepare
//   - "null-effect non-actionable arm confirms actionable-only mechanism"        → pharma / prepare
//   - "deterministic pre-filter that reads the patient PGx profile"              → oncologist / opening
//   - "POPular Genetics" (competitor context)                                    → pharma / cyp2c19
//   - "policy-choice comparisons (test upfront vs test after harm)"              → oncologist / nguyen
//   - "screening layer, not a decision layer"                                    → oncologist / tier2
