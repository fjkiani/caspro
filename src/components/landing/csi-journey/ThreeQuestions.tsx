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
      <h3 className="text-3xl font-bold text-slate-900 text-center mb-8">
        Three Questions. One Score. Clear Answers.
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {csiThreeQuestions.map((item, index) => {
          const Icon = item.icon;
          const colorClasses = {
            blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
            purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
            green: { bg: 'bg-green-100', text: 'text-green-600' }
          };
          const colors = colorClasses[item.color] || colorClasses.blue;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              className="bg-white rounded-xl p-6 border-2 border-slate-200 shadow-lg hover:shadow-xl transition-all"
            >
              <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${colors.text}`} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{item.question}</h4>
              <p className="text-slate-600 leading-relaxed">{item.answer}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
