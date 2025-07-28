import { TimelineTrack } from '@/components/visualization';

export const targetAcquisitionTimeline: TimelineTrack[] = [
  {
    id: 'data-flow',
    title: 'Data Ingestion Protocol',
    color: '#3b82f6',
    events: [
      { 
        id: 'e1', 
        title: 'Sample Collection', 
        timestamp: 0, 
        riskLevel: 0.1,
        confidenceLevel: 0.95,
        description: 'Biological sample (e.g., tumor biopsy) is collected from the patient.'
      },
      { 
        id: 'e2', 
        title: 'High-Read-Depth WGS', 
        timestamp: 1, 
        riskLevel: 0.2,
        confidenceLevel: 0.98,
        description: 'Whole Genome Sequencing is performed in the lab to generate raw sequence reads.'
      },
      { 
        id: 'e3', 
        title: 'VCF Generation', 
        timestamp: 2, 
        riskLevel: 0.1,
        confidenceLevel: 0.99,
        description: 'Standard bioinformatics pipelines (filtering, mapping, variant calling) produce a VCF file.'
      },
    ],
    stages: [
        {
          id: 's1',
          title: 'Lab & Sequencing',
          startTime: 0,
          endTime: 1.5,
          riskLevel: 0.15,
          description: 'Physical sample handling and sequencing.'
        },
        {
          id: 's2',
          title: 'Bioinformatics Processing',
          startTime: 1.5,
          endTime: 2.5,
          riskLevel: 0.1,
          description: 'Raw data is processed into a structured VCF file.'
        },
      ]
  },
]; 