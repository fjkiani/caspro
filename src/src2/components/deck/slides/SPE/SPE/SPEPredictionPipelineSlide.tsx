import { motion } from 'framer-motion';
import { Dna, BrainCircuit, CheckCircle, Zap, Activity } from 'lucide-react';
import DigitalSynapseBackground from '../../../../site/blocks/DigitalSynapseBackground.tsx';

const SPEPredictionPipelineSlide = () => (
    <motion.section
        key="slide6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-900 text-slate-200"
    >
        <DigitalSynapseBackground />
        <div className="relative z-10 w-full max-w-6xl space-y-12">
            <div className="space-y-8">
                <motion.div
                    className="text-center space-y-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center justify-center space-x-6">
                        {/* <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400">
                            Combined Scoring (demo):
                        </h1> */}
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Zap className="text-yellow-400" size={80} />
                        </motion.div>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-200">
                        Transparent Prediction Pipeline
                    </h2>
                    <p className="text-2xl md:text-4xl font-light text-slate-300 max-w-4xl mx-auto leading-relaxed">
                        Research‑mode snapshots with full provenance
                    </p>
                </motion.div>

                {/* Key Achievements */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <motion.div
                        className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 p-6 rounded-xl border border-green-500/30 text-center"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="text-4xl font-black text-green-400 mb-2">3</div>
                        <div className="text-lg text-slate-300 font-semibold mb-1">Model Profiles</div>
                        <div className="text-sm text-green-300">Baseline · Richer · Fusion</div>
                    </motion.div>

                    <motion.div
                        className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-xl border border-purple-500/30 text-center"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="text-4xl font-black text-purple-400 mb-2">Research </div>
                        <div className="text-lg text-slate-300 font-semibold mb-1">Mode
</div>
                        <div className="text-sm text-purple-300">Cohort‑dependent results</div>
                    </motion.div>

                    <motion.div
                        className="bg-gradient-to-br from-orange-500/20 to-red-500/20 p-6 rounded-xl border border-orange-500/30 text-center"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="text-4xl font-black text-orange-400 mb-2">Serveless</div>
                        <div className="text-lg text-slate-300 font-semibold mb-1">0</div>
                        <div className="text-sm text-orange-300"> server management required</div>
                    </motion.div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-200 mb-6">Fusion Engine Workflow</h3>

                    {/* Stage 1: Variant Input */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative flex items-start space-x-4 p-6 bg-slate-800/50 rounded-2xl border-l-4 border-red-500 shadow-lg"
                    >
                        <Dna size={48} className="text-red-500 mt-1" />
                        <div className="text-left flex-1">
                            <h4 className="text-xl font-bold text-slate-200 mb-2">Variant Input & Validation</h4>
                            <p className="text-slate-300 text-sm">Receive HGVS notation, validate against genomic databases, check AlphaMissense coverage</p>
                            <div className="mt-2 p-2 bg-slate-700/50 rounded text-xs">
                                <code className="text-red-300">chr7:140453136:T:A (BRAF V600E)</code>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stage 2: Dual Scoring */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="relative flex items-start space-x-4 p-6 bg-slate-800/50 rounded-2xl border-l-4 border-sky-500 shadow-lg"
                    >
                        <BrainCircuit size={48} className="text-sky-500 mt-1" />
                        <div className="text-left flex-1">
                            <h4 className="text-xl font-bold text-slate-200 mb-2">Parallel Scoring</h4>
                            <p className="text-slate-300 text-sm">Run Evo2 sequence scoring and AlphaMissense lookup simultaneously</p>
                            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                                <div className="p-2 bg-slate-700/50 rounded">
                                    <span className="text-cyan-300">Evo2:</span>
                                    <span className="text-slate-300 ml-1">delta proxy</span>
                                </div>
                                <div className="p-2 bg-slate-700/50 rounded">
                                    <span className="text-purple-300">AM:</span>
                                    <span className="text-slate-300 ml-1">pathogenicity prior</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stage 3: Intelligent Fusion */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                        className="relative flex items-start space-x-4 p-6 bg-slate-800/50 rounded-2xl border-l-4 border-purple-500 shadow-lg"
                    >
                        <Zap size={48} className="text-purple-500 mt-1" />
                        <div className="text-left flex-1">
                            <h4 className="text-xl font-bold text-slate-200 mb-2">Intelligent Fusion</h4>
                            <p className="text-slate-300 text-sm">Apply fusion algorithm with provenance tracking</p>
                            <div className="mt-2 p-2 bg-slate-700/50 rounded text-xs">
                                <span className="text-green-300">Fused Result: higher confidence</span>
                                <span className="text-slate-400 ml-2">(AM‑covered variants)</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-slate-200 mb-6">Performance Validation</h3>

                    {/* Benchmark Results */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.7 }}
                        className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg"
                    >
                        <h4 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center">
                            <Activity className="mr-2" size={20} />
                            Benchmark Results
                        </h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">CrisPRO Only:</span>
                                <span className="text-cyan-300 font-bold">Baseline profile</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">AlphaMissense Only:</span>
                                <span className="text-purple-300 font-bold">AM prior (missense)</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Fused Engine:</span>
                                <span className="text-green-300 font-bold">≥0.90 AUROC (AM‑covered micro)</span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 mt-3">Small AM‑covered micro‑set; cohort‑dependent</p>
                    </motion.div>

                    {/* Technical Validation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 2.2 }}
                        className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 p-6 rounded-2xl border border-green-500/30 shadow-lg"
                    >
                        <h4 className="text-xl font-semibold text-green-400 mb-4 flex items-center">
                            <CheckCircle className="mr-2" size={20} />
                            Technical Validation
                        </h4>
                        <p className="text-slate-300 leading-relaxed">
                            Reproducible micro‑runs (AM‑covered missense) with full provenance
                        </p>
                    </motion.div>

                    {/* Clinical Impact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 2.7 }}
                        className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-6 rounded-2xl border border-purple-500/30 shadow-lg"
                    >
                        <h4 className="text-xl font-semibold text-purple-400 mb-4 flex items-center">
                            <Activity className="mr-2" size={20} />
                            Clinical Impact
                        </h4>
                        <p className="text-slate-300 leading-relaxed">
                            Confidence lift on covered variants; clearer guidance in demos
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="mt-8 bg-slate-800/50 p-8 rounded-2xl border border-slate-700 shadow-lg text-center">
                <p className="text-2xl font-semibold text-slate-200 mb-6">Fusion Engine Achievements</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    
                    
                 
                  
                </div>



                <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-slate-600">
                    <p className="text-lg text-slate-300">
                        <strong>Result:</strong> Combined scoring delivers research‑mode guidance with complete transparency,
                        enabling clearer decisions and accelerating therapeutic exploration
                    </p>
                </div>
            </div>
        </div>
    </motion.section>
);

export default SPEPredictionPipelineSlide;
