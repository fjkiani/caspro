export interface HowItWorksStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  details: string[];
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: 'upload',
    title: 'Upload Once',
    description: 'Genomic reports, clinical notes, lab results, imaging data',
    icon: '📤',
    color: 'blue',
    details: [
      'NGS reports (VCF, MAF, PDF)',
      'Clinical notes and pathology reports',
      'Lab results and imaging data',
      'Complete patient context'
    ]
  },
  {
    id: 'orchestrate',
    title: 'Agents Orchestrate',
    description: '8-agent pipeline extracts, analyzes, and generates insights automatically',
    icon: '🤖',
    color: 'purple',
    details: [
      'Data Extraction Agent: Parses and validates data',
      'Biomarker Agent: Calculates TMB, MSI, HRD',
      'Synthetic Lethality Agent: Evo2-powered essentiality scoring',
      'Drug Ranking Agent: S/P/E framework (96.6% accuracy)',
      'Trial Matching Agent: Mechanism-based matching',
      'Nutrition Agent: Toxicity-aware recommendations',
      'Resistance Agent: Early detection predictions',
      'Monitoring Agent: Continuous intelligence'
    ]
  },
  {
    id: 'track',
    title: 'Track Forever',
    description: 'Continuous monitoring never stops—alerts, updates, new insights',
    icon: '♾️',
    color: 'green',
    details: [
      'CA-125 kinetics tracking (plateau detection)',
      'ctDNA mutation monitoring (KRAS G12D at 0.8% VAF)',
      'New trial auto-matching (instant notifications)',
      'Resistance alerts 3-6 weeks before imaging',
      'Drug rankings updated as research emerges',
      'Real-time dashboard with actionable insights'
    ]
  }
];




