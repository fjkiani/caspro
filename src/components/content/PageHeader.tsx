'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PageHeaderData } from '@/types/pages';

const PageHeader: React.FC<{ data: PageHeaderData }> = ({ data }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
        >
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6 leading-tight">
                {data.title}
            </h1>
            <p className="text-lg text-slate-400 max-w-4xl">
                {data.introduction}
            </p>
        </motion.div>
    );
};

export default PageHeader;
