/**
 * Mix-and-Match Slide Library
 * 
 * This library contains the most beautiful, sophisticated slides from our existing decks
 * that can be mixed and matched to create custom presentations.
 * 
 * Focus: Beautiful content with animations, not basic array-based slides
 */

import React from 'react';

// Import sophisticated slide components from existing decks
import SPEIntroSlide from '../../components/deck/slides/SPE/SPE/SPEIntroSlide';
import SPEFrameworkSlide from '../../components/deck/slides/SPE/SPE/SPEFrameworkSlide';
import SPEFrameworkSlideRefactored from '../../components/deck/slides/SPE/SPE/SPEFrameworkSlideRefactored';
import SPEAchievementSlide from '../../components/deck/slides/SPE/SPE/SPEAchievementSlide';
import SPEForCliniciansSlide from '../../components/deck/slides/SPE/SPE/SPEForCliniciansSlide';
import SPEChemotherapySlidePart1 from '../../components/deck/slides/SPE/SPE/SPEChemotherapySlidePart1';
import SPEChemotherapySlidePart2 from '../../components/deck/slides/SPE/SPE/SPEChemotherapySlidePart2';
import SPEMultipleMyelomaSlide from '../../components/deck/slides/SPE/SPE/SPEMultipleMyelomaSlide';
import SPEMelanomaSlide from '../../components/deck/slides/SPE/SPE/SPEMelanomaSlide';
import SPEEvidenceDoctrineSlide from '../../components/deck/slides/SPE/SPE/SPEEvidenceDoctrineSlide';
import SPEPredictionPipelineSlide from '../../components/deck/slides/SPE/SPE/SPEPredictionPipelineSlide';

// Import sophisticated components from our component factory
import { createComponentDrivenSlides } from './componentSlideFactory';
import { hereditaryBreastCancerDeckConfig } from '../contentConfigs/hereditaryBreastCancerConfig';
import { multipleMyelomaComponentDeckConfig } from '../contentConfigs/multipleMyelomaComponentConfig';

// Import sophisticated site blocks
import ZetaOracleInAction from '../../components/deck/slides/ZetaOracleInAction';
import ZetaForgeTwoColumn from '../../components/deck/slides/ZetaForgeTwoColumn';
import StructuralGauntlet from '../../components/deck/slides/StructuralGauntlet';

// ===== SLIDE CATEGORIES =====

export interface BeautifulSlide {
  id: string;
  name: string;
  description: string;
  category: 'intro' | 'framework' | 'performance' | 'use-case' | 'evidence' | 'clinical' | 'component';
  component: React.ComponentType<any>;
  tags: string[];
  source: 'SPE' | 'RUNX1' | 'COMPONENT_FACTORY' | 'SITE_BLOCKS';
  complexity: 'simple' | 'medium' | 'complex';
  animations: boolean;
  dataDriven: boolean;
}

// ===== SPE FRAMEWORK SLIDES (Most Beautiful) =====

export const speFrameworkSlides: BeautifulSlide[] = [
  {
    id: 'spe-intro',
    name: 'SPE Framework Introduction',
    description: 'Beautiful animated intro with gradient text and professional layout',
    category: 'intro',
    component: SPEIntroSlide,
    tags: ['intro', 'framework', 'animated', 'gradient'],
    source: 'SPE',
    complexity: 'medium',
    animations: true,
    dataDriven: false
  },
  {
    id: 'spe-framework',
    name: 'SPE Framework Components',
    description: 'Sophisticated 3-component framework with hover animations and professional styling',
    category: 'framework',
    component: SPEFrameworkSlide,
    tags: ['framework', 'components', 'animated', 'professional'],
    source: 'SPE',
    complexity: 'complex',
    animations: true,
    dataDriven: false
  },
  {
    id: 'spe-framework-refactored',
    name: 'SPE Framework (Refactored)',
    description: 'Clean, modern framework explanation with consistent animations',
    category: 'framework',
    component: SPEFrameworkSlideRefactored,
    tags: ['framework', 'refactored', 'clean', 'modern'],
    source: 'SPE',
    complexity: 'medium',
    animations: true,
    dataDriven: false
  },
  {
    id: 'spe-achievement',
    name: 'SPE Achievements',
    description: 'Performance metrics with beautiful animations and professional layout',
    category: 'performance',
    component: SPEAchievementSlide,
    tags: ['performance', 'metrics', 'achievements', 'animated'],
    source: 'SPE',
    complexity: 'medium',
    animations: true,
    dataDriven: false
  },
  {
    id: 'spe-evidence-doctrine',
    name: 'SPE Evidence Doctrine',
    description: 'Transparency and methodology with professional styling',
    category: 'evidence',
    component: SPEEvidenceDoctrineSlide,
    tags: ['evidence', 'transparency', 'methodology', 'professional'],
    source: 'SPE',
    complexity: 'medium',
    animations: true,
    dataDriven: false
  }
];

