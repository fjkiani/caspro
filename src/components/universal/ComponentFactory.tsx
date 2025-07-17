'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ContentSection, 
  IntroductionData, 
  CardGridData, 
  ProcessStepsData, 
  ComparisonData, 
  TimelineData, 
  StatisticsData, 
  QuizData, 
  SummaryData 
} from '@/types/universal-content';

// Import all section components
import IntroductionSection from './organisms/IntroductionSection';
import CardGrid from './molecules/CardGrid';
import ProcessSteps from './molecules/ProcessSteps';
import {
  ComparisonSection,
  TimelineSection,
  TabbedSection,
  QuizSection,
  SummarySection,
  VisualizationSection,
  CaseStudySection,
  InsightsSection,
  StatisticsSection,
  MechanismsSection,
  ClinicalRelevanceSection
} from './organisms';

interface ComponentFactoryProps {
  section: ContentSection;
  index?: number;
}

const ComponentFactory: React.FC<ComponentFactoryProps> = ({ section, index = 0 }) => {
  // Animation configuration
  const getAnimation = () => {
    if (!section.animation) {
      return {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: index * 0.1 }
      };
    }

    const { type, delay = 0, duration = 0.3, stagger = 0.1 } = section.animation;
    const baseDelay = delay + (index * stagger);

    switch (type) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: baseDelay, duration }
        };
      case 'slide':
        return {
          initial: { opacity: 0, x: -50 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: baseDelay, duration }
        };
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { delay: baseDelay, duration }
        };
      case 'flip':
        return {
          initial: { opacity: 0, rotateY: -90 },
          animate: { opacity: 1, rotateY: 0 },
          transition: { delay: baseDelay, duration }
        };
      case 'cascade':
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: baseDelay, duration, ease: 'easeOut' }
        };
      default:
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: baseDelay, duration }
        };
    }
  };

  // Conditional rendering
  const shouldRender = () => {
    if (!section.conditional) return true;
    
    // Simple condition evaluation - can be extended for complex logic
    const { condition, value } = section.conditional;
    
    // For now, just basic equality check
    // In the future, this could be extended to support complex expressions
    return true; // Placeholder for conditional logic
  };

  if (!shouldRender()) {
    return null;
  }

  // Component mapping
  const renderComponent = () => {
    switch (section.type) {
      case 'introduction':
        return <IntroductionSection data={section.data as IntroductionData} />;
      
      case 'cards':
        return <CardGrid data={section.data as CardGridData} />;
      
      case 'process':
        return <ProcessSteps data={section.data as ProcessStepsData} />;
      
      case 'comparison':
        return <ComparisonSection data={section.data as ComparisonData} />;
      
      case 'timeline':
        return <TimelineSection data={section.data as TimelineData} />;
      
      case 'tabs':
        return <TabbedSection data={section.data as any} />;
      
      case 'quiz':
        return <QuizSection data={section.data as QuizData} />;
      
      case 'summary':
        return <SummarySection data={section.data as SummaryData} />;
      
      case 'visualization':
        return <VisualizationSection data={section.data as any} />;
      
      case 'case_study':
        return <CaseStudySection data={section.data as any} />;
      
      case 'insights':
        return <InsightsSection data={section.data as any} />;
      
      case 'statistics':
        return <StatisticsSection data={section.data as StatisticsData} />;
      
      case 'mechanisms':
        return <MechanismsSection data={section.data as any} />;
      
      case 'clinical_relevance':
        return <ClinicalRelevanceSection data={section.data as any} />;
      
      default:
        console.warn(`Unknown section type: ${section.type}`);
        return (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              Unknown section type: <code className="bg-yellow-100 px-2 py-1 rounded">{section.type}</code>
            </p>
            <pre className="mt-2 text-xs text-yellow-700 overflow-auto">
              {JSON.stringify(section.data, null, 2)}
            </pre>
          </div>
        );
    }
  };

  const animation = getAnimation();

  return (
    <motion.div
      key={section.id}
      {...animation}
      className="w-full"
    >
      {renderComponent()}
    </motion.div>
  );
};

export default ComponentFactory; 