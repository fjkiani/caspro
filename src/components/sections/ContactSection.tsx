'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiArrowRight, FiMail, FiMessageSquare, FiBriefcase, FiUser, FiAward, FiCheckCircle } from 'react-icons/fi';
import React from 'react';

// Constants for Contact Section configuration
const CONTACT_CONFIG = {
  sectionId: 'contact',
  className: 'section bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 text-white',
  animationDelay: 0.2, // Adjusted for form appearance
  titleText: 'Ready to Transform Cancer Care with CasPro?',
  subtitleText: 'Request a personalized demo to see how CasPro can enhance your oncology practice, accelerate your research, or integrate with your drug discovery pipeline.',
  ctaText: 'Request My Personalized Demo',
  hintText: 'Our team typically responds within 24 business hours.',
  formTitle: 'Get in Touch for a Demo',
  partnerTitle: "Why Leading Institutions Partner with CasPro",
  partnerBenefits: [
      'Access state-of-the-art AI models (Evo2, AlphaFold 3) with validated accuracy.',
      'Streamline complex genomic analysis and therapy design workflows.',
      'Operate on a secure, HIPAA-compliant, and scalable cloud platform.',
      'Receive dedicated support and collaboration from our clinical and technical experts.'
  ],
  socialProofTitle: 'Trusted by Innovators in Oncology',
  socialProofOrganizations: [
    'Global Cancer Research Institute',
    'Precision Medicine Hub',
    'Genomic Solutions Ltd.',
    'University Oncology Center',
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
  const [formData, setFormData] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Actual form submission logic (e.g., API call) would go here
    console.log('Form submitted with data:', formData);
    alert('Thank you for your request! We will be in touch shortly.');
    // Reset form if needed
  };

  return (
    <section id={CONTACT_CONFIG.sectionId} className={CONTACT_CONFIG.className}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={CONTACT_CONFIG.animationVariants.initial}
            whileInView={CONTACT_CONFIG.animationVariants.animate}
            viewport={{ once: true }}
            transition={CONTACT_CONFIG.animationVariants.transition()}
          >
            <h2 className="heading-2 mb-6">{CONTACT_CONFIG.titleText}</h2>
            <p className="text-xl mb-8 text-indigo-200 leading-relaxed">
              {CONTACT_CONFIG.subtitleText}
            </p>
            
            <div className="mb-10">
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <h3 className="text-xl font-semibold mb-4 text-indigo-100">{CONTACT_CONFIG.partnerTitle}</h3>
                <ul className="space-y-3">
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
              <div className="grid grid-cols-2 gap-4">
                {CONTACT_CONFIG.socialProofOrganizations.map((org, index) => (
                  <div key={index} className="bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-lg text-center text-indigo-200 text-sm border border-white/10">
                    {org}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={CONTACT_CONFIG.animationVariants.initial}
            whileInView={CONTACT_CONFIG.animationVariants.animate}
            viewport={{ once: true }}
            transition={CONTACT_CONFIG.animationVariants.transition(CONTACT_CONFIG.animationDelay)}
            className="bg-white text-slate-900 p-8 md:p-10 rounded-xl shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-8 text-center text-primary">{CONTACT_CONFIG.formTitle}</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
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
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-shadow shadow-sm focus:shadow-md"
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
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-shadow shadow-sm focus:shadow-md"
                    placeholder={MESSAGE_FIELD.placeholder}
                  ></textarea>
                </div>
              </div>
              
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-base hover:shadow-lg transform hover:scale-105 transition-all duration-150">
                {CONTACT_CONFIG.ctaText} <FiArrowRight />
              </button>
              
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