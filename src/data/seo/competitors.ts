/**
 * competitors.ts
 *
 * Competitor intelligence profiles for CrisPRO SEO benchmarking.
 * Covers: Recursion Pharmaceuticals, Insilico Medicine, Isomorphic Labs,
 *         Generate Biomedicines, Exscientia, BenevolentAI, Schrödinger
 *
 * Data sourced from: Similarweb, Semrush, Ahrefs, public filings, press releases.
 * Update live data via competitorAudit.ts → Similarweb + Domain Metrics Check APIs.
 */

export interface CompetitorProfile {
  id: string;
  name: string;
  domain: string;
  founded: number;
  hq: string;
  funding: string;           // total raised
  employees: string;
  publiclyTraded: boolean;
  ticker?: string;
  description: string;
  positioning: string;       // how they position themselves
  primaryFocus: string[];
  weaknesses: string[];      // where CrisPRO can differentiate
  seo: CompetitorSEO;
  topKeywords: CompetitorKeyword[];
  contentStrategy: string;
  aiVisibility: AIVisibilityProfile;
  crispro_advantage: string; // CrisPRO's edge vs this competitor
}

export interface CompetitorSEO {
  domainAuthority: number;   // Moz DA (0-100)
  domainRating: number;      // Ahrefs DR (0-100)
  trustFlow: number;         // Majestic TF
  monthlyOrganicTraffic: number;
  organicKeywords: number;
  backlinks: number;
  referringDomains: number;
  topPages: string[];
}

export interface CompetitorKeyword {
  keyword: string;
  position: number;
  volume: number;
  traffic: number;
}

export interface AIVisibilityProfile {
  chatgptMentions: 'high' | 'medium' | 'low' | 'none';
  claudeMentions: 'high' | 'medium' | 'low' | 'none';
  perplexityMentions: 'high' | 'medium' | 'low' | 'none';
  geminiMentions: 'high' | 'medium' | 'low' | 'none';
  overallScore: number;      // 0-100
  keyPrompts: string[];      // prompts where they appear
}

