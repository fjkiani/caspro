'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { JobListing } from '@/data/careers/jobs';
import { ROUTES } from '@/constants/routes';
import JobApplicationModal from './JobApplicationModal';

interface JobCardProps {
  job: JobListing;
  index?: number;
}

export default function JobCard({ job, index = 0 }: JobCardProps) {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-slate-800 mb-2">{job.title}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${getJobTypeColor(job.type)}`}>
              {job.type === 'co-founder' ? 'Co-Founder' : job.type.replace('-', ' ')}
            </span>
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${getLevelColor(job.level)}`}>
              {job.level === 'founding' ? 'Founding' : job.level.charAt(0).toUpperCase() + job.level.slice(1)}
            </span>
            <span className="px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
              {job.location}
            </span>
          </div>
        </div>
      </div>

      <p className="text-slate-600 mb-4 text-sm line-clamp-3">{job.description}</p>

      <div className="mb-4">
        <h4 className="font-medium text-slate-800 text-sm mb-2">Key Responsibilities:</h4>
        <ul className="text-slate-600 text-xs list-disc list-inside space-y-1">
          {job.responsibilities.slice(0, 3).map((resp, idx) => (
            <li key={idx} className="line-clamp-1">{resp.text}</li>
          ))}
          {job.responsibilities.length > 3 && (
            <li className="text-slate-500 italic">+ {job.responsibilities.length - 3} more</li>
          )}
        </ul>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-slate-800 text-sm mb-2">Requirements:</h4>
        <ul className="text-slate-600 text-xs list-disc list-inside space-y-1">
          {job.requirements.slice(0, 2).map((req, idx) => (
            <li key={idx} className="line-clamp-1">{req.text}</li>
          ))}
          {job.requirements.length > 2 && (
            <li className="text-slate-500 italic">+ {job.requirements.length - 2} more</li>
          )}
        </ul>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <Link
          href={`${ROUTES.CAREERS}/${job.slug}`}
          className="text-primary hover:text-primary-dark text-sm font-medium"
        >
          View Details →
        </Link>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors text-sm font-medium"
        >
          Apply Now
        </button>
      </div>

      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={job}
      />
    </motion.div>
  );
}

