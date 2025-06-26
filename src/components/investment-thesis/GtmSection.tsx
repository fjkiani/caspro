'use client';

import React, { useState } from 'react';
import { Target, Building, Handshake, Globe, Zap, Users, TrendingUp, ArrowRight } from 'lucide-react';

const SectionHeader = ({ number, title, subtitle }: { number: string, title: string, subtitle?: string }) => (
    <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-white mb-4 animate-fade-in">{number} {title}</h3>
        {subtitle && <p className="text-lg text-gray-400 max-w-3xl mx-auto animate-fade-in-delay">{subtitle}</p>}
    </div>
);

const GtmCard = ({ 
    card, 
    index, 
    isExpanded, 
    onToggle 
}: { 
    card: any, 
    index: number, 
    isExpanded: boolean, 
    onToggle: () => void 
}) => (
    <div 
        className="p-6 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 cursor-pointer"
        onClick={onToggle}
    >
        <div className="flex flex-col h-full">
            <div className="text-center mb-4">
                <div className="text-4xl mb-3">{card.icon}</div>
                <h4 className="font-bold text-white mb-2">{card.title}</h4>
            </div>
            
            <div className="flex-grow">
                <p className="text-sm text-gray-400 mb-4" dangerouslySetInnerHTML={{ __html: card.description }}></p>
                
                {isExpanded && (
                    <div className="animate-fade-in space-y-3">
                        <div className="p-3 bg-gray-900/50 rounded-lg">
                            <h5 className="font-semibold text-white text-sm mb-2">Key Strategies:</h5>
                            <ul className="text-xs text-gray-400 space-y-1">
                                {card.strategies.map((strategy: string, idx: number) => (
                                    <li key={idx} className="flex items-center space-x-2">
                                        <ArrowRight className="w-3 h-3 text-blue-400" />
                                        <span>{strategy}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                            <h5 className="font-semibold text-blue-400 text-sm mb-1">Market Size:</h5>
                            <p className="text-xs text-gray-300">{card.marketSize}</p>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-xs text-blue-400 font-bold">{card.hook}</p>
            </div>
        </div>
    </div>
);

const gtmData = [
    {
        icon: "🎯",
        title: "Pharma & Biotech",
        description: "Lead with our **Pre-Clinical Simulation Engine** to de-risk their R&D pipeline and solve their >$2B per-drug failure problem.",
        hook: "`in silico` redesign of a recently failed clinical asset.",
        strategies: [
            "Target failed Phase II/III assets for redesign",
            "Offer risk-free pilot programs with success-based pricing",
            "Partner with CROs to embed our platform in their workflows",
            "Create joint ventures for high-value therapeutic areas"
        ],
        marketSize: "$2.8B average cost per drug - massive cost reduction opportunity"
    },
    {
        icon: "🏥",
        title: "Health Systems",
        description: "Lead with our **VUS Annihilation** capability to provide immediate, undeniable clinical value and close their actionability gap.",
        hook: "a \"VUS Annihilation\" pilot to resolve their entire backlog of uncertain cases.",
        strategies: [
            "Target cancer centers with high VUS volumes",
            "Integrate with existing genetic testing workflows",
            "Provide real-time decision support at point of care",
            "Create outcome-based payment models"
        ],
        marketSize: "$25B cancer diagnostics market - direct addressable opportunity"
    },
    {
        icon: "🤝",
        title: "Integrations",
        description: " \"premium intelligence layer\" into EMRs and diagnostics.",
        hook: "HOOK: Partner with a diagnostics firm to be their exclusive VUS resolution engine.",
        strategies: [
            "White-label our AI for major diagnostic companies",
            "Embed into Epic, Cerner, and other major EMR systems",
            "Create API partnerships with genomics companies",
            "Offer premium add-on services to existing platforms"
        ],
        marketSize: "$86B precision medicine market - integration opportunity"
    },
    {
        icon: "🌐",
        title: "DeSci & Web3",
        description: "Pioneer **IP-NFTs** to raise non-dilutive R&D capital from Bio-DAOs and the Web3 community, creating a new funding paradigm.",
        hook: "Launch the first IP-NFT for a CrisPRO-designed therapeutic for a rare disease.",
        strategies: [
            "Create tokenized IP for our therapeutic designs",
            "Partner with Bio-DAOs for collaborative research",
            "Launch decentralized clinical trials",
            "Build community-owned research initiatives"
        ],
        marketSize: "$4.2B DeSci market potential - new funding mechanisms"
    }
];

export const GtmSection = () => {
    const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
    const [showAll, setShowAll] = useState(false);

    const toggleCard = (index: number) => {
        const newExpanded = new Set(expandedCards);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedCards(newExpanded);
    };

    const toggleAll = () => {
        if (showAll) {
            setExpandedCards(new Set());
        } else {
            setExpandedCards(new Set(gtmData.map((_, index) => index)));
        }
        setShowAll(!showAll);
    };

    return (
        <section className="mb-20">
            <SectionHeader 
                number="4.0" 
                title="Go-to-Market Strategy: A Multi-Front War"
                subtitle="We don't compete in existing markets; we create new ones. Our go-to-market strategy is designed to establish multiple revenue streams while building defensible market positions across the entire oncology ecosystem."
            />
            
            <div className="text-center mb-8">
                <button
                    onClick={toggleAll}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                    {showAll ? 'Collapse All Strategies' : 'Expand All Market Details'}
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {gtmData.map((card, index) => (
                    <GtmCard 
                        key={index}
                        card={card}
                        index={index}
                        isExpanded={expandedCards.has(index)}
                        onToggle={() => toggleCard(index)}
                    />
                ))}
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-lg text-center">
                    <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                    <h4 className="font-bold text-white mb-2">Total Addressable Market</h4>
                    <p className="text-3xl font-bold text-blue-400 mb-2">$196B</p>
                    <p className="text-sm text-gray-400">Global oncology market growing at 7.5% CAGR</p>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-lg text-center">
                    <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <h4 className="font-bold text-white mb-2">Serviceable Market</h4>
                    <p className="text-3xl font-bold text-green-400 mb-2">$86B</p>
                    <p className="text-sm text-gray-400">Precision medicine - our direct opportunity</p>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-lg text-center">
                    <Zap className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                    <h4 className="font-bold text-white mb-2">Immediate Opportunity</h4>
                    <p className="text-3xl font-bold text-purple-400 mb-2">$25B</p>
                    <p className="text-sm text-gray-400">Cancer diagnostics - our entry point</p>
                </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-center text-gray-300">
                    <span className="font-bold text-blue-400">Multi-Front Strategy:</span> By attacking multiple markets simultaneously, we create a diversified revenue base and reduce dependency on any single customer segment. This approach also allows us to capture value across the entire oncology value chain.
                </p>
            </div>
        </section>
    );
}; 