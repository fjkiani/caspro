'use client';

import React, { useState, useEffect, useMemo, ElementType } from 'react';
import {
  ChevronDown, BarChart3, Gauge, Zap, Target, Layers, Brain, Database, Activity, Microscope, 
  Settings, Cpu, CheckCircle, Lightbulb, ArrowRight, AlertTriangle, Clock, Users, TrendingUp,
  Shield, Beaker, HelpCircle, Eye, Quote
} from 'lucide-react';
import { CoPilotDetailContent, GenomicUseCaseGridItem } from '@/data/coPilotDetails';
import KeyCapabilityDisplay from './KeyCapabilityDisplay';
import ValuePropositionItem from './ValuePropositionItem';
import { renderMarkdown } from '@/utils/markdownRenderer';
import { motion } from 'framer-motion';
import DemoRequestForm from './DemoRequestForm';
import { 
  TechnologyFoundationSection, 
  CoreCapabilitiesSection, 
  ProblemSolutionMatrix, 
  ValuePropositionSection 
} from './sections';
import InSilicoWorkflowSection from './sections/InSilicoWorkflowSection';

// Helper to get icon component by name
const iconComponents: { [key: string]: ElementType } = {
  Activity,
  Shield,
  Layers,
  Lightbulb,
  Beaker,
  Users,
  Brain,
  Database,
  Microscope,
  Settings,
  Cpu,
  AlertTriangle,
  Clock,
  TrendingUp,
  Target,
  CheckCircle,
  HelpCircle
};

const getIconComponent = (iconName: string): ElementType | null => {
  return iconComponents[iconName] || HelpCircle;
};

// Helper to parse problem string into title and description
const parseProblemString = (problem: string): { title: string; description: string } => {
  const colonIndex = problem.indexOf(':');
  if (colonIndex !== -1) {
    const title = problem.substring(0, colonIndex + 1).trim();
    const description = problem.substring(colonIndex + 1).trim();
    return { title, description };
  }
  return { title: problem.trim(), description: "" }; // Fallback if no colon
};

