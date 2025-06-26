'use client';

import React, { useState } from 'react';
import { Search, Shield, AlertTriangle, TrendingDown, Eye, Filter } from 'lucide-react';

const competitors: Record<string, {
    threat: 'low' | 'medium' | 'high';
    threatScore: number;
    assessment: string;
    capabilities: string;
    weaknesses: string;
    marketCap: string;
    founded: string;
    employees: string;
}> = {
    "Foundation Medicine": {
        threat: "high",
        threatScore: 85,
        assessment: "The Incumbent Giant. Foundation Medicine has a commanding lead in comprehensive genomic profiling (CGP), but their strength is also their weakness—they are wedded to the old paradigm of \"test, report, and hope.\"",
        capabilities: "Primary Weapons: `FoundationOne CDx` (324 genes), `FoundationOne Liquid CDx` (liquid biopsy), `FoundationACT` (tumor-normal sequencing). Core Technology: Comprehensive genomic profiling, FDA-approved companion diagnostics, massive clinical database.",
        weaknesses: `<ul class="list-disc list-inside space-y-2 text-gray-300"><li><strong class="text-red-400">VUS Paralysis:</strong> They generate more VUS than anyone but offer no resolution pathway.</li><li><strong class="text-red-400">Reactive Reporting:</strong> They tell you what's broken after it's already broken.</li><li><strong class="text-red-400">No Therapeutic Design:</strong> They identify targets but can't design solutions.</li><li><strong class="text-red-400">Legacy Infrastructure:</strong> Built for the "sequence and pray" era, not the "design and deploy" future.</li></ul>`,
        marketCap: "$1.2B",
        founded: "2009",
        employees: "1,400+"
    },
    "Caris Life Sciences": {
        threat: "medium",
        threatScore: 65,
        assessment: "The Molecular Intelligence Specialist. Caris has built a reputation around \"molecular intelligence,\" but they remain fundamentally limited by their reliance on correlative, not causative, insights.",
        capabilities: "Primary Weapons: `Caris Molecular Intelligence` (multi-platform profiling), `WholeGenome` sequencing, `MI Transcriptome` (RNA sequencing), `MI Proteome` (protein analysis). Core Technology: Multi-omic profiling, treatment matching algorithms, real-world evidence platform.",
        weaknesses: `<ul class="list-disc list-inside space-y-2 text-gray-300"><li><strong class="text-red-400">Correlation Without Causation:</strong> They find patterns but can't explain mechanisms.</li><li><strong class="text-red-400">Treatment Matching vs. Treatment Design:</strong> They match existing drugs, we design new ones.</li><li><strong class="text-red-400">Data Rich, Insight Poor:</strong> Massive datasets with limited actionable intelligence.</li><li><strong class="text-red-400">No Predictive Power:</strong> They tell you what worked for others, not what will work for you.</li></ul>`,
        marketCap: "Private (~$2B valuation)",
        founded: "2008",
        employees: "1,000+"
    },
    "Guardant Health": {
        threat: "medium",
        threatScore: 70,
        assessment: "The Liquid Biopsy Leader. Guardant dominates liquid biopsy for cancer monitoring, but they're stuck in the \"detect and react\" paradigm—finding cancer after it's already spreading.",
        capabilities: "Primary Weapons: `Guardant360` (liquid biopsy, 74+ genes), `GuardantOMNI` (500+ genes), `GuardantINFORM` (recurrence monitoring). Core Technology: Circulating tumor DNA (ctDNA) detection, minimal residual disease monitoring, resistance mutation tracking.",
        weaknesses: `<ul class="list-disc list-inside space-y-2 text-gray-300"><li><strong class="text-red-400">Detection After the Fact:</strong> They find cancer that's already metastasizing.</li><li><strong class="text-red-400">No Intervention Capability:</strong> They can tell you cancer is spreading but can't stop it.</li><li><strong class="text-red-400">Limited Genomic Scope:</strong> Focused on known hotspots, blind to novel mechanisms.</li><li><strong class="text-red-400">Monitoring Without Prevention:</strong> They watch the fire spread instead of preventing ignition.</li></ul>`,
        marketCap: "$1.8B",
        founded: "2011",
        employees: "1,200+"
    },
    "Tempus": {
        threat: "high",
        threatScore: 80,
        assessment: "The AI-Powered Data Aggregator. Tempus has built an impressive data moat and AI capabilities, making them our most direct competitor in the \"intelligence layer\" space.",
        capabilities: "Primary Weapons: `Tempus xT` (648+ genes), `Tempus xF` (liquid biopsy), `Tempus xR` (RNA sequencing), `Tempus ONE` (clinical decision support). Core Technology: Multimodal AI, clinical data lake, real-world evidence generation, clinical trial matching.",
        weaknesses: `<ul class="list-disc list-inside space-y-2 text-gray-300"><li><strong class="text-red-400">Breadth Over Depth:</strong> They analyze everything but master nothing.</li><li><strong class="text-red-400">Correlation-Based AI:</strong> Their models find patterns, ours understand mechanisms.</li><li><strong class="text-red-400">No Therapeutic Design:</strong> They optimize existing treatments, we invent new ones.</li><li><strong class="text-red-400">Data Dependency:</strong> Their insights are only as good as their historical data—we predict the future.</li></ul>`,
        marketCap: "$400M",
        founded: "2015",
        employees: "2,000+"
    },
    "Flatiron Health": {
        threat: "low",
        threatScore: 40,
        assessment: "The EHR Data Miner. Flatiron (now part of Roche) excels at extracting insights from messy clinical data, but they're fundamentally limited to retrospective analysis of what has already happened.",
        capabilities: "Primary Weapons: `OncoEMR` (oncology-specific EHR), `OncoTrials` (clinical trial matching), Real-world data platform. Core Technology: Natural language processing, clinical data standardization, outcomes research, regulatory-grade real-world evidence.",
        weaknesses: `<ul class="list-disc list-inside space-y-2 text-gray-300"><li><strong class="text-red-400">Backward-Looking Intelligence:</strong> They analyze what happened, we predict what will happen.</li><li><strong class="text-red-400">Process Optimization vs. Outcome Revolution:</strong> They make existing workflows more efficient, we make them obsolete.</li><li><strong class="text-red-400">No Genomic Integration:</strong> They understand patient journeys but not genomic drivers.</li><li><strong class="text-red-400">Roche Integration Challenges:</strong> Corporate bureaucracy slows innovation.</li></ul>`,
        marketCap: "Acquired by Roche ($1.9B)",
        founded: "2012",
        employees: "1,500+"
    },
    "Ontada": {
        threat: "low",
        threatScore: 20,
        assessment: "The Community Oncology Foot Soldier. Focused on workflow efficiency, not technological superiority.",
        capabilities: "Primary Weapons: `iKnowMed` EHR, `Clear Value Plus` (cost/guideline visibility). Core Technology: Workflow efficiency, practice management, NCCN guideline integration.",
        weaknesses: `<ul class="list-disc list-inside space-y-2 text-gray-300"><li><strong class="text-red-400">Workflow over Insight:</strong> They help a clinic run on time. They don't help it devise a cure.</li><li><strong class="text-red-400">Completely Reliant on External Intelligence:</strong> They are a vessel waiting to be filled. We will fill it.</li><li><strong class="text-red-400">Actionability Gap is their Business Model:</strong> They help doctors navigate the standard playbook. We write the next chapter.</li></ul>`,
        marketCap: "Private",
        founded: "2019",
        employees: "500+"
    }
};

