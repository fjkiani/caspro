/**
 * Monitoring Metrics Data - Data-Driven, Patient-Friendly
 * Aligned with CSI validation context and journey levels
 */

import { BarChart3, Activity, FileText, Dna, Calendar, AlertTriangle } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface MonitoringMetricData {
  id: string;
  name: string;
  shortName: string; // For patient-friendly display
  unlockLevel: number;
  unlockReason: string;
  iconName: 'BarChart3' | 'Activity' | 'FileText' | 'Dna' | 'Calendar' | 'AlertTriangle'; // Icon identifier
  
  // Patient-friendly explanations
  whatItIs: string; // Simple explanation
  whyItMatters: string; // Why this matters for treatment
  whatItMeasures: string; // What the test actually measures
  
  // Clinical context
  whenToCheck: string; // When this is typically checked
  normalRange?: string; // What's normal (if applicable)
  alertThreshold?: string; // When to worry
  
  // Example values
  exampleValue: string | number;
  exampleTrend: 'up' | 'down' | 'stable' | 'alert';
  exampleInterpretation: string;
  
  // Validation context
  validationSource?: string; // Where this is validated
  clinicalEvidence?: string; // Clinical evidence supporting this
}

// Icon mapping
export const iconMap: Record<string, LucideIcon> = {
  BarChart3,
  Activity,
  FileText,
  Dna,
  Calendar,
  AlertTriangle
};

export interface MonitoringAlertData {
  id: string;
  name: string;
  unlockLevel: number;
  whatItIs: string;
  whyItMatters: string;
  example: string;
}

/**
 * Level 1 Metrics - Basic Monitoring (CSI Score, CA-125, Imaging)
 */
export const level1Metrics: MonitoringMetricData[] = [
  {
    id: 'csi',
    name: 'CSI Score',
    shortName: 'ChemoSensitivity Index',
    unlockLevel: 1,
    unlockReason: 'Basic patient info (stage, cancer type)',
    iconName: 'BarChart3',
    whatItIs: 'A score from 0-100 that predicts how well chemotherapy will work for your specific tumor, right now',
    whyItMatters: 'Tells your doctor if platinum, PARPi, or DDR-targeted therapy is likely to work. Higher score = better chance of success',
    whatItMeasures: 'How sensitive your tumor is to chemotherapy based on DNA repair biology, treatment history, and early response signals',
    whenToCheck: 'Before starting new treatment, and then every 1-3 months during treatment',
    normalRange: '70-100 = Good response expected. Below 70 = Consider alternative therapy',
    alertThreshold: 'CSI drops below 70 = Early warning that treatment might be failing',
    exampleValue: 72,
    exampleTrend: 'down',
    exampleInterpretation: 'CSI 72 = 72% chance of 6-month progression-free survival. Dropped from 78 = Monitor closely, may need to switch therapy soon',
    validationSource: 'TOPACIO trial validation (AUROC 0.714, p=0.023)',
    clinicalEvidence: 'Validated on 2,200+ patients. Predicts 6-month PFS probability for DDR-targeted therapy'
  },
  {
    id: 'ca125',
    name: 'CA-125',
    shortName: 'Tumor Marker',
    unlockLevel: 1,
    unlockReason: 'Basic patient info (stage, cancer type)',
    iconName: 'Activity',
    whatItIs: 'A protein in your blood that ovarian cancer cells produce. Higher levels = more cancer activity',
    whyItMatters: 'Rising or plateauing CA-125 = early warning that treatment might be failing, even before scans show it',
    whatItMeasures: 'How much cancer activity is happening in your body. Goes down when treatment works, goes up when cancer grows',
    whenToCheck: 'Every 3-4 weeks during treatment, then every 3 months after treatment',
    normalRange: 'Below 35 = Normal. During treatment, should decline steadily',
    alertThreshold: 'Plateau (stops declining) or rises = Treatment may be failing',
    exampleValue: 900,
    exampleTrend: 'stable',
    exampleInterpretation: 'CA-125 at 900 and not declining = Treatment not working. Expected to drop below 500, but staying flat = Early resistance signal',
    validationSource: 'CA-125 kinetics validated in TOPACIO trial',
    clinicalEvidence: 'CA-125 plateau detected 3-6 weeks before imaging shows progression'
  },
  {
    id: 'imaging',
    name: 'Imaging',
    shortName: 'CT Scans',
    unlockLevel: 1,
    unlockReason: 'Basic patient info (stage, cancer type)',
    iconName: 'FileText',
    whatItIs: 'CT scans (computed tomography) take pictures of your body to see if tumors are growing or shrinking',
    whyItMatters: 'Shows if treatment is working, but imaging lags 6+ weeks behind what biomarkers (CSI, CA-125) can detect',
    whatItMeasures: 'Physical size and location of tumors. Stable = good. Growing = treatment failing. Shrinking = treatment working',
    whenToCheck: 'Every 3 months during treatment, or sooner if symptoms change',
    normalRange: 'Stable or shrinking = Good. Growing = Bad',
    alertThreshold: 'Tumor growth on scan = Treatment failure (but biomarkers detect this 6 weeks earlier)',
    exampleValue: 'No progression',
    exampleTrend: 'stable',
    exampleInterpretation: 'CT shows stable disease = Good, but CSI already dropped 6 weeks ago = Early warning that imaging will show progression soon',
    validationSource: 'Standard imaging protocols',
    clinicalEvidence: 'CSI and CA-125 detect resistance 6 weeks before imaging shows progression'
  }
];

