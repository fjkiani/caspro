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
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="text-center mb-6">
        <motion.h3 
          className="text-xl font-bold text-slate-800 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-sm text-slate-600 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {description}
        </motion.p>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          {/* Compact Main Icon Container */}
          <motion.div 
            className="relative mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "backOut" }}
          >
            <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center border-4 shadow-lg ${
              isOldWay 
                ? 'bg-gradient-to-br from-red-50 to-red-100 border-red-200' 
                : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
            }`}>
              <Icon className={`w-16 h-16 ${
                isOldWay ? 'text-red-500' : 'text-green-500'
              }`} />
            </div>
            <motion.div 
              className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                isOldWay ? 'bg-red-100 border-2 border-red-200' : 'bg-green-100 border-2 border-green-200'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {isOldWay ? (
                <AlertTriangle className="w-5 h-5 text-red-600" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
            </motion.div>
          </motion.div>
          
          {/* Enhanced Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default VisualContainer;
