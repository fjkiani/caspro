/**
 * Educational Capability Data
 * Transformed data for educational capability pages
 */

export { toxicityEducationalData } from './toxicity-educational';

// Direct imports for educational data (synchronous for now)
import { toxicityEducationalData } from './toxicity-educational';

// Map capability slugs to their educational data
const educationalCapabilityDataMap: Record<string, any> = {
  'prevent-toxicity': toxicityEducationalData,
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

