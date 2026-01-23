'use client';

import React, { useState, ElementType, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ObservedOutcome } from '@/types/copilot-types';
import { 
  ShieldCheck, Layers, TrendingUp, Target, Users, Activity, AlertTriangle, FileText, 
  HelpCircle, ArrowRight, CheckCircle, Award
} from 'lucide-react';

const iconMap: { [key: string]: ElementType } = {
  ShieldCheck, Layers, TrendingUp, Target, Users, Activity, AlertTriangle, FileText,
  ArrowRight, CheckCircle, Award
};

type IconKey = keyof typeof iconMap;

interface ObservedOutcomesSectionProps {
  observedOutcomes: ObservedOutcome[];
}

// Enhanced outcome data with story elements
interface StoryOutcome extends ObservedOutcome {
  beforeMetric?: string;
  afterMetric?: string;
  impact?: string;
  problems?: string[];
  solutions?: string[];
  metrics?: {
    time?: string;
    success?: string;
    cost?: string;
    patients?: string;
  };
}

const ObservedOutcomeStoryCard: React.FC<{ outcome: StoryOutcome; index: number; totalCount: number }> = ({ outcome, index, totalCount }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px 0px -100px 0px",
    amount: 0.3
  });
  
  const Icon = iconMap[outcome.icon as IconKey] || HelpCircle;
  
  const colorThemes = {
    blue: {
      gradient: 'from-blue-50 via-blue-100 to-blue-50',
      border: 'border-blue-200/60',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      metricBg: 'bg-blue-500/10',
      metricColor: 'text-blue-700',
      accent: 'bg-blue-500',
      problemColor: 'text-red-600',
      solutionColor: 'text-green-600'
    },
    teal: {
      gradient: 'from-teal-50 via-teal-100 to-teal-50',
      border: 'border-teal-200/60',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
      metricBg: 'bg-teal-500/10',
      metricColor: 'text-teal-700',
      accent: 'bg-teal-500',
      problemColor: 'text-red-600',
      solutionColor: 'text-green-600'
    },
    indigo: {
      gradient: 'from-indigo-50 via-indigo-100 to-indigo-50',
      border: 'border-indigo-200/60',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      metricBg: 'bg-indigo-500/10',
      metricColor: 'text-indigo-700',
      accent: 'bg-indigo-500',
      problemColor: 'text-red-600',
      solutionColor: 'text-green-600'
    }
  };

  const theme = colorThemes[outcome.color as keyof typeof colorThemes] || colorThemes.blue;

  return (
    <motion.div 
      ref={ref}
      className={`relative ${index < totalCount - 1 ? 'pb-8' : ''}`}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: index * 0.15
        }
      } : { opacity: 0, y: 60, scale: 0.95 }}
    >
      {/* Animated connecting line */}
      {index < totalCount - 1 && (
        <motion.div 
          className={`absolute left-6 top-12 w-0.5 h-full ${theme.accent} opacity-30`}
          initial={{ scaleY: 0 }}
          animate={isInView ? { 
            scaleY: 1,
            transition: {
              duration: 0.6,
              delay: (index * 0.15) + 0.3,
              ease: "easeOut"
            }
          } : { scaleY: 0 }}
          style={{ transformOrigin: "top" }}
        />
      )}
      
      <div className="flex items-start space-x-4">
        {/* Animated Icon with step number */}
        <motion.div 
          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 ${theme.iconBg} ${theme.border} shadow-lg`}
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { 
            scale: 1, 
            rotate: 0,
            transition: {
              duration: 0.6,
              delay: (index * 0.15) + 0.2,
              ease: "backOut"
            }
          } : { scale: 0, rotate: -180 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { 
              opacity: 1,
              transition: { delay: (index * 0.15) + 0.4 }
            } : { opacity: 0 }}
          >
            <Icon className={`w-6 h-6 ${theme.iconColor}`} />
          </motion.div>
        </motion.div>
        
        <div className="flex-grow">
          {/* Animated Header with step and title */}
          <motion.div 
            className="flex items-center space-x-3 mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { 
              opacity: 1, 
              x: 0,
              transition: {
                duration: 0.6,
                delay: (index * 0.15) + 0.3,
                ease: "easeOut"
              }
            } : { opacity: 0, x: -20 }}
          >
            <span className={`text-sm font-bold px-2 py-1 rounded ${theme.metricBg} ${theme.metricColor}`}>
              Outcome {index + 1}
            </span>
            <h4 className="text-lg font-bold text-slate-800">{outcome.title}</h4>
          </motion.div>
          
          {/* Animated Key metric highlight */}
          <motion.div 
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.metricBg} ${theme.metricColor} text-sm font-semibold mb-3`}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.5,
                delay: (index * 0.15) + 0.4,
                ease: "easeOut"
              }
            } : { opacity: 0, y: 10 }}
          >
            <TrendingUp size={14} />
            {outcome.keyMetric}
          </motion.div>
          
          {/* Animated Description */}
          <motion.p 
            className="text-slate-700 mb-4 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.5,
                delay: (index * 0.15) + 0.5,
                ease: "easeOut"
              }
            } : { opacity: 0, y: 10 }}
          >
            {outcome.description}
          </motion.p>
          
          {/* Animated Before/After comparison if available */}
          {outcome.beforeMetric && outcome.afterMetric && (
            <motion.div 
              className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200 shadow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { 
                opacity: 1, 
                scale: 1,
                transition: {
                  duration: 0.5,
                  delay: (index * 0.15) + 0.6,
                  ease: "easeOut"
                }
              } : { opacity: 0, scale: 0.95 }}
            >
              <h5 className="text-sm font-semibold text-slate-800 mb-2">Impact Transformation:</h5>
              <div className="flex items-center justify-between text-sm">
                <motion.div 
                  className="text-red-600"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: (index * 0.15) + 0.7 }
                  } : { opacity: 0, x: -20 }}
                >
                  <span className="font-medium">Before:</span> {outcome.beforeMetric}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    scale: 1,
                    transition: { delay: (index * 0.15) + 0.8 }
                  } : { opacity: 0, scale: 0 }}
                >
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </motion.div>
                <motion.div 
                  className="text-green-600"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: (index * 0.15) + 0.9 }
                  } : { opacity: 0, x: 20 }}
                >
                  <span className="font-medium">After:</span> {outcome.afterMetric}
                </motion.div>
              </div>
            </motion.div>
          )}
          
        </div>
      </div>
    </motion.div>
  );
};

