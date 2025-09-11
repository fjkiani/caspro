'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Target, Shield, FileText, Database } from 'lucide-react';

interface EvidenceMetric {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<any>;
  color: 'blue' | 'teal' | 'indigo' | 'purple' | 'green' | 'red';
  benchmark?: string;
  source?: string;
}

const evidenceMetrics: EvidenceMetric[] = [
  {
    title: 'ClinVar Total Validation',
    value: '95.7%',
    description: 'AUROC on 53,210 variants across all classes',
    icon: Target,
    color: 'blue',
    benchmark: 'Comprehensive variant coverage',
    source: 'ClinVar validation dataset'
  },
  {
    title: 'BRCA1 Supervised',
    value: '95.0%',
    description: 'AUROC on all SNVs (3,893 samples)',
    icon: CheckCircle,
    color: 'teal',
    benchmark: 'Oncology-specific accuracy',
    source: 'BRCA1/2 validation'
  },
  {
    title: 'Non-coding SNVs',
    value: '95.8%',
    description: 'AUROC on 34,761 samples - SOTA',
    icon: TrendingUp,
    color: 'indigo',
    benchmark: 'State-of-the-art performance',
    source: 'ClinVar non-coding'
  },
  {
    title: 'Coding Non-SNVs',
    value: '93.9%',
    description: 'AUROC on 1,236 indels - SOTA',
    icon: Database,
    color: 'purple',
    benchmark: 'Where competitors lack coverage',
    source: 'ClinVar coding non-SNVs'
  },
  {
    title: 'SpliceVarDB',
    value: '82.6%',
    description: 'AUROC on 4,950 splice variants',
    icon: FileText,
    color: 'green',
    benchmark: 'Exonic and intronic coverage',
    source: 'SpliceVarDB validation'
  },
  {
    title: 'VUS Resolution',
    value: '73%',
    description: 'Variants of Uncertain Significance resolved',
    icon: Shield,
    color: 'red',
    benchmark: '40% → 15% VUS rate reduction',
    source: 'Clinical validation studies'
  }
];

const colorVariants = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', accent: 'bg-blue-500' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-600', accent: 'bg-teal-500' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-600', accent: 'bg-indigo-500' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', accent: 'bg-purple-500' },
  green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', accent: 'bg-green-500' },
  red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', accent: 'bg-red-500' }
};

const EvidenceMetrics: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Evidence Backbone</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Benchmarked performance across discriminative and generative AI tasks, 
            grounded in peer-reviewed validation and transparent methodology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {evidenceMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            const theme = colorVariants[metric.color];
            
            return (
              <motion.div
                key={metric.title}
                className={`relative overflow-hidden bg-white rounded-3xl p-8 border-2 ${theme.border} shadow-lg hover:shadow-2xl transition-all duration-500`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl mb-6 ${theme.bg}`}>
                  <IconComponent className={`w-8 h-8 ${theme.text}`} />
                </div>

                {/* Title and Value */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{metric.title}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                  <p className="text-gray-600 leading-relaxed">{metric.description}</p>
                </div>

                {/* Benchmark */}
                {metric.benchmark && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Benchmark:</strong> {metric.benchmark}
                    </p>
                  </div>
                )}

                {/* Source */}
                {metric.source && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FileText className="w-4 h-4" />
                    <span>Source: {metric.source}</span>
                  </div>
                )}

                {/* Accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${theme.accent}`}></div>
              </motion.div>
            );
          })}
        </div>

        {/* RUO Disclaimer */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Shield className="w-8 h-8 text-orange-600" />
              <span className="text-lg font-semibold text-orange-800">Research Use Only (RUO)</span>
            </div>
            <p className="text-gray-700">
              All performance metrics are for research purposes. Not intended for diagnostic or therapeutic 
              decision-making without independent validation and regulatory review.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EvidenceMetrics;
