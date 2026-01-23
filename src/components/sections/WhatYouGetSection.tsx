'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Microscope, 
  Target, 
  Activity, 
  Zap, 
  Shield, 
  Brain, 
  Clock, 
  CheckCircle, 
  FileText, 
  Lightbulb, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Layers,
  Users,
  AlertTriangle,
  ListChecks,
  MessageSquare
} from 'lucide-react';
import { coPilotDetailsData } from '@/data/copilots';

const iconMap: { [key: string]: React.ElementType } = {
  'clinical-trials': Target,
  'pathway': Activity,
  'therapy-fit': Zap,
  'toxicity-risk': Shield,
  'crispr-intelligence': Brain,
  'agentic-emr': Microscope,
  'ShieldCheck': ShieldCheck,
  'TrendingUp': TrendingUp,
  'Target': Target,
  'Activity': Activity,
  'Layers': Layers,
  'Users': Users,
  'FileText': FileText,
  'AlertTriangle': AlertTriangle,
  'ListChecks': ListChecks,
  'MessageSquare': MessageSquare,
  'Lightbulb': Lightbulb,
  'chemo': Microscope, // Default for chemo if specific icon not found
};

const getIcon = (slug: string) => {
  return iconMap[slug] || Brain;
};

const generateUseCaseDescription = (label: string): string => {
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes('rank')) {
    return "Get a clear, ranked list of drug classes aligned with the tumor's specific biology.";
  }
  if (lowerLabel.includes('explain')) {
    return 'Understand the reasoning behind each recommendation with short explanations and citations.';
  }
  if (lowerLabel.includes('confidence')) {
    return 'Gauge the strength of evidence for each option with confidence scores and supporting research.';
  }
  if (lowerLabel.includes('vus')) {
    return 'Turn variants of unknown significance into actionable insights for your research context.';
  }
  if (lowerLabel.includes('cohort')) {
    return 'Leverage cohort data to ground your findings and strengthen your conclusions.';
  }
  return 'Leverage advanced AI to gain critical insights and accelerate your research.';
};


const WhatYouGetSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Get all co-pilots for tabs
  const coPilots = Object.values(coPilotDetailsData);

  if (!coPilots.length) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const activeCoPilot = coPilots[activeTab];

  const whyInSilicoCards = (activeCoPilot.observedOutcomes || []).slice(0, 4).map(outcome => ({
    icon: getIcon(outcome.icon),
    title: outcome.title,
    description: outcome.description,
    metric: outcome.keyMetric,
    color: outcome.color || 'blue'
  }));

  const whatYouGetCards = (activeCoPilot.genomicUseCasesGrid || []).slice(0, 3).map(item => ({
    icon: getIcon(item.iconName),
    title: item.label,
    description: generateUseCaseDescription(item.label),
  }));

  return (
    <motion.section 
      className="py-20 bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-teal-50 to-indigo-50 rounded-3xl transform rotate-1 scale-105 opacity-50"></div>
            <div className="relative bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
              <div className="inline-flex items-center gap-4 mb-8">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl shadow-lg">
                  <Microscope className="w-10 h-10 text-white" />
                </div>
                {/* <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
                  What You Get
                </h2> */}
              </div>
              <div className="max-w-5xl mx-auto">
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-100">
                  <p className="text-xl font-medium text-gray-800 leading-relaxed">
                    Core integrated capabilities. These aren't separate tools - they're integrated AI-powered capabilities designed to work together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Co-Pilot Tabs */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="flex flex-wrap justify-center gap-4">
            {coPilots.map((coPilot, index) => {
              const IconComponent = getIcon(coPilot.slug);
              const isActive = activeTab === index;

              return (
                <motion.button
                  key={coPilot.slug}
                  onClick={() => setActiveTab(index)}
                  className={`px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-500 flex items-center gap-4 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 text-white shadow-2xl scale-110 border-2 border-white'
                      : 'bg-gradient-to-r from-white via-gray-50 to-white text-slate-700 hover:from-blue-50 hover:via-teal-50 hover:to-indigo-50 hover:text-blue-700 border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl'
                  }`}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconComponent className="w-6 h-6" />
                  {coPilot.pageTitle}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Active Co-Pilot Content - Strategic Doctrine Style */}
        <motion.div
          key={activeTab}
          variants={itemVariants}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >


          {/* Key Outcomes */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent mb-6">Key Outcomes</h3>
              <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">Research capabilities with improvements in speed, accuracy, and collaboration</p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-teal-100 to-indigo-100 rounded-3xl transform rotate-1 scale-105 opacity-30"></div>
              <div className="relative bg-gradient-to-r from-blue-50 via-teal-50 to-indigo-50 rounded-3xl p-12 shadow-xl border border-blue-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {whyInSilicoCards.map((value, index) => {
                    const IconComponent = value.icon;
                    return (
                      <motion.div
                        key={index}
                        className="group text-center"
                        whileHover={{ scale: 1.08, y: -10 }}
                      >
                        <div className="relative mb-8">
                          <div className={`inline-flex p-6 bg-white rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500 border-2 border-${value.color}-100 group-hover:border-${value.color}-200`}>
                            <IconComponent className={`w-12 h-12 text-${value.color}-600 group-hover:text-${value.color}-700 transition-colors duration-300`} />
                          </div>
                          <div className={`absolute -top-2 -right-2 w-4 h-4 bg-${value.color}-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse`}></div>
                          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                        </div>
                        <h4 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-4 group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-300">{value.title}</h4>
                        <div className="mb-5">
                          <span className={`px-5 py-2.5 rounded-full text-lg font-bold bg-${value.color}-100 text-${value.color}-700 group-hover:bg-${value.color}-200 transition-colors duration-300 shadow-md`}>
                            {value.metric}
                          </span>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-xl group-hover:text-slate-700 transition-colors duration-300">{value.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Core Deliverables Section */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent mb-6">Core Deliverables</h3>
              <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">Deliverables that transform complex genomic data into actionable insights</p>
            </div>
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-teal-100 to-indigo-100 rounded-3xl transform rotate-1 scale-105 opacity-30"></div>
              <div className="relative bg-gradient-to-r from-blue-50 via-teal-50 to-indigo-50 rounded-3xl p-12 shadow-xl border border-blue-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {whatYouGetCards.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={index}
                        className="group text-center"
                        whileHover={{ scale: 1.08, y: -10 }}
                      >
                        <div className="relative mb-8">
                          {/* Icon background with animation */}
                          <div className="inline-flex p-6 bg-white rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500 border-2 border-blue-100 group-hover:border-blue-200">
                            <IconComponent className="w-12 h-12 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                          </div>
                          {/* Floating particles effect */}
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                        </div>
                        <h4 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-6 group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-300">{item.title}</h4>
                        <p className="text-slate-600 leading-relaxed text-xl group-hover:text-slate-700 transition-colors duration-300">{item.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Link */}
          <div className="text-center">
            <motion.a
              href={`/platform/${activeCoPilot.slug}`}
              className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 text-white rounded-2xl font-bold text-xl hover:from-blue-700 hover:via-teal-700 hover:to-indigo-700 transition-all duration-500 shadow-2xl hover:shadow-3xl"
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore {activeCoPilot.pageTitle}
              <ArrowRight className="w-6 h-6" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhatYouGetSection;
