import React from 'react';

interface SectionContainerProps {
  children: React.ReactNode;
  id?: string; // For anchor links if needed
  className?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ children, id, className = '' }) => {
  return (
    <section id={id} className={`py-8 md:py-12 ${className}`}> {/* Added more vertical padding */}
      {children}
    </section>
  );
};

export default SectionContainer; 