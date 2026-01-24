/**
 * CSI Patient Examples - Data-Driven Patient Scenarios
 * Extracted from FOCUSED_HERO_CONFIG
 * 
 * Source: FOCUSED_HERO_CONFIG.primaryUseCase.example
 */

import { Dna, Clock, FlaskConical } from 'lucide-react';

export interface CSIPatientExample {
  name: string;
  age: number;
  cancer: string;
  scenario: string;
  inputs: {
    label: string;
    value: string;
    icon: typeof Dna;
    color: string;
  }[];
  result: {
    score: number;
    probability: string;
    recommendation: string;
  };
  validation: string;
}

export const csiPatientExamples: CSIPatientExample[] = [
  {
    name: "Sarah",
    age: 58,
    cancer: "ovarian",
    scenario: "Ovarian cancer patient, 2nd-line, evaluating PARP inhibitor after platinum",
    inputs: [
      {
        label: "DDR Status",
        value: "DDR_defective (BRCA-mutant, HRD+)",
        icon: Dna,
        color: "text-blue-600"
      },
      {
        label: "Treatment Timing",
        value: "PFI 14 months (favorable)",
        icon: Clock,
        color: "text-purple-600"
      },
      {
        label: "Early Kinetics",
        value: "KELIM 1.2 (favorable early response to prior platinum)",
        icon: FlaskConical,
        color: "text-green-600"
      }
    ],
    result: {
      score: 72,
      probability: "High probability of 6-month PFS",
      recommendation: "RECOMMEND PARPi"
    },
    validation: "Validated on 2,200+ patients. This specific scenario validated in TOPACIO trial (AUROC 0.714, p=0.023)."
  }
];
