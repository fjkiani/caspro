import React from 'react';

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-lg text-gray-400 max-w-4xl mx-auto">{subtitle}</p>
    </div>
);

export const CtaSection = () => (
    <section className="text-center">
        <SectionHeader
            title="7.0 The Call to Action: Invest in Prevention"
            subtitle="We have the team, the technology, and the strategy to fundamentally change the story of cancer. We are moving beyond treatment to a future of proactive, personalized prevention. This is an opportunity to invest in a new category of medicine. Join us."
        />
        <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-500 transition-colors duration-300 shadow-lg hover:shadow-blue-500/50">
            Contact Us to Invest
        </button>
    </section>
); 