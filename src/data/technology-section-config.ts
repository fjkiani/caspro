import { Cpu, Activity, GitMerge, Lock } from 'lucide-react';

export const TECHNOLOGY_CONFIG = {
  sectionId: "science",
  title: "The Science & Technology Powering CrisPRO",
  subtitle: "CrisPRO brings together cutting-edge AI foundation models and robust engineering to create a powerful, secure platform for genomics analysis and therapy design.",
  tabs: [
    {
      name: 'CrisPRO.ai Engine',
      description: 'Genomic Prediction & Generation',
      icon: Cpu,
      modelPath: '/models/dna.glb',
      content: {
        heading: "CrisPRO.ai: Evolutionary Genomic Analysis",
        description: "CrisPRO.ai is a state-of-the-art deep learning model that predicts the functional impact of genetic variants with over 90% accuracy. Beyond prediction, CrisPRO leverages CrisPRO.ai's generative capabilities to design novel DNA/RNA sequences for therapeutic purposes.",
        capabilities: [
          { name: 'Interpret Variants', details: 'Accurately interpret complex cancer-related genetic variants.' },
          { name: 'Identify Targets', details: 'Identify high-potential therapeutic targets based on variant effects.' },
          { name: 'Design Therapies', details: 'Generate novel DNA/RNA sequences for therapy design (e.g., CRISPR guides).' },
          { name: 'Predict Efficacy', details: 'Predict the efficacy and potential off-target effects of interventions.' },
        ],
      }
    },
    {
      name: 'AlphaFold 3',
      description: 'Advanced Structural Analysis',
      icon: Activity,
      modelPath: '/models/3nmm-haemoglobin.glb',
      content: {
        heading: "AlphaFold 3: Structural Biology Insights",
        description: "AlphaFold 3 provides critical insights into how genetic variations affect the 3D structure of molecules and how designed therapies might interact at a structural level, ensuring biological viability.",
        capabilities: [
          { name: 'Predict Structural Changes', details: 'Analyze how mutations affect protein structure and function.' },
          { name: 'Evaluate Viability', details: 'Evaluate the structural viability and stability of AI-designed therapeutic components.' },
          { name: 'Visualize Interactions', details: 'Visualize complex molecular interactions for mechanistic understanding.' },
          { name: 'Simulate Binding', details: 'Simulate drug-target binding and interaction for designed therapies.' },
        ],
      }
    },
    {
      name: 'Core Capabilities',
      description: 'Integrated Platform Features',
      icon: GitMerge,
      modelPath: '/models/dna_rna.glb',
      content: {
        heading: "A Unified, Intelligent Ecosystem",
        description: "What truly sets CrisPRO apart is not just the individual power of each feature, but their seamless integration into a cohesive ecosystem. This synergy creates an unparalleled workflow from raw data to therapeutic innovation.",
        capabilities: [
          { name: 'AI Genomic Analysis', details: 'Deep variant interpretation and functional impact prediction.' },
          { name: 'AI-Guided Therapy Design', details: 'Design bespoke gene editing constructs and other biologics.' },
          { name: 'In Silico Evaluation', details: 'Predict structural viability and efficacy of designed therapies.' },
          { name: 'Predictive Biomarker Discovery', details: 'Identify novel biomarkers for treatment response and resistance.' },
          { name: 'Intelligent Trial Matching', details: 'AI-based assistance to find relevant clinical trials for patients.' },
          { name: 'AI Co-pilot', details: 'Natural language interface to ask complex questions about genomic data.' },
        ],
      }
    },
    {
      name: 'Security & Compliance',
      description: 'HIPAA, GDPR & Data Protection',
      icon: Lock,
      content: {
        heading: "Security by Design",
        description: "CrisPRO is architected with patient data security and regulatory compliance as foundational principles. We employ state-of-the-art measures to protect sensitive health information while enabling groundbreaking research.",
        capabilities: [
          { name: 'End-to-End Encryption', details: 'All data is encrypted at rest and in transit.' },
          { name: 'Segregated Infrastructure', details: 'Secure, segregated cloud infrastructure with MFA.' },
          { name: 'Granular Access Control', details: 'Comprehensive audit logs and granular access controls.' },
          { name: 'Continuous Monitoring', details: 'Regular third-party security assessments and penetration testing.' },
        ],
      }
    }
  ]
}; 