const ThreatBadge = ({ threat, score }: { threat: 'low' | 'medium' | 'high', score: number }) => {
    const threatClasses = {
        high: 'bg-red-800 text-red-100',
        medium: 'bg-yellow-800 text-yellow-100',
        low: 'bg-green-800 text-green-100',
    };
    
    const ThreatIcon = threat === 'high' ? AlertTriangle : threat === 'medium' ? Eye : Shield;
    
    return (
        <div className="flex items-center space-x-3">
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center space-x-1 ${threatClasses[threat]}`}>
                <ThreatIcon className="w-3 h-3" />
                <span>Threat Level: {threat}</span>
            </span>
            <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Score:</span>
                <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                            threat === 'high' ? 'bg-red-500' : 
                            threat === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${score}%` }}
                    ></div>
                </div>
                <span className={`font-bold text-sm ${
                    threat === 'high' ? 'text-red-400' : 
                    threat === 'medium' ? 'text-yellow-400' : 'text-green-400'
                }`}>
                    {score}/100
                </span>
            </div>
        </div>
    );
};

const CompetitorCard = ({ name, data, isActive }: { name: string, data: any, isActive: boolean }) => (
    <div className={`p-4 border rounded-lg transition-all duration-300 cursor-pointer ${
        isActive 
            ? 'border-blue-500 bg-blue-500/10' 
            : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800/80'
    }`}>
        <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-white">{name}</h4>
            <span className="text-xs text-gray-400">{data.founded}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">{data.marketCap}</span>
            <span className="text-sm text-gray-400">{data.employees}</span>
        </div>
        <ThreatBadge threat={data.threat as 'low' | 'medium' | 'high'} score={data.threatScore} />
    </div>
);

