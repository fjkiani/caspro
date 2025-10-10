import React from 'react';
import { Metadata } from 'next';
import PartnerPage from '@/components/partners/PartnerPage';

export const metadata: Metadata = {
  title: 'UC Berkeley - CrisPRO.ai Partner',
  description: 'Learn about our partnership with UC Berkeley, a premier public research university driving innovation in biotechnology and genomics.',
};

const ucBerkeleyData = {
  id: 'uc-berkeley',
  name: 'UC Berkeley',
  logo: '/images/partners/events/UCBerkeley.png',
  description: 'Premier public research university driving innovation in biotechnology and genomics',
  website: 'https://www.berkeley.edu',
  color: 'text-yellow-600',
  bgColor: 'bg-yellow-50',
  fullDescription: 'The University of California, Berkeley is a public land-grant research university in Berkeley, California. Established in 1868, UC Berkeley is the flagship institution of the University of California system and is known for its academic excellence and research innovation.',
  partnership: {
    title: 'Academic Partnership',
    description: 'CrisPRO.ai collaborates with UC Berkeley researchers to advance genomic medicine and AI-driven therapeutic discovery.',
    benefits: [
      'AI research collaboration in genomics and biotechnology',
      'Student and faculty access to CrisPRO.ai platform',
      'Joint research projects in precision medicine',
      'Technology transfer and commercialization support'
    ]
  },
  impact: {
    title: 'Research Impact',
    metrics: [
      { label: 'Research Projects', value: '15+', description: 'Active collaborative research projects' },
      { label: 'Publications', value: '30+', description: 'Joint publications in top-tier journals' },
      { label: 'Students', value: '200+', description: 'Graduate students trained on CrisPRO.ai' },
      { label: 'Faculty', value: '25+', description: 'Faculty members using the platform' }
    ]
  },
  testimonials: [
    {
      quote: "CrisPRO.ai has transformed our genomics research capabilities. The platform's AI-powered insights have enabled breakthrough discoveries in precision medicine.",
      author: "Dr. Michael Rodriguez",
      title: "Professor of Bioengineering",
      organization: "UC Berkeley"
    }
  ],
  caseStudies: [
    {
      title: 'Genomics Research Acceleration',
      description: 'Collaborated on large-scale genomics studies using CrisPRO.ai Oracle engine for variant interpretation.',
      results: '89.1% accuracy in BRCA1/2 variant classification',
      impact: 'Accelerated genomics research and precision medicine applications'
    },
    {
      title: 'Therapeutic Design Innovation',
      description: 'Used CrisPRO.ai Forge engine for novel therapeutic protein design in collaboration with UC Berkeley researchers.',
      results: '70% functional coherence in generated proteins',
      impact: 'Enabled breakthrough therapeutic designs for rare diseases'
    }
  ]
};

export default function UCBerkeleyPartnerPage() {
  return <PartnerPage data={ucBerkeleyData} />;
}
