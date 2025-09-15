// Security Content Extractor
// Extract and organize existing content from the monolithic security deck

import { securityContent } from '../securityContent';

// Extract existing content from the security deck slides
export const extractSecurityContent = () => {
  return {
    // Problem Statement (from slide 1)
    problem: {
      title: "The Fundamental Problem in Biotech Security",
      subtitle: "Traditional security protects infrastructure. We protect intellectual property.",
      mainText: "Traditional IT security builds perimeters around servers and networks. But in biotech, the most valuable asset isn't the infrastructure—it's the **digital blueprint for a multi-billion dollar therapeutic**, contained in just a few kilobytes of sequence data.",
      subText: "How do you secure an asset that can be copied, shared, or stolen with a single click?"
    },

    // Introduction (from slide 2)
    introduction: {
      title: "Introducing Zeta Shield",
      subtitle: "The first security platform designed for biological intellectual property",
      capabilities: [
        { icon: "UserCheck", title: "Identity Layer", subtitle: "Auth0 Integration" },
        { icon: "Fingerprint", title: "Asset Control", subtitle: "Blockchain Permissions" },
        { icon: "FileClock", title: "Audit Trail", subtitle: "Immutable Records" },
        { icon: "Bot", title: "AI Security", subtitle: "Engine Protection" }
      ]
    },

    // Three Critical Problems (from slide 3)
    criticalProblems: securityContent.architecture,

    // Onboarding Pipeline (from slide 4)
    onboarding: {
      title: "Secure Onboarding Pipeline",
      subtitle: "Zero-Trust Provisioning for Research Teams & Partners",
      steps: [
        {
          title: "1. Identity Verification",
          description: "Multi-factor authentication through Auth0, background verification, and role-based access assignment with cryptographic key generation."
        },
        {
          title: "2. Permission Mapping", 
          description: "Granular permissions are mapped to blockchain wallets, creating immutable access policies tied to specific research projects and data types."
        },
        {
          title: "3. Environment Provisioning",
          description: "Secure sandbox environments with isolated compute, storage, and AI agent access—all monitored and logged on-chain."
        }
      ],
      footer: {
        title: "Automated Compliance",
        text: "The system generates audit trails from day one, ensuring your organization stays compliant as it scales."
      }
    },

    // AI Engine Security (from slide 5)
    aiEngineSecurity: {
      title: "AI Engine Security & Verification",
      subtitle: "Protecting autonomous AI systems that generate billion-dollar IP",
      protection: {
        title: "AI Engine Protection",
        items: [
          {
            title: "Isolated Execution",
            text: "Each AI engine operates in secure environments with blockchain-enforced permissions for specific therapeutic assets and research projects."
          },
          {
            title: "Real-time Tracking", 
            text: "Every Oracle prediction, Forge design, and Boltz validation is cryptographically signed and recorded on-chain with timestamps."
          },
          {
            title: "Access Control",
            text: "Automatic isolation protocols activate if any AI engine attempts unauthorized access to restricted IP or partner data."
          }
        ]
      },
      verification: securityContent.accessMatrix,
      accountability: {
        title: "Unprecedented AI Accountability",
        text: "When AI engines generate therapeutic designs worth billions, you need verifiable proof of every decision. Zeta Shield provides cryptographic evidence of every Oracle analysis, Forge design, and Boltz validation—creating an unforgeable record of your IP creation process."
      }
    },

    // Research Services (from slide 6)
    researchServices: {
      title: "Our Therapeutic Research Services",
      subtitle: "High-value AI-driven research programs we secure for partners",
      categories: [
        {
          title: "VUS Classification",
          points: [
            "Process entire VUS backlogs",
            "Deliver definitive Pathogenic/Benign classifications", 
            "Close actionability gaps for clinical teams",
            "Provide cryptographically signed results"
          ]
        },
        {
          title: "In Silico Drug Discovery",
          points: [
            "Complete pre-clinical research digitally",
            "Validate therapeutic targets",
            "Design novel therapeutic candidates", 
            "Generate comprehensive validation packages"
          ]
        },
        {
          title: "Precision Oncology",
          points: [
            "Model complex metastatic processes",
            "Identify intervention opportunities",
            "Design targeted therapeutic strategies",
            "Develop personalized treatment approaches"
          ]
        }
      ],
      framework: {
        title: "Research Security Framework",
        sections: [
          {
            title: "Access Control",
            points: [
              "Auth0-verified researcher authentication",
              "Project-specific permission validation", 
              "Granular data access boundaries"
            ]
          },
          {
            title: "IP Protection",
            points: [
              "Real-time tracking of research outputs",
              "Immutable audit trail of all AI operations",
              "Secure IP-NFT generation upon completion"
            ]
          }
        ]
      }
    },

    // Deployment Models (from slide 7)
    deploymentModels: {
      title: "Enterprise Deployment Models",
      subtitle: "Flexible Security for Every Organization",
      models: securityContent.deployments,
      footer: {
        title: "From Proof-of-Concept to Production in 30 Days",
        text: "Our deployment team handles the technical complexity while your organization maintains focus on core R&D activities. Every deployment includes comprehensive training and 24/7 support."
      }
    },

    // Two-Layer Architecture (from slide 8)
    twoLayerArchitecture: {
      title: "Two-Layer Security Architecture",
      subtitle: "Identity verification + asset-level access control",
      layers: [
        {
          title: "Layer 1: Identity & Authentication (Auth0 Integration)",
          text: "Auth0 serves as the authoritative source for user identity and role-based permissions. Every researcher, partner, and administrator must authenticate through Auth0's enterprise platform with multi-factor authentication before accessing any therapeutic data or AI engines."
        },
        {
          title: "Layer 2: Asset-Level Access Control (Blockchain)",
          text: "Access to specific therapeutic assets is controlled by smart contracts, not traditional databases. Every access request generates an on-chain transaction, creating an **immutable audit trail** that provides verifiable chain of custody for all intellectual property."
        }
      ]
    },

    // Multi-Tenant Architecture (from slide 9)
    multiTenantArchitecture: {
      title: "Multi-Tenant Security Architecture",
      subtitle: "Enterprise-Grade Isolation for Every Organization",
      tenants: [
        {
          title: "Biotech Corp A",
          items: [
            { text: "Isolated Data Layer" },
            { text: "Dedicated AI Agents" },
            { text: "Unique Encryption Keys" }
          ]
        },
        {
          title: "Zeta Shield Core",
          items: [
            { text: "Unified Identity (Auth0)" },
            { text: "Blockchain Verification" },
            { text: "Global Threat Detection" }
          ]
        },
        {
          title: "Pharma Giant B", 
          items: [
            { text: "Isolated Data Layer" },
            { text: "Dedicated AI Agents" },
            { text: "Unique Encryption Keys" }
          ]
        }
      ],
      guarantees: [
        {
          title: "Data Sovereignty",
          text: "Complete data isolation with tenant-specific encryption keys and storage partitions."
        },
        {
          title: "Network Segmentation",
          text: "Isolated network namespaces prevent cross-tenant data leakage."
        },
        {
          title: "Compliance Per Tenant",
          text: "Customizable compliance controls for different regulatory requirements."
        }
      ]
    },

    // Identity Management (from slide 10)
    identityManagement: {
      title: "Enterprise Identity Management",
      subtitle: "Auth0 integration for seamless, secure access control",
      footerText: "Unlike traditional systems that apply generic IT security to biotech, Zeta Shield recognizes that **intellectual property requires asset-specific protection**. Auth0 provides enterprise-grade identity management, while our blockchain layer ensures that authenticated users can only access the specific therapeutic data they're authorized to work with."
    },

    // Compliance & Audit (from slide 11)
    complianceAudit: {
      title: "Compliance & Audit Trail",
      subtitle: "Immutable Records for Regulatory Excellence",
      standards: {
        title: "Supported Standards",
        items: [
          { title: "SOC 2 Type II", subtitle: "Continuous monitoring" },
          { title: "HIPAA", subtitle: "Healthcare data protection" },
          { title: "GDPR", subtitle: "EU data privacy" },
          { title: "ISO 27001", subtitle: "Information security" }
        ]
      },
      dashboard: {
        title: "Real-Time Audit Dashboard",
        items: [
          { label: "Data Access Events", value: "1,247 logged" },
          { label: "User Authentication", value: "98.7% success" },
          { label: "Blockchain Verifications", value: "100% verified" },
          { label: "Compliance Score", value: "99.2%" }
        ],
        export: {
          title: "Audit Export Ready",
          text: "Generate compliance reports in seconds for any auditor or regulatory body."
        }
      },
      advantages: [
        {
          title: "Immutable History",
          text: "Every action is permanently recorded on-chain, creating an unforgeable audit trail."
        },
        {
          title: "Automated Reporting",
          text: "Compliance reports generate automatically, reducing audit preparation from weeks to hours."
        },
        {
          title: "Continuous Monitoring",
          text: "Real-time compliance checking ensures you never fall out of regulatory requirements."
        }
      ]
    },

    // Research Pipeline (from slide 12)
    researchPipeline: securityContent.researchPipeline,

    // Competitive Analysis (from slide 13)
    competitiveAnalysis: {
      title: "Why Traditional Security Falls Short",
      subtitle: "The fundamental difference between protecting infrastructure vs. intellectual property",
      comparison: {
        title: "Traditional Security vs. IP-Centric Security",
        competitors: securityContent.competitive.rows
      },
      advantages: {
        title: "The IP-Centric Security Advantage",
        items: [
          {
            title: "Asset-Level Protection",
            text: "Secure therapeutic blueprints and research data at the individual asset level, not just system-wide"
          },
          {
            title: "Granular Access Control",
            text: "Smart contracts enable precise permissions for specific therapeutic designs and research projects"
          },
          {
            title: "Verifiable Provenance",
            text: "Immutable, blockchain-based record of every interaction with your valuable intellectual property"
          }
        ]
      }
    },

    // Access Control Product (from slide 14)
    accessControlProduct: {
      title: "Verifiable Access Control: The Product",
      subtitle: "The New Standard for R&D Security",
      auth0: { title: "Identity Verification", text: "Auth0 verifies *who* you are." },
      blockchain: { title: "Permission Verification", text: "The blockchain verifies *what you're allowed to do*." },
      strategic: securityContent.identity.strategic
    }
  };
};

