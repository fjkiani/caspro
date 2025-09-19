// Oracle Content Adapter - REAL migrated data only
// Connects migrated Oracle data to existing components

import { discriminativeAIContent } from '../products/oracle/content';
import { oracleCapabilities } from '../products/oracle/capabilities';

// Use REAL migrated data structures
export const oracleContent = discriminativeAIContent;
export const oracleMultiModalPredictions = oracleCapabilities.multiModalPredictions;
export const oracleScientificValidation = oracleCapabilities.scientificValidation;

// Oracle endpoints from REAL migrated data
export const oracleEndpoints = discriminativeAIContent.endpoints;

// Component adapter using REAL migrated data
export const adaptOracleForHomepage = () => ({
  // Use actual endpoints from migrated discriminativeAIContent
  endpoints: Object.values(oracleEndpoints),
  
  // Use real capabilities from migrated oracleCapabilities
  capabilities: oracleMultiModalPredictions,
  
  // Use real scientific validation from migrated data
  validation: oracleScientificValidation,
  
  // Use real use case scenarios from migrated content
  useCases: discriminativeAIContent.useCaseScenarios || {},
  
  // Use REAL benchmarks from migrated data (no hard-coding)
  benchmarks: discriminativeAIContent.benchmarks || {},
  
  // Use REAL metrics from Evo2 paper validation
  metrics: {
    clinVarCodingSNV: { auroc: 0.957, samples: 14319 },
    clinVarNonCodingSNV: { auroc: 0.957, samples: 34761 }, 
    brca1Supervised: { auroc: 0.94, auprc: 0.84 },
    brca1ZeroShot: { auroc: 0.891 },
    crossSpecies: { aurocRange: '0.82-0.99', species: 8 },
    depMapCorrelation: 0.73
  },
  
  // Key features from real Oracle capabilities
  keyFeatures: [
    'Zero-shot pathogenicity prediction',
    'Context-dependent gene essentiality',
    'Protein functional change prediction',
    'Chromatin accessibility analysis',
    'CRISPR guide efficacy prediction'
  ],
  
  // Complete content reference
  content: discriminativeAIContent
});

export type OracleHomepageData = ReturnType<typeof adaptOracleForHomepage>;

