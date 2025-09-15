// Super simple custom deck system
import type { SlideDeck } from '../types/slides';

// Import your custom components here
import RUNX1Component from './decks/runx1';
import crisPRO101 from './decks/101';
import ZetaShieldSecurity from './decks/security';
import SPEPresentation from './decks/spe-proper';

// Import new showcase decks
import oracleShowcaseSlides from './decks/oracle-showcase';
import forgeShowcaseSlides from './decks/forge-showcase';
import boltzShowcaseSlides from './decks/boltz-showcase';
import speFrameworkShowcaseSlides from './decks/spe-framework-showcase';
import businessShowcaseSlides from './decks/business-showcase';

// Import Multiple Myeloma use case decks
import MultipleMyelomaComponentDriven from './decks/use-cases/multiple-myeloma-component-driven';

// Import Hereditary Breast Cancer use case deck
import HereditaryBreastCancerComponentDriven from './decks/use-cases/hereditary-breast-cancer-component-driven';

// Import other use case decks
import ChemotherapyDrugFit from './decks/use-cases/chemotherapy-drug-fit';
import OvarianCancer from './decks/use-cases/ovarian-cancer';
import CRISPRTherapyDesign from './decks/use-cases/crispr-therapy-design';

// Import Scalable Template Decks
// import MultipleMyelomaScalable from './decks/use-cases/multiple-myeloma-scalable.tsx';
// import BreastCancerScalable from './decks/use-cases/breast-cancer-scalable.tsx';
import TestScalable from './decks/use-cases/test-scalable';

// Helper function to create a deck from a source ({ component } | { importer })
export const createCustomDeck = (
  id: string,
  title: string,
  description: string,
  source: { component?: any; importer?: () => Promise<{ default: React.ComponentType<any> } | any> },
  author = 'Unknown',
  category = 'research',
  thumbnail?: string,
  blurb?: string
): SlideDeck => ({
  id,
  title,
  description,
  category,
  thumbnail, // This shows as the preview image on the deck card
  tags: ['custom'],
  createdAt: new Date().toISOString().split('T')[0],
  updatedAt: new Date().toISOString().split('T')[0],
  metadata: { 
    author, 
    template: 'custom', 
    confidentiality: 'internal',
    blurb // Add the blurb to metadata
  },
  slides: [{
    id: `${id}-slides`,
    title,
    content: [{
      type: 'custom-react',
      data: source.importer ? { importer: source.importer } : { component: source.component },
      layout: 'full'
    }]
  }]
});

// Helper function to create a deck from slide array
export const createSlideDeck = (
  id: string,
  title: string,
  description: string,
  slides: any[],
  author = 'Unknown',
  category = 'research',
  thumbnail?: string,
  blurb?: string
): SlideDeck => ({
  id,
  title,
  description,
  category,
  thumbnail,
  tags: ['showcase'],
  createdAt: new Date().toISOString().split('T')[0],
  updatedAt: new Date().toISOString().split('T')[0],
  metadata: { 
    author, 
    template: 'showcase', 
    confidentiality: 'internal',
    blurb
  },
  slides: slides.map((slide, index) => ({
    id: `${id}-slide-${index}`,
    title: slide.title,
    subtitle: slide.subtitle,
    content: [slide.content],
    backgroundClass: slide.backgroundClass,
    titleClassName: slide.titleClassName,
    notes: slide.notes
  }))
});