// Transform extracted content into audience-specific formats
export const toSecurityTechnicalContent = (extractedContent: any) => {
  return {
    title: "Zeta Shield: Technical Architecture",
    subtitle: "Enterprise-grade security infrastructure for biological IP protection",
    architecture: extractedContent.twoLayerArchitecture,
    multiTenant: extractedContent.multiTenantArchitecture,
    aiSecurity: extractedContent.aiEngineSecurity,
    compliance: extractedContent.complianceAudit,
    deployment: extractedContent.deploymentModels
  };
};

export const toSecurityBusinessContent = (extractedContent: any) => {
  return {
    title: "Zeta Shield: Business Value Proposition",
    subtitle: "Securing multi-billion dollar IP with enterprise-grade security",
    problem: extractedContent.problem,
    solution: extractedContent.introduction,
    competitive: extractedContent.competitiveAnalysis,
    deployment: extractedContent.deploymentModels,
    roi: {
      costSavings: "Eliminate IP theft and data breaches",
      timeReduction: "Automated compliance reduces audit time by 80%",
      riskMitigation: "Protect billion-dollar therapeutic assets"
    }
  };
};

export const toSecurityComplianceContent = (extractedContent: any) => {
  return {
    title: "Zeta Shield: Compliance & Regulatory Excellence",
    subtitle: "Immutable audit trails for regulatory compliance",
    standards: extractedContent.complianceAudit.standards,
    dashboard: extractedContent.complianceAudit.dashboard,
    advantages: extractedContent.complianceAudit.advantages,
    auditTrail: extractedContent.researchPipeline
  };
};

// Get all extracted content
export const getAllSecurityContent = () => {
  const extracted = extractSecurityContent();
  return {
    technical: toSecurityTechnicalContent(extracted),
    business: toSecurityBusinessContent(extracted),
    compliance: toSecurityComplianceContent(extracted),
    raw: extracted
  };
};
