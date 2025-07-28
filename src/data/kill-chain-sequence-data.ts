import { CrisPROSequenceAnnotation } from '@/components/ui/CrisPROAnnotationDetailsPanel';

export const forgedGuideRNASequence = 'GACCTTGTGACTCAACTGACCGG'; // Target: TP53 R175H hotspot

export const forgedGuideRNAAnnotations: CrisPROSequenceAnnotation[] = [
    {
        id: 'anno-grna-1',
        start: 0,
        end: 19,
        label: 'Protospacer',
        description: 'The 20-nucleotide sequence that directs the Cas9 enzyme to the specific target DNA.',
        baseAnnotationType: 'regulatory_region',
        aiGeneratedSource: 'Zeta Forge',
        functionalAssessment: {
            summary: 'Optimized for high on-target efficacy against TP53 R175H.',
            impactScore: 0.98
        }
    },
    {
        id: 'anno-grna-2',
        start: 20,
        end: 22,
        label: 'PAM',
        description: 'Protospacer Adjacent Motif (PAM). A short sequence (NGG) required for Cas9 to bind and cut the DNA.',
        baseAnnotationType: 'cds', // Using 'cds' for color distinction
        functionalAssessment: {
            summary: 'The presence of a PAM site is non-negotiable for Cas9 activity.',
            impactScore: 1.0
        }
    }
]; 