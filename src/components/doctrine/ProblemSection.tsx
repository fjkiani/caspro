import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ProblemSectionProps {
  title: string;
  content: string;
  points: {
    title: string;
    content: string;
  }[];
}

const ProblemSection: React.FC<ProblemSectionProps> = ({ title, content, points }) => {
  return (
    <section className="py-16 bg-slate-900/50 rounded-xl border border-slate-700/50">
      <div className="container mx-auto px-6">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter">
            {title}
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
            {content}
          </p>
        </header>
        
        {points.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {points.map((point, index) => (
              <div key={index} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0" />
                  <h3 className="text-xl font-bold text-white">{point.title}</h3>
                </div>
                <p className="text-slate-300 text-base leading-relaxed">
                  {point.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProblemSection; 