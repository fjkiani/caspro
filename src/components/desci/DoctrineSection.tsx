'use client';

import React from 'react';
import { SectionHeader } from './common/SectionHeader';
import { motion } from 'framer-motion';
import { Beaker, BookCheck, Bot } from 'lucide-react';

const doctrineVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

export const DoctrineSection = () => {
  const doctrines = [
    {
      icon: <Beaker className="text-purple-400" size={56} />,
      title: "The Zeta Forge",
      description: "Our in-silico discovery engine, powered by advanced AI, creating a continuous pipeline of novel therapeutic candidates with high structural integrity.",
    },
    {
      icon: <BookCheck className="text-blue-400" size={56} />,
      title: "The DeSci Ledger",
      description: "An on-chain registry providing immutable 'Proof of Invention' and transparent data provenance, building cryptographic trust for every discovery.",
    },
    {
      icon: <Bot className="text-teal-400" size={56} />,
      title: "The Command Center",
      description: "Orchestrating the end-to-end pipeline from AI generation to on-chain asset creation, serving as the central nervous system of our ecosystem.",
    }
  ];

  return (
    <section id="doctrine" className="py-20 mb-16">
      <SectionHeader 
        title="Our Principles: From Discovery to Digital Assets" 
        subtitle="Creating a transparent and global market for funding transformative cures." 
      />
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center text-lg text-gray-300 mt-8 mb-12 max-w-3xl mx-auto"
      >
        Our approach is to transform AI-generated discoveries into a new class of digital asset—the **IP-NFT** (Intellectual Property Non-Fungible Token). This creates a liquid, transparent, and accessible market for funding science.
      </motion.p>
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {doctrines.map((doctrine, i) => (
          <motion.div
            key={doctrine.title}
            custom={i}
            variants={doctrineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 transition-all duration-300 hover:border-blue-500 hover:shadow-blue-500/20"
          >
            <div className="mb-4">{doctrine.icon}</div>
            <h3 className="text-2xl font-bold text-white mb-2">{doctrine.title}</h3>
            <p className="text-gray-300">{doctrine.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}; 