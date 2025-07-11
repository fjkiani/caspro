'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import InteractiveCard from '../shared/InteractiveCard';
import ProgressTracker from '../shared/ProgressTracker';
import { interactiveGeneticsConcepts, geneticsMemoryAids } from '@/data/learn/oncology-101/interactive-genetics-concepts';
import { centralDogmaSteps } from '@/data/learn/oncology-101/genetics-data';

const EnhancedGeneticsSection: React.FC = () => {
  const [showMemoryAids, setShowMemoryAids] = useState(false);

  const CentralDogmaVisualization = () => (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-center text-slate-800 mb-6">
        The Central Dogma of Molecular Biology
      </h3>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
        {centralDogmaSteps.map((step, index) => (
          <React.Fragment key={step.id}>
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3 }}
            >
              <motion.div
                className="bg-teal-100 text-teal-800 font-bold p-4 rounded-lg shadow-sm border-2 border-teal-200 min-w-[120px] text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl mb-2">
                  {step.name === 'DNA' ? '🧬' : step.name === 'RNA' ? '📄' : '🔧'}
                </div>
                <div className="font-bold text-lg">{step.name}</div>
              </motion.div>
              <p className="text-xs mt-2 text-slate-600 font-medium">({step.process})</p>
              <p className="text-xs mt-1 text-slate-500 max-w-32 text-center">
                {step.description}
              </p>
            </motion.div>
            
            {index < centralDogmaSteps.length - 1 && (
              <motion.div
                className="hidden md:block text-4xl text-teal-500 font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (index * 0.3) + 0.2 }}
              >
                →
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const TwoHitVisualization = () => (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-center text-slate-800 mb-6">
        The Two-Hit Hypothesis Explained
      </h3>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Sporadic Cancer */}
        <motion.div
          className="p-6 bg-blue-50 rounded-lg border border-blue-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="text-xl font-bold text-blue-800 mb-4 text-center">
            Sporadic Cancer
          </h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                <div className="w-8 h-8 bg-green-500 rounded border-2 border-slate-500"></div>
                <div className="w-8 h-8 bg-green-500 rounded border-2 border-slate-500"></div>
              </div>
              <span className="text-sm text-slate-700">Born with 2 normal copies</span>
            </div>
            <div className="text-center text-2xl">↓ Hit 1</div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                <div className="w-8 h-8 bg-red-500 rounded border-2 border-slate-500"></div>
                <div className="w-8 h-8 bg-green-500 rounded border-2 border-slate-500"></div>
              </div>
              <span className="text-sm text-slate-700">1 copy damaged</span>
            </div>
            <div className="text-center text-2xl">↓ Hit 2</div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                <div className="w-8 h-8 bg-red-500 rounded border-2 border-slate-500"></div>
                <div className="w-8 h-8 bg-red-500 rounded border-2 border-slate-500"></div>
              </div>
              <span className="text-sm text-slate-700 font-bold">Cancer develops</span>
            </div>
          </div>
        </motion.div>

        {/* Hereditary Cancer */}
        <motion.div
          className="p-6 bg-purple-50 rounded-lg border border-purple-200"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="text-xl font-bold text-purple-800 mb-4 text-center">
            Hereditary Cancer
          </h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                <div className="w-8 h-8 bg-red-500 rounded border-2 border-slate-500"></div>
                <div className="w-8 h-8 bg-green-500 rounded border-2 border-slate-500"></div>
              </div>
              <span className="text-sm text-slate-700">Born with 1 damaged copy</span>
            </div>
            <div className="text-center text-2xl">↓ Hit 1</div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                <div className="w-8 h-8 bg-red-500 rounded border-2 border-slate-500"></div>
                <div className="w-8 h-8 bg-red-500 rounded border-2 border-slate-500"></div>
              </div>
              <span className="text-sm text-slate-700 font-bold">Cancer develops</span>
            </div>
            <div className="mt-4 p-3 bg-purple-100 rounded border border-purple-300">
              <p className="text-sm text-purple-800 font-medium">
                ⚠️ Higher risk - only need 1 more hit instead of 2!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const MemoryAidsModal = () => (
    <AnimatePresence>
      {showMemoryAids && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowMemoryAids(false)}
        >
          <motion.div
            className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-slate-800">🧠 Genetics Memory Aids</h3>
              <button
                onClick={() => setShowMemoryAids(false)}
                className="text-slate-500 hover:text-slate-700 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              {Object.entries(geneticsMemoryAids).map(([key, aid]) => (
                <div key={key} className="border-l-4 border-teal-500 pl-4">
                  <h4 className="font-semibold text-lg text-slate-800 mb-2">
                    {aid.title}
                  </h4>
                  <p className="text-slate-600 mb-3">{aid.description}</p>
                  
                  {'steps' in aid && (
                    <ul className="space-y-1">
                      {aid.steps.map((step, idx) => (
                        <li key={idx} className="text-sm text-teal-700">
                          • {step}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {'analogy' in aid && (
                    <div className="bg-teal-50 p-3 rounded border border-teal-200">
                      {Object.entries(aid.analogy).map(([concept, description]) => (
                        <p key={concept} className="text-sm text-teal-800">
                          <strong>{concept}:</strong> {description}
                        </p>
                      ))}
                    </div>
                  )}
                  
                  {'concept' in aid && (
                    <p className="text-sm text-teal-700 italic bg-teal-50 p-2 rounded">
                      💡 {aid.concept}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Part 2: The Genetic Blueprint of Cancer"
        subtitle="Understanding how genetic changes drive cancer development"
        color="teal"
      />

      <ProgressTracker
        moduleSlug="oncology-101"
        topicSlug="genetics-of-cancer"
        totalTopics={6}
        currentTopicIndex={1}
      />

      {/* Memory Aids Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowMemoryAids(true)}
          className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          🧠 Genetics Memory Aids
        </button>
      </div>

      {/* Interactive Concept Sections */}
      {interactiveGeneticsConcepts.map((section, sectionIndex) => (
        <motion.div
          key={section.id}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sectionIndex * 0.2 }}
        >
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-slate-800 mb-2">{section.title}</h3>
            <p className="text-slate-600">{section.subtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.concepts.map((concept, index) => (
              <InteractiveCard
                key={concept.id}
                title={concept.title}
                frontContent={concept.frontContent}
                backContent={concept.backContent}
                type={concept.type}
                color={concept.color}
                icon={concept.icon}
                quiz={concept.quiz}
                index={index}
              />
            ))}
          </div>

          {/* Memory Aids Section */}
          <motion.div
            className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg border border-teal-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (sectionIndex * 0.2) + 0.5 }}
          >
            <h4 className="font-semibold text-teal-800 mb-4 flex items-center">
              <span className="mr-2">🧠</span>
              Memory Aids for {section.title}
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {section.concepts
                .filter(concept => concept.memoryAid)
                .map((concept, idx) => (
                  <div key={idx} className="bg-white p-3 rounded border border-teal-200">
                    <span className="font-medium text-slate-800">{concept.title}:</span>
                    <p className="text-sm text-teal-700 mt-1" 
                       dangerouslySetInnerHTML={{ __html: concept.memoryAid?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') || '' }} 
                    />
                  </div>
                ))}
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Central Dogma Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <CentralDogmaVisualization />
      </motion.div>

      {/* Two-Hit Hypothesis Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <TwoHitVisualization />
      </motion.div>

      {/* Quick Review Section */}
      <motion.div
        className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg border border-green-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
          <span className="mr-2">✅</span>
          Quick Review - Test Your Memory!
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-slate-800">🧬 How many genes do humans have?</p>
            <p className="text-slate-600">~25,000 genes</p>
          </div>
          <div>
            <p className="font-medium text-slate-800">➡️ Central Dogma flow?</p>
            <p className="text-slate-600">DNA → RNA → Protein</p>
          </div>
          <div>
            <p className="font-medium text-slate-800">🚗 Oncogenes are like?</p>
            <p className="text-slate-600">Gas pedal (promote division)</p>
          </div>
          <div>
            <p className="font-medium text-slate-800">🛑 Tumor suppressors are like?</p>
            <p className="text-slate-600">Brakes (prevent division)</p>
          </div>
        </div>
      </motion.div>

      <MemoryAidsModal />
    </div>
  );
};

export default EnhancedGeneticsSection; 