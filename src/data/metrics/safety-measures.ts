import { SafetyMeasure } from './types';

// Safety and Governance
export const safetyMeasures: SafetyMeasure[] = [
  {
    title: "Viral Protein Exclusion",
    description: "Intentionally reduced capabilities on human viral proteins",
    category: "safety"
  },
  {
    title: "Audit Trails",
    description: "Complete provenance with run IDs and citations",
    category: "governance"
  },
  {
    title: "Viral Prompt Guards",
    description: "Safety mechanisms for sequence screening",
    category: "safety"
  },
  {
    title: "Research-Use-Only",
    description: "All outputs clearly labeled RUO",
    category: "governance"
  }
];

// Helper functions for safety measures
export const getSafetyMeasuresByCategory = (category: SafetyMeasure['category']) => 
  safetyMeasures.filter(measure => measure.category === category);

export const getSafetyMeasures = () => getSafetyMeasuresByCategory('safety');
export const getTransparencyMeasures = () => getSafetyMeasuresByCategory('governance');
export const getComplianceMeasures = () => getSafetyMeasuresByCategory('governance');

