'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Search, Target, Zap, TrendingUp, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';
import { therapeuticStrategies } from '@/data/learn/oncology-101/metastasis-data';

const StrategyCard = ({ strategy, isExpanded, onToggle, delay = 0 }: {
  strategy: any;
  isExpanded: boolean;
  onToggle: () => void;
  delay?: number;
}) => {
  const getIcon = (category: string) => {
    switch (category) {
      case 'Prevention Strategies': return Shield;
      case 'Early Detection': return Search;
      case 'Targeted Interventions': return Target;
      case 'Emerging Approaches': return Zap;
      default: return Target;
    }
  };

  const getColor = (category: string) => {
    switch (category) {
      case 'Prevention Strategies': return { text: 'text-green-600', bg: 'from-green-50 to-green-100', border: 'border-green-200' };
      case 'Early Detection': return { text: 'text-blue-600', bg: 'from-blue-50 to-blue-100', border: 'border-blue-200' };
      case 'Targeted Interventions': return { text: 'text-purple-600', bg: 'from-purple-50 to-purple-100', border: 'border-purple-200' };
      case 'Emerging Approaches': return { text: 'text-orange-600', bg: 'from-orange-50 to-orange-100', border: 'border-orange-200' };
      default: return { text: 'text-gray-600', bg: 'from-gray-50 to-gray-100', border: 'border-gray-200' };
    }
  };

  const Icon = getIcon(strategy.category);
  const colors = getColor(strategy.category);

  return (
    <motion.div
      className={`bg-gradient-to-r ${colors.bg} rounded-lg border ${colors.border} overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div 
        className="p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Icon className={`w-8 h-8 ${colors.text}`} />
            <h3 className="text-xl font-semibold text-slate-900">{strategy.category}</h3>
          </div>
          <div className={`w-6 h-6 ${colors.text} transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </div>
        </div>
      </div>

      {isExpanded && (
        <motion.div
          className="px-6 pb-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="space-y-3">
            {strategy.approaches.map((approach: string, index: number) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded border border-slate-200">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">{approach}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const TherapyTimeline = () => {
  const timelinePhases = [
    {
      phase: 'Prevention',
      timing: 'Before Metastasis',
      strategies: ['Adjuvant therapy', 'Risk assessment', 'Lifestyle modifications'],
      effectiveness: 'High',
      color: 'green'
    },
    {
      phase: 'Early Detection',
      timing: 'Micrometastatic Disease',
      strategies: ['CTC monitoring', 'ctDNA analysis', 'Imaging surveillance'],
      effectiveness: 'Moderate-High',
      color: 'blue'
    },
    {
      phase: 'Intervention',
      timing: 'Oligometastatic Disease',
      strategies: ['Targeted therapy', 'Local ablation', 'Immunotherapy'],
      effectiveness: 'Moderate',
      color: 'purple'
    },
    {
      phase: 'Management',
      timing: 'Widespread Metastases',
      strategies: ['Systemic therapy', 'Palliative care', 'Supportive measures'],
      effectiveness: 'Variable',
      color: 'orange'
    }
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-slate-900 mb-6">
        Therapeutic Timeline: Window of Opportunity
      </h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-300"></div>
        
        <div className="space-y-8">
          {timelinePhases.map((phase, index) => (
            <div key={phase.phase} className="relative flex items-start space-x-6">
              {/* Timeline dot */}
              <div className={`w-4 h-4 rounded-full bg-${phase.color}-500 border-4 border-white shadow-lg z-10`}></div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-slate-900">{phase.phase}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm bg-${phase.color}-100 text-${phase.color}-800`}>
                    {phase.effectiveness} Effectiveness
                  </span>
                </div>
                <p className="text-slate-600 mb-3">{phase.timing}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {phase.strategies.map((strategy, strategyIndex) => (
                    <div key={strategyIndex} className={`p-2 bg-${phase.color}-50 border border-${phase.color}-200 rounded text-sm text-slate-700`}>
                      {strategy}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EmergingTechnologies = () => {
  const technologies = [
    {
      name: 'AI-Powered Prediction',
      description: 'Machine learning algorithms to predict metastatic risk and optimal treatment strategies',
      status: 'In Development',
      potential: 'High',
      timeline: '2-5 years',
      icon: TrendingUp
    },
    {
      name: 'Liquid Biopsies',
      description: 'Blood-based tests for early detection of circulating tumor cells and DNA',
      status: 'Clinical Trials',
      potential: 'High',
      timeline: '1-3 years',
      icon: Search
    },
    {
      name: 'CAR-T Cell Therapy',
      description: 'Genetically modified immune cells targeting metastatic cancer cells',
      status: 'FDA Approved (limited)',
      potential: 'Moderate-High',
      timeline: 'Available',
      icon: Target
    },
    {
      name: 'Nanoparticle Delivery',
      description: 'Targeted drug delivery systems for site-specific metastasis treatment',
      status: 'Preclinical',
      potential: 'Moderate',
      timeline: '5-10 years',
      icon: Zap
    }
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-slate-900 mb-6">
        Emerging Technologies and Future Directions
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            className="p-6 border border-slate-200 rounded-lg hover:shadow-md transition-shadow duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start space-x-4">
              <tech.icon className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 mb-2">{tech.name}</h4>
                <p className="text-slate-700 text-sm mb-3">{tech.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Status:</span>
                    <span className="font-medium text-slate-900">{tech.status}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Potential:</span>
                    <span className={`font-medium ${
                      tech.potential === 'High' ? 'text-green-600' : 
                      tech.potential === 'Moderate-High' ? 'text-blue-600' : 'text-orange-600'
                    }`}>
                      {tech.potential}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Timeline:</span>
                    <span className="font-medium text-slate-900">{tech.timeline}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ChallengesAndLimitations = () => {
  const challenges = [
    {
      challenge: 'Therapeutic Resistance',
      description: 'Cancer cells develop resistance to treatments over time',
      impact: 'High',
      solutions: ['Combination therapies', 'Sequential treatment strategies', 'Resistance monitoring']
    },
    {
      challenge: 'Heterogeneity',
      description: 'Metastatic sites may differ genetically from primary tumors',
      impact: 'High',
      solutions: ['Multi-site biopsies', 'Liquid biopsies', 'Broad-spectrum approaches']
    },
    {
      challenge: 'Early Detection',
      description: 'Difficulty detecting micrometastatic disease',
      impact: 'Moderate-High',
      solutions: ['Improved imaging', 'Biomarker development', 'AI-assisted diagnosis']
    },
    {
      challenge: 'Cost and Access',
      description: 'Advanced therapies are expensive and not universally available',
      impact: 'Moderate',
      solutions: ['Cost-effectiveness studies', 'Global access programs', 'Generic alternatives']
    }
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-slate-900 mb-6">
        Current Challenges and Limitations
      </h3>
      
      <div className="space-y-6">
        {challenges.map((item, index) => (
          <motion.div
            key={item.challenge}
            className="border border-slate-200 rounded-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-semibold text-slate-900">{item.challenge}</h4>
              <span className={`px-3 py-1 rounded-full text-sm ${
                item.impact === 'High' ? 'bg-red-100 text-red-800' :
                item.impact === 'Moderate-High' ? 'bg-orange-100 text-orange-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {item.impact} Impact
              </span>
            </div>
            <p className="text-slate-700 mb-4">{item.description}</p>
            <div>
              <h5 className="font-medium text-slate-900 mb-2">Potential Solutions:</h5>
              <div className="flex flex-wrap gap-2">
                {item.solutions.map((solution, solutionIndex) => (
                  <span
                    key={solutionIndex}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-200"
                  >
                    {solution}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const TherapeuticStrategiesSection: React.FC = () => {
  const [expandedStrategies, setExpandedStrategies] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const toggleStrategy = (category: string) => {
    const newExpanded = new Set(expandedStrategies);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedStrategies(newExpanded);
  };

  const toggleAll = () => {
    if (showAll) {
      setExpandedStrategies(new Set());
    } else {
      setExpandedStrategies(new Set(therapeuticStrategies.map(s => s.category)));
    }
    setShowAll(!showAll);
  };

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Therapeutic Strategies: Fighting Metastasis"
        subtitle="Current approaches and future directions for preventing and treating metastatic disease"
        color="orange"
      />

      {/* Introduction */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">
          From Understanding to Action
        </h3>
        <p className="text-slate-700 mb-4">
          Our understanding of metastatic biology has led to the development of multiple therapeutic 
          strategies, each targeting different aspects of the metastatic cascade. The key is to match 
          the right strategy to the right patient at the right time.
        </p>
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
          <p className="text-orange-800 font-medium">
            The most effective approach often involves combining multiple strategies to target 
            different steps in the metastatic process simultaneously.
          </p>
        </div>
      </div>

      {/* Therapeutic Timeline */}
      <TherapyTimeline />

      {/* Strategy Categories */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-slate-900">
            Therapeutic Approaches by Category
          </h3>
          <button
            onClick={toggleAll}
            className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            {showAll ? 'Collapse All' : 'Expand All Details'}
          </button>
        </div>
        
        <div className="space-y-6">
          {therapeuticStrategies.map((strategy, index) => (
            <StrategyCard
              key={strategy.category}
              strategy={strategy}
              isExpanded={expandedStrategies.has(strategy.category)}
              onToggle={() => toggleStrategy(strategy.category)}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>

      {/* Emerging Technologies */}
      <EmergingTechnologies />

      {/* Challenges and Limitations */}
      <ChallengesAndLimitations />

      {/* Future Outlook */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-slate-900 mb-6">The Future of Metastasis Treatment</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Clock className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h4 className="font-semibold text-slate-900 mb-2">Earlier Detection</h4>
            <p className="text-slate-700 text-sm">
              Advanced diagnostics will enable detection of metastasis at the single-cell level
            </p>
          </div>
          <div className="text-center">
            <Target className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-slate-900 mb-2">Precision Targeting</h4>
            <p className="text-slate-700 text-sm">
              Personalized therapies based on individual tumor genetics and metastatic patterns
            </p>
          </div>
          <div className="text-center">
            <Shield className="w-12 h-12 text-purple-600 mx-auto mb-3" />
            <h4 className="font-semibold text-slate-900 mb-2">Prevention Focus</h4>
            <p className="text-slate-700 text-sm">
              Shift from treating metastasis to preventing it from occurring in the first place
            </p>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
          <p className="text-slate-700 text-center">
            <span className="font-semibold text-blue-800">Vision for 2030:</span> A world where metastasis 
            is detected before it becomes clinically apparent and prevented through personalized, 
            AI-guided therapeutic strategies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TherapeuticStrategiesSection; 