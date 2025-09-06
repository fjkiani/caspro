'use client';

import React from 'react';
import { KillChainSectionHeader } from './KillChainSectionHeader';
import { KillChainFeatureCard } from './KillChainFeatureCard';
import { XCircle, DollarSign, AlertTriangle, Clock } from 'lucide-react';
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

const KillChainProblem = () => {
  const problems = [
    {
      icon: <Clock className="text-red-400" size={32} />,
      title: "Glacial Timelines",
      description: "Traditional R&D is a multi-year, often decade-long marathon with no guarantee of success at the finish line.",
    },
    {
      icon: <DollarSign className="text-red-400" size={32} />,
      title: "Exorbitant Costs",
      description: "The cost to bring a single new drug to market can exceed billions of dollars, with much of it spent on failed candidates.",
    },
    {
      icon: <XCircle className="text-red-400" size={32} />,
      title: "High Failure Rates",
      description: "Over 90% of drugs that enter clinical trials fail, often due to poor target validation or unforeseen safety issues.",
    },
    {
      icon: <AlertTriangle className="text-red-400" size={32} />,
      title: "Opaque Processes",
      description: "Key decisions are often made in silos with incomplete data, leading to repeated, costly errors across the industry.",
    },
  ];

  return (
    <section id="kill-chain-problem" className="py-20">
      <KillChainSectionHeader 
        title="The State of Play:" 
        subtitle="Accelerating Therapeutic Development" 
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {problems.map((problem, i) => (
            <motion.div
                key={problem.title}
                custom={i}
                variants={featureVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="h-full"
            >
                <KillChainFeatureCard 
                    icon={problem.icon}
                    title={problem.title}
                    description={problem.description}
                />
            </motion.div>
        ))}
      </div>
    </section>
  );
};

export default KillChainProblem; 