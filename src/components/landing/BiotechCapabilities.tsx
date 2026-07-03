'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Zap, 
  Shield, 
  ArrowRight,
  CheckCircle,
  TrendingUp
} from 'lucide-react';
import { BIOTECH_VALUE_PROPS } from '@/data/homepage/drug-development-homepage';

interface BiotechCapabilitiesProps {
  className?: string;
}

const BiotechCapabilities: React.FC<BiotechCapabilitiesProps> = ({ className = '' }) => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const iconMap = {
    '🎯': Target,
    '🔬': Zap,
    '🛡️': Shield
  };

  const getIcon = (iconString: string) => {
    return iconMap[iconString as keyof typeof iconMap] || Target;
  };

  const colorMap = {
    'precision-targeting': 'from-green-500 to-emerald-600',
    'therapeutic-design': 'from-blue-500 to-cyan-600',
    'risk-mitigation': 'from-purple-500 to-violet-600'
  };

  return (
    <section className={`py-20 bg-white ${className}`}>
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
            Three Ways We <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Transform R&D
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From target validation to therapeutic design - each stage optimized with AI precision
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {BIOTECH_VALUE_PROPS.map((prop, index) => {
            const Icon = getIcon(prop.icon);
            const isActive = activeCard === prop.id;
            const gradientClass = colorMap[prop.id as keyof typeof colorMap];
            
            return (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setActiveCard(prop.id)}
                onMouseLeave={() => setActiveCard(null)}
                className={`group relative bg-white rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden ${
                  isActive 
                    ? 'border-transparent shadow-2xl transform scale-105' 
                    : 'border-slate-200 shadow-lg hover:shadow-xl hover:border-slate-300'
                }`}
              >
                {/* Gradient Background (appears on hover) */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 transition-opacity duration-300 ${
                  isActive ? 'opacity-5' : ''
                }`} />
                
                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-br ${gradientClass} shadow-lg` 
                      : 'bg-slate-100 group-hover:bg-slate-200'
                  }`}>
                    <Icon className={`w-8 h-8 transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-slate-600 group-hover:text-slate-700'
                    }`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {prop.title}
                  </h3>
                  
                  {/* Problem → Solution Flow */}
                  <div className="space-y-4 mb-6">
                    <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                      <p className="text-red-800 text-sm">
                        <strong>Problem:</strong> {prop.problem}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-slate-400" />
                    </div>
                    
                    <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                      <p className="text-green-800 text-sm">
                        <strong>Solution:</strong> {prop.solution}
                      </p>
                    </div>
                  </div>

                  {/* Impact Highlight */}
                  <div className={`p-4 rounded-xl mb-6 transition-all duration-300 ${
                    isActive 
                      ? 'bg-white shadow-md border-2 border-blue-200' 
                      : 'bg-slate-50'
                  }`}>
                    <div className="text-center">
                      <div className={`text-3xl font-bold mb-1 transition-colors duration-300 ${
                        isActive ? 'text-blue-600' : 'text-slate-700'
                      }`}>
                        {prop.impact.improvement}
                      </div>
                      <div className="text-slate-600 font-semibold text-sm">
                        {prop.impact.metric}
                      </div>
                    </div>
                  </div>

                  {/* Evidence Badge */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-slate-500 uppercase tracking-wide font-semibold">
                        Validated Evidence
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm">
                      {prop.evidence}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <motion.a
                    href={prop.cta.href}
                    className={`inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-r ${gradientClass} text-white shadow-lg`
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {prop.cta.text}
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </div>

                {/* Hover Indicator */}
                {isActive && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientClass}`}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-slate-600 mb-6">
            Ready to see these capabilities in action?
          </p>
          
          <motion.button
            onClick={() => {
              const calculatorSection = document.querySelector('#roi-calculator');
              if (calculatorSection) {
                calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-3 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <TrendingUp className="w-5 h-5" />
            Calculate Your ROI
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BiotechCapabilities;
