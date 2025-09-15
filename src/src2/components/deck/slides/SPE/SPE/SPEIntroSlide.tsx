import React from 'react';
import { motion } from 'framer-motion';
import DigitalSynapseBackground from '../../../../site/blocks/DigitalSynapseBackground.tsx';

const SPEIntroSlide = () => (
    <motion.section
        key="slide1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-900 text-slate-200"
    >
        <DigitalSynapseBackground />
        <div className="relative z-10 w-full max-w-6xl space-y-12">
            <motion.h1
                className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-400"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
            >
                S/P/E Framework
            </motion.h1>
            <motion.p
                className="text-2xl md:text-3xl font-light text-slate-300"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
            >
                AI-Powered Therapeutic Design & Validation Platform
            </motion.p>
            <motion.p
                className="text-lg md:text-xl text-slate-400 mt-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.6 }}
            >
                Predict + Design + Validate • Reduce $2.8B+ drug discovery costs • From months to days
            </motion.p>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mt-12">
                <motion.div
                    className="text-center space-y-4"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
                    <h3 className="text-2xl font-bold text-red-400">The Problem</h3>
                    <p className="text-lg text-slate-300 max-w-md">
                        Drug discovery takes 10+ years and costs $2.8B+ per approved drug, with 90% failure rate in clinical trials
                    </p>
                </motion.div>

                <motion.div
                    className="text-center space-y-4"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                >
                    <h3 className="text-2xl font-bold text-green-400">Our Solution</h3>
                    <p className="text-lg text-slate-300 max-w-md">
                        AI-powered platform that predicts, designs, AND validates therapeutics in silico before clinical trials
                    </p>
                </motion.div>
            </div>

            <div className="mt-8 p-6 bg-slate-700/50 rounded-xl border border-slate-600">
                <p className="text-xl font-semibold text-slate-200 mb-3">S/P/E Framework: Sequence + Pathway + Evidence = Therapeutic Validation</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-sky-500/20 p-3 rounded-lg border border-sky-500/30">
                        <span className="text-sky-400 font-bold">S (Sequence)</span>
                        <p className="text-slate-300 mt-1">How disruptive is this DNA change?</p>
                    </div>
                    <div className="bg-purple-500/20 p-3 rounded-lg border border-purple-500/30">
                        <span className="text-purple-400 font-bold">P (Pathway)</span>
                        <p className="text-slate-300 mt-1">Combined impact on disease pathways</p>
                    </div>
                    <div className="bg-green-500/20 p-3 rounded-lg border border-green-500/30">
                        <span className="text-green-400 font-bold">E (Evidence)</span>
                        <p className="text-slate-300 mt-1">Clinical databases & literature validation</p>
                    </div>
                </div>
            </div>
        </div>
    </motion.section>
);

export default SPEIntroSlide;
