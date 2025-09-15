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

const SPEChemotherapySlide = () => {
    console.log('SPEChemotherapySlide - FUSION_ENGINE:', FUSION_ENGINE);
    console.log('SPEChemotherapySlide - decisionImpact:', FUSION_ENGINE?.decisionImpact);
    console.log('SPEChemotherapySlide - confidencePolicy:', FUSION_ENGINE?.decisionImpact?.confidencePolicy);
    
    return (
  <motion.section
    key="slide5"
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
              {FUSION_ENGINE.title}
            </h1>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="text-yellow-400" size={80} />
            </motion.div>
          </div>
          <h2 className={`${SIZES.text["4xl"]} md:${SIZES.text["6xl"]} font-bold ${COLORS.text.primary}`}>
            {FUSION_ENGINE.subtitle}
          </h2>
          <p className={`${SIZES.text["2xl"]} md:${SIZES.text["4xl"]} font-light ${COLORS.text.secondary} max-w-4xl mx-auto leading-relaxed`}>
            {FUSION_ENGINE.description}
          </p>
        </motion.div>

        {/* Before/After Comparison */}
        <motion.div
          className={`${LAYOUT.grid["2col"]} gap-8 max-w-5xl mx-auto`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.div
            className="bg-gradient-to-br from-red-500/20 to-orange-500/20 p-8 rounded-xl border border-red-500/30"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">❌</div>
              <h3 className={`${SIZES.text["2xl"]} font-bold text-red-400`}>{FUSION_ENGINE.beforeAfter.before.title}</h3>
            </div>
            <div className={SIZES.spacing.sm}>
              {FUSION_ENGINE.beforeAfter.before.points.map((point, index) => (
                <p key={index} className={`${SIZES.text.lg} ${COLORS.text.secondary}`}>• {point}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 p-8 rounded-xl border border-green-500/30"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">✅</div>
              <h3 className={`${SIZES.text["2xl"]} font-bold text-green-400`}>{FUSION_ENGINE.beforeAfter.after.title}</h3>
            </div>
            <div className={SIZES.spacing.sm}>
              {FUSION_ENGINE.beforeAfter.after.points.map((point, index) => (
                <p key={index} className={`${SIZES.text.lg} ${COLORS.text.secondary}`}>• {point}</p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className={`${LAYOUT.grid["2col"]} gap-8 max-w-6xl mx-auto`}>
        <div className={SIZES.spacing.md}>
          <h3 className={`${SIZES.text["2xl"]} font-bold ${COLORS.text.primary} mb-6`}>{FUSION_ENGINE.researchSnapshot.title}</h3>

          <div className={`${COMPONENT_STYLES.card.base} ${SIZES.padding.md} rounded-2xl`}>
            <h4 className={`${SIZES.text.xl} font-semibold text-cyan-400 mb-4`}>{FUSION_ENGINE.researchSnapshot.demoRuns.title}</h4>
            <div className={`${SIZES.spacing.sm} ${SIZES.text.sm}`}>
              {FUSION_ENGINE.researchSnapshot.demoRuns.points.map((point, index) => (
                <p key={index} className={COLORS.text.secondary}>• {point}</p>
              ))}
            </div>
            <p className={`${SIZES.text.sm} ${COLORS.text.tertiary} mt-3`}>{FUSION_ENGINE.researchSnapshot.demoRuns.note}</p>
          </div>

          <div className={`${COMPONENT_STYLES.card.base} ${SIZES.padding.md} rounded-2xl`}>
            <h4 className={`${SIZES.text.xl} font-semibold text-orange-400 mb-4`}>{FUSION_ENGINE.researchSnapshot.mmTargets.title}</h4>
            <div className={`${SIZES.spacing.sm} ${SIZES.text.sm}`}>
              {FUSION_ENGINE.researchSnapshot.mmTargets.genes.map((gene, index) => (
                <div key={index} className={`${COLORS.background.tertiary} ${SIZES.padding.sm} rounded-lg`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-green-400 font-semibold">{gene.name}</span>
                    <span className="text-xs text-purple-300">{gene.hotspots}</span>
                  </div>
                  <p className={COLORS.text.secondary}>{gene.guidance}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={SIZES.spacing.md}>
          <h3 className={`${SIZES.text["2xl"]} font-bold ${COLORS.text.primary} mb-6`}>{FUSION_ENGINE.decisionImpact.title}</h3>

          <div className={`${COMPONENT_STYLES.card.base} ${SIZES.padding.md} rounded-2xl`}>
            <h4 className={`${SIZES.text.lg} font-semibold text-red-400 mb-3`}>{FUSION_ENGINE.decisionImpact.before.title}</h4>
            <div className={`${SIZES.spacing.xs} ${SIZES.text.sm}`}>
              <p className={COLORS.text.secondary}><strong>Evo2 Score:</strong> {FUSION_ENGINE.decisionImpact.before.score}</p>
              <p className="text-red-400"><strong>Guidance:</strong> {FUSION_ENGINE.decisionImpact.before.guidance}</p>
              <p className="text-red-400"><strong>Confidence:</strong> {FUSION_ENGINE.decisionImpact.before.confidence}</p>
            </div>
          </div>

          <ArrowRight size={32} className="text-slate-400 mx-auto" />

          <div className={`${COMPONENT_STYLES.card.base} ${SIZES.padding.md} rounded-2xl`}>
            <h4 className={`${SIZES.text.lg} font-semibold text-green-400 mb-3`}>{FUSION_ENGINE.decisionImpact.after.title}</h4>
            <div className={`${SIZES.spacing.xs} ${SIZES.text.sm}`}>
              <p className={COLORS.text.secondary}><strong>Fused Score:</strong> {FUSION_ENGINE.decisionImpact.after.score}</p>
              <p className="text-green-400"><strong>Guidance:</strong> {FUSION_ENGINE.decisionImpact.after.guidance}</p>
              <p className="text-green-400"><strong>Confidence:</strong> {FUSION_ENGINE.decisionImpact.after.confidence}</p>
              <p className={`text-xs text-purple-300 mt-1`}><code>{FUSION_ENGINE.decisionImpact.after.formula}</code></p>
            </div>
          </div>

          {FUSION_ENGINE.decisionImpact.confidencePolicy && (
            <div className={`${COLORS.background.secondary} ${SIZES.padding.md} rounded-lg border ${COLORS.border.primary}`}>
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

          <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 p-4 rounded-lg border border-slate-600">
            <p className={`${SIZES.text.sm} ${COLORS.text.secondary} text-center`}>
              <strong>Impact (research‑mode):</strong> {FUSION_ENGINE.decisionImpact.impact}
            </p>
          </div>
        </div>
      </div>

      <div className={`${SIZES.margin.lg} ${COMPONENT_STYLES.card.base} ${SIZES.padding.lg} rounded-2xl text-center`}>
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

        <div className={`${SIZES.margin.md} ${LAYOUT.grid["2col"]} gap-6`}>
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 p-4 rounded-lg border border-red-500/30">
            <h4 className="text-red-400 font-semibold mb-2">Before {FUSION_ENGINE.title.split(':')[0]}</h4>
            <p className={`${COLORS.text.secondary} ${SIZES.text.sm}`}>{FUSION_ENGINE.frameworkPower.comparison.before}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 p-4 rounded-lg border border-green-500/30">
            <h4 className="text-green-400 font-semibold mb-2">After {FUSION_ENGINE.title.split(':')[0]}</h4>
            <p className={`${COLORS.text.secondary} ${SIZES.text.sm}`}>{FUSION_ENGINE.frameworkPower.comparison.after}</p>
          </div>
        </div>

        <div className={`${SIZES.margin.md} p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-slate-600`}>
          <p className={`${SIZES.text.lg} ${COLORS.text.secondary}`}>
            <strong>Impact (research‑mode):</strong> {FUSION_ENGINE.frameworkPower.finalImpact}
          </p>
        </div>
      </div>
    </div>
  </motion.section>
  );
};

export default SPEChemotherapySlide;

