'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Database, Clock, Workflow, TrendingUp, Target, CheckCircle, FastForward } from 'lucide-react';
import React, { useState } from 'react';

// Constants for Problem Section configuration
export const PROBLEM_CONFIG = {
  sectionId: "the-conquest",
  title: "From a Broken System to Absolute Dominance",
  subtitle: "The CrisPRO Intelligence Platform was not built to compete. It was built to make the competition obsolete by solving the fundamental failures of therapeutic R&D.",
  challenges: [
    {
      icon: Database,
      problem: {
        title: 'Data Overload & Ambiguity',
        description: "The old guard is buried in a mountain of genomic data they can't interpret. They search for needles in haystacks, wasting months on manual analysis and delivering 'Variants of Uncertain Significance' that paralyze decision-making."
      },
      transformation: {
        title: 'Our Solution: AI-Powered Target Annihilation',
        stats: [
          "Our Zeta Oracle annihilates VUS, providing definitive functional impact scores with >95% accuracy.",
          "Instantly identify the causal drivers of disease, not just correlations.",
          "Transform entire patient cohorts from raw data into actionable intelligence in minutes, not months."
        ]
      }
    },
    {
      icon: Clock,
      problem: {
        title: 'The Slow & Expensive Guessing Game',
        description: "Their R&D is a multi-year, multi-billion dollar gamble based on trial-and-error. They physically test a handful of candidates, praying one works. This is not science; it's  roulette."
      },
      transformation: {
        title: 'The `In Silico` R&D Flywheel',
        stats: [
          "Execute thousands of virtual therapeutic experiments in parallel, `in silico`.",
          "Identify and validate the top candidates with the highest probability of success before committing a single dollar to the wet lab.",
          "Compress pre-clinical timelines from years to weeks."
        ]
      }
    },
    {
      icon: Workflow,
      problem: {
        title: 'The Chasm of Disconnected Tools',
        description: 'Their researchers wrestle with a dozen disconnected, primitive tools. This fragmented workflow creates chaos, invites error, and grinds progress to a halt.'
      },
      transformation: {
        title: 'A Unified Command & Control Center',
        stats: [
          "Annihilate tool-switching with a single, unified interface for the entire R&D lifecycle.",
          "Our agentic co-pilot manages complex, multi-step analyses, freeing your team to focus on strategic conquest, not software logistics.",
          "Seamlessly fuse all data sources—genomic, clinical, experimental—into one strategic view."
        ]
      }
    },
    {
      icon: TrendingUp,
      problem: {
        title: 'An Inability to Scale',
        description: 'The demand for novel genetic medicines is exponential. Their antiquated, manual R&D workflows are fundamentally incapable of meeting this demand. They cannot scale.'
      },
      transformation: {
        title: 'Our Solution: AI-Native Scalability & Dominance',
        stats: [
          "Scale from analyzing a single variant to simulating therapies for entire patient cohorts with the same automated pipeline.",
          "Our serverless architecture provides infinite computational firepower on demand.",
          "Built to dominate the evolving landscape of genomic medicine."
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
