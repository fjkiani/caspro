'use client';

import React from 'react';
import { SolutionNarrativeSectionData } from '@/types/educational-capability';
import SolutionInteractiveBase from './SolutionInteractiveBase';

interface ClinicalTrialsSolutionInteractiveProps {
  data: SolutionNarrativeSectionData;
  className?: string;
}

export default function ClinicalTrialsSolutionInteractive({ data, className = '' }: ClinicalTrialsSolutionInteractiveProps) {
  return (
    <SolutionInteractiveBase
      data={data}
      className={className}
      gradientColors="from-purple-50 via-indigo-50 to-blue-50"
      accentColor="purple"
      closingStatement={{
        firstLine: "This is the first system that matches",
        secondLine: "your tumor's pathway burden to trial drug mechanisms—not keywords.",
        accentColor: "purple",
      }}
    />
  );
}
