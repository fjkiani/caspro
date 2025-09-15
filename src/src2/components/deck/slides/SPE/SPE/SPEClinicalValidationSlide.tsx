import React from 'react';
import { motion } from 'framer-motion';
import { createStandardSlide } from '../../shared/SlideComponents';
import DigitalSynapseBackground from '../../../../site/blocks/DigitalSynapseBackground.tsx';
import { 
  CLINICAL_VALIDATION,
  SLIDE_ANIMATIONS, 
  COLORS, 
  GRADIENTS, 
  SIZES, 
  LAYOUT,
  COMPONENT_STYLES 
} from './constants';

// Example of using the factory pattern for Slide 16 - Fixed property references
const SPEClinicalValidationSlide = createStandardSlide({
  title: CLINICAL_VALIDATION.title,
  subtitle: CLINICAL_VALIDATION.subtitle,
  gradient: "from-green-400 to-teal-400",
  backgroundComponent: <DigitalSynapseBackground />,
  metrics: CLINICAL_VALIDATION.validationMetrics,
  features: CLINICAL_VALIDATION.validationResults,
  content: (
    <div className={SIZES.spacing.md}>
      <div className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 p-6 rounded-xl border border-green-500/30">
        <h4 className={`${SIZES.text.xl} font-bold text-green-400 mb-4`}>{CLINICAL_VALIDATION.clinicalEvidence.title}</h4>
        <div className={`${LAYOUT.grid["2col"]} gap-4 ${SIZES.text.sm}`}>
          <div>
            {CLINICAL_VALIDATION.clinicalEvidence.sources.slice(0, 2).map((source, index) => (
              <p key={index} className={`${COLORS.text.secondary} mb-2`}><strong>✅ {source}</strong></p>
            ))}
          </div>
          <div>
            {CLINICAL_VALIDATION.clinicalEvidence.sources.slice(2).map((source, index) => (
              <p key={index} className={`${COLORS.text.secondary} mb-2`}><strong>✅ {source}</strong></p>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-xl border border-purple-500/30">
        <h4 className={`${SIZES.text.xl} font-bold text-purple-400 mb-4`}>{CLINICAL_VALIDATION.validationResults.title}</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {CLINICAL_VALIDATION.validationResults.results.map((result, index) => (
            <div key={index} className={`${COLORS.background.tertiary} ${SIZES.padding.sm} rounded-lg`}>
              <div className={`${SIZES.text.lg} font-bold text-green-400`}>{result.metric}</div>
              <div className={`text-xs ${COLORS.text.tertiary}`}>{result.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
});

export default SPEClinicalValidationSlide;
