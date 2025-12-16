'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, RotateCcw, Eye, ChevronRight, Activity, Zap, Brain, Shield, FileText, Target, Stethoscope } from 'lucide-react';
import SAEIntelligence from '@/components/dossier/SAEIntelligence';
import ClinicalTrial from '@/components/dossier/ClinicalTrial';
import ExecutiveSummary from '@/components/dossier/ExecutiveSummary';
import SPEFusion from '@/components/dossier/SPEFusion';
import DataLab from '@/components/dossier/DataLab';

interface CascadePhase {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: number;
  color: string;
  insights: string[];
  agent: string;
}

interface IntelligenceCascadeModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId?: string;
}

const cascadePhases: CascadePhase[] = [
  {
    id: 'data-extraction',
    title: 'Data Extraction',
    description: 'Parsing patient NGS data, clinical notes, and pathology reports',
    icon: '📥',
    duration: 2000,
    color: 'blue',
    agent: 'Data Extractor',
    insights: [
      'NGS VCF file parsed successfully',
      'Clinical notes extracted (3 reports)',
      'Pathology report processed'
    ]
  },
  {
    id: 'biomarker-calculation',
    title: 'Biomarker Analysis',
    description: 'Calculating TMB, MSI, HRD status, and genomic signatures',
    icon: '🧬',
    duration: 3000,
    color: 'purple',
    agent: 'Biomarker Calculator',
    insights: [
      'TMB calculated: 12.3 mut/Mb (TMB-High)',
      'MSI status: MSS (Microsatellite Stable)',
      'HRD score: 42 (suggestive of BRCA deficiency)',
      'IO eligibility: Candidate (TMB-High)'
    ]
  },
  {
    id: 'resistance-analysis',
    title: 'Resistance Prediction',
    description: 'Analyzing mutation patterns and predicting treatment resistance',
    icon: '⚔️',
    duration: 2500,
    color: 'red',
    agent: 'Resistance Predictor',
    insights: [
      'KRAS G12D detected - potential EGFR resistance',
      'PIK3CA mutation - mTOR pathway activation',
      'Platinum sensitivity: 78% (favorable)',
      'MAPK pathway wild-type (good prognosis)'
    ]
  },
  {
    id: 'drug-ranking',
    title: 'Drug Ranking',
    description: 'Evaluating drug efficacy based on molecular profile and evidence',
    icon: '💊',
    duration: 4000,
    color: 'green',
    agent: 'Drug Ranker',
    insights: [
      'Olaparib (PARP): 94% confidence (Tier I)',
      'Carboplatin: 88% confidence (Tier I)',
      'Niraparib (PARP): 91% confidence (Tier I)',
      'Pembrolizumab: 76% confidence (IO candidate)',
      'Trametinib: 45% confidence (MEK inhibitor)'
    ]
  },
  {
    id: 'trial-matching',
    title: 'Trial Matching',
    description: 'Finding clinical trials with matching biomarkers and eligibility',
    icon: '🔬',
    duration: 3500,
    color: 'indigo',
    agent: 'Trial Matcher',
    insights: [
      'NCT05678901: PARP + ATR (DDR deficient OC)',
      'NCT04729387: Olaparib + Cediranib',
      'NCT03824704: Maintenance Olaparib',
      '3 trials with 94%+ mechanism fit',
      '2 trials recruiting within 50 miles'
    ]
  },
  {
    id: 'nutrition-planning',
    title: 'Nutrition Planning',
    description: 'Designing toxicity-aware nutrition plan with evidence-based dosing',
    icon: '🥗',
    duration: 2000,
    color: 'orange',
    agent: 'Nutritionist',
    insights: [
      'NAC 600mg during platinum infusion',
      'Vitamin D 2000 IU daily (deficiency detected)',
      'Curcumin 500mg BID (anti-inflammatory)',
      'Grapefruit avoidance (CYP3A4 interaction)',
      'Omega-3 supplementation recommended'
    ]
  },
  {
    id: 'care-plan-generation',
    title: 'Care Plan Generation',
    description: 'Synthesizing unified care plan with monitoring and next steps',
    icon: '📋',
    duration: 5000,
    color: 'teal',
    agent: 'Care Planner',
    insights: [
      'Complete unified care plan generated',
      'Monitoring schedule: CA-125 q3weeks, ctDNA q6weeks',
      'NGS re-evaluation recommended at progression',
      'Supportive care integrated (nutrition + supplements)',
      'Patient education materials prepared'
    ]
  }
];

