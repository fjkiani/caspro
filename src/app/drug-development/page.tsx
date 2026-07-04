'use client';

import { motion } from 'framer-motion';
import DrugDevelopmentPlatform from '@/components/homepage/DrugDevelopmentPlatform';
import DrugDevelopmentTransformation from '@/components/landing/DrugDevelopmentTransformation';
import DrugDevelopmentShowcase from '@/components/landing/DrugDevelopmentShowcase';
import CTASection from '@/components/shared/CTASection';
import RelatedLinks from '@/components/shared/RelatedLinks';

export default function DrugDevelopmentPage() {
  return (
    <main className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Transform Drug Development from{' '}
              <span className="text-red-600">Gambling</span> to{' '}
              <span className="text-green-600">Engineering</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Experience our complete 3-stage in-silico pipeline. Every stage includes{' '}
              <strong className="text-purple-600">SAE explainability</strong>—see exactly what the AI is thinking.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Complete AI Engine for Therapeutic Development */}
      <DrugDevelopmentPlatform />

      {/* Drug Development Transformation - 3-Stage Pipeline */}
      <DrugDevelopmentTransformation />

      {/* Interactive Showcase - Try Each Stage Live */}
      <DrugDevelopmentShowcase />

      {/* CTA Section */}
      <CTASection
        title="Ready to eliminate the $2.6B gamble?"
        description="Schedule a demo to see how our 3-stage pipeline transforms your drug development process."
        primaryButton={{
          text: "Schedule Executive Demo",
          href: "/contact",
          color: "blue"
        }}
        secondaryButton={{
          text: "Explore Platform",
          href: "/platform",
          color: "blue"
        }}
        backgroundColor="blue"
        className="py-20"
      />
    
      <RelatedLinks route="/drug-development" />
</main>
  );
}

