import React from 'react';
import ComparisonSection from '@/components/universal/organisms/ComparisonSection';
import type { ComparisonData } from '@/types/universal-content';
import { csiCompetitorData, crisproAdvantages } from '@/data/competitors/csi-competitor-data';

const advantages = [
    { name: "Predictive Power", description: "We identify metastatic potential before it's clinically detectable, shifting the paradigm from reaction to prevention." },
    { name: "Precision Targeting", description: "Our 8-step framework allows us to pinpoint and target the most vulnerable steps in each patient's unique metastatic pathway." },
    { name: "Proactive Intervention", description: "We don't just identify risk; we generate pre-designed, optimized CRISPR interventions to proactively stop metastasis." },
    { name: "Personalized Strategy", description: "Every Metastatic Potential Report is a personalized therapeutic strategy, tailored to an individual tumor's genetic profile." }
];

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-lg text-gray-400 max-w-4xl mx-auto">{subtitle}</p>
    </div>
);

export const CompetitionSection = () => {
  // Build comparison data using same pattern as CSIMoatSection
  const comparisonData: ComparisonData = {
    title: 'Competitive Landscape',
    subtitle: 'Foundation Medicine/Guardant vs CrisPRO',
    layout: 'side_by_side',
    items: [
      {
        id: 'competitors',
        title: 'Foundation Medicine / Guardant',
        description: csiCompetitorData['Foundation Medicine'].assessment,
        color: 'red',
        features: csiCompetitorData['Foundation Medicine'].weaknesses
      },
      {
        id: 'crispro',
        title: 'CrisPRO',
        description: 'Continuous chemosensitivity re-estimation across treatment lines',
        color: 'green',
        features: crisproAdvantages
      }
    ]
  };

  return (
    <section className="mb-20">
        <SectionHeader
            title="3.0 Competitive Advantage: A New Category of Clinical Tool"
            subtitle="Our platform is not an incremental improvement on existing tools; it is a first-of-its-kind metastasis prevention system. This creates a powerful and defensible moat."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {advantages.map((advantage) => (
                <div key={advantage.name} className="p-6 bg-gray-800 border border-gray-700 rounded-lg">
                    <h4 className="font-bold text-blue-400 text-lg mb-2">{advantage.name}</h4>
                    <p className="text-gray-300">{advantage.description}</p>
                </div>
            ))}
        </div>
        <div className="mb-8 bg-gray-900/50 rounded-lg p-6">
            <ComparisonSection data={comparisonData} />
        </div>
        <div className="mt-8 p-6 bg-gray-900/50 border-2 border-blue-500/30 rounded-lg text-center">
            <p className="text-lg text-gray-200">
                While competitors focus on diagnostics or siloed aspects of R&D, we are the only platform that bridges genomic analysis directly to actionable, pre-clinical therapeutic design for metastasis prevention.
            </p>
        </div>
    </section>
  );
}; 