export default function IntelligenceCascadeModal({
  isOpen,
  onClose,
  patientId = 'AK'
}: IntelligenceCascadeModalProps) {
  const [activeTab, setActiveTab] = useState<'molecular' | 'therapeutic' | 'trials' | 'care'>('molecular');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [completedPhases, setCompletedPhases] = useState<Set<number>>(new Set());
  const [processingTime, setProcessingTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Rich insight data that populates dossier components
  const [molecularInsights, setMolecularInsights] = useState<any>({});
  const [therapeuticInsights, setTherapeuticInsights] = useState<any>({});
  const [trialInsights, setTrialInsights] = useState<any>({});
  const [careInsights, setCareInsights] = useState<any>({});

  // Reset modal state when opened and auto-start simulation
  useEffect(() => {
    if (isOpen) {
      setActiveTab('molecular');
      setIsPlaying(false);
      setCurrentPhase(0);
      setCompletedPhases(new Set());
      setProcessingTime(0);
      setIsComplete(false);
      setMolecularInsights({});
      setTherapeuticInsights({});
      setTrialInsights({});
      setCareInsights({});
      
      // Auto-start simulation after 1 second delay
      const autoStartTimer = setTimeout(() => {
        setIsPlaying(true);
      }, 1000);
      
      return () => clearTimeout(autoStartTimer);
    }
  }, [isOpen]);

  // Auto-play simulation with rich component data
  useEffect(() => {
    if (!isPlaying || currentPhase >= cascadePhases.length) return;

    const phase = cascadePhases[currentPhase];
    const timer = setTimeout(() => {
      // Populate rich insight data based on phase
      switch (phase.id) {
        case 'data-extraction':
          setMolecularInsights((prev: any) => ({
            ...prev,
            dataProcessed: {
              ngsFiles: 1,
              clinicalNotes: 3,
              pathologyReports: 1,
              totalDataPoints: 1250
            }
          }));
          break;
        case 'biomarker-calculation':
          setMolecularInsights((prev: any) => ({
            ...prev,
            biomarkers: {
              tmb: { value: 12.3, status: 'TMB-High', confidence: 0.967 },
              msi: { status: 'MSS', confidence: 0.942 },
              hrd: { score: 42, status: 'Suggestive', confidence: 0.823 },
              ioEligibility: { status: 'Candidate', reason: 'TMB-High' }
            }
          }));
          break;
        case 'resistance-analysis':
          setMolecularInsights((prev: any) => ({
            ...prev,
            resistance: {
              kras: { mutation: 'G12D', resistance: 'EGFR', confidence: 0.891 },
              pik3ca: { mutation: 'H1047R', pathway: 'mTOR', confidence: 0.734 },
              platinum: { sensitivity: 78, status: 'Favorable' },
              mapk: { status: 'Wild-type', prognosis: 'Good' }
            }
          }));
          break;
        case 'drug-ranking':
          setTherapeuticInsights((prev: any) => ({
            ...prev,
            drugRankings: [
              { name: 'Olaparib', type: 'PARP', confidence: 0.94, tier: 'I', mechanism: 'DDR targeting' },
              { name: 'Carboplatin', type: 'Platinum', confidence: 0.88, tier: 'I', mechanism: 'DNA cross-linking' },
              { name: 'Niraparib', type: 'PARP', confidence: 0.91, tier: 'I', mechanism: 'DDR targeting' },
              { name: 'Pembrolizumab', type: 'IO', confidence: 0.76, tier: 'II', mechanism: 'PD-1 blockade' },
              { name: 'Trametinib', type: 'MEK', confidence: 0.45, tier: 'III', mechanism: 'MAPK inhibition' }
            ]
          }));
          break;
        case 'trial-matching':
          setTrialInsights((prev: any) => ({
            ...prev,
            trials: [
              { nct: 'NCT05678901', title: 'PARP + ATR in DDR Deficient OC', fit: 0.94, status: 'Recruiting' },
              { nct: 'NCT04729387', title: 'Olaparib + Cediranib', fit: 0.88, status: 'Recruiting' },
              { nct: 'NCT03824704', title: 'Maintenance Olaparib', fit: 0.91, status: 'Active' }
            ],
            summary: { totalMatches: 3, highFit: 2, within50Miles: 2 }
          }));
          break;
        case 'nutrition-planning':
          setTherapeuticInsights((prev: any) => ({
            ...prev,
            nutrition: [
              { name: 'NAC', dose: '600mg', timing: 'during platinum', purpose: 'nephroprotection' },
              { name: 'Vitamin D', dose: '2000 IU', timing: 'daily', purpose: 'deficiency correction' },
              { name: 'Curcumin', dose: '500mg BID', timing: 'twice daily', purpose: 'anti-inflammatory' },
              { name: 'Omega-3', dose: '1000mg', timing: 'daily', purpose: 'supplementation' },
              { name: 'Grapefruit', dose: 'Avoid', timing: 'during treatment', purpose: 'CYP3A4 interaction' }
            ]
          }));
          break;
        case 'care-plan-generation':
          setCareInsights((prev: any) => ({
            ...prev,
            carePlan: {
              patient: patientId,
              diagnosis: 'High-grade serous ovarian carcinoma',
              stage: 'III',
              recommendedTherapy: 'PARP inhibitor + platinum doublet',
              monitoring: {
                ca125: 'q3weeks',
                ctdna: 'q6weeks',
                imaging: 'post-C3, then q12weeks'
              },
              nutrition: 'Integrated supportive care plan',
              clinicalTrials: '3 high-fit options identified',
              nextSteps: 'NGS results pending for final optimization'
            }
          }));
          break;
      }

      // Mark phase complete and move to next
      setTimeout(() => {
        setCompletedPhases((prev: Set<number>) => new Set([...prev, currentPhase]));
        setCurrentPhase(prev => prev + 1);
        setProcessingTime(prev => prev + phase.duration);

        if (currentPhase + 1 >= cascadePhases.length) {
          setIsComplete(true);
          setIsPlaying(false);
        }
      }, phase.duration);
    }, 500);

    return () => clearTimeout(timer);
  }, [isPlaying, currentPhase, patientId]);

  const handlePlay = () => {
    if (isComplete) {
      // Reset and replay
      setIsPlaying(false);
      setCurrentPhase(0);
      setCompletedPhases(new Set());
      setProcessingTime(0);
      setIsComplete(false);
      setTimeout(() => setIsPlaying(true), 500);
    } else {
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentPhase(0);
    setCompletedPhases(new Set());
    setProcessingTime(0);
    setIsComplete(false);
  };

  const formatTime = (ms: number) => {
    return (ms / 1000).toFixed(1) + 's';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-7xl h-full max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold flex items-center">
                  <Brain className="w-8 h-8 mr-3" />
                  Intelligence Cascade
                </h1>
                <p className="text-blue-100 mt-2">
                  Autonomous oncology orchestration for {patientId} • {formatTime(processingTime)} elapsed
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePlay}
                  className="flex items-center px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  {isComplete ? <RotateCcw className="w-4 h-4 mr-2" /> : isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {isComplete ? 'Replay' : isPlaying ? 'Pause' : 'Start'}
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </button>
                <button
                  onClick={onClose}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Content - Tabbed Interface */}
          <div className="h-[calc(100%-120px)]">
            {/* Tab Navigation */}
            <div className="border-b border-slate-200 bg-slate-50">
              <div className="flex">
                {[
                  { id: 'molecular', label: 'Molecular Profile', icon: Brain, color: 'blue' },
                  { id: 'therapeutic', label: 'Therapeutic Options', icon: Target, color: 'green' },
                  { id: 'trials', label: 'Clinical Trials', icon: Stethoscope, color: 'purple' },
                  { id: 'care', label: 'Care Plan', icon: FileText, color: 'teal' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center px-6 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? `border-${tab.color}-500 text-${tab.color}-600 bg-white`
                        : 'border-transparent text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                    {tab.id === 'molecular' && Object.keys(molecularInsights).length > 0 && (
                      <span className={`ml-2 w-2 h-2 bg-${tab.color}-500 rounded-full animate-pulse`}></span>
                    )}
                    {tab.id === 'therapeutic' && Object.keys(therapeuticInsights).length > 0 && (
                      <span className={`ml-2 w-2 h-2 bg-${tab.color}-500 rounded-full animate-pulse`}></span>
                    )}
                    {tab.id === 'trials' && Object.keys(trialInsights).length > 0 && (
                      <span className={`ml-2 w-2 h-2 bg-${tab.color}-500 rounded-full animate-pulse`}></span>
                    )}
                    {tab.id === 'care' && Object.keys(careInsights).length > 0 && (
                      <span className={`ml-2 w-2 h-2 bg-${tab.color}-500 rounded-full animate-pulse`}></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            {/* Tab Content */}
            <div className="p-6 overflow-y-auto h-[calc(100%-60px)]">
              <AnimatePresence mode="wait">
                {/* Molecular Profile Tab */}
                {activeTab === 'molecular' && (
                  <motion.div
                    key="molecular"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                        <Brain className="w-6 h-6 mr-3 text-blue-600" />
                        Molecular Profile
                      </h2>
                      <div className="text-sm text-slate-600">
                        {Object.keys(molecularInsights).length} insights generated
                      </div>
                    </div>

                    {/* SAE Intelligence Component */}
                    <SAEIntelligence data={molecularInsights} />

                    {/* Biomarker Data Visualization */}
                    {molecularInsights.biomarkers && (
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(molecularInsights.biomarkers).map(([key, value]: [string, any]) => (
                          <div key={key} className="bg-white p-4 rounded-lg border border-slate-200">
                            <div className="text-sm font-semibold text-slate-800 uppercase mb-2">{key}</div>
                            <div className="text-lg font-bold text-blue-600">
                              {typeof value === 'object' ? value.value || value.status || value.score : value}
                            </div>
                            {value.confidence && (
                              <div className="text-xs text-slate-600 mt-1">
                                Confidence: {(value.confidence * 100).toFixed(1)}%
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Resistance Analysis */}
                    {molecularInsights.resistance && (
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Resistance Analysis</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(molecularInsights.resistance).map(([gene, data]: [string, any]) => (
                            <div key={gene} className="p-3 bg-slate-50 rounded border">
                              <div className="font-medium text-slate-800">{gene.toUpperCase()}</div>
                              <div className="text-sm text-slate-600">
                                {data.mutation && `${data.mutation} → `}
                                {data.resistance || data.pathway || `${data.sensitivity}% sensitivity`}
                              </div>
                              {data.confidence && (
                                <div className="text-xs text-slate-500 mt-1">
                                  {(data.confidence * 100).toFixed(1)}% confidence
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Therapeutic Options Tab */}
                {activeTab === 'therapeutic' && (
                  <motion.div
                    key="therapeutic"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                        <Target className="w-6 h-6 mr-3 text-green-600" />
                        Therapeutic Options
                      </h2>
                      <div className="text-sm text-slate-600">
                        {therapeuticInsights.drugRankings?.length || 0} drugs ranked
                      </div>
                    </div>

                    {/* Drug Rankings */}
                    {therapeuticInsights.drugRankings && (
                      <div className="space-y-4">
                        {therapeuticInsights.drugRankings.map((drug: any, index: number) => (
                          <div key={drug.name} className="bg-white p-6 rounded-lg border border-slate-200">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                                  drug.tier === 'I' ? 'bg-green-100 text-green-600' :
                                  drug.tier === 'II' ? 'bg-yellow-100 text-yellow-600' :
                                  'bg-red-100 text-red-600'
                                }`}>
                                  {drug.tier}
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-slate-800">{drug.name}</h3>
                                  <p className="text-sm text-slate-600">{drug.type} • {drug.mechanism}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-green-600">
                                  {(drug.confidence * 100).toFixed(0)}%
                                </div>
                                <div className="text-sm text-slate-600">Confidence</div>
                              </div>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${drug.confidence * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Nutrition Plan */}
                    {therapeuticInsights.nutrition && (
                      <div className="bg-white p-6 rounded-lg border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                          <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                            🥗
                          </span>
                          Toxicity-Aware Nutrition Plan
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {therapeuticInsights.nutrition.map((item: any, index: number) => (
                            <div key={index} className="flex items-start p-3 bg-slate-50 rounded border">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                              <div>
                                <div className="font-medium text-slate-800">{item.name}</div>
                                <div className="text-sm text-slate-600">{item.dose} • {item.timing}</div>
                                <div className="text-xs text-slate-500 mt-1">{item.purpose}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Clinical Trials Tab */}
                {activeTab === 'trials' && (
                  <motion.div
                    key="trials"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                        <Stethoscope className="w-6 h-6 mr-3 text-purple-600" />
                        Clinical Trials
                      </h2>
                      <div className="text-sm text-slate-600">
                        {trialInsights.trials?.length || 0} trials matched
                      </div>
                    </div>

                    <ClinicalTrial data={trialInsights} />

                    {/* Trial Summary */}
                    {trialInsights.summary && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
                          <div className="text-2xl font-bold text-purple-600">{trialInsights.summary.totalMatches}</div>
                          <div className="text-sm text-slate-600">Total Matches</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
                          <div className="text-2xl font-bold text-green-600">{trialInsights.summary.highFit}</div>
                          <div className="text-sm text-slate-600">High Fit (90%+)</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
                          <div className="text-2xl font-bold text-blue-600">{trialInsights.summary.within50Miles}</div>
                          <div className="text-sm text-slate-600">Within 50 Miles</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
                          <div className="text-2xl font-bold text-orange-600">
                            {trialInsights.trials?.filter((t: any) => t.status === 'Recruiting').length || 0}
                          </div>
                          <div className="text-sm text-slate-600">Actively Recruiting</div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Care Plan Tab */}
                {activeTab === 'care' && (
                  <motion.div
                    key="care"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                        <FileText className="w-6 h-6 mr-3 text-teal-600" />
                        Unified Care Plan
                      </h2>
                      <div className="text-sm text-slate-600">
                        {isComplete ? 'Complete' : 'Generating...'}
                      </div>
                    </div>

                    <ExecutiveSummary data={careInsights} />

                    {/* Care Plan Details */}
                    {careInsights.carePlan && (
                      <div className="bg-white p-6 rounded-lg border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Complete Care Orchestration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-slate-800 mb-2">Patient Information</h4>
                            <div className="space-y-2 text-sm">
                              <div><span className="font-medium">Patient:</span> {careInsights.carePlan.patient}</div>
                              <div><span className="font-medium">Diagnosis:</span> {careInsights.carePlan.diagnosis}</div>
                              <div><span className="font-medium">Stage:</span> {careInsights.carePlan.stage}</div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-800 mb-2">Recommended Therapy</h4>
                            <div className="text-sm text-slate-700">
                              {careInsights.carePlan.recommendedTherapy}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-800 mb-2">Monitoring Schedule</h4>
                            <div className="space-y-1 text-sm">
                              {Object.entries(careInsights.carePlan.monitoring).map(([test, schedule]) => (
                                <div key={test}>
                                  <span className="font-medium capitalize">{test}:</span> {String(schedule)}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-800 mb-2">Integrated Support</h4>
                            <div className="space-y-1 text-sm">
                              <div>✓ {careInsights.carePlan.nutrition}</div>
                              <div>✓ {careInsights.carePlan.clinicalTrials}</div>
                              <div>✓ {careInsights.carePlan.nextSteps}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
