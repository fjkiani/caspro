# 🎯 R&D Page Restructure Plan
## Pharma-Integrated Drug Development Platform

**Created:** 2025-01-23  
**Status:** Planning Phase  
**Goal:** Transform R&D page to showcase integrated platform solving clinical trial success challenges

---

## 📋 CURRENT STATE AUDIT

### Existing Components on R&D Page

1. **RDHeroSection** - Hero with title/subtitle
2. **InteractiveDemoSection** - Moved from homepage (interactive demos)
3. **RDInteractiveShowcase** - Capability cards with interactive demos
4. **RDCapabilityTesting** - Testing interface
5. **RDCapabilityShowcase** - Generic capability showcase
6. **RDEnginesSection** - AI engines (Oracle, Forge, Boltz, Command Center)
7. **RDTabs** - Tabbed content (dynamically imported)
8. **RelatedProductsSection** - Links to other products
9. **RelatedIndustrySection** - Industry use cases

### Issues with Current Structure

- ❌ **No clear problem statement** - Missing "The Challenge" section
- ❌ **No integrated workflow visualization** - Missing 3-phase architecture
- ❌ **Capabilities not organized by workflow** - Scattered across multiple sections
- ❌ **No validation metrics showcase** - Missing outcome-linked validation
- ❌ **No card-based capability navigation** - Unlike match-patients-to-therapies page
- ❌ **Missing unified patient journey** - No end-to-end flow visualization

---

## 🎯 PROPOSED NEW STRUCTURE

### Page Layout (Top to Bottom)

```
1. HERO SECTION
   └─ Positioning: "Supporting mechanism-aligned patient selection and proactive pharmacovigilance"
   └─ Tagline: "AI pharmacogenetics for cancer. We match patients to trials by molecular mechanism—not just histology"

2. THE CHALLENGE SECTION
   └─ Industry Context: Clinical trial success rates
   └─ Problem Statement: Traditional eligibility vs mechanism alignment
   └─ Quick Reference: Metrics table (RRR, Risk Ratio, Sensitivity, etc.)

3. INTEGRATED PLATFORM ARCHITECTURE
   └─ Visual: 3-Phase Pipeline Diagram
   └─ Phase 1: Mechanism-Aligned Patient Selection
   └─ Phase 2: Toxicity Risk Assessment
   └─ Phase 3: Regulatory Support (Exploratory)
   └─ Outcome: Unified Feasibility Score

4. CAPABILITY CARDS GRID (Similar to match-patients-to-therapies)
   └─ Card 1: Mechanism-Based Trial Matching
   └─ Card 2: Drug Efficacy Assessment (S/P/E)
   └─ Card 3: Toxicity Risk Assessment
   └─ Card 4: Dosing Guidance
   └─ Card 5: Evidence Integration
   └─ Card 6: Regulatory Support

5. VALIDATION METRICS SHOWCASE
   └─ Outcome-Linked Validation Table
   └─ Framework Status Table
   └─ Reproducibility Commands

6. EXAMPLE USE CASE: MBD4 + TP53 Patient
   └─ Traditional Approach vs Platform Approach
   └─ Side-by-side comparison

7. INTEGRATED PATIENT JOURNEY
   └─ 5-Step Flow Visualization
   └─ Step-by-step breakdown

8. PLATFORM CAPABILITIES (6 Groups)
   └─ Group 1: Clinical Decision Support
   └─ Group 2: Research Acceleration
   └─ Group 3: Therapeutic Design
   └─ Group 4: Platform Intelligence
   └─ Group 5: Conversational AI
   └─ Group 6: Enterprise Platform

9. VALUE PROPOSITION
   └─ For Oncologists
   └─ For Biotechs
   └─ For Researchers
   └─ For Clinical Trial Teams

10. CTA SECTION
    └─ Request Demo / Get Started
```

---

## 🔧 COMPONENT REUSE STRATEGY

### Components to Reuse (with tweaks)

#### 1. **ProductHeroSection** (from `TabbedCapabilityPage.tsx`)
- ✅ **Reuse:** Hero structure
- 🔧 **Tweak:** Update content to match positioning statement
- 📍 **Location:** Section 1

#### 2. **ProblemSolutionSection** (from `products/shared/ProblemSolutionSection.tsx`)
- ✅ **Reuse:** Problem statement layout
- 🔧 **Tweak:** Update to "The Challenge" content
- 📍 **Location:** Section 2

