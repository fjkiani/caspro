import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
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

const SPEChemotherapySlidePart1 = () => {
    console.log('SPEChemotherapySlidePart1 - FUSION_ENGINE:', FUSION_ENGINE);
    
    return (
  <motion.section
    key="slide5-part1"
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
              <Zap size={64} className="text-yellow-400" />
            </motion.div>
          </div>
          <p className={`${SIZES.text["2xl"]} ${COLORS.text.secondary} max-w-4xl mx-auto`}>
            {FUSION_ENGINE.subtitle}
          </p>
          <p className={`${SIZES.text.lg} ${COLORS.text.tertiary} max-w-3xl mx-auto`}>
            {FUSION_ENGINE.description}
          </p>
        </motion.div>
      </div>

      {/* Before vs After Comparison */}
      <motion.div
        className={`${LAYOUT.grid["2col"]} gap-8 ${SIZES.margin.lg}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className={`${COMPONENT_STYLES.card.base} ${SIZES.padding.lg} rounded-2xl`}>
          <h3 className={`${SIZES.text["2xl"]} font-bold ${COLORS.text.primary} mb-4`}>
            {FUSION_ENGINE.beforeAfter.before.title}
          </h3>
          <ul className={`${SIZES.spacing.sm} ${SIZES.text.lg}`}>
            {FUSION_ENGINE.beforeAfter.before.points.map((point, index) => (
              <li key={index} className={`${COLORS.text.secondary} flex items-start`}>
                <span className="text-red-400 mr-2">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className={`${COMPONENT_STYLES.card.base} ${SIZES.padding.lg} rounded-2xl`}>
          <h3 className={`${SIZES.text["2xl"]} font-bold ${COLORS.text.primary} mb-4`}>
            {FUSION_ENGINE.beforeAfter.after.title}
          </h3>
          <ul className={`${SIZES.spacing.sm} ${SIZES.text.lg}`}>
            {FUSION_ENGINE.beforeAfter.after.points.map((point, index) => (
              <li key={index} className={`${COLORS.text.secondary} flex items-start`}>
                <span className="text-green-400 mr-2">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Research Snapshot */}
      <motion.div
        className={`${COMPONENT_STYLES.card.base} ${SIZES.padding.lg} rounded-2xl ${SIZES.margin.lg}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h3 className={`${SIZES.text["2xl"]} font-bold ${COLORS.text.primary} mb-6 text-center`}>
          {FUSION_ENGINE.researchSnapshot.title}
        </h3>
        
        <div className={`${LAYOUT.grid["2col"]} gap-8`}>
          <div className={`${COLORS.background.secondary} ${SIZES.padding.md} rounded-lg border ${COLORS.border.primary}`}>
            <h4 className={`${SIZES.text.lg} font-semibold text-cyan-400 mb-3`}>
              {FUSION_ENGINE.researchSnapshot.demoRuns.title}
            </h4>
            <ul className={`${SIZES.spacing.xs} text-sm`}>
              {FUSION_ENGINE.researchSnapshot.demoRuns.points.map((point, index) => (
                <li key={index} className={`${COLORS.text.secondary} flex items-start`}>
                  <span className="text-cyan-400 mr-2">•</span>
                  {point}
                </li>
              ))}
            </ul>
            <p className={`${SIZES.text.xs} text-purple-300 mt-3 italic`}>
              {FUSION_ENGINE.researchSnapshot.demoRuns.note}
            </p>
          </div>

          <div className={`${COLORS.background.secondary} ${SIZES.padding.md} rounded-lg border ${COLORS.border.primary}`}>
            <h4 className={`${SIZES.text.lg} font-semibold text-green-400 mb-3`}>
              {FUSION_ENGINE.researchSnapshot.mmTargets.title}
            </h4>
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
      </motion.div>
    </div>
  </motion.section>
  );
};

export default SPEChemotherapySlidePart1;
