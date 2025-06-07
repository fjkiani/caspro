'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCpu, FiUsers, FiFileText, FiSettings, FiEdit, FiAperture, FiBookOpen, FiCheckSquare
} from 'react-icons/fi';
import DoubleDnaHelix from '@/components/ui/DoubleDnaHelix';

interface CapabilityItemProps {
  text: string;
}

const CapabilityItem: React.FC<CapabilityItemProps> = ({ text }) => (
  <li className="flex items-start">
    <FiCheckSquare className="flex-shrink-0 w-5 h-5 text-primary mr-2 mt-1" />
    <span className="text-slate-300" dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>') }} />
  </li>
);

interface Agent {
  id: string;
  name: string;
  icon: React.ReactElement;
  role: string;
  capabilities: string[];
}

const AGENTS_DATA: Agent[] = [
  {
    id: 'orchestrator',
    name: 'Orchestrator Agent',
    icon: <FiSettings className="w-8 h-8" />,
    role: 'The AI team lead. It understands your high-level goals and coordinates the other specialist agents to deliver comprehensive answers.',
    capabilities: [
      'Deconstructs complex requests into manageable sub-tasks.',
      'Delegates tasks to the appropriate specialist agents.',
      'Synthesizes findings into a single, unified report.'
    ]
  },
  {
    id: 'genomic_analyst',
    name: 'Genomic Analyst Agent',
    icon: <FiCpu className="w-8 h-8" />,
    role: 'Your in-house computational biologist. It performs deep analysis of genomic data to find therapeutic targets and predict treatment responses.',
    capabilities: [
      '**Variant Interpretation:** Predicts the functional impact of any genetic variant to distinguish pathogenic drivers from benign passengers.',
      '**Therapeutic Target Validation:** Identifies and annotates variants in potential drug targets to confirm their role in disease.',
      '**Radio-genomic Prediction:** Assesses variants in key pathways to predict patient-specific radiosensitivity and toxicity risk.'
    ]
  },
  {
    id: 'clinical_data_agent',
    name: 'Clinical Data Agent',
    icon: <FiFileText className="w-8 h-8" />,
    role: 'Your clinical data architect. It transforms messy, unstructured EMR data into a clean, queryable patient history.',
    capabilities: [
      '**Unstructured Data Processing:** Extracts key information from clinical notes, pathology reports, and discharge summaries.',
      '**Longitudinal Patient Timeline:** Constructs a comprehensive patient journey, mapping key clinical events over time.',
      '**Clinical Trial Pre-screening:** Matches patient profiles against complex trial eligibility criteria in minutes.'
    ]
  }
];

const AgentCapabilitiesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(AGENTS_DATA[0]?.id || '');

  const animationVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: (delay: number = 0) => ({ duration: 0.5, delay })
  };

  return (
    <section id="agent-capabilities" className="relative overflow-hidden py-16 md:py-24 bg-slate-900 text-white">
      {/* DNA Background Elements */}
      <div className="absolute left-8 top-16 w-20 h-3/5 opacity-10 pointer-events-none" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
        <DoubleDnaHelix 
          className="w-full h-full" 
          baseCount={8}
          rotationSpeed={20}
          colors={{
            adenine: '#a855f7',
            thymine: '#3b82f6', 
            guanine: '#06b6d4',
            cytosine: '#8b5cf6',
            backbone1: '#a855f7',
            backbone2: '#3b82f6'
          }}
        />
      </div>
      <div className="absolute right-8 top-24 w-16 h-2/3 opacity-10 pointer-events-none" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
        <DoubleDnaHelix 
          className="w-full h-full" 
          baseCount={6}
          rotationSpeed={15}
          colors={{
            adenine: '#3b82f6',
            thymine: '#a855f7',
            guanine: '#8b5cf6', 
            cytosine: '#06b6d4',
            backbone1: '#3b82f6',
            backbone2: '#a855f7'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={animationVariants.initial}
          whileInView={animationVariants.animate}
          viewport={{ once: true }}
          transition={animationVariants.transition()}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <div className="flex justify-center text-5xl mb-6 text-primary">
            <FiUsers />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Your Personal AI Research Team
          </h2>
          <p className="text-lg text-slate-300 mb-4">
            Our platform is powered by a team of specialized AI agents that work together to solve your most complex research challenges. 
            The Orchestrator Agent acts as your team lead, delegating tasks to specialists like the Genomic Analyst and Clinical Data Agent to deliver comprehensive insights, faster.
          </p>
        </motion.div>

        {/* Key Agents Tabs */}
        <motion.div
          initial={animationVariants.initial}
          whileInView={animationVariants.animate}
          viewport={{ once: true }}
          transition={animationVariants.transition(0.2)}
        >
          <div className="mb-8 flex flex-wrap justify-center gap-2 md:gap-3">
            {AGENTS_DATA.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setActiveTab(agent.id)}
                className={`px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 whitespace-nowrap
                  ${activeTab === agent.id 
                    ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
              >
                {agent.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {AGENTS_DATA.map((agent) =>
              activeTab === agent.id && (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-slate-700"
                >
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-lg">
                      {agent.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-white">
                        {agent.name}
                      </h3>
                      <p className="text-slate-300 mb-6 leading-relaxed">{agent.role}</p>
                      {agent.capabilities.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold mb-3 text-primary">Key Capabilities:</h4>
                          <ul className="space-y-3">
                            {agent.capabilities.map((capability, index) => (
                              <CapabilityItem key={index} text={capability} />
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default AgentCapabilitiesSection; 