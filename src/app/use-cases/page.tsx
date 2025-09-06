'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCases } from '@/data/use-cases';
import { ArrowRight } from 'lucide-react';

const UseCasesPage = () => {
    return (
        <div className="bg-black text-white min-h-screen">
            <main className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6 leading-tight">
                            Use Cases
                        </h1>
                        <p className="text-lg text-slate-400 max-w-4xl">
                            Explore our real-world applications and technical capabilities across different domains.
                        </p>
                    </motion.div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {useCases.map((useCase, index) => (
                            <motion.div
                                key={useCase.metadata.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link href={`/use-cases/${useCase.metadata.slug}`}>
                                    <div className="group bg-slate-900/50 border border-slate-700 rounded-lg p-6 hover:border-red-500/50 transition-all duration-300 cursor-pointer h-full">
                                        <div className="mb-3">
                                            <span className="inline-block bg-red-500/10 text-red-400 text-xs font-medium px-2 py-1 rounded">
                                                {useCase.metadata.category}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-red-400 transition-colors">
                                            {useCase.metadata.title}
                                        </h3>
                                        <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                                            {useCase.metadata.description}
                                        </p>
                                        <div className="flex items-center text-red-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                                            Read More <ArrowRight className="ml-1 w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UseCasesPage; 
 