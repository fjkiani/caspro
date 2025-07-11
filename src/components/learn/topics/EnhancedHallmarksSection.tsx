'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import InteractiveCard from '../shared/InteractiveCard';
import ProgressTracker from '../shared/ProgressTracker';
import { interactiveHallmarksConcepts, hallmarksMemoryAids } from '@/data/learn/oncology-101/interactive-hallmarks-concepts';

const EnhancedHallmarksSection: React.FC = () => {
  const [showMemoryAids, setShowMemoryAids] = useState(false);

  const HallmarksOverview = () => (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-center text-slate-800 mb-6">
        The 10 Hallmarks of Cancer
      </h3>
      <div className="text-center mb-8">
        <p className="text-slate-600 text-lg">
          Think of cancer as acquiring <strong>superpowers</strong> that normal cells don't have
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Core Hallmarks */}
        <motion.div
          className="bg-red-50 p-6 rounded-lg border-2 border-red-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h4 className="text-xl font-bold text-red-800 mb-4 text-center">
            🚨 Core Hallmarks (6)
          </h4>
          <div className="space-y-2 text-sm">
            <p className="text-red-700">• Self-sufficiency in growth signals</p>
            <p className="text-red-700">• Insensitivity to growth inhibition</p>
            <p className="text-red-700">• Evading apoptosis</p>
            <p className="text-red-700">• Limitless replicative potential</p>
            <p className="text-red-700">• Sustained angiogenesis</p>
            <p className="text-red-700">• Tissue invasion & metastasis</p>
          </div>
        </motion.div>

        {/* Emerging Hallmarks */}
        <motion.div
          className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="text-xl font-bold text-orange-800 mb-4 text-center">
            ⚠️ Emerging Hallmarks (2)
          </h4>
          <div className="space-y-2 text-sm">
            <p className="text-orange-700">• Reprogramming energy metabolism</p>
            <p className="text-orange-700">• Evading immune destruction</p>
          </div>
        </motion.div>

        {/* Enabling Characteristics */}
        <motion.div
          className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="text-xl font-bold text-purple-800 mb-4 text-center">
            🔧 Enabling Characteristics (2)
          </h4>
          <div className="space-y-2 text-sm">
            <p className="text-purple-700">• Genomic instability & mutation</p>
            <p className="text-purple-700">• Tumor-promoting inflammation</p>
          </div>
        </motion.div>
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <p className="text-center text-blue-800 font-medium">
          💡 <strong>Remember:</strong> Normal cells follow rules. Cancer cells break all the rules to become "super-cells" that can't be stopped.
        </p>
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
            className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-slate-800">🧠 Hallmarks Memory Aids</h3>
              <button
                onClick={() => setShowMemoryAids(false)}
                className="text-slate-500 hover:text-slate-700 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              {/* SILAGE Acronym */}
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-lg text-slate-800 mb-2">
                  {hallmarksMemoryAids.coreHallmarksAcronym.title}
                </h4>
                <p className="text-slate-600 mb-3">{hallmarksMemoryAids.coreHallmarksAcronym.description}</p>
                <div className="bg-red-50 p-4 rounded border border-red-200">
                  {Object.entries(hallmarksMemoryAids.coreHallmarksAcronym.acronym).map(([letter, meaning]) => (
                    <p key={letter} className="text-sm text-red-800 mb-1">
                      <strong>{letter}:</strong> {meaning}
                    </p>
                  ))}
                  <p className="text-xs text-red-600 italic mt-2">
                    {hallmarksMemoryAids.coreHallmarksAcronym.note}
                  </p>
                </div>
              </div>

              {/* Cancer House Analogy */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-lg text-slate-800 mb-2">
                  {hallmarksMemoryAids.hallmarksHouse.title}
                </h4>
                <p className="text-slate-600 mb-3">{hallmarksMemoryAids.hallmarksHouse.description}</p>
                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <div className="grid md:grid-cols-2 gap-2">
                    {Object.entries(hallmarksMemoryAids.hallmarksHouse.rooms).map(([room, description]) => (
                      <p key={room} className="text-sm text-blue-800">
                        <strong>{room.charAt(0).toUpperCase() + room.slice(1)}:</strong> {description}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Traffic Light System */}
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-lg text-slate-800 mb-2">
                  {hallmarksMemoryAids.trafficLightSystem.title}
                </h4>
                <p className="text-slate-600 mb-3">{hallmarksMemoryAids.trafficLightSystem.description}</p>
                <div className="bg-green-50 p-4 rounded border border-green-200">
                  {Object.entries(hallmarksMemoryAids.trafficLightSystem.system).map(([color, description]) => (
                    <p key={color} className="text-sm text-green-800 mb-1">
                      <strong className={`${color === 'red' ? 'text-red-600' : color === 'yellow' ? 'text-yellow-600' : 'text-purple-600'}`}>
                        {color.toUpperCase()}:
                      </strong> {description}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Part 3: The Hallmarks of Cancer"
        subtitle="The ten acquired capabilities that transform normal cells into malignant ones"
        color="red"
      />

      <ProgressTracker
        moduleSlug="oncology-101"
        topicSlug="hallmarks-of-cancer"
        totalTopics={6}
        currentTopicIndex={2}
      />

      {/* Memory Aids Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowMemoryAids(true)}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          🧠 Hallmarks Memory Aids
        </button>
      </div>

      {/* Overview */}
      <HallmarksOverview />

      {/* Interactive Concept Sections */}
      {interactiveHallmarksConcepts.map((section, sectionIndex) => (
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
            className={`bg-gradient-to-r p-6 rounded-lg border ${
              section.id === 'core-hallmarks' ? 'from-red-50 to-pink-50 border-red-200' :
              section.id === 'emerging-hallmarks' ? 'from-orange-50 to-yellow-50 border-orange-200' :
              'from-purple-50 to-indigo-50 border-purple-200'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (sectionIndex * 0.2) + 0.5 }}
          >
            <h4 className={`font-semibold mb-4 flex items-center ${
              section.id === 'core-hallmarks' ? 'text-red-800' :
              section.id === 'emerging-hallmarks' ? 'text-orange-800' :
              'text-purple-800'
            }`}>
              <span className="mr-2">🧠</span>
              Memory Aids for {section.title}
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {section.concepts
                .filter(concept => concept.memoryAid)
                .map((concept, idx) => (
                  <div key={idx} className="bg-white p-3 rounded border border-gray-200">
                    <span className="font-medium text-slate-800">{concept.title}:</span>
                    <p className={`text-sm mt-1 ${
                      section.id === 'core-hallmarks' ? 'text-red-700' :
                      section.id === 'emerging-hallmarks' ? 'text-orange-700' :
                      'text-purple-700'
                    }`} 
                       dangerouslySetInnerHTML={{ __html: concept.memoryAid?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') || '' }} 
                    />
                  </div>
                ))}
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Quick Review Section */}
      <motion.div
        className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
          <span className="mr-2">✅</span>
          Quick Review - Hallmarks Challenge!
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-slate-800">🚦 Self-sufficiency means?</p>
            <p className="text-slate-600">Cancer cells don't need external growth signals</p>
          </div>
          <div>
            <p className="font-medium text-slate-800">💀 Evading apoptosis means?</p>
            <p className="text-slate-600">Cancer cells refuse to die when damaged</p>
          </div>
          <div>
            <p className="font-medium text-slate-800">♾️ Limitless replication means?</p>
            <p className="text-slate-600">Cancer cells can divide forever (immortal)</p>
          </div>
          <div>
            <p className="font-medium text-slate-800">🩸 Angiogenesis means?</p>
            <p className="text-slate-600">Cancer cells recruit blood vessels to feed tumors</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-green-100 rounded border border-green-300">
          <p className="text-sm text-green-800 font-medium text-center">
            🎯 <strong>Master Tip:</strong> Use the SILAGE acronym to remember all 6 core hallmarks!
          </p>
        </div>
      </motion.div>

      <MemoryAidsModal />
    </div>
  );
};

export default EnhancedHallmarksSection; 