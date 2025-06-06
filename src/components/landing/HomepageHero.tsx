'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const HomepageHero = () => {
  return (
    <div className="text-center py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
          The Future of Oncology,
          <br />
          Powered by <span className="text-primary">AI Co-Pilots</span>.
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed mb-10">
          We build intelligent, specialized AI co-pilots that empower clinicians and researchers to accelerate discovery, personalize treatments, and revolutionize patient care across genomics, oncology, and clinical data intelligence.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="#co-pilots">
            <button className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-bold text-lg rounded-lg shadow-lg hover:bg-primary/90 transition-transform transform hover:scale-105 duration-300 ease-in-out">
              Explore Our Co-Pilots
              <ArrowRight size={22} className="ml-2" />
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}; 