'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUsers, FiCheckSquare, FiCpu, FiFileText, FiSettings, FiEdit, FiAperture, FiBookOpen } from 'react-icons/fi';
import DoubleDnaHelix from '@/components/ui/DoubleDnaHelix';
import { AGENTS_DATA, AGENTS_SECTION_CONFIG, type Agent } from '@/data/agents-config';

// Icon mapping
const iconMap = {
  FiSettings,
  FiCpu,
  FiFileText,
  FiAperture,
  FiEdit,
  FiBookOpen
};

interface CapabilityItemProps {
  text: string;
}

const CapabilityItem: React.FC<CapabilityItemProps> = ({ text }) => (
  <li className="flex items-start">
    <FiCheckSquare className="flex-shrink-0 w-5 h-5 text-primary mr-2 mt-1" />
    <span 
      className="text-slate-300"
      dangerouslySetInnerHTML={{ 
        __html: text
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
          .replace(/`(.*?)`/g, '<code class="text-xs bg-slate-700 text-amber-400 rounded px-1 py-0.5 font-mono">$1</code>')
      }} 
    />
  </li>
);


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
    <section id="agent-capabilities" className="relative overflow-hidden py-16 md:py-24 bg-white text-slate-800">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800">
          {AGENTS_SECTION_CONFIG.title}
          </h2>
          <p className="text-lg text-slate-600 mb-4">
            {AGENTS_SECTION_CONFIG.description}
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
                      {React.createElement(iconMap[agent.iconName as keyof typeof iconMap], { className: "w-8 h-8" })}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-slate-800">
                        {agent.name}
                      </h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">{agent.role}</p>
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
          <h3 className="text-2xl font-bold text-center mb-8 text-gradient">
            {AGENTS_SECTION_CONFIG.additionalAgentsTitle}
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
                    {React.createElement(iconMap[agent.iconName as keyof typeof iconMap], { className: "w-6 h-6" })}
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