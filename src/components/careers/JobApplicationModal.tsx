'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Link as LinkIcon, FileText, Github, Linkedin, ExternalLink } from 'lucide-react';
import { JobListing } from '@/data/careers/jobs';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobListing;
}

interface ApplicationFormData {
  name: string;
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  resume?: string;
  coverLetter?: string;
  whyInterested?: string;
  relevantExperience?: string;
  questions?: string;
}

export default function JobApplicationModal({ isOpen, onClose, job }: JobApplicationModalProps) {
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    portfolio: '',
    resume: '',
    coverLetter: '',
    whyInterested: '',
    relevantExperience: '',
    questions: '',
  });

  const [activeStep, setActiveStep] = useState<'form' | 'preview'>('form');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateEmailContent = (): string => {
    const subject = encodeURIComponent(`Application for ${job.title} - ${formData.name}`);
    
    const body = encodeURIComponent(`Dear CrisPRO.ai Hiring Team,

I am writing to express my interest in the ${job.title} position.

${formData.name ? `Name: ${formData.name}` : '[Your Name]'}
${formData.email ? `Email: ${formData.email}` : '[Your Email]'}
${formData.phone ? `Phone: ${formData.phone}` : ''}

--- APPLICATION DETAILS ---

${formData.whyInterested ? `Why I'm Interested:\n${formData.whyInterested}\n\n` : '[Please tell us why you\'re interested in this role and CrisPRO.ai]'}

${formData.relevantExperience ? `Relevant Experience:\n${formData.relevantExperience}\n\n` : '[Please describe your relevant experience, especially as it relates to:\n' + job.requirements.slice(0, 2).map(r => `- ${r.text}`).join('\n') + ']'}

--- LINKS & PORTFOLIO ---

${formData.linkedin ? `LinkedIn: ${formData.linkedin}` : '[Your LinkedIn Profile]'}
${formData.github ? `GitHub: ${formData.github}` : ''}
${formData.portfolio ? `Portfolio: ${formData.portfolio}` : ''}
${formData.resume ? `Resume/CV: ${formData.resume}` : '[Link to your resume/CV]'}

${formData.coverLetter ? `\n--- COVER LETTER ---\n\n${formData.coverLetter}\n` : ''}

${formData.questions ? `\n--- QUESTIONS ---\n\n${formData.questions}\n` : ''}

I look forward to discussing how my background aligns with your needs.

Best regards,
${formData.name || '[Your Name]'}`);

    // All applications route to fahad@crispro.ai
    const applicationEmail = 'fahad@crispro.ai';
    return `mailto:${applicationEmail}?subject=${subject}&body=${body}`;
  };

  const handleOpenEmail = () => {
    const emailLink = generateEmailContent();
    window.location.href = emailLink;
  };

  const handleCopyEmailContent = async () => {
    const emailContent = decodeURIComponent(generateEmailContent().split('body=')[1] || '');
    try {
      await navigator.clipboard.writeText(emailContent);
      alert('Email content copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const isFormValid = formData.name && formData.email;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full h-full sm:h-auto sm:max-w-3xl sm:max-h-[90vh] sm:rounded-xl bg-white shadow-2xl overflow-hidden flex flex-col"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-4 sm:p-6 flex-shrink-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold pr-2">Apply for {job.title}</h2>
                <p className="text-primary-100 mt-1 text-xs sm:text-sm">
                  Fill out the form, then we'll open your email client with a pre-drafted message
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-primary-100 transition-colors flex-shrink-0 touch-manipulation"
                aria-label="Close"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex-1 p-4 sm:p-6">
            {activeStep === 'form' ? (
              <form className="space-y-6">
                {/* Basic Information */}
                <div className="bg-slate-50 p-3 sm:p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary flex-shrink-0" />
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-slate-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-slate-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-slate-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Links & Portfolio */}
                <div className="bg-slate-50 p-3 sm:p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                    <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary flex-shrink-0" />
                    Links & Portfolio
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4">
                    Share links to your professional profiles, portfolio, or work samples
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 flex items-center">
                        <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-slate-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 flex items-center">
                        <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                        GitHub Profile
                      </label>
                      <input
                        type="url"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-slate-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                        Portfolio/Website
                      </label>
                      <input
                        type="url"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-slate-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                        Resume/CV Link
                      </label>
                      <input
                        type="url"
                        name="resume"
                        value={formData.resume}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-slate-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="https://drive.google.com/... or Dropbox link"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Upload your resume to Google Drive, Dropbox, or similar and share the link
                      </p>
                    </div>
                  </div>
                </div>

                {/* Application Questions */}
                <div className="bg-slate-50 p-3 sm:p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary flex-shrink-0" />
                    Application Questions
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                        Why are you interested in this role and CrisPRO.ai? <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="whyInterested"
                        value={formData.whyInterested}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-slate-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Tell us what excites you about this opportunity and our mission..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                        Relevant Experience <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="relevantExperience"
                        value={formData.relevantExperience}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-slate-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder={`Please describe your relevant experience, especially as it relates to:\n${job.requirements.slice(0, 3).map(r => `• ${r.text}`).join('\n')}`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                        Cover Letter (Optional)
                      </label>
                      <textarea
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-slate-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Additional information you'd like to share..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                        Questions for Us (Optional)
                      </label>
                      <textarea
                        name="questions"
                        value={formData.questions}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-slate-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Any questions about the role, team, or company?"
                      />
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                  <h3 className="font-semibold text-blue-900 mb-2 flex items-center text-sm sm:text-base">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                    Email Preview
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-700">
                    Click the button below to open your email client with a pre-drafted message. You can review and edit it before sending.
                  </p>
                </div>
                <div className="bg-slate-50 p-3 sm:p-4 rounded-lg overflow-x-auto">
                  <pre className="text-xs sm:text-sm text-slate-700 whitespace-pre-wrap font-mono">
                    {decodeURIComponent(generateEmailContent().split('body=')[1] || '').replace(/\n/g, '\n')}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-6 flex-shrink-0">
            {activeStep === 'form' ? (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-slate-700 hover:text-slate-900 transition-colors touch-manipulation text-sm sm:text-base order-2 sm:order-1"
                >
                  Cancel
                </button>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 order-1 sm:order-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setActiveStep('preview')}
                    disabled={!isFormValid}
                    className="px-4 sm:px-6 py-2.5 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base touch-manipulation"
                  >
                    Preview Email
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenEmail}
                    disabled={!isFormValid}
                    className="px-4 sm:px-6 py-2.5 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base touch-manipulation"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Open Email
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActiveStep('form')}
                  className="px-4 py-2.5 text-slate-700 hover:text-slate-900 transition-colors touch-manipulation text-sm sm:text-base order-2 sm:order-1"
                >
                  ← Back to Form
                </button>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 order-1 sm:order-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleCopyEmailContent}
                    className="px-4 py-2.5 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors flex items-center justify-center text-sm sm:text-base touch-manipulation"
                  >
                    Copy Content
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenEmail}
                    className="px-4 sm:px-6 py-2.5 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center justify-center text-sm sm:text-base touch-manipulation"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Open Email
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

