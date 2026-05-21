// ==============================================================================
// HERO HEADLINES — per-engine typewriter lines
// Every line is a receipt. Every number is from a locked artifact.
// Source: trial-case-files.ts, FDA Prediction Archive, Supabase engine receipts.
// ==============================================================================

export interface EvidenceRow {
  label: string;
  value: string;
  color?: 'accent' | 'rose' | 'emerald' | 'muted';  // defaults to 'accent'
}

export interface HeadlineEntry {
  text: string;        // The headline to type
  highlight?: string;  // Colored suffix — the punchline
  trial?: string;      // Trial reference (for watermark traceability)
  evidence?: {
    title: string;            // Evidence panel title
    rows: EvidenceRow[];      // Key-value rows
    impact?: string;          // Bottom-line impact statement
    impactValue?: string;     // Impact number
    proofId?: string;         // trial id for /proof/[trialId] CTA button
    proofLabel?: string;      // button label override (defaults to 'View De-Risking Map')
  };
}

export const HERO_HEADLINES: Record<string, HeadlineEntry[]> = {

  // ─── Target Lock (L1) ───────────────────────────────────────────────────────
  'target-lock': [
    {
      text: 'Sanofi bet CARMEN-LC03 on CEACAM5.',
      highlight: 'IHC 2+ at ≥50% cells. Too permissive. Primary endpoints: missed.',
      trial: 'CEACAM5 › NCT04154956 › Sanofi Phase III',
      evidence: {
        title: 'Target Expression Gate',
        rows: [
          { label: 'Enrolled Threshold', value: 'IHC 2+ ≥50%', color: 'rose' },
          { label: 'Required Threshold', value: 'IHC 3+ ≥80%', color: 'emerald' },
          { label: 'Target-Lock Score', value: 'HIGH', color: 'accent' },
          { label: 'Enrollment Gate', value: 'UNSELECTED', color: 'rose' },
        ],
        impact: 'Phase III Loss',
        impactValue: '$300M+',
        proofId: 'ceacam5',
      },
    },
    {
      text: 'We locked the prediction before the readout.',
      highlight: 'predictions_2026_02_21.json. Timestamped. Immutable.',
      trial: 'FDA Prediction Archive › Feb 21 2026',
      evidence: {
        title: 'Prospective Archive',
        rows: [
          { label: 'Archive File', value: 'predictions_2026_02_21.json' },
          { label: 'Lock Date', value: 'Feb 21 2026', color: 'accent' },
          { label: 'Prediction', value: 'FAILURE', color: 'rose' },
          { label: 'Outcome', value: 'CONFIRMED', color: 'emerald' },
        ],
        impact: 'Concordance',
        impactValue: '9/9',
        proofId: 'ceacam5',
        proofLabel: 'View FDA Archive',
      },
    },
    {
      text: 'CEACAM5 is a real target. Layer 1 confirmed it.',
      highlight: 'The trial still failed. Because nobody gated Layer 2.',
      trial: 'Two-Layer Thesis › CEACAM5 + LATIFY',
      evidence: {
        title: 'Two-Layer Prediction',
        rows: [
          { label: 'Layer 1 (Target)', value: 'HIGH', color: 'emerald' },
          { label: 'Layer 2 (Enrollment)', value: 'LOW', color: 'rose' },
          { label: 'Combined', value: 'FAIL', color: 'rose' },
        ],
        impact: 'Root Cause',
        impactValue: 'Patient Selection',
        proofId: 'ceacam5',
      },
    },
    {
      text: '9 FDA decisions. 9 correct predictions.',
      highlight: 'Zero false positives. All receipts locked.',
      trial: 'FDA Retroactive Concordance',
      evidence: {
        title: 'FDA Prediction Scorecard',
        rows: [
          { label: 'Total Predictions', value: '9', color: 'accent' },
          { label: 'Correct', value: '9', color: 'emerald' },
          { label: 'False Positives', value: '0', color: 'emerald' },
          { label: 'Prospective Locked', value: '6', color: 'accent' },
        ],
        impact: 'Accuracy',
        impactValue: '100%',
        proofId: 'ceacam5',
        proofLabel: 'View All Predictions',
      },
    },
    {
      text: 'The target was real. The enrollment wasn\'t.',
      highlight: 'IHC 3+ at ≥80% would have found the responders.',
      trial: 'CEACAM5 › Expression Gate Analysis',
      evidence: {
        title: 'Expression Gate Delta',
        rows: [
          { label: 'Responder Profile', value: 'IHC 3+ ≥80%', color: 'emerald' },
          { label: 'Enrolled Profile', value: 'IHC 2+ ≥50%', color: 'rose' },
          { label: 'HER2 Axis (Responder)', value: '0.65', color: 'accent' },
          { label: 'HER2 Axis (ITT)', value: '0.30', color: 'rose' },
        ],
        impact: 'Δ Score',
        impactValue: '+0.2418',
        proofId: 'ceacam5',
      },
    },
  ],

  // ─── MoA Align (L2) ────────────────────────────────────────────────────────
  'mechanism-alignment': [
    {
      text: 'AstraZeneca enrolled 594 unselected NSCLC patients on ceralasertib + durvalumab.',
      highlight: 'OS primary endpoint: missed. Δ +0.3658. We saw it.',
      trial: 'LATIFY › NCT05450692 › AZ Phase III',
      evidence: {
        title: 'LATIFY Vector Space',
        rows: [
          { label: 'Responder Sig', value: '0.9852 › Rank #1', color: 'emerald' },
          { label: 'Non-Responder Sig', value: '0.6194 › Rank #129', color: 'rose' },
          { label: 'Gates', value: '3/3 PASS', color: 'emerald' },
        ],
        impact: 'Alignment Gap',
        impactValue: 'Δ +0.3658',
        proofId: 'latify',
      },
    },
    {
      text: 'Responder signature: Rank #1 out of 2,888 trials. Non-responder: Rank #129.',
      highlight: 'STK11/KEAP1-loss was the gate. Nobody checked it.',
      trial: 'LATIFY › Engine Receipt › 2026-02-22',
      evidence: {
        title: 'STK11/KEAP1 Gate',
        rows: [
          { label: 'Responder', value: 'STK11-loss + KEAP1-loss + KRAS-mut', color: 'emerald' },
          { label: 'Non-Responder', value: 'STK11-intact + IO-warm', color: 'rose' },
          { label: 'Biology', value: 'cGAS-STING flip (cold → hot TME)', color: 'accent' },
        ],
        impact: 'Failure Mode',
        impactValue: 'Unselected',
        proofId: 'latify',
      },
    },
    {
      text: 'Adavosertib. PTEN-loss patients. 0% ORR.',
      highlight: 'WEE1 targets DDR. PTEN-loss is PI3K-dominant. Wrong axis.',
      trial: 'ADAVOSERTIB › NCT03579316 › JCO 2023',
      evidence: {
        title: 'ADAVOSERTIB Vector Space',
        rows: [
          { label: 'CCNE1-amp (responder)', value: '36% ORR', color: 'emerald' },
          { label: 'PTEN-loss', value: '0% ORR', color: 'rose' },
          { label: 'Distinguishing Axis', value: 'PI3K: 0.10 vs 0.80', color: 'accent' },
        ],
        impact: 'Vector Δ',
        impactValue: '+0.307',
        proofId: 'adavosertib',
      },
    },
    {
      text: 'CCNE1-amplified patients responded at 36%. PTEN-loss at 0%.',
      highlight: 'One axis. pi3k. That\'s the entire clinical distinction.',
      trial: 'ADAVOSERTIB › Vector Δ +0.307',
      evidence: {
        title: 'Single Axis Proof',
        rows: [
          { label: 'pi3k (Responder)', value: '0.10', color: 'emerald' },
          { label: 'pi3k (Non-Responder)', value: '0.80', color: 'rose' },
          { label: 'ddr (both)', value: '0.70 (identical)', color: 'muted' },
        ],
        impact: 'Clinical Implication',
        impactValue: 'Route to PI3Ki',
        proofId: 'adavosertib',
      },
    },
    {
      text: '7 dimensions couldn\'t distinguish RS-Low from RS-High. Delta: 0.064. Fail.',
      highlight: 'We built the 8th axis. Delta jumped to 0.138. Three gates passed.',
      trial: 'BERZOSERTIB › NCT02595892 › RSS Axis Sprint',
      evidence: {
        title: 'RSS Axis Discovery',
        rows: [
          { label: '7D Delta', value: '0.064 FAIL', color: 'rose' },
          { label: '8D Delta', value: '0.138 PASS', color: 'emerald' },
          { label: 'RS-Low (responder)', value: 'HR 0.34', color: 'emerald' },
          { label: 'RS-High', value: 'HR 1.11 (toward harm)', color: 'rose' },
        ],
        impact: 'Axis Built',
        impactValue: 'RSS (8th)',
        proofId: 'berzosertib',
      },
    },
  ],

  // ─── Kill Chain (L3) ────────────────────────────────────────────────────────
  'kill-chain': [
    {
      text: 'CAPRI. PARPi-naive patients: 54% ORR. Post-PARPi maintenance: <10%.',
      highlight: 'BRCA reversion mutations restored HR. The drug was already dead.',
      trial: 'CAPRI › NCT02264678 › Drew et al. JCO 2022',
      evidence: {
        title: 'CAPRI Resistance Evidence',
        rows: [
          { label: 'PARPi-naive ORR', value: '54%', color: 'emerald' },
          { label: 'Post-PARPi ORR', value: '<10%', color: 'rose' },
          { label: 'Efflux (naive)', value: '0.15', color: 'emerald' },
          { label: 'Efflux (resistant)', value: '0.40', color: 'rose' },
        ],
        impact: 'Vector Δ',
        impactValue: '+0.108',
        proofId: 'capri',
      },
    },
    {
      text: 'The efflux axis encoded the resistance. 0.15 vs 0.40.',
      highlight: 'Prior drug exposure is a signal. Nobody was listening.',
      trial: 'CAPRI › Efflux Axis Proof',
      evidence: {
        title: 'Efflux Axis Signal',
        rows: [
          { label: 'Axis', value: 'EFFLUX (Drug Resistance)', color: 'accent' },
          { label: 'PARPi-naive', value: '0.15', color: 'emerald' },
          { label: 'Post-PARPi maintenance', value: '0.40', color: 'rose' },
          { label: 'Mechanism', value: 'BRCA reversion + HR restoration', color: 'accent' },
        ],
        impact: 'Root Cause',
        impactValue: 'Evolved Resistance',
        proofId: 'capri',
      },
    },
    {
      text: 'RS-High tumors: CCNE1-amp, RB1-loss, MYC-amp. Already maximally stressed.',
      highlight: 'Adding ATRi provided no lethality. HR: 1.11. Trend toward harm.',
      trial: 'BERZOSERTIB › RS Saturation',
      evidence: {
        title: 'Replication Stress Saturation',
        rows: [
          { label: 'RS-Low (benefiting)', value: 'HR 0.34', color: 'emerald' },
          { label: 'RS-High (harmed)', value: 'HR 1.11', color: 'rose' },
          { label: 'Oncogenes', value: 'CCNE1, RB1, MYC', color: 'accent' },
        ],
        impact: 'RS Status',
        impactValue: 'SATURATED',
        proofId: 'berzosertib',
      },
    },
    {
      text: 'Resistance isn\'t a future problem. It\'s happening now.',
      highlight: '12 escape classes. 8 signal channels. Detected before clinical progression.',
      trial: 'Kill Chain Architecture',
      evidence: {
        title: 'Kill Chain Coverage',
        rows: [
          { label: 'Resistance Classes', value: '12', color: 'accent' },
          { label: 'Signal Channels', value: '8', color: 'accent' },
          { label: 'Strike Vector', value: '7D', color: 'accent' },
          { label: 'Detection', value: 'Pre-progression', color: 'emerald' },
        ],
        impact: 'Monitoring',
        impactValue: 'REAL-TIME',
      },
    },
    {
      text: 'Olaparib was working. Then BRCA reverted. Nobody caught it.',
      highlight: 'The Kill Chain monitors ctDNA for reversion mutations in real time.',
      trial: 'BRCA Reversion › PARPi Resistance',
      evidence: {
        title: 'BRCA Reversion Window',
        rows: [
          { label: 'Initial Response', value: 'Synthetic Lethality', color: 'emerald' },
          { label: 'Escape Route', value: 'BRCA Reversion', color: 'rose' },
          { label: 'HR Restoration', value: 'Partial → Full', color: 'rose' },
          { label: 'ctDNA Signal', value: 'Detectable Day 90+', color: 'accent' },
        ],
        impact: 'Switch Window',
        impactValue: '150 days',
        proofId: 'capri',
      },
    },
  ],

  // ─── IO Gate (L4) ──────────────────────────────────────────────────────────
  'io-risk-benefit': [
    {
      text: 'LATIFY enrolled 594 patients on durvalumab. Many had cold TME.',
      highlight: 'cGAS-STING was the mechanism. Only STK11-loss patients had it.',
      trial: 'LATIFY › IO Arm › Cold TME Failure',
      evidence: {
        title: 'TME State Analysis',
        rows: [
          { label: 'Enrolled', value: '594 unselected', color: 'rose' },
          { label: 'TME State', value: 'Cold (MDSC-dominated)', color: 'rose' },
          { label: 'Required', value: 'STK11-loss (cGAS-STING)', color: 'emerald' },
        ],
        impact: 'IO Response Rate',
        impactValue: '<5% unselected',
        proofId: 'latify',
      },
    },
    {
      text: 'PD-L1 positive. MSI stable. MDSC high.',
      highlight: 'Net Clinical Benefit: negative. The gate blocks enrollment.',
      trial: 'IO Risk-Benefit Gate › 8-Pathway Logic',
      evidence: {
        title: '8-Pathway Gate Result',
        rows: [
          { label: 'PD-L1', value: 'Positive', color: 'emerald' },
          { label: 'MSI', value: 'Stable', color: 'rose' },
          { label: 'MDSC', value: 'High (immunosuppressive)', color: 'rose' },
          { label: 'Net Clinical Benefit', value: 'NEGATIVE', color: 'rose' },
        ],
        impact: 'Gate Decision',
        impactValue: 'BLOCKED',
      },
    },
    {
      text: 'TMB alone predicted response. It was wrong.',
      highlight: 'TMB high + Treg high = autoimmune risk. PD-L1 misses this.',
      trial: 'IO Predictor › irAE Prevention',
      evidence: {
        title: 'irAE Risk Assessment',
        rows: [
          { label: 'TMB', value: 'High', color: 'emerald' },
          { label: 'Treg', value: 'High (autoimmune risk)', color: 'rose' },
          { label: 'PD-L1', value: 'Positive (misleading)', color: 'rose' },
          { label: 'irAE Score', value: 'ELEVATED', color: 'rose' },
        ],
        impact: 'Risk',
        impactValue: 'Autoimmune',
      },
    },
    {
      text: 'rho = 0.9997. GSE227666. Ovarian cancer.',
      highlight: '8-pathway transcriptomic crosswalk. Validated on 29 patients.',
      trial: 'IO Predictor › GSE227666 Breakthrough',
      evidence: {
        title: 'Validation Crosswalk',
        rows: [
          { label: 'Dataset', value: 'GSE227666 (Ovarian)', color: 'accent' },
          { label: 'Spearman rho', value: '0.9997', color: 'emerald' },
          { label: 'Cohort', value: 'N = 29', color: 'accent' },
          { label: 'Pathways', value: '8 transcriptomic', color: 'accent' },
        ],
        impact: 'Correlation',
        impactValue: 'ρ = 0.9997',
        proofId: 'latify',
        proofLabel: 'View IO Validation',
      },
    },
    {
      text: 'Immunotherapy can cure. It can also kill.',
      highlight: 'The gate computes Net Clinical Benefit before the first dose.',
      trial: 'IO Risk-Benefit Gate',
      evidence: {
        title: 'Net Clinical Benefit',
        rows: [
          { label: 'Benefit Signals', value: 'TMB, CD8+ TIL, IFN-γ, MSI', color: 'emerald' },
          { label: 'Risk Signals', value: 'MDSC, Treg, irAE', color: 'rose' },
          { label: 'Gate Status', value: 'ACTIVE', color: 'emerald' },
        ],
        impact: 'Pre-enrollment',
        impactValue: 'GATED',
      },
    },
  ],

  // ─── Synthetic Lethality (L5) ─────────────────────────────────────────────
  'synthetic-lethality': [
    {
      text: 'MBD4 loss-of-function. BER glycosylase gone.',
      highlight: 'CpG→TpG hypermutation across 8 lineages.',
      trial: 'MBD4 Manuscript (Kiani 2026)',
      evidence: {
        title: 'ATR Inhibitor Sensitivity',
        rows: [
          { label: 'Drug', value: 'Ceralasertib (AZD6738)', color: 'accent' },
          { label: 'LN_IC50 Δ', value: '−0.738', color: 'emerald' },
          { label: 'p-value', value: '0.034', color: 'emerald' },
          { label: 'Cohen\'s d', value: '−0.506', color: 'accent' },
        ],
        impact: 'Effect Size',
        impactValue: 'd = −0.51',
      },
    },
    {
      text: 'MSI-H purge: signal strengthened.',
      highlight: 'p = 0.025. MBD4 is the driver, not MSI.',
      trial: 'Confound Stress Test 1',
      evidence: {
        title: 'MSI Ghost Purge',
        rows: [
          { label: 'LN_IC50 Δ', value: '−0.915', color: 'emerald' },
          { label: 'p-value', value: '0.025', color: 'emerald' },
          { label: 'Cohen\'s d', value: '−0.625', color: 'accent' },
          { label: 'Cohort', value: 'n=10 MSS/MBD4-LOF', color: 'accent' },
        ],
        impact: 'Status',
        impactValue: 'PASS',
      },
    },
    {
      text: 'TP53 stratification: MBD4 adds >1 log-unit.',
      highlight: 'p = 0.008. d = −0.88. Beyond TP53 alone.',
      trial: 'Confound Stress Test 2',
      evidence: {
        title: 'TP53 Hijack Check',
        rows: [
          { label: 'LN_IC50 Δ', value: '−1.063', color: 'emerald' },
          { label: 'p-value', value: '0.008', color: 'emerald' },
          { label: 'Cohen\'s d (AUC)', value: '−0.880', color: 'accent' },
          { label: 'Cohort', value: 'n=11 vs 606', color: 'accent' },
        ],
        impact: 'Effect Size',
        impactValue: 'd = −0.88',
      },
    },
    {
      text: 'PARP1 upregulated: 7.21 vs 6.64 TPM.',
      highlight: 'p = 0.033. Biomarker, not target. RNF144A falsified.',
      trial: 'Expression Analysis',
      evidence: {
        title: 'PARP1 Biomarker',
        rows: [
          { label: 'LOF Median', value: '7.21 TPM', color: 'emerald' },
          { label: 'WT Median', value: '6.64 TPM', color: 'muted' },
          { label: 'Spearman ρ', value: '−0.42', color: 'accent' },
          { label: 'RNF144A', value: 'FALSIFIED (p=0.53)', color: 'rose' },
        ],
        impact: 'Correlation',
        impactValue: 'ρ = −0.42',
      },
    },
  ],

  // ─── Safety & Dosing (L6) ──────────────────────────────────────────────────
  'safety-dosing': [
    {
      text: 'DPYD c.2846A>T → REDUCE 50%.',
      highlight: '100% CPIC concordance. 10/10 exact matches.',
      trial: 'PGx Safety Gate',
      evidence: {
        title: 'CPIC Concordance',
        rows: [
          { label: 'Total Cases', value: '59', color: 'accent' },
          { label: 'Matched', value: '10/10', color: 'emerald' },
          { label: 'Concordance', value: '100.0%', color: 'emerald' },
          { label: 'Genes', value: 'DPYD, TPMT', color: 'accent' },
        ],
        impact: 'Concordance',
        impactValue: '100%',
      },
    },
    {
      text: '83.1% relative risk reduction.',
      highlight: 'PREPARE trial. 563 patients. PMID 39641926.',
      trial: 'PREPARE (PMID 39641926)',
      evidence: {
        title: 'PREPARE Trial',
        rows: [
          { label: 'RRR (Actionable)', value: '83.1%', color: 'emerald' },
          { label: 'Patients', value: '563', color: 'accent' },
          { label: 'Actionable Carriers', value: '40', color: 'accent' },
          { label: 'Fisher p', value: '0.020', color: 'emerald' },
        ],
        impact: 'RRR',
        impactValue: '83.1%',
      },
    },
    {
      text: 'CYP2C19 PM/IM: 4.28× ischemic event risk.',
      highlight: 'p = 6.7×10⁻⁴. n = 210. Clopidogrel subset.',
      trial: 'CYP2C19 (PMID 40944685)',
      evidence: {
        title: 'CYP2C19 Risk',
        rows: [
          { label: 'Risk Ratio', value: '4.28×', color: 'rose' },
          { label: 'Fisher p', value: '6.7×10⁻⁴', color: 'emerald' },
          { label: 'Subset', value: '210 clopidogrel', color: 'accent' },
          { label: 'EM / PM-IM', value: '106 / 104', color: 'accent' },
        ],
        impact: 'Risk',
        impactValue: '4.28×',
      },
    },
    {
      text: 'Tier 2 heuristic: 100% sensitivity.',
      highlight: '0 false negatives. 6/6 true positives. 16 scorable cases.',
      trial: 'Tier 2 Validation',
      evidence: {
        title: 'Heuristic Validation',
        rows: [
          { label: 'Sensitivity', value: '100%', color: 'emerald' },
          { label: 'False Negatives', value: '0', color: 'emerald' },
          { label: 'True Positives', value: '6/6', color: 'emerald' },
          { label: 'Scorable Cases', value: '16', color: 'accent' },
        ],
        impact: 'Sensitivity',
        impactValue: '100%',
      },
    },
  ],

  // ─── DnaHero / Point Cloud ─────────────────────────────────────────────────
  'dna-hero': [
    {
      text: 'Five Phase II/III failures. Five cancers. Five sponsors.',
      highlight: 'One engine found the root cause in all five. Before enrollment.',
    },
    {
      text: 'The failure mode isn\'t target biology.',
      highlight: 'It\'s patient selection. Layer 1 × Layer 2. That\'s the thesis.',
      trial: 'Two-Layer Thesis',
    },
  ],

  // ─── Vector map trials (gated on ledger + hero) ─────────────────────────────
  adavosertib: [
    {
      text: 'Adavosertib. PTEN-loss patients. 0% ORR.',
      highlight: 'WEE1 targets DDR. PTEN-loss is PI3K-dominant. Wrong axis.',
      trial: 'ADAVOSERTIB › NCT03579316 › JCO 2023',
      evidence: {
        title: 'ADAVOSERTIB Vector Space',
        rows: [
          { label: 'CCNE1-amp (responder)', value: '36% ORR', color: 'emerald' },
          { label: 'PTEN-loss', value: '0% ORR', color: 'rose' },
          { label: 'Distinguishing Axis', value: 'PI3K: 0.10 vs 0.80', color: 'accent' },
        ],
        impact: 'Vector Δ',
        impactValue: '+0.307',
        proofId: 'adavosertib',
      },
    },
    {
      text: 'CCNE1-amplified patients responded at 36%. PTEN-loss at 0%.',
      highlight: 'One axis. pi3k. That\'s the entire clinical distinction.',
      trial: 'ADAVOSERTIB › Vector Δ +0.307',
      evidence: {
        title: 'Single Axis Proof',
        rows: [
          { label: 'pi3k (Responder)', value: '0.10', color: 'emerald' },
          { label: 'pi3k (Non-Responder)', value: '0.80', color: 'rose' },
          { label: 'ddr (both)', value: '0.70 (identical)', color: 'muted' },
        ],
        impact: 'Clinical Implication',
        impactValue: 'Route to PI3Ki',
        proofId: 'adavosertib',
      },
    },
  ],

  berzosertib: [
    {
      text: '7 dimensions couldn\'t distinguish RS-Low from RS-High. Delta: 0.064. Fail.',
      highlight: 'We built the 8th axis. Delta jumped to 0.138. Three gates passed.',
      trial: 'BERZOSERTIB › NCT02595892 › RSS Axis Sprint',
      evidence: {
        title: 'RSS Axis Discovery',
        rows: [
          { label: '7D Delta', value: '0.064 FAIL', color: 'rose' },
          { label: '8D Delta', value: '0.138 PASS', color: 'emerald' },
          { label: 'RS-Low (responder)', value: 'HR 0.34', color: 'emerald' },
          { label: 'RS-High', value: 'HR 1.11 (toward harm)', color: 'rose' },
        ],
        impact: 'Axis Built',
        impactValue: 'RSS (8th)',
        proofId: 'berzosertib',
      },
    },
    {
      text: 'RS-High tumors: CCNE1-amp, RB1-loss, MYC-amp. Already maximally stressed.',
      highlight: 'Adding ATRi provided no lethality. HR: 1.11. Trend toward harm.',
      trial: 'BERZOSERTIB › RS Saturation',
      evidence: {
        title: 'Replication Stress Saturation',
        rows: [
          { label: 'RS-Low (benefiting)', value: 'HR 0.34', color: 'emerald' },
          { label: 'RS-High (harmed)', value: 'HR 1.11', color: 'rose' },
          { label: 'Oncogenes', value: 'CCNE1, RB1, MYC', color: 'accent' },
        ],
        impact: 'RS Status',
        impactValue: 'SATURATED',
        proofId: 'berzosertib',
      },
    },
  ],

  // ─── Genomic Matrix ────────────────────────────────────────────────────────
  'genomic-matrix': [
    {
      text: 'LATIFY. CEACAM5. Adavosertib. CAPRI. Berzosertib.',
      highlight: 'Five trials. Five receipts. All locked before readout.',
    },
    {
      text: '2,888 trials scored. 8 mechanistic axes.',
      highlight: 'Every vector is a crime scene.',
    },
  ],
};
