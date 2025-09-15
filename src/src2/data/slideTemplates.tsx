// Slide Templates for Scalable Slide Creation
// This file contains reusable slide templates that accept content as props

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Shield, Bot, UserCheck, Activity } from 'lucide-react';

// Import all reusable components
import ZetaOracleInAction from '../components/deck/slides/ZetaOracleInAction';
import ZetaForgeTwoColumn from '../components/deck/slides/ZetaForgeTwoColumn';
import StructuralGauntlet from '../components/deck/slides/StructuralGauntlet';
import DigitalSynapseBackground from '../components/site/blocks/DigitalSynapseBackground';
import VEPMetrics from '../components/site/blocks/VEPMetrics';
import QCBadges from '../components/site/blocks/QCBadges';
import ClinicalTrialsMatcher from '../components/site/blocks/ClinicalTrialsMatcher';
import PathwayContent from '../components/slides/content/PathwayContent';
import MetricsContent from '../components/slides/content/MetricsContent';
import ListContent from '../components/slides/content/ListContent';
import UseCaseSlideTemplate from '../components/deck/slides/shared/UseCaseSlideTemplate';

// ===== SLIDE TEMPLATE INTERFACES =====

export interface TitleSlideContent {
  title: string;
  subtitle: string;
  description: string;
  tagline: string;
  backgroundGradient?: string;
}

export interface VUSResolutionContent {
  title: string;
  subtitle: string;
  left: {
    title: string;
    value: string;
    subtitle: string;
  };
  right: {
    title: string;
    value: string;
    subtitle: string;
  };
  score: {
    title: string;
    value: string;
  };
  qcBadges: {
    synteny: number;
    pfamHitRate: number;
    dinucKL: number;
  };
}

export interface PathwayAnalysisContent {
  title: string;
  subtitle: string;
  steps: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    status: 'danger' | 'warning' | 'highlight';
    animation: 'pulse' | 'bounce';
  }>;
}

export interface PerformanceMetricsContent {
  title: string;
  subtitle: string;
  benchmarks: Array<{
    dataset: string;
    performance: number;
    description: string;
  }>;
}

export interface ForgeDesignContent {
  title: string;
  subtitle: string;
  input: string;
  mission: string;
  therapies: Array<{
    class: string;
    confidence: number;
    icon: 'Target' | 'Shield' | 'Bot' | 'UserCheck';
  }>;
  advantage: {
    title: string;
    highlight: string;
    description: string;
    infoHeader: string;
    infoText: string;
  };
}

export interface ClinicalTrialsContent {
  title: string;
  subtitle: string;
  trialMatching: {
    title: string;
    workflow: string[];
    output: {
      likely: any[];
      potential: any[];
    };
  };
}

export interface BoltzValidationContent {
  title: string;
  subtitle: string;
  description: string;
  output: {
    title: string;
    text: string;
  };
  simulation: {
    title: string;
    icon: any;
  };
  verdict: {
    title: string;
    result: string;
    confidence: string;
  };
}

export interface EvidenceDoctrineContent {
  title: string;
  subtitle: string;
  transparency: string[];
  methodology: string;
}

export interface CompleteDossierContent {
  title: string;
  subtitle: string;
  metrics: Array<{
    label: string;
    value: string;
    description: string;
    color: string;
  }>;
  components: string[];
}

export interface SPECaseStudyCardsContent {
  title: string;
  subtitle: string;
  components: Array<{
    title: string;
    description: string;
    icon: any;
  }>;
  explanation: {
    title: string;
    description: string;
  };
}

export interface SPECaseStudyJSONContent {
  title: string;
  subtitle: string;
  jsonOutput: string;
  metrics: Array<{
    label: string;
    value: string;
    color: string;
  }>;
  explanations: string[];
}

// ===== REUSABLE SLIDE TEMPLATES =====

export const TitleSlideTemplate = ({ content }: { content: TitleSlideContent }) => (
  <div className="w-full h-full bg-slate-900 relative overflow-hidden">
    <DigitalSynapseBackground />
    <div className="relative z-10 w-full h-full flex items-center justify-center">
      <div className="text-center max-w-6xl mx-auto px-8">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl leading-none tracking-tight mb-8"
        >
          {content.title}
        </motion.h1>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl text-slate-300 mb-6"
        >
          {content.subtitle}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg text-slate-400 mb-8"
        >
          {content.description}
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          className="inline-block bg-slate-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-600"
        >
          <span className="text-cyan-400 font-semibold">{content.tagline}</span>
        </motion.div>
      </div>
    </div>
  </div>
);

