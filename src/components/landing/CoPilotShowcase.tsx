'use client';

import { coPilotDetailsData } from '@/data/coPilotDetails';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Dna, FileText } from 'lucide-react';
import Link from 'next/link';
;

const icons: { [key: string]: React.ReactNode } = {
  'crispr-intelligence': <Dna size={28} />,
  'precision-rad': <Brain size={28} />,
  'agentic-emr': <FileText size={28} />,
};

export const CoPilotShowcase = () => {
  const coPilots = Object.values(coPilotDetailsData);

  return (
    <div id="co-pilots" className="py-20">
      <div className="grid md:grid-cols-3 gap-8">
        {coPilots.map((pilot, index) => (
          <motion.div
            key={pilot.slug}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 flex flex-col hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-primary">
                {icons[pilot.slug] || <Brain size={28} />}
              </div>
              <h3 className="text-xl font-bold text-white">{pilot.pageTitle.split(':')[0]}</h3>
            </div>
            <p className="text-slate-300 flex-grow mb-6">{pilot.heroSubtitle}</p>
            <Link href={`/platform/${pilot.slug}`}>
              <span className="inline-flex items-center font-semibold text-primary hover:text-primary/80">
                {`Explore ${pilot.pageTitle.split(':')[0]}`} <ArrowRight size={20} className="ml-2" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 