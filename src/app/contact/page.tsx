'use client';

import React from 'react';
import ContactSection from '@/components/sections/ContactSection';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="bg-gray-950 text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative bg-gradient-to-b from-gray-900 to-gray-950 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
              Whether you're interested in a demo, exploring investment opportunities, or have any other questions, our team is ready to help.
            </p>
          </div>
        </div>
      </motion.div>

      <ContactSection />

      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            <h2 className="text-3xl font-bold tracking-tight text-white">Contact Information</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
              <div className="bg-gray-900 p-8 rounded-2xl">
                <div className="flex items-center gap-x-4">
                    <Mail className="h-7 w-7 text-primary" aria-hidden="true" />
                    {/* <h3 className="text-lg font-semibold leading-7 text-white">Email</h3> */}
                </div>
                {/* <p className="mt-6 text-base leading-7 text-gray-300">
                  For inquiries, email us at <a href="mailto:jedi@jedilabs.org" className="font-semibold text-primary hover:text-primary/80">jedi@jedilabs.org</a>.
                </p> */}
              </div>
               {/* <div className="bg-gray-900 p-8 rounded-2xl">
                <div className="flex items-center gap-x-4">
                    <Phone className="h-7 w-7 text-primary" aria-hidden="true" />
                    <h3 className="text-lg font-semibold leading-7 text-white">Phone</h3>
                </div>
                <p className="mt-6 text-base leading-7 text-gray-300">
                  Call us at <a href="tel:+15555555555" className="font-semibold text-primary hover:text-primary/80">(555) 555-5555</a>.
                </p>
              </div>
              <div className="bg-gray-900 p-8 rounded-2xl sm:col-span-2">
                <div className="flex items-center gap-x-4">
                    <MapPin className="h-7 w-7 text-primary" aria-hidden="true" />
                    <h3 className="text-lg font-semibold leading-7 text-white">Office</h3>
                </div>
                <p className="mt-6 text-base leading-7 text-gray-300">
                  123 Innovation Drive, Biotech City, NY 10001
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 