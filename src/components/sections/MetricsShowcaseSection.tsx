'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, Brain, Target, Zap, Users } from 'lucide-react';
import MetricCard from '@/components/ui/MetricCard';
import TopicCard from '@/components/ui/TopicCard';

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="text-center mb-16">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight"
    >
      {title}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed"
    >
      {subtitle}
    </motion.p>
  </div>
);

const MetricsShowcaseSection: React.FC = () => {
  const keyMetrics = [
    {
      icon: AlertTriangle,
      value: 90,
      suffix: '%',
      label: 'Cancer Deaths from Metastasis',
      description: 'Primary tumors rarely kill - metastasis is the true enemy',
      color: 'text-red-400',
      animated: true
    },
    {
      icon: TrendingUp,
      value: 650000,
      suffix: '',
      label: 'Annual US Cancer Deaths',
      description: 'Most preventable with early intervention',
      color: 'text-orange-400',
      animated: true
    },
    {
      icon: Brain,
      value: 0,
      suffix: '',
      label: 'Current Metastasis Prevention Solutions',
      description: 'A massive market opportunity waiting to be captured',
      color: 'text-blue-400',
      animated: false
    }
  ];

  const strategicAdvantages = [
    {
      title: "Unfair Advantage #1: Total Battlefield Visibility",
      description: "While competitors analyze only 2% of the genome (coding regions), our platform understands the entire genetic operating system. We identify drivers and targets in <strong>regulatory regions</strong> that are completely invisible to every other commercial tool.",
      subtopics: [
        {
          title: "98% Genome Coverage",
          description: "Our AI models process the entire genome, including non-coding regulatory regions that control gene expression and drive cancer progression."
        },
        {
          title: "Regulatory Region Analysis",
          description: "We identify critical enhancers, silencers, and chromatin modifications that traditional tools miss entirely."
        }
      ]
    },
    {
      title: "Unfair Advantage #2: Predictive Digital Twins",
      description: "We move beyond static diagnosis to create dynamic simulations of a patient's cancer. Our platform models <strong>tumor evolution</strong> and therapy response, identifying resistance pathways before they emerge.",
      subtopics: [
        {
          title: "Tumor Evolution Modeling",
          description: "Our Digital Twins simulate how cancers will evolve under different treatment pressures, predicting resistance mechanisms."
        },
        {
          title: "Therapy Response Prediction",
          description: "We model patient-specific responses to treatments, optimizing therapy selection and sequencing."
        }
      ]
    }
  ];

  return (
    <section className="relative overflow-hidden py-20 lg:py-32 bg-gray-950 text-white">
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          title="Market Reality & Strategic Advantages"
          subtitle="The cancer treatment market is built on failure. We're here to transform that failure into the largest market opportunity in healthcare history."
        />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {keyMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              {...metric}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* Strategic Advantages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-16">
          {strategicAdvantages.map((advantage, index) => (
            <TopicCard
              key={index}
              title={advantage.title}
              description={advantage.description}
              subtopics={advantage.subtopics}
              index={index}
              variant="highlighted"
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="p-8 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 border border-red-500/30 rounded-xl max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Target className="w-8 h-8 text-red-400" />
              <h3 className="text-2xl font-bold text-white">
                The Opportunity is Clear
              </h3>
              <Target className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-gray-300 mb-6 text-lg">
              Every day we delay, 1,780 people die from preventable metastatic cancer. 
              The technology exists. The market is ready. The only question is: who will act first?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Join the Revolution</span>
              </button>
              <button className="px-8 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors duration-200 flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Partner With Us</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsShowcaseSection; 