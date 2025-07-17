'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Target, Activity, Shield, Zap } from 'lucide-react';

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-white mb-4 animate-fade-in">{title}</h3>
        <p className="text-lg text-gray-400 max-w-4xl mx-auto animate-fade-in-delay">{subtitle}</p>
    </div>
);

const frameworkSteps = [
    { 
        number: 1, 
        name: "Primary Tumor Growth", 
        strategy: "Driver mutation identification & essentiality scoring",
        icon: Target,
        color: "text-red-400",
        bgColor: "bg-red-500/10 hover:bg-red-500/20",
        borderColor: "border-red-500/30 hover:border-red-500/50",
        details: {
            description: "Identify and score the most critical mutations driving tumor growth",
            techniques: ["Driver mutation analysis", "Gene essentiality scoring", "Pathway disruption mapping"],
            endpoints: ["/predict_variant_impact", "/predict_gene_essentiality"]
        }
    },
    { 
        number: 2, 
        name: "Angiogenesis", 
        strategy: "VEGF pathway disruption strategies",
        icon: Activity,
        color: "text-orange-400",
        bgColor: "bg-orange-500/10 hover:bg-orange-500/20",
        borderColor: "border-orange-500/30 hover:border-orange-500/50",
        details: {
            description: "Prevent blood vessel formation that feeds tumor growth",
            techniques: ["VEGF pathway analysis", "Anti-angiogenic targeting", "Vascular disruption"],
            endpoints: ["/generate_optimized_guide_rna", "/predict_immunogenicity"]
        }
    },
    { 
        number: 3, 
        name: "EMT", 
        strategy: "Cell adhesion restoration & mobility prevention",
        icon: Shield,
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10 hover:bg-yellow-500/20",
        borderColor: "border-yellow-500/30 hover:border-yellow-500/50",
        details: {
            description: "Restore cell-to-cell adhesion to prevent cancer cell mobility",
            techniques: ["E-cadherin restoration", "EMT reversal", "Cell adhesion enhancement"],
            endpoints: ["/predict_variant_impact", "/generate_optimized_guide_rna"]
        }
    },
    { 
        number: 4, 
        name: "Invasion", 
        strategy: "MMP enzyme knockout strategies",
        icon: Zap,
        color: "text-green-400",
        bgColor: "bg-green-500/10 hover:bg-green-500/20",
        borderColor: "border-green-500/30 hover:border-green-500/50",
        details: {
            description: "Block matrix metalloproteinases that enable tissue invasion",
            techniques: ["MMP inhibition", "Tissue barrier reinforcement", "Invasion pathway blocking"],
            endpoints: ["/predict_gene_essentiality", "/generate_optimized_guide_rna"]
        }
    },
    { 
        number: 5, 
        name: "Circulation Survival", 
        strategy: "Immune visibility restoration",
        icon: Target,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10 hover:bg-blue-500/20",
        borderColor: "border-blue-500/30 hover:border-blue-500/50",
        details: {
            description: "Make circulating tumor cells visible to immune system",
            techniques: ["Immune checkpoint modulation", "CTCs targeting", "Immune visibility enhancement"],
            endpoints: ["/predict_immunogenicity", "/predict_variant_impact"]
        }
    },
    { 
        number: 6, 
        name: "Homing", 
        strategy: "Receptor blinding strategies",
        icon: Activity,
        color: "text-indigo-400",
        bgColor: "bg-indigo-500/10 hover:bg-indigo-500/20",
        borderColor: "border-indigo-500/30 hover:border-indigo-500/50",
        details: {
            description: "Block receptors that guide cancer cells to target organs",
            techniques: ["Receptor antagonism", "Homing signal disruption", "Organ tropism prevention"],
            endpoints: ["/generate_optimized_guide_rna", "/predict_gene_essentiality"]
        }
    },
    { 
        number: 7, 
        name: "Extravasation", 
        strategy: "Organ-specific targeting prevention",
        icon: Shield,
        color: "text-purple-400",
        bgColor: "bg-purple-500/10 hover:bg-purple-500/20",
        borderColor: "border-purple-500/30 hover:border-purple-500/50",
        details: {
            description: "Prevent cancer cells from exiting blood vessels into organs",
            techniques: ["Vascular barrier strengthening", "Extravasation blocking", "Organ protection"],
            endpoints: ["/predict_variant_impact", "/predict_immunogenicity"]
        }
    },
    { 
        number: 8, 
        name: "Dormancy Control", 
        strategy: "Forced hibernation induction",
        icon: Zap,
        color: "text-pink-400",
        bgColor: "bg-pink-500/10 hover:bg-pink-500/20",
        borderColor: "border-pink-500/30 hover:border-pink-500/50",
        details: {
            description: "Force cancer cells into permanent dormant state",
            techniques: ["Dormancy induction", "Cell cycle arrest", "Metabolic suppression"],
            endpoints: ["/predict_gene_essentiality", "/generate_optimized_guide_rna"]
        }
    },
];

