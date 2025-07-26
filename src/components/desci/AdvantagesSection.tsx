'use client';

import React from 'react';
import { SectionHeader } from './common/SectionHeader';
import { FeatureHighlight } from './common/FeatureHighlight';
import { Rocket, HandHeart, Globe, Users, CheckCircle, Unlock } from 'lucide-react';
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

export const AdvantagesSection = () => {
  const advantages = [
    {
      icon: <Rocket className="text-red-400" size={48} />,
      title: "Speed",
      description: "Move from idea to a fundable asset in weeks, not years, dramatically accelerating R&D.",
    },
    {
      icon: <HandHeart className="text-pink-400" size={48} />,
      title: "Non-Dilutive Capital",
      description: "Fund research and development without surrendering equity or control, maintaining mission alignment.",
    },
    {
      icon: <Globe className="text-blue-400" size={48} />,
      title: "Global Reach",
      description: "Source capital from a worldwide pool of supporters, not just traditional venture capital.",
    },
    {
      icon: <Users className="text-purple-400" size={48} />,
      title: "Community Flywheel",
      description: "Each IP-NFT creates a new cohort of stakeholders, building a powerful community of advocates.",
    },
    {
      icon: <CheckCircle className="text-green-400" size={48} />,
      title: "Built-In Quality Assurance",
      description: "Our mandatory validation protocols ensure only high-quality, AI-vetted designs are securitized.",
    },
    {
      icon: <Unlock className="text-teal-400" size={48} />,
      title: "Transparency & Trust",
      description: "The blockchain provides immutable proof of invention and transparent access to data.",
    },
  ];

  return (
    <section id="advantages" className="py-20 mb-16">
      <SectionHeader 
        title="Strategic Advantages of Our Model" 
        subtitle="Why our approach creates a more efficient and equitable ecosystem for science." 
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {advantages.map((advantage, i) => (
            <motion.div
                key={advantage.title}
                custom={i}
                variants={featureVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
            >
                <FeatureHighlight 
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