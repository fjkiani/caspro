'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { adaptCompletePlatformForHomepage } from '@/data/adapters/platform-adapter';
import { 
  Target, 
  Zap, 
  Shield, 
  Network,
  TrendingUp,
  Clock,
  DollarSign,
  Award,
  ChevronRight,
  Play
} from 'lucide-react';

export default function DrugDevelopmentPlatform() {
  const platformData = useMemo(() => adaptCompletePlatformForHomepage(), []);
  const [activeEngine, setActiveEngine] = useState<'oracle' | 'forge' | 'boltz' | 'commandCenter'>('oracle');

  const engines = {
    oracle: {
      name: 'Oracle',
      subtitle: 'Discriminative AI Engine',
      icon: Target,
      color: 'from-cyan-500 to-blue-600',
      description: 'Transform genetic uncertainty into actionable intelligence',
      keyMetric: '95.7% AUROC',
      data: platformData.oracle
    },
    forge: {
      name: 'Forge', 
      subtitle: 'Generative AI Engine',
      icon: Zap,
      color: 'from-orange-500 to-red-600',
      description: 'Engineer precision therapeutics from first principles',
      keyMetric: '70% Functional',
      data: platformData.forge
    },
    boltz: {
      name: 'Boltz',
      subtitle: 'Structural Validation Engine', 
      icon: Shield,
      color: 'from-green-500 to-emerald-600',
      description: '3D structural validation with AlphaFold 3 integration',
      keyMetric: '95.8% Confidence',
      data: platformData.boltz
    },
    commandCenter: {
      name: 'Command Center',
      subtitle: 'Orchestration Engine',
      icon: Network, 
      color: 'from-purple-500 to-indigo-600',
      description: 'End-to-end workflow orchestration and evidence aggregation',
      keyMetric: 'Complete Audit',
      data: platformData.commandCenter
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
            The Complete AI Engine for Therapeutic Development
          </h2>
          <p className="text-2xl text-slate-300 max-w-5xl mx-auto mb-8">
            Oracle + Forge + Boltz + Command Center = Transform drug development from a $2.6B gamble into deterministic engineering
          </p>
          
          {/* Platform Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/30">
              <TrendingUp className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{platformData.platformMetrics.discriminativeAccuracy}</div>
              <div className="text-sm text-slate-400">Oracle Precision</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-orange-500/30">
              <Award className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{platformData.platformMetrics.generativeSuccess}</div>
              <div className="text-sm text-slate-400">Forge Success</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-green-500/30">
              <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{platformData.platformMetrics.structuralValidation}</div>
              <div className="text-sm text-slate-400">Boltz Validation</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/30">
              <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{platformData.platformMetrics.timeAcceleration}</div>
              <div className="text-sm text-slate-400">Speed Increase</div>
            </div>
          </div>
        </motion.div>

        {/* Engine Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(engines).map(([key, engine]) => {
            const IconComponent = engine.icon;
            const isActive = activeEngine === key;
            return (
              <motion.button
                key={key}
                onClick={() => setActiveEngine(key as any)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl border transition-all duration-300 ${
                  isActive 
                    ? `bg-gradient-to-r ${engine.color} text-white border-transparent shadow-lg`
                    : 'bg-slate-800/50 text-slate-300 border-slate-700 hover:border-slate-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-bold">{engine.name}</div>
                  <div className="text-xs opacity-80">{engine.keyMetric}</div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Active Engine Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEngine}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8"
          >
            {(() => {
              const engine = engines[activeEngine];
              const IconComponent = engine.icon;
              
              return (
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Engine Info */}
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${engine.color} flex items-center justify-center`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white">{engine.name}</h3>
                        <p className="text-lg text-slate-300">{engine.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-xl text-slate-300 mb-6">{engine.description}</p>
                    
                    {/* Key Features */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-white">Key Capabilities:</h4>
                      {engine.data.keyFeatures?.slice(0, 4).map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3">
                          <ChevronRight className="w-4 h-4 text-cyan-400" />
                          <span className="text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Engine Metrics */}
                  <div>
                    <h4 className="text-lg font-bold text-white mb-4">Validated Performance:</h4>
                    <div className="space-y-4">
                      {Object.entries(engine.data.metrics || {}).slice(0, 4).map(([key, value]) => (
                        <div key={key} className="bg-slate-700/50 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </span>
                            <span className="text-cyan-400 font-mono font-bold">
                              {typeof value === 'object' && value !== null ? 
                                (value as any).auroc ? `${((value as any).auroc * 100).toFixed(1)}%` : 'Validated' :
                                String(value)
                              }
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <motion.a
                      href={`/products/${activeEngine === 'commandCenter' ? 'command-center' : activeEngine}`}
                      className={`w-full mt-6 bg-gradient-to-r ${engine.color} text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 block`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Play className="w-4 h-4" />
                      Experience {engine.name} Live
                    </motion.a>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </AnimatePresence>

        {/* Business Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-8">Business Transformation Impact</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 p-6 rounded-xl border border-green-500/30">
              <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-2">{platformData.platformMetrics.costReduction}</div>
              <div className="text-sm text-slate-300">Cost Reduction</div>
              <div className="text-xs text-green-400 mt-2">$2.1M saved per program</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 p-6 rounded-xl border border-blue-500/30">
              <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-2">{platformData.platformMetrics.timeAcceleration}</div>
              <div className="text-sm text-slate-300">Time Acceleration</div>
              <div className="text-xs text-blue-400 mt-2">18 months → 1 week</div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-6 rounded-xl border border-purple-500/30">
              <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-2">{platformData.platformMetrics.successRateImprovement}</div>
              <div className="text-sm text-slate-300">Success Rate</div>
              <div className="text-xs text-purple-400 mt-2">15% → 90% success</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}




