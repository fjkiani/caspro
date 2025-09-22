'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { learnModules } from '@/data/learn/modules';
const learnModules: any[] = []; // Assuming modules are here

interface LearnLayoutProps {
  children: React.ReactNode;
}

const LearnLayout: React.FC<LearnLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  
  // Determine the current module based on the URL slug
  const currentModuleSlug = pathSegments.length > 1 ? pathSegments[1] : null;
  const currentModule = learnModules.find(m => m.slug === currentModuleSlug);

  return (
    <div className="bg-white text-slate-800 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="md:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold text-slate-500 mb-4">Modules</h2>
              <nav className="space-y-4">
                {learnModules.map((module: any) => (
                  <div key={module.slug}>
                    <h3 className="font-bold text-slate-800 mb-2">{module.title}</h3>
                    <ul className="space-y-1">
                      {module.topics.map((topic: any) => (
                        <li key={topic.slug}>
                          <Link 
                            href={`/learn/${module.slug}/${topic.slug}`}
                            className={`block text-sm transition-colors ${
                              pathname.endsWith(topic.slug)
                                ? 'text-primary font-semibold'
                                : 'text-slate-600 hover:text-primary'
                            }`}
                          >
                            {topic.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-3">
            {children}
          </main>

        </div>
      </div>
    </div>
  );
};

export default LearnLayout;

