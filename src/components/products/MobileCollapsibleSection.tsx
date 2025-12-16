'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MobileCollapsibleSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  badge?: string | number;
  className?: string;
}

export default function MobileCollapsibleSection({ 
  id, 
  title, 
  children, 
  defaultExpanded = false,
  badge,
  className = ''
}: MobileCollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`mb-4 md:mb-0 ${className}`}>
      {/* Mobile: Collapsible Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full md:hidden flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors active:bg-slate-200"
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-800 text-left">{title}</span>
          {badge && (
            <span className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
              {badge}
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-slate-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
        )}
      </button>

      {/* Mobile: Collapsible Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden md:hidden"
          >
            <div className="p-4 bg-white border-x border-b border-slate-200 rounded-b-lg">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop: Always Visible */}
      <div className="hidden md:block">
        {children}
      </div>
    </div>
  );
}


