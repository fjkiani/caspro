'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Dna, Activity, Apple, MessageSquare, BarChart3, Map, Database, Link, ListChecks, TrendingUp, Fingerprint } from 'lucide-react';
import { toxicityData } from '@/data/copilots/toxicity-data';
import { pathwayData } from '@/data/copilots/pathway-data';
import { therapyFitData } from '@/data/copilots/therapy-fit-data';

interface ObservedOutcomesSectionProps {
  dataSource?: 'toxicity' | 'pathway' | 'therapy-fit';
}

export default function ObservedOutcomesSection({ dataSource = 'toxicity' }: ObservedOutcomesSectionProps) {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Dna,
    Activity,
    Apple,
    MessageSquare,
    BarChart3,
    Map,
    Database,
    Link,
    ListChecks,
    TrendingUp,
    Fingerprint,
  };

  const data = dataSource === 'pathway' ? pathwayData : 
               dataSource === 'therapy-fit' ? therapyFitData : 
               toxicityData;
  const title = dataSource === 'pathway' ? 'Pathway Analysis' : 
                dataSource === 'therapy-fit' ? 'Therapy Fit' : 
                'Toxicity Risk Assessment';

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    green: 'bg-green-100 text-green-600 border-green-200',
    purple: 'bg-purple-100 text-purple-600 border-purple-200',
    orange: 'bg-orange-100 text-orange-600 border-orange-200',
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Observed Outcomes
          </h2>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            Real capabilities and metrics from our {title.toLowerCase()} system
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.observedOutcomes.map((outcome, idx) => {
            const Icon = iconMap[outcome.icon] || Dna;
            const colorClass = colorMap[outcome.color] || colorMap.blue;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`bg-white rounded-2xl p-6 shadow-xl border-2 ${colorClass.split(' ')[2]}`}
              >
                <div className={`w-12 h-12 rounded-full ${colorClass.split(' ')[0]} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${colorClass.split(' ')[1]}`} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {outcome.title}
                </h3>
                
                <div className={`text-2xl font-bold mb-2 ${colorClass.split(' ')[1]}`}>
                  {outcome.keyMetric}
                </div>
                
                <p className="text-sm text-slate-600 leading-relaxed">
                  {outcome.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

