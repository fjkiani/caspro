'use client';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Target, Layers, CheckCircle, BrainCircuit, Microscope, ShieldCheck, ArrowRight, Users } from 'lucide-react';
import { coPilotDetailsData } from '@/data/coPilotDetails';

// Get the slugs and data for the co-pilots
const coPilotSlugs = Object.keys(coPilotDetailsData);
const coPilotTabs = coPilotSlugs.map(slug => ({
  slug,
  name: coPilotDetailsData[slug].pageTitle.split(':')[0]
}));

const iconMap: { [key: string]: React.ElementType } = {
  Users,
  Microscope,
  BrainCircuit,
  Rocket,
  ShieldCheck,
};

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
  const [activeSlug, setActiveSlug] = useState(coPilotSlugs[0]);
  const activeCoPilotData = coPilotDetailsData[activeSlug];

  const animationVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4 }
  };

  return (
    <section id="solutions" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gradient">A New Standard for Care Delivery</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
            Our suite of AI Co-Pilots provides tailored intelligence for every stage of the therapeutic pipeline.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-10 space-x-2 md:space-x-4">
          {coPilotTabs.map((tab) => (
            <button
              key={tab.slug}
              onClick={() => setActiveSlug(tab.slug)}
              className={`px-4 py-2 text-sm md:px-6 md:py-3 font-semibold rounded-full transition-all duration-300 ${
                activeSlug === tab.slug
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-slate-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50/80 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Value Props for Different Teams */}
              <div className="lg:col-span-2 space-y-8">
                {activeCoPilotData.valueProps.map((prop, index) => {
                  const IconComponent = iconMap[prop.icon];
                  return (
                    <div key={index}>
                      <h4 className="text-lg font-bold text-slate-700 dark:text-slate-200 flex items-center mb-3">
                        {IconComponent && <IconComponent className="w-6 h-6 mr-3 text-primary" />}
                        For {prop.audience}:
                      </h4>
                      <ul className="space-y-2 pl-9">
                        {prop.points.map((point, pIndex) => (
                          <li key={pIndex} className="flex items-start text-sm">
                            <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-500 mr-2 mt-1" />
                            <span className="text-slate-600 dark:text-slate-300">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Core Problem & Technical Foundation */}
              <div className="lg:col-span-3">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">{activeCoPilotData.pageTitle}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6 italic">{activeCoPilotData.heroSubtitle}</p>
                
                <div className="space-y-5">
                  <div>
                    <h4 className="font-semibold text-lg text-slate-700 dark:text-slate-200 mb-2 flex items-center"><Layers className="w-5 h-5 mr-2 text-blue-500"/> Technical Foundation</h4>
                    <div className="border-l-2 border-blue-500/30 pl-4">
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-3">
                        {activeCoPilotData.buildsOn}
                      </p>
                      <ul className="space-y-2">
                        {(activeCoPilotData.buildsOnStackPoints || []).slice(0, 3).map((point, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="flex-shrink-0 w-4 h-4 text-blue-500 mr-2.5 mt-1" />
                            <span className="text-slate-600 dark:text-slate-300 text-sm" dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-800 dark:text-white">$1</strong>').replace(/`(.*?)`/g, '<code class="text-xs bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-amber-400 rounded px-1 py-0.5">$1</code>') }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link to={`/platform/${activeSlug}`} className="inline-flex items-center font-semibold text-primary hover:text-primary/80 transition-colors">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>

              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SolutionSection;