export const CompetitorTabs = () => {
    const competitorNames = Object.keys(competitors) as (keyof typeof competitors)[];
    const [activeTab, setActiveTab] = useState<keyof typeof competitors>(competitorNames[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [threatFilter, setThreatFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
    const [viewMode, setViewMode] = useState<'tabs' | 'cards'>('tabs');
    
    const activeCompetitor = competitors[activeTab];
    
    const filteredCompetitors = competitorNames.filter(name => {
        const competitor = competitors[name];
        const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesThreat = threatFilter === 'all' || competitor.threat === threatFilter;
        return matchesSearch && matchesThreat;
    });

    return (
        <div className="mb-12">
            {/* Controls */}
            <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search competitors..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    
                    <select
                        value={threatFilter}
                        onChange={(e) => setThreatFilter(e.target.value as any)}
                        className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                    >
                        <option value="all">All Threats</option>
                        <option value="low">Low Threat</option>
                        <option value="medium">Medium Threat</option>
                        <option value="high">High Threat</option>
                    </select>
                </div>
                
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setViewMode('tabs')}
                        className={`px-3 py-1 rounded text-sm ${viewMode === 'tabs' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                    >
                        Tabs
                    </button>
                    <button
                        onClick={() => setViewMode('cards')}
                        className={`px-3 py-1 rounded text-sm ${viewMode === 'cards' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                    >
                        Cards
                    </button>
                </div>
            </div>

            {viewMode === 'cards' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCompetitors.map(name => (
                        <CompetitorCard
                            key={name}
                            name={name}
                            data={competitors[name]}
                            isActive={activeTab === name}
                        />
                    ))}
                </div>
            ) : (
                <>
                    <div className="mb-8 border-b border-gray-600">
                        <nav className="flex flex-wrap -mb-px">
                            {filteredCompetitors.map(name => (
                                <button
                                    key={name}
                                    onClick={() => setActiveTab(name)}
                                    className={`border-b-2 whitespace-nowrap py-4 px-2 md:px-4 text-sm md:text-base font-medium transition-all duration-200 focus:outline-none relative ${activeTab === name
                                        ? 'border-blue-500 text-white font-semibold'
                                        : 'border-transparent text-gray-400 hover:text-white hover:border-gray-300'
                                        }`}
                                >
                                    {name}
                                    {competitors[name].threat === 'high' && (
                                        <AlertTriangle className="w-3 h-3 text-red-400 absolute -top-1 -right-1" />
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>
                    
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 animate-fade-in">
                        <div className="flex flex-wrap items-center justify-between mb-6">
                            <ThreatBadge threat={activeCompetitor.threat as 'low' | 'medium' | 'high'} score={activeCompetitor.threatScore} />
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <span>Founded: {activeCompetitor.founded}</span>
                                <span>Market Cap: {activeCompetitor.marketCap}</span>
                                <span>Employees: {activeCompetitor.employees}</span>
                            </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-3">Threat Assessment</h3>
                        <p className="text-gray-300 mb-6">{activeCompetitor.assessment}</p>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-white mb-2 flex items-center space-x-2">
                                    <Shield className="w-5 h-5 text-blue-400" />
                                    <span>Known Capabilities</span>
                                </h4>
                                <div className="p-4 bg-gray-800/50 rounded-lg">
                                    <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: activeCompetitor.capabilities }}/>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-white mb-2 flex items-center space-x-2">
                                    <TrendingDown className="w-5 h-5 text-red-400" />
                                    <span>Weaknesses & Exploitation Vectors</span>
                                </h4>
                                <div className="p-4 bg-gray-800/50 rounded-lg">
                                    <div className="text-sm" dangerouslySetInnerHTML={{ __html: activeCompetitor.weaknesses }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}; 