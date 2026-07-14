/**
 * Product glossary — maps internal jargon tokens to customer-facing product
 * labels. Rendering pattern is always: `Product Label (jargon_token)`
 *
 * The jargon token stays in parens for fluent readers (oncologists, pharma R&D)
 * so we don't cost them anything, but the customer-facing label comes first
 * for everyone else.
 *
 * Each entry has:
 *   product   — the short customer-facing name (must fit in a tab strip)
 *   long      — a one-sentence description customers can read
 *   jargon    — the internal snake_case token (optional; falls back to key)
 *
 * Update this file, not individual components, when we want to rename
 * a product surface.
 */

export type GlossaryEntry = {
  product: string;
  long: string;
  jargon?: string;
};

export const PRODUCT_GLOSSARY: Record<string, GlossaryEntry> = {
  // ---- scoring / ranking ----
  target_lock_score: {
    product: 'Discovery Score',
    long: 'Per-gene, per-step score that ranks how much a variant contributes to a cancer-cascade step.',
  },
  calibrated_score: {
    product: 'Calibrated Score',
    long: 'Discovery score after platform-wide isotonic calibration so scores are comparable across steps.',
  },
  auroc: {
    product: 'Ranking accuracy',
    long: 'Area under the ROC curve — how well the score separates true positives from negatives.',
    jargon: 'AUROC',
  },
  auprc: {
    product: 'Precision–recall accuracy',
    long: 'Area under the precision–recall curve — useful when positives are rare.',
    jargon: 'AUPRC',
  },
  precision_at_3: {
    product: 'Top-3 precision',
    long: 'Fraction of the top-3 ranked candidates that are true positives.',
    jargon: 'P@3',
  },

  // ---- SL vocabulary ----
  sl_axis: {
    product: 'Therapeutic Lever',
    long: 'One mechanism through which a patient could be treated — e.g. cytidine analogs, ATR/WEE1 inhibitors, PARP inhibitors.',
    jargon: 'SL axis',
  },
  mechanism_fit: {
    product: 'Mechanism-fit score',
    long: '7-dimensional match between the patient state and the therapy state.',
  },
  prod_tier: {
    product: 'Product tier — ships today',
    long: 'What we would tell an oncologist today, using only validated evidence.',
  },
  sim_tier: {
    product: 'Product tier — simulator only',
    long: 'What the simulator argues for, including candidates that need more data before they ship.',
  },
  divergence_intended: {
    product: 'Intentional upgrade',
    long: 'A case where the simulator disagrees with today\'s prod tier on purpose — flagged as a research bet, not a rendering bug.',
    jargon: 'divergence_intended',
  },
  falsified: {
    product: 'Ruled out',
    long: 'The evidence exists to say this mechanism is NOT active for this patient. Not a null — an active negative.',
  },
  falsified_mechanism: {
    product: 'Ruled-out mechanism',
    long: 'A mechanism the manuscript explicitly excludes with statistics, not just silence.',
  },
  parp_falsification: {
    product: 'Why we did NOT pick PARP',
    long: 'The evidence and math behind actively ruling out PARP inhibition for this patient.',
    jargon: 'PARP falsification arc',
  },
  double_hit: {
    product: 'Double-hit summary',
    long: 'The one-sentence pattern that made the diagnosis actionable — e.g. HR loss + G1/S checkpoint compromise = classic HGSOC.',
  },
  broken_pathways: {
    product: 'Broken machinery',
    long: 'Pathways the tumor cannot use anymore because a driver mutation knocked them out.',
  },
  essential_pathways: {
    product: 'Kept functioning',
    long: 'Pathways still intact — the levers that remain available.',
  },
  recommended_drugs: {
    product: 'Ranked drug candidates',
    long: 'Drugs the L1 engine surfaces for this patient, with confidence and ruled-out flags.',
  },
  suggested_therapy: {
    product: 'First-line pick',
    long: 'The single therapy the L1 engine would ship to an oncologist today.',
  },
  evidence_anchor: {
    product: 'Receipt from literature',
    long: 'A numeric claim from the source manuscript we can reproduce exactly in our system.',
  },
  positive_control: {
    product: 'Positive control receipt',
    long: 'A number from the manuscript we hit exactly — proves the pipeline works end to end.',
  },
  completeness_cap: {
    product: 'Confidence ceiling',
    long: 'How confident we can be at all, given the tests currently available. Missing tests lower this ceiling.',
  },
  tests_needed: {
    product: 'Gaps we would need to close',
    long: 'The tests not yet in this bundle that would raise the confidence ceiling.',
  },
  provenance: {
    product: 'Where each number came from',
    long: 'Per-value pointer back to the source file, path, and cache state that produced it.',
  },

  // ---- MOA vocabulary ----
  mechanism_alignment: {
    product: 'Mechanism Alignment',
    long: '7-axis dot product between the patient\'s pathway vector and each therapy\'s pathway vector, gated by an eligibility term.',
  },
  path_a: {
    product: 'PATH A',
    long: 'The signed 2026-04-28 decision to score mechanism alignment as a 7-axis dot product.',
  },

  // ---- BrM cascade vocabulary ----
  brm_step: {
    product: 'Brain-met invasion step',
    long: 'One of the 7 steps a tumor cell must complete to seed a brain metastasis: escape → intravasate → survive → BBB → colonize → adapt → angiogenesis.',
    jargon: 'BrM step',
  },
  bbb_penetrant: {
    product: 'Brain barrier crossing',
    long: 'Whether a drug or a driver can cross the blood-brain barrier — the step-4 gate.',
    jargon: 'BBB penetrance',
  },
  bace1_negative_control: {
    product: 'Known-decoy target',
    long: 'BACE1 is a validated Alzheimer\'s target with no BrM biology — used as a hard negative control across the cascade.',
    jargon: 'BACE1 hard negative',
  },
  cascade: {
    product: 'Brain-met Discovery Pipeline',
    long: 'The 7-step cancer-progression cascade the evo2 engine scores every candidate variant against.',
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Format a jargon token as `Product Label (jargon_token)`. Falls back to the
 * raw token if not registered — surface renders it verbatim so we notice.
 */
export function labelFor(token: keyof typeof PRODUCT_GLOSSARY | string): string {
  const entry = PRODUCT_GLOSSARY[token];
  if (!entry) return token;
  const jargon = entry.jargon ?? token;
  return `${entry.product} (${jargon})`;
}

/** Return just the product name — for compact contexts like tab strips. */
export function productFor(token: keyof typeof PRODUCT_GLOSSARY | string): string {
  const entry = PRODUCT_GLOSSARY[token];
  return entry?.product ?? token;
}

/** Return the one-sentence long-form — for tooltip / help text contexts. */
export function longFor(token: keyof typeof PRODUCT_GLOSSARY | string): string {
  const entry = PRODUCT_GLOSSARY[token];
  return entry?.long ?? token;
}

/** Full entry, or null if the token is unknown. */
export function entryFor(token: string): GlossaryEntry | null {
  return PRODUCT_GLOSSARY[token] ?? null;
}
