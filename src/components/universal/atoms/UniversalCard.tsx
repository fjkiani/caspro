'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, Download, Play } from 'lucide-react';
import { UniversalCard as UniversalCardType, CardContent, MediaContent } from '@/types/universal-content';

interface UniversalCardProps {
  card: UniversalCardType;
  index?: number;
  onClick?: () => void;
  className?: string;
}

const MediaRenderer: React.FC<{ media: MediaContent }> = ({ media }) => {
  switch (media.type) {
    case 'image':
      return (
        <img 
          src={media.src} 
          alt={media.alt || ''} 
          className="w-full h-48 object-cover rounded-t-lg"
        />
      );
    case 'video':
      return (
        <video 
          src={media.src} 
          controls={media.controls}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      );
    case '3d_model':
      return (
        <div className="w-full h-48 bg-slate-100 rounded-t-lg flex items-center justify-center">
          <Play className="w-8 h-8 text-slate-400" />
          <span className="ml-2 text-slate-600">3D Model</span>
        </div>
      );
    default:
      return null;
  }
};

const getCardColors = (color?: string) => {
  const colors = {
    red: {
      bg: 'from-red-50 to-red-100',
      border: 'border-red-200',
      text: 'text-red-600',
      hover: 'hover:border-red-300'
    },
    blue: {
      bg: 'from-blue-50 to-blue-100',
      border: 'border-blue-200',
      text: 'text-blue-600',
      hover: 'hover:border-blue-300'
    },
    green: {
      bg: 'from-green-50 to-green-100',
      border: 'border-green-200',
      text: 'text-green-600',
      hover: 'hover:border-green-300'
    },
    purple: {
      bg: 'from-purple-50 to-purple-100',
      border: 'border-purple-200',
      text: 'text-purple-600',
      hover: 'hover:border-purple-300'
    },
    orange: {
      bg: 'from-orange-50 to-orange-100',
      border: 'border-orange-200',
      text: 'text-orange-600',
      hover: 'hover:border-orange-300'
    },
    teal: {
      bg: 'from-teal-50 to-teal-100',
      border: 'border-teal-200',
      text: 'text-teal-600',
      hover: 'hover:border-teal-300'
    },
    default: {
      bg: 'from-slate-50 to-slate-100',
      border: 'border-slate-200',
      text: 'text-slate-600',
      hover: 'hover:border-slate-300'
    }
  };
  return colors[color as keyof typeof colors] || colors.default;
};

const BasicCard: React.FC<UniversalCardProps> = ({ card, index = 0, onClick, className = '' }) => {
  const colors = getCardColors(card.color);
  const content = typeof card.content === 'string' ? card.content : card.content.front || '';
  const media = typeof card.content === 'object' ? card.content.media : undefined;

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-lg border-2 ${colors.border} ${colors.hover} transition-all duration-200 cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
      onClick={onClick}
    >
      {media && <MediaRenderer media={media} />}
      <div className="p-6">
        <h3 className={`text-lg font-semibold ${colors.text} mb-3`}>
          {card.title}
        </h3>
        <div 
          className="text-slate-700 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        {card.actions && card.actions.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {card.actions.map((action, i) => (
              <button
                key={i}
                className={`px-3 py-1 text-xs rounded-full ${colors.bg} ${colors.text} border ${colors.border} hover:shadow-md transition-all duration-200`}
              >
                {action.type === 'link' && <ExternalLink className="w-3 h-3 inline mr-1" />}
                {action.type === 'download' && <Download className="w-3 h-3 inline mr-1" />}
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const FlipCard: React.FC<UniversalCardProps> = ({ card, index = 0, className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const colors = getCardColors(card.color);
  const content = typeof card.content === 'object' ? card.content : { front: card.content, back: '' };

  return (
    <motion.div
      className={`relative h-64 cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 w-full h-full bg-gradient-to-br ${colors.bg} rounded-lg border-2 ${colors.border} shadow-lg p-6 flex flex-col justify-center`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <h3 className={`text-xl font-bold ${colors.text} text-center mb-4`}>
            {card.title}
          </h3>
          <div 
            className="text-slate-700 text-center"
            dangerouslySetInnerHTML={{ __html: content.front || '' }}
          />
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 w-full h-full bg-white rounded-lg border-2 ${colors.border} shadow-lg p-6 flex flex-col justify-center`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div 
            className="text-slate-700 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content.back || '' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExpandableCard: React.FC<UniversalCardProps> = ({ card, index = 0, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = getCardColors(card.color);
  const content = typeof card.content === 'object' ? card.content : { front: card.content, expanded: '' };

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-lg border-2 ${colors.border} ${colors.hover} transition-all duration-200 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      layout
    >
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start">
          <h3 className={`text-lg font-semibold ${colors.text} mb-3 flex-1`}>
            {card.title}
          </h3>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className={`w-5 h-5 ${colors.text}`} />
          </motion.div>
        </div>
        <div 
          className="text-slate-700 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content.front || '' }}
        />
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`px-6 pb-6 border-t ${colors.border} bg-gradient-to-br ${colors.bg}`}>
              <div 
                className="text-slate-700 text-sm leading-relaxed pt-4"
                dangerouslySetInnerHTML={{ __html: content.expanded || '' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const InteractiveCard: React.FC<UniversalCardProps> = ({ card, index = 0, className = '' }) => {
  const [isActive, setIsActive] = useState(false);
  const colors = getCardColors(card.color);

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-lg border-2 transition-all duration-200 cursor-pointer ${
        isActive ? `${colors.border} ${colors.bg}` : 'border-slate-200 hover:border-slate-300'
      } ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setIsActive(!isActive)}
    >
      <div className="p-6">
        <h3 className={`text-lg font-semibold mb-3 ${isActive ? colors.text : 'text-slate-800'}`}>
          {card.title}
        </h3>
        <div 
          className={`text-sm leading-relaxed ${isActive ? 'text-slate-800' : 'text-slate-700'}`}
          dangerouslySetInnerHTML={{ __html: typeof card.content === 'string' ? card.content : card.content.front || '' }}
        />
        {isActive && card.metadata && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 pt-4 border-t border-slate-200"
          >
            {Object.entries(card.metadata).map(([key, value]) => (
              <div key={key} className="text-xs text-slate-600 mb-1">
                <strong className="capitalize">{key}:</strong> {value}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const UniversalCard: React.FC<UniversalCardProps> = (props) => {
  switch (props.card.type) {
    case 'flip':
      return <FlipCard {...props} />;
    case 'expand':
      return <ExpandableCard {...props} />;
    case 'interactive':
      return <InteractiveCard {...props} />;
    case 'media':
      return <BasicCard {...props} />;
    default:
      return <BasicCard {...props} />;
  }
};

export default UniversalCard; 