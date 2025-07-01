'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Subtopic } from '@/types/topics';

interface TopicCardProps {
  title: string;
  description: string;
  subtopics?: Subtopic[];
  index: number;
  variant?: 'default' | 'highlighted' | 'compact';
}

const TopicCard: React.FC<TopicCardProps> = ({
  title,
  description,
  subtopics,
  index,
  variant = 'default'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const cardVariants = {
    default: 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/80',
    highlighted: 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30 hover:border-blue-400/50',
    compact: 'bg-gray-800/30 border-gray-600 hover:bg-gray-800/60'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`p-6 border rounded-lg transition-all duration-300 hover:scale-[1.02] ${cardVariants[variant]}`}
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-3 leading-tight">
          {title}
        </h3>
        <div 
          className="text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>

      {/* Subtopics */}
      {subtopics && subtopics.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left text-blue-400 hover:text-blue-300 transition-colors duration-200 font-semibold"
          >
            <span>
              {subtopics.length} Key {subtopics.length === 1 ? 'Point' : 'Points'}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4 border-t border-gray-700 pt-4"
            >
              {subtopics.map((subtopic, subIndex) => (
                <div
                  key={subIndex}
                  className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50"
                >
                  <h4 className="font-semibold text-white mb-2">
                    {subtopic.title}
                  </h4>
                  
                  {subtopic.imageUrl && (
                    <div className="mb-3">
                      <img
                        src={subtopic.imageUrl}
                        alt={subtopic.title}
                        className="w-full rounded-md border border-gray-600 hover:border-gray-500 transition-colors duration-200"
                        loading="lazy"
                      />
                    </div>
                  )}
                  
                  <div
                    className="text-gray-400 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: subtopic.description }}
                  />
                </div>
              ))}
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default TopicCard; 