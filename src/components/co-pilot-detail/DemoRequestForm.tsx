'use client';

import React, { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { Send, Loader, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const DemoRequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || !process.env.NEXT_PUBLIC_EMAILJS_USER_ID) {
      console.error("EmailJS environment variables are not set!");
      setStatus('error');
      return;
    }
    setStatus('submitting');

    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      formData,
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID
    )
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
      }, (err) => {
        console.error('FAILED...', err);
        setStatus('error');
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 p-8 md:p-12 rounded-2xl shadow-2xl border border-slate-700 max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Request a Personalized Demo</h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          See how our AI Co-Pilots can support your workflow. Fill out the form below, and we'll be in touch.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="text" name="name" value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Your Name" required
            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
          />
          <input
            type="email" name="email" value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Your Email" required
            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
          />
        </div>
        <input
          type="text" name="company" value={formData.company}
          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
          placeholder="Company Name (Optional)"
          className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
        />
        <textarea
          name="message" value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          placeholder="Tell us what you're interested in..."
          rows={4}
          className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
        />
        <div className="text-center">
          <button
            type="submit" disabled={status === 'submitting'}
            className="inline-flex items-center justify-center px-8 py-3 w-full md:w-auto bg-primary text-white font-bold text-lg rounded-lg shadow-lg hover:bg-primary/90 transition-all transform hover:scale-105 duration-300 ease-in-out disabled:bg-primary/50 disabled:cursor-not-allowed"
          >
            {status === 'submitting' && <Loader className="animate-spin mr-2" size={22} />}
            {status !== 'submitting' && <Send size={22} className="mr-2" />}
            {status === 'idle' && 'Send Request'}
            {status === 'submitting' && 'Sending...'}
            {status === 'success' && 'Message Sent!'}
            {status === 'error' && 'Try Again'}
          </button>
        </div>
        {status === 'success' && (
          <p className="text-center text-green-400 mt-4 flex items-center justify-center"><CheckCircle size={20} className="mr-2" /> Thank you! We'll get back to you shortly.</p>
        )}
        {status === 'error' && (
          <p className="text-center text-red-400 mt-4 flex items-center justify-center"><AlertTriangle size={20} className="mr-2" /> Something went wrong. Please check your details or try again.</p>
        )}
      </form>
    </motion.div>
  );
};

export default DemoRequestForm; 