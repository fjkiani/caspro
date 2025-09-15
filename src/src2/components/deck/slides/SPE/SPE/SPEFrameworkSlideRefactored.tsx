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

const SPEFrameworkSlideRefactored = () => (
    <motion.section
        key="slide7"
        {...SLIDE_ANIMATIONS.slide}
        className={`${LAYOUT.container} ${COLORS.background.primary} ${COLORS.text.primary}`}
    >
        <DigitalSynapseBackground />
        <div className={LAYOUT.content}>
            <div className={SIZES.spacing.md}>
                <h1 className={`${SIZES.text["5xl"]} md:${SIZES.text["7xl"]} font-black ${GRADIENTS.title.purple}`}>
                    {SPE_FRAMEWORK.title}
                </h1>
                <p className={`${SIZES.text["2xl"]} md:${SIZES.text["3xl"]} font-light ${COLORS.text.secondary}`}>
                    Sequence + Pathway + Evidence → Clear guidance
                </p>
            </div>

            <div className={`${LAYOUT.grid["3col"]} gap-8 max-w-5xl mx-auto text-left`}>
                {/* Sequence Component */}
                <motion.div
                    className={COMPONENT_STYLES.card.base}
                    {...SLIDE_ANIMATIONS.frameworkComponents.sequence}
                    whileHover={SLIDE_ANIMATIONS.hover}
                >
                    <motion.div
                        className={`absolute inset-0 z-0 opacity-10 blur-xl ${GRADIENTS.glow.sky}`}
                        {...SLIDE_ANIMATIONS.continuous.glow}
                    />
                    <div className="relative z-10 flex items-start space-x-4">
                        <motion.div {...SLIDE_ANIMATIONS.continuous.rotate}>
                            <Dna size={48} className={`text-${SPE_FRAMEWORK.components.sequence.color}-400 flex-shrink-0`} />
                        </motion.div>
                        <div>
                            <motion.h3
                                className={`${SIZES.text["2xl"]} font-bold ${COLORS.text.primary} mb-2`}
                                {...SLIDE_ANIMATIONS.componentContent.title}
                            >
                                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${GRADIENTS.title.sky}`}>
                                    {SPE_FRAMEWORK.components.sequence.title}:
                                </span> Sequence signal
                            </motion.h3>
                            <motion.p
                                className={`${SIZES.text.lg} ${COLORS.text.secondary}`}
                                {...SLIDE_ANIMATIONS.componentContent.description}
                            >
                                What the DNA change suggests by itself. Plain, strong/weak signal you can understand at a glance.
                            </motion.p>
                            <div className={`${SIZES.margin.sm} ${SIZES.padding.sm} ${COLORS.background.tertiary} rounded-lg border ${COLORS.border.secondary}`}>
                                <p className={`${SIZES.text.sm} font-semibold text-${SPE_FRAMEWORK.components.sequence.color}-400`}>Example</p>
                                <p className={`${SIZES.text.sm} ${COLORS.text.secondary}`}>TP53 change → strong disruption signal</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Pathway Component */}
                <motion.div
                    className={COMPONENT_STYLES.card.base}
                    {...SLIDE_ANIMATIONS.frameworkComponents.pathway}
                    whileHover={SLIDE_ANIMATIONS.hover}
                >
                    <motion.div
                        className={`absolute inset-0 z-0 opacity-10 blur-xl ${GRADIENTS.glow.purple}`}
                        {...SLIDE_ANIMATIONS.continuous.glow}
                    />
                    <div className="relative z-10 flex items-start space-x-4">
                        <motion.div {...SLIDE_ANIMATIONS.continuous.scale}>
                            <GitBranch size={48} className={`text-${SPE_FRAMEWORK.components.pathway.color}-400 flex-shrink-0`} />
                        </motion.div>
                        <div>
                            <motion.h3
                                className={`${SIZES.text["2xl"]} font-bold ${COLORS.text.primary} mb-2`}
                                {...SLIDE_ANIMATIONS.componentContent.title}
                            >
                                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${GRADIENTS.title.purple}`}>
                                    {SPE_FRAMEWORK.components.pathway.title}:
                                </span> Biology fit
                            </motion.h3>
                            <motion.p
                                className={`${SIZES.text.lg} ${COLORS.text.secondary}`}
                                {...SLIDE_ANIMATIONS.componentContent.description}
                            >
                                How well does this change fit what we know about the disease biology and pathways?
                            </motion.p>
                            <div className={`${SIZES.margin.sm} ${SIZES.padding.sm} ${COLORS.background.tertiary} rounded-lg border ${COLORS.border.secondary}`}>
                                <p className={`${SIZES.text.sm} font-semibold text-${SPE_FRAMEWORK.components.pathway.color}-400`}>Example</p>
                                <p className={`${SIZES.text.sm} ${COLORS.text.secondary}`}>RAS pathway change → fits cancer biology</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Evidence Component */}
                <motion.div
                    className={COMPONENT_STYLES.card.base}
                    {...SLIDE_ANIMATIONS.frameworkComponents.evidence}
                    whileHover={SLIDE_ANIMATIONS.hover}
                >
                    <motion.div
                        className={`absolute inset-0 z-0 opacity-10 blur-xl ${GRADIENTS.glow.green}`}
                        {...SLIDE_ANIMATIONS.continuous.glow}
                    />
                    <div className="relative z-10 flex items-start space-x-4">
                        <motion.div {...SLIDE_ANIMATIONS.continuous.scale}>
                            <FileText size={48} className={`text-${SPE_FRAMEWORK.components.evidence.color}-400 flex-shrink-0`} />
                        </motion.div>
                        <div>
                            <motion.h3
                                className={`${SIZES.text["2xl"]} font-bold ${COLORS.text.primary} mb-2`}
                                {...SLIDE_ANIMATIONS.componentContent.title}
                            >
                                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${GRADIENTS.title.green}`}>
                                    {SPE_FRAMEWORK.components.evidence.title}:
                                </span> Clinical validation
                            </motion.h3>
                            <motion.p
                                className={`${SIZES.text.lg} ${COLORS.text.secondary}`}
                                {...SLIDE_ANIMATIONS.componentContent.description}
                            >
                                What does the literature and clinical data say about this type of change?
                            </motion.p>
                            <div className={`${SIZES.margin.sm} ${SIZES.padding.sm} ${COLORS.background.tertiary} rounded-lg border ${COLORS.border.secondary}`}>
                                <p className={`${SIZES.text.sm} font-semibold text-${SPE_FRAMEWORK.components.evidence.color}-400`}>Example</p>
                                <p className={`${SIZES.text.sm} ${COLORS.text.secondary}`}>BRAF V600E → well-documented in literature</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </motion.section>
);

export default SPEFrameworkSlideRefactored;