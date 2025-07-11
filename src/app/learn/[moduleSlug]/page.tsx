import React from 'react';
import { modules } from '@/data/learn/modules';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ModulePageProps {
  params: {
    moduleSlug: string;
  };
}

const ModulePage: React.FC<ModulePageProps> = ({ params }) => {
  const { moduleSlug } = params;
  const module = modules.find(m => m.slug === moduleSlug);

  if (!module) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar spacer */}
      <div className="h-30"></div>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            href="/learn" 
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Modules
          </Link>
          <h1 className="text-4xl font-bold mb-2 text-slate-900">{module.title}</h1>
          <p className="text-lg text-slate-600">{module.description}</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 max-w-4xl">
          {module.topics.map((topic, index) => (
            <Link 
              key={topic.slug} 
              href={`/learn/${module.slug}/${topic.slug}`} 
              className="block group"
            >
              <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 border border-slate-200 group-hover:border-blue-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {topic.title}
                    </h2>
                    <p className="text-slate-600 mt-2 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                  <div className="text-blue-500 group-hover:text-blue-600 transition-colors">
                    →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModulePage; 