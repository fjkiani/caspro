'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dna, Activity, Apple, Clock, CheckCircle, ArrowRight, Shield, Target, Search, 
  FileText, Layers, BarChart3, Map, Link, Zap, TrendingUp, Award, ListChecks,
  Database, Settings, Briefcase, Microscope, Gauge, Fingerprint
} from 'lucide-react';
import { SolutionNarrativeSectionData } from '@/types/educational-capability';

interface SolutionInteractiveBaseProps {
  data: SolutionNarrativeSectionData;
  className?: string;
  gradientColors?: string; // e.g., "from-green-50 via-emerald-50 to-teal-50"
  accentColor?: 'green' | 'blue' | 'purple' | 'indigo' | 'orange';
  closingStatement?: {
    firstLine: string;
    secondLine: string;
    accentColor?: string;
  };
}

interface SolutionStep {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  details: {
    label: string;
    value: string;
  }[];
  metrics: {
    label: string;
    value: string;
  }[];
}

// Comprehensive icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Dna, Activity, Apple, Clock, Shield, Target, Search, FileText, Layers, 
  BarChart3, Map, Link, Zap, TrendingUp, Award, ListChecks, Database, 
  Settings, Briefcase, Microscope, Gauge, Fingerprint, CheckCircle,
};

// Color sequence for steps if not specified in data
const defaultColorSequence: ('blue' | 'green' | 'purple' | 'orange')[] = ['blue', 'green', 'purple', 'orange'];

