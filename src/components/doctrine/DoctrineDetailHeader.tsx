import React from 'react';

interface DoctrineDetailHeaderProps {
  subtitle: string;
  title: string;
}

const DoctrineDetailHeader: React.FC<DoctrineDetailHeaderProps> = ({ subtitle, title }) => {
  return (
    <header className="max-w-4xl mx-auto text-center mb-16">
      <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-widest">
        {subtitle}
      </h2>
      <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 leading-tight tracking-tighter">
        {title}
      </h1>
    </header>
  );
};

export default DoctrineDetailHeader; 