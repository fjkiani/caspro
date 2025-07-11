'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import InteractiveCard from '../shared/InteractiveCard';
import ProgressTracker from '../shared/ProgressTracker';
import { interactiveBiologyConcepts, studyStrategies } from '@/data/learn/oncology-101/interactive-biology-concepts';

const EnhancedBiologySection: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showStudyTips, setShowStudyTips] = useState(false);
  const [completedConcepts, setCompletedConcepts] = useState<Set<string>>(new Set());

  const handleConceptComplete = (conceptId: string) => {
    setCompletedConcepts(prev => new Set([...prev, conceptId]));
  };

  const PathVisualization = () => (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-center text-slate-800 mb-6">
        The Journey from Normal to Cancer
      </h3>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
        {['Normal', 'Hyperplasia', 'Dysplasia', 'Neoplasia', 'Invasion'].map((stage, index) => (
          <React.Fragment key={stage}>
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold ${
                  index === 0 ? 'bg-green-500' :
                  index === 1 ? 'bg-yellow-500' :
                  index === 2 ? 'bg-orange-500' :
                  index === 3 ? 'bg-red-500' :
                  'bg-purple-500'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {index + 1}
              </motion.div>
              <p className="text-sm font-medium mt-2 text-center text-slate-700">{stage}</p>
            </motion.div>
            
            {index < 4 && (
              <motion.div
                className="hidden md:block text-3xl text-slate-400 font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (index * 0.2) + 0.3 }}
              >
                →
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const StudyTipsModal = () => (
    <AnimatePresence>
      {showStudyTips && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowStudyTips(false)}
        >
          <motion.div
            className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-slate-800">🧠 Study Strategies</h3>
              <button
                onClick={() => setShowStudyTips(false)}
                className="text-slate-500 hover:text-slate-700 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              {Object.entries(studyStrategies).map(([key, strategy]) => (
                <div key={key} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-lg text-slate-800 mb-2">
                    {strategy.title}
                  </h4>
                  {'description' in strategy && (
                    <p className="text-slate-600 mb-2">{strategy.description}</p>
                  )}
                  {'example' in strategy && (
                    <p className="text-sm text-blue-600 italic">
                      Example: {strategy.example}
                    </p>
                  )}
                  {'examples' in strategy && (
                    <ul className="text-sm text-blue-600 space-y-1">
                      {strategy.examples.map((example, idx) => (
                        <li key={idx} className="italic">• {example}</li>
                      ))}
                    </ul>
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
        title="Part 1: Defining the Enemy - The Biology of Cancer"
        subtitle="Understanding the fundamental nature of cancer, its classification, and progression"
      />

      <ProgressTracker
        moduleSlug="oncology-101"
        topicSlug="biology-of-cancer"
        totalTopics={6}
        currentTopicIndex={0}
      />

      {/* Study Tips Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowStudyTips(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          🧠 Study Tips & Memory Aids
        </button>
      </div>

      {/* Interactive Concept Sections */}
      {interactiveBiologyConcepts.map((section, sectionIndex) => (
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
            className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (sectionIndex * 0.2) + 0.5 }}
          >
            <h4 className="font-semibold text-indigo-800 mb-4 flex items-center">
              <span className="mr-2">🧠</span>
              Memory Aids for {section.title}
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {section.concepts
                .filter(concept => concept.memoryAid)
                .map((concept, idx) => (
                  <div key={idx} className="bg-white p-3 rounded border border-indigo-200">
                    <span className="font-medium text-slate-800">{concept.title}:</span>
                    <p className="text-sm text-indigo-700 mt-1" 
                       dangerouslySetInnerHTML={{ __html: concept.memoryAid?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') || '' }} 
                    />
                  </div>
                ))}
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Path to Malignancy Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <PathVisualization />
      </motion.div>

      {/* Concept Connections */}
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <h3 className="text-2xl font-semibold text-center text-slate-800 mb-6">
          🔗 How These Concepts Connect
        </h3>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-700 leading-relaxed">
            Understanding cancer requires seeing how these concepts work together. <strong>Cancer</strong> is fundamentally about cells losing their normal controls. This happens through a progression from <strong>normal</strong> → <strong>hyperplasia</strong> → <strong>dysplasia</strong> → <strong>neoplasia</strong> → <strong>invasion/metastasis</strong>.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mt-4">
            The type of cancer depends on which tissue is affected: <strong>carcinomas</strong> (most common) come from linings, <strong>sarcomas</strong> from connective tissue, <strong>leukemias</strong> from blood, and <strong>lymphomas</strong> from the immune system.
          </p>
        </div>
      </motion.div>

      {/* Quick Review Section */}
      <motion.div
        className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
          <span className="mr-2">✅</span>
          Quick Review - Can You Remember?
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-slate-800">🦠 What makes cancer dangerous?</p>
            <p className="text-slate-600">Its ability to metastasize (spread)</p>
          </div>
          <div>
            <p className="font-medium text-slate-800">🏢 Most common cancer type?</p>
            <p className="text-slate-600">Carcinoma (~85% of cancers)</p>
          </div>
          <div>
            <p className="font-medium text-slate-800">🩸 What does "leukemia" mean?</p>
            <p className="text-slate-600">"White blood" disease</p>
          </div>
          <div>
            <p className="font-medium text-slate-800">⚠️ Is dysplasia reversible?</p>
            <p className="text-slate-600">Often yes, unlike true neoplasia</p>
          </div>
        </div>
      </motion.div>

      <StudyTipsModal />
    </div>
  );
};

export default EnhancedBiologySection; 