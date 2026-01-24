# Homepage Component Architecture Plan - CSI Journey

**Date:** 2025-01-29  
**Status:** 🚨 CRITICAL - Execute immediately  
**Purpose:** Data-driven, component-reusable architecture for CSI homepage story

---

## 🎯 THE PROBLEM WITH CURRENT APPROACH

**What We're Doing Wrong:**
- ❌ Hard-coding everything in `SimpleCSIExplanation.tsx` (377 lines of hard-coded data)
- ❌ Not reusing existing journey/step components
- ❌ Not extracting data to config files
- ❌ No clear folder structure
- ❌ Brute forcing instead of planning

**What We Need:**
- ✅ Data-driven components (data in config files)
- ✅ Reuse existing journey/step components
- ✅ Clear folder structure
- ✅ Extract from validation context files
- ✅ Plan before building

---

## 📁 FOLDER STRUCTURE

```
src/
├── components/
│   └── landing/
│       └── csi-journey/                    # NEW FOLDER
│           ├── CSIJourneySection.tsx      # Main orchestrator
│           ├── CoreQuestionSection.tsx    # "Will chemo work?" header
│           ├── ScoreVisualization.tsx     # 0-100 score cards (High/Med/Low)
│           ├── PatientExampleCard.tsx     # Sarah's story
│           ├── JourneyLevels.tsx          # 5 levels of unlocking (REUSE SolutionInteractiveBase)
│           ├── ThreeQuestions.tsx         # Will work? How long? When stop?
│           └── index.ts                  # Exports
│
├── data/
│   └── homepage/
│       ├── hero-focused-claim.ts          # EXISTS - Core CSI config
│       ├── csi-journey-data.ts           # NEW - Journey levels data
│       ├── csi-score-examples.ts         # NEW - Score examples (72, 50, 28)
│       └── csi-patient-examples.ts       # NEW - Patient scenarios
```

---

## 🔄 REUSABLE COMPONENTS AUDIT

### **Components We Can REUSE (Don't Reinvent):**

#### **1. SolutionInteractiveBase** (`src/components/capabilities/educational/SolutionInteractiveBase.tsx`)
- **Status:** ✅ EXISTS (368 lines)
- **What it does:** Interactive step-by-step journey with visual flow
- **Reuse for:** JourneyLevels component (5 levels of unlocking)
- **Adaptation:** Pass journey data as `visualFlow` prop
- **Code Savings:** ~300 lines

#### **2. JourneyStepCard** (`src/components/co-pilot-detail/journey/JourneyStepCard.tsx`)
- **Status:** ✅ EXISTS (235 lines)
- **What it does:** Beautiful step card with problems/solutions
- **Reuse for:** Individual journey level cards
- **Adaptation:** Map our level data to JourneyStep format
- **Code Savings:** ~200 lines

#### **3. ProcessSteps** (`src/components/universal/molecules/ProcessSteps.tsx`)
- **Status:** ✅ EXISTS (403 lines)
- **What it does:** Step-by-step process visualization
- **Reuse for:** Journey progression visualization
- **Adaptation:** Pass journey steps as data
- **Code Savings:** ~150 lines

#### **4. MetricsShowcase** (`src/components/products/shared/MetricsShowcase.tsx`)
- **Status:** ✅ EXISTS (188 lines)
- **What it does:** Displays metrics with icons, values, descriptions
- **Reuse for:** Score visualization (High 72, Medium 50, Low 28)
- **Adaptation:** Pass score data as metrics array
- **Code Savings:** ~100 lines

#### **5. ComparisonSection** (`src/components/universal/organisms/ComparisonSection.tsx`)
- **Status:** ✅ EXISTS (312 lines)
- **What it does:** Side-by-side comparison
- **Reuse for:** "What unlocks" comparisons (Level 1 vs Level 5)
- **Adaptation:** Create comparison data from journey levels
- **Code Savings:** ~150 lines

**Total Code Savings:** ~900 lines of code we DON'T need to write!

---

## 📊 DATA EXTRACTION STRATEGY

### **Data Sources:**

1. **`FOCUSED_HERO_CONFIG`** (`src/data/homepage/hero-focused-claim.ts`)
   - ✅ Problem definition
   - ✅ Product description
   - ✅ Primary claim
   - ✅ Use case example
   - ✅ CTA config

