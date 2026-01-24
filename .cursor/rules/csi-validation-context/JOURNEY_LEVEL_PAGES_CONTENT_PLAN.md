# Journey Level Pages Content Plan

**Date:** 2025-01-29  
**Status:** 🚨 CRITICAL - Execution Plan  
**Template:** Use `prevent-toxicity` page layout (EducationalCapabilityPage + EducationalPageLayout)

---

## 🎯 TEMPLATE STRUCTURE (From prevent-toxicity)

### **Layout Components:**
1. **EducationalPageLayout** - Grid layout (no sidebar) for clean presentation
2. **HeroQuestionSection** - "The Question Nobody Was Answering"
3. **ProblemNarrativeSection** - Problem narrative with pain points
4. **SolutionNarrativeSection** - Interactive solution (ToxicitySolutionInteractive pattern)
5. **ValuePropsSection** - Value propositions
6. **HowItWorksSection** - Step-by-step process
7. **ObservedOutcomesSection** - Validation metrics and outcomes
8. **KeyCapabilitiesSection** - Deep dive into capabilities
9. **ExampleShowcase** - Real patient examples
10. **IntegrationSection** - How it fits into CSI journey
11. **ProgressiveDisclosureSection** - Technical details (collapsed)

---

## 📋 LEVEL 1: THE SCORE (`/products/oncology/`)

### **What We Demonstrate:**
**Core Question:** "How chemosensitive is this tumor right now?"

**Key Message:** CSI (0-100) predicts 6-month PFS probability for next DDR-targeted therapy

### **Page Structure:**

#### **1. HeroQuestionSection**
```typescript
{
  question: "How chemosensitive is this tumor right now?",
  genericAnswer: "Clinicians don't know. PFI/PTFI becomes unreliable after multiple lines. No unified score.",
  ourAnswer: "CSI (0-100) predicts 6-month PFS probability. Validated AUROC 0.714 (TOPACIO trial, p=0.023).",
  visualComparison: {
    before: "Uncertainty: Will platinum/PARPi work? For how long?",
    after: "CSI 72/100 → High probability of 6-month PFS → RECOMMEND PARPi"
  }
}
```

#### **2. ProblemNarrativeSection**
**Focus:** Chemosensitivity uncertainty
- Unknown response duration
- PFI/PTFI no longer predicts after multiple lines
- No unified score (DDR biology, timing, kinetics are siloed)

#### **3. SolutionNarrativeSection (CSI Score Interactive)**
**Component:** Create `CSIScoreSolutionInteractive.tsx` (similar to ToxicitySolutionInteractive)

**Steps:**
1. **Input Data** - Basic patient info (stage, cancer type)
2. **CSI Calculation** - DDR_bin + PFI/PTPI/TFI + KELIM/CA-125
3. **Score Output** - CSI (0-100) with interpretation
4. **Recommendation** - Will chemo work? Expected benefit duration

**Visual:** Show score cards (High 72, Medium 50, Low 28) with patient example

#### **4. HowItWorksSection**
**4 Steps:**
1. Collect basic patient data (stage, cancer type, line of therapy)
2. Calculate DDR_bin (BRCA/HRD status)
3. Integrate timing history (PFI/PTPI/TFI)
4. Output CSI score (0-100) with 6-month PFS probability

#### **5. ObservedOutcomesSection**
**Metrics:**
- AUROC 0.714 (TOPACIO validation, p=0.023)
- BRCA/HRD+ performance: 0.85 vs HRD-: 0.58
- ORR difference: 35% vs 11%
- Validation status: Retrospective-tested

#### **6. ExampleShowcase**
**Patient Example:** Sarah, 58, ovarian cancer, 2nd-line
- CSI Score: 72/100
- Recommendation: RECOMMEND PARPi
- Validation: TOPACIO trial scenario

#### **7. IntegrationSection**
**How Level 1 Unlocks Level 2:**
- "Once you have CSI score, add genomic test results (NGS) to unlock drug recommendations"
- Link to Level 2: `/products/oncology/match-patients-to-therapies`

---

## 📋 LEVEL 2: THERAPIES & TRIALS (`/products/oncology/match-patients-to-therapies/`)

### **What We Demonstrate:**
**Core Question:** "What platinum/PARPi/DDR therapy should we give next?"

**Key Message:** S/P/E framework (validated AUROC 0.70, n=149) ranks drugs by mechanism fit for DDR-targeted therapy