// ===== CLINICAL & USE CASE SLIDES =====

export const clinicalUseCaseSlides: BeautifulSlide[] = [
  {
    id: 'spe-for-clinicians',
    name: 'SPE for Clinicians',
    description: 'Clinical workflow with beautiful animations and professional layout',
    category: 'clinical',
    component: SPEForCliniciansSlide,
    tags: ['clinical', 'workflow', 'animated', 'professional'],
    source: 'SPE',
    complexity: 'complex',
    animations: true,
    dataDriven: false
  },
  {
    id: 'spe-chemotherapy-part1',
    name: 'SPE Chemotherapy (Part 1)',
    description: 'Before/after comparison with sophisticated animations and professional styling',
    category: 'use-case',
    component: SPEChemotherapySlidePart1,
    tags: ['chemotherapy', 'comparison', 'animated', 'professional'],
    source: 'SPE',
    complexity: 'complex',
    animations: true,
    dataDriven: false
  },
  {
    id: 'spe-chemotherapy-part2',
    name: 'SPE Chemotherapy (Part 2)',
    description: 'Detailed analysis with beautiful animations and professional layout',
    category: 'use-case',
    component: SPEChemotherapySlidePart2,
    tags: ['chemotherapy', 'analysis', 'animated', 'detailed'],
    source: 'SPE',
    complexity: 'complex',
    animations: true,
    dataDriven: false
  },
  {
    id: 'spe-multiple-myeloma',
    name: 'SPE Multiple Myeloma',
    description: 'MM use case with sophisticated animations and professional styling',
    category: 'use-case',
    component: SPEMultipleMyelomaSlide,
    tags: ['multiple-myeloma', 'use-case', 'animated', 'professional'],
    source: 'SPE',
    complexity: 'complex',
    animations: true,
    dataDriven: false
  },
  {
    id: 'spe-melanoma',
    name: 'SPE Melanoma',
    description: 'Melanoma use case with beautiful animations and professional layout',
    category: 'use-case',
    component: SPEMelanomaSlide,
    tags: ['melanoma', 'use-case', 'animated', 'professional'],
    source: 'SPE',
    complexity: 'complex',
    animations: true,
    dataDriven: false
  },
  {
    id: 'spe-prediction-pipeline',
    name: 'SPE Prediction Pipeline',
    description: 'Process pipeline with sophisticated animations and professional styling',
    category: 'framework',
    component: SPEPredictionPipelineSlide,
    tags: ['pipeline', 'process', 'animated', 'professional'],
    source: 'SPE',
    complexity: 'complex',
    animations: true,
    dataDriven: false
  }
];

// ===== COMPONENT-DRIVEN SLIDES (Data-Driven & Beautiful) =====

