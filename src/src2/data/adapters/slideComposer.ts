// Slide Composer - Pick and Choose from Modular Decks
// This enables dynamic deck composition from our modular architecture

import businessSlidesData from '../decks/101-business';
import researchSlidesData from '../decks/101-research';  
import technicalSlidesData from '../decks/101-technical';
import oracleShowcaseSlides from '../decks/oracle-showcase';
import forgeShowcaseSlides from '../decks/forge-showcase';
import boltzShowcaseSlides from '../decks/boltz-showcase';
import speFrameworkShowcaseSlides from '../decks/spe-framework-showcase';
import businessShowcaseSlides from '../decks/business-showcase';
import multipleMyelomaSlides from '../decks/use-cases/multiple-myeloma';
import hereditaryBreastCancerSlides from '../decks/use-cases/hereditary-breast-cancer';
import crisprTherapyDesignSlides from '../decks/use-cases/crispr-therapy-design';

// Available slide sources
export const SLIDE_SOURCES = {
  'business': businessSlidesData,
  'research': researchSlidesData,
  'technical': technicalSlidesData,
  'oracle-showcase': oracleShowcaseSlides,
  'forge-showcase': forgeShowcaseSlides,
  'boltz-showcase': boltzShowcaseSlides,
  'spe-framework-showcase': speFrameworkShowcaseSlides,
  'business-showcase': businessShowcaseSlides,
  'multiple-myeloma': multipleMyelomaSlides,
  'hereditary-breast-cancer': hereditaryBreastCancerSlides,
  'crispr-therapy-design': crisprTherapyDesignSlides
};

// Slide selection interface
export interface SlideSelection {
  source: keyof typeof SLIDE_SOURCES;
  slideIndex: number;
  title?: string; // Optional override title
}

// Compose a custom deck from selections
export const composeCustomDeck = (selections: SlideSelection[]) => {
  return selections.map(selection => {
    const sourceSlides = SLIDE_SOURCES[selection.source];
    const slide = sourceSlides[selection.slideIndex];
    
    if (!slide) {
      console.warn(`Slide ${selection.slideIndex} not found in ${selection.source}`);
      return null;
    }
    
    // Optional title override
    if (selection.title) {
      return { ...slide, title: selection.title };
    }
    
    return slide;
  }).filter(Boolean);
};

