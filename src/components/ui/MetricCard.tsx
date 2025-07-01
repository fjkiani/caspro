'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  value: string | number;
  suffix?: string;
  label: string;
  description?: string;
  color?: string;
  animated?: boolean;
  delay?: number;
}

const AnimatedCounter = ({ 
  end, 
  duration = 2000, 
  suffix = "" 
}: { 
  end: number; 
  duration?: number; 
  suffix?: string; 
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`counter-${end}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [end]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <span id={`counter-${end}`} className="font-bold text-3xl">
      {count}{suffix}
    </span>
  );
};

const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  value,
  suffix = '',
  label,
  description,
  color = 'text-blue-400',
  animated = false,
  delay = 0
}) => {
  const numericValue = typeof value === 'number' ? value : parseInt(value.toString().replace(/[^0-9]/g, ''));
  const isNumeric = !isNaN(numericValue) && animated;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="p-6 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 group"
    >
      <div className="flex items-center space-x-3 mb-3">
        <Icon className={`w-8 h-8 ${color} group-hover:scale-110 transition-transform duration-300`} />
        <div className={`text-2xl font-bold ${color}`}>
          {isNumeric ? (
            <AnimatedCounter end={numericValue} suffix={suffix} />
          ) : (
            <span>{value}{suffix}</span>
          )}
        </div>
      </div>
      <h4 className="font-semibold text-white mb-2">{label}</h4>
      {description && (
        <p className="text-gray-400 text-sm">{description}</p>
      )}
    </motion.div>
  );
};

export default MetricCard; 