/**
 * patient-translator-content.ts
 * Plain-English translations for the tumor-board metrics, shown when persona=patient.
 * SOURCE: user request 2026-07-10 — patient view must explain the metrics.
 */

export const PATIENT_TRANSLATOR: Record<string, { term: string; plain: string }> = {
  'ln_ic50': {
    term: 'LN_IC50',
    plain: 'How much drug it takes to kill half the tumor cells. Lower = tumor is more sensitive.',
  },
  'cohens_d': {
    term: "Cohen's d",
    plain: 'How different two groups of tumors were in their response. Negative = your subtype responded better than average.',
  },
  'p_value': {
    term: 'p-value',
    plain: 'How likely this result is by chance. Lower = more real. Under 0.05 = statistically meaningful.',
  },
  'target_lock': {
    term: 'Target-Lock score',
    plain: 'How real the target is as a driver of your cancer. ≥ 0.35 = real driver, not a hunch.',
  },
  'mechanism_fit': {
    term: 'Mechanism fit',
    plain: 'How well the drug and your tumor line up on the underlying biology. 0 = no fit, 1 = perfect fit.',
  },
  'sl_axis': {
    term: 'SL axis',
    plain: 'A pair of gene defects that kill the tumor when hit together. Your tumor may already have half the pair.',
  },
  'mbd4_lof': {
    term: 'MBD4-LOF',
    plain: 'Your MBD4 gene lost function. It normally fixes DNA typos — without it, the tumor accumulates mistakes.',
  },
  'parp_falsified': {
    term: 'PARP falsified',
    plain: 'PARP was tested for your subtype and did NOT work. This tool says so up front so no false hope.',
  },
  'atr_axis': {
    term: 'ATR axis (primary)',
    plain: 'Blocking ATR — another DNA-repair helper — is our top candidate for your subtype.',
  },
};
