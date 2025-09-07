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

      </motion.div>

      <ContactSection />
    </div>
  );
};

export default ContactPage; 