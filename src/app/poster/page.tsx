import React from 'react';
import { Metadata } from 'next';
import PosterPresentation from '@/components/poster/PosterPresentation';
import './globals.css';

export const metadata: Metadata = {
  title: 'CrisPRO.ai - An Agentic Platform for Designing Cancer Immunotherapies | Poster Presentation',
  description: 'Research poster presentation for CrisPRO.ai platform - automated variant interpretation to in silico therapeutic validation',
};

export default function PosterPage() {
  return <PosterPresentation />;
}
