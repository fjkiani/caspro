'use client';

import React from 'react';
import { topics } from '@/data/home-topics';

const ClinicalPlaybookSection: React.FC = () => {
  const clinicalData = topics.find(t => t.title.includes('Clinical Playbook'));

  return (
    <section className="mb-20">
      <h3 className="text-2xl font-bold text-white text-center mb-4">
        4.0 Dominating the Clinical Playbook: The Actionability Layer
      </h3>
      <p className="text-lg text-gray-400 text-center max-w-3xl mx-auto mb-12">
        The old guard has established a tiered framework for clinical evidence. They see it as a ladder to be 
        slowly climbed over years of research. We see it as a checklist to be conquered in silico in a matter of hours.
      </p>
      
      <div className="space-y-8">
        {clinicalData?.subtopics?.map((item, index) => (
          <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h4 className="text-xl font-bold text-blue-400 mb-3">{item.title}</h4>
            {item.imageUrl && (
              <div className="mb-4">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full rounded-md border border-gray-600"
                />
              </div>
            )}
            <div 
              className="text-gray-300"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClinicalPlaybookSection; 