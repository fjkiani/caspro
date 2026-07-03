'use client';

import React from 'react';
import { motion } from 'framer-motion';
;
import { 
  Search, Pill, Target, Dna, FileText, Users, Activity, Shield,
  ExternalLink, Code, BookOpen, CheckCircle, Clock
} from 'lucide-react';
import { InSilicoCapability } from '@/data/insilico/capabilities';
import Link from 'next/link';

interface InSilicoCapabilityCardProps {
  capability: InSilicoCapability;
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  Search,
  Pill,
  Target,
  Dna,
  FileText,
  Users,
  Activity,
  Shield,
};

const InSilicoCapabilityCard: React.FC<InSilicoCapabilityCardProps> = ({ capability }) => {
  const IconComponent = iconMap[capability.icon] || Activity;
  
  const colorVariants = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600',
      accent: 'bg-blue-500',
      hover: 'hover:bg-blue-100'
    },
    teal: {
      bg: 'bg-teal-50',
      border: 'border-teal-200',
      text: 'text-teal-600',
      accent: 'bg-teal-500',
      hover: 'hover:bg-teal-100'
    },
    indigo: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      text: 'text-indigo-600',
      accent: 'bg-indigo-500',
      hover: 'hover:bg-indigo-100'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-600',
      accent: 'bg-purple-500',
      hover: 'hover:bg-purple-100'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-600',
      accent: 'bg-green-500',
      hover: 'hover:bg-green-100'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-600',
      accent: 'bg-red-500',
      hover: 'hover:bg-red-100'
    }
  };

  const theme = colorVariants[capability.color];

  return (
    <Link href={`/platform/${capability.coPilotSlug}`}>
      <motion.div
        className={`relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border-2 ${theme.border} shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer`}
        whileHover={{ y: -8, scale: 1.02 }}
      >
      {/* Status Badge */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
        {capability.status === 'live' ? (
          <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-semibold">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Live</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs sm:text-sm font-semibold">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Roadmap</span>
          </div>
        )}
      </div>

      {/* Icon */}
      <div className={`inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 ${theme.bg} ${theme.hover} transition-colors duration-300`}>
        <IconComponent className={`w-6 h-6 sm:w-8 sm:h-8 ${theme.text}`} />
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-gray-900 transition-colors duration-300">
        {capability.title}
      </h3>

      {/* Core Capability */}
      <div className="mb-4 sm:mb-6">
        <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Core Capability</h4>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{capability.coreCapability}</p>
      </div>

      {/* Evidence Metrics */}
      <div className="mb-4 sm:mb-6">
        <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-2 sm:mb-3 uppercase tracking-wide">Evidence (Core)</h4>
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${theme.accent}`}></div>
            <span className="text-gray-600"><strong>Confidence:</strong> {capability.evidence.confidence}</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${theme.accent}`}></div>
            <span className="text-gray-600"><strong>Tier:</strong> {capability.evidence.tier}</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${theme.accent}`}></div>
            <span className="text-gray-600"><strong>Sources:</strong> {capability.evidence.sources}</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${theme.accent}`}></div>
            <span className="text-gray-600"><strong>Provenance:</strong> {capability.evidence.provenance}</span>
          </div>
        </div>
      </div>

      {/* Target Audience */}
      <div className="mb-4 sm:mb-6">
        <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Target Audience</h4>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{capability.targetAudience}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-1 sm:gap-2">
        {capability.endpoint && (
          <button 
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 ${theme.bg} ${theme.text} rounded-lg text-xs sm:text-sm font-medium hover:${theme.hover} transition-colors duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            <Code className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">API</span>
          </button>
        )}
        {capability.doctrine && (
          <button 
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 ${theme.bg} ${theme.text} rounded-lg text-xs sm:text-sm font-medium hover:${theme.hover} transition-colors duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Doctrine</span>
          </button>
        )}
        <div className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 ${theme.bg} ${theme.text} rounded-lg text-xs sm:text-sm font-medium`}>
          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Learn More</span>
        </div>
      </div>

      {/* Quick Test (if available) */}
      {capability.quickTest && (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
          <h5 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">Quick Test</h5>
          <code className="text-xs text-gray-600 break-all">{capability.quickTest}</code>
        </div>
      )}
      </motion.div>
    </Link>
  );
};

export default InSilicoCapabilityCard;
