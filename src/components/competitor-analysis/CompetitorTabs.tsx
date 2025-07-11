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
        assessment: "The Established Leader. Foundation Medicine has built a strong position in comprehensive genomic profiling (CGP) with proven clinical adoption and regulatory approval. Their focus on diagnostic excellence provides a solid foundation, though it represents a different approach from our predictive intervention model.",
        capabilities: "Core Products: `FoundationOne CDx` (324 genes), `FoundationOne Liquid CDx` (liquid biopsy), `FoundationACT` (tumor-normal sequencing). Core Technology: Comprehensive genomic profiling, FDA-approved companion diagnostics, extensive clinical database with strong regulatory validation.",
        weaknesses: `<ul class="list-disc list-inside space-y-2 text-gray-300"><li><strong class="text-orange-400">VUS Reporting:</strong> Strong at identifying variants but limited tools for VUS interpretation and resolution.</li><li><strong class="text-orange-400">Diagnostic Focus:</strong> Excels at characterizing existing tumors rather than predicting future behavior.</li><li><strong class="text-orange-400">Treatment Matching:</strong> Identifies potential targets but doesn't design custom therapeutic solutions.</li><li><strong class="text-orange-400">Established Infrastructure:</strong> Mature platform optimized for current workflows rather than next-generation approaches.</li></ul>`,
        marketCap: "$1.2B",
        founded: "2009",
        employees: "1,400+"
    },
    "Caris Life Sciences": {
        threat: "medium",
        threatScore: 65,
        assessment: "The Multi-Omic Specialist. Caris has developed strong capabilities in molecular intelligence through comprehensive multi-platform profiling. Their approach emphasizes broad molecular characterization and treatment matching based on real-world evidence.",
        capabilities: "Core Products: `Caris Molecular Intelligence` (multi-platform profiling), `WholeGenome` sequencing, `MI Transcriptome` (RNA sequencing), `MI Proteome` (protein analysis). Core Technology: Multi-omic profiling, treatment matching algorithms, real-world evidence platform with broad molecular coverage.",
        weaknesses: `<ul class="list-disc list-inside space-y-2 text-gray-300"><li><strong class="text-orange-400">Pattern Recognition Focus:</strong> Excellent at identifying molecular patterns but limited mechanistic interpretation capabilities.</li><li><strong class="text-orange-400">Treatment Matching Approach:</strong> Focuses on matching existing therapies rather than designing novel interventions.</li><li><strong class="text-orange-400">Data Volume vs. Actionability:</strong> Comprehensive datasets that may require additional interpretation for clinical decision-making.</li><li><strong class="text-orange-400">Retrospective Analysis:</strong> Primarily uses historical data rather than predictive modeling for future outcomes.</li></ul>`,
        marketCap: "Private (~$2B valuation)",
        founded: "2008",
        employees: "1,000+"
    },
    "Guardant Health": {
        threat: "medium",
        threatScore: 70,
        assessment: "The Liquid Biopsy Pioneer. Guardant Health has established leadership in liquid biopsy technology with strong clinical validation and adoption. Their platform excels at non-invasive monitoring and detection, representing a complementary approach to tissue-based genomics.",
        capabilities: "Core Products: `Guardant360` (liquid biopsy, 74+ genes), `GuardantOMNI` (500+ genes), `GuardantINFORM` (recurrence monitoring). Core Technology: Circulating tumor DNA (ctDNA) detection, minimal residual disease monitoring, resistance mutation tracking with strong clinical validation.",
        weaknesses: `<ul class="list-disc list-inside space-y-2 text-gray-300"><li><strong class="text-orange-400">Detection-Focused Approach:</strong> Excellent at identifying circulating tumor DNA but limited predictive intervention capabilities.</li><li><strong class="text-orange-400">Monitoring Specialization:</strong> Strong at tracking disease progression but doesn't design therapeutic interventions.</li><li><strong class="text-orange-400">Targeted Gene Panel:</strong> Focuses on validated hotspots rather than comprehensive genomic analysis.</li><li><strong class="text-orange-400">Reactive Framework:</strong> Optimized for monitoring existing disease rather than preventing metastatic progression.</li></ul>`,
        marketCap: "$1.8B",
        founded: "2011",
        employees: "1,200+"
    },
    "Tempus": {
        threat: "high",
        threatScore: 80,
        assessment: "The AI-Driven Platform. Tempus has built impressive data infrastructure and AI capabilities, establishing themselves as a significant player in the precision medicine intelligence space with strong clinical adoption and comprehensive data integration.",
        capabilities: "Core Products: `Tempus xT` (648+ genes), `Tempus xF` (liquid biopsy), `Tempus xR` (RNA sequencing), `Tempus ONE` (clinical decision support). Core Technology: Multimodal AI, extensive clinical data lake, real-world evidence generation, clinical trial matching with broad platform integration.",
        weaknesses: `<ul class="list-disc list-inside space-y-2 text-gray-300"><li><strong class="text-orange-400">Broad Platform Approach:</strong> Comprehensive coverage across multiple areas but may lack deep specialization in specific domains.</li><li><strong class="text-orange-400">Pattern-Based AI:</strong> Strong at identifying correlations but limited mechanistic modeling capabilities.</li><li><strong class="text-orange-400">Treatment Optimization Focus:</strong> Excels at optimizing existing treatment protocols rather than designing novel therapeutic approaches.</li><li><strong class="text-orange-400">Historical Data Reliance:</strong> Insights primarily based on retrospective analysis rather than predictive intervention modeling.</li></ul>`,
        marketCap: "$400M",
        founded: "2015",
        employees: "2,000+"
    },
    "Flatiron Health": {
        threat: "low",
        threatScore: 40,
        assessment: "The Real-World Data Specialist. Flatiron Health (now part of Roche) has developed strong capabilities in extracting insights from clinical data and electronic health records, with a focus on real-world evidence generation and clinical workflow optimization.",
        capabilities: "Core Products: `OncoEMR` (oncology-specific EHR), `OncoTrials` (clinical trial matching), Real-world data platform. Core Technology: Natural language processing, clinical data standardization, outcomes research, regulatory-grade real-world evidence with strong healthcare integration.",
        weaknesses: `<ul class="list-disc list-inside space-y-2 text-gray-300"><li><strong class="text-orange-400">Retrospective Analysis Focus:</strong> Excellent at analyzing historical outcomes but limited predictive capabilities.</li><li><strong class="text-orange-400">Workflow Optimization Approach:</strong> Focused on improving existing clinical processes rather than transforming treatment paradigms.</li><li><strong class="text-orange-400">Limited Genomic Integration:</strong> Strong in clinical data but less integration with molecular and genomic insights.</li><li><strong class="text-orange-400">Large Organization Dynamics:</strong> Part of Roche's broader portfolio, which may influence innovation speed and focus.</li></ul>`,
        marketCap: "Acquired by Roche ($1.9B)",
        founded: "2012",
        employees: "1,500+"
    },
    "Ontada": {
        threat: "low",
        threatScore: 20,
        assessment: "The Community Oncology Enabler. Ontada focuses on supporting community oncology practices with workflow optimization and practice management tools, serving an important role in healthcare delivery infrastructure.",
        capabilities: "Core Products: `iKnowMed` EHR, `Clear Value Plus` (cost/guideline visibility). Core Technology: Workflow efficiency, practice management, NCCN guideline integration with focus on community oncology support.",
        weaknesses: `<ul class="list-disc list-inside space-y-2 text-gray-300"><li><strong class="text-orange-400">Workflow-Centric Approach:</strong> Excellent at practice efficiency but limited advanced diagnostic or therapeutic capabilities.</li><li><strong class="text-orange-400">Platform Dependency:</strong> Relies on external intelligence sources rather than generating proprietary insights.</li><li><strong class="text-orange-400">Standard Care Focus:</strong> Optimized for current standard-of-care protocols rather than innovative treatment approaches.</li></ul>`,
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
                                    <span>Core Capabilities</span>
                                </h4>
                                <div className="p-4 bg-gray-800/50 rounded-lg">
                                    <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: activeCompetitor.capabilities }}/>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-white mb-2 flex items-center space-x-2">
                                    <TrendingDown className="w-5 h-5 text-orange-400" />
                                    <span>Strategic Differentiation Opportunities</span>
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