import type { Metadata } from 'next';
import { Target } from 'lucide-react';
import { TrialGatePage } from '@/components/ui/TrialGatePage';
import ProteinPreview from '@/components/sections/mars/previews/ProteinPreview';

export const metadata: Metadata = {
  title: 'Target Validation | CrisPRO.ai',
  description: 'CEACAM5 target validation — AI-powered de-risking map for solid tumor target lock. View the full evidence receipt with access code.',
  openGraph: {
    title: 'Target Validation · CEACAM5 | CrisPRO.ai',
    description: 'AI-powered de-risking map for CEACAM5 solid tumor target validation.',
    url: 'https://crispro.ai/target-validation',
    siteName: 'CrisPRO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Target Validation · CEACAM5 | CrisPRO.ai',
    description: 'AI-powered de-risking map for CEACAM5 solid tumor target validation.',
    site: '@crispro_ai',
  },
};

export default function TargetValidationPage() {
  return (
    <TrialGatePage
      trialId="ceacam5"
      label="CEACAM5"
      sublabel="TARGET-LOCK"
      icon={Target}
      proofUrl="/proof/ceacam5/case"
      PreviewComponent={ProteinPreview}
      description="CEACAM5 (Carcinoembryonic Antigen-Related Cell Adhesion Molecule 5) is a validated solid tumor surface antigen overexpressed in colorectal, gastric, and lung adenocarcinoma. Our AI-powered target validation pipeline maps expression specificity, therapeutic window, and resistance vectors across 47 tumor cohorts."
    />
  );
}
