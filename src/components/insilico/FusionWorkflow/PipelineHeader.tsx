'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PipelineHeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const PipelineHeader: React.FC<PipelineHeaderProps> = ({ title, description, children }) => {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-6">{title}</h2>
      <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
        {description}
      </p>
      {children}
    </motion.div>
  );
};

export default PipelineHeader;
