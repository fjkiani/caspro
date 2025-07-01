import React from 'react';
import { Eye } from 'lucide-react';

interface VisionSectionProps {
  title: string;
  content: string;
}

const VisionSection: React.FC<VisionSectionProps> = ({ title, content }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1 flex justify-center">
            <div className="inline-flex items-center justify-center bg-blue-600/10 p-4 rounded-full border-2 border-blue-500/20 shadow-lg">
                <Eye className="h-16 w-16 text-blue-400" />
            </div>
          </div>
          <div className="md:col-span-2 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
              {title}
            </h2>
            <p className="mt-4 text-xl text-slate-300 leading-relaxed">
              {content}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection; 