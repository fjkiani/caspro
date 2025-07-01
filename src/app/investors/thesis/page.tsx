import React from 'react';
import { OpportunitySection } from '@/components/investment-thesis/OpportunitySection';
import { PatientJourneySection } from '@/components/investment-thesis/PatientJourneySection';
import PillarsSection from '@/components/investment-thesis/PillarsSection';
import GtmSection from '@/components/investment-thesis/GtmSection';
import { DesciSection } from '@/components/investment-thesis/DesciSection';
import { MetastasisFrameworkSection } from '@/components/investment-thesis/MetastasisFrameworkSection';
import { BusinessModelSection } from '@/components/investment-thesis/BusinessModelSection';
import { TeamSection } from '@/components/investment-thesis/TeamSection';
import CtaSection from '@/components/investment-thesis/CtaSection';
import { InvestmentThesisHeader } from '@/components/investment-thesis/InvestmentThesisHeader';

const SectionDivider = () => <div className="my-20 border-t border-gray-700" />;

const InvestmentThesisPage = () => {
    return (
        <div className="min-h-screen bg-gray-950">
            <InvestmentThesisHeader />
            <main className="max-w-6xl mx-auto px-4 py-12">
                <OpportunitySection />
                <PatientJourneySection />
                <PillarsSection />
                <GtmSection />
                <DesciSection />
                <MetastasisFrameworkSection />
                <BusinessModelSection />
                <TeamSection />
                <CtaSection />
            </main>
        </div>
    );
};

export default InvestmentThesisPage; 