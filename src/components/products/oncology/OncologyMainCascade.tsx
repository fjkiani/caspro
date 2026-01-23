'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dna, Pill, Search, FileText, TrendingUp, Zap, ChevronRight, Target, Shield, Activity, Stethoscope, Clock, Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';
import SAEIntelligence from '@/components/dossier/SAEIntelligence';
import ClinicalTrial from '@/components/dossier/ClinicalTrial';
import ExecutiveSummary from '@/components/dossier/ExecutiveSummary';
import SPEFusion from '@/components/dossier/SPEFusion';
import DataLab from '@/components/dossier/DataLab';

interface TabData {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  component: React.ComponentType<any>;
  props?: any;
}

const OutcomesTab: React.FC = () => (
  <div className="space-y-8">
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-World Transformation Stories</h3>
      <p className="text-lg text-gray-600">How our platform revolutionizes research workflows and decision-making</p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
        <div className="flex items-center mb-4">
          <Target className="w-8 h-8 text-blue-600 mr-3" />
          <div>
            <div className="text-2xl font-bold text-blue-900">96.6%</div>
            <div className="text-sm text-blue-700">Match Accuracy</div>
          </div>
        </div>
        <h4 className="font-semibold text-gray-900 mb-2">Transparent Trial Matching</h4>
        <p className="text-sm text-gray-600">Eligibility reasoning with green/yellow/red flags per criterion for complete transparency</p>
      </div>

      <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
        <div className="flex items-center mb-4">
          <Shield className="w-8 h-8 text-red-600 mr-3" />
          <div>
            <div className="text-2xl font-bold text-red-900">3-6 Weeks</div>
            <div className="text-sm text-red-700">Earlier Detection</div>
          </div>
        </div>
        <h4 className="font-semibold text-gray-900 mb-2">Resistance Detection</h4>
        <p className="text-sm text-gray-600">Proactive resistance detection 3-6 weeks faster than imaging with CA-125 intelligence</p>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
        <div className="flex items-center mb-4">
          <Activity className="w-8 h-8 text-green-600 mr-3" />
          <div>
            <div className="text-2xl font-bold text-green-900">Single Output</div>
            <div className="text-sm text-green-700">Unified Care</div>
          </div>
        </div>
        <h4 className="font-semibold text-gray-900 mb-2">Complete Care Integration</h4>
        <p className="text-sm text-gray-600">Drugs + Trials + Safety + Nutrition + Monitoring integrated in one actionable care plan</p>
      </div>
    </div>
  </div>
);

