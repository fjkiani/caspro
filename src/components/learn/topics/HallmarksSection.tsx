'use client';

import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import { HallmarkCard } from '../shared/HallmarkCard';
import { hallmarks, hallmarkCategories } from '@/data/learn/oncology-101/hallmarks-data';

const HallmarksSection: React.FC = () => {
  // Group hallmarks by category
  const coreHallmarks = hallmarks.filter(h => h.category === 'core');
  const emergingHallmarks = hallmarks.filter(h => h.category === 'emerging');
  const enablingHallmarks = hallmarks.filter(h => h.category === 'enabling');

  return (
    <div className="space-y-12">
      <SectionHeader
        title="Part 3: The Hallmarks of Cancer"
        subtitle="An Operating System for Malignancy"
        color="cyan"
      />

      {/* Introduction */}
      <motion.div
        className="text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-lg text-slate-600 mb-8">
          These ten acquired capabilities govern the transformation of normal cells into malignant ones. 
          They provide a framework for understanding how cancer functions and where it can be attacked.
        </p>
      </motion.div>

      {/* Core Hallmarks */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold text-cyan-800 mb-2">
            {hallmarkCategories.core.title}
          </h3>
          <p className="text-slate-600">
            {hallmarkCategories.core.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreHallmarks.map((hallmark, index) => (
            <HallmarkCard
              key={hallmark.id}
              hallmark={hallmark}
              index={index}
            />
          ))}
        </div>
      </motion.div>

      {/* Emerging Hallmarks */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold text-purple-800 mb-2">
            {hallmarkCategories.emerging.title}
          </h3>
          <p className="text-slate-600">
            {hallmarkCategories.emerging.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergingHallmarks.map((hallmark, index) => (
            <HallmarkCard
              key={hallmark.id}
              hallmark={hallmark}
              index={index + coreHallmarks.length}
            />
          ))}
        </div>
      </motion.div>

      {/* Enabling Characteristics */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold text-amber-800 mb-2">
            {hallmarkCategories.enabling.title}
          </h3>
          <p className="text-slate-600">
            {hallmarkCategories.enabling.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enablingHallmarks.map((hallmark, index) => (
            <HallmarkCard
              key={hallmark.id}
              hallmark={hallmark}
              index={index + coreHallmarks.length + emergingHallmarks.length}
            />
          ))}
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        className="bg-gradient-to-r from-cyan-50 to-purple-50 p-6 rounded-lg border border-cyan-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="text-center">
          <h3 className="text-xl font-bold text-slate-800 mb-3">
            Understanding the Hallmarks
          </h3>
          <p className="text-slate-700 max-w-3xl mx-auto">
            Each hallmark represents a fundamental capability that cancer cells must acquire to become malignant. 
            Understanding these hallmarks helps researchers and clinicians identify potential therapeutic targets 
            and develop more effective treatments. Modern cancer therapy often works by targeting one or more of these hallmarks.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HallmarksSection; 