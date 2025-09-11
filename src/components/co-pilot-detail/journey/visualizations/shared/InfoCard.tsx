'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

interface InfoCardProps {
  variant: 'old' | 'new';
  title: string;
  subtitle: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ variant, title, subtitle }) => {
  const isOldWay = variant === 'old';
  
  // Enhanced text processing with statistics highlighting
  const processText = (text: string, isProblem: boolean) => {
    const hasStats = /\d+%|\d+\+|\d+-\d+|\$\d+\.?\d*[MK]?|hours|days|weeks|months|95\.7%|60-65%|1M|AUROC|vector|AI|real-time|compresses/.test(text);
    const isAlarming = /40%|50\+|2-3|weeks|days|hours|failures|missed|delayed|wasted/.test(text);
    const isImpressive = /95\.7%|60-65%|1M|AUROC|vector|AI|real-time|compresses/.test(text);
    
    return {
      hasStats,
      isAlarming: isProblem && isAlarming,
      isImpressive: !isProblem && isImpressive,
      processedText: text.split(/(\d+%|\d+\+|\d+-\d+|\$\d+\.?\d*[MK]?|hours|days|weeks|months|95\.7%|60-65%|1M|AUROC|vector|AI|real-time|compresses)/).map((part, partIdx) => {
        if (/\d+%|\d+\+|\d+-\d+|\$\d+\.?\d*[MK]?|hours|days|weeks|months|95\.7%|60-65%|1M|AUROC|vector|AI|real-time|compresses/.test(part)) {
          return (
            <span key={partIdx} className={`font-bold px-2 py-1 rounded ${
              isProblem 
                ? 'text-red-600 bg-red-100' 
                : 'text-green-600 bg-green-100'
            }`}>
              {part}
            </span>
          );
        }
        return part;
      })
    };
  };
  
  const titleData = processText(title, isOldWay);
  const subtitleData = processText(subtitle, isOldWay);
  
  return (
    <motion.div 
      className={`mt-4 p-4 rounded-lg border-2 shadow-md ${
        isOldWay 
          ? 'bg-gradient-to-br from-red-50 via-red-100/50 to-red-50 border-red-200' 
          : 'bg-gradient-to-br from-green-50 via-green-100/50 to-green-50 border-green-200'
      }`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Compact header with icon */}
      <div className="flex items-center space-x-2 mb-3">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
          isOldWay ? 'bg-red-100' : 'bg-green-100'
        }`}>
          {isOldWay ? (
            <AlertTriangle className="w-4 h-4 text-red-600" />
          ) : (
            <CheckCircle className="w-4 h-4 text-green-600" />
          )}
        </div>
        <h4 className={`text-sm font-bold ${
          isOldWay ? 'text-red-700' : 'text-green-700'
        }`}>
          {isOldWay ? 'Critical Impact' : 'AI Solution'}
        </h4>
      </div>
      
      {/* Compact title with statistics highlighting */}
      <div className={`${
        titleData.hasStats ? 'bg-white/60 p-2 rounded border border-slate-200' : ''
      }`}>
        <p className={`text-sm font-semibold leading-relaxed ${
          isOldWay ? 'text-slate-700' : 'text-slate-700'
        }`}>
          {titleData.processedText}
        </p>
      </div>
      
      {/* Compact subtitle with statistics highlighting */}
      {subtitle && (
        <div className={`mt-2 ${
          subtitleData.hasStats ? 'bg-white/60 p-2 rounded border border-slate-200' : ''
        }`}>
          <p className={`text-sm leading-relaxed ${
            isOldWay ? 'text-slate-600' : 'text-slate-600'
          }`}>
            {subtitleData.processedText}
          </p>
        </div>
      )}
      
      {/* Pulsing indicator for alarming/impressive stats */}
      {(titleData.isAlarming || titleData.isImpressive || subtitleData.isAlarming || subtitleData.isImpressive) && (
        <motion.div 
          className={`w-1.5 h-1.5 rounded-full mt-2 ${
            isOldWay ? 'bg-red-500' : 'bg-green-500'
          }`}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

export default InfoCard;
