// Boltz Structural Validation Engine
// Real content from user - 3D Structural Assessment (RUO)

export type SimulationRun = { id: string; input: string; complexConfidence: number; notes?: string };

export const boltzContent = {
  about: {
    oneLiner: 'From 1D sequence to 3D certainty.',
    subtext: 'We filter out "wet noodles" before they hit the bench.',
    purpose: '3D Structural Assessment (RUO) - reduce wet-lab churn by filtering out unstable designs before synthesis.',
    targetAudience: 'Researchers and biotech R&D',
    coreConcept: 'Designs that look good in sequence often fail in 3D. Our Gauntlet runs a structural assessment (AlphaFold/Boltz) on candidate proteins to filter out unstable designs.'
  },
  
  runs: [
    { id: 'BOLTZ-001', input: 'QVQLQESGGGL...', complexConfidence: 0.824, notes: 'pLDDT 82.4' },
    { id: 'BOLTZ-002', input: 'QVQLEGG...', complexConfidence: 0.921, notes: 'pLDDT 92.1' }
  ] as SimulationRun[],
  
  kpis: {
    items: [
      { label: 'pLDDT', value: '82.4', description: '0-100 (higher = more confident folding)' },
      { label: 'pTM', value: '0.87', description: '0-1 (higher = better global topology)' },
      { label: 'Structural Pass Rate', value: '78%', description: '% of candidates with pLDDT ≥ 70' },
      { label: 'Time to Verdict', value: '2.3s', description: 'median seconds per structure' }
    ],
  },
  
  // Real capabilities from user content
  capabilities: {
    structuralAssessment: '3D Structural Assessment (RUO)',
    confidenceScoring: 'pLDDT confidence score per design with provenance',
    alphaFoldIntegration: 'AlphaFold/Boltz structural assessment',
    wetLabFiltering: 'Filter out unstable designs before synthesis'
  },
  
  // Real metrics from user content
  metrics: {
    pLDDT: {
      range: '0-100',
      description: 'Confidence in local 3D structure at each residue',
      threshold: '≥70 commonly used as "likely stable fold" hint',
      display: 'We show the mean'
    },
    pTM: {
      range: '0-1', 
      description: 'Confidence in global topology (how domains are arranged)',
      use: 'Helpful for multi-domain proteins'
    },
    fractionDisordered: {
      range: '0-1',
      description: 'Share of residues predicted to be disordered',
      signal: 'High values can signal unstable designs'
    },
    sequenceDisruption: {
      description: 'Evo2 magnitude suggesting functional change',
      note: 'Not a structure metric'
    },
    calibratedPercentile: {
      range: '0-100',
      description: 'Gene/disease-aware normalization of sequence disruption for interpretability'
    }
  },
  
  // Real use case from user content
  whyItMatters: [
    'Reduce failed syntheses and assays',
    'Increase trust in in-silico designs', 
    'Faster iteration: promote only promising candidates'
  ],
  
  howItWorks: [
    '1D Evo2 scoring → 3D structural pass',
    'Transparent metrics (pLDDT/pTM) + provenance',
    'Optional toggle in design workflows'
  ],
  
  whatYouGet: [
    'Structural Confidence chip per candidate',
    'Downloadable report with pLDDT/pTM and inputs',
    'Run ID for audit/repeat'
  ],
  
  // Real provenance from user content
  provenance: {
    title: "Provenance Panel",
    fields: ['run_id', 'engine', 'params', 'timestamp'],
    example: {
      runId: "boltz_af2_ptm_2024_001",
      engine: "ColabFold AF2-ptm",
      params: "AlphaFold2 with pTM scoring",
      timestamp: "2024-01-15T10:30:00Z"
    }
  },
  
  // RUO disclaimer from user content
  ruoDisclaimer: "Research Use Only. Structural assessment supports, does not replace, experimental validation."
} as const;

export type BoltzContent = typeof boltzContent; 
 
 
 
 