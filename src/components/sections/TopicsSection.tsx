'use client';

import React from 'react';
// import InvestmentThesisHeader from '@/components/investment-thesis/InvestmentThesisHeader';
import IntroductionSection from '@/components/investment-thesis/IntroductionSection';
import ActionabilityGapSection from '@/components/investment-thesis/ActionabilityGapSection';
import UnfairAdvantageSection from '@/components/investment-thesis/UnfairAdvantageSection';
import PillarsSection from '@/components/investment-thesis/PillarsSection';
import ClinicalPlaybookSection from '@/components/investment-thesis/ClinicalPlaybookSection';
import CaseStudySection from '@/components/investment-thesis/CaseStudySection';
import GtmSection from '@/components/investment-thesis/GtmSection';
// import DesciSection from '@/components/investment-thesis/DesciSection';
import CtaSection from '@/components/investment-thesis/CtaSection';
import SectionDivider from '@/components/shared/SectionDivider';

const TopicsSection: React.FC = () => {
  return (
    <section className="bg-gray-950 text-gray-300 py-16 px-4 sm:px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        
        {/* <InvestmentThesisHeader /> */}
        
        <IntroductionSection />
        <SectionDivider />
        
        <ActionabilityGapSection />
        <SectionDivider />
        
        <UnfairAdvantageSection />
        <SectionDivider />
        
        <PillarsSection />
        <SectionDivider />
        
        <ClinicalPlaybookSection />
        <SectionDivider />
        
        <CaseStudySection />
        <SectionDivider />
        
        <GtmSection />
        <SectionDivider />
        
        {/* <DesciSection /> */}
        <SectionDivider />
        
        <CtaSection />

      </div>
    </section>
  );
};

export default TopicsSection; 