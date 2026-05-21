import type { Metadata } from 'next';
import { Fingerprint } from 'lucide-react';
import { TrialGatePage } from '@/components/ui/TrialGatePage';
import MoaRadarPreview from '@/components/sections/mars/previews/MoaRadarPreview';

export const metadata: Metadata = {
  title: 'MoA | CrisPRO.ai',
  description: 'LATIFY mechanism-of-action alignment — AI-powered MoA radar mapping drug-target engagement, pathway modulation, and off-target risk.',
  openGraph: {
    title: 'MoA · LATIFY | CrisPRO.ai',
    description: 'AI-powered mechanism-of-action alignment and drug-target engagement mapping.',
    url: 'https://crispro.ai/moa',
    siteName: 'CrisPRO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MoA · LATIFY | CrisPRO.ai',
    description: 'AI-powered mechanism-of-action alignment and drug-target engagement mapping.',
    site: '@crispro_ai',
  },
};

export default function MoaPage() {
  return (
    <TrialGatePage
      trialId="latify"
      label="LATIFY"
      sublabel="MOA-ALIGN"
      icon={Fingerprint}
      proofUrl="/proof/latify/case"
      PreviewComponent={MoaRadarPreview}
      description="LATIFY (Latent Target Identification and Function Yield) aligns mechanism-of-action signatures across drug classes, tumor subtypes, and genomic contexts. Our MoA radar maps pathway engagement, on-target efficacy, and off-target liability in a single interpretable view."
    />
  );
}
