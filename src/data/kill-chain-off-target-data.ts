export const offTargetSafetyData = [
    // High similarity, different chromosome (low risk due to accessibility)
    { x: 'Chr1:15M', y: 'On-Target: TP53', value: 0.1, significance: false, metadata: { notes: 'High sequence similarity but in heterochromatin region, low accessibility.' } },
    { x: 'Chr8:92M', y: 'On-Target: TP53', value: 0.15, significance: false, metadata: { notes: '3 mismatches, predicted low binding affinity.' } },
    
    // High similarity, some risk
    { x: 'Chr17:7.5M (TP53BP2)', y: 'On-Target: TP53', value: 0.65, significance: true, metadata: { notes: '2 mismatches in a related gene family member. Potential for off-target effects.' } },
    
    // Low similarity (safe)
    { x: 'ChrX:110M', y: 'On-Target: TP53', value: 0.05, significance: false, metadata: { notes: '>5 mismatches, negligible risk.' } },
    { x: 'Chr2:200M', y: 'On-Target: TP53', value: 0.08, significance: false, metadata: { notes: '4 mismatches, low risk.' } },
]; 
 
 