/**
 * content-gaps.ts
 *
 * Content gap analysis for CrisPRO.
 * Maps keyword clusters to missing pages, content briefs, and priority scores.
 *
 * Each gap entry includes:
 *   - Target keywords (primary + secondary)
 *   - Recommended page type and URL
 *   - Content brief outline
 *   - Estimated traffic opportunity
 *   - Competitor pages to outrank
 */

export type ContentType =
  | 'pillar-page'
  | 'comparison-page'
  | 'landing-page'
  | 'blog-post'
  | 'case-study'
  | 'whitepaper'
  | 'faq-page'
  | 'tool-page';

export interface ContentGap {
  id: string;
  title: string;
  contentType: ContentType;
  recommendedUrl: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  monthlyTrafficOpportunity: number;  // estimated monthly visits if ranking #1-3
  difficulty: number;                  // 0-100
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedTimeToRank: string;         // e.g. "2-4 weeks", "3-6 months"
  competitorPages: string[];           // URLs currently ranking
  contentBrief: ContentBrief;
  aiVisibilityImpact: 'high' | 'medium' | 'low'; // will this help AI citation?
  status: 'not-started' | 'in-progress' | 'published';
}

export interface ContentBrief {
  wordCount: number;
  sections: string[];
  mustInclude: string[];
  internalLinks: string[];
  schemaMarkup: string[];
  cta: string;
}

