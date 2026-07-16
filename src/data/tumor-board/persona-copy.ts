import type { Persona } from '@/context/PersonaContext';

/**
 * PersonaCopyDeck<K> — one string per persona per copy-key.
 *
 * The tumor-board rewrite pushes every user-visible sentence into a deck of
 * this shape so a downstream panel can just call:
 *
 *   const { persona } = usePersona();
 *   const copy = PARP_ARC_COPY[persona];
 *
 * and render pre-authored copy. No conditional-in-JSX branching, no
 * hardcoded English, no leakage of persona-implementation into panels.
 *
 * K is the union of copy keys for a given panel. The compiler enforces
 * that every persona has every key (no fallback to English).
 */
export type PersonaCopyDeck<K extends string> = Record<Persona, Record<K, string>>;

// ---------------------------------------------------------------------------
// PARP falsification arc — three-card centerpiece.
//
// Voice anchors:
//   oncologist — clinical shorthand, exposes p-values / matrix_axis / stat
//   patient    — plain English, hides p-values and matrix_axis, explains
//                what "falsification" means in words
//   pharma     — audit / IP-position framing, exposes stat, hides patient
//                identity references
//
// Visibility layer (rendered in the panel from these constants):
//   patient → HIDE p_value line, HIDE matrix_axis line
//   pharma  → HIDE patient identifier (use "prod today" instead of "AK")
// ---------------------------------------------------------------------------
export type ParpArcCopyKey =
  | 'eyebrow'
  | 'title'
  | 'blurb'
  | 'card1Label'
  | 'card2Label'
  | 'card3Label'
  | 'card1Result'
  | 'card2Positive'
  | 'card3Additive';

export const PARP_ARC_COPY: PersonaCopyDeck<ParpArcCopyKey> = {
  oncologist: {
    eyebrow: 'User-visible bug · PR#11',
    title: 'The PARP falsification arc',
    blurb:
      'Prod ships PARP inhibitors to AK as a recommended drug class. The manuscript already falsifies the mechanism. This is the frontend-visible reason PR#11 introduces a manuscript_claim_type enum.',
    card1Label: '1 · Prod ships today',
    card2Label: '2 · Manuscript says',
    card3Label: '3 · PR#11 fixes it',
    card1Result: 'Result',
    card2Positive: 'Positive control',
    card3Additive: 'Additive change · non-breaking',
  },
  patient: {
    eyebrow: 'A fix that matters to you',
    title: 'Why we removed a drug from the shortlist',
    blurb:
      'The old system suggested a class of drug called PARP inhibitors for this tumor type. Published research already showed that class does not work for this specific genetic pattern. We updated the software so the shortlist only carries drugs the evidence supports.',
    card1Label: '1 · What the old shortlist showed',
    card2Label: '2 · What the published paper found',
    card3Label: '3 · The fix we made',
    card1Result: 'Effect on your shortlist',
    card2Positive: 'A related drug that DID work',
    card3Additive: 'This change added information — nothing was taken away.',
  },
  pharma: {
    eyebrow: 'Falsification-driven ledger scrub · PR#11',
    title: 'PARP class de-recommended (falsified) with receipt',
    blurb:
      'The prior shortlist carried PARP inhibitors on a matrix-axis heuristic. The peer-reviewed source on the receipt rules the class out for the MBD4-LOF axis with a positive control. PR#11 stamps manuscript_claim_type so this de-recommendation is auditable.',
    card1Label: '1 · Prior recommendation on the ledger',
    card2Label: '2 · Peer-reviewed falsification receipt',
    card3Label: '3 · Manuscript-claim-type stamp',
    card1Result: 'Ledger consequence',
    card2Positive: 'Positive-control receipt',
    card3Additive: 'Non-breaking · additive schema field',
  },
};

// ---------------------------------------------------------------------------
// PARP arc — persona VISIBILITY layer.
//
// The panel reads these booleans to decide whether to render a p-value line,
// a matrix-axis line, or a raw patient identifier. Not every persona sees
// every field; that's the point.
// ---------------------------------------------------------------------------
export const PARP_ARC_VISIBILITY: Record<
  Persona,
  { showPValueLine: boolean; showMatrixAxis: boolean; showPatientId: boolean }
> = {
  oncologist: { showPValueLine: true,  showMatrixAxis: true,  showPatientId: true  },
  patient:    { showPValueLine: false, showMatrixAxis: false, showPatientId: true  },
  pharma:     { showPValueLine: true,  showMatrixAxis: true,  showPatientId: false },
};
