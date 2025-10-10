'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Shield, 
  Target, 
  Users, 
  CheckCircle, 
  AlertTriangle,
  ExternalLink,
  Search,
  Brain,
  Zap,
  Award,
  FlaskConical,
  Dna,
  BarChart3,
  Network,
  BookOpen,
  Activity,
  TrendingDown,
  Layers,
  Code,
  Eye,
  Database,
  Microscope,
  Settings,
  Play,
  Pause
} from 'lucide-react';
import { SimulationResults } from '../core/APISimulationEngine';
import { SAEFeatureVisualization } from '@/components/evidence/SAEFeatureVisualization';
import CohortContextSimulator from '@/components/evidence/interactive/CohortContextSimulator';
import DataLabExplorer from '@/components/evidence/interactive/DataLabExplorer';
import TabbedInterface from '@/components/shared/TabbedInterface';
import ExecutiveSummary from '@/components/dossier/ExecutiveSummary';
import SAEIntelligence from '@/components/dossier/SAEIntelligence';
import SPEFusion from '@/components/dossier/SPEFusion';
import CohortContext from '@/components/dossier/CohortContext';
import DataLab from '@/components/dossier/DataLab';
import ClinicalTrial from '@/components/dossier/ClinicalTrial';
import { sampleBRCA1Dossier } from '@/data/dossier/sample-brca1-dossier';
import type { TabItem } from '@/components/shared/TabbedInterface';

interface ClinicalDossierProps {
  results: SimulationResults;
  patientProfile: {
    variant: string;
    gene: string;
    classification: string;
    confidence: number;
  };
  className?: string;
}

// Enhanced SAE Features for the specific variant
const variantSAEFeatures = [
  {
    id: 'f_102',
    label: 'Exon Boundary',
    type: 'exon' as const,
    position: 43044290,
    strength: 0.89,
    description: 'Critical exon-intron junction disrupted by variant',
    deltaLL: -12.5,
    biologicalImpact: 'Splicing disruption leads to protein truncation'
  },
  {
    id: 'f_211',
    label: 'TF Motif (AP-1)',
    type: 'tfbs' as const,
    position: 43044310,
    strength: 0.76,
    description: 'Transcription factor binding site affected',
    deltaLL: -8.2,
    biologicalImpact: 'Reduced transcriptional regulation'
  },
  {
    id: 'f_156',
    label: 'Protein Structure',
    type: 'structure' as const,
    position: 43044350,
    strength: 0.92,
    description: 'Alpha-helix formation region disrupted',
    deltaLL: -6.1,
    biologicalImpact: 'Protein folding instability'
  },
  {
    id: 'f_089',
    label: 'Splice Site',
    type: 'motif' as const,
    position: 43044400,
    strength: 0.67,
    description: 'Canonical splice acceptor site altered',
    deltaLL: -4.3,
    biologicalImpact: 'Alternative splicing activation'
  }
];

// S/P/E Fusion Analysis Results
const speFusionResults = {
  sequence: {
    deltaThreshold: -3.2,
    contextWindow: 8192,
    multiScaleConsistency: 0.85,
    hotspotAware: true
  },
  pathway: {
    topPathways: [
      { name: 'DNA Repair (BRCA)', weight: 0.87, moa: 'PARP inhibitor target' },
      { name: 'Cell Cycle Control', weight: 0.64, moa: 'CDK4/6 inhibitor synergy' },
      { name: 'Apoptosis Regulation', weight: 0.52, moa: 'BCL-2 inhibitor potential' }
    ],
    rasMapkCoverage: 0.95,
    tp53Cooperation: 0.25,
    pathwayAccuracy: 0.89
  },
  evidence: {
    clinvarAUROC: 0.957,
    splicevardbAUROC: 0.826,
    tierPromotions: '10-20%',
    citationCount: 23,
    evidenceTier: 'Supported'
  }
};

