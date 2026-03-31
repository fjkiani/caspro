'use client';

import { motion } from 'framer-motion';
import { Target, Zap, FlaskConical, ArrowRight, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { DRUG_DEVELOPMENT_STAGES } from '@/data/homepage/drug-development-homepage';
import { Link } from 'react-router-dom';
import CardSlider from '@/components/shared/CardSlider';

const DrugDevelopmentTransformation = () => {
  const stageIcons = {
    'target-validation': Target,
    'lead-engineering': Zap,
    'preclinical-confirmation': FlaskConical
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            From <span className="text-red-600">90% Failure</span> to{' '}
            <span className="text-green-600">Predictable Success</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Transform your drug development pipeline from <strong>gambling to engineering</strong> with our 3-stage in-silico platform. 
            Every stage includes <strong className="text-purple-600">SAE explainability</strong>—see exactly what the AI is thinking.
            <span className="block mt-2 text-base">👇 <strong>Scroll down to try each stage live</strong> with interactive demos.</span>
          </p>
        </motion.div>

        {/* Three Stages Slider */}
        <CardSlider
          items={DRUG_DEVELOPMENT_STAGES}
          renderCard={(stage, index) => {
            const Icon = stageIcons[stage.id as keyof typeof stageIcons];
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white rounded-2xl border-2 border-slate-200 p-6 lg:p-8 hover:border-blue-400 hover:shadow-xl transition-all duration-300"
              >
                {/* Stage Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        STAGE {index + 1}
                      </span>
                      <Link to="/evidence/sae-intelligence" className="text-xs font-semibold text-purple-700 bg-purple-100 hover:bg-purple-200 px-2 py-1 rounded border border-purple-300 transition-colors flex items-center gap-1">
                        🧠 See What AI Sees
                      </Link>
                </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{stage.title}</h3>
                    <p className="text-sm text-slate-600">{stage.subtitle}</p>
                </div>
                </div>

                {/* Problem vs Solution - Consolidated */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-xs font-semibold text-red-700 mb-2">❌ The Problem</div>
                    <div className="text-sm text-slate-700 mb-2">
                      <strong>{stage.problem.title}</strong>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div>
                        <span className="text-slate-500">Cost:</span>{' '}
                        <span className="font-semibold text-red-600">{stage.problem.cost}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Time:</span>{' '}
                        <span className="font-semibold text-red-600">{stage.problem.timeframe}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Failure:</span>{' '}
                        <span className="font-semibold text-red-600">{stage.problem.failureRate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-xs font-semibold text-green-700 mb-2">✅ Our Solution</div>
                    <div className="text-sm text-slate-700 mb-2">
                      <strong>{stage.solution.title}</strong>
                    </div>
                    <p className="text-xs text-slate-600 mb-3">{stage.solution.approach}</p>
                    
                    {/* Business Impact - Moved up into Solution box */}
                    <div className="border-t border-green-300 pt-3 mt-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-xs text-slate-500">Cost Reduction</div>
                          <div className="text-xs font-bold text-green-600">{stage.businessImpact.costReduction}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Time Reduction</div>
                          <div className="text-xs font-bold text-blue-600">{stage.businessImpact.timeReduction}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Evidence Metrics */}
                <div className="border-t border-slate-200 pt-4">
                  <div className="text-xs font-semibold text-slate-500 mb-2">Validated Performance</div>
                  <div className="space-y-1">
                    {stage.evidence.slice(0, 2).map((evidence, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">{evidence.metric}</span>
                        <span className="font-bold text-green-600">{evidence.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          }}
          cardsToShow={1}
          showArrows={true}
          showDots={true}
          autoPlay={false}
          className="mb-12"
        />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Link
            to="#interactive-demo"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
          >
            See Live 3-Stage Pipeline Demo
                <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default DrugDevelopmentTransformation;
