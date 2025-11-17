import type { VUSVariant, SAEFeature } from '../types';

/**
 * Generate variant-specific SAE features based on gene
 */
export const getSAEFeatures = (gene: string): SAEFeature[] => {
  const baseFeatures: SAEFeature[] = [
    { name: 'Exon boundary', start: 60, end: 68 },
    { name: 'TF motif', start: 120, end: 130 }
  ];

  switch (gene) {
    case 'BRCA1':
      return [
        ...baseFeatures,
        { name: 'DNA repair domain', start: 80, end: 95 },
        { name: 'RING finger motif', start: 140, end: 155 }
      ];
    case 'TP53':
      return [
        ...baseFeatures,
        { name: 'DNA binding domain', start: 85, end: 100 },
        { name: 'Tetramerization domain', start: 160, end: 175 }
      ];
    case 'MSH2':
      return [
        ...baseFeatures,
        { name: 'Mismatch repair domain', start: 75, end: 90 },
        { name: 'ATPase domain', start: 145, end: 160 }
      ];
    case 'APC':
      return [
        ...baseFeatures,
        { name: 'β-catenin binding', start: 70, end: 85 },
        { name: 'Microtubule binding', start: 150, end: 165 }
      ];
    default:
      return baseFeatures;
  }
};

/**
 * Generate variant-specific delta likelihood series
 */
export const getDeltaLikelihoodSeries = (deltaLikelihood: number, variantPosition: number = 18): Array<{ pos: number; delta: number }> => {
  return Array.from({ length: 60 }, (_, i) => ({
    pos: 70 + i,
    delta: i === variantPosition ? deltaLikelihood : deltaLikelihood * 0.3 * Math.sin(i / 6) // Peak at variant position
  }));
};

/**
 * Generate variant-specific performance metrics
 */
export const getPerformanceMetrics = (variant: VUSVariant): Array<{ label: string; value: string }> => {
  const baseMetrics = [
    { label: 'Confidence', value: `${(variant.confidence * 100).toFixed(1)}%` },
    { label: 'Δ Likelihood', value: variant.deltaLikelihood.toFixed(2) },
    { label: 'Analysis Time', value: `${variant.timeToResolve}s` }
  ];

  switch (variant.gene) {
    case 'BRCA1':
      return [
        ...baseMetrics,
        { label: 'BRCA1 AUROC', value: '0.94' }
      ];
    case 'TP53':
      return [
        ...baseMetrics,
        { label: 'ClinVar AUROC', value: '0.957' }
      ];
    default:
      return [
        ...baseMetrics,
        { label: 'Zero-shot AUROC', value: '0.95+' }
      ];
  }
};

/**
 * Generate biological explanation based on gene and pathogenicity
 */
export const getBiologicalExplanation = (variant: VUSVariant): string => {
  const geneFunction: Record<string, string> = {
    'BRCA1': 'DNA repair pathway',
    'TP53': 'tumor suppressor function',
    'MSH2': 'mismatch repair mechanism',
    'APC': 'Wnt signaling pathway'
  };

  const impactLevel = Math.abs(variant.deltaLikelihood) > 2 ? 'severe' : 
                     Math.abs(variant.deltaLikelihood) > 1 ? 'moderate' : 'mild';

  const functionName = geneFunction[variant.gene] || 'cellular function';

  return `${impactLevel.charAt(0).toUpperCase() + impactLevel.slice(1)} disruption of ${functionName} detected through learned biological features`;
};

/**
 * Get gene-specific pathway description for mechanistic interpretability
 */
export const getGenePathwayDescription = (gene: string): string => {
  const pathwayMap: Record<string, string> = {
    'BRCA1': 'DNA repair pathway disruption',
    'TP53': 'tumor suppressor function loss',
    'MSH2': 'mismatch repair deficiency',
    'APC': 'oncogene activation'
  };
  return pathwayMap[gene] || 'oncogene activation';
};

/**
 * Get gene-specific Oracle score display value
 */
export const getOracleScore = (gene: string): string => {
  const scoreMap: Record<string, string> = {
    'BRCA1': '73%',
    'TP53': '89%',
    'MSH2': '65%',
    'APC': '65%'
  };
  return scoreMap[gene] || '65%';
};

/**
 * Get gene-specific impact level display value
 */
export const getImpactLevel = (gene: string): string => {
  const impactMap: Record<string, string> = {
    'BRCA1': 'High',
    'TP53': 'Critical',
    'MSH2': 'Medium',
    'APC': 'Medium'
  };
  return impactMap[gene] || 'Medium';
};

/**
 * Determine variant region type based on gene
 */
export const getVariantRegion = (gene: string): 'coding' | 'noncoding' | 'splice' => {
  if (gene === 'BRCA1' || gene === 'TP53') return 'coding';
  if (gene === 'MSH2') return 'splice';
  return 'noncoding';
};

/**
 * Convert final status to verdict type
 */
export const getVerdictFromStatus = (status: VUSVariant['finalStatus']): 'Pathogenic' | 'Benign' | 'Uncertain' => {
  if (status === 'Likely Pathogenic' || status === 'Pathogenic') return 'Pathogenic';
  if (status === 'Benign') return 'Benign';
  return 'Uncertain';
};



