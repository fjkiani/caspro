'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  FlaskConical, 
  Shield, 
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  Brain,
  Zap
} from 'lucide-react';

// Import slide deck components
const ZetaScoreGauge = ({ score, label, color }: { score: string; label: string; color: string }) => (
  <div className="bg-white p-4 rounded-xl text-center shadow-inner relative overflow-hidden">
    <p className="text-sm font-semibold text-slate-600 mb-2">{label}</p>
    <div className="relative w-full max-w-xs mx-auto h-16 my-2">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 border-t-[6px] border-l-[6px] border-r-[6px] border-gray-200 rounded-t-full"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 border-t-[6px] border-l-[6px] border-r-[6px] border-transparent rounded-t-full bg-clip-border" style={{backgroundImage: color === 'green' ? 'linear-gradient(to right, #ef4444, #facc15, #10b981)' : 'linear-gradient(to right, #10b981, #facc15, #ef4444)', backgroundOrigin: 'border-box'}}></div>
      <motion.div 
        initial={{ rotate: color === 'green' ? -60 : 60 }} 
        animate={{ rotate: color === 'green' ? 45 : -45 }} 
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }} 
        className="absolute bottom-0 left-1/2 w-1 h-16 origin-bottom -ml-0.5"
      >
        <div className="w-full h-full bg-slate-800 rounded-t-full"></div>
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-slate-800 rounded-full border border-white"></div>
      </motion.div>
    </div>
    <div className="flex justify-between w-32 mx-auto -mt-4 text-xs font-bold">
      <span className={color === 'green' ? 'text-red-600' : 'text-green-600'}>
        {color === 'green' ? 'FAIL' : 'VALID'}
      </span>
      <span className={color === 'green' ? 'text-green-600' : 'text-red-600'}>
        {color === 'green' ? 'VALID' : 'FAIL'}
      </span>
    </div>
    <div className="mt-2">
      <p className={`text-2xl font-bold font-mono ${color === 'green' ? 'text-green-600' : 'text-red-600'}`}>{score}</p>
      <p className={`text-xs font-semibold ${color === 'green' ? 'text-green-700' : 'text-red-700'} mt-1`}>
        {color === 'green' ? 'VALIDATED' : 'FAILED'}
      </p>
    </div>
  </div>
);

interface RDChallenge {
  id: string;
  title: string;
  icon: React.ElementType;
  traditionalProblem: string;
  traditionalOutcome: {
    cost: string;
    time: string;
    successRate: string;
    impact: string;
  };
  crisproPower: string;
  crisprOOutcome: {
    cost: string;
    time: string;
    successRate: string;
    impact: string;
  };
  evidence: {
    metric: string;
    value: string;
    description: string;
    source: string;
  };
  color: string;
  gradientFrom: string;
  gradientTo: string;
  demoComponent: React.ReactNode;
}

const RD_CHALLENGES: RDChallenge[] = [
  {
    id: 'target-validation',
    title: 'Target Validation Crisis',
    icon: Target,
    traditionalProblem: 'Biotech spends 18 months and $2.5M to validate each therapeutic target. 85% fail due to unclear genetic evidence, wasting resources and delaying programs.',
    traditionalOutcome: {
      cost: '$2.5M per target',
      time: '18 months',
      successRate: '15% success rate',
      impact: '85% targets fail validation'
    },
    crisproPower: 'Oracle Engine provides instant target validation with 95.7% AUROC ClinVar accuracy. Mathematical proof of target viability in 1 week instead of 18 months.',
    crisprOOutcome: {
      cost: '$50K per target',
      time: '1 week',
      successRate: '90% success rate',
      impact: 'Validated targets only'
    },
    evidence: {
      metric: 'ClinVar Accuracy',
      value: '95.7%',
      description: 'AUROC validation across 53,210 variants',
      source: 'Evo2 paper validation'
    },
    color: 'blue',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-cyan-600',
    demoComponent: <ZetaScoreGauge score="+18,420" label="Target Validation" color="green" />
  },
  {
    id: 'lead-discovery',
    title: 'Lead Discovery Bottleneck',
    icon: FlaskConical,
    traditionalProblem: 'Drug discovery requires screening millions of compounds over 3-5 years. Most leads fail due to poor target engagement or unexpected toxicity.',
    traditionalOutcome: {
      cost: '$50M+ per program',
      time: '3-5 years',
      successRate: '5% compounds advance',
      impact: 'Massive screening required'
    },
    crisproPower: 'Forge Engine generates optimized therapeutic candidates with 70% Pfam-hit rate and AlphaFold 3 validated structures. Engineering leads, not discovering them.',
    crisprOOutcome: {
      cost: '$5M per program',
      time: '6 months',
      successRate: '60% compounds advance',
      impact: 'Designed, not discovered'
    },
    evidence: {
      metric: 'Pfam Hit Rate',
      value: '70%',
      description: 'Generated compounds with functional domains',
      source: 'Evo2 generative validation'
    },
    color: 'purple',
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-violet-600',
    demoComponent: <ZetaScoreGauge score="-26,140" label="Lead Optimization" color="red" />
  },
  {
    id: 'preclinical-derisking',
    title: 'Pre-Clinical De-Risking',
    icon: Shield,
    traditionalProblem: 'Pre-clinical studies cost $10M+ and take 2-3 years, yet 70% of candidates still fail in Phase I due to unpredicted safety or efficacy issues.',
    traditionalOutcome: {
      cost: '$10M+ per candidate',
      time: '2-3 years',
      successRate: '30% reach Phase I',
      impact: 'High late-stage failures'
    },
    crisproPower: 'Boltz Engine provides structural validation with 95.8% confidence scores and DMS correlation. In-silico de-risking before expensive wet-lab studies.',
    crisprOOutcome: {
      cost: '$1M per candidate',
      time: '3 months',
      successRate: '80% reach Phase I',
      impact: 'Pre-validated candidates'
    },
    evidence: {
      metric: 'DMS Correlation',
      value: '95.8%',
      description: 'Structural confidence validation',
      source: 'AlphaFold 3 integration'
    },
    color: 'green',
    gradientFrom: 'from-green-500',
    gradientTo: 'to-emerald-600',
    demoComponent: <ZetaScoreGauge score="+12,850" label="Safety Profile" color="green" />
  }
];

