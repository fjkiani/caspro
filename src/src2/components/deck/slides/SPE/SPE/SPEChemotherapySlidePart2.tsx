import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import DigitalSynapseBackground from '../../../../site/blocks/DigitalSynapseBackground.tsx';
import { 
  FUSION_ENGINE,
  SLIDE_ANIMATIONS, 
  COLORS, 
  GRADIENTS, 
  SIZES, 
  LAYOUT,
  COMPONENT_STYLES 
} from './constants';

const SPEChemotherapySlidePart2 = () => {
    console.log('SPEChemotherapySlidePart2 - FUSION_ENGINE:', FUSION_ENGINE);
    
    return (
  <motion.section
    key="slide5-part2"
    {...SLIDE_ANIMATIONS.slide}
    className={`${LAYOUT.container} ${COLORS.background.primary} ${COLORS.text.primary}`}
  >
    <DigitalSynapseBackground />
    <div className={LAYOUT.content}>
      <div className={SIZES.spacing.lg}>
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-6">
            <h1 className={`${SIZES.text["6xl"]} md:${SIZES.text["8xl"]} font-black text-transparent bg-clip-text bg-gradient-to-r ${GRADIENTS.title.sky}`}>
              Decision Impact & Framework Power
            </h1>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap size={64} className="text-yellow-400" />
            </motion.div>
          </div>
          <p className={`${SIZES.text["2xl"]} ${COLORS.text.secondary} max-w-4xl mx-auto`}>
            How fusion engine transforms therapeutic decision-making
          </p>
        </motion.div>
      </div>

      {/* Decision Impact */}
      <motion.div
        className={`${COMPONENT_STYLES.card.base} ${SIZES.padding.lg} rounded-2xl ${SIZES.margin.lg}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h3 className={`${SIZES.text["2xl"]} font-bold ${COLORS.text.primary} mb-6 text-center`}>
          {FUSION_ENGINE.decisionImpact.title}
        </h3>
        
        <div className={`${LAYOUT.grid["2col"]} gap-8`}>
          <div className={`${COLORS.background.secondary} ${SIZES.padding.md} rounded-lg border ${COLORS.border.primary}`}>
            <h4 className={`${SIZES.text.lg} font-semibold text-red-400 mb-3`}>
              {FUSION_ENGINE.decisionImpact.before.title}
            </h4>
            <div className={`${SIZES.spacing.sm} text-sm`}>
              <p className="text-red-400"><strong>Score:</strong> {FUSION_ENGINE.decisionImpact.before.score}</p>
              <p className="text-orange-400"><strong>Guidance:</strong> {FUSION_ENGINE.decisionImpact.before.guidance}</p>
              <p className="text-red-400"><strong>Confidence:</strong> {FUSION_ENGINE.decisionImpact.before.confidence}</p>
            </div>
          </div>

          <div className={`${COLORS.background.secondary} ${SIZES.padding.md} rounded-lg border ${COLORS.border.primary}`}>
            <h4 className={`${SIZES.text.lg} font-semibold text-green-400 mb-3`}>
              {FUSION_ENGINE.decisionImpact.after.title}
            </h4>
            <div className={`${SIZES.spacing.sm} text-sm`}>
              <p className="text-green-400"><strong>Score:</strong> {FUSION_ENGINE.decisionImpact.after.score}</p>
              <p className="text-green-400"><strong>Guidance:</strong> {FUSION_ENGINE.decisionImpact.after.guidance}</p>
              <p className="text-green-400"><strong>Confidence:</strong> {FUSION_ENGINE.decisionImpact.after.confidence}</p>
              <p className={`text-xs text-purple-300 mt-1`}><code>{FUSION_ENGINE.decisionImpact.after.formula}</code></p>
            </div>
          </div>
        </div>

        {FUSION_ENGINE.decisionImpact.confidencePolicy && (
          <div className={`${COLORS.background.secondary} ${SIZES.padding.md} rounded-lg border ${COLORS.border.primary} mt-6`}>
            <h4 className={`${SIZES.text.lg} font-semibold text-orange-400 mb-3`}>
              {FUSION_ENGINE.decisionImpact.confidencePolicy.title || 'Confidence Policy'}
            </h4>
            <div className={`${SIZES.spacing.xs} text-xs`}>
              {FUSION_ENGINE.decisionImpact.confidencePolicy.rules && Array.isArray(FUSION_ENGINE.decisionImpact.confidencePolicy.rules) && 
                FUSION_ENGINE.decisionImpact.confidencePolicy.rules.map((rule, index) => (
                  <div key={index} className={`${COLORS.background.tertiary} ${SIZES.padding.xs} rounded`}>
                    <span className="text-green-400">{rule.condition}</span>
                    <span className="text-orange-300 ml-2"><code>{rule.action}</code></span>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 p-4 rounded-lg border border-slate-600 mt-6">
          <p className={`${SIZES.text.sm} ${COLORS.text.secondary} text-center`}>
            <strong>Impact (research‑mode):</strong> {FUSION_ENGINE.decisionImpact.impact}
          </p>
        </div>
      </motion.div>

      {/* Framework Power */}
      <motion.div
        className={`${COMPONENT_STYLES.card.base} ${SIZES.padding.lg} rounded-2xl ${SIZES.margin.lg}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <p className={`${SIZES.text["2xl"]} font-semibold ${COLORS.text.primary} mb-6`}>{FUSION_ENGINE.frameworkPower.title}</p>
        <div className={`${LAYOUT.grid["3col"]} gap-6`}>
          <div className={`bg-sky-500/20 ${SIZES.padding.md} rounded-lg border border-sky-500/30`}>
            <span className="text-sky-400 font-bold text-lg">{FUSION_ENGINE.frameworkPower.sequence.title}</span>
            <p className={`${COLORS.text.secondary} mt-2 ${SIZES.text.sm}`}>{FUSION_ENGINE.frameworkPower.sequence.description}</p>
            <p className="text-cyan-300 font-semibold">{FUSION_ENGINE.frameworkPower.sequence.result}</p>
          </div>
          <div className={`bg-purple-500/20 ${SIZES.padding.md} rounded-lg border border-purple-500/30`}>
            <span className="text-purple-400 font-bold text-lg">{FUSION_ENGINE.frameworkPower.pathway.title}</span>
            <p className={`${COLORS.text.secondary} mt-2 ${SIZES.text.sm}`}>{FUSION_ENGINE.frameworkPower.pathway.description}</p>
            <p className="text-purple-300 font-semibold">{FUSION_ENGINE.frameworkPower.pathway.result}</p>
          </div>
          <div className={`bg-green-500/20 ${SIZES.padding.md} rounded-lg border border-green-500/30`}>
            <span className="text-green-400 font-bold text-lg">{FUSION_ENGINE.frameworkPower.evidence.title}</span>
            <p className={`${COLORS.text.secondary} mt-2 ${SIZES.text.sm}`}>{FUSION_ENGINE.frameworkPower.evidence.description}</p>
            <p className="text-green-300 font-semibold">{FUSION_ENGINE.frameworkPower.evidence.result}</p>
          </div>
        </div>

        <div className={`${LAYOUT.grid["2col"]} gap-6 mt-6`}>
          <div className={`${COLORS.background.tertiary} ${SIZES.padding.md} rounded-lg`}>
            <h4 className={`${SIZES.text.lg} font-semibold text-red-400 mb-2`}>Before</h4>
            <p className={`${SIZES.text.sm} ${COLORS.text.secondary}`}>{FUSION_ENGINE.frameworkPower.comparison.before}</p>
          </div>
          <div className={`${COLORS.background.tertiary} ${SIZES.padding.md} rounded-lg`}>
            <h4 className={`${SIZES.text.lg} font-semibold text-green-400 mb-2`}>After</h4>
            <p className={`${SIZES.text.sm} ${COLORS.text.secondary}`}>{FUSION_ENGINE.frameworkPower.comparison.after}</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 p-4 rounded-lg border border-slate-600 mt-6">
          <p className={`${SIZES.text.sm} ${COLORS.text.secondary} text-center`}>
            <strong>Impact (research‑mode):</strong> {FUSION_ENGINE.frameworkPower.finalImpact}
          </p>
        </div>
      </motion.div>
    </div>
  </motion.section>
  );
};

export default SPEChemotherapySlidePart2;
