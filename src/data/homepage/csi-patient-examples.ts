/**
 * Patient Scenario — LATIFY Trial (STK11/KEAP1-loss NSCLC)
 * Source: docs/trials-data.mdc + docs/landingpage.mdc
 * 
 * Replaces Sarah ovarian cancer example with the LATIFY commercial proof.
 * Most commercially significant trial — Phase III lung cancer, AstraZeneca-backed.
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
    name: "LATIFY Scenario",
    age: 62,
    cancer: "NSCLC",
    scenario: "IO-refractory advanced NSCLC with STK11/KEAP1 co-loss — cold tumor, pembrolizumab failed",
    inputs: [
      {
        label: "DDR Status",
        value: "STK11/KEAP1 co-loss → ATR vulnerability (ddr=0.80)",
        icon: Dna,
        color: "text-blue-600"
      },
      {
        label: "IO Classification",
        value: "Cold/excluded TME — MDSC-driven immunosuppression (io=0.75)",
        icon: Clock,
        color: "text-purple-600"
      },
      {
        label: "Mechanism Match",
        value: "Ceralasertib triggers cGAS-STING → flips cold tumor hot for durvalumab",
        icon: FlaskConical,
        color: "text-green-600"
      }
    ],
    result: {
      score: 0.114,
      probability: "Predicted Futility 90%. HR 0.90 / P 0.287 realization. All 3 gates passed for MOA, but failed on patient selection.",
      recommendation: "FAILURE_PREDICTED: Ceralasertib + Durvalumab"
    },
    validation: "Phase III validated (NCT05450692). Cancer Cell 2025 (PMID 40645185). HUDSON subgroup confirmed (PMCID PMC10957481). $4-7B annual wasted IO spend addressable."
  }
];
