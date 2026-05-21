import type { Metadata } from 'next';
import { Cpu } from 'lucide-react';
import { TrialGatePage } from '@/components/ui/TrialGatePage';
import KillChainPreview from '@/components/sections/mars/previews/KillChainPreview';

export const metadata: Metadata = {
  title: 'Resistance | CrisPRO.ai',
  description: 'CAPRI resistance kill-chain — AI-powered mapping of acquired resistance mechanisms and therapeutic escape routes in oncology.',
  openGraph: {
    title: 'Resistance · CAPRI | CrisPRO.ai',
    description: 'AI-powered kill-chain analysis of acquired resistance mechanisms.',
    url: 'https://crispro.ai/resistance',
    siteName: 'CrisPRO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resistance · CAPRI | CrisPRO.ai',
    description: 'AI-powered kill-chain analysis of acquired resistance mechanisms.',
    site: '@crispro_ai',
  },
};

export default function ResistancePage() {
  return (
    <TrialGatePage
      trialId="capri"
      label="CAPRI"
      sublabel="KILL-CHAIN"
      icon={Cpu}
      proofUrl="/proof/capri/case"
      PreviewComponent={KillChainPreview}
      description="CAPRI (Cancer Acquired-resistance Prediction and Resistance Intelligence) maps the full kill-chain of therapeutic escape — from initial response through acquired resistance. Our system identifies resistance vectors, bypass pathways, and synthetic lethal vulnerabilities before they manifest clinically."
    />
  );
}
