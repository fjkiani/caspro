'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Zap, 
  Shield, 
  Network,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { adaptOracleForHomepage } from '@/data/adapters/oracle-adapter';
import { adaptForgeForHomepage } from '@/data/adapters/forge-adapter';
import { adaptBoltzForHomepage, adaptCommandCenterForHomepage } from '@/data/adapters/platform-adapter';

export default function EngineRoom() {
  const oracleData = adaptOracleForHomepage();
  const forgeData = adaptForgeForHomepage();
  const boltzData = adaptBoltzForHomepage();
  const commandCenterData = adaptCommandCenterForHomepage();

  const engines = [
    {
      id: 'oracle',
      name: 'Oracle',
      icon: Target,
      gradient: 'from-cyan-400 to-blue-300',
      bgGradient: 'from-slate-900 via-slate-800 to-blue-900/20',
      heroTitle: 'Oracle: Discriminative AI Engine',
      description: oracleData.description || 'Transform genetic uncertainty into actionable intelligence with zero-shot variant impact prediction',
      data: oracleData,
      capabilities: oracleData.capabilities?.slice(0, 2) || [],
      link: '/products/oracle'
    },
    {
      id: 'forge',
      name: 'Forge',
      icon: Zap,
      gradient: 'from-purple-400 to-pink-300',
      bgGradient: 'from-slate-900 via-slate-800 to-purple-900/20',
      heroTitle: 'Forge: Generative AI Engine',
      description: forgeData.content?.about?.oneLiner || 'Engineer precision therapeutics from first principles with agentic design loops',
      data: forgeData,
      capabilities: forgeData.capabilities?.slice(0, 2) || [],
      link: '/products/forge'
    },
    {
      id: 'boltz',
      name: 'Boltz',
      icon: Shield,
      gradient: 'from-orange-400 to-red-300',
      bgGradient: 'from-slate-900 via-slate-800 to-orange-900/20',
      heroTitle: '⚡ Boltz: 3D Structural Assessment',
      description: boltzData.description || '3D structural validation and binding affinity prediction with AlphaFold 3 integration',
      data: boltzData,
      capabilities: boltzData.capabilities?.slice(0, 2) || [],
      link: '/products/boltz'
    },
    {
      id: 'command-center',
      name: 'Command Center',
      icon: Network,
      gradient: 'from-purple-400 to-pink-300',
      bgGradient: 'from-slate-900 via-slate-800 to-purple-900/20',
      heroTitle: '🎯 Command Center: Central Nervous System',
      description: commandCenterData.description || 'Workflow orchestration, provenance tracking, and evidence aggregation',
      data: commandCenterData,
      capabilities: commandCenterData.capabilities?.slice(0, 2) || [],
      link: '/products/command-center'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">
            Powered by the World's First{' '}
            <span className="text-blue-600">Biological Foundation Models</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-4">
            Technical validation for the products above - these are the AI engines that power CrisPRO R&D
          </p>
          <Link 
            href="/products/r-d#engines" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
          >
            <span>View all engines on R&D product page</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
          {engines.map((engine, index) => {
            const Icon = engine.icon;
            
            return (
              <motion.div
                key={engine.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl flex flex-col h-full bg-white"
              >
                {/* Hero Section Preview */}
                <div className={`bg-gradient-to-br from-slate-50 via-white to-slate-100 p-5 pb-4 flex-shrink-0 border-b border-slate-200`}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${engine.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-xl font-bold mb-2 text-slate-900 line-clamp-2`}>
                        {engine.heroTitle}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                        {engine.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Capabilities Preview */}
                <div className="px-5 pt-4 pb-5 bg-white flex-1 flex flex-col">
                  <h4 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">
                    Core Capabilities
                  </h4>
                  <div className="space-y-3 mb-4 flex-1">
                    {engine.capabilities.map((capability: any, idx: number) => (
                      <div 
                        key={idx} 
                        className="bg-slate-50 p-4 rounded-lg border border-slate-200"
                      >
                        <h5 className="text-base font-bold text-slate-900 mb-2">
                          {capability.title}
                        </h5>
                        <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                          {capability.description}
                        </p>
                        {capability.metrics && (
                          <div className="grid grid-cols-2 gap-3">
                            {capability.metrics.slice(0, 2).map((metric: any, metricIdx: number) => (
                              <div key={metricIdx} className="text-center">
                                <div className={`text-lg font-bold ${metric.color?.replace('text-green-400', 'text-blue-600').replace('text-cyan-400', 'text-cyan-600').replace('text-purple-400', 'text-purple-600') || 'text-blue-600'} mb-1`}>
                                  {metric.value}
                                </div>
                                <div className="text-sm text-slate-600 line-clamp-1">
                                  {metric.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA - Always at bottom */}
                  <Link href={engine.link} className="mt-auto">
                    <motion.div
                      className={`inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r ${engine.gradient} text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300 group/cta w-full justify-center`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Explore {engine.name}</span>
                      <ArrowRight className="w-3 h-3 group-hover/cta:translate-x-1 transition-transform" />
                    </motion.div>
                  </Link>
                  {/* Secondary link to R&D page */}
                  <Link 
                    href="/products/r-d#engines" 
                    className="mt-2 text-center text-sm text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    Part of CrisPRO R&D →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