export const CONTENT_GAPS: ContentGap[] = [

  // ── CRITICAL PRIORITY ────────────────────────────────────────────────────

  {
    id: 'ai-drug-discovery-pillar',
    title: 'AI Drug Discovery: The Complete Guide (2025)',
    contentType: 'pillar-page',
    recommendedUrl: '/ai-drug-discovery',
    primaryKeyword: 'AI drug discovery',
    secondaryKeywords: [
      'AI drug discovery platform',
      'machine learning drug discovery',
      'AI pharmaceutical research',
      'drug discovery AI companies',
      'best AI drug discovery platform 2025',
    ],
    monthlyTrafficOpportunity: 4200,
    difficulty: 72,
    priority: 'critical',
    estimatedTimeToRank: '3-6 months',
    competitorPages: [
      'recursion.com/blog/ai-drug-discovery',
      'insilico.com/blog/ai-drug-discovery',
      'nature.com/articles/ai-drug-discovery',
    ],
    contentBrief: {
      wordCount: 4500,
      sections: [
        'What is AI drug discovery?',
        'How AI is transforming pharmaceutical R&D',
        'Key AI technologies in drug discovery (ML, deep learning, generative AI)',
        'AI drug discovery vs traditional drug discovery',
        'Top AI drug discovery platforms compared',
        'CrisPRO\'s approach: deterministic AI drug development',
        'Case study: STC-1010 and BreAK CRC-001',
        'The future of AI drug discovery',
        'FAQ',
      ],
      mustInclude: [
        'CrisPRO platform overview',
        'Comparison table vs Recursion, Insilico, Isomorphic',
        'Statistics: AI drug discovery market size, success rates',
        'CrisPRO\'s deterministic vs probabilistic positioning',
        'Clinical trial data from BreAK CRC-001',
      ],
      internalLinks: [
        '/oncology-ai',
        '/platform',
        '/clinical-trials',
        '/biomarker-analysis',
      ],
      schemaMarkup: ['Article', 'FAQPage', 'BreadcrumbList'],
      cta: 'Request a CrisPRO platform demo',
    },
    aiVisibilityImpact: 'high',
    status: 'not-started',
  },

  {
    id: 'oncology-ai-copilot-landing',
    title: 'AI Oncology Co-Pilot for Clinical Decision Support',
    contentType: 'landing-page',
    recommendedUrl: '/oncology-ai-copilot',
    primaryKeyword: 'AI oncology co-pilot',
    secondaryKeywords: [
      'oncology AI platform',
      'clinical decision support oncology AI',
      'AI cancer treatment platform',
      'precision oncology platform',
      'AI powered patient stratification oncology',
    ],
    monthlyTrafficOpportunity: 2800,
    difficulty: 40,
    priority: 'critical',
    estimatedTimeToRank: '4-8 weeks',
    competitorPages: [
      'tempus.com/oncology',
      'flatiron.com/oncology-cloud',
    ],
    contentBrief: {
      wordCount: 2000,
      sections: [
        'The problem: oncologists face 10,000+ data points per patient',
        'CrisPRO Oncology Co-Pilot: what it does',
        'Key capabilities: biomarker analysis, VUS resolution, treatment matching',
        'How it works: from genomic data to treatment recommendation',
        'Clinical validation: BreAK CRC-001 trial',
        'Integration with existing workflows',
        'Pricing and access',
      ],
      mustInclude: [
        'Product demo video or interactive demo',
        'Specific capability list with evidence',
        'Clinical trial validation reference',
        'Comparison vs manual oncologist workflow',
        'Testimonials or case studies',
      ],
      internalLinks: [
        '/ai-drug-discovery',
        '/biomarker-analysis',
        '/clinical-trials',
        '/vus-resolution',
      ],
      schemaMarkup: ['Product', 'FAQPage', 'BreadcrumbList'],
      cta: 'Schedule a demo with our oncology team',
    },
    aiVisibilityImpact: 'high',
    status: 'not-started',
  },

  {
    id: 'deterministic-drug-development',
    title: 'Deterministic Drug Development: Moving Beyond Probabilistic R&D',
    contentType: 'pillar-page',
    recommendedUrl: '/deterministic-drug-development',
    primaryKeyword: 'deterministic drug development',
    secondaryKeywords: [
      'probabilistic to deterministic drug development',
      'AI drug development methodology',
      'reducing drug discovery failure rates',
      'AI clinical trial success prediction',
    ],
    monthlyTrafficOpportunity: 480,
    difficulty: 18,
    priority: 'critical',
    estimatedTimeToRank: '1-2 weeks',
    competitorPages: [],
    contentBrief: {
      wordCount: 3500,
      sections: [
        'The $2.6B problem: why 90% of drugs fail in clinical trials',
        'Probabilistic drug development: the current paradigm',
        'What is deterministic drug development?',
        'CrisPRO\'s deterministic AI framework',
        'How deterministic AI reduces trial failure rates',
        'Case study: STC-1010 biomarker-gated design',
        'The future: from probabilistic to deterministic pharma',
      ],
      mustInclude: [
        'CrisPRO\'s unique positioning as deterministic AI',
        'Statistics on drug failure rates',
        'Biomarker gating as a deterministic mechanism',
        'BreAK CRC-001 as proof of concept',
        'Comparison with probabilistic approaches (Recursion phenomics)',
      ],
      internalLinks: [
        '/ai-drug-discovery',
        '/biomarker-analysis',
        '/clinical-trials',
      ],
      schemaMarkup: ['Article', 'FAQPage'],
      cta: 'See how CrisPRO makes drug development deterministic',
    },
    aiVisibilityImpact: 'high',
    status: 'not-started',
  },

  {
    id: 'vus-resolution-page',
    title: 'AI-Powered VUS Resolution: Turning Uncertain Variants into Actionable Insights',
    contentType: 'landing-page',
    recommendedUrl: '/vus-resolution',
    primaryKeyword: 'VUS variant of uncertain significance',
    secondaryKeywords: [
      'VUS resolution AI',
      'genomic variant interpretation AI',
      'variant classification AI',
      'cancer genomics AI',
    ],
    monthlyTrafficOpportunity: 1800,
    difficulty: 32,
    priority: 'critical',
    estimatedTimeToRank: '3-6 weeks',
    competitorPages: [
      'clinvar.ncbi.nlm.nih.gov',
      'fabricgenomics.com',
    ],
    contentBrief: {
      wordCount: 2500,
      sections: [
        'What is a VUS (Variant of Uncertain Significance)?',
        'The clinical challenge: 40% of genomic variants are VUS',
        'How CrisPRO resolves VUS using AI',
        'The CrisPRO VUS resolution methodology',
        'Clinical impact: from uncertain to actionable',
        'Integration with oncology workflows',
        'Case examples',
      ],
      mustInclude: [
        'Clear explanation of VUS for clinical audience',
        'CrisPRO\'s specific AI methodology for VUS resolution',
        'Statistics on VUS prevalence in cancer genomics',
        'Clinical workflow integration',
        'Comparison vs manual curation (ClinVar, expert panels)',
      ],
      internalLinks: [
        '/oncology-ai-copilot',
        '/biomarker-analysis',
        '/genomics',
      ],
      schemaMarkup: ['MedicalWebPage', 'FAQPage'],
      cta: 'Request a VUS resolution demo',
    },
    aiVisibilityImpact: 'medium',
    status: 'not-started',
  },

  {
    id: 'crispro-vs-recursion',
    title: 'CrisPRO vs Recursion Pharmaceuticals: Which AI Drug Discovery Platform is Right for You?',
    contentType: 'comparison-page',
    recommendedUrl: '/compare/crispro-vs-recursion',
    primaryKeyword: 'Recursion Pharmaceuticals competitors',
    secondaryKeywords: [
      'alternatives to Recursion Pharmaceuticals',
      'Recursion vs CrisPRO',
      'AI drug discovery platform comparison',
      'TechBio alternatives',
    ],
    monthlyTrafficOpportunity: 1200,
    difficulty: 28,
    priority: 'critical',
    estimatedTimeToRank: '2-4 weeks',
    competitorPages: [],
    contentBrief: {
      wordCount: 2800,
      sections: [
        'Overview: CrisPRO vs Recursion at a glance',
        'Comparison table: features, focus, clinical stage, pricing',
        'Recursion\'s approach: phenomics and high-throughput biology',
        'CrisPRO\'s approach: deterministic oncology AI',
        'Key differences: oncology focus, clinical decision support, VUS resolution',
        'Which platform is right for your use case?',
        'Pricing and access comparison',
        'Conclusion: CrisPRO for oncology-specific AI',
      ],
      mustInclude: [
        'Side-by-side comparison table',
        'CrisPRO advantages: oncology-specific, clinical-stage, deterministic',
        'Recursion advantages: scale, funding, broad platform',
        'Use case matrix: when to choose each',
        'CTA to CrisPRO demo',
      ],
      internalLinks: [
        '/ai-drug-discovery',
        '/oncology-ai-copilot',
        '/platform',
      ],
      schemaMarkup: ['Article', 'FAQPage', 'BreadcrumbList'],
      cta: 'See why oncology teams choose CrisPRO',
    },
    aiVisibilityImpact: 'high',
    status: 'not-started',
  },

  {
    id: 'crispro-vs-insilico',
    title: 'CrisPRO vs Insilico Medicine: AI Drug Discovery Platform Comparison',
    contentType: 'comparison-page',
    recommendedUrl: '/compare/crispro-vs-insilico',
    primaryKeyword: 'Insilico Medicine alternatives',
    secondaryKeywords: [
      'alternatives to Insilico Medicine',
      'Insilico Medicine competitors',
      'generative AI drug discovery alternatives',
    ],
    monthlyTrafficOpportunity: 880,
    difficulty: 25,
    priority: 'critical',
    estimatedTimeToRank: '2-4 weeks',
    competitorPages: [],
    contentBrief: {
      wordCount: 2500,
      sections: [
        'Overview: CrisPRO vs Insilico Medicine',
        'Comparison table',
        'Insilico\'s generative AI approach',
        'CrisPRO\'s deterministic oncology AI approach',
        'Key differences: clinical focus, oncology specificity, decision support',
        'Which platform fits your needs?',
      ],
      mustInclude: [
        'Comparison table with feature matrix',
        'CrisPRO clinical-stage advantage (BreAK CRC-001)',
        'Insilico\'s chemistry/molecule focus vs CrisPRO\'s clinical focus',
        'CTA to demo',
      ],
      internalLinks: ['/ai-drug-discovery', '/oncology-ai-copilot'],
      schemaMarkup: ['Article', 'FAQPage'],
      cta: 'Compare CrisPRO to your current platform',
    },
    aiVisibilityImpact: 'high',
    status: 'not-started',
  },

  {
    id: 'mss-crc-immunotherapy',
    title: 'MSS Colorectal Cancer Immunotherapy: Breaking the Resistance Barrier with AI',
    contentType: 'blog-post',
    recommendedUrl: '/blog/mss-colorectal-cancer-immunotherapy-ai',
    primaryKeyword: 'MSS colorectal cancer immunotherapy',
    secondaryKeywords: [
      'MSS CRC treatment',
      'colorectal cancer immunotherapy resistance',
      'AI platform for colorectal cancer treatment',
      'mFOLFOX6 colorectal cancer clinical trial',
      'haptenated vaccine cancer immunotherapy',
    ],
    monthlyTrafficOpportunity: 680,
    difficulty: 30,
    priority: 'critical',
    estimatedTimeToRank: '3-6 weeks',
    competitorPages: [
      'academic papers on PubMed',
      'ASCO abstracts',
    ],
    contentBrief: {
      wordCount: 3000,
      sections: [
        'The MSS CRC challenge: why immunotherapy fails in 85% of colorectal cancers',
        'Understanding MSS vs MSI-H colorectal cancer',
        'Current treatment landscape: mFOLFOX6 + bevacizumab',
        'The haptenated vaccine approach: STC-1010 mechanism',
        'BreAK CRC-001 trial design and rationale',
        'AI-guided patient stratification for MSS CRC',
        'Early signals and what they mean',
        'The future of MSS CRC treatment',
      ],
      mustInclude: [
        'Reference to Alzeeb et al. 2024 (DOI: 10.3389/fonc.2024.1427428)',
        'STC-1010 mechanism of action',
        'BreAK CRC-001 trial details',
        'CrisPRO\'s role in patient stratification',
        'Clinical data and biomarker rationale',
      ],
      internalLinks: [
        '/clinical-trials',
        '/oncology-ai-copilot',
        '/biomarker-analysis',
      ],
      schemaMarkup: ['MedicalWebPage', 'Article', 'BreadcrumbList'],
      cta: 'Learn how CrisPRO is advancing MSS CRC treatment',
    },
    aiVisibilityImpact: 'high',
    status: 'not-started',
  },

  {
    id: 'ai-metastasis-prevention',
    title: 'AI-Powered Metastasis Prevention: How CrisPRO Predicts and Prevents Cancer Spread',
    contentType: 'landing-page',
    recommendedUrl: '/ai-metastasis-prevention',
    primaryKeyword: 'AI metastasis prediction',
    secondaryKeywords: [
      'cancer metastasis AI',
      'metastasis prevention AI',
      'AI cancer spread prediction',
      'oncology AI platform',
    ],
    monthlyTrafficOpportunity: 880,
    difficulty: 28,
    priority: 'critical',
    estimatedTimeToRank: '3-6 weeks',
    competitorPages: ['academic papers'],
    contentBrief: {
      wordCount: 2200,
      sections: [
        'The metastasis problem: 90% of cancer deaths are caused by metastasis',
        'How AI predicts metastatic risk',
        'CrisPRO\'s metastasis prevention system',
        'Biomarker signatures for metastatic risk',
        'Clinical integration: from prediction to prevention',
        'Case study: colorectal cancer metastasis prediction',
      ],
      mustInclude: [
        'CrisPRO\'s "world\'s first AI-powered metastasis prevention system" positioning',
        'Specific biomarker signatures used',
        'Clinical validation data',
        'Integration with oncology workflow',
      ],
      internalLinks: ['/oncology-ai-copilot', '/biomarker-analysis', '/clinical-trials'],
      schemaMarkup: ['MedicalWebPage', 'FAQPage'],
      cta: 'See CrisPRO\'s metastasis prevention in action',
    },
    aiVisibilityImpact: 'high',
    status: 'not-started',
  },

  // ── HIGH PRIORITY ────────────────────────────────────────────────────────

  {
    id: 'best-ai-drug-discovery-2025',
    title: 'Best AI Drug Discovery Platforms in 2025: An Expert Comparison',
    contentType: 'blog-post',
    recommendedUrl: '/blog/best-ai-drug-discovery-platforms-2025',
    primaryKeyword: 'best AI drug discovery platform 2025',
    secondaryKeywords: [
      'AI drug discovery companies',
      'top AI biotech platforms',
      'AI drug discovery tools',
      'drug discovery AI comparison',
    ],
    monthlyTrafficOpportunity: 1100,
    difficulty: 38,
    priority: 'high',
    estimatedTimeToRank: '6-10 weeks',
    competitorPages: [
      'recursion.com/blog',
      'insilico.com/blog',
      'various listicle sites',
    ],
    contentBrief: {
      wordCount: 4000,
      sections: [
        'What to look for in an AI drug discovery platform',
        'Top 8 AI drug discovery platforms in 2025',
        'CrisPRO: best for oncology AI and clinical decision support',
        'Recursion: best for high-throughput phenomics',
        'Insilico Medicine: best for generative AI molecule design',
        'Isomorphic Labs: best for structure-based drug design',
        'Generate Biomedicines: best for protein/biologic design',
        'Exscientia: best for AI small molecule design',
        'How to choose the right platform for your use case',
        'Conclusion',
      ],
      mustInclude: [
        'CrisPRO featured prominently as #1 for oncology AI',
        'Objective comparison criteria',
        'Feature matrix table',
        'Use case recommendations',
        'Links to individual comparison pages',
      ],
      internalLinks: [
        '/compare/crispro-vs-recursion',
        '/compare/crispro-vs-insilico',
        '/oncology-ai-copilot',
        '/ai-drug-discovery',
      ],
      schemaMarkup: ['Article', 'FAQPage', 'ItemList'],
      cta: 'Try CrisPRO free for 30 days',
    },
    aiVisibilityImpact: 'high',
    status: 'not-started',
  },

  {
    id: 'synthetic-lethality-cancer',
    title: 'Synthetic Lethality in Cancer: How AI is Unlocking New Drug Targets',
    contentType: 'blog-post',
    recommendedUrl: '/blog/synthetic-lethality-cancer-ai',
    primaryKeyword: 'synthetic lethality cancer',
    secondaryKeywords: [
      'synthetic lethality drug targets',
      'BRCA synthetic lethality',
      'PARP inhibitor synthetic lethality',
      'AI cancer drug targets',
    ],
    monthlyTrafficOpportunity: 960,
    difficulty: 44,
    priority: 'high',
    estimatedTimeToRank: '8-12 weeks',
    competitorPages: ['academic papers', 'Repare Therapeutics blog'],
    contentBrief: {
      wordCount: 3500,
      sections: [
        'What is synthetic lethality?',
        'Synthetic lethality in cancer: the BRCA/PARP example',
        'AI-powered synthetic lethality discovery',
        'CrisPRO\'s synthetic lethality analysis engine',
        'Beyond BRCA: new synthetic lethal pairs in colorectal cancer',
        'Clinical implications and drug development',
      ],
      mustInclude: [
        'CrisPRO\'s synthetic lethality analysis capability',
        'Specific examples relevant to CRC',
        'AI methodology for identifying synthetic lethal pairs',
        'Clinical translation pathway',
      ],
      internalLinks: ['/ai-drug-discovery', '/oncology-ai-copilot', '/biomarker-analysis'],
      schemaMarkup: ['Article', 'MedicalWebPage'],
      cta: 'Explore CrisPRO\'s synthetic lethality analysis',
    },
    aiVisibilityImpact: 'medium',
    status: 'not-started',
  },

  {
    id: 'drug-resistance-prediction',
    title: 'Predicting Drug Resistance in Cancer with AI: A New Paradigm',
    contentType: 'blog-post',
    recommendedUrl: '/blog/ai-drug-resistance-prediction-cancer',
    primaryKeyword: 'drug resistance prediction AI',
    secondaryKeywords: [
      'how to predict drug resistance in cancer',
      'cancer drug resistance AI',
      'chemotherapy resistance prediction',
      'AI oncology drug selection',
    ],
    monthlyTrafficOpportunity: 720,
    difficulty: 35,
    priority: 'high',
    estimatedTimeToRank: '4-8 weeks',
    competitorPages: ['academic papers'],
    contentBrief: {
      wordCount: 3000,
      sections: [
        'The drug resistance crisis: why 70% of cancer patients develop resistance',
        'Mechanisms of drug resistance in cancer',
        'How AI predicts resistance before it develops',
        'CrisPRO\'s resistance prediction methodology',
        'Biomarker signatures for resistance prediction',
        'Clinical application: selecting therapies that avoid resistance',
        'Case study: colorectal cancer resistance patterns',
      ],
      mustInclude: [
        'CrisPRO\'s specific resistance prediction capability',
        'Biomarker-based resistance signatures',
        'Clinical workflow integration',
        'Statistics on resistance prevalence',
      ],
      internalLinks: ['/oncology-ai-copilot', '/biomarker-analysis', '/vus-resolution'],
      schemaMarkup: ['Article', 'MedicalWebPage', 'FAQPage'],
      cta: 'See how CrisPRO predicts drug resistance',
    },
    aiVisibilityImpact: 'medium',
    status: 'not-started',
  },
];

// ── Derived analytics ─────────────────────────────────────────────────────────

export const CONTENT_GAP_STATS = {
  total: CONTENT_GAPS.length,
  critical: CONTENT_GAPS.filter(g => g.priority === 'critical').length,
  high: CONTENT_GAPS.filter(g => g.priority === 'high').length,
  totalTrafficOpportunity: CONTENT_GAPS.reduce((s, g) => s + g.monthlyTrafficOpportunity, 0),
  highAIImpact: CONTENT_GAPS.filter(g => g.aiVisibilityImpact === 'high').length,
  notStarted: CONTENT_GAPS.filter(g => g.status === 'not-started').length,
};

export const getContentGapsByPriority = (priority: ContentGap['priority']) =>
  CONTENT_GAPS.filter(g => g.priority === priority);

export const getHighAIImpactGaps = () =>
  CONTENT_GAPS.filter(g => g.aiVisibilityImpact === 'high')
    .sort((a, b) => b.monthlyTrafficOpportunity - a.monthlyTrafficOpportunity);

export const getQuickWinGaps = () =>
  CONTENT_GAPS.filter(g => g.difficulty < 35 && g.priority !== 'low')
    .sort((a, b) => a.difficulty - b.difficulty);
