import React from 'react';
import { motion } from 'framer-motion';
import DigitalSynapseBackground from '@site/blocks/DigitalSynapseBackground.tsx';
import { MetricCard, FeatureHighlight } from '../shared/SlideComponents';

export interface DifferentiatorsData {
  title: string;
  subtitle: string;
  metrics: Array<{
    value: string;
    label: string;
    change: string;
    color: string;
    status: string;
  }>;
  features: Array<{
    icon: string;
    title: string;
    description: string;
    metrics: Array<{ value: string; label: string; }>;
  }>;
  keyGenes: Array<{
    name: string;
    pathway: string;
    hotspots: string;
    guidance: string;
  }>;
  workflow: {
    covered: {
      title: string;
      description: string;
      calculation: string;
      boost: string;
      upgrade: string;
    };
    absent: {
      title: string;
      description: string;
    };
  };
  chemotherapyClasses: Array<{
    name: string;
    drugs: string[];
    benefit: string;
  }>;
  rollout: Array<{
    phase: string;
    title: string;
    description: string;
  }>;
  summary: string;
}

interface DifferentiatorsLayoutProps {
  data: DifferentiatorsData;
}

export const DifferentiatorsLayout: React.FC<DifferentiatorsLayoutProps> = ({ data }) => (
  <motion.section
    key="differentiators"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-900 text-slate-200"
  >
    <DigitalSynapseBackground />
    <div className="relative z-10 w-full max-w-6xl space-y-8">
      {/* Clean Title Section */}
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 leading-tight">
          {data.title}
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-200">
          {data.subtitle}
        </h2>
        <p className="text-xl md:text-2xl font-light text-slate-300 max-w-4xl mx-auto">
          Why Our Fusion Engine Changes Everything
        </p>
      </motion.div>

      {/* Key Metrics - Simplified */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {data.metrics.map((metric, index) => (
          <MetricCard
            key={index}
            value={metric.value}
            label={metric.label}
            change={metric.change}
            color={metric.color}
          />
        ))}
      </motion.div>

      {/* Core Differentiators - Only 2 main features */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h3 className="text-3xl font-bold text-cyan-400 text-center mb-8">Core Differentiators</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data.features.slice(0, 2).map((feature, index) => (
            <FeatureHighlight
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={index === 0 ? "cyan" : "purple"}
              metrics={feature.metrics}
            />
          ))}
        </div>
      </motion.div>

      {/* Key MM Genes - Simplified */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Key MM Driver Genes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.keyGenes.slice(0, 4).map((gene, index) => (
            <motion.div
              key={index}
              className="bg-slate-800/50 p-4 rounded-lg border border-slate-600"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-cyan-400">{gene.name}</span>
                <span className="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded">{gene.pathway}</span>
              </div>
              <p className="text-sm text-slate-300 mb-2">
                <strong>Hotspots:</strong> {gene.hotspots}
              </p>
              <p className="text-sm text-green-300 font-medium">
                → {gene.guidance}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Clinical Workflow - Simplified */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-purple-400 mb-4 text-center">Clinical Decision Workflow</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 p-6 rounded-xl border border-green-500/30"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <p className="text-lg font-bold text-green-400">{data.workflow.covered.title}</p>
            </div>
            <p className="text-sm text-slate-300 mb-2">{data.workflow.covered.description}</p>
            <p className="text-sm text-slate-300">
              <strong>Calculate:</strong> <code className="text-cyan-400 bg-cyan-500/20 px-1 py-0.5 rounded text-xs">{data.workflow.covered.calculation}</code>
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-slate-500/20 to-slate-400/20 p-6 rounded-xl border border-slate-500/30"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
              <p className="text-lg font-bold text-slate-400">{data.workflow.absent.title}</p>
            </div>
            <p className="text-sm text-slate-300">{data.workflow.absent.description}</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-6 rounded-2xl border border-slate-600 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <h4 className="text-xl font-bold text-slate-200 mb-3">Result: Maximum Confidence, Minimum Risk</h4>
        <p className="text-lg text-slate-300 leading-relaxed">
          {data.summary}
        </p>
      </motion.div>
    </div>
  </motion.section>
);


