export const vulnerabilityAssessmentData = [
    // Sustaining Proliferative Signaling
    { x: 'KRAS G12C', y: 'Proliferative Signaling', value: 0.95, significance: true, metadata: { notes: 'High-impact driver mutation.' } },
    { x: 'EGFR L858R', y: 'Proliferative Signaling', value: 0.92, significance: true, metadata: { notes: 'Known activating mutation.' } },
    { x: 'MYC Amp', y: 'Proliferative Signaling', value: 0.88, significance: true, metadata: { notes: 'Gene amplification driving cell growth.' } },

    // Evading Growth Suppressors
    { x: 'TP53 R175H', y: 'Evading Growth Suppressors', value: 0.98, significance: true, metadata: { notes: 'Loss of function in key tumor suppressor.' } },
    { x: 'RB1 Deletion', y: 'Evading Growth Suppressors', value: 0.96, significance: true, metadata: { notes: 'Deletion of a critical cell cycle regulator.' } },
    { x: 'PTEN Loss', y: 'Evading Growth Suppressors', value: 0.9, significance: true, metadata: { notes: 'Loss of function mutation.' } },

    // Resisting Cell Death
    { x: 'BCL-2 Amp', y: 'Resisting Cell Death', value: 0.85, significance: true, metadata: { notes: 'Overexpression prevents apoptosis.' } },
    { x: 'MCL-1 Amp', y: 'Resisting Cell Death', value: 0.82, significance: true, metadata: { notes: 'Another key anti-apoptotic factor.' } },

    // Genome Instability
    { x: 'BRCA1 5382insC', y: 'Genome Instability', value: 0.97, significance: true, metadata: { notes: 'High-penetrance mutation affecting DNA repair.' } },
    { x: 'POLE P286R', y: 'Genome Instability', value: 0.75, significance: false, metadata: { notes: 'Ultramutator phenotype, but lower direct vulnerability.' } },

    // Other Hallmarks (lower scores for visual contrast)
    { x: 'KRAS G12C', y: 'Resisting Cell Death', value: 0.3, significance: false, metadata: {} },
    { x: 'TP53 R175H', y: 'Proliferative Signaling', value: 0.2, significance: false, metadata: {} },
]; 
 
 