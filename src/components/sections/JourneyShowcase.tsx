'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { 
  allCapabilityJourneys,
  chemotherapyJourney,
  clinicalTrialsJourney,
  crisprIntelligenceJourney,
  pathwayJourney,
  therapyFitJourney,
  toxicityJourney,
  agenticEmrJourney
} from '@/data/capability-journeys';
import { 
  ArrowRight, 
  Clock, 
  Target, 
  Zap, 
  Shield,
  CheckCircle,
  ExternalLink,
  TrendingUp,
  Users,
  Brain,
  FileText,
  Activity,
  AlertTriangle
} from 'lucide-react';

// Dynamic journey cards generation from actual data
const generateJourneyCards = () => {
  const journeyMap = {
    'clinical-trials': { icon: Target, color: 'blue' },
    'chemo': { icon: Shield, color: 'green' },
    'pathway': { icon: Activity, color: 'purple' },
    'therapy-fit': { icon: CheckCircle, color: 'teal' },
    'toxicity-risk': { icon: AlertTriangle, color: 'orange' },
    'crispr-intelligence': { icon: Brain, color: 'indigo' },
    'agentic-emr': { icon: FileText, color: 'red' },
    'precision-rad': { icon: Zap, color: 'yellow' }
  };

  return Object.entries(allCapabilityJourneys).map(([slug, journey]) => {
    const config = journeyMap[slug as keyof typeof journeyMap];
    if (!config) return null;

    // Extract key metrics from journey data
    const firstOldStep = journey.oldWaySteps[0];
    const firstNewStep = journey.newWaySteps[0];
    
    // Extract problem from first old step
    const problem = firstOldStep.problems?.[0] || firstOldStep.description;
    
    // Extract solution from first new step  
    const solution = firstNewStep.solutions?.[0] || firstNewStep.description;
    
    // Extract key metric from solutions
    const keyMetric = firstNewStep.solutions?.find(s => s.includes('%')) || 
                     firstNewStep.solutions?.[0] || 
                     'Significant improvement';

    return {
      id: slug,
      title: journey.title.replace('Journey', '').replace('The ', ''),
      description: journey.subtitle,
      icon: config.icon,
      color: config.color,
      href: `/platform/${slug}`,
      journey: journey,
      keyMetric: keyMetric,
      problem: problem,
      solution: solution
    };
  }).filter(Boolean);
};

const journeyCards = generateJourneyCards();

const JourneyShowcase: React.FC = () => {
  const [selectedJourney, setSelectedJourney] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            From Problems to Solutions
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
            See how our AI transforms the biggest challenges in cancer research into clear, actionable solutions.
          </p>
        </motion.div>

        {/* Journey Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {journeyCards.map((card, index) => {
            if (!card) return null;
            const IconComponent = card.icon;
            const isSelected = selectedJourney === index;
            
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? `ring-2 ring-${card.color}-500 shadow-xl scale-105` 
                    : 'hover:shadow-lg hover:scale-102'
                }`}
                onClick={() => setSelectedJourney(selectedJourney === index ? null : index)}
              >
                <div className={`bg-white rounded-xl p-6 border-2 ${
                  isSelected ? `border-${card.color}-200` : 'border-slate-200'
                }`}>
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-${card.color}-50`}>
                      <IconComponent className={`w-6 h-6 text-${card.color}-600`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{card.title}</h3>
                      <p className="text-sm text-slate-600">{card.description}</p>
                    </div>
                  </div>

                  {/* Problem */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium text-slate-700">The Problem</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{card.problem}</p>
                  </div>

                  {/* Solution */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-slate-700">Our Solution</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{card.solution}</p>
                  </div>

                  {/* Key Metric */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="font-semibold text-slate-800">Result: </span>
                      <span className={`text-${card.color}-600 font-bold`}>{card.keyMetric}</span>
                    </div>
                    <a
                      href={card.href}
                      className={`text-${card.color}-600 hover:text-${card.color}-700 transition-colors`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Journey Details */}
        {selectedJourney !== null && journeyCards[selectedJourney] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Old Way */}
              <div>
                <h4 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  The Old Way
                </h4>
                <div className="space-y-4">
                  {journeyCards[selectedJourney].journey.oldWaySteps.slice(0, 2).map((step, index) => (
                    <div key={index} className="bg-red-50 rounded-lg p-4">
                      <h5 className="font-semibold text-slate-800 mb-2">{step.title}</h5>
                      <p className="text-sm text-slate-600 mb-2">{step.description}</p>
                      {step.problems && step.problems.length > 0 && (
                        <ul className="text-xs text-slate-600 space-y-1">
                          {step.problems.slice(0, 2).map((problem, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{problem}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* New Way */}
              <div>
                <h4 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  The New Way
                </h4>
                <div className="space-y-4">
                  {journeyCards[selectedJourney].journey.newWaySteps.slice(0, 2).map((step, index) => (
                    <div key={index} className="bg-green-50 rounded-lg p-4">
                      <h5 className="font-semibold text-slate-800 mb-2">{step.title}</h5>
                      <p className="text-sm text-slate-600 mb-2">{step.description}</p>
                      {step.solutions && step.solutions.length > 0 && (
                        <ul className="text-xs text-slate-600 space-y-1">
                          {step.solutions.slice(0, 2).map((solution, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{solution}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <a
                href={journeyCards[selectedJourney].href}
                className={`inline-flex items-center gap-2 px-8 py-3 bg-${journeyCards[selectedJourney].color}-600 text-white rounded-lg font-semibold hover:bg-${journeyCards[selectedJourney].color}-700 transition-colors`}
              >
                Explore {journeyCards[selectedJourney].title}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Proven Results Across All Areas</h3>
            <p className="text-blue-100 max-w-3xl mx-auto">
              Our AI platform delivers measurable improvements across every aspect of cancer research and treatment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">95%+</div>
              <div className="text-blue-100">Average Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">60-80%</div>
              <div className="text-blue-100">Time Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">$2.1M</div>
              <div className="text-blue-100">Cost Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{journeyCards.length}</div>
              <div className="text-blue-100">AI Tools</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneyShowcase;
