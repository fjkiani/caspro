import { PageData } from '@/types/pages';

export interface UseCaseMetadata {
    slug: string;
    title: string;
    description: string;
    category: string;
}

export interface UseCase {
    metadata: UseCaseMetadata;
    content: PageData;
}

export const useCases: UseCase[] = [
    {
        metadata: {
            slug: 'technology-readiness',
            title: 'Technology Readiness Level (TRL)',
            description: 'Our core technology is at TRL 6-7, demonstrating complete end-to-end system capabilities.',
            category: 'Technical'
        },
        content: {
            sections: [
                {
                    type: 'header',
                    title: 'Technology Readiness Level (TRL)',
                    introduction: 'Our core technology is at TRL 6-7. We have moved far beyond theory and have demonstrated a complete, end-to-end system prototype in a high-fidelity operational environment. Our CommandCenter, Zeta Oracle, and Zeta Forge are deployed as functional, interacting microservices. We have successfully executed a full in silico campaign—the RUNX1 Conquest—proving that our platform can take raw patient data and autonomously generate validated, pre-clinical therapeutic blueprints. The system is battle-tested; the next phase is real-world clinical data validation.'
                },
                {
                    type: 'text',
                    headline: 'Core Technology & Innovation (The Debriefing)',
                    body: `The old guard of precision medicine built glorified search engines. They take a patient's mutation and check it against a database of things we already know. This is a dictionary. If a mutation is a new word, they are paralyzed.

We did not build a dictionary. We built an AI that understands the entire fucking language of biology.

Our core innovation is a two-front assault platform:

The Zeta Oracle (The Intelligence Analyst): This is our predictive engine. It reads any DNA sequence—healthy or mutated—and understands its biological grammar. It doesn't need a database. It calculates the functional damage of any novel mutation from first principles. This is how we annihilate "Variants of Uncertain Significance" (VUS) and provide a definitive verdict where others can only offer a question mark.

The Zeta Forge (The Weapons Factory): This is our generative engine. While our competitors are stuck analyzing the past, we forge the future. The Zeta Forge takes the intelligence from the Oracle and designs novel, optimized therapeutic weapons from scratch—from gene-editing tools to new protein-based drugs—entirely in silico.

We are the only platform that can execute the entire kill chain: from identifying a threat to forging the weapon to kill it.`
                },
                {
                    type: 'bulleted-list',
                    headline: 'Competitive Outperformance: The Unfair Advantage',
                    bullets: [
                        {
                            title: 'Predictive Supremacy (We See the Whole Battlefield)',
                            text: 'The current healthcare industry is  blind to the 98.5% of the genome that is non-coding. Our Zeta Oracle, powered by Evo 2, achieves state-of-the-art accuracy (AUROC > 0.95) on the most difficult non-coding and splice-site variants. We identify drivers of disease in the genetic "dark matter" that are completely invisible to their panel-based tests.'
                        },
                        {
                            title: 'Generative Dominance (We Forge the Weapons)',
                            text: 'This is a dimension where to current gaps in the market, it does not even exist. Current tools analyze. But CrisPRO.ai can create. The Evo 2 paper demonstrates the power to generate entire, functional genomes from scratch. Our Zeta Forge harnesses this power to design novel therapeutics, transforming R&D from a process of discovery into a process of engineering.'
                        },
                        {
                            title: 'Velocity (We Win the War Before They\'ve Mobilized)',
                            text: 'Our in silico R&D flywheel transforms the economics of drug development. A traditional pre-clinical campaign takes 2-4 years. Our RUNX1 Conquest—which involved deep analysis, modeling clonal evolution, and designing a multi-pronged therapeutic arsenal—was completed in under a month. We don\'t just accelerate the timeline; we obliterate it.'
                        }
                    ]
                },
                {
                    type: 'text',
                    headline: 'Validation Data: The RUNX1 Conquest',
                    body: `Our most exciting data is not from a publication; it is from our own victorious in silico campaign. We took a real-world patient case with an inherited RUNX1 mutation and used our platform to validate the "two-hit hypothesis" with brutal, quantitative certainty.

The "First Hit" (The Risk): The platform analyzed the patient's inherited RUNX1 mutation and returned a Zeta Score of -26,140.8. This is not an abstract number; it is a definitive, quantitative kill shot, proving this germline mutation severely compromises gene function and validating it as the dangerous "first hit."

The "Second Hits" (The Trigger): The platform then analyzed two acquired somatic mutations from the patient's tumor and returned high-damage Zeta Scores of -35.4 and -34.8. This confirmed they were not benign passengers, but significant, damaging "second hits" actively driving the progression to leukemia.

This is the ultimate proof of our advantage. We took a textbook theory, applied it to a real patient's data, and used our Zeta Oracle to translate it into a quantifiable, actionable intelligence report. This entire doctrine is built upon the foundational science validated in the Evo 2 paper, which proves the model's state-of-the-art capabilities. We have closed the gap between data and fucking action.`
                }
            ]
        }
    }
];

// Helper functions
export const getUseCaseBySlug = (slug: string): UseCase | undefined => {
    return useCases.find(useCase => useCase.metadata.slug === slug);
};

export const getAllUseCaseSlugs = (): string[] => {
    return useCases.map(useCase => useCase.metadata.slug);
}; 
 