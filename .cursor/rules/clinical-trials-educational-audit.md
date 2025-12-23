# Clinical Trials Educational Transformation - Complete Audit

**Created:** 2025-12-16  
**Status:** Ready for Implementation  
**Pattern:** Follow toxicity/therapy-fit/pathway educational transformation

---

## 📊 PATTERN ANALYSIS

### **1. Data Structure Pattern**

#### **Source Data (`CoPilotDetailContent`)**
Located in: `src/data/copilots/clinical-trials.ts`

**Structure:**
```typescript
{
  slug: "clinical-trials",
  pageTitle: "...",
  heroSubtitle: "...",
  vision: "...",
  valueProps: [...],
  buildsOn: "...",
  buildsOnStackPoints: [...],
  kpis: [...],
  observedOutcomes: [...],
  genomicInsightsOverview: "...",
  coreProblemIntro: "...",
  coreProblemPoints: [...],
  genomicUseCasesGrid: [...],
  keyCapabilities: [...],  // ← CRITICAL: Used by KeyCapabilitiesSection
  valuePropositionSections: [...],
  conclusion: "...",
  inSilicoOverview: {...}
}
```

**Purpose:** Base copilot data used by standard co-pilot pages and referenced by educational pages.

#### **Educational Data (`EducationalCapabilityPageData`)**
Located in: `src/data/capabilities/educational/{capability}-educational.ts`

**Structure:**
```typescript
{
  hero: {
    question: "...",
    genericAnswer: "...",
    ourAnswer: "...",
    visualComparison: {...}
  },
  problem: {
    title: "...",
    narrative: "...",  // Full markdown narrative
    visualMetaphor: "...",
    painPoints: [...]
  },
  solution: {
    title: "...",
    narrative: "...",  // Full markdown narrative
    keyFeatures: [...],
    visualFlow: [...]
  },
  howItWorks: {
    title: "...",
    steps: [...],
    interactive: true
  },
  process: {
    title: "...",
    steps: [...],
    layout: "horizontal"
  },
  value: {
    title: "THE MOAT: ...",
    question: "...",
    genericResponse: "...",
    ourResponse: "...",
    comparison: [...]
  },
  integration: {
    title: "...",
    connections: [...],
    carePlanContext: [...]
  },
  example: {
    title: "...",
    patient: {...},
    solution: [...],
    outcome: [...]
  },
  concepts: {
    concepts: [...],
    layout: "grid",
    interactive: true
  },
  layout: {
    sidebar: {
      sections: [...]
    },
    progress: {...}
  },
  sourceData: clinicalTrialsData  // ← References source data
}
```

**Purpose:** Educational narrative structure that transforms source data into story-driven experience.

---

### **2. Component Application Pattern**

#### **EducationalCapabilityPage Component**
Located in: `src/components/capabilities/educational/EducationalCapabilityPage.tsx`

**Rendering Flow:**
1. **HeroQuestionSection** → `data.hero`
2. **ProblemNarrativeSection** → `data.problem`
3. **SolutionInteractive** → `data.solution` (capability-specific component)
4. **ValuePropsSection** → `data.sourceData.valueProps` (pulls from source)
5. **HowItWorksSection** → `data.howItWorks`
6. **ObservedOutcomesSection** → `data.sourceData.observedOutcomes` (pulls from source)
7. **KeyCapabilitiesSection** → `data.sourceData.keyCapabilities` (pulls from source)
8. **ProcessVisualizer** → `data.process`
9. **ValuePropositionSection** → `data.value`
10. **ExampleShowcase** → `data.example`
11. **IntegrationSection** → `data.integration`

**Key Insight:** Educational data provides narrative structure, source data provides structured capabilities/metrics.

---

### **3. Registration Pattern**

#### **Index Registration**
Located in: `src/data/capabilities/educational/index.ts`

**Pattern:**
```typescript
// Export
export { clinicalTrialsEducationalData } from './clinical-trials-educational';

// Import
import { clinicalTrialsEducationalData } from './clinical-trials-educational';

// Map capability slug to educational data
const educationalCapabilityDataMap: Record<string, any> = {
  'prevent-toxicity': toxicityEducationalData,
  'target-validation': pathwayEducationalData,
  'match-patients-to-therapies': therapyFitEducationalData,
  'clinical-trials': clinicalTrialsEducationalData,  // ← ADD THIS
};
```

**Note:** Capability slug may differ from copilot slug. Check routing:
- Copilot slug: `clinical-trials`
- Capability slug: May be `find-clinical-trials` or `clinical-trial-matching`

