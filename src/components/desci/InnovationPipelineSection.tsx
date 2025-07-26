'use client';

import React from 'react';
import { SectionHeader } from './common/SectionHeader';
import { StepCard } from './common/StepCard';
import { FlaskConical, Fingerprint, ShieldCheck, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';

const pipelineVariants = {
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

export const InnovationPipelineSection = () => {
  const steps = [
    {
      step: "1",
      title: "Creation (The Forge)",
      description: "Our AI-powered ecosystem generates novel, optimized therapeutic candidates, which undergo rigorous in-silico structural validation.",
      icon: <FlaskConical className="text-blue-400" size={40} />,
    },
    {
      step: "2",
      title: "Proof of Invention (The Ledger)",
      description: "A complete data package for the invention is hashed and registered on-chain, creating an immutable record of the discovery.",
      icon: <Fingerprint className="text-purple-400" size={40} />,
    },
    {
      step: "3",
      title: "Securitization (The Armory)",
      description: "The data dossier is stored decentrally, and an IP-NFT is minted, representing verifiable, tradable ownership of the intellectual property.",
      icon: <ShieldCheck className="text-teal-400" size={40} />,
    },
    {
      step: "4",
      title: "Funding & Collaboration (The Exchange)",
      description: "The IP-NFT is offered to the global DeSci ecosystem, providing non-dilutive capital and building a community of stakeholders.",
      icon: <Handshake className="text-green-400" size={40} />,
    },
  ];
  return (
    <section id="innovation-pipeline" className="py-20 mb-16">
      <SectionHeader 
        title="The Innovation Pipeline: Our IP-NFT Protocol" 
        subtitle="Transforming scientific discoveries into fundable assets." 
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            custom={i}
            variants={pipelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <StepCard 
              step={step.step}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}; 