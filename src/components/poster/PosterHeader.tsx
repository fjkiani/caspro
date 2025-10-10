import React from 'react';

const PosterHeader: React.FC = () => {
  return (
    <header className="col-span-6 bg-blue-900 text-white p-16 rounded-3xl text-center border-b-8 border-blue-500">
      <h1 className="text-8xl font-black leading-tight mb-8">
        An agentic platform for designing cancer immunotherapies: From automated variant interpretation to in silico therapeutic validation
      </h1>
      <div className="text-4xl font-semibold mb-4">Fahad Kiani, Founder & CTO</div>
      <div className="text-2xl text-blue-200 mb-6">CrisPRO.ai</div>
      
      {/* Research Use Only Disclaimer */}
      <div className="p-4 bg-yellow-500/20 border border-yellow-400/30 rounded-lg inline-block">
        <div className="flex items-center justify-center gap-2">
          <span className="text-yellow-300 text-xl">⚠️</span>
          <span className="text-yellow-200 font-bold text-xl">Research Use Only</span>
        </div>
      </div>
    </header>
  );
};

export default PosterHeader;



