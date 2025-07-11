'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { modules } from '@/data/learn/modules';
import LearnLayout from '@/components/learn/LearnLayout';

interface TopicPageProps {
  params: {
    moduleSlug: string;
    topicSlug: string;
  };
}



const TopicPage: React.FC<TopicPageProps> = ({ params }) => {
  const { moduleSlug, topicSlug } = params;
  const module = modules.find(m => m.slug === moduleSlug);
  const topic = module?.topics.find(t => t.slug === topicSlug);

  if (!module || !topic) {
    notFound();
  }
  
  const TopicComponent = topic.component;

  return (
    <LearnLayout>
      <div className="max-w-5xl">
        <TopicComponent />
      </div>
    </LearnLayout>
  );
};

export default TopicPage; 