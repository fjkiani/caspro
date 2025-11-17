/**
 * Default values for TLS SAE Thinking Process component
 */

export const DEFAULT_EXPLAIN_TRACK_DATA = {
  sequence: 'A'.repeat(200),
  variant: { pos: 88, ref: 'C', alt: 'T' },
  saeFeatures: [],
  deltaLLSeries: []
};

export const DEFAULT_VARIANT_DETAIL_DATA = {
  id: 'Unknown',
  region: 'coding' as const,
  zeroShot: -2.1,
  supervised: 0.89,
  verdict: 'Uncertain' as const,
  notes: 'Analysis in progress...'
};

export const DEFAULT_KPI_METRICS = [
  { label: 'Analysis Score', value: '85.2%' },
  { label: 'Confidence', value: '89.0%' },
  { label: 'Processing Time', value: '2.3s' },
  { label: 'AUROC', value: '0.957' }
];

export const DEFAULT_ENGINEERING_METRICS = [
  { label: 'Analysis Score', value: '85.2%' },
  { label: 'Δ Likelihood', value: '-2.1' },
  { label: 'Analysis Time', value: '2.3s' },
  { label: 'AUROC', value: '0.957' }
];

export const DEFAULT_RUO_DISCLAIMER = {
  title: "Research Use Only - Simulated for Demo Purpose",
  description: "This analysis is presented as Research Use Only (RUO) - demonstrating how Evo2's capabilities could be applied to biological analysis. This represents a proposed hypothesis, not validated clinical therapy."
};

export const DEFAULT_THINKING_DESCRIPTION = "CrisPRO.ai's 9.3 trillion parameter brain powered by Evo2 processes biological analysis through mechanistic interpretability. Each step reveals how CrisPRO utilizes biological concepts learned without supervision.";

export const DEFAULT_ANALYSIS_SUMMARY = {
  saeFeatures: "6 biological features activated",
  readiness: "85.2% capacity",
  verdict: "Analysis Complete (85.2% confidence)"
};



