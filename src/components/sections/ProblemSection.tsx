'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiTrendingUp, FiDatabase, FiSearch, FiZap, FiAlertTriangle, FiClock, FiDivideCircle, FiFastForward, FiCheckCircle } from 'react-icons/fi';
import React, { useState } from 'react';

// Constants for Problem Section configuration
const PROBLEM_CONFIG = {
  sectionId: "problem",
  title: "Transforming Precision Oncology",
  subtitle: "Leveraging the power of cutting-edge biological AI and our intelligent agent architecture, the Oncology Copilot is projected to transform the precision oncology workflow:",
  challenges: [
    {
      icon: React.createElement(FiDatabase),
      problem: {
        title: 'Genomic Overload: Drowning in Data',
        description: 'Manually sifting through terabytes of genomic data to find critical insights is immensely time-consuming and prone to missing key connections, delaying pivotal decisions.'
      },
      transformation: {
        title: 'Accelerated Variant Analysis (Powered by Evo2)',
        stats: [
          "Identify the functional impact of genetic variants with 90%+ accuracy (based on Evo2's published performance).",
          "Analyze a patient's full mutation profile in minutes, compared to hours or days of manual review and siloed tool usage.",
          "Pinpoint high-priority therapeutic targets 5X faster by integrating Evo2's predictive insights directly into the analysis workflow."
        ]
      }
    },
    {
      icon: React.createElement(FiClock),
      problem: {
        title: 'Manual Bottlenecks: The Race Against Time',
        description: "Traditional variant interpretation, therapy design, and clinical trial matching are laborious. For example, identifying a suitable clinical trial for a patient can take an expert <strong class=\"text-primary\">up to 9 hours</strong>. This inefficiency is mirrored across many decision points."
      },
      transformation: {
        title: 'Accelerated Therapy Design & Trial Matching',
        stats: [
          "Clinical trial matching plummets from <strong class='text-primary'>up to 9 hours to under 5 minutes</strong>.",
          "Generate hundreds of novel candidate gene-editing sequences (e.g., guide RNAs, repair templates) in a single design run (Powered by Evo2 Generation).",
          "Evaluate the structural viability and predicted efficacy of potential therapeutic constructs 10X faster using integrated AlphaFold 3 predictions and our cancer-specific scoring functions.",
          "Move from identifying a targetable mutation to evaluating promising in silico therapy designs in hours, significantly compressing the pre-clinical research timeline."
        ]
      }
    },
    {
      icon: React.createElement(FiDivideCircle),
      problem: {
        title: 'Personalization Gap: From Data to Patient',
        description: 'The journey from raw genomic data to a truly personalized treatment plan often involves a disconnected series of manual steps and siloed tools, creating a chasm to actionable patient insights.'
      },
      transformation: {
        title: 'Streamlined Workflow & Reduced Manual Effort (Powered by Agent System)',
        stats: [
          "Reduce the manual effort required for genomic interpretation and therapy design exploration by up to 70% through intelligent automation and agent assistance.",
          "Navigate complex genomic data and therapeutic options through a single, intuitive interface, saving valuable time for clinicians and researchers."
        ]
      }
    },
    {
      icon: React.createElement(FiTrendingUp),
      problem: {
        title: 'Scaling Challenge: Meeting Oncology\'s Demands',
        description: 'With climbing cancer rates, the demand for faster, more scalable, and highly effective treatment strategies is urgent. Current workflows struggle to keep pace with this growing need.'
      },
      transformation: {
        title: 'Scalable AI for Evolving Needs',
        stats: [
          "Efficiently processes terabytes of genomic data, delivering actionable insights in minutes across diverse patient cohorts.",
          "Automates and accelerates complex design and evaluation pipelines, enabling rapid exploration of therapeutic avenues at scale.",
          "Built on an adaptive AI architecture designed to meet the growing demands of precision oncology and the evolving research landscape."
        ]
      }
    }
  ],
  summaryTitle: "A New Standard in Oncology Workflow",
  summaryText: "Oncology demands a paradigm shift. CasPro's intelligent agent architecture is built to dismantle these workflow bottlenecks, dramatically accelerating the path from complex data to precise, personalized patient care and groundbreaking research.",
  animationVariants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: (delay: number = 0) => ({ duration: 0.5, delay })
  }
};

const ProblemSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id={PROBLEM_CONFIG.sectionId} className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <motion.div
            initial={PROBLEM_CONFIG.animationVariants.initial}
            whileInView={PROBLEM_CONFIG.animationVariants.animate}
            viewport={{ once: true }}
            transition={PROBLEM_CONFIG.animationVariants.transition()}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{PROBLEM_CONFIG.title}</h2>
            <p className="text-lg text-slate-600">
              {PROBLEM_CONFIG.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-10 flex flex-wrap justify-center gap-2 md:gap-4">
          {PROBLEM_CONFIG.challenges.map((challenge, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-3 md:px-6 md:py-3 text-sm md:text-base font-medium rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75 
                          ${activeTab === index 
                            ? 'bg-primary text-white shadow-md' 
                            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'}`}
            >
              {challenge.problem.title}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl border border-slate-200 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab} // Ensures re-render on tab change
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {PROBLEM_CONFIG.challenges.map((challenge, index) => (
                index === activeTab && (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 md:gap-y-8 items-start">
                    {/* Column 1: The Challenge / Current Limitations */}
                    <div className="problem-pane">
                      <div className="flex items-center text-slate-700 mb-4">
                        {React.cloneElement(challenge.icon, { className: "w-7 h-7 mr-3 text-slate-500" })}
                        <h3 className="text-2xl font-semibold text-slate-800">The Challenge:</h3>
                      </div>
                      <h4 className="text-xl font-medium text-slate-700 mb-3">{challenge.problem.title}</h4>
                      <p className="text-slate-600 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: challenge.problem.description }} />
                    </div>

                    {/* Column 2: CasPro's Transformation / The New Way */}
                    <div className="transformation-pane md:border-l md:pl-8 border-slate-300">
                       <div className="flex items-center text-primary mb-4">
                         {/* Consider a different icon or color for transformation */}
                         <FiZap className="w-7 h-7 mr-3" /> 
                         <h3 className="text-2xl font-semibold text-primary">With CasPro:</h3>
                       </div>
                      <h4 className="text-xl font-medium text-primary mb-3">{challenge.transformation.title}</h4>
                      <ul className="space-y-2 text-slate-600 text-sm md:text-base">
                        {challenge.transformation.stats.map((stat, i) => (
                          <li key={i} className="flex items-start">
                            <FiCheckCircle className="flex-shrink-0 w-5 h-5 text-primary mr-2 mt-1" />
                            <span dangerouslySetInnerHTML={{ __html: stat }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={PROBLEM_CONFIG.animationVariants.initial}
          whileInView={PROBLEM_CONFIG.animationVariants.animate}
          viewport={{ once: true }}
          transition={PROBLEM_CONFIG.animationVariants.transition(0.4)}
          className="mt-16 p-8 md:p-10 bg-gradient-to-r from-primary to-blue-700 text-white rounded-xl max-w-4xl mx-auto text-center shadow-2xl"
        >
          <div className="flex justify-center text-4xl text-sky-300 mb-4">
            <FiFastForward />
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-white">{PROBLEM_CONFIG.summaryTitle}</h3>
          <p className="text-slate-200 text-lg leading-relaxed">
            {PROBLEM_CONFIG.summaryText}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection; 