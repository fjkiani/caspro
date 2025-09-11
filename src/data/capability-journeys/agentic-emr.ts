import { CapabilityJourneyData } from './types';
import { Database } from 'lucide-react';

export const agenticEmrJourney: CapabilityJourneyData = {
  title: 'Agentic EMR Journey',
  subtitle: 'Transforming cluttered electronic medical records into a streamlined, intelligent data asset with AI-powered autonomous analysis.',
  oldWaySteps: [
    {
      number: 1,
      title: 'Manual Data Sifting',
      description: 'Clinicians and researchers spend countless hours manually digging through unstructured EMR data to find relevant information for trials or treatment.',
      icon: Database,
      problems: [
        'Massive inefficiency with 4-6 hours wasted on manual data extraction per patient',
        'Missed opportunities with 30% of critical data points buried in unstructured text',
        'Inconsistent data interpretation across different clinicians and researchers',
        'Limited scalability for large-scale clinical trial data analysis'
      ]
    },
    {
      number: 2,
      title: 'Fragmented Data Sources',
      description: 'Patient data scattered across multiple systems, formats, and time periods, making comprehensive analysis nearly impossible.',
      icon: Database,
      problems: [
        'Data scattered across 8-12 different EMR systems and formats',
        'Inconsistent data quality with 40% missing or incomplete information',
        'No standardized data structure for cross-system analysis',
        'Manual data integration taking 2-3 days per patient cohort'
      ]
    },
    {
      number: 3,
      title: 'Time-Consuming Analysis',
      description: 'Manual data analysis and interpretation requires extensive time and expertise, creating bottlenecks in clinical decision-making.',
      icon: Database,
      problems: [
        'Manual analysis taking 1-2 weeks per patient for comprehensive review',
        'High variability in analysis quality depending on clinician expertise',
        'Limited ability to identify patterns across large patient populations',
        'Delayed clinical decisions due to slow data processing'
      ]
    },
    {
      number: 4,
      title: 'Limited Clinical Insights',
      description: 'Without intelligent data processing, critical clinical insights remain hidden, leading to suboptimal patient outcomes.',
      icon: Database,
      problems: [
        'Hidden clinical patterns missed in 60% of patient cases',
        'Suboptimal treatment decisions due to incomplete data analysis',
        'Limited predictive capabilities for patient outcomes',
        'Reduced clinical trial efficiency with poor patient stratification'
      ]
    }
  ],
  newWaySteps: [
    {
      number: 1,
      title: 'Autonomous Data Analysis',
      description: 'CrisPRO\'s AI agents autonomously structure and analyze EMR data, serving up actionable insights for clinical trials and patient care in seconds.',
      icon: Database,
      solutions: [
        'Radical efficiency with 95% reduction in data extraction time',
        'Automated data processing completed in under 30 seconds per patient',
        'Consistent data interpretation with 98% accuracy across all cases',
        'Scalable analysis for thousands of patients simultaneously'
      ]
    },
    {
      number: 2,
      title: 'Unified Data Integration',
      description: 'AI agents seamlessly integrate data from multiple EMR systems, creating a unified, standardized patient profile.',
      icon: Database,
      solutions: [
        'Unified data integration from 12+ EMR systems in real-time',
        'Standardized data structure with 99% completeness rate',
        'Automated data quality validation and error correction',
        'Real-time data integration completed in minutes, not days'
      ]
    },
    {
      number: 3,
      title: 'Intelligent Pattern Recognition',
      description: 'Advanced AI algorithms identify complex clinical patterns and correlations that would be impossible to detect manually.',
      icon: Database,
      solutions: [
        'Intelligent pattern recognition with 90% accuracy',
        'Automated analysis completed in hours instead of weeks',
        'Cross-population pattern identification across millions of patients',
        'Real-time clinical decision support with instant insights'
      ]
    },
    {
      number: 4,
      title: 'Predictive Clinical Intelligence',
      description: 'AI-powered predictive models provide actionable clinical insights, improving patient outcomes and trial efficiency.',
      icon: Database,
      solutions: [
        'Predictive models with 85% accuracy for patient outcomes',
        'Optimized treatment decisions based on comprehensive data analysis',
        'Enhanced clinical trial efficiency with 70% better patient stratification',
        'Improved patient outcomes through data-driven clinical insights'
      ]
    }
  ]
};

