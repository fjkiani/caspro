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
      title: 'Structured Data Extraction',
      description: 'CrisPRO extracts and structures clinical data from unstructured EMR text, identifying key biomarkers and clinical findings.',
      icon: Database,
      solutions: [
        'Automated extraction of genetic variants, biomarkers, and clinical history',
        'Structured data format enables systematic analysis and querying',
        'Consistent data interpretation across different EMR systems and formats',
        'Scalable processing enables analysis of large patient cohorts'
      ]
    },
    {
      number: 2,
      title: 'Unified Patient Profiles',
      description: 'CrisPRO integrates data from multiple EMR systems, creating comprehensive patient profiles with standardized structure.',
      icon: Database,
      solutions: [
        'Data integration from multiple EMR systems into unified format',
        'Standardized structure enables consistent analysis across patients',
        'Data quality validation identifies missing or inconsistent information',
        'Comprehensive patient profiles support clinical decision-making'
      ]
    },
    {
      number: 3,
      title: 'Biological Pattern Analysis',
      description: 'CrisPRO identifies patterns in patient data by connecting clinical findings to biological pathways and mechanisms.',
      icon: Database,
      solutions: [
        'Biological analysis connects clinical data to pathway disruptions',
        'Pattern recognition identifies patients with similar biological profiles',
        'Cross-patient analysis reveals common biological themes',
        'Biological reasoning helps interpret clinical patterns'
      ]
    },
    {
      number: 4,
      title: 'Biology-Informed Clinical Intelligence',
      description: 'CrisPRO provides clinical insights by connecting patient data to biological mechanisms and therapeutic implications.',
      icon: Database,
      solutions: [
        'Biological analysis informs treatment recommendations based on patient profile',
        'Mechanism-based reasoning explains why certain treatments may be relevant',
        'Patient stratification based on biological pathway disruptions',
        'Clinical insights grounded in understanding of disease mechanisms'
      ]
    }
  ]
};

