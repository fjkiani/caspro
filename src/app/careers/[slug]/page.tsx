import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getJobBySlug } from '@/data/careers/jobs';
import JobDetail from '@/components/careers/JobDetail';

interface JobPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const job = getJobBySlug(params.slug);

  if (!job) {
    return {
      title: 'Job Not Found',
    };
  }

  return {
    title: `${job.title} - Careers | CrisPRO.ai`,
    description: job.description,
  };
}

export default function JobPage({ params }: JobPageProps) {
  const { slug } = params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <JobDetail job={job} />
      </div>
    </main>
  );
}

