'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface CrisprGenomeEditorProps {
  className?: string;
  baseCount?: number;
  autoRotate?: boolean;
  autoAnimate?: boolean;
  rotationSpeed?: number;
  targetSequence?: string;
  colors?: {
    adenine?: string;
    thymine?: string;
    guanine?: string; 
    cytosine?: string;
    backbone1?: string;
    backbone2?: string;
    casProtein?: string;
    guideRna?: string;
    highlight?: string;
    cutPoint?: string;
  };
}

interface BasePair {
  type: string;
  complement: string;
  color: string | undefined;
  complementColor: string | undefined;
}

export default function CrisprGenomeEditor({
  className = '',
  baseCount = 16,
  autoRotate = true,
  autoAnimate = true,
  rotationSpeed = 30,
  targetSequence = 'ATGCAATGCAATGCAA',
  colors: initialColors = {
    adenine: '#f87171', // Red
    thymine: '#60a5fa', // Blue
    guanine: '#fbbf24', // Yellow
    cytosine: '#34d399', // Green
    backbone1: '#f472b6', // Pink
    backbone2: '#a78bfa', // Purple
    casProtein: '#ec4899', // Hot pink (Cas9)
    guideRna: '#14b8a6', // Teal (gRNA)
    highlight: '#fef08a', // Yellow highlight
    cutPoint: '#ef4444', // Red for cut site
  }
}: CrisprGenomeEditorProps) {
  const [rotation, setRotation] = useState(0);
  const [animationState, setAnimationState] = useState(0); // 0: initial, 1: scanning, 2: bound, 3: cutting, 4: editing, 5: repaired
  const animationTimer = useRef<any>(null);
  const [editPosition, setEditPosition] = useState(Math.floor(baseCount / 2));
  const [dnaBases, setDnaBases] = useState<BasePair[]>([]); // State for DNA bases
  const [isMounted, setIsMounted] = useState(false); // To track client-side mount

  const stableColors = useRef(initialColors); // Keep colors stable to avoid re-running generation if only colors prop changes for non-initial generation

  // Generate DNA bases on client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return; // Only run on client after mount

    const generateBases = () => {
      let currentBases: BasePair[] = targetSequence.slice(0, baseCount).split('').map(base => {
        switch(base.toUpperCase()) {
          case 'A': return { type: 'A', complement: 'T', color: stableColors.current.adenine, complementColor: stableColors.current.thymine };
          case 'T': return { type: 'T', complement: 'A', color: stableColors.current.thymine, complementColor: stableColors.current.adenine };
          case 'G': return { type: 'G', complement: 'C', color: stableColors.current.guanine, complementColor: stableColors.current.cytosine };
          case 'C': return { type: 'C', complement: 'G', color: stableColors.current.cytosine, complementColor: stableColors.current.guanine };
          default: return { type: 'N', complement: 'N', color: '#9ca3af', complementColor: '#9ca3af' }; // Default for unknown
        }
      });
    
      // Pad with random bases if needed
      while (currentBases.length < baseCount) {
        const randomBaseType = ['A', 'T', 'G', 'C'][Math.floor(Math.random() * 4)];
        switch(randomBaseType) {
          case 'A': currentBases.push({ type: 'A', complement: 'T', color: stableColors.current.adenine, complementColor: stableColors.current.thymine }); break;
          case 'T': currentBases.push({ type: 'T', complement: 'A', color: stableColors.current.thymine, complementColor: stableColors.current.adenine }); break;
          case 'G': currentBases.push({ type: 'G', complement: 'C', color: stableColors.current.guanine, complementColor: stableColors.current.cytosine }); break;
          case 'C': currentBases.push({ type: 'C', complement: 'G', color: stableColors.current.cytosine, complementColor: stableColors.current.guanine }); break;
        }
      }
      setDnaBases(currentBases);
    };

    generateBases();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, baseCount, targetSequence]); // Rerun if baseCount or targetSequence changes, after mount
  
  // Auto rotation effect
  useEffect(() => {
    if (!autoRotate || !isMounted) return;
    
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 100);
    
    return () => clearInterval(interval);
  }, [autoRotate, isMounted]);
  
  // Auto animation sequence
  useEffect(() => {
    if (!autoAnimate || !isMounted) return;
    
    const animationSequence = [
      { state: 0, duration: 1000 }, // Initial state
      { state: 1, duration: 3000 }, // Scanning
      { state: 2, duration: 2000 }, // Bound
      { state: 3, duration: 1500 }, // Cutting
      { state: 4, duration: 3000 }, // Editing
      { state: 5, duration: 2000 }, // Repaired
      { state: 0, duration: 3000 }, // Reset
    ];
    
    let currentStep = 0;
    
    const runAnimation = () => {
      const step = animationSequence[currentStep];
      setAnimationState(step.state);
      
      animationTimer.current = setTimeout(() => {
        currentStep = (currentStep + 1) % animationSequence.length;
        runAnimation();
      }, step.duration);
    };
    
    runAnimation();
    
    return () => {
      if (animationTimer.current) {
        clearTimeout(animationTimer.current);
      }
    };
  }, [autoAnimate, isMounted]);
  
  // If not mounted or dnaBases not populated, render placeholder or null to avoid hydration mismatch
  if (!isMounted || dnaBases.length === 0) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
        <div className="text-sm text-slate-400">Initializing Editor...</div>
      </div>
    );
  }
  
  // Create DNA base pairs
  const basePairElements = dnaBases.map((base, index) => {
    const yPos = (index / baseCount) * 100;
    const isEdited = animationState >= 3 && Math.abs(index - editPosition) < 2;
    const isHighlighted = animationState >= 2 && Math.abs(index - editPosition) < 4;
    const rotationOffset = index * (360 / baseCount);
    
    const baseColor = isEdited && animationState === 4 ? stableColors.current.highlight : base.color;
    const complementColor = isEdited && animationState === 4 ? stableColors.current.highlight : base.complementColor;
    
    const isCut = animationState === 3 && Math.abs(index - editPosition) < 1;
    const separation = isCut ? 15 : 0;
    
    return (
      <div key={index} className="absolute w-full" style={{ top: `${yPos}%`, transformStyle: 'preserve-3d' }}>
        <div 
          className="absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ 
            left: `${0 - separation}%`, 
            backgroundColor: stableColors.current.backbone1,
            transform: `rotateY(${rotation + rotationOffset}deg) translateZ(40px) translateX(-50%) translateY(-50%)`,
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.4)'
          }}
        />
        <div 
          className="absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ 
            left: `${100 + separation}%`, 
            backgroundColor: stableColors.current.backbone2,
            transform: `rotateY(${rotation + rotationOffset + 180}deg) translateZ(40px) translateX(-50%) translateY(-50%)`,
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.4)'
          }}
        />
        
        {(!isCut || animationState > 3) && (
          <div 
            className="absolute h-1.5 top-1/2 left-0 right-0 transform -translate-y-1/2 transition-all duration-300"
            style={{
              backgroundImage: `linear-gradient(to right, ${baseColor}, ${complementColor})`,
              boxShadow: isHighlighted ? `0 0 15px ${stableColors.current.highlight}` : '0 0 8px rgba(255, 255, 255, 0.2)',
              opacity: isEdited && animationState === 3 ? 0.5 : 1
            }}
          />
        )}
        
        {isCut && animationState === 3 && (
          <div 
            className="absolute h-8 w-1 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-30"
            style={{
              backgroundColor: stableColors.current.cutPoint,
              boxShadow: `0 0 15px ${stableColors.current.cutPoint}`,
              opacity: 0.8
            }}
          />
        )}
        
        <div 
          className="absolute w-4 h-4 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold"
          style={{ 
            left: `${20 - separation/2}%`,
            top: '50%',
            backgroundColor: baseColor,
            boxShadow: `0 0 10px ${baseColor}`,
            opacity: isEdited && animationState === 3 ? 0.5 : 1,
            transition: 'all 0.5s ease'
          }}
        >
          {base.type}
        </div>
        <div 
          className="absolute w-4 h-4 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold"
          style={{ 
            left: `${80 + separation/2}%`,
            top: '50%',
            backgroundColor: complementColor,
            boxShadow: `0 0 10px ${complementColor}`,
            opacity: isEdited && animationState === 3 ? 0.5 : 1,
            transition: 'all 0.5s ease'
          }}
        >
          {base.complement}
        </div>
      </div>
    );
  });
  
  // Create backbone strands that connect consecutive backbone points
  const backboneElements = Array.from({ length: dnaBases.length > 0 ? dnaBases.length - 1 : 0 }).map((_, index) => {
    const startY = (index / baseCount) * 100;
    const endY = ((index + 1) / baseCount) * 100;
    const height = endY - startY;
    
    // Angle to show the twisting effect
    const startRotation = index * (360 / baseCount);
    const endRotation = (index + 1) * (360 / baseCount);
    
    // Determine if this backbone section is being cut
    const isCut = animationState === 3 && (index === editPosition || index === editPosition - 1);
    
    // Don't show the backbone connection during cutting at the cut site
    if (isCut) return null;
    
    return (
      <React.Fragment key={`backbone-${index}`}>
        {/* Left backbone strand */}
        <div 
          className="absolute w-1 left-0 transform -translate-x-1/2 transition-all duration-300"
          style={{ 
            top: `${startY}%`,
            height: `${height}%`,
            background: `linear-gradient(to bottom, ${stableColors.current.backbone1}90, ${stableColors.current.backbone1}, ${stableColors.current.backbone1}90)`,
            transformOrigin: 'top',
            transform: `rotateY(${rotation + startRotation}deg) translateZ(40px) translateX(-50%)`,
            opacity: 0.8
          }}
        />
        
        {/* Right backbone strand */}
        <div 
          className="absolute w-1 right-0 transform translate-x-1/2 transition-all duration-300"
          style={{ 
            top: `${startY}%`,
            height: `${height}%`,
            background: `linear-gradient(to bottom, ${stableColors.current.backbone2}90, ${stableColors.current.backbone2}, ${stableColors.current.backbone2}90)`,
            transformOrigin: 'top',
            transform: `rotateY(${rotation + startRotation + 180}deg) translateZ(40px) translateX(50%)`,
            opacity: 0.8
          }}
        />
      </React.Fragment>
    );
  });
  
  // CRISPR-Cas9 protein visualization
  const CasProtein = () => {
    if (animationState < 1 || animationState > 4) return null;
    const proteinY = editPosition * (100 / baseCount);
    return (
      <motion.div
        className="absolute left-1/2 top-0 w-20 h-20 rounded-lg opacity-80 z-10"
        style={{ 
          backgroundColor: stableColors.current.casProtein, 
          transformStyle: 'preserve-3d',
          y: `${proteinY}%`,
          x: '-50%'
        }}
        initial={{ scale: 0.5, opacity: 0, rotateY: rotation -90 }}
        animate={{
          scale: animationState >= 2 ? 1.2 : 1,
          opacity: 1,
          rotateY: rotation -90 + (animationState === 1 ? 40 * Math.sin(Date.now() / 300) : 0),
          transition: { type: 'spring', stiffness: 200, damping: 20 }
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
          Cas
        </div>
        {/* gRNA Part */}
        {animationState >= 2 && (
          <motion.div 
            className="absolute -right-8 top-1/2 w-10 h-2 rounded-l-full"
            style={{ backgroundColor: stableColors.current.guideRna, y: '-50%' }}
            initial={{ width: 0 }}
            animate={{ width: 40 }}
          />
        )}
      </motion.div>
    );
  };
  
  // New base insertion during editing phase
  const EditingOverlay = () => {
    if (animationState !== 4) return null;
    return (
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm flex flex-col items-center justify-center z-40 rounded-lg"
      >
        <motion.div 
          className="text-white text-lg font-semibold p-4 bg-primary/50 rounded-md shadow-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Editing Sequence...
        </motion.div>
        <div className="w-3/4 h-2 bg-slate-600 rounded-full overflow-hidden mt-4">
          <motion.div 
            className="h-full bg-gradient-to-r from-green-400 to-blue-500"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.8, ease: 'linear' }}
          />
        </div>
      </div>
    );
  };
  
  // Status overlay to show the current process
  const StatusOverlay = () => {
    let statusText = "Initializing...";
    let statusColor = "bg-slate-500";

    switch (animationState) {
      case 0: statusText = "Idle"; statusColor = "bg-slate-500/70"; break;
      case 1: statusText = "Scanning DNA..."; statusColor = "bg-blue-500/70"; break;
      case 2: statusText = "Target Found"; statusColor = "bg-yellow-500/70"; break;
      case 3: statusText = "Cutting DNA Strand"; statusColor = `${stableColors.current.cutPoint}/70`; break;
      case 4: statusText = "Editing Sequence..."; statusColor = "bg-purple-500/70"; break;
      case 5: statusText = "Repair Complete"; statusColor = "bg-green-500/70"; break;
    }

    return (
      <div className={`absolute bottom-4 right-4 px-3 py-1.5 rounded-md text-xs text-white font-medium shadow-lg ${statusColor} backdrop-blur-sm`}>
        {statusText}
      </div>
    );
  };
  
  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center ${className}`}>
      <div 
        className="relative w-40 h-full mx-auto"
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        {basePairElements}
        {backboneElements}
        <CasProtein />
        <EditingOverlay /> 
      </div>
      <StatusOverlay />
    </div>
  );
} 