'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

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
  title = 'Explore CrisPRO Products',
  className = '' 
}: RelatedProductsSectionProps) {
  return (
    <section className={`py-16 bg-slate-800/30 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Rocket className="w-6 h-6 text-green-400" />
            <h2 className="text-3xl font-bold text-white">{title}</h2>
          </div>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Discover how CrisPRO products power transformation across industries
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={`/products/${product.slug}`}>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300 h-full flex flex-col group">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-slate-300 text-sm flex-grow mb-4">{product.subtitle}</p>
                  <span className="text-green-400 font-semibold text-sm group-hover:text-green-300 transition-colors">
                    Explore product →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

