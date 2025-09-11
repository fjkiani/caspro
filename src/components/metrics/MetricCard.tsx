'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Dna, TrendingUp, CheckCircle, Activity, FileText } from 'lucide-react';
import { MetricBenchmark, formatMetricValue, getMetricColor, getMetricIcon } from '@/data/metrics';

interface MetricCardProps {
  metric: MetricBenchmark;
  index: number;
}

const iconMap = {
  Target,
  Dna,
  TrendingUp,
  CheckCircle,
  Activity,
  FileText
};

const colorVariants = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', accent: 'bg-blue-500' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', accent: 'bg-purple-500' },
  green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', accent: 'bg-green-500' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', accent: 'bg-orange-500' },
  gray: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-600', accent: 'bg-gray-500' }
};

const MetricCard: React.FC<MetricCardProps> = ({ metric, index }) => {
  const color = getMetricColor(metric.category);
  const iconName = getMetricIcon(metric.category);
  const IconComponent = iconMap[iconName as keyof typeof iconMap] || Activity;
  const theme = colorVariants[color as keyof typeof colorVariants];

  return (
    <motion.div
      className={`relative overflow-hidden bg-white rounded-2xl p-6 border-2 ${theme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -3 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${theme.bg}`}>
            <IconComponent className={`w-6 h-6 ${theme.text}`} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{metric.title}</h3>
            <p className="text-sm text-gray-500">{metric.dataset}</p>
          </div>
        </div>
        {metric.isStateOfTheArt && (
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            SOTA
          </span>
        )}
      </div>

      {/* Value */}
      <div className="mb-4">
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {formatMetricValue(metric.value.value, metric.value.format, metric.value.precision)}
        </div>
        <p className="text-sm text-gray-600">{metric.description}</p>
      </div>

      {/* Sample Size */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Sample Size:</span>
          <span className="font-semibold text-gray-800">{metric.sampleSize.toLocaleString()}</span>
        </div>
      </div>

      {/* Source */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <FileText className="w-3 h-3" />
        <span>{metric.source}</span>
      </div>

      {/* Accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${theme.accent}`}></div>
    </motion.div>
  );
};

export default MetricCard;
