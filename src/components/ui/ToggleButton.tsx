'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rocket, Power } from 'lucide-react';

interface ToggleButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ href, children, className = '' }) => {
  const [isToggled, setIsToggled] = useState(true);

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href={href}
          className="block"
          onMouseEnter={() => setIsToggled(true)}
          onMouseLeave={() => setIsToggled(false)}
        >
          {/* Toggle Switch Container */}
          <div className="relative w-32 h-12 bg-slate-200 rounded-full p-1 shadow-inner border-2 border-slate-300">
            {/* Toggle Switch Handle */}
            <motion.div
              className="absolute top-1 left-1 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center"
              animate={{
                x: isToggled ? 72 : 0,
                backgroundColor: isToggled ? '#10b981' : '#ffffff'
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
                {isToggled ? (
                  <Power className="w-5 h-5 text-white" />
                ) : (
                  <Rocket className="w-5 h-5 text-slate-600" />
                )}
              </motion.div>
            </motion.div>
            
            {/* Toggle Switch Track */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                backgroundColor: isToggled ? '#10b981' : '#e2e8f0'
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Text Labels */}
            <div className="absolute inset-0 flex items-center justify-end px-3 text-xs font-semibold">
              <motion.span
                className="text-white"
                animate={{
                  opacity: isToggled ? 1 : 0.3,
                  scale: isToggled ? 1 : 0.8
                }}
                transition={{ duration: 0.2 }}
              >
                ON
              </motion.span>
            </div>
          </div>
          
          {/* Button Text */}
          <motion.div
            className="text-center mt-2 text-xs md:text-sm font-medium text-slate-300 md:text-slate-700"
            animate={{
              color: isToggled ? '#10b981' : '#94a3b8'
            }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
};

export default ToggleButton;
