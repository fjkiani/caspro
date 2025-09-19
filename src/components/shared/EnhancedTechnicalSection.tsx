'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, BookOpen, ToggleLeft, ToggleRight } from 'lucide-react';
// import TechnicalConceptSimplifier from './TechnicalConceptSimplifier';
// import ConceptExplainer from './ConceptExplainer';
// import { getConceptsByCategory, technicalGlossary } from '@/data/concepts/technical-glossary';

interface EnhancedTechnicalSectionProps {
  title: string;
  children: React.ReactNode;
  showGlossary?: boolean;
  showSimplificationToggle?: boolean;
  className?: string;
}

const EnhancedTechnicalSection: React.FC<EnhancedTechnicalSectionProps> = ({
  title,
  children,
  showGlossary = true,
  showSimplificationToggle = true,
  className = ''
}) => {
  const [simplificationEnabled, setSimplificationEnabled] = useState(true);
  const [showQuickGlossary, setShowQuickGlossary] = useState(false);

  // const quickGlossaryTerms = technicalGlossary.slice(0, 6); // Show first 6 most important terms

  return (
    <div className={`relative ${className}`}>
      {/* Controls */}
      {(showSimplificationToggle || showGlossary) && (
        <div className="flex items-center justify-between mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-center gap-4">
            <h3 className="font-semibold text-slate-800">{title}</h3>
            
            {showSimplificationToggle && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Simple explanations:</span>
                <button
                  onClick={() => setSimplificationEnabled(!simplificationEnabled)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {simplificationEnabled ? (
                    <ToggleRight className="w-5 h-5" />
                  ) : (
                    <ToggleLeft className="w-5 h-5" />
                  )}
                  <span className="text-sm">{simplificationEnabled ? 'On' : 'Off'}</span>
                </button>
              </div>
            )}
          </div>
          
          {showGlossary && (
            <button
              onClick={() => setShowQuickGlossary(!showQuickGlossary)}
              className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
            >
              <BookOpen className="w-4 h-4" />
              Quick Glossary
            </button>
          )}
        </div>
      )}

      {/* Quick Glossary */}
      {showQuickGlossary && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <h4 className="text-lg font-semibold text-slate-800">Key Terms in This Section</h4>
            </div>
            
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickGlossaryTerms.map((concept, index) => (
                <motion.div
                  key={concept.term}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-slate-50 rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-slate-800">{concept.term}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      concept.category === 'ai' ? 'bg-blue-100 text-blue-700' :
                      concept.category === 'genetics' ? 'bg-green-100 text-green-700' :
                      concept.category === 'business' ? 'bg-purple-100 text-purple-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {concept.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{concept.simpleDefinition}</p>
                </motion.div>
              ))}
            </div> */}
          </div>
        </motion.div>
      )}

      {/* Enhanced Content */}
      <div className="prose prose-slate max-w-none">
        {/* {simplificationEnabled ? (
          <TechnicalConceptSimplifier>
            {typeof children === 'string' ? children : ''}
          </TechnicalConceptSimplifier>
        ) : (
          children
        )} */}
        {children}
      </div>

      {/* Help Text */}
      {simplificationEnabled && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Interactive Help</span>
          </div>
          <p className="text-sm text-blue-700">
            Click on any <span className="underline decoration-dotted">underlined technical terms</span> to see simple explanations, analogies, and examples.
          </p>
        </div>
      )}
    </div>
  );
};

export default EnhancedTechnicalSection;

