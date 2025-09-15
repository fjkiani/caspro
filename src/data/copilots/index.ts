// Centralized co-pilot data exports
import { CoPilotDetailContent } from '../../types/copilot-types';
import { chemoData } from './chemo-data';
// import { agenticEmrData } from './agentic-emr-data';
import { crisprIntelligenceData } from './crispr-intelligence-data';
import { clinicalTrialsData } from './clinical-trials';
import { pathwayData } from './pathway-data';
import { therapyFitData } from './therapy-fit-data';
import { toxicityData } from './toxicity-data';

export const coPilotDetailsData: Record<string, CoPilotDetailContent> = {
  "chemo": chemoData,
  // "agentic-emr": agenticEmrData,
  "crispr-intelligence": crisprIntelligenceData,
  "clinical-trials": clinicalTrialsData,
  "pathway": pathwayData,
  "therapy-fit": therapyFitData,
  "toxicity-risk": toxicityData,
};

// Export individual co-pilot data for direct imports
export { chemoData, crisprIntelligenceData, clinicalTrialsData, pathwayData, therapyFitData, toxicityData };

// Export types
export type { CoPilotDetailContent, KeyCapability, CapabilityAspect, CapabilityComponent } from '../../types/copilot-types';
