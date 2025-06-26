import React from 'react';
import { Header } from '@/components/competitor-analysis/Header';
import { StrategicMatrix } from '@/components/competitor-analysis/StrategicMatrix';
import { CompetitorTabs } from '@/components/competitor-analysis/CompetitorTabs';
import { IntelligenceDirectives } from '@/components/competitor-analysis/IntelligenceDirectives';

const CompetitorAnalysisPage = () => {
    return (
        <div className="bg-gray-800 text-gray-200 font-sans p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Header />
                <StrategicMatrix />
                <CompetitorTabs />
                {/* <IntelligenceDirectives /> */}
            </div>
        </div>
    );
};

export default CompetitorAnalysisPage; 