2. **Validation Context Files** (`.cursor/rules/csi-validation-context/`)
   - ✅ `PLATFORM_CAPABILITY_SUMMARY.md` - Journey stages (Static → Real-Time → Evolution)
   - ✅ `CORE_DIFFERENTIATOR_STATIC_TO_EVOLUTION.md` - Platform capabilities
   - ✅ `HOLISTIC_SCORE_VALIDATION_CONTEXT.md` - Score components (D-P-M-T-S)
   - ✅ `PGX_VALIDATION_CONTEXT.md` - Safety component (Level 4)
   - ✅ `BIOMARKER_GATING_VALIDATION_CONTEXT.md` - Data completeness levels (L0/L1/L2)

3. **Medical Hierarchy** (`FOCUSED_HERO_CONFIG.medicalHierarchy`)
   - ✅ Data dependencies (what unlocks what)
   - ✅ Tier structure (5 tiers)

### **Data Files to Create:**

#### **1. `src/data/homepage/csi-journey-data.ts`**
```typescript
// Journey levels extracted from validation context + medical hierarchy
export const csiJourneyLevels = [
  {
    level: 1,
    title: "The Score",
    data: "Basic patient info (stage, cancer type)",
    unlocks: [...],
    color: "blue",
    icon: "📊",
    // From: FOCUSED_HERO_CONFIG.medicalHierarchy.dataDependencies.basic
  },
  {
    level: 2,
    title: "Therapies & Trials",
    data: "+ Genomic test results",
    unlocks: [...],
    color: "purple",
    icon: "💊",
    // From: FOCUSED_HERO_CONFIG.medicalHierarchy.dataDependencies.withNGS
  },
  // ... etc
];
```

#### **2. `src/data/homepage/csi-score-examples.ts`**
```typescript
// Score examples extracted from FOCUSED_HERO_CONFIG
export const csiScoreExamples = {
  high: {
    score: 72,
    recommendation: "Continue Treatment",
    benefit: "6+ months",
    // From: FOCUSED_HERO_CONFIG.primaryUseCase.example.result
  },
  // ... etc
};
```

#### **3. `src/data/homepage/csi-patient-examples.ts`**
```typescript
// Patient scenarios extracted from FOCUSED_HERO_CONFIG
export const csiPatientExamples = [
  {
    name: "Sarah",
    age: 58,
    cancer: "ovarian",
    scenario: "...",
    // From: FOCUSED_HERO_CONFIG.primaryUseCase.example
  }
];
```

---

## 🏗️ COMPONENT ARCHITECTURE

### **Main Component: `CSIJourneySection.tsx`**
**Purpose:** Orchestrates all sub-components  
**Structure:**
```typescript
<CSIJourneySection>
  <CoreQuestionSection />        // "Will chemo work?" header
  <ScoreVisualization />         // High/Med/Low score cards (REUSE MetricsShowcase)
  <PatientExampleCard />        // Sarah's story
  <JourneyLevels />             // 5 levels (REUSE SolutionInteractiveBase)
  <ThreeQuestions />           // Will work? How long? When stop?
  <CTASection />               // Final CTA (REUSE existing)
</CSIJourneySection>
```

### **Sub-Components (Data-Driven):**

#### **1. `CoreQuestionSection.tsx`**
- **Data Source:** `FOCUSED_HERO_CONFIG.problem`
- **Props:** `{ problem: FOCUSED_HERO_CONFIG.problem }`
- **Lines:** ~50 (just header + description)

#### **2. `ScoreVisualization.tsx`**
- **Data Source:** `csi-score-examples.ts`
- **Component:** REUSE `MetricsShowcase`
- **Props:** `{ metrics: [highScore, medScore, lowScore] }`
- **Lines:** ~20 (wrapper around MetricsShowcase)

#### **3. `PatientExampleCard.tsx`**
- **Data Source:** `FOCUSED_HERO_CONFIG.primaryUseCase.example`
- **Props:** `{ example: FOCUSED_HERO_CONFIG.primaryUseCase.example }`
- **Lines:** ~80 (custom card, but data-driven)

#### **4. `JourneyLevels.tsx`**
- **Data Source:** `csi-journey-data.ts` (extracted from validation context)
- **Component:** REUSE `SolutionInteractiveBase`
- **Props:** `{ visualFlow: journeyLevelsData }`
- **Lines:** ~30 (wrapper + data transformation)

#### **5. `ThreeQuestions.tsx`**
- **Data Source:** Derived from `FOCUSED_HERO_CONFIG.problem`
- **Props:** `{ questions: threeQuestionsData }`
- **Lines:** ~60 (simple grid, data-driven)

