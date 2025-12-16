'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Database, Shield, Pill, Search, Apple, FileText, Activity, Maximize2, Target, Zap, Heart, CheckCircle, ChevronRight } from 'lucide-react';
import IntelligenceCascadeModal from './IntelligenceCascadeModal';
import SAEIntelligence from '@/components/dossier/SAEIntelligence';
import ClinicalTrial from '@/components/dossier/ClinicalTrial';

interface AgentStatus {
  dataExtractor: 'idle' | 'processing' | 'complete';
  biomarkerCalculator: 'idle' | 'processing' | 'complete';
  resistancePredictor: 'idle' | 'processing' | 'complete';
  drugRanker: 'idle' | 'processing' | 'complete';
  trialMatcher: 'idle' | 'processing' | 'complete';
  nutritionist: 'idle' | 'processing' | 'complete';
  carePlanner: 'idle' | 'processing' | 'complete';
  monitor: 'idle' | 'processing' | 'complete';
}

interface LiveInsight {
  id: string;
  text: string;
  timestamp: Date;
  type: 'mutation' | 'prediction' | 'trial' | 'nutrition';
}

interface MonitorStatus {
  ca125: { status: 'active' | 'inactive'; lastCheck: Date; value?: number };
  ctdna: { status: 'active' | 'inactive'; lastCheck: Date; mutations?: string[] };
  imaging: { status: 'active' | 'inactive'; lastCheck: Date; findings?: string };
  labs: { status: 'active' | 'inactive'; lastCheck: Date; results?: any };
}

interface CapabilityCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  capabilities: string[];
  metrics: string[];
  component?: React.ComponentType<any>;
  data?: any;
}

interface AgentSwarmDashboardProps {
  className?: string;
  patientId?: string;
}

const agentIcons = {
  dataExtractor: Database,
  biomarkerCalculator: Brain,
  resistancePredictor: Shield,
  drugRanker: Pill,
  trialMatcher: Search,
  nutritionist: Apple,
  carePlanner: FileText,
  monitor: Activity,
};

const agentLabels = {
  dataExtractor: 'Data Extraction',
  biomarkerCalculator: 'Biomarker Analysis',
  resistancePredictor: 'Resistance Prediction',
  drugRanker: 'Drug Ranking',
  trialMatcher: 'Trial Matching',
  nutritionist: 'Nutrition Planning',
  carePlanner: 'Care Plan Generation',
  monitor: 'Continuous Monitoring',
};

// Product capability cards - what users actually get
const capabilityCards: CapabilityCard[] = [
  {
    id: 'molecular',
    title: 'Molecular Intelligence',
    description: 'Zero-shot variant interpretation with Evo2 foundation model. Instantly resolves variants of unknown significance.',
    icon: Brain,
    color: 'blue',
    capabilities: ['95.7% AUROC', '73% VUS Resolution', 'Same-Day Decisions'],
    metrics: ['ClinVar SOTA', 'BRCA1 94% AUROC', 'Cross-species validation'],
    component: SAEIntelligence,
    data: {}
  },
  {
    id: 'therapeutic',
    title: 'Therapeutic Options',
    description: 'Evidence-backed drug recommendations with 70-85% confidence. Every drug shows WHY it works.',
    icon: Target,
    color: 'green',
    capabilities: ['70-85% Confidence', 'Evidence Tiers', 'Resistance Prevention'],
    metrics: ['S/P/E Framework', 'Toxicity Prevention', 'Line Sequencing'],
    data: {}
  },
  {
    id: 'trials',
    title: 'Clinical Trials',
    description: 'AI-powered trial matching with 96.6% accuracy. Transparent eligibility reasoning with green/yellow/red flags.',
    icon: Search,
    color: 'purple',
    capabilities: ['96.6% Match Accuracy', 'Transparent Reasoning', 'Action-Ready Dossiers'],
    metrics: ['Mechanism-based', 'Eligibility Flags', 'Contact Lists'],
    component: ClinicalTrial,
    data: {}
  },
  {
    id: 'care',
    title: 'Unified Care Plans',
    description: 'Single API endpoint integrating drugs, trials, food/supplements, and monitoring in one actionable output.',
    icon: Heart,
    color: 'teal',
    capabilities: ['Holistic Integration', 'Regulatory-Ready', 'Same-Day Tumor Board'],
    metrics: ['Complete Orchestration', 'Evidence-Based', 'Clinician-Ready'],
    data: {}
  }
];

const processingPhases = [
  { id: 'dataExtractor', label: '📥 Data Extraction', duration: 2000 },
  { id: 'biomarkerCalculator', label: '🧬 Biomarker Calculation', duration: 3000 },
  { id: 'resistancePredictor', label: '⚔️ Resistance Analysis', duration: 2500 },
  { id: 'drugRanker', label: '💊 Drug Ranking', duration: 4000 },
  { id: 'trialMatcher', label: '🔬 Trial Matching', duration: 3500 },
  { id: 'nutritionist', label: '🥗 Nutrition Planning', duration: 2000 },
  { id: 'carePlanner', label: '📋 Care Plan Generation', duration: 5000 },
];

