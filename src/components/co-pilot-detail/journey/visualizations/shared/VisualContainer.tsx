'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface VisualContainerProps {
  children: React.ReactNode;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  variant: 'old' | 'new';
}

const VisualContainer: React.FC<VisualContainerProps> = ({ 
  children, 
  title, 
  description, 
  icon: Icon, 
  variant 
}) => {
  const isOldWay = variant === 'old';
  
  return (
    <motion.div 
      className="w-full h-full flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm">{description}</p>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          {/* Main Icon Container */}
          <div className="relative mb-6">
            <div className={`w-40 h-40 mx-auto rounded-full flex items-center justify-center border-4 ${
              isOldWay 
                ? 'bg-red-50 border-red-200' 
                : 'bg-green-50 border-green-200'
            }`}>
              <Icon className={`w-20 h-20 ${
                isOldWay ? 'text-red-500' : 'text-green-500'
              }`} />
            </div>
            <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${
              isOldWay ? 'bg-red-100' : 'bg-green-100'
            }`}>
              {isOldWay ? (
                <AlertTriangle className="w-5 h-5 text-red-600" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
            </div>
          </div>
          
          {/* Content */}
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default VisualContainer;
