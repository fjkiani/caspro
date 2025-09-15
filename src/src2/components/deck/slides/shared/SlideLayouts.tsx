import React from 'react';
import { motion } from 'framer-motion';
import { createStandardSlide } from './SlideComponents';
import DigitalSynapseBackground from '../../../site/blocks/DigitalSynapseBackground';

// 🎨 LAYOUT PATTERNS BASED ON ANALYSIS

// 1. HERO INTRO LAYOUT (SPEIntroSlide, SPEAchievementSlide)
export const createHeroIntroSlide = (config: {
  title: string;
  subtitle: string;
  description?: string;
  problem?: { title: string; description: string };
  solution?: { title: string; description: string };
  framework?: {
    components: Array<{ letter: string; name: string; description: string; color: string }>;
  };
  metrics?: Array<{ value: string; label: string; color: string }>;
}) => createStandardSlide({
  title: config.title,
  subtitle: config.subtitle,
  gradient: "from-teal-400 to-green-400",
  backgroundComponent: <DigitalSynapseBackground />,

  content: (
    <div className="space-y-8">
      {config.description && (
        <p className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
          {config.description}
        </p>
      )}

      {(config.problem || config.solution) && (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mt-12">
          {config.problem && (
            <motion.div
              className="text-center space-y-4"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-red-400">{config.problem.title}</h3>
              <p className="text-lg text-slate-300 max-w-md">{config.problem.description}</p>
            </motion.div>
          )}

          {config.solution && (
            <motion.div
              className="text-center space-y-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-green-400">{config.solution.title}</h3>
              <p className="text-lg text-slate-300 max-w-md">{config.solution.description}</p>
            </motion.div>
          )}
        </div>
      )}

      {config.framework && (
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg text-center">
          <p className="text-xl font-semibold text-slate-200 mb-3">{config.framework.components[0]?.letter}/{config.framework.components[1]?.letter}/{config.framework.components[2]?.letter} Framework: {config.framework.components.map(c => c.name).join(' + ')} = Therapeutic Validation</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {config.framework.components.map((component, index) => (
              <div key={index} className={`bg-${component.color}-500/20 p-3 rounded-lg border border-${component.color}-500/30`}>
                <span className={`text-${component.color}-400 font-bold text-lg`}>{component.letter}</span>
                <p className="text-slate-300 mt-1">{component.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {config.metrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {config.metrics.map((metric, index) => (
            <div key={index} className={`bg-slate-700/50 p-4 rounded-lg border border-slate-600 text-center`}>
              <p className={`text-2xl font-bold text-${metric.color}-400`}>{metric.value}</p>
              <p className="text-sm text-slate-300">{metric.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
});

// 2. AUDIENCE VALUE PROP LAYOUT (SPEForCliniciansSlide, SPEForBiotechsSlide)
export const createAudienceValuePropSlide = (config: {
  title: string;
  audience: string;
  valueProp: string;
  steps: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  benefits: Array<{
    value: string;
    label: string;
    color: string;
  }>;
  quote?: string;
}) => createStandardSlide({
  title: config.title,
  subtitle: `For ${config.audience}`,
  gradient: config.audience === 'Clinicians' ? "from-blue-400 to-indigo-400" : "from-red-500 to-orange-500",
  backgroundComponent: <DigitalSynapseBackground />,

  content: (
    <div className="space-y-8">
      <p className="text-xl md:text-2xl font-light text-slate-300 max-w-4xl mx-auto leading-relaxed">
        {config.valueProp}
      </p>

      <div className="flex flex-col lg:flex-row items-center justify-around w-full mt-12">
        {config.steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center space-y-3 text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-lg w-full lg:w-1/3 mb-8 lg:mb-0"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.3 }}
          >
            <div className="p-4 rounded-full text-blue-500">
              <span className="text-4xl">{step.icon}</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-200">{step.title}</h3>
            <p className="text-lg text-slate-300">{step.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg text-center">
        <p className="text-xl font-semibold text-slate-200 mb-4">Business Impact</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {config.benefits.map((benefit, index) => (
            <div key={index} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
              <p className={`text-2xl font-bold text-${benefit.color}-400`}>{benefit.value}</p>
              <p className="text-sm text-slate-300">{benefit.label}</p>
            </div>
          ))}
        </div>
      </div>

      {config.quote && (
        <p className="text-xl text-slate-300 max-w-4xl mx-auto border-l-4 border-red-500 pl-6 text-left mt-12">
          {config.quote}
        </p>
      )}
    </div>
  )
});

// 3. CASE STUDY LAYOUT (SPEMultipleMyelomaSlide, SPEOvarianCancerSlide, SPEMelanomaSlide)
export const createCaseStudySlide = (config: {
  title: string;
  disease: string;
  description: string;
  components: Array<{
    icon: React.ComponentType<any>;
    title: string;
    description: string;
  }>;
  jsonOutput?: string;
  explanation?: Array<{
    icon: React.ComponentType<any>;
    title: string;
    description: string;
  }>;
}) => createStandardSlide({
  title: config.title,
  subtitle: `${config.disease} Case Study`,
  gradient: "from-red-500 to-purple-500",
  backgroundComponent: <DigitalSynapseBackground />,

  content: (
    <div className="space-y-8">
      <p className="text-xl md:text-2xl font-light text-slate-300 max-w-4xl mx-auto leading-relaxed">
        {config.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
        {config.components.map((component, index) => (
          <div key={index} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg flex flex-col items-center text-center">
            <component.icon size={48} className="text-blue-500 mb-4" />
            <h3 className="text-2xl font-bold text-slate-200 mb-2">{component.title}</h3>
            <p className="text-lg text-slate-300">{component.description}</p>
          </div>
        ))}
      </div>

      {config.jsonOutput && (
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto items-start">
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg w-full lg:w-1/2 overflow-x-auto text-left">
            <h3 className="text-2xl font-bold text-slate-200 mb-4">Live JSON Output</h3>
            <pre className="text-sm md:text-base text-slate-300 bg-slate-700 p-4 rounded-lg overflow-x-auto">
              <code>{config.jsonOutput}</code>
            </pre>
          </div>

          {config.explanation && (
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg w-full lg:w-1/2 text-left">
              <h3 className="text-2xl font-bold text-slate-200 mb-4">Why This Output Matters</h3>
              <div className="space-y-4">
                {config.explanation.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <item.icon size={48} className="text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-xl text-slate-200">{item.title}</h4>
                      <p className="text-lg text-slate-300 mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
});

// 4. FRAMEWORK EXPLANATION LAYOUT (SPEFrameworkSlide)
export const createFrameworkExplanationSlide = (config: {
  title: string;
  framework: string;
  components: Array<{
    letter: string;
    name: string;
    icon: React.ComponentType<any>;
    description: string;
    color: string;
    example?: string;
  }>;
  clinicalExample?: {
    prediction: string;
    confidence: string;
    evidence: string;
  };
}) => createStandardSlide({
  title: config.title,
  subtitle: config.framework,
  gradient: "from-purple-400 to-pink-400",
  backgroundComponent: <DigitalSynapseBackground />,

  content: (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
        {config.components.map((component, index) => (
          <motion.div
            key={index}
            className={`relative p-6 rounded-2xl border border-slate-700 shadow-lg bg-slate-800/50 overflow-hidden group cursor-pointer`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <motion.div
              className={`absolute inset-0 z-0 opacity-10 blur-xl bg-gradient-to-br from-${component.color}-500 to-${component.color}-600`}
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
            />
            <div className="relative z-10 flex items-start space-x-4">
              <motion.div
                animate={index === 1 ? { scale: [1, 1.1, 1] } : index === 2 ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: index === 1 ? 3 : 6, repeat: Infinity, delay: index * 2 }}
              >
                <component.icon size={48} className={`text-${component.color}-400 flex-shrink-0`} />
              </motion.div>
              <div>
                <motion.h3
                  className="text-2xl font-bold text-slate-200 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                >
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r from-${component.color}-400 to-${component.color}-500`}>{component.letter}:</span> {component.name}
                </motion.h3>
                <motion.p
                  className="text-lg text-slate-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.2 }}
                >
                  {component.description}
                </motion.p>
                {component.example && (
                  <div className="mt-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                    <p className={`text-sm font-semibold text-${component.color}-400`}>Example: {component.example}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {config.clinicalExample && (
        <div className="md:col-span-1 lg:col-span-3 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg text-left mt-12">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔒</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-200 mb-2">Clinical Decision Engine</h3>
              <p className="text-lg text-slate-300">Combines {config.framework} into treatment recommendations with confidence scores and auditable evidence manifests.</p>
              <div className="mt-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <p className="text-sm font-semibold text-slate-200">Example Output:</p>
                <p className="text-sm text-slate-300"><strong>Prediction:</strong> {config.clinicalExample.prediction}</p>
                <p className="text-sm text-slate-300"><strong>Confidence:</strong> {config.clinicalExample.confidence}</p>
                <p className="text-sm text-slate-300"><strong>Evidence:</strong> {config.clinicalExample.evidence}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
});

// 5. EVIDENCE PRINCIPLES LAYOUT (SPEEvidenceDoctrineSlide)
export const createEvidencePrinciplesSlide = (config: {
  title: string;
  principles: Array<{
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    details?: Array<{ label: string; value: string }>;
  }>;
  metrics: Array<{ value: string; label: string; color: string }>;
}) => createStandardSlide({
  title: config.title,
  subtitle: "Clinical-Grade Predictions with Full Transparency",
  gradient: "from-red-500 to-purple-500",
  backgroundComponent: <DigitalSynapseBackground />,

  content: (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto text-left">
        {config.principles.map((principle, index) => (
          <div key={index} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg">
            <principle.icon size={48} className="text-blue-500 mb-4" />
            <h3 className="text-2xl font-bold text-slate-200 mb-2">{principle.title}</h3>
            <p className="text-lg text-slate-300">{principle.description}</p>
            {principle.details && (
              <div className="mt-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                <p className="text-sm font-semibold text-blue-400">Key Points</p>
                {principle.details.map((detail, idx) => (
                  <p key={idx} className="text-sm text-slate-300">{detail.label}: {detail.value}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg text-center">
        <p className="text-xl font-semibold text-slate-200 mb-4">Clinical-Grade Assurance</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {config.metrics.map((metric, index) => (
            <div key={index} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
              <p className={`text-2xl font-bold text-${metric.color}-400`}>{metric.value}</p>
              <p className="text-sm text-slate-300">{metric.label}</p>
            </div>
          ))}
        </div>
        <p className="text-lg text-slate-300 mt-4">Every prediction is <strong>clinically safe, fully auditable, and reproducible</strong></p>
      </div>
    </div>
  )
});

// 6. PROCESS PIPELINE LAYOUT (SPEChemotherapySlide, SPEPredictionPipelineSlide)
export const createProcessPipelineSlide = (config: {
  title: string;
  pipeline: Array<{
    stage: string;
    title: string;
    description: string;
    color: string;
    details?: Array<{ label: string; value: string }>;
  }>;
  results?: Array<{
    title: string;
    metrics: Array<{ label: string; value: string; color: string }>;
  }>;
  clinicalImpact?: string;
}) => createStandardSlide({
  title: config.title,
  subtitle: "SOTA Prediction Pipeline",
  gradient: "from-sky-400 to-cyan-400",
  backgroundComponent: <DigitalSynapseBackground />,

  content: (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-200 mb-6">Fusion Engine Workflow</h3>

          {config.pipeline.map((stage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.3 }}
              className={`relative flex items-start space-x-4 p-6 bg-slate-800/50 rounded-2xl border-l-4 border-${stage.color}-500 shadow-lg`}
            >
              <div className={`w-12 h-12 bg-${stage.color}-500/20 rounded-full flex items-center justify-center`}>
                <span className="text-2xl font-bold text-white">{stage.stage}</span>
              </div>
              <div className="text-left flex-1">
                <h4 className="text-xl font-bold text-slate-200 mb-2">{stage.title}</h4>
                <p className="text-slate-300 text-sm">{stage.description}</p>
                {stage.details && (
                  <div className="mt-2 space-y-1">
                    {stage.details.map((detail, idx) => (
                      <div key={idx} className="flex justify-between text-xs">
                        <span className="text-slate-400">{detail.label}:</span>
                        <span className="text-cyan-300">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          {config.results && config.results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.7 + index * 0.5 }}
              className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg"
            >
              <h4 className="text-xl font-semibold text-cyan-400 mb-4">{result.title}</h4>
              <div className="space-y-3">
                {result.metrics.map((metric, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-slate-400">{metric.label}:</span>
                    <span className={`text-${metric.color}-300 font-bold`}>{metric.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {config.clinicalImpact && (
        <div className="mt-8 bg-slate-800/50 p-8 rounded-2xl border border-slate-700 shadow-lg text-center">
          <p className="text-2xl font-semibold text-slate-200 mb-6">Clinical Impact</p>
          <p className="text-lg text-slate-300">{config.clinicalImpact}</p>
        </div>
      )}
    </div>
  )
});


