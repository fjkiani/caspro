'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, User, Tag, ChevronLeft, ChevronRight, BookOpen, CheckCircle } from 'lucide-react';
import ComponentFactory from './ComponentFactory';
import SectionHeader from '../learn/shared/SectionHeader';
import { UniversalContent } from '@/types/universal-content';

interface UniversalContentRendererProps {
  content: UniversalContent;
  showProgress?: boolean;
  showMetadata?: boolean;
  onSectionComplete?: (sectionId: string) => void;
  onContentComplete?: () => void;
  className?: string;
}

const ContentMetadata: React.FC<{ content: UniversalContent }> = ({ content }) => {
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
        {content.meta.estimatedTime && (
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>{content.meta.estimatedTime}</span>
          </div>
        )}
        
        {content.meta.difficulty && (
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(content.meta.difficulty)}`}>
              {content.meta.difficulty}
            </span>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <BookOpen className="w-4 h-4" />
          <span>{content.sections.length} sections</span>
        </div>

        {content.meta.tags && content.meta.tags.length > 0 && (
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4" />
            <div className="flex flex-wrap gap-1">
              {content.meta.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const SectionNavigation: React.FC<{
  sections: any[];
  currentSection: number;
  onNavigate: (index: number) => void;
  completedSections: Set<string>;
}> = ({ sections, currentSection, onNavigate, completedSections }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
      <h4 className="font-semibold text-slate-900 mb-3">Content Navigation</h4>
      <div className="space-y-2">
        {sections.map((section, index) => {
          const isActive = currentSection === index;
          const isCompleted = completedSections.has(section.id);
          
          return (
            <button
              key={section.id}
              onClick={() => onNavigate(index)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                isActive
                  ? 'bg-blue-50 border-blue-200 border'
                  : 'hover:bg-slate-50 border border-transparent'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                isCompleted
                  ? 'bg-green-500 text-white'
                  : isActive
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="flex-1">
                <div className={`font-medium ${isActive ? 'text-blue-900' : 'text-slate-900'}`}>
                  Section {index + 1}
                </div>
                <div className={`text-sm ${isActive ? 'text-blue-700' : 'text-slate-600'}`}>
                  {section.type.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const UniversalContentRenderer: React.FC<UniversalContentRendererProps> = ({
  content,
  showProgress = true,
  showMetadata = true,
  onSectionComplete,
  onContentComplete,
  className = ''
}) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [isNavigationMode, setIsNavigationMode] = useState(false);

  // Auto-scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSection]);

  // Check if all sections are completed
  useEffect(() => {
    if (completedSections.size === content.sections.length && onContentComplete) {
      onContentComplete();
    }
  }, [completedSections.size, content.sections.length, onContentComplete]);

  const handleSectionComplete = (sectionId: string) => {
    setCompletedSections(prev => new Set([...prev, sectionId]));
    if (onSectionComplete) {
      onSectionComplete(sectionId);
    }
  };

  const navigateToSection = (index: number) => {
    if (index >= 0 && index < content.sections.length) {
      setCurrentSection(index);
      setIsNavigationMode(false);
    }
  };

  const nextSection = () => {
    if (currentSection < content.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const previousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const progressPercentage = (completedSections.size / content.sections.length) * 100;

  return (
    <div className={`max-w-7xl mx-auto ${className}`}>
      {/* Header */}
      <SectionHeader
        title={content.meta.title}
        subtitle={content.meta.subtitle}
        color={content.meta.color}
      />

      {/* Metadata */}
      {showMetadata && <ContentMetadata content={content} />}

      {/* Progress Tracker */}
      {showProgress && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">
                Progress: {currentSection + 1} of {content.sections.length}
              </span>
              <span className="text-sm text-slate-500">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation Toggle */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsNavigationMode(!isNavigationMode)}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-200 text-sm font-medium text-slate-700"
        >
          {isNavigationMode ? 'Hide' : 'Show'} Navigation
        </button>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={previousSection}
            disabled={currentSection === 0}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-slate-600">
            {currentSection + 1} / {content.sections.length}
          </span>
          <button
            onClick={nextSection}
            disabled={currentSection === content.sections.length - 1}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Side Navigation */}
        <AnimatePresence>
          {isNavigationMode && (
            <motion.div
              className="w-80 flex-shrink-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="sticky top-6">
                <SectionNavigation
                  sections={content.sections}
                  currentSection={currentSection}
                  onNavigate={navigateToSection}
                  completedSections={completedSections}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ComponentFactory
                section={content.sections[currentSection]}
                index={0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Section Navigation */}
          <motion.div
            className="flex justify-between items-center mt-12 pt-6 border-t border-slate-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={previousSection}
              disabled={currentSection === 0}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all duration-200 font-medium text-slate-700"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => handleSectionComplete(content.sections[currentSection].id)}
              disabled={completedSections.has(content.sections[currentSection].id)}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-all duration-200 font-medium flex items-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>
                {completedSections.has(content.sections[currentSection].id) 
                  ? 'Completed' 
                  : 'Mark Complete'
                }
              </span>
            </button>

            <button
              onClick={nextSection}
              disabled={currentSection === content.sections.length - 1}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 font-medium"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UniversalContentRenderer; 