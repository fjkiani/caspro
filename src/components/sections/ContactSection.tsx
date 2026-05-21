'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  FiArrowRight,
  FiMail,
  FiMessageSquare,
  FiBriefcase,
  FiUser,
  FiCheckCircle,
  FiPhone,
} from 'react-icons/fi';
import React from 'react';
import emailjs from '@emailjs/browser';
import DoubleDnaHelix from '@/components/ui/DoubleDnaHelix';
import DnaBasePairStrip from '@/components/ui/DnaBasePairStrip';
import { useTheme } from '@/context/ThemeContext';

export const CONTACT_CONFIG = {
  sectionId: 'contact',
  animationDelay: 0.2,
  titleText: 'Request a Demo',
  subtitleText:
    'The current standard of care is a coin toss. Book a live demo to witness our command-and-control platform replace clinical guessing with deterministic, dependency-first therapeutic architecture. Watch us resolve VUS noise in real-time, bypass the stromal cage, and intercept lethal drug-drug interactions before the first dose is drawn. We don\'t guess. We do the math.',
  ctaText: 'Submit Request',
  hintText: 'Required fields are marked with *',
  formTitle: 'Initiate Contact',
  partnerTitle: 'Research Use Only',
  partnerBenefits: [
    '[ A100 TELEMETRY // RESEARCH USE ONLY ]',
    '> AUROC_CLINVAR_53K: [95.7%]',
    '> VUS_RESOLUTION_RATE: [73.0%]',
    '> AUROC_BRCA1_ZERO_SHOT: [89.1%]',
    '> AUROC_SPLICEVAR_EXONIC: [82.6%]', 
  ],
  animationVariants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: (delay = 0) => ({ duration: 0.6, delay }),
  },
};

export type ContactFormField = {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel';
  icon: React.ReactNode;
  required: boolean;
  placeholder: string;
  autoComplete?: string;
  gridClass?: string;
};

/** Required for routing + follow-up. EmailJS template should map these variable names. */
export const CONTACT_FORM_FIELDS: ContactFormField[] = [
  {
    id: 'name',
    name: 'name',
    label: 'FULL NAME',
    type: 'text',
    icon: <FiUser className="w-4 h-4" />,
    required: true,
    placeholder: 'Jane Doe',
    autoComplete: 'name',
    gridClass: 'sm:col-span-1',
  },
  {
    id: 'job_title',
    name: 'job_title',
    label: 'JOB TITLE',
    type: 'text',
    icon: <FiBriefcase className="w-4 h-4" />,
    required: true,
    placeholder: 'Director, Translational Oncology',
    autoComplete: 'organization-title',
    gridClass: 'sm:col-span-1',
  },
  {
    id: 'email',
    name: 'email',
    label: 'WORK EMAIL',
    type: 'email',
    icon: <FiMail className="w-4 h-4" />,
    required: true,
    placeholder: 'you@institution.org',
    autoComplete: 'email',
    gridClass: 'sm:col-span-1',
  },
  {
    id: 'phone',
    name: 'phone',
    label: 'PHONE',
    type: 'tel',
    icon: <FiPhone className="w-4 h-4" />,
    required: true,
    placeholder: '+1 555 123 4567',
    autoComplete: 'tel',
    gridClass: 'sm:col-span-1',
  },
  {
    id: 'organization',
    name: 'organization',
    label: 'ORGANIZATION / INSTITUTION',
    type: 'text',
    icon: <FiBriefcase className="w-4 h-4" />,
    required: true,
    placeholder: 'Company or hospital system',
    autoComplete: 'organization',
    gridClass: 'sm:col-span-2',
  },
];

const MESSAGE_FIELD = {
  id: 'message',
  name: 'message',
  label: 'CONTEXT (OPTIONAL)',
  placeholder:
    'Trial phase, therapeutic area, or questions — helps us prepare your briefing.',
  rows: 4,
  icon: <FiMessageSquare className="w-4 h-4" />,
};

function buildEmailPayload(form: HTMLFormElement): Record<string, string> {
  const fd = new FormData(form);
  const payload: Record<string, string> = {};
  fd.forEach((value, key) => {
    if (typeof value === 'string') payload[key] = value.trim();
  });
  // Alias for templates that still expect `title` instead of `job_title`
  if (payload.job_title && !payload.title) payload.title = payload.job_title;
  return payload;
}