// Your custom decks
export const customDecks: SlideDeck[] = [
  // Your RUNX1 deck - eager import to avoid hook context issues
  createCustomDeck(
    'runx1-original',
    'The RUNX1 Conquest (Original)',
    'How Our Agentic Platform Solved a Multi-Year Leukemia Grant In Silico',
    { component: RUNX1Component },
    'Fahad Kiani',
    'product', // Category - thumbnail auto-generated from first slide
    undefined,
    `A documented case study of automating RUNX1 variant interpretation and therapeutic design. .`
  ),
  
  // Your CrisPRO 101 deck (eager, small)
  createCustomDeck(
    'crispro-101',
    'CrisPRO 101',
    'Introduction to CrisPRO platform and capabilities',
    { component: crisPRO101 },
    'Fahad Kiani',
    'product', // Category - thumbnail auto-generated from first slide
    undefined,
    `An overview of CrisPRO’s agentic  engines (Oracle, Forge, Boltz), and how they work together to solve `
  ),

  // Zeta Shield Security Presentation - eager import to avoid hook context issues
  createCustomDeck(
    'zeta-shield-security',
    'Zeta Shield: Security Operating System',
    'Comprehensive security architecture for AI-driven R&D - featuring agent monitoring, threat detection, compliance, and verifiable access control',
    { component: ZetaShieldSecurity },
    'Fahad Kiani',
    'product', // Category - security and product showcase
    undefined, // thumbnail
    `Protecting digital blueprint for a multi-billion dollar cure, which can be contained in a few kilobytes of sequence data.

`
  ),

  // SPE Framework Presentation - S/P/E Framework for precision medicine guidance
  createSlideDeck(
    'spe-framework',
    'S/P/E Framework: Precision Medicine Guidance',
    'The S/P/E Framework for transparent, evidence-backed clinical decision making in precision medicine',
    SPEPresentation,
    'Fahad Kiani',
    'research', // Category - research and methodology
    undefined, // thumbnail
    `Comprehensive framework for transforming research data into confident clinical guidance through Sequence, Pathway, and External Evidence analysis.`
  ),

  // New Showcase Decks
  createSlideDeck(
    'oracle-showcase',
    'Oracle: Discriminative AI Engine',
    'Transforming Genetic Uncertainty into Actionable Intelligence',
    oracleShowcaseSlides,
    'CrisPRO.ai Team',
    'product',
    undefined,
    'Showcase of Oracle\'s VUS resolution capabilities with validated performance metrics and transparent methodology.'
  ),

  createSlideDeck(
    'forge-showcase',
    'Forge: Generative AI Engine',
    'Engineering Multi-Modal Therapeutic Solutions',
    forgeShowcaseSlides,
    'CrisPRO.ai Team',
    'product',
    undefined,
    'Showcase of Forge\'s therapeutic generation capabilities with 1M token context and quality control metrics.'
  ),

  createSlideDeck(
    'boltz-showcase',
    'Boltz: Structural Validation Engine',
    '3D Structure Prediction & Interaction Validation (Roadmap)',
    boltzShowcaseSlides,
    'CrisPRO.ai Team',
    'product',
    undefined,
    'Showcase of Boltz\'s structural validation capabilities with AlphaFold 3 integration and validation pipeline.'
  ),

  createSlideDeck(
    'spe-framework-showcase',
    'SPE Framework: Scientific Performance Evidence',
    'Transforming AI Predictions into Research-Grade Evidence',
    speFrameworkShowcaseSlides,
    'CrisPRO.ai Team',
    'research',
    undefined,
    'Comprehensive showcase of the SPE framework for evidence-based AI predictions with transparent methodology.'
  ),

  createSlideDeck(
    'business-showcase',
    'CrisPRO.ai: Business Opportunity',
    'Transforming Therapeutic R&D with AI-Powered Precision',
    businessShowcaseSlides,
    'CrisPRO.ai Team',
    'marketing',
    undefined,
    'Business opportunity and ROI showcase with market analysis, revenue model, and competitive advantages.'
  ),

  // Multiple Myeloma Use Case - Component-Driven Architecture (FINAL DRY VERSION)
  createCustomDeck(
    'multiple-myeloma',
    'Multiple Myeloma: In-Silico Co-Pilot',
    'Component-driven presentation with zero hard-coded content and maximum reusability',
    { component: MultipleMyelomaComponentDriven },
    'CrisPRO.ai Team',
    'research',
    undefined,
    'FINAL DRY Multiple Myeloma deck with component-driven architecture. Features reusable Two-Hit Hypothesis, Oracle VUS resolution, Forge WIWFM ranking, and live JSON output. Based on validated mmdeck.md content with 95.7% ClinVar AUROC, 73% VUS resolution, and transparent research methodology.'
  ),


  // Scalable Template Decks - Data-Driven Architecture (Temporarily disabled for testing)
  // createCustomDeck(
  //   'multiple-myeloma-scalable',
  //   'Multiple Myeloma: Scalable Template',
  //   'Data-driven Multiple Myeloma deck built with reusable templates - no hard-coded content',
  //   { component: MultipleMyelomaScalable },
  //   'CrisPRO.ai Team',
  //   'research',
  //   undefined,
  //   'Scalable Multiple Myeloma deck demonstrating the new template-based architecture. All content is data-driven from configuration files, making it easy to create new use cases by simply changing the content configuration.'
  // ),

  // createCustomDeck(
  //   'breast-cancer-scalable',
  //   'Hereditary Breast Cancer: Scalable Template',
  //   'Data-driven Breast Cancer deck built with reusable templates - demonstrates scalability',
  //   { component: BreastCancerScalable },
  //   'CrisPRO.ai Team',
  //   'research',
  //   undefined,
  //   'Scalable Breast Cancer deck demonstrating how the same templates can be reused for different use cases. Shows the power of the new data-driven architecture for rapid deck creation.'
  // ),

  // Hereditary Breast Cancer Use Case - Component-Driven Architecture
  createCustomDeck(
    'hereditary-breast-cancer',
    'Hereditary Breast Cancer: In-Silico Co-Pilot',
    'BRCA1/2 variant analysis and precision prevention strategies',
    { component: HereditaryBreastCancerComponentDriven },
    'CrisPRO.ai Team',
    'research',
    undefined,
    'Component-driven hereditary breast cancer deck with zero hard-coded content. Features reusable Two-Hit Hypothesis component (extracted from runx1.tsx), sophisticated Oracle VUS resolution, Forge therapeutic design, and clinical impact analysis. Demonstrates true DRY principles and component reusability.'
  ),

  // Chemotherapy Drug Fit Use Case
  createSlideDeck(
    'chemotherapy-drug-fit',
    'Chemotherapy Drug Fit: In-Silico Co-Pilot',
    'Personalized chemotherapy selection and drug response prediction',
    ChemotherapyDrugFit,
    'CrisPRO.ai Team',
    'research',
    undefined,
    'Chemotherapy drug fit use case demonstrating personalized drug selection, response prediction, and resistance analysis using Oracle and Forge capabilities.'
  ),

  // Ovarian Cancer Use Case
  createSlideDeck(
    'ovarian-cancer',
    'Ovarian Cancer: In-Silico Co-Pilot',
    'Ovarian cancer variant analysis and therapeutic strategies',
    OvarianCancer,
    'CrisPRO.ai Team',
    'research',
    undefined,
    'Ovarian cancer use case focusing on variant analysis, pathway disruption, and therapeutic strategy development using CrisPRO.ai capabilities.'
  ),

  // CRISPR Therapy Design Use Case
  createSlideDeck(
    'crispr-therapy-design',
    'CRISPR Therapy Design: In-Silico Co-Pilot',
    'CRISPR guide design and therapeutic gene editing strategies',
    CRISPRTherapyDesign,
    'CrisPRO.ai Team',
    'research',
    undefined,
    'CRISPR therapy design use case demonstrating guide RNA design, off-target prediction, and therapeutic gene editing strategies using Oracle and Forge capabilities.'
  ),

  // Test Scalable Deck
  createCustomDeck(
    'test-scalable',
    'Test Scalable Deck',
    'Simple test deck to verify the scalable architecture works',
    { component: TestScalable },
    'CrisPRO.ai Team',
    'research',
    undefined,
    'Simple test deck to verify that the new scalable architecture is working correctly.'
  ),
]; 