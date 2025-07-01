'use client';

import React from 'react';
import { motion } from 'framer-motion';

const IntroductionSection: React.FC = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-20 text-center"
    >
      <h3 className="text-2xl font-bold text-white mb-4">
        Introduction: A Market Built on Failure, An Opportunity Forged in Certainty
      </h3>
      <p className="text-lg text-gray-400 max-w-3xl mx-auto">
        The story of modern cancer treatment is one of systemic failure—a story of patients failed by ambiguity, 
        of clinicians overwhelmed by unusable data, and of billions in capital lost on failed drugs. This failure 
        is not a tragedy. It is a <strong>multi-trillion-dollar market opportunity</strong>.
      </p>
      <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-4">
        We were built to conquer that chasm. We are not another player in a broken system. 
        We are the architects of the new standard.
      </p>
    </motion.section>
  );
};

export default IntroductionSection; 