---

### **4. Solution Interactive Component Pattern**

**Current Components:**
- `ToxicitySolutionInteractive.tsx` → Used for toxicity
- `PathwaySolutionInteractive.tsx` → Used for pathway/target-validation
- `TherapyFitSolutionInteractive.tsx` → Used for therapy-fit/match-patients-to-therapies

**Pattern in EducationalCapabilityPage:**
```typescript
{capabilitySlug === 'target-validation' ? (
  <PathwaySolutionInteractive data={data.solution} />
) : capabilitySlug === 'match-patients-to-therapies' ? (
  <TherapyFitSolutionInteractive data={data.solution} />
) : (
  <ToxicitySolutionInteractive data={data.solution} />
)}
```

**For Clinical Trials:** Need to create `ClinicalTrialsSolutionInteractive.tsx` or use existing component.

---

## 🔍 CLINICAL TRIALS DATA AUDIT

### **Source Data Review** (`clinical-trials.ts`)

**✅ Complete Sections:**
- ✅ `slug`, `pageTitle`, `heroSubtitle`, `vision`
- ✅ `valueProps` (2 audiences: Clinicians & Trial Offices, Research Teams)
- ✅ `buildsOn`, `buildsOnStackPoints`
- ✅ `kpis` (3 metrics: Shortlist Compression, Mechanism Fit, Time-to-First-Trial)
- ✅ `observedOutcomes` (3 outcomes: Mechanism-Based Matching, Shortlist Compression, Time-to-First-Trial)
- ✅ `genomicInsightsOverview`
- ✅ `coreProblemIntro`, `coreProblemPoints` (3 points)
- ✅ `genomicUseCasesGrid` (4 use cases)
- ✅ `keyCapabilities` (2 capabilities: Mechanism-Based Trial Matching, Complex Queries)
- ✅ `valuePropositionSections` (1 audience: For the Care Team)
- ✅ `conclusion`

**❌ Missing Sections:**
- ❌ `inSilicoOverview` (has `coreConcepts`, `valuePropositions`, `deliverables`)

**⚠️ Incomplete Sections:**
- ⚠️ `keyCapabilities[0].technical.components` - Has `features` array but structure differs from toxicity/therapy-fit
- ⚠️ `keyCapabilities[0].scientific.components` - Has `features` array
- ⚠️ `keyCapabilities[0].business.components` - Has `features` array

**Note:** Clinical trials data uses `features` arrays in components, while toxicity/therapy-fit use simpler `title`/`subtitle` structure. Both work with KeyCapabilitiesSection.

---

## 📋 IMPLEMENTATION CHECKLIST

### **Phase 1: Create Educational Data File**

**File:** `src/data/capabilities/educational/clinical-trials-educational.ts`

**Required Sections:**
1. ✅ **Hero** - Question/answer format
2. ✅ **Problem** - Narrative with pain points
3. ✅ **Solution** - Narrative with key features and visual flow
4. ✅ **How It Works** - 4-step process (or adapt from source)
5. ✅ **Process** - Visual flow (horizontal layout)
6. ✅ **Value** - THE MOAT comparison
7. ✅ **Integration** - How it fits into care plan
8. ✅ **Example** - Real patient story
9. ✅ **Concepts** - Key concept definitions
10. ✅ **Layout** - Sidebar navigation structure
11. ✅ **sourceData** - Reference to `clinicalTrialsData`

**Data Sources:**
- Extract narrative from `clinical-trials.ts` fields
- Use `coreProblemIntro` + `coreProblemPoints` for problem section
- Use `genomicInsightsOverview` for solution intro
- Use `keyCapabilities` descriptions for how it works
- Create example patient story (similar to therapy-fit melanoma example)

---

### **Phase 2: Register in Index**

**File:** `src/data/capabilities/educational/index.ts`

**Actions:**
1. Add export: `export { clinicalTrialsEducationalData } from './clinical-trials-educational';`
2. Add import: `import { clinicalTrialsEducationalData } from './clinical-trials-educational';`
3. Add to map: Determine correct capability slug and add mapping

**Capability Slug Research Needed:**
- Check `src/app/products/[productSlug]/[capabilitySlug]/page.tsx` routing
- Check if clinical-trials is under Oncology product or separate
- Verify slug: `clinical-trials` vs `find-clinical-trials` vs `clinical-trial-matching`

---

### **Phase 3: Create Solution Interactive Component (Optional)**

