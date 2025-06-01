'use client';

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import DnaStrand from '../ui/DnaStrand';

interface DnaSectionProps {
  children: ReactNode | ((itemVariants: Variants) => ReactNode);
  className?: string;
  id?: string;
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'helix' | 'protein' | 'membrane';
  strandPosition?: 'left' | 'right' | 'both' | 'none';
  align?: 'left' | 'center' | 'right';
  withDivider?: boolean;
}

export default function DnaSection({
  children,
  className = '',
  id,
  title,
  subtitle,
  variant = 'default',
  strandPosition = 'both',
  align = 'center',
  withDivider = false
}: DnaSectionProps) {
  // Background variants
  const bgVariants = {
    default: 'bg-white',
    helix: 'helix-bg',
    protein: 'protein-bg',
    membrane: 'membrane-bg'
  };
  
  // Text alignment
  const textAlign = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };
  
  // Fade-in animation for children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <section 
      id={id} 
      className={`relative overflow-hidden py-16 md:py-24 ${bgVariants[variant]} text-foreground ${className}`}
    >
      {/* DNA Strand decorations */}
      {(strandPosition === 'left' || strandPosition === 'both') && (
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 pointer-events-none">
          <DnaStrand className="w-full h-full" strandCount={3} />
        </div>
      )}
      
      {(strandPosition === 'right' || strandPosition === 'both') && (
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 pointer-events-none">
          <DnaStrand className="w-full h-full" strandCount={3} />
        </div>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        {(title || subtitle) && (
          <motion.div 
            className={`mb-12 max-w-3xl mx-auto ${textAlign[align]}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title && (
              <h2 className="heading-2 mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                  {title}
                </span>
              </h2>
            )}
            
            {subtitle && (
              <p className="subheading max-w-2xl mx-auto text-foreground/80">
                {subtitle}
              </p>
            )}
            
            {withDivider && <div className="dna-divider mt-8 max-w-md mx-auto"></div>}
          </motion.div>
        )}
        
        {/* Section content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-foreground"
        >
          {typeof children === 'function' ? 
            children(itemVariants) : 
            <motion.div variants={itemVariants}>{children}</motion.div>
          }
        </motion.div>
      </div>
    </section>
  );
} 