const ContactSection = () => {
  const { isDarkMode } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ message: string; type: 'success' | 'error' | '' }>({
    message: '',
    type: '',
  });

  const inputShell = isDarkMode
    ? 'bg-zinc-950/80 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500/60 focus:ring-cyan-500/20'
    : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20';

  const labelCls = `block text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${
    isDarkMode ? 'text-zinc-400' : 'text-slate-600'
  }`;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitStatus({ message: '', type: '' });

    const payload = buildEmailPayload(form);

    const missing = CONTACT_FORM_FIELDS.filter((f) => f.required && !payload[f.name]?.trim()).map((f) => f.label);
    if (missing.length > 0) {
      setSubmitStatus({
        message: `Please complete: ${missing.join(', ')}.`,
        type: 'error',
      });
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email || '');
    if (!emailOk) {
      setSubmitStatus({ message: 'Enter a valid work email address.', type: 'error' });
      return;
    }

    const phoneDigits = (payload.phone || '').replace(/\D/g, '');
    if (phoneDigits.length < 8) {
      setSubmitStatus({
        message: 'Enter a complete phone number (digits only count; include country / area code).',
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);

    const emailJsUserId = 'uJYd4pcG3X27kg7z-';
    const serviceId = 'service_pbft5vk';
    const templateId = 'template_1hgequt';

    emailjs
      .send(serviceId, templateId, payload, emailJsUserId)
      .then(() => {
        setSubmitStatus({
          message: 'Thank you — we will follow up shortly at the email and phone you provided.',
          type: 'success',
        });
        form.reset();
      })
      .catch(() => {
        setSubmitStatus({
          message: 'Could not send right now. Please retry or email us directly.',
          type: 'error',
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section
      id={CONTACT_CONFIG.sectionId}
      className={`relative overflow-hidden py-16 lg:py-24 transition-colors ${
        isDarkMode ? 'bg-[#020408] text-zinc-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div
        className={`absolute left-4 top-12 w-24 h-4/5 pointer-events-none ${isDarkMode ? 'opacity-10' : 'opacity-[0.06]'}`}
        style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      >
        <DoubleDnaHelix
          className="w-full h-full"
          baseCount={12}
          rotationSpeed={45}
          colors={{
            adenine: '#22d3ee',
            thymine: '#a78bfa',
            guanine: '#34d399',
            cytosine: '#fbbf24',
            backbone1: '#22d3ee',
            backbone2: '#a78bfa',
          }}
        />
      </div>
      <div
        className={`absolute right-4 top-20 w-20 h-3/4 pointer-events-none ${isDarkMode ? 'opacity-10' : 'opacity-[0.05]'}`}
        style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      >
        <DoubleDnaHelix
          className="w-full h-full"
          baseCount={10}
          rotationSpeed={38}
          colors={{
            adenine: '#a78bfa',
            thymine: '#22d3ee',
            guanine: '#fbbf24',
            cytosine: '#34d399',
            backbone1: '#a78bfa',
            backbone2: '#22d3ee',
          }}
        />
      </div>

      <DnaBasePairStrip className="absolute top-0 left-0 right-0 opacity-[0.08]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <motion.div
            className="lg:col-span-5"
            initial={CONTACT_CONFIG.animationVariants.initial}
            whileInView={CONTACT_CONFIG.animationVariants.animate}
            viewport={{ once: true }}
            transition={CONTACT_CONFIG.animationVariants.transition()}
          >
            <p
              className={`text-[10px] font-black uppercase tracking-[0.35em] mb-3 ${
                isDarkMode ? 'text-cyan-500' : 'text-indigo-600'
              }`}
            >
              CONTACT
            </p>
            <h2
              className={`text-3xl md:text-4xl font-black uppercase tracking-tight mb-5 leading-tight ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              {CONTACT_CONFIG.titleText}
            </h2>
            <p
              className={`text-sm md:text-base mb-8 leading-relaxed font-bold uppercase tracking-wide ${
                isDarkMode ? 'text-zinc-400' : 'text-slate-600'
              }`}
            >
              {CONTACT_CONFIG.subtitleText}
            </p>

            <div
              className={`rounded-sm border p-6 relative overflow-hidden ${
                isDarkMode ? 'bg-zinc-950/90 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div
                className="absolute right-0 top-0 bottom-0 w-6 opacity-[0.07] pointer-events-none"
                style={{ perspective: '400px', transformStyle: 'preserve-3d' }}
              >
                <DoubleDnaHelix
                  className="w-full h-full"
                  baseCount={3}
                  rotationSpeed={15}
                  colors={{
                    adenine: '#71717a',
                    thymine: '#71717a',
                    guanine: '#71717a',
                    cytosine: '#71717a',
                    backbone1: '#71717a',
                    backbone2: '#71717a',
                  }}
                />
              </div>
              <h3
                className={`text-xs font-black uppercase tracking-[0.25em] mb-4 relative z-10 ${
                  isDarkMode ? 'text-zinc-300' : 'text-slate-800'
                }`}
              >
                {CONTACT_CONFIG.partnerTitle}
              </h3>
              <ul className="space-y-3 relative z-10">
                {CONTACT_CONFIG.partnerBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FiCheckCircle
                      className={`mt-0.5 flex-shrink-0 w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}
                    />
                    <span
                      className={`text-xs font-bold uppercase tracking-wide ${
                        isDarkMode ? 'text-zinc-400' : 'text-slate-600'
                      }`}
                    >
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial={CONTACT_CONFIG.animationVariants.initial}
            whileInView={CONTACT_CONFIG.animationVariants.animate}
            viewport={{ once: true }}
            transition={CONTACT_CONFIG.animationVariants.transition(CONTACT_CONFIG.animationDelay)}
          >
            <div
              className={`relative rounded-sm border p-6 sm:p-8 md:p-10 overflow-hidden ${
                isDarkMode
                  ? 'bg-zinc-950/95 border-zinc-800 shadow-[0_0_40px_rgba(0,229,255,0.06)]'
                  : 'bg-white border-slate-200 shadow-lg'
              }`}
            >
              <div
                className={`absolute inset-x-0 top-0 h-px ${
                  isDarkMode ? 'bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent' : 'bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent'
                }`}
              />

              <h3
                className={`text-lg sm:text-xl font-black uppercase tracking-[0.2em] mb-2 text-center ${
                  isDarkMode ? 'text-cyan-400' : 'text-indigo-700'
                }`}
              >
                {CONTACT_CONFIG.formTitle}
              </h3>
              <p
                className={`text-center text-[10px] font-bold uppercase tracking-widest mb-8 ${
                  isDarkMode ? 'text-zinc-500' : 'text-slate-500'
                }`}
              >
                {CONTACT_CONFIG.hintText}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5 relative z-10" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {CONTACT_FORM_FIELDS.map((field) => (
                    <div key={field.id} className={field.gridClass ?? ''}>
                      <label htmlFor={field.id} className={labelCls}>
                        {field.label}
                        {field.required ? <span className="text-rose-500 ml-1">*</span> : null}
                      </label>
                      <div className="relative">
                        <div
                          className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                            isDarkMode ? 'text-zinc-500' : 'text-slate-400'
                          }`}
                        >
                          {field.icon}
                        </div>
                        <input
                          type={field.type}
                          id={field.id}
                          name={field.name}
                          autoComplete={field.autoComplete}
                          placeholder={field.placeholder}
                          required={field.required}
                          className={`w-full pl-10 pr-3 py-3 border rounded-sm text-sm font-medium focus:outline-none focus:ring-2 transition-shadow ${inputShell}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor={MESSAGE_FIELD.id} className={labelCls}>
                    {MESSAGE_FIELD.label}
                  </label>
                  <div className="relative">
                    <div
                      className={`absolute top-3 left-0 pl-3 pointer-events-none ${
                        isDarkMode ? 'text-zinc-500' : 'text-slate-400'
                      }`}
                    >
                      {MESSAGE_FIELD.icon}
                    </div>
                    <textarea
                      id={MESSAGE_FIELD.id}
                      name={MESSAGE_FIELD.name}
                      rows={MESSAGE_FIELD.rows}
                      placeholder={MESSAGE_FIELD.placeholder}
                      className={`w-full pl-10 pr-3 py-3 border rounded-sm text-sm font-medium focus:outline-none focus:ring-2 resize-y min-h-[100px] ${inputShell}`}
                    />
                  </div>
                </div>

                {submitStatus.message ? (
                  <div
                    role="alert"
                    className={`p-4 rounded-sm text-xs font-bold uppercase tracking-wide text-center border ${
                      submitStatus.type === 'success'
                        ? isDarkMode
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : isDarkMode
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                          : 'bg-rose-50 border-rose-200 text-rose-800'
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-sm text-[11px] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-2 transition-all border disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDarkMode
                      ? 'bg-cyan-500 text-black border-cyan-400 hover:bg-cyan-400'
                      : 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {isSubmitting ? 'SENDING…' : CONTACT_CONFIG.ctaText}
                  {!isSubmitting ? <FiArrowRight className="w-4 h-4" /> : null}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
