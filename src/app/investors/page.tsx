'use client';

import { investorCardsData } from './data';
import InvestorCard from './InvestorCard';
import { Briefcase } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

const InvestorsPage = () => {
    return (
        <div className="bg-slate-900 text-white">
            <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 md:py-28">

                <SectionHeader 
                    icon={Briefcase}
                    title="Investor Relations"
                    subtitle="Strategic Intelligence"
                    description="This is the central hub for our investor partners. Here you will find our complete investment thesis and a detailed analysis of the competitive landscape." 
                />

                <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
                    {investorCardsData.map((card) => (
                        <InvestorCard
                            key={card.title}
                            title={card.title}
                            description={card.description}
                            href={card.href}
                            iconName={card.iconName}
                            status={card.status}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InvestorsPage; 