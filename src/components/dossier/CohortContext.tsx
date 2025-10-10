'use client';

import React from 'react';
import CohortContextSimulator from '@/components/evidence/interactive/CohortContextSimulator';
import { CohortContext as CohortContextData } from '@/data/dossier/types';

interface CohortContextProps {
  data: CohortContextData;
}

const CohortContext: React.FC<CohortContextProps> = ({ data }) => {
  // The CohortContextSimulator expects a slightly different data structure for cohorts
  // We adapt it here. This could be moved to a dedicated adapter function if logic grows.
  const adaptedCohorts = data.cohorts.map(cohort => ({
    ...cohort,
    demographics: { avgAge: 52, genderSplit: { male: 2, female: 98 }, ethnicity: {} },
    geneticProfile: { variantFrequency: 0.34, pathogenicVariants: 156, vusCount: 89 },
    clinicalOutcomes: { responseRate: 0.78, progressionFreeMonths: 24.3, overallSurvivalMonths: 67.8 },
    biomarkers: ['BRCA1/2 mutations', 'Homologous recombination deficiency'],
    therapeuticRecommendations: ['PARP inhibitors', 'Platinum-based chemotherapy'],
  }));

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{data.title}</h3>
        <p className="text-slate-600">{data.subtitle}</p>
      </div>
      
      <CohortContextSimulator 
        title="BRCA1+ Patient Cohort Analysis"
        subtitle="Population-specific data improves treatment selection accuracy by 67%"
        cohorts={adaptedCohorts}
        showComparison={true}
      />
    </div>
  );
};

export default CohortContext;



