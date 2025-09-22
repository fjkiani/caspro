// Central export for all capability journey data
export * from './types';
export * from './chemotherapy';
export * from './crispr-intelligence';
export * from './precision-rad';
export * from './agentic-emr';
export * from './clinical-trials';
export * from './pathway';
export * from './therapy-fit';
export * from './toxicity';

import { chemotherapyJourney } from './chemotherapy';
import { crisprIntelligenceJourney } from './crispr-intelligence';
// import { precisionRadJourney } from './precision-rad';
const precisionRadJourney: any = {};
import { agenticEmrJourney } from './agentic-emr';
import { clinicalTrialsJourney } from './clinical-trials';
import { pathwayJourney } from './pathway';
import { therapyFitJourney } from './therapy-fit';
import { toxicityJourney } from './toxicity';
import { CapabilityJourneyData } from './types';

export const allCapabilityJourneys: Record<string, CapabilityJourneyData> = {
  'chemo': chemotherapyJourney,
  'crispr-intelligence': crisprIntelligenceJourney,
  'precision-rad': precisionRadJourney,
  'agentic-emr': agenticEmrJourney,
  'clinical-trials': clinicalTrialsJourney,
  'pathway': pathwayJourney,
  'therapy-fit': therapyFitJourney,
  'toxicity-risk': toxicityJourney,
};

// Helper function to get journey by type
export const getCapabilityJourney = (type: string) => {
  return allCapabilityJourneys[type];
};

// Helper function to get all available capability types
export const getAvailableCapabilityTypes = (): string[] => {
  return Object.keys(allCapabilityJourneys) as string[];
};
