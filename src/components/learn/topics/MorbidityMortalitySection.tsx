'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import ConceptCard from '../shared/ConceptCard';
import InteractiveCard from '../shared/InteractiveCard';
import { 
  morbidityMortalityIntroduction,
  metastaticPatterns,
  organSpecificMetastases,
  cancerPoisons,
  poisonSyndromes,
  virchowTriadData,
  mortalityMechanisms
} from '@/data/learn/oncology-101/metastasis-data';

const MorbidityMortalitySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'patterns' | 'organs' | 'poisons' | 'syndromes' | 'virchow' | 'mechanisms'>('patterns');

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
        title={morbidityMortalityIntroduction.title}
        subtitle="How cancer hurts and kills patients"
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
          {morbidityMortalityIntroduction.description}
        </p>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="font-semibold text-red-800 mb-3">Key Insights:</h4>
          <ul className="space-y-2">
            {morbidityMortalityIntroduction.keyInsights.map((insight, index) => (
              <li key={index} className="text-red-700 flex items-start">
                <span className="text-red-500 mr-2">•</span>
                {insight}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Stephen Paget's Legacy */}
      <motion.div
        className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
          📊 Stephen Paget's Analysis (1889)
        </h3>
        <p className="text-lg text-slate-700 mb-4">
          Analyzed <strong>735 fatal cases</strong> of breast cancer and demonstrated that metastatic patterns 
          do not simply follow blood flow distribution, but rather depend on organ-specific factors.
        </p>
        <div className="bg-white p-4 rounded-lg">
          <blockquote className="italic text-blue-800 text-lg">
            "When a plant goes to seed, its seed is carried in all directions, 
            but they can only live and grow if they fall on congenial soil."
          </blockquote>
        </div>
      </motion.div>

      {/* Interactive Tabs */}
      <div>
        <div className="flex flex-wrap gap-3 mb-6">
          <TabButton id="patterns" label="Metastatic Patterns" isActive={activeTab === 'patterns'} onClick={() => setActiveTab('patterns')} />
          <TabButton id="organs" label="Organ-Specific Effects" isActive={activeTab === 'organs'} onClick={() => setActiveTab('organs')} />
          <TabButton id="poisons" label="Cancer Poisons" isActive={activeTab === 'poisons'} onClick={() => setActiveTab('poisons')} />
          <TabButton id="syndromes" label="Poison Syndromes" isActive={activeTab === 'syndromes'} onClick={() => setActiveTab('syndromes')} />
          <TabButton id="virchow" label="Virchow's Triad" isActive={activeTab === 'virchow'} onClick={() => setActiveTab('virchow')} />
          <TabButton id="mechanisms" label="Death Mechanisms" isActive={activeTab === 'mechanisms'} onClick={() => setActiveTab('mechanisms')} />
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'patterns' && (
            <motion.div
              key="patterns"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-slate-800">Cancer-Specific Metastatic Patterns</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {metastaticPatterns.map((pattern, index) => (
                  <ConceptCard
                    key={pattern.primaryCancer}
                    title={pattern.primaryCancer}
                    description={`
                      <strong>Common Sites:</strong> ${pattern.commonMetastaticSites.join(', ')}<br/>
                      <strong>Mechanisms:</strong> ${pattern.mechanisms.join(', ')}<br/>
                      <strong>Survival Impact:</strong> ${pattern.survivalImpact}
                    `}
                    color={['blue', 'purple', 'green', 'amber', 'red'][index % 5]}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'organs' && (
            <motion.div
              key="organs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-slate-800">Organ-Specific Metastatic Effects</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {organSpecificMetastases.map((organ, index) => (
                  <InteractiveCard
                    key={organ.organ}
                    title={`${organ.organ} Metastases`}
                    frontContent={`
                      <strong>Description:</strong> ${organ.description}<br/>
                      <strong>Clinical Impact:</strong> ${organ.clinicalImpact}
                    `}
                    backContent={`
                      <strong>Key Mechanisms:</strong><br/>
                      ${organ.mechanisms.map(m => `• ${m}`).join('<br/>')}<br/><br/>
                      <strong>Examples:</strong><br/>
                      ${organ.examples.map(e => `• ${e}`).join('<br/>')}
                    `}
                    type="flip"
                    color={['red', 'amber', 'blue', 'green'][index % 4]}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'poisons' && (
            <motion.div
              key="poisons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-slate-800">Cancer Poisons: Cytokines & Chemokines</h3>
              <div className="mb-6 bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-amber-800">
                  <strong>Key Concept:</strong> Cancer cells and tumor microenvironment produce toxic substances 
                  that act as systemic poisons, causing more harm than direct organ damage.
                </p>
              </div>
              <div className="space-y-6">
                {cancerPoisons.map((poison, index) => (
                  <ConceptCard
                    key={poison.name}
                    title={poison.name}
                    description={`
                      <strong>Description:</strong> ${poison.description}<br/>
                      <strong>Mechanism:</strong> ${poison.mechanism}<br/>
                      <strong>Effects:</strong> ${poison.effects.join(', ')}<br/>
                      <strong>Clinical Relevance:</strong> ${poison.clinicalRelevance}
                    `}
                    color={['red', 'purple', 'blue', 'green', 'amber'][index % 5]}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'syndromes' && (
            <motion.div
              key="syndromes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-slate-800">Cancer Poison Syndromes</h3>
              <div className="mb-6 bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-red-800">
                  <strong>Critical Understanding:</strong> Most cancer patients don't die from organ failure, 
                  but from these systemic poison syndromes that affect the entire body.
                </p>
              </div>
              <div className="space-y-6">
                {poisonSyndromes.map((syndrome, index) => (
                  <InteractiveCard
                    key={syndrome.id}
                    title={syndrome.name}
                    frontContent={`
                      <strong>Description:</strong> ${syndrome.description}<br/>
                      <strong>Prevalence:</strong> ${syndrome.prevalence}<br/>
                      <strong>Symptoms:</strong> ${syndrome.symptoms.join(', ')}
                    `}
                    backContent={`
                      <strong>Mechanism:</strong><br/>
                      ${syndrome.mechanism}<br/><br/>
                      <strong>Prognosis:</strong><br/>
                      ${syndrome.prognosis}
                    `}
                    type="flip"
                    color={['red', 'purple', 'amber'][index % 3]}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'virchow' && (
            <motion.div
              key="virchow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-slate-800">{virchowTriadData.title}</h3>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
                <p className="text-blue-800 text-lg mb-4">{virchowTriadData.description}</p>
                <p className="text-blue-700 font-medium">{virchowTriadData.clinicalRelevance}</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {virchowTriadData.components.map((component, index) => (
                  <InteractiveCard
                    key={component.factor}
                    title={component.factor}
                    frontContent={`
                      <strong>Mechanism:</strong><br/>
                      ${component.mechanism}
                    `}
                    backContent={`
                      <strong>Contribution to Thrombosis:</strong><br/>
                      ${component.cancerConnection}
                    `}
                    type="flip"
                    color={['red', 'blue', 'green'][index % 3]}
                    index={index}
                  />
                ))}
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">Clinical Impact</h4>
                <p className="text-yellow-700">
                  When all three factors are present together, blood clots form. About <strong>20% of cancer patients</strong> 
                  develop thrombosis, and pulmonary embolism can be fatal.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'mechanisms' && (
            <motion.div
              key="mechanisms"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-slate-800">How Cancer Kills: Two Main Mechanisms</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {mortalityMechanisms.map((mechanism, index) => (
                  <ConceptCard
                    key={mechanism.mechanism}
                    title={mechanism.mechanism}
                    description={`
                      <strong>Description:</strong> ${mechanism.description}<br/>
                      <strong>Examples:</strong> ${mechanism.examples.join(', ')}<br/>
                      <strong>Frequency:</strong> ${mechanism.frequency}
                    `}
                    color={index === 0 ? 'blue' : 'red'}
                    index={index}
                  />
                ))}
              </div>
              
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <h4 className="font-semibold text-slate-800 mb-4">💡 Key Insight: Scale Perspective</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-medium text-slate-700 mb-2">Human Body</h5>
                    <p className="text-slate-600">~100 trillion cells</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-medium text-slate-700 mb-2">Typical Lethal Cancer</h5>
                    <p className="text-slate-600">1-2 trillion cells (only 1-2% of body)</p>
                  </div>
                </div>
                <p className="text-slate-700 mt-4">
                  This small percentage explains why mechanical organ failure is rare - 
                  cancer kills through chemical warfare, not physical takeover.
                </p>
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
            <h4 className="font-semibold text-red-700 mb-2">Clinical Reality</h4>
            <ul className="space-y-1 text-slate-700">
              <li>• Metastasis causes 90% of cancer deaths</li>
              <li>• Most deaths from poison syndromes, not organ failure</li>
              <li>• Cachexia present in 80% of terminal patients</li>
              <li>• 20% of patients develop life-threatening clots</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-700 mb-2">Treatment Challenges</h4>
            <ul className="space-y-1 text-slate-700">
              <li>• No effective cachexia treatments</li>
              <li>• Pain management has severe side effects</li>
              <li>• Thrombosis treated reactively</li>
              <li>• Need for better supportive care</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MorbidityMortalitySection; 