'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Target, Layers, CheckCircle, BrainCircuit, Microscope, ShieldCheck } from 'lucide-react';
import { coPilotDetailsData } from '@/data/coPilotDetails';

// Get the slugs and data for the co-pilots
const coPilotSlugs = Object.keys(coPilotDetailsData);
const coPilots = Object.values(coPilotDetailsData);

// Helper to get a representative icon for a co-pilot
const getCoPilotIcon = (slug: string) => {
  switch (slug) {
    case 'precision-rad':
      return <ShieldCheck className="w-5 h-5 mr-2" />;
    case 'agentic-emr':
      return <BrainCircuit className="w-5 h-5 mr-2" />;
    case 'crispr-intelligence':
      return <Microscope className="w-5 h-5 mr-2" />;
    default:
      return <Rocket className="w-5 h-5 mr-2" />;
  }
};

const SolutionSection = () => {
  const [activeSlug, setActiveSlug] = useState('crispr-intelligence');

  const activeCoPilotData = coPilotDetailsData[activeSlug];

  const animationVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4 }
  };

  return (
    <section id="solution" className="py-16 md:py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <motion.div
            initial={animationVariants.initial}
            whileInView={animationVariants.animate}
            viewport={{ once: true }}
            transition={{...animationVariants.transition, delay: 0.1}}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Introducing CrisPRO™: Your Therapeutic Design Co-Pilot
            </h2>
            <p className="text-lg text-slate-300">
              CrisPRO™ empowers therapeutic scientists to navigate the complex landscape of gene editing, moving from biological hypothesis to in silico-validated candidates with unprecedented speed and precision.
            </p>
          </motion.div>
        </div>

        {/* Co-Pilot Tab Navigation */}
        <div className="mb-10 flex flex-wrap justify-center gap-2 md:gap-4">
          {coPilots.map((copilot) => (
            <button
              key={copilot.slug}
              onClick={() => setActiveSlug(copilot.slug)}
              className={`px-4 py-3 text-sm md:text-base font-medium rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75 flex items-center
                ${activeSlug === copilot.slug 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              {getCoPilotIcon(copilot.slug)}
              {copilot.pageTitle.split(':')[0]}
            </button>
          ))}
        </div>

        {/* Co-Pilot Content Area */}
        <div className="bg-slate-800/50 p-6 md:p-8 rounded-xl shadow-xl border border-slate-700 min-h-[450px]">
          <AnimatePresence mode="wait">
            {activeCoPilotData && (
              <motion.div
                key={activeSlug}
                initial={animationVariants.initial}
                animate={animationVariants.animate}
                exit={animationVariants.exit}
                transition={animationVariants.transition}
                className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"
              >
                {/* Left Column: Co-Pilot Details */}
                <div className="lg:col-span-3">
                  <h3 className="text-2xl font-bold text-primary mb-3">{activeCoPilotData.pageTitle}</h3>
                  <p className="text-slate-300 mb-6 italic">{activeCoPilotData.heroSubtitle}</p>
                  
                  <div className="space-y-5">
                    <div>
                      <h4 className="font-semibold text-lg text-white mb-2 flex items-center"><Target className="w-5 h-5 mr-2 text-red-400"/> Core Problem</h4>
                      <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-red-400/30 pl-4">
                        {activeCoPilotData.coreProblemIntro}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-white mb-2 flex items-center"><Layers className="w-5 h-5 mr-2 text-blue-400"/> Technical Foundation</h4>
                      <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-blue-400/30 pl-4">
                        {activeCoPilotData.buildsOnStackIntro}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Key Capabilities */}
                <div className="lg:col-span-2 bg-slate-800 rounded-lg p-6 border border-slate-600">
                  <h4 className="text-lg font-semibold text-white mb-4">Key Capabilities</h4>
                  <ul className="space-y-3">
                    {(activeCoPilotData.keyCapabilities || []).slice(0, 4).map((capability, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-400 mr-2.5 mt-1" />
                        <span className="text-sm text-slate-300">{capability.title.split(':')[0]}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 text-center">
                      <a href={`/co-pilot-app/${activeSlug}`} className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-5 rounded-lg transition-colors">
                        Learn More
                      </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
