'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiArrowRight, FiMail, FiMessageSquare, FiBriefcase, FiUser, FiAward, FiCheckCircle } from 'react-icons/fi';
import React from 'react';
import emailjs from '@emailjs/browser';
import DoubleDnaHelix from '@/components/ui/DoubleDnaHelix';
import DnaBasePairStrip from '@/components/ui/DnaBasePairStrip';

// Constants for Contact Section configuration
const CONTACT_CONFIG = {
  sectionId: 'contact',
  className: 'section bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 text-white',
  animationDelay: 0.2,
  titleText: 'Ready to Redefine Precision Medicine?',
  subtitleText: 'Request a demo to see how our AI Co-Pilot platform can accelerate your research, enhance clinical decisions, and unlock the full potential of your biomedical data.',
  ctaText: 'Request a Personalized Demo',
  hintText: 'Our team typically responds within one business day.',
  formTitle: 'Schedule a Consultation',
  partnerTitle: "Why Leading Organizations will love CrisPRO",
  partnerBenefits: [
      'Leverage a unified platform with world-class AI for genomics, imaging, and clinical data.',
      'Dramatically accelerate timelines for both therapeutic R&D and clinical decision-making.',
      'Operate on a secure, compliant (HIPAA & GDPR), and infinitely scalable cloud architecture.',
      'Partner with our dedicated experts in AI, biology, and clinical informatics.'
  ],
  socialProofTitle: 'Become a Pioneer in Oncology, Therapeutic Design, and Genomic Medicine',
  socialProofOrganizations: [
    'Dana-Farber Cancer Institute', // Represents top-tier clinical/research - for PrecisionRad
    'Vertex Pharmaceuticals',       // Represents biotech/pharma - for CrisPRO
    'Flatiron Health',              // Represents clinical data/EMR - for AgenticEMR
    'Stanford Medicine'             // Represents a leading academic partner
  ],

  animationVariants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: (delay: number = 0) => ({ duration: 0.6, delay })
  }
};

