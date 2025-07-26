'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Settings, CheckCircle } from 'lucide-react';
import { DEEP_DIVE_CONFIG } from '@/data/technology-deep-dive-config';
import ModelViewer from '../ui/ProteinModelViewer';

const TechnologySlide = ({ tech, scrollYProgress, index, total }: { tech: any, scrollYProgress: any, index: number, total: number }) => {
  const start = (index + 1) / (total + 2);
  const end = (index + 2) / (total + 2);
  const fadeDuration = 0.055;
  const opacity = useTransform(scrollYProgress, [start - fadeDuration, start, end - fadeDuration, end], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [start - fadeDuration, start, end - fadeDuration, end], [0.95, 1, 1, 0.95]);

  return (
    <motion.div style={{ opacity, scale }} className="w-full max-w-6xl mx-auto h-full flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-slate-800/50 p-8 rounded-2xl border border-slate-700 backdrop-blur-md">
        <div>
          <div className="flex items-center mb-4">
            <tech.icon className="w-10 h-10 text-primary mr-4" />
            <h3 className="text-2xl font-bold text-slate-100">{tech.title}</h3>
          </div>
          <div className="space-y-6">
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
              <div className="flex items-center text-teal-400 mb-2">
                <BookOpen className="w-5 h-5 mr-2" />
                <h4 className="font-semibold">Scientific Doctrine</h4>
              </div>
              <p className="text-slate-400 text-sm">{tech.scientificBasis}</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
              <div className="flex items-center text-purple-400 mb-2">
                <Settings className="w-5 h-5 mr-2" />
                <h4 className="font-semibold">How it Fights: </h4>
              </div>
              <p className="text-slate-400 text-sm">{tech.howItWorks}</p>
            </div>
          </div>
        </div>
        <div className="h-80 bg-slate-900/50 rounded-xl flex items-center justify-center p-4 shadow-inner border border-slate-800">
          <ModelViewer modelUrl={tech.modelPath} />
        </div>
      </div>
    </motion.div>
  );
};

const WorkflowSlide = ({ scrollYProgress, index, total }: { scrollYProgress: any, index: number, total: number }) => {
    const start = (index + 1) / (total + 2);
    const end = (index + 2) / (total + 2);
    const fadeDuration = 0.025;
    const opacity = useTransform(scrollYProgress, [start - fadeDuration, start, end - fadeDuration, end], [0, 1, 1, 0]);
    
    return (
        <motion.div style={{ opacity }} className="w-full max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
                <DEEP_DIVE_CONFIG.workflow.icon className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-3xl font-bold mb-4 text-slate-100">{DEEP_DIVE_CONFIG.workflow.title}</h3>
            <p className="text-slate-400 mb-8">{DEEP_DIVE_CONFIG.workflow.subtitle}</p>
            <div className="space-y-3">
                {DEEP_DIVE_CONFIG.workflow.steps.map((step, i) => {
                    const stepStart = start + (i / DEEP_DIVE_CONFIG.workflow.steps.length) * (end - start);
                    const stepEnd = start + ((i + 1) / DEEP_DIVE_CONFIG.workflow.steps.length) * (end - start);
                    const stepProgress = useTransform(scrollYProgress, [stepStart, stepEnd], [0, 1]);
                    return(
                        <motion.div
                            key={i}
                            style={{ opacity: stepProgress, y: useTransform(stepProgress, [0, 1], [20, 0]) }}
                            className="flex items-start p-3 bg-slate-800/50 rounded-lg border border-slate-700 text-left"
                        >
                            <CheckCircle className="flex-shrink-0 w-5 h-5 text-green-400 mr-3 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-slate-200">{i + 1}. {step.title}</h4>
                                <p className="text-slate-400 text-sm">{step.text}</p>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    );
};


const TechnologyDeepDiveSection: React.FC = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end']
    });

    const totalParts = DEEP_DIVE_CONFIG.technologies.length + 3; // header + techs + workflow + summary
    
    const headerTransitionPoint = 1.2 / totalParts;
    const headerY = useTransform(scrollYProgress, [0, headerTransitionPoint], ['0vh', '-30vh']);
    const headerScale = useTransform(scrollYProgress, [0, headerTransitionPoint], [1, 0.9]);
    
    const summaryStartPoint = (totalParts - 1) / totalParts;
    const finalHeaderOpacity = useTransform(scrollYProgress, [summaryStartPoint - 0.05, summaryStartPoint], [1, 0]);
    const summaryOpacity = useTransform(scrollYProgress, [summaryStartPoint - 0.05, summaryStartPoint], [0, 1]);

    return (
        <section ref={sectionRef} id={DEEP_DIVE_CONFIG.sectionId} className="relative bg-background text-foreground" style={{ height: `${totalParts * 100}vh` }}>
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

                <motion.div style={{ opacity: finalHeaderOpacity }} className="absolute inset-0 flex items-center justify-center z-20">
                    <motion.div style={{ y: headerY, scale: headerScale }} className="max-w-3xl mx-auto text-center px-4">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">{DEEP_DIVE_CONFIG.title}</h2>
                        <p className="text-lg text-muted-foreground">{DEEP_DIVE_CONFIG.subtitle}</p>
                    </motion.div>
                </motion.div>

                {DEEP_DIVE_CONFIG.technologies.map((tech, i) => (
                    <div key={tech.id} className="absolute inset-0 flex items-center justify-center px-4 z-10">
                        <TechnologySlide tech={tech} scrollYProgress={scrollYProgress} index={i} total={totalParts - 2} />
                    </div>
                ))}
                
                {/* <div className="absolute inset-0 flex items-center justify-center px-4 z-10">
                    <WorkflowSlide scrollYProgress={scrollYProgress} index={DEEP_DIVE_CONFIG.technologies.length} total={totalParts - 2} />
                </div> */}

                <motion.div style={{ opacity: summaryOpacity }} className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="p-8 md:p-10 bg-gradient-to-r from-primary/80 to-blue-700/80 backdrop-blur-md rounded-2xl max-w-3xl mx-auto text-center shadow-2xl shadow-primary/20 border border-slate-700">
                        <h4 className="text-xl font-semibold mb-3 text-white">{DEEP_DIVE_CONFIG.summary.title}</h4>
                        <p className="text-blue-200 text-lg leading-relaxed">{DEEP_DIVE_CONFIG.summary.text}</p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default TechnologyDeepDiveSection; 