'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Database, Clock, Workflow, TrendingUp, Target, CheckCircle, FastForward } from 'lucide-react';
import React, { useState } from 'react';

// Constants for Problem Section configuration
export const PROBLEM_CONFIG = {
  sectionId: "the-problem",
  title: "Addressing Critical Gaps in Oncology R&D",
  subtitle: "CrisPRO's AI-powered platform addresses the fundamental challenges that slow down cancer research and limit therapeutic breakthroughs.",
  challenges: [
    {
      icon: Database,
      problem: {
        title: 'Genomic Data Interpretation Challenges',
        description: "Researchers face overwhelming amounts of genomic data with limited interpretation capabilities. Manual analysis takes months and often results in 'Variants of Uncertain Significance' (VUS) that delay clinical decision-making."
      },
      transformation: {
        title: 'AI-Powered Variant Resolution',
        stats: [
          "Advanced AI algorithms resolve VUS with >95% accuracy, providing definitive functional impact scores.",
          "Identify causal disease drivers with high confidence, not just statistical correlations.",
          "Transform patient cohort analysis from months to minutes with automated pipelines."
        ]
      }
    },
    {
      icon: Clock,
      problem: {
        title: 'Lengthy & Costly Drug Development',
        description: "Traditional R&D involves multi-year, multi-billion dollar development cycles with high failure rates. Physical testing of limited therapeutic candidates results in significant time and resource investment with uncertain outcomes."
      },
      transformation: {
        title: 'In Silico Drug Discovery Acceleration',
        stats: [
          "Execute thousands of virtual therapeutic experiments in parallel using computational models.",
          "Identify and validate top candidates with highest success probability before wet lab commitment.",
          "Compress pre-clinical timelines from years to weeks through predictive modeling."
        ]
      }
    },
    {
      icon: Workflow,
      problem: {
        title: 'Fragmented Research Workflows',
        description: 'Researchers often work with multiple disconnected tools and platforms. This fragmented workflow creates inefficiencies, increases error rates, and slows down research progress.'
      },
      transformation: {
        title: 'Unified Research Platform',
        stats: [
          "Streamline workflows with a single, integrated interface for the entire R&D lifecycle.",
          "AI-powered co-pilot manages complex, multi-step analyses, allowing researchers to focus on discovery.",
          "Seamlessly integrate all data sources—genomic, clinical, experimental—into one comprehensive view."
        ]
      }
    },
    {
      icon: TrendingUp,
      problem: {
        title: 'Scalability Limitations',
        description: 'Growing demand for personalized genetic medicines requires scalable R&D approaches. Traditional manual workflows struggle to keep pace with the exponential growth in genomic data and therapeutic opportunities.'
      },
      transformation: {
        title: 'AI-Native Scalable Architecture',
        stats: [
          "Scale from analyzing single variants to simulating therapies for entire patient cohorts seamlessly.",
          "Cloud-native architecture provides on-demand computational resources for any scale of analysis.",
          "Purpose-built to meet the evolving demands of precision genomic medicine."
        ]
      }
    }
  ],
  summaryTitle: "From Bottleneck to Blitzkrieg",
  summaryText: "The CrisPRO Intelligence Platform transforms therapeutic R&D. We replace the slow, manual, and uncertain processes of the old guard with an AI-powered, unified system that achieves victory with overwhelming speed and certainty.",
  animationVariants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: (delay: number = 0) => ({ duration: 0.5, delay })
  }
};

const ProblemSection = () => {
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);

  const currentChallenge = PROBLEM_CONFIG.challenges[activeChallengeIndex];

  return (
    <section id={PROBLEM_CONFIG.sectionId} className="py-16 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <motion.div
            initial={PROBLEM_CONFIG.animationVariants.initial}
            whileInView={PROBLEM_CONFIG.animationVariants.animate}
            viewport={{ once: true }}
            transition={PROBLEM_CONFIG.animationVariants.transition()}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">{PROBLEM_CONFIG.title}</h2>
            <p className="text-lg text-muted-foreground">
              {PROBLEM_CONFIG.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Problem Titles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {PROBLEM_CONFIG.challenges.map((challenge, index) => (
            <div
              key={index}
              onClick={() => setActiveChallengeIndex(index)}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 flex items-center gap-3 ${
                activeChallengeIndex === index
                  ? 'bg-slate-700 shadow-md ring-2 ring-primary'
                  : 'bg-card hover:bg-slate-700/70'
              }`}
            >
              <challenge.icon className={`w-6 h-6 shrink-0 ${activeChallengeIndex === index ? 'text-primary' : 'text-muted-foreground'}`} />
              <h5 className={`font-semibold text-sm ${activeChallengeIndex === index ? 'text-primary' : 'text-foreground'}`}>
                {challenge.problem.title}
              </h5>
            </div>
          ))}
        </div>

        {/* Selected Challenge and Solution Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChallengeIndex} // Ensures re-render on change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-6 items-start"
          >
            {/* Problem Details */}
            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-6 h-full">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 shrink-0 bg-red-500/20">
                  <Target size={20} className="text-red-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-red-300/80">The Challenge</p>
                  <h4 className="font-semibold text-lg text-red-200 leading-tight">{currentChallenge.problem.title}</h4>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed ml-14">{currentChallenge.problem.description}</p>
            </div>

            {/* Solution Details */}
            <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6 h-full">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mr-4 shrink-0">
                  <CheckCircle size={20} className="text-green-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-green-300/80">The CrisPRO™ Solution</p>
                  <h4 className="font-semibold text-lg text-green-200 leading-tight">{currentChallenge.transformation.title}</h4>
                </div>
              </div>
              <ul className="space-y-3 text-muted-foreground text-sm ml-14">
                {currentChallenge.transformation.stats.map((stat, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-400 mr-2.5 mt-1" />
                    <span>{stat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <motion.div
          initial={PROBLEM_CONFIG.animationVariants.initial}
          whileInView={PROBLEM_CONFIG.animationVariants.animate}
          viewport={{ once: true }}
          transition={PROBLEM_CONFIG.animationVariants.transition(0.4)}
          className="mt-16 p-8 md:p-10 bg-gradient-to-r from-primary to-blue-700 text-primary-foreground rounded-xl max-w-4xl mx-auto text-center shadow-2xl"
        >
          <div className="flex justify-center text-4xl text-sky-300 mb-4">
            <FastForward />
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-primary-foreground">{PROBLEM_CONFIG.summaryTitle}</h3>
          <p className="text-blue-200 text-lg leading-relaxed">
            {PROBLEM_CONFIG.summaryText}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection; 
