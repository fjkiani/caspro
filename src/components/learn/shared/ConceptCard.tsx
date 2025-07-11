'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ConceptCardProps {
  title?: string;
  term?: string;
  description?: string;
  definition?: string;
  color?: string;
  index?: number;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ 
  title, 
  term, 
  description, 
  definition, 
  color = 'blue', 
  index = 0 
}) => {
  const displayTitle = title || term || '';
  const displayContent = description || definition || '';
  
  const getColorClasses = (colorName: string) => {
    switch (colorName) {
      case 'teal': return 'border-teal-500 text-teal-700';
      case 'cyan': return 'border-cyan-500 text-cyan-700';
      case 'red': return 'border-red-500 text-red-700';
      case 'green': return 'border-green-500 text-green-700';
      case 'purple': return 'border-purple-500 text-purple-700';
      case 'amber': return 'border-amber-500 text-amber-700';
      default: return 'border-blue-500 text-blue-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`bg-white p-6 rounded-lg shadow hover:shadow-md transition-all duration-300 border-l-4 ${getColorClasses(color).split(' ')[0]}`}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <h3 className={`text-xl font-semibold mb-2 ${getColorClasses(color).split(' ')[1]}`}>
        {displayTitle}
      </h3>
      <p 
        className="text-slate-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: displayContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
      />
    </motion.div>
  );
};

export default ConceptCard; 