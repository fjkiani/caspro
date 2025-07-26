'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const Card = ({ icon, title, description }: CardProps) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 h-full transition-all duration-300 hover:border-purple-500 hover:shadow-purple-500/20">
      <div className="mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-lg">{description}</p>
    </div>
  );
}; 