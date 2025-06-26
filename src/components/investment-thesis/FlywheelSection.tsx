import React from 'react';

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">{subtitle}</p>
    </div>
);

const flywheelSteps = [
    { number: 1, title: "TARGET ACQUISITION (Find)", description: "Our platform's agents analyze genomic data from virtual or real patient cohorts to identify and prioritize the most vulnerable therapeutic targets based on predicted functional impact and gene essentiality.", style: { transform: 'translate(0, -90px)' } },
    { number: 2, title: "WEAPON SYSTEMS DESIGN (Design)", description: "The Zeta Forge generates an arsenal of therapeutic payloads (gRNAs, repair templates, proteins) to neutralize the target, complete with structural modeling and optimization.", style: { transform: 'translate(90px, 0)' } },
    { number: 3, title: "IN SILICO TRIALS (Validate)", description: "The Pre-clinical Simulation Engine runs a battery of digital safety and viability simulations, including genome-wide off-target analysis and immunogenicity prediction.", style: { transform: 'translate(0, 90px)' } },
    { number: 4, title: "BATTLEFIELD SIMULATION (Simulate & Hypothesize)", description: "The platform simulates the biological impact of the final candidate, models potential resistance pathways, and generates data-driven hypotheses for the next R&D cycle, creating a continuous loop of compounding intelligence.", style: { transform: 'translate(-90px, 0)' } },
];

const FlywheelStep = ({ title, style }: { title: string, style: React.CSSProperties }) => (
    <div className="absolute p-4 rounded-lg bg-gray-800 border border-gray-700 transition-transform duration-200 ease-in-out hover:scale-105 w-36" style={style}>
        <p className="font-bold text-white text-center text-sm">{title}</p>
    </div>
);

export const FlywheelSection = () => (
    <section className="mb-20">
        <SectionHeader
            title="3.0 Our Unfair Advantage: The In Silico R&D Flywheel"
            subtitle="Our platform's superiority is not just in its individual tools, but in how they combine to form a powerful, end-to-end R&D cycle that no competitor can replicate. This is our 'In Silico Flywheel.'"
        />
        <div className="relative flex justify-center items-center h-80 my-16">
            <svg className="absolute w-full h-full text-gray-700" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
            {flywheelSteps.map(step => <FlywheelStep key={step.number} title={step.title} style={step.style} />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {flywheelSteps.map(step => (
                <div key={step.title} className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
                    <h4 className="font-bold text-blue-400 mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-400">{step.description}</p>
                </div>
            ))}
        </div>
    </section>
); 