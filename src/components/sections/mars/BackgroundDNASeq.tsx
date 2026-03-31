'use client';

import React, { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';

// Pre-compute a static-looking matrix of DNA sequences to match the terminal aesthetic
const NUCLEOTIDES = ['A', 'T', 'C', 'G'];
const ROWS = 30; // Number of rows in the matrix
const COLS = 60; // Characters per row

// Simulate conserved regions (cyan) and pathogenic mutations (red)
const generateMatrix = () => {
  const matrix = [];
  for (let r = 0; r < ROWS; r++) {
    const row = [];
    for (let c = 0; c < COLS; c++) {
      const char = NUCLEOTIDES[Math.floor(Math.random() * NUCLEOTIDES.length)];
      
      // Determine coloring based on random probability to simulate the V6A mockup
      let colorClass = 'text-[#E8E8F0]/20'; // Default faint gray
      
      const rand = Math.random();
      if (rand > 0.98) {
        colorClass = 'text-[#FF4040]/70 font-bold'; // Pathogenic mutation (red)
      } else if (rand > 0.92) {
        colorClass = 'text-[#00E5FF]/60 font-bold'; // Conserved region (cyan)
      } else if (rand > 0.8) {
        colorClass = 'text-[#E8E8F0]/40'; // Slightly brighter gray
      }
      
      row.push({ char, colorClass, id: `${r}-${c}` });
    }
    matrix.push(row);
  }
  return matrix;
};

export const BackgroundDNASeq = memo(() => {
  const [matrix, setMatrix] = useState<{char: string, colorClass: string, id: string}[][]>([]);

  useEffect(() => {
    // Generate only on client to avoid hydration mismatch
    setMatrix(generateMatrix());
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#0A0A0F] z-0 flex items-center justify-center opacity-40">
      {/* Subtle radial gradient to fade the edges into the (#0A0A0F) background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0F_80%)] z-10" />
      
      <div 
        className="font-mono text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] leading-relaxed whitespace-pre font-bold select-none"
        style={{ fontFamily: '"JetBrains Mono", monospace' }}
      >
        {matrix.map((row, rIdx) => (
          <motion.div 
            key={`row-${rIdx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: rIdx * 0.05 }}
            className="flex justify-center"
          >
            {row.map((cell) => (
              <span key={cell.id} className={cell.colorClass}>
                {cell.char}
              </span>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
});

BackgroundDNASeq.displayName = 'BackgroundDNASeq';
