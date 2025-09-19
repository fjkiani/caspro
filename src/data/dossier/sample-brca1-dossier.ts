import { Dossier } from './types';

export const sampleBRCA1Dossier: Dossier = {
  header: {
    variant: 'chr17:43044295:A>T',
    gene: 'BRCA1',
    runId: 'CRP-29159525',
    engines: ['Oracle', 'Forge', 'Boltz', 'Command Center'],
    precision: 0.957,
  },
  executiveSummary: {
    catastrophicError: {
      verdict: 'Likely Pathogenic',
      confidence: 0.94,
      deltaLogLikelihood: -8.2,
      api: '/predict_variant_impact',
      evidence: 'Confirms loss-of-function mutation with 95.7% AUROC precision (n=53,210 ClinVar variants).',
    },
    criticalDependency: {
      geneEssentiality: 'High (0.82-0.99 AUROC)',
      syntheticLethality: true,
      depMapCorrelation: 0.73,
      api: '/predict_gene_essentiality',
      evidence: 'Validates cancer dependency on broken DNA repair pathway.',
    },
    conclusion: {
      title: 'Perfect PARP Inhibitor Candidate',
      details: 'Mathematical proof of synthetic lethality vulnerability. This patient represents the precise biomarker-positive population for which PARP inhibitors demonstrate maximum efficacy. Trial enrollment recommended.',
    },
  },
  saeIntelligence: {
    title: 'SAE Intelligence: Interpretable Genomic Features',
    subtitle: '32,768 learned biological concepts from Layer 26 SAE',
    totalFeatures: 32768,
    activeFeatures: [
        {
            id: 'f_102',
            label: 'Exon Boundary',
            type: 'exon',
            position: 43044290,
            strength: 0.89,
            description: 'Critical exon-intron junction disrupted by variant',
            deltaLL: -12.5,
            biologicalImpact: 'Splicing disruption leads to protein truncation'
        },
        {
            id: 'f_211',
            label: 'TF Motif (AP-1)',
            type: 'tfbs',
            position: 43044310,
            strength: 0.76,
            description: 'Transcription factor binding site affected',
            deltaLL: -8.2,
            biologicalImpact: 'Reduced transcriptional regulation'
        },
        {
            id: 'f_156',
            label: 'Protein Structure',
            type: 'structure',
            position: 43044350,
            strength: 0.92,
            description: 'Alpha-helix formation region disrupted',
            deltaLL: -6.1,
            biologicalImpact: 'Protein folding instability'
        },
        {
            id: 'f_089',
            label: 'Splice Site',
            type: 'motif',
            position: 43044400,
            strength: 0.67,
            description: 'Canonical splice acceptor site altered',
            deltaLL: -4.3,
            biologicalImpact: 'Alternative splicing activation'
        }
    ],
    disruptionAnalysis: {
      cumulativeScore: -8.2,
    },
    methodology: {
      layer: 26,
      concepts: ['Exon/Intron/TFBS/2° Structure'],
      metric: 'Delta Log-Likelihood (ΔLL)',
    },
  },
  speFusion: {
    title: 'S/P/E Fusion: Sequence + Pathway + Evidence Integration',
    subtitle: 'Explainable therapy ranking with confidence, evidence tier, badges, and citations',
    sequence: {
      deltaThreshold: -3.2,
      contextWindow: 8192,
      consistency: 0.85,
      hotspotAware: true,
    },
    pathway: {
      topPathways: [
        { name: 'DNA Repair (BRCA)', weight: 0.87, moa: 'PARP inhibitor target' },
        { name: 'Cell Cycle Control', weight: 0.64, moa: 'CDK4/6 inhibitor synergy' },
        { name: 'Apoptosis Regulation', weight: 0.52, moa: 'BCL-2 inhibitor potential' }
      ],
      coverage: 0.95,
      cooperation: 0.25,
      accuracy: 0.89,
    },
    evidence: {
      clinvarAUROC: 0.957,
      splicevardbAUROC: 0.826,
      tierPromotions: '10-20%',
      evidenceTier: 'Supported',
    },
    integratedResult: {
      sequenceConfidence: 0.957,
      pathwayAlignments: 3,
      evidenceLevel: 'Tier 2',
    },
  },
  cohortContext: {
    title: 'Cohort Context: Population-Level Intelligence',
    subtitle: 'See how this patient fits within the broader BRCA1+ population context',
    cohorts: [
        {
            id: 'brca1-cohort',
            name: 'BRCA1+ Breast Cancer Patients',
            population: '2.8K patients • Hereditary Breast Cancer',
            size: 2847,
            riskStratification: 'high',
        }
    ],
  },
  dataLab: {
    title: 'Data Lab: Supporting Evidence & Studies',
    subtitle: 'Explore the genomic datasets and therapeutic pipelines supporting this analysis',
    browserTitle: 'BRCA1 Research Evidence Browser',
    browserSubtitle: 'Access 50+ curated datasets with real-time therapeutic pipeline integration',
  },
  clinicalTrials: {
    title: 'Clinical Trial Matching Intelligence',
    subtitle: 'Precision enrollment with surgical precision patient selection',
    eligibility: [
      { criterion: 'BRCA1/2 Mutation Status', status: 'CONFIRMED' },
      { criterion: 'Loss-of-Function Verified', status: '94.0% CONFIDENCE', confidence: 0.94 },
      { criterion: 'Synthetic Lethality Target', status: 'VALIDATED' },
    ],
    recommendations: [
      { trial: 'PARP Inhibitor Monotherapy', likelihood: 'LIKELY', details: '3 active trials • Phase II/III' },
      { trial: 'PARP + CDK4/6 Combination', likelihood: 'POTENTIAL', details: '2 active trials • Phase I/II' },
      { trial: 'Immunotherapy + PARP', likelihood: 'EMERGING', details: '1 active trial • Phase I' },
    ],
    conclusion: {
      title: 'The Perfect Clinical Trial',
      points: ['Smaller', 'Faster', 'Cheaper'],
      finalVerdict: 'Higher Probability of Success: Clear signal, overwhelming data, FDA approval',
    },
    actions: [
      { label: 'Launch Clinical Trials Co-Pilot', link: '/platform/clinical-trials' },
      { label: 'Export Complete Dossier' },
      { label: 'Generate Enrollment Strategy' },
    ],
    researchUseNotice: 'Comprehensive analysis powered by Oracle (95.7% AUROC), SAE Intelligence (32,768 features), S/P/E Fusion, Cohort Context, and Data Lab evidence. Clinical decisions require multidisciplinary team review and additional clinical context.',
  },
};

