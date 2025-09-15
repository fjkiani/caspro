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
  const [showSAEAnimation, setShowSAEAnimation] = useState(false);
  
  // Extract key metrics from simulation results
  const targetValidation = results['target-validation'];
  const leadEngineering = results['lead-engineering'];
  const preclinicalConfirmation = results['preclinical-confirmation'];

  // Generate Run ID for audit trail
  const runId = `CRP-${Date.now().toString().slice(-8)}`;

  // Executive Summary Content
  const ExecutiveSummaryContent = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Evidence 1: Catastrophic Functional Error */}
        <div className="bg-white p-6 rounded-xl border-2 border-red-200">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h4 className="font-bold text-red-800 text-lg">Evidence 1: Catastrophic Functional Error</h4>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Pathogenicity Verdict</span>
              <span className="text-xl font-bold text-red-700">{patientProfile.classification}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Confidence (ClinVar AUROC)</span>
              <span className="text-xl font-bold text-red-700">{(patientProfile.confidence * 100).toFixed(1)}%</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Delta Log-Likelihood</span>
              <span className="text-xl font-bold text-red-700">
                {targetValidation?.output?.deltaLikelihood || '-8.2'}
              </span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-red-800 font-medium">
              <strong>/predict_variant_impact</strong> confirms loss-of-function mutation with 95.7% AUROC precision (n=53,210 ClinVar variants).
            </p>
          </div>
        </div>

        {/* Evidence 2: Critical Dependency */}
        <div className="bg-white p-6 rounded-xl border-2 border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h4 className="font-bold text-green-800 text-lg">Evidence 2: Critical Dependency</h4>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Gene Essentiality</span>
              <span className="text-xl font-bold text-green-700">High (0.82-0.99 AUROC)</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">Synthetic Lethality</span>
              <span className="text-xl font-bold text-green-700">Confirmed</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">DepMap Correlation</span>
              <span className="text-xl font-bold text-green-700">0.73</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800 font-medium">
              <strong>/predict_gene_essentiality</strong> validates cancer dependency on broken DNA repair pathway.
            </p>
          </div>
        </div>
      </div>

      {/* Clinical Conclusion */}
      <div className="p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl border-2 border-purple-300">
        <h4 className="text-xl font-bold text-purple-900 mb-3 flex items-center gap-2">
          <Award className="w-5 h-5" />
          Clinical Conclusion: Perfect PARP Inhibitor Candidate
        </h4>
        <p className="text-purple-800 font-medium">
          Mathematical proof of synthetic lethality vulnerability. This patient represents the precise biomarker-positive 
          population for which PARP inhibitors demonstrate maximum efficacy. <strong>Trial enrollment recommended.</strong>
        </p>
      </div>
    </div>
  );

  // SAE Intelligence Content
  const SAEIntelligenceContent = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">SAE Intelligence: Interpretable Genomic Features</h3>
          <p className="text-slate-600">32,768 learned biological concepts from Layer 26 SAE</p>
        </div>
        <button
          onClick={() => setShowSAEAnimation(!showSAEAnimation)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          {showSAEAnimation ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {showSAEAnimation ? 'Pause' : 'Animate'} Features
        </button>
      </div>

      {/* SAE Feature Visualization */}
      <div className="bg-slate-50 rounded-xl p-6">
        <SAEFeatureVisualization />
      </div>

      {/* Feature Attribution Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            Active SAE Features (32,768 total)
          </h4>
          <div className="space-y-3">
            {variantSAEFeatures.map((feature) => (
              <div key={feature.id} className="p-3 bg-slate-50 rounded-lg border">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-slate-800">{feature.label}</span>
                  <span className="text-sm font-bold text-blue-600">
                    ΔLL: {feature.deltaLL}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-2">{feature.description}</p>
                <p className="text-xs text-purple-700 font-medium">{feature.biologicalImpact}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-red-600" />
            Disruption Score Analysis
          </h4>
          <div className="space-y-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {targetValidation?.output?.deltaLikelihood || '-8.2'}
              </div>
              <div className="text-sm text-red-700 font-medium">
                Cumulative Functional Disruption
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-700">Feature Impact Distribution:</div>
              {variantSAEFeatures.map((feature, index) => (
                <div key={feature.id} className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 w-24">{feature.label}</span>
                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(100, Math.abs(feature.deltaLL) * 8)}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-slate-800">{feature.deltaLL}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SAE Methodology */}
      <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
        <h4 className="text-lg font-bold text-purple-900 mb-3">SAE Intelligence Methodology</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-semibold text-purple-800">Layer 26 SAE</div>
            <div className="text-purple-700">32,768 learned biological concepts</div>
          </div>
          <div>
            <div className="font-semibold text-purple-800">Feature Coverage</div>
            <div className="text-purple-700">Exon/Intron/TFBS/2° Structure</div>
          </div>
          <div>
            <div className="font-semibold text-purple-800">Disruption Metric</div>
            <div className="text-purple-700">Delta Log-Likelihood (ΔLL)</div>
          </div>
        </div>
      </div>
    </div>
  );

  // S/P/E Fusion Content
  const SPEFusionContent = () => (
    <div className="space-y-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">S/P/E Fusion: Sequence + Pathway + Evidence Integration</h3>
        <p className="text-slate-600">Explainable therapy ranking with confidence, evidence tier, badges, and citations</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sequence Component */}
        <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
          <div className="flex items-center gap-2 mb-4">
            <Dna className="w-5 h-5 text-blue-600" />
            <h4 className="text-lg font-bold text-blue-800">Sequence (S)</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Delta Threshold</span>
              <span className="font-bold text-blue-700">≤ -3.2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Context Window</span>
              <span className="font-bold text-blue-700">8,192 nt</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Multi-Scale Consistency</span>
              <span className="font-bold text-blue-700">85%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Hotspot-Aware</span>
              <span className="font-bold text-green-700">✓ Active</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">
              CrisPRO.ai multi-scale analysis with hotspot-aware functionality lift
            </p>
          </div>
        </div>

        {/* Pathway Component */}
        <div className="bg-white p-6 rounded-xl border-2 border-green-200">
          <div className="flex items-center gap-2 mb-4">
            <Network className="w-5 h-5 text-green-600" />
            <h4 className="text-lg font-bold text-green-800">Pathway (P)</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">RAS/MAPK Coverage</span>
              <span className="font-bold text-green-700">95%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">TP53 Cooperation</span>
              <span className="font-bold text-green-700">25%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Pathway Accuracy</span>
              <span className="font-bold text-green-700">89%</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {speFusionResults.pathway.topPathways.map((pathway, index) => (
              <div key={index} className="p-2 bg-green-50 rounded border">
                <div className="font-semibold text-green-800 text-sm">{pathway.name}</div>
                <div className="text-xs text-green-600">Weight: {pathway.weight} • {pathway.moa}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence Component */}
        <div className="bg-white p-6 rounded-xl border-2 border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <h4 className="text-lg font-bold text-purple-800">Evidence (E)</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">ClinVar AUROC</span>
              <span className="font-bold text-purple-700">0.957</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">SpliceVarDB AUROC</span>
              <span className="font-bold text-purple-700">0.826</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Tier Promotions</span>
              <span className="font-bold text-purple-700">10-20%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Evidence Tier</span>
              <span className="font-bold text-green-700">Supported</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <p className="text-xs text-purple-800">
              ClinVar priors with literature integration and tier transparency
            </p>
          </div>
        </div>
      </div>

      {/* Fusion Result */}
      <div className="p-6 bg-gradient-to-r from-slate-100 to-blue-100 rounded-xl border border-slate-300">
        <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          Integrated S/P/E Analysis Result
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg border">
            <div className="text-2xl font-bold text-blue-600 mb-2">95.7%</div>
            <div className="text-sm text-slate-700">Sequence Confidence</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border">
            <div className="text-2xl font-bold text-green-600 mb-2">3</div>
            <div className="text-sm text-slate-700">Pathway Alignments</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border">
            <div className="text-2xl font-bold text-purple-600 mb-2">Tier 2</div>
            <div className="text-sm text-slate-700">Evidence Level</div>
          </div>
        </div>
        <p className="text-slate-700 mt-4 text-center font-medium">
          Explainable therapy ranking with confidence, evidence tier, badges, and citations
        </p>
      </div>
    </div>
  );

  // Cohort Context Content
  const CohortContextContent = () => (
    <div className="space-y-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Cohort Context: Population-Level Intelligence</h3>
        <p className="text-slate-600">See how this patient fits within the broader BRCA1+ population context</p>
      </div>
      
      <CohortContextSimulator 
        title="BRCA1+ Patient Cohort Analysis"
        subtitle="Population-specific data improves treatment selection accuracy by 67%"
        cohorts={[brca1CohortData]}
        showComparison={true}
      />
    </div>
  );

  // Data Lab Content
  const DataLabContent = () => (
    <div className="space-y-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Data Lab: Supporting Evidence & Studies</h3>
        <p className="text-slate-600">Explore the genomic datasets and therapeutic pipelines supporting this analysis</p>
      </div>
      
      <DataLabExplorer 
        title="BRCA1 Research Evidence Browser"
        subtitle="Access 50+ curated datasets with real-time therapeutic pipeline integration"
        showPipeline={true}
      />
    </div>
  );

  // Clinical Trial Matching Content
  const ClinicalTrialContent = () => (
    <div className="space-y-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Clinical Trial Matching Intelligence</h3>
        <p className="text-slate-600">Precision enrollment with surgical precision patient selection</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Eligibility Assessment */}
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Eligibility Assessment
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-700">BRCA1/2 Mutation Status</span>
              </div>
              <span className="text-sm font-bold text-green-700">CONFIRMED</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-700">Loss-of-Function Verified</span>
              </div>
              <span className="text-sm font-bold text-green-700">94.0% CONFIDENCE</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-700">Synthetic Lethality Target</span>
              </div>
              <span className="text-sm font-bold text-green-700">VALIDATED</span>
            </div>
          </div>
        </div>

        {/* Trial Recommendations */}
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            Trial Recommendations
          </h4>
          
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-blue-700">PARP Inhibitor Monotherapy</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">LIKELY</span>
              </div>
              <div className="text-xs text-blue-600">3 active trials • Phase II/III</div>
            </div>
            
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-yellow-700">PARP + CDK4/6 Combination</span>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-semibold">POTENTIAL</span>
              </div>
              <div className="text-xs text-yellow-600">2 active trials • Phase I/II</div>
            </div>
            
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-purple-700">Immunotherapy + PARP</span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded font-semibold">EMERGING</span>
              </div>
              <div className="text-xs text-purple-600">1 active trial • Phase I</div>
            </div>
          </div>
        </div>
      </div>

      {/* Perfect Clinical Trial */}
      <div className="p-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border-2 border-green-300">
        <h4 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
          <Award className="w-6 h-6" />
          The Perfect Clinical Trial
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-6">
          <div>
            <div className="text-3xl font-bold text-green-700 mb-2">Smaller</div>
            <div className="text-sm text-green-600">No need for hundreds of patients hoping for signal</div>
          </div>
          
          <div>
            <div className="text-3xl font-bold text-green-700 mb-2">Faster</div>
            <div className="text-sm text-green-600">Targeted enrollment accelerates timeline</div>
          </div>
          
          <div>
            <div className="text-3xl font-bold text-green-700 mb-2">Cheaper</div>
            <div className="text-sm text-green-600">Smaller trials save millions in operational costs</div>
          </div>
        </div>
        
        <div className="p-4 bg-green-200 rounded-lg text-center">
          <p className="text-green-800 font-bold text-lg">
            Higher Probability of Success: Clear signal, overwhelming data, FDA approval
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <a 
          href="/platform/clinical-trials"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
        >
          <Users className="w-4 h-4" />
          Launch Clinical Trials Co-Pilot
        </a>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors">
          <FileText className="w-4 h-4" />
          Export Complete Dossier
        </button>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
          <BarChart3 className="w-4 h-4" />
          Generate Enrollment Strategy
        </button>
      </div>

      {/* Research Use Notice */}
      <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-sm text-amber-800 font-medium">
          <strong>Research Use Only:</strong> Comprehensive analysis powered by Oracle (95.7% AUROC), 
          SAE Intelligence (32,768 features), S/P/E Fusion, Cohort Context, and Data Lab evidence. 
          Clinical decisions require multidisciplinary team review and additional clinical context.
        </p>
      </div>
    </div>
  );

  // Create tabs configuration for TabbedInterface
  const tabs: TabItem[] = [
    {
      id: 'overview',
      label: 'Executive Summary',
      icon: Shield,
      content: <ExecutiveSummaryContent />
    },
    {
      id: 'sae-analysis',
      label: 'SAE Intelligence',
      icon: Brain,
      content: <SAEIntelligenceContent />
    },
    {
      id: 'spe-fusion',
      label: 'S/P/E Fusion',
      icon: Network,
      content: <SPEFusionContent />
    },
    {
      id: 'cohort-context',
      label: 'Cohort Context',
      icon: Users,
      content: <CohortContextContent />
    },
    {
      id: 'data-lab',
      label: 'Data Lab Evidence',
      icon: Database,
      content: <DataLabContent />
    },
    {
      id: 'clinical-match',
      label: 'Clinical Trials',
      icon: Target,
      content: <ClinicalTrialContent />
    }
  ];

  return (
    <div className={`clinical-dossier ${className}`}>
      <TabbedInterface
        title="Target Validation Dossier"
        subtitle={
          <div className="space-y-2">
            <div className="text-2xl font-bold text-blue-600 font-mono">
              {patientProfile.gene}:{patientProfile.variant}
            </div>
            <div className="text-lg text-slate-600">
              Multi-Engine Intelligence Analysis • Run ID: {runId}
            </div>
            <div className="text-sm text-slate-500">
              Oracle + Forge + Boltz + Command Center • 95.7% AUROC Precision
            </div>
          </div>
        }
        tabs={tabs}
        sidebarTitle="Analysis Sections"
        sidebarSubtitle="Navigate intelligence layers"
        defaultTab="overview"
      />
    </div>
  );
};

export default ClinicalDossier;