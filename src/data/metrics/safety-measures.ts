import { SafetyMeasure } from './types';

// Safety and Governance
export const safetyMeasures: SafetyMeasure[] = [
  {
    title: "Viral Protein Exclusion",
    description: "Intentionally reduced capabilities on human viral proteins",
    category: "Safety"
  },
  {
    title: "Audit Trails",
    description: "Complete provenance with run IDs and citations",
    category: "Transparency"
  },
  {
    title: "Viral Prompt Guards",
    description: "Safety mechanisms for sequence screening",
    category: "Safety"
  },
  {
    title: "Research-Use-Only",
    description: "All outputs clearly labeled RUO",
    category: "Compliance"
  }
];

// Helper functions for safety measures
export const getSafetyMeasuresByCategory = (category: SafetyMeasure['category']) => 
  safetyMeasures.filter(measure => measure.category === category);

export const getSafetyMeasures = () => getSafetyMeasuresByCategory('Safety');
export const getTransparencyMeasures = () => getSafetyMeasuresByCategory('Transparency');
export const getComplianceMeasures = () => getSafetyMeasuresByCategory('Compliance');

