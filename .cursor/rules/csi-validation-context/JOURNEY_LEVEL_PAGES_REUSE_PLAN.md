# Journey Level Pages - Reuse Main Oncology Page Structure

**Date:** 2025-01-29  
**Status:** 🚨 EXECUTION PLAN  
**Goal:** Reuse `/products/oncology/` structure and components for all journey level pages

---

## 🎯 MAIN ONCOLOGY PAGE STRUCTURE (What We're Reusing)

### **Current Structure:**
```
1. Hero Section (ProductHeroSection)
   - Badge: "CHEMOSENSITIVITY INDEX (CSI)"
   - Headline: "How Chemosensitive Is This Tumor Right Now?"
   - CTAs: "Generate Care Plan", "Experience Live Demos"

2. Problem Section (ProblemSolutionSection)
   - Title: "The Problem: Chemosensitivity Uncertainty"
   - 3 cards: Uncertainty, Outdated, Fragmented

3. CSI Score Visualization (ScoreVisualization + PatientExampleCard)
   - Score cards (High 72, Medium 50, Low 28)
   - Patient example (Sarah's story)

4. Solution Section (ProblemSolutionSection)
   - Title: "The Solution: CSI (ChemoSensitivity Index)"
   - 3 cards: One Score, Multimodal Integration, Continuous Updates

5. Journey Levels (JourneyLevels component)
   - 5-level grid showing all levels
   - Each level: icon, title, description, metric, time, "View Details →"

6. Continuous Monitoring Dashboard (ContinuousMonitoringDashboard)
   - Live metrics grid
   - Active alerts & insights
   - Monitoring timeline

7. Validation Metrics (MetricsShowcase)
   - TOPACIO validation metrics
   - CTAs: "Calculate CSI", "View Full Validation Report"

8. Related Products (RelatedProductsSection)
```

---

## 📋 JOURNEY LEVEL PAGE STRUCTURE (Reusing Same Pattern)

### **For Each Journey Level Page (Level 2, 3, 4):**

```
1. Hero Section (ProductHeroSection)
   - Badge: "Level X: [Title]" (e.g., "Level 2: Therapies & Trials")
   - Headline: [Level-specific question from educational data]
   - CTAs: "Try This Level", "View Full Journey"

2. Problem Section (ProblemSolutionSection)
   - Title: [From educational data.problem.title]
   - Description: [From educational data.problem.narrative - condensed]
   - 3-4 cards: [From educational data.problem.painPoints]

3. Solution Section (ProblemSolutionSection)
   - Title: [From educational data.solution.title]
   - Description: [From educational data.solution.narrative - condensed]
   - 3-4 cards: [From educational data.solution.keyFeatures]

4. How It Works (NEW - Step Cards Grid)
   - Title: [From educational data.howItWorks.title]
   - 4-step grid: [From educational data.howItWorks.steps]
   - Each step: Number, Title, Description, Details (compact)

5. Journey Levels (JourneyLevels component)
   - Show all 5 levels
   - Highlight current level (e.g., Level 2 highlighted)
   - "You are here" indicator

6. Continuous Monitoring Dashboard (ContinuousMonitoringDashboard)
   - Same as main page
   - Shows build-up: Level 1 → Level 2 → Level 3 → Level 4 → Level 5
   - Each step shows completion status

7. Validation Metrics (MetricsShowcase)
   - Level-specific validation metrics
   - From educational data validation context

8. Related Products (RelatedProductsSection)
   - Same as main page
```

---

## 🏗️ COMPONENT REUSE STRATEGY

### **Components to Reuse (From Main Oncology Page):**
1. ✅ **ProductHeroSection** - Hero with badge, headline, CTAs
2. ✅ **ProblemSolutionSection** - Problem/Solution cards (3-column grid)
3. ✅ **ScoreVisualization** - Score cards (if applicable to level)
4. ✅ **PatientExampleCard** - Patient example (if applicable)
5. ✅ **JourneyLevels** - 5-level grid (highlight current level)
6. ✅ **ContinuousMonitoringDashboard** - Live monitoring dashboard
7. ✅ **MetricsShowcase** - Validation metrics
8. ✅ **RelatedProductsSection** - Related products
9. ✅ **SectionHeader** - Section headers

### **New Components to Create:**
1. **HowItWorksStepCards** - Compact 4-step grid (reuse step cards pattern)
2. **CurrentLevelHighlight** - "You are here" card for current level

---

## 📊 DATA STRUCTURE

### **Create Level-Specific Content Files:**