### **Page Structure:**

#### **1. HeroQuestionSection**
```typescript
{
  question: "What platinum/PARPi/DDR therapy should we give next?",
  genericAnswer: "Generic drug ranking based on mutation lists. No mechanism understanding. No transparent reasoning.",
  ourAnswer: "Top 5 drug recommendations ranked by S/P/E framework. Mechanism-based matching with transparent scoring. Validated AUROC 0.70 (n=149).",
  visualComparison: {
    before: "Mutation list → Generic drug suggestions",
    after: "Genomic profile → S/P/E scoring → Ranked drug recommendations with mechanism explanation"
  }
}
```

#### **2. ProblemNarrativeSection**
**Focus:** Generic drug ranking problems
- No mechanism understanding
- No transparent reasoning
- No clinical trial matching
- No pathway analysis

#### **3. SolutionNarrativeSection (S/P/E Framework Interactive)**
**Component:** Use existing `TherapyFitSolutionInteractive.tsx` or create `SPEFrameworkSolutionInteractive.tsx`

**Steps:**
1. **Input:** CSI score + Genomic test results (NGS)
2. **S/P/E Calculation:** Sequence (30%) + Pathway (40%) + Evidence (30%)
3. **Drug Ranking:** Top 5 drugs ranked by match score
4. **Trial Matching:** Clinical trials you qualify for

**Visual:** Show S/P/E breakdown for top drug (e.g., PARPi for BRCA1 mutation)

#### **4. HowItWorksSection**
**4 Steps:**
1. Take CSI score from Level 1
2. Add genomic test results (NGS)
3. Calculate S/P/E scores (Sequence, Pathway, Evidence)
4. Rank drugs and match clinical trials

#### **5. ObservedOutcomesSection**
**Metrics:**
- S/P/E Pipeline AUROC 0.70 (n=149)
- Validation status: Retrospective-tested
- Mechanism fit component validated

#### **6. ExampleShowcase**
**Patient Example:** Same Sarah from Level 1
- CSI: 72/100 (from Level 1)
- Genomic: BRCA1 mutation, HRD+
- Top Drug: PARPi (S/P/E score: 0.85)
- Clinical Trials: 3 matches

#### **7. IntegrationSection**
**How Level 2 Unlocks Level 3:**
- "Once you have drug recommendations, add treatment history to unlock resistance prediction"
- Link to Level 3: `/products/oncology/predict-resistance`

---

## 📋 LEVEL 3: RESISTANCE PREDICTION (`/products/oncology/predict-resistance/`)

### **What We Demonstrate:**
**Core Question:** "When will chemo stop working? When should we retest?"

**Key Message:** Post-treatment pathway profiling predicts resistance 3-6 weeks before imaging (AUROC 0.714-0.750, n=11)

### **Page Structure:**

#### **1. HeroQuestionSection**
```typescript
{
  question: "When will chemo stop working? When should we retest?",
  genericAnswer: "Wait for imaging to show progression. By then, it's too late. Window to intervene is gone.",
  ourAnswer: "Post-treatment pathway profiling predicts resistance 3-6 weeks before imaging. Early warning signs with resistance timeline.",
  visualComparison: {
    before: "Imaging shows progression → Too late to intervene",
    after: "CA-125 plateau detected → CSI drops → Early intervention → Prevent treatment failure"
  }
}
```

#### **2. ProblemNarrativeSection**
**Focus:** Resistance detected too late
- 3-6 months after resistance starts
- Window to intervene is gone
- No early warning system
- No pathway evolution tracking

#### **3. SolutionNarrativeSection (Resistance Prediction Interactive)**
**Component:** Create `ResistancePredictionSolutionInteractive.tsx`

**Steps:**
1. **Input:** CSI score + Treatment history (PFI, PTPI, TFI, PFS, OS)
2. **Pathway Profiling:** Post-treatment tumor sample analysis
3. **Resistance Timeline:** When chemo might stop working
4. **Early Warning:** Signs to watch for, when to retest

**Visual:** Show timeline with resistance prediction (e.g., "Resistance likely in Month 6-9")

#### **4. HowItWorksSection**
**4 Steps:**
1. Take CSI score and drug selection from Levels 1-2
2. Add treatment history (PFI, PTPI, TFI, PFS, OS)
3. Analyze post-treatment pathway profiling
4. Predict resistance timeline and early warning signs

