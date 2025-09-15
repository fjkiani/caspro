import { motion } from 'framer-motion';
import { Target, Zap, TrendingUp, Shield } from 'lucide-react';
import DigitalSynapseBackground from '../../../../site/blocks/DigitalSynapseBackground.tsx';

const SPEBusinessValueSlide = () => {
  return (
    <motion.section
      key="business-value-slide"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-900 text-slate-200"
    >
      <DigitalSynapseBackground />
      <div className="relative z-10 w-full max-w-7xl space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
            Business Value: From Hypothesis to Guidance
          </h1>
          <p className="text-xl md:text-2xl font-light text-slate-300">
            Faster decisions, transparent evidence, lower cost of development
          </p>
        </div>

        {/* Main Content - 4 Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Market Gaps */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Target size={32} className="text-red-400" />
              <h3 className="text-2xl font-bold text-slate-200">Market Gaps</h3>
            </div>
            <ul className="text-left space-y-3 text-slate-300">
              <li className="flex items-start">
                <span className="text-red-400 mr-2 mt-1">•</span>
                Drug development decisions rely on fragmented evidence and slow manual synthesis.
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2 mt-1">•</span>
                Variant‑level guidance is spotty; noncoding and context effects are underused.
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2 mt-1">•</span>
                Existing tools optimize old drugs' timing rather than inventing new precision therapies.
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2 mt-1">•</span>
                Reproducibility and provenance are rarely first‑class; audit trails are weak.
              </li>
            </ul>
          </motion.div>

          {/* Our Approach */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Zap size={32} className="text-yellow-400" />
              <h3 className="text-2xl font-bold text-slate-200">Our Approach</h3>
            </div>
            <ul className="text-left space-y-3 text-slate-300">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2 mt-1">•</span>
                Unified S/P/E framework: Sequence, Pathway, Evidence – fused into one guidance score.
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2 mt-1">•</span>
                Live insights with full provenance: every number is traceable, exportable, and repeatable.
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2 mt-1">•</span>
                Profiles for stability and lift: Baseline (1B, safe), Richer S (bounded), Fusion (AM‑covered).
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2 mt-1">•</span>
                Research‑mode by design: cohort‑dependent, conservative gates, and transparent confidence.
              </li>
            </ul>
          </motion.div>

          {/* Industry Impact */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp size={32} className="text-green-400" />
              <h3 className="text-2xl font-bold text-slate-200">Industry Impact</h3>
            </div>
            <ul className="text-left space-y-3 text-slate-300">
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">•</span>
                Accelerates hypothesis → validation by surfacing ranked, auditable options in minutes.
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">•</span>
                Reduces cost of exploration: safer defaults, toggleable lifts, and deterministic runs.
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">•</span>
                Enables portfolio triage: compare profiles side‑by‑side and focus on high‑signal programs.
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 mt-1">•</span>
                Unlocks partner workflows: cohort extraction, benchmarks, and exportable artifacts.
              </li>
            </ul>
          </motion.div>

          {/* Competitive Advantages */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Shield size={32} className="text-purple-400" />
              <h3 className="text-2xl font-bold text-slate-200">Competitive Advantages</h3>
            </div>
            <ul className="text-left space-y-3 text-slate-300">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2 mt-1">•</span>
                Fused signal with AM prior on missense variants – clearer decisions where coverage exists.
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2 mt-1">•</span>
                Transparent by default – run IDs, citations, and rationale on every output.
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2 mt-1">•</span>
                Modular orchestration – endpoints for insights, efficacy, datasets, and guidance.
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2 mt-1">•</span>
                Pragmatic infrastructure – spam‑safe flags, 1B default, and graceful degradation.
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Footer - Revenue Model and Moats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
        >
          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-600">
            <h4 className="text-lg font-bold text-cyan-400 mb-2">Revenue Model</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Platform royalty: 2–5% on licensed IP where platform contributes materially</li>
              <li>• Co‑inventor ownership: 10–30% where novel designs originate from the platform</li>
              <li>• Service + royalty hybrid: upfront for patent workflows plus ongoing royalty</li>
            </ul>
          </div>
          <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-600">
            <h4 className="text-lg font-bold text-green-400 mb-2">Moats</h4>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Technical: contribution tracking, calibration, provenance</li>
              <li>• Legal: co‑invention doctrine and royalty infrastructure</li>
              <li>• Business: flywheel from more users → more IP → more royalties</li>
            </ul>
          </div>
        </motion.div>

        {/* Final Impact Statement */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 p-6 rounded-xl border border-slate-600 text-center"
        >
          <p className="text-lg text-slate-300">
            <strong className="text-green-400">Concrete Partner Outcome:</strong> Faster, cheaper, traceable decisions with complete audit trails for regulatory compliance
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SPEBusinessValueSlide;