interface BiotechRDChallengesProps {
  className?: string;
}

const BiotechRDChallenges: React.FC<BiotechRDChallengesProps> = ({ className = '' }) => {
  const [activeChallenge, setActiveChallenge] = useState<string>(RD_CHALLENGES[0].id);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const currentChallenge = RD_CHALLENGES.find(challenge => challenge.id === activeChallenge);

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
            Three R&D <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Crises Solved
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
            See how CrisPRO transforms the <strong>biggest bottlenecks</strong> in biotech R&D from 
            <strong> expensive gambles</strong> into <strong>predictable engineering</strong>.
          </p>
          
          {/* Crisis Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="text-2xl font-bold text-red-600">90%</div>
              <div className="text-sm text-slate-600">R&D Failure Rate</div>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="text-2xl font-bold text-red-600">$2.6B</div>
              <div className="text-sm text-slate-600">Cost per Drug</div>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="text-2xl font-bold text-red-600">15 years</div>
              <div className="text-sm text-slate-600">Development Time</div>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="text-2xl font-bold text-red-600">85%</div>
              <div className="text-sm text-slate-600">Target Failures</div>
            </div>
          </div>
        </motion.div>

        {/* Challenge Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {RD_CHALLENGES.map((challenge, index) => {
            const Icon = challenge.icon;
            const isActive = activeChallenge === challenge.id;
            const isHovered = hoveredCard === challenge.id;
            
            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => {
                  setHoveredCard(challenge.id);
                  setActiveChallenge(challenge.id);
                }}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative bg-white rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden ${
                  isActive || isHovered
                    ? 'border-transparent shadow-2xl transform scale-105' 
                    : 'border-slate-200 shadow-lg hover:shadow-xl hover:border-slate-300'
                }`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${challenge.gradientFrom} ${challenge.gradientTo} opacity-0 transition-opacity duration-300 ${
                  isActive || isHovered ? 'opacity-5' : ''
                }`} />
                
                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                    isActive || isHovered
                      ? `bg-gradient-to-br ${challenge.gradientFrom} ${challenge.gradientTo} shadow-lg` 
                      : 'bg-slate-100 group-hover:bg-slate-200'
                  }`}>
                    <Icon className={`w-8 h-8 transition-colors duration-300 ${
                      isActive || isHovered ? 'text-white' : 'text-slate-600 group-hover:text-slate-700'
                    }`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">
                    {challenge.title}
                  </h3>
                  
                  {/* Traditional Problem */}
                  <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="text-xs text-red-600 uppercase tracking-wide font-semibold">Traditional R&D</span>
                    </div>
                    <p className="text-red-800 text-sm">{challenge.traditionalProblem}</p>
                  </div>
                  
                  {/* Traditional Metrics */}
                  <div className="mb-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-red-100 rounded">
                      <div className="text-red-700 font-semibold">{challenge.traditionalOutcome.cost}</div>
                      <div className="text-red-600">Cost</div>
                    </div>
                    <div className="p-2 bg-red-100 rounded">
                      <div className="text-red-700 font-semibold">{challenge.traditionalOutcome.time}</div>
                      <div className="text-red-600">Time</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center mb-4">
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </div>
                  
                  {/* CrisPRO Solution */}
                  <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-green-600 uppercase tracking-wide font-semibold">With CrisPRO</span>
                    </div>
                    <p className="text-green-800 text-sm font-medium">{challenge.crisproPower}</p>
                  </div>

                  {/* CrisPRO Metrics */}
                  <div className="mb-6 grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-green-100 rounded">
                      <div className="text-green-700 font-semibold">{challenge.crisprOOutcome.cost}</div>
                      <div className="text-green-600">Cost</div>
                    </div>
                    <div className="p-2 bg-green-100 rounded">
                      <div className="text-green-700 font-semibold">{challenge.crisprOOutcome.time}</div>
                      <div className="text-green-600">Time</div>
                    </div>
                  </div>

                  {/* Live Demo */}
                  <div className="mb-6">
                    {challenge.demoComponent}
                  </div>

                  {/* Evidence */}
                  <div className="mb-6 p-4 bg-slate-50 rounded-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{challenge.evidence.value}</div>
                      <div className="text-sm font-semibold text-slate-700 mb-2">{challenge.evidence.metric}</div>
                      <p className="text-xs text-slate-500 mb-2">{challenge.evidence.description}</p>
                      <p className="text-xs text-slate-400">{challenge.evidence.source}</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    onClick={() => {
                      const calculatorSection = document.querySelector('#roi-calculator');
                      if (calculatorSection) {
                        calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      isActive || isHovered
                        ? `bg-gradient-to-r ${challenge.gradientFrom} ${challenge.gradientTo} text-white shadow-lg`
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Calculate Your ROI Impact
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Active Indicator */}
                {(isActive || isHovered) && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${challenge.gradientFrom} ${challenge.gradientTo}`}
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
          className="text-center"
        >
          <p className="text-lg text-slate-600 mb-6">
            Ready to transform your R&D from gambling to engineering?
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
            <DollarSign className="w-5 h-5" />
            Calculate Your R&D ROI
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BiotechRDChallenges;
