/**
 * patient-translator-content.ts
 *
 * Plain-English translations for the tumor-board metrics.
 *
 * BASELINE ROLE
 *   The `plain` field is the patient/oncologist-friendly baseline —
 *   what a non-quant reader (patient, family, non-specialist clinician)
 *   should read when the raw abbreviation appears on-screen. This is
 *   the shape the current PatientTranslator component consumes.
 *
 * PERSONA OVERLAY (D15)
 *   `pharmaPlain` is the diligence/audit-framing variant. If this
 *   glossary is ever rendered on the pharma surface, consumers should
 *   fall through to `pharmaPlain` when persona==='pharma' and back to
 *   `plain` otherwise. The `term` label itself is invariant.
 *
 * NOT COVERED
 *   The oncologist view historically does NOT show this translator —
 *   oncologists read the raw metric with p-values and CIs, no gloss.
 *   Therefore no `oncologistPlain` variant is defined; oncologist
 *   surfaces should NOT render this component. If a design change
 *   forces it, oncologistPlain can be added here without breaking
 *   the existing patient contract.
 *
 * SOURCE: user request 2026-07-10 — patient view must explain the metrics.
 *         D15 persona sweep 2026-07-14 — add pharmaPlain overlay.
 */

export interface TranslatorEntry {
  /** The abbreviation as printed on-screen (invariant across personas). */
  term: string;
  /** Patient / non-specialist baseline explanation. */
  plain: string;
  /** Optional pharma / diligence-framed variant. Falls back to `plain`. */
  pharmaPlain?: string;
}

export const PATIENT_TRANSLATOR: Record<string, TranslatorEntry> = {
  'ln_ic50': {
    term: 'LN_IC50',
    plain:
      'How much drug it takes to kill half the tumor cells. Lower = tumor is more sensitive.',
    pharmaPlain:
      'Natural-log of the half-maximal inhibitory concentration on the assay. Lower LN_IC50 = greater cell-line sensitivity — the primary continuous readout on the GDSC/PRISM franchise-fit substrate.',
  },
  'cohens_d': {
    term: "Cohen's d",
    plain:
      'How different two groups of tumors were in their response. Negative = your subtype responded better than average.',
    pharmaPlain:
      "Standardized effect-size (Cohen's d) between subtype and non-subtype LN_IC50 distributions. Negative d = subtype-favorable franchise-fit signal on the delta axis. Direction and magnitude carry the substrate call.",
  },
  'p_value': {
    term: 'p-value',
    plain:
      'How likely this result is by chance. Lower = more real. Under 0.05 = statistically meaningful.',
    pharmaPlain:
      'Two-sided p-value on the subtype-vs-comparator delta test. p<0.05 is the ordinary admissibility threshold; the franchise-audit trail records the exact test, sample sizes, and multiple-testing posture behind each reported p.',
  },
  'target_lock': {
    term: 'Target-Lock score',
    plain:
      'How real the target is as a driver of your cancer. ≥ 0.35 = real driver, not a hunch.',
    pharmaPlain:
      'CrisPRO Target-Lock score — a composite substrate-validity score on the target. ≥ 0.35 is the admissibility threshold for target-real classification. Below threshold routes to insufficient-substrate on the franchise-audit trail.',
  },
  'mechanism_fit': {
    term: 'Mechanism fit',
    plain:
      'How well the drug and your tumor line up on the underlying biology. 0 = no fit, 1 = perfect fit.',
    pharmaPlain:
      'Mechanism-fit score on the [0,1] admissibility interval — the ranker output of the locked PATH A formula: fit = clip((p·t) / ‖t‖₂, 0, 1). Franchise-fit call on the mechanism-alignment matrix.',
  },
  'sl_axis': {
    term: 'SL axis',
    plain:
      'A pair of gene defects that kill the tumor when hit together. Your tumor may already have half the pair.',
    pharmaPlain:
      'Synthetic-lethal axis — a two-gene dependency edge where loss-of-function in one gene sensitizes to pharmacologic inhibition of the partner. The substrate call is which half of the SL edge the tumor already carries.',
  },
  'mbd4_lof': {
    term: 'MBD4-LOF',
    plain:
      'Your MBD4 gene lost function. It normally fixes DNA typos — without it, the tumor accumulates mistakes.',
    pharmaPlain:
      'MBD4 loss-of-function — a defined mutator substrate class. MBD4-LOF tumors carry an elevated somatic mutation burden and specific base-substitution signatures, and are franchise-fit candidates for DNA-repair-adjacent lethality.',
  },
  'parp_falsified': {
    term: 'PARP falsified',
    plain:
      'PARP was tested for your subtype and did NOT work. This tool says so up front so no false hope.',
    pharmaPlain:
      'PARP-inhibitor franchise-fit falsified on this substrate — the audit-trail-grade evidence base records the PARPi trials that did not clear their thresholds on this subtype. Franchise-fit call: not-admissible on the PARP axis.',
  },
  'atr_axis': {
    term: 'ATR axis (primary)',
    plain:
      'Blocking ATR — another DNA-repair helper — is our top candidate for your subtype.',
    pharmaPlain:
      'ATR-inhibitor axis — the primary re-underwritten franchise-fit call on this substrate after the PARPi axis was falsified. Ranks first on the mechanism-alignment matrix for this subtype.',
  },
};
