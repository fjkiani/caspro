'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiArrowRight, FiMail, FiMessageSquare, FiBriefcase, FiUser, FiAward, FiCheckCircle } from 'react-icons/fi';
import React from 'react';
import emailjs from '@emailjs/browser';
import DoubleDnaHelix from '@/components/ui/DoubleDnaHelix';
import DnaBasePairStrip from '@/components/ui/DnaBasePairStrip';

// Constants for Contact Section configuration
export const CONTACT_CONFIG = {
  sectionId: 'contact',
  className: 'section bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 text-white',
  animationDelay: 0.2,
  
  // The title is a command, not a question.
  titleText: 'Request a Demo',
  
  // The subtitle is a direct statement of what a briefing entails.
  subtitleText: 'Schedule a demo to witness how our AI command and control platform transforms diagnostic ambiguity and R&D guesswork into your decisive advantage.',
  
  // The CTA is a call to action for commanders.
  ctaText: 'Request Strategic Briefing',
  
  hintText: 'Our AI agents will respond shortly.',
  formTitle: 'Initiate Contact',
  
  // We don't have "partners." We have allies who leverage our power.
  partnerTitle: "Research Use Only",
  
  // Benefits are framed as tactical advantages.
  partnerBenefits: [
      '95.7% AUROC ClinVar (53,210 samples)',
      '73% VUS Resolution Rate',
      '89.1% AUROC BRCA1 Zero-shot',
      '82.6% AUROC SpliceVarDB Exonic Variants'
  ],

  // Social proof is about joining the victors.
    socialProofTitle: ' The CrisPRO Research Platform',
  socialProofOrganizations: [
    'Dana-Farber Cancer Institute', // Represents top-tier clinical/research - for PrecisionRad
    'Vertex Pharmaceuticals',       // Represents biotech/pharma - for CrisPRO
    'Flatiron Health',              // Represents clinical data/EMR - for AgenticEMR
    'Stanford Medicine'             // Represents a leading academic partner
  ],

  animationVariants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: (delay = 0) => ({ duration: 0.6, delay })
  }
};

// Form fields remain functional but are part of a more powerful frame.
export const FORM_FIELDS = [
  { id: 'name', label: 'Full Name', type: 'text', icon: React.createElement(FiUser) },
  { id: 'email', label: 'Work Email', type: 'email', icon: React.createElement(FiMail) },
  { id: 'organization', label: 'Organization / Institution', type: 'text',  icon: React.createElement(FiBriefcase) },
  { id: 'role', label: 'Your Role / Specialty', type: 'text', icon: React.createElement(FiAward) },
];
const MESSAGE_FIELD = {
  id: 'message',
  label: 'Specific Interests or Questions (Optional)',
  placeholder: 'e.g., Interested in variant interpretation, protien structure, CRISPR design, clinical trials, etc.',
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
    <section id={CONTACT_CONFIG.sectionId} className="relative overflow-hidden py-20 lg:py-32 bg-white dark:bg-slate-900">
      {/* DNA Background Elements */}
      <div className="absolute left-4 top-12 w-24 h-4/5 opacity-5 dark:opacity-20 pointer-events-none" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
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
      <div className="absolute right-4 top-20 w-20 h-3/4 opacity-5 dark:opacity-15 pointer-events-none" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
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
      <DnaBasePairStrip className="absolute top-0 left-0 right-0 opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={CONTACT_CONFIG.animationVariants.initial}
            whileInView={CONTACT_CONFIG.animationVariants.animate}
            viewport={{ once: true }}
            transition={CONTACT_CONFIG.animationVariants.transition()}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800 dark:text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
                {CONTACT_CONFIG.titleText}
              </span>
            </h2>
            <p className="text-xl mb-8 text-slate-600 dark:text-indigo-200 leading-relaxed">
              {CONTACT_CONFIG.subtitleText}
            </p>
            
            <div className="mb-10">
              <div className="bg-gray-50 dark:bg-white/10 p-6 rounded-xl border border-gray-200 dark:border-purple-400/30 relative overflow-hidden">
                {/* DNA strand decoration */}
                <div className="absolute right-0 top-0 bottom-0 w-6 opacity-10 dark:opacity-20 pointer-events-none" style={{ perspective: '400px', transformStyle: 'preserve-3d' }}>
                  <DoubleDnaHelix 
                    className="w-full h-full" 
                    baseCount={3}
                    rotationSpeed={15}
                    colors={{
                      adenine: '#9ca3af',
                      thymine: '#9ca3af', 
                      guanine: '#9ca3af',
                      cytosine: '#9ca3af',
                      backbone1: '#9ca3af',
                      backbone2: '#9ca3af'
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-indigo-100 relative z-10">{CONTACT_CONFIG.partnerTitle}</h3>
                <ul className="space-y-3 relative z-10">
                  {CONTACT_CONFIG.partnerBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheckCircle className="text-green-500 dark:text-green-400 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-slate-600 dark:text-indigo-200">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
          
          </motion.div>

          {/* Form */}
          <motion.div
            initial={CONTACT_CONFIG.animationVariants.initial}
            whileInView={CONTACT_CONFIG.animationVariants.animate}
            viewport={{ once: true }}
            transition={CONTACT_CONFIG.animationVariants.transition(CONTACT_CONFIG.animationDelay)}
            className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-900 dark:text-white p-8 md:p-10 rounded-xl shadow-2xl border border-gray-200 dark:border-blue-200/50"
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
                  <label htmlFor={field.id} className="block text-sm font-medium mb-1 text-foreground/80">
                    {field.label}
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      {field.icon}
                    </div>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      onChange={handleChange}
                      className="bg-background/50 w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-shadow shadow-sm focus:shadow-md text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                </div>
              ))}
              
              <div className="relative">
                <label htmlFor={MESSAGE_FIELD.id} className="block text-sm font-medium mb-1 text-foreground/80">
                  {MESSAGE_FIELD.label}
                </label>
                <div className="relative mt-1">
                  <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none text-muted-foreground">
                    {MESSAGE_FIELD.icon}
                  </div>
                  <textarea
                    id={MESSAGE_FIELD.id}
                    name={MESSAGE_FIELD.id}
                    rows={MESSAGE_FIELD.rows}
                    onChange={handleChange}
                    className="bg-background/50 w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-shadow shadow-sm focus:shadow-md text-foreground placeholder:text-muted-foreground"
                    placeholder={MESSAGE_FIELD.placeholder}
                  />
                </div>
              </div>
              
              {submitStatus.message && (
                <div className={`p-3 rounded-lg text-sm text-center ${submitStatus.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : CONTACT_CONFIG.ctaText}
                {!isSubmitting && <FiArrowRight size={20} />}
              </button>
              <p className="text-xs text-center text-muted-foreground mt-3">{CONTACT_CONFIG.hintText}</p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 