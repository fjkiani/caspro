'use client';

import React from 'react';
import { SectionHeader } from './common/SectionHeader';
import { Card } from './common/Card';
import { BrainCircuit, Clock, Lock, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';

const problemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

export const ProblemSection = () => {
  const problems = [
    {
      icon: <BrainCircuit className="text-red-400" size={48} />,
      title: "The 'Valley of Death'",
      description: "Countless promising scientific discoveries fail to secure funding, not due to poor science, but due to a lack of early-stage capital.",
    },
    {
      icon: <Clock className="text-yellow-400" size={48} />,
      title: "Lengthy Funding Cycles",
      description: "Traditional seed funding rounds can take 6-9 months, significantly delaying critical research and development.",
    },
    {
      icon: <Droplets className="text-green-400" size={48} />,
      title: "Dilutive Capital",
      description: "Founders are often forced to give up significant equity and control to secure the capital needed for their research.",
    },
    {
      icon: <Lock className="text-blue-400" size={48} />,
      title: "Lack of Transparency",
      description: "The traditional funding process is often opaque, lacking transparency for both investors and scientists.",
    },
  ];

  return (
    <section id="problem" className="py-20 mb-16">
      <SectionHeader 
        title="The Challenge: Bridging the Funding Gap in Biotech" 
        subtitle="Why traditional biotech funding models struggle to keep pace with innovation." 
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {problems.map((problem, i) => (
          <motion.div
            key={problem.title}
            custom={i}
            variants={problemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <Card 
              icon={problem.icon}
              title={problem.title}
              description={problem.description}
            />
          </motion.div>
        ))}
      </div>
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center text-xl md:text-2xl font-semibold text-teal-300 mt-12 max-w-4xl mx-auto"
      >
        This traditional system often favors incremental, 'safe' bets over revolutionary science. We believe there is a better way to fund the future of medicine.
      </motion.p>
    </section>
  );
}; 