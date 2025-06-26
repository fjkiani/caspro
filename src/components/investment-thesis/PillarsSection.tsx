'use client';

import React, { useState } from 'react';
import { Database, Brain, Zap, Users, BarChart3, Clock, Target, Shield } from 'lucide-react';

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-white mb-4 animate-fade-in">{title}</h3>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto animate-fade-in-delay" dangerouslySetInnerHTML={{ __html: subtitle }} />
    </div>
);

const PillarCard = ({ 
    pillar, 
    index,
    isExpanded,
    onToggle 
}: { 
    pillar: any, 
    index: number,
    isExpanded: boolean,
    onToggle: () => void
}) => (
    <div 
        className="p-6 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 cursor-pointer"
        onClick={onToggle}
    >
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
                <div className="flex items-center space-x-3 mb-4">
                    <pillar.icon className={`w-8 h-8 ${pillar.color}`} />
                    <h4 className={`text-xl font-bold ${pillar.color}`}>{pillar.title}</h4>
                </div>
                <p className="text-gray-300 mb-4">{pillar.description}</p>
                <p className="text-sm text-gray-500">
                    <b>Strategic Value:</b> {pillar.strategicValue}
                </p>
                
                {isExpanded && (
                    <div className="mt-4 p-4 bg-gray-900/50 rounded-lg animate-fade-in">
                        <h5 className="font-semibold text-white mb-2">Key Capabilities:</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                            {pillar.capabilities.map((capability: string, idx: number) => (
                                <li key={idx} className="flex items-center space-x-2">
                                    <div className={`w-1 h-1 rounded-full ${pillar.color.replace('text-', 'bg-')}`}></div>
                                    <span>{capability}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
                {pillar.metric}
            </div>
        </div>
    </div>
);

const pillarsData = [
    {
        title: "Pillar 1: Total Information Dominance",
        description: "We don't just connect to EMRs; we conquer them. Our AI agents ingest and synthesize all patient data—genomics, imaging, unstructured clinical notes—into a single, unified \"Digital Twin\" foundation.",
        strategicValue: "We make fragmented EMR data intelligent and actionable, unlocking insights buried in disconnected systems.",
        icon: Database,
        color: "text-blue-400",
        capabilities: [
            "Multi-modal data integration (genomics, imaging, clinical notes)",
            "Real-time EMR synchronization and analysis",
            "Automated data quality assessment and correction",
            "Natural language processing for unstructured data",
            "FHIR-compliant data standardization"
        ],
        metric: (
            <div className="text-center">
                <p className="text-sm font-bold text-white mb-2">Physicians spend up to</p>
                <p className="text-6xl font-black text-blue-500">49%</p>
                <p className="text-sm font-bold text-white mt-2">of their time on EHRs and desk work.</p>
                <p className="text-xs text-gray-500 mt-2">We turn that wasted time into strategic insight.</p>
            </div>
        )
    },
    {
        title: "Pillar 2: First-Principles Analysis",
        description: "The Zeta Oracle provides definitive answers, not correlations. We annihilate VUS with state-of-the-art accuracy and provide deep biological context for every prediction.",
        strategicValue: "We replace clinical ambiguity with diagnostic certainty, providing the confidence needed for decisive action.",
        icon: Brain,
        color: "text-green-400",
        capabilities: [
            "Physics-based protein folding predictions",
            "Molecular dynamics simulations for variant impact",
            "Pathway-level consequence modeling",
            "Multi-species conservation analysis",
            "Real-time literature integration and synthesis"
        ],
        metric: (
            <div className="text-center">
                <p className="text-sm font-bold text-white mb-3">From Uncertainty to Action</p>
                <div className="flex items-center justify-center space-x-4">
                    <div className="text-center">
                        <p className="text-5xl">❓</p>
                        <p className="text-yellow-400 mt-1 font-semibold">VUS Report</p>
                    </div>
                    <div className="text-4xl font-thin text-gray-600">→</div>
                    <div className="text-center">
                        <p className="text-5xl">✅</p>
                        <p className="text-green-400 mt-1 font-semibold">Definitive Answer</p>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">We close the actionability gap where others fail.</p>
            </div>
        )
    },
    {
        title: "Pillar 3: The Zeta Forge",
        description: "This is our in silico factory. We design, validate, and de-risk novel therapeutics—gRNAs, proteins, and more—compressing years of R&D into weeks.",
        strategicValue: "We slash R&D timelines and costs, dramatically increasing the number of \"shots on goal\" a research program can take.",
        icon: Zap,
        color: "text-purple-400",
        capabilities: [
            "Automated gRNA design and optimization",
            "Protein engineering and stability prediction",
            "Drug-target interaction modeling",
            "Off-target effect prediction and mitigation",
            "Synthetic biology pathway design"
        ],
        metric: (
            <div>
                <h5 className="text-white font-semibold mb-3 text-center">R&D Timeline Compression</h5>
                <div className="space-y-3">
                    <div>
                        <p className="text-xs text-red-400 font-bold">TRADITIONAL</p>
                        <div className="w-full bg-gray-700 rounded-full h-4">
                            <div className="bg-red-600 h-4 rounded-full animate-pulse" style={{width: '100%'}}></div>
                        </div>
                        <p className="text-xs text-gray-500 text-right">3-6 Years</p>
                    </div>
                    <div>
                        <p className="text-xs text-purple-400 font-bold">CRISPRO.AI</p>
                        <div className="w-full bg-gray-700 rounded-full h-4">
                            <div className="bg-purple-600 h-4 rounded-full animate-pulse" style={{width: '10%'}}></div>
                        </div>
                        <p className="text-xs text-gray-500 text-right">Weeks</p>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "Pillar 4: Predictive Digital Twins",
        description: "We create dynamic simulations of a patient's disease to model tumor evolution, predict therapy response, and identify resistance pathways before they emerge.",
        strategicValue: "Allows partners to \"fail faster and cheaper\" in silico, identifying non-viable drug candidates early and optimizing promising ones.",
        icon: Users,
        color: "text-cyan-400",
        capabilities: [
            "Patient-specific tumor evolution modeling",
            "Drug resistance pathway prediction",
            "Combination therapy optimization",
            "Biomarker identification and validation",
            "Clinical trial endpoint prediction"
        ],
        metric: (
            <div className="text-center">
                <p className="text-sm font-bold text-white mb-3">In Silico Clinical Trial</p>
                <div className="flex items-center justify-center space-x-2">
                    <div className="text-center">
                        <p className="text-4xl">👤</p>
                        <p className="text-gray-400 text-xs mt-1">Patient Twin</p>
                    </div>
                    <div className="text-3xl font-thin text-gray-600">→</div>
                    <div className="space-y-2">
                        <div className="bg-green-800/50 text-green-300 text-xs p-1 rounded animate-pulse">Therapy A → Response</div>
                        <div className="bg-red-800/50 text-red-300 text-xs p-1 rounded animate-pulse">Therapy B → Resistance</div>
                        <div className="bg-yellow-800/50 text-yellow-300 text-xs p-1 rounded animate-pulse">Therapy C → Toxicity</div>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "Pillar 5: AI-Orchestrated Logistics",
        description: "Our intelligence layer automates and optimizes clinical operations, matching patients to trials based on biological intent, not just keywords.",
        strategicValue: "We solve a multi-billion dollar bottleneck in drug development by finding more eligible patients for trials, faster. Fewer than 1 in 20 cancer patients enroll in trials.",
        icon: BarChart3,
        color: "text-orange-400",
        capabilities: [
            "Intelligent patient-trial matching algorithms",
            "Automated eligibility screening and assessment",
            "Predictive enrollment modeling",
            "Site selection optimization",
            "Real-time trial performance monitoring"
        ],
        metric: (
            <div className="text-center">
                <h5 className="text-white font-semibold mb-3">Patient Recruitment Funnel</h5>
                <div className="flex items-end justify-around space-x-4">
                    <div className="text-center">
                        <div className="h-24 w-12 bg-red-600/80 rounded-t-md mx-auto animate-bounce"></div>
                        <p className="text-xs font-bold text-red-400 mt-1">Old Way</p>
                    </div>
                    <div className="text-center">
                        <div className="h-32 w-24 bg-orange-600/80 rounded-t-md mx-auto animate-bounce"></div>
                        <p className="text-xs font-bold text-orange-400 mt-1">CrisPRO.ai</p>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">We find more patients by understanding biology.</p>
            </div>
        )
    }
];

export const PillarsSection = () => {
    const [expandedPillars, setExpandedPillars] = useState<Set<number>>(new Set());
    const [showAll, setShowAll] = useState(false);

    const togglePillar = (index: number) => {
        const newExpanded = new Set(expandedPillars);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedPillars(newExpanded);
    };

    const toggleAll = () => {
        if (showAll) {
            setExpandedPillars(new Set());
        } else {
            setExpandedPillars(new Set(pillarsData.map((_, index) => index)));
        }
        setShowAll(!showAll);
    };

    return (
        <section className="mb-20">
            <SectionHeader 
                title="3.0 Our Solution: The Five Pillars of Domination"
                subtitle="Our <strong>CrisPRO Oncology Co-Pilot</strong> is not a single tool, but a holistic ecosystem built on five interconnected strategic pillars. This is how we win."
            />
            
            <div className="text-center mb-8">
                <button
                    onClick={toggleAll}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                    {showAll ? 'Collapse All Details' : 'Expand All Capabilities'}
                </button>
            </div>
            
            <div className="space-y-12">
                {pillarsData.map((pillar, index) => (
                    <PillarCard 
                        key={index}
                        pillar={pillar} 
                        index={index}
                        isExpanded={expandedPillars.has(index)}
                        onToggle={() => togglePillar(index)}
                    />
                ))}
            </div>
            
            <div className="mt-12 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-center text-gray-300">
                    <span className="font-bold text-blue-400">Synergistic Power:</span> These five pillars work in concert to create an unprecedented competitive advantage. While competitors focus on single-point solutions, we provide end-to-end dominance across the entire oncology value chain.
                </p>
            </div>
        </section>
    );
}; 