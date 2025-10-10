'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  color: string;
  bgColor: string;
}

const partners: Partner[] = [
  {
    id: 'aacr',
    name: 'American Association for Cancer Research',
    logo: '/images/partners/events/aacr.png',
    description: 'Leading cancer research organization advancing the prevention and cure of cancer',
    website: 'https://www.aacr.org',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'uc-berkeley',
    name: 'UC Berkeley',
    logo: '/images/partners/events/UCBerkeley.png',
    description: 'Premier public research university driving innovation in biotechnology and genomics',
    website: 'https://www.berkeley.edu',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  },
  {
    id: 'auth0',
    name: 'Auth0',
    logo: '/images/partners/events/auth0.png',
    description: 'Identity platform providing secure authentication and authorization solutions',
    website: 'https://auth0.com',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  }
];

const TrustedBy: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-slate-800 mb-4"
          >
            Trusted By Leading Organizations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-slate-600 max-w-3xl mx-auto"
          >
            CrisPRO.ai is trusted by world-class research institutions and technology leaders 
            to accelerate and secure breakthrough discoveries in cancer research and therapeutic development.
          </motion.p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/partners/${partner.id}`}>
                <div className="bg-white rounded-2xl p-8 h-full border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg group-hover:scale-105 flex flex-col">
                  {/* Logo - Takes up most of the space */}
                  <div className="flex-1 flex items-center justify-center mb-6">
                    <div className="w-full h-48 flex items-center justify-center bg-transparent">
                      <img 
                        src={partner.logo} 
                        alt={`${partner.name} logo`}
                        className="max-w-full max-h-full object-contain bg-transparent"
                        style={{ backgroundColor: 'transparent' }}
                      />
                    </div>
                  </div>

                  {/* Content - Compact at bottom */}
                  <div className="text-center">
                    <h3 className={`text-lg font-bold ${partner.color} mb-2 group-hover:text-slate-800 transition-colors duration-300`}>
                      {partner.name}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed mb-3">
                      {partner.description}
                    </p>
                    
                    {/* Learn More Link */}
                    <div className="flex items-center justify-center gap-2 text-slate-500 group-hover:text-slate-700 transition-colors duration-300">
                      <span className="text-xs font-medium">Learn more</span>
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 mb-6">
            Interested in partnering with CrisPRO.ai?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Partner With Us
            <ExternalLink className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBy;