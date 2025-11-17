'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, ArrowRight, DraftingCompass, Shield, Dna, Bot } from 'lucide-react';
import Link from 'next/link';
import CardSlider from '@/components/shared/CardSlider';

interface DiscoveryVsEngineeringProps {
  className?: string;
}

const DiscoveryVsEngineering: React.FC<DiscoveryVsEngineeringProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [funnelProgress, setFunnelProgress] = useState(0);
  const [factoryProgress, setFactoryProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) {
      setFunnelProgress(0);
      setFactoryProgress(0);
      return;
    }

    const funnelDuration = 5000; // 5 seconds for funnel (metaphor for 18 months)
    const factoryDuration = 1500; // 1.5 seconds for factory (metaphor for 6 weeks)

    // Funnel Animation
    const funnelInterval = setInterval(() => {
      setFunnelProgress(prev => {
        if (prev < 100) return prev + 1; // Increment slowly
        clearInterval(funnelInterval);
        return 100;
      });
    }, funnelDuration / 100);

    // Factory Animation
    const factoryInterval = setInterval(() => {
      setFactoryProgress(prev => {
        if (prev < 100) return prev + 1; // Increment faster
        clearInterval(factoryInterval);
        return 100;
      });
    }, factoryDuration / 100);

    return () => {
      clearInterval(funnelInterval);
      clearInterval(factoryInterval);
    };
  }, [isPlaying]);

  return (
    <section className={`py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Discovery vs. Engineering
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
            The fundamental shift from a <strong>game of chance</strong> to a <strong>discipline of creation</strong>.
          </p>
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {isPlaying ? 'Pause Simulation' : 'Run Simulation'}
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-12 items-stretch max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-3 sm:p-6 md:p-8 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-slate-200 shadow-lg sm:shadow-xl text-center flex flex-col"
          >
            <h3 className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold text-slate-800 mb-2 sm:mb-3 md:mb-4">The Old Way: A Funnel</h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-xl text-slate-500 mb-3 sm:mb-4 md:mb-6 lg:mb-8">Low-probability screening</p>
            
            <div className="flex-grow flex flex-col items-center justify-center space-y-2 sm:space-y-4 md:space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex space-x-1 sm:space-x-2"
              >
                {[...Array(7)].map((_, i) => (
                  <FlaskConical key={i} className="text-slate-400 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" />
                ))}
              </motion.div>
              
              <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-slate-600">
                Millions of Molecules
              </p>

              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="w-16 sm:w-24 md:w-32 lg:w-48 border-l-[10px] sm:border-l-[20px] md:border-l-[30px] lg:border-l-[40px] border-l-transparent border-r-[10px] sm:border-r-[20px] md:border-r-[30px] lg:border-r-[40px] border-r-transparent border-t-[20px] sm:border-t-[40px] md:border-t-[60px] lg:border-t-[80px] border-t-slate-300 my-2 sm:my-3 md:my-4"
              ></motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className="bg-amber-100 p-2 sm:p-3 md:p-4 rounded-lg border border-amber-300"
              >
                <h4 className="text-xs sm:text-sm md:text-lg lg:text-2xl font-bold text-amber-800">{funnelProgress < 100 ? "Searching..." : "1 Potential Lead"}</h4>
                <p className="text-[10px] sm:text-xs text-amber-600 mt-1">{funnelProgress < 100 ? "" : "Maybe"}</p>
              </motion.div>
            </div>

            <div className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 pt-3 sm:pt-4 md:pt-6 border-t border-slate-200">
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm">
                <div>
                  <div className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-red-600">{funnelProgress < 100 ? `${(funnelProgress / 100 * 18).toFixed(1)} months` : `18 months`}</div>
                  <div className="text-slate-500 text-[10px] sm:text-xs">Timeline</div>
                </div>
                <div>
                  <div className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-red-600">{funnelProgress < 100 ? `$${(funnelProgress / 100 * 50).toFixed(1)}M` : `$50M+`}</div>
                  <div className="text-slate-500 text-[10px] sm:text-xs">Cost</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-3 sm:p-6 md:p-8 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-emerald-400 shadow-lg sm:shadow-xl md:shadow-2xl text-center flex flex-col"
          >
            <h3 className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold text-emerald-800 mb-2 sm:mb-3 md:mb-4">The New Doctrine: A Factory</h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-xl text-emerald-600 mb-2 sm:mb-3 md:mb-4">High-certainty generation</p>
            <div className="mb-2 sm:mb-3 md:mb-4 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg border-2 border-purple-300 shadow-sm">
              <p className="text-[10px] sm:text-xs md:text-sm text-purple-800 font-bold mb-1 sm:mb-2">
                🧠 SAE Explainability
              </p>
              <p className="text-[9px] sm:text-[10px] md:text-xs text-purple-700 leading-tight sm:leading-relaxed hidden sm:block">
                Every design comes with <strong>32,768 learned biological features</strong> that explain exactly why it works.
              </p>
              <Link href="/evidence/sae-intelligence" className="text-[9px] sm:text-[10px] md:text-xs text-purple-600 hover:text-purple-800 font-semibold mt-1 sm:mt-2 inline-flex items-center gap-1">
                Explore <ArrowRight className="w-2 h-2 sm:w-3 sm:h-3" />
              </Link>
            </div>
            
            <div className="flex-grow flex flex-col items-center justify-center space-y-2 sm:space-y-4 md:space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <DraftingCompass className="text-emerald-500 w-6 h-6 sm:w-10 sm:h-10 md:w-16 md:h-16" />
              </motion.div>
              
              <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-emerald-700">
                AI Engineering
              </p>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <ArrowRight className="text-emerald-400 w-4 h-4 sm:w-8 sm:h-8 md:w-12 md:h-12" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className="bg-emerald-100 p-2 sm:p-3 md:p-4 lg:p-6 rounded-lg border border-emerald-300"
              >
                <h4 className="text-xs sm:text-sm md:text-lg lg:text-2xl font-bold text-emerald-800 mb-1 sm:mb-2 md:mb-3">
                  {factoryProgress < 100 ? "Engineering..." : "Portfolio of Optimized Assets"}
                </h4>
                <div className="flex justify-center space-x-2 sm:space-x-3 md:space-x-4">
                  <Shield className="text-emerald-600 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                  <Dna className="text-emerald-600 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                  <Bot className="text-emerald-600 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                </div>
                <p className="text-[10px] sm:text-xs md:text-sm text-emerald-600 mt-1 sm:mt-2">Validated & Patent-Ready</p>
              </motion.div>
            </div>

            <div className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 pt-3 sm:pt-4 md:pt-6 border-t border-emerald-200">
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm">
                <div>
                  <div className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-emerald-600">{factoryProgress < 100 ? `${(factoryProgress / 100 * 6).toFixed(1)} weeks` : `6 weeks`}</div>
                  <div className="text-slate-500 text-[10px] sm:text-xs">Timeline</div>
                </div>
                <div>
                  <div className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-emerald-600">{factoryProgress < 100 ? `$${(factoryProgress / 100 * 0.5).toFixed(2)}M` : `$500K`}</div>
                  <div className="text-slate-500 text-[10px] sm:text-xs">Cost</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border border-purple-200">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              The Transformation
            </h3>
            <p className="text-xl text-slate-600 leading-relaxed">
              We've replaced the <strong className="text-red-600">needle-in-haystack</strong> approach 
              with <strong className="text-emerald-600">precision engineering</strong>. 
              Every therapeutic candidate is designed for success, not discovered by chance.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DiscoveryVsEngineering;