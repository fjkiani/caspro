'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Settings, Database, Target, FileText, ShieldCheck, TrendingUp, 
  CheckCircle, ArrowRight, Zap, Brain, Layers
} from 'lucide-react';

interface TechnicalApproachSectionProps {
  title: string;
  keyMetric: string;
  description: string;
  icon: string;
  color: string;
}

const TechnicalApproachSection: React.FC<TechnicalApproachSectionProps> = ({
  title,
  keyMetric,
  description,
  icon,
  color
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px 0px -100px 0px",
    amount: 0.3
  });

  // Parse the S/P/E Fusion description into visual components
  const parseSPEFusion = (desc: string) => {
    const sequenceMatch = desc.match(/Sequence \(([^)]+)\)/);
    const pathwayMatch = desc.match(/Pathway \(([^)]+)\)/);
    const evidenceMatch = desc.match(/Evidence \(([^)]+)\)/);
    
    return {
      sequence: sequenceMatch ? sequenceMatch[1] : 'Evo-based disruption analysis',
      pathway: pathwayMatch ? pathwayMatch[1] : 'Gene to pathway burden mapping',
      evidence: evidenceMatch ? evidenceMatch[1] : 'ClinVar + literature integration'
    };
  };

  const speComponents = parseSPEFusion(description);

  const colorThemes = {
    blue: {
      primary: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      accent: 'bg-blue-500',
      iconBg: 'bg-blue-100'
    },
    teal: {
      primary: 'text-teal-600',
      bg: 'bg-teal-50',
      border: 'border-teal-200',
      accent: 'bg-teal-500',
      iconBg: 'bg-teal-100'
    },
    indigo: {
      primary: 'text-indigo-600',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      accent: 'bg-indigo-500',
      iconBg: 'bg-indigo-100'
    }
  };

  const theme = colorThemes[color as keyof typeof colorThemes] || colorThemes.blue;

  const speCards = [
    {
      title: 'Sequence Analysis',
      subtitle: 'Evo-based Disruption',
      description: speComponents.sequence,
      icon: Database,
      color: 'blue',
      features: ['Evolutionary conservation', 'Functional impact prediction', 'Disruption scoring']
    },
    {
      title: 'Pathway Mapping',
      subtitle: 'Gene → Pathway Burden',
      description: speComponents.pathway,
      icon: Target,
      color: 'teal',
      features: ['Biological pathway analysis', 'Burden calculation', 'Network effects']
    },
    {
      title: 'Evidence Integration',
      subtitle: 'ClinVar + Literature',
      description: speComponents.evidence,
      icon: FileText,
      color: 'indigo',
      features: ['Clinical variant database', 'Literature mining', 'Evidence tiering']
    }
  ];

  const outputFeatures = [
    { icon: ShieldCheck, label: 'Confidence Scores', color: 'text-green-600' },
    { icon: TrendingUp, label: 'Evidence Tiers', color: 'text-blue-600' },
    { icon: CheckCircle, label: 'Quality Badges', color: 'text-purple-600' },
    { icon: FileText, label: 'Rationale', color: 'text-orange-600' }
  ];

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      } : { opacity: 0, y: 60 }}
    >
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0,
          transition: { delay: 0.2, duration: 0.6 }
        } : { opacity: 0, y: 20 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm mb-6">
          <Settings size={16} />
          Technical Approach
        </div>
        <h3 className="text-3xl font-bold text-slate-800 mb-4">{title}</h3>
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme.bg} ${theme.border} border text-sm font-semibold ${theme.primary}`}>
          <TrendingUp size={16} />
          {keyMetric}
        </div>
      </motion.div>

      {/* S/P/E Fusion Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {speCards.map((card, index) => {
          const CardIcon = card.icon;
          const cardTheme = colorThemes[card.color as keyof typeof colorThemes];
          
          return (
            <motion.div
              key={card.title}
              className={`relative overflow-hidden bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border-2 ${cardTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: {
                  duration: 0.6,
                  delay: 0.4 + (index * 0.15),
                  ease: "easeOut"
                }
              } : { opacity: 0, y: 40, scale: 0.95 }}
            >
              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-16 h-16 ${cardTheme.accent} opacity-10 rounded-bl-3xl`}></div>
              
              {/* Icon */}
              <motion.div 
                className={`w-12 h-12 rounded-xl ${cardTheme.iconBg} flex items-center justify-center mb-4`}
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { 
                  scale: 1, 
                  rotate: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.6 + (index * 0.15),
                    ease: "backOut"
                  }
                } : { scale: 0, rotate: -180 }}
              >
                <CardIcon className={`w-6 h-6 ${cardTheme.primary}`} />
              </motion.div>
              
              {/* Content */}
              <h4 className={`text-lg font-bold ${cardTheme.primary} mb-2`}>{card.title}</h4>
              <p className={`text-sm font-semibold ${cardTheme.primary} mb-3`}>{card.subtitle}</p>
              <p className="text-slate-700 text-sm mb-4 leading-relaxed">{card.description}</p>
              
              {/* Features */}
              <div className="space-y-2">
                {card.features.map((feature, featureIndex) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-2 text-xs text-slate-600"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { 
                      opacity: 1, 
                      x: 0,
                      transition: {
                        delay: 0.8 + (index * 0.15) + (featureIndex * 0.1)
                      }
                    } : { opacity: 0, x: -10 }}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${cardTheme.accent}`}></div>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Output Features */}
      <motion.div
        className="bg-gradient-to-r from-slate-50 to-white rounded-2xl p-8 border border-slate-200 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0,
          transition: { delay: 1.0, duration: 0.6 }
        } : { opacity: 0, y: 20 }}
      >
        <div className="text-center mb-6">
          <h4 className="text-xl font-bold text-slate-800 mb-2">Output Components</h4>
          <p className="text-slate-600">Comprehensive analysis results with full provenance</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {outputFeatures.map((feature, index) => {
            const FeatureIcon = feature.icon;
            return (
              <motion.div
                key={feature.label}
                className="flex flex-col items-center p-4 bg-white rounded-xl border border-slate-200 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    delay: 1.2 + (index * 0.1),
                    duration: 0.5
                  }
                } : { opacity: 0, y: 20 }}
              >
                <FeatureIcon className={`w-6 h-6 ${feature.color} mb-2`} />
                <span className="text-sm font-medium text-slate-700 text-center">{feature.label}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TechnicalApproachSection;
