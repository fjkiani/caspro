'use client';

import React, { useState } from 'react';
import { 
  Database, Target, Search, Dna, CheckCircle, 
  FileText, TrendingUp
} from 'lucide-react';
import WorkflowStep from './WorkflowStep';
import PipelineControls from './PipelineControls';
import PipelineHeader from './PipelineHeader';
import RUODisclaimer from './RUODisclaimer';

interface WorkflowStepData {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: 'blue' | 'teal' | 'indigo' | 'purple' | 'green' | 'red';
  details: string[];
  outputs: string[];
}

const workflowSteps: WorkflowStepData[] = [
  {
    id: 1,
    title: 'Problem Framing & Data Curation',
    description: 'Assemble genomic loci, clinical variants, DMS datasets, and assay priors',
    icon: Database,
    color: 'blue',
    details: [
      'Genomic loci identification',
      'Clinical variant collection',
      'DMS dataset integration',
      'Assay prior establishment'
    ],
    outputs: ['Curated dataset', 'Problem statement', 'Success criteria']
  },
  {
    id: 2,
    title: 'Target Assessment (Discriminative)',
    description: 'Score disease-relevant variants with CrisPRO.ai ΔLL and specialist ensemble',
    icon: Target,
    color: 'teal',
    details: [
      'CrisPRO.ai zero-shot ΔLL scoring (8,192 bp context)',
      'AlphaMissense/GPN-MSA ensemble',
      'Noncoding and splice variant analysis',
      'Confidence score generation'
    ],
    outputs: ['Variant scores', 'Confidence metrics', 'Evidence tiers']
  },
  {
    id: 3,
    title: 'Mechanistic Triage & Hypothesis',
    description: 'Use CrisPRO.ai embeddings for exon/intron features and region ranking',
    icon: Search,
    color: 'indigo',
    details: [
      'CrisPRO.ai embedding analysis',
      'Exon/intron classification',
      'Motif feature extraction',
      'Perturbation region ranking'
    ],
    outputs: ['Mechanistic insights', 'Hypothesis ranking', 'Feature importance']
  },
  {
    id: 4,
    title: 'Design (Generative)',
    description: 'CrisPRO.ai sequence proposals with epigenomic guidance and structural validation',
    icon: Dna,
    color: 'purple',
    details: [
      'CrisPRO.ai sequence generation',
      'Enformer+Borzoi epigenomic guidance',
      'AlphaFold 3 structural validation',
      'Sequence naturalness screening'
    ],
    outputs: ['Design candidates', 'Structural models', 'Epigenomic scores']
  },
  {
    id: 5,
    title: 'In-Silico Validation',
    description: 'Aggregate scores and prioritize designs for wet-lab validation',
    icon: CheckCircle,
    color: 'green',
    details: [
      'ΔLL score aggregation',
      'Splice and regulatory AUROC',
      'Structure metrics (pLDDT/PAE)',
      'Pfam hit analysis'
    ],
    outputs: ['Validation scores', 'Priority ranking', 'Minipool candidates']
  },
  {
    id: 6,
    title: 'Feedback & Calibration',
    description: 'Fit supervised heads and calibrate by cohort for continuous improvement',
    icon: TrendingUp,
    color: 'red',
    details: [
      'Lightweight supervised head training',
      'CrisPRO.ai embedding calibration',
      'Cohort-specific adjustment',
      'Platt/isotonic calibration'
    ],
    outputs: ['Calibrated models', 'Performance metrics', 'Updated thresholds']
  },
  {
    id: 7,
    title: 'Reporting & Provenance',
    description: 'Generate evidence reports with traceable citations and audit trails',
    icon: FileText,
    color: 'blue',
    details: [
      'Evidence report generation',
      'Traceable citation linking',
      'Audit trail documentation',
      'RUO compliance verification'
    ],
    outputs: ['Final report', 'Provenance log', 'Compliance certificate']
  }
];

const TherapeuticPipeline: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);


  const runPipeline = () => {
    setIsRunning(true);
    setCurrentStep(0);
    setCompletedSteps([]);
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < workflowSteps.length - 1) {
          setCompletedSteps(prevCompleted => [...prevCompleted, prev]);
          return prev + 1;
        } else {
          setCompletedSteps(prevCompleted => [...prevCompleted, prev]);
          setIsRunning(false);
          clearInterval(interval);
          return prev;
        }
      });
    }, 2000);
  };

  const resetPipeline = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <PipelineHeader
        title="Fusion Workflow: End-to-End Therapeutic Pipeline"
        description="Complete RUO workflow combining discriminative and generative AI for therapeutic discovery, from problem framing to validated designs ready for wet-lab validation."
      >
        <PipelineControls
          isRunning={isRunning}
          onRun={runPipeline}
          onReset={resetPipeline}
        />
      </PipelineHeader>

      {/* Pipeline Steps */}
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 hidden lg:block"></div>
        
        <div className="space-y-8">
          {workflowSteps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = completedSteps.includes(index);
            
            return (
              <WorkflowStep
                key={step.id}
                step={step}
                isActive={isActive}
                isCompleted={isCompleted}
                index={index}
              />
            );
          })}
        </div>
      </div>

      <RUODisclaimer />
    </div>
  );
};

export default TherapeuticPipeline;
