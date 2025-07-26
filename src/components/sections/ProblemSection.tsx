'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, CheckCircle, FastForward } from 'lucide-react';
import React, { useRef, Suspense } from 'react';
import { PROBLEM_CONFIG } from '@/data/problem-section-config';
import CrisprGenomeEditor from '../ui/CrisprGenomeEditor';

const AnimatedChallenge = ({ challenge, index, scrollYProgress }: { challenge: (typeof PROBLEM_CONFIG.challenges)[0], index: number, scrollYProgress: any }) => {
  const totalChallenges = PROBLEM_CONFIG.challenges.length;
  const start = (index + 1) / (totalChallenges + 2);
  const end = (index + 2) / (totalChallenges + 2);

  const opacity = useTransform(scrollYProgress, [start - 0.05, start, end, end + 0.05], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [start - 0.05, start, end, end + 0.05], [0.9, 1, 1, 0.9]);

  return (
    <motion.div style={{ opacity, scale }} className="w-full max-w-5xl mx-auto">
      <div className="bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 backdrop-blur-sm">
        <div className="p-6 bg-slate-900/70">
          <div className="flex items-center gap-4">
            <challenge.icon className="w-8 h-8 shrink-0 text-primary" />
            <h3 className="text-xl md:text-2xl font-bold text-slate-100">{challenge.title}</h3>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-px bg-slate-700">
          <div className="bg-slate-800 p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 shrink-0 bg-red-500/10">
                <Target size={18} className="text-red-400" />
              </div>
              <h4 className="font-semibold text-md text-red-300">The Challenge</h4>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed ml-11">{challenge.problem.description}</p>
          </div>
          <div className="bg-slate-800 p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center mr-3 shrink-0">
                <CheckCircle size={18} className="text-green-400" />
              </div>
              <h4 className="font-semibold text-md text-green-300">The CrisPRO™ Solution</h4>
            </div>
            <ul className="space-y-3 text-slate-400 text-sm ml-11">
              {challenge.solution.points.map((point, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-400 mr-2.5 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


const ProblemSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  const totalParts = PROBLEM_CONFIG.challenges.length + 2; // header + challenges + summary
  const headerOpacity = useTransform(scrollYProgress, [0, 1 / totalParts, 1.5 / totalParts], [1, 1, 0]);
  const summaryOpacity = useTransform(scrollYProgress, [(totalParts - 1.5) / totalParts, (totalParts - 1) / totalParts, 1], [0, 1, 1]);
  
  return (
    <section ref={sectionRef} id={PROBLEM_CONFIG.sectionId} className="relative bg-background text-foreground" style={{ height: `${(PROBLEM_CONFIG.challenges.length + 1) * 100}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0 z-0 opacity-50">
          <Suspense fallback={<div className="bg-background w-full h-full" />}>
            <CrisprGenomeEditor className="w-full h-full" />
          </Suspense>
        </div>

        {/* Header */}
        <motion.div style={{ opacity: headerOpacity }} className="absolute inset-0 flex items-center justify-center z-10">
            <div className="max-w-3xl mx-auto text-center px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient backdrop-blur-sm p-2 rounded">{PROBLEM_CONFIG.title}</h2>
                <p className="text-lg text-muted-foreground backdrop-blur-sm p-2 rounded">{PROBLEM_CONFIG.subtitle}</p>
            </div>
        </motion.div>

        {/* Animated Challenges */}
        {PROBLEM_CONFIG.challenges.map((challenge, index) => (
          <div key={index} className="absolute inset-0 flex items-center justify-center px-4 z-10">
            <AnimatedChallenge
              challenge={challenge}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          </div>
        ))}
        
        {/* Summary */}
        <motion.div style={{ opacity: summaryOpacity }} className="absolute inset-0 flex items-center justify-center z-10">
            <div className="p-8 md:p-10 bg-gradient-to-r from-primary/80 to-blue-700/80 backdrop-blur-md rounded-2xl max-w-4xl mx-auto text-center shadow-2xl shadow-primary/20 border border-slate-700">
                <div className="flex justify-center text-4xl text-sky-300 mb-4">
                    <FastForward />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">{PROBLEM_CONFIG.summaryTitle}</h3>
                <p className="text-blue-200 text-lg leading-relaxed">{PROBLEM_CONFIG.summaryText}</p>
            </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ProblemSection; 
