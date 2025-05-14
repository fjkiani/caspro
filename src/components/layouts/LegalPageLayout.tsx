'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';
import { LEGAL_PAGES, ROUTES } from '@/constants/routes';

interface LegalPageLayoutProps {
  title: string;
  children: ReactNode;
  subtitle?: string;
  lastUpdated?: string;
  currentPageId?: string;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  children,
  subtitle,
  lastUpdated,
  currentPageId
}) => {
  const animationVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={animationVariants.initial}
            animate={animationVariants.animate}
            transition={animationVariants.transition}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8 pb-8 border-b border-slate-200">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h1>
              {subtitle && <p className="text-lg text-slate-600">{subtitle}</p>}
              {lastUpdated && (
                <p className="text-sm text-slate-500 mt-2">
                  Last Updated: {lastUpdated}
                </p>
              )}
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-3/4">
                <article className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:text-slate-700">
                  {children}
                </article>
              </div>
              
              <div className="lg:w-1/4">
                <div className="bg-slate-50 p-6 rounded-lg sticky top-24">
                  <h3 className="font-semibold text-lg mb-4 text-slate-800">Related Pages</h3>
                  <ul className="space-y-3">
                    {LEGAL_PAGES.map((page) => (
                      <li key={page.id}>
                        <Link 
                          href={page.path} 
                          className={`${currentPageId === page.id 
                            ? 'text-primary font-medium' 
                            : 'text-slate-700 hover:text-primary'}`}
                        >
                          {page.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8 pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-600 mb-3">Have questions?</p>
                    <Link 
                      href={ROUTES.CONTACT} 
                      className="inline-block bg-primary text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-primary-dark transition-colors"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LegalPageLayout; 