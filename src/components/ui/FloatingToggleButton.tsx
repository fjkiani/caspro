'use client';

import React, { useState, useEffect } from 'react';
;
import { motion } from 'framer-motion';
import { Dna, Microscope, Zap, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';

interface FloatingToggleButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const FloatingToggleButton: React.FC<FloatingToggleButtonProps> = ({ href, children, className = '' }) => {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const [isToggled, setIsToggled] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className={`fixed top-4 right-4 z-50 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isScrolled ? 1 : 0,
        scale: isScrolled ? 1 : 0.8,
        y: isScrolled ? 0 : -20
      }}
      transition={{ duration: 0.3 }}
      style={{ pointerEvents: isScrolled ? 'auto' : 'none' }}
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={toggleTheme}
          className="block"
          onMouseEnter={() => setIsToggled(true)}
          onMouseLeave={() => setIsToggled(false)}
        >
          {/* DNA Helix Toggle Container */}
          <div className="relative w-32 h-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-1 shadow-xl border-2 border-blue-300 backdrop-blur-sm">
            {/* DNA Helix Handle */}
            <motion.div
              className="absolute top-1 left-1 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center"
              animate={{
                x: isToggled ? 72 : 0,
                backgroundColor: isToggled ? '#10b981' : undefined,
                background: isToggled ? 'linear-gradient(to bottom right, #10b981, #059669)' : 'linear-gradient(to bottom right, #3b82f6, #7c3aed)'
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
            >
              <motion.div
                animate={{
                  scale: isToggled ? 1.2 : 1,
                  rotate: isToggled ? 360 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-white" />
                ) : (
                  <Moon className="w-5 h-5 text-white" />
                )}
              </motion.div>
            </motion.div>
            
            {/* DNA Helix Track with Pattern */}
            <motion.div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              animate={{
                backgroundColor: isToggled ? '#10b981' : 'transparent'
              }}
              transition={{ duration: 0.3 }}
            >
              {/* DNA Helix Pattern - Actual DNA Look */}
              <div className="absolute inset-0 opacity-40">
                <div 
                  className="w-full h-full animate-pulse"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 20% 50%, #3b82f6 2px, transparent 2px),
                      radial-gradient(circle at 80% 50%, #7c3aed 2px, transparent 2px),
                      radial-gradient(circle at 20% 30%, #3b82f6 1px, transparent 1px),
                      radial-gradient(circle at 80% 70%, #7c3aed 1px, transparent 1px),
                      radial-gradient(circle at 20% 70%, #3b82f6 1px, transparent 1px),
                      radial-gradient(circle at 80% 30%, #7c3aed 1px, transparent 1px)
                    `,
                    backgroundSize: '12px 12px, 12px 12px, 12px 12px, 12px 12px, 12px 12px, 12px 12px',
                    backgroundPosition: '0 0, 6px 6px, 0 0, 6px 6px, 0 0, 6px 6px'
                  }}
                />
              </div>
            </motion.div>
            
            {/* Scientific Labels */}
            <div className="absolute inset-0 flex items-center justify-between px-2 text-xs font-bold">
              <motion.span
                className="text-blue-600"
                animate={{
                  opacity: isDarkMode ? 0.3 : 1,
                  scale: isDarkMode ? 0.8 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                CLINICAL
              </motion.span>
              <motion.span
                className="text-white"
                animate={{
                  opacity: isDarkMode ? 1 : 0.3,
                  scale: isDarkMode ? 1 : 0.8
                }}
                transition={{ duration: 0.2 }}
              >
                RESEARCH
              </motion.span>
            </div>
          </div>
          
          {/* Theme Toggle Button Text */}
          <motion.div
            className="text-center mt-2 text-xs font-bold text-blue-600"
            animate={{
              color: isDarkMode ? '#10b981' : '#3b82f6'
            }}
            transition={{ duration: 0.2 }}
          >
            {isDarkMode ? 'Research Mode' : 'Dark Mode'}
          </motion.div>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default FloatingToggleButton;