export default function ObservedOutcomesSection({ observedOutcomes }: ObservedOutcomesSectionProps) {
  if (!observedOutcomes || observedOutcomes.length === 0) {
    return null;
  }

  // Use the actual observed outcomes data without hallucinated metrics
  const storyOutcomes: StoryOutcome[] = observedOutcomes.map((outcome) => {
    // Only use the real data from the outcome
    const enhancedOutcome: StoryOutcome = { ...outcome };
    
    // Extract before/after from the keyMetric if it contains "→"
    if (outcome.keyMetric.includes('→')) {
      const parts = outcome.keyMetric.split('→');
      if (parts.length === 2) {
        enhancedOutcome.beforeMetric = parts[0].trim();
        enhancedOutcome.afterMetric = parts[1].trim();
      }
    }

    return enhancedOutcome;
  });

  return (
    <div className="mb-16">
      {/* Enhanced header with story narrative */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm mb-6">
            <Award size={16} />
            Validated Performance Stories
          </div>
          <h3 className="text-4xl font-bold text-slate-800 mb-6">Observed Outcomes</h3>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Real-world outcomes showing how our platform supports research workflows
          </p>
        </motion.div>
      </div>

      {/* Story-driven outcome timeline */}
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {storyOutcomes.map((outcome, index) => (
            <ObservedOutcomeStoryCard 
              key={`${outcome.title}-${index}`} 
              outcome={outcome} 
              index={index}
              totalCount={storyOutcomes.length}
            />
          ))}
        </div>
      </div>

      {/* Bottom narrative section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 text-center"
      >
        <div className="bg-gradient-to-r from-slate-50 to-white rounded-2xl p-8 border border-slate-200/60">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle size={16} className="text-primary" />
            </div>
            <h4 className="text-lg font-bold text-slate-800">Research Use Only</h4>
          </div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            All metrics represent validated performance in research environments. Results may vary based on specific use cases and data quality.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