/**
 * Level 2 Metrics - Genomic Monitoring (ctDNA, Active Trials)
 */
export const level2Metrics: MonitoringMetricData[] = [
  {
    id: 'ctdna',
    name: 'ctDNA',
    shortName: 'Liquid Biopsy',
    unlockLevel: 2,
    unlockReason: 'Requires genomic test results (NGS)',
    iconName: 'Dna',
    whatItIs: 'Circulating tumor DNA - tiny pieces of cancer DNA floating in your blood. Like a "liquid biopsy" that doesn\'t require surgery',
    whyItMatters: 'Detects new resistance mutations before they cause treatment failure. Shows which drugs will stop working',
    whatItMeasures: 'New mutations in your blood that indicate the cancer is evolving resistance to current treatment',
    whenToCheck: 'Every 1-2 months during treatment, especially if CSI is dropping or CA-125 is plateauing',
    normalRange: 'No mutations detected = Good. New mutations = Resistance developing',
    alertThreshold: 'New resistance mutation detected = Switch therapy before treatment fails completely',
    exampleValue: 'KRAS G12D: 0.8% VAF',
    exampleTrend: 'alert',
    exampleInterpretation: 'KRAS G12D mutation detected = Platinum resistance developing. Switch to MEK/RAF inhibitor before treatment fails',
    validationSource: 'Post-treatment pathway profiling (AUROC 0.714-0.750, n=11)',
    clinicalEvidence: 'Resistance mutations detected 3-6 weeks before imaging shows progression'
  },
  {
    id: 'trials',
    name: 'Active Trials',
    shortName: 'Clinical Trials',
    unlockLevel: 2,
    unlockReason: 'Requires drug recommendations',
    iconName: 'Calendar',
    whatItIs: 'Clinical trials are research studies testing new treatments. You qualify based on your genomic profile',
    whyItMatters: 'Finds experimental therapies when standard options are running out. Some trials offer cutting-edge treatments not yet FDA-approved',
    whatItMeasures: 'Which clinical trials match your specific tumor biology and treatment history',
    whenToCheck: 'When standard treatments are running out, or when looking for combination therapies',
    normalRange: 'More matches = More options',
    alertThreshold: 'New trial match = New treatment opportunity',
    exampleValue: '3 matches',
    exampleTrend: 'up',
    exampleInterpretation: 'PARP + ATR combo trial = 94% mechanism fit for your tumor. This experimental combination might work when standard therapy fails',
    validationSource: 'Mechanism-based trial matching (96.6% accuracy)',
    clinicalEvidence: 'Trial matching based on DDR pathway alignment, not just mutation lists'
  }
];

/**
 * Level 3 Metrics - Resistance Prediction
 */