#### **5. ObservedOutcomesSection**
**Metrics:**
- Post-treatment profiling AUROC 0.714-0.750 (n=11)
- 3-6 weeks earlier than imaging
- Validation status: Retrospective-tested

#### **6. ExampleShowcase**
**Patient Example:** Same Sarah, Month 6
- CSI dropped: 78 → 72
- CA-125 plateau detected
- Resistance prediction: Likely in Month 9-12
- Early intervention: Consider PARP switch

#### **7. IntegrationSection**
**How Level 3 Unlocks Level 4:**
- "Once you have resistance prediction, add genetic safety screening to unlock personalized dosing"
- Link to Level 4: `/products/oncology/prevent-toxicity`

---

## 📋 LEVEL 4: SAFETY & DOSING (`/products/oncology/prevent-toxicity/`)

### **What We Demonstrate:**
**Core Question:** "What can I do to prevent dangerous side effects?"

**Key Message:** PGx-guided therapy selection prevents 83.1% of toxicity (PREPARE trial validated)

### **Page Structure:**
**✅ ALREADY BUILT** - Use existing `prevent-toxicity` page as template

**Components Already Exist:**
- HeroQuestionSection ✅
- ProblemNarrativeSection ✅
- ToxicitySolutionInteractive ✅
- ValuePropsSection ✅
- HowItWorksSection ✅
- ObservedOutcomesSection ✅

**What to Update:**
- Add CSI context (Level 4 of journey)
- Show how it integrates with CSI score
- Link to Level 5

---

## 📋 LEVEL 5: COMPLETE CARE PLAN (`/products/oncology/`)

### **What We Demonstrate:**
**Core Question:** "How do I track the complete treatment journey?"

**Key Message:** Continuous monitoring with automatic CSI updates. Static → Real-Time → Evolution tracking.

### **Page Structure:**

#### **1. HeroQuestionSection**
```typescript
{
  question: "How do I track the complete treatment journey from baseline to post-treatment?",
  genericAnswer: "Static reports. One-time analysis. No continuous monitoring. No evolution tracking.",
  ourAnswer: "Complete care plan with automatic CSI updates. Track chemosensitivity from baseline → during treatment → post-treatment. Static → Real-Time → Evolution.",
  visualComparison: {
    before: "Static report → Forgotten",
    after: "Upload once → Continuous monitoring → CSI updates → Complete timeline"
  }
}
```

#### **2. ProblemNarrativeSection**
**Focus:** Static vs. Evolution
- Static reports (one-time analysis)
- No continuous monitoring
- No evolution tracking
- No automatic updates

#### **3. SolutionNarrativeSection (Complete Care Plan Interactive)**
**Component:** Create `CompleteCarePlanSolutionInteractive.tsx`

**Steps:**
1. **Baseline:** Initial CSI calculation (Level 1)
2. **During Treatment:** CSI updates with CA-125, biomarkers
3. **Post-Treatment:** Pathway profiling, resistance prediction
4. **Complete Timeline:** Exportable care plan

**Visual:** Show timeline from Day 1 → Month 18+ with CSI updates

#### **4. HowItWorksSection**
**4 Steps:**
1. Upload initial data → Get CSI score (Level 1)
2. Add genomic data → Get drug recommendations (Level 2)
3. Add treatment history → Get resistance prediction (Level 3)
4. Add safety screening → Get complete care plan (Level 4)
5. Continuous monitoring → CSI updates automatically (Level 5)

#### **5. ObservedOutcomesSection**
**Metrics:**
- Platform architecture: Complete
- Validation status: Proof-of-concept ready
- Static → Real-Time → Evolution: Implemented

#### **6. ExampleShowcase**
**Patient Example:** Complete Sarah journey
- Day 1: CSI 78/100
- Month 3: CSI 78, CA-125 declining
- Month 6: CSI 72, CA-125 plateau
- Month 12: CSI 68, KRAS G12D detected
- Complete timeline with all interventions

#### **7. IntegrationSection**
**How All Levels Work Together:**
- Show complete journey: Level 1 → 2 → 3 → 4 → 5
- Demonstrate continuous monitoring
- Show CSI evolution over time

---

## 🏗️ COMPONENT REUSE STRATEGY