export default function AgentSwarmDashboard({ className = '', patientId = 'AK' }: AgentSwarmDashboardProps) {
  const [showCascadeModal, setShowCascadeModal] = useState(false); // Only open on button click
  const [agentStatus, setAgentStatus] = useState<AgentStatus>({
    dataExtractor: 'idle',
    biomarkerCalculator: 'idle',
    resistancePredictor: 'idle',
    drugRanker: 'idle',
    trialMatcher: 'idle',
    nutritionist: 'idle',
    carePlanner: 'idle',
    monitor: 'idle',
  });

  const [currentPhase, setCurrentPhase] = useState<number>(-1);
  const [liveInsights, setLiveInsights] = useState<LiveInsight[]>([]);
  const [selectedCapability, setSelectedCapability] = useState<string | null>(null);

  // Rich insight data for capability components
  const [molecularData, setMolecularData] = useState<any>({});
  const [therapeuticData, setTherapeuticData] = useState<any>({});
  const [trialData, setTrialData] = useState<any>({});

  const [monitors, setMonitors] = useState<MonitorStatus>({
    ca125: { status: 'active', lastCheck: new Date(Date.now() - 2 * 60 * 60 * 1000) }, // 2 hours ago
    ctdna: { status: 'active', lastCheck: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // 1 day ago
    imaging: { status: 'inactive', lastCheck: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // 1 week ago
    labs: { status: 'active', lastCheck: new Date(Date.now() - 6 * 60 * 60 * 1000) }, // 6 hours ago
  });

  // Simulate agent activation sequence
  useEffect(() => {
    const startAgents = async () => {
      // Start with data extraction
      setAgentStatus(prev => ({ ...prev, dataExtractor: 'processing' }));
      setCurrentPhase(0);

      // Add initial insight
      setLiveInsights(prev => [...prev, {
        id: '1',
        text: 'Patient data uploaded successfully',
        timestamp: new Date(),
        type: 'mutation'
      }]);

      // Simulate processing sequence
      for (let i = 0; i < processingPhases.length; i++) {
        const phase = processingPhases[i];
        const duration = phase.duration;

        await new Promise(resolve => setTimeout(resolve, duration));

        setAgentStatus(prev => ({
          ...prev,
          [phase.id]: 'complete',
          ...(i + 1 < processingPhases.length ? { [processingPhases[i + 1].id]: 'processing' } : {})
        }));

        setCurrentPhase(i + 1);

        // Add insights and populate capability data based on phase
        const insights = [
          'MBD4 mutation detected (BER deficiency)',
          'TP53 mutant confirmed (p.R175H)',
          'PARP sensitivity predicted (94% confidence)',
          '3 matching clinical trials found',
          'Platinum resistance risk: 14.5%',
          'Toxicity-aware nutrition plan ready',
          'Complete unified care plan generated'
        ];

        if (insights[i]) {
          setLiveInsights(prev => [...prev, {
            id: (prev.length + 1).toString(),
            text: insights[i],
            timestamp: new Date(),
            type: i < 2 ? 'mutation' : i < 4 ? 'prediction' : i < 6 ? 'trial' : 'nutrition'
          }]);
        }

        // Populate capability data based on phase
        switch (phase.id) {
          case 'biomarkerCalculator':
            setMolecularData({
              biomarkers: {
                tmb: { value: 12.3, status: 'TMB-High', confidence: 0.967 },
                msi: { status: 'MSS', confidence: 0.942 },
                hrd: { score: 42, status: 'Suggestive', confidence: 0.823 },
                ioEligibility: { status: 'Candidate', reason: 'TMB-High' }
              },
              resistance: {
                kras: { mutation: 'G12D', resistance: 'EGFR', confidence: 0.891 },
                pik3ca: { mutation: 'H1047R', pathway: 'mTOR', confidence: 0.734 },
                platinum: { sensitivity: 78, status: 'Favorable' },
                mapk: { status: 'Wild-type', prognosis: 'Good' }
              },
              dataProcessed: {
                ngsFiles: 1,
                clinicalNotes: 3,
                pathologyReports: 1,
                totalDataPoints: 1250
              }
            });
            break;
          case 'drugRanker':
            setTherapeuticData({
              drugRankings: [
                { name: 'Olaparib', type: 'PARP', confidence: 0.94, tier: 'I', mechanism: 'DDR targeting' },
                { name: 'Carboplatin', type: 'Platinum', confidence: 0.88, tier: 'I', mechanism: 'DNA cross-linking' },
                { name: 'Niraparib', type: 'PARP', confidence: 0.91, tier: 'I', mechanism: 'DDR targeting' },
                { name: 'Pembrolizumab', type: 'IO', confidence: 0.76, tier: 'II', mechanism: 'PD-1 blockade' },
                { name: 'Trametinib', type: 'MEK', confidence: 0.45, tier: 'III', mechanism: 'MAPK inhibition' }
              ]
            });
            break;
          case 'trialMatcher':
            setTrialData({
              trials: [
                { nct: 'NCT05678901', title: 'PARP + ATR in DDR Deficient OC', fit: 0.94, status: 'Recruiting' },
                { nct: 'NCT04729387', title: 'Olaparib + Cediranib', fit: 0.88, status: 'Recruiting' },
                { nct: 'NCT03824704', title: 'Maintenance Olaparib', fit: 0.91, status: 'Active' }
              ],
              summary: { totalMatches: 3, highFit: 2, within50Miles: 2 }
            });
            break;
        }
      }

      // Activate continuous monitoring
      setAgentStatus(prev => ({ ...prev, monitor: 'processing' }));
    };

    // Start the sequence after a brief delay
    const timer = setTimeout(startAgents, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'complete': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing': return '🔄';
      case 'complete': return '✅';
      default: return '⏳';
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden ${className}`}>
      {/* Minimal Visual - Modal auto-opens, no text dump */}
      {!showCascadeModal && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-12">
          <div className="flex flex-col items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mb-4"
            >
              <Brain className="w-16 h-16" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold mb-2">Intelligence Cascade Loading...</h2>
              <p className="text-blue-100">Preparing autonomous oncology orchestration</p>
            </motion.div>
          </div>
        </div>
      )}

      {/* Intelligence Cascade Modal - Main Experience */}
      <IntelligenceCascadeModal
        isOpen={showCascadeModal}
        onClose={() => setShowCascadeModal(false)}
        patientId={patientId}
      />
    </div>
  );
}
