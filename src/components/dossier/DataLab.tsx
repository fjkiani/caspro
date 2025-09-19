'use client';

import React from 'react';
import DataLabExplorer from '@/components/evidence/interactive/DataLabExplorer';
import { DataLab as DataLabData } from '@/data/dossier/types';

interface DataLabProps {
  data: DataLabData;
}

const DataLab: React.FC<DataLabProps> = ({ data }) => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{data.title}</h3>
        <p className="text-slate-600">{data.subtitle}</p>
      </div>
      
      <DataLabExplorer 
        title={data.browserTitle}
        subtitle={data.browserSubtitle}
        showPipeline={true}
      />
    </div>
  );
};

export default DataLab;

