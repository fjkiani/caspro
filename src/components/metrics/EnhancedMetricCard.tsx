'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, TrendingUp, Users, DollarSign, Clock, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { formatMetricValue } from '@/data/metrics';
import { type MetricBenchmark } from '@/data/metrics/types';
import { BRCAMutationSimulator, VUSResolutionPlayground, PatientImpactCalculator } from './interactive';

interface EnhancedMetricCardProps {
  benchmark: MetricBenchmark;
  index: number;
}

const EnhancedMetricCard: React.FC<EnhancedMetricCardProps> = ({ benchmark, index }) => {
  const [showDetails, setShowDetails] = useState(false);
  const impact = benchmark.realWorldImpact;

  const getGradientByPerformance = (value: number) => {
    if (value >= 0.95) return 'from-emerald-500 to-teal-600';
    if (value >= 0.90) return 'from-blue-500 to-indigo-600';
    if (value >= 0.85) return 'from-purple-500 to-pink-600';
    return 'from-orange-500 to-red-600';
  };

  const getProgressWidth = (value: number) => {
    return Math.min((value * 100), 100);
  };

  const numericValue = typeof benchmark.value.value === 'number' ? benchmark.value.value : parseFloat(benchmark.value.value);
  const gradientClass = getGradientByPerformance(numericValue);
  const progressWidth = getProgressWidth(numericValue);

  return (
    <motion.div
      className="relative bg-white rounded-3xl border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      
      {/* Main Content */}
      <div className="relative p-8">
        {/* SOTA Badge */}
        {benchmark.isStateOfTheArt && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              SOTA
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className={`p-4 bg-gradient-to-br ${gradientClass} rounded-2xl shadow-lg`}>
            <Target className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">{benchmark.title}</h3>
            <div className="flex items-center gap-3">
              <div className="text-sm text-slate-500 font-medium">
                {benchmark.dataset}
              </div>
              <div className="w-1 h-1 bg-slate-300 rounded-full" />
              <div className="text-sm text-slate-500">
                {benchmark.sampleSize.toLocaleString()} samples
              </div>
            </div>
          </div>
        </div>

        {/* Main Metric */}
        <div className="mb-6">
          <div className={`text-6xl font-black bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent mb-3`}>
            {formatMetricValue(benchmark.value.value, benchmark.value.format, benchmark.value.precision)}
          </div>
          
          {/* Human-readable translation */}
          {benchmark.humanReadable && (
            <div className="mb-4">
              <p className="text-lg font-semibold text-slate-700 mb-2">{benchmark.humanReadable}</p>
              {impact && (
                <p className="text-sm text-slate-600 leading-relaxed">{impact.whatItMeans}</p>
              )}
            </div>
          )}
          
          {/* Progress Bar */}
          <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden mb-4">
            <motion.div
              className={`absolute inset-y-0 left-0 bg-gradient-to-r ${gradientClass} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${progressWidth}%` }}
              transition={{ duration: 1.2, delay: index * 0.1 + 0.3 }}
            />
            <div className="absolute inset-0 bg-white/20 rounded-full" />
          </div>
        </div>

        {/* Technical Description */}
        <p className="text-slate-600 leading-relaxed mb-6">{benchmark.description}</p>

        {/* Impact Preview Cards */}
       

        {/* Expand Details Button */}
        {impact && (
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-slate-700 hover:text-slate-900 font-medium"
          >
            <Info className="w-4 h-4" />
            {showDetails ? 'Hide Details' : 'Show Real-World Impact'}
            {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}

        {/* Footer Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-6">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
            Performance Score
          </div>
          <div className={`text-sm font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
            {numericValue >= 0.95 ? 'Exceptional' : numericValue >= 0.90 ? 'Excellent' : numericValue >= 0.85 ? 'Very Good' : 'Good'}
          </div>
        </div>
      </div>

      {/* Detailed Impact Panel */}
      <AnimatePresence>
        {showDetails && impact && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-slate-200 bg-gradient-to-br from-slate-50 to-white"
          >
            <div className="p-8 space-y-6">
              {/* Why It Matters */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h4 className="font-bold text-slate-800">Why This Matters</h4>
                </div>
                <p className="text-slate-600 leading-relaxed">{impact.whyItMatters}</p>
              </div>

              {/* Real-World Impact */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-green-600" />
                  <h4 className="font-bold text-slate-800">Real-World Impact</h4>
                </div>
          
              </div>

              {/* Stakeholders */}
              <div>
                <h5 className="font-semibold text-slate-700 mb-2">Who Benefits:</h5>
                <div className="flex flex-wrap gap-2">
                  {impact.stakeholders.map((stakeholder, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
                    >
                      {stakeholder}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comparison Benchmark */}
              {impact.comparisonBenchmark && (
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h5 className="font-semibold text-slate-800 mb-4">vs. {impact.comparisonBenchmark.industry}</h5>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{impact.comparisonBenchmark.ourScore}</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">Our Score</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-400">{impact.comparisonBenchmark.industryAverage}</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">Industry Average</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{impact.comparisonBenchmark.improvement}</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">Improvement</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EnhancedMetricCard;
