'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { topics } from '@/data/home-topics';

const PillarsSection: React.FC = () => {
  const pillarsData = topics.find(t => t.title.includes('Pillars'));

  return (
    <section className="mb-20">
      <h3 className="text-2xl font-bold text-white text-center mb-4">
         Our Solution: The Pillars of Innovation
      </h3>
      <p className="text-lg text-gray-400 text-center max-w-3xl mx-auto mb-12">
        Our <strong>CrisPRO Oncology Co-Pilot</strong> is not a single tool, but a holistic ecosystem built on 
        interconnected strategic pillars. This is our blueprint for victory.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillarsData?.subtopics?.map((pillar, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:bg-gray-800/80 transition-all duration-300"
          >
            <h4 className="font-bold text-blue-400 text-sm mb-2">{pillar.title}</h4>
            <p className="text-gray-400 text-sm" dangerouslySetInnerHTML={{ __html: pillar.description }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PillarsSection; 