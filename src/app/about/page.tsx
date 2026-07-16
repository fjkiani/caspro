import type { Metadata } from 'next';
import AboutEpochStepper from '@/components/about/AboutEpochStepper';

export const metadata: Metadata = {
  title: 'About CrisPRO — Why we exist, in four chapters',
  description:
    'CrisPRO is a mechanism-alignment engine for precision oncology. Step through the problem, the thesis, the proof already shipped, and what comes next.',
};

export default function AboutPage() {
  return <AboutEpochStepper />;
}
