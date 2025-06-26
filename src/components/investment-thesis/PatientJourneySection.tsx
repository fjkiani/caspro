'use client';

import React, { useState } from 'react';
import { Clock, AlertTriangle, Target, CheckCircle, Shield, Zap, ArrowRight, Users, Brain } from 'lucide-react';

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-white mb-4 animate-fade-in">{title}</h3>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto animate-fade-in-delay">{subtitle}</p>
    </div>
);

const JourneyStep = ({ 
    number, 
    title, 
    description, 
    icon: Icon, 
    isLast = false,
    variant = 'old',
    problems = [],
    solutions = []
}: { 
    number: number, 
    title: string, 
    description: string, 
    icon: any,
    isLast?: boolean,
    variant?: 'old' | 'new',
    problems?: string[],
    solutions?: string[]
}) => (
    <div className={`relative ${!isLast ? 'pb-8' : ''}`}>
        {!isLast && (
            <div className={`absolute left-6 top-12 w-0.5 h-full ${
                variant === 'old' ? 'bg-red-500/30' : 'bg-green-500/30'
            }`}></div>
        )}
        
        <div className="flex items-start space-x-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                variant === 'old' 
                    ? 'bg-red-500/20 border-red-500/50' 
                    : 'bg-green-500/20 border-green-500/50'
            }`}>
                <Icon className={`w-6 h-6 ${
                    variant === 'old' ? 'text-red-400' : 'text-green-400'
                }`} />
            </div>
            
            <div className="flex-grow">
                <div className="flex items-center space-x-3 mb-2">
                    <span className={`text-sm font-bold px-2 py-1 rounded ${
                        variant === 'old' 
                            ? 'bg-red-500/20 text-red-400' 
                            : 'bg-green-500/20 text-green-400'
                    }`}>
                        Step {number}
                    </span>
                    <h4 className="text-lg font-bold text-white">{title}</h4>
                </div>
                
                <p className="text-gray-300 mb-3">{description}</p>
                
                {problems.length > 0 && (
                    <div className="mb-3">
                        <h5 className="text-sm font-semibold text-red-400 mb-1">Key Problems:</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                            {problems.map((problem, idx) => (
                                <li key={idx} className="flex items-center space-x-2">
                                    <AlertTriangle className="w-3 h-3 text-red-400" />
                                    <span>{problem}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
                {solutions.length > 0 && (
                    <div>
                        <h5 className="text-sm font-semibold text-green-400 mb-1">CrisPRO Solutions:</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                            {solutions.map((solution, idx) => (
                                <li key={idx} className="flex items-center space-x-2">
                                    <CheckCircle className="w-3 h-3 text-green-400" />
                                    <span>{solution}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    </div>
);

const oldJourneySteps = [
    {
        number: 1,
        title: "Genetic Testing",
        description: "Patient receives genetic test results filled with Variants of Unknown Significance (VUS).",
        icon: Brain,
        problems: [
            "40-60% of results are VUS - clinically unusable",
            "Months of waiting for unclear results",
            "No actionable treatment guidance"
        ]
    },
    {
        number: 2,
        title: "Clinical Confusion",
        description: "Oncologist struggles to interpret ambiguous genetic data and make treatment decisions.",
        icon: AlertTriangle,
        problems: [
            "Physicians spend 49% of time on administrative tasks",
            "Limited genomic expertise in most practices",
            "Treatment decisions based on incomplete information"
        ]
    },
    {
        number: 3,
        title: "Trial & Error Treatment",
        description: "Patient undergoes standard-of-care treatments that may not match their genetic profile.",
        icon: Clock,
        problems: [
            "Average 3-4 treatment attempts before finding effective therapy",
            "Precious time lost during cancer progression",
            "Unnecessary toxicity from ineffective treatments"
        ]
    },
    {
        number: 4,
        title: "Metastatic Progression",
        description: "Without precision targeting, cancer metastasizes and becomes increasingly difficult to treat.",
        icon: Target,
        problems: [
            "90% of cancer deaths are from metastasis",
            "Limited treatment options once cancer spreads",
            "Exponentially higher treatment costs"
        ]
    }
];

const newJourneySteps = [
    {
        number: 1,
        title: "Instant VUS Resolution",
        description: "CrisPRO's Zeta Oracle immediately converts VUS into definitive, actionable insights.",
        icon: Zap,
        solutions: [
            "Physics-based analysis provides definitive answers",
            "Real-time results within minutes",
            "Clear therapeutic recommendations"
        ]
    },
    {
        number: 2,
        title: "Metastatic Risk Assessment",
        description: "Our 8-step framework predicts metastatic potential and identifies intervention points.",
        icon: Shield,
        solutions: [
            "Comprehensive metastatic pathway analysis",
            "Stage-by-stage risk breakdown",
            "Prioritized intervention strategies"
        ]
    },
    {
        number: 3,
        title: "Precision Therapeutics",
        description: "Zeta Forge designs personalized CRISPR interventions targeting patient-specific vulnerabilities.",
        icon: Target,
        solutions: [
            "Custom-designed therapeutic strategies",
            "Pre-validated in digital twins",
            "Optimal timing and dosing protocols"
        ]
    },
    {
        number: 4,
        title: "Proactive Prevention",
        description: "Treatment begins before metastasis occurs, dramatically improving outcomes.",
        icon: CheckCircle,
        solutions: [
            "Prevention-focused rather than reactive",
            "Continuous monitoring and adaptation",
            "Significantly improved survival rates"
        ]
    }
];

export const PatientJourneySection = () => {
    const [activeView, setActiveView] = useState<'comparison' | 'old' | 'new'>('comparison');

    return (
        <section className="mb-20">
            <SectionHeader 
                title="2.0 The Patient's Broken Journey"
                subtitle="Today's cancer care is reactive, fragmented, and often too late. We're building a proactive, integrated system that prevents metastasis before it starts."
            />
            
            <div className="flex justify-center mb-8">
                <div className="bg-gray-800/50 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveView('comparison')}
                        className={`px-4 py-2 rounded transition-colors duration-200 ${
                            activeView === 'comparison' 
                                ? 'bg-blue-600 text-white' 
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Side-by-Side
                    </button>
                    <button
                        onClick={() => setActiveView('old')}
                        className={`px-4 py-2 rounded transition-colors duration-200 ${
                            activeView === 'old' 
                                ? 'bg-red-600 text-white' 
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Old Way
                    </button>
                    <button
                        onClick={() => setActiveView('new')}
                        className={`px-4 py-2 rounded transition-colors duration-200 ${
                            activeView === 'new' 
                                ? 'bg-green-600 text-white' 
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        CrisPRO Way
                    </button>
                </div>
            </div>
            
            {activeView === 'comparison' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="text-center mb-8">
                            <h4 className="text-xl font-bold text-red-400 mb-2">The Old Way: Reactive & Fragmented</h4>
                            <p className="text-gray-400">Treatment after the damage is done</p>
                        </div>
                        {oldJourneySteps.map((step, index) => (
                            <JourneyStep 
                                key={index}
                                {...step}
                                variant="old"
                                isLast={index === oldJourneySteps.length - 1}
                            />
                        ))}
                    </div>
                    
                    <div className="space-y-8">
                        <div className="text-center mb-8">
                            <h4 className="text-xl font-bold text-green-400 mb-2">The CrisPRO Way: Proactive & Integrated</h4>
                            <p className="text-gray-400">Prevention before progression</p>
                        </div>
                        {newJourneySteps.map((step, index) => (
                            <JourneyStep 
                                key={index}
                                {...step}
                                variant="new"
                                isLast={index === newJourneySteps.length - 1}
                            />
                        ))}
                    </div>
                </div>
            )}
            
            {activeView === 'old' && (
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <h4 className="text-xl font-bold text-red-400 mb-2">The Old Way: Reactive & Fragmented</h4>
                        <p className="text-gray-400">Why current cancer care fails patients</p>
                    </div>
                    <div className="space-y-8">
                        {oldJourneySteps.map((step, index) => (
                            <JourneyStep 
                                key={index}
                                {...step}
                                variant="old"
                                isLast={index === oldJourneySteps.length - 1}
                            />
                        ))}
                    </div>
                </div>
            )}
            
            {activeView === 'new' && (
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <h4 className="text-xl font-bold text-green-400 mb-2">The CrisPRO Way: Proactive & Integrated</h4>
                        <p className="text-gray-400">How we transform cancer care</p>
                    </div>
                    <div className="space-y-8">
                        {newJourneySteps.map((step, index) => (
                            <JourneyStep 
                                key={index}
                                {...step}
                                variant="new"
                                isLast={index === newJourneySteps.length - 1}
                            />
                        ))}
                    </div>
                </div>
            )}
            
            <div className="mt-12 p-6 bg-gradient-to-r from-red-500/10 via-yellow-500/10 to-green-500/10 border border-blue-500/30 rounded-lg">
                <div className="text-center">
                    <h4 className="text-xl font-bold text-white mb-4">The Transformation</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-red-400 mb-2">90%</div>
                            <p className="text-sm text-gray-400">Cancer deaths from metastasis</p>
                        </div>
                        <div className="flex items-center justify-center">
                            <ArrowRight className="w-8 h-8 text-blue-400" />
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-400 mb-2">Prevention</div>
                            <p className="text-sm text-gray-400">Before metastasis occurs</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}; 