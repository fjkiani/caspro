'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
;
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

const KillChainCta = () => {
  return (
    <section className="text-center py-24 bg-slate-900/50 rounded-lg my-16">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Witness the Doctrine in Action
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-10">
                The In Silico Kill Chain is not a theoretical model; it is an operational weapons platform for the war on disease. 
                See how CrisPRO.ai delivers on the promise of speed, precision, and certainty.
            </p>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link 
                    href={ROUTES.CONTACT}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transition-colors duration-300"
                >
                    Request a Strategic Briefing <ArrowRight className="ml-2 w-6 h-6" />
                </Link>
            </motion.div>
      </motion.div>
    </section>
  );
};

export default KillChainCta; 