'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export interface RelatedProduct {
  slug: string;
  title: string;
  subtitle: string;
}

interface RelatedProductsSectionProps {
  products: RelatedProduct[];
  title?: string;
  className?: string;
}

export default function RelatedProductsSection({ 
  products, 
  title = 'Explore Other Products',
  className = '' 
}: RelatedProductsSectionProps) {
  return (
    <section className={`mt-24 ${className}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center text-slate-800 mb-12"
      >
        {title}
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {products.map((product, idx) => (
          <motion.div
            key={product.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link href={`/products/${product.slug}`}>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-200 h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{product.title}</h3>
                <p className="text-slate-600 flex-grow">{product.subtitle}</p>
                <span className="mt-4 text-blue-600 font-semibold">Learn more →</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}




