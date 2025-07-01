'use client';

import React from 'react';

const CtaSection: React.FC = () => {
  return (
    <section className="text-center">
      <h3 className="text-2xl font-bold text-white mb-4">8.0 The Call to Action</h3>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
        The oncology market is not a space for incremental improvement. The multi-trillion-dollar opportunity 
        lies in providing <strong>definitive solutions</strong>. CrisPRO.ai is the only company with the 
        technology, strategy, and vision to do so.
      </p>
      <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-500 transition-colors duration-300">
        Join Us in Funding the End of This War
      </button>
    </section>
  );
};

export default CtaSection; 