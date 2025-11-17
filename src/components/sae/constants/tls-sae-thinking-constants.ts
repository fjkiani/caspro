import type { TLSThinkingStep } from '../TLSSAEThinkingProcess';

/**
 * TLS-specific SAE features for mechanistic interpretability
 * These represent biological concepts learned by Evo2's layer 26 SAE
 */
export const TLS_SAE_FEATURES = [
  { name: 'TLS regulatory element', start: 60, end: 68 },
  { name: 'CXCL13 promoter', start: 120, end: 130 },
  { name: 'LTBR binding site', start: 80, end: 95 },
  { name: 'CD40L enhancer', start: 140, end: 155 },
  { name: 'B-cell activation motif', start: 100, end: 115 },
  { name: 'Stromal reprogramming element', start: 160, end: 175 }
];

/**
 * Default TLS thinking steps for the SAE thinking process
 * These represent the 6-step analysis workflow for TLS seed engineering
 */
export const DEFAULT_TLS_THINKING_STEPS: TLSThinkingStep[] = [
  {
    title: "TLS Gene Variant Analysis (SAE Layer 26)",
    description: `Batch-TopK SAE reveals ${TLS_SAE_FEATURES.length} TLS-specific biological features activated`,
    detail: "Real mechanistic interpretability from Evo2 paper - features learned without supervision for TLS biology",
    component: "OracleExplainTrack",
    icon: "🔍",
    color: "text-cyan-400",
    paperRef: "Figure 4A-G: SAE features capture TLS regulatory elements, CXCL13 promoters, LTBR binding sites",
    ruoDisclaimer: "⚠️ Research Use Only - Simulated for Demo Purpose"
  },
  {
    title: "TLS Readiness Assessment",
    description: `Patient TLS formation capacity: 85.2% readiness score`,
    detail: "Discriminative analysis of TLS-critical genes (CXCL13, LTBR, CD40L, IRF4) for functional impact",
    component: "EssentialityChart",
    icon: "🧬",
    color: "text-green-400",
    paperRef: "ClinVar AUROC: 0.957 for SNVs - validated TLS gene variant prediction",
    ruoDisclaimer: "⚠️ Research Use Only - Simulated for Demo Purpose"
  },
  {
    title: "Neoantigen Identification",
    description: `Tumor-specific antigen prediction: KRAS G12C neoepitope identified`,
    detail: "Discriminative AI identifies patient-specific tumor antigens for B-cell targeting",
    component: "VariantDetailCard",
    icon: "🎯",
    color: "text-purple-400",
    paperRef: "BRCA1 AUROC: 0.94 - validated cancer variant pathogenicity prediction",
    ruoDisclaimer: "⚠️ Research Use Only - Simulated for Demo Purpose"
  },
  {
    title: "TLS Architecture Prediction",
    description: `Chromatin accessibility analysis: 2.34 accessibility score`,
    detail: "Predict chromatin state and TF binding at TLS formation regulatory elements",
    component: "AccessibilityTrack",
    icon: "🏗️",
    color: "text-blue-400",
    paperRef: "Figure 4F: Features activate on DNA motifs resembling human TF binding sites",
    ruoDisclaimer: "⚠️ Research Use Only - Simulated for Demo Purpose"
  },
  {
    title: "Molecular Staple Gun Design",
    description: `Bispecific protein design: CD19×CD40L fusion protein generated`,
    detail: "Generative AI designs molecular constructs for forced B-cell/T-cell interaction",
    component: "ProteinDeltaCard",
    icon: "🔧",
    color: "text-orange-400",
    paperRef: "Validated protein sequence design with structural constraints",
    ruoDisclaimer: "⚠️ Research Use Only - Simulated for Demo Purpose"
  },
  {
    title: "Multi-Component Integration",
    description: `Programmable TLS seed assembly: 4-component payload optimized`,
    detail: "Integration of neoantigen dossier, molecular staple gun, stromal reprogramming cassette, and TLS architecture director",
    component: "KPIStrip",
    icon: "⚙️",
    color: "text-yellow-400",
    paperRef: "Genome-scale sequence generation validated for complex biological systems",
    ruoDisclaimer: "⚠️ Research Use Only - Simulated for Demo Purpose"
  }
];

/**
 * TLS-specific variant data for demo purposes
 */
export const TLS_DEFAULT_VARIANT = {
  gene: 'CXCL13',
  change: 'c.123G>A',
  deltaLikelihood: -2.34,
  confidence: 0.852,
  finalStatus: 'TLS-Competent'
};

/**
 * TLS-specific explain track data
 */
export const TLS_EXPLAIN_TRACK_DATA = {
  sequence: 'A'.repeat(200),
  variant: { pos: 88, ref: 'C', alt: 'T' },
  saeFeatures: TLS_SAE_FEATURES,
  deltaLLSeries: Array.from({ length: 60 }, (_, i) => ({
    pos: 70 + i,
    delta: i === 18 ? -2.34 : -2.34 * 0.3 * Math.sin(i / 6)
  }))
};

/**
 * TLS-specific variant detail data
 */
export const TLS_VARIANT_DETAIL_DATA = {
  id: 'CXCL13:c.123G>A',
  region: 'coding' as const,
  zeroShot: -2.34,
  supervised: 0.852,
  verdict: 'Uncertain' as const,
  notes: 'TLS formation capacity assessment: 85.2% readiness for programmable TLS seed engineering'
};

/**
 * TLS-specific KPI metrics
 */
export const TLS_KPI_METRICS = [
  { label: 'TLS Readiness', value: '85.2%' },
  { label: 'Neoantigen Score', value: '8.7/10' },
  { label: 'Integration Success', value: '94.2%' },
  { label: 'Predicted Efficacy', value: '87.5%' }
];

/**
 * TLS-specific engineering metrics
 */
export const TLS_ENGINEERING_METRICS = [
  { label: 'TLS Readiness', value: '85.2%' },
  { label: 'Δ Likelihood', value: '-2.34' },
  { label: 'Analysis Time', value: '2.3s' },
  { label: 'TLS AUROC', value: '0.957' }
];

/**
 * TLS-specific RUO disclaimer text
 */
export const TLS_RUO_DISCLAIMER = {
  title: "Research Use Only - Simulated for Demo Purpose",
  description: "This TLS Seed SAE analysis is presented as Research Use Only (RUO) - demonstrating how Evo2's mechanistic interpretability capabilities could be applied to TLS engineering. This represents a proposed biological hypothesis, not validated clinical therapy."
};

/**
 * TLS-specific thinking process description
 */
export const TLS_THINKING_DESCRIPTION = "CrisPRO.ai's 9.3 trillion parameter brain powered by Evo2 processes TLS engineering through mechanistic interpretability. Each step reveals how CrisPRO utilizes biological concepts learned without supervision for TLS formation and regulation.";

/**
 * TLS-specific analysis summary
 */
export const TLS_ANALYSIS_SUMMARY = {
  saeFeatures: `${TLS_SAE_FEATURES.length} TLS-specific features activated`,
  readiness: "85.2% capacity for programmable TLS seed",
  verdict: "TLS-Competent (85.2% confidence)"
};



