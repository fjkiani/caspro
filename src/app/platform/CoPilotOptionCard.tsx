'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, TestTube2, Radiation, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the shape of a single co-pilot option
interface CoPilotOption {
  id: string;
  title: string;
  icon: string;
  userDescription: string;
  mainDescription: string;
  link: string;
  linkText: string;
  status: 'active' | 'coming-soon';
}

interface CoPilotOptionCardProps {
  option: CoPilotOption;
  defaultCharLimit?: number;
}

const CoPilotOptionCard: React.FC<CoPilotOptionCardProps> = ({ option, defaultCharLimit = 200 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  let IconComponent: React.ElementType | null = null;
  switch (option.icon) {
    case 'UsersIcon':
      IconComponent = Users;
      break;
    case 'TestTube2Icon':
      IconComponent = TestTube2;
      break;
    case 'RadiationIcon':
      IconComponent = Radiation;
      break;
  }

  const showReadMore = option.mainDescription.length > defaultCharLimit;
  const displayText = isExpanded ? option.mainDescription : `${option.mainDescription.substring(0, defaultCharLimit)}${showReadMore && !isExpanded ? '...' : ''}`;

  return (
    <div className="bg-slate-800/70 backdrop-blur-md rounded-xl shadow-2xl p-6 md:p-8 flex flex-col hover:shadow-primary/30 transition-shadow duration-300 border border-slate-700 h-full">
      <div className="flex-grow mb-6">
        <div className="flex items-center text-primary mb-5">
          {IconComponent && <IconComponent size={30} className="mr-3 flex-shrink-0" />}
          <h2 className="text-xl md:text-2xl font-semibold text-slate-100">{option.title}</h2>
        </div>
        <p className="text-xs md:text-sm text-slate-400 mb-4 font-medium italic">{option.userDescription}</p>
        
        <motion.div layout className="text-slate-300 text-sm md:text-base leading-relaxed">
          <AnimatePresence initial={false} mode="wait">
            <motion.p
              key={isExpanded ? 'full' : 'truncated'}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="whitespace-pre-line"
            >
              {displayText}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {showReadMore && (
          <button 
            onClick={toggleExpanded} 
            className="inline-flex items-center text-primary hover:text-primary/80 mt-3 text-sm font-medium group"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
            {isExpanded ? <ChevronUp size={18} className="ml-1 transition-transform duration-200" /> : <ChevronDown size={18} className="ml-1 transition-transform duration-200" />}
          </button>
        )}
      </div>

      <div className="mt-auto">
        <Link 
          href={option.link} 
          className="btn-primary w-full inline-flex items-center justify-center text-sm md:text-base group"
        >
          {option.linkText} <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-0.5 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  );
};

export default CoPilotOptionCard; 