'use client';

import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import { 
  tnmComponents, 
  stagingIntroduction, 
  cancerEcology, 
  oligometastasisConcept 
} from '@/data/learn/oncology-101/staging-data';

const StagingSection: React.FC = () => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'border-blue-500 bg-blue-50';
      case 'green': return 'border-green-500 bg-green-50';
      case 'red': return 'border-red-500 bg-red-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getTextColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-600';
      case 'green': return 'text-green-600';
      case 'red': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Part 5: Cancer Staging & Ecology"
        subtitle="Understanding how cancer spreads and the environments it creates"
        color="indigo"
      />

      {/* TNM Staging System */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-2xl font-semibold text-center text-slate-800 mb-4">
          {stagingIntroduction.title}
        </h3>
        <p className="text-center text-slate-600 mb-6">
          {stagingIntroduction.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {tnmComponents.map((component, index) => (
            <motion.div
              key={component.letter}
              className={`p-6 rounded-lg border-l-4 ${getColorClasses(component.color)}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + (index * 0.2) }}
              whileHover={{ scale: 1.02 }}
            >
              <h4 className={`text-4xl font-bold ${getTextColor(component.color)}`}>
                {component.letter}
              </h4>
              <h5 className="text-xl font-semibold text-slate-800 mt-1">
                {component.name}
              </h5>
              <p className="text-slate-600 mt-2 text-sm">
                {component.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.p
          className="text-center text-slate-700 font-semibold bg-slate-50 p-4 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {stagingIntroduction.example}
        </motion.p>
      </motion.div>

      {/* Cancer Ecology */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-2xl font-semibold text-center text-slate-800 mb-4">
          Cancer Ecology: The Seed, Soil, and Swamp
        </h3>
        <p className="text-center text-slate-600 mb-6">
          This paradigm views cancer not just as a disease of cells, but as a complex ecosystem.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {cancerEcology.map((section, index) => (
            <motion.div
              key={section.title}
              className="p-6 bg-indigo-50 rounded-lg border border-indigo-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + (index * 0.2) }}
            >
              <h4 className="text-xl font-bold text-indigo-800 mb-3">
                {section.title}
              </h4>
              <p className="text-slate-700 mb-4 text-sm">
                {section.description}
              </p>
              <ul className="space-y-2">
                {section.concepts.map((concept, conceptIndex) => (
                  <motion.li
                    key={conceptIndex}
                    className="text-sm text-slate-600 flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + (index * 0.2) + (conceptIndex * 0.1) }}
                  >
                    <span className="text-indigo-500 mr-2">•</span>
                    {concept}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Oligometastasis */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <h3 className="text-2xl font-semibold text-center text-slate-800 mb-4">
          {oligometastasisConcept.title}
        </h3>
        <p className="text-center text-slate-600 mb-6">
          {oligometastasisConcept.description}
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            className="text-center p-6 bg-green-50 rounded-lg border border-green-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
          >
            <h4 className="font-bold text-green-800 text-lg mb-4">
              {oligometastasisConcept.comparison.limited.title}
            </h4>
            <ul className="text-sm text-left space-y-2">
              {oligometastasisConcept.comparison.limited.characteristics.map((char, index) => (
                <li key={index} className="text-slate-700 flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  {char}
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            className="text-center p-6 bg-red-50 rounded-lg border border-red-200"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6 }}
          >
            <h4 className="font-bold text-red-800 text-lg mb-4">
              {oligometastasisConcept.comparison.widespread.title}
            </h4>
            <ul className="text-sm text-left space-y-2">
              {oligometastasisConcept.comparison.widespread.characteristics.map((char, index) => (
                <li key={index} className="text-slate-700 flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  {char}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default StagingSection; 