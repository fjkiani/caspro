'use client';

import React from 'react';
import { notFound } from 'next/navigation';
// import { learnModules } from '@/data/learn/modules';
const learnModules: any[] = [];
import LearnLayout from '@/components/learn/shared/LearnLayout';
import * as TopicComponents from '@/components/learn/topics';

interface TopicPageProps {
  params: {
    moduleSlug: string;
    topicSlug: string;
  };
}

// Dynamic rendering - no static generation needed

const TopicPage: React.FC<TopicPageProps> = ({ params }) => {
  const { moduleSlug, topicSlug } = params;

  const module = learnModules.find(m => m.slug === moduleSlug);
  const topic = module?.topics.find((t: any) => t.slug === topicSlug);

  if (!module || !topic) {
    notFound();
  }

  // Dynamically select the component based on the topic's component string
  const TopicComponent = (TopicComponents as any)[topic.component];

  if (!TopicComponent) {
    // Handle case where component string is invalid
    console.error(`Component not found: ${topic.component}`);
    notFound();
  }

  return (
    <LearnLayout>
      <div className="prose prose-lg max-w-none">
        <h1>{topic.title}</h1>
        <p className="lead">{topic.description}</p>
        <hr />
        <TopicComponent />
      </div>
    </LearnLayout>
  );
};

export default TopicPage; 