export const componentDrivenSlides: BeautifulSlide[] = [
  {
    id: 'hereditary-breast-cancer-hero',
    name: 'Hereditary Breast Cancer - Hero',
    description: 'Beautiful hero slide with metrics and professional animations',
    category: 'intro',
    component: () => {
      const slides = createComponentDrivenSlides(hereditaryBreastCancerDeckConfig);
      return slides[0] ? React.createElement(slides[0]) : null;
    },
    tags: ['hero', 'breast-cancer', 'metrics', 'animated'],
    source: 'COMPONENT_FACTORY',
    complexity: 'medium',
    animations: true,
    dataDriven: true
  },
  {
    id: 'hereditary-breast-cancer-two-hit',
    name: 'Hereditary Breast Cancer - Two-Hit Hypothesis',
    description: 'Sophisticated Two-Hit Hypothesis with professional animations',
    category: 'framework',
    component: () => {
      const slides = createComponentDrivenSlides(hereditaryBreastCancerDeckConfig);
      return slides[1] ? React.createElement(slides[1]) : null;
    },
    tags: ['two-hit-hypothesis', 'breast-cancer', 'animated', 'professional'],
    source: 'COMPONENT_FACTORY',
    complexity: 'complex',
    animations: true,
    dataDriven: true
  },
  {
    id: 'hereditary-breast-cancer-oracle',
    name: 'Hereditary Breast Cancer - Oracle VUS',
    description: 'Oracle VUS resolution with ZetaOracleInAction component',
    category: 'component',
    component: () => {
      const slides = createComponentDrivenSlides(hereditaryBreastCancerDeckConfig);
      return slides[2] ? React.createElement(slides[2]) : null;
    },
    tags: ['oracle', 'vus-resolution', 'animated', 'professional'],
    source: 'COMPONENT_FACTORY',
    complexity: 'complex',
    animations: true,
    dataDriven: true
  },
  {
    id: 'hereditary-breast-cancer-forge',
    name: 'Hereditary Breast Cancer - Forge Design',
    description: 'Forge therapeutic design with ZetaForgeTwoColumn component',
    category: 'component',
    component: () => {
      const slides = createComponentDrivenSlides(hereditaryBreastCancerDeckConfig);
      return slides[3] ? React.createElement(slides[3]) : null;
    },
    tags: ['forge', 'therapeutic-design', 'animated', 'professional'],
    source: 'COMPONENT_FACTORY',
    complexity: 'complex',
    animations: true,
    dataDriven: true
  },
  {
    id: 'multiple-myeloma-hero',
    name: 'Multiple Myeloma - Hero',
    description: 'Beautiful MM hero slide with validated metrics and animations',
    category: 'intro',
    component: () => {
      const slides = createComponentDrivenSlides(multipleMyelomaComponentDeckConfig);
      return slides[0] ? React.createElement(slides[0]) : null;
    },
    tags: ['hero', 'multiple-myeloma', 'metrics', 'animated'],
    source: 'COMPONENT_FACTORY',
    complexity: 'medium',
    animations: true,
    dataDriven: true
  },
  {
    id: 'multiple-myeloma-two-hit',
    name: 'Multiple Myeloma - Two-Hit Hypothesis',
    description: 'MM Two-Hit Hypothesis with sophisticated animations',
    category: 'framework',
    component: () => {
      const slides = createComponentDrivenSlides(multipleMyelomaComponentDeckConfig);
      return slides[1] ? React.createElement(slides[1]) : null;
    },
    tags: ['two-hit-hypothesis', 'multiple-myeloma', 'animated', 'professional'],
    source: 'COMPONENT_FACTORY',
    complexity: 'complex',
    animations: true,
    dataDriven: true
  },
  {
    id: 'multiple-myeloma-json',
    name: 'Multiple Myeloma - Live JSON Output',
    description: 'Live JSON analysis with highlighted metrics and professional styling',
    category: 'use-case',
    component: () => {
      const slides = createComponentDrivenSlides(multipleMyelomaComponentDeckConfig);
      return slides[4] ? React.createElement(slides[4]) : null;
    },
    tags: ['json-output', 'multiple-myeloma', 'animated', 'professional'],
    source: 'COMPONENT_FACTORY',
    complexity: 'complex',
    animations: true,
    dataDriven: true
  }
];

// ===== SITE BLOCK COMPONENTS (Reusable & Beautiful) =====

export const siteBlockSlides: BeautifulSlide[] = [
  {
    id: 'zeta-oracle-in-action',
    name: 'Zeta Oracle in Action',
    description: 'VUS resolution demonstration with before/after comparison',
    category: 'component',
    component: () => React.createElement(ZetaOracleInAction, {
      left: { title: "Traditional", value: "VUS", subtitle: "Variant of Uncertain Significance" },
      right: { title: "CrisPRO Oracle", value: "PATHOGENIC", subtitle: "High-confidence classification" },
      score: { title: "Zeta Score", value: "-26.8" }
    }),
    tags: ['oracle', 'vus-resolution', 'comparison', 'professional'],
    source: 'SITE_BLOCKS',
    complexity: 'medium',
    animations: true,
    dataDriven: true
  },
  {
    id: 'zeta-forge-two-column',
    name: 'Zeta Forge Two Column',
    description: 'Therapeutic design showcase with professional layout',
    category: 'component',
    component: () => React.createElement(ZetaForgeTwoColumn, {
      column1: {
        input: "Validated Target",
        mission: "Generate Therapeutic Strategy",
        assets: [
          { icon: () => React.createElement('div', {}, '🧬'), label: "CRISPR Design" },
          { icon: () => React.createElement('div', {}, '🛡️'), label: "Safety Analysis" },
          { icon: () => React.createElement('div', {}, '🎯'), label: "Targeting" }
        ]
      },
      column2: {
        title: "Our Advantage:",
        highlight: "1M Token Context",
        description: "Complete genomic neighborhood analysis",
        infoHeader: "Research Use Only",
        infoText: "For research purposes only"
      }
    }),
    tags: ['forge', 'therapeutic-design', 'two-column', 'professional'],
    source: 'SITE_BLOCKS',
    complexity: 'medium',
    animations: true,
    dataDriven: true
  },
  {
    id: 'structural-gauntlet',
    name: 'Structural Gauntlet',
    description: '3D structural validation with professional animations',
    category: 'component',
    component: StructuralGauntlet,
    tags: ['structural', '3d', 'validation', 'animated'],
    source: 'SITE_BLOCKS',
    complexity: 'complex',
    animations: true,
    dataDriven: false
  }
];

