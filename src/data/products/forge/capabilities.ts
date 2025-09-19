// Forge Multi-Modal Generation Capabilities
export const forgeCapabilities = {
  multiModalGeneration: [
    {
      id: 'guide_rna_design',
      icon: '🧬',
      title: 'Guide RNA Design',
      description: 'Generate CRISPR guide RNAs with minimal off-targets and maximum on-target efficiency using Evo2\'s genomic understanding.',
      metrics: [
        { value: '92%', label: 'On-target efficiency', color: 'green' },
        { value: '<0.1', label: 'Off-target score', color: 'blue' },
        { value: '~30s', label: 'Design time', color: 'purple' }
      ],
      keyFeatures: [
        'Multi-objective optimization',
        'Off-target minimization',
        'PAM compatibility',
        'Multiplex design'
      ]
    },
    {
      id: 'repair_templates',
      icon: '🔧',
      title: 'HDR Repair Templates',
      description: 'Design optimized repair templates with ultra-long homology arms for precise genome editing and therapeutic corrections.',
      metrics: [
        { value: '78%', label: 'HDR efficiency', color: 'green' },
        { value: '4.2kb', label: 'Avg arm length', color: 'blue' },
        { value: '94%', label: 'Success rate', color: 'purple' }
      ],
      keyFeatures: [
        'Ultra-long homology arms (4kb+)',
        'Mutation correction',
        'Insert optimization',
        'Recombination efficiency'
      ]
    },
    {
      id: 'therapeutic_proteins',
      icon: '🧪',
      title: 'Therapeutic Proteins',
      description: 'Generate optimized protein sequences for enhanced therapeutic properties, including improved stability, binding affinity, and reduced immunogenicity.',
      metrics: [
        { value: '+67%', label: 'Binding affinity', color: 'green' },
        { value: '+43%', label: 'Stability improvement', color: 'blue' },
        { value: '+89%', label: 'Expression yield', color: 'purple' }
      ],
      keyFeatures: [
        'Antibody optimization',
        'Enzyme engineering',
        'Stability enhancement',
        'Immunogenicity reduction'
      ]
    },
    {
      id: 'regulatory_elements',
      icon: '⚡',
      title: 'Regulatory Elements',
      description: 'Design tissue-specific promoters and enhancers for controlled gene expression with minimal off-target activation.',
      metrics: [
        { value: '96%', label: 'Specificity', color: 'green' },
        { value: '15.3x', label: 'Expression fold', color: 'blue' },
        { value: '<2%', label: 'Leakage', color: 'purple' }
      ],
      keyFeatures: [
        'Tissue specificity',
        'Expression level tuning',
        'Inducible systems',
        'Minimal leakage'
      ]
    },
    {
      id: 'epigenome_optimization',
      icon: '🎯',
      title: 'Epigenome Engineering',
      description: 'Optimize sequences for enhanced chromatin accessibility and favorable epigenetic landscapes.',
      metrics: [
        { value: '+72%', label: 'Accessibility', color: 'green' },
        { value: '+56%', label: 'H3K27ac signal', color: 'blue' },
        { value: '-84%', label: 'Methylation reduction', color: 'purple' }
      ],
      keyFeatures: [
        'Chromatin accessibility',
        'Histone modification',
        'DNA methylation patterns',
        'Nucleosome positioning'
      ]
    }
  ],
  
  // Business transformation data
  businessTransformation: {
    industryProblem: {
      title: 'The Design Bottleneck Crisis',
      metrics: [
        { label: 'Design failure rate', value: '85%', subtitle: 'Therapeutic candidates fail in preclinical' },
        { label: 'Design-to-candidate time', value: '18 months', subtitle: 'Traditional iterative design' },
        { label: 'Cost per successful design', value: '$8M', subtitle: 'Including failed iterations' },
      ],
      description: 'Most therapeutic failures occur because designs are based on intuition rather than systematic engineering. Teams waste years iterating on fundamentally flawed concepts.',
    },
    valuePropositions: [
      {
        title: 'Engineer Multi-Modal Therapeutics with Guided Generation',
        description: 'Design complete therapeutic portfolios with predictable quality scaling using Evo2\'s guided generation capabilities.',
        comparison: {
          traditional: [
            { label: '20+ design iterations', cost: '$4M' },
            { label: '18 months to candidate', cost: '$8M total' },
            { label: 'Random success rate', cost: '15% viable' },
          ],
          forge: [
            { label: '3 guided iterations', cost: '$200K' },
            { label: '2 weeks to portfolio', cost: '$300K total' },
            { label: 'Predictable AUROC 0.9', cost: '90% viable' },
          ],
        },
        impact: [
          { label: 'Design iterations', before: '20+', after: '3' },
          { label: 'Time to portfolio', before: '18 months', after: '2 weeks' },
          { label: 'Success predictability', before: 'Random', after: '90% AUROC' },
          { label: 'Cost reduction', before: 'baseline', after: '96% savings' },
        ],
      },
      {
        title: 'Generate Ultra-Long Homology Arms for HDR Efficiency',
        description: 'Leverage 1M-token context to design ultra-long homology arms that dramatically improve HDR integration rates.',
        comparison: {
          traditional: [
            { label: 'Short homology arms (500bp)', cost: '15% HDR rate' },
            { label: 'Multiple delivery attempts', cost: '$2M' },
            { label: 'Low integration efficiency', cost: '3 months delay' },
          ],
          forge: [
            { label: 'Ultra-long arms (4kb)', cost: '85% HDR rate' },
            { label: 'Single delivery success', cost: '$200K' },
            { label: 'High integration efficiency', cost: 'On schedule' },
          ],
        },
        impact: [
          { label: 'HDR integration rate', before: '15%', after: '85%' },
          { label: 'Delivery attempts', before: 'Multiple', after: 'Single' },
          { label: 'Development timeline', before: '+3 months', after: 'On schedule' },
          { label: 'Cost per success', before: '$13M', after: '$235K' },
        ],
      },
      {
        title: 'Design Novel Therapeutic Proteins with Structural Validation',
        description: 'Generate bespoke nanobodies and therapeutic proteins with built-in structural plausibility validation.',
        comparison: {
          traditional: [
            { label: 'Library screening', cost: '$3M' },
            { label: '12 months optimization', cost: '$5M' },
            { label: 'Structural unknowns', cost: 'High risk' },
          ],
          forge: [
            { label: 'Rational design', cost: '$100K' },
            { label: '4 weeks optimization', cost: '$200K' },
            { label: 'AF3 structural validation', cost: 'Low risk' },
          ],
        },
        impact: [
          { label: 'Discovery approach', before: 'Random screening', after: 'Rational design' },
          { label: 'Optimization time', before: '12 months', after: '4 weeks' },
          { label: 'Structural risk', before: 'Unknown', after: 'AF3 validated' },
          { label: 'Total cost', before: '$8M', after: '$300K' },
        ],
      },
    ],
    summary: {
      title: 'Total Design Revolution',
      metrics: [
        { label: 'Design cost reduction', value: '96%', subtitle: '$8M → $300K per program' },
        { label: 'Time compression', value: '36x', subtitle: '18 months → 2 weeks' },
        { label: 'Success predictability', value: '90%', subtitle: 'AUROC vs random chance' },
        { label: 'Portfolio diversity', value: '10x', subtitle: 'Multiple families per command' },
      ],
      description: 'Forge transforms therapeutic design from an art into an engineering discipline. Instead of hoping random iterations will work, teams can systematically engineer solutions with predictable outcomes and scientific confidence.',
    },
  }
};