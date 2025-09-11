import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Users, Database, AlertTriangle, CheckCircle, Cpu } from 'lucide-react';
import { MetricBenchmark } from '@/data/metrics/types';

interface EnhancedMetricCardProps {
  metric: MetricBenchmark;
  index: number;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'validation': return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'business': return <TrendingUp className="w-5 h-5 text-blue-500" />;
    case 'clinical': return <Target className="w-5 h-5 text-purple-500" />;
    case 'technical': return <Cpu className="w-5 h-5 text-indigo-500" />;
    case 'estimated': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
    default: return <Database className="w-5 h-5 text-gray-500" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'validation': return 'border-green-200 bg-green-50';
    case 'business': return 'border-blue-200 bg-blue-50';
    case 'clinical': return 'border-purple-200 bg-purple-50';
    case 'technical': return 'border-indigo-200 bg-indigo-50';
    case 'estimated': return 'border-orange-200 bg-orange-50';
    default: return 'border-gray-200 bg-gray-50';
  }
};

const formatValue = (value: number, format?: string, precision?: number) => {
  if (format === 'percentage') {
    return `${value.toFixed(precision || 1)}%`;
  } else if (format === 'decimal') {
    return value.toFixed(precision || 3);
  } else if (format === 'integer') {
    return value.toString();
  }
  return value.toString();
};

export const EnhancedMetricCard: React.FC<EnhancedMetricCardProps> = ({ metric, index }) => {
  const isHighValue = metric.value.value > 0.8 || metric.value.value > 80;
  const isMediumValue = metric.value.value > 0.5 || metric.value.value > 50;
  
  return (
    <motion.div
      className={`p-6 rounded-xl border-2 ${getCategoryColor(metric.category)} shadow-lg hover:shadow-xl transition-all duration-300`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          {getCategoryIcon(metric.category)}
        <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          {metric.category === 'estimated' ? 'Estimated' : metric.category}
        </span>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">n={metric.sampleSize.toLocaleString()}</div>
          <div className="text-xs text-gray-400">{metric.dataset}</div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{metric.title}</h3>
        <div className="flex items-baseline gap-2">
          <span className={`text-4xl font-bold ${
            isHighValue ? 'text-green-600' : 
            isMediumValue ? 'text-blue-600' : 'text-gray-600'
          }`}>
            {formatValue(metric.value.value, metric.value.format, metric.value.precision)}
          </span>
          {isHighValue && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <TrendingUp className="w-6 h-6 text-green-500" />
            </motion.div>
          )}
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-4">{metric.description}</p>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Source: {metric.source}</span>
        {metric.category === 'validation' && (
          <span className="flex items-center gap-1 text-green-600 font-medium">
            <CheckCircle className="w-3 h-3" />
            Validated
          </span>
        )}
        {metric.category === 'estimated' && (
          <span className="flex items-center gap-1 text-orange-600 font-medium">
            <AlertTriangle className="w-3 h-3" />
            Estimated
          </span>
        )}
        {metric.category === 'technical' && (
          <span className="flex items-center gap-1 text-indigo-600 font-medium">
            <Cpu className="w-3 h-3" />
            Technical
          </span>
        )}
      </div>
    </motion.div>
  );
};
