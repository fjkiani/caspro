'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CTASectionProps {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
    color?: 'blue' | 'teal' | 'indigo' | 'purple' | 'green' | 'red';
  };
  secondaryButton?: {
    text: string;
    href: string;
    color?: 'blue' | 'teal' | 'indigo' | 'purple' | 'green' | 'red';
  };
  backgroundColor?: 'blue' | 'teal' | 'indigo' | 'purple' | 'green' | 'red';
  className?: string;
}

const colorVariants = {
  blue: { 
    bg: 'from-blue-50 to-indigo-50', 
    border: 'border-blue-200',
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'border-blue-600 text-blue-600 hover:bg-blue-50'
  },
  teal: { 
    bg: 'from-teal-50 to-blue-50', 
    border: 'border-teal-200',
    primary: 'bg-teal-600 hover:bg-teal-700',
    secondary: 'border-teal-600 text-teal-600 hover:bg-teal-50'
  },
  indigo: { 
    bg: 'from-indigo-50 to-purple-50', 
    border: 'border-indigo-200',
    primary: 'bg-indigo-600 hover:bg-indigo-700',
    secondary: 'border-indigo-600 text-indigo-600 hover:bg-indigo-50'
  },
  purple: { 
    bg: 'from-purple-50 to-pink-50', 
    border: 'border-purple-200',
    primary: 'bg-purple-600 hover:bg-purple-700',
    secondary: 'border-purple-600 text-purple-600 hover:bg-purple-50'
  },
  green: { 
    bg: 'from-green-50 to-emerald-50', 
    border: 'border-green-200',
    primary: 'bg-green-600 hover:bg-green-700',
    secondary: 'border-green-600 text-green-600 hover:bg-green-50'
  },
  red: { 
    bg: 'from-red-50 to-orange-50', 
    border: 'border-red-200',
    primary: 'bg-red-600 hover:bg-red-700',
    secondary: 'border-red-600 text-red-600 hover:bg-red-50'
  }
};

const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  primaryButton,
  secondaryButton,
  backgroundColor = 'blue',
  className = ''
}) => {
  const theme = colorVariants[backgroundColor];

  return (
    <motion.div
      className={`text-center ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      <div className={`bg-gradient-to-r ${theme.bg} rounded-2xl p-8 border ${theme.border}`}>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-700 mb-6">{description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={primaryButton.href}>
            <motion.button
              className={`px-8 py-4 ${theme.primary} text-white rounded-xl font-semibold transition-colors duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {primaryButton.text}
            </motion.button>
          </Link>
          {secondaryButton && (
            <Link href={secondaryButton.href}>
              <motion.button
                className={`px-8 py-4 border-2 ${theme.secondary} rounded-xl font-semibold transition-colors duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {secondaryButton.text}
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CTASection;
