'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Join Our Team</h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Help us revolutionize cancer treatment with AI-powered precision oncology tools.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl mb-12 text-center">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">We're Growing!</h2>
              <p className="text-slate-700 mb-6">
                We're currently building our team and will be posting open positions soon.
                Please check back later or contact us to express your interest.
              </p>
              <Link
                href={ROUTES.CONTACT}
                className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors"
              >
                Contact Us
              </Link>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Why Join CasPro?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Meaningful Work</h3>
                  <p className="text-slate-700">
                    Contribute to technology that has the potential to transform cancer treatment and save lives.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Cutting-Edge Tech</h3>
                  <p className="text-slate-700">
                    Work with the latest AI technologies and computational biology tools.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Collaborative Environment</h3>
                  <p className="text-slate-700">
                    Join a diverse team of scientists, engineers, and healthcare experts.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Growth Opportunities</h3>
                  <p className="text-slate-700">
                    Develop your skills and career in a rapidly evolving field.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Stay Connected</h2>
              <p className="text-slate-700 mb-6">
                Follow us on social media or join our mailing list to be notified when positions open up.
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="#" className="text-primary hover:text-primary-dark">LinkedIn</Link>
                <Link href="#" className="text-primary hover:text-primary-dark">Twitter</Link>
                <Link href={ROUTES.CONTACT} className="text-primary hover:text-primary-dark">Contact</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
} 