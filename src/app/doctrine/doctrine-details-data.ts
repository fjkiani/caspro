export interface DoctrineDetail {
  slug: string;
  title: string;
  subtitle: string;
  vision: {
    title: string;
    content: string;
  };
  problem: {
    title: string;
    content: string;
    points: {
      title: string;
      content: string;
    }[];
  };
  doctrine: {
    title: string;
    corePhilosophy: string;
    capabilities: {
      title: string;
      items: string[];
    };
    tacticalBreakdown: {
      title: string;
      steps: {
        title: string;
        content: string;
      }[];
    };
  };
  targetAudience: {
    title: string;
    content: string;
    audiences: {
      name: string;
      description: string;
    }[];
  };
}

export const doctrineDetailsData: Record<string, DoctrineDetail> = {
  'vus-annihilation': {
    slug: 'vus-annihilation',
    title: 'VUS Resolution',
    subtitle: 'Core Capability 1',
    vision: {
      title: 'Resolving Clinical Uncertainty',
      content: "Our vision is to significantly reduce 'Variants of Uncertain Significance' in clinical practice. We transform VUS results, which create patient anxiety and clinical uncertainty, into definitive, actionable insights that enable confident clinical decision-making.",
    },
    problem: {
      title: 'The VUS Challenge in Clinical Practice',
      content: 'A significant percentage of genetic tests—up to 40% in some hereditary cancer panels—return Variants of Uncertain Significance (VUS) results, creating challenges for patients and clinicians.',
      points: [
        {
          title: 'For the Patient',
          content: "VUS results create anxiety and uncertainty. Patients have identified genetic variants but lack clear guidance on their clinical significance.",
        },
        {
          title: 'For the Clinician',
          content: 'VUS results limit clinical decision-making. Clinicians must rely on family history and population-level risk assessment rather than precise genetic information.',
        },
        {
          title: 'For the System',
          content: 'VUS results can lead to increased surveillance, unnecessary procedures, and healthcare costs due to uncertainty-driven medical decisions.',
        },
      ],
    },
    doctrine: {
      title: 'AI-Powered Variant Classification',
      corePhilosophy: 'We address VUS through advanced computational analysis and machine learning. Our approach evaluates every variant from first principles using comprehensive biological context rather than relying solely on existing variant databases.',
      capabilities: {
        title: 'Key Technologies',
        items: [
          'Advanced AI Models: Large-scale neural networks trained on genomic and functional data.',
          'Bioinformatic Analysis Engine: High-throughput computational analysis for variant assessment.',
        ],
      },
      tacticalBreakdown: {
        title: 'Technical Approach',
        steps: [
          {
            title: 'Initial Classification',
            content: 'Our system performs rapid bioinformatic analysis by comparing reference and mutated DNA sequences. Variants causing protein truncation (nonsense or frameshift mutations) are immediately classified as likely pathogenic with high confidence scores.',
          },
          {
            title: 'Advanced AI Analysis',
            content: 'For more complex variants (such as missense mutations), our system creates comprehensive genomic context windows and applies machine learning models to calculate functional impact scores, providing quantitative measures of variant pathogenicity.',
          },
          {
            title: 'Clinical Classification',
            content: 'We provide definitive variant classifications ("Pathogenic," "Likely Pathogenic," "Benign," or "Likely Benign") with confidence scores to support clinical decision-making.',
          },
        ],
      },
    },
    targetAudience: {
      title: 'Target Audience & Value Proposition',
      content: '',
      audiences: [
        {
          name: 'Health Systems & Diagnostics Labs',
          description: 'We are your outsourced certainty engine. We take your most ambiguous cases and deliver the clear, actionable answers your clinicians and patients are desperate for. This is a high-margin service that closes your "actionability gap."',
        },
      ],
    },
  },
  'metastasis-prevention': {
    slug: 'metastasis-prevention',
    title: 'Metastasis Prevention',
    subtitle: 'Core Capability 2',
    vision: {
      title: 'Predictive Metastasis Prevention',
      content: "Metastasis accounts for approximately 90% of cancer deaths. Traditional approaches treat metastasis reactively, after it appears on imaging. Our approach focuses on predicting and preventing metastasis by analyzing the biological processes that enable cancer spread as a multi-step cascade that can be understood, predicted, and potentially interrupted.",
    },
    problem: {
      title: 'Limited Metastatic Risk Assessment',
      content: "Clinicians currently make treatment decisions based primarily on the characteristics of the primary tumor, with limited insight into its metastatic potential. Current approaches lack comprehensive tools to predict which tumors are most likely to metastasize and when.",
      points: [],
    },
    doctrine: {
      title: 'Computational Metastasis Modeling',
      corePhilosophy: "We use computational modeling to create comprehensive tumor profiles that simulate metastatic potential across the known biological steps of cancer spread. Our approach recognizes that metastasis involves multiple biological functions, each encoded by specific genes that can be analyzed to predict metastatic risk.",
      capabilities: {
        title: 'Key Technologies',
        items: [
            'AI-Powered Variant Analysis: Advanced assessment of mutations in metastasis-related genes.',
            'Therapeutic Design Platform: Computational tools for identifying potential therapeutic targets.',
        ],
      },
      tacticalBreakdown: {
        title: 'Technical Approach',
        steps: [
          {
            title: 'Metastatic Pathway Analysis',
            content: "We analyze tumor genomes for mutations in genes critical for metastatic processes (e.g., VEGF for angiogenesis, MMP genes for invasion, immune checkpoint genes for immune evasion).",
          },
          {
            title: 'Risk Quantification',
            content: 'Our AI models score mutations in metastasis-related genes, generating comprehensive reports that quantify metastatic potential across different biological pathways.',
          },
          {
            title: 'Vulnerability Identification',
            content: 'Analysis identifies which steps in the metastatic cascade represent the greatest vulnerabilities based on the tumor\'s genomic profile.',
          },
          {
            title: 'Therapeutic Target Discovery',
            content: 'Our platform identifies potential therapeutic targets and intervention strategies based on the tumor\'s specific metastatic vulnerabilities.',
          }
        ],
      },
    },
    targetAudience: {
        title: 'Target Audience & Value Proposition',
        content: '',
        audiences: [
            {
                name: 'Pharmaceutical & Biotech Companies',
                description: 'We provide the world\'s first platform for designing and testing anti-metastatic drugs in silico. We identify novel targets within the cascade and help de-risk a new generation of preventative therapies.',
            }
        ]
    }
  },
  'de-sci-and-ip-nfts': {
    slug: 'de-sci-and-ip-nfts',
    title: 'DeSci & IP-NFTs',
    subtitle: 'Core Capability 3',
    vision: {
      title: 'Alternative Funding Models for Biotech Innovation',
      content: "Traditional biotech funding models face significant challenges including lengthy timelines, high dilution, and limited access to capital. Our approach explores decentralized science (DeSci) and intellectual property NFTs as alternative funding mechanisms based on blockchain technology, transparency, and community participation.",
    },
    problem: {
      title: 'Biotech Funding Challenges',
      content: "Many promising research projects struggle to secure adequate funding for development. The transition from research concept to clinical candidate often faces significant funding gaps, limiting innovation in biotechnology.",
      points: [],
    },
    doctrine: {
      title: 'Blockchain-Based IP Management',
      corePhilosophy: "We explore blockchain technology to create transparent, verifiable records of therapeutic intellectual property. Our approach treats novel therapeutic designs as valuable digital assets that can be tokenized, making IP more accessible and liquid for funding purposes.",
      capabilities: {
        title: 'Key Technologies',
        items: [
            'Computational Drug Design: AI-powered platform for generating novel therapeutic candidates.',
            'Blockchain IP Registry: Distributed ledger system for recording and verifying intellectual property.',
        ],
      },
      tacticalBreakdown: {
        title: 'Technical Approach',
        steps: [
            {
                title: 'Therapeutic Generation',
                content: 'Our computational platform generates novel therapeutic candidates through AI-driven drug design and validation processes.',
            },
            {
                title: 'IP Documentation',
                content: 'We create cryptographic records of therapeutic designs on blockchain networks, establishing permanent, timestamped proof of invention.',
            },
            {
                title: 'Asset Tokenization',
                content: 'Intellectual property is packaged into digital tokens (IP-NFTs) that represent ownership stakes in future royalties and licensing opportunities.',
            },
            {
                title: 'Community Funding',
                content: 'Tokenized IP assets are offered to decentralized science communities, providing alternative funding sources and creating stakeholder communities invested in therapeutic development.',
            }
        ],
      },
    },
    targetAudience: {
        title: 'Target Audience & Value Proposition',
        content: '',
        audiences: [
            {
                name: 'DeSci Communities & Bio-DAOs',
                description: 'We provide a steady stream of high-quality, AI-generated, and verifiable therapeutic assets for you to fund and govern. We are the engine for the future of decentralized biotech.',
            }
        ]
    }
  },
  'trial-conquest': {
    slug: 'trial-conquest',
    title: 'Clinical Trial Optimization',
    subtitle: 'Core Capability 4',
    vision: {
      title: 'Precision Clinical Trial Recruitment',
      content: "We envision transforming clinical trial recruitment from a bottleneck into a competitive advantage. Our approach replaces traditional manual recruitment methods with intelligent systems that identify not only eligible patients, but those with the highest biological probability of treatment response, accelerating trial completion and improving success rates."
    },
    problem: {
      title: 'Clinical Trial Recruitment Challenges',
      content: "Current clinical trial recruitment methods face significant challenges that impact pharmaceutical development timelines and costs. Traditional approaches rely heavily on manual processes and basic keyword matching, which are inadequate for the complexity of modern precision medicine.",
      points: [
          {
              title: "Recruitment Delays",
              content: "Trial enrollment often takes months or years to complete, with approximately 80% of trials failing to meet enrollment timelines."
          },
          {
              title: "Suboptimal Patient Matching",
              content: "Current systems often rely on basic keyword matching, leading to high screen failure rates and potentially missing suitable candidates with complex medical histories."
          },
          {
              title: "Development Costs",
              content: "Recruitment delays significantly impact drug development timelines and costs, with each day of delay representing substantial financial impact."
          }
      ]
    },
    doctrine: {
      title: 'AI-Powered Patient Matching',
      corePhilosophy: "Our approach goes beyond traditional keyword matching to understand the biological rationale behind eligibility criteria. We identify patients whose biological profiles align with trial requirements and therapeutic mechanisms, improving both recruitment efficiency and trial success rates.",
      capabilities: {
        title: 'Key Technologies',
        items: [
            "Natural Language Processing: Advanced analysis of unstructured clinical notes and medical records.",
            "Genomic Analysis Platform: Comprehensive analysis of patient genomic data for biological compatibility."
        ],
      },
      tacticalBreakdown: {
        title: 'Technical Approach',
        steps: [
            {
                title: 'Protocol Analysis',
                content: 'Our platform analyzes trial protocols and deconstructs complex eligibility criteria into structured biological and clinical requirements.'
            },
            {
                title: 'Comprehensive Patient Search',
                content: 'AI agents search across integrated EMR and genomic databases, identifying patients who match both explicit criteria and underlying biological compatibility factors.'
            },
            {
                title: 'Candidate Ranking',
                content: "The system generates ranked lists of potential candidates with probability scores for both eligibility and treatment response, providing detailed rationale for each match."
            },
            {
                title: 'Recruitment Acceleration',
                content: "Our approach significantly reduces recruitment timelines, addressing a critical bottleneck in pharmaceutical development and accelerating patient access to innovative treatments."
            }
        ],
      },
    },
    targetAudience: {
        title: 'Target Audience & Value Proposition',
        content: '',
        audiences: [
            {
                name: 'Pharmaceutical Companies & CROs',
                description: "Stop burning capital on slow, inefficient recruitment. Use our platform to execute precision strikes, fill your trials faster, reduce screen failures, and get your drugs to market on an accelerated timeline. We are your unfair advantage in clinical development."
            }
        ]
    }
  }
}; 