---

## 📋 IMPLEMENTATION PLAN

### **Phase 1: Data Extraction (Day 1)**
1. ✅ Read all validation context files
2. ✅ Extract journey levels from `PLATFORM_CAPABILITY_SUMMARY.md` + `medicalHierarchy`
3. ✅ Create `csi-journey-data.ts` with 5 levels
4. ✅ Create `csi-score-examples.ts` from `FOCUSED_HERO_CONFIG`
5. ✅ Create `csi-patient-examples.ts` from `FOCUSED_HERO_CONFIG`

### **Phase 2: Component Structure (Day 1-2)**
1. ✅ Create `src/components/landing/csi-journey/` folder
2. ✅ Create `CSIJourneySection.tsx` (orchestrator)
3. ✅ Create `CoreQuestionSection.tsx` (data-driven)
4. ✅ Create `ScoreVisualization.tsx` (wrapper around MetricsShowcase)
5. ✅ Create `PatientExampleCard.tsx` (data-driven)
6. ✅ Create `JourneyLevels.tsx` (wrapper around SolutionInteractiveBase)
7. ✅ Create `ThreeQuestions.tsx` (data-driven)

### **Phase 3: Integration (Day 2)**
1. ✅ Replace `SimpleCSIExplanation.tsx` with `CSIJourneySection`
2. ✅ Update `src/app/page.tsx` to use new component
3. ✅ Test all data flows
4. ✅ Verify no hard-coding

### **Phase 4: Refinement (Day 2-3)**
1. ✅ Polish animations
2. ✅ Mobile responsiveness
3. ✅ Accessibility
4. ✅ Performance optimization

---

## 🎯 DATA MAPPING

### **Journey Levels → Validation Context:**

| Level | Title | Data Source | Validation Context |
|-------|-------|-------------|-------------------|
| 1 | The Score | `medicalHierarchy.dataDependencies.basic` | Basic CSI calculation |
| 2 | Therapies & Trials | `medicalHierarchy.dataDependencies.withNGS` | S/P/E framework (AUROC 0.70) |
| 3 | Resistance Prediction | `medicalHierarchy.dataDependencies.withNGS` + treatment history | Post-treatment profiling (AUROC 0.714-0.750) |
| 4 | Safety & Dosing | `medicalHierarchy.dataDependencies.withGermline` | PGx validation (83% toxicity reduction) |
| 5 | Complete Care Plan | `medicalHierarchy.dataDependencies.withCompleteness` | Platform journey (Static → Evolution) |

### **Score Examples → FOCUSED_HERO_CONFIG:**

| Score | Example | Source |
|-------|---------|--------|
| High (72) | `primaryUseCase.example.result` | FOCUSED_HERO_CONFIG |
| Medium (50) | Derived from claim thresholds | FOCUSED_HERO_CONFIG |
| Low (28) | Derived from claim thresholds | FOCUSED_HERO_CONFIG |

### **Patient Examples → FOCUSED_HERO_CONFIG:**

| Patient | Scenario | Source |
|---------|----------|--------|
| Sarah | `primaryUseCase.example.scenario` | FOCUSED_HERO_CONFIG |

---

## ✅ ACCEPTANCE CRITERIA

### **Data-Driven:**
- [ ] Zero hard-coded strings in components
- [ ] All data comes from config files
- [ ] All data traceable to validation context

### **Component Reuse:**
- [ ] `JourneyLevels.tsx` uses `SolutionInteractiveBase`
- [ ] `ScoreVisualization.tsx` uses `MetricsShowcase`
- [ ] No duplicate code

### **Folder Structure:**
- [ ] All CSI journey components in `src/components/landing/csi-journey/`
- [ ] All CSI data in `src/data/homepage/csi-*.ts`
- [ ] Clear separation of concerns

### **Validation Context Integration:**
- [ ] Journey levels extracted from validation context
- [ ] Score examples from FOCUSED_HERO_CONFIG
- [ ] Patient examples from FOCUSED_HERO_CONFIG
- [ ] All claims traceable to validation files

---

## 🚀 EXECUTION ORDER

1. **Extract Data** → Create data files from validation context
2. **Create Folder** → `src/components/landing/csi-journey/`
3. **Build Components** → Data-driven, reuse existing
4. **Integrate** → Replace hard-coded component
5. **Test** → Verify data flows correctly

---

**Last Updated:** 2025-01-29  
**Status:** ✅ **ARCHITECTURE PLAN COMPLETE**
