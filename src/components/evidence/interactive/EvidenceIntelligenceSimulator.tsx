'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BaseInteractiveDemo, { AnalysisLoading, ProgressBar, PredictionBadge } from '@/components/metrics/interactive/BaseInteractiveDemo';
import { Shield, FileText, Award, Users, TrendingUp, AlertTriangle, CheckCircle, Star, BookOpen } from 'lucide-react';

interface EvidenceExample {
  id: string;
  title: string;
  category: 'clinical' | 'preclinical' | 'computational' | 'literature';
  rawFindings: string[];
  confidenceScore: number;
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Tier 4';
  citations: number;
  studyTypes: string[];
  patientImpact: string;
  businessValue: string;
}

const mockEvidenceExamples: EvidenceExample[] = [
  {
    id: 'evidence1',
    title: 'BRCA1 Therapeutic Target Validation',
    category: 'clinical',
    rawFindings: [
      'Phase III clinical trial shows 65% response rate',
      'FDA approval for hereditary breast cancer',
      '3 independent validation studies',
      'Biomarker-driven patient stratification'
    ],
    confidenceScore: 0.95,
    tier: 'Tier 1',
    citations: 12,
    studyTypes: ['RCT', 'Cohort Study', 'Meta-analysis'],
    patientImpact: 'Direct therapeutic benefit for 15% of breast cancer patients',
    businessValue: '$2.3B market opportunity with clear regulatory pathway'
  },
  {
    id: 'evidence2',
    title: 'Novel Splice Variant Mechanism',
    category: 'preclinical',
    rawFindings: [
      'In vitro validation in 3 cell lines',
      'Mouse model shows phenotype rescue',
      'Mechanism confirmed by RNA-seq',
      'No clinical trials yet initiated'
    ],
    confidenceScore: 0.73,
    tier: 'Tier 2',
    citations: 5,
    studyTypes: ['In vitro', 'Animal model', 'RNA-seq'],
    patientImpact: 'Potential treatment for rare genetic disorder affecting ~5,000 patients',
    businessValue: 'Orphan drug designation potential, $500M+ market'
  },
  {
    id: 'evidence3',
    title: 'AI-Predicted Protein Interaction',
    category: 'computational',
    rawFindings: [
      'AlphaFold structure prediction',
      'Molecular dynamics simulation',
      'No experimental validation',
      'Literature support limited'
    ],
    confidenceScore: 0.45,
    tier: 'Tier 4',
    citations: 2,
    studyTypes: ['Computational', 'Structure prediction'],
    patientImpact: 'Theoretical - requires experimental validation',
    businessValue: 'Early-stage research target, high risk/high reward'
  }
];

interface EvidenceSimulatorProps {
  title?: string;
  subtitle?: string;
  examples?: EvidenceExample[];
  showTierExplanation?: boolean;
}

