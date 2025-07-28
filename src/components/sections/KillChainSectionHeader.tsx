'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface KillChainSectionHeaderProps {
  title: string;
  subtitle: string;
}

export const KillChainSectionHeader = ({ title, subtitle }: KillChainSectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-400 tracking-tighter uppercase">{title}</h2>
      <p className="text-lg text-slate-400 max-w-3xl mx-auto">{subtitle}</p>
    </motion.div>
  );
}; 