### **Components to Reuse (From prevent-toxicity):**
1. ✅ **EducationalPageLayout** - Grid layout (no sidebar)
2. ✅ **HeroQuestionSection** - Question format
3. ✅ **ProblemNarrativeSection** - Problem narrative
4. ✅ **SolutionNarrativeSection** - Interactive solution (adapt pattern)
5. ✅ **ValuePropsSection** - Value propositions
6. ✅ **HowItWorksSection** - Step-by-step process
7. ✅ **ObservedOutcomesSection** - Validation metrics
8. ✅ **ExampleShowcase** - Patient examples
9. ✅ **IntegrationSection** - Journey integration
10. ✅ **ProgressiveDisclosureSection** - Technical details

### **Components to Create:**
1. **CSIScoreSolutionInteractive.tsx** - For Level 1
2. **SPEFrameworkSolutionInteractive.tsx** - For Level 2 (or adapt TherapyFitSolutionInteractive)
3. **ResistancePredictionSolutionInteractive.tsx** - For Level 3
4. **CompleteCarePlanSolutionInteractive.tsx** - For Level 5

---

## 📊 DATA STRUCTURE

### **Each Level Needs:**
```typescript
interface JourneyLevelPageData {
  hero: {
    question: string;
    genericAnswer: string;
    ourAnswer: string;
    visualComparison?: {
      before: string;
      after: string;
    };
  };
  problem: {
    title: string;
    narrative: string;
    painPoints: string[];
  };
  solution: {
    title: string;
    description: string;
    visualFlow: SolutionStep[];
    keyFeatures: string[];
  };
  howItWorks: {
    title: string;
    steps: {
      number: number;
      title: string;
      description: string;
      icon: string;
    }[];
  };
  observedOutcomes: {
    title: string;
    metrics: {
      label: string;
      value: string;
      description: string;
    }[];
  };
  example: {
    title: string;
    patient: {
      name: string;
      age: number;
      condition: string;
      scenario: string;
    };
    results: {
      csi?: number;
      recommendation?: string;
      outcomes?: string[];
    };
  };
  integration: {
    title: string;
    description: string;
    nextLevel: {
      level: number;
      title: string;
      href: string;
      unlock: string;
    };
  };
}
```

---

## ✅ IMPLEMENTATION PRIORITY

### **Phase 1: Level 2 (Match Patients to Therapies) - P0**
**Why:** This is the most visited journey level page
**Components:**
- Adapt `TherapyFitSolutionInteractive` or create `SPEFrameworkSolutionInteractive`
- Use existing EducationalCapabilityPage structure
- Focus on S/P/E framework demonstration

### **Phase 2: Level 3 (Predict Resistance) - P1**
**Why:** Core differentiator (Static → Evolution)
**Components:**
- Create `ResistancePredictionSolutionInteractive`
- Show post-treatment pathway profiling
- Demonstrate 3-6 weeks early detection

### **Phase 3: Level 1 (The Score) - P1**
**Why:** Foundation of CSI journey
**Components:**
- Create `CSIScoreSolutionInteractive`
- Show CSI calculation process
- Demonstrate score interpretation

### **Phase 4: Level 5 (Complete Care Plan) - P2**
**Why:** Shows complete journey integration
**Components:**
- Create `CompleteCarePlanSolutionInteractive`
- Show timeline from Level 1-5
- Demonstrate continuous monitoring

### **Phase 5: Level 4 (Safety & Dosing) - P2**
**Why:** Already built, just needs CSI context
**Components:**
- Add CSI journey context
- Show integration with other levels
- Update to match other level pages

---

## 🎯 SUCCESS CRITERIA

### **Each Level Page Should:**
1. ✅ Answer ONE clear question
2. ✅ Show ONE validated capability
3. ✅ Demonstrate with interactive components
4. ✅ Show real patient examples
5. ✅ Display validation metrics
6. ✅ Guide to next level
7. ✅ Use clean, scannable layout (no text dumps)
8. ✅ Focus on DDR-targeted therapy

### **No AI Slop:**
- ❌ No generic claims without validation
- ❌ No text dumps
- ❌ No overwhelming detail
- ❌ No orphaned content
- ✅ Clear progression from Level 1 → 5
- ✅ Real validation metrics
- ✅ Concrete patient examples
- ✅ Actionable demonstrations

---

**Last Updated:** 2025-01-29  
**Status:** ✅ **PLAN COMPLETE** - Ready for execution
