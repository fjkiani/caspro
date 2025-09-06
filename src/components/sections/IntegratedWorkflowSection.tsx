'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WORKFLOW_CONFIG } from '@/data/workflow-config';

const IntegratedWorkflowSection: React.FC = () => {
    return (
        <section id="workflow" className="relative bg-white text-slate-800 py-24">
            <div className="container mx-auto px-4 text-center">
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* <h3 className="text-3xl md:text-4xl font-bold text-red-400 tracking-tighter uppercase mb-4">
                        The State of Play: A Broken System
                    </h3>
                    <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-10">
                        Traditional therapeutic development is an expensive, slow, and inefficient war of attrition. We need a new doctrine.
                    </p> */}

                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
                        {WORKFLOW_CONFIG.title}
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
                        {WORKFLOW_CONFIG.subtitle}
                    </p>
                    
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link 
                            href={WORKFLOW_CONFIG.ctaLink}
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transition-colors duration-300"
                        >
                            {WORKFLOW_CONFIG.ctaText} <ArrowRight className="ml-2 w-6 h-6" />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default IntegratedWorkflowSection; 