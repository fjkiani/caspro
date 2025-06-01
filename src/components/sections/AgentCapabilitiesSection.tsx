'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCpu, FiUsers, FiCalendar, FiSearch, FiFileText, FiSettings, FiBox, FiList, FiZap, FiMessageCircle, FiBell, FiLink2, FiCheckSquare, FiEdit
} from 'react-icons/fi';
import DoubleDnaHelix from '@/components/ui/DoubleDnaHelix';
import DnaBasePairStrip from '@/components/ui/DnaBasePairStrip';

interface CapabilityItemProps {
  text: string;
}

const CapabilityItem: React.FC<CapabilityItemProps> = ({ text }) => (
  <li className="flex items-start">
    <FiCheckSquare className="flex-shrink-0 w-5 h-5 text-blue-600 mr-2 mt-1" />
    <span className="text-slate-700">{text}</span>
  </li>
);

interface Agent {
  id: string;
  name: string;
  icon: React.ReactElement;
  role: string;
  capabilities: string[];
  isKeyAgent: boolean;
  description?: string; // For conceptual agents
}

const AGENTS_DATA: Agent[] = [
  {
    id: 'orchestrator',
    name: 'Agent Orchestrator',
    icon: <FiSettings className="w-8 h-8" />,
    role: 'Your primary AI assistant and team coordinator. It understands your instructions and ensures the right specialist AI agent handles your task efficiently.',
    isKeyAgent: true,
    capabilities: [
      'Listens to your requests in everyday medical language, understanding the core task you need help with.',
      'Identifies which specialized AI agent (like the Genomic Analyst or Clinical Trial expert) is best suited for your request.',
      'Provides the specialist agent with all relevant information (such as patient data or specific questions) to get the job done effectively.'
    ]
  },
  {
    id: 'genomic',
    name: 'Genomic Analyst Agent',
    icon: <FiCpu className="w-8 h-8" />,
    role: 'Your dedicated genomics expert. It dives deep into patient genetic data to find critical mutations, understand their impact, and see if they match important genetic criteria, working closely with our advanced AI biology models.',
    isKeyAgent: true,
    capabilities: [
      "Understands your questions about specific genes, genetic changes (variants), or particular genomic conditions.",
      "Uses advanced AI (Evo2) to predict how genetic changes might affect a patient and their condition.",
      "Checks a patient's unique genetic makeup against the criteria you're interested in.",
      "Provides clear, organized summaries of its findings, including gene details, variant information, and how it relates to the patient's clinical situation.",
      "Helps identify potential targets for new therapies and provides the necessary genetic details for designing treatments like CRISPR."
    ]
  },
  {
    id: 'clinical_trial',
    name: 'Clinical Trial Agent',
    icon: <FiSearch className="w-8 h-8" />,
    role: 'Your clinical trial navigator. It quickly finds relevant clinical trials that match your patient\'s specific medical profile and cancer type.',
    isKeyAgent: true,
    capabilities: [
      "Uses patient details and your specific requests to intelligently search for matching trials.",
      "Scans through vast databases of clinical trial information to find the best matches based on eligibility.",
      "Provides comprehensive details for each potentially suitable trial.",
      "Offers an initial assessment of whether your patient might be eligible for a trial, summarizing key points.",
      "Suggests next steps, like reviewing specific eligibility criteria that might need closer attention."
    ]
  },
  {
    id: 'scheduling',
    name: 'Scheduling Agent',
    icon: <FiCalendar className="w-8 h-8" />,
    role: 'Your virtual scheduling assistant. It helps manage appointments by working with your existing calendar tools.',
    isKeyAgent: true,
    capabilities: [
      "Understands your spoken or typed requests for appointments (e.g., 'Schedule a follow-up next Tuesday afternoon').",
      "Checks for available time slots and can book appointments directly into your calendar.",
      "Can ask clarifying questions if needed (e.g., 'Is 2 PM or 3 PM better?') and confirms before finalizing."
    ]
  },
  {
    id: 'therapy_design',
    name: 'Therapy Design Agent ',
    icon: <FiEdit className="w-6 h-6" />,
    role: 'Orchestrates in silico design of novel gene therapies.',
    isKeyAgent: false,
    description: "Uses Evo2's generative power, AlphaFold 3 for structural prediction, and cancer-specific scoring to evaluate designs.",
    capabilities: []
  },
  {
    id: 'comparative_therapy',
    name: 'Comparative Therapy Agent',
    icon: <FiList className="w-6 h-6" />,
    role: 'Compares different therapeutic options based on patient data and evidence.',
    isKeyAgent: false,
    description: "Evaluates drugs, trials, and designed therapies to inform treatment choices.",
    capabilities: []
  },
  {
    id: 'side_effect',
    name: 'Side Effect Agent ',
    icon: <FiZap className="w-6 h-6" />,
    role: 'Predicts or summarizes potential side effects.',
    isKeyAgent: false,
    description: "Analyzes proposed therapies or patient profiles for potential adverse effects.",
    capabilities: []
  },
  {
    id: 'patient_education',
    name: 'Patient Education Draft Agent ',
    icon: <FiMessageCircle className="w-6 h-6" />,
    role: 'Drafts simplified explanations for patient communication.',
    isKeyAgent: false,
    description: "Translates complex genomic findings or treatment options into understandable language.",
    capabilities: []
  },
  {
    id: 'referral',
    name: 'Referral Agent ',
    icon: <FiLink2 className="w-6 h-6" />,
    role: 'Assists in identifying relevant specialists or clinics.',
    isKeyAgent: false,
    description: "Suggests referrals based on patient condition and location.",
    capabilities: []
  },
  {
    id: 'notification',
    name: 'Notification Agent ',
    icon: <FiBell className="w-6 h-6" />,
    role: 'Manages automated alerts or summaries.',
    isKeyAgent: false,
    description: "Sends updates based on analysis results or workflow progress.",
    capabilities: []
  }
];

