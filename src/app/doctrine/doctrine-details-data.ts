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
    title: 'VUS Annihilation',
    subtitle: 'Doctrine 1',
    vision: {
      title: 'The Annihilation of Clinical Uncertainty',
      content: "Our vision is to eradicate 'Variant of Uncertain Significance' from the clinical lexicon. We will transform the VUS, a symbol of the old guard's failure and a source of agonizing patient anxiety, into a definitive, actionable intelligence asset. We do not tolerate ambiguity. We deliver verdicts.",
    },
    problem: {
      title: 'A Market Built on "Maybe"',
      content: 'The current diagnostics industry has a dirty secret: a significant percentage of their genetic tests—up to 40% in some hereditary cancer panels—return a VUS result. This is a catastrophic failure.',
      points: [
        {
          title: 'For the Patient',
          content: "It is a sentence of indefinite fear. They have a mutation, but no one can tell them if it's a dud or a fucking time bomb.",
        },
        {
          title: 'For the Clinician',
          content: 'It is diagnostic paralysis. They have data they cannot act upon, forcing them back to imprecise, population-level risk management.',
        },
        {
          title: 'For the System',
          content: 'It is a driver of immense wasteful spending, triggering years of unnecessary surveillance and anxiety-driven prophylactic surgeries.',
        },
      ],
    },
    doctrine: {
      title: 'The Triumvirate Threat Assessment',
      corePhilosophy: 'We solve this problem with overwhelming computational force, orchestrated by our Command Center in a multi-layered assault. Core Philosophy: We do not rely on outdated databases of known variants. We assess every mutation from first principles using a superior understanding of biological grammar.',
      capabilities: {
        title: 'Key Capabilities Deployed',
        items: [
          'The Zeta Oracle: Our 40B parameter discriminative AI.',
          'Bioinformatic Analysis Engine: For high-speed, non-AI-based checks.',
        ],
      },
      tacticalBreakdown: {
        title: 'Tactical Breakdown',
        steps: [
          {
            title: 'The Truncation Check (The Sieve)',
            content: 'Before wasting a single GPU cycle, our Command Center performs a high-speed bioinformatic check. It translates the reference and mutated DNA sequences. If the mutated protein is prematurely truncated (due to a nonsense or frameshift mutation), it is instantly flagged as "Pathogenic - Catastrophic Truncation" with a maximum damage score. The mission is over. Victory is declared.',
          },
          {
            title: 'The Zeta Oracle Precision Strike',
            content: 'If the mutation is more subtle (e.g., a missense variant), it passes to the next stage. The Command Center uses our "Downstream Impact Protocol" to create a strategically sliced 4kb context window and dispatches it to the Zeta Oracle. The Oracle calculates the delta_likelihood_score (our "Zeta Score"), providing a quantitative measure of the functional damage.',
          },
          {
            title: 'The Verdict',
            content: 'We replace "uncertain" with a definitive classification ("Pathogenic" or "Benign") backed by a hard, quantitative score.',
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
    subtitle: 'Doctrine 2',
    vision: {
      title: 'Transforming Metastasis from Fate to a Solvable Kill Chain',
      content: "Metastasis is what kills 90% of cancer patients. The old guard treats it as an inevitability, waiting for it to appear on a scan before reacting. This is unacceptable. Our doctrine is to treat metastasis not as a single event, but as an 8-step military campaign that can be analyzed, predicted, and intercepted.",
    },
    problem: {
      title: 'Fighting a Ghost',
      content: "Clinicians currently fight blind. They make treatment decisions based on the primary tumor, with no real insight into its potential to execute the metastatic cascade. They are fighting an enemy whose intentions and capabilities are a complete mystery.",
      points: [],
    },
    doctrine: {
      title: 'In Silico Counter-Intelligence',
      corePhilosophy: "We use our platform to build a complete 'Digital Twin' of the patient's cancer and simulate its ability to execute each of the 8 steps of metastasis. Core Philosophy: Metastasis is a series of biological functions. Every function is encoded by genes. We analyze those genes to predict the enemy's capabilities.",
      capabilities: {
        title: 'Key Capabilities Deployed',
        items: [
            'The Zeta Oracle: To assess the functional impact of mutations in key metastasis-enabling genes.',
            'The Zeta Forge: To design "interception" therapies that target the weakest link in the chain.',
        ],
      },
      tacticalBreakdown: {
        title: 'Tactical Breakdown',
        steps: [
          {
            title: 'Model the Cascade',
            content: "We analyze the tumor's genome for mutations in genes critical for each of the 8 steps (e.g., VEGF for angiogenesis, MMP genes for invasion, PD-L1 for immune evasion).",
          },
          {
            title: 'Quantify the Threat',
            content: 'The Zeta Oracle scores each of these mutations, generating a "Metastatic Potential Report" that quantifies the tumor\'s capability at each stage.',
          },
          {
            title: 'Identify the Weakest Link',
            content: 'The report highlights the step in the cascade where the tumor is most vulnerable.',
          },
          {
            title: 'Forge the Interception Weapon',
            content: 'The Zeta Forge is then commanded to design a targeted therapeutic (e.g., a CRISPR guide RNA, a nanobody) to attack that specific vulnerability, severing the kill chain.',
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
    subtitle: 'Doctrine 3',
    vision: {
      title: 'A New Economic Engine for Curing Disease',
      content: "The traditional biotech funding model is a fucking broken, inefficient relic. It is slow, dilutive, and controlled by a handful of gatekeepers. Our doctrine is to build a new, parallel economic system based on cryptographic trust, verifiable proof, and community ownership.",
    },
    problem: {
      title: 'The R&D Funding Quagmire',
      content: "Promising research dies on the vine every day due to a lack of funding. The path from a brilliant idea to a clinical candidate is a 'valley of death' that only the best-funded players can cross.",
      points: [],
    },
    doctrine: {
      title: 'From In Silico Creation to Liquid Assets',
      corePhilosophy: "We leverage our platform's generative power and the transparency of the blockchain to create a new asset class: AI-generated, on-chain verifiable therapeutic IP. Core Philosophy: A novel therapeutic design is a valuable asset. We will make that value liquid, transparent, and accessible to a global community.",
      capabilities: {
        title: 'Key Capabilities Deployed',
        items: [
            'The Zeta Forge: Our in silico factory for creating novel therapeutic candidates.',
            'The DeSci Ledger: Our on-chain registry for providing immutable "Proof of Invention."',
        ],
      },
      tacticalBreakdown: {
        title: 'Tactical Breakdown',
        steps: [
            {
                title: 'Creation',
                content: 'Our In Silico Flywheel generates a novel, validated therapeutic candidate (e.g., a "Gene Correction Blueprint" for a rare disease).',
            },
            {
                title: 'Proof of Invention',
                content: 'We commit a cryptographic hash of this design to our on-chain ledger, creating a permanent, timestamped record of our invention.',
            },
            {
                title: 'Securitization',
                content: 'We package the intellectual property associated with this on-chain asset into an IP-NFT. This NFT represents a share of future royalties, licensing fees, or other value derived from the asset.',
            },
            {
                title: 'Funding & Community',
                content: 'We offer this IP-NFT for funding to the DeSci ecosystem (Bio-DAOs, crypto VCs, etc.). This provides us with non-dilutive capital to fund real-world validation and builds a global community of stakeholders who are literally invested in our success.',
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
    title: 'Trial Conquest',
    subtitle: 'Doctrine 4',
    vision: {
      title: 'From Guesswork to Precision Strikes in Clinical Trials',
      content: "We envision a world where clinical trial recruitment is no longer a bottleneck but a strategic advantage. We will replace the slow, manual, and inaccurate methods of the past with an intelligent system that identifies not just eligible patients, but those with the highest biological probability of responding to treatment. Our mission is to fill trials with unprecedented speed and success."
    },
    problem: {
      title: 'Recruitment is a Failure of Intelligence',
      content: "The current paradigm for clinical trial recruitment is a monumental failure that costs the pharmaceutical industry billions and, more importantly, delays life-saving cures. It's a system built on crude keyword matching and manual chart review—a process fundamentally unequipped for the complexity of modern precision medicine.",
      points: [
          {
              title: "Slow & Inefficient",
              content: "It takes months or even years to fill trials, and a staggering 80% of them fail to meet enrollment timelines."
          },
          {
              title: "Inaccurate Matching",
              content: "Current systems match based on superficial keywords, leading to high screen failure rates and excluding non-obvious but biologically suitable candidates."
          },
          {
              title: "Massive Cost",
              content: "Every day a drug is delayed from market costs its developer millions in lost revenue, and recruitment is the single biggest cause of delay."
          }
      ]
    },
    doctrine: {
      title: 'Biological Search & Rescue',
      corePhilosophy: "We don't search for patients; we rescue them from the noise of the EMR. We understand the deep biological intent behind eligibility criteria, not just the words themselves. Core Philosophy: The right patient is not just one who meets the criteria, but one whose biology is primed for the therapeutic to succeed. We find that patient.",
      capabilities: {
        title: 'Key Capabilities Deployed',
        items: [
            "AgenticEMR™: To autonomously parse and understand unstructured clinical notes.",
            "GenomicAnalystAgent: To analyze genomic data and identify pathway dependencies."
        ],
      },
      tacticalBreakdown: {
        title: 'Tactical Breakdown',
        steps: [
            {
                title: 'Deconstruct Criteria',
                content: 'Our platform ingests the trial protocol and autonomously deconstructs complex eligibility criteria into a series of biological and clinical queries.'
            },
            {
                title: 'Execute Biological Search',
                content: 'Our agents search across integrated EMR and genomic data, looking for patients who match the deep biological intent—not just keywords. This includes analyzing pathway dependencies to find non-obvious candidates.'
            },
            {
                title: 'Generate Candidate Roster',
                content: "The system generates a ranked list of candidates with the highest probability of both eligibility and successful treatment response, complete with a full rationale for each match."
            },
            {
                title: 'Accelerate & Conquer',
                content: "We slash recruitment timelines from months to days, solving a critical bottleneck for Pharma and getting cures to patients faster."
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