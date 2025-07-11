'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import ConceptCard from '../shared/ConceptCard';
import { TwoHitVisualization } from '../shared/TwoHitVisualization';
import { CentralDogmaFlow } from '../shared/CentralDogmaFlow';
import { 
  geneticConcepts, 
  oncogeneVsTumorSuppressor, 
  twoHitPathways 
} from '@/data/learn/oncology-101/genetics-data';

const GeneticsOfCancerSection: React.FC = () => {
  return (
    <div className="space-y-12">
      <SectionHeader
        title="Part 2: The Genetic Blueprint of Cancer"
        subtitle="Understanding how genetic changes drive cancer development"
        color="teal"
      />

      {/* Basic Concepts */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-slate-800 mb-2">2.1 Core Genetic Concepts</h3>
          <p className="text-slate-600">Fundamental definitions in cancer genetics</p>
        </div>
        
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {geneticConcepts.map((concept, index) => (
            <ConceptCard
              key={concept.id}
              title={concept.title}
              description={concept.description}
              color="teal"
              index={index}
            />
          ))}
        </motion.div>
      </div>

      {/* Central Dogma */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-slate-800 mb-2">2.2 The Central Dogma</h3>
          <p className="text-slate-600">The flow of genetic information in cells</p>
        </div>
        
        <motion.div
          className="bg-white p-8 rounded-lg shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-slate-700 mb-6 text-center">
            A <strong>gene</strong> is a region of <strong>DNA</strong> that encodes for a functional product (RNA or protein). 
            Humans have ~25,000 genes making up the <strong>genome</strong>, packaged into 23 pairs of <strong>chromosomes</strong>. 
            The flow of information is described by the Central Dogma:
          </p>
          <CentralDogmaFlow />
        </motion.div>
      </div>

      {/* Variation and Mutation */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-slate-800 mb-2">2.3 Variation and Mutation</h3>
          <p className="text-slate-600">How genetic changes occur and are inherited</p>
        </div>
        
        <motion.div
          className="bg-white p-8 rounded-lg shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-slate-700 mb-6 text-center">
            Most genetic variation is <strong>benign</strong>. A <strong>mutation</strong> is detrimental variation that increases disease risk.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              className="p-6 bg-blue-50 rounded-lg border border-blue-200"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-bold text-blue-800 text-lg mb-2">Inherited (Germline)</h4>
              <p className="text-blue-700">Present in egg/sperm, passed to offspring</p>
            </motion.div>
            <motion.div 
              className="p-6 bg-purple-50 rounded-lg border border-purple-200"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-bold text-purple-800 text-lg mb-2">Acquired (Somatic)</h4>
              <p className="text-purple-700">Occurs during life. Not inherited</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Oncogenes vs Tumor Suppressors */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-slate-800 mb-2">2.4 Oncogenes & Tumor Suppressors</h3>
          <p className="text-slate-600">The two main classes of cancer genes</p>
        </div>
        
        <motion.div
          className="bg-white p-8 rounded-lg shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="bg-red-50 p-6 rounded-lg border border-red-200"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-bold text-red-800 text-xl mb-3">
                {oncogeneVsTumorSuppressor.oncogenes.title}
              </h4>
              <p className="text-red-700 mb-3">
                {oncogeneVsTumorSuppressor.oncogenes.description}
              </p>
              <p className="text-sm text-red-600 italic">
                {oncogeneVsTumorSuppressor.oncogenes.mechanism}
              </p>
            </motion.div>
            
            <motion.div
              className="bg-green-50 p-6 rounded-lg border border-green-200"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-bold text-green-800 text-xl mb-3">
                {oncogeneVsTumorSuppressor.tumorSuppressors.title}
              </h4>
              <p className="text-green-700 mb-3">
                {oncogeneVsTumorSuppressor.tumorSuppressors.description}
              </p>
              <p className="text-sm text-green-600 italic">
                {oncogeneVsTumorSuppressor.tumorSuppressors.mechanism}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Two-Hit Hypothesis */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-slate-800 mb-2">2.5 The Two-Hit Hypothesis</h3>
          <p className="text-slate-600">How tumor suppressor genes contribute to cancer development</p>
        </div>
        
        <motion.div
          className="bg-white p-8 rounded-lg shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <p className="text-slate-700 mb-8 text-center">
            This fundamental concept explains how tumor suppressor genes contribute to cancer development. 
            Both copies of a tumor suppressor gene must be inactivated for cancer to develop.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {twoHitPathways.map((pathway, index) => (
              <motion.div
                key={pathway.id}
                className="p-6 bg-slate-50 rounded-lg border border-slate-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + (index * 0.2) }}
              >
                <TwoHitVisualization pathway={pathway} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GeneticsOfCancerSection; 