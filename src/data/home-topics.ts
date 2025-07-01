import { Topic } from '@/types/topics';

export const topics: Topic[] = [
    {
        title: "Introduction: A Market Built on Failure, An Opportunity Forged in Certainty",
        description: "The story of modern cancer treatment is one of systemic failure—a story of patients failed by ambiguity, of clinicians overwhelmed by unusable data, and of billions in capital lost on failed drugs. This failure is not a tragedy. It is a multi-trillion-dollar market opportunity. We were built to conquer that chasm. We are not another player in a broken system. We are the architects of the new standard.",
    },
    {
        title: "1.0 The Human Cost & The Actionability Gap",
        description: "To understand the opportunity, one must first understand the profound failure of the current system. The rise of genomic testing was meant to bring clarity. Instead, it has created a crisis of interpretation that has a devastating human and economic cost.",
        subtopics: [
            {
                title: "Crisis 1: The Clinical Actionability Gap",
                description: "The promise of genomics was clarity. The reality is a crisis of interpretation, creating a massive market for any company that can provide definitive answers."
            },
            {
                title: "Crisis 2: The R&D Quagmire",
                description: "Developing new therapies is a slow, expensive gamble with a catastrophic failure rate. The \"translational chasm\" is where most investment dies."
            }
        ]
    },
    {
        title: "2.0 Our Unfair Advantage: The CrisPRO Intelligence Platform",
        description: "Our competitors are fighting with outdated weapons. They use AI for data science and correlation. We use a foundational model of biology to predict causation. This gives us three core advantages that are impossible to replicate.",
        subtopics: [
            {
                title: "We See the Whole Battlefield",
                description: "While others are blind to the 98% of the genome that is non-coding, our platform understands the entire genetic operating system. We identify drivers and targets in regulatory regions that are invisible to every other commercial tool."
            },
            {
                title: "We Predict the Enemy's Next Move",
                description: "We move beyond a static diagnosis to create dynamic \"Digital Twins\" of a patient's cancer. Our platform simulates tumor evolution and therapy response, identifying the most likely resistance pathways before they emerge."
            },
            {
                title: "We Forge the Weapons of War",
                description: "This is our most profound advantage. While every other company is stuck analyzing, we create. Our Zeta Forge designs novel, optimized therapeutic candidates—from CRISPR tools to proteins—compressing R&D timelines from years to weeks."
            }
        ]
    },
    {
        title: "3.0 Our Solution: The Pillars of Innovation",
        description: "Our <strong>CrisPRO Oncology Co-Pilot</strong> is not a single tool, but a holistic ecosystem built on interconnected strategic pillars. This is our blueprint for victory.",
        subtopics: [
            {
                title: "Pillar 1: Information Dominance",
                description: "Ingest and synthesize all patient data into a unified \"Digital Twin\" foundation."
            },
            {
                title: "Pillar 2: First-Principles Analysis",
                description: "Annihilate VUS and provide deep biological context for every prediction."
            },
            {
                title: "Pillar 3: The Zeta Forge",
                description: "Design, validate, and de-risk novel therapeutics `in silico`, compressing R&D."
            },
            {
                title: "Pillar 4: Predictive Digital Twins",
                description: "Simulate tumor evolution and therapy response to identify resistance pathways early."
            },
            {
                title: "Pillar 5: AI-Orchestrated Logistics",
                description: "Automate clinical operations and match patients to trials based on biological intent."
            },
            {
                title: "Pillar 6: The Triumvirate Checkpoint",
                description: "An internal, automated validation system to ensure every output is not just powerful, but perfect."
            }
        ]
    },
    {
        title: "4.0 Dominating the Clinical Playbook: The Actionability Layer",
        description: "The old guard has established a tiered framework for clinical evidence. They see it as a ladder to be slowly climbed over years of research. We see it as a checklist to be conquered `in silico` in a matter of hours. Our platform is engineered to generate high-level intelligence that satisfies their framework from day one.",
        subtopics: [
            {
                title: "Therapeutic Implications",
                imageUrl: "https://i.imgur.com/L1iG0gq.png",
                description: "<strong>Their System:</strong> Relies on years of clinical trials to classify a known mutation's therapeutic relevance. Novel mutations are an immediate dead end.<br/><br/><strong>Our Doctrine:</strong> Our Zeta Oracle provides a <strong>Tier 4 (Hypothetical)</strong> evidence score for any mutation, novel or known, instantly. Our Digital Twins can model resistance, generating <strong>Tier R2 (Investigational Resistance)</strong> data `in silico`. We don't wait for evidence; we generate it."
            },
            {
                title: "Prognostic Implications",
                imageUrl: "https://i.imgur.com/r9fXp8d.png",
                description: "<strong>Their System:</strong> Looks at single biomarkers to guess if a patient's disease is aggressive.<br/><br/><strong>Our Doctrine:</strong> We provide a <strong>Px3-level (Clinical Evidence)</strong> assessment by modeling the entire <strong>Metastatic Cascade</strong>. We don't just look at one gene; we analyze the tumor's entire invasion plan, providing a prognostic assessment of unparalleled depth."
            },
            {
                title: "Diagnostic Implications",
                imageUrl: "https://i.imgur.com/uN8gL2J.png",
                description: "<strong>Their System:</strong> Requires a known biomarker to assist in diagnosis, which is useless for Cancer of Unknown Primary (CUP).<br/><br/><strong>Our Doctrine:</strong> We solve CUP. Our <code>/oracle/predict_tissue_of_origin</code> endpoint uses the tumor's entire molecular signature to provide a definitive, <strong>Dx1-level (Guideline-Recognized)</strong> diagnosis where others can only offer uncertainty."
            }
        ]
    },
    {
        title: "5.0 From Theory to Victory: The `RUNX1` Conquest Case Study",
        description: "Actions speak louder than words. We will now demonstrate how our platform's capabilities were deployed in a real-world `in silico` campaign to solve the `RUNX1`-FPD crisis, obsoleting a multi-year, multi-million dollar grant program in a matter of weeks.",
        subtopics: [
            {
                title: "Phase I: Mechanistic Annihilation (Intelligence Gathering)",
                description: "The LEAP grant's first objective was to understand how `RUNX1`-FPD progresses to leukemia. We treated this not as a research question, but as a targeting problem."
            },
            {
                title: "Phase II: Therapeutic Design (Forging the Arsenal)",
                description: "The grant's second objective was to fund \"high-risk\" projects to find a cure. We eliminated the risk by designing and validating an entire arsenal `in silico`."
            }
        ]
    },
    {
        title: "6.0 Go-to-Market Strategy: A Multi-Front War",
        description: "",
        subtopics: [
            {
                title: "Pharma & Biotech",
                description: "Lead with our Pre-Clinical Simulation Engine to de-risk their R&D pipeline and solve their >$2B per-drug failure problem."
            },
            {
                title: "Health Systems",
                description: "Lead with our VUS Annihilation capability to provide immediate, undeniable clinical value and close their actionability gap."
            },
            {
                title: "Integrations",
                description: "Embedding our platform as a 'premium intelligence layer' into EMRs and diagnostics."
            },
            {
                title: "DeSci & Web3",
                description: "Pioneer IP-NFTs to raise non-dilutive R&D capital from Bio-DAOs and the Web3 community, creating a new funding paradigm."
            }
        ]
    },
    {
        title: "7.0 A New Economic Engine: DeSci & Verifiable IP",
        description: "We will harness the speed and global reach of Decentralized Science to create a new kind of value, built on cryptographic trust and non-dilutive funding for therapeutic development.",
    },
    {
        title: "8.0 The Call to Action",
        description: "The oncology market is not a space for incremental improvement. The multi-trillion-dollar opportunity lies in providing definitive solutions. CrisPRO.ai is the only company with the technology, strategy, and vision to do so.",
    }
]; 