const EvidenceIntelligenceSimulator: React.FC<EvidenceSimulatorProps> = ({
  title = "Evidence Intelligence Engine",
  subtitle = "See how raw findings transform into structured evidence",
  examples = mockEvidenceExamples,
  showTierExplanation = true
}) => {
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceExample | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'clinical' | 'preclinical' | 'computational'>('all');

  const processEvidence = (evidence: EvidenceExample) => {
    setIsProcessing(true);
    setSelectedEvidence(null);
    setShowBreakdown(false);
    
    setTimeout(() => {
      setSelectedEvidence(evidence);
      setIsProcessing(false);
    }, 2000);
  };

  const filteredExamples = examples.filter(evidence => 
    activeFilter === 'all' || evidence.category === activeFilter
  );

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Tier 1': return 'bg-green-500';
      case 'Tier 2': return 'bg-blue-500';
      case 'Tier 3': return 'bg-yellow-500';
      case 'Tier 4': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'clinical': return 'bg-green-100 text-green-700';
      case 'preclinical': return 'bg-blue-100 text-blue-700';
      case 'computational': return 'bg-purple-100 text-purple-700';
      case 'literature': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const demoConfig = {
    title,
    subtitle,
    icon: Shield,
    iconColor: 'text-blue-600',
    primaryColor: 'bg-blue-100',
    accentColor: 'blue'
  };

  // const educationalContent = {
  //   title: "What This Demonstrates:",
  //   points: [
  //     "How raw research findings are automatically tiered by confidence and evidence strength",
  //     "The difference between clinical, preclinical, and computational evidence types",
  //     "How citation count and study quality affect overall confidence scoring",
  //     "Why transparent evidence assessment accelerates research decision-making"
  //   ]
  // };

  return (
    <BaseInteractiveDemo config={demoConfig}>
      {/* Filter Tabs */}
      <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
        {(['all', 'clinical', 'preclinical', 'computational'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors capitalize ${
              activeFilter === filter
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {filter === 'all' ? 'All Evidence' : filter}
          </button>
        ))}
      </div>

      {/* Evidence Examples */}
      <div className="space-y-4 mb-6">
        {filteredExamples.map((evidence) => (
          <button
            key={evidence.id}
            onClick={() => processEvidence(evidence)}
            disabled={isProcessing}
            className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-4">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(evidence.category)}`}>
                {evidence.category}
              </div>
              <div>
                <div className="font-medium text-slate-900">{evidence.title}</div>
                <div className="text-xs text-slate-600">
                  {evidence.citations} citations • {evidence.studyTypes.join(', ')}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className={`w-3 h-3 rounded-full ${getTierColor(evidence.tier)}`} />
                <span className="text-sm font-medium text-slate-700">{evidence.tier}</span>
              </div>
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
          </button>
        ))}
      </div>

      {/* Processing Animation */}
      <AnimatePresence>
        {isProcessing && (
          <AnalysisLoading
            title="Processing evidence..."
            subtitle="Analyzing study quality, citation patterns, and confidence indicators"
            icon={BookOpen}
            color="blue"
            duration={2}
          />
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {selectedEvidence && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Evidence Header */}
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-medium text-slate-900">{selectedEvidence.title}</h4>
                <div className="flex items-center gap-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedEvidence.category)}`}>
                    {selectedEvidence.category}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getTierColor(selectedEvidence.tier)}`}>
                    {selectedEvidence.tier === 'Tier 1' ? (
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                    ) : selectedEvidence.tier === 'Tier 4' ? (
                      <AlertTriangle className="w-4 h-4 inline mr-1" />
                    ) : (
                      <Star className="w-4 h-4 inline mr-1" />
                    )}
                    {selectedEvidence.tier}
                  </div>
                </div>
              </div>
              <div className="text-sm text-slate-600">
                <strong>Citations:</strong> {selectedEvidence.citations} • <strong>Confidence:</strong> {(selectedEvidence.confidenceScore * 100).toFixed(0)}%
              </div>
            </div>

            {/* Confidence Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 border border-slate-200 rounded-lg">
                <h5 className="font-medium text-slate-900 mb-4">Confidence Score</h5>
                <ProgressBar
                  value={selectedEvidence.confidenceScore}
                  color={selectedEvidence.confidenceScore > 0.8 ? 'green' : selectedEvidence.confidenceScore > 0.6 ? 'blue' : 'red'}
                  label="Overall Confidence"
                  animated={true}
                  delay={0.5}
                />
                <div className="mt-3 text-xs text-slate-600">
                  Based on study quality, replication, and citation analysis
                </div>
              </div>

              <div className="p-4 border border-slate-200 rounded-lg">
                <h5 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Impact Assessment
                </h5>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Patient Impact:</strong>
                    <p className="text-slate-600 mt-1">{selectedEvidence.patientImpact}</p>
                  </div>
                  <div>
                    <strong>Business Value:</strong>
                    <p className="text-slate-600 mt-1">{selectedEvidence.businessValue}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Raw Findings */}
            <div className="p-4 border border-slate-200 rounded-lg">
              <h5 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-600" />
                Raw Findings Analysis
              </h5>
              <div className="grid md:grid-cols-2 gap-4">
                {selectedEvidence.rawFindings.map((finding, index) => (
                  <motion.div
                    key={finding}
                    className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-slate-700">{finding}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tier Explanation Toggle */}
            {showTierExplanation && (
              <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                {showBreakdown ? 'Hide' : 'Show'} Evidence Tier System
              </button>
            )}

            {/* Tier System Breakdown */}
            <AnimatePresence>
              {showBreakdown && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg border border-slate-200"
                >
                  <h5 className="font-medium text-slate-900 mb-4 text-center">Evidence Tier Classification</h5>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="font-medium text-green-800">Tier 1 - Clinical Grade</span>
                      </div>
                      <p className="text-xs text-slate-600">FDA approved, multiple RCTs, &gt;90% confidence</p>
                    </div>
                    
                    <div className="p-3 bg-white rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="font-medium text-blue-800">Tier 2 - Preclinical</span>
                      </div>
                      <p className="text-xs text-slate-600">Strong preclinical data, 70-90% confidence</p>
                    </div>
                    
                    <div className="p-3 bg-white rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span className="font-medium text-yellow-800">Tier 3 - Exploratory</span>
                      </div>
                      <p className="text-xs text-slate-600">Limited validation, 50-70% confidence</p>
                    </div>
                    
                    <div className="p-3 bg-white rounded-lg border border-red-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="font-medium text-red-800">Tier 4 - Hypothesis</span>
                      </div>
                      <p className="text-xs text-slate-600">Computational/theoretical, &lt;50% confidence</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* AI Advantage - Removed */}
          </motion.div>
        )}
      </AnimatePresence>
    </BaseInteractiveDemo>
  );
};

export default EvidenceIntelligenceSimulator;
