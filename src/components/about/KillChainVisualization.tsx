'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Search, Factory, Shield, CheckCircle, Clock } from 'lucide-react';

interface KillChainVisualizationProps {
  className?: string;
}

interface KillChainStep {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  status: 'completed' | 'running' | 'pending';
  duration: string;
  color: string;
}

export default function KillChainVisualization({ className = '' }: KillChainVisualizationProps) {
  const steps: KillChainStep[] = [
    {
      id: 'ingest',
      name: 'Ingest',
      description: 'Raw genomic data and clinical context ingestion',
      icon: Upload,
      status: 'completed',
      duration: '2.3s',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'analyze',
      name: 'Analyze',
      description: 'Oracle variant impact and essentiality analysis',
      icon: Search,
      status: 'completed',
      duration: '4.1s',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'design',
      name: 'Design',
      description: 'Forge therapeutic candidate generation',
      icon: Factory,
      status: 'running',
      duration: '6.7s',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'validate',
      name: 'Validate',
      description: 'Boltz structural confirmation',
      icon: Shield,
      status: 'pending',
      duration: '3.2s',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'aggregate',
      name: 'Aggregate',
      description: 'Command Center evidence compilation',
      icon: CheckCircle,
      status: 'pending',
      duration: '1.8s',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'running':
        return <Clock className="w-5 h-5 text-blue-500 animate-pulse" />;
      case 'pending':
        return <div className="w-5 h-5 border-2 border-slate-300 rounded-full"></div>;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'running':
        return 'bg-blue-50 border-blue-200';
      case 'pending':
        return 'bg-slate-50 border-slate-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-8 ${className}`}>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Command Center Kill Chain
        </h3>
        <p className="text-slate-600">
          Real-time orchestration of our 4-engine AI platform
        </p>
      </div>

      {/* Pipeline Visualization */}
      <div className="relative">
        {/* Connection Lines */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 via-blue-400 via-purple-400 to-orange-400 -translate-y-1/2 z-0 opacity-60"></div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-5 gap-4 z-10">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Step Card */}
                <div className={`p-6 rounded-xl border-2 text-center ${getStatusColor(step.status)}`}>
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${step.color} mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  {/* Status Icon */}
                  <div className="absolute -top-2 -right-2">
                    {getStatusIcon(step.status)}
                  </div>

                  {/* Content */}
                  <h4 className="font-bold text-slate-900 mb-2">{step.name}</h4>
                  <p className="text-sm text-slate-600 mb-3">{step.description}</p>
                  
                  {/* Duration */}
                  <div className="text-xs font-medium text-slate-500">
                    {step.duration}
                  </div>
                </div>

                {/* Arrow (except for last step) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-20">
                    <div className="w-4 h-4 bg-white border-2 border-slate-300 rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-slate-50 rounded-lg">
          <div className="text-2xl font-bold text-slate-900">247</div>
          <div className="text-sm text-slate-600">Runs Today</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg">
          <div className="text-2xl font-bold text-slate-900">2.3s</div>
          <div className="text-sm text-slate-600">Avg Run Time</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg">
          <div className="text-2xl font-bold text-slate-900">96.3%</div>
          <div className="text-sm text-slate-600">Success Rate</div>
        </div>
      </div>
    </div>
  );
}