const FrameworkStepCard = ({ 
    number, 
    name, 
    strategy, 
    icon: Icon, 
    color, 
    bgColor, 
    borderColor, 
    details,
    isExpanded,
    onToggle 
}: { 
    number: number, 
    name: string, 
    strategy: string,
    icon: any,
    color: string,
    bgColor: string,
    borderColor: string,
    details: any,
    isExpanded: boolean,
    onToggle: () => void
}) => (
    <div 
        className={`p-6 bg-slate-800 border-2 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg ${bgColor} ${borderColor}`}
        onClick={onToggle}
    >
        <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
                <div className={`text-3xl font-bold ${color}`}>{number}</div>
                <Icon className={`w-8 h-8 ${color}`} />
            </div>
            {isExpanded ? 
                <ChevronDown className="w-6 h-6 text-gray-400 transition-transform duration-200" /> : 
                <ChevronRight className="w-6 h-6 text-gray-400 transition-transform duration-200" />
            }
        </div>
        
        <div className="min-h-[100px]">
            <h4 className="text-lg font-semibold text-white mb-2">{name}</h4>
            <p className="text-base text-gray-300 leading-relaxed">{strategy}</p>
            
            {isExpanded && (
                <div className="animate-fade-in space-y-4 border-t border-slate-700 pt-4 mt-4">
                    <p className="text-base text-gray-300">{details.description}</p>
                    
                    <div>
                        <h5 className="font-semibold text-white text-sm mb-2">Key Techniques:</h5>
                        <ul className="text-sm text-gray-300 space-y-1.5">
                            {details.techniques.map((technique: string, idx: number) => (
                                <li key={idx} className="flex items-center space-x-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${color.replace('text-', 'bg-')}`}></div>
                                    <span>{technique}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div>
                        <h5 className="font-semibold text-white text-sm mb-2">API Endpoints:</h5>
                        <div className="flex flex-wrap gap-2">
                            {details.endpoints.map((endpoint: string, idx: number) => (
                                <div key={idx} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-md whitespace-nowrap overflow-hidden text-ellipsis">
                                    {endpoint}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
);

export const MetastasisFrameworkSection = () => {
    const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
    const [showAll, setShowAll] = useState(false);

    const toggleCard = (number: number) => {
        const newExpanded = new Set(expandedCards);
        if (newExpanded.has(number)) {
            newExpanded.delete(number);
        } else {
            newExpanded.add(number);
        }
        setExpandedCards(newExpanded);
    };

    const toggleAll = () => {
        if (showAll) {
            setExpandedCards(new Set());
        } else {
            setExpandedCards(new Set(frameworkSteps.map(step => step.number)));
        }
        setShowAll(!showAll);
    };

    return (
        <section className="mb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10">
                <SectionHeader
                    title="The 8-Step Metastasis Framework: Our Clinical Roadmap"
                    subtitle="Our platform directly maps its analytical and generative capabilities to each critical step of cancer metastasis, providing a comprehensive, stage-by-stage intervention strategy."
                />
                
                <div className="text-center mb-8">
                    <button
                        onClick={toggleAll}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
                    >
                        {showAll ? 'Collapse All' : 'Expand All Details'}
                    </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {frameworkSteps.map(step => (
                        <FrameworkStepCard 
                            key={step.number} 
                            {...step} 
                            isExpanded={expandedCards.has(step.number)}
                            onToggle={() => toggleCard(step.number)}
                        />
                    ))}
                </div>
            </div>
            
            <div className="mt-8 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
                <p className="text-center text-gray-400 text-sm">
                    <span className="font-semibold text-blue-400">Interactive Framework:</span> Click on any step above to explore detailed intervention strategies. 
                    This framework leverages our core endpoints to create a cohesive, actionable plan for metastasis prevention.
                </p>
            </div>
        </section>
    );
}; 