export default function SolutionInteractiveBase({ 
  data, 
  className = '',
  gradientColors = 'from-blue-50 via-indigo-50 to-purple-50',
  accentColor = 'blue',
  closingStatement
}: SolutionInteractiveBaseProps) {
  // Transform data.visualFlow into solution steps
  const solutionSteps: SolutionStep[] = useMemo(() => {
    if (!data.visualFlow || data.visualFlow.length === 0) {
      return [];
    }

    return data.visualFlow.map((step, idx) => {
      // Get icon from step.icon or keyFeatures[idx].icon, fallback to Dna
      const iconName = step.icon || data.keyFeatures?.[idx]?.icon || 'Dna';
      const IconComponent = iconMap[iconName] || Dna;
      
      // Get color from step.color or default sequence
      const color = step.color || defaultColorSequence[idx % defaultColorSequence.length];
      
      return {
        id: `step-${step.number}`,
        number: step.number,
        title: step.title,
        description: step.description,
        icon: IconComponent,
        color,
        details: step.details || [],
        metrics: step.metrics || [],
      };
    });
  }, [data.visualFlow, data.keyFeatures]);

  // Default to first step if available
  const [activeStep, setActiveStep] = useState<string>(solutionSteps[0]?.id || '');
  const selectedStep = solutionSteps.find(s => s.id === activeStep) || solutionSteps[0];

  // Early return if no steps
  if (solutionSteps.length === 0) {
    return null;
  }

  // Get color classes helper
  const getColorClasses = (color: string, isActive: boolean) => {
    const colorMap: Record<string, { active: string; inactive: string }> = {
      blue: {
        active: 'bg-blue-500 text-white border-blue-600',
        inactive: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
      },
      green: {
        active: 'bg-green-500 text-white border-green-600',
        inactive: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
      },
      purple: {
        active: 'bg-purple-500 text-white border-purple-600',
        inactive: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
      },
      orange: {
        active: 'bg-orange-500 text-white border-orange-600',
        inactive: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100',
      },
      teal: {
        active: 'bg-teal-500 text-white border-teal-600',
        inactive: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100',
      },
      indigo: {
        active: 'bg-indigo-500 text-white border-indigo-600',
        inactive: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100',
      },
    };

    const colors = colorMap[color] || colorMap.blue;
    return isActive ? colors.active : colors.inactive;
  };

  // Get icon color classes
  const getIconColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
      teal: { bg: 'bg-teal-100', text: 'text-teal-600' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
    };
    return colorMap[color] || colorMap.blue;
  };

  // Get gradient classes for metrics
  const getMetricGradient = (color: string) => {
    const gradientMap: Record<string, string> = {
      blue: 'from-blue-50 to-blue-100 border-blue-200',
      green: 'from-green-50 to-green-100 border-green-200',
      purple: 'from-purple-50 to-purple-100 border-purple-200',
      orange: 'from-orange-50 to-orange-100 border-orange-200',
      teal: 'from-teal-50 to-teal-100 border-teal-200',
      indigo: 'from-indigo-50 to-indigo-100 border-indigo-200',
    };
    return gradientMap[color] || gradientMap.blue;
  };

  // Get accent color classes for MOAT section
  const getAccentClasses = () => {
    const accentMap: Record<string, { bg: string; border: string; text: string }> = {
      green: { bg: 'from-green-50 to-emerald-50', border: 'border-green-200', text: 'text-green-600' },
      blue: { bg: 'from-blue-50 to-indigo-50', border: 'border-blue-200', text: 'text-blue-600' },
      purple: { bg: 'from-purple-50 to-indigo-50', border: 'border-purple-200', text: 'text-purple-600' },
      indigo: { bg: 'from-indigo-50 to-purple-50', border: 'border-indigo-200', text: 'text-indigo-600' },
      orange: { bg: 'from-orange-50 to-red-50', border: 'border-orange-200', text: 'text-orange-600' },
    };
    return accentMap[accentColor] || accentMap.blue;
  };

  const accentClasses = getAccentClasses();

  return (
    <section className={`py-16 px-4 md:px-8 bg-gradient-to-br ${gradientColors} ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-center gap-3 mb-4">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${accentClasses.bg} flex items-center justify-center flex-shrink-0`}>
              <Target className={`w-5 h-5 sm:w-6 sm:h-6 ${accentClasses.text}`} />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 text-center sm:text-left">
              {data.title}
            </h2>
          </div>
          <p className="text-base sm:text-lg text-slate-700 max-w-3xl mx-auto px-4">
            {data.narrative.split('\n\n')[0]} {/* First paragraph of narrative */}
          </p>
        </motion.div>

        {/* Interactive Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {solutionSteps.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;

            return (
              <motion.button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: step.number * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative rounded-xl p-4 sm:p-6 border-2 transition-all text-left ${getColorClasses(step.color, isActive)} ${
                  isActive ? 'shadow-xl ring-2 ring-offset-2 ring-offset-white' : 'shadow-md'
                }`}
              >
                {/* Step Number */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-3 ${
                  isActive ? 'bg-white/20' : 'bg-white'
                }`}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mb-3">
                  <Icon className={`w-8 h-8 ${isActive ? 'text-white' : ''}`} />
                </div>

                {/* Title */}
                <h3 className={`font-semibold mb-2 ${isActive ? 'text-white' : ''}`}>
                  {step.title}
                </h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed ${isActive ? 'text-white/90' : ''}`}>
                  {step.description}
                </p>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeStep"
                    className="absolute bottom-2 right-2"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <CheckCircle className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Detailed View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border-2 border-slate-200"
          >
            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
              {/* Left: Details */}
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4 sm:mb-6">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getIconColorClasses(selectedStep.color).bg}`}>
                    <selectedStep.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${getIconColorClasses(selectedStep.color).text}`} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{selectedStep.title}</h3>
                    <p className="text-sm sm:text-base text-slate-600">{selectedStep.description}</p>
                  </div>
                </div>

                {/* Details List */}
                {selectedStep.details.length > 0 && (
                  <div className="space-y-3">
                    {selectedStep.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${getIconColorClasses(selectedStep.color).text}`} />
                        <div>
                          <div className="font-semibold text-slate-900 text-sm">{detail.label}</div>
                          <div className="text-slate-600 text-sm">{detail.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Metrics */}
              <div>
                {selectedStep.metrics.length > 0 && (
                  <>
                    <h4 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Key Metrics</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                      {selectedStep.metrics.map((metric, idx) => (
                        <div key={idx} className={`bg-gradient-to-br ${getMetricGradient(selectedStep.color)} rounded-xl p-3 sm:p-4 border-2`}>
                          <div className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">{metric.value}</div>
                          <div className="text-xs sm:text-sm text-slate-600">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Visual Flow Arrow */}
                {selectedStep.number < solutionSteps.length && (
                  <div className="flex items-center justify-center gap-2 text-slate-400">
                    <span className="text-sm font-medium">Next: {solutionSteps[selectedStep.number].title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* MOAT Badges - Data-driven from keyFeatures */}
        {data.keyFeatures && data.keyFeatures.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`mt-6 sm:mt-8 bg-gradient-to-br ${accentClasses.bg} rounded-2xl p-4 sm:p-6 border-2 ${accentClasses.border}`}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 sm:mb-4 text-center px-2">
              The {data.title.split(':')[1]?.trim() || 'Solution'} MOAT (What We Just Built)
            </h3>
            <div className={`grid grid-cols-1 gap-3 sm:gap-4 ${
              data.keyFeatures.length === 1 ? 'sm:grid-cols-1' :
              data.keyFeatures.length === 2 ? 'sm:grid-cols-2' :
              data.keyFeatures.length === 3 ? 'sm:grid-cols-2 md:grid-cols-3' :
              'sm:grid-cols-2 md:grid-cols-4'
            }`}>
              {data.keyFeatures.map((feature, idx) => {
                const FeatureIcon = iconMap[feature.icon] || Activity;
                return (
                  <div key={idx} className={`bg-white rounded-xl p-4 border-2 ${accentClasses.border}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <FeatureIcon className={`w-5 h-5 ${accentClasses.text}`} />
                      <span className="font-semibold text-slate-900 text-sm">{feature.title}</span>
                    </div>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Closing Statement */}
        {closingStatement && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center text-base sm:text-lg md:text-xl font-semibold text-slate-800 mt-8 sm:mt-12 px-4"
          >
            <span className={closingStatement.accentColor ? `text-${closingStatement.accentColor}-600` : accentClasses.text}>
              {closingStatement.firstLine}
            </span>
            <br className="hidden sm:block" />
            <span className="text-slate-900 block sm:inline">{closingStatement.secondLine}</span>
          </motion.p>
        )}
      </div>
    </section>
  );
}