```typescript
// src/data/products/oncology-level-2-content.ts
export const level2HeroContent: ProductHeroContent = {
  badge: {
    text: 'Level 2: Therapies & Trials',
    emoji: '💊',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-800'
  },
  mainHeadline: 'What platinum/PARPi/DDR therapy should we give next?',
  headlineGradient: 'from-purple-600 via-pink-600 to-indigo-600',
  subtitle: 'S/P/E framework (validated AUROC 0.70, n=149) ranks therapies by mechanism fit',
  description: 'Once you have CSI score, unlock drug recommendations and clinical trial matching. Mechanism-based matching with transparent S/P/E scoring.',
  ctas: [
    {
      label: 'Try Level 2 Demo',
      variant: 'primary',
      href: '#solution'
    },
    {
      label: 'View Full Journey →',
      href: '/products/oncology',
      variant: 'secondary'
    }
  ]
};

export const level2ProblemContent: ProblemSolutionContent = {
  type: 'problem',
  title: 'The Problem: Generic Drug Ranking for DDR-Targeted Therapy',
  description: 'For patients with advanced, heavily pretreated cancer, clinicians need to know: What platinum/PARPi/DDR therapy should we give next? But generic drug ranking fails for DDR-targeted treatments.',
  cards: [
    {
      icon: 'alert',
      title: 'No Mechanism Understanding',
      description: 'Generic mutation lists don\'t explain why a DDR-targeted drug fits. Need pathway-level understanding.',
      highlight: 'Generic'
    },
    {
      icon: 'search',
      title: 'No Transparent Reasoning',
      description: 'No clear scoring to understand why PARPi ranks higher than platinum for a specific patient.',
      highlight: 'Unclear'
    },
    {
      icon: 'target',
      title: 'No Clinical Trial Matching',
      description: 'Missing mechanism-based trial matching means patients miss DDR-targeted combination opportunities.',
      highlight: 'Missing'
    }
  ]
};

export const level2SolutionContent: ProblemSolutionContent = {
  type: 'solution',
  title: 'The Solution: CSI-Powered Drug Recommendations with S/P/E Framework',
  description: 'Once you have CSI score, unlock drug recommendations and clinical trial matching. S/P/E framework (validated AUROC 0.70, n=149) ranks therapies by mechanism fit for DDR-targeted treatments.',
  cards: [
    {
      icon: 'zap',
      title: 'CSI Integration',
      description: 'Start with CSI score from Level 1. Add genomic test results (NGS) to unlock drug recommendations.',
      highlight: 'Level 1 → 2'
    },
    {
      icon: 'check',
      title: 'S/P/E Framework',
      description: 'Sequence (30%) + Pathway (40%) + Evidence (30%) for DDR-targeted therapy ranking.',
      highlight: 'AUROC 0.70'
    },
    {
      icon: 'target',
      title: 'Mechanism-Based Matching',
      description: 'Top 5 drug recommendations ranked by match score. Clinical trials you qualify for.',
      highlight: 'Validated'
    }
  ]
};

export const level2HowItWorksSteps = [
  {
    number: 1,
    title: 'Take CSI Score from Level 1',
    description: 'Start with CSI score (0-100) that predicts 6-month PFS probability.',
    details: [
      { label: 'Input', value: 'CSI score from Level 1' },
      { label: 'Validation', value: 'AUROC 0.714 (TOPACIO trial)' }
    ]
  },
  {
    number: 2,
    title: 'Add Genomic Test Results (NGS)',
    description: 'Add genomic test results to unlock drug recommendations.',
    details: [
      { label: 'Input', value: 'Genomic test results (NGS)' },
      { label: 'Includes', value: 'Mutations, HRD status, BRCA pathway' }
    ]
  },
  {
    number: 3,
    title: 'Calculate S/P/E Scores',
    description: 'Sequence (30%) + Pathway (40%) + Evidence (30%) for DDR-targeted therapy ranking.',
    details: [
      { label: 'Method', value: 'S/P/E framework' },
      { label: 'Validation', value: 'AUROC 0.70 (n=149)' }
    ]
  },
  {
    number: 4,
    title: 'Rank Drugs and Match Clinical Trials',
    description: 'Top 5 drugs ranked by match score. Clinical trials you qualify for.',
    details: [
      { label: 'Output', value: 'Ranked drug list + Clinical trial matches' },
      { label: 'Validation', value: 'Retrospective-tested' }
    ]
  }
];

export const level2ValidationMetrics = [
  {
    icon: Award,
    value: '0.70',
    label: 'AUROC',
    description: 'S/P/E Pipeline validation (n=149)',
    color: 'blue' as const,
    progress: {
      value: 70,
      max: 100
    }
  },
  {
    icon: TrendingUp,
    value: 'Retrospective Tested',
    label: 'Validation Status',
    description: 'S/P/E Pipeline validated on 149 patient-regimen pairs',
    color: 'green' as const
  }
];
```