#### 3. **Capability Cards Grid** (from `TabbedCapabilityPage.tsx` lines 74-146)
- ✅ **Reuse:** Card grid layout with active state
- 🔧 **Tweak:** Create 6 capability cards instead of co-pilot cards
- 📍 **Location:** Section 4
- 🎨 **Style:** Similar to match-patients-to-therapies page (gradient cards, active state)

#### 4. **OutcomeFocusedCoPilotPage** (from `co-pilot-detail/OutcomeFocusedCoPilotPage.tsx`)
- ✅ **Reuse:** Content rendering structure
- 🔧 **Tweak:** Adapt for capability detail view
- 📍 **Location:** Section 4 (when card clicked)

#### 5. **CapabilityJourney** (from `co-pilot-detail/CapabilityJourney.tsx`)
- ✅ **Reuse:** Side-by-side comparison layout
- 🔧 **Tweak:** Use for "Traditional vs Platform Approach" comparison
- 📍 **Location:** Section 6

#### 6. **MetricsShowcase** (from `landing/MetricsShowcase.tsx`)
- ✅ **Reuse:** Metrics display grid
- 🔧 **Tweak:** Update to validation metrics table
- 📍 **Location:** Section 5

#### 7. **TabbedInterface** (from `shared/TabbedInterface.tsx`)
- ✅ **Reuse:** Tab structure
- 🔧 **Tweak:** Use for 6 capability groups
- 📍 **Location:** Section 8

#### 8. **ValuePropositionCard** (from `shared/ValuePropositionCard.tsx`)
- ✅ **Reuse:** Value prop card layout
- 🔧 **Tweak:** Update content for 4 audiences
- 📍 **Location:** Section 9

### New Components to Create

#### 1. **RDPlatformArchitecture.tsx**
- **Purpose:** Visual 3-phase pipeline diagram
- **Content:** Phase 1, 2, 3 with outcome
- **Style:** Flowchart-style visualization
- **Reuse:** Similar to `BridgingValleyOfDeath.tsx` but for 3 phases

#### 2. **RDValidationMetrics.tsx**
- **Purpose:** Display validation metrics table
- **Content:** Outcome-linked validation table
- **Style:** Table with badges (✅ validated, ⚠️ framework)
- **Reuse:** Similar to `MetricsShowcase.tsx` but table format

#### 3. **RDIntegratedJourney.tsx**
- **Purpose:** 5-step patient journey visualization
- **Content:** Step-by-step flow
- **Style:** Vertical timeline or horizontal flow
- **Reuse:** Similar to `CapabilityJourney.tsx` but single flow

#### 4. **RDCapabilityCard.tsx**
- **Purpose:** Individual capability card
- **Content:** Capability name, description, status, metrics
- **Style:** Gradient card with hover effects
- **Reuse:** Based on `TabbedCapabilityPage.tsx` card structure

---

## 📊 DATA STRUCTURE

### Capability Cards Data

```typescript
interface RDCapabilityCard {
  id: string;
  title: string;
  description: string;
  status: 'validated' | 'framework';
  metrics: {
    primary: string;
    secondary?: string;
  };
  icon: string;
  color: string;
  href?: string;
  details?: {
    technical: string;
    scientific: string;
    business: string;
    useCases: string[];
  };
}

const RD_CAPABILITIES: RDCapabilityCard[] = [
  {
    id: 'mechanism-trial-matching',
    title: 'Mechanism-Based Trial Matching',
    description: 'Mechanism vector computation and drug-pathway alignment scoring',
    status: 'framework',
    metrics: { primary: '0.983 DDR fit', secondary: '1.0 Top-3 accuracy' },
    icon: 'Target',
    color: 'blue',
    href: '/products/r-d/mechanism-trial-matching'
  },
  {
    id: 'drug-efficacy',
    title: 'Drug Efficacy Assessment',
    description: 'S/P/E (Sequence/Pathway/Evidence) framework for drug ranking',
    status: 'validated',
    metrics: { primary: '100% top-5 accuracy', secondary: '17/17 patients' },
    icon: 'Activity',
    color: 'green',
    href: '/products/r-d/drug-efficacy'
  },
  {
    id: 'toxicity-risk',
    title: 'Toxicity Risk Assessment',
    description: 'Pharmacogenomic screening and pathway overlap analysis',
    status: 'validated',
    metrics: { primary: '83.1% RRR', secondary: 'PREPARE trial' },
    icon: 'Shield',
    color: 'orange',
    href: '/products/r-d/toxicity-risk'
  },
  {
    id: 'dosing-guidance',
    title: 'Dosing Guidance',
    description: 'CPIC-aligned dosing recommendations where applicable',
    status: 'validated',
    metrics: { primary: '100% concordance', secondary: '10/10 CPIC cases' },
    icon: 'Gauge',
    color: 'purple',
    href: '/products/r-d/dosing-guidance'
  },
  {
    id: 'evidence-integration',
    title: 'Evidence Integration',
    description: 'Literature and guideline integration for decision support',
    status: 'framework',
    metrics: { primary: 'Multi-provider', secondary: 'Quality scoring' },
    icon: 'BookOpen',
    color: 'teal',
    href: '/products/r-d/evidence-integration'
  },
  {
    id: 'regulatory-support',
    title: 'Regulatory Support',
    description: 'Framework designed to support regulatory workflows',
    status: 'framework',
    metrics: { primary: 'Exploratory', secondary: 'FDA Sentinel' },
    icon: 'FileText',
    color: 'indigo',
    href: '/products/r-d/regulatory-support'
  }
];
```

