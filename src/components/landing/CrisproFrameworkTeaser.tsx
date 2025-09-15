'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Dna, Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import { aboutData } from '@/data/about/about-data';

const CrisproFrameworkTeaser = () => {
  const { title, subtitle, description, keyMetrics } = aboutData.hero;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 bg-clip-text text-transparent mb-6">
            {title}
          </h2>
          <p className="text-xl text-slate-600 mb-12">{subtitle}: {description}</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {keyMetrics.map((metric, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  {index === 0 && <ShieldCheck className="w-6 h-6 text-blue-600" />}
                  {index === 1 && <Dna className="w-6 h-6 text-blue-600" />}
                  {index === 2 && <Zap className="w-6 h-6 text-blue-600" />}
                </div>
                <span className="text-lg font-semibold text-slate-700">{metric.label}</span>
              </div>
              <p className="text-4xl font-bold text-slate-900 mb-2">{metric.value}</p>
              <p className="text-slate-500">{metric.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link href="/about" className="inline-flex items-center gap-3 px-10 py-5 bg-slate-800 text-white rounded-xl font-bold text-lg hover:bg-slate-900 transition-colors shadow-xl">
            Learn About Our Framework
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CrisproFrameworkTeaser;
