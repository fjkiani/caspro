'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Clock, Target, Users, Shield, Factory } from 'lucide-react';

interface BusinessTransformationSectionProps {
  className?: string;
}

interface TransformationMetric {
  icon: React.ComponentType<any>;
  label: string;
  before: string;
  after: string;
  improvement: string;
  color: string;
}

interface UseCase {
  title: string;
  description: string;
  metrics: {
    timeReduction: string;
    costSavings: string;
    successRate: string;
  };
  icon: React.ComponentType<any>;
  color: string;
}

export default function BusinessTransformationSection({ className = '' }: BusinessTransformationSectionProps) {
  const metrics: TransformationMetric[] = [
    {
      icon: Clock,
      label: 'Target Validation Time',
      before: '18 months',
      after: '1 week',
      improvement: '72x faster',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: DollarSign,
      label: 'Cost Per Target',
      before: '$2.5M',
      after: '$3K',
      improvement: '99.8% reduction',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Target,
      label: 'Success Rate',
      before: '15%',
      after: '90%',
      improvement: '6x improvement',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      label: 'False Discovery Rate',
      before: '88%',
      after: '12%',
      improvement: '7x reduction',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const useCases: UseCase[] = [
    {
      title: 'Biotech R&D Transformation',
      description: 'Transform drug development from a $2.6B gamble into deterministic engineering through AI-powered intelligence.',
      metrics: {
        timeReduction: '18 months → 1 week',
        costSavings: '$2.5M → $3K per target',
        successRate: '15% → 90% validated targets'
      },
      icon: Factory,
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Clinical Oncology Transformation',
      description: 'Resolve 73% of VUS cases with 95.7% ClinVar AUROC precision, enabling same-day clinical decisions.',
      metrics: {
        timeReduction: '6 weeks → Same day',
        costSavings: '$75K → $50 per variant',
        successRate: '40% → 15% uncertain variants'
      },
      icon: Users,
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Genetic Testing Labs Transformation',
      description: 'Automate variant interpretation with 20x throughput increase and 97% cost reduction.',
      metrics: {
        timeReduction: '40 hours → 2 hours per case',
        costSavings: '$150 → $5 per variant',
        successRate: '1 → 20 cases per analyst per week'
      },
      icon: Shield,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className={`bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 ${className}`}>
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-slate-900 mb-4">
          Business Transformation Impact
        </h3>
        <p className="text-xl text-slate-600 max-w-4xl mx-auto">
          Real metrics from our AI platform transforming drug development across the industry
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm"
            >
              <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${metric.color} mb-4`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">{metric.label}</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Before:</span>
                  <span className="text-sm font-medium text-slate-600">{metric.before}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">After:</span>
                  <span className="text-sm font-bold text-green-600">{metric.after}</span>
                </div>
                <div className="text-center pt-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${metric.color} text-white`}>
                    {metric.improvement}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Use Cases */}
      <div className="space-y-8">
        <h4 className="text-2xl font-bold text-slate-900 text-center mb-8">
          Industry Transformation Use Cases
        </h4>
        
        {useCases.map((useCase, index) => {
          const IconComponent = useCase.icon;
          return (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm"
            >
              <div className="flex items-start gap-6">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${useCase.color}`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h5 className="text-xl font-bold text-slate-900 mb-3">{useCase.title}</h5>
                  <p className="text-slate-600 mb-6 leading-relaxed">{useCase.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="text-lg font-bold text-slate-900 mb-1">Time</div>
                      <div className="text-sm text-slate-600">{useCase.metrics.timeReduction}</div>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="text-lg font-bold text-slate-900 mb-1">Cost</div>
                      <div className="text-sm text-slate-600">{useCase.metrics.costSavings}</div>
                    </div>
                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="text-lg font-bold text-slate-900 mb-1">Success</div>
                      <div className="text-sm text-slate-600">{useCase.metrics.successRate}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