// Form fields configuration
const FORM_FIELDS = [
  { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Dr. Jane R. Smith', icon: React.createElement(FiUser) },
  { id: 'email', label: 'Work Email', type: 'email', placeholder: 'jane.smith@institution.org', icon: React.createElement(FiMail) },
  { id: 'organization', label: 'Organization / Institution', type: 'text', placeholder: 'Memorial Cancer Institute', icon: React.createElement(FiBriefcase) },
  { id: 'role', label: 'Your Role / Specialty', type: 'text', placeholder: 'Clinical Oncologist, Cancer Researcher, etc.', icon: React.createElement(FiAward) }, // FiAward might be better for specialty
];

const MESSAGE_FIELD = {
  id: 'message',
  label: 'Specific Interests or Questions (Optional)',
  placeholder: 'e.g., Interested in Evo2 for variant interpretation, AlphaFold 3 for structural analysis, or specific cancer types...',
  rows: 4,
  icon: React.createElement(FiMessageSquare)
};

const ContactSection = () => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ message: '', type: '' });

    // Replace with your actual EmailJS User ID, Service ID, and Template ID
    const emailJsUserId = 'uJYd4pcG3X27kg7z-';
    const serviceId = 'service_pbft5vk';
    const templateId = 'template_1hgequt';

    emailjs.send(serviceId, templateId, formData, emailJsUserId)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSubmitStatus({ message: 'Thank you for your request! We will be in touch shortly.', type: 'success' });
        setFormData({}); // Clear form data
        // Find the form element and reset it
        const form = e.target as HTMLFormElement;
        form.reset();
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setSubmitStatus({ message: 'Failed to send message. Please try again later or contact us directly.', type: 'error' });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section id={CONTACT_CONFIG.sectionId} className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 text-white">
      {/* DNA Background Elements */}
      <div className="absolute left-4 top-12 w-24 h-4/5 opacity-20 pointer-events-none" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
        <DoubleDnaHelix 
          className="w-full h-full" 
          baseCount={12}
          rotationSpeed={45}
          colors={{
            adenine: '#60a5fa',
            thymine: '#a78bfa', 
            guanine: '#34d399',
            cytosine: '#fbbf24',
            backbone1: '#60a5fa',
            backbone2: '#a78bfa'
          }}
        />
      </div>
      <div className="absolute right-4 top-20 w-20 h-3/4 opacity-15 pointer-events-none" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
        <DoubleDnaHelix 
          className="w-full h-full" 
          baseCount={10}
          rotationSpeed={38}
          colors={{
            adenine: '#a78bfa',
            thymine: '#60a5fa',
            guanine: '#fbbf24', 
            cytosine: '#34d399',
            backbone1: '#a78bfa',
            backbone2: '#60a5fa'
          }}
        />
      </div>
      
      {/* DNA base pairs decorative element */}
      <DnaBasePairStrip className="absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={CONTACT_CONFIG.animationVariants.initial}
            whileInView={CONTACT_CONFIG.animationVariants.animate}
            viewport={{ once: true }}
            transition={CONTACT_CONFIG.animationVariants.transition()}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
                {CONTACT_CONFIG.titleText}
              </span>
            </h2>
            <p className="text-xl mb-8 text-indigo-200 leading-relaxed">
              {CONTACT_CONFIG.subtitleText}
            </p>
            
            <div className="mb-10">
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-purple-400/30 relative overflow-hidden">
                {/* DNA strand decoration */}
                <div className="absolute right-0 top-0 bottom-0 w-6 opacity-20 pointer-events-none" style={{ perspective: '400px', transformStyle: 'preserve-3d' }}>
                  <DoubleDnaHelix 
                    className="w-full h-full" 
                    baseCount={3}
                    rotationSpeed={15}
                    colors={{
                      adenine: '#ffffff',
                      thymine: '#ffffff', 
                      guanine: '#ffffff',
                      cytosine: '#ffffff',
                      backbone1: '#ffffff',
                      backbone2: '#ffffff'
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-indigo-100 relative z-10">{CONTACT_CONFIG.partnerTitle}</h3>
                <ul className="space-y-3 relative z-10">
                  {CONTACT_CONFIG.partnerBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-indigo-200">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-indigo-100">{CONTACT_CONFIG.socialProofTitle}</h3>
              {/* <div className="grid grid-cols-2 gap-4">
                {CONTACT_CONFIG.socialProofOrganizations.map((org, index) => (
                  <div key={index} className="bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-lg text-center text-indigo-200 text-sm border border-white/10">
                    {org}
                  </div>
                ))}
              </div> */}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={CONTACT_CONFIG.animationVariants.initial}
            whileInView={CONTACT_CONFIG.animationVariants.animate}
            viewport={{ once: true }}
            transition={CONTACT_CONFIG.animationVariants.transition(CONTACT_CONFIG.animationDelay)}
            className="relative bg-white/95 backdrop-blur-sm text-slate-900 p-8 md:p-10 rounded-xl shadow-2xl border border-blue-200/50"
          >
            {/* DNA-themed glowing border for form */}
            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 opacity-80"></div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 opacity-80"></div>
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-indigo-400 opacity-80"></div>
              <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-400 via-purple-400 to-blue-400 opacity-80"></div>
            </div>
            
            <h3 className="text-2xl font-bold mb-8 text-center relative z-10">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                {CONTACT_CONFIG.formTitle}
              </span>
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              {FORM_FIELDS.map((field) => (
                <div key={field.id} className="relative">
                  <label htmlFor={field.id} className="block text-sm font-medium mb-1 text-slate-700">
                    {field.label}
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      {field.icon}
                    </div>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow shadow-sm focus:shadow-md"
                      placeholder={field.placeholder}
                      required
                    />
                  </div>
                </div>
              ))}
              
              <div className="relative">
                <label htmlFor={MESSAGE_FIELD.id} className="block text-sm font-medium mb-1 text-slate-700">
                  {MESSAGE_FIELD.label}
                </label>
                <div className="relative mt-1">
                  <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none text-slate-400">
                    {MESSAGE_FIELD.icon}
                  </div>
                  <textarea
                    id={MESSAGE_FIELD.id}
                    name={MESSAGE_FIELD.id}
                    rows={MESSAGE_FIELD.rows}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow shadow-sm focus:shadow-md"
                    placeholder={MESSAGE_FIELD.placeholder}
                  ></textarea>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2 py-3 text-base bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : CONTACT_CONFIG.ctaText} <FiArrowRight />
              </button>
              
              {submitStatus.message && (
                <div className={`mt-4 text-center text-sm ${submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {submitStatus.message}
                </div>
              )}

              <p className="text-center text-xs text-slate-500 mt-4">
                {CONTACT_CONFIG.hintText}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 