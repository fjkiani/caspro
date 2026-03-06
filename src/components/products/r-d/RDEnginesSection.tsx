'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Target, 
  Zap, 
  Shield, 
  Network,
  ArrowRight
} from 'lucide-react';
import { adaptOracleForHomepage } from '@/data/adapters/oracle-adapter';
import { adaptForgeForHomepage } from '@/data/adapters/forge-adapter';
import { adaptBoltzForHomepage, adaptCommandCenterForHomepage } from '@/data/adapters/platform-adapter';

interface RDEnginesSectionProps {
  className?: string;
}

/**
 * RD Engines Section
 * 
 * Shows the 4 AI engines (Oracle, Forge, Boltz, Command Center) that power CrisPRO R&D.
 * Each engine card links to its detailed product page.
 * 
 * This section connects the orphaned engine pages to the R&D product structure.
 */
export default function RDEnginesSection({ className = '' }: RDEnginesSectionProps) {
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
    // {
    //   id: 'boltz',
    //   name: 'Boltz',
    //   icon: Shield,
    //   gradient: 'from-orange-400 to-red-300',
    //   bgGradient: 'from-slate-900 via-slate-800 to-orange-900/20',
    //   heroTitle: '⚡ Boltz: 3D Structural Assessment',
    //   description: boltzData.description || '3D structural validation and binding affinity prediction with AlphaFold 3 integration',
    //   data: boltzData,
    //   capabilities: boltzData.capabilities?.slice(0, 2) || [],
    //   link: '/products/boltz'
    // },
    // {
    //   id: 'command-center',
    //   name: 'Command Center',
    //   icon: Network,
    //   gradient: 'from-purple-400 to-pink-300',
    //   bgGradient: 'from-slate-900 via-slate-800 to-purple-900/20',
    //   heroTitle: '🎯 Command Center: Central Nervous System',
    //   description: commandCenterData.description || 'Workflow orchestration, provenance tracking, and evidence aggregation',
    //   data: commandCenterData,
    //   capabilities: commandCenterData.capabilities?.slice(0, 2) || [],
    //   link: '/products/command-center'
    // }
  ];

  return (
    <section id="engines" className={`py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 ${className}`}>
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Powered by the World's First{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
              Biological Foundation Models
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
            These are the AI engines that power CrisPRO R&D. Each engine provides validated technical capabilities for therapeutic design and validation.
          </p>
        </motion.div>

        {/* 2x2 Grid of Engine Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {engines.map((engine, index) => {
            const Icon = engine.icon;
            
            return (
              <motion.div
                key={engine.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl border-2 border-slate-700 hover:border-slate-500 transition-all duration-300 hover:shadow-2xl flex flex-col h-full"
              >
                {/* Hero Section Preview */}
                <div className={`bg-gradient-to-br ${engine.bgGradient} p-6 pb-5 flex-shrink-0`}>
                  <div className="flex items-start gap-4 mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${engine.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r ${engine.gradient} bg-clip-text text-transparent`}>
                        {engine.heroTitle}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">
                        {engine.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Capabilities Preview */}
                <div className="px-6 pt-5 pb-6 bg-slate-900 flex-1 flex flex-col">
                  <h4 className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wide">
                    Core Capabilities
                  </h4>
                  <div className="space-y-3 mb-6 flex-1">
                    {engine.capabilities.map((capability: any, idx: number) => (
                      <div 
                        key={idx} 
                        className="bg-slate-800 p-4 rounded-lg border border-slate-700"
                      >
                        <h5 className="text-sm font-bold text-white mb-1">
                          {capability.title}
                        </h5>
                        <p className="text-slate-300 text-xs mb-3 line-clamp-2">
                          {capability.description}
                        </p>
                        {capability.metrics && (
                          <div className="grid grid-cols-2 gap-3">
                            {capability.metrics.slice(0, 2).map((metric: any, metricIdx: number) => (
                              <div key={metricIdx} className="text-center">
                                <div className={`text-lg font-bold ${metric.color || 'text-green-400'} mb-1`}>
                                  {metric.value}
                                </div>
                                <div className="text-xs text-slate-400 line-clamp-1">
                                  {metric.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA - Link to detailed engine page */}
                  <Link href={engine.link} className="mt-auto">
                    <motion.div
                      className={`inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r ${engine.gradient} text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300 group/cta w-full justify-center`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Explore {engine.name}</span>
                      <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
                    </motion.div>
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