---

## 🎨 VISUAL DESIGN

### Card Design (Similar to match-patients-to-therapies)

```typescript
// Card Structure
<div className="bg-gradient-to-br from-{color}-50 to-{color}-100 rounded-2xl p-6 border-2 border-{color}-200">
  {/* Icon */}
  <div className="w-12 h-12 bg-{color}-100 rounded-xl flex items-center justify-center">
    <Icon className="w-6 h-6 text-{color}-600" />
  </div>
  
  {/* Title */}
  <h3 className="text-xl font-bold text-slate-900 mt-4">{title}</h3>
  
  {/* Description */}
  <p className="text-slate-700 mt-2">{description}</p>
  
  {/* Status Badge */}
  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
    status === 'validated' 
      ? 'bg-green-100 text-green-700' 
      : 'bg-orange-100 text-orange-700'
  }`}>
    {status === 'validated' ? '✅ Validated' : '⚠️ Framework'}
  </span>
  
  {/* Metrics */}
  <div className="mt-4 space-y-1">
    <div className="text-sm font-semibold text-slate-900">{metrics.primary}</div>
    {metrics.secondary && (
      <div className="text-xs text-slate-600">{metrics.secondary}</div>
    )}
  </div>
  
  {/* Active Indicator */}
  {isActive && (
    <div className="mt-4 pt-4 border-t border-slate-200">
      <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold">
        <span>✓</span>
        <span>Active</span>
      </div>
    </div>
  )}
