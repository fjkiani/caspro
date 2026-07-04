'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft, CheckCircle, Users, Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';
;

interface PartnerData {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  color: string;
  bgColor: string;
  fullDescription: string;
  partnership: {
    title: string;
    description: string;
    benefits: string[];
  };
  impact: {
    title: string;
    metrics: Array<{
      label: string;
      value: string;
      description: string;
    }>;
  };
  testimonials: Array<{
    quote: string;
    author: string;
    title: string;
    organization: string;
  }>;
  caseStudies: Array<{
    title: string;
    description: string;
    results: string;
    impact: string;
  }>;
}

interface PartnerPageProps {
  data: PartnerData;
}

const PartnerPage: React.FC<PartnerPageProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Logo */}
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-48 h-48 bg-white rounded-3xl border-4 border-slate-200 shadow-2xl">
                <img 
                  src={data.logo} 
                  alt={`${data.name} logo`}
                  className="w-36 h-36 object-contain"
                />
              </div>
            </div>

            {/* Title */}
            <h1 className={`text-4xl md:text-5xl font-bold ${data.color} mb-6`}>
              {data.name}
            </h1>

            {/* Description */}
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              {data.fullDescription}
            </p>

            {/* Website Link */}
            <a
              href={data.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors duration-300"
            >
              Visit Website
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              {data.partnership.title}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {data.partnership.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className={`${data.bgColor} rounded-2xl p-8`}>
              <h3 className="text-xl font-bold text-slate-800 mb-6">Partnership Benefits</h3>
              <ul className="space-y-4">
                {data.partnership.benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className={`w-5 h-5 ${data.color} mt-0.5 flex-shrink-0`} />
                    <span className="text-slate-700">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">{data.impact.title}</h3>
              <div className="grid grid-cols-2 gap-6">
                {data.impact.metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className={`text-2xl font-bold ${data.color} mb-2`}>
                      {metric.value}
                    </div>
                    <div className="text-sm font-semibold text-slate-800 mb-1">
                      {metric.label}
                    </div>
                    <div className="text-xs text-slate-600">
                      {metric.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Case Studies</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Real-world examples of our collaboration and its impact
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {data.caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200"
              >
                <h3 className="text-xl font-bold text-slate-800 mb-4">{study.title}</h3>
                <p className="text-slate-600 mb-6">{study.description}</p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className={`w-5 h-5 ${data.color} mt-0.5 flex-shrink-0`} />
                    <div>
                      <div className="font-semibold text-slate-800">Results:</div>
                      <div className="text-slate-600">{study.results}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Award className={`w-5 h-5 ${data.color} mt-0.5 flex-shrink-0`} />
                    <div>
                      <div className="font-semibold text-slate-800">Impact:</div>
                      <div className="text-slate-600">{study.impact}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-4">What Our Partners Say</h2>
          </motion.div>

          <div className="grid md:grid-cols-1 gap-8">
            {data.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${data.bgColor} rounded-2xl p-8 text-center`}
              >
                <blockquote className="text-lg text-slate-700 mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <Users className={`w-6 h-6 ${data.color}`} />
                  <div>
                    <div className="font-semibold text-slate-800">{testimonial.author}</div>
                    <div className="text-sm text-slate-600">{testimonial.title}</div>
                    <div className="text-sm text-slate-500">{testimonial.organization}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-6">
              Interested in Partnering with CrisPRO.ai?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              See how organizations use CrisPRO for AI-powered drug development and precision medicine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                Become a Partner
                <ExternalLink className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-3 bg-slate-200 text-slate-800 rounded-lg font-semibold hover:bg-slate-300 transition-colors duration-300"
              >
                About CrisPRO
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PartnerPage;
