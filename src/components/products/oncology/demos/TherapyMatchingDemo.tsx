'use client';

import React from 'react';
import TherapyRankingCard from '@/src2/components/site/blocks/TherapyRankingCard';

interface TherapyMatchingDemoProps {
  seedData?: any;
}

const TherapyMatchingDemo: React.FC<TherapyMatchingDemoProps> = ({ seedData }) => {
  const defaultRankedTherapies = seedData?.rankedTherapies || [
    {
      class: 'PARP Inhibitors',
      confidence: 0.94,
      rationale: 'BRCA1 mutation creates HR pathway deficiency, making PARP inhibitors highly effective through synthetic lethality mechanism.',
      examples: ['Olaparib', 'Niraparib', 'Rucaparib'],
      evidenceLevel: 'Strong'
    },
    {
      class: 'Platinum-Based Chemotherapy',
      confidence: 0.88,
      rationale: 'Platinum sensitivity correlated with HR deficiency. High response rates in BRCA1/2 mutated ovarian cancer.',
      examples: ['Carboplatin', 'Cisplatin'],
      evidenceLevel: 'Strong'
    },
    {
      class: 'Immunotherapy (PD-1/PD-L1)',
      confidence: 0.76,
      rationale: 'TMB-High status suggests potential benefit. Moderate confidence based on biomarker profile.',
      examples: ['Pembrolizumab', 'Atezolizumab'],
      evidenceLevel: 'Supported'
    }
  ];

  return (
    <div className="w-full">
      <TherapyRankingCard
        title="Therapy Matching"
        subtitle="96.6% match accuracy with mechanism-based ranking"
        rankedTherapies={defaultRankedTherapies}
      />
    </div>
  );
};

export default TherapyMatchingDemo;
