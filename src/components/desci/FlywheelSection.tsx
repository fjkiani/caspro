'use client';

import React from 'react';
import { SectionHeader } from './common/SectionHeader';
import { motion } from 'framer-motion';
import { BrainCircuit, DollarSign, FlaskConical, LineChart, Repeat } from 'lucide-react';

const FlywheelStep = ({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1">{icon}</div>
        <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </div>
    </div>
);

export const FlywheelSection = () => {
  const steps = [
    { icon: <BrainCircuit className="text-blue-400" size={32} />, title: "AI Generates High-Value Assets", description: "Our Zeta Forge continuously generates novel, in-silico validated therapeutic designs (IP-NFTs)." },
    { icon: <DollarSign className="text-green-400" size={32} />, title: "IP-NFTs Attract Global Capital", description: "These assets attract non-dilutive capital from the global DeSci ecosystem." },
    { icon: <FlaskConical className="text-purple-400" size={32} />, title: "Capital Funds Experimental Validation", description: "Funding is used for crucial real-world experimental validation and testing." },
    { icon: <LineChart className="text-red-400" size={32} />, title: "Data Feeds AI Improvement", description: "Validation results are meticulously collected and fed back into our AI models." },
    { icon: <Repeat className="text-teal-400" size={32} />, title: "Enhanced AI, More Valuable Assets", description: "The improved AI generates even more novel and effective therapeutic designs, restarting the cycle." },
  ];

  return (
    <section id="flywheel" className="py-20">
      <SectionHeader 
        title="The AI-Powered Economic Flywheel" 
        subtitle="Fueling a self-sustaining cycle of innovation and discovery." 
      />
      <div className="mt-16 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
            {steps.map((step, i) => (
                <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: i * 0.2, duration: 0.6 }}
                >
                    <FlywheelStep {...step} />
                </motion.div>
            ))}
        </div>
        <div className="relative h-96 flex items-center justify-center">
            <motion.svg 
                viewBox="0 0 400 400" 
                className="w-full h-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <defs>
                    <linearGradient id="flywheel-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                </defs>
                
                {/* Dashed circle */}
                <motion.circle 
                    cx="200" cy="200" r="180" 
                    fill="none" 
                    stroke="url(#flywheel-gradient)" 
                    strokeWidth="4" 
                    strokeDasharray="15 15"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />

                {/* Nodes */}
                {steps.map((step, i) => (
                    <motion.g 
                        key={`node-${i}`}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.2 }}
                    >
                        <circle 
                            cx={200 + 180 * Math.cos(i * 2 * Math.PI / 5 - Math.PI / 2)}
                            cy={200 + 180 * Math.sin(i * 2 * Math.PI / 5 - Math.PI / 2)}
                            r="20"
                            fill="#1f2937"
                            stroke="url(#flywheel-gradient)"
                            strokeWidth="3"
                        />
                         <g transform={`translate(${200 + 180 * Math.cos(i * 2 * Math.PI / 5 - Math.PI / 2)}, ${200 + 180 * Math.sin(i * 2 * Math.PI / 5 - Math.PI / 2)}) scale(0.6)`}>
                            {React.cloneElement(step.icon, { size: 32, transform: "translate(-16, -16)" })}
                        </g>
                    </motion.g>
                ))}
            </motion.svg>
        </div>
      </div>
       <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center text-xl text-teal-300 mt-16 max-w-4xl mx-auto"
      >
        This virtuous cycle creates a self-sustaining loop of scientific discovery, funding, and AI advancement, accelerating the development of life-saving cures at an unprecedented pace.
      </motion.p>
    </section>
  );
}; 