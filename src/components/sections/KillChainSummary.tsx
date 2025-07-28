'use client';

import React from 'react';
import { KillChainSectionHeader } from './KillChainSectionHeader';
import { KillChainFeatureCard } from './KillChainFeatureCard';
import { Zap, Target, ShieldCheck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const featureVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

const KillChainSummary = () => {
  const advantages = [
    {
      icon: <Clock className="text-red-400" size={32} />,
      title: "Overwhelming Speed",
      description: "Our `in silico` kill chain collapses the R&D timeline from years to weeks, moving from raw data to validated therapeutic candidates at machine speed.",
    },
    {
      icon: <Target className="text-red-400" size={32} />,
      title: "Unprecedented Precision",
      description: "By fusing multi-modal AI analysis, we identify and validate the highest-value targets, ensuring our therapeutic weapons strike with maximum impact.",
    },
    {
      icon: <Zap className="text-red-400" size={32} />,
      title: "De Novo Weapon Forging",
      description: "We don't just find therapies; we design them. The Zeta Forge engineers novel, optimized biologics and gene therapies tailored for the specific vulnerability.",
    },
    {
      icon: <ShieldCheck className="text-red-400" size={32} />,
      title: "In Silico Validation",
      description: "Our mandatory structural and safety assessments eliminate non-viable candidates before they reach the lab, saving immense time and resources.",
    },
  ];

  return (
    <section id="kill-chain-summary" className="py-20">
      <KillChainSectionHeader 
        title="The Outcome: Biological Conquest" 
        subtitle="Our In Silico Kill Chain delivers a fundamental shift in the speed, precision, and certainty of therapeutic development." 
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {advantages.map((advantage, i) => (
            <motion.div
                key={advantage.title}
                custom={i}
                variants={featureVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="h-full"
            >
                <KillChainFeatureCard 
                    icon={advantage.icon}
                    title={advantage.title}
                    description={advantage.description}
                />
            </motion.div>
        ))}
      </div>
    </section>
  );
};

export default KillChainSummary; 