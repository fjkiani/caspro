'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Subtle animated grid background */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 p-8 max-w-4xl mx-auto"
      >
        <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-6 drop-shadow-lg">
          CrisPRO: DeSci
        </h1>
        <p className="text-2xl md:text-3xl font-light text-gray-200 mb-8">
          The AI-Powered CRISPR Design Ecosystem.
          <br />
          <span className="font-semibold">Accelerating the Future of Medicine with Decentralized Science.</span>
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-xl font-bold rounded-full shadow-lg hover:from-blue-700 hover:to-purple-800 transition-all duration-300 ease-in-out"
        >
          Explore the Ecosystem
        </motion.button>
      </motion.div>
    </section>
  );
}; 