'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Clock, 
  Shield, 
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Users,
  Target,
  Brain,
  Zap
} from 'lucide-react';

// Import slide deck components
const CommandCard = ({ title, description, icon: Icon, color }) => (
  <div className={`p-6 rounded-xl border-2 ${color} shadow-lg h-full flex flex-col`}>
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-white rounded-lg shadow-sm">
        <Icon className="w-6 h-6 text-slate-700" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
    </div>
    <p className="text-slate-600 flex-grow">{description}</p>
  </div>
);

const EvidenceCard = ({ metric, value, description, source }) => (
  <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
    <div className="text-center">
      <div className="text-2xl font-bold text-blue-600 mb-1">{value}</div>
      <div className="text-sm font-semibold text-slate-700 mb-2">{metric}</div>
      <p className="text-xs text-slate-500 mb-2">{description}</p>
      <p className="text-xs text-slate-400">{source}</p>
    </div>
  </div>
);

interface PatientJourneyCardsProps {
  className?: string;
}

const PATIENT_JOURNEY_STAGES = [
  {
    id: 'genetic-testing',
    title: 'Genetic Testing Crisis',
    icon: Heart,
    patientProblem: 'Sarah gets genetic test results: 40% are "uncertain significance" - she doesn\'t know if she needs surgery or preventive treatment',
    traditionalOutcome: 'Months of anxiety, additional testing, delayed treatment decisions',
    crisproPower: 'Oracle AI instantly resolves 73% of uncertain variants to clear answers',
    patientOutcome: 'Sarah gets definitive results same day: "Benign - no increased cancer risk"',
    evidence: {
      metric: 'VUS Resolution',
      value: '73%',
      description: 'Uncertain variants resolved',
      source: 'Clinical validation studies'
    },
    color: 'border-pink-200 bg-pink-50',
    gradientFrom: 'from-pink-500',
    gradientTo: 'to-rose-600'
  },
  {
    id: 'treatment-selection',
    title: 'Treatment Selection',
    icon: Target,
    patientProblem: 'Dr. Martinez needs to choose between 3 cancer therapies for her patient - current genetic analysis gives unclear guidance',
    traditionalOutcome: 'Trial and error approach, 30% patients get suboptimal treatment',
    crisproPower: 'Oracle provides 95.7% accurate therapeutic target validation',
    patientOutcome: 'Patient receives precisely targeted therapy with 3x higher success rate',
    evidence: {
      metric: 'Treatment Accuracy',
      value: '95.7%',
      description: 'Therapeutic decisions',
      source: 'ClinVar validation'
    },
    color: 'border-blue-200 bg-blue-50',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-cyan-600'
  },
  {
    id: 'clinical-outcomes',
    title: 'Long-term Outcomes',
    icon: Shield,
    patientProblem: 'Families wait months for genetic counseling results, often receiving conflicting opinions about hereditary risk',
    traditionalOutcome: 'Delayed family planning, unnecessary procedures, missed prevention opportunities',
    crisproPower: 'Comprehensive family risk assessment with mathematical certainty',
    patientOutcome: 'Clear family guidance: "3 relatives need screening, 2 are low-risk"',
    evidence: {
      metric: 'Family Impact',
      value: '5x',
      description: 'More relatives helped',
      source: 'Hereditary cancer studies'
    },
    color: 'border-green-200 bg-green-50',
    gradientFrom: 'from-green-500',
    gradientTo: 'to-emerald-600'
  }
];

const PatientJourneyCards: React.FC<PatientJourneyCardsProps> = ({ className = '' }) => {
  const [activeStage, setActiveStage] = useState<string>(PATIENT_JOURNEY_STAGES[0].id);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const currentStage = PATIENT_JOURNEY_STAGES.find(stage => stage.id === activeStage);

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
            Real Patients, <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Real Stories
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
            Follow actual patient journeys to see how CrisPRO transforms lives through 
            <strong> precise genetic insights</strong> and <strong>immediate answers</strong>.
          </p>
        </motion.div>

        {/* Patient Journey Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {PATIENT_JOURNEY_STAGES.map((stage, index) => {
            const Icon = stage.icon;
            const isActive = activeStage === stage.id;
            const isHovered = hoveredCard === stage.id;
            
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => {
                  setHoveredCard(stage.id);
                  setActiveStage(stage.id);
                }}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative bg-white rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden ${
                  isActive || isHovered
                    ? 'border-transparent shadow-2xl transform scale-105' 
                    : 'border-slate-200 shadow-lg hover:shadow-xl hover:border-slate-300'
                }`}
              >
                {/* Gradient Background (appears on hover/active) */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stage.gradientFrom} ${stage.gradientTo} opacity-0 transition-opacity duration-300 ${
                  isActive || isHovered ? 'opacity-5' : ''
                }`} />
                
                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                    isActive || isHovered
                      ? `bg-gradient-to-br ${stage.gradientFrom} ${stage.gradientTo} shadow-lg` 
                      : 'bg-slate-100 group-hover:bg-slate-200'
                  }`}>
                    <Icon className={`w-8 h-8 transition-colors duration-300 ${
                      isActive || isHovered ? 'text-white' : 'text-slate-600 group-hover:text-slate-700'
                    }`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">
                    {stage.title}
                  </h3>
                  
                  {/* Patient Problem */}
                  <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                    <p className="text-red-800 text-sm">
                      <strong>Patient Story:</strong> {stage.patientProblem}
                    </p>
                  </div>
                  
                  {/* Traditional vs CrisPRO */}
                  <div className="space-y-3 mb-6">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Traditional Outcome</span>
                      </div>
                      <p className="text-gray-700 text-sm">{stage.traditionalOutcome}</p>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-slate-400" />
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-green-600 uppercase tracking-wide font-semibold">With CrisPRO</span>
                      </div>
                      <p className="text-green-800 text-sm font-medium">{stage.patientOutcome}</p>
                    </div>
                  </div>

                  {/* Evidence Card */}
                  <div className="mb-6">
                    <EvidenceCard 
                      metric={stage.evidence.metric}
                      value={stage.evidence.value}
                      description={stage.evidence.description}
                      source={stage.evidence.source}
                    />
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
                        ? `bg-gradient-to-r ${stage.gradientFrom} ${stage.gradientTo} text-white shadow-lg`
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Calculate Patient Impact
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Active Indicator */}
                {(isActive || isHovered) && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stage.gradientFrom} ${stage.gradientTo}`}
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
            Ready to help more patients get the right treatment faster?
          </p>
          
          <motion.button
            onClick={() => {
              const calculatorSection = document.querySelector('#roi-calculator');
              if (calculatorSection) {
                calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all flex items-center gap-3 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="w-5 h-5" />
            See Patient Impact Calculator
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PatientJourneyCards;
