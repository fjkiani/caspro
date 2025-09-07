'use client';

import React, { useState, useEffect, useMemo, ElementType } from 'react';
import { AlertTriangle, Clock, TrendingUp, Target } from 'lucide-react';
import { KeyCapability } from '@/data/coPilotDetails';
import { motion } from 'framer-motion';

interface ProblemSolutionMatrixProps {
  coreProblemPoints?: string[];
  keyCapabilities: KeyCapability[];
}

// Helper to parse problem string into title and description
const parseProblemString = (problem: string): { title: string; description: string } => {
  const colonIndex = problem.indexOf(':');
  if (colonIndex !== -1) {
    const title = problem.substring(0, colonIndex + 1).trim();
    const description = problem.substring(colonIndex + 1).trim();
    return { title, description };
  }
  return { title: problem.trim(), description: "" };
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function ProblemSolutionMatrix({ 
  coreProblemPoints, 
  keyCapabilities 
}: ProblemSolutionMatrixProps) {
  const [activeProblemTab, setActiveProblemTab] = useState(0);
  const [activeChallengeIndex, setActiveChallengeIndex] = useState<number>(0);

  // Reset activeChallengeIndex when problem tab changes or content problems change
  useEffect(() => {
    setActiveChallengeIndex(0);
  }, [activeProblemTab, coreProblemPoints]);

  // Dynamic problem categorization by severity
  const problemCategories = useMemo(() => {
    const problems = coreProblemPoints || [];
    
    const categorizedProblems = problems.map((problemText, index) => {
      const { title, description } = parseProblemString(problemText);
      return {
        id: `problem-${index}`,
        fullText: problemText,
        title,
        description,
        relatedCapability: keyCapabilities[index % keyCapabilities.length] || null,
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
  }, [coreProblemPoints, keyCapabilities]);

  const currentProblemCategory = problemCategories[activeProblemTab];
  const currentChallenge = currentProblemCategory?.problems[activeChallengeIndex];

  if (!problemCategories.length || !currentProblemCategory || !currentProblemCategory.problems.length) {
    return null;
  }

  return (
    <motion.div 
      variants={sectionVariants} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.2 }}
      className="mb-16"
    >
      {/* Problem Categories Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {problemCategories.map((category, index) => {
          const IconComp = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveProblemTab(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeProblemTab === index
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <IconComp size={16} className={category.color} />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Challenge Navigation */}
      {currentProblemCategory.problems.length > 1 && (
        <div className="flex justify-center gap-2 mb-6">
          {currentProblemCategory.problems.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveChallengeIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                activeChallengeIndex === index
                  ? 'bg-primary'
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      )}

      {/* Selected Challenge Display */}
      {currentChallenge && (
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-2xl p-8 border border-slate-600">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">{currentChallenge.title}</h3>
            <p className="text-slate-300">{currentChallenge.description}</p>
          </div>
          
          {currentChallenge.relatedCapability && (
            <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600">
              <h4 className="text-lg font-semibold text-primary mb-3">Related Capability</h4>
              <p className="text-slate-200">{currentChallenge.relatedCapability.title}</p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
