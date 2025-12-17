// Centralized co-pilot data exports
import { CoPilotDetailContent } from '../../types/copilot-types';
import { chemoData } from './chemo-data';
import { agenticEmrData } from './agentic-emr-data';
import { oracleIntelligenceData } from './oracle-intelligence-data';
import { forgeIntelligenceData } from './forge-intelligence-data';
import { scribeIntelligenceData } from './scribe-intelligence-data';
import { crisprIntelligenceData } from './crispr-intelligence-data';
import { clinicalTrialsData } from './clinical-trials';
import { immunotherapyData } from './immunotherapy-data';
import { pathwayData } from './pathway-data';
import { therapyFitData } from './therapy-fit-data';
import { toxicityData } from './toxicity-data';

export const coPilotDetailsData: Record<string, CoPilotDetailContent> = {
  "chemo": chemoData,
  "agentic-emr": agenticEmrData,
  "oracle-intelligence": oracleIntelligenceData,
  "forge-intelligence": forgeIntelligenceData,
  "scribe-intelligence": scribeIntelligenceData,
  "crispr-intelligence": crisprIntelligenceData,
  "clinical-trials": clinicalTrialsData,
  "immunotherapy": immunotherapyData,
  "pathway": pathwayData,
  "therapy-fit": therapyFitData,
  "toxicity-risk": toxicityData,
};

// Export individual co-pilot data for direct imports
export { chemoData, agenticEmrData, oracleIntelligenceData, forgeIntelligenceData, scribeIntelligenceData, crisprIntelligenceData, clinicalTrialsData, immunotherapyData, pathwayData, therapyFitData, toxicityData };

// Export types
export type { 
  CoPilotDetailContent, 
  KeyCapability, 
  CapabilityAspect, 
  CapabilityComponent, 
  ValuePropositionSection,
  GenomicUseCaseGridItem,
  WorkflowStep,
  InSilicoWorkflow,
  KPI,
  KPINarrative,
  ObservedOutcome
} from '../../types/copilot-types';
