import React from 'react';
export const dynamic = 'force-dynamic';

import MetricsShowcase from '@/components/products/shared/MetricsShowcase';
import { FOCUSED_HERO_CONFIG } from '@/data/homepage/hero-focused-claim';
import { Award, TrendingUp, Target, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "CSI Validation",
  description: "Cancer Signature Index validation studies on the CrisPRO.ai evidence ledger.",
  alternates: { canonical: "/evidence/csi-validation" },
};


export default function CSIValidationPage() {
  const claim = FOCUSED_HERO_CONFIG.primaryClaim;

  const metrics = [
    {
      icon: Award,
      value: '0.714',
      label: 'AUROC',
      description: 'TOPACIO validation - Mechanism fit component (p=0.023)',
      color: 'blue' as const,
      progress: {
        value: 71.4,
        max: 100
      }
    },
    {
      icon: TrendingUp,
      value: '0.85',
      label: 'BRCA/HRD+ Performance',
      description: 'High DDR-defective performance vs 0.58 for HRD-',
      color: 'green' as const,
      progress: {
        value: 85,
        max: 100
      }
    },
    {
      icon: Target,
      value: '35% vs 11%',
      label: 'ORR Difference',
      description: 'BRCA/HRD+ (35% ORR) vs HRD- (11% ORR) - validated mechanism fit',
      color: 'purple' as const
    },
    {
      icon: CheckCircle2,
      value: 'Validated',
      label: 'TOPACIO Trial',
      description: 'Trial matching validated; extending to patient-regimen pairs',
      color: 'teal' as const
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <MetricsShowcase
        badge={{
          text: 'TOPACIO Validation',
          icon: Award,
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800'
        }}
        title={claim.headline}
        subtitle={claim.subheadline}
        metrics={metrics}
        cta={{
          primary: {
            text: 'Calculate CSI for Your Patient',
            href: '/products/oncology'
          },
          secondary: {
            text: 'View Full Methodology',
            href: '/evidence'
          }
        }}
      />
    </div>
  );
}