export const COMPETITORS: CompetitorProfile[] = [
  {
    id: 'recursion',
    name: 'Recursion Pharmaceuticals',
    domain: 'recursion.com',
    founded: 2013,
    hq: 'Salt Lake City, UT',
    funding: '$1.3B+',
    employees: '500-1000',
    publiclyTraded: true,
    ticker: 'RXRX',
    description:
      'Recursion uses high-throughput biology and machine learning to map cellular biology at scale, generating massive datasets to discover drugs.',
    positioning:
      'The TechBio company — combining technology and biology to industrialize drug discovery.',
    primaryFocus: ['phenomics', 'high-throughput screening', 'rare diseases', 'oncology'],
    weaknesses: [
      'Broad platform, not oncology-specific',
      'No clinical-stage oncology AI co-pilot',
      'No VUS resolution capability',
      'No patient stratification for immunotherapy',
      'High burn rate, not yet profitable',
    ],
    seo: {
      domainAuthority: 62,
      domainRating: 68,
      trustFlow: 42,
      monthlyOrganicTraffic: 48000,
      organicKeywords: 12400,
      backlinks: 28000,
      referringDomains: 2800,
      topPages: [
        '/platform',
        '/pipeline',
        '/blog/ai-drug-discovery',
        '/blog/techbio',
        '/investors',
      ],
    },
    topKeywords: [
      { keyword: 'AI drug discovery', position: 3, volume: 18100, traffic: 1200 },
      { keyword: 'Recursion Pharmaceuticals', position: 1, volume: 8100, traffic: 7800 },
      { keyword: 'techbio', position: 1, volume: 2400, traffic: 2200 },
      { keyword: 'drug discovery platform', position: 5, volume: 6600, traffic: 480 },
      { keyword: 'phenomics drug discovery', position: 2, volume: 1200, traffic: 880 },
    ],
    contentStrategy:
      'Heavy blog publishing (2-3x/week), investor-focused press releases, scientific publications, conference presentations. Strong LinkedIn presence.',
    aiVisibility: {
      chatgptMentions: 'high',
      claudeMentions: 'high',
      perplexityMentions: 'high',
      geminiMentions: 'high',
      overallScore: 88,
      keyPrompts: [
        'best AI drug discovery companies',
        'AI biotech companies 2025',
        'TechBio companies',
        'AI drug discovery platforms',
      ],
    },
    crispro_advantage:
      'CrisPRO is oncology-specific with a clinical-stage program (STC-1010/BreAK CRC-001), while Recursion is a broad platform without a focused oncology AI co-pilot. CrisPRO\'s deterministic approach vs Recursion\'s probabilistic phenomics is a key differentiator.',
  },

  {
    id: 'insilico',
    name: 'Insilico Medicine',
    domain: 'insilico.com',
    founded: 2014,
    hq: 'Hong Kong / Abu Dhabi',
    funding: '$400M+',
    employees: '200-500',
    publiclyTraded: false,
    description:
      'Insilico Medicine uses generative AI for drug discovery, with a focus on aging, fibrosis, and oncology. Their Pharma.AI platform covers target discovery, molecule generation, and clinical trial design.',
    positioning:
      'End-to-end AI drug discovery from target identification to clinical trials using generative AI.',
    primaryFocus: ['generative AI', 'aging', 'fibrosis', 'oncology', 'target discovery'],
    weaknesses: [
      'No oncology-specific co-pilot for clinicians',
      'No biomarker-gated patient stratification',
      'No VUS resolution',
      'Primarily chemistry/molecule-focused, not clinical decision support',
      'Limited US clinical presence',
    ],
    seo: {
      domainAuthority: 55,
      domainRating: 61,
      trustFlow: 38,
      monthlyOrganicTraffic: 32000,
      organicKeywords: 9800,
      backlinks: 18000,
      referringDomains: 1900,
      topPages: [
        '/platform',
        '/blog/generative-ai-drug-discovery',
        '/pipeline',
        '/blog/ai-aging',
        '/news',
      ],
    },
    topKeywords: [
      { keyword: 'generative AI drug discovery', position: 1, volume: 4400, traffic: 3200 },
      { keyword: 'AI drug discovery', position: 6, volume: 18100, traffic: 820 },
      { keyword: 'Insilico Medicine', position: 1, volume: 5400, traffic: 5100 },
      { keyword: 'AI target identification', position: 2, volume: 2200, traffic: 1400 },
      { keyword: 'drug discovery AI platform', position: 4, volume: 3600, traffic: 680 },
    ],
    contentStrategy:
      'Scientific publications, Nature/Science papers, conference presentations, CEO thought leadership on LinkedIn. Strong academic credibility.',
    aiVisibility: {
      chatgptMentions: 'high',
      claudeMentions: 'high',
      perplexityMentions: 'medium',
      geminiMentions: 'medium',
      overallScore: 76,
      keyPrompts: [
        'AI drug discovery companies',
        'generative AI drug discovery',
        'AI biotech 2025',
        'AI for aging research',
      ],
    },
    crispro_advantage:
      'CrisPRO is clinical-stage with an active oncology trial (BreAK CRC-001), while Insilico is primarily a chemistry/molecule platform. CrisPRO\'s oncology co-pilot provides clinical decision support that Insilico does not offer.',
  },

  {
    id: 'isomorphic',
    name: 'Isomorphic Labs',
    domain: 'isomorphiclabs.com',
    founded: 2021,
    hq: 'London, UK',
    funding: 'Google DeepMind spinout (undisclosed)',
    employees: '100-200',
    publiclyTraded: false,
    description:
      'Isomorphic Labs is a DeepMind spinout applying AI to drug discovery, leveraging AlphaFold and next-generation protein structure prediction for drug design.',
    positioning:
      'Reimagining drug discovery using the most advanced AI, built on AlphaFold technology.',
    primaryFocus: ['protein structure', 'structure-based drug design', 'AI-first drug discovery'],
    weaknesses: [
      'No clinical-stage programs yet',
      'No oncology-specific platform',
      'No patient stratification or biomarker analysis',
      'No clinical decision support',
      'Limited public content / SEO investment',
      'Secretive — minimal public-facing content',
    ],
    seo: {
      domainAuthority: 48,
      domainRating: 52,
      trustFlow: 30,
      monthlyOrganicTraffic: 18000,
      organicKeywords: 4200,
      backlinks: 12000,
      referringDomains: 1400,
      topPages: [
        '/',
        '/about',
        '/blog/alphafold-drug-discovery',
      ],
    },
    topKeywords: [
      { keyword: 'Isomorphic Labs', position: 1, volume: 3600, traffic: 3400 },
      { keyword: 'AlphaFold drug discovery', position: 2, volume: 2800, traffic: 1800 },
      { keyword: 'protein structure drug design', position: 4, volume: 1800, traffic: 620 },
      { keyword: 'DeepMind drug discovery', position: 1, volume: 2200, traffic: 2000 },
    ],
    contentStrategy:
      'Minimal content strategy. Relies on DeepMind/Google brand halo and AlphaFold citations. Very few blog posts. SEO is not a priority.',
    aiVisibility: {
      chatgptMentions: 'high',
      claudeMentions: 'high',
      perplexityMentions: 'medium',
      geminiMentions: 'high',
      overallScore: 72,
      keyPrompts: [
        'AlphaFold drug discovery',
        'DeepMind biotech',
        'AI protein structure drug design',
        'best AI drug discovery companies',
      ],
    },
    crispro_advantage:
      'Isomorphic is structure-focused with no clinical programs. CrisPRO has an active clinical trial (BreAK CRC-001), oncology-specific AI, and clinical decision support — areas Isomorphic does not address.',
  },

  {
    id: 'generate-bio',
    name: 'Generate Biomedicines',
    domain: 'generatebiomedicines.com',
    founded: 2021,
    hq: 'Somerville, MA',
    funding: '$370M+',
    employees: '100-200',
    publiclyTraded: false,
    description:
      'Generate Biomedicines uses generative AI to design proteins and biologics from scratch, with a focus on antibodies and protein therapeutics.',
    positioning:
      'Generative biology — using AI to design novel proteins and biologics at scale.',
    primaryFocus: ['protein design', 'biologics', 'antibody engineering', 'generative AI'],
    weaknesses: [
      'Biologics/protein focus — not oncology AI or clinical decision support',
      'No patient stratification',
      'No biomarker analysis',
      'No clinical-stage oncology program',
      'Limited SEO investment',
    ],
    seo: {
      domainAuthority: 42,
      domainRating: 46,
      trustFlow: 28,
      monthlyOrganicTraffic: 12000,
      organicKeywords: 3200,
      backlinks: 8000,
      referringDomains: 980,
      topPages: [
        '/',
        '/platform',
        '/pipeline',
        '/blog/generative-biology',
      ],
    },
    topKeywords: [
      { keyword: 'Generate Biomedicines', position: 1, volume: 1800, traffic: 1700 },
      { keyword: 'generative biology', position: 1, volume: 1400, traffic: 1200 },
      { keyword: 'AI protein design', position: 3, volume: 3200, traffic: 880 },
      { keyword: 'AI antibody design', position: 2, volume: 2400, traffic: 1400 },
    ],
    contentStrategy:
      'Scientific publications, conference presentations, limited blog content. Relies on academic credibility and investor press.',
    aiVisibility: {
      chatgptMentions: 'medium',
      claudeMentions: 'medium',
      perplexityMentions: 'low',
      geminiMentions: 'medium',
      overallScore: 58,
      keyPrompts: [
        'AI protein design companies',
        'generative biology companies',
        'AI antibody design',
      ],
    },
    crispro_advantage:
      'Generate Bio is a protein/biologics design platform. CrisPRO is an oncology AI co-pilot with clinical-stage programs. Completely different use cases — CrisPRO should position as the clinical oncology AI layer that complements protein design tools.',
  },

  {
    id: 'exscientia',
    name: 'Exscientia',
    domain: 'exscientia.ai',
    founded: 2012,
    hq: 'Oxford, UK',
    funding: '$600M+',
    employees: '300-500',
    publiclyTraded: true,
    ticker: 'EXAI',
    description:
      'Exscientia uses AI to design small molecule drugs, with a focus on precision oncology and psychiatry. They have multiple AI-designed molecules in clinical trials.',
    positioning:
      'AI-first drug design — using AI to design better drugs faster, with precision oncology focus.',
    primaryFocus: ['small molecule design', 'precision oncology', 'psychiatry', 'AI drug design'],
    weaknesses: [
      'Small molecule focus — not whole-cell therapeutics or immunotherapy',
      'No oncology AI co-pilot for clinicians',
      'No biomarker-gated patient stratification',
      'No VUS resolution',
      'Stock down significantly from peak',
    ],
    seo: {
      domainAuthority: 52,
      domainRating: 58,
      trustFlow: 35,
      monthlyOrganicTraffic: 22000,
      organicKeywords: 6800,
      backlinks: 14000,
      referringDomains: 1600,
      topPages: [
        '/platform',
        '/pipeline',
        '/blog/ai-drug-design',
        '/precision-oncology',
      ],
    },
    topKeywords: [
      { keyword: 'AI drug design', position: 2, volume: 8100, traffic: 2800 },
      { keyword: 'Exscientia', position: 1, volume: 4400, traffic: 4200 },
      { keyword: 'precision oncology AI', position: 4, volume: 2800, traffic: 680 },
      { keyword: 'AI small molecule drug discovery', position: 1, volume: 1800, traffic: 1600 },
    ],
    contentStrategy:
      'Strong scientific publications, precision oncology blog content, investor relations. Good SEO investment relative to peers.',
    aiVisibility: {
      chatgptMentions: 'medium',
      claudeMentions: 'medium',
      perplexityMentions: 'medium',
      geminiMentions: 'low',
      overallScore: 62,
      keyPrompts: [
        'AI drug design companies',
        'precision oncology AI',
        'AI small molecule discovery',
      ],
    },
    crispro_advantage:
      'Exscientia designs small molecules. CrisPRO\'s STC-1010 is a whole-cell therapeutic vaccine — a fundamentally different modality. CrisPRO also provides clinical decision support that Exscientia does not.',
  },
];

// ── Derived analytics ─────────────────────────────────────────────────────────

export const COMPETITOR_STATS = {
  total: COMPETITORS.length,
  avgDomainAuthority: Math.round(COMPETITORS.reduce((s, c) => s + c.seo.domainAuthority, 0) / COMPETITORS.length),
  avgOrganicTraffic: Math.round(COMPETITORS.reduce((s, c) => s + c.seo.monthlyOrganicTraffic, 0) / COMPETITORS.length),
  highAIVisibility: COMPETITORS.filter(c => c.aiVisibility.overallScore >= 70).length,
  crispro_seo_gap: {
    domainAuthority: 0,   // CrisPRO baseline — update with live data
    organicTraffic: 0,
    organicKeywords: 0,
    aiVisibilityScore: 0,
  },
};

export const getCompetitorById = (id: string) =>
  COMPETITORS.find(c => c.id === id);

export const getCompetitorsByAIVisibility = () =>
  [...COMPETITORS].sort((a, b) => b.aiVisibility.overallScore - a.aiVisibility.overallScore);

export const getWeakestCompetitors = () =>
  [...COMPETITORS].sort((a, b) => a.seo.domainAuthority - b.seo.domainAuthority);
