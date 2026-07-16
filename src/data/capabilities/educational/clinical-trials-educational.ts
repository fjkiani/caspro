/**
 * Clinical Trials Educational Data
 * Manually extracted and structured from clinical-trials.ts
 * Aligned with clinical-trials.ts structure for sidebar navigation
 */

import { EducationalCapabilityPageData } from '@/types/educational-capability';
import { clinicalTrialsData } from '@/data/copilots/clinical-trials';

export const clinicalTrialsEducationalData: EducationalCapabilityPageData = {
  // Hero Section - Aligned with clinical-trials.ts
  hero: {
    question: "Which trials target YOUR tumor's vulnerabilities?",
    genericAnswer: "Search ClinicalTrials.gov with keywords. Manually review 50+ trials. Hope you find relevant ones.",
    ourAnswer: "Your tumor's pathway burden (DDR, MAPK, PI3K) matched to trial drug mechanisms by mechanism alignment. DDR-high patients see PARP+ATR trials ranked first.",
    visualComparison: {
      before: "Keyword search. 50+ irrelevant trials. No pathway alignment.",
      after: "Pathway burden → Mechanism fit (0.92). 50+ → 5-12 trials. Same-day enrollment.",
    },
  },

  // Problem Section
  problem: {
    title: "The Problem: Keyword Search Doesn't Match Biology",
    narrative: `Generic keyword search doesn't answer: 'Which trials target MY tumor's vulnerabilities?' We match your pathway burden to trial drug mechanisms.

**The core challenges:**

- **Keyword search ignores pathway alignment** - Searching "BRCA1" finds trials mentioning BRCA1, but misses trials targeting DNA repair pathways that BRCA1 mutations disrupt. 40% of relevant trials missed because pathway-level signals aren't visible.

- **No way to know which trials target your tumor biology** - Without mechanism-based matching, there's no systematic way to connect patient mutations to trial drug mechanisms. Takes 3-5 days per trial to manually assess pathway alignment.

- **Takes too long to find relevant trials** - Manual trial review takes 2-3 days per trial on average. With 50+ trials to review, this creates weeks of delay before patient enrollment.

**The impact:**
- 40% of relevant trials missed due to keyword-only search
- 60% false positive rates in trial matching
- 3-5 days per trial for manual pathway alignment review
- Weeks of delay before patient enrollment`,
    visualMetaphor: "Like searching for a key using only the color of the keychain, not the shape of the lock",
    painPoints: [
      {
        title: "Keyword-Only Search",
        description: "Searching by keywords misses pathway-level alignment between patient mutations and trial mechanisms",
        icon: "Search",
      },
      {
        title: "No Mechanism Matching",
        description: "No systematic way to connect patient pathway burden to trial drug mechanisms",
        icon: "Target",
      },
      {
        title: "Time-Consuming Review",
        description: "Manual trial review takes 2-3 days per trial, creating weeks of delay",
        icon: "Clock",
      },
      {
        title: "High False Positives",
        description: "60% false positive rates in trial matching waste clinical time",
        icon: "AlertTriangle",
      },
    ],
  },

  // Solution Section
  solution: {
    title: "The Solution: Mechanism-Based Trial Matching",
    narrative: `We've built the first system that matches your tumor's pathway burden to trial drug mechanisms—not keywords. Action-ready dossiers for same-day enrollment.

**How it works:**

1. **Mechanism-Based Matching** - Your tumor's pathway burden (DDR, MAPK, PI3K) matched to trial drug mechanisms by mechanism alignment. Compute a mechanism-alignment score from patient mutations. Match to trial drug mechanisms. Rank by combined eligibility and mechanism alignment.

2. **Pathway Alignment Scoring** - DDR-high patients see PARP+ATR trials ranked first. MAPK-driven patients see MEK/RAF trials first. Pathway vectors: DDR, MAPK, PI3K, VEGF, HER2, IO, Efflux.

3. **Complex Query Builder** - Answer queries like "MBD4 + DNA repair + basket trials + PARP inhibitors" with multi-criteria search. Dual search: AstraDB semantic + ClinicalTrials.gov API. Auto-infer interventions from predictions.

4. **Action-Ready Dossiers** - Shareable one-pagers with mechanism fit scores, pathway breakdown, and transparent eligibility reasoning. Green/yellow/red flags per criterion. Time-to-first-trial: ↓ 60-65% faster enrollment.

**The Clinical Trials MOAT (What We Just Built):**
- ✅ Mechanism-Based Ranking → Pathway alignment, not keywords
- ✅ Shortlist Compression → 50+ → 5-12 trials
- ✅ Complex Queries → Multi-criteria builder
- ✅ 96.6% Accuracy → Transparent eligibility

**This is the first system that matches your tumor's pathway burden to trial drug mechanisms—not keywords.**`,
    keyFeatures: [
      {
        title: "Mechanism-Based Ranking",
        description: "Pathway alignment, not keywords",
        icon: "Target",
        status: "implemented",
      },
      {
        title: "Shortlist Compression",
        description: "50+ → 5-12 trials",
        icon: "TrendingUp",
        status: "implemented",
      },
      {
        title: "Complex Queries",
        description: "Multi-criteria builder",
        icon: "Search",
        status: "implemented",
      },
      {
        title: "96.6% Accuracy",
        description: "Transparent eligibility",
        icon: "Award",
        status: "implemented",
      },
    ],
    visualFlow: [
      {
        number: 1,
        title: "Mechanism-Based Matching",
        description: "Your tumor's pathway burden (DDR, MAPK, PI3K) matched to trial drug mechanisms by mechanism alignment",
        icon: "Target",
        color: "purple",
        details: [
          { label: "Method", value: "7D mechanism vector from patient mutations" },
          { label: "Matching", value: "Cosine similarity to trial drug mechanisms" },
          { label: "Ranking", value: "0.7×eligibility + 0.3×mechanism_fit" },
          { label: "Accuracy", value: "96.6% trial match accuracy" },
        ],
        metrics: [
          { label: "Match Accuracy", value: "96.6%" },
          { label: "Mechanism Fit", value: "0.92 avg" },
        ],
      },
      {
        number: 2,
        title: "Pathway Alignment Scoring",
        description: "DDR-high patients see PARP+ATR trials ranked first. MAPK-driven patients see MEK/RAF trials first",
        icon: "Activity",
        color: "blue",
        details: [
          { label: "Pathway Vectors", value: "DDR, MAPK, PI3K, VEGF, HER2, IO, Efflux" },
          { label: "DDR-High Patients", value: "PARP+ATR trials ranked first" },
          { label: "MAPK-Driven", value: "MEK/RAF trials prioritized" },
          { label: "Shortlist Compression", value: "50+ → 5-12 trials" },
        ],
        metrics: [
          { label: "Compression", value: "50+ → 5-12" },
          { label: "Time Reduction", value: "↓ 60-65%" },
        ],
      },
      {
        number: 3,
        title: "Complex Query Builder",
        description: "Answer queries like \"MBD4 + DNA repair + basket trials + PARP inhibitors\" with multi-criteria search",
        icon: "Search",
        color: "green",
        details: [
          { label: "Query Types", value: "Mutations + biomarkers + interventions + keywords" },
          { label: "Dual Search", value: "AstraDB semantic + ClinicalTrials.gov API" },
          { label: "Efficacy Integration", value: "Auto-infer interventions from predictions" },
          { label: "Flexibility", value: "Any combination of criteria" },
        ],
        metrics: [
          { label: "Query Types", value: "Multi-criteria" },
          { label: "Search Engines", value: "2 (Semantic + API)" },
        ],
      },
      {
        number: 4,
        title: "Action-Ready Dossiers",
        description: "Shareable one-pagers with mechanism fit scores, pathway breakdown, and transparent eligibility reasoning",
        icon: "FileText",
        color: "orange",
        details: [
          { label: "Format", value: "One-pager summary with rationale" },
          { label: "Content", value: "Mechanism fit scores + pathway breakdown" },
          { label: "Eligibility", value: "Green/yellow/red flags per criterion" },
          { label: "Time-to-First-Trial", value: "↓ 60-65% faster enrollment" },
        ],
        metrics: [
          { label: "Time Reduction", value: "↓ 60-65%" },
          { label: "Shareable", value: "100%" },
        ],
      },
    ],
  },

  // How It Works Section
  howItWorks: {
    title: "How Clinical Trial Matching Works (Four Steps)",
    steps: [
      {
        number: 1,
        title: "Compute Pathway Burden",
        description: "Extract 7D mechanism vector from patient mutations (DDR, MAPK, PI3K, VEGF, HER2, IO, Efflux)",
        details: [
          { label: "Pathway Vectors", value: "7D mechanism vector" },
          { label: "Patient Mutations", value: "Extracted from genomic data" },
          { label: "Pathway Scores", value: "DDR, MAPK, PI3K, VEGF, HER2, IO, Efflux" },
        ],
      },
      {
        number: 2,
        title: "Match to Trial Mechanisms",
        description: "Compute a mechanism-alignment score between patient pathway signature and trial drug mechanism signatures",
        details: [
          { label: "Method", value: "Cosine similarity matching" },
          { label: "Trial Mechanisms", value: "Pre-computed drug MoA vectors" },
          { label: "Ranking Formula", value: "0.7×eligibility + 0.3×mechanism_fit" },
        ],
      },
      {
        number: 3,
        title: "Rank Trials by Fit",
        description: "Trials ranked by combined score: eligibility (70%) + mechanism fit (30%)",
        details: [
          { label: "Eligibility Weight", value: "70% of ranking score" },
          { label: "Mechanism Fit Weight", value: "30% of ranking score" },
          { label: "Output", value: "Ranked trial list with scores" },
        ],
      },
      {
        number: 4,
        title: "Generate Action-Ready Dossier",
        description: "Create shareable one-pager with mechanism fit scores, pathway breakdown, and eligibility flags",
        details: [
          { label: "Format", value: "One-pager summary" },
          { label: "Content", value: "Mechanism fit + pathway breakdown + eligibility" },
          { label: "Shareability", value: "100% shareable format" },
        ],
      },
    ],
    interactive: true,
  },

  // Value Proposition Section
  value: {
    title: "THE MOAT: What No Competitor Has",
    question: "Which trials target MY tumor's vulnerabilities?",
    genericResponse: "Search ClinicalTrials.gov with keywords. Manually review 50+ trials. Hope you find relevant ones.",
    ourResponse: "Your tumor's pathway burden (DDR, MAPK, PI3K) matched to trial drug mechanisms by mechanism alignment. DDR-high patients see PARP+ATR trials ranked first. Shortlist: 50+ → 5-12 trials.",
    comparison: [
      {
        feature: "Trial Matching",
        generic: "Keyword search. 50+ irrelevant trials. No pathway alignment.",
        ourSystem: "Pathway burden → Mechanism fit (0.92). 50+ → 5-12 trials. Same-day enrollment.",
      },
    ],
  },

  // Integration Section
  integration: {
    title: "How Clinical Trials Integrates with Other Capabilities",
    connections: [
      {
        from: "Pathway Analysis",
        to: "Clinical Trials",
        relationship: "Pathway burden scores (DDR, MAPK, PI3K) feed into mechanism-based trial matching",
      },
      {
        from: "Therapy Fit",
        to: "Clinical Trials",
        relationship: "Drug mechanism vectors from therapy fit inform trial drug mechanism matching",
      },
      {
        from: "Clinical Trials",
        to: "Patient Care",
        relationship: "Action-ready dossiers enable same-day trial enrollment decisions",
      },
    ],
    carePlanContext: [],
  },

  // Process Section
  process: {
    title: "The Clinical Trial Matching Process",
    steps: [
      {
        number: 1,
        title: "Extract Pathway Burden",
        description: "Compute 7D mechanism vector from patient mutations",
      },
      {
        number: 2,
        title: "Match to Trial Mechanisms",
        description: "Cosine similarity between patient pathway and trial drug mechanisms",
      },
      {
        number: 3,
        title: "Rank by Combined Score",
        description: "0.7×eligibility + 0.3×mechanism_fit",
      },
      {
        number: 4,
        title: "Generate Dossier",
        description: "Shareable one-pager with mechanism fit and eligibility",
      },
    ],
    layout: 'horizontal' as const,
  },

  // Example Section
  example: {
    title: "Example: DDR-High Patient Trial Matching",
    patient: {
      name: "DDR-High Patient",
      profile: ["BRCA1 mutation", "DDR pathway burden: 0.85"],
      question: "Which trials target this patient's DDR pathway?",
    },
    solution: [
      {
        step: 1,
        title: "Pathway Analysis",
        description: "BRCA1 mutation → DDR pathway burden: 0.85",
        result: "DDR pathway identified",
      },
      {
        step: 2,
        title: "Mechanism Matching",
        description: "DDR pathway matched to PARP+ATR trial mechanisms (fit: 0.92)",
        result: "High mechanism fit identified",
      },
      {
        step: 3,
        title: "Ranking",
        description: "PARP+ATR trials ranked #1-3 by combined score",
        result: "Top trials identified",
      },
      {
        step: 4,
        title: "Dossier",
        description: "Action-ready one-pager with mechanism fit scores and eligibility",
        result: "Same-day enrollment ready",
      },
    ],
    outcome: [
      {
        metric: "Mechanism Fit",
        value: "0.92",
        impact: "High alignment with patient pathway burden",
      },
      {
        metric: "Shortlist Compression",
        value: "50+ → 8 trials",
        impact: "Reduced decision fatigue",
      },
      {
        metric: "Time-to-First-Trial",
        value: "Same day",
        impact: "Faster patient enrollment",
      },
    ],
  },

  // Concepts Section (optional but type requires it)
  concepts: {
    layout: 'accordion' as const,
    concepts: [],
  },

  // Layout
  layout: {
    sidebar: {
      sections: [
        { id: "hero", title: "Overview" },
        { id: "problem", title: "The Problem" },
        { id: "solution", title: "The Solution" },
        { id: "value-props", title: "Value Propositions" },
        { id: "how-it-works", title: "How It Works" },
        { id: "observed-outcomes", title: "Observed Outcomes" },
        { id: "key-capabilities", title: "Key Capabilities" },
        { id: "process", title: "Process" },
        { id: "example", title: "Example" },
        { id: "integration", title: "Integration" },
      ],
    },
  },

  // Source data reference
  sourceData: clinicalTrialsData,
};

