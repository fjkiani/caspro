/**
 * Anchor-panel types.
 *
 * Extends the PatientBundle with an optional `anchorPanels` slot carrying data
 * extracted from committed anchor-repo snapshots:
 *   - CRC01 → Brenus (trial intelligence, admissibility-tagged evidence walls)
 *   - BM01  → evo2-e2e (Target-Lock scores + Evo2 delta-LL for BrM cascade)
 *
 * SNAPSHOT-ONLY: no live LLM, no live Modal calls at render time.
 * Every field carries a `sourcePath` back into the anchor repo so a reader can
 * open the exact committed file that produced it.
 *
 * UX guidance (per user amendment): every panel MUST render its `plainSummary`
 * first (what CrisPRO does for this patient, in one sentence) before showing
 * jargon-heavy tables. Panel components enforce that ordering.
 */

/** T1-SCI = published peer-reviewed; T1-CORP = corporate/regulatory; T2 = pre-print / consortium; T3 = internal working. */
export type AdmissibilityTag = 'T1-SCI' | 'T1-CORP' | 'T2' | 'T3';

/** Which anchor repo a field came from. */
export type AnchorRepo = 'Brenus' | 'evo2-e2e';

// --- Shared source-provenance stamp ---
export type AnchorSource = {
  repo: AnchorRepo;
  /** Relative path inside the anchor repo, e.g. "engagements/brenus/trial_intelligence/trial_decode_registry_v2.json". */
  sourcePath: string;
  /** Optional short description of what this file is, for hover/tooltip use. */
  fileRole?: string;
};

// ─── CRC01 · Brenus anchor panel ─────────────────────────────────────────────

/**
 * One admissibility-tagged claim extracted from Brenus. Not a treatment
 * recommendation — a piece of evidence.
 */
export type BrenusClaim = {
  claim: string;
  admissibility: AdmissibilityTag;
  /** Verified against a T1 source by Brenus? */
  verified: boolean;
  source: AnchorSource;
};

/**
 * One trial card from Brenus's trial_decode_registry. Only fields Brenus itself
 * stores are surfaced; nothing is inferred.
 */
export type BrenusTrialCard = {
  nctId: string;
  trialName: string;
  drug: string;
  indication: string;
  cancerType: string;
  line: string;
  phase: string;
  status: string;
  primaryResult: string;
  primaryMet: string;
  /** Why Brenus filed this trial in the IO_APPENDIX bucket (boundary condition, not primary program). */
  whyAppendix: string;
  program: string;
  dataStatus: string;
  source: AnchorSource;
};

export type CrcAnchorEvidencePanel = {
  /** ONE sentence, plain-English. Rendered above all jargon. */
  plainSummary: string;
  /** ONE more sentence: what this means for the specific patient in front of you. */
  patientRelevance: string;
  /** Trial cards that Brenus's registry ties to this patient's population. */
  trials: BrenusTrialCard[];
  /** Admissibility-tagged claims (boundary conditions, negative controls, etc.). */
  claims: BrenusClaim[];
  /** Small "why we're showing you this" footer for the panel. */
  adjacentEngagementNote: string;
  /** Provenance footer — which Brenus artifacts produced this panel. */
  provenance: AnchorSource[];
};

// ─── BM01 · evo2-e2e anchor panel ────────────────────────────────────────────

/** BrM cascade step names — must match evo2-e2e universe.py exactly. */
export type BrMStep =
  | 'primary_tumor_escape'
  | 'intravasation'
  | 'circulation_survival'
  | 'bbb_transit'
  | 'cns_colonization'
  | 'brain_niche_adaptation'
  | 'brm_angiogenesis';

/**
 * One row in the Target-Lock table for a given (gene, BrM step). Values are
 * verbatim from pipeline_results_*.json; component code does not re-score.
 */
export type TargetLockRow = {
  gene: string;
  step: BrMStep;
  calibratedScore: number;
  targetLockScore: number;
  /** True = evo2-e2e labels this gene a driver at this step; false = hard negative. */
  label: boolean;
  bbbRelevant: boolean;
  /** Anti-hallucination flags that evo2-e2e records with every gene score. */
  flags: readonly string[];
};

/**
 * One Evo2 conditional-LL variant score. Negative delta = variant more
 * disruptive vs reference; near zero = neutral.
 */
export type Evo2VariantScore = {
  gene: string;
  hgvsP: string;
  deltaLL: number;
  /** e.g. "BrM hotspot, 2× enriched (MSK-MET)"; verbatim from repo. */
  interpretation: string;
  /** BrM steps where the affected gene is a driver. */
  relatedSteps: readonly BrMStep[];
  /** Whether this maps to a mutation on THIS patient's bundle. */
  patientMatch: boolean;
};

/** Per-step AUROC / AUPRC / precision@k from pipeline_results.validation_metrics. */
export type StepValidationMetric = {
  step: BrMStep;
  auroc: number;
  auprc: number;
  precisionAt3: number;
  nPos: number;
  nTotal: number;
};

/** evo2-e2e Modal deployment provenance — proves the numbers came from a real GPU run, not a mock. */
export type ModalProvenance = {
  service: string;
  app: string;
  gpu: string;
  status: string;
};

export type BrmTargetLockPanel = {
  /** ONE sentence, plain-English. Rendered above all jargon. */
  plainSummary: string;
  /** ONE more sentence: what this means for the specific patient in front of you. */
  patientRelevance: string;
  /** Evo2 delta-LL scores for the specific variants on this patient's mutation list plus a few contextual hotspots. */
  patientVariants: Evo2VariantScore[];
  /** Top-N genes across all 7 BrM steps, sorted by targetLockScore. Length ≤ 20 for UI. */
  topTargetLock: TargetLockRow[];
  /** Per-step validation metrics — how well the pipeline separates positives from hard-negatives at each step. */
  validation: StepValidationMetric[];
  /** Pipeline run info verbatim (seed, elapsed, timestamp, n_genes, etc.). */
  runInfo: {
    timestamp: string;
    seed: number;
    disease: string;
    fastMode: boolean;
    useEnformer: boolean;
    nGenes: number;
    nPositives: number;
    nNegatives: number;
    nSteps: number;
    elapsedSeconds: number;
  };
  /** Modal deployment provenance for the underlying scoring services. */
  modalDeployments: ModalProvenance[];
  /** Provenance footer — which evo2-e2e artifacts produced this panel. */
  provenance: AnchorSource[];
};

// ─── Union field spliced into PatientBundle ──────────────────────────────────

export type AnchorPanels = {
  crc?: CrcAnchorEvidencePanel;
  brm?: BrmTargetLockPanel;
};
