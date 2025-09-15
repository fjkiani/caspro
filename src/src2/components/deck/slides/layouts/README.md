# 🎨 Slide Layout Templates

This directory contains **reusable layout templates** that can be used to create slides with different content. Each layout is designed to handle specific slide patterns while being completely customizable through data parameters.

## 📁 Layout Types

### 1. HeroIntroLayout
**For:** Introduction slides with problem/solution and framework explanation
**Features:** Animated hero title, problem/solution cards, framework components
**Use Cases:** SPEIntroSlide, SPEAchievementSlide

### 2. AudienceValuePropLayout
**For:** Target audience value proposition slides
**Features:** 3-step workflow, benefits metrics, quote section
**Use Cases:** SPEForCliniciansSlide, SPEForBiotechsSlide

### 3. CaseStudyLayout
**For:** Case study slides with JSON output and explanations
**Features:** Component showcase, JSON display, explanation sections
**Use Cases:** SPEMultipleMyelomaSlide, SPEOvarianCancerSlide, SPEMelanomaSlide

### 4. FrameworkExplanationLayout
**For:** Technical framework explanation slides
**Features:** Animated component cards, clinical examples
**Use Cases:** SPEFrameworkSlide

### 5. EvidencePrinciplesLayout
**For:** Evidence doctrine and principles slides
**Features:** Multi-column principle cards, metrics display
**Use Cases:** SPEEvidenceDoctrineSlide

### 6. ProcessPipelineLayout
**For:** Process and pipeline visualization slides
**Features:** Step-by-step workflows, results display
**Use Cases:** SPEChemotherapySlide, SPEPredictionPipelineSlide

### 7. DifferentiatorsLayout
**For:** Competitive advantage and differentiator slides
**Features:** Metrics showcase, detailed content sections, workflow displays
**Use Cases:** SPEDifferentiatorsSlide

## 🚀 Usage Pattern

```typescript
import { HeroIntroLayout } from './layouts/HeroIntroLayout';
import { heroIntroData } from '../data/SPEIntroData';

const SPEIntroSlide = () => (
  <HeroIntroLayout data={heroIntroData} />
);
```

## 🎯 Benefits

- **🔄 Reusability:** Same layout for multiple slides with different content
- **📝 Separation:** Content and presentation are completely separate
- **🛠️ Maintainability:** Update layouts without touching content
- **📊 Flexibility:** Easy to create new slides by combining existing layouts with new data
- **🎨 Consistency:** All slides using the same layout maintain identical styling and animations


