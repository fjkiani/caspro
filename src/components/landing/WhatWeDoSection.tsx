'use client';

import React from 'react';
import { motion } from 'framer-motion';
;
import { ArrowRight } from 'lucide-react';
import { WHAT_WE_DO_CONTENT } from '@/data/homepage/what-we-do-content';
import Link from 'next/link';

export default function WhatWeDoSection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            What <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Only CrisPRO.ai</span> Can Do
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-4">
            Unique capabilities that set us apart - capabilities no other platform can match.
          </p>
          <p className="text-base text-slate-600 max-w-3xl mx-auto">
            These are our MOAT advantages: validated, exotic, and structurally impossible for generic AI to replicate.
          </p>
        </motion.div>

        {/* Two-Column Grid for 6 items (3 rows x 2 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {WHAT_WE_DO_CONTENT.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Link href={item.link} className="block h-full">
                <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 hover:border-blue-400 shadow-lg hover:shadow-xl transition-all h-full flex flex-col">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  
                  {/* Title & Description */}
                  <h3 className={`text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${item.gradient}`}>
                    {item.title}
                  </h3>
                  <p className="text-slate-600 mb-6 flex-grow">
                    {item.description}
                  </p>
                  
                  {/* Capabilities List */}
                  <ul className="space-y-2 mb-6">
                    {item.capabilities.map((capability, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Metrics */}
                  {item.metrics && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.metrics.map((metric, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Link */}
                  <div className="flex items-center gap-2 text-blue-600 font-semibold mt-auto">
                    <span>{`See ${item.title}`}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