**File:** `src/components/capabilities/educational/ClinicalTrialsSolutionInteractive.tsx`

**Pattern:**
- Similar to `TherapyFitSolutionInteractive.tsx`
- Shows mechanism-based matching flow
- Visualizes pathway burden → mechanism fit → trial ranking

**Alternative:** Use existing `ClinicalTrialsMatcher` component from `src2` if available.

---

### **Phase 4: Update EducationalCapabilityPage**

**File:** `src/components/capabilities/educational/EducationalCapabilityPage.tsx`

**Actions:**
1. Import `ClinicalTrialsSolutionInteractive` (if created)
2. Add condition in solution section:
   ```typescript
   capabilitySlug === 'clinical-trials' ? (
     <ClinicalTrialsSolutionInteractive data={data.solution} />
   ) : ...
   ```
3. Update ValuePropsSection/ObservedOutcomesSection dataSource mapping

---

## 🎯 KEY INSIGHTS FROM PATTERN

### **1. Narrative Structure**
- **Hero:** Question → Generic Answer → Our Answer
- **Problem:** Title + Full narrative + Visual metaphor + Pain points
- **Solution:** Title + Full narrative + Key features + Visual flow
- **How It Works:** 4-step process with details
- **Value:** THE MOAT comparison (generic vs our system)
- **Example:** Real patient story with step-by-step solution

### **2. Data Flow**
- Educational data provides **narrative structure** (stories, explanations)
- Source data provides **structured metrics** (keyCapabilities, observedOutcomes, KPIs)
- Components pull from both: narrative from educational, metrics from source

### **3. Reusability**
- **100% reusable components** across all capabilities
- Only educational data file needs to be created
- Solution interactive component is optional (can use generic)

### **4. Sidebar Navigation**
- Layout structure defines sidebar sections
- Subsections come from `keyCapabilities` titles
- Progress tracking (current/total/readingTime)

---

## 🚀 NEXT STEPS

1. **Create** `clinical-trials-educational.ts` following toxicity/therapy-fit pattern
2. **Register** in `index.ts` with correct capability slug
3. **Verify** routing to determine capability slug
4. **Create** `ClinicalTrialsSolutionInteractive.tsx` (optional, can use generic)
5. **Update** `EducationalCapabilityPage.tsx` to handle clinical-trials
6. **Test** educational page renders correctly

---

## 📝 NOTES

- Clinical trials data structure is slightly different (uses `features` arrays) but compatible
- Missing `inSilicoOverview` in source data - may need to add or skip
- Solution interactive component is optional - can fall back to generic `SolutionNarrativeSection`
- All components are already built and reusable - just need data file

---

## 🎯 CRITICAL FINDINGS & RECOMMENDATIONS

### **✅ APPROACH IS SOLID - WITH MINOR IMPROVEMENTS**

**Strengths:**
1. ✅ **Proven Pattern** - Works for 3 capabilities already (toxicity, therapy-fit, pathway)
2. ✅ **Component Reusability** - 100% reusable, no new components needed
3. ✅ **Clear Separation** - Source data (metrics) vs Educational data (narrative)
4. ✅ **Capability Slug Confirmed** - `clinical-trials` is correct (standalone capability under Oncology)

**Improvements Needed:**

1. **Solution Interactive Component** - Should create `ClinicalTrialsSolutionInteractive.tsx` for consistency (toxicity/therapy-fit/pathway all have custom components)

2. **Concepts Section** - Educational data includes `concepts` but EducationalCapabilityPage doesn't render it. Either:
   - Add ConceptExplainer rendering to EducationalCapabilityPage, OR
   - Remove `concepts` from educational data structure

3. **ValuePropsSection/ObservedOutcomesSection** - Currently uses hardcoded `dataSource` mapping. Should be data-driven:
   ```typescript
   // Current (hardcoded):
   <ValuePropsSection dataSource={
     capabilitySlug === 'target-validation' ? 'pathway' : 
     capabilitySlug === 'match-patients-to-therapies' ? 'therapy-fit' : 
     'toxicity'
   } />
   
   // Better (data-driven):
   <ValuePropsSection data={data.sourceData} />
   ```

4. **inSilicoOverview** - Missing in source data. Options:
   - Add minimal version to `clinical-trials.ts`, OR
   - Skip it (not critical for educational page)

**Verdict:** ✅ **YES, this is the best approach** - Follow the pattern exactly, but make the improvements above for better maintainability.

---

**Status:** Ready to implement following exact pattern from toxicity/therapy-fit/pathway transformations.

