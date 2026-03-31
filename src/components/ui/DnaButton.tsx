'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface DnaButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'adenine' | 'thymine' | 'guanine' | 'cytosine';
  size?: 'sm' | 'md' | 'lg';
  outline?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  withDnaEffect?: boolean;
}

export default function DnaButton({
  children,
  className = '',
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  outline = false,
  disabled = false,
  fullWidth = false,
  withDnaEffect = true
}: DnaButtonProps) {
  // Base style for all buttons
  const baseStyle = 'relative inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size variants
  const sizeStyles = {
    sm: 'py-2 px-3 text-sm',
    md: 'py-2.5 px-5 text-base',
    lg: 'py-3 px-6 text-lg'
  };
  
  // Color variants
  const variantStyles = {
    primary: outline 
      ? 'bg-transparent text-primary border border-primary hover:bg-primary hover:text-white focus:ring-primary'
      : 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary: outline
      ? 'bg-transparent text-secondary border border-secondary hover:bg-secondary hover:text-white focus:ring-secondary'
      : 'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary',
    accent: outline
      ? 'bg-transparent text-accent border border-accent hover:bg-accent hover:text-white focus:ring-accent'
      : 'bg-accent text-white hover:bg-accent-dark focus:ring-accent',
    adenine: outline
      ? 'bg-transparent text-adenine border border-adenine hover:bg-adenine hover:text-white focus:ring-adenine'
      : 'bg-adenine text-white hover:bg-red-600 focus:ring-adenine',
    thymine: outline
      ? 'bg-transparent text-thymine border border-thymine hover:bg-thymine hover:text-white focus:ring-thymine'
      : 'bg-thymine text-white hover:bg-blue-600 focus:ring-thymine',
    guanine: outline
      ? 'bg-transparent text-guanine border border-guanine hover:bg-guanine hover:text-white focus:ring-guanine'
      : 'bg-guanine text-white hover:bg-yellow-600 focus:ring-guanine',
    cytosine: outline
      ? 'bg-transparent text-cytosine border border-cytosine hover:bg-cytosine hover:text-white focus:ring-cytosine'
      : 'bg-cytosine text-white hover:bg-green-600 focus:ring-cytosine',
  };
  
  // DNA strand effect - animated background on hover
  const dnaEffect = withDnaEffect ? 'overflow-hidden group' : '';
  
  // Disabled state
  const disabledStyles = disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';
  
  // Width 
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // Combine all styles
  const buttonStyles = `${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyles} ${widthStyles} ${dnaEffect} ${className}`;
  
  // DNA strand effect (animated stripes)
  const DnaBackgroundEffect = () => {
    if (!withDnaEffect) return null;
    
    return (
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={`strand-${index}`}
            className="absolute h-full w-1.5"
            style={{ 
              left: `${(index * 20) + 5}%`,
              background: index % 2 === 0 ? 
                'linear-gradient(to bottom, var(--adenine), var(--thymine))' : 
                'linear-gradient(to bottom, var(--guanine), var(--cytosine))'
            }}
            animate={{
              y: ["0%", "100%"],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 3 + (index * 0.5),
              ease: "linear",
            }}
          />
        ))}
      </div>
    );
  };
  
  // Render as Link or button
  if (href) {
    return (
      <Link to={href} className={buttonStyles} onClick={disabled ? (e) => e.preventDefault() : undefined}>
        <DnaBackgroundEffect />
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }
  
  return (
    <button className={buttonStyles} onClick={onClick} disabled={disabled}>
      <DnaBackgroundEffect />
      <span className="relative z-10">{children}</span>
    </button>
  );
} 