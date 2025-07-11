'use client';

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
import InvestmentThesisLayout from '@/components/investment-thesis/InvestmentThesisLayout';

const SectionDivider = () => <div className="my-20 border-t border-gray-700" />;

const InvestmentThesisPage = () => {
    return (
        <InvestmentThesisLayout>
            <div id="header">
                <InvestmentThesisHeader />
            </div>
            
            <main className="max-w-6xl mx-auto px-4 py-12">
                <section id="opportunity">
                    <OpportunitySection />
                    <SectionDivider />
                </section>
                
                <section id="patient-journey">
                    <PatientJourneySection />
                    <SectionDivider />
                </section>
                
                <section id="pillars">
                    <PillarsSection />
                    <SectionDivider />
                </section>
                
                <section id="gtm">
                    <GtmSection />
                    <SectionDivider />
                </section>
                
                <section id="desci">
                    <DesciSection />
                    <SectionDivider />
                </section>
                
                <section id="metastasis">
                    <MetastasisFrameworkSection />
                    <SectionDivider />
                </section>
                
                <section id="business">
                    <BusinessModelSection />
                    <SectionDivider />
                </section>
                
                <section id="team">
                    <TeamSection />
                    <SectionDivider />
                </section>
                
                <section id="cta">
                    <CtaSection />
                </section>
            </main>
        </InvestmentThesisLayout>
    );
};

export default InvestmentThesisPage; 