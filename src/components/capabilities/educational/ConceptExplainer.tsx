'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, ChevronRight } from 'lucide-react';
import { ConceptExplainerData } from '@/types/educational-capability';
import InteractiveCard from '@/components/learn/shared/InteractiveCard';

interface ConceptExplainerProps {
  data: ConceptExplainerData;
  className?: string;
}

export default function ConceptExplainer({ data, className = '' }: ConceptExplainerProps) {
  const [expandedConcepts, setExpandedConcepts] = useState<Set<string>>(new Set());

  const toggleConcept = (term: string) => {
    setExpandedConcepts(prev => {
      const next = new Set(prev);
      if (next.has(term)) {
        next.delete(term);
      } else {
        next.add(term);
      }
      return next;
    });
  };

  if (data.layout === 'grid' && data.interactive) {
    // Use InteractiveCard for grid layout with flip cards
    return (
      <section className={`py-16 px-4 md:px-8 bg-gradient-to-br from-slate-50 to-blue-50 ${className}`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Key Concepts Explained
              </h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.concepts.map((concept, index) => (
              <InteractiveCard
                key={concept.term}
                title={concept.term}
                frontContent={concept.definition}
                backContent={concept.example ? `Example: ${concept.example}` : concept.definition}
                type="flip"
                color="blue"
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (data.layout === 'accordion') {
    // Accordion layout
    return (
      <section className={`py-16 px-4 md:px-8 bg-gradient-to-br from-slate-50 to-blue-50 ${className}`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Key Concepts Explained
              </h2>
            </div>
          </motion.div>

          <div className="space-y-4">
            {data.concepts.map((concept, index) => {
              const isExpanded = expandedConcepts.has(concept.term);
              
              return (
                <motion.div
                  key={concept.term}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg border-2 border-slate-200 overflow-hidden"
                >
                  <button
                    onClick={() => data.interactive && toggleConcept(concept.term)}
                    className={`w-full p-6 flex items-center gap-4 text-left transition-colors ${
                      data.interactive ? 'hover:bg-slate-50 cursor-pointer' : ''
                    } ${isExpanded ? 'bg-blue-50' : ''}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-900 mb-1">
                        {concept.term}
                      </h3>
                      {!isExpanded && (
                        <p className="text-slate-600 text-sm line-clamp-2">
                          {concept.definition}
                        </p>
                      )}
                    </div>
                    {data.interactive && (
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      </motion.div>
                    )}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-slate-200">
                          <p className="text-slate-700 leading-relaxed mb-4">
                            {concept.definition}
                          </p>
                          {concept.example && (
                            <div className="bg-blue-50 rounded-lg p-4 mb-4">
                              <p className="text-sm font-semibold text-blue-900 mb-2">Example:</p>
                              <p className="text-blue-800">{concept.example}</p>
                            </div>
                          )}
                          {concept.related && concept.related.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              <span className="text-sm font-semibold text-slate-600">Related:</span>
                              {concept.related.map((related, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs"
                                >
                                  {related}
                                </span>
                              ))}
                            </div>
                          )}
                          {concept.visual && (
                            <div className="mt-4">
                              {concept.visual}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Timeline layout (fallback to accordion)
  return (
    <ConceptExplainer data={{ ...data, layout: 'accordion' }} className={className} />
  );
}

