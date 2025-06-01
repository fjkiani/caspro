'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface DoubleDnaHelixProps {
  className?: string;
  baseCount?: number;
  autoRotate?: boolean;
  rotationSpeed?: number;
  colors?: {
    adenine?: string;
    thymine?: string;
    guanine?: string; 
    cytosine?: string;
    backbone1?: string;
    backbone2?: string;
  };
}

export default function DoubleDnaHelix({
  className = '',
  baseCount = 10,
  autoRotate = true,
  rotationSpeed = 12,
  colors = {
    adenine: '#f87171', // Red
    thymine: '#60a5fa', // Blue
    guanine: '#fbbf24', // Yellow
    cytosine: '#34d399', // Green
    backbone1: '#f472b6', // Pink
    backbone2: '#a78bfa', // Purple
  }
}: DoubleDnaHelixProps) {
  const [rotation, setRotation] = useState(0);
  
  // Rotate the DNA if autoRotate is enabled
  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, [autoRotate]);
  
  // Create base pairs
  const basePairs = Array.from({ length: baseCount }).map((_, index) => {
    // Alternate between A-T and G-C base pairs
    const isAdeninePair = index % 2 === 0;
    const rotationOffset = index * (360 / baseCount);
    
    // Calculate vertical position
    const yPos = (index / baseCount) * 100;
    
    return (
      <div key={index} className="absolute w-full" style={{ top: `${yPos}%`, transformStyle: 'preserve-3d' }}>
        {/* Backbone points */}
        <div 
          className="absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ 
            left: '0%', 
            backgroundColor: colors.backbone1,
            transform: `rotateY(${rotation + rotationOffset}deg) translateZ(40px) translateX(-50%) translateY(-50%)`,
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)'
          }}
        />
        <div 
          className="absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ 
            left: '100%', 
            backgroundColor: colors.backbone2,
            transform: `rotateY(${rotation + rotationOffset + 180}deg) translateZ(40px) translateX(-50%) translateY(-50%)`,
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)'
          }}
        />
        
        {/* Base pair bar */}
        <div 
          className="absolute h-2 top-1/2 left-0 right-0 transform -translate-y-1/2"
          style={{
            backgroundImage: isAdeninePair 
              ? `linear-gradient(to right, ${colors.adenine}, ${colors.thymine})`
              : `linear-gradient(to right, ${colors.guanine}, ${colors.cytosine})`,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
          }}
        />
        
        {/* Base pair nucleotide dots */}
        <div 
          className="absolute w-5 h-5 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{ 
            left: '20%',
            top: '50%',
            backgroundColor: isAdeninePair ? colors.adenine : colors.guanine,
            boxShadow: `0 0 12px ${isAdeninePair ? colors.adenine : colors.guanine}`
          }}
        />
        <div 
          className="absolute w-5 h-5 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{ 
            left: '80%',
            top: '50%',
            backgroundColor: isAdeninePair ? colors.thymine : colors.cytosine,
            boxShadow: `0 0 12px ${isAdeninePair ? colors.thymine : colors.cytosine}`
          }}
        />
      </div>
    );
  });
  
  // Create backbone strands that connect consecutive backbone points
  const backboneElements = Array.from({ length: baseCount - 1 }).map((_, index) => {
    const startY = (index / baseCount) * 100;
    const endY = ((index + 1) / baseCount) * 100;
    const height = endY - startY;
    
    // Angle to show the twisting effect
    const startRotation = index * (360 / baseCount);
    const endRotation = (index + 1) * (360 / baseCount);
    
    return (
      <React.Fragment key={`backbone-${index}`}>
        {/* Left backbone strand */}
        <div 
          className="absolute w-1 left-0 transform -translate-x-1/2"
          style={{ 
            top: `${startY}%`,
            height: `${height}%`,
            background: `linear-gradient(to bottom, 
              transparent, ${colors.backbone1}, transparent
            )`,
            transformOrigin: 'top',
            transform: `rotateY(${rotation + startRotation}deg) translateZ(40px) translateX(-50%)`,
            opacity: 0.8
          }}
        />
        
        {/* Right backbone strand */}
        <div 
          className="absolute w-1 right-0 transform translate-x-1/2"
          style={{ 
            top: `${startY}%`,
            height: `${height}%`,
            background: `linear-gradient(to bottom, 
              transparent, ${colors.backbone2}, transparent
            )`,
            transformOrigin: 'top',
            transform: `rotateY(${rotation + startRotation + 180}deg) translateZ(40px) translateX(50%)`,
            opacity: 0.8
          }}
        />
      </React.Fragment>
    );
  });
  
  return (
    <div 
      className={`relative w-full h-full perspective-1000 ${className}`}
      style={{ perspective: '1000px' }}
    >
      <div 
        className="absolute inset-0 transform-style-preserve-3d"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: `rotateX(70deg) rotateZ(${autoRotate ? rotation / rotationSpeed : 0}deg)`
        }}
      >
        <div className="absolute inset-0 transform-style-preserve-3d">
          {backboneElements}
          {basePairs}
        </div>
      </div>
      
      {/* Optional glow effect at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary/30 to-transparent"></div>
    </div>
  );
} 