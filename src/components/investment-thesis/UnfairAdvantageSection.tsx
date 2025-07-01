'use client';

import React from 'react';
import { Eye, Zap, Star } from 'lucide-react';

const UnfairAdvantageSection: React.FC = () => {
  return (
    <section className="mb-20">
      <h3 className="text-2xl font-bold text-white text-center mb-4">
        2.0 Our Unfair Advantage: The CrisPRO Intelligence Platform
      </h3>
      <p className="text-lg text-gray-400 text-center max-w-3xl mx-auto mb-12">
        Our competitors are fighting with outdated weapons. They use AI for data science and correlation. 
        We use a foundational model of biology to predict causation. This gives us three core advantages 
        that are impossible to replicate.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
          <div className="text-blue-500 mb-4">
            <Eye className="h-10 w-10" />
          </div>
          <h4 className="text-xl font-bold text-white mb-2">We See the Whole Battlefield</h4>
          <p className="text-gray-400">
            While others are blind to the 98% of the genome that is non-coding, our platform understands 
            the entire genetic operating system. We identify drivers and targets in regulatory regions 
            that are invisible to every other commercial tool.
          </p>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
          <div className="text-blue-500 mb-4">
            <Zap className="h-10 w-10" />
          </div>
          <h4 className="text-xl font-bold text-white mb-2">We Predict the Enemy's Next Move</h4>
          <p className="text-gray-400">
            We move beyond a static diagnosis to create dynamic "Digital Twins" of a patient's cancer. 
            Our platform simulates tumor evolution and therapy response, identifying the most likely 
            resistance pathways before they emerge.
          </p>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
          <div className="text-blue-500 mb-4">
            <Star className="h-10 w-10" />
          </div>
          <h4 className="text-xl font-bold text-white mb-2">We Forge the Weapons of War</h4>
          <p className="text-gray-400">
            This is our most profound advantage. While every other company is stuck analyzing, we <strong>create</strong>. 
            Our Zeta Forge designs novel, optimized therapeutic candidates—from CRISPR tools to proteins—compressing 
            R&D timelines from years to weeks.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UnfairAdvantageSection; 