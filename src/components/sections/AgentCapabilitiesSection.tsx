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
    <span className="text-slate-300">{text}</span>
  </li>
);

interface Agent {
  id: string;
  name: string;
  icon: React.ReactElement;
  role: string;
  capabilities: string[];
  isKeyAgent: boolean;
  description?: string;
}

const AGENTS_DATA: Agent[] = [
  {
    id: 'orchestrator',
    name: 'Orchestrator Agent',
    icon: <FiSettings className="w-8 h-8" />,
    role: 'Your AI team lead and workflow engine. It deconstructs your high-level goals and coordinates the specialist agents to deliver a comprehensive, multi-modal answer.',
    isKeyAgent: true,
    capabilities: [
      'Deconstructs complex natural language requests (e.g., "Find targets in the PI3K pathway for this patient and design a gene editing strategy").',
      'Delegates sub-tasks to the appropriate specialist agents in the correct sequence.',
      'Monitors multi-step workflows, providing real-time progress updates.',
      'Synthesizes the findings from all agents into a single, unified, and actionable report.'
    ]
  },
  {
    id: 'genomic_analyst',
    name: 'Genomic Analyst Agent',
    icon: <FiCpu className="w-8 h-8" />,
    role: 'Your in-house computational biologist. It performs deep genomic analysis for therapeutic discovery, pre-clinical validation, and clinical decision support.',
    isKeyAgent: true,
    capabilities: [
      '**Variant Interpretation (Evo 2):** Predicts the functional impact of any SNV with state-of-the-art accuracy to distinguish pathogenic drivers from benign passengers.',
      '**Therapeutic Target Validation (CrisPRO™):** Identifies and annotates variants in potential drug targets to confirm their role in disease.',
      '**Guide RNA Safety Check (CrisPRO™):** Scans gRNA binding sites for known clinical variants in your target population that could affect binding efficiency or create off-target effects.',
      '**Pharmacogenomics (PGx):** Analyzes key genes (e.g., CYP family, TPMT) to predict a patient\'s likely response to specific drugs.',
      '**Radio-genomic Prediction (PrecisionRad™):** Assesses variants in DNA Damage Response (DDR) pathways (e.g., ATM, BRCA) to predict patient-specific radiosensitivity and toxicity risk.'
    ]
  },
  {
    id: 'clinical_data_agent',
    name: 'Clinical Data Agent',
    icon: <FiFileText className="w-8 h-8" />,
    role: 'Your clinical data architect. It transforms messy, unstructured EMR data into a clean, longitudinal, and queryable patient history.',
    isKeyAgent: true,
    capabilities: [
      '**Unstructured Data Processing (AgenticEMR™):** Uses specialized NLP models to extract key entities (diagnoses, medications, procedures, timelines) from pathology reports, discharge summaries, and clinical notes.',
      '**Longitudinal Patient Timeline:** Constructs a comprehensive patient journey, mapping key clinical events over time.',
      '**Cohort Identification:** Identifies patient cohorts based on complex, multi-modal criteria (e.g., "Find all Stage III lung cancer patients with an EGFR L858R mutation who received radiation therapy").',
      '**Clinical Trial Pre-screening:** Matches patient profiles against trial eligibility criteria using the structured data it creates.'
    ]
  },
  {
    id: 'imaging_analyst',
    name: 'Medical Imaging Agent',
    icon: <FiAperture className="w-8 h-8" />,
    role: 'Your virtual medical physicist and radiologist. It performs quantitative analysis on medical scans to support diagnostics and treatment planning.',
    isKeyAgent: false,
    description: "Supports the PrecisionRad™ Co-Pilot by performing automated tumor contouring, radiomic feature extraction, and tracking treatment response over time.",
    capabilities: [
        'Performs automated segmentation of tumors (GTV) and organs-at-risk (OARs) on CT and MRI scans.',
        'Extracts hundreds of quantitative radiomic features to build predictive models of treatment response.',
        'Fuses PET metabolic data with anatomical CT/MRI scans for biologically-informed targeting.',
        'Tracks changes in tumor volume and structure across multiple scans to support Adaptive Radiation Therapy (ART) decisions.'
    ]
  },
  {
    id: 'therapy_strategy_agent',
    name: 'Therapy Strategy Agent',
    icon: <FiEdit className="w-6 h-6" />,
    role: 'Your in silico strategist. It designs and evaluates novel therapeutic interventions, from gene editors to radiation plans.',
    isKeyAgent: false,
    description: 'Designs novel gene editing constructs for CrisPRO™ and evaluates personalized treatment plans for PrecisionRad™.',
    capabilities: [
      'Designs and ranks thousands of guide RNA and homology-directed repair (HDR) templates for gene editing.',
      'Integrates structural biology predictions (AlphaFold) to model the downstream effect of an edit on protein function.',
      'Simulates the potential efficacy of different radiation dose-painting strategies based on fused genomic and imaging data.'
    ]
  },
  {
    id: 'knowledge_agent',
    name: 'Knowledge Agent',
    icon: <FiBookOpen className="w-6 h-6" />,
    role: 'Your AI research librarian. It connects your data to the world\'s biomedical knowledge base.',
    isKeyAgent: false,
    description: 'Uses advanced Retrieval-Augmented Generation (RAG) to answer complex questions, contextualize findings, and provide evidence-based summaries.',
    capabilities: [
        'Answers complex biological questions by querying PubMed, ClinVar, drug labels, and clinical practice guidelines.',
        'Provides the specific citations and evidence supporting its conclusions.',
        'Can be configured to securely search across your internal, proprietary research documents and databases.'
    ]
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
            Intelligent Agent Architecture: The Oncology Copilot
          </h2>
          <p className="text-lg text-slate-300 mb-4">
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
          <div className="mb-8 flex flex-wrap justify-center gap-2 md:gap-3">
            {keyAgents.map((agent) => (
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
            {keyAgents.map((agent) =>
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

        {/* Conceptual Agents Grid */}
        <motion.div
          initial={animationVariants.initial}
          whileInView={animationVariants.animate}
          viewport={{ once: true }}
          transition={animationVariants.transition(0.4)}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-white">
            Additional Specialized Agents
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conceptualAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:bg-slate-800/80 transition-all duration-300 hover:shadow-lg hover:border-primary/50"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-white">
                    {agent.icon}
                  </div>
                  <h4 className="font-semibold text-white">{agent.name}</h4>
                </div>
                <p className="text-sm text-slate-300 mb-2">{agent.role}</p>
                {agent.description && (
                  <p className="text-xs text-slate-400">{agent.description}</p>
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