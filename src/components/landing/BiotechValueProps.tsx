'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Zap, 
  Shield, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Brain
} from 'lucide-react';
import { BIOTECH_VALUE_PROPS } from '@/data/homepage/drug-development-homepage';
import type { BiotechValueProp } from '@/data/homepage/drug-development-homepage';

interface BiotechValuePropsProps {
  className?: string;
}

const BiotechValueProps: React.FC<BiotechValuePropsProps> = ({ className = '' }) => {
  const [hoveredProp, setHoveredProp] = useState<string | null>(null);

  const iconMap = {
    '🎯': Target,
    '🔬': Zap,
    '🛡️': Shield
  };

  const getIcon = (iconString: string) => {
    return iconMap[iconString as keyof typeof iconMap] || Brain;
  };

  return (
    <section className={`py-20 bg-gradient-to-b from-white to-slate-50 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Why Biotech Leaders Choose 
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent block">
              CrisPRO.ai
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
            The only platform that transforms drug development from gambling to engineering. 
            <strong>Real results, validated metrics, contract-ready ROI.</strong>
          </p>
          
          {/* Crisis vs Solution Comparison */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h3 className="font-bold text-red-900">Traditional Drug Development</h3>
              </div>
              <div className="space-y-2 text-left">
                <div className="text-red-700">❌ 90% failure rate</div>
                <div className="text-red-700">❌ $2.6B average cost</div>
                <div className="text-red-700">❌ 15-year timelines</div>
                <div className="text-red-700">❌ 85% false positives in target validation</div>
              </div>
            </div>
            
            <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <h3 className="font-bold text-green-900">CrisPRO.ai Transformation</h3>
              </div>
              <div className="space-y-2 text-left">
                <div className="text-green-700">✅ 90% validated target success</div>
                <div className="text-green-700">✅ 99.8% cost reduction</div>
                <div className="text-green-700">✅ 72x faster validation</div>
                <div className="text-green-700">✅ 95% accuracy with mathematical certainty</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Value Propositions Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {BIOTECH_VALUE_PROPS.map((prop, index) => {
            const Icon = getIcon(prop.icon);
            const isHovered = hoveredProp === prop.id;
            
            return (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredProp(prop.id)}
                onMouseLeave={() => setHoveredProp(null)}
                className={`group relative p-8 bg-white rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  isHovered 
                    ? 'border-blue-500 shadow-2xl transform scale-105' 
                    : 'border-slate-200 shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                  isHovered 
                    ? 'bg-blue-500 shadow-lg' 
                    : 'bg-slate-100 group-hover:bg-blue-100'
                }`}>
                  <Icon className={`w-8 h-8 transition-colors duration-300 ${
                    isHovered ? 'text-white' : 'text-slate-600 group-hover:text-blue-600'
                  }`} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {prop.title}
                </h3>
                
                {/* Problem Statement */}
                <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                  <p className="text-red-800 text-sm font-medium">
                    <strong>Problem:</strong> {prop.problem}
                  </p>
                </div>
                
                {/* Solution Statement */}
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                  <p className="text-green-800 text-sm font-medium">
                    <strong>Solution:</strong> {prop.solution}
                  </p>
                </div>

                {/* Impact Metrics */}
                <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {prop.impact.improvement}
                    </div>
                    <div className="text-blue-800 font-semibold text-sm">
                      {prop.impact.metric}
                    </div>
                  </div>
                </div>

                {/* Evidence */}
                <div className="mb-6">
                  <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-2">
                    Validated Evidence
                  </div>
                  <p className="text-slate-600 text-sm">
                    {prop.evidence}
                  </p>
                </div>

                {/* CTA */}
                <motion.a
                  href={prop.cta.href}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    isHovered
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {prop.cta.text}
                  <ArrowRight className="w-4 h-4" />
                </motion.a>

                {/* Hover Effect Overlay */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl pointer-events-none"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white"
        >
          <h3 className="text-3xl font-bold mb-4">
            Ready to Transform Your R&D Pipeline?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Join the biotech leaders who've eliminated the $2.6B gamble with mathematical certainty.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              onClick={() => {
                const demoSection = document.querySelector('#drug-development-showcase');
                if (demoSection) {
                  demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Brain className="w-5 h-5" />
              See Live AI Demonstrations
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.a
              href="/contact"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-colors flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <DollarSign className="w-5 h-5" />
              Schedule Executive Demo
            </motion.a>
          </div>
          
          <p className="mt-4 text-sm opacity-75">
            ⚡ <strong>No commitment required</strong> • <strong>See real results in 30 seconds</strong> • <strong>Contract-ready ROI analysis</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BiotechValueProps;
