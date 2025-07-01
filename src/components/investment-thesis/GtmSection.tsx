'use client';

import React from 'react';
import { topics } from '@/data/home-topics';

const GtmSection: React.FC = () => {
  const gtmData = topics.find(t => t.title.includes('Go-to-Market'));

  return (
    <section className="mb-20">
      <h3 className="text-2xl font-bold text-white text-center mb-12">
        Go-to-Market Strategy: A Multi-Front War
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        {gtmData?.subtopics?.map((strategy, index) => {
          const emojis = ['🎯', '🏥', '🤝', '🌐'];
          return (
            <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col">
              <div className="text-3xl mb-4">{emojis[index]}</div>
              <h4 className="font-bold text-white mb-2">{strategy.title}</h4>
              <p className="text-sm text-gray-400 flex-grow" dangerouslySetInnerHTML={{ __html: strategy.description }} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GtmSection; 