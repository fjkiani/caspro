'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

export interface RelatedIndustry {
  slug: string;
  title: string;
  subtitle: string;
  icon?: string;
}

interface RelatedIndustrySectionProps {
  industries: RelatedIndustry[];
  title?: string;
  className?: string;
}

export default function RelatedIndustrySection({ 
  industries, 
  title = 'See How Industries Use CrisPRO',
  className = '' 
}: RelatedIndustrySectionProps) {
  return (
    <section className={`py-16 bg-slate-50 ${className}`}>
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Briefcase className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold text-slate-800">{title}</h2>
          </div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Discover how different industries leverage CrisPRO to transform their workflows
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, idx) => (
            <motion.div
              key={industry.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={`/industry/${industry.slug}`}>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 h-full flex flex-col group">
                  <div className="text-4xl mb-4">{industry.icon || '🏢'}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {industry.title}
                  </h3>
                  <p className="text-slate-600 text-sm flex-grow mb-4">{industry.subtitle}</p>
                  <span className="text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors">
                    Explore transformation →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

