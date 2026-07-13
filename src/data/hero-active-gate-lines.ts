import type { HeadlineEntry } from '@/data/hero-headlines';

/**
 * Hero ORACLE slide — ACTIVE GATE cycling copy.
 * Hard-hitting facts from PLCO, LATIFY, CEACAM5, kinetics, and two-layer thesis work.
 */
export const HERO_ACTIVE_GATE_LINES: HeadlineEntry[] = [
  {
    text: 'CrisPRO has NCI-approved access to the PLCO ovarian screening trial —',
    highlight: '78,000 women, 72 confirmed cancers, six years of serial CA-125 under CDAS Project PLCO-2010.',
    trial: 'PLCO › NCI CDAS',
  },
  {
    text: 'We analyzed 78,209 women in PLCO without sequencing a single patient —',
    highlight: 'and built a cancer resistance detection framework from a CSV file.',
  },
  {
    text: 'CA-125 missed 72% of ovarian cancers in the largest government screening trial ever conducted.',
    highlight: '177 of 246 cancer patients never crossed the threshold across six years of annual testing.',
    trial: 'PLCO › screening failure',
  },
  {
    text: 'Stage I ovarian cancer: 90% survival. Stage IV: 23%.',
    highlight: 'The gap is not a better drug. It is a better clock.',
  },
  {
    text: 'Stage I median survival: 15.4 years. Stage IV median survival: 2.3 years.',
    highlight: 'A 7× gap. Same disease. Different clock.',
  },
  {
    text: 'CA-125 velocity in women who develop ovarian cancer: 19.75 U/mL/month.',
    highlight: "In women who don't: 0.035 U/mL/month — a 500-fold difference in a $30 blood test.",
  },
  {
    text: 'Screening barely shifted stage at diagnosis.',
    highlight: '68% of screened cancers were still Stage III or IV — six years of testing moved the needle by 7 points.',
  },
  {
    text: 'CA-125 is produced by MUC16 — the 3rd most mutated gene in ovarian cancer.',
    highlight: 'When MUC16 is mutated, the tumor stops making CA-125 — and the cancer is invisible to screening.',
    trial: 'PLCO › MUC16 hypothesis',
  },
  {
    text: 'We corrected a histotype mislabeling sitting in the PLCO dataset for 25 years.',
    highlight: '57.7% labeled mucinous — 3% in the real world. ICD-O-3 proves 299 cases are high-grade serous.',
  },
  {
    text: 'The answer was sitting in a freezer.',
    highlight: 'AstraZeneca collected STK11 and KEAP1 on every LATIFY patient at screening — and did not gate enrollment.',
    trial: 'LATIFY › biomarker freezer',
  },
  {
    text: 'AstraZeneca spent $300M on LATIFY. 594 patients. OS endpoint missed.',
    highlight: 'CrisPRO scored responders at 0.8936 and non-responders at 0.6295 — delta 2.6× the minimum threshold.',
  },
  {
    text: 'The LATIFY biomarker data was collected at screening. Cancer Cell published the mechanism four months before failure.',
    highlight: 'The answer was in the literature. The answer was in the freezer. Nobody connected them.',
  },
  {
    text: "Cancer trials aren't failing because drugs don't work.",
    highlight: 'They fail because they enrolled the wrong patients. CrisPRO proves it retroactively — and prevents it prospectively.',
  },
  {
    text: 'Three published Phase III failures. Three cancers. Three mechanism classes. One engine.',
    highlight: 'Every responding subgroup was in the data before the first patient enrolled. CrisPRO would have caught all three.',
  },
  {
    text: 'CEACAM5 is a real cancer driver. The trial enrolled unselected NSCLC with no expression gate.',
    highlight: 'Both endpoints missed. LATIFY in a different cancer — same root cause, second confirmation.',
    trial: 'CEACAM5 › NCT04154956',
  },
  {
    text: 'Target-Lock tells you if the target is real. Mechanism alignment tells you if the right patients are enrolled.',
    highlight: 'LATIFY and CEACAM5 both had real targets. Both trials failed because Layer 2 was never applied.',
  },
  {
    text: "There are four possible situations in oncology trials.",
    highlight: "CrisPRO is the only system that tells you which one you're in — before you spend $300 million.",
  },
  {
    text: 'We built a CA-125 kinetics engine calibrated against 3,720 treated patients across three published trials —',
    highlight: 'without accessing a single restricted dataset and without leaving a notebook.',
  },
  {
    text: "We called Lyon University's live KELIM API — gold-standard CA-125 chemosensitivity scoring —",
    highlight: 'Four scenarios. Four agreements. Classification confirmed.',
  },
  {
    text: 'The Kill Chain detects resistance 82 days before clinical escape — on real patient data.',
    highlight: 'Signal 3 went from permanently blind to architecturally operational.',
    trial: 'CAPRI › kinetics',
  },
  {
    text: 'Target-Lock validated on a 29-gene panel (honest primary composite) — brain-met cascade data, class-aware.',
    highlight: 'AUROC 0.6889 (honest primary composite). Assassin vs composite disambiguated; Enformer excluded. No cherry-picked ranking.',
  },
  {
    text: 'We are what Theranos should have been — in silico.',
    highlight: 'Every claim traces to a published paper. Every receipt is timestamped. Nothing is fabricated.',
  },
  {
    text: 'The moat is that we encoded the mechanism, not just eligibility criteria —',
    highlight: 'timestamped receipts on three Phase III failures. The data was public. Nobody built the engine. We did.',
  },
  {
    text: 'Nothing fabricated.',
    highlight: 'Every number has a source. Every claim has a receipt.',
  },
  {
    text: 'The responders were always there — hidden inside the data.',
    highlight: 'CrisPRO finds them before enrollment, not after.',
  },
  {
    text: "Cancer patients don't have time for 'we'll publish in 3 years.'",
    highlight: "We didn't wait for NCI approval to build.",
  },
];
