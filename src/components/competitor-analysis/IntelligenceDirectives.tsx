import React from 'react';

const directives = [
    {
        title: 'Financial/Strategic Intel',
        prompt: '"Latest investor presentations and quarterly earnings call transcripts for [TARGET_COMPANY_TICKER]. Focus on R&D spending, user growth metrics, and forward-looking statements on AI and data strategy."'
    },
    {
        title: 'Technical/Product Intel',
        prompt: '"Technical whitepapers and recent conference abstracts detailing the bioinformatics pipeline and variant classification methodology for [TARGET_COMPANY]\'s [PRODUCT_NAME] test. Analyze for mentions of VUS resolution strategies and non-coding analysis limitations."'
    },
    {
        title: 'Market/Clinical Intel',
        prompt: '"Recent case studies and physician testimonials for [TARGET_COMPANY]\'s oncology platform. Scrape for specific examples of clinical utility and any documented complaints about turnaround time, report clarity, or actionability gaps."'
    }
];

const PromptCard = ({ title, prompt }: { title: string, prompt: string }) => (
    <div className="p-6 rounded-lg bg-gray-900 border border-gray-700 transition-all duration-300 ease-in-out hover:transform hover:-translate-y-1 hover:shadow-lg">
        <h3 className="font-bold text-lg text-blue-400 mb-2">{title}</h3>
        <p className="text-gray-300">{prompt}</p>
    </div>
);

export const IntelligenceDirectives = () => (
    <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-4">Intelligence Gathering Directives</h2>
        <p className="text-gray-400 mb-6">Deploy these prompts to scrape further intelligence on targets.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {directives.map(directive => (
                <PromptCard key={directive.title} {...directive} />
            ))}
        </div>
    </div>
); 