const CoreCapabilitiesTab: React.FC = () => (
  <div className="space-y-8">
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">5 Advanced AI-Powered Capabilities</h3>
      <p className="text-lg text-gray-600">Oncology capabilities for clinical workflows</p>
    </div>

    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <Dna className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Resolve Genetic Uncertainty</h4>
              <p className="text-gray-600">Zero-shot variant interpretation with Evo2 foundation model</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">95.7% AUROC</div>
            <div className="text-sm text-gray-500">73% VUS Resolution</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-blue-600 font-medium">Same-Day Decisions</span>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
            View details <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <Target className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Match Patients to Therapies</h4>
              <p className="text-gray-600">Mechanism-based matching using S/P/E fusion</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">96.6% Accuracy</div>
            <div className="text-sm text-gray-500">Precision Matching</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-green-600 font-medium">Same-Day Action</span>
          <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
            View details <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-red-600 mr-3" />
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Prevent Toxicity</h4>
              <p className="text-gray-600">100% PGx coverage for DPYD/TPMT/UGT1A1/CYP2D6</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">100% Coverage</div>
            <div className="text-sm text-gray-500">Life-Threatening Prevention</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-red-600 font-medium">Prevent Adverse Events</span>
          <button className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center">
            View details <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Detect Resistance Early</h4>
              <p className="text-gray-600">Proactive detection 3-6 weeks before imaging</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">3-6 Weeks</div>
            <div className="text-sm text-gray-500">Early Detection</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-orange-600 font-medium">Prevent Treatment Failure</span>
          <button className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center">
            View details <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Unified Care Plans</h4>
              <p className="text-gray-600">Single API endpoint integrating all clinical intelligence</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">Holistic Care</div>
            <div className="text-sm text-gray-500">Context Integration</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-purple-600 font-medium">Same-Day Tumor Board Ready</span>
          <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center">
            View details <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const OncologyMainCascade: React.FC = () => {
  const [activeTab, setActiveTab] = useState('molecular-profile');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [processingTime, setProcessingTime] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);

  // No auto-play - user must manually start the cascade

  // Simulation progression logic
  useEffect(() => {
    if (!isPlaying) return;

    const phases = ['molecular-profile', 'therapeutic-options', 'clinical-trials', 'care-plan'];
    const phaseDuration = [3000, 4000, 3500, 5000]; // Different durations for each phase

    if (currentPhase >= phases.length) {
      setIsPlaying(false);
      setIsComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      setActiveTab(phases[currentPhase]);
      setCurrentPhase(prev => prev + 1);
      setProcessingTime(prev => prev + phaseDuration[currentPhase]);
    }, phaseDuration[currentPhase]);

    return () => clearTimeout(timer);
  }, [isPlaying, currentPhase]);

  const handlePlayPause = () => {
    if (isComplete) {
      // Reset and replay
      setActiveTab('molecular-profile');
      setCurrentPhase(0);
      setProcessingTime(0);
      setIsComplete(false);
      setTimeout(() => setIsPlaying(true), 500);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setActiveTab('molecular-profile');
    setIsPlaying(false);
    setCurrentPhase(0);
    setProcessingTime(0);
    setIsComplete(false);
  };

  const formatTime = (ms: number) => {
    return (ms / 1000).toFixed(1) + 's';
  };

  const tabs: TabData[] = [
    {
      id: 'molecular-profile',
      label: 'Molecular Profile',
      icon: Dna,
      description: 'Comprehensive genomic analysis with SAE intelligence and biomarker detection',
      component: SAEIntelligence,
      props: {
        data: {
          biomarkerGrid: [
            { name: "BRCA1:c.123A>T", impact: "Pathogenic", confidence: 0.94 },
            { name: "TP53:p.R175H", impact: "Pathogenic", confidence: 0.91 },
            { name: "KRAS:G12D", impact: "Pathogenic", confidence: 0.87 },
            { name: "PIK3CA:H1047R", impact: "Likely Pathogenic", confidence: 0.82 }
          ],
          resistanceAnalysis: {
            mechanisms: ["Secondary mutations", "Bypass pathways", "TP53 loss"],
            confidence: 0.85,
            actionable: true
          },
          dataProcessingSummary: {
            totalVariants: 1247,
            processed: 1247,
            confidence: 0.91
          }
        }
      }
    },
    {
      id: 'therapeutic-options',
      label: 'Therapeutic Options',
      icon: Pill,
      description: 'AI-powered drug recommendations with efficacy predictions and clinical evidence',
      component: SPEFusion,
      props: {
        data: {
          sequenceSignal: { score: 0.87, variants: ["BRCA1:c.123A>T", "TP53:p.R175H"] },
          pathwaySignal: { score: 0.92, pathways: ["HR Repair", "Apoptosis"] },
          evidenceSignal: { score: 0.89, publications: 247, trials: 18 },
          finalPrediction: { score: 0.89, confidence: "High", tier: "STANDARD" }
        }
      }
    },
    {
      id: 'clinical-trials',
      label: 'Clinical Trials',
      icon: Search,
      description: 'Personalized trial matching with eligibility analysis and location optimization',
      component: ClinicalTrial,
      props: {
        data: {
          trialId: "NCT04586335",
          title: "PARP Inhibitor + Immunotherapy for BRCA+ Ovarian Cancer",
          phase: "Phase 2",
          status: "Recruiting",
          matchScore: 94,
          eligibilityCriteria: [
            { criterion: "BRCA1/2 mutation", status: "met", color: "green" },
            { criterion: "Prior platinum therapy", status: "met", color: "green" },
            { criterion: "ECOG 0-1", status: "pending", color: "yellow" },
            { criterion: "No prior PARP inhibitors", status: "met", color: "green" }
          ],
          locations: ["Mayo Clinic", "MD Anderson", "Memorial Sloan Kettering"],
          mechanismFit: "Direct targeting of HR deficiency with synthetic lethality"
        }
      }
    },
    {
      id: 'care-plan',
      label: 'Care Plan',
      icon: FileText,
      description: 'Integrated care orchestration combining drugs, trials, nutrition, and monitoring',
      component: ExecutiveSummary,
      props: {
        data: {
          patientOverview: {
            diagnosis: "High-grade serous ovarian carcinoma",
            stage: "IIIC",
            molecularProfile: "BRCA1+, HRD+, TMB-High",
            performanceStatus: "ECOG 0"
          },
          recommendedTreatment: {
            primary: "Olaparib maintenance therapy",
            secondary: "Pembrolizumab immunotherapy",
            clinicalTrial: "Consider NCT04586335 (PARP + IO)",
            rationale: "BRCA mutation + HRD status indicates strong response to PARP inhibitors"
          },
          monitoringSchedule: {
            frequency: "q3weeks",
            biomarkers: ["CA-125", "ctDNA", "Imaging"],
            triggers: ["CA-125 elevation", "Symptom progression"]
          },
          supportiveCare: {
            nutrition: ["Vitamin D 2000 IU daily", "Omega-3 supplementation"],
            toxicityPrevention: ["Acetaminophen premedication", "Antiemetic prophylaxis"],
            monitoring: ["Liver function tests", "CBC with differential"]
          }
        }
      }
    },
    {
      id: 'outcomes',
      label: 'Outcomes',
      icon: TrendingUp,
      description: 'Real-world transformation stories and clinical impact metrics',
      component: OutcomesTab,
      props: {}
    },
    {
      id: 'core-capabilities',
      label: 'Core Capabilities',
      icon: Zap,
      description: 'Agentic AI-powered capabilities for oncology',
      component: CoreCapabilitiesTab,
      props: {}
    }
  ];


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Header with Controls */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-3xl font-bold text-gray-900 mr-4">Complete Oncology Intelligence Cascade</h2>
          <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-2">
            <span className="text-sm text-gray-600">{formatTime(processingTime)} elapsed</span>
            <div className="w-px h-4 bg-gray-300"></div>
            <button
              onClick={handlePlayPause}
              className="flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
            >
              {isComplete ? <RotateCcw className="w-4 h-4 mr-1" /> : isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
              {isComplete ? 'Replay' : isPlaying ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={handleReset}
              className="px-2 py-1 text-gray-600 hover:text-gray-800 transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          From molecular profiling to unified care plans - AI-powered oncology capabilities
        </p>
      </div>

      {/* Tab Navigation with Progress Indicators */}
      <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200">
        {tabs.slice(0, 4).map((tab, index) => { // Only show the first 4 tabs for the cascade
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isCompleted = index < currentPhase;
          const isProcessing = index === currentPhase && isPlaying;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 border-b-2 font-medium text-sm transition-colors relative ${
                isActive
                  ? 'border-blue-500 text-blue-600'
                  : isCompleted
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
              {isProcessing && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
              {isCompleted && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-2 h-2 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
        >
          {(() => {
            const activeTabData = tabs.find(tab => tab.id === activeTab);
            if (!activeTabData) return null;

            const Component = activeTabData.component;
            return <Component {...activeTabData.props} />;
          })()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OncologyMainCascade;
