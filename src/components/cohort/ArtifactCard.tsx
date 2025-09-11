'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';

interface ArtifactCardProps {
  name: string;
  type: 'CSV' | 'JSON' | 'PDF';
  url: string;
  description: string;
  index?: number;
  className?: string;
}

const typeColors = {
  CSV: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
  JSON: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  PDF: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' }
};

const ArtifactCard: React.FC<ArtifactCardProps> = ({
  name,
  type,
  url,
  description,
  index = 0,
  className = ''
}) => {
  const typeColor = typeColors[type];

  return (
    <motion.div
      className={`bg-white rounded-2xl p-6 border-2 border-purple-200 shadow-lg ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-50 rounded-lg">
          <FileText className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h4 className="font-bold text-gray-800">{name}</h4>
          <span className={`text-sm ${typeColor.text} bg-gray-100 px-2 py-1 rounded`}>
            {type}
          </span>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      
      <div className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded mb-3">
        {url}
      </div>
      
      <button className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors duration-300">
        <Download className="w-4 h-4" />
        <span className="text-sm font-medium">Download</span>
      </button>
    </motion.div>
  );
};

export default ArtifactCard;
