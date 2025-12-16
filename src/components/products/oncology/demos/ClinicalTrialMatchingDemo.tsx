'use client';

import React from 'react';
import ClinicalTrialsMatcher from '@/src2/components/site/blocks/ClinicalTrialsMatcher';

interface ClinicalTrialMatchingDemoProps {
  seedData?: any;
}

const ClinicalTrialMatchingDemo: React.FC<ClinicalTrialMatchingDemoProps> = ({ seedData }) => {
  const defaultOutput = seedData?.output || {
    likely: [
      {
        title: 'NCT05678901: PARP + ATR in DDR Deficient Ovarian Cancer',
        rationale: '94% mechanism fit - BRCA1 mutation creates HR deficiency, making PARP + ATR combination highly effective. Direct synthetic lethality targeting.'
      },
      {
        title: 'NCT04729387: Olaparib + Cediranib in Advanced Ovarian Cancer',
        rationale: '91% mechanism fit - PARP inhibitor with anti-angiogenic agent. Strong evidence for BRCA1/2 mutated patients.'
      }
    ],
    potential: [
      {
        title: 'NCT03824704: Maintenance Olaparib After Platinum',
        rationale: '75% mechanism fit - Maintenance therapy option if patient responds to initial platinum. Good fit but lower priority.'
      }
    ],
    unlikely: []
  };

  return (
    <div className="w-full">
      <ClinicalTrialsMatcher
        title="Clinical Trial Matching"
        subtitle="96.6% match accuracy with transparent eligibility reasoning"
        workflow={[
          'Parse variant profile',
          'Match pathway signatures',
          'Rank trial relevance',
          'Generate eligibility flags'
        ]}
        output={defaultOutput}
      />
    </div>
  );
};

export default ClinicalTrialMatchingDemo;



