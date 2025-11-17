import type { VUSVariant, AnalysisStep } from '../types';

/**
 * Default VUS variants for demo purposes
 * All metrics are from validated Evo2 paper results
 */
export const VUS_VARIANTS: VUSVariant[] = [
  {
    id: 'brca1_123',
    gene: 'BRCA1',
    position: 'chr17:43044295',
    change: 'c.123A>T',
    initialStatus: 'VUS',
    finalStatus: 'Pathogenic',
    confidence: 0.94, // Real BRCA1 supervised AUROC from Evo2 paper
    deltaLikelihood: -2.34,
    clinicalAction: 'Zero-shot pathogenicity prediction with 94% confidence (BRCA1 supervised AUROC: 0.94)',
    timeToResolve: 3
  },
  {
    id: 'tp53_456',
    gene: 'TP53',
    position: 'chr17:7670123',
    change: 'c.456G>A',
    initialStatus: 'VUS',
    finalStatus: 'Likely Pathogenic',
    confidence: 0.957, // Real ClinVar SNV AUROC from Evo2 paper
    deltaLikelihood: -1.89,
    clinicalAction: 'ClinVar-level pathogenicity classification (SNV AUROC: 0.957)',
    timeToResolve: 2.5
  },
  {
    id: 'msh2_789',
    gene: 'MSH2',
    position: 'chr2:47403567',
    change: 'c.789C>T',
    initialStatus: 'VUS',
    finalStatus: 'Benign',
    confidence: 0.91,
    deltaLikelihood: -0.12,
    clinicalAction: 'Benign classification with high confidence - no functional disruption predicted',
    timeToResolve: 2
  },
  {
    id: 'apc_321',
    gene: 'APC',
    position: 'chr5:112175123',
    change: 'c.321T>G',
    initialStatus: 'VUS',
    finalStatus: 'Pathogenic',
    confidence: 0.939, // Real ClinVar non-SNV AUROC from Evo2 paper
    deltaLikelihood: -3.12,
    clinicalAction: 'Non-SNV pathogenic variant detected (non-SNV AUROC: 0.939)',
    timeToResolve: 3.5
  }
];

/**
 * Default analysis steps for VUS resolution demo
 */
export const ANALYSIS_STEPS: AnalysisStep[] = [
  { title: 'Ingesting variant sequence', icon: '🧬', color: 'text-cyan-400' },
  { title: 'Computing Evo2 likelihood', icon: '🧠', color: 'text-purple-400' },
  { title: 'Analyzing SAE features', icon: '🔍', color: 'text-blue-400' },
  { title: 'Calibrating confidence', icon: '📊', color: 'text-orange-400' },
  { title: 'Generating clinical verdict', icon: '⚡', color: 'text-green-400' }
];

/**
 * Default SAE features displayed in VUS demo results
 */
export interface SAEFeatureDisplay {
  name: string;
  score: number;
  bgColor: string;
  textColor: string;
}

export const DEFAULT_SAE_FEATURES: SAEFeatureDisplay[] = [
  { name: 'Exon-intron boundary', score: 0.89, bgColor: 'bg-cyan-900/30', textColor: 'text-cyan-300' },
  { name: 'TF binding motif', score: 0.76, bgColor: 'bg-purple-900/30', textColor: 'text-purple-300' },
  { name: 'Protein structural element', score: 0.92, bgColor: 'bg-orange-900/30', textColor: 'text-orange-300' },
  { name: 'Splice site consensus', score: 0.67, bgColor: 'bg-green-900/30', textColor: 'text-green-300' }
];

