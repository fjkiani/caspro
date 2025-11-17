'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

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

// Reusable PartnerCard Component
const PartnerCard: React.FC<{ partner: Partner; index?: number }> = ({ partner, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: (index || 0) * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-xl p-4 sm:p-5 md:p-6 border border-slate-200 shadow-md hover:shadow-lg transition-all h-full flex flex-col"
    >
      <div className="flex flex-col items-center text-center flex-grow">
        {/* Logo - Compact */}
        <div className="w-full h-24 sm:h-28 md:h-32 flex items-center justify-center mb-4 sm:mb-5">
          <img 
            src={partner.logo} 
            alt={`${partner.name} logo`}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Content */}
        <h3 className={`text-base sm:text-lg md:text-xl font-bold ${partner.color} mb-2 sm:mb-3`}>
          {partner.name}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3 sm:mb-4 flex-grow">
          {partner.description}
        </p>
        
        {/* Website Link */}
        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-500 hover:text-slate-700 transition-colors mt-auto"
        >
          Visit Website
          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
        </a>
      </div>
    </motion.div>
  );
};

const TrustedBy: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play slider
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % partners.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    goToSlide((currentIndex - 1 + partners.length) % partners.length);
  };

  const goToNext = () => {
    goToSlide((currentIndex + 1) % partners.length);
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-r from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Updated with Doctrine Messaging */}
        <div className="text-center mb-10 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4"
          >
            Trusted By Leading Organizations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto"
          >
            CrisPRO.ai builds trust through transparency and auditability. World-class research institutions 
            and technology leaders trust us to accelerate breakthrough discoveries with honest limitations 
            and evidence-backed recommendations.
          </motion.p>
        </div>

        {/* Partners Container - Grid on Desktop, Slider on Mobile/Tablet */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Arrows - Only show on mobile/tablet */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 border border-slate-200 lg:hidden"
            aria-label="Previous partner"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110 border border-slate-200 lg:hidden"
            aria-label="Next partner"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
          </button>

          {/* Desktop: Show all partners in compact grid */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-4 sm:gap-6">
          {partners.map((partner, index) => (
              <PartnerCard key={partner.id} partner={partner} index={index} />
            ))}
          </div>

          {/* Tablet/Mobile: Slider */}
          <div className="lg:hidden overflow-hidden px-12 sm:px-16">
            <AnimatePresence mode="wait">
            <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <PartnerCard partner={partners[currentIndex]} />
              </motion.div>
            </AnimatePresence>
                </div>

          {/* Dots Indicator - Only show on mobile/tablet */}
          <div className="flex justify-center gap-2 mt-6 sm:mt-8 lg:hidden">
            {partners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 sm:w-10 bg-blue-600'
                    : 'w-2 sm:w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
              </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10 sm:mt-12"
        >
          <p className="text-slate-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Interested in partnering with CrisPRO.ai?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 text-sm sm:text-base"
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