</div>
```

### Color Scheme

- **Mechanism Trial Matching:** Blue (`blue-50` to `blue-100`)
- **Drug Efficacy:** Green (`green-50` to `green-100`)
- **Toxicity Risk:** Orange (`orange-50` to `orange-100`)
- **Dosing Guidance:** Purple (`purple-50` to `purple-100`)
- **Evidence Integration:** Teal (`teal-50` to `teal-100`)
- **Regulatory Support:** Indigo (`indigo-50` to `indigo-100`)

---

## 📝 IMPLEMENTATION STEPS

### Phase 1: Foundation (Day 1)

1. ✅ **Create data structure** (`src/data/products/rd-capabilities-data.ts`)
   - Define 6 capability cards
   - Define validation metrics
   - Define platform architecture phases

2. ✅ **Create RDCapabilityCard component**
   - Reuse card structure from `TabbedCapabilityPage.tsx`
   - Add status badges (validated/framework)
   - Add metrics display

3. ✅ **Update RDHeroSection**
   - Update positioning statement
   - Update tagline

### Phase 2: Core Sections (Day 2)

4. ✅ **Create The Challenge Section**
   - Reuse `ProblemSolutionSection` component
   - Add metrics reference table
   - Add industry context

5. ✅ **Create Platform Architecture Section**
   - Create `RDPlatformArchitecture.tsx`
   - Visual 3-phase pipeline
   - Outcome visualization

6. ✅ **Create Capability Cards Grid**
   - Grid layout (3 columns on desktop, 2 on tablet, 1 on mobile)
   - Active state management
   - Click to show detail view

### Phase 3: Detail Views (Day 3)

7. ✅ **Create Capability Detail View**
   - Reuse `OutcomeFocusedCoPilotPage` structure
   - Show capability details when card clicked
   - Include technical/scientific/business breakdown

8. ✅ **Create Validation Metrics Section**
   - Create `RDValidationMetrics.tsx`
   - Display outcome-linked validation table
   - Show framework status table

9. ✅ **Create Example Use Case Section**
   - Reuse `CapabilityJourney.tsx` for comparison
   - Traditional vs Platform approach

### Phase 4: Journey & Groups (Day 4)

10. ✅ **Create Integrated Patient Journey**
    - Create `RDIntegratedJourney.tsx`
    - 5-step flow visualization
    - Step-by-step breakdown

11. ✅ **Create Platform Capabilities Groups**
    - Reuse `TabbedInterface` for 6 groups
    - Each group as a tab
    - Show capabilities within each group

12. ✅ **Create Value Proposition Section**
    - Reuse `ValuePropositionCard`
    - 4 audiences (Oncologists, Biotechs, Researchers, Trial Teams)

### Phase 5: Polish & Integration (Day 5)

13. ✅ **Update main R&D page**
    - Remove old components
    - Add new sections in order
    - Ensure smooth transitions

14. ✅ **Add CTA Section**
    - Request demo button
    - Get started CTA

15. ✅ **Testing & Refinement**
    - Test all interactions
    - Verify responsive design
    - Check accessibility

---

## 🔄 COMPONENT MAPPING

### Current → New Component Mapping

| Current Component | New Component | Action |
|------------------|---------------|--------|
| `RDHeroSection` | `RDHeroSection` (updated) | ✅ Update content |
| `InteractiveDemoSection` | Keep or move | ⚠️ Decide placement |
| `RDInteractiveShowcase` | `RDCapabilityCardsGrid` | 🔄 Replace with card grid |
| `RDCapabilityTesting` | Remove | ❌ Remove |
| `RDCapabilityShowcase` | Remove | ❌ Remove |
| `RDEnginesSection` | Keep (move to bottom) | ✅ Reposition |
| `RDTabs` | `RDPlatformCapabilitiesTabs` | 🔄 Replace with 6 groups |
| `RelatedProductsSection` | Keep | ✅ Keep |
| `RelatedIndustrySection` | Keep | ✅ Keep |

### New Components to Create

1. `RDChallengeSection.tsx` - The Challenge
2. `RDPlatformArchitecture.tsx` - 3-phase pipeline
3. `RDCapabilityCardsGrid.tsx` - 6 capability cards
4. `RDCapabilityDetail.tsx` - Capability detail view
5. `RDValidationMetrics.tsx` - Validation metrics table
6. `RDExampleUseCase.tsx` - MBD4 + TP53 example
7. `RDIntegratedJourney.tsx` - 5-step patient journey
8. `RDPlatformCapabilitiesTabs.tsx` - 6 capability groups
9. `RDValueProposition.tsx` - 4 audiences

---

## 📦 FILE STRUCTURE

```
src/
├── app/
│   └── products/
│       └── r-d/
│           └── page.tsx (UPDATED - new structure)
│
├── components/
│   └── products/
│       └── r-d/
│           ├── RDHeroSection.tsx (UPDATED)
│           ├── RDChallengeSection.tsx (NEW)
│           ├── RDPlatformArchitecture.tsx (NEW)
│           ├── RDCapabilityCardsGrid.tsx (NEW)
│           ├── RDCapabilityCard.tsx (NEW)
│           ├── RDCapabilityDetail.tsx (NEW)
│           ├── RDValidationMetrics.tsx (NEW)
│           ├── RDExampleUseCase.tsx (NEW)
│           ├── RDIntegratedJourney.tsx (NEW)
│           ├── RDPlatformCapabilitiesTabs.tsx (NEW)
│           ├── RDValueProposition.tsx (NEW)
│           └── RDEnginesSection.tsx (KEEP - move to bottom)
│
└── data/
    └── products/
        ├── r-d-data.ts (UPDATED - add new data)
        └── rd-capabilities-data.ts (NEW - capability cards data)
```

---

## ✅ SUCCESS CRITERIA

1. **Clear Problem Statement** - Users understand the challenge
2. **Visual Architecture** - 3-phase pipeline is clear
3. **Card-Based Navigation** - Similar to match-patients-to-therapies
4. **Validation Metrics** - Outcome-linked validation is prominent
5. **Integrated Journey** - End-to-end flow is clear
6. **Capability Groups** - 6 groups are well-organized
7. **Value Proposition** - 4 audiences are addressed
8. **Responsive Design** - Works on all screen sizes
9. **Smooth Interactions** - Card clicks show detail views
10. **Consistent Styling** - Matches existing design system

---

## 🚀 NEXT STEPS

1. **Review this plan** with team
2. **Create data structures** first
3. **Build components incrementally** (one section at a time)
4. **Test each section** before moving to next
5. **Iterate based on feedback**

---

**Status:** Ready for implementation  
**Estimated Time:** 5 days  
**Priority:** High - Core product page transformation
