import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Eye, Target, CheckCircle } from 'lucide-react';
import DigitalSynapseBackground from '../../../../site/blocks/DigitalSynapseBackground.tsx';
import { MetricCard, FeatureHighlight } from '../../shared/SlideComponents';
import { 
  CRISPRO_BRANDING,
  HERO_METRICS,
  KEY_DIFFERENTIATORS,
  DIFFERENTIATORS_EXTENDED,
  SLIDE_ANIMATIONS, 
  COLORS, 
  GRADIENTS, 
  SIZES, 
  LAYOUT,
  COMPONENT_STYLES 
} from './constants';

const SPEDifferentiatorsSlide = () => (
  <motion.section
    key="slide8"
    {...SLIDE_ANIMATIONS.slide}
    className={`${LAYOUT.container} ${COLORS.background.primary} ${COLORS.text.primary}`}
  >
    <DigitalSynapseBackground />
    <div className={LAYOUT.content}>
      <div className={SIZES.spacing.md}>
        <motion.div
          className="text-center space-y-4"
          {...SLIDE_ANIMATIONS.differentiators.header}
        >
          <h1 className={`${SIZES.text["6xl"]} md:${SIZES.text["8xl"]} font-black text-transparent bg-clip-text ${GRADIENTS.title.cyan} leading-tight`}>
            {CRISPRO_BRANDING.name}
          </h1>
          <h2 className={`${SIZES.text["4xl"]} md:${SIZES.text["6xl"]} font-bold ${COLORS.text.primary}`}>
            Differentiators
          </h2>
          <p className={`${SIZES.text["2xl"]} md:${SIZES.text["4xl"]} font-light ${COLORS.text.secondary} max-w-4xl mx-auto leading-relaxed`}>
            {CRISPRO_BRANDING.tagline}
          </p>
        </motion.div>

        {/* Hero Metrics */}
        <motion.div
          className={`${LAYOUT.grid["3col"]} gap-6 max-w-5xl mx-auto`}
          {...SLIDE_ANIMATIONS.heroMetrics.container}
        >
          <MetricCard
            value={HERO_METRICS.modelProfiles.value}
            label={HERO_METRICS.modelProfiles.label}
            change={HERO_METRICS.modelProfiles.change}
            color={HERO_METRICS.modelProfiles.color}
          />
          <MetricCard
            value={HERO_METRICS.insightSignals.value}
            label={HERO_METRICS.insightSignals.label}
            change={HERO_METRICS.insightSignals.change}
            color={HERO_METRICS.insightSignals.color}
          />
          <MetricCard
            value={HERO_METRICS.provenance.value}
            label={HERO_METRICS.provenance.label}
            change={HERO_METRICS.provenance.change}
            color={HERO_METRICS.provenance.color}
          />
        </motion.div>
      </div>

      {/* Key Differentiators */}
      <motion.div
        className={SIZES.spacing.lg}
        {...SLIDE_ANIMATIONS.differentiators.content}
      >
        <div className="text-center">
          <h3 className={`${SIZES.text["3xl"]} md:${SIZES.text["4xl"]} font-bold ${COLORS.text.primary} mb-8`}>
            {KEY_DIFFERENTIATORS.sectionTitle}
          </h3>
        </div>

        <div className={LAYOUT.grid["2col"]}>
          <FeatureHighlight
            icon={Zap}
            title={KEY_DIFFERENTIATORS.fusedApproach.title}
            description={KEY_DIFFERENTIATORS.fusedApproach.description}
            color={KEY_DIFFERENTIATORS.fusedApproach.color}
            metrics={KEY_DIFFERENTIATORS.fusedApproach.metrics}
          />

          <FeatureHighlight
            icon={Eye}
            title={KEY_DIFFERENTIATORS.transparency.title}
            description={KEY_DIFFERENTIATORS.transparency.description}
            color={KEY_DIFFERENTIATORS.transparency.color}
            metrics={KEY_DIFFERENTIATORS.transparency.metrics}
          />

          <FeatureHighlight
            icon={Target}
            title={KEY_DIFFERENTIATORS.actionableGuidance.title}
            description={KEY_DIFFERENTIATORS.actionableGuidance.description}
            color={KEY_DIFFERENTIATORS.actionableGuidance.color}
            metrics={KEY_DIFFERENTIATORS.actionableGuidance.metrics}
          />

          <FeatureHighlight
            icon={CheckCircle}
            title={KEY_DIFFERENTIATORS.pragmaticInfrastructure.title}
            description={KEY_DIFFERENTIATORS.pragmaticInfrastructure.description}
            color={KEY_DIFFERENTIATORS.pragmaticInfrastructure.color}
            metrics={KEY_DIFFERENTIATORS.pragmaticInfrastructure.metrics}
          />
        </div>
      </motion.div>

      {/* Practical Implications */}
      <motion.div
        className={SIZES.spacing.lg}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="text-center">
          <h3 className={`${SIZES.text["4xl"]} md:${SIZES.text["5xl"]} font-bold ${COLORS.text.primary} mb-4`}>
            {DIFFERENTIATORS_EXTENDED.realWorldImpact.title}
          </h3>
          <p className={`${SIZES.text.xl} md:${SIZES.text["2xl"]} ${COLORS.text.secondary} max-w-4xl mx-auto leading-relaxed`}>
            {DIFFERENTIATORS_EXTENDED.realWorldImpact.subtitle}
          </p>
        </div>

        {/* Key Statistics */}
        <div className={`${LAYOUT.grid["responsive"]} gap-4 max-w-6xl mx-auto`}>
          {DIFFERENTIATORS_EXTENDED.keyStatistics.map((stat, index) => (
            <MetricCard
              key={index}
              value={stat.value}
              label={stat.label}
              change={stat.change}
              color={stat.color}
              size="small"
            />
          ))}
        </div>

        <div className={LAYOUT.grid["2col"]}>
          {/* Key MM Genes */}
          <div className={SIZES.spacing.md}>
            <h4 className={`${SIZES.text["2xl"]} font-bold text-cyan-400 mb-6 text-center`}>{DIFFERENTIATORS_EXTENDED.mmDriverGenes.title}</h4>

            {DIFFERENTIATORS_EXTENDED.mmDriverGenes.genes.map((gene, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 p-6 rounded-xl border border-green-500/30"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`${SIZES.text.xl} font-bold text-green-400`}>{gene.name}</span>
                  <span className="text-sm text-purple-300 bg-purple-500/20 px-2 py-1 rounded">{gene.pathway}</span>
                </div>
                <p className={`${SIZES.text.lg} ${COLORS.text.secondary} mb-3 leading-relaxed`}>
                  <strong>Hotspots:</strong> {gene.hotspots}
                </p>
                <p className={`${SIZES.text.base} text-green-300 font-medium`}>
                  {gene.guidance}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Clinical Workflow */}
          <div className={SIZES.spacing.md}>
            <h4 className={`${SIZES.text["3xl"]} font-bold text-purple-400 mb-6 text-center`}>{DIFFERENTIATORS_EXTENDED.clinicalWorkflow.title}</h4>

            <motion.div
              className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 p-8 rounded-xl border border-green-500/30"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <p className={`${SIZES.text.xl} font-bold text-green-400`}>{DIFFERENTIATORS_EXTENDED.clinicalWorkflow.amCovered.title}</p>
              </div>
              <div className={`${SIZES.spacing.sm} ml-6`}>
                {DIFFERENTIATORS_EXTENDED.clinicalWorkflow.amCovered.steps.map((step, index) => (
                  <p key={index} className={`${SIZES.text.lg} ${COLORS.text.secondary}`}>{index + 1}. <strong>{step.split(':')[0]}:</strong> {step.split(':')[1]}</p>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-r from-slate-500/20 to-slate-400/20 p-8 rounded-xl border border-slate-500/30"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                <p className={`${SIZES.text.xl} font-bold text-slate-400`}>{DIFFERENTIATORS_EXTENDED.clinicalWorkflow.amAbsent.title}</p>
              </div>
              <div className={`${SIZES.spacing.sm} ml-6`}>
                {DIFFERENTIATORS_EXTENDED.clinicalWorkflow.amAbsent.steps.map((step, index) => (
                  <p key={index} className={`${SIZES.text.lg} ${COLORS.text.secondary}`}>{index + 1}. <strong>{step.split(':')[0]}:</strong> {step.split(':')[1]}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Chemotherapy Classes */}
        <motion.div
          className={SIZES.spacing.md}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <div className="text-center">
            <h4 className={`${SIZES.text["3xl"]} md:${SIZES.text["4xl"]} font-bold text-orange-400 mb-4`}>{DIFFERENTIATORS_EXTENDED.chemotherapyIntegration.title}</h4>
            <p className={`${SIZES.text.xl} ${COLORS.text.secondary} max-w-3xl mx-auto`}>{DIFFERENTIATORS_EXTENDED.chemotherapyIntegration.subtitle}</p>
          </div>

          <div className={`${LAYOUT.grid["3col"]} gap-6`}>
            {DIFFERENTIATORS_EXTENDED.chemotherapyIntegration.classes.map((chemClass, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-orange-500/20 to-red-500/20 p-8 rounded-xl border border-orange-500/30 text-center"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h5 className={`${SIZES.text["2xl"]} font-bold text-orange-400 mb-4`}>{chemClass.name}</h5>
                <div className={`${SIZES.spacing.xs} mb-4`}>
                  <p className={`${SIZES.text.lg} ${COLORS.text.secondary}`}>{chemClass.description}</p>
                </div>
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <p className={`${SIZES.text.base} text-green-400 font-semibold`}>Enhanced targeting precision</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Roll-out Strategy */}
        <motion.div
          className={SIZES.spacing.md}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="text-center">
            <h4 className={`${SIZES.text["3xl"]} md:${SIZES.text["4xl"]} font-bold text-cyan-400 mb-4`}>{DIFFERENTIATORS_EXTENDED.strategicRollout.title}</h4>
            <p className={`${SIZES.text.xl} ${COLORS.text.secondary} max-w-4xl mx-auto`}>{DIFFERENTIATORS_EXTENDED.strategicRollout.subtitle}</p>
          </div>

          <div className={`${LAYOUT.grid["3col"]} gap-6`}>
            {DIFFERENTIATORS_EXTENDED.strategicRollout.phases.map((phase, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 p-8 rounded-xl border border-green-500/30"
                whileHover={{ scale: 1.01 }}
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{phase.icon}</div>
                  <h5 className={`${SIZES.text.xl} font-bold text-green-400`}>{phase.title}</h5>
                </div>
                <p className={`${SIZES.text.lg} ${COLORS.text.secondary} leading-relaxed`}>
                  {phase.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-8 rounded-xl border border-slate-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <div className="text-center">
              <h5 className={`${SIZES.text["2xl"]} font-bold ${COLORS.text.primary} mb-4`}>{DIFFERENTIATORS_EXTENDED.strategicRollout.result.title}</h5>
              <p className={`${SIZES.text.xl} ${COLORS.text.secondary} leading-relaxed`}>
                {DIFFERENTIATORS_EXTENDED.strategicRollout.result.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* S/P/E Framework Explanation */}
      <div className={`${COMPONENT_STYLES.card.base} ${SIZES.padding.lg} rounded-2xl text-left`}>
        <h3 className={`${SIZES.text["2xl"]} font-bold ${COLORS.text.primary} mb-6 text-center`}>{DIFFERENTIATORS_EXTENDED.drugEfficacyContext.title}</h3>
        <div className={`${LAYOUT.grid["3col"]} gap-6`}>
          <div className="text-center">
            <h4 className={`${SIZES.text.lg} font-semibold text-cyan-400 mb-3`}>{DIFFERENTIATORS_EXTENDED.drugEfficacyContext.sequence.title}</h4>
            <p className={COLORS.text.secondary}>{DIFFERENTIATORS_EXTENDED.drugEfficacyContext.sequence.description}</p>
          </div>
          <div className="text-center">
            <h4 className={`${SIZES.text.lg} font-semibold text-purple-400 mb-3`}>{DIFFERENTIATORS_EXTENDED.drugEfficacyContext.pathway.title}</h4>
            <p className={COLORS.text.secondary}>{DIFFERENTIATORS_EXTENDED.drugEfficacyContext.pathway.description}</p>
          </div>
          <div className="text-center">
            <h4 className={`${SIZES.text.lg} font-semibold text-green-400 mb-3`}>{DIFFERENTIATORS_EXTENDED.drugEfficacyContext.evidence.title}</h4>
            <p className={COLORS.text.secondary}>{DIFFERENTIATORS_EXTENDED.drugEfficacyContext.evidence.description}</p>
          </div>
        </div>
        <div className={`${SIZES.margin.md} p-4 ${COLORS.background.tertiary} rounded-lg border ${COLORS.border.secondary}`}>
          <p className={`${COLORS.text.secondary} mb-3`}>
            <strong>{DIFFERENTIATORS_EXTENDED.drugEfficacyContext.confidenceMechanics.title}</strong> {DIFFERENTIATORS_EXTENDED.drugEfficacyContext.confidenceMechanics.description}
          </p>
          <div className={`${SIZES.spacing.xs} ${SIZES.text.sm}`}>
            {DIFFERENTIATORS_EXTENDED.drugEfficacyContext.confidenceMechanics.details.map((detail, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className={COLORS.text.tertiary}>{detail.label}</span>
                <span className="text-green-400">{detail.value}</span>
              </div>
            ))}
          </div>
          <p className={`text-xs ${COLORS.text.tertiary} mt-2`}>
            Provenance: <code className="text-cyan-400">{DIFFERENTIATORS_EXTENDED.drugEfficacyContext.confidenceMechanics.provenance}</code>
          </p>
        </div>
      </div>
    </div>
  </motion.section>
);

export default SPEDifferentiatorsSlide;