export const level3Metrics: MonitoringMetricData[] = [
  {
    id: 'resistance',
    name: 'Resistance Alerts',
    shortName: 'Early Warnings',
    unlockLevel: 3,
    unlockReason: 'Requires resistance prediction',
    iconName: 'AlertTriangle',
    whatItIs: 'Early warnings that your treatment might stop working, detected 3-6 weeks before scans show it',
    whyItMatters: 'Gives you and your doctor time to switch therapy before treatment completely fails. Prevents wasted time on ineffective treatment',
    whatItMeasures: 'Signs that cancer is developing resistance: CSI dropping, new mutations, CA-125 plateauing',
    whenToCheck: 'Continuously monitored - alerts appear automatically when resistance signals detected',
    normalRange: 'No alerts = Treatment working. Alerts = Consider switching therapy',
    alertThreshold: 'Multiple resistance signals = High priority to change treatment',
    exampleValue: 'Active',
    exampleTrend: 'alert',
    exampleInterpretation: 'CSI dropping + new KRAS mutation = Resistance detected. Change therapy now, don\'t wait for next scan',
    validationSource: 'Post-treatment pathway profiling (AUROC 0.714-0.750)',
    clinicalEvidence: 'Resistance detected 3-6 weeks earlier than imaging, enabling proactive therapy switches'
  }
];

/**
 * All Metrics Combined
 */
export const allMonitoringMetrics: MonitoringMetricData[] = [
  ...level1Metrics,
  ...level2Metrics,
  ...level3Metrics
];

/**
 * Alert Types with Explanations
 */
export const alertExplanations: MonitoringAlertData[] = [
  {
    id: 'csi-drop',
    name: 'CSI Score Decreased',
    unlockLevel: 1,
    whatItIs: 'Your CSI score dropped, meaning chemo is becoming less effective',
    whyItMatters: 'Early warning that treatment might be failing. Still above threshold (≥70) = Monitor closely',
    example: 'CSI 78 → 72 = 6-point drop. Still above 70, but declining trend suggests early resistance'
  },
  {
    id: 'ca125-plateau',
    name: 'CA-125 Plateau',
    unlockLevel: 1,
    whatItIs: 'Your CA-125 stopped declining and is staying flat',
    whyItMatters: 'Expected to keep dropping, but plateauing = Treatment may be losing effectiveness',
    example: 'CA-125 stuck at 900 for 3 cycles = Treatment not working, consider switching therapy'
  },
  {
    id: 'resistance-mutation',
    name: 'Resistance Mutation',
    unlockLevel: 3,
    whatItIs: 'New mutation detected in your blood that makes cancer resistant to current treatment',
    whyItMatters: 'Shows exactly why treatment is failing and which drugs to switch to',
    example: 'KRAS G12D detected = Platinum resistance. Switch to MEK/RAF inhibitor'
  },
  {
    id: 'trial-match',
    name: 'New Trial Match',
    unlockLevel: 2,
    whatItIs: 'A clinical trial that matches your specific tumor biology just opened',
    whyItMatters: 'Experimental treatment option when standard therapy is running out',
    example: 'PARP + ATR combo trial = 94% mechanism fit for your DDR-deficient tumor'
  }
];

/**
 * Level-by-Level Unlock Summary
 */
export const levelUnlockSummary = {
  1: {
    title: 'Basic Monitoring',
    metrics: ['CSI Score', 'CA-125', 'Imaging'],
    description: 'Track treatment response with basic biomarkers and imaging',
    dataRequired: 'Basic patient info (stage, cancer type)'
  },
  2: {
    title: 'Genomic Monitoring',
    metrics: ['CSI Score', 'CA-125', 'Imaging', 'ctDNA', 'Active Trials'],
    description: 'Add genomic testing to detect resistance mutations and find clinical trials',
    dataRequired: '+ Genomic test results (NGS)'
  },
  3: {
    title: 'Resistance Prediction',
    metrics: ['CSI Score', 'CA-125', 'Imaging', 'ctDNA', 'Active Trials', 'Resistance Alerts'],
    description: 'Get early warnings 3-6 weeks before imaging shows treatment failure',
    dataRequired: '+ Treatment history (PFI, PTPI, TFI, PFS, OS)'
  },
  4: {
    title: 'Safety & Dosing',
    metrics: ['All previous + Toxicity Alerts'],
    description: 'Prevent dangerous side effects before they happen',
    dataRequired: '+ Genetic safety screening (germline variants)'
  },
  5: {
    title: 'Complete Care Plan',
    metrics: ['All metrics + Full Timeline'],
    description: 'Complete treatment timeline showing progression across all treatment lines',
    dataRequired: '+ Continuous monitoring (CA-125, biomarkers, completeness L2)'
  }
};
