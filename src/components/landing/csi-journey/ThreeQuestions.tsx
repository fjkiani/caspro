'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { csiThreeQuestions } from '@/data/homepage/csi-questions-data';

export default function ThreeQuestions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mb-12"
    >
      <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400 text-center mb-12">
        Three Questions. Three Engines. Clear Answers.
      </h3>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {csiThreeQuestions.map((item, idx) => {
          const Icon = item.icon;
          const colorClasses: Record<string, { cardBorder: string; iconBg: string; text: string; shadowGlow: string }> = {
            blue: { cardBorder: 'hover:border-blue-500/50', iconBg: 'bg-blue-500/10 border-blue-500/20', text: 'text-blue-400', shadowGlow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]' },
            purple: { cardBorder: 'hover:border-purple-500/50', iconBg: 'bg-purple-500/10 border-purple-500/20', text: 'text-purple-400', shadowGlow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]' },
            green: { cardBorder: 'hover:border-emerald-500/50', iconBg: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-400', shadowGlow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]' }
          };
          const colors = colorClasses[item.color] || colorClasses.blue;

          return (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-700/50 ${colors.shadowGlow} ${colors.cardBorder} transition-all duration-300 h-full group relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 transition-opacity opacity-0 group-hover:opacity-100 pointer-events-none" />

              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${colors.iconBg} border flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${colors.text}`} />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-slate-200 mb-4 relative z-10">{item.question}</h4>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed relative z-10">{item.answer}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
