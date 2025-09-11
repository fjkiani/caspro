'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Settings, Microscope, Briefcase, Database, Target, FileText, 
  ShieldCheck, TrendingUp, CheckCircle, ArrowRight, Zap, Brain, 
  Layers, Users, Activity, AlertTriangle, Award, Clock, Star
} from 'lucide-react';

interface DynamicCapabilityCardProps {
  title: string;
  keyMetric: string;
  description: string;
  icon: string;
  color: string;
  type: 'technical' | 'scientific' | 'business';
  // Optional structured data coming from config
  components?: Array<{ title: string; subtitle?: string; iconName: string; color: 'blue' | 'teal' | 'indigo'; features?: string[] }>;
  features?: string[];
  bullets?: { title: string; description: string }[];
}

interface ParsedContent {
  type: string;
  mainContent: string;
  features: (string | { title: string; description: string })[];
  components?: Array<{
    title: string;
    subtitle: string;
    icon: any;
    color: string;
  }>;
}

const DynamicCapabilityCard: React.FC<DynamicCapabilityCardProps> = ({
  title,
  keyMetric,
  description,
  icon,
  color,
  type,
  components,
  features,
  bullets
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px 0px -100px 0px",
    amount: 0.3
  });

  const colorThemes = {
    blue: {
      primary: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      accent: 'bg-blue-500',
      iconBg: 'bg-blue-100',
      gradient: 'from-blue-50 to-blue-100'
    },
    teal: {
      primary: 'text-teal-600',
      bg: 'bg-teal-50',
      border: 'border-teal-200',
      accent: 'bg-teal-500',
      iconBg: 'bg-teal-100',
      gradient: 'from-teal-50 to-teal-100'
    },
    indigo: {
      primary: 'text-indigo-600',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      accent: 'bg-indigo-500',
      iconBg: 'bg-indigo-100',
      gradient: 'from-indigo-50 to-indigo-100'
    }
  };

  const theme = colorThemes[color as keyof typeof colorThemes] || colorThemes.blue;

  // Parse different types of content into visual components
  const parseContent = (desc: string, type: string): ParsedContent => {
    switch (type) {
      case 'technical':
        return parseTechnicalContent(desc);
      case 'scientific':
        return parseScientificContent(desc);
      case 'business':
        return parseBusinessContent(desc);
      default:
        return { type: 'standard', mainContent: desc, features: [] };
    }
  };

  const parseTechnicalContent = (desc: string): ParsedContent => {
    // Look for S/P/E fusion patterns
    if (desc.includes('S/P/E fusion')) {
      const sequenceMatch = desc.match(/Sequence \(([^)]+)\)/);
      const pathwayMatch = desc.match(/Pathway \(([^)]+)\)/);
      const evidenceMatch = desc.match(/Evidence \(([^)]+)\)/);
      
      return {
        type: 'spe-fusion',
        mainContent: 'S/P/E Fusion Analysis',
        components: [
          {
            title: 'Sequence Analysis',
            subtitle: sequenceMatch ? sequenceMatch[1] : 'Evo-based disruption',
            icon: Database,
            color: 'blue'
          },
          {
            title: 'Pathway Mapping',
            subtitle: pathwayMatch ? pathwayMatch[1] : 'Gene → pathway burden',
            icon: Target,
            color: 'teal'
          },
          {
            title: 'Evidence Integration',
            subtitle: evidenceMatch ? evidenceMatch[1] : 'ClinVar + literature',
            icon: FileText,
            color: 'indigo'
          }
        ],
        features: ['Confidence Scores', 'Evidence Tiers', 'Quality Badges', 'Rationale']
      };
    }

    // Look for S/P/E + Cohort Lab patterns
    if (desc.includes('S/P/E scoring') && desc.includes('Cohort Lab')) {
      return {
        type: 'cohort-integration',
        mainContent: 'Genomics-First S/P/E + Cohort Integration',
        features: [
          'Genomics-first S/P/E scoring',
          'Insight chips generation',
          'ClinVar/coverage priors',
          'Cohort Lab extracts',
          'Benchmark grounding'
        ]
      };
    }

    // Look for regimen safety patterns
    if (desc.includes('regimen') || desc.includes('interaction')) {
      return {
        type: 'safety-analysis',
        mainContent: 'Regimen Safety & Interaction Analysis',
        features: ['Regimen-aware checks', 'Cumulative toxicity analysis', 'Interaction mapping', 'Safety flags']
      };
    }

    // Look for Evidence services patterns
    if (desc.includes('Evidence services') || desc.includes('literature')) {
      return {
        type: 'evidence-integration',
        mainContent: 'Evidence Integration Services',
        features: ['Literature mining', 'ClinVar integration', 'Provenance tracking', 'Badge system', 'Guidance agents']
      };
    }

    return {
      type: 'standard',
      mainContent: desc,
      features: []
    };
  };

  const parseScientificContent = (desc: string): ParsedContent => {
    if (desc.includes('Auditable Provenance')) {
      return {
        type: 'provenance',
        mainContent: 'Auditable Scientific Provenance',
        features: ['Run ID tracking', 'Profile documentation', 'Signal translation', 'Biology mapping']
      };
    }

    if (desc.includes('Contextual Confidence') || desc.includes('contextualize variant biology')) {
      return {
        type: 'contextual',
        mainContent: 'Contextual Confidence Analysis',
        features: [
          'Variant biology contextualization',
          'Cohort context integration',
          'Confidence strengthening',
          'Evidence-based outputs'
        ]
      };
    }

    if (desc.includes('Safety Context')) {
      return {
        type: 'safety',
        mainContent: 'Safety Context Integration',
        features: ['Pharmacology analysis', 'Toxicity signals', 'Safety refinement', 'Risk assessment']
      };
    }

    if (desc.includes('Evidence‑Backed Context')) {
      return {
        type: 'evidence-backed',
        mainContent: 'Evidence-Backed Scientific Context',
        features: ['Multi-modal evidence', 'Auditable context', 'Research support', 'Provider integration']
      };
    }

    return {
      type: 'standard',
      mainContent: desc,
      features: []
    };
  };

  const parseBusinessContent = (desc: string): ParsedContent => {
    // Extract bullet points from markdown format
    const bulletPoints = desc.match(/- \*\*([^*]+):\*\* ([^\n]+)/g);
    if (bulletPoints) {
      const features = bulletPoints.map(point => {
        const match = point.match(/- \*\*([^*]+):\*\* ([^\n]+)/);
        return match ? { title: match[1], description: match[2] } : null;
      }).filter((feature): feature is { title: string; description: string } => feature !== null);

      return {
        type: 'bullet-points',
        mainContent: 'Business Value Proposition',
        features: features
      };
    }

    return {
      type: 'standard',
      mainContent: desc,
      features: []
    };
  };

  // If structured data is present, prefer it; otherwise fall back to parser
  const content: ParsedContent = (() => {
    if (components && components.length > 0) {
      return {
        type: title.toLowerCase().includes('technical') ? 'spe-fusion' : 'standard',
        mainContent: title,
        features: (features ?? []) as string[],
        components: components.map((c) => ({
          title: c.title,
          subtitle: c.subtitle ?? '',
          icon: (c.iconName === 'Database' ? Database : c.iconName === 'Target' ? Target : c.iconName === 'FileText' ? FileText : Users),
          color: c.color
        }))
      } as ParsedContent;
    }
    if (bullets && bullets.length > 0) {
      return { type: 'bullet-points', mainContent: title, features: bullets } as ParsedContent;
    }
    if (features && features.length > 0) {
      return { type: 'standard', mainContent: title, features } as ParsedContent;
    }
    return parseContent(description, type);
  })();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'technical': return Settings;
      case 'scientific': return Microscope;
      case 'business': return Briefcase;
      default: return Settings;
    }
  };

  const TypeIcon = getTypeIcon(type);

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
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0,
          transition: { delay: 0.2, duration: 0.6 }
        } : { opacity: 0, y: 20 }}
      >
        <div className={`inline-flex items-center gap-2 px-4 py-2 ${theme.bg} rounded-full ${theme.border} border text-sm font-semibold ${theme.primary} mb-4`}>
          <TypeIcon size={16} />
          {title}
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-3">{content.mainContent}</h3>
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme.bg} ${theme.border} border text-sm font-semibold ${theme.primary}`}>
          <TrendingUp size={16} />
          {keyMetric}
        </div>
      </motion.div>

      {/* S/P/E Fusion Special Layout */}
      {content.type === 'spe-fusion' && content.components && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {content.components.map((component, index) => {
            const ComponentIcon = component.icon;
            const componentTheme = colorThemes[component.color as keyof typeof colorThemes];
            
            return (
              <motion.div
                key={component.title}
                className={`relative overflow-hidden bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border-2 ${componentTheme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
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
                <div className={`absolute top-0 right-0 w-16 h-16 ${componentTheme.accent} opacity-10 rounded-bl-3xl`}></div>
                
                <motion.div 
                  className={`w-12 h-12 rounded-xl ${componentTheme.iconBg} flex items-center justify-center mb-4`}
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
                  <ComponentIcon className={`w-6 h-6 ${componentTheme.primary}`} />
                </motion.div>
                
                <h4 className={`text-lg font-bold ${componentTheme.primary} mb-2`}>{component.title}</h4>
                <p className={`text-sm font-semibold ${componentTheme.primary} mb-3`}>{component.subtitle}</p>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Cohort Integration Special Layout */}
      {content.type === 'cohort-integration' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200 shadow-lg"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { 
              opacity: 1, 
              x: 0,
              transition: { delay: 0.4, duration: 0.6 }
            } : { opacity: 0, x: -40 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-bold text-blue-600">Genomics-First S/P/E</h4>
            </div>
            <p className="text-slate-700 text-sm mb-4">Advanced scoring with insight chips and ClinVar/coverage priors</p>
            <div className="space-y-2">
              {['Genomics-first S/P/E scoring', 'Insight chips generation', 'ClinVar/coverage priors'].map((feature, index) => (
                <div key={feature} className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 border-2 border-teal-200 shadow-lg"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { 
              opacity: 1, 
              x: 0,
              transition: { delay: 0.6, duration: 0.6 }
            } : { opacity: 0, x: 40 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <h4 className="text-lg font-bold text-teal-600">Cohort Lab Integration</h4>
            </div>
            <p className="text-slate-700 text-sm mb-4">Optional cohort extracts and benchmarks to ground findings</p>
            <div className="space-y-2">
              {['Cohort Lab extracts', 'Benchmark grounding', 'Data alignment'].map((feature, index) => (
                <div key={feature} className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Business Value Bullet Points */}
      {content.type === 'bullet-points' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {content.features.map((feature, index) => {
            if (typeof feature === 'string') return null;
            return (
              <motion.div
                key={feature.title}
                className={`bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 border-2 ${theme.border} shadow-lg hover:shadow-xl transition-all duration-300`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                animate={isInView ? { 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.4 + (index * 0.1),
                    ease: "easeOut"
                  }
                } : { opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg ${theme.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <CheckCircle className={`w-5 h-5 ${theme.primary}`} />
                  </div>
                  <div>
                    <h4 className={`text-lg font-bold ${theme.primary} mb-2`}>{feature.title}</h4>
                    <p className="text-slate-700 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Standard Features Grid */}
      {content.features.length > 0 && content.type !== 'spe-fusion' && content.type !== 'bullet-points' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {content.features.map((feature, index) => {
            const featureText = typeof feature === 'string' ? feature : feature.title;
            return (
              <motion.div
                key={featureText}
                className="flex flex-col items-center p-4 bg-white rounded-xl border border-slate-200 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    delay: 0.6 + (index * 0.1),
                    duration: 0.5
                  }
                } : { opacity: 0, y: 20 }}
              >
                <div className={`w-8 h-8 rounded-lg ${theme.iconBg} flex items-center justify-center mb-2`}>
                  <Star className={`w-4 h-4 ${theme.primary}`} />
                </div>
                <span className="text-sm font-medium text-slate-700 text-center">{featureText}</span>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Fallback for standard content */}
      {content.type === 'standard' && (
        <motion.div
          className={`bg-gradient-to-r ${theme.gradient} rounded-2xl p-6 border ${theme.border} shadow-sm`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.4, duration: 0.6 }
          } : { opacity: 0, y: 20 }}
        >
          <p className="text-slate-700 leading-relaxed">{description}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DynamicCapabilityCard;
