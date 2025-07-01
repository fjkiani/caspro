import React from 'react';
import { Users } from 'lucide-react';

interface TargetAudienceSectionProps {
  title: string;
  audiences: {
    name: string;
    description: string;
  }[];
}

const TargetAudienceSection: React.FC<TargetAudienceSectionProps> = ({ title, audiences }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter">
            {title}
          </h2>
        </header>
        
        <div className="max-w-4xl mx-auto">
          {audiences.map((audience, index) => (
            <div key={index} className="bg-slate-800/50 p-8 rounded-lg border border-slate-700 not-last:mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Users className="h-8 w-8 text-blue-400 flex-shrink-0" />
                <h3 className="text-2xl font-bold text-white">{audience.name}</h3>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection; 