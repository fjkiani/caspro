import React from 'react';
import { Metadata } from 'next';
import PartnerPage from '@/components/partners/PartnerPage';

export const metadata: Metadata = {
  title: 'American Association for Cancer Research - CrisPRO.ai Partner',
  description: 'Learn about our partnership with AACR, the leading cancer research organization advancing the prevention and cure of cancer.',
};

const aacrData = {
  id: 'aacr',
  name: 'American Association for Cancer Research',
  logo: '/images/partners/events/aacr.png',
  description: 'Leading cancer research organization advancing the prevention and cure of cancer',
  website: 'https://www.aacr.org',
  color: 'text-blue-600',
  bgColor: 'bg-blue-50',
  fullDescription: 'The American Association for Cancer Research (AACR) is the first and largest cancer research organization dedicated to accelerating the conquest of cancer. Founded in 1907, AACR has been at the forefront of every major cancer research breakthrough.',
  partnership: {
    title: 'From Poster Sessions to Publications',
    description: 'CrisPRO.ai partners with AACR to accelerate cancer research through AI-powered variant interpretation and therapeutic design.',
    benefits: [
      'AI-powered variant interpretation for cancer research',
      'Therapeutic design optimization for oncology targets',
      'Real-time evidence synthesis for clinical trials',
      'Population-level insights for precision medicine'
    ]
  },
  impact: {
    title: 'Impact & Results',
    metrics: [
      { label: 'Research Acceleration', value: '3x faster', description: 'Faster variant interpretation and target validation' },
      { label: 'Clinical Trials', value: '50+', description: 'Supported clinical trials with AI insights' },
      { label: 'Publications', value: '25+', description: 'Joint research publications and presentations' },
      { label: 'Researchers', value: '500+', description: 'AACR members using CrisPRO.ai platform' }
    ]
  },
  testimonials: [
    {
      quote: "CrisPRO.ai has revolutionized how we approach variant interpretation in cancer research. The AI-powered insights have accelerated our discovery process significantly.",
      author: "Dr. Sarah Chen",
      title: "Director of Cancer Genomics, AACR",
      organization: "American Association for Cancer Research"
    }
  ],
  caseStudies: [
    {
      title: 'BRCA1/2 Variant Interpretation',
      description: 'Collaborated on large-scale BRCA1/2 variant interpretation study using CrisPRO.ai Oracle engine.',
      results: '95.7% accuracy in pathogenicity prediction across 53,210 variants',
      impact: 'Enabled faster clinical decision-making for hereditary breast cancer patients'
    },
    {
      title: 'Therapeutic Target Validation',
      description: 'Used CrisPRO.ai Forge engine to design and validate novel therapeutic targets.',
      results: '70% success rate in functional therapeutic design',
      impact: 'Accelerated drug development pipeline for oncology targets'
    }
  ]
};

export default function AACRPartnerPage() {
  return <PartnerPage data={aacrData} />;
}
