// Export types
export type { JourneyStep, CapabilityJourneyData, CapabilityType } from './types';

// Export individual journey data
export { chemotherapyJourney } from './chemotherapy';

// Export all journeys as a collection
import { chemotherapyJourney } from './chemotherapy';
import { CapabilityType } from './types';

export const capabilityJourneys: Record<CapabilityType, CapabilityJourneyData> = {
  chemotherapy: chemotherapyJourney
};

// Helper function to get journey by type
export const getCapabilityJourney = (type: CapabilityType) => {
  return capabilityJourneys[type];
};

// Helper function to get all available capability types
export const getAvailableCapabilityTypes = (): CapabilityType[] => {
  return Object.keys(capabilityJourneys) as CapabilityType[];
};
