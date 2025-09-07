'use client';

import React, { useState, useEffect, useMemo, ElementType } from 'react';
import {
  BarChart3, Gauge, Zap, Target, Layers, Brain, Database, Activity, Microscope, 
  Settings, Cpu, CheckCircle, Lightbulb, ArrowRight, AlertTriangle, Clock, Users, TrendingUp,
  Shield, Beaker, HelpCircle, Eye, Quote
} from 'lucide-react';
import { CoPilotDetailContent } from '@/data/coPilotDetails';
import { motion } from 'framer-motion';
import DemoRequestForm from './DemoRequestForm';
import { 
  TechnologyFoundationSection, 
  CoreCapabilitiesSection, 
  ProblemSolutionMatrix, 
  ValuePropositionSection 
} from './sections';

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
  const [animatedStats, setAnimatedStats] = useState(false);

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


  return (
    <>
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

      {/* Problem Solution Matrix */}
      <ProblemSolutionMatrix 
        coreProblemPoints={content.coreProblemPoints}
        keyCapabilities={content.keyCapabilities}
      />

      {/* Value Proposition Section */}
      {content.valuePropositionSections.length > 0 && (
        <ValuePropositionSection 
          valuePropositionSections={content.valuePropositionSections}
        />
      )}

      {/* Call to Action Form */}
      <div className="my-20">
        <DemoRequestForm />
      </div>
    </>
  );
} 

// export default InteractiveContentAnalysis;
 