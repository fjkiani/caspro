export const GENES = ['KRAS', 'BRCA1', 'TP53', 'EGFR', 'ALK', 'BRAF'];

export const MOCK_COHORT_DATA = Array.from({ length: 8 }, (_, i) => ({
    id: `PX-SIG-${(9120 + i)}`,
    ...GENES.reduce((acc, gene) => ({ ...acc, [gene]: (Math.random()*0.9).toFixed(3) }), {})
}));

export const DNA_FEATURES = [
  {
    title: "Sequence Disruption",
    desc: "Evo2-1B zero-shot analysis providing calibrated disruption percentiles for clinical trials.",
    icon: "Cpu"
  },
  {
    title: "Contextual Pathway",
    desc: "Integrating pathway context (P) to refine rank predictions and identify secondary drivers.",
    icon: "Database"
  },
  {
    title: "Calibration Delta",
    desc: "Expected Calibration Error delta monitoring ensures high-fidelity auditable reliability.",
    icon: "Maximize"
  }
];

export const DNA_METRICS = {
    confidence_floor: 0.887,
    pathway_alignment: 6.667,
    ece_prediction: 0.537
};
