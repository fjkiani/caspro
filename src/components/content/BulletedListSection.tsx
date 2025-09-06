'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BulletedListSectionData } from '@/types/pages';

const BulletedListSection: React.FC<{ data: BulletedListSectionData }> = ({ data }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
        >
            <h2 className="text-3xl font-bold text-slate-100 mb-6">{data.headline}</h2>
            <div className="space-y-6">
                {data.bullets.map((bullet, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="pl-4 border-l-2 border-red-500"
                    >
                        <h3 className="font-semibold text-xl text-slate-200 mb-1">{bullet.title}</h3>
                        <p className="text-slate-400">{bullet.text}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default BulletedListSection; 
 
