'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Database, Clock, Workflow, TrendingUp, Target, CheckCircle, FastForward } from 'lucide-react';
import React, { useState } from 'react';

// Constants for Problem Section configuration
const PROBLEM_CONFIG = {
  sectionId: "problem",
  title: "Accelerating Medicine, from Data to Discovery",
  subtitle: "The CrisPRO™ platform uses AI to solve the biggest challenges in developing new therapies, turning years of work into weeks.",
  challenges: [
    {
      icon: Database,
      problem: {
        title: 'Data Overload',
        description: "Scientists are buried in a mountain of complex genomic and clinical data. Finding the right signals is like searching for a needle in a haystack."
      },
      transformation: {
        title: 'Instant, AI-Powered Analysis',
        stats: [
          "Our AI Co-Pilots instantly analyze this data, pinpointing the critical information needed to start building a new therapy.",
          "Identify disease-driving variants with state-of-the-art accuracy.",
          "Process patient genomic data cohorts in minutes, not months."
        ]
      }
    },
    {
      icon: Clock,
      problem: {
        title: 'Slow & Expensive Design',
        description: "Designing and testing new drugs and gene therapies is a slow, expensive, trial-and-error process."
      },
      transformation: {
        title: 'In Silico First, Lab Second',
        stats: [
          "AI-based mock validation trials to design and test thousands of therapeutic possibilities in minutes.",
          "Identify the most promising candidates before they ever reach a lab.",
          "Compress preclinical timelines from years to weeks."
        ]
      }
    },
    {
      icon: Workflow,
      problem: {
        title: 'Disconnected Tools & Workflows',
        description: "Researchers waste time juggling dozens of different software tools that don't talk to each other, slowing down progress."
      },
      transformation: {
        title: 'A Single, Unified Platform',
        stats: [
          "CrisPRO provides one environment where all data and tools work together seamlessly.",
          "An intelligent AI assistant manages the workflow from end to end.",
          "Eliminate manual data handling and let scientists focus on the science."
        ]
      }
    }
  ],
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
    <section id={PROBLEM_CONFIG.sectionId} className="py-16 md:py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <motion.div
            initial={PROBLEM_CONFIG.animationVariants.initial}
            whileInView={PROBLEM_CONFIG.animationVariants.animate}
            viewport={{ once: true }}
            transition={PROBLEM_CONFIG.animationVariants.transition()}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{PROBLEM_CONFIG.title}</h2>
            <p className="text-lg text-slate-300">
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
                  : 'bg-slate-800 hover:bg-slate-700/70'
              }`}
            >
              <challenge.icon className={`w-6 h-6 shrink-0 ${activeChallengeIndex === index ? 'text-primary' : 'text-slate-400'}`} />
              <h5 className={`font-semibold text-sm ${activeChallengeIndex === index ? 'text-primary' : 'text-slate-100'}`}>
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
              <p className="text-slate-300 text-sm leading-relaxed ml-14">{currentChallenge.problem.description}</p>
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
              <ul className="space-y-3 text-slate-300 text-sm ml-14">
                {currentChallenge.transformation.stats.map((stat, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-400 mr-2.5 mt-1" />
                    <span dangerouslySetInnerHTML={{ __html: stat.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>') }} />
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProblemSection; 