---

## 🎨 PAGE STRUCTURE COMPONENT

### **Create: `OncologyJourneyLevelPage.tsx`**

```typescript
interface OncologyJourneyLevelPageProps {
  level: 1 | 2 | 3 | 4 | 5;
  heroContent: ProductHeroContent;
  problemContent: ProblemSolutionContent;
  solutionContent: ProblemSolutionContent;
  howItWorksSteps: HowItWorksStep[];
  validationMetrics: Metric[];
}

export default function OncologyJourneyLevelPage({
  level,
  heroContent,
  problemContent,
  solutionContent,
  howItWorksSteps,
  validationMetrics
}: OncologyJourneyLevelPageProps) {
  return (
    <OncologyAgentProvider patientId="AK">
      <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-slate-800 pt-20 pb-12 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* 1. Hero Section */}
          <ProductHeroSection content={heroContent} />

          {/* 2. Problem Section */}
          <ProblemSolutionSection content={problemContent} />

          {/* 3. Solution Section */}
          <ProblemSolutionSection content={solutionContent} />

          {/* 4. How It Works - Step Cards */}
          <section id="how-it-works" className="mb-16">
            <SectionHeader
              title={`How Level ${level} Works`}
              description="Four steps to unlock this capability"
            />
            <HowItWorksStepCards steps={howItWorksSteps} />
          </section>

          {/* 5. Journey Levels - Highlight Current */}
          <section id="journey-levels" className="mb-16">
            <JourneyLevels currentLevel={level} />
          </section>

          {/* 6. Continuous Monitoring Dashboard */}
          <section id="monitoring-dashboard" className="mb-16">
            <SectionHeader
              title="CSI in Action: Continuous Monitoring"
              description="See how CSI updates automatically as tumor evolves. Track chemosensitivity across treatment lines with real-time alerts when CSI drops below threshold."
            />
            <ContinuousMonitoringDashboard patientId="AK" />
          </section>

          {/* 7. Validation Metrics */}
          <section id="validation" className="mb-16">
            <MetricsShowcase
              badge={{
                text: `Level ${level} Validation`,
                icon: Award,
                bgColor: 'bg-blue-100',
                textColor: 'text-blue-800'
              }}
              title={`Level ${level} Performance Metrics`}
              subtitle="Validated performance for this capability"
              metrics={validationMetrics}
              cta={{
                primary: {
                  text: 'Try Level 2 Demo',
                  href: '#solution'
                },
                secondary: {
                  text: 'View Full Validation Report',
                  href: '/evidence/csi-validation'
                }
              }}
            />
          </section>

          {/* 8. Related Products */}
          <RelatedProductsSection products={oncologyRelatedProducts} />
        </div>
      </main>
    </OncologyAgentProvider>
  );
}
```

---

## 🔧 IMPLEMENTATION STEPS

### **Step 1: Create HowItWorksStepCards Component**
- Reuse step card pattern from main page
- Compact 2x2 grid layout
- Each card: Number, Title, Description, Details (collapsible)

### **Step 2: Update JourneyLevels Component**
- Add `currentLevel` prop to highlight current level
- Show "You are here" indicator
- Visual connection to current level

### **Step 3: Create Level-Specific Content Files**
- `oncology-level-2-content.ts` (Therapies & Trials)
- `oncology-level-3-content.ts` (Resistance Prediction)
- `oncology-level-4-content.ts` (Safety & Dosing)

### **Step 4: Create OncologyJourneyLevelPage Component**
- Reuse all components from main oncology page
- Same structure, different content
- Level-specific hero, problem, solution, validation

### **Step 5: Update Route Pages**
- `/products/oncology/match-patients-to-therapies/page.tsx` → Use `OncologyJourneyLevelPage` with level 2
- `/products/oncology/predict-resistance/page.tsx` → Use `OncologyJourneyLevelPage` with level 3
- `/products/oncology/prevent-toxicity/page.tsx` → Use `OncologyJourneyLevelPage` with level 4

---

## ✅ SUCCESS CRITERIA

### **Each Journey Level Page Should:**
1. ✅ Look identical to main oncology page structure
2. ✅ Reuse all components from main page
3. ✅ Show journey levels with current level highlighted
4. ✅ Include Continuous Monitoring Dashboard
5. ✅ Show build-up: Level 1 → 2 → 3 → 4 → 5
6. ✅ Level-specific content (hero, problem, solution, validation)
7. ✅ No text dumps - all card-based
8. ✅ Same visual design language

---

**Last Updated:** 2025-01-29  
**Status:** ✅ **PLAN COMPLETE** - Ready for execution