export const VUSResolutionTemplate = ({ content }: { content: VUSResolutionContent }) => (
  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900 flex items-center justify-center p-8">
    <div className="max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-white mb-4">{content.title}</h2>
        <p className="text-xl text-slate-300">{content.subtitle}</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ZetaOracleInAction
          left={content.left}
          right={content.right}
          score={content.score}
        />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">Quality Control Indicators</h3>
          <QCBadges 
            synteny={content.qcBadges.synteny}
            pfamHitRate={content.qcBadges.pfamHitRate}
            dinucKL={content.qcBadges.dinucKL}
          />
        </div>
      </motion.div>
    </div>
  </div>
);

export const PathwayAnalysisTemplate = ({ content }: { content: PathwayAnalysisContent }) => (
  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 flex items-center justify-center p-8">
    <div className="max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-white mb-4">{content.title}</h2>
        <p className="text-xl text-slate-300">{content.subtitle}</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <PathwayContent 
          data={{ steps: content.steps }}
          layout="full"
        />
      </motion.div>
    </div>
  </div>
);

export const PerformanceMetricsTemplate = ({ content }: { content: PerformanceMetricsContent }) => (
  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center p-8">
    <div className="max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-white mb-4">{content.title}</h2>
        <p className="text-xl text-slate-300">{content.subtitle}</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <VEPMetrics 
          title="Clinical Evidence Summary"
          byClass={content.benchmarks.map(benchmark => ({
            name: benchmark.dataset,
            auroc: benchmark.performance,
            auprc: undefined
          }))}
        />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <MetricsContent 
          data={{
            title: "Evo2 Validation Benchmarks",
            layout: "dashboard",
            metrics: content.benchmarks.map(benchmark => ({
              label: benchmark.dataset,
              value: `${(benchmark.performance * 100).toFixed(1)}%`,
              unit: "AUROC",
              description: benchmark.description,
              status: benchmark.performance > 0.9 ? "good" : benchmark.performance > 0.8 ? "warning" : "danger",
              trend: "up"
            }))
          }}
          layout="full"
        />
      </motion.div>
    </div>
  </div>
);

export const ForgeDesignTemplate = ({ content }: { content: ForgeDesignContent }) => (
  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900 flex items-center justify-center p-8">
    <div className="max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-white mb-4">{content.title}</h2>
        <p className="text-xl text-slate-300">{content.subtitle}</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ZetaForgeTwoColumn
          column1={{
            input: content.input,
            mission: content.mission,
            assets: content.therapies.map((therapy, index) => ({
              icon: therapy.icon === 'Target' ? Target : 
                    therapy.icon === 'Shield' ? Shield : 
                    therapy.icon === 'Bot' ? Bot : UserCheck,
              label: `${therapy.class} (${Math.round(therapy.confidence * 100)}% confidence)`
            }))
          }}
          column2={{
            title: content.advantage.title,
            highlight: content.advantage.highlight,
            description: content.advantage.description,
            infoHeader: content.advantage.infoHeader,
            infoText: content.advantage.infoText
          }}
        />
      </motion.div>
    </div>
  </div>
);

export const ClinicalTrialsTemplate = ({ content }: { content: ClinicalTrialsContent }) => (
  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-900/20 to-slate-900 flex items-center justify-center p-8">
    <div className="max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-white mb-4">{content.title}</h2>
        <p className="text-xl text-slate-300">{content.subtitle}</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ClinicalTrialsMatcher 
          title={content.trialMatching.title}
          workflow={content.trialMatching.workflow}
          output={content.trialMatching.output}
        />
      </motion.div>
    </div>
  </div>
);

export const BoltzValidationTemplate = ({ content }: { content: BoltzValidationContent }) => (
  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-orange-900/20 to-slate-900 flex items-center justify-center p-8">
    <div className="max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-white mb-4">{content.title}</h2>
        <p className="text-xl text-slate-300">{content.subtitle}</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <StructuralGauntlet
          description={content.description}
          output={content.output}
          simulation={content.simulation}
          verdict={content.verdict}
        />
      </motion.div>
    </div>
  </div>
);

