'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Info, AlertCircle, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { IntroductionData, HighlightBox, MediaContent } from '@/types/universal-content';

interface IntroductionSectionProps {
  data: IntroductionData;
  className?: string;
}

const HighlightBoxComponent: React.FC<{ highlight: HighlightBox; index: number }> = ({ highlight, index }) => {
  const getHighlightStyles = (type: string) => {
    switch (type) {
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          icon: Info
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-800',
          icon: AlertCircle
        };
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          icon: CheckCircle
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: XCircle
        };
      case 'tip':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'text-purple-800',
          icon: Lightbulb
        };
      default:
        return {
          bg: 'bg-slate-50',
          border: 'border-slate-200',
          text: 'text-slate-800',
          icon: Info
        };
    }
  };

  const styles = getHighlightStyles(highlight.type);
  const Icon = styles.icon;

  return (
    <motion.div
      className={`${styles.bg} ${styles.border} border-l-4 p-4 rounded-r-lg`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-start space-x-3">
        <Icon className={`w-5 h-5 ${styles.text} mt-0.5 flex-shrink-0`} />
        <div>
          {highlight.title && (
            <h4 className={`font-semibold ${styles.text} mb-1`}>
              {highlight.title}
            </h4>
          )}
          <div 
            className={`${styles.text} text-sm leading-relaxed`}
            dangerouslySetInnerHTML={{ __html: highlight.content }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const MediaRenderer: React.FC<{ media: MediaContent }> = ({ media }) => {
  switch (media.type) {
    case 'image':
      return (
        <div className="relative">
          <img 
            src={media.src} 
            alt={media.alt || ''} 
            className="w-full h-auto rounded-lg shadow-lg"
          />
          {media.caption && (
            <p className="text-sm text-slate-600 mt-2 text-center italic">
              {media.caption}
            </p>
          )}
        </div>
      );
    case 'video':
      return (
        <div className="relative">
          <video 
            src={media.src} 
            controls={media.controls !== false}
            className="w-full h-auto rounded-lg shadow-lg"
          />
          {media.caption && (
            <p className="text-sm text-slate-600 mt-2 text-center italic">
              {media.caption}
            </p>
          )}
        </div>
      );
    case '3d_model':
      return (
        <div className="bg-slate-100 rounded-lg p-8 text-center">
          <p className="text-slate-600">3D Model: {media.alt || 'Interactive Model'}</p>
          <p className="text-xs text-slate-500 mt-1">Source: {media.src}</p>
          {media.caption && (
            <p className="text-sm text-slate-600 mt-2 italic">
              {media.caption}
            </p>
          )}
        </div>
      );
    case 'audio':
      return (
        <div className="bg-slate-50 rounded-lg p-4">
          <audio 
            src={media.src} 
            controls={media.controls !== false}
            className="w-full"
          />
          {media.caption && (
            <p className="text-sm text-slate-600 mt-2 text-center italic">
              {media.caption}
            </p>
          )}
        </div>
      );
    default:
      return null;
  }
};

const IntroductionSection: React.FC<IntroductionSectionProps> = ({ data, className = '' }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Content */}
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div 
          className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </motion.div>

      {/* Media Content */}
      {data.media && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <MediaRenderer media={data.media} />
        </motion.div>
      )}

      {/* Key Points */}
      {data.keyPoints && data.keyPoints.length > 0 && (
        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-slate-900 mb-6">Key Points</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.keyPoints.map((point, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-slate-700 leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Highlight Boxes */}
      {data.highlights && data.highlights.length > 0 && (
        <div className="space-y-4">
          {data.highlights.map((highlight, index) => (
            <HighlightBoxComponent 
              key={index} 
              highlight={highlight} 
              index={index} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default IntroductionSection; 