interface InteractiveContentAnalysisProps {
  content: CoPilotDetailContent;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function InteractiveContentAnalysis({ content }: InteractiveContentAnalysisProps) {
  const [activeCapabilityTab, setActiveCapabilityTab] = useState(0);
  const [activeProblemTab, setActiveProblemTab] = useState(0);
  const [activeValueTab, setActiveValueTab] = useState(0);
  const [activeTechFoundationPointIndex, setActiveTechFoundationPointIndex] = useState(0);
  const [animatedStats, setAnimatedStats] = useState(false);
  const [activeChallengeIndex, setActiveChallengeIndex] = useState<number>(0); // Default to 0 to show first challenge

  // Reset activeTechFoundationPointIndex if content changes to one without enough points
  useEffect(() => {
    if (!content.genomicUseCasesGrid || activeTechFoundationPointIndex >= content.genomicUseCasesGrid.length) {
      setActiveTechFoundationPointIndex(0);
    }
  }, [content, activeTechFoundationPointIndex]);

  // Reset activeChallengeIndex when problem tab changes or content problems change
  useEffect(() => {
    setActiveChallengeIndex(0);
  }, [activeProblemTab, content.coreProblemPoints]);

  // Dynamic analysis of content to generate stats and insights
  const contentAnalysis = useMemo(() => {
    const totalCapabilities = content.keyCapabilities.length;
    const totalProblems = content.coreProblemPoints?.length || 0;
    const totalStackPoints = content.buildsOnStackPoints?.length || 0;
    const totalValueProps = content.valuePropositionSections.reduce((sum, vp) => sum + vp.points.length, 0);
    
    const techTerms = [
      ...(content.buildsOnStackPoints || []).map(p => typeof p === 'string' ? p : ''), // Ensure points are strings for join
      ...content.keyCapabilities.map(cap => cap.technical)
    ].join(' ').toLowerCase();
    
    const autoDetectedTechnologies = [
      { term: 'ai', iconCompName: 'Brain', label: 'AI/ML', color: 'text-purple-400', present: techTerms.includes('ai') || techTerms.includes('machine learning') },
      { term: 'data', iconCompName: 'Database', label: 'Big Data', color: 'text-blue-400', present: techTerms.includes('data') || techTerms.includes('integration') },
      { term: 'real-time', iconCompName: 'Activity', label: 'Real-time', color: 'text-green-400', present: techTerms.includes('real') || techTerms.includes('time') },
      { term: 'genomic', iconCompName: 'Microscope', label: 'Genomics', color: 'text-pink-400', present: techTerms.includes('genomic') || techTerms.includes('variant') },
      { term: 'model', iconCompName: 'Settings', label: 'Modeling', color: 'text-orange-400', present: techTerms.includes('model') || techTerms.includes('predict') },
      { term: 'automation', iconCompName: 'Cpu', label: 'Automation', color: 'text-cyan-400', present: techTerms.includes('automat') || techTerms.includes('assist') }
    ].filter(tech => tech.present)
     .map(tech => ({ icon: getIconComponent(tech.iconCompName) as ElementType, label: tech.label, color: tech.color, term: tech.term }))
     .filter(tech => tech.icon);

    // Dynamic metrics based on content
    const metrics = [
      {
        value: `${totalCapabilities}`,
        label: totalCapabilities === 1 ? 'Core Capability' : 'Core Capabilities',
        icon: Zap,
        color: 'text-primary'
      },
      {
        value: `${Math.min(totalProblems * 20, 95)}%`,
        label: 'Challenge Coverage',
        icon: Target,
        color: 'text-green-400'
      },
      {
        value: `${totalStackPoints}+`,
        label: 'Tech Integrations',
        icon: Layers,
        color: 'text-blue-400'
      }
    ];

    // Complexity scoring for visual indicators
    const complexityScore = Math.min(
      (content.vision.length / 100) +
      (totalCapabilities * 0.5) +
      (totalProblems * 0.3) +
      (totalStackPoints * 0.2),
      10
    );

    return {
      totalCapabilities,
      totalProblems,
      totalStackPoints,
      totalValueProps,
      detectedTechnologies: autoDetectedTechnologies,
      metrics,
      complexityScore: Math.round(complexityScore * 10) / 10
    };
  }, [content]);

  // Animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Dynamic section toggling
  // const toggleSection = (sectionId: string) => {
  //   const newExpanded = new Set(expandedSections);
  //   if (newExpanded.has(sectionId)) {
  //     newExpanded.delete(sectionId);
  //   } else {
  //     newExpanded.add(sectionId);
  //   }
  //   setExpandedSections(newExpanded);
  // };

  // Dynamic problem categorization by severity
  const problemCategories = useMemo(() => {
    const problems = content.coreProblemPoints || [];
    const capabilities = content.keyCapabilities;
    
    const categorizedProblems = problems.map((problemText, index) => {
      const { title, description } = parseProblemString(problemText);
      return {
        id: `problem-${index}`,
        fullText: problemText,
        title,
        description,
        relatedCapability: capabilities[index % capabilities.length] || null,
        severity: problemText.length > 200 ? 'high' : problemText.length > 100 ? 'medium' : 'low'
      };
    });

    // Group by severity
    const categories = [
      {
        id: 'high',
        label: 'Critical Issues',
        icon: AlertTriangle,
        color: 'text-red-400',
        problems: categorizedProblems.filter(p => p.severity === 'high')
      },
      {
        id: 'medium', 
        label: 'Process Gaps',
        icon: Clock,
        color: 'text-yellow-400',
        problems: categorizedProblems.filter(p => p.severity === 'medium')
      },
      {
        id: 'low',
        label: 'Efficiency Boosts',
        icon: TrendingUp,
        color: 'text-orange-400',
        problems: categorizedProblems.filter(p => p.severity === 'low')
      }
    ].filter(cat => cat.problems.length > 0);

    return categories.length > 0 ? categories : [{
      id: 'all',
      label: 'All Challenges',
      icon: Target,
      color: 'text-primary',
      problems: categorizedProblems
    }];
  }, [content]);

  const currentTechFoundationDescriptionPoint = content.buildsOnStackPoints?.[activeTechFoundationPointIndex] || null;
  const currentProblemCategory = problemCategories[activeProblemTab];
  const currentChallenge = currentProblemCategory?.problems[activeChallengeIndex];

  return (
    <>
      {/* Vision Section */}
      {/* {content.vision && (
        <motion.div 
          variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          className="my-12"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 shadow-xl max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10 border border-primary/30 mr-4">
                <Eye size={24} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Vision</h2>
            </div>
            <div className="text-slate-300 leading-relaxed" dangerouslySetInnerHTML={renderMarkdown(content.vision)} />
          </div>
        </motion.div>
      )} */}
    
      {/* Dynamic Problem-Solution Matrix */}
      {/* This is the section causing the large empty space. I am removing it. */}
      {/* 
      {problemCategories.length > 0 && currentProblemCategory && currentProblemCategory.problems.length > 0 && (
        <motion.div 
          variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          className="mb-16"
        >
        </motion.div>
      )}
      */}

      {/* Technology Foundation Section */}
      {content.genomicUseCasesGrid && content.genomicUseCasesGrid.length > 0 && content.buildsOnStackPoints && content.buildsOnStackPoints.length > 0 && (
        <TechnologyFoundationSection 
          genomicUseCasesGrid={content.genomicUseCasesGrid}
          buildsOnStackPoints={content.buildsOnStackPoints}
          buildsOnStackIntro={content.buildsOnStackIntro}
        />
      )}

      {/* Core Capabilities Section */}
      {content.keyCapabilities.length > 0 && (
        <CoreCapabilitiesSection 
          keyCapabilities={content.keyCapabilities}
          totalCapabilities={contentAnalysis.totalCapabilities}
        />
      )}



      {/* Value Proposition Section */}
      {content.valuePropositionSections.length > 0 && (
        <ValuePropositionSection 
          valuePropositionSections={content.valuePropositionSections}
        />
      )}

      {/* The 7-Step Kill Chain */}
      {content.inSilicoWorkflow && (
        <motion.div 
          variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          className="my-16"
        >
          <InSilicoWorkflowSection workflow={content.inSilicoWorkflow} />
        </motion.div>
      )}

      {/* Concluding Thoughts */}
      <motion.div 
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
        className="my-16"
      >
       
      </motion.div>
      

      {/* Call to Action Form */}
      <div className="my-20">
        <DemoRequestForm />
      </div>
    </>
  );
}

// export default InteractiveContentAnalysis;
 