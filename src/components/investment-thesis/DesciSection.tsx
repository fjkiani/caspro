'use client';

import React, { useState } from 'react';
import { Coins, Shield, Users, TrendingUp, Zap, CheckCircle, ArrowRight, Globe } from 'lucide-react';

const SectionHeader = ({ number, title, subtitle }: { number: string, title: string, subtitle?: string }) => (
    <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-white mb-4 animate-fade-in">{number} {title}</h3>
        {subtitle && <p className="text-lg text-gray-400 max-w-3xl mx-auto animate-fade-in-delay">{subtitle}</p>}
    </div>
);

const DesciStep = ({ 
    step, 
    index, 
    isExpanded, 
    onToggle 
}: { 
    step: any, 
    index: number, 
    isExpanded: boolean, 
    onToggle: () => void 
}) => (
    <div 
        className="p-6 bg-gray-800/50 border-2 border-gray-700 rounded-lg hover:border-blue-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
        onClick={onToggle}
    >
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/50 rounded-full flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-blue-400" />
                </div>
            </div>
            <div className="flex-grow">
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-gray-300 mb-3">{step.description}</p>
                
                {isExpanded && (
                    <div className="animate-fade-in space-y-4">
                        <div className="p-4 bg-gray-900/50 rounded-lg">
                            <h5 className="font-semibold text-blue-400 mb-2">Technical Implementation:</h5>
                            <ul className="text-sm text-gray-400 space-y-1">
                                {step.implementation.map((item: string, idx: number) => (
                                    <li key={idx} className="flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4 text-green-400" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                            <h5 className="font-semibold text-blue-400 mb-2">Economic Impact:</h5>
                            <p className="text-sm text-gray-300">{step.economicImpact}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
);

const desciSteps = [
    {
        title: "Step 1: IP-NFT Creation",
        description: "We tokenize our therapeutic designs as IP-NFTs, creating liquid, tradeable intellectual property assets backed by real scientific value.",
        icon: Coins,
        implementation: [
            "Smart contract-based IP ownership and licensing",
            "Automated royalty distribution to token holders",
            "Fractional ownership enabling smaller investors",
            "Real-time valuation based on development milestones"
        ],
        economicImpact: "Unlocks $4.2B in DeSci funding potential while maintaining full control over our core IP"
    },
    {
        title: "Step 2: Bio-DAO Partnerships",
        description: "We partner with decentralized autonomous organizations focused on specific disease areas, leveraging their community and capital.",
        icon: Users,
        implementation: [
            "Governance token integration for research direction",
            "Community-driven research prioritization",
            "Distributed clinical trial coordination",
            "Transparent milestone tracking and reporting"
        ],
        economicImpact: "Access to $1.8B in Bio-DAO treasuries and 50,000+ engaged community members"
    },
    {
        title: "Step 3: Verification Layer",
        description: "Our AI-powered verification system ensures the integrity and reproducibility of all research outputs, creating trust in the ecosystem.",
        icon: Shield,
        implementation: [
            "Blockchain-based research provenance tracking",
            "AI-powered peer review and validation",
            "Automated reproducibility scoring",
            "Real-time fraud detection and prevention"
        ],
        economicImpact: "Reduces research fraud by 90% and increases investor confidence, attracting premium valuations"
    },
    {
        title: "Step 4: Global Liquidity",
        description: "We create the world's first liquid market for biotech IP, enabling real-time price discovery and efficient capital allocation.",
        icon: Globe,
        implementation: [
            "Decentralized exchange for IP-NFT trading",
            "Automated market makers for liquidity provision",
            "Cross-chain compatibility for global access",
            "Institutional-grade custody and compliance"
        ],
        economicImpact: "Creates $10B+ addressable market for tokenized biotech IP with 24/7 global trading"
    }
];

const ValueProposition = () => {
    const [activeMetric, setActiveMetric] = useState(0);
    
    const metrics = [
        { label: "Traditional Funding Timeline", value: "18-24 months", color: "text-red-400" },
        { label: "DeSci Funding Timeline", value: "2-4 weeks", color: "text-green-400" },
        { label: "IP Liquidity Increase", value: "10,000x", color: "text-blue-400" },
        { label: "Global Investor Access", value: "24/7", color: "text-purple-400" }
    ];
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {metrics.map((metric, index) => (
                <div 
                    key={index}
                    className={`p-6 bg-gray-800/50 border rounded-lg text-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                        activeMetric === index ? 'border-blue-500/50 bg-blue-500/10' : 'border-gray-700'
                    }`}
                    onClick={() => setActiveMetric(index)}
                >
                    <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-400 mb-2">{metric.label}</p>
                    <p className={`text-3xl font-bold ${metric.color} animate-pulse`}>{metric.value}</p>
                </div>
            ))}
        </div>
    );
};

export const DesciSection = () => {
    const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());
    const [showAll, setShowAll] = useState(false);

    const toggleStep = (index: number) => {
        const newExpanded = new Set(expandedSteps);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedSteps(newExpanded);
    };

    const toggleAll = () => {
        if (showAll) {
            setExpandedSteps(new Set());
        } else {
            setExpandedSteps(new Set(desciSteps.map((_, index) => index)));
        }
        setShowAll(!showAll);
    };

    return (
        <section className="mb-20">
            <SectionHeader 
                number="5.0" 
                title="A New Economic Engine: DeSci & Verification"
                subtitle="We're not just building better therapeutics—we're creating an entirely new funding and verification paradigm that transforms how biotech innovation is financed and validated globally."
            />
            
            <ValueProposition />
            
            <div className="text-center mb-8">
                <button
                    onClick={toggleAll}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                    {showAll ? 'Collapse All Details' : 'Expand All Implementation Details'}
                </button>
            </div>
            
            <div className="space-y-6">
                {desciSteps.map((step, index) => (
                    <DesciStep 
                        key={index}
                        step={step}
                        index={index}
                        isExpanded={expandedSteps.has(index)}
                        onToggle={() => toggleStep(index)}
                    />
                ))}
            </div>
            
            <div className="mt-12 p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg">
                <div className="text-center mb-6">
                    <h4 className="text-xl font-bold text-white mb-2">The DeSci Advantage</h4>
                    <p className="text-gray-300">Why traditional biotech funding is broken and how we fix it</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h5 className="font-semibold text-red-400">Traditional Problems:</h5>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                <span>18-24 month funding cycles</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                <span>Illiquid IP assets</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                <span>Limited investor access</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                <span>Opaque research processes</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="space-y-4">
                        <h5 className="font-semibold text-green-400">CrisPRO Solutions:</h5>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>2-4 week tokenized funding</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>24/7 liquid IP markets</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>Global investor participation</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span>AI-verified research integrity</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}; 