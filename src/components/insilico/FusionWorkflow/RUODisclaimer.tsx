'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const RUODisclaimer: React.FC = () => {
  return (
    <motion.div
      className="mt-16 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Shield className="w-8 h-8 text-orange-600" />
          <span className="text-lg font-semibold text-orange-800">Research Use Only (RUO)</span>
        </div>
        <p className="text-gray-700">
          This workflow is designed for research purposes. All outputs require independent validation 
          and regulatory review before any clinical application. Wet-lab validation is mandatory 
          for designed sequences before scale-up.
        </p>
      </div>
    </motion.div>
  );
};

export default RUODisclaimer;
