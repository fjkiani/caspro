import React from 'react';
import { motion } from 'framer-motion';
import DigitalSynapseBackground from '../../../../site/blocks/DigitalSynapseBackground.tsx';
import { 
  ACHIEVEMENTS,
  SLIDE_ANIMATIONS, 
  COLORS, 
  GRADIENTS, 
  SIZES, 
  LAYOUT,
  COMPONENT_STYLES 
} from './constants';

const SPEAchievementSlide = () => {
    // Debug: Check if ACHIEVEMENTS is properly loaded
    console.log('ACHIEVEMENTS:', ACHIEVEMENTS);
    console.log('ACHIEVEMENTS.sections:', ACHIEVEMENTS?.sections);
    console.log('ACHIEVEMENTS.sections[0]:', ACHIEVEMENTS?.sections?.[0]);
    console.log('ACHIEVEMENTS.sections[0].achievements:', ACHIEVEMENTS?.sections?.[0]?.achievements);

    return (
    <motion.section
        key="slide2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-900 text-slate-200"
    >
        <DigitalSynapseBackground />
        <div className="relative z-10 w-full max-w-6xl space-y-12">
            <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-400">
                    {ACHIEVEMENTS.title}
                </h1>
                <p className="text-2xl md:text-3xl font-light text-slate-300">
                    {ACHIEVEMENTS.subtitle}
                </p>
                <p className="text-xl text-slate-300 max-w-4xl mx-auto">
                    We produce transparent, audit‑ready efficacy hypotheses (Sequence/Pathway/Evidence), cohort benchmarks, and design concepts. Research‑mode only; not clinical decisions.
                </p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-8 max-w-4xl mx-auto">
                <motion.div
                    className="p-6 rounded-2xl border border-slate-700 shadow-lg bg-slate-800/50 w-full text-left"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🔬</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-200">Identify Therapeutic Opportunities</h3>
                            <p className="text-lg text-slate-300">Map variants → pathways → candidate drug classes with provenance, badges, and rationale (S/P/E).</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="p-6 rounded-2xl border border-slate-700 shadow-lg bg-slate-800/50 w-full text-left"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🧬</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-200">Design Custom Therapeutics</h3>
                            <p className="text-lg text-slate-300">Generate CRISPR guides and sequences with safety gates; surface GC/efficacy heuristics and provenance.</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="p-6 rounded-2xl border border-slate-700 shadow-lg bg-slate-800/50 w-full text-left"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                >
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">✅</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-200">Validate In‑Silico First</h3>
                            <p className="text-lg text-slate-300">Benchmark cohorts (AUPRC/AUROC), compare model profiles (baseline/richer S/Fusion), and prioritize experiments.</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                {ACHIEVEMENTS.sections?.[0]?.achievements?.map((achievement, index) => (
                    <div key={index} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                        <p className="text-2xl font-bold text-green-400">{achievement.value}</p>
                        <p className="text-sm text-slate-300">{achievement.label}</p>
                    </div>
                )) || (
                    <div className="col-span-4 text-center text-slate-400">
                        <p>Loading achievements...</p>
                    </div>
                )}
            </div>
            {/* Force hot reload to clear browser cache */}
        </div>
    </motion.section>
    );
};

export default SPEAchievementSlide;
