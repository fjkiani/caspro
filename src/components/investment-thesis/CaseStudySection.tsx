'use client';

import React from 'react';
import { topics } from '@/data/home-topics';

const CaseStudySection: React.FC = () => {
  const caseStudyData = topics.find(t => t.title.includes('RUNX1'));

  return (
    <section className="mb-20">
      <h3 className="text-2xl font-bold text-white text-center mb-4">
        5.0 From Theory to Victory: The RUNX1 Conquest Case Study
      </h3>
      <p className="text-lg text-gray-400 text-center max-w-3xl mx-auto mb-12">
        Actions speak louder than words. We will now demonstrate how our platform's capabilities were deployed 
        in a real-world in silico campaign to solve the RUNX1-FPD crisis, obsoleting a multi-year, 
        multi-million dollar grant program in a matter of weeks.
      </p>
      
      <div className="space-y-8">
        {caseStudyData?.subtopics?.map((phase, index) => (
          <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h4 className="text-xl font-bold text-blue-400 mb-3">{phase.title}</h4>
            <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: phase.description }} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudySection; 