export const EvidenceDoctrineTemplate = ({ content }: { content: EvidenceDoctrineContent }) => (
  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800/20 to-slate-900 flex items-center justify-center p-8">
    <div className="max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-white mb-4">{content.title}</h2>
        <p className="text-xl text-slate-300">{content.subtitle}</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
          <h3 className="text-2xl font-bold text-cyan-400 mb-6">Evidence Doctrine</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Transparency</h4>
              <ul className="text-slate-300 space-y-1">
                {content.transparency.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Methodology</h4>
              <p className="text-slate-300">{content.methodology}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

export const CompleteDossierTemplate = ({ content }: { content: CompleteDossierContent }) => (
  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 flex items-center justify-center p-8">
    <div className="max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-white mb-4">{content.title}</h2>
        <p className="text-xl text-slate-300">{content.subtitle}</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
          <h3 className="text-2xl font-bold text-emerald-400 mb-6">Research Readiness Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl font-bold ${metric.color} mb-2`}>
                  {metric.value}
                </div>
                <p className="text-slate-300">{metric.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-slate-900/50 rounded-lg">
            <p className="text-slate-300 text-center">
              <strong className="text-emerald-400">Description:</strong> Validated performance metrics for research applications
            </p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <ListContent 
          data={{
            items: content.components,
            type: "bulleted",
            style: "styled"
          }}
          layout="full"
        />
      </motion.div>
    </div>
  </div>
);

export const SPECaseStudyCardsTemplate = ({ content }: { content: SPECaseStudyCardsContent }) => (
  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 flex items-center justify-center p-8">
    <DigitalSynapseBackground />
    <div className="relative z-10 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-white mb-4">{content.title}</h2>
        <p className="text-xl text-slate-300">{content.subtitle}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {content.components.map((component, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <component.icon className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{component.title}</h3>
                <p className="text-slate-300 leading-relaxed">{component.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-12 text-center"
      >
        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-cyan-400 mb-2">{content.explanation.title}</h3>
          <p className="text-slate-300">{content.explanation.description}</p>
        </div>
      </motion.div>
    </div>
  </div>
);

export const SPECaseStudyJSONTemplate = ({ content }: { content: SPECaseStudyJSONContent }) => (
  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center p-8">
    <DigitalSynapseBackground />
    <div className="relative z-10 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold text-white mb-4">{content.title}</h2>
        <p className="text-xl text-slate-300">{content.subtitle}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Left Panel - JSON Output */}
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Live Analysis Output
          </h3>
          <div className="bg-slate-800/50 rounded-lg p-6 overflow-auto max-h-96">
            <pre className="text-lg text-slate-300 whitespace-pre-wrap leading-relaxed">
              {content.jsonOutput}
            </pre>
          </div>
        </div>

        {/* Right Panel - Key Metrics */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Key Performance Metrics
            </h3>
            <div className="space-y-3">
              {content.metrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-slate-300">{metric.label}:</span>
                  <span className={`${metric.color} font-bold`}>{metric.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-lg font-bold text-cyan-400 mb-3 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Why This Output Matters
            </h3>
            <ul className="space-y-2 text-slate-300">
              {content.explanations.map((explanation, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>{explanation}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </div>
);

// ===== SLIDE TEMPLATE REGISTRY =====

export const SLIDE_TEMPLATES = {
  'title': TitleSlideTemplate,
  'vus-resolution': VUSResolutionTemplate,
  'pathway-analysis': PathwayAnalysisTemplate,
  'performance-metrics': PerformanceMetricsTemplate,
  'forge-design': ForgeDesignTemplate,
  'clinical-trials': ClinicalTrialsTemplate,
  'boltz-validation': BoltzValidationTemplate,
  'evidence-doctrine': EvidenceDoctrineTemplate,
  'complete-dossier': CompleteDossierTemplate,
  'spe-case-study-cards': SPECaseStudyCardsTemplate,
  'spe-case-study-json': SPECaseStudyJSONTemplate,
} as const;

export type SlideTemplateType = keyof typeof SLIDE_TEMPLATES;
