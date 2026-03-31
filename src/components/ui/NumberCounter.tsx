"use client";

import React, { useState, useEffect } from 'react';

interface NumberCounterProps {
  end: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export const NumberCounter: React.FC<NumberCounterProps> = ({ 
  end, 
  className = "text-6xl", 
  prefix = "", 
  suffix = "", 
  decimals = 3 
}) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className={`${className} font-extralight text-cyan-400 tracking-tighter leading-none`}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </div>
  );
};
