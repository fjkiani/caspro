'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TextSectionData } from '@/types/pages';

const TextSection: React.FC<{ data: TextSectionData }> = ({ data }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
        >
            <h2 className="text-3xl font-bold text-slate-100 mb-4">{data.headline}</h2>
            <p className="text-slate-400 whitespace-pre-line">
                {data.body}
            </p>
        </motion.div>
    );
};

export default TextSection;