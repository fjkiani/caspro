import React from 'react';
import { Target, Dna, Scissors, Zap, Activity } from 'lucide-react';
import type { APIDemo } from '../types';

/**
 * Default discriminative APIs for Oracle page
 * All simulation data represents validated Evo2 capabilities
 */
export const DISCRIMINATIVE_APIS: APIDemo[] = [
  {
    id: 'variant_impact',
    name: 'Predict Variant Impact',
    endpoint: '/predict_variant_impact',
    icon: React.createElement(Target, { className: "w-6 h-6" }),
    color: 'blue',
    description: 'Zero-shot pathogenicity prediction for coding and non-coding variants',
    capabilities: ['Zero-shot prediction', 'Multi-modal scoring'],
    useCases: [
      {
        title: 'Clinical Interpretation',
        description: 'Classify VUS and rare variants',
        examples: ['BRCA1 missense variants', 'Non-coding regulatory variants']
      }
    ],
    simulation: {
      input: { variant: 'chr17:43044295:A>T', gene: 'BRCA1' },
      steps: [
        { title: 'Sequence Context', description: 'Loading genomic context', duration: 800 },
        { title: 'Multi-modal Analysis', description: 'Analyzing variant impact', duration: 1200 }
      ],
      finalOutput: { pathogenicity: 0.89, confidence: 0.94, classification: 'Likely Pathogenic' }
    }
  },
  {
    id: 'gene_essentiality',
    name: 'Predict Gene Essentiality',
    endpoint: '/predict_gene_essentiality',
    icon: React.createElement(Dna, { className: "w-6 h-6" }),
    color: 'green',
    description: 'Context-aware prediction of gene importance for cell survival',
    capabilities: ['Cell-type specific', 'Tissue context'],
    useCases: [
      {
        title: 'Drug Target Discovery',
        description: 'Identify essential genes in cancer vs normal',
        examples: ['Oncogene dependencies', 'Synthetic lethality']
      }
    ],
    simulation: {
      input: { gene: 'BRCA1', cell_type: 'MCF7', context: 'cancer' },
      steps: [
        { title: 'Context Loading', description: 'Loading cell-type context', duration: 900 },
        { title: 'Essentiality Scoring', description: 'Computing essentiality score', duration: 1100 }
      ],
      finalOutput: { essentiality_score: 0.76, context_specificity: 0.82, confidence: 0.91 }
    }
  },
  {
    id: 'crispr_efficacy',
    name: 'Predict CRISPR Spacer Efficacy',
    endpoint: '/predict_crispr_spacer_efficacy',
    icon: React.createElement(Scissors, { className: "w-6 h-6" }),
    color: 'purple',
    description: 'Predict guide RNA cutting efficiency and specificity',
    capabilities: ['On-target efficacy', 'Off-target prediction'],
    useCases: [
      {
        title: 'Guide Design',
        description: 'Select optimal guides for experiments',
        examples: ['Gene knockout', 'Base editing', 'Prime editing']
      }
    ],
    simulation: {
      input: { guide_sequence: 'GTTCCAGAACCTGAAAGCTG', target: 'BRCA1' },
      steps: [
        { title: 'Guide Analysis', description: 'Analyzing guide properties', duration: 700 },
        { title: 'Efficacy Prediction', description: 'Computing cutting efficiency', duration: 1000 }
      ],
      finalOutput: { efficacy: 0.87, specificity: 0.94, off_target_sites: 2 }
    }
  },
  {
    id: 'chromatin_accessibility',
    name: 'Predict Chromatin Accessibility',
    endpoint: '/predict_chromatin_accessibility',
    icon: React.createElement(Zap, { className: "w-6 h-6" }),
    color: 'orange',
    description: 'Predict chromatin accessibility and regulatory potential',
    capabilities: ['Cell-type specific', 'Regulatory prediction'],
    useCases: [
      {
        title: 'Regulatory Analysis',
        description: 'Identify accessible regulatory regions',
        examples: ['Enhancer discovery', 'Promoter analysis']
      }
    ],
    simulation: {
      input: { region: 'chr17:43000000-43100000', cell_type: 'MCF7' },
      steps: [
        { title: 'Region Loading', description: 'Loading genomic region', duration: 800 },
        { title: 'Accessibility Prediction', description: 'Predicting chromatin state', duration: 1300 }
      ],
      finalOutput: { accessibility_score: 0.73, regulatory_potential: 0.68, confidence: 0.89 }
    }
  },
  {
    id: 'protein_functional_change',
    name: 'Predict Protein Functional Change',
    endpoint: '/predict_protein_functional_change',
    icon: React.createElement(Activity, { className: "w-6 h-6" }),
    color: 'cyan',
    description: 'Predict functional impact of protein sequence changes',
    capabilities: ['Structure-function', 'Evolutionary context'],
    useCases: [
      {
        title: 'Protein Engineering',
        description: 'Design functional protein variants',
        examples: ['Enzyme optimization', 'Antibody engineering']
      }
    ],
    simulation: {
      input: { protein: 'BRCA1', mutation: 'L1407P', position: 1407 },
      steps: [
        { title: 'Structure Analysis', description: 'Analyzing protein structure', duration: 1000 },
        { title: 'Function Prediction', description: 'Predicting functional change', duration: 1400 }
      ],
      finalOutput: { functional_impact: 0.82, structural_disruption: 0.76, likelihood: 0.91 }
    }
  }
];



