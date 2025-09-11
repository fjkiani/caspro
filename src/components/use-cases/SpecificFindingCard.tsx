import React from 'react';
import { motion } from 'framer-motion';
import { Dna, Target, Users, TrendingUp, FileText, AlertCircle } from 'lucide-react';
import { EnhancedMetricCard } from './EnhancedMetricCard';
import { MetricBenchmark } from '@/data/metrics/types';

interface SpecificFindingCardProps {
  finding: {
    title: string;
    description: string;
    metrics: MetricBenchmark[];
  };
  index: number;
}

const getFindingIcon = (title: string) => {
  if (title.includes('MM Research') || title.includes('Signals')) {
    return <Dna className="w-6 h-6 text-blue-500" />;
  } else if (title.includes('Two-Hit') || title.includes('Hypothesis')) {
    return <Target className="w-6 h-6 text-purple-500" />;
  } else if (title.includes('Trial') || title.includes('Compression')) {
    return <Users className="w-6 h-6 text-green-500" />;
  }
  return <FileText className="w-6 h-6 text-gray-500" />;
};

const getFindingColor = (title: string) => {
  if (title.includes('MM Research') || title.includes('Signals')) {
    return 'from-blue-50 to-blue-100 border-blue-200';
  } else if (title.includes('Two-Hit') || title.includes('Hypothesis')) {
    return 'from-purple-50 to-purple-100 border-purple-200';
  } else if (title.includes('Trial') || title.includes('Compression')) {
    return 'from-green-50 to-green-100 border-green-200';
  }
  return 'from-gray-50 to-gray-100 border-gray-200';
};

export const SpecificFindingCard: React.FC<SpecificFindingCardProps> = ({ finding, index }) => {
  return (
    <motion.div
      className={`bg-gradient-to-br ${getFindingColor(finding.title)} rounded-2xl p-8 border-2 shadow-xl hover:shadow-2xl transition-all duration-500`}
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-white rounded-xl shadow-md">
          {getFindingIcon(finding.title)}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{finding.title}</h3>
          <p className="text-gray-600 leading-relaxed">{finding.description}</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {finding.metrics.map((metric, metricIndex) => (
          <motion.div
            key={metricIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.2 + metricIndex * 0.1 }}
          >
            <EnhancedMetricCard metric={metric} index={metricIndex} />
          </motion.div>
        ))}
      </div>

      {/* Key Insight */}
      <motion.div
        className="mt-6 p-4 bg-white/70 rounded-xl border border-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 + index * 0.2 }}
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Key Insight</h4>
            <p className="text-sm text-gray-600">
              {finding.title.includes('MM Research') && 
                "Real-world MM research shows consistent confidence patterns and efficacy ranges, with fusion coverage providing comprehensive variant analysis."}
              {finding.title.includes('Two-Hit') && 
                "Multiple Myeloma follows a clear two-hit model with MAPK pathway activation as the primary driver, often cooperating with TP53/17p alterations."}
              {finding.title.includes('Trial') && 
                "Clinical trial matching efficiency dramatically improves with AI-powered shortlisting, reducing manual review time from hours to minutes."}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
