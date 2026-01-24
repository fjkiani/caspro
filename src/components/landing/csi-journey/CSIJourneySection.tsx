'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FOCUSED_HERO_CONFIG } from '@/data/homepage/hero-focused-claim';
import CoreQuestionSection from './CoreQuestionSection';
import ScoreVisualization from './ScoreVisualization';
import PatientExampleCard from './PatientExampleCard';
import JourneyLevels from './JourneyLevels';
import ThreeQuestions from './ThreeQuestions';

/**
 * CSI Journey Section - Main Orchestrator
 * Data-driven, component-reusable architecture
 * 
 * Replaces: SimpleCSIExplanation.tsx (hard-coded)
 * Uses: Data from validation context + FOCUSED_HERO_CONFIG
 */
export default function CSIJourneySection() {
  const config = FOCUSED_HERO_CONFIG;

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-white via-blue-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <CoreQuestionSection />
        <ScoreVisualization />
        <PatientExampleCard />
        <JourneyLevels />
        <ThreeQuestions />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <Link href={config.cta.primary.href}>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
            >
              <span>{config.cta.primary.text}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