const keyAgents = AGENTS_DATA.filter(agent => agent.isKeyAgent);
const conceptualAgents = AGENTS_DATA.filter(agent => !agent.isKeyAgent);

const AgentCapabilitiesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(keyAgents[0]?.id || '');

  const animationVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: (delay: number = 0) => ({ duration: 0.5, delay })
  };

  return (
    <section id="agent-capabilities" className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-indigo-50 via-purple-50 to-blue-50">
      {/* DNA Background Elements */}
      <div className="absolute left-8 top-16 w-20 h-3/5 opacity-30 pointer-events-none" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
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
      <div className="absolute right-8 top-24 w-16 h-2/3 opacity-25 pointer-events-none" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
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
      
      {/* DNA base pairs decorative element at top */}
      <DnaBasePairStrip className="absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={animationVariants.initial}
          whileInView={animationVariants.animate}
          viewport={{ once: true }}
          transition={animationVariants.transition()}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <div className="flex justify-center text-5xl mb-6">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-600 to-cyan-600">
              <FiUsers />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-700 to-cyan-700">
              Intelligent Agent Architecture: The Oncology Copilot
            </span>
          </h2>
          <p className="text-lg text-slate-600 mb-4">
            Think of CrisPRO's Oncology Copilot as your personal team of highly specialized AI assistants, working together seamlessly. Each agent has a unique expertise, much like different specialists in a hospital. This 'Intelligent Agent Architecture' allows you to delegate complex tasks, from analyzing patient data to exploring treatment options, making your workflow faster and more insightful.
          </p>
        </motion.div>

        {/* Key Agents Tabs */}
        <motion.div
          initial={animationVariants.initial}
          whileInView={animationVariants.animate}
          viewport={{ once: true }}
          transition={animationVariants.transition(0.2)}
        >
          <div className="mb-8 flex flex-wrap justify-center gap-2 md:gap-3 border-b-2 border-gradient-to-r from-purple-200 via-blue-200 to-cyan-200 pb-4">
            {keyAgents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setActiveTab(agent.id)}
                className={`px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/50 whitespace-nowrap
                  ${activeTab === agent.id 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg shadow-purple-500/25' 
                    : 'bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-blue-50 border border-blue-200/50'
                  }`}
              >
                {agent.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {keyAgents.map((agent) =>
              activeTab === agent.id && (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-blue-200/50"
                >
                  {/* DNA-themed glowing border */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 opacity-60"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-60"></div>
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 via-blue-400 to-cyan-400 opacity-60"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-400 to-purple-400 opacity-60"></div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                      {agent.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-700">
                          {agent.name}
                        </span>
                      </h3>
                      <p className="text-slate-700 mb-6 leading-relaxed">{agent.role}</p>
                      {agent.capabilities.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold mb-3 text-blue-700">Key Capabilities:</h4>
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

        {/* Conceptual Agents Grid */}
        <motion.div
          initial={animationVariants.initial}
          whileInView={animationVariants.animate}
          viewport={{ once: true }}
          transition={animationVariants.transition(0.4)}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600">
              Additional Specialized Agents
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conceptualAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-blue-200/50 hover:bg-white/90 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white">
                    {agent.icon}
                  </div>
                  <h4 className="font-semibold text-slate-900">{agent.name}</h4>
                </div>
                <p className="text-sm text-slate-600 mb-2">{agent.role}</p>
                {agent.description && (
                  <p className="text-xs text-slate-500">{agent.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AgentCapabilitiesSection; 