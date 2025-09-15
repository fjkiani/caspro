'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Target, Shield, FileText, Database, Icon as LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { MetricBenchmark } from '@/data/metrics/types';
import { formatMetricValue } from '@/data/metrics';

interface EvidenceMetricCardProps {
  metric: MetricBenchmark;
  index: number;
}

const iconMap: { [key: string]: LucideIcon } = {
  'default': Target,
  'brca1': CheckCircle,
  'non-coding': TrendingUp,
  'coding-non-snv': Database,
  'splice': FileText,
  'vus': Shield,
};

const colorVariants: { [key: string]: any } = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', accent: 'bg-blue-500' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-600', accent: 'bg-teal-500' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-600', accent: 'bg-indigo-500' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', accent: 'bg-purple-500' },
  green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', accent: 'bg-green-500' },
  red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', accent: 'bg-red-500' }
};

const getRandomColor = (index: number) => {
  const colors = Object.keys(colorVariants);
  return colors[index % colors.length];
};

const EvidenceMetricCard: React.FC<EvidenceMetricCardProps> = ({ metric, index }) => {
  const IconComponent = metric.slug && iconMap[metric.slug] ? iconMap[metric.slug] : iconMap['default'];
  const color = getRandomColor(index);
  const theme = colorVariants[color];
  const formattedValue = formatMetricValue(metric.value.value, metric.value.format, metric.value.precision);

  return (
    <motion.div
      className={`relative overflow-hidden bg-white rounded-3xl p-8 border-2 ${theme.border} shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/metrics/${metric.slug}`} className="flex flex-col h-full">
        {/* Icon */}
        <div className={`inline-flex p-4 rounded-2xl mb-6 ${theme.bg}`}>
          <IconComponent className={`w-8 h-8 ${theme.text}`} />
        </div>

        {/* Title and Value */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{metric.title}</h3>
          <div className="text-3xl font-bold text-gray-900 mb-2">{formattedValue}</div>
          <p className="text-gray-600 leading-relaxed">{metric.description}</p>
        </div>

        {/* Benchmark */}
        {metric.dataset && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Dataset:</strong> {metric.dataset} ({metric.sampleSize?.toLocaleString()} samples)
            </p>
          </div>
        )}

        {/* Source */}
        {metric.source && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-auto">
            <FileText className="w-4 h-4" />
            <span>Source: {metric.source}</span>
          </div>
        )}

        {/* Accent line */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 ${theme.accent}`}></div>
      </Link>
    </motion.div>
  );
};

interface EvidenceBackboneProps {
  metrics: MetricBenchmark[];
  title?: string;
  description?: string;
  showDisclaimer?: boolean;
}

const EvidenceBackbone: React.FC<EvidenceBackboneProps> = ({
  metrics,
  title = "Evidence Backbone",
  description = "Benchmarked performance across discriminative and generative AI tasks, grounded in peer-reviewed validation and transparent methodology.",
  showDisclaimer = true
}) => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6">{title}</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <EvidenceMetricCard key={metric.slug || index} metric={metric} index={index} />
          ))}
        </div>

        {showDisclaimer && (
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
        )}
      </div>
    </section>
  );
};

export default EvidenceBackbone;
