'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import ConceptCard from '../shared/ConceptCard';
import InteractiveCard from '../shared/InteractiveCard';
import { 
  dormancyIntroduction,
  dormancyTypes,
  dormancyProperties,
  cellStates,
  organTropismData,
  clinicalEvidenceData,
  reactivationTriggers,
  dormancyTherapeuticStrategies
} from '@/data/learn/oncology-101/metastasis-data';

const DormancySecondaryGrowthSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'types' | 'properties' | 'evidence' | 'reactivation' | 'therapy'>('overview');

  const TabButton: React.FC<{ id: string; label: string; isActive: boolean; onClick: () => void }> = ({ id, label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
        isActive 
          ? 'bg-red-500 text-white shadow-lg' 
          : 'bg-white text-red-600 hover:bg-red-50 border border-red-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-12">
      <SectionHeader
        title={dormancyIntroduction.title}
        subtitle="Why cancer returns years after treatment"
        color="red"
      />

      {/* Introduction */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-lg text-slate-700 leading-relaxed mb-6">
          {dormancyIntroduction.description}
        </p>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="font-semibold text-red-800 mb-3">Key Questions This Section Addresses:</h4>
          <ul className="space-y-2">
            {dormancyIntroduction.keyQuestions.map((question, index) => (
              <li key={index} className="text-red-700 flex items-start">
                <span className="text-red-500 mr-2">•</span>
                {question}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Seed and Soil Hypothesis */}
      <motion.div
        className="bg-gradient-to-r from-amber-50 to-green-50 p-6 rounded-lg border border-amber-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold text-amber-800 mb-4 flex items-center">
          🌱 The Seed and Soil Hypothesis
        </h3>
        <p className="text-lg text-slate-700 mb-4">
          <strong>Stephen Paget (1889):</strong> "When a plant goes to seed, its seeds are carried in all directions. 
          But they can only live and grow if they fall on congenial soil."
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-amber-700 mb-2">🌰 Seed (Cancer Cell)</h4>
            <p className="text-slate-600">Disseminated tumor cells that travel through circulation to distant organs</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 mb-2">🌱 Soil (Organ Environment)</h4>
            <p className="text-slate-600">Microenvironment of the target organ, including cell types, ECM, and signaling factors</p>
          </div>
        </div>
      </motion.div>

      {/* Organ Tropism Examples */}
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Organ-Specific Metastasis Patterns</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {organTropismData.map((data, index) => (
            <ConceptCard
              key={data.primaryCancer}
              title={data.primaryCancer}
              description={`
                <strong>Common Sites:</strong> ${data.commonMetastaticSites.join(', ')}<br/>
                <strong>Key Mechanisms:</strong> ${data.mechanisms.join(', ')}<br/>
                <strong>Clinical Impact:</strong> ${data.survivalImpact}
              `}
              color={index % 2 === 0 ? 'blue' : 'purple'}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Interactive Tabs */}
      <div>
        <div className="flex flex-wrap gap-3 mb-6">
          <TabButton id="overview" label="Cell States" isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <TabButton id="types" label="Dormancy Types" isActive={activeTab === 'types'} onClick={() => setActiveTab('types')} />
          <TabButton id="properties" label="Properties" isActive={activeTab === 'properties'} onClick={() => setActiveTab('properties')} />
          <TabButton id="evidence" label="Clinical Evidence" isActive={activeTab === 'evidence'} onClick={() => setActiveTab('evidence')} />
          <TabButton id="reactivation" label="Reactivation" isActive={activeTab === 'reactivation'} onClick={() => setActiveTab('reactivation')} />
          <TabButton id="therapy" label="Therapeutic Strategies" isActive={activeTab === 'therapy'} onClick={() => setActiveTab('therapy')} />
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-slate-800">Understanding Cell States: Quiescence vs Senescence vs Dormancy</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {cellStates.map((state, index) => (
                  <InteractiveCard
                    key={state.id}
                    title={state.name}
                    frontContent={`
                      <strong>Definition:</strong> ${state.description}<br/>
                      <strong>Duration:</strong> ${state.duration}<br/>
                      <strong>Characteristics:</strong> ${state.characteristics.slice(0, 2).join(', ')}
                    `}
                    backContent={`
                      <strong>Key Features:</strong><br/>
                      ${state.characteristics.map(char => `• ${char}`).join('<br/>')}<br/>
                      <strong>Reactivation:</strong><br/>
                      ${state.reactivationTriggers.slice(0, 2).join('<br/>')}
                    `}
                    type="flip"
                    color={index === 0 ? 'green' : index === 1 ? 'red' : 'purple'}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'types' && (
            <motion.div
              key="types"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-slate-800">Types of Cancer Dormancy</h3>
              <div className="space-y-6">
                {dormancyTypes.map((type, index) => (
                  <ConceptCard
                    key={type.id}
                    title={type.name}
                    description={`
                      <strong>Description:</strong> ${type.description}<br/>
                      <strong>Characteristics:</strong> ${type.characteristics.join(', ')}<br/>
                      <strong>Clinical Relevance:</strong> ${type.clinicalRelevance}<br/>
                      <strong>Examples:</strong> ${type.examples.join(', ')}
                    `}
                    color={index === 0 ? 'teal' : index === 1 ? 'red' : 'amber'}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'properties' && (
            <motion.div
              key="properties"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-slate-800">Properties of Dormant Cancer Cells</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {dormancyProperties.map((property, index) => (
                  <InteractiveCard
                    key={property.id}
                    title={property.name}
                    frontContent={`
                      <strong>Description:</strong> ${property.description}<br/>
                      <strong>Mechanism:</strong> ${property.mechanism}
                    `}
                    backContent={`
                      <strong>Clinical Implications:</strong><br/>
                      ${property.clinicalImplications.map(impl => `• ${impl}`).join('<br/>')}
                    `}
                    type="flip"
                    color={['blue', 'green', 'red', 'purple', 'amber'][index % 5]}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'evidence' && (
            <motion.div
              key="evidence"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-slate-800">Clinical Evidence for Dormancy</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {clinicalEvidenceData.map((evidence, index) => (
                  <ConceptCard
                    key={evidence.id}
                    title={evidence.title}
                    description={`
                      <strong>Finding:</strong> ${evidence.finding}<br/>
                      <strong>Implication:</strong> ${evidence.implication}<br/>
                      <strong>Source:</strong> ${evidence.source}
                    `}
                    color={['cyan', 'green', 'amber', 'purple'][index % 4]}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'reactivation' && (
            <motion.div
              key="reactivation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-slate-800">What Triggers Dormant Cell Reactivation?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {reactivationTriggers.map((trigger, index) => (
                  <InteractiveCard
                    key={trigger.id}
                    title={trigger.trigger}
                    frontContent={`
                      <strong>Mechanism:</strong> ${trigger.mechanism}<br/>
                      <strong>Examples:</strong> ${trigger.examples.join(', ')}
                    `}
                    backContent={`
                      <strong>Analogy:</strong><br/>
                      ${trigger.analogy}
                    `}
                    type="flip"
                    color={['red', 'green', 'blue', 'purple'][index % 4]}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'therapy' && (
            <motion.div
              key="therapy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-slate-800">Therapeutic Strategies for Dormant Cells</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {dormancyTherapeuticStrategies.map((strategy, index) => (
                  <ConceptCard
                    key={strategy.id}
                    title={strategy.strategy}
                    description={`
                      <strong>Approach:</strong> ${strategy.approach}<br/>
                      <strong>Rationale:</strong> ${strategy.rationale}<br/>
                      <strong>Challenges:</strong> ${strategy.challenges.join(', ')}
                    `}
                    color={['teal', 'red', 'amber', 'purple'][index % 4]}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Key Takeaways */}
      <motion.div
        className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-lg border border-red-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold text-red-800 mb-4">🎯 Key Takeaways</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-red-700 mb-2">Clinical Significance</h4>
            <ul className="space-y-1 text-slate-700">
              <li>• Dormancy explains late cancer recurrence</li>
              <li>• 62% of breast cancer deaths occur &gt;5 years post-surgery</li>
              <li>• Current imaging cannot detect dormant cells</li>
              <li>• Dormant cells are the seeds of metastasis</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-700 mb-2">Research Challenges</h4>
            <ul className="space-y-1 text-slate-700">
              <li>• Difficult to study dormant cells in lab</li>
              <li>• Unknown mechanisms of dormancy maintenance</li>
              <li>• Limited therapeutic targets</li>
              <li>• Need for dormancy-specific biomarkers</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DormancySecondaryGrowthSection; 