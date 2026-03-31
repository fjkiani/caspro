'use client';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { JobListing } from '@/data/careers/jobs';
import { ROUTES } from '@/constants/routes';
import { ArrowLeft } from 'lucide-react';
import JobApplicationModal from './JobApplicationModal';

interface JobDetailProps {
  job: JobListing;
}

export default function JobDetail({ job }: JobDetailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'co-founder':
        return 'bg-purple-100 text-purple-800';
      case 'full-time':
        return 'bg-blue-100 text-blue-800';
      case 'part-time':
        return 'bg-green-100 text-green-800';
      case 'contract':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'founding':
        return 'bg-indigo-100 text-indigo-800';
      case 'senior':
        return 'bg-red-100 text-red-800';
      case 'mid':
        return 'bg-yellow-100 text-yellow-800';
      case 'junior':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Back Button */}
      <Link
        to={ROUTES.CAREERS}
        className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Careers
      </Link>

      {/* Header */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{job.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-3 py-1 rounded-md text-sm font-medium ${getJobTypeColor(job.type)}`}>
                {job.type === 'co-founder' ? 'Co-Founder' : job.type.replace('-', ' ')}
              </span>
              <span className={`px-3 py-1 rounded-md text-sm font-medium ${getLevelColor(job.level)}`}>
                {job.level === 'founding' ? 'Founding' : job.level.charAt(0).toUpperCase() + job.level.slice(1)}
              </span>
              <span className="px-3 py-1 rounded-md text-sm font-medium bg-slate-100 text-slate-700">
                {job.location}
              </span>
              <span className="px-3 py-1 rounded-md text-sm font-medium bg-slate-100 text-slate-700">
                {job.department}
              </span>
            </div>
            <p className="text-slate-600 mb-4">{job.description}</p>
            <p className="text-sm text-slate-500">Posted: {formatDate(job.postedDate)}</p>
          </div>
        </div>
      </div>

      {/* Responsibilities */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 mb-6">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Responsibilities</h2>
        <ul className="space-y-3">
          {job.responsibilities.map((resp, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-primary mr-3 mt-1">•</span>
              <span className="text-slate-700 flex-1">{resp.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Requirements */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 mb-6">
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Requirements</h2>
        <ul className="space-y-3">
          {job.requirements.map((req, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-primary mr-3 mt-1">✓</span>
              <span className="text-slate-700 flex-1">{req.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Nice to Have */}
      {job.niceToHave && job.niceToHave.length > 0 && (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 mb-6">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Nice to Have</h2>
          <ul className="space-y-3">
            {job.niceToHave.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-slate-400 mr-3 mt-1">+</span>
                <span className="text-slate-600 flex-1">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Benefits */}
      {job.benefits && job.benefits.length > 0 && (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 mb-6">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Benefits</h2>
          <ul className="space-y-3">
            {job.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">★</span>
                <span className="text-slate-700 flex-1">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {job.tags && job.tags.length > 0 && (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 mb-6">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-md text-sm bg-slate-100 text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Apply Button */}
      <div className="bg-primary/10 p-8 rounded-lg border border-primary/20">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Ready to Apply?</h2>
          <p className="text-slate-600 mb-6">
            Join us in revolutionizing cancer treatment with AI-powered precision oncology tools.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-block bg-primary text-white px-8 py-3 rounded-md hover:bg-primary-dark transition-colors font-medium"
          >
            Apply Now
          </button>
        </div>
      </div>

      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={job}
      />
    </motion.div>
  );
}