// Predefined deck compositions
export const PREDEFINED_COMPOSITIONS = {
  'quick-demo': [
    { source: 'business' as const, slideIndex: 0 }, // Business title
    { source: 'business' as const, slideIndex: 1 }, // $2.8B Crisis
    { source: 'research' as const, slideIndex: 2 }, // Oracle in action
    { source: 'technical' as const, slideIndex: 6 }, // Forge design
    { source: 'business' as const, slideIndex: 3 }  // Qualcomm model
  ],
  
  'investor-pitch': [
    { source: 'business' as const, slideIndex: 0 }, // Business title
    { source: 'business' as const, slideIndex: 1 }, // Crisis
    { source: 'business' as const, slideIndex: 3 }, // Qualcomm model
    { source: 'research' as const, slideIndex: 3 }, // Oracle validation
    { source: 'business' as const, slideIndex: 4 }, // Forge engine
    { source: 'business' as const, slideIndex: 6 }  // Competitive advantage
  ],
  
  'scientific-validation': [
    { source: 'research' as const, slideIndex: 0 }, // Research title
    { source: 'research' as const, slideIndex: 3 }, // Oracle validation
    { source: 'research' as const, slideIndex: 4 }, // Multi-modal capabilities
    { source: 'research' as const, slideIndex: 7 }, // Explainable AI
    { source: 'multiple-myeloma' as const, slideIndex: 4 }, // MM validation
    { source: 'hereditary-breast-cancer' as const, slideIndex: 8 } // Evidence doctrine
  ],
  
  'use-case-showcase': [
    { source: 'research' as const, slideIndex: 0 }, // Title
    { source: 'multiple-myeloma' as const, slideIndex: 0 }, // MM title
    { source: 'multiple-myeloma' as const, slideIndex: 3 }, // MM Oracle analysis
    { source: 'hereditary-breast-cancer' as const, slideIndex: 0 }, // HBC title
    { source: 'hereditary-breast-cancer' as const, slideIndex: 3 }, // HBC Oracle analysis
    { source: 'crispr-therapy-design' as const, slideIndex: 0 }, // CRISPR title
    { source: 'crispr-therapy-design' as const, slideIndex: 5 }  // CRISPR Forge design
  ],

  'oracle-demo': [
    { source: 'oracle-showcase' as const, slideIndex: 0 }, // Oracle title
    { source: 'oracle-showcase' as const, slideIndex: 2 }, // VUS resolution demo
    { source: 'oracle-showcase' as const, slideIndex: 4 }, // Validated performance
    { source: 'oracle-showcase' as const, slideIndex: 8 }  // Competitive advantage
  ],

  'forge-demo': [
    { source: 'forge-showcase' as const, slideIndex: 0 }, // Forge title
    { source: 'forge-showcase' as const, slideIndex: 2 }, // AI-powered generation
    { source: 'forge-showcase' as const, slideIndex: 4 }, // Multi-modal therapeutics
    { source: 'forge-showcase' as const, slideIndex: 8 }  // Competitive advantage
  ],

  'boltz-demo': [
    { source: 'boltz-showcase' as const, slideIndex: 0 }, // Boltz title
    { source: 'boltz-showcase' as const, slideIndex: 2 }, // Structural validation
    { source: 'boltz-showcase' as const, slideIndex: 4 }, // Validation pipeline
    { source: 'boltz-showcase' as const, slideIndex: 8 }  // Competitive advantage
  ],

  'spe-demo': [
    { source: 'spe-framework-showcase' as const, slideIndex: 0 }, // SPE title
    { source: 'spe-framework-showcase' as const, slideIndex: 3 }, // SPE framework
    { source: 'spe-framework-showcase' as const, slideIndex: 4 }, // Achievements
    { source: 'spe-framework-showcase' as const, slideIndex: 11 } // Evidence doctrine
  ],

  'business-demo': [
    { source: 'business-showcase' as const, slideIndex: 0 }, // Business title
    { source: 'business-showcase' as const, slideIndex: 2 }, // Market opportunity
    { source: 'business-showcase' as const, slideIndex: 3 }, // Business transformation
    { source: 'business-showcase' as const, slideIndex: 9 }  // Investment opportunity
  ],

  'complete-showcase': [
    { source: 'oracle-showcase' as const, slideIndex: 0 }, // Oracle title
    { source: 'oracle-showcase' as const, slideIndex: 2 }, // Oracle demo
    { source: 'forge-showcase' as const, slideIndex: 0 }, // Forge title
    { source: 'forge-showcase' as const, slideIndex: 2 }, // Forge demo
    { source: 'boltz-showcase' as const, slideIndex: 0 }, // Boltz title
    { source: 'boltz-showcase' as const, slideIndex: 2 }, // Boltz demo
    { source: 'spe-framework-showcase' as const, slideIndex: 0 }, // SPE title
    { source: 'spe-framework-showcase' as const, slideIndex: 3 }  // SPE framework
  ]
};

// Get slide metadata for frontend
export const getSlideMetadata = (source: keyof typeof SLIDE_SOURCES) => {
  const slides = SLIDE_SOURCES[source];
  return slides.map((slide, index) => ({
    index,
    title: slide.title,
    subtitle: slide.subtitle,
    source,
    notes: slide.notes || ''
  }));
};

// Get all available slides with metadata
export const getAllSlidesMetadata = () => {
  const allSlides: Array<{
    source: keyof typeof SLIDE_SOURCES;
    index: number;
    title: string;
    subtitle?: string;
    notes: string;
    id: string;
  }> = [];
  
  for (const [source, slides] of Object.entries(SLIDE_SOURCES)) {
    slides.forEach((slide, index) => {
      allSlides.push({
        source: source as keyof typeof SLIDE_SOURCES,
        index,
        title: slide.title,
        subtitle: slide.subtitle,
        notes: slide.notes || '',
        id: `${source}-${index}`
      });
    });
  }
  
  return allSlides;
};

// Compose deck by name
export const getComposedDeck = (compositionName: keyof typeof PREDEFINED_COMPOSITIONS) => {
  const composition = PREDEFINED_COMPOSITIONS[compositionName];
  if (!composition) {
    throw new Error(`Composition ${compositionName} not found`);
  }
  
  return composeCustomDeck(composition);
};

// Export for easy access
export { businessSlidesData, researchSlidesData, technicalSlidesData };