// Cohort Context Data
const brca1CohortData = {
  id: 'brca1-cohort',
  name: 'BRCA1+ Breast Cancer Patients',
  population: 'Hereditary Breast Cancer',
  size: 2847,
  demographics: {
    avgAge: 52,
    genderSplit: { male: 2, female: 98 },
    ethnicity: { 'Caucasian': 72, 'Hispanic': 15, 'African American': 8, 'Asian': 5 }
  },
  geneticProfile: {
    variantFrequency: 0.34,
    pathogenicVariants: 156,
    vusCount: 89
  },
  clinicalOutcomes: {
    responseRate: 0.78,
    progressionFreeMonths: 24.3,
    overallSurvivalMonths: 67.8
  },
  biomarkers: ['BRCA1/2 mutations', 'Homologous recombination deficiency', 'PARP inhibitor sensitivity'],
  therapeuticRecommendations: ['PARP inhibitors', 'Platinum-based chemotherapy', 'CDK4/6 inhibitors'],
  riskStratification: 'high' as const
};

const ClinicalDossier: React.FC<ClinicalDossierProps> = ({
  results,
  patientProfile,
  className = ''
}) => {
  const dossier = sampleBRCA1Dossier; // Use the structured, real data
  const [activeSection, setActiveSection] = useState('overview');
  
  // Generate Run ID for audit trail
  const runId = `CRP-${Date.now().toString().slice(-8)}`;

  // Create tabs configuration for TabbedInterface
  const tabs: TabItem[] = [
    {
      id: 'overview',
      label: 'Executive Summary',
      icon: Shield,
      content: <ExecutiveSummary data={dossier.executiveSummary} />
    },
    {
      id: 'sae-analysis',
      label: 'SAE Intelligence',
      icon: Brain,
      content: <SAEIntelligence data={dossier.saeIntelligence} />
    },
    {
      id: 'spe-fusion',
      label: 'S/P/E Fusion',
      icon: Network,
      content: <SPEFusion data={dossier.speFusion} />
    },
    {
      id: 'cohort-context',
      label: 'Cohort Context',
      icon: Users,
      content: <CohortContext data={dossier.cohortContext} />
    },
    {
      id: 'data-lab',
      label: 'Data Lab Evidence',
      icon: Database,
      content: <DataLab data={dossier.dataLab} />
    },
    {
      id: 'clinical-match',
      label: 'Clinical Trials',
      icon: Target,
      content: <ClinicalTrial data={dossier.clinicalTrials} />
    }
  ];

  return (
    <div className={`clinical-dossier bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col ${className}`}>
      {/* Dossier Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white p-4 sm:p-8 flex-shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-3xl font-bold mb-2 flex items-center gap-3">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="hidden sm:inline">Target Validation Dossier</span>
              <span className="sm:hidden">Dossier</span>
            </h2>
            <div className="space-y-1">
              <div className="text-lg sm:text-2xl font-bold text-blue-300 font-mono break-all">
                {dossier.header.gene}:{dossier.header.variant}
              </div>
              <div className="text-sm sm:text-lg text-slate-200">
                <span className="hidden sm:inline">Multi-Engine Intelligence Analysis • </span>Run ID: {runId}
              </div>
              <div className="text-xs sm:text-sm text-slate-300">
                {dossier.header.engines.join(' + ')} • {dossier.header.precision * 100}% AUROC
              </div>
            </div>
          </div>
          
          <div className="text-left sm:text-right">
            <div className="text-xs sm:text-sm text-slate-300">Analysis Complete</div>
            <div className="text-sm sm:text-lg font-mono text-blue-300 break-all">{runId}</div>
            <div className="text-xs sm:text-sm text-slate-300 mt-1 sm:mt-2">
              {tabs.length} Intelligence Layers
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-slate-50 border-r border-slate-200 flex-shrink-0">
          <div className="p-6">
            <div className="text-center mb-6 pb-4 border-b border-slate-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-slate-800 text-sm">Analysis Sections</span>
              </div>
              <div className="text-xs text-slate-500">Navigate intelligence layers</div>
            </div>

            <nav className="space-y-2">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = activeSection === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id)}
                    className={`w-full group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-white/20' 
                        : 'bg-slate-100 group-hover:bg-slate-200'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium text-sm truncate transition-all ${
                        isActive ? 'text-white' : 'text-slate-700 group-hover:text-slate-900'
                      }`}>
                        {tab.label}
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto" data-scroll-container>
          <div className="p-6">
            {tabs.find(tab => tab.id === activeSection)?.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalDossier;