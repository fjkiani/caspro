'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DnaStrandProps {
  className?: string;
  strandCount?: number;
  animationDuration?: number;
  colors?: {
    adenine?: string;
    thymine?: string;
    guanine?: string; 
    cytosine?: string;
  };
  vertical?: boolean;
}

export default function DnaStrand({
  className = '',
  strandCount = 5,
  animationDuration = 20,
  colors = {
    adenine: '#f87171',
    thymine: '#60a5fa',
    guanine: '#fbbf24',
    cytosine: '#34d399'
  },
  vertical = true
}: DnaStrandProps) {
  const getRandomDelay = () => -(Math.random() * 10);
  
  return (
    <div className={`relative ${className} overflow-hidden`}>
      {Array.from({ length: strandCount }).map((_, index) => (
        <React.Fragment key={index}>
          {/* Backbone strand 1 */}
          <motion.div
            className={`absolute ${vertical ? 'h-full w-1' : 'w-full h-1'} bg-gray-200 opacity-80`}
            style={{
              [vertical ? 'left' : 'top']: `calc(${(index * 100) / strandCount}% - ${vertical ? '0.5px' : '2px'})`,
              zIndex: 1
            }}
            animate={{
              [vertical ? 'left' : 'top']: `calc(${(index * 100) / strandCount}% + ${vertical ? '1px' : '2px'})`,
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'mirror',
              duration: animationDuration / (index + 1),
              ease: 'easeInOut',
              delay: getRandomDelay()
            }}
          />
          
          {/* Backbone strand 2 */}
          <motion.div
            className={`absolute ${vertical ? 'h-full w-1' : 'w-full h-1'} bg-gray-200 opacity-80`}
            style={{
              [vertical ? 'right' : 'bottom']: `calc(${(index * 100) / strandCount}% - ${vertical ? '0.5px' : '2px'})`,
              zIndex: 1
            }}
            animate={{
              [vertical ? 'right' : 'bottom']: `calc(${(index * 100) / strandCount}% + ${vertical ? '1px' : '2px'})`,
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'mirror',
              duration: animationDuration / (index + 1),
              ease: 'easeInOut',
              delay: getRandomDelay()
            }}
          />
          
          {/* Base pairs - dynamic connectors */}
          {Array.from({ length: vertical ? 12 : 6 }).map((_, baseIndex) => {
            // Choose base pair colors - complementary bases (A-T, G-C)
            const isAdenineThymine = baseIndex % 2 === 0;
            const color1 = isAdenineThymine ? colors.adenine : colors.guanine;
            const color2 = isAdenineThymine ? colors.thymine : colors.cytosine;
            
            return (
              <motion.div
                key={`base-${index}-${baseIndex}`}
                className={`absolute ${vertical ? 'h-0.5 left-0 right-0' : 'w-0.5 top-0 bottom-0'} flex`}
                style={{
                  [vertical ? 'top' : 'left']: `calc(${(baseIndex * 100) / (vertical ? 12 : 6)}%)`,
                  zIndex: 0
                }}
                initial={{
                  [vertical ? 'scaleX' : 'scaleY']: 0.1,
                  opacity: 0
                }}
                animate={{
                  [vertical ? 'scaleX' : 'scaleY']: [0.1, 1, 0.1],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: animationDuration / 2,
                  ease: 'easeInOut',
                  delay: getRandomDelay() + (baseIndex * 0.5)
                }}
              >
                {/* Base 1 */}
                <motion.span
                  className={`absolute ${vertical ? 'h-2 w-2' : 'w-2 h-2'} rounded-full`}
                  style={{
                    backgroundColor: color1,
                    [vertical ? 'left' : 'top']: `calc(${(index * 100) / strandCount}%)`,
                    zIndex: 2
                  }}
                />
                
                {/* Base 2 */}
                <motion.span
                  className={`absolute ${vertical ? 'h-2 w-2' : 'w-2 h-2'} rounded-full`}
                  style={{
                    backgroundColor: color2,
                    [vertical ? 'right' : 'bottom']: `calc(${(index * 100) / strandCount}%)`,
                    zIndex: 2
                  }}
                />
                
                {/* Base pair connector with gradient */}
                <div
                  className={`absolute ${vertical ? 'h-full' : 'w-full'}`}
                  style={{
                    [vertical ? 'width' : 'height']: '100%',
                    background: `linear-gradient(${vertical ? 'to right' : 'to bottom'}, ${color1}, ${color2})`
                  }}
                />
              </motion.div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
} 