// ===== COMPLETE SLIDE LIBRARY =====

export const beautifulSlideLibrary: BeautifulSlide[] = [
  ...speFrameworkSlides,
  ...clinicalUseCaseSlides,
  ...componentDrivenSlides,
  ...siteBlockSlides
];

// ===== UTILITY FUNCTIONS =====

export const getSlidesByCategory = (category: BeautifulSlide['category']): BeautifulSlide[] => {
  return beautifulSlideLibrary.filter(slide => slide.category === category);
};

export const getSlidesBySource = (source: BeautifulSlide['source']): BeautifulSlide[] => {
  return beautifulSlideLibrary.filter(slide => slide.source === source);
};

export const getSlidesByTags = (tags: string[]): BeautifulSlide[] => {
  return beautifulSlideLibrary.filter(slide => 
    tags.some(tag => slide.tags.includes(tag))
  );
};

export const getSlidesByComplexity = (complexity: BeautifulSlide['complexity']): BeautifulSlide[] => {
  return beautifulSlideLibrary.filter(slide => slide.complexity === complexity);
};

export const getAnimatedSlides = (): BeautifulSlide[] => {
  return beautifulSlideLibrary.filter(slide => slide.animations);
};

export const getDataDrivenSlides = (): BeautifulSlide[] => {
  return beautifulSlideLibrary.filter(slide => slide.dataDriven);
};

// ===== SLIDE SELECTION INTERFACE =====

export interface SlideSelection {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  source: string;
  complexity: string;
  animations: boolean;
  dataDriven: boolean;
}

export const createSlideSelection = (slide: BeautifulSlide): SlideSelection => ({
  id: slide.id,
  name: slide.name,
  description: slide.description,
  category: slide.category,
  tags: slide.tags,
  source: slide.source,
  complexity: slide.complexity,
  animations: slide.animations,
  dataDriven: slide.dataDriven
});

// ===== CUSTOM DECK BUILDER =====

export const buildCustomDeck = (selectedSlideIds: string[]): React.ComponentType<any> => {
  const selectedSlides = beautifulSlideLibrary.filter(slide => 
    selectedSlideIds.includes(slide.id)
  );

  return () => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [isPlaying, setIsPlaying] = React.useState(false);

    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % selectedSlides.length);
    };

    const previousSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + selectedSlides.length) % selectedSlides.length);
    };

    const goToSlide = (index: number) => {
      setCurrentSlide(index);
    };

    const togglePlay = () => {
      setIsPlaying(!isPlaying);
    };

    // Auto-play functionality
    React.useEffect(() => {
      if (isPlaying) {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
      }
    }, [isPlaying]);

    const CurrentSlideComponent = selectedSlides[currentSlide]?.component;

    return React.createElement('div', {
      className: "relative w-full h-screen bg-slate-900 overflow-hidden"
    }, [
      // Progress Bar
      React.createElement('div', {
        key: 'progress',
        className: "absolute top-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2"
      }, Array.from({ length: selectedSlides.length }, (_, i) => 
        React.createElement('button', {
          key: i,
          onClick: () => goToSlide(i),
          className: `w-3 h-3 rounded-full transition-all duration-300 ${
            i === currentSlide
              ? 'bg-cyan-400 scale-125 shadow-lg shadow-cyan-400/50'
              : 'bg-slate-600 hover:bg-slate-500'
          }`
        })
      )),

      // Slide Content
      React.createElement('div', {
        key: 'content',
        className: "w-full h-full"
      }, CurrentSlideComponent ? React.createElement(CurrentSlideComponent) : null),

      // Navigation Controls
      React.createElement('div', {
        key: 'nav',
        className: "absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-4"
      }, [
        React.createElement('button', {
          key: 'prev',
          onClick: previousSlide,
          disabled: currentSlide === 0,
          className: "p-3 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-slate-300 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        }, '←'),
        
        React.createElement('button', {
          key: 'play',
          onClick: togglePlay,
          className: "p-3 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-slate-300 hover:text-cyan-400 transition-all duration-300"
        }, isPlaying ? '⏸️' : '▶️'),
        
        React.createElement('button', {
          key: 'next',
          onClick: nextSlide,
          disabled: currentSlide === selectedSlides.length - 1,
          className: "p-3 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-slate-300 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        }, '→')
      ]),

      // Brand
      React.createElement('div', {
        key: 'brand',
        className: "absolute bottom-6 right-6 z-20 text-lg font-semibold text-slate-400/70"
      }, 'CrisPRO.ai 🧬')
    ]);
  };
};
