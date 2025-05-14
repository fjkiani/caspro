'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCpu, FiUsers, FiCalendar, FiSearch, FiFileText, FiSettings, FiBox, FiList, FiZap, FiMessageCircle, FiBell, FiLink2, FiCheckSquare, FiEdit
} from 'react-icons/fi';

interface CapabilityItemProps {
  text: string;
}

const CapabilityItem: React.FC<CapabilityItemProps> = ({ text }) => (
  <li className="flex items-start">
    <FiCheckSquare className="flex-shrink-0 w-5 h-5 text-primary mr-2 mt-1" />
    <span>{text}</span>
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
    role: 'The central intelligence hub, interpreting user input and routing requests to specialized agents.',
    isKeyAgent: true,
    capabilities: [
      'Parses user prompts using LLMs (e.g., Gemini 1.5 Flash) to identify intent and extract relevant details.',
      'Selects the most appropriate specialized agent based on the parsed intent.',
      'Manages execution by invoking the selected agent with necessary context (patient data, prompt details).'
    ]
  },
  {
    id: 'genomic',
    name: 'Genomic Analyst Agent',
    icon: <FiCpu className="w-8 h-8" />,
    role: 'Specializes in analyzing patient genomic data, interpreting variants, and assessing genetic criteria. Primary interactor with biological AI models.',
    isKeyAgent: true,
    capabilities: [
      'Parses user queries about specific genes, variants, or genomic criteria.',
      'Utilizes Evo2 (simulated/planned) for variant effect prediction (classifications, consequences, predictive scores).',
      'Integrates patient-specific mutation data to evaluate if queried genomic criteria are met.',
      'Generates structured GenomicAnalysisResult (status, gene summaries, variant details, clinical context).',
      'Links to therapy design by identifying targets and passing relevant genomic details for CRISPR guide design.'
    ]
  },
  {
    id: 'clinical_trial',
    name: 'Clinical Trial Agent',
    icon: <FiSearch className="w-8 h-8" />,
    role: 'Assists users in finding relevant clinical trials based on patient profile and disease characteristics.',
    isKeyAgent: true,
    capabilities: [
      'Constructs search queries using patient data and user prompt details.',
      'Performs semantic vector database searches (ChromaDB, Sentence Transformers) on trial eligibility criteria.',
      'Retrieves full trial details from a relational database.',
      'Simulates LLM-based patient eligibility assessment against trial criteria (narrative summary, status).',
      'Suggests next actions based on eligibility assessment (e.g., review unmet criteria).'
    ]
  },
  {
    id: 'scheduling',
    name: 'Scheduling Agent',
    icon: <FiCalendar className="w-8 h-8" />,
    role: 'Handles appointment scheduling requests by interacting with external calendar tools (simulated).',
    isKeyAgent: true,
    capabilities: [
      'Interprets natural language requests for appointments (dates, times, duration) using an LLM.',
      'Utilizes LangChain to orchestrate calls to tools for finding available slots and booking appointments.',
      'Manages multi-turn conversations to clarify details and confirm actions before booking.'
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
    <section id="agent-capabilities" className="py-16 md:py-24 bg-white"> {/* Switched to white bg for contrast with cards */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={animationVariants.initial}
          whileInView={animationVariants.animate}
          viewport={{ once: true }}
          transition={animationVariants.transition()}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <div className="flex justify-center text-5xl text-primary mb-6">
            <FiUsers />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Intelligent Agent Architecture: The Oncology Copilot
          </h2>
          <p className="text-lg text-slate-600 mb-4">
            The Oncology Copilot platform is built on a modular, AI-driven agent architecture. This allows the system to delegate complex tasks to specialized components, acting as an intelligent "copilot" that can understand user requests, analyze data, and interact with various tools and knowledge sources.
          </p>
          <p className="text-md text-slate-500 bg-slate-100 p-4 rounded-lg inline-block">
            At the core is the <code className="font-mono text-sm bg-slate-200 text-slate-700 px-1 py-0.5 rounded">AgentInterface</code>, an Abstract Base Class defining the standard blueprint for all agents, ensuring consistency and standardized interaction for the orchestrator.
          </p>
        </motion.div>

        {/* Key Agents Tabs */}
        <motion.div
          initial={animationVariants.initial}
          whileInView={animationVariants.animate}
          viewport={{ once: true }}
          transition={animationVariants.transition(0.2)}
        >
          <div className="mb-8 flex flex-wrap justify-center gap-2 md:gap-3 border-b-2 border-slate-200 pb-4">
            {keyAgents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setActiveTab(agent.id)}
                className={`px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 whitespace-nowrap
                  ${activeTab === agent.id ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
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
                  className="bg-white p-6 md:p-8 rounded-xl shadow-2xl border border-slate-200"
                >
                  <div className="flex items-center mb-4">
                    {React.cloneElement(agent.icon, { className: "text-primary mr-3 flex-shrink-0" })}
                    <h3 className="text-2xl font-semibold text-slate-800">{agent.name}</h3>
                  </div>
                  <p className="text-slate-600 mb-6 italic"><strong>Role:</strong> {agent.role}</p>
                  <h4 className="text-lg font-semibold text-slate-700 mb-3">Key Capabilities:</h4>
                  <ul className="space-y-3 text-slate-600">
                    {agent.capabilities.map((cap, index) => (
                      <CapabilityItem key={index} text={cap} />
                    ))}
                  </ul>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </motion.div>

        {/* Planned/Conceptual Agents Section */}
        <motion.div
          initial={animationVariants.initial}
          whileInView={animationVariants.animate}
          viewport={{ once: true }}
          transition={animationVariants.transition(0.4)}
          className="mt-16 md:mt-20 pt-10 border-t border-slate-200"
        >
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
            <div className="flex justify-center text-4xl text-primary mb-5">
              <FiBox />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              Future & Specialized Agent Ecosystem
            </h3>
            <p className="text-lg text-slate-600">
              The architecture is designed to support additional specialized agents or modules, expanding CasPro&apos;s capabilities over time.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conceptualAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={animationVariants.initial}
                whileInView={animationVariants.animate}
                viewport={{ once: true }}
                transition={animationVariants.transition(index * 0.1 + 0.5)}
                className="bg-slate-50 p-6 rounded-lg shadow-lg border border-slate-200 h-full flex flex-col"
              >
                <div className="flex items-center text-primary mb-3">
                  {React.cloneElement(agent.icon, { className: "mr-2 flex-shrink-0" })}
                  <h4 className="text-md font-semibold text-slate-700">{agent.name}</h4>
                </div>
                <p className="text-sm text-slate-600 italic mb-2"><strong>Role:</strong> {agent.role}</p>
                {agent.description && <p className="text-sm text-slate-600 flex-grow">{agent.description}</p>}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Concluding Statement */}
        <motion.div
          initial={animationVariants.initial}
          whileInView={animationVariants.animate}
          viewport={{ once: true }}
          transition={animationVariants.transition(0.6)}
          className="mt-16 md:mt-20 pt-10 border-t border-slate-200 text-center"
        >
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-slate-700 to-slate-900 text-white p-8 rounded-lg shadow-xl">
            <h4 className="text-xl font-semibold mb-3">A Flexible & Powerful Foundation</h4>
            <p className="text-lg font-light leading-relaxed">
              This agent-based structure provides a flexible and powerful foundation for building a comprehensive AI-powered copilot that can assist across various complex tasks in precision oncology.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AgentCapabilitiesSection; 