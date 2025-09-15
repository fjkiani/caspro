import React from 'react';
import { motion } from 'framer-motion';
import { Dna, GitBranch, FileText } from 'lucide-react';
import DigitalSynapseBackground from '../../../../site/blocks/DigitalSynapseBackground.tsx';
import { 
  SPE_FRAMEWORK,
  SLIDE_ANIMATIONS, 
  COLORS, 
  GRADIENTS, 
  SIZES, 
  LAYOUT,
  COMPONENT_STYLES 
} from './constants';

const SPEFrameworkSlide = () => (
    <motion.section
        key="slide7"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-900 text-slate-200"
    >
        <DigitalSynapseBackground />
        <div className="relative z-10 w-full max-w-6xl space-y-12">
            <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {SPE_FRAMEWORK.title}
                </h1>
                <p className="text-2xl md:text-3xl font-light text-slate-300">
                    {SPE_FRAMEWORK.tagline}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
                <motion.div
                    className="relative p-6 rounded-2xl border border-slate-700 shadow-lg bg-slate-800/50 overflow-hidden group cursor-pointer"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                >
                    <motion.div
                        className="absolute inset-0 z-0 opacity-10 blur-xl bg-gradient-to-br from-sky-500 to-purple-500"
                        animate={{ opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                    <div className="relative z-10 flex items-start space-x-4">
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                        >
                            <Dna size={48} className="text-sky-400 flex-shrink-0" />
                        </motion.div>
                        <div>
                            <motion.h3
                                className="text-2xl font-bold text-slate-200 mb-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400">{SPE_FRAMEWORK.components.sequence.title}:</span> Sequence signal
                            </motion.h3>
                            <motion.p
                                className="text-lg text-slate-300"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                {SPE_FRAMEWORK.components.sequence.description}
                            </motion.p>
                            <div className="mt-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                                <p className="text-sm font-semibold text-sky-400">Example</p>
                                <p className="text-sm text-slate-300">TP53 change → strong disruption signal</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="relative p-6 rounded-2xl border border-slate-700 shadow-lg bg-slate-800/50 overflow-hidden group cursor-pointer"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                >
                    <motion.div
                        className="absolute inset-0 z-0 opacity-10 blur-xl bg-gradient-to-br from-purple-500 to-green-500"
                        animate={{ opacity: [0.1, 0.15, 0.1] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                    />
                    <div className="relative z-10 flex items-start space-x-4">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                        >
                            <GitBranch size={48} className="text-purple-400 flex-shrink-0" />
                        </motion.div>
                        <div>
                            <motion.h3
                                className="text-2xl font-bold text-slate-200 mb-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{SPE_FRAMEWORK.components.pathway.title}:</span> Biology fit
                            </motion.h3>
                            <motion.p
                                className="text-lg text-slate-300"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.0 }}
                            >
                                {SPE_FRAMEWORK.components.pathway.description}
                            </motion.p>
                            <div className="mt-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                                <p className="text-sm font-semibold text-purple-400">Example</p>
                                <p className="text-sm text-slate-300">RAS pathway change → fits cancer biology</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="relative p-6 rounded-2xl border border-slate-700 shadow-lg bg-slate-800/50 overflow-hidden group cursor-pointer"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                >
                    <motion.div
                        className="absolute inset-0 z-0 opacity-10 blur-xl bg-gradient-to-br from-green-500 to-cyan-500"
                        animate={{ opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                    />
                    <div className="relative z-10 flex items-start space-x-4">
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
                        >
                            <FileText size={48} className="text-green-400 flex-shrink-0" />
                        </motion.div>
                        <div>
                            <motion.h3
                                className="text-2xl font-bold text-slate-200 mb-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.0 }}
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">{SPE_FRAMEWORK.components.evidence.title}:</span> Clinical validation
                            </motion.h3>
                            <motion.p
                                className="text-lg text-slate-300"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                            >
                                {SPE_FRAMEWORK.components.evidence.description}
                            </motion.p>
                            <div className="mt-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                                <p className="text-sm font-semibold text-green-400">Example</p>
                                <p className="text-sm text-slate-300">BRAF V600E → well-documented in literature</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 shadow-lg text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
            >
                <h2 className="text-3xl font-bold text-slate-200 mb-4">
                    {SPE_FRAMEWORK.description}
                </h2>
                <p className="text-lg text-slate-300 max-w-4xl mx-auto">
                    Our platform combines all three signals to give you clear, actionable guidance on therapeutic targets. 
                    No more guessing—get evidence-backed recommendations in minutes, not months.
                </p>
            </motion.div>
        </div>
    </motion.section>
);

export default SPEFrameworkSlide;

