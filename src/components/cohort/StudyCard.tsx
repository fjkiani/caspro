'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Database, Users, FileText } from 'lucide-react';

interface StudyCardProps {
  id: string;
  name: string;
  description: string;
  sampleSize: number;
  disease: string;
  genes: string[];
  source: string;
  index?: number;
  className?: string;
}

const StudyCard: React.FC<StudyCardProps> = ({
  id,
  name,
  description,
  sampleSize,
  disease,
  genes,
  source,
  index = 0,
  className = ''
}) => {
  return (
    <motion.div
      className={`bg-white rounded-2xl p-8 border-2 border-blue-200 shadow-lg ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Database className="w-6 h-6 text-blue-600" />
        </div>
        <h4 className="text-xl font-bold text-gray-800">{name}</h4>
      </div>
      
      <div className="space-y-3">
        <div>
          <span className="font-semibold text-gray-800">Description:</span>
          <p className="text-gray-600">{description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="font-semibold text-gray-800">Sample Size:</span>
            <span className="text-gray-600">{sampleSize.toLocaleString()} patients</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-500" />
            <span className="font-semibold text-gray-800">Source:</span>
            <span className="text-gray-600">{source}</span>
          </div>
        </div>
        
        <div>
          <span className="font-semibold text-gray-800">Disease:</span>
          <span className="text-gray-600 ml-2">{disease}</span>
        </div>
        
        <div>
          <span className="font-semibold text-gray-800">Key Genes:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {genes.map((gene, geneIndex) => (
              <span key={geneIndex} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {gene}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudyCard;
