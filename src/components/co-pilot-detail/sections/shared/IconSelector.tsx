'use client';

import React from 'react';
import { Settings, Brain, Zap, Target, Microscope, Cpu, Briefcase } from 'lucide-react';

interface IconSelectorProps {
  title: string;
  size?: number;
  className?: string;
}

export default function IconSelector({ title, size = 48, className = "" }: IconSelectorProps) {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('plan') || lowerTitle.includes('quality')) {
    return <Settings size={size} className={`text-blue-400 ${className}`} />;
  }
  if (lowerTitle.includes('radio-genomics') || lowerTitle.includes('biomarker')) {
    return <Brain size={size} className={`text-pink-400 ${className}`} />;
  }
  if (lowerTitle.includes('adaptive') || lowerTitle.includes('art')) {
    return <Zap size={size} className={`text-yellow-400 ${className}`} />;
  }
  if (lowerTitle.includes('outcome') || lowerTitle.includes('predict')) {
    return <Target size={size} className={`text-green-400 ${className}`} />;
  }
  if (lowerTitle.includes('knowledge') || lowerTitle.includes('research')) {
    return <Microscope size={size} className={`text-teal-400 ${className}`} />;
  }
  if (lowerTitle.includes('design') || lowerTitle.includes('chopchop')) {
    return <Brain size={size} className={`text-sky-400 ${className}`} />;
  }
  if (lowerTitle.includes('variant effect') || lowerTitle.includes('evo 2')) {
    return <Cpu size={size} className={`text-lime-400 ${className}`} />;
  }
  if (lowerTitle.includes('outcome analysis') || lowerTitle.includes('crispresso2')) {
    return <Briefcase size={size} className={`text-indigo-400 ${className}`} />;
  }
  
  return <Brain size={size} className={`text-blue-400 ${className}`} />;
}

