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
      {content.vision && (
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
      )}
    
      {/* Dynamic Problem-Solution Matrix */}
      {problemCategories.length > 0 && currentProblemCategory && currentProblemCategory.problems.length > 0 && (
        <motion.div 
          variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Challenge → Solution Matrix</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 mx-auto mb-4"></div>
            <p className="text-slate-300 max-w-2xl mx-auto">
              {content.coreProblemIntro || "Addressing key challenges with targeted AI solutions"}
            </p>
          </div>
          
          {/* Problem Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {problemCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveProblemTab(index);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center ${
                  activeProblemTab === index
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <category.icon size={16} className={`mr-2 ${category.color || 'text-primary'}`} />
                {category.label}
                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-white/20">
                  {category.problems.length}
                </span>
              </button>
            ))}
          </div>

          {/* Problem Titles List for the active category */} 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            {currentProblemCategory.problems.map((problem, index) => (
              <div
                key={problem.id}
                onClick={() => setActiveChallengeIndex(index)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeChallengeIndex === index
                    ? 'bg-slate-700 shadow-md ring-2 ring-primary'
                    : 'bg-slate-800 hover:bg-slate-700/70'
                }`}
              >
                <h5 className={`font-semibold text-sm ${activeChallengeIndex === index ? 'text-primary' : 'text-slate-100'}`}>
                  {problem.title}
                </h5>
              </div>
            ))}
          </div>

          {/* Selected Challenge and Solution Display */}
          {currentChallenge && (
            <div className={`grid md:grid-cols-2 gap-6 items-start`}>
              {/* Problem Details */}
              <div className={`bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-6 h-full`}>
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 shrink-0 ${
                    currentChallenge.severity === 'high' ? 'bg-red-500/20' : 
                    currentChallenge.severity === 'medium' ? 'bg-yellow-500/20' : 'bg-orange-500/20'
                  }`}>
                    <Target size={20} className={
                      currentChallenge.severity === 'high' ? 'text-red-400' : 
                      currentChallenge.severity === 'medium' ? 'text-yellow-400' : 'text-orange-400'
                    } />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-red-300/80">Common Problem</p>
                    <h4 className="font-semibold text-lg text-red-200 leading-tight" dangerouslySetInnerHTML={renderMarkdown(currentChallenge.title)} />
                  </div>
                </div>
                {/* Show full description by default */} 
                {currentChallenge.description ? (
                  <div className="text-slate-200 text-sm leading-relaxed prose prose-sm prose-invert max-w-none mt-2" dangerouslySetInnerHTML={renderMarkdown(currentChallenge.description)} />
                ) : currentChallenge.fullText && (
                  <div className="text-slate-200 text-sm leading-relaxed prose prose-sm prose-invert max-w-none mt-2" dangerouslySetInnerHTML={renderMarkdown(currentChallenge.fullText)} />
                )}
              </div>

              {/* Solution Details */}
              <div>
                {currentChallenge.relatedCapability ? (
                  <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6 h-full">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mr-4 shrink-0">
                        <CheckCircle size={20} className="text-green-400" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-green-300/80">Our Solution</p>
                        <h4 className="font-semibold text-lg text-green-200 leading-tight">{currentChallenge.relatedCapability.title}</h4>
                      </div>
                    </div>
                    <div className="text-slate-300 text-sm leading-relaxed prose prose-sm prose-invert max-w-none" dangerouslySetInnerHTML={renderMarkdown(currentChallenge.relatedCapability.business)} />
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/20 rounded-xl p-6 h-full">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <Lightbulb size={20} className="text-primary" />
                      </div>
                      <h4 className="font-semibold text-lg text-primary">Our Approach</h4>
                    </div>
                    <p className="text-slate-200 text-sm leading-relaxed prose prose-sm prose-invert max-w-none">
                      Advanced AI integration and intelligent automation address this challenge through our comprehensive platform capabilities, tailored to resolve the specific issues highlighted.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Technology Foundation - Standardized for all co-pilots */}
      {content.genomicUseCasesGrid && content.genomicUseCasesGrid.length > 0 && content.buildsOnStackPoints && content.buildsOnStackPoints.length > 0 && (
        <motion.div 
          variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Technology Foundation</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-6"></div>
            <p className="text-slate-300 max-w-2xl mx-auto">
              {content.buildsOnStackIntro || "Core technological capabilities enabling advanced genomic insights."}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-8 mb-10"> 
            {content.genomicUseCasesGrid.map((item, index) => {
                const IconComp = getIconComponent(item.iconName);
                const isActive = index === activeTechFoundationPointIndex;
                return IconComp ? (
                  <div 
                    key={index} 
                    className={`text-center group transition-all duration-300 p-4 rounded-xl cursor-pointer ${isActive ? 'bg-slate-700 shadow-lg scale-105' : 'bg-slate-800/70 hover:bg-slate-700/80'}`}
                    onClick={() => setActiveTechFoundationPointIndex(index)}
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-colors border ${isActive ? 'border-primary/70' : 'border-slate-700 group-hover:border-slate-600'} ${isActive ? 'bg-primary/10' : 'group-hover:bg-slate-700'}`}>
                      <IconComp size={28} className={`${item.color} ${isActive ? 'text-primary' : item.color}`} />
                    </div>
                    <div className={`font-medium text-sm px-1 ${isActive ? 'text-primary' : 'text-slate-300'}`}>{item.label}</div>
                  </div>
                ) : null;
              })}
          </div>

          <div className="bg-gradient-to-t from-slate-800/80 to-slate-800/50 rounded-xl p-8 md:p-12 border border-slate-700 text-center">
            {currentTechFoundationDescriptionPoint ? (
              <div className="flex flex-col items-center">
                <CheckCircle size={24} className="text-blue-400 mb-4" />
                <div 
                  className="text-slate-200 text-xl text-center leading-relaxed prose prose-xl prose-invert max-w-3xl mx-auto prose-strong:text-white prose-strong:font-semibold" 
                  dangerouslySetInnerHTML={renderMarkdown(currentTechFoundationDescriptionPoint)}>
                </div>
              </div>
            ) : (
              <p className="text-slate-400 text-center text-lg py-8">Select a technology above to see details.</p>
            )}
          </div>
        </motion.div>
      )}

      {/* Dynamic Capabilities Showcase */}
      {content.keyCapabilities.length > 0 && (
        <motion.div 
          variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Core Capabilities</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto mb-6"></div>
            <p className="text-slate-300 max-w-2xl mx-auto">
              {contentAnalysis.totalCapabilities} advanced AI-powered capabilities designed to transform your workflow
            </p>
          </div>
          
          {/* Capability Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {content.keyCapabilities.map((cap, index) => (
              <button
                key={index}
                onClick={() => setActiveCapabilityTab(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeCapabilityTab === index
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cap.title.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Active Capability Display */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-2xl p-8 border border-slate-600">
            <KeyCapabilityDisplay capability={content.keyCapabilities[activeCapabilityTab]} />
          </div>
        </motion.div>
      )}

      {/* Dynamic Value Proposition */}
      {content.valuePropositionSections.length > 0 && (
        <motion.div 
          variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Value for Every Team</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-6"></div>
            <p className="text-slate-300 max-w-2xl mx-auto">
              {contentAnalysis.totalValueProps} benefits across {content.valuePropositionSections.length} stakeholder groups
            </p>
          </div>
          
          {/* Value Proposition Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {content.valuePropositionSections.map((vp, index) => (
              <button
                key={index}
                onClick={() => setActiveValueTab(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center ${
                  activeValueTab === index
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Users size={16} className="mr-2" />
                {vp.audience}
                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-white/20">
                  {vp.points.length}
                </span>
              </button>
            ))}
          </div>

          {/* Active Value Proposition Display */}
          <div className="relative group">
            <ValuePropositionItem valueProposition={content.valuePropositionSections[activeValueTab]} />
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              {activeValueTab + 1}
            </div>
          </div>
        </motion.div>
      )}

      {/* Concluding Thoughts */}
      <motion.div 
        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
        className="my-16"
      >
        <div className={`bg-slate-800/60 p-8 md:p-10 rounded-2xl shadow-xl border border-slate-700 max-w-4xl mx-auto`}>
          <div className="flex justify-center mb-5">
            <Quote className="w-10 h-10 text-sky-400/50" />
          </div>
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Concluding Thoughts
          </h2>
          <div 
            className="prose prose-lg prose-invert text-center max-w-none mx-auto text-slate-300"
            dangerouslySetInnerHTML={renderMarkdown(content.conclusion)}
          />
        </div>
      </motion.div>
      

      {/* Call to Action Form */}
      <div className="my-20">
        <DemoRequestForm />
      </div>
    </>
  );
} 