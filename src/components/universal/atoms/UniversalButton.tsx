'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface UniversalButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  color?: 'red' | 'blue' | 'green' | 'purple' | 'orange' | 'teal' | 'slate';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  fullWidth?: boolean;
}

const getButtonStyles = (variant: string, color: string, size: string) => {
  const baseStyles = 'font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const colorVariants = {
    primary: {
      red: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      blue: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      green: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
      purple: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
      orange: 'bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500',
      teal: 'bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500',
      slate: 'bg-slate-600 text-white hover:bg-slate-700 focus:ring-slate-500'
    },
    secondary: {
      red: 'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500',
      blue: 'bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-500',
      green: 'bg-green-100 text-green-700 hover:bg-green-200 focus:ring-green-500',
      purple: 'bg-purple-100 text-purple-700 hover:bg-purple-200 focus:ring-purple-500',
      orange: 'bg-orange-100 text-orange-700 hover:bg-orange-200 focus:ring-orange-500',
      teal: 'bg-teal-100 text-teal-700 hover:bg-teal-200 focus:ring-teal-500',
      slate: 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-500'
    },
    outline: {
      red: 'border-2 border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500',
      blue: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      green: 'border-2 border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500',
      purple: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50 focus:ring-purple-500',
      orange: 'border-2 border-orange-600 text-orange-600 hover:bg-orange-50 focus:ring-orange-500',
      teal: 'border-2 border-teal-600 text-teal-600 hover:bg-teal-50 focus:ring-teal-500',
      slate: 'border-2 border-slate-600 text-slate-600 hover:bg-slate-50 focus:ring-slate-500'
    },
    ghost: {
      red: 'text-red-600 hover:bg-red-50 focus:ring-red-500',
      blue: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      green: 'text-green-600 hover:bg-green-50 focus:ring-green-500',
      purple: 'text-purple-600 hover:bg-purple-50 focus:ring-purple-500',
      orange: 'text-orange-600 hover:bg-orange-50 focus:ring-orange-500',
      teal: 'text-teal-600 hover:bg-teal-50 focus:ring-teal-500',
      slate: 'text-slate-600 hover:bg-slate-50 focus:ring-slate-500'
    },
    danger: {
      red: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      blue: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      green: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      purple: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      orange: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      teal: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      slate: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
    }
  };

  return `${baseStyles} ${sizeStyles[size as keyof typeof sizeStyles]} ${colorVariants[variant as keyof typeof colorVariants][color as keyof typeof colorVariants.primary]}`;
};

const UniversalButton: React.FC<UniversalButtonProps> = ({
  variant = 'primary',
  size = 'md',
  color = 'blue',
  icon: Icon,
  iconPosition = 'left',
  children,
  onClick,
  disabled = false,
  loading = false,
  className = '',
  fullWidth = false
}) => {
  const buttonStyles = getButtonStyles(variant, color, size);
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledStyles = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <motion.button
      className={`${buttonStyles} ${widthClass} ${disabledStyles} ${className} flex items-center justify-center space-x-2`}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      transition={{ duration: 0.1 }}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
        </>
      )}
    </motion.button>
  );
};

export default UniversalButton; 