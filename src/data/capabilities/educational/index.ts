/**
 * Educational Capability Data
 * Transformed data for educational capability pages
 */

export { toxicityEducationalData } from './toxicity-educational';
export { pathwayEducationalData } from './pathway-educational';
export { therapyFitEducationalData } from './therapy-fit-educational';
export { resistancePredictionEducationalData } from './resistance-prediction-educational';

// Direct imports for educational data (synchronous for now)
import { toxicityEducationalData } from './toxicity-educational';
import { pathwayEducationalData } from './pathway-educational';
import { therapyFitEducationalData } from './therapy-fit-educational';
import { resistancePredictionEducationalData } from './resistance-prediction-educational';

// Map capability slugs to their educational data
// Note: pathway co-pilot is under 'target-validation' capability in R&D product
// Note: therapy-fit co-pilot is under 'match-patients-to-therapies' capability in Oncology product
const educationalCapabilityDataMap: Record<string, any> = {
  'prevent-toxicity': toxicityEducationalData,
  'target-validation': pathwayEducationalData, // Pathway co-pilot is under target-validation
  'match-patients-to-therapies': therapyFitEducationalData, // Therapy-fit co-pilot is under match-patients-to-therapies
  'predict-resistance': resistancePredictionEducationalData, // CSI Level 3: Resistance Prediction
  // Add more capabilities as they're transformed
};

/**
 * Get educational data for a capability
 */
export async function getEducationalCapabilityData(capabilitySlug: string): Promise<any | null> {
  const data = educationalCapabilityDataMap[capabilitySlug];
  if (!data) {
    return null;
  }
  
  return data;
}

