import { createGeneticTherapyDeck, type GeneticTherapyConfig } from '../data/templates/geneticTherapyTemplate.js';

/**
 * Demonstrates how easy it is to create a new genetic therapy presentation
 * Just change a few parameters and get a complete, professional presentation!
 */

// Example: Create a TP53 presentation in seconds
export const createTP53Presentation = () => {
  const tp53Config: GeneticTherapyConfig = {
    gene: 'TP53',
    disease: 'Various Cancers',
    company: 'CrisPRO.ai',
    presenter: 'Dr. Sarah Chen',
    targetScore: '-31,245.7',
    futureThreats: [
      { gene: 'MDM2', riskScore: '-18k', severity: 'high' },
      { gene: 'CDKN2A', riskScore: '-14k', severity: 'high' },
      { gene: 'RB1', riskScore: '-12k', severity: 'medium' }
    ],
    therapeuticAdvantages: [
      'p53 pathway restoration strategies',
      'MDM2 inhibitor optimization',
      'Cell cycle checkpoint targeting',
      'Apoptosis pathway enhancement'
    ],
    competitorLimitations: [
      'Limited p53 pathway understanding',
      'Generic MDM2 inhibitor approaches',
      'High toxicity profiles',
      'Poor patient stratification'
    ],
    keyMetrics: [
      { label: 'Pathway Restoration', value: '92%', status: 'good' },
      { label: 'Toxicity Reduction', value: '75%', status: 'good' },
      { label: 'Patient Response', value: '68%', status: 'good' },
      { label: 'Development Cost', value: '-85%', status: 'good' }
    ]
  };

  return createGeneticTherapyDeck(tp53Config);
};

// Example: Create an EGFR presentation for lung cancer
export const createEGFRPresentation = () => {
  const egfrConfig: GeneticTherapyConfig = {
    gene: 'EGFR',
    disease: 'Lung Cancer',
    company: 'CrisPRO.ai',
    presenter: 'Dr. Michael Zhang',
    targetScore: '-22,890.4',
    futureThreats: [
      { gene: 'KRAS', riskScore: '-19k', severity: 'high' },
      { gene: 'ALK', riskScore: '-16k', severity: 'high' },
      { gene: 'MET', riskScore: '-13k', severity: 'medium' }
    ],
    therapeuticAdvantages: [
      'Resistance mutation prediction',
      'Personalized TKI selection',
      'Combination therapy optimization',
      'Real-time monitoring protocols'
    ],
    competitorLimitations: [
      'Static treatment protocols',
      'Limited resistance tracking',
      'One-size-fits-all TKIs',
      'Reactive treatment adjustments'
    ],
    keyMetrics: [
      { label: 'Resistance Prevention', value: '89%', status: 'good' },
      { label: 'Progression-Free Survival', value: '+45%', status: 'good' },
      { label: 'Quality of Life', value: '+60%', status: 'good' },
      { label: 'Treatment Cost', value: '-70%', status: 'good' }
    ]
  };

  return createGeneticTherapyDeck(egfrConfig);
};

// Demo function: Create any gene presentation with minimal input
export const createCustomGenePresentation = (
  gene: string,
  disease: string,
  presenter: string = 'CrisPRO.ai Team'
) => {
  const customConfig: GeneticTherapyConfig = {
    gene,
    disease,
    company: 'CrisPRO.ai',
    presenter,
    targetScore: `-${(Math.random() * 30000 + 10000).toFixed(1)}`,
    futureThreats: [
      { gene: 'Gene_A', riskScore: `-${(Math.random() * 10 + 15).toFixed(0)}k`, severity: 'high' },
      { gene: 'Gene_B', riskScore: `-${(Math.random() * 10 + 10).toFixed(0)}k`, severity: 'high' },
      { gene: 'Gene_C', riskScore: `-${(Math.random() * 10 + 8).toFixed(0)}k`, severity: 'medium' }
    ],
    therapeuticAdvantages: [
      `Advanced ${gene} pathway modeling`,
      'AI-powered drug design',
      'Precision targeting strategies',
      'Integrated biomarker analysis'
    ],
    competitorLimitations: [
      'Limited pathway understanding',
      'Generic treatment approaches',
      'High development costs',
      'Poor predictive accuracy'
    ],
    keyMetrics: [
      { label: 'Target Engagement', value: `${(Math.random() * 20 + 80).toFixed(0)}%`, status: 'good' },
      { label: 'Development Time', value: `${(Math.random() * 10 + 2).toFixed(0)} weeks`, status: 'good' },
      { label: 'Cost Reduction', value: `${(Math.random() * 30 + 70).toFixed(0)}%`, status: 'good' },
      { label: 'Success Rate', value: `${(Math.random() * 20 + 80).toFixed(0)}%`, status: 'good' }
    ]
  };

  return createGeneticTherapyDeck(customConfig);
};

/**
 * Usage Examples:
 * 
 * // Create a TP53 presentation
 * const tp53Deck = createTP53Presentation();
 * 
 * // Create an EGFR presentation  
 * const egfrDeck = createEGFRPresentation();
 * 
 * // Create any custom presentation
 * const myDeck = createCustomGenePresentation('BRAF', 'Melanoma', 'Dr. Johnson');
 * 
 * // That's it! You now have a complete, professional presentation
 * // with proper theming, animations, and data visualization
 */ 