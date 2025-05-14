'use client';

import { motion } from 'framer-motion';
import { FiTrendingUp, FiDatabase, FiSearch, FiZap, FiAlertTriangle } from 'react-icons/fi';
import React from 'react';

// Constants for Problem Section configuration
const PROBLEM_CONFIG = {
  sectionId: "problem",
  title: "The Challenge in Modern Oncology",
  subtitle: "Despite advances in genomics, clinicians and researchers still face significant obstacles when translating cancer data into effective treatment strategies.",
  challenges: [
    {
      icon: React.createElement(FiDatabase),
      title: 'Complex Genomic Data',
      description: 'Cancer genomics produces vast amounts of data that is challenging to interpret effectively, leading to information overload.'
    },
    {
      icon: React.createElement(FiTrendingUp),
      title: 'Rising Cancer Incidence',
      description: 'Cancer rates continue to climb globally, demanding more efficient, scalable, and effective treatment approaches.'
    },
    {
      icon: React.createElement(FiSearch),
      title: 'Limited Variant Interpretation',
      description: 'Current methods for variant interpretation and therapy design are time-consuming and often lack precision.'
    },
    {
      icon: React.createElement(FiZap),
      title: 'Personalization Gap',
      description: 'A persistent gap exists between raw genomic data and actionable clinical insights needed for truly personalized treatment.'
    }
  ],
  summaryTitle: "The Need is Clear",
  summaryText: "The field of oncology urgently requires more precise, personalized, and AI-driven approaches to bridge the gap between complex genomic data and effective clinical decisions, ultimately improving patient outcomes.",
  animationVariants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: (delay: number = 0) => ({ duration: 0.5, delay })
  }
};

const ProblemSection = () => {
  return (
    <section id={PROBLEM_CONFIG.sectionId} className="section bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={PROBLEM_CONFIG.animationVariants.initial}
            whileInView={PROBLEM_CONFIG.animationVariants.animate}
            viewport={{ once: true }}
            transition={PROBLEM_CONFIG.animationVariants.transition()}
          >
            <h2 className="heading-2 mb-6">{PROBLEM_CONFIG.title}</h2>
            <p className="subheading">
              {PROBLEM_CONFIG.subtitle}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROBLEM_CONFIG.challenges.map((challenge, index) => (
            <motion.div
              key={index}
              initial={PROBLEM_CONFIG.animationVariants.initial}
              whileInView={PROBLEM_CONFIG.animationVariants.animate}
              viewport={{ once: true }}
              transition={PROBLEM_CONFIG.animationVariants.transition(index * 0.1)}
              className="bg-slate-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col items-start"
            >
              <div className="p-3 rounded-full bg-primary/10 text-primary mb-5 text-3xl">
                {challenge.icon}
              </div>
              <h3 className="heading-3 mb-3 text-left">{challenge.title}</h3>
              <p className="text-slate-600 text-left">{challenge.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={PROBLEM_CONFIG.animationVariants.initial}
          whileInView={PROBLEM_CONFIG.animationVariants.animate}
          viewport={{ once: true }}
          transition={PROBLEM_CONFIG.animationVariants.transition(0.4)}
          className="mt-16 p-8 md:p-10 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl max-w-4xl mx-auto text-center shadow-2xl"
        >
          <div className="flex justify-center text-4xl text-amber-400 mb-4">
            <FiAlertTriangle />
          </div>
          <h3 className="heading-3 mb-4 text-amber-400">{PROBLEM_CONFIG.summaryTitle}</h3>
          <p className="text-slate-300 text-lg">
            {PROBLEM_